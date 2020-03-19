# pug-scss-ts-setup

(**psst-setup** in short)

A setup for easy static site development without redundancy and with automation.

## Features

- Pug > minified HTML
- SCSS > compressed and prefixed CSS inlined into HTML
- TypeScript with ES6 modules > bundled, uglified ES5 JavaScript
- Images (`.jpg`, `.png`) > compressed and converted to `.webp`
- Other files are copied to `dist`

* Watch mode compatible with all above

## Installation

```bash
npm i -g pug-scss-ts-setup pug sass typescript
```

Ignore all other peerDependencies than listed above.

## Usage

CLI only for now.

```bash
psst-setup <command>
```

|   command    |                                Description                                 |
| :----------: | :------------------------------------------------------------------------: |
|  `instant`   |         Sets up an empty-ish project and watches files for changes         |
| `instant -e` | Same as instant, but there are more example files to see how it looks like |
|   `build`    |                      Builds the src directory to dist                      |
|   `watch`    |                    Builds and watches files for changes                    |
|   `setup`    |                        Sets up an empty-ish project                        |
|  `setup -e`  |                         Sets up an example project                         |

Run with the `--dev` option for development mode (no minify etc.).

## Contributing

All pull requests, tests and issues are welcome.

## License

[MIT](https://choosealicense.com/licenses/mit/)
