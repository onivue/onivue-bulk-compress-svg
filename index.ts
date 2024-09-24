import chalk from 'chalk';
import { promises as fs } from 'fs';
import path from 'path';
import { optimize } from 'svgo';
import { svg_input, svg_output } from './config';

const whitespace = ' '.repeat(2);

async function compressSVGs(srcFolder: string, destFolder: string, totalSavedSize: { value: number }): Promise<void> {
  try {
    const items = await fs.readdir(srcFolder, { withFileTypes: true });
    await fs.mkdir(destFolder, { recursive: true });

    for (const item of items) {
      const srcPath = path.join(srcFolder, item.name);
      const destPath = path.join(destFolder, item.name);

      if (item.isDirectory()) {
        await compressSVGs(srcPath, destPath, totalSavedSize);
      } else if (item.isFile() && item.name !== '.gitkeep') {
        if (path.extname(item.name) === '.svg') {
          const data = await fs.readFile(srcPath, 'utf-8');
          const result = optimize(data, {
            path: srcPath,
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false, // Keep the viewBox attribute
                  },
                },
              },
              'removeDimensions', // Remove width and height attributes
              {
                name: 'removeAttrs',
                params: {
                  attrs: '(stroke)', // Remove stroke and fill attributes
                },
              },
            ],
          });
          await fs.writeFile(destPath, result.data);

          const originalSize = Buffer.byteLength(data, 'utf-8');
          const optimizedSize = Buffer.byteLength(result.data, 'utf-8');
          const sizeDifference = originalSize - optimizedSize;
          const sizeDifferenceKB = sizeDifference / 1024;

          totalSavedSize.value += sizeDifferenceKB;

          console.log(chalk.green(`✅ compressed: ${srcPath}`));
          console.log(chalk.blue(`${whitespace}📏 input size: ${(originalSize / 1024).toFixed(2)} KB`));
          console.log(chalk.blue(`${whitespace}📉 output size: ${(optimizedSize / 1024).toFixed(2)} KB`));
          console.log(chalk.yellow(`${whitespace}💾 diff: ${sizeDifferenceKB.toFixed(2)} KB`));
          console.log(chalk.cyan(`${whitespace}📂 output: ${destPath}`));
          console.log(chalk.gray('----------------------------------------'));
        } else {
          await fs.copyFile(srcPath, destPath);
          console.log(chalk.cyan(`📄 copied: ${srcPath}`));
          console.log(chalk.cyan(`${whitespace}📂 output: ${destPath}`));
        }
      }
    }
  } catch (error) {
    console.error(chalk.red('❌ Error processing files:'), error);
  }
}

const totalSavedSize = { value: 0 };
compressSVGs(svg_input, svg_output, totalSavedSize).then(() => {
  console.log(chalk.magenta('========================================'));
  console.log(chalk.magenta(`🎉 Total Saved Size: ${totalSavedSize.value.toFixed(2)} KB`));
  console.log(chalk.magenta('========================================'));
});
