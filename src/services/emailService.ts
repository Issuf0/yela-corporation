import { Lead, SimulatedEmail } from '../types';

export const emailService = {
  /**
   * Prepares and dispatches simulated transactional emails.
   * Architecture is designed to plug directly into Resend API:
   * 
   * ```ts
   * import { Resend } from 'resend';
   * const resend = new Resend(process.env.RESEND_API_KEY);
   * await resend.emails.send({ ... });
   * ```
   */
  async processLeadEmails(lead: Lead): Promise<SimulatedEmail[]> {
    const timestamp = new Date().toLocaleString('pt-PT', {
      timeZone: 'Africa/Maputo',
      dateStyle: 'long',
      timeStyle: 'short',
    });

    // 1. Technical Notification for Learn Code
    const learnCodeEmail: SimulatedEmail = {
      id: `email-lc-${lead.id}-${Date.now()}`,
      leadId: lead.id,
      to: 'tecnica@learncode.co.mz',
      recipientRole: 'Learn Code (Técnica)',
      subject: `Novo Lead YELA — [${lead.serviceName}] — [${lead.id}]`,
      sentAt: timestamp,
      simulatedProvider: 'Resend (Sandbox Ready)',
      htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #1e293b; background: #f8fafc; margin: 0; padding: 20px; }
    .card { background: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: #0f172a; color: #ffffff; padding: 24px; }
    .badge { display: inline-block; background: #d97706; color: #ffffff; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 8px; }
    .title { font-size: 20px; font-weight: 700; margin: 0; }
    .content { padding: 24px; }
    .info-table { width: 100%; border-collapse: collapse; margin-top: 16px; margin-bottom: 24px; }
    .info-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .label { font-weight: 600; color: #64748b; width: 35%; }
    .val { font-weight: 500; color: #0f172a; }
    .desc-box { background: #f8fafc; border-left: 4px solid #d97706; padding: 16px; border-radius: 4px; font-size: 14px; margin-top: 8px; }
    .footer { background: #f1f5f9; padding: 16px 24px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="badge">Encaminhamento para Análise Técnica</div>
      <h1 class="title">Novo Lead Prospectado pela YELA Corporation</h1>
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">Parceria Estratégica YELA × Learn Code</p>
    </div>
    <div class="content">
      <p style="margin-top: 0; font-size: 14px;">A equipa de prospecção da YELA Corporation captou e qualificou o seguinte lead para desenho de arquitetura técnica, estimativa orçamental e viabilidade técnica pela Learn Code:</p>
      
      <table class="info-table">
        <tr><td class="label">Lead ID</td><td class="val" style="font-family: monospace; font-weight: 700; color: #d97706;">${lead.id}</td></tr>
        <tr><td class="label">Nome do Contacto</td><td class="val">${lead.fullName}</td></tr>
        <tr><td class="label">Empresa / Entidade</td><td class="val">${lead.companyName}</td></tr>
        <tr><td class="label">Email de Contacto</td><td class="val"><a href="mailto:${lead.email}" style="color: #0284c7;">${lead.email}</a></td></tr>
        <tr><td class="label">Telefone</td><td class="val">${lead.phone}</td></tr>
        <tr><td class="label">Província</td><td class="val">${lead.province} (Moçambique)</td></tr>
        <tr><td class="label">Solução Pretendida</td><td class="val" style="font-weight: 700;">${lead.serviceName}</td></tr>
        <tr><td class="label">Orçamento Estimado</td><td class="val">${lead.estimatedBudget || 'Sob avaliação técnica'}</td></tr>
        <tr><td class="label">Prazo Pretendido</td><td class="val">${lead.intendedTimeline || 'Flexível'}</td></tr>
        <tr><td class="label">Canal / Origem</td><td class="val">${lead.sourceChannel} ${lead.campaignId ? `(${lead.campaignId})` : ''}</td></tr>
        <tr><td class="label">Data de Captação</td><td class="val">${timestamp}</td></tr>
        <tr><td class="label">Estado Atual</td><td class="val"><span style="background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px; font-weight: 600;">${lead.status}</span></td></tr>
      </table>

      <h3 style="font-size: 15px; margin-bottom: 4px;">Descrição do Desafio / Requisitos:</h3>
      <div class="desc-box">${lead.challengeDescription.replace(/\n/g, '<br/>')}</div>

      <div style="margin-top: 20px; padding: 14px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; font-size: 13px; color: #065f46;">
        <strong>Ação Requerida (Learn Code):</strong> Iniciar avaliação de requisitos técnicos e preparar cadência orçamental preliminar para reunião conjunta com a YELA Corporation.
      </div>
    </div>
    <div class="footer">
      Mensagem gerada pelo serviço de integração institucional YELA Corporation — Learn Code.<br/>
      Ambiente de Simulação de Email (Compatível com Resend API).
    </div>
  </div>
</body>
</html>
      `,
    };

    // 2. Internal Notification for YELA Corporation Team
    const yelaInternalEmail: SimulatedEmail = {
      id: `email-yela-${lead.id}-${Date.now()}`,
      leadId: lead.id,
      to: 'comercial@yela.co.mz',
      recipientRole: 'YELA Corporation (Interno)',
      subject: `Registo Interno: Novo Lead [${lead.id}] — ${lead.companyName}`,
      sentAt: timestamp,
      simulatedProvider: 'Resend (Sandbox Ready)',
      htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #1e293b; background: #f8fafc; margin: 0; padding: 20px; }
    .card { background: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 10px; border: 1px solid #e2e8f0; padding: 24px; }
    .tag { display: inline-block; background: #0f172a; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="card">
    <span class="tag">YELA CRM Interno</span>
    <h2 style="margin: 12px 0 6px 0; color: #0f172a;">Novo Lead Registado no Sistema</h2>
    <p style="font-size: 14px; color: #475569;">Um novo potencial cliente demonstrou interesse numa solução através da plataforma institucional.</p>
    
    <div style="background: #f1f5f9; padding: 14px; border-radius: 6px; font-size: 14px; margin: 16px 0;">
      <strong>Empresa:</strong> ${lead.companyName}<br/>
      <strong>Contacto:</strong> ${lead.fullName} (${lead.phone} | ${lead.email})<br/>
      <strong>Província:</strong> ${lead.province}<br/>
      <strong>Solução:</strong> ${lead.serviceName}<br/>
      <strong>Origem:</strong> ${lead.sourceChannel} (${lead.foundUsVia})
    </div>

    <p style="font-size: 13px; color: #334155;">
      O lead foi encaminhado simultaneamente para a equipa técnica da <strong>Learn Code</strong> para análise e está disponível no painel administrativo interno da YELA para atualização de estado e acompanhamento de relacionamento.
    </p>
  </div>
</body>
</html>
      `,
    };

    // 3. Client Confirmation Email
    const clientConfirmationEmail: SimulatedEmail = {
      id: `email-cli-${lead.id}-${Date.now()}`,
      leadId: lead.id,
      to: lead.email,
      recipientRole: 'Potencial Cliente',
      subject: `Recebemos o seu pedido de solução — YELA Corporation [${lead.id}]`,
      sentAt: timestamp,
      simulatedProvider: 'Resend (Sandbox Ready)',
      htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background: #faf9f6; margin: 0; padding: 24px; }
    .card { background: #ffffff; max-width: 580px; margin: 0 auto; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: #1c2541; padding: 28px; text-align: left; }
    .body-content { padding: 28px; }
    .step-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0; }
    .footer { background: #f8fafc; padding: 20px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div style="color: #d97706; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">YELA Corporation</div>
      <h1 style="color: #ffffff; font-size: 22px; margin: 6px 0 0 0;">Obrigado pelo seu contacto</h1>
    </div>
    <div class="body-content">
      <p style="margin-top: 0;">Prezado(a) <strong>${lead.fullName}</strong>,</p>
      
      <p>Confirmamos a receção do seu pedido de solução para a sua organização (<strong>${lead.companyName}</strong>). O seu processo foi registado sob a referência institucional:</p>

      <div style="background: #fef3c7; border: 1px dashed #d97706; padding: 14px; text-align: center; border-radius: 8px; font-size: 18px; font-weight: 700; color: #78350f; letter-spacing: 1px;">
        ${lead.id}
      </div>

      <div class="step-box">
        <h4 style="margin: 0 0 8px 0; color: #0f172a; font-size: 14px;">Próximos passos do nosso fluxo de trabalho:</h4>
        <ol style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569;">
          <li style="margin-bottom: 6px;"><strong>Contacto de Validação:</strong> Um consultor de negócios da YELA Corporation entrará em contacto para aprofundar os objetivos e desafios da ${lead.companyName}.</li>
          <li style="margin-bottom: 6px;"><strong>Análise Técnica Conjunta:</strong> Em aliança estratégica com a nossa parceira tecnológica <strong>Learn Code</strong>, estruturamos os requisitos técnicos e o modelo de entrega ideal.</li>
          <li><strong>Apresentação de Proposta:</strong> Apresentamos uma proposta transparente, adaptada à escala do seu negócio.</li>
        </ol>
      </div>

      <p style="font-size: 14px; color: #475569;">
        Solução solicitada: <strong>${lead.serviceName}</strong><br/>
        Província de referência: <strong>${lead.province}</strong>
      </p>

      <p style="font-size: 14px; color: #475569; margin-bottom: 0;">
        Com os melhores cumprimentos,<br/>
        <strong>Equipa YELA Corporation</strong><br/>
        <span style="font-size: 13px; color: #94a3b8;">Av. Julius Nyerere, Maputo — Moçambique</span>
      </p>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} YELA Corporation. Em parceria estratégica com a Learn Code.
    </div>
  </div>
</body>
</html>
      `,
    };

    return [learnCodeEmail, yelaInternalEmail, clientConfirmationEmail];
  },
};
