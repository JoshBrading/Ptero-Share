import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './globals.css'
import {ThemeProvider} from "@/components/them-provider.tsx";


ReactDOM.createRoot(document.getElementById('root')!).render(
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
      </ThemeProvider>
)
