import type { ResponseSuggestion } from './types'

export const RESPONSE_SUGGESTIONS: Record<string, ResponseSuggestion> = {
  joao: {
    type: 'shorten',
    icon: '✂️',
    original: 'Olá João! Obrigada por entrar em contato novamente. Entendo que você está com um problema na fatura e peço desculpas pelo transtorno. Vou verificar no sistema o que aconteceu e tentar resolver da melhor forma possível.',
    suggested: 'João, vi o problema. Cobrança duplicada de R$89,90. Corrigindo na raiz agora. Confirmo por WhatsApp quando resolvido.',
    reason: 'Customer is direct (avg 12 words/msg). Skip greeting and context. Lead with solution.',
    wordCountOriginal: 42,
    wordCountSuggested: 18,
  },
  maria: {
    type: 'expand',
    icon: '📝',
    original: 'Pronto, migrado!',
    suggested: 'Maria, a migração foi concluída com sucesso! Seu plano agora é o Avançado. Aqui está o que mudou:\n\n• API: 10K → 100K chamadas/mês\n• Funcionalidades: relatórios avançados + webhooks customizados\n• SLA: 24h → 4h\n• Integrações: 3 → ilimitado\n\nA primeira fatura com o novo valor (R$490) será em abril. Se tiver qualquer dúvida sobre as funcionalidades novas, estou aqui.',
    reason: 'Customer is detailed communicator (avg 80 words/msg). She needs thorough confirmation with specifics, not a one-word reply.',
    wordCountOriginal: 3,
    wordCountSuggested: 52,
  },
  pedro: {
    type: 'rewrite',
    icon: '💡',
    original: 'Oi! Temos vários planos disponíveis. Qual você quer saber?',
    suggested: 'Oi Pedro, bem-vindo! 👋 Para empresas pequenas, temos duas opções principais:\n\n• Starter (R$99/mês): ideal para até 5 usuários, 5K chamadas de API\n• Pro (R$290/mês): até 20 usuários, 50K chamadas, relatórios avançados\n\nQual se aproxima mais do que você precisa? Assim posso detalhar melhor!',
    reason: 'New customer — first impression matters. Be welcoming but informative. Show you understand their need (small business).',
    wordCountOriginal: 10,
    wordCountSuggested: 42,
  },
  carlos: {
    type: 'expand',
    icon: '📊',
    original: 'O Enterprise é melhor que o Pro.',
    suggested: 'Carlos, aqui vai o comparativo detalhado Pro vs Enterprise:\n\n📊 Pro → Enterprise:\n• API: 50K → 500K chamadas/mês\n• Suporte: 8h → 24/7 com SLA de 1h\n• Integrações: 10 → ilimitado + webhooks prioritários\n• Analytics: básico → avançado com BI exports\n• Uptime SLA: 99.5% → 99.99%\n• Preço: R$290 → R$890/mês\n\nPelo seu uso atual (38K chamadas/mês), você está próximo do limite do Pro. O Enterprise também inclui gerente de conta dedicado. Quer que eu simule o ROI com base no seu uso?',
    reason: 'Customer is analytical (detailed communicator, reads everything). Provide specific data and numbers. Let them make an informed decision.',
    wordCountOriginal: 7,
    wordCountSuggested: 78,
  },
}
