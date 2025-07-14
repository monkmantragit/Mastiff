import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Internal Feedback - White Massif',
  description: 'Internal feedback collection form',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      {children}
    </>
  )
}