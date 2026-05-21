export type OilId = 'argan' | 'nigelle' | 'amande' | 'coco' | 'sesame'

export interface Option {
  id: string
  label: string
  scores?: Partial<Record<OilId, number>>
  avoidsOil?: OilId
}

export interface Question {
  id: string
  text: string
  options: Option[]
}

export interface Oil {
  id: OilId
  name: string
  arabicName: string
  subtitle: string
  description: string
  explanation: string
  routineTips: string[]
  texture: 'legere' | 'riche'
}

export const QUESTIONS: Question[] = [
  {
    id: 'usage',
    text: "Tu veux utiliser l'huile pour quoi ? / فين بغيتي تستعملي الزيت؟",
    options: [
      { id: 'skin', label: 'Peau / البشرة', scores: { argan: 5, nigelle: 5, amande: 5, sesame: 5 } },
      { id: 'hair', label: 'Cheveux / الشعر', scores: { argan: 5, amande: 5, coco: 5, sesame: 3, nigelle: 2 } },
      { id: 'both', label: 'Peau + cheveux / البشرة + الشعر', scores: { argan: 8, amande: 8, sesame: 7, coco: 6, nigelle: 6 } },
    ],
  },
  {
    id: 'skinType',
    text: 'Ton type de peau ? / شنو نوع البشرة ديالك؟',
    options: [
      { id: 'dry', label: 'Sèche / ناشفة', scores: { argan: 9, amande: 8, sesame: 7, coco: 2 } },
      { id: 'oily', label: 'Grasse / دهنية', scores: { nigelle: 9, sesame: 7, amande: 2, argan: 1, coco: -4 } },
      { id: 'mixed', label: 'Mixte / مختلطة', scores: { nigelle: 6, sesame: 5, argan: 4, amande: 4, coco: -1 } },
      { id: 'sensitive', label: 'Sensible / حساسة', scores: { amande: 10, sesame: 9, argan: 3, nigelle: 1, coco: -3 } },
      { id: 'normal', label: 'Normale / عادية', scores: { argan: 5, amande: 5, sesame: 5, nigelle: 4, coco: 3 } },
      { id: 'unknown_skin', label: 'Je ne sais pas / ما عرفتاش', scores: { amande: 4, sesame: 4, argan: 3, nigelle: 3, coco: 2 } },
    ],
  },
  {
    id: 'skinNeed',
    text: 'Ton besoin principal pour la peau ? / شنو أهم حاجة محتاجاها البشرة؟',
    options: [
      { id: 'hydration', label: 'Hydratation / ترطيب', scores: { argan: 9, amande: 8, sesame: 7, coco: 2 } },
      { id: 'imperfections', label: 'Boutons / حبوب', scores: { nigelle: 11, sesame: 4, amande: 2, argan: 1, coco: -4 } },
      { id: 'dull_skin', label: 'Teint terne / بشرة باهتة', scores: { argan: 9, nigelle: 7, sesame: 4, amande: 3 } },
      { id: 'redness', label: 'Rougeurs / احمرار', scores: { amande: 10, sesame: 9, argan: 3, nigelle: 1, coco: -3 } },
      { id: 'massage', label: 'Massage / مساج ونعومة', scores: { sesame: 10, amande: 8, argan: 4, coco: 2 } },
      { id: 'no_skin_need', label: 'Aucun besoin peau / ما كاين حتى احتياج', scores: { argan: 1, amande: 1, sesame: 1, nigelle: 1, coco: 1 } },
    ],
  },
  {
    id: 'hairType',
    text: 'Ton type de cheveux ? / شنو نوع الشعر ديالك؟',
    options: [
      { id: 'dry_hair', label: 'Secs / ناشف', scores: { coco: 10, argan: 9, amande: 8, sesame: 3 } },
      { id: 'oily_hair', label: 'Gras / دهني', scores: { nigelle: 9, sesame: 7, amande: 2, argan: 1, coco: -4 } },
      { id: 'curly_hair', label: 'Bouclés / كيرلي', scores: { coco: 10, amande: 8, argan: 8, sesame: 3 } },
      { id: 'brittle_hair', label: 'Cassants / كيتكسر', scores: { coco: 9, argan: 9, amande: 5, sesame: 3 } },
      { id: 'normal_hair', label: 'Normaux / عادي', scores: { argan: 5, amande: 5, sesame: 4, coco: 4, nigelle: 3 } },
      { id: 'unknown_hair', label: 'Je ne sais pas / ما عرفتاش', scores: { argan: 3, amande: 3, sesame: 3, nigelle: 3, coco: 3 } },
    ],
  },
  {
    id: 'hairNeed',
    text: 'Ton besoin principal pour les cheveux ? / شنو أهم حاجة محتاجها الشعر؟',
    options: [
      { id: 'nourish', label: 'Nourrir / تغذية', scores: { coco: 10, argan: 8, amande: 8, sesame: 3 } },
      { id: 'shine', label: 'Brillance / لمعان', scores: { argan: 8, coco: 6, amande: 5, sesame: 4, nigelle: 3 } },
      { id: 'breakage', label: 'Réduire la casse / نقص التكسر', scores: { coco: 9, argan: 9, amande: 5, sesame: 3 } },
      { id: 'frizz', label: 'Réduire le frizz / نقص الهيشان', scores: { coco: 9, amande: 8, argan: 8, sesame: 3 } },
      { id: 'protect', label: 'Protection / حماية', scores: { coco: 7, argan: 7, amande: 5, sesame: 4, nigelle: 2 } },
      { id: 'no_hair_need', label: 'Aucun besoin cheveux / ما كاين حتى احتياج', scores: { argan: 1, amande: 1, sesame: 1, nigelle: 1, coco: 1 } },
    ],
  },
  {
    id: 'texture',
    text: 'Tu préfères quelle texture ? / شنو القوام اللي كيعجبك؟',
    options: [
      { id: 'light', label: 'Légère / خفيفة', scores: { nigelle: 8, sesame: 8, amande: 3, argan: 1, coco: -4 } },
      { id: 'rich', label: 'Riche / غنية', scores: { argan: 8, coco: 8, amande: 7, sesame: 1, nigelle: -1 } },
      { id: 'any_texture', label: 'Peu importe / كيفما كانت', scores: { argan: 3, nigelle: 3, amande: 3, coco: 3, sesame: 3 } },
    ],
  },
  {
    id: 'avoidOil',
    text: 'Tu as une huile que tu veux éviter ? / كاينة شي زيت بغيتي تتجنبيها؟',
    options: [
      { id: 'avoid_coco', label: 'Coco / الكوكو', avoidsOil: 'coco' },
      { id: 'avoid_argan', label: 'Argan / أركان', avoidsOil: 'argan' },
      { id: 'avoid_nigelle', label: 'Nigelle / الحبة السوداء', avoidsOil: 'nigelle' },
      { id: 'avoid_amande', label: 'Amande / اللوز الحلو', avoidsOil: 'amande' },
      { id: 'avoid_sesame', label: 'Sésame / الزنجلان', avoidsOil: 'sesame' },
      { id: 'avoid_none', label: 'Aucune / حتى وحدة' },
    ],
  },
  {
    id: 'mainGoal',
    text: 'Ton objectif principal ? / شنو الهدف الرئيسي ديالك؟',
    options: [
      { id: 'daily', label: 'Routine quotidienne simple / روتين يومي بسيط', scores: { sesame: 6, nigelle: 6, amande: 5, argan: 4, coco: 1 } },
      { id: 'deep_care', label: 'Soin profond / عناية عميقة', scores: { coco: 9, argan: 8, amande: 8, sesame: 3 } },
      { id: 'natural_glow', label: 'Glow naturel / إشراقة طبيعية', scores: { argan: 9, nigelle: 7, sesame: 4, amande: 3 } },
      { id: 'repair', label: 'Réparation / ترميم', scores: { argan: 9, coco: 9, amande: 6, sesame: 3 } },
      { id: 'soothe', label: 'Apaisement / تهدئة', scores: { amande: 10, sesame: 9, nigelle: 3, argan: 2, coco: -2 } },
    ],
  },
  {
    id: 'sensitivity',
    text: 'Ta peau ou ton cuir chevelu réagit facilement ? / واش البشرة ولا فروة الراس كتتحسس بسرعة؟',
    options: [
      { id: 'very_sensitive', label: 'Oui, très sensible / آه، حساسة بزاف', scores: { amande: 12, sesame: 10, argan: 2, nigelle: -2, coco: -5 } },
      { id: 'sometimes_sensitive', label: 'Parfois / بعض المرات', scores: { amande: 8, sesame: 7, argan: 4, nigelle: 2, coco: -1 } },
      { id: 'not_sensitive', label: 'Non / لا', scores: { argan: 5, coco: 5, nigelle: 5, amande: 4, sesame: 4 } },
      { id: 'unknown_sensitive', label: 'Je ne sais pas / ما عرفتاش', scores: { amande: 5, sesame: 5, argan: 3, nigelle: 2, coco: 1 } },
    ],
  },
  {
    id: 'recommendationStyle',
    text: 'Tu veux une recommandation plutôt... / بغيتي الاقتراح يكون...',
    options: [
      { id: 'single', label: 'Une seule huile / زيت وحدة' },
      { id: 'two', label: 'Deux huiles complémentaires / جوج زيوت مكملين' },
      { id: 'routine', label: 'Une routine complète / روتين كامل' },
    ],
  },
]

