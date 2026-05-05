import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Poppins', sans-serif" },
        body: { value: "'Geist', sans-serif" },
      },
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)
