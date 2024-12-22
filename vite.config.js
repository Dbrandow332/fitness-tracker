import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        include: ['react-chartjs-2', 'chart.js'], // Ensure these modules are pre-bundled
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
