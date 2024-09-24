import chalk from 'chalk';
import { promises as fs } from 'fs';
import path from 'path';
import { svg_input, svg_output } from './config';

const directories = [svg_input, svg_output];

async function cleanDirectory(directory: string): Promise<void> {
  try {
    const items = await fs.readdir(directory, { withFileTypes: true });

    for (const item of items) {
      const itemPath = path.join(directory, item.name);

      if (item.isFile() && item.name !== '.gitkeep') {
        await fs.unlink(itemPath);
        console.log(chalk.green(`🗑️ Deleted file: ${itemPath}`));
      } else if (item.isDirectory()) {
        await cleanDirectory(itemPath);
        await fs.rmdir(itemPath);
        console.log(chalk.green(`🗑️ Deleted folder: ${itemPath}`));
      }
    }
  } catch (error) {
    console.error(chalk.red(`❌ Error cleaning directory ${directory}:`), error);
  }
}

async function clean(): Promise<void> {
  for (const directory of directories) {
    await cleanDirectory(directory);
  }
}

clean().then(() => {
  console.log(chalk.magenta('✅ Cleaning complete.'));
});
