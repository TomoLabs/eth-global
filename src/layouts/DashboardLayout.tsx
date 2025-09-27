import React, { ReactNode } from 'react'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wallet, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ParticleBackground from '@/components/ParticleBackground'

interface DashboardLayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title = "Dashboard",
  description = "Manage your account and settings"
}) => {
  const { address, chain } = useAccount()
  const { open } = useAppKit()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleBackground />
      
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/20">
        <div className="max-w-full mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left - Title */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
              <div className="border-l border-border/20 pl-4">
                <h1 className="text-xl font-bold gradient-text">{title}</h1>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
            
            {/* Right - Wallet Info */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Connected to</p>
                <Badge variant="outline" className="font-mono">
                  {chain?.name || 'Unknown Network'}
                </Badge>
              </div>
              <Button
                variant="outline"
                onClick={() => open()}
                className="flex items-center space-x-2"
              >
                <Wallet className="h-4 w-4" />
                <span className="font-mono">
                  {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'No Address'}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
