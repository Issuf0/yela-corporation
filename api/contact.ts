/**
 * Vercel Function: POST /api/contact
 * Thin adapter only; all logic lives in /server so it can be unit-tested and
 * reused by the Vite dev server. Docs: https://vercel.com/docs/functions
 */
import { createContactWebHandler } from '../server/contact/webHandler';

export const config = { maxDuration: 10 };

const handler = createContactWebHandler();

export async function POST(request: Request): Promise<Response> {
  return handler(request);
}

export async function GET(): Promise<Response> {
  return Response.json(
    { ok: false, code: 'method_not_allowed', message: 'Método não suportado.' },
    { status: 405, headers: { Allow: 'POST', 'Cache-Control': 'no-store' } },
  );
}
