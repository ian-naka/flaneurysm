//backend
npm install express cors dotenv helmet cookie-parser express-rate-limit sequelize mysql2 bcryptjs jsonwebtoken zod multer sharp
npm install -D typescript ts-node nodemon @types/express @types/cors @types/cookie-parser @types/bcryptjs @types/jsonwebtoken @types/node @types/multer


//frontend

npm create vite@latest . -- --template react-ts

npm install react react-dom react-router-dom axios lucide-react yet-another-react-lightbox
npm install
npm install react-router-dom axios lucide-react yet-another-react-lightbox
npm install -D tailwindcss@3 postcss autoprefixer

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {}, 
  },
  plugins: [],
} //tailwind.config.js


export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
} // postcss.config.js


@tailwind base;
@tailwind components;
@tailwind utilities;