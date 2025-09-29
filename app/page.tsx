import { Navigation } from '@/components/navigation'
import { MainContent } from '@/components/main-content'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <MainContent />
      </main>
    </div>
  )
}
