import type { ConversationMessage } from './types'

// ─── JOÃO — Conversation 1 (WITHOUT Fluence) ─────────────────────────────
export const joaoConv1Generic: ConversationMessage[] = [
  { from: 'customer', text: 'Minha fatura veio errada', delay: 0 },
  { from: 'bot', text: 'Olá! Bem-vindo ao nosso atendimento. 😊 Para verificar sua fatura, por favor informe o número da sua conta e o CPF do titular.', delay: 2000 },
  { from: 'customer', text: 'Quero falar com atendente', delay: 3000 },
  { from: 'bot', text: 'Entendo! Vou transferir você para um de nossos especialistas. Tempo estimado de espera: 5 minutos. Agradecemos sua paciência! 🙏', delay: 2000 },
  { from: 'system', text: '⏳ Waiting for agent... (5 min)', delay: 5000 },
  { from: 'agent', text: 'Olá João, sou a Maria. Como posso ajudar?', delay: 2000 },
  { from: 'customer', text: 'Fatura veio com cobrança duplicada de R$89,90', delay: 2000 },
  { from: 'agent', text: 'Vou verificar no sistema... Um momento.', delay: 3000 },
  { from: 'agent', text: 'Encontrei o problema. Vou gerar um crédito de R$89,90 na sua próxima fatura. Algo mais?', delay: 3000 },
  { from: 'customer', text: 'Não, obrigado', delay: 1500 },
  { from: 'system', text: 'Conversation closed. CSAT: ⭐⭐⭐☆☆ (3/5)', delay: 2000 },
]

// ─── JOÃO — Conversation 1 (WITH Fluence) ────────────────────────────────
export const joaoConv1Fluence: ConversationMessage[] = [
  { from: 'customer', text: 'Minha fatura veio errada', delay: 0 },
  { from: 'system', text: '🧠 Fluence: Communication style: DIRECT. Adapting response — solution-first, no filler.', delay: 500 },
  { from: 'bot_fluence', text: 'João, identifiquei uma cobrança duplicada de R$89,90 na sua fatura deste mês. Já estou gerando o estorno. Quer que eu aplique como crédito na próxima fatura ou reembolso direto via Pix?', delay: 2500 },
  { from: 'customer', text: 'Pix', delay: 1000 },
  { from: 'bot_fluence', text: 'Pronto. Reembolso de R$89,90 via Pix será processado em até 2h. Você receberá confirmação aqui no WhatsApp. Também abri uma verificação automática para garantir que não aconteça no próximo ciclo.', delay: 2500 },
  { from: 'customer', text: 'Ótimo, obrigado', delay: 1500 },
  { from: 'system', text: 'Resolved by bot — no escalation needed. CSAT: ⭐⭐⭐⭐⭐ (5/5)', delay: 2000 },
]

// ─── JOÃO — Conversation 2 (WITHOUT Fluence, repeat) ─────────────────────
export const joaoConv2Generic: ConversationMessage[] = [
  { from: 'customer', text: 'Fatura errada DE NOVO', delay: 0 },
  { from: 'bot', text: 'Olá! Bem-vindo ao nosso atendimento. 😊 Para verificar sua fatura, por favor informe o número da sua conta e o CPF do titular.', delay: 2000 },
  { from: 'customer', text: 'Não acredito que estou recebendo a MESMA mensagem. ATENDENTE. AGORA.', delay: 1500 },
  { from: 'bot', text: 'Entendo sua frustração! Vou transferir você para um especialista. Tempo estimado: 3 minutos.', delay: 2000 },
  { from: 'customer', text: '3 MINUTOS??? Isso é um absurdo', delay: 1000 },
  { from: 'system', text: '⏳ Waiting for agent...', delay: 4000 },
  { from: 'agent', text: 'Olá, sou o Carlos. Como posso ajudar?', delay: 2000 },
  { from: 'customer', text: 'COBRANÇA DUPLICADA DE NOVO. R$89,90. Já liguei semana passada sobre isso.', delay: 1500 },
  { from: 'agent', text: 'Peço desculpas pelo inconveniente. Vou verificar...', delay: 3000 },
  { from: 'agent', text: 'Confirmado, houve nova duplicação. Vou gerar outro crédito.', delay: 3000 },
  { from: 'customer', text: 'Outro crédito? Isso não resolve. Vai acontecer de novo.', delay: 2000 },
  { from: 'agent', text: 'Entendo sua preocupação. Vou registrar uma reclamação formal para o setor técnico investigar.', delay: 3000 },
  { from: 'customer', text: 'Tá', delay: 1000 },
  { from: 'system', text: 'Conversation closed. CSAT: ⭐⭐☆☆☆ (2/5) ⬇️', delay: 2000 },
]

