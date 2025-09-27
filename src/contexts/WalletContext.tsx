import React, { createContext, useContext, ReactNode } from 'react'
import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { mainnet } from '@reown/appkit/networks'
import { wagmiAdapter, projectId, networks } from '@/lib/wagmi'

// Set up React Query
const queryClient = new QueryClient()

// Create the modal with error handling
try {
  createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks,
    defaultNetwork: mainnet,
    metadata: {
      name: 'Creator Economy Hooks',
      description: 'Revolutionary Uniswap v4 hooks for the creator economy',
      url: window.location.origin, // Use current origin
      icons: ['https://avatars.githubusercontent.com/u/179229932']
    },
    features: {
      analytics: true,
      socials: ['google', 'x', 'github', 'discord', 'apple', 'facebook'], // Enable social logins
      email: true, // Enable email login
      emailShowWallets: true // Show wallet options with email
    },
    themeMode: 'dark',
    themeVariables: {
      '--w3m-color-mix': '#ffff00',
      '--w3m-color-mix-strength': 25,
      '--w3m-font-family': 'Inter, sans-serif',
      '--w3m-border-radius-master': '12px',
      '--w3m-accent-color': '#ffff00',
      '--w3m-background-color': '#1a1a0a'
    }
  })
} catch (error) {
  console.error('Failed to create AppKit:', error)
}

interface WalletContextType {
  // Add any custom wallet context methods here if needed
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

interface WalletProviderProps {
  children: ReactNode
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <WalletContext.Provider value={{}}>
          {children}
        </WalletContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
