import { ethers } from 'ethers'

interface ENSResolutionResult {
  address: string | null
  error?: string
}

class EthersENSService {
  private provider: ethers.JsonRpcProvider | null = null
  private readonly rpcEndpoint: string

  constructor() {
    // Get RPC endpoint from environment variables (with fallbacks)
    const customRpcUrl = import.meta.env.VITE_ETH_RPC_URL
    const alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY
    
    // Priority: Custom RPC > Alchemy > Public RPC
    if (customRpcUrl) {
      this.rpcEndpoint = customRpcUrl
      console.log('✅ Using custom ETH RPC endpoint from VITE_ETH_RPC_URL')
    } else if (alchemyApiKey) {
      this.rpcEndpoint = `https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
      console.log('✅ Using Alchemy RPC endpoint from VITE_ALCHEMY_API_KEY')
    } else {
      this.rpcEndpoint = 'https://ethereum-rpc.publicnode.com'
      console.log('⚠️ No custom RPC or Alchemy key found, using public RPC endpoint')
      console.log('💡 Add VITE_ETH_RPC_URL or VITE_ALCHEMY_API_KEY to your .env for better reliability')
    }
    
    this.initializeProvider()
  }

  private initializeProvider() {
    try {
      console.log('🔗 Initializing Ethers provider for ENS resolution on Ethereum L1')
      
      this.provider = new ethers.JsonRpcProvider(this.rpcEndpoint)
      
      // Hide sensitive parts of the URL for logging
      const sanitizedUrl = this.rpcEndpoint
        .replace(/\/v2\/.*/, '/v2/[API_KEY_HIDDEN]')
        .replace(/apikey=[^&]*/, 'apikey=[HIDDEN]')
      
      console.log(`✅ ENS provider initialized with endpoint: ${sanitizedUrl}`)
    } catch (error) {
      console.error('❌ Failed to initialize ENS provider:', error)
    }
  }

  /**
   * Check if a string is a valid ENS name
   * Note: All dot-separated strings should be treated as potential ENS names (per ENS docs)
   */
  isENSName(input: string): boolean {
    // Per ENS docs: treat all dot-separated strings as potential ENS names
    // Don't just check for .eth - ENS supports many TLDs
    const hasValidStructure = /^[a-zA-Z0-9_-]+\.[a-zA-Z]{2,}$/i.test(input.toLowerCase())
    
    // Additional check for known ENS TLDs
    const knownTLDs = /\.(eth|xyz|luxe|kred|art|club|.*)$/i.test(input.toLowerCase())
    
    return hasValidStructure && input.includes('.')
  }

  /**
   * Check if a string is a valid Ethereum address
   */
  isEthereumAddress(input: string): boolean {
    try {
      return ethers.isAddress(input)
    } catch {
      return false
    }
  }

  /**
   * Resolve ENS name to wallet address using ethers.js
   * Following ENS docs: resolution always starts from Ethereum L1
   */
  async resolveENSToAddress(ensName: string): Promise<ENSResolutionResult> {
    console.log(`🔄 Starting ENS resolution for: ${ensName} (on Ethereum L1)`)
    
    if (!this.provider) {
      console.error('❌ ENS provider not initialized')
      return {
        address: null,
        error: 'ENS provider not initialized. Please check your RPC connection.'
      }
    }

    if (!this.isENSName(ensName)) {
      console.error(`❌ Invalid ENS name format: ${ensName}`)
      return {
        address: null,
        error: 'Invalid ENS name format'
      }
    }

    const normalizedName = ensName.toLowerCase().trim()

    try {
      console.log(`🔍 Resolving ENS name: ${normalizedName}`)
      
      // Test provider connection first
      try {
        await this.provider.getNetwork()
      } catch (networkError) {
        console.error('❌ Provider network error:', networkError)
        return {
          address: null,
          error: 'Network connection failed. Please check your internet connection.'
        }
      }
      
      // Method 1: Direct resolution (recommended by ENS docs)
      const address = await this.provider.resolveName(normalizedName)
      
      if (!address) {
        console.warn(`⚠️ ENS name not found: ${normalizedName}`)
        return {
          address: null,
          error: 'ENS name not found or not registered'
        }
      }

      // Validate the resolved address
      if (!ethers.isAddress(address)) {
        console.error(`❌ Invalid address returned: ${address}`)
        return {
          address: null,
          error: 'Invalid address returned from ENS resolution'
        }
      }

      console.log(`✅ ENS ${normalizedName} resolved to: ${address}`)
      
      return {
        address: address
      }
    } catch (error: any) {
      console.error('❌ ENS resolution error:', error)
      
      // Check for specific error types
      if (error.code === 'NETWORK_ERROR' || error.message?.includes('network')) {
        return {
          address: null,
          error: 'Network error. Please check your connection and try again.'
        }
      }
      
      if (error.code === 'TIMEOUT') {
        return {
          address: null,
          error: 'Request timeout. Please try again.'
        }
      }
      
      // Try alternative method using getResolver (fallback)
      try {
        console.log(`🔄 Trying resolver method for: ${normalizedName}`)
        const resolver = await this.provider.getResolver(normalizedName)
        
        if (!resolver) {
          return {
            address: null,
            error: 'ENS resolver not found'
          }
        }

        // Get Ethereum address (coinType 60)
        const address = await resolver.getAddress(60)
        
        if (!address) {
          return {
            address: null,
            error: 'ENS name not found or not registered'
          }
        }

        console.log(`✅ ENS ${normalizedName} resolved via resolver to: ${address}`)
        return {
          address: address
        }
      } catch (resolverError) {
        console.error('❌ Resolver method also failed:', resolverError)
        return {
          address: null,
          error: 'Failed to resolve ENS name. The name may not exist or there may be a network issue.'
        }
      }
    }
  }

  /**
   * Resolve address back to ENS name (reverse resolution)
   */
  async resolveAddressToENS(address: string): Promise<string | null> {
    console.log(`🔄 Starting reverse ENS resolution for: ${address}`)
    
    if (!this.provider) {
      console.error('❌ ENS provider not initialized')
      return null
    }

    if (!this.isEthereumAddress(address)) {
      console.error(`❌ Invalid Ethereum address: ${address}`)
      return null
    }

    try {
      console.log(`🔍 Looking up ENS name for address: ${address}`)
      
      // Reverse resolution
      const ensName = await this.provider.lookupAddress(address)
      
      if (!ensName) {
        console.warn(`⚠️ No ENS name found for address: ${address}`)
        return null
      }

      console.log(`✅ Address ${address} resolved to ENS: ${ensName}`)
      
      return ensName
    } catch (error) {
      console.error('❌ Reverse ENS resolution error:', error)
      return null
    }
  }

  /**
   * Validate and process wallet input (ENS or address)
   */
  async processWalletInput(input: string): Promise<{
    walletId: string
    resolvedAddress?: string
    resolvedENS?: string
    isENS: boolean
    error?: string
  }> {
    const trimmedInput = input.trim()
    console.log(`🔄 Processing wallet input: "${trimmedInput}"`)

    // If it's already a valid Ethereum address, try reverse resolution to find ENS
    if (this.isEthereumAddress(trimmedInput)) {
      console.log(`✅ Input is valid Ethereum address, attempting reverse ENS lookup...`)
      
      try {
        const ensName = await this.resolveAddressToENS(trimmedInput)
        return {
          walletId: trimmedInput,
          resolvedENS: ensName || undefined,
          isENS: false
        }
      } catch (error) {
        console.log(`⚠️ Reverse ENS lookup failed, but address is valid`)
        return {
          walletId: trimmedInput,
          isENS: false
        }
      }
    }

    // If it looks like an ENS name, try to resolve it
    if (this.isENSName(trimmedInput)) {
      console.log(`📝 Input looks like ENS name, attempting resolution...`)
      const result = await this.resolveENSToAddress(trimmedInput)
      
      if (result.error) {
        console.log(`❌ ENS resolution failed: ${result.error}`)
        return {
          walletId: trimmedInput,
          isENS: true,
          error: result.error
        }
      }

      console.log(`✅ ENS resolution successful`)
      return {
        walletId: trimmedInput, // Keep the ENS name as display
        resolvedAddress: result.address!, // Store the resolved address
        isENS: true
      }
    }

    // If it ends with .eth but doesn't match pattern, still try to resolve it
    if (trimmedInput.toLowerCase().endsWith('.eth')) {
      console.log(`🔍 Input ends with .eth, forcing ENS resolution attempt...`)
      const result = await this.resolveENSToAddress(trimmedInput)
      
      if (result.error) {
        return {
          walletId: trimmedInput,
          isENS: true,
          error: result.error
        }
      }

      return {
        walletId: trimmedInput,
        resolvedAddress: result.address!,
        isENS: true
      }
    }

    console.log(`❌ Input doesn't match any valid format`)
    return {
      walletId: trimmedInput,
      isENS: false,
      error: 'Please enter a valid Ethereum address or ENS name'
    }
  }
}

// Export singleton instance
export const ethersENSService = new EthersENSService()
export default ethersENSService