// ─── JOÃO — Conversation 3 (WITH Fluence) ────────────────────────────────
export const joaoConv3Fluence: ConversationMessage[] = [
  { from: 'customer', text: 'A cobrança duplicada apareceu de novo', delay: 0 },
  { from: 'bot_fluence', text: 'João, vejo que esse é o terceiro contato sobre cobrança duplicada. Vou encaminhar direto para o especialista de faturamento que vai resolver de forma definitiva. Um momento.', delay: 2500 },
  { from: 'system', text: '🧠 Fluence: Immediate escalation. Patience < 0.2. Churn risk: CRITICAL.', delay: 500 },
  { from: 'system', text: '👤 Agent connected in 20 seconds (high priority)', delay: 1500 },
  { from: 'agent_briefed', text: 'João, já tenho todo o histórico aqui. Vejo que a cobrança duplicada de R$89,90 apareceu em 3 faturas consecutivas. Isso é um bug no nosso sistema de faturamento, não um erro manual. Vou corrigir na raiz agora e confirmar por WhatsApp quando estiver resolvido. Você não vai precisar ligar de novo.', delay: 4000 },
  { from: 'customer', text: 'Finalmente alguém que entende. Obrigado.', delay: 2000 },
  { from: 'agent_briefed', text: 'De nada, João. Te mando uma confirmação aqui no WhatsApp em até 2 horas. Qualquer coisa, é só mandar mensagem.', delay: 3000 },
  { from: 'system', text: 'Conversation closed. CSAT: ⭐⭐⭐⭐☆ (4/5) ⬆️⬆️', delay: 2000 },
]

// ─── JOÃO — Conversation 3 WITHOUT Fluence (for split comparison) ────────
export const joaoConv3Generic: ConversationMessage[] = [
  { from: 'customer', text: 'A cobrança duplicada apareceu de novo', delay: 0 },
  { from: 'bot', text: 'Olá! Bem-vindo ao nosso atendimento. 😊 Para verificar sua fatura, por favor informe o número da sua conta e o CPF do titular.', delay: 2000 },
  { from: 'customer', text: 'NÃO. ATENDENTE. AGORA. TERCEIRA VEZ COM ESSE PROBLEMA.', delay: 1500 },
  { from: 'bot', text: 'Entendo! Vou transferir você para um de nossos especialistas. Tempo estimado de espera: 5 minutos.', delay: 2000 },
  { from: 'customer', text: 'CINCO MINUTOS?? VOU CANCELAR TUDO', delay: 1000 },
  { from: 'system', text: '⏳ Waiting for agent... (5 min)', delay: 5000 },
  { from: 'agent', text: 'Olá, boa tarde! Em que posso ajudar?', delay: 2000 },
  { from: 'customer', text: 'É A TERCEIRA VEZ QUE LIGO. Cobrança duplicada de R$89,90. NINGUÉM RESOLVE.', delay: 1500 },
  { from: 'agent', text: 'Sinto muito pelo transtorno. Deixa eu verificar seu histórico...', delay: 3000 },
  { from: 'agent', text: 'Vou gerar um crédito e abrir um chamado para o setor responsável.', delay: 3000 },
  { from: 'customer', text: 'Mais um crédito? Vocês fazem isso toda vez e não resolve nada. Quero cancelar.', delay: 2000 },
  { from: 'agent', text: 'Entendo sua frustração. Vou encaminhar para o setor de retenção...', delay: 2000 },
  { from: 'customer', text: 'Esquece. Vou procurar outro serviço.', delay: 1500 },
  { from: 'system', text: 'Conversation closed. CSAT: ⭐☆☆☆☆ (1/5) ⬇️⬇️', delay: 2000 },
]

