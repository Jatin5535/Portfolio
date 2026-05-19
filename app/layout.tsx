import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
