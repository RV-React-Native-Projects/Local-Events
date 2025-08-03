import * as fs from 'fs';
import * as path from 'path';

const foldersToScan = ['src/assets/svgs'];
const dataOutputPath = path.resolve('src/assets/AllIcons.ts');
const allowedExtensions = ['.ts', '.tsx', '.js', '.jsx'];

const allIconData: string[] = [];

foldersToScan.forEach(folder => {
  const absPath = path.resolve(folder);

  if (!fs.existsSync(absPath)) {
    console.error(`❌ Folder not found: ${absPath}`);
    return;
  }

  const files = fs.readdirSync(absPath);

  const exports = files
    .filter(file => {
      const ext = path.extname(file);
      const isIndexFile = /^index\.(ts|tsx|js|jsx)$/.test(file);
      return allowedExtensions.includes(ext) && !isIndexFile;
    })
    .map(file => {
      const name = path.basename(file, path.extname(file));
      const iconName = name.replace(/Svg$/, '');
      allIconData.push(`  { name: '${iconName}', Svg: ${name} }`);
      return `export { default as ${name} } from './${name}';`;
    });

  if (exports.length > 0) {
    fs.writeFileSync(path.join(absPath, 'index.ts'), exports.join('\n') + '\n');
    console.log(`✅ Updated index.ts in ${folder}`);
  } else {
    console.warn(`⚠️ No valid component files found in ${folder}`);
  }
});

if (allIconData.length > 0) {
  const iconDataContent =
    `import { ${allIconData
      .map(line => line.match(/Svg: (\w+)/)?.[1])
      .join(', ')} } from '@assets/svgs';\n\n` +
    `export const SVGS = [\n${allIconData.join(',\n')}\n] as const;\n`;

  fs.writeFileSync(dataOutputPath, iconDataContent);
  console.log(`✅ Generated AllIcon.ts at ${dataOutputPath}`);
} else {
  console.warn(`⚠️ No icons found to generate AllIcon.ts`);
}
