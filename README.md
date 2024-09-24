# 🌟 onivue-bulk-compress-svg

## 🚀 How It Works

This project compresses SVG files in bulk using [SVGO](https://github.com/svg/svgo). It reads SVG files from the [`svg_input`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fm0662572%2FDocuments%2Fonivue%2Fonivue-bulk-compress-svg%2Fsvg_input%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22ab80cb92-c14d-4fd0-b08f-6e668c8be74f%22%5D '/Users/m0662572/Documents/onivue/onivue-bulk-compress-svg/svg_input') directory, optimizes them, and saves the compressed versions to the [`svg_output`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fm0662572%2FDocuments%2Fonivue%2Fonivue-bulk-compress-svg%2Fsvg_output%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22ab80cb92-c14d-4fd0-b08f-6e668c8be74f%22%5D '/Users/m0662572/Documents/onivue/onivue-bulk-compress-svg/svg_output') directory. The total saved size is displayed after the process completes.

## 📦 Installation

To install dependencies, run:

```bash
bun install
```

## ▶️ Usage

To compress the SVG files, run:

```bash
bun run index.ts
```

## 🛠️ Built With

- [Bun](https://bun.sh) - A fast all-in-one JavaScript runtime
- [SVGO](https://github.com/svg/svgo) - SVG optimizer
- [Chalk](https://github.com/chalk/chalk) - Terminal string styling

## 📁 Project Structure

- [`svg_input/`](svg_input/) - Directory containing SVG files to be compressed
- [`svg_output/`](svg_output/) - Directory where compressed SVG files will be saved
