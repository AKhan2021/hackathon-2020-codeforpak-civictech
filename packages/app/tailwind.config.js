/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    spacing: {
      1: '2px',
      2: '4px',
      3: '8px',
      4: '12px',
      5: '16px',
      6: '24px',
      7: '32px',
      8: '48px',
      9: '64px',
      10: '72px',
      11: '96px',
      12: '128px',
      13: '192px',
      14: '256px',
      15: '384px',
      16: '512px',
      17: '640px',
      18: '768px',
      '88vh': '88vh',
    },
  },
  variants: {},
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'content/**/*.md',
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
  prefix: 'tw-'
}
