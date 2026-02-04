const fs = require("fs");
const path = require("path");

const docsDir = path.resolve(__dirname, "../docs");
const targetDate = "2024-01-01 00:00:00";

function updateFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (match) {
    let frontmatter = match[1];
    let newFrontmatter = frontmatter;

    if (frontmatter.includes("date:")) {
      newFrontmatter = frontmatter.replace(/date: .*/, `date: ${targetDate}`);
    } else {
      newFrontmatter = frontmatter + `\ndate: ${targetDate}`;
    }

    const newContent = content.replace(match[1], newFrontmatter);
    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(`Updated: ${filePath}`);
  } else {
    console.log(`Skipped (no frontmatter): ${filePath}`);
  }
}

function walk(dir, callback) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }
    files.forEach((file) => {
      const filepath = path.join(dir, file);
      fs.stat(filepath, (err, stats) => {
        if (err) {
          console.error("Error stating file:", err);
          return;
        }
        if (stats.isDirectory()) {
          walk(filepath, callback);
        } else if (
          stats.isFile() &&
          file.endsWith(".md") &&
          !file.endsWith("index.md")
        ) {
          callback(filepath);
        }
      });
    });
  });
}

console.log("Starting update...");
walk(docsDir, updateFile);
