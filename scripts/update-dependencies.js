const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');

// רשימת תלויות שצריך לעדכן
const dependenciesToUpdate = {
  'expo-router': '~5.0.7',
};

// בדיקה אם יש צורך בעדכון
let needsUpdate = false;
Object.entries(dependenciesToUpdate).forEach(([pkg, version]) => {
  if (packageJson.dependencies[pkg] && packageJson.dependencies[pkg] !== version) {
    console.log(`צריך לעדכן: ${pkg} מ-${packageJson.dependencies[pkg]} ל-${version}`);
    packageJson.dependencies[pkg] = version;
    needsUpdate = true;
  }
});

// שמירת package.json אם יש צורך בעדכון
if (needsUpdate) {
  fs.writeFileSync(
    path.resolve(__dirname, '../package.json'),
    JSON.stringify(packageJson, null, 2),
    'utf8'
  );
  console.log('package.json עודכן. הרץ npm install כדי להחיל את השינויים.');
} else {
  console.log('כל התלויות מעודכנות.');
}

// ניקוי קבצי קאש של Metro
const cacheFilesToDelete = [
  path.resolve(__dirname, '../node_modules/.cache/metro'),
  path.resolve(__dirname, '../node_modules/.cache/babel-loader'),
  path.resolve(__dirname, '../.expo'),
  path.resolve(__dirname, '../.tmp'),
];

cacheFilesToDelete.forEach(file => {
  try {
    if (fs.existsSync(file)) {
      console.log(`מוחק: ${file}`);
      fs.rmSync(file, { recursive: true, force: true });
    }
  } catch (error) {
    console.error(`שגיאה במחיקת ${file}:`, error);
  }
});

console.log('ניקוי מטמונים הושלם.');
console.log('הפעל את האפליקציה מחדש עם: npm start -- --reset-cache');
