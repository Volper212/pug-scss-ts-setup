# pug-scss-ts-setup
(**psst-setup** in short)

A setup for easy static site development without redundancy and with automation.

## Features
- Pug > minified HTML
- SCSS > compressed and prefixed CSS inlined into HTML
- TypeScript with ES6 modules > bundled, uglified ES5 JavaScript
- Images (`.jpg`, `.png`) > compressed and converted to `.webp`
- Other files are copied to `dist`


- Watch mode compatible with all above

## Installation

```bash
npm i -g pug-scss-ts-setup
```

## Usage

CLI only for now.

```bash
psst-setup <command>
```

|  command  |                                 Description                                |
|:---------:|:--------------------------------------------------------------------------:|
| `instant` | Sets up an empty-ish project and watches files for changes                 |
| `example` | Same as instant, but there are more example files to see how it looks like |
| `build`   | Builds the src directory to dist                                           |
| `watch`   | Builds and watches files for changes                                       |
| `setup`   | Sets up an empty-ish project                                               |

## Contributing
All pull requests, tests and issues are welcome.

## License
[MIT](https://choosealicense.com/licenses/mit/)
