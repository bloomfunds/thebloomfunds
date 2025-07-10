import { TempoInit } from "@/components/tempo-init";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import ErrorBoundary from "@/components/error-boundary";
import EnhancedCursor from "@/components/EnhancedCursor";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bloom - The #1 Crowdfunding Platform for Businesses",
  description:
    "Transform your business ideas into reality with community-driven crowdfunding. Join thousands of successful entrepreneurs on Bloom.",
};

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <div className="flex flex-col min-h-screen">
            <ErrorBoundary>
              <Navbar />
            </ErrorBoundary>
            <main className="flex-1">
              <ErrorBoundary>
                <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
              </ErrorBoundary>
            </main>
            <ErrorBoundary>
              <Footer />
            </ErrorBoundary>
          </div>
          <EnhancedCursor />
          <TempoInit />
        </ErrorBoundary>
      </body>
    </html>
  );
}
