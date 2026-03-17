import type { MoodMessage, ConversationMessage } from './types'

export const MOOD_CONVERSATION: MoodMessage[] = [
  {
    message: { from: 'customer', text: 'Boa tarde, gostaria de saber sobre o plano', delay: 0 },
    mood: {
      level: 'neutral',
      patience: 0.9,
      label: 'NEUTRAL',
    },
  },
  {
    message: { from: 'bot', text: 'Olá! Você pode ver os planos em nosso site: www.exemplo.com/planos', delay: 2000 },
    mood: {
      level: 'neutral',
      patience: 0.9,
      label: 'NEUTRAL',
    },
  },
  {
    message: { from: 'customer', text: 'Vocês têm um comparativo detalhado? O site não é muito claro.', delay: 3000 },
    mood: {
      level: 'neutral',
      patience: 0.8,
      label: 'NEUTRAL',
      alert: 'Style detected: RESEARCHER — prefers detailed answers',
    },
  },
  {
    message: { from: 'bot', text: 'Para informações detalhadas, recomendo falar com nossa equipe de vendas. Posso transferir?', delay: 2000 },
    mood: {
      level: 'neutral',
      patience: 0.7,
      label: 'NEUTRAL',
    },
  },
  {
    message: { from: 'customer', text: 'Já vi o site, as informações são superficiais. Preciso de dados concretos.', delay: 3000 },
    mood: {
      level: 'slight_frustration',
      patience: 0.55,
      label: 'SLIGHT FRUSTRATION',
      alert: 'Patience dropping. Customer needs specifics, not links.',
    },
  },
  {
    message: { from: 'bot', text: 'Entendo! Vou transferir você para um especialista que pode ajudar com mais detalhes.', delay: 2000 },
    mood: {
      level: 'slight_frustration',
      patience: 0.5,
      label: 'SLIGHT FRUSTRATION',
    },
  },
  {
    message: { from: 'customer', text: 'Isso não responde minha pergunta. Vocês não têm a informação aí?', delay: 2500 },
    mood: {
      level: 'frustrated',
      patience: 0.3,
      label: 'FRUSTRATED',
      alert: 'Consider switching to a detailed response approach. This customer needs specifics, not links.',
    },
  },
  {
    message: { from: 'bot', text: 'Peço desculpas. Nossa equipe de vendas terá todas as informações. O tempo de espera é de aproximadamente 5 minutos.', delay: 2000 },
    mood: {
      level: 'frustrated',
      patience: 0.2,
      label: 'FRUSTRATED',
    },
  },
  {
    message: { from: 'customer', text: 'Sério? 5 minutos para uma informação básica? Vou procurar outro fornecedor.', delay: 2000 },
    mood: {
      level: 'leaving',
      patience: 0.1,
      label: 'LEAVING',
      alert: 'CHURN SIGNAL. Customer threatening to leave. Recommend: immediate human intervention with retention authority.',
    },
  },
]

// The same conversation WITH Fluence (bot responds appropriately)
export const MOOD_CONVERSATION_FLUENCE: MoodMessage[] = [
  {
    message: { from: 'customer', text: 'Boa tarde, gostaria de saber sobre o plano', delay: 0 },
    mood: {
      level: 'neutral',
      patience: 0.9,
      label: 'NEUTRAL',
    },
  },
  {
    message: { from: 'bot_fluence', text: 'Boa tarde! Claro, posso ajudar. Temos 3 planos:\n\n• Starter (R$99): 5 usuários, 5K API calls\n• Pro (R$290): 20 usuários, 50K API calls, relatórios\n• Enterprise (R$890): ilimitado, SLA 24/7, gerente dedicado\n\nQual se aproxima mais do que você precisa?', delay: 2500 },
    mood: {
      level: 'neutral',
      patience: 0.9,
      label: 'NEUTRAL',
    },
  },
  {
    message: { from: 'customer', text: 'Vocês têm um comparativo detalhado? Quero entender as diferenças em API e suporte.', delay: 3000 },
    mood: {
      level: 'neutral',
      patience: 0.85,
      label: 'NEUTRAL',
      alert: 'Style detected: RESEARCHER — adapting to detailed responses',
    },
  },
  {
    message: { from: 'bot_fluence', text: 'Claro! Comparativo completo:\n\n📊 API: Starter 5K → Pro 50K → Enterprise 500K\n📞 Suporte: Starter 8h email → Pro 12h chat → Enterprise 24/7 + SLA 1h\n🔧 Integrações: 3 → 10 → ilimitado\n📈 Analytics: básico → avançado → BI exports\n⏱️ SLA: 99% → 99.5% → 99.99%\n\nPara qual tamanho de empresa você está buscando? Posso recomendar o ideal.', delay: 3000 },
    mood: {
      level: 'neutral',
      patience: 0.9,
      label: 'NEUTRAL',
    },
  },
  {
    message: { from: 'customer', text: 'Excelente! Somos 12 pessoas e fazemos cerca de 30K chamadas/mês. Qual recomenda?', delay: 3000 },
    mood: {
      level: 'neutral',
      patience: 0.95,
      label: 'SATISFIED',
    },
  },
]

export const CROSS_CHANNEL_INSTAGRAM: ConversationMessage[] = [
  { from: 'customer', text: 'Oi! Vi o anúncio de vocês. Quero saber sobre garantia do produto X.', delay: 0 },
  { from: 'bot', text: 'Olá! O produto X tem garantia de 12 meses. Posso ajudar com mais alguma coisa?', delay: 2000 },
  { from: 'customer', text: 'Mas e se der defeito nos primeiros 30 dias? Troca direto ou manda pra assistência?', delay: 3000 },
  { from: 'system', text: 'Conversation ended — customer left Instagram.', delay: 2000 },
]

export const CROSS_CHANNEL_WHATSAPP_GENERIC: ConversationMessage[] = [
  { from: 'customer', text: 'Oi, quero saber sobre a garantia', delay: 0 },
  { from: 'bot', text: 'Olá! Bem-vindo ao nosso atendimento. 😊 Sobre qual produto você gostaria de saber?', delay: 2000 },
  { from: 'customer', text: 'Produto X. Já perguntei ontem no Instagram.', delay: 2000 },
  { from: 'bot', text: 'Peço desculpas, não tenho acesso ao histórico do Instagram. Pode repetir sua dúvida?', delay: 2000 },
  { from: 'customer', text: 'Sério? Tenho que repetir tudo? Quero saber se nos primeiros 30 dias é troca direta.', delay: 2000 },
  { from: 'system', text: 'Customer frustrated. Had to repeat entire context.', delay: 1000 },
]

export const CROSS_CHANNEL_WHATSAPP_FLUENCE: ConversationMessage[] = [
  { from: 'customer', text: 'Oi, quero saber sobre a garantia', delay: 0 },
  { from: 'bot_fluence', text: 'Oi! Vi que você perguntou ontem no Instagram sobre a garantia do Produto X — especificamente sobre o que acontece nos primeiros 30 dias, certo? Nos primeiros 30 dias, a troca é direta: você envia o produto e recebemos um novo em até 3 dias úteis, sem custo. Quer que eu envie o passo a passo?', delay: 3000 },
  { from: 'customer', text: 'Exatamente isso! Sim, manda por favor.', delay: 2000 },
  { from: 'system', text: 'Resolved in 2 messages. Cross-channel continuity via Fluence.', delay: 1000 },
]