// ─── MARIA — Generic (WITHOUT Fluence) ───────────────────────────────────
export const mariaGeneric: ConversationMessage[] = [
  { from: 'customer', text: 'Boa tarde! Estou com uma dúvida sobre a migração do meu plano. Atualmente tenho o plano Básico e gostaria de entender melhor as diferenças para o plano Avançado, especialmente em relação aos limites de uso e funcionalidades extras. Vocês teriam um comparativo detalhado?', delay: 0 },
  { from: 'bot', text: 'Olá! Você pode ver os planos em nosso site: www.exemplo.com/planos', delay: 2000 },
  { from: 'customer', text: 'Já vi o site, mas as informações são superficiais. Por exemplo, o plano Avançado menciona "funcionalidades premium" mas não especifica quais são. E sobre os limites de API, o site diz "ilimitado" mas imagino que tenha fair use, certo? Gostaria de detalhes.', delay: 4000 },
  { from: 'bot', text: 'Para informações detalhadas, recomendo falar com nossa equipe de vendas. Posso transferir?', delay: 2000 },
  { from: 'customer', text: 'Preferia resolver por aqui mesmo, se possível...', delay: 3000 },
  { from: 'bot', text: 'Entendo! Infelizmente não tenho acesso a essas informações detalhadas. Vou transferir para vendas. Tempo estimado: 3 minutos.', delay: 2000 },
  { from: 'system', text: '⏳ Waiting for sales team...', delay: 4000 },
  { from: 'agent', text: 'Olá, aqui é do comercial. Como posso ajudar?', delay: 2000 },
  { from: 'customer', text: 'Gostaria de um comparativo detalhado entre o plano Básico e Avançado...', delay: 3000 },
  { from: 'system', text: 'Customer repeats entire question. Time wasted: 8 min.', delay: 2000 },
  { from: 'system', text: 'Conversation closed. CSAT: ⭐⭐⭐☆☆ (3/5)', delay: 2000 },
]

// ─── MARIA — WITH Fluence ────────────────────────────────────────────────
export const mariaFluence: ConversationMessage[] = [
  { from: 'customer', text: 'Boa tarde! Estou com uma dúvida sobre a migração do meu plano. Atualmente tenho o plano Básico e gostaria de entender melhor as diferenças para o plano Avançado, especialmente em relação aos limites de uso e funcionalidades extras. Vocês teriam um comparativo detalhado?', delay: 0 },
  { from: 'bot_fluence', text: 'Boa tarde! Ótima pergunta. Vou detalhar as diferenças principais:\n\n📊 Plano Básico vs Avançado:\n• API: 10K chamadas/mês → 100K (fair use: média mensal, não hard limit)\n• Funcionalidades premium: relatórios avançados, webhooks customizados e suporte prioritário\n• Integrações: 3 plataformas → ilimitado\n• SLA: 24h → 4h\n\nPelo seu perfil de uso atual, você está em 7.2K chamadas/mês. O Avançado te daria margem confortável para crescer. Quer que eu simule como ficaria o custo com base no seu uso real?', delay: 4000 },
  { from: 'customer', text: 'Excelente! Sim, gostaria da simulação. E sobre a migração em si, tem algum período de carência ou downtime?', delay: 3000 },
  { from: 'bot_fluence', text: 'Zero downtime — a migração é instantânea. Sobre carência: não há. Você pode voltar ao Básico a qualquer momento nos primeiros 30 dias se não gostar.\n\nSimulação com base nos seus últimos 3 meses:\n• Uso médio: 7.2K chamadas\n• Projeção com crescimento: ~12K em 3 meses\n• Custo Básico atual: R$290/mês\n• Custo Avançado: R$490/mês (+R$200 para 10x mais recursos)\n\nConsiderando que você já está perto do limite do Básico, a migração evitaria interrupções e te daria acesso aos webhooks que vi que você tentou configurar na semana passada. 😊', delay: 5000 },
  { from: 'customer', text: 'Perfeito, vou migrar. Podem fazer agora?', delay: 2000 },
  { from: 'bot_fluence', text: 'Migração iniciada! Você receberá um e-mail de confirmação em até 5 minutos com todos os detalhes do novo plano. Bem-vinda ao Avançado! 🚀', delay: 2000 },
  { from: 'system', text: 'Resolved by bot — no human needed. CSAT: ⭐⭐⭐⭐⭐ (5/5)', delay: 2000 },
]

