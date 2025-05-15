const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

// נתיבים למחיקה
const pathsToClean = [
  path.resolve(__dirname, '../node_modules/.cache'),
  path.resolve(__dirname, '../.expo'),
  path.resolve(__dirname, '../.tmp'),
];

// מחיקת תיקיות
pathsToClean.forEach(p => {
  if (fs.existsSync(p)) {
    console.log(`מוחק: ${p}`);
    rimraf.sync(p);
  }
});

console.log('ניקוי הושלם. הפעל את האפליקציה מחדש עם: npm start -- --reset-cache');
