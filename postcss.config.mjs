/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    'postcss-preset-env': {
      stage: 1, 
    },
  },
};

export default config;
