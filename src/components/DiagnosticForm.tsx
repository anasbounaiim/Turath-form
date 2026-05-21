'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import Confetti from '@/components/Confetti'
import { CAROUSEL_IMAGES } from '@/data/carouselImages'
import { OILS, QUESTIONS, OilId } from '@/data/questions'
import { Answers, calculateRecommendations } from '@/data/recommendations'

const productAccents: Record<OilId, string> = {
  argan: 'from-[#24483B] via-[#6F8A72] to-[#E6C684]',
  nigelle: 'from-[#152821] via-[#315A4B] to-[#D8B56D]',
  amande: 'from-[#E7DDCF] via-[#F7F2E8] to-[#6F8A72]',
  coco: 'from-[#F7F2E8] via-[#D9C8AA] to-[#315A4B]',
  sesame: 'from-[#315A4B] via-[#A9A879] to-[#E6C684]',
}

const LOGO_SRC = '/carousel/turath-logo.svg'

export default function DiagnosticForm() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [isComplete, setIsComplete] = useState(false)

  const question = QUESTIONS[step]
  const selectedOption = answers[question.id]
  const progress = ((step + 1) / QUESTIONS.length) * 100
  const result = useMemo(() => calculateRecommendations(answers), [answers])

  function selectOption(optionId: string) {
    setAnswers((current) => ({
      ...current,
      [question.id]: optionId,
    }))
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
  }

  if (isComplete) {
    return (
      <section className="relative min-h-screen w-full overflow-hidden px-4 py-6 text-cream sm:px-6 lg:px-8">
        <Confetti />
        <BackgroundDetails />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center">
          <div className="w-full animate-fade-in rounded-[2rem] border border-cream/15 bg-cream/95 p-5 text-earth shadow-[0_30px_90px_rgba(7,24,18,0.35)] backdrop-blur sm:p-8 lg:p-10">
            <div className="mx-auto mb-9 max-w-3xl text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                Résultat personnalisé / النتيجة ديالك
              </p>
              <h1 className="font-display text-4xl font-extrabold leading-tight text-earth sm:text-5xl">
                Diagnostic terminé ✨ / سالينا التشخيص
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-earth/70">
                Voilà ta sélection premium, inspirée des rituels naturels marocains. هادي هي الزيوت المناسبة ليك.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {result.oils.map((oilId, index) => (
                <ProductCard key={oilId} oilId={oilId} rank={index + 1} />
              ))}
            </div>

            <div className="mt-7 grid gap-5 rounded-[1.75rem] border border-gold/25 bg-gradient-to-br from-[#EEF0E4] via-cream to-[#DCE4D6] p-5 shadow-inner md:grid-cols-[0.9fr_1.1fr] md:p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-olive">
                  Rituel conseillé / الروتين المقترح
                </p>
                <h2 className="mt-3 font-display text-3xl font-extrabold text-earth">
                  {result.routineTitle}
                </h2>
                {result.avoidedOil ? (
                  <p className="mt-4 text-sm leading-6 text-earth/65">
                    {"J'ai retiré "}
                    <span className="font-semibold">{OILS[result.avoidedOil].name}</span>
                    {' de la sélection, comme demandé / حيدناها من الاقتراح.'}
                  </p>
                ) : null}
              </div>

              <div className="space-y-3">
                {result.routineSteps.map((stepText, index) => (
                  <div
                    key={stepText}
                    className="flex gap-3 rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-earth text-sm font-bold text-cream">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-earth/75">{stepText}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                className="min-h-12 rounded-full bg-gradient-to-r from-earth to-olive px-8 py-3 text-base font-bold text-cream shadow-xl shadow-earth/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                type="button"
              >
                Commander maintenant / طلبي الآن
              </button>
              <button
                className="min-h-12 rounded-full border border-earth/20 bg-white px-8 py-3 text-base font-bold text-earth shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-earth/40 hover:bg-cream"
                onClick={restart}
                type="button"
              >
                Refaire le diagnostic / عاودي التشخيص
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden px-4 py-6 text-cream sm:px-6 lg:px-8">
      <BackgroundDetails />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl items-center gap-7 lg:grid-cols-[1fr_0.92fr]">
        <HeroPanel />

        <div className="rounded-[2rem] border border-cream/15 bg-cream/95 p-5 text-earth shadow-[0_30px_90px_rgba(7,24,18,0.35)] backdrop-blur sm:p-7 lg:p-8">
          <div className="mb-7">
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="text-sm font-bold text-earth">
                Question {step + 1}/{QUESTIONS.length}
              </span>
              <span className="text-sm font-semibold text-earth/55">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-[#E8D2AE]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-earth via-olive to-gold transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div key={question.id} className="animate-slide-up">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Diagnostic naturel / تشخيص طبيعي
            </p>
              <h2 className="font-display text-3xl font-extrabold leading-tight text-earth sm:text-4xl">
                {question.text}
              </h2>

            <div className="mt-7 grid gap-3">
              {question.options.map((option) => {
                const isSelected = selectedOption === option.id

                return (
                  <button
                    key={option.id}
                    className={`group flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left shadow-sm transition duration-300 ${
                      isSelected
                        ? 'border-earth bg-gradient-to-r from-earth to-olive text-cream shadow-xl shadow-earth/20'
                        : 'border-gold/25 bg-white/80 text-earth hover:-translate-y-0.5 hover:border-gold/70 hover:bg-white hover:shadow-md'
                    }`}
                    onClick={() => selectOption(option.id)}
                    type="button"
                  >
                    <span className="text-base font-semibold sm:text-lg">{option.label}</span>
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-sm ${
                        isSelected ? 'border-cream/70 bg-cream text-earth' : 'border-earth/20'
                      }`}
                      aria-hidden="true"
                    >
                      {isSelected ? '✓' : ''}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              className="min-h-12 flex-1 rounded-full border border-earth/20 bg-white px-5 py-3 font-bold text-earth shadow-sm transition duration-300 hover:bg-beige disabled:cursor-not-allowed disabled:opacity-40"
              disabled={step === 0}
              onClick={goBack}
              type="button"
            >
              Précédent / رجوع
            </button>
            <button
              className="min-h-12 flex-1 rounded-full bg-gradient-to-r from-earth to-olive px-5 py-3 font-bold text-cream shadow-xl shadow-earth/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!selectedOption}
              onClick={goNext}
              type="button"
            >
              {step === QUESTIONS.length - 1 ? 'Voir résultats / شوفي النتيجة' : 'Suivant / التالي'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroPanel() {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    if (CAROUSEL_IMAGES.length < 2) {
      return
    }

    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % CAROUSEL_IMAGES.length)
    }, 3600)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="rounded-[2rem] border border-cream/15 bg-gradient-to-br from-cream/14 via-sage/20 to-earth/25 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.22)] backdrop-blur sm:p-7 lg:min-h-[620px] lg:p-9">
      <div className="grid h-full gap-10 xl:grid-cols-[0.86fr_0.9fr] xl:items-center">
        <div>
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-cream/20 bg-cream/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#F8DFA7]">
            Turath Oils / تراث
          </div>
          <h1 className="max-w-2xl font-display text-5xl font-extrabold leading-[0.98] text-cream sm:text-6xl xl:text-7xl">
            Le pouvoir naturel des graines
          </h1>
          <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-cream/80 sm:text-lg">
            Des soins Turath inspirés du patrimoine, formulés avec des huiles de graines pour nourrir la peau et les cheveux.
          </p>
          <p dir="rtl" className="mt-4 max-w-xl font-arabic text-lg font-semibold leading-8 text-gold">
            عناية طبيعية بزيوت البذور للبشرة والشعر
          </p>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {[
              ['100%', 'naturel / طبيعي'],
              ['10', 'questions / أسئلة'],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-cream/15 bg-cream/10 p-4 shadow-lg shadow-black/10"
              >
                <p className="font-display text-3xl font-extrabold text-[#F8DFA7]">{value}</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-cream/60">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="relative grid place-items-center pt-36 lg:pt-40" aria-label="Turath image carousel">
          <div className="absolute left-1/2 top-[-5rem] z-30 hidden h-24 w-32 -translate-x-1/2 place-items-center sm:grid lg:h-28 lg:w-40">
            <Image
              src={LOGO_SRC}
              alt="Turath logo"
              width={180}
              height={132}
              className="h-full w-full object-contain brightness-0 invert"
            />
          </div>

          <div className="relative h-96 w-full max-w-[420px] overflow-hidden rounded-[2.5rem] border border-cream/25 bg-cream/12 p-3 shadow-[0_32px_90px_rgba(0,0,0,0.32)] backdrop-blur sm:h-[30rem] lg:h-[34rem]">
            <div className="absolute right-5 top-5 z-20 rounded-full border border-cream/25 bg-earth/35 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cream backdrop-blur">
              {activeImage + 1}/{Math.max(CAROUSEL_IMAGES.length, 1)}
            </div>

            {CAROUSEL_IMAGES.length > 0 ? (
              <div
                className="flex h-full flex-col transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateY(-${activeImage * 100}%)` }}
              >
                {CAROUSEL_IMAGES.map((image, index) => (
                  <div key={image.src} className="relative h-full w-full shrink-0 overflow-hidden rounded-[2rem]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      loading={index === 0 ? 'eager' : 'lazy'}
                      unoptimized
                      sizes="(min-width: 1280px) 420px, (min-width: 768px) 420px, 92vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#DDE7D8] via-cream to-[#AFC0A9] p-8 text-center text-earth">
                <div className="mb-5 grid h-40 w-28 place-items-center rounded-[2rem] border border-earth/15 bg-white/35 p-4 shadow-2xl shadow-earth/20 backdrop-blur">
                  <Image
                    src={LOGO_SRC}
                    alt="Turath logo"
                    width={90}
                    height={128}
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="font-display text-2xl font-extrabold">Carousel images</p>
                <p className="mt-2 max-w-xs text-sm font-semibold leading-6 text-earth/65">
                  Add your visuals in public/carousel, then list them in src/data/carouselImages.ts.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

function ProductCard({ oilId, rank }: { oilId: OilId; rank: number }) {
  const oil = OILS[oilId]

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-gold/20 bg-white shadow-xl shadow-earth/10 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-earth/15">
      <div className={`relative h-48 bg-gradient-to-br ${productAccents[oilId]} p-5`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.18)_0,transparent_38%)]" />
        <div className="absolute right-5 top-5 rounded-full border border-white/35 bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
          Reco {rank}
        </div>
        <div className="absolute bottom-5 left-1/2 h-36 w-20 -translate-x-1/2 rounded-t-[2rem] rounded-b-xl border border-white/35 bg-white/25 shadow-2xl shadow-black/20 backdrop-blur-md transition duration-300 group-hover:-translate-y-1">
          <div className="mx-auto -mt-3 h-5 w-9 rounded-t-lg bg-[#3A2417]" />
          <div className="mx-auto mt-8 grid h-16 w-14 place-items-center rounded-2xl border border-white/40 bg-cream/80 p-2">
            <Image
              src={LOGO_SRC}
              alt="Turath logo"
              width={44}
              height={54}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-earth">{oil.name}</h2>
            <p dir="rtl" className="mt-1 font-arabic text-sm font-semibold text-olive">
              {oil.arabicName}
            </p>
            <p className="mt-1 text-sm font-semibold text-olive">{oil.subtitle}</p>
          </div>
          <span className="rounded-full bg-beige px-3 py-1 text-xs font-bold text-earth">
            {oil.texture === 'legere' ? 'Légère / خفيفة' : 'Riche / غنية'}
          </span>
        </div>
        <p className="text-sm leading-6 text-earth/70">{oil.explanation}</p>
      </div>
    </article>
  )
}

function BackgroundDetails() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(230,198,132,0.26),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(111,138,114,0.55),transparent_38%),linear-gradient(135deg,#142720_0%,#234137_48%,#365F50_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(45deg,transparent_46%,#F7F2E8_47%,#F7F2E8_53%,transparent_54%),linear-gradient(-45deg,transparent_46%,#F7F2E8_47%,#F7F2E8_53%,transparent_54%)] [background-size:34px_34px]" />
      <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute bottom-[-10rem] right-[-8rem] h-96 w-96 rounded-full bg-[#F8DFA7]/18 blur-3xl" />
    </>
  )
}
