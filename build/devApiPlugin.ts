import type { ServerResponse } from 'node:http';
import type { Connect, Plugin } from 'vite';
import { SERVER_ENV_KEYS } from '../server/config';
import { createContactWebHandler } from '../server/contact/webHandler';

const MAX_DEV_BODY_BYTES = 64 * 1024;

async function toWebRequest(req: Connect.IncomingMessage): Promise<Request> {
  const host = req.headers.host ?? 'localhost';
  const url = new URL(req.originalUrl ?? req.url ?? '/', `http://${host}`);
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    headers.set(key, Array.isArray(value) ? value.join(', ') : value);
  }

  const method = (req.method ?? 'GET').toUpperCase();
  let body: Uint8Array<ArrayBuffer> | undefined;
  if (method !== 'GET' && method !== 'HEAD') {
    const chunks: Buffer[] = [];
    let total = 0;
    for await (const chunk of req) {
      const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      total += buffer.byteLength;
      if (total > MAX_DEV_BODY_BYTES) break;
      chunks.push(buffer);
    }
    body = Uint8Array.from(Buffer.concat(chunks));
  }
  return new Request(url, { method, headers, body });
}

async function writeWebResponse(response: Response, res: ServerResponse): Promise<void> {
  res.statusCode = response.status;
  response.headers.forEach((value, key) => res.setHeader(key, value));
  res.end(Buffer.from(await response.arrayBuffer()));
}

/**
 * Serves /api/contact inside `vite dev` using the very same handler as the
 * Vercel function, so the form can be exercised end-to-end locally.
 */
export function devApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'yela:dev-api',
    apply: 'serve',
    configureServer(server) {
      // Expose server-side variables from .env.local to the handler (dev only).
      for (const key of SERVER_ENV_KEYS) {
        if (env[key] !== undefined && process.env[key] === undefined) process.env[key] = env[key];
      }
      const handle = createContactWebHandler();
      server.middlewares.use('/api/contact', (req, res) => {
        void (async () => {
          try {
            await writeWebResponse(await handle(await toWebRequest(req)), res);
          } catch (error) {
            server.config.logger.error(`[dev-api] ${String(error)}`);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: false, code: 'delivery_failed', message: 'Erro interno.' }));
          }
        })();
      });
    },
  };
}
