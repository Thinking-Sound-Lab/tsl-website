import Link from "next/link";

export function PromotionalBanner() {
  return (
    <div className="bg-[#f54e00] text-white">
      <Link 
        href="/film-competition" 
        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-center text-sm font-medium tracking-tight hover:opacity-90 transition-opacity"
      >
         <span className="text-xl">🎬</span> 
         <span><span className="sm:hidden font-bold">Epic Scene Competition. Win $1000 </span><span className="hidden sm:inline">Invook Epic Scene Competition is live! Win $1,000 USD.</span></span>
         <span className="font-medium underline underline-offset-2 hidden sm:inline">Read more &rarr;</span>
      </Link>
    </div>
  );
}