// ─── ANA — Generic (WITHOUT Fluence) ─────────────────────────────────────
export const anaGeneric: ConversationMessage[] = [
  { from: 'customer', text: '🎤 [Voice message — 45s]', delay: 0, isAudio: true },
  { from: 'system', text: 'Audio: "Oi, tudo bem? Então, eu tô com um problema aqui... tentei fazer o pagamento do boleto que venceu ontem mas o app não deixa, fica dando erro. Já tentei três vezes. Não sei se é porque venceu ou se é bug. Podem me ajudar?"', delay: 1000 },
  { from: 'bot', text: 'Olá! Para verificar problemas com pagamento, por favor informe o número do boleto e a data de vencimento.', delay: 2000 },
  { from: 'customer', text: '🎤 [Voice message — 30s]', delay: 3000, isAudio: true },
  { from: 'system', text: 'Audio: "Gente, eu não tenho o número do boleto aqui agora... tá no e-mail. Mas enfim, é o boleto que vence todo dia 15. Não tem como vocês verem pelo meu cadastro?"', delay: 1000 },
  { from: 'bot', text: 'Infelizmente preciso do número do boleto para verificar. Você pode encontrá-lo no e-mail de cobrança ou na área "Meus Boletos" do aplicativo.', delay: 2000 },
  { from: 'customer', text: '🎤 [Voice message — 20s]', delay: 3000, isAudio: true },
  { from: 'system', text: 'Audio: "Tá... vou tentar achar. Mas olha, se eu mandar o número, vocês resolvem por aqui mesmo?"', delay: 1000 },
  { from: 'bot', text: 'Sim! Envie o número do boleto e verificaremos o status para você. 😊', delay: 2000 },
  { from: 'system', text: 'Communication mismatch: customer sends audio, bot responds with text. No acknowledgment of voice preference.', delay: 1000 },
  { from: 'system', text: 'Conversation closed. CSAT: ⭐⭐☆☆☆ (2/5)', delay: 2000 },
]

// ─── ANA — WITH Fluence ──────────────────────────────────────────────────
export const anaFluence: ConversationMessage[] = [
  { from: 'customer', text: '🎤 [Voice message — 45s]', delay: 0, isAudio: true },
  { from: 'system', text: 'Audio: "Oi, tudo bem? Então, eu tô com um problema aqui... tentei fazer o pagamento do boleto que venceu ontem mas o app não deixa, fica dando erro. Já tentei três vezes."', delay: 1000 },
  { from: 'system', text: '🧠 Fluence: Audio preference detected. Adapting response modality.', delay: 500 },
  { from: 'bot_fluence', text: '🎤 [Voice response — 25s]\n\n"Oi Ana! Entendi, o boleto do dia 15 venceu ontem e tá dando erro no app, né? Isso acontece porque depois do vencimento o código muda. Já gerei um novo boleto atualizado com a multa de R$2,30. Vou mandar o link aqui pra você pagar direto. Se preferir, posso mandar por Pix também!"', delay: 3000, isAudio: true },
  { from: 'customer', text: '🎤 [Voice message — 10s]', delay: 2000, isAudio: true },
  { from: 'system', text: 'Audio: "Ai que ótimo! Manda o Pix que é mais fácil!"', delay: 500 },
  { from: 'bot_fluence', text: '🎤 [Voice response — 12s]\n\n"Pronto! Mandei a chave Pix aqui embaixo. É só copiar e pagar no seu banco. Valor: R$192,30 com a multa. Assim que você pagar, eu confirmo aqui pra você, tá?"', delay: 2000, isAudio: true },
  { from: 'customer', text: '🎤 [Voice message — 5s]', delay: 2000, isAudio: true },
  { from: 'system', text: 'Audio: "Perfeito, obrigada!"', delay: 500 },
  { from: 'system', text: 'Resolved by bot with voice adaptation. CSAT: ⭐⭐⭐⭐⭐ (5/5)', delay: 2000 },
]
