const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

// קבלת קונפיגורציית ברירת מחדל
const config = getDefaultConfig(__dirname);

// שיפור ה-source maps כדי לטפל בשגיאות ENOENT
config.transformer = {
  ...config.transformer,
  minifierPath: 'metro-minify-terser',
  minifierConfig: {
    // להפחית שגיאות ENOENT שקשורות למפות מקור
    sourceMap: {
      includeSources: false,
    },
    compress: {
      drop_console: false,
    },
  },
};

// להתעלם מקבצים מסוימים שעלולים לגרום לשגיאות
config.resolver = {
  ...config.resolver,
  blacklistRE: [
    /.*\/__tests__\/.*/,
    /<IGNORED_PATH>.*/,
  ],
  extraNodeModules: {
    // מאפשר יבוא בנתיבים נוחים
    '@i18n': path.resolve(__dirname, 'i18n'),
    '@utils': path.resolve(__dirname, 'utils'),
    '@components': path.resolve(__dirname, 'components'),
    '@screens': path.resolve(__dirname, 'screens'),
    '@assets': path.resolve(__dirname, 'assets'),
  },
};

// הוספת הגדרות לשיפור החוויה בסביבת פיתוח
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // טיפול בבקשות לדפי HTML
      if (req.url.endsWith('.html')) {
        req.headers['accept-language'] = 'he';
      }
      return middleware(req, res, next);
    };
  },
};

// טיפול בקבצי עיצוב
module.exports = withNativeWind(config, { input: './app/globals.css' });

