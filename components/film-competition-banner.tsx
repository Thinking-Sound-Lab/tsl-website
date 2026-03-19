import Link from "next/link";
import Image from "next/image";

export function FilmCompetitionBanner() {
  return (
    <section className="w-full">
      <Link href="/film-competition" className="block relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden group shadow-md border border-border/20 transition-all duration-300 hover:shadow-xl hover:border-border/50 bg-black">
        <Image
          src="https://res.cloudinary.com/disoisftp/image/upload/v1773923708/Website_nxtgoa.png"
          alt="Invook Epic Scene Competition"
          fill
          sizes="(max-width: 1400px) 100vw, 1400px"
          className="object-cover object-top opacity-100 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
          priority
          unoptimized
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-14 z-10">
          <span className="inline-block px-3 py-1 bg-[#f54e00] text-white text-sm font-medium uppercase tracking-tight rounded-full mb-4 w-fit shadow-md">
            New Contest
          </span>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4 drop-shadow-sm">
            Epic Scene Competition
          </h2>
          <p className="text-lg tracking-tight text-balance text-white/90 mb-8 max-w-2xl">
            Create your masterpiece and push the boundaries of AI creativity with Invook. Win $1,000 USD!
          </p>
          <div className="flex items-center text-white bg-[#f54e00] px-6 py-2.5 text-sm font-medium rounded-full w-fit transition-transform group-hover:translate-x-1 shadow-lg">
            Submit your entry <span className="ml-2 font-bold">&rarr;</span>
          </div>
        </div>
      </Link>
    </section>
  );
}