export const OILS: Record<OilId, Oil> = {
  argan: {
    id: 'argan',
    name: "Huile d'Argan",
    arabicName: 'زيت أركان',
    subtitle: 'Glow, réparation, peau et cheveux secs / إشراقة وترميم',
    description: "L'or liquide du Maroc, riche et enveloppant.",
    explanation: "Elle nourrit, apporte de l'éclat et aide les cheveux secs ou cassants. بالعربية: زيت أركان مناسب للتغذية واللمعان والعناية الفاخرة.",
    routineTips: [
      'Peau / البشرة: 2 gouttes le soir sur peau légèrement humide.',
      'Cheveux / الشعر: sur les pointes ou en bain avant shampoing.',
    ],
    texture: 'riche',
  },
  nigelle: {
    id: 'nigelle',
    name: 'Huile de Nigelle',
    arabicName: 'زيت الحبة السوداء',
    subtitle: 'Imperfections, cuir chevelu gras / للحبوب والفروة الدهنية',
    description: 'Une huile purifiante, fine et ciblée.',
    explanation: "Elle convient aux imperfections, aux zones brillantes et aux routines légères. بالعربية: زيت الحبة السوداء اختيار مزيان للبشرة الدهنية والحبوب.",
    routineTips: [
      'Peau / البشرة: 1 goutte localement, puis augmenter doucement.',
      'Cuir chevelu / فروة الراس: massage léger avant shampoing.',
    ],
    texture: 'legere',
  },
  amande: {
    id: 'amande',
    name: "Huile d'Amande Douce",
    arabicName: 'زيت اللوز الحلو',
    subtitle: 'Douceur, peau sensible / نعومة وتهدئة',
    description: 'La plus douce du rituel, très facile à adopter.',
    explanation: "Elle apaise les peaux sensibles et apporte du confort. بالعربية: زيت اللوز الحلو لطيف بزاف ومناسب للبشرة الحساسة.",
    routineTips: [
      'Peau / البشرة: quelques gouttes après la douche ou le soir.',
      'Massage / مساج: parfaite seule sur zones sèches ou sensibles.',
    ],
    texture: 'legere',
  },
  coco: {
    id: 'coco',
    name: 'Huile de Coco',
    arabicName: 'زيت الكوكو',
    subtitle: 'Cheveux secs, boucles, soin profond / للشعر الناشف والكيرلي',
    description: 'Une huile riche pour les longueurs qui ont soif.',
    explanation: "Elle aide les cheveux secs, bouclés ou cassants avec un soin profond. بالعربية: زيت الكوكو مناسب للشعر الناشف والهيشان.",
    routineTips: [
      'Cheveux / الشعر: masque 20 à 40 minutes avant shampoing.',
      'Pointes / الأطراف: très petite quantité pour lisser le frizz.',
    ],
    texture: 'riche',
  },
  sesame: {
    id: 'sesame',
    name: 'Huile de Sésame',
    arabicName: 'زيت الزنجلان',
    subtitle: 'Massage, apaisement, texture fine / للمساج والتهدئة',
    description: 'Une huile souple, chaleureuse et équilibrante.',
    explanation: "Elle est idéale pour apaiser, masser et garder une routine simple. بالعربية: زيت الزنجلان خفيف ومناسب للمساج والعناية اليومية.",
    routineTips: [
      'Peau / البشرة: appliquer en fine couche après la douche.',
      'Massage / مساج: chauffer quelques gouttes entre les mains.',
    ],
    texture: 'legere',
  },
}
