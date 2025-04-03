import { defineConfig } from 'vite'; // Imports Vite's configuration function
import react from '@vitejs/plugin-react'; // Imports the React plugin for Vite

export default defineConfig({ // Exports the Vite configuration object
  plugins: [react()], // Enables React support (JSX processing, Fast Refresh)

  server: {
    port: 3000
  }
});