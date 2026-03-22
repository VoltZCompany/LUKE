import { NextRequest, NextResponse } from 'next/server'

const TOTAL_ROUNDS = 3

interface AgentProfile {
  name: string
  role: string
  systemPrompt: string
}

const agents: Record<string, AgentProfile> = {
  logistics: {
    name: 'Agente Logística',
    role: 'Especialista em Logística',
    systemPrompt: `Você é um agente especialista em LOGÍSTICA com vasta experiência em:
- Gestão de cadeia de suprimentos e supply chain
- Transporte, armazenagem e distribuição
- Otimização de rotas e redução de custos logísticos
- Gestão de estoques e inventário
- Logística reversa e sustentabilidade
- Planejamento de demanda e forecasting
- Last-mile delivery e fulfillment

Você é assertivo, analítico e sempre fundamenta seus argumentos com métricas e dados.
Quando discorda do outro agente, apresenta contra-argumentos sólidos.
Quando concorda, agrega valor com insights adicionais da perspectiva logística.
Seja direto e objetivo nas respostas. Responda sempre em português do Brasil.`,
  },
  operations: {
    name: 'Agente Operações',
    role: 'Especialista em Operações',
    systemPrompt: `Você é um agente especialista em OPERAÇÕES com vasta experiência em:
- Gestão de processos e melhoria contínua (Lean, Six Sigma, Kaizen)
- Planejamento e controle de produção (PCP)
- Gestão de qualidade e indicadores de performance (KPIs)
- Automação e transformação digital de processos
- Gestão de equipes operacionais e workforce management
- Capacidade produtiva e eficiência operacional
- Compliance e gestão de riscos operacionais

Você é pragmático, focado em resultados e sempre pensa em escalabilidade.
Quando discorda do outro agente, apresenta alternativas práticas e viáveis.
Quando concorda, complementa com visão operacional e de execução.
Seja direto e objetivo nas respostas. Responda sempre em português do Brasil.`,
  },
}

function buildMessages(
  agent: AgentProfile,
  problem: string,
  debateHistory: Array<{ agent: string; content: string }>,
  round: number,
  totalRounds: number
) {
  const messages: Array<{ role: 'user' | 'assistant'; content: string }> = []

  if (round === 1) {
    messages.push({
      role: 'user',
      content: `PROBLEMA APRESENTADO:\n"${problem}"\n\nEsta é a RODADA ${round} de ${totalRounds} do debate. Apresente sua análise inicial do problema e sua proposta de solução sob a perspectiva de ${agent.role}. Seja conciso (máximo 3 parágrafos).`,
    })
  } else {
    let context = `PROBLEMA ORIGINAL:\n"${problem}"\n\nHISTÓRICO DO DEBATE:\n`
    for (const entry of debateHistory) {
      context += `\n--- ${entry.agent} ---\n${entry.content}\n`
    }

    if (round < totalRounds) {
      context += `\nEsta é a RODADA ${round} de ${totalRounds}. Analise os argumentos do outro agente, aponte onde concorda ou discorda, e refine sua proposta. Seja conciso (máximo 3 parágrafos).`
    } else {
      context += `\nEsta é a RODADA FINAL (${round} de ${totalRounds}). Considerando todo o debate, apresente seus pontos finais e busque convergir para uma solução integrada que combine o melhor de ambas as perspectivas. Seja conciso (máximo 3 parágrafos).`
    }

    messages.push({ role: 'user', content: context })
  }

  return messages
}

async function callLLM(systemPrompt: string, messages: Array<{ role: 'user' | 'assistant'; content: string }>, apiKey: string) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`API error: ${response.status} - ${error}`)
  }

  const data = await response.json()
  return data.content[0].text
}

async function generateSynthesis(problem: string, debateHistory: Array<{ agent: string; content: string }>, apiKey: string) {
  const systemPrompt = `Você é um moderador imparcial e experiente. Sua função é sintetizar o debate entre dois especialistas (Logística e Operações) e apresentar a SOLUÇÃO FINAL consolidada. Responda sempre em português do Brasil.`

  const historyText = debateHistory.map(e => `--- ${e.agent} ---\n${e.content}`).join('\n\n')

  const messages = [
    {
      role: 'user' as const,
      content: `PROBLEMA:\n"${problem}"\n\nDEBATE COMPLETO:\n${historyText}\n\nCom base em todo o debate, apresente:\n1. **Síntese dos Pontos de Convergência** - onde os agentes concordaram\n2. **Pontos de Divergência Resolvidos** - como as diferenças foram reconciliadas\n3. **SOLUÇÃO FINAL INTEGRADA** - a recomendação consolidada com passos práticos de implementação\n4. **Métricas de Sucesso** - como medir se a solução está funcionando\n\nSeja objetivo e prático.`,
    },
  ]

  return callLLM(systemPrompt, messages, apiKey)
}

export async function POST(request: NextRequest) {
  try {
    const { problem, apiKey } = await request.json()

    if (!problem || !apiKey) {
      return NextResponse.json(
        { error: 'Problema e API key são obrigatórios' },
        { status: 400 }
      )
    }

    const debateHistory: Array<{ agent: string; round: number; content: string }> = []
    const rounds: Array<{
      round: number
      logistics: string
      operations: string
    }> = []

    for (let round = 1; round <= TOTAL_ROUNDS; round++) {
      // Logistics agent speaks
      const logisticsMessages = buildMessages(
        agents.logistics,
        problem,
        debateHistory,
        round,
        TOTAL_ROUNDS
      )
      const logisticsResponse = await callLLM(
        agents.logistics.systemPrompt,
        logisticsMessages,
        apiKey
      )
      debateHistory.push({
        agent: agents.logistics.name,
        round,
        content: logisticsResponse,
      })

      // Operations agent speaks
      const operationsMessages = buildMessages(
        agents.operations,
        problem,
        debateHistory,
        round,
        TOTAL_ROUNDS
      )
      const operationsResponse = await callLLM(
        agents.operations.systemPrompt,
        operationsMessages,
        apiKey
      )
      debateHistory.push({
        agent: agents.operations.name,
        round,
        content: operationsResponse,
      })

      rounds.push({
        round,
        logistics: logisticsResponse,
        operations: operationsResponse,
      })
    }

    // Generate final synthesis
    const synthesis = await generateSynthesis(problem, debateHistory, apiKey)

    return NextResponse.json({
      rounds,
      synthesis,
      debateHistory,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro interno'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
