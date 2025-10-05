import { Navigation } from '@/components/navigation'
import { MainContent } from '@/components/main-content'
import { NotificationBanner } from '@/components/notification-banner'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NotificationBanner />
      <Navigation />
      <main className="pt-28">
        <MainContent />
      </main>
    </div>
  )
}
