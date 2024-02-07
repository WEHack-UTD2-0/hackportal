module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'wehack-icon-2023': 'url(https://wehackutd.com/images/logos/updated_wehack_logo.jpg)',
        'Background-image': 'url(../public/BG-darkColors.png)',
        'Mascot-1': 'url(../public/mascot_1.png)',
        'Mascot-2': 'url(../public/mascot_2.png)',
        'Event-border': 'url(../public/back_event.png)',
      },
      fontFamily: {
        //sans: ['wavehaus'],
        lora: ['montserrat'],
      },
      width: {
        '1/8': '12.5%',
        '3/8': '37.5%',
        '5/8': '62.5%',
        '7/8': '87.5%',
        '1/7': '14.29%',
        '6/7': '85.71%',
      },
      height: {
        '9/10': '90%',
      },
      minWidth: {
        64: '16rem',
        56: '14rem',
        '160px': '160px',
        '3/4': '75%',
        '9/10': '90%',
      },
      minHeight: {
        '1/3': '33.33%',
        '9/10': '90%',
        '1/2': '50%',
        '1/4': '25%',
        '5/8': '62.5%',
        16: '4rem',
      },
      colors: {
        blue: {
          450: '#C5C9E4',
          550: '#00B9FF',
          650: '#3980B3',
          750: '#203150',
          850: '#1B4965',
        },
        purple: {
          750: '#957CA6',
          850: '#422E50',
          950: '#BCBCDC',
        },
        pink: {
          150: '#F3E2FF',
        },
        stone: {
          550: 'B4B4B4',
          650: '#808080',
          750: '#424242',
          850: '#232136',
        },
        slate: {
          250: '#E8E8E7',
        },
        violet: {
          350: '#B5A6FE',
          450: '#939AD8',
          750: '#7965DE',
          850: '#732EE2',
        },
        orange: {
          550: '#E0A269',
          650: '#E38F61',
          750: '#D24A32',
        },
        yellow: {
          250: '#FFF2CE',
        },
        green: {
          100: '#909634',
          200: '#556B2F',
        },
        white: {
          100: '#FFE9D7',
        },
      },

      backgroundColor: (theme) => ({
        lightBackground: '#F4F4F4',
        aqua: '#D8F8FF',
        darkAqua: '#B0F1FF',
      }),
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [],
};
