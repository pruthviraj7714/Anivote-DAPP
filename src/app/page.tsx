import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, TrendingUp, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Star className="h-6 w-6 text-purple-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">AniVote</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#how-it-works"
          >
            How It Works
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#connect"
          >
            Connect Wallet
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-purple-50">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Vote for Your Favorite Anime with AniVote
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Use Sepolia ETH to vote and devote to your beloved anime
                  series. Influence rankings and support your favorites!
                </p>
              </div>
              <div className="space-x-4">
                <Link href={'/connect-wallet'}>
                  <Button className="inline-flex h-9 items-center justify-center rounded-md bg-purple-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-purple-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-950 disabled:pointer-events-none disabled:opacity-50">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className=" px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <Star className="h-12 w-12 text-purple-600" />
                <h3 className="text-xl font-bold">Vote for Favorites</h3>
                <p className="text-gray-500 text-center">
                  Use Sepolia ETH to cast votes for your beloved anime series.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <TrendingUp className="h-12 w-12 text-purple-600" />
                <h3 className="text-xl font-bold">Real-time Rankings</h3>
                <p className="text-gray-500 text-center">
                  Watch as your votes influence the real-time anime rankings.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <Shield className="h-12 w-12 text-purple-600" />
                <h3 className="text-xl font-bold">Secure Transactions</h3>
                <p className="text-gray-500 text-center">
                  All votes are securely recorded on the Sepolia testnet.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
        >
          <div className=" px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How It Works
            </h2>
            <ol className="grid gap-6 md:grid-cols-3">
              <li className="flex flex-col items-center space-y-2 border border-gray-200 p-4 rounded-lg bg-white">
                <span className="text-2xl font-bold text-purple-600">1</span>
                <h3 className="text-xl font-bold">Connect Your Wallet</h3>
                <p className="text-gray-500 text-center">
                  Link your Ethereum wallet with Sepolia ETH.
                </p>
              </li>
              <li className="flex flex-col items-center space-y-2 border border-gray-200 p-4 rounded-lg bg-white">
                <span className="text-2xl font-bold text-purple-600">2</span>
                <h3 className="text-xl font-bold">Choose Your Anime</h3>
                <p className="text-gray-500 text-center">
                  Browse through our extensive list of anime series.
                </p>
              </li>
              <li className="flex flex-col items-center space-y-2 border border-gray-200 p-4 rounded-lg bg-white">
                <span className="text-2xl font-bold text-purple-600">3</span>
                <h3 className="text-xl font-bold">Vote and Devote</h3>
                <p className="text-gray-500 text-center">
                  Cast your votes using Sepolia ETH and show your devotion!
                </p>
              </li>
            </ol>
          </div>
        </section>
        <section id="connect" className="w-full py-12 md:py-24 lg:py-32">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Start Voting?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connect your wallet and join the AniVote community today!
                </p>
              </div>
              <Button className="inline-flex h-9 items-center justify-center rounded-md bg-purple-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-purple-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-950 disabled:pointer-events-none disabled:opacity-50">
                Connect Wallet
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2024 AniVote. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}