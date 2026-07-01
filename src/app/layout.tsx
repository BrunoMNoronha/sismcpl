import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SisMCPL — Sistema de Mapeamento Comercial e Produtivo Local',
  description: 'Transformando informação dispersa em decisão produtiva local. Conecte produtores rurais e comércios da sua comunidade.',
  keywords: 'mapeamento comercial, produção local, desenvolvimento rural, agronegócio comunitário',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
