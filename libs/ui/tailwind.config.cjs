const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-[url("/src/assets/logoAvatarInput/new-no-image.svg")]',
    'hover:bg-[url("/src/assets/logoAvatarInput/fluent_camera.svg")]',
  ],
};
