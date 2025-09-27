import MarqueeText from "@/components/MarqueeText";
import ParticleBackground from "@/components/ParticleBackground";
import HookCard from "@/components/HookCard";
import GlowButton from "@/components/GlowButton";
import Navbar from "@/components/Navbar";
import PlaceholderWarning from "@/components/PlaceholderWarning";
import heroBackground from "@/assets/hero-background.jpg";
import paymentSplit from "@/assets/payment-split.jpg";
import streamingFees from "@/assets/streaming-fees.jpg";
import creatorCodes from "@/assets/creator-codes.jpg";

const Index = () => {
  const hooks = [
    {
      title: "Fee-to-Splitter Hook",
      description: "Redirects a configurable portion of swap fees to a payment splitter, automatically distributing rewards to multiple stakeholders in real-time.",
      icon: "💰",
      image: paymentSplit,
      features: [
        "Configurable fee splitting ratios",
        "Automatic multi-party payments",
        "Real-time distribution",
        "DAO treasury integration"
      ]
    },
    {
      title: "Stream-My-Fees Hook",
      description: "Accrues fees and streams them in real-time using Superfluid protocol with Gelato automation for continuous payment flows.",
      icon: "🌊",
      image: streamingFees,
      features: [
        "Real-time fee streaming",
        "Superfluid protocol integration",
        "Gelato automation",
        "Continuous payment flows"
      ]
    },
    {
      title: "Referral/Creator-Code Hook",
      description: "Enables swappers to attach creator/referral codes (Farcaster fid), facilitating shared fees, XMTP notifications, and PostHog analytics.",
      icon: "🎯",
      image: creatorCodes,
      features: [
        "Creator referral tracking",
        "Farcaster integration",
        "XMTP notifications",
        "PostHog analytics"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PlaceholderWarning />
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="mb-8 overflow-hidden">
            <MarqueeText className="text-6xl md:text-8xl font-bold gradient-text glow-text">
              UNISWAP V4 HOOKS • CREATOR ECONOMY • PAYMENT RAILS • 
            </MarqueeText>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Making AMM Pools 
            <span className="gradient-accent-text glow-text"> Socially Composable</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            Revolutionary Uniswap v4 hooks that extend pools into the creator economy. 
            Unlock new AMM primitives with native creator support, payment splitting, 
            and real-time fee streaming.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <GlowButton variant="primary" size="lg">
              Explore Hooks
            </GlowButton>
            <GlowButton variant="secondary" size="lg">
              Creator Discovery
            </GlowButton>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-12 border-y border-border/20">
        <MarqueeText reverse className="text-2xl md:text-4xl font-semibold text-muted-foreground">
          FEE SPLITTING • REAL-TIME STREAMING • CREATOR CODES • SOCIAL COMPOSABILITY • 
        </MarqueeText>
      </section>

      {/* Hooks Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Revolutionary Hook Suite
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three innovative hooks that transform Uniswap pools into creator-friendly, 
              socially composable primitives for the next generation of DeFi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hooks.map((hook, index) => (
              <HookCard key={index} {...hook} />
            ))}
          </div>
        </div>
      </section>

      {/* Creator Discovery Section */}
      <section className="py-20 px-6 glass">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-accent-text">
            Neynar-Powered Creator Discovery
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Tinder-like UI for discovering creators, complete with swipe mechanics 
            and seamless integration with Farcaster profiles.
          </p>
          
          <div className="glass rounded-2xl p-8 glow-primary">
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-2xl font-bold mb-4">Swipe. Connect. Earn.</h3>
            <p className="text-muted-foreground">
              Match with creators, set up referral codes, and start earning 
              from every swap in their ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-section" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              About Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're building the future of decentralized finance by making AMM pools 
              socially composable through innovative Uniswap v4 hooks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-4">Innovation</h3>
              <p className="text-muted-foreground">
                Pioneering the next generation of DeFi primitives with creator-centric solutions.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold mb-4">Community</h3>
              <p className="text-muted-foreground">
                Building bridges between creators, developers, and the broader DeFi ecosystem.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-4">Vision</h3>
              <p className="text-muted-foreground">
                Democratizing access to financial tools for creators and fostering economic growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Ready to Build the Future?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the revolution and make Uniswap pools socially composable with our hook suite.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlowButton variant="accent" size="lg">
              Start Building
            </GlowButton>
            <GlowButton variant="secondary" size="lg">
              View Documentation
            </GlowButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">
            Built for the creator economy • Powered by Uniswap v4 hooks
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
