import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum } from '@reown/appkit/networks'

// Get projectId from environment variables
export const projectId = import.meta.env.VITE_PROJECT_ID || 'sample_project_id_placeholder'

if (!import.meta.env.VITE_PROJECT_ID) {
  console.warn('VITE_PROJECT_ID not found in environment variables. Using placeholder. Please add your real Project ID from https://dashboard.reown.com')
}

export const networks = [mainnet, arbitrum]

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: false, // Set to false for Vite/React (not Next.js)
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig
