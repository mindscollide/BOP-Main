<<<<<<< Updated upstream
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
=======
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
>>>>>>> Stashed changes

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< Updated upstream
})
=======
  define: {
    "process.env": import.meta.env,
  },
});
>>>>>>> Stashed changes
