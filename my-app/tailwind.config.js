/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    boxShadow: {
      'paper': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    },
    fontFamily: {
      'helvetica': ['Helvetica', 'sans-serif'],
      'roboto': [ 'Roboto'],
    },
    extend: {
      boxShadow: {
        'custom': '4px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        'custom1': '0px 4px 4px 0px rgba(0, 0, 0, 0.15)',
        'custom2': '0px 4.159999847412109px 12.479999542236328px 0px rgba(0, 0, 0, 0.15)'

      },
    },
  },
  plugins: [],
  
  corePlugins: {
    preflight: false,
  }
}

