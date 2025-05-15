// קובץ תצורה נוסף עבור expo
// מאפשר לוגיקה מורכבת יותר מ-app.json
const config = require('./app.json');

// הוספת הגדרות RTL
module.exports = {
  ...config,
  expo: {
    ...config.expo,
    // הגדרות גלובליות נוספות
    extra: {
      ...(config.expo.extra || {}),
      // הגדרות RTL
      isRTL: true,
      defaultLanguage: 'he',
      defaultDirection: 'rtl',
      eas: {
        projectId: '...'
      }
    }
  }
};
