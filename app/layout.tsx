import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "egxproductivity",
  description: "The All-In-One Productivity App!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body className={`${GeistSans.className} bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
            <Navbar />
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
