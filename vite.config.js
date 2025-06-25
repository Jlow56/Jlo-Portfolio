import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  "browserslist": [
  ">0.2%",
  "not dead",
  "not op_mini all"
]
})
