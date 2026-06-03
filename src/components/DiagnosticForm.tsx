'use client'

import Image from 'next/image'
import { ArrowLeft, ArrowRight, Check, Leaf, Mail, MessageCircle, RotateCcw, Send, Sparkles } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa6'
import { type FormEvent, useMemo, useState } from 'react'
import Confetti from '@/components/Confetti'
import { OILS, QUESTIONS, OilId } from '@/data/questions'
import { Answers, calculateRecommendations } from '@/data/recommendations'

const BOTTLE_SRC = '/bottle%20tran.png'

const productAccents: Record<OilId, string> = {
  argan: 'from-brand-sage via-brand-mist to-brand-taupe',
  nigelle: 'from-brand-dark via-brand-primary to-brand-leaf',
  amande: 'from-white via-brand-mist to-brand-sage',
  coco: 'from-brand-mist via-white to-brand-sage',
  sesame: 'from-brand-leaf via-brand-primary to-brand-taupe',
}

type EmailStatus = 'idle' | 'sending' | 'success' | 'error'

export default function DiagnosticForm() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [isComplete, setIsComplete] = useState(false)
  const [email, setEmail] = useState('')
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('idle')

  const question = QUESTIONS[step]
  const selectedOption = answers[question.id]
  const progress = ((step + 1) / QUESTIONS.length) * 100
  const result = useMemo(() => calculateRecommendations(answers), [answers])

  function selectOption(optionId: string) {
    setAnswers((current) => ({ ...current, [question.id]: optionId }))
  }

  function goNext() {
    if (!selectedOption) {
      return
    }

    if (step === QUESTIONS.length - 1) {
      setIsComplete(true)
      return
    }

    setStep((current) => current + 1)
  }

  function goBack() {
    setStep((current) => Math.max(0, current - 1))
  }

  function restart() {
    setAnswers({})
    setStep(0)
    setIsComplete(false)
    setEmail('')
    setEmailStatus('idle')
  }

  async function sendDiagnosticEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!email.trim()) {
      return
    }

    setEmailStatus('sending')

    const selectedAnswers = QUESTIONS.map((item) => {
      const selectedOptionId = answers[item.id]
      const option = item.options.find((entry) => entry.id === selectedOptionId)

      return `${item.text}: ${option?.label ?? 'Non répondu'}`
    })

    const recommendedOils = result.oils.map((oilId, index) => ({
      rank: index + 1,
      name: OILS[oilId].name,
      arabicName: OILS[oilId].arabicName,
    }))

    try {
      const response = await fetch('/api/send-diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          recommendedOils,
          routineTitle: result.routineTitle,
          routineSteps: result.routineSteps,
          answers: selectedAnswers,
        }),
      })

      if (response.ok) {
        setEmailStatus('success')
        setEmail('')
      } else {
        setEmailStatus('error')
      }
    } catch {
      setEmailStatus('error')
    }
  }

  if (isComplete) {
    return (
      <section className="min-h-screen bg-brand-background text-brand-text">
        <Confetti />

        <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-5 motion-safe:animate-fade-in sm:px-6 lg:px-8 lg:py-8">
          <div className="w-full overflow-hidden rounded-lg border border-brand-dark/10 bg-white shadow-[0_24px_80px_rgba(32,38,32,0.08)] transition-shadow duration-300 ease-out hover:shadow-[0_28px_90px_rgba(32,38,32,0.11)]">
            <section className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="path-pattern-green p-6 text-white sm:p-8 lg:p-10">
                <div className="relative">
                  <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-white/76">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Résultat personnalisé / النتيجة ديالك
                  </p>
                  <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
                    Diagnostic terminé
                  </h1>
                  <p className="mt-4 max-w-lg text-base font-medium leading-7 text-white/76">
                    Voici ta sélection Turath, pensée comme un rituel botanique simple pour la peau et les cheveux.
                  </p>
                  <p dir="rtl" className="mt-5 font-arabic text-xl font-bold leading-9 text-white">
                    هادي هي الزيوت المناسبة ليك، مستوحاة من روتين طبيعي وبسيط.
                  </p>
                </div>
              </div>

              <div className="bg-brand-mist p-4 sm:p-6 lg:p-8">
                <div className="grid gap-4 md:grid-cols-3">
                  {result.oils.map((oilId, index) => (
                    <ProductCard key={oilId} oilId={oilId} rank={index + 1} />
                  ))}
                </div>
              </div>
            </section>

            <section className="grid gap-4 border-t border-brand-dark/10 bg-white p-4 sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
              <div className="rounded-lg border border-brand-primary/15 bg-brand-background p-4 sm:p-5">
                <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-brand-primary">
                  <Leaf className="h-4 w-4" aria-hidden="true" />
                  Rituel conseillé / الروتين المقترح
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold text-brand-dark sm:text-3xl">
                  {result.routineTitle}
                </h2>
                {result.avoidedOil ? (
                  <p className="mt-3 text-sm leading-6 text-brand-muted">
                    {"J'ai retiré "}
                    <span className="font-semibold text-brand-text">{OILS[result.avoidedOil].name}</span>
                    {' de la sélection, comme demandé.'}
                  </p>
                ) : null}
              </div>

              <div className="space-y-3">
                {result.routineSteps.map((stepText, index) => (
                  <div key={stepText} className="flex gap-3 rounded-lg border border-brand-primary/12 bg-brand-mist p-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-amber text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-brand-muted">{stepText}</p>
                  </div>
                ))}
              </div>
            </section>

            <form className="border-t border-brand-dark/10 bg-brand-background p-4 sm:p-6 lg:p-8" onSubmit={sendDiagnosticEmail}>
              <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
                <div>
                  <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-brand-primary">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Optionnel / اختياري
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-brand-dark">
                    Recevoir le diagnostic par mail
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-brand-muted">
                    Laisse ton email si tu veux garder tes recommandations.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    className="min-h-12 flex-1 rounded-full border border-brand-dark/15 bg-white px-5 text-base font-semibold text-brand-text outline-none transition duration-200 ease-out placeholder:text-brand-muted/55 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                    name="email"
                    onChange={(event) => {
                      setEmail(event.target.value)
                      if (emailStatus !== 'idle') {
                        setEmailStatus('idle')
                      }
                    }}
                    placeholder="email@example.com"
                    required
                    type="email"
                    value={email}
                  />
                  <button
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 font-bold text-white transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-brand-dark active:scale-[0.99] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
                    disabled={emailStatus === 'sending'}
                    type="submit"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    {emailStatus === 'sending' ? 'Envoi...' : 'Envoyer / إرسال'}
                  </button>
                </div>
              </div>

              {emailStatus === 'success' ? (
                <p className="mt-3 text-sm font-semibold text-brand-primary">
                  Diagnostic envoyé. Merci / تم الإرسال، شكرا.
                </p>
              ) : null}
              {emailStatus === 'error' ? (
                <p className="mt-3 text-sm font-semibold text-red-700">
                  Erreur d&apos;envoi. Réessaie dans un instant.
                </p>
              ) : null}
            </form>

            <div className="grid gap-3 border-t border-brand-dark/10 bg-white p-4 sm:grid-cols-2 sm:p-6 lg:p-8">
              <a
                className="interactive-lift inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-center font-bold text-white active:scale-[0.99]"
                href="https://wa.me/"
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Commander maintenant / طلب/طلبي الآن
              </a>
              <button
                className="interactive-lift inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-dark/15 bg-brand-background px-5 py-3 font-bold text-brand-dark active:scale-[0.99]"
                onClick={restart}
                type="button"
              >
                <RotateCcw className="h-5 w-5" aria-hidden="true" />
                Refaire le diagnostic / عاود/عاودي التشخيص
              </button>
            </div>
          </div>
        </main>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-brand-background text-brand-text">
      <main className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-5 px-4 py-5 motion-safe:animate-fade-in sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:px-8 lg:py-8">
        <HeroPanel />

        <section id="diagnostic" className="scroll-mt-5 rounded-lg border border-brand-primary/15 bg-white p-4 shadow-[0_24px_80px_rgba(23,63,50,0.09)] transition-shadow duration-300 ease-out hover:shadow-[0_28px_90px_rgba(23,63,50,0.13)] sm:p-6 lg:min-h-[34rem] lg:p-7">
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="text-sm font-bold text-brand-dark">
                Question {step + 1}/{QUESTIONS.length}
              </span>
              <span className="text-sm font-semibold text-brand-muted">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-brand-soft">
              <div className="h-full rounded-full bg-brand-leaf transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div key={question.id} className="motion-safe:animate-fade-in">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-brand-primary">
              <Leaf className="h-4 w-4" aria-hidden="true" />
              Diagnostic naturel / تشخيص طبيعي
            </p>
            <h2 className="font-display text-2xl font-bold leading-tight text-brand-dark sm:text-4xl">
              {question.text}
            </h2>

            <div className="mt-6 grid gap-3">
              {question.options.map((option) => {
                const isSelected = selectedOption === option.id

                return (
                  <button
                    key={option.id}
                    className={`group flex min-h-[3.75rem] w-full items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left transition duration-200 ease-out active:scale-[0.99] ${
                      isSelected
                        ? 'border-brand-primary bg-brand-primary text-white shadow-lg shadow-brand-dark/10'
                        : 'border-brand-primary/12 bg-brand-mist text-brand-text hover:-translate-y-0.5 hover:border-brand-primary/45 hover:bg-white hover:shadow-sm'
                    }`}
                    onClick={() => selectOption(option.id)}
                    type="button"
                  >
                    <span className="text-base font-semibold leading-6">{option.label}</span>
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-sm font-bold ${
                        isSelected ? 'border-white/70 bg-white text-brand-dark' : 'border-brand-muted/35 bg-white'
                      }`}
                      aria-hidden="true"
                    >
                      {isSelected ? <Check className="h-4 w-4" aria-hidden="true" /> : ''}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
                className="interactive-lift inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-dark/15 bg-white px-4 py-3 font-bold text-brand-dark active:scale-[0.99] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-40"
              disabled={step === 0}
              onClick={goBack}
              type="button"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              Précédent / رجوع
            </button>
            <button
                className="interactive-lift inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-primary px-4 py-3 font-bold text-white shadow-lg shadow-brand-dark/10 active:scale-[0.99] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-40"
              disabled={!selectedOption}
              onClick={goNext}
              type="button"
            >
              {step === QUESTIONS.length - 1 ? 'Voir résultats / شوف/شوفي النتيجة' : 'Suivant / التالي'}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </section>
      </main>
    </section>
  )
}

function HeroPanel() {
  return (
    <section className="overflow-hidden rounded-lg border border-brand-dark/10 bg-white shadow-[0_24px_80px_rgba(23,63,50,0.09)] transition-shadow duration-300 ease-out hover:shadow-[0_28px_90px_rgba(23,63,50,0.13)]">
      <div className="path-pattern-green p-5 text-white sm:p-8 lg:p-10">
        <div className="relative">
          <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-white/75">
            <Leaf className="h-4 w-4" aria-hidden="true" />
            Huiles végétales pressées à froid / زيوت نباتية
          </p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[0.96] text-white sm:text-6xl lg:text-7xl">
            Trouve ton huile Turath
          </h1>
          <p dir="rtl" className="mt-5 font-arabic text-xl font-bold leading-8 text-brand-sage sm:text-2xl">
            عناية طبيعية مستوحاة من التراث المغربي.
          </p>
          <p className="mt-4 max-w-xl text-base font-medium leading-7 text-white/76 sm:text-lg">
            Un diagnostic court pour choisir une huile botanique adaptée à ta peau, tes cheveux et ton rituel quotidien.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a className="interactive-lift inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-bold text-brand-dark active:scale-[0.99]" href="#diagnostic">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
              Commencer / اختار/اختاري الزيت
            </a>
            <a className="interactive-lift inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 text-base font-bold text-white backdrop-blur active:scale-[0.99]" href="https://www.instagram.com/" rel="noreferrer" target="_blank">
              <FaInstagram className="h-5 w-5" aria-hidden="true" />
              Instagram
            </a>
          </div>

          <div className="mt-7 hidden grid-cols-3 gap-2 sm:grid">
            {[
              ['Naturel', 'زيوت نقية'],
              ['Sage', 'عناية هادئة'],
              ['Amber', 'زيت دافئ'],
            ].map(([label, detail]) => (
                <div key={label} className="interactive-lift rounded-lg border border-white/20 bg-white/10 p-3 backdrop-blur">
                <p className="text-sm font-extrabold text-white">{label}</p>
                <p dir="rtl" className="mt-1 font-arabic text-xs font-semibold text-white/65">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductCard({ oilId, rank }: { oilId: OilId; rank: number }) {
  const oil = OILS[oilId]

  return (
    <article className="overflow-hidden rounded-lg border border-brand-dark/10 bg-white shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
      <div className={`relative h-40 bg-gradient-to-br ${productAccents[oilId]} p-4`}>
        <span className="absolute right-4 top-4 rounded-full border border-white/60 bg-white/78 px-3 py-1 text-xs font-bold text-brand-dark backdrop-blur">
          Reco {rank}
        </span>
        <Image
          src={BOTTLE_SRC}
          alt={`${oil.name} bottle`}
          width={120}
          height={160}
          className="absolute bottom-2 left-1/2 h-36 w-auto -translate-x-1/2 object-contain drop-shadow-[0_18px_18px_rgba(23,63,50,0.22)]"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold text-brand-dark">{oil.name}</h2>
            <p dir="rtl" className="mt-1 font-arabic text-sm font-semibold text-brand-primary">
              {oil.arabicName}
            </p>
          </div>
          <span className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-bold text-brand-dark">
            {oil.texture === 'legere' ? 'Légère' : 'Riche'}
          </span>
        </div>
        <p className="mt-3 text-sm font-semibold leading-6 text-brand-primary">{oil.subtitle}</p>
        <p className="mt-2 text-sm leading-6 text-brand-muted">{oil.explanation}</p>
      </div>
    </article>
  )
}
