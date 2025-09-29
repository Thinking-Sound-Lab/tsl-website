import { Hero } from '@/components/hero'
import { Partners } from '@/components/partners'
import { Benefits } from '@/components/benefits'

export function MainContent() {
  return (
    <div className="textured-beige-bg">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Single stitched border container for all content */}
        <div className="stitched-border">
          <Hero />
          {/* Navigation-style divider */}
          <div className="w-full border-t" style={{ borderColor: "#b0b0b0" }}></div>
          <Partners />
          {/* Navigation-style divider */}
          <div className="w-full border-t" style={{ borderColor: "#b0b0b0" }}></div>
          <Benefits />
        </div>
      </div>
    </div>
  )
}