import React from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wallet, Activity, TrendingUp, Users } from 'lucide-react'
import ParticleBackground from '@/components/ParticleBackground'

const Dashboard: React.FC = () => {
  const { address, chain } = useAccount()
  const { disconnect } = useDisconnect()
  const { open } = useAppKit()

  const mockMetrics = {
    totalEarnings: "1,234.56",
    activeHooks: 3,
    referrals: 42,
    volumeGenerated: "98,765"
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleBackground />
      
      {/* Header */}
      <div className="pt-24 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">
                Creator Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your creator economy hooks and earnings
              </p>
            </div>
            
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

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${mockMetrics.totalEarnings}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Hooks</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockMetrics.activeHooks}</div>
                <p className="text-xs text-muted-foreground">
                  All hooks operational
                </p>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Referrals</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockMetrics.referrals}</div>
                <p className="text-xs text-muted-foreground">
                  +7 new this week
                </p>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Volume Generated</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${mockMetrics.volumeGenerated}</div>
                <p className="text-xs text-muted-foreground">
                  Last 30 days
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Active Hooks */}
            <Card className="glass">
              <CardHeader>
                <CardTitle>Your Active Hooks</CardTitle>
                <CardDescription>
                  Manage and monitor your creator economy hooks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border/20">
                  <div>
                    <h4 className="font-medium">Fee-to-Splitter Hook</h4>
                    <p className="text-sm text-muted-foreground">Active on Mainnet</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg border border-border/20">
                  <div>
                    <h4 className="font-medium">Stream-My-Fees Hook</h4>
                    <p className="text-sm text-muted-foreground">Active on Arbitrum</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border/20">
                  <div>
                    <h4 className="font-medium">Referral/Creator-Code Hook</h4>
                    <p className="text-sm text-muted-foreground">Active on Both</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Manage your creator profile and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <Activity className="mr-2 h-4 w-4" />
                  Create New Hook
                </Button>
                
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Referrals
                </Button>
                
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
                
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => open()}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Wallet Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
