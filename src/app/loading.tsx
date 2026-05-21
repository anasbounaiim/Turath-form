import Image from 'next/image'

export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top_left,rgba(230,198,132,0.22),transparent_34%),linear-gradient(135deg,#142720_0%,#234137_52%,#365F50_100%)] px-6">
      <div className="flex flex-col items-center gap-5 rounded-[2rem] border border-cream/15 bg-cream/10 p-8 shadow-2xl shadow-black/20 backdrop-blur">
        <Image
          src="/carousel/turath-logo.svg"
          alt="Turath logo"
          width={112}
          height={158}
          priority
          className="h-28 w-auto object-contain"
        />
        <p className="font-display text-sm font-bold uppercase tracking-[0.28em] text-gold">
          Loading Turath
        </p>
      </div>
    </div>
  )
}
