import "./globals.css"

export const metadata = {
  title: "Invitation",
  description: "Digital Invitation",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}