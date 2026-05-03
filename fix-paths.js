const fs = require('fs');

const files = [
  'src/components/organisms/ProjectsWindow.js x'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let updated = false;
    
    if (content.includes("'/projects/")) {
      content = content.split("'/projects/").join("'/Portfolio/ projects/");
      updated = true;
    }
    if (content.includes('"/projects/')) {
      content = content.split('"/projects/').join('"/Portfolio/projects/');
      updated = true;
    }
    
    if (updated) {
      fs.writeFileSync(file, content);
      console.log(`Fixed: ${file}`);
    } else {
      console.log(`No changes: ${file}`);
    }
  } else {
    console.log(`Not found: ${file}`);
  }
});