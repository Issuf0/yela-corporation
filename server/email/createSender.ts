import type { ResolvedConfig } from '../config';
import type { Logger } from '../logger';
import { createMockSender } from './mockSender';
import { createResendSender } from './resendSender';
import type { EmailSender } from './types';

export function createSender(config: ResolvedConfig, logger: Logger): EmailSender {
  if (config.senderMode === 'mock') return createMockSender({ logger });
  // resolveConfig guarantees the key is present in resend mode.
  return createResendSender(config.resendApiKey ?? '');
}
