/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1D2B59', // כחול כהה לכפתורים הראשיים
          lighter: '#2E3B69',
          darker: '#101A40',
        },
        error: {
          DEFAULT: '#E63A88', // ורוד/אדום שנראה בתמונות
        },
        accent: {
          DEFAULT: '#7C4DFF', // סגול לקישור
          light: '#9E7DFF',
        },
        success: {
          DEFAULT: '#4CAF50', // ירוק להודעות הצלחה
        },
        background: {
          DEFAULT: '#FFFFFF', // רקע לבן
          secondary: '#F7F7F9', // רקע אפור בהיר
        },
        text: {
          DEFAULT: '#1A1A1A', // טקסט שחור רגיל
          secondary: '#6C6C6C', // טקסט אפור משני
          light: '#9E9E9E', // טקסט אפור בהיר
        },
      },
      fontFamily: {
        sans: ['Assistant', 'Rubik', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'button': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      fontSize: {
        'xxs': '0.625rem',
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '3rm',
        'xl': '1.25rem',
        '2xl': '1.5rem',
      },
      lineHeight: {
        'extra-loose': '2.5',
        'super-loose': '3',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}
