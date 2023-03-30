import './globals.css'

export const metadata = {
  title: 'ReflashProject',
  description: 'Oh god what have we done',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
