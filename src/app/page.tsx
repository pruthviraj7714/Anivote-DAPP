
import FeatureCard from "@/components/FeatureCard"
import { Wallet, UserPlus, MessageSquare, ImageIcon } from 'lucide-react'
import Link from "next/link"

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300 p-6">
        <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-extrabold cursor-pointer">
        <span className="text-orange-400">
          Social
          <span className="text-pink-400">Snap</span>
        </span>
      </div>
          <Link className="text-white font-bold" href={'/connect-wallet'}>
             Connect Wallet
          </Link>
        </div>
      </header>

      <main className="container min-h-screen mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Welcome to SocialSnap</h2>
          <p className="text-xl mb-8">The decentralized social media platform for the Web3 era</p>
          <Link className="px-6 py-2 bg-pink-300 rounded-lg text-white font-bold" href={'/connect-wallet'}>
             Get Started
          </Link>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Wallet className="h-12 w-12 text-blue-500" />}
            title="Connect Your Wallet"
            description="Seamlessly connect your MetaMask wallet to start your decentralized social journey."
          />
          <FeatureCard 
            icon={<UserPlus className="h-12 w-12 text-green-500" />}
            title="Create Your Profile"
            description="Build your unique identity on the blockchain with a personalized profile."
          />
          <FeatureCard 
            icon={<MessageSquare className="h-12 w-12 text-yellow-500" />}
            title="Share Your Thoughts"
            description="Post updates, thoughts, and ideas directly to the blockchain."
          />
          <FeatureCard 
            icon={<ImageIcon className="h-12 w-12 text-purple-500" />}
            title="Media Gallery"
            description="Share and view images in a decentralized, censorship-resistant gallery."
          />
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to dive in?</h2>
          <p className="text-xl mb-8">Connect your wallet and start experiencing truly decentralized social media.</p>
          <Link className="px-6 py-2 bg-pink-300 rounded-lg text-white font-bold" href={'/connect-wallet'}>
             Connect Wallet
          </Link>
        </section>
      </main>

      <footer className="bg-pink-400 text-white p-6 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 SocialSnap. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}


