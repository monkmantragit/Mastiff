import { Metadata } from 'next'

// Post-conversion confirmation page: useful to visitors, but it has no search intent and
// competes with real landing pages if indexed. Kept out of the sitemap and the index.
export const metadata: Metadata = {
  title: 'Thank You - White Massif',
  description: 'Thank you for getting in touch with White Massif Event Management.',
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
}

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
