/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
});

// ***************************************************************************
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { config } from 'dotenv';

// config();

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: process.env.VITE_BACK_URL_DEPLOYED,
//         changeOrigin: true,
//         secure: true,
//       },
//     },
//   },
// });
// ***************************************************************************

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import dotenv from 'dotenv';

// dotenv.config();

// // https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [react()],
//     server: {
//         proxy: {
//             '/api': {
//                 // target: process.env.VITE_BACK_URL_LOC,
//                 target: 'http://localhost:7000',
//                 changeOrigin: true,
//                 rewrite: (path) => path.replace(/^\/api/, ''),
//             },
//         },
//     },
// });
