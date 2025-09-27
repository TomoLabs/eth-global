// Simple environment variable test
console.log('🧪 Environment Variable Test:')
console.log('VITE_PROJECT_ID:', import.meta.env.VITE_PROJECT_ID)
console.log('VITE_ALCHEMY_API_KEY:', import.meta.env.VITE_ALCHEMY_API_KEY)
console.log('All import.meta.env:', import.meta.env)

// Export for manual testing
window.testEnv = () => {
  console.log('Manual env test:')
  console.log('PROJECT_ID exists:', !!import.meta.env.VITE_PROJECT_ID)
  console.log('ALCHEMY_KEY exists:', !!import.meta.env.VITE_ALCHEMY_API_KEY)
  console.log('PROJECT_ID value:', import.meta.env.VITE_PROJECT_ID)
  console.log('ALCHEMY_KEY value:', import.meta.env.VITE_ALCHEMY_API_KEY)
}

console.log('🧪 Run testEnv() in console to manually test environment variables')
