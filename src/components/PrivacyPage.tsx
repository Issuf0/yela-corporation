import React from 'react';
import { CONTACT, LEGAL_NAME } from '../config/site';
import { Footer } from './Footer';
import { Header } from './Header';
import { SectionMarker } from './SectionMarker';

const Pending: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-mono text-[0.8em] uppercase tracking-wider text-orange-ink">[{children}]</span>
);

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="font-display text-xl sm:text-2xl font-bold text-ink tracking-tight mt-12 mb-4 first:mt-0">{children}</h2>
);

export const PrivacyPage: React.FC = () => (
  <div className="min-h-dvh flex flex-col bg-paper text-ink">
    <Header homePath="/" />
    <main id="conteudo" className="flex-1 pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <SectionMarker number="§" label="Privacidade" className="mb-6" />
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink text-balance max-w-3xl">
          Política de privacidade
        </h1>
        <p className="mt-4 text-base sm:text-lg text-ink-2 font-light leading-relaxed max-w-2xl text-pretty">
          Esta página explica, de forma directa, como o website da YELA Corporation lida com os dados que nos envia e
          como pode exercer os seus direitos.
        </p>

        <div className="mt-12 max-w-2xl text-base text-ink-2 font-light leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:font-semibold [&_strong]:text-ink">
          <H2>1. Responsável pelo tratamento</H2>
          <p>
            <strong>{LEGAL_NAME}</strong>, com sede em {CONTACT.city}, {CONTACT.country}.{' '}
            <Pending>morada completa e registo comercial a confirmar pela YELA</Pending>
          </p>

          <H2>2. O que o website recolhe</H2>
          <p>
            <strong>Nada.</strong> O website não tem base de dados, não guarda formulários e não envia dados para
            servidores. O formulário de contacto apenas prepara uma mensagem com o que escreveu (nome, email,
            organização e telefone opcionais, assunto e mensagem) e abre-a no seu WhatsApp ou no seu programa de email.
            É você que decide enviá-la.
          </p>

          <H2>3. Quem recebe a sua mensagem</H2>
          <ul>
            <li>
              <strong>YELA Corporation</strong>, no WhatsApp {CONTACT.whatsappFormatted} ou no email {CONTACT.email},
              consoante o canal que escolher.
            </li>
            <li>
              <strong>Learn Code</strong>, parceira tecnológica da YELA, apenas quando o seu pedido diz respeito a
              soluções tecnológicas e a YELA o encaminha para análise técnica, no âmbito da parceria.
            </li>
          </ul>
          <p>
            Ao enviar pelo WhatsApp ou por email, a mensagem passa pelo serviço que escolher (por exemplo, WhatsApp,
            Gmail), sujeito às políticas de privacidade desse serviço.
          </p>

          <H2>4. Para que usamos os dados</H2>
          <p>
            Exclusivamente para responder ao seu pedido e, quando aplicável, preparar uma proposta. Não os usamos para
            outros fins, não os vendemos e não enviamos comunicações de marketing sem o seu consentimento.
          </p>

          <H2>5. Conservação</H2>
          <p>
            As mensagens ficam nas contas de WhatsApp e email da YELA pelo tempo necessário ao seu tratamento e
            acompanhamento comercial. <Pending>prazo máximo de conservação a definir pela YELA</Pending>
          </p>

          <H2>6. Os seus direitos</H2>
          <p>
            Pode pedir o acesso, a rectificação ou a eliminação dos seus dados, bem como opor-se ao seu tratamento,
            escrevendo para{' '}
            <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4 text-ink hover:text-orange-ink">
              {CONTACT.email}
            </a>
            .
          </p>

          <H2>7. Cookies e rastreio</H2>
          <p>
            Este website não utiliza cookies, não integra ferramentas de análise de audiência nem carrega conteúdos de
            terceiros (os tipos de letra são servidos pelo próprio site). Por isso não apresenta um aviso de cookies.
          </p>

          <H2>8. Segurança</H2>
          <p>
            O website é servido exclusivamente por HTTPS, com cabeçalhos de segurança que impedem a inclusão de
            conteúdos externos. Não existe qualquer conta, área reservada ou armazenamento de dados no website.
          </p>

          <p className="pt-6 text-sm text-ink-3">Última actualização: Outubro de 2026.</p>
        </div>
      </div>
    </main>
    <Footer homePath="/" />
  </div>
);
