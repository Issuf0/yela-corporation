# YELA Corporation — Website institucional

Website público da **YELA Corporation, SU, SAS** (Nampula, Moçambique): arquitectura, construção e estúdio criativo, em seis áreas de serviços, com a parceria estratégica YELA × Learn Code.

Direcção visual: **YELA — Quiet Impact** (editorial, contido, fundos off-white, navy e laranja do logótipo).

## Stack

- React 19 + TypeScript 7, Vite 8, Tailwind CSS 4, lucide-react.
- Tipos de letra servidos pelo próprio site (`@fontsource-variable`): Plus Jakarta Sans e Outfit. Sem pedidos a terceiros.
- **Sem backend, sem base de dados, sem cookies.** O formulário de contacto valida no browser e abre o WhatsApp da YELA ou o programa de email do visitante com a mensagem preenchida.
- Testes com Vitest (lógica, formulário e estrutura das páginas via jsdom).

## Estrutura

```
*.html                         uma página por ficheiro (build multi-página do Vite): index, sobre,
                               actuacao, parceria, parcerias, contacto, privacidade, 404
src/entries/*.tsx              ponto de entrada de cada página (monta a página respectiva)
src/pages/*.tsx                HomePage, SobrePage, ActuacaoPage, ParceriaPage, ParceriasPage,
                               ContactoPage, PrivacidadePage, NotFoundPage
src/components/                Layout, Header (página actual com aria-current), Footer, PageHero,
                               CtaBand, NextPage, ContactForm, Logo, SectionMarker
src/config/nav.ts              lista de páginas (caminho, ficheiro, rótulo) — fonte única da navegação
src/config/site.ts             contactos (WhatsApp, email), nome legal, tagline e lista de parceiros
                               (PARTNERS, mostrada em /parcerias) — alterar aqui
src/lib/contactSchema.ts       validação partilhada do formulário (limites, mensagens em PT)
src/lib/contactMessage.ts      texto da mensagem enviada por WhatsApp/email
src/index.css                  tokens de design (@theme) e estilos base
build/seoPlugin.ts             canonical, og:url, og:image, robots.txt e sitemap.xml (depende de SITE_URL)
build/cleanUrlsPlugin.ts       em dev/preview serve /sobre como sobre.html (como o cleanUrls da Vercel)
public/                        favicon.png/.ico, apple-touch-icon.png, og-image.png (gerados a partir do logótipo oficial)
src/assets/brand/              monograma e logótipo horizontal oficiais (recortados de assets/*.png)
tests/                         vitest
vercel.json                    cabeçalhos de segurança, cache, cleanUrls
assets/                        referências (logótipo JPEG original, acordo) — não são publicadas
```

## Desenvolvimento

Requisitos: Node.js 20 ou superior.

```bash
npm install
npm run dev        # http://localhost:3000 e, na mesma rede Wi-Fi, o endereço «Network» mostrado no terminal
npm run typecheck  # tsc --noEmit
npm test           # vitest
npm run build      # gera dist/ (inclui robots.txt e, com SITE_URL, sitemap.xml)
npm run preview    # serve dist/ em http://localhost:4173
npm run check      # typecheck + test + build
```

## Configuração

### Contactos e textos fixos

Tudo o que é específico da YELA está em `src/config/site.ts`: email, número de WhatsApp, nome legal e tagline. Os textos das secções estão nos respectivos componentes em `src/components/`.

### Variáveis de build (opcionais)

Ver `.env.example`. Única variável: `SITE_URL` (URL pública, sem barra final). Quando definida, o build gera `canonical`, `og:url`, `og:image` absolutos e o `sitemap.xml`. Enquanto o domínio não estiver confirmado, deixar vazia: o site funciona na mesma e nada é inventado.

Não existem segredos: nenhuma chave de API, nenhuma variável de servidor.

## Deploy na Vercel

A conta Vercel e o domínio devem pertencer à YELA Corporation (acordo, cláusula 13).

1. Criar o projecto na Vercel a partir do repositório. O preset Vite é detectado automaticamente (`npm run build`, output `dist`).
2. Em *Settings → Environment Variables*, definir `SITE_URL` quando o domínio existir (ex.: `https://www.exemplo.co.mz`).
3. Fazer deploy. `vercel.json` aplica `cleanUrls` (a página `/privacidade` abre sem `.html`), cache imutável para `/assets/*` e os cabeçalhos de segurança.

### Domínio e HTTPS

