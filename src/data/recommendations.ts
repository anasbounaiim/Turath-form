import { OILS, QUESTIONS, OilId } from './questions'

export type Answers = Record<string, string>

export interface RecommendationResult {
  oils: OilId[]
  avoidedOil?: OilId
  scores: Record<OilId, number>
  routineTitle: string
  routineSteps: string[]
}

const DEFAULT_SCORES: Record<OilId, number> = {
  argan: 0,
  nigelle: 0,
  amande: 0,
  coco: 0,
  sesame: 0,
}

const QUESTION_LOOKUP = QUESTIONS.flatMap((question) => question.options)

export function calculateRecommendations(answers: Answers): RecommendationResult {
  const scores = { ...DEFAULT_SCORES }
  let avoidedOil: OilId | undefined

  Object.values(answers).forEach((optionId) => {
    const option = QUESTION_LOOKUP.find((item) => item.id === optionId)

    if (option?.avoidsOil) {
      avoidedOil = option.avoidsOil
      return
    }

    Object.entries(option?.scores ?? {}).forEach(([oilId, score]) => {
      scores[oilId as OilId] += score ?? 0
    })
  })

  const sortedOils = (Object.entries(scores) as [OilId, number][])
    .filter(([oilId]) => oilId !== avoidedOil)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .map(([oilId]) => oilId)

  const preference = answers.recommendationStyle
  const count = preference === 'single' ? 1 : preference === 'two' ? 2 : 3
  const oils = sortedOils.slice(0, count)

  return {
    oils,
    avoidedOil,
    scores,
    ...buildRoutine(oils, preference),
  }
}

function buildRoutine(oils: OilId[], preference?: string) {
  if (preference === 'single') {
    return {
      routineTitle: 'Routine simple / روتين بسيط',
      routineSteps: [
        `Commence avec ${OILS[oils[0]].name} - ${OILS[oils[0]].arabicName}, 3 à 4 fois par semaine.`,
        'Applique une petite quantité / ديري كمية قليلة، وراقبي النتيجة بهدوء.',
      ],
    }
  }

  if (preference === 'two') {
    return {
      routineTitle: 'Duo complémentaire / جوج زيوت مكملين',
      routineSteps: [
        `Utilise ${OILS[oils[0]].name} comme base / استعملي ${OILS[oils[0]].arabicName} كأساس.`,
        `Ajoute ${OILS[oils[1]].name} selon le besoin / زيدي ${OILS[oils[1]].arabicName} ملي تحتاجي عناية أكثر.`,
      ],
    }
  }

  return {
    routineTitle: 'Routine complète / روتين كامل',
    routineSteps: [
      `Base quotidienne / الأساس اليومي: ${OILS[oils[0]].name}.`,
      `Soin ciblé / عناية مركزة: ${OILS[oils[1]].name}.`,
      `Soin profond / عناية عميقة: ${OILS[oils[2]].name}, 1 à 2 fois par semaine.`,
    ],
  }
}
