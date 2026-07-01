import { Sidebar } from '@/components/Sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto ml-64 transition-all duration-300">
        {children}
      </main>
    </div>
  )
}