1. Registar o domínio em nome da YELA Corporation.
2. Na Vercel, *Settings → Domains → Add*, e seguir as instruções de DNS (registo `A`/`CNAME` indicado pela Vercel).
3. O certificado HTTPS é emitido e renovado automaticamente pela Vercel. O cabeçalho HSTS já está activo em `vercel.json`.
4. Definir `SITE_URL` e fazer novo deploy para activar canonical, Open Graph absoluto e sitemap.

### Verificação após deploy

- [ ] `/`, `/sobre`, `/actuacao`, `/parceria`, `/parcerias`, `/contacto` e `/privacidade` abrem; um endereço inexistente mostra a página 404; `/robots.txt`, `/favicon.svg`, `/og-image.png` respondem.
- [ ] `/contacto?assunto=tecnologia` abre o formulário com o assunto já seleccionado.
- [ ] Preencher o formulário com dados inválidos mostra erros em português; com dados válidos aparece «Escolha como enviar».
- [ ] «Enviar pelo WhatsApp» abre `wa.me/258845306215` com a mensagem; «Enviar por email» abre o programa de email para `yelacorp.info@gmail.com`.
- [ ] Menu móvel abre/fecha (botão, Escape) num telemóvel.
- [ ] Partilha no WhatsApp/Facebook mostra título, descrição e imagem (testar em https://developers.facebook.com/tools/debug/ depois de definir `SITE_URL`).
- [ ] Cabeçalhos presentes: `curl -I https://<dominio>/` deve mostrar `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`.

### Rollback

Na Vercel, *Deployments → (deployment anterior) → Promote to Production* ou *Instant Rollback*. Cada deploy é imutável; voltar atrás não requer novo build.

## Segurança e privacidade

- CSP estrita (`default-src 'self'`, sem scripts/estilos inline; verificado na build), `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, HSTS.
- Sem cookies, sem analytics, sem conteúdos de terceiros; por isso não há aviso de cookies.
- O site não recebe nem guarda dados: a mensagem é enviada pelo visitante, a partir do seu WhatsApp ou email. A página `/privacidade` descreve isto e tem dois pontos assinalados `[A CONFIRMAR PELA YELA]` (morada/registo comercial e prazo de conservação).

## Acessibilidade

- Uma `h1` por página, hierarquia de títulos sem saltos, landmarks (`header`, `main#conteudo`, `footer`), ligação «Saltar para o conteúdo».
- Todos os campos com `label`, erros ligados por `aria-describedby`, foco no primeiro erro, estados anunciados por `aria-live`.
- Menu móvel com `aria-expanded`/`aria-controls`, fecha com Escape; alvos de toque com 44 px ou mais; foco visível.
- Contraste dos tokens de cor verificado (mínimo 4,95:1, todos AA). Preferência de movimento reduzido respeitada.

## Envio automático por email (opcional, futuro)

O histórico git contém uma implementação completa e testada de envio automático via **Resend** com uma função Vercel (`api/contact.ts` + `server/`), removida por decisão de âmbito («só frontend»). Está nos commits «Limpeza do âmbito e backend do formulário de contacto» e «Campo Assunto no contacto e encaminhamento condicional para a Learn Code». Para a reactivar seria necessário: domínio da YELA verificado na Resend (registos DNS), chave de API na Vercel e repor esses ficheiros. Sem domínio próprio, a Resend só permite envios de teste.

## Fontes dos conteúdos

- Acordo de parceria (`assets/Learn Code X Yela Corp.-1.pdf`): responsabilidades, fluxo e princípios da parceria.
- Portfólio de Serviços (`assets/PORTFÓLIO DE SERVIÇOS.docx`): áreas e listas de serviços, missão, visão, valores, pilares, promessa, equipa, sede (Nampula) e telefone.
- Site da Learn Code: descrição da parceira.

## Pendentes para a YELA

- Confirmar a designação legal: o portfólio usa «YELA Corporation, SU, SAS» e «YELA Corporation S.A.»; o acordo usa «SA, SUS».
- Confirmar a sede (Nampula, segundo o portfólio) e os telefones (WhatsApp +258 84 530 6215; telefone +258 83 444 6767).
- Confirmar se o OHOLO Podcast é parceiro externo (como está em /parcerias) ou produção própria (o portfólio coloca-o no Departamento de Produção Audiovisual e Media).
- Autorizar a publicação dos nomes da equipa em /sobre.
- Aprovar a imagem de partilha `public/og-image.png` (feita com o logótipo oficial).
- Se existir, enviar o logótipo em SVG para máxima nitidez; hoje usam-se os PNG oficiais.
- Morada completa e registo comercial, e prazo de conservação de mensagens, para a página de privacidade.
- Registar o domínio, criar a conta Vercel e definir `SITE_URL`.
