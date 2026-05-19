import type { Metadata } from 'next'
import { Manrope, DM_Serif_Display, DM_Mono } from 'next/font/google'
import './globals.css'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' })
const dmSerif = DM_Serif_Display({ weight: '400', subsets: ['latin'], variable: '--font-dm-serif', display: 'swap' })
const dmMono = DM_Mono({ weight: ['300', '400', '500'], subsets: ['latin'], variable: '--font-dm-mono', display: 'swap' })

export const metadata: Metadata = {
  title: 'Jatin Agrawal — AI Engineer & Solutions Architect',
  description: 'AI Engineer at TCS Digital Labs. 15+ enterprise AI systems — voice contact centres, agentic automation, GenAI platforms — across $20M+ in client engagements.',
  keywords: ['AI Engineer', 'Solutions Architect', 'TCS', 'Machine Learning', 'LLM', 'Agentic AI'],
  authors: [{ name: 'Jatin Agrawal' }],
  openGraph: {
    title: 'Jatin Agrawal — AI Engineer & Solutions Architect',
    description: 'Building enterprise AI systems at TCS Digital Labs.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmSerif.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
