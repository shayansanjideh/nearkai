module.exports = {
  theme: {
    extend: {
      fontFamily: {
        primary: ['Roboto', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        number: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        ...require('tailwindcss/colors'),
      },
      boxShadow: {
        hard: '3px 3px 0 black',
      },
    },
  },
  plugins: [],
};
