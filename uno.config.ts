import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: {
    'border-color': 'border-light dark:border-[#333]',
  },
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'height': '1em',
        'width': '1em',
        'vertical-align': 'middle',
      },
      warn: true,
    }),
  ],
})
