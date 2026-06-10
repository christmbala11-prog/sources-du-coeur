tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        // Couleurs exactes du logo Les Sources du Cœur
        coeur: {
          green:  '#009e60',  // vert principal du logo
          greenDark: '#006e40', // vert foncé footer
          greenLight: '#e6f7ef',
          yellow: '#fcd116',  // jaune cœur
          yellowDark: '#e0b800',
          blue:   '#3a75c4',  // bleu colonnes
          blueDark: '#2255a0',
          black:  '#1a1a1a',
        },
        // Alias pour compatibilité avec l'ancien code
        gabonGreen: {
          50: '#e6f7ef',
          100: '#c2ecd7',
          600: '#009e60',
          700: '#009e60',
          800: '#006e40',
          900: '#004d2c',
        },
        gabonYellow: {
          400: '#fcd116',
          500: '#e0b800',
          600: '#c4a000',
        },
        gabonBlue: {
          600: '#3a75c4',
          700: '#2255a0',
          800: '#1a3f80',
        }
      }
    }
  }
}
