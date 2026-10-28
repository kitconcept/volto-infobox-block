# Volto Infoboxes Block (@kitconcept/volto-infoboxes-block)

An infobox block for Volto: an optional icon, a title, rich text and a call-to-action button.

[![npm](https://img.shields.io/npm/v/@kitconcept/volto-infoboxes-block)](https://www.npmjs.com/package/@kitconcept/volto-infoboxes-block)
[![](https://img.shields.io/badge/-Storybook-ff4785?logo=Storybook&logoColor=white&style=flat-square)](https://kitconcept.github.io/volto-infoboxes-block/)
[![CI](https://github.com/kitconcept/volto-infoboxes-block/actions/workflows/main.yml/badge.svg)](https://github.com/kitconcept/volto-infoboxes-block/actions/workflows/main.yml)

## Features

The add-on registers an **Infobox** block (`infoboxBlock`) in the `common` block group.
An infobox is a highlighted box with:

- an optional **icon** picked from the site's images (SVG recommended; raster images are rendered at the `teaser` scale),
- a **title**,
- a **rich text** body, edited inline with the Slate editor,
- an optional **call-to-action button** linking to internal content (including anchors) or an external URL,
- an **alignment** option: `center` (default, narrow container width), `left` or `right` (floated next to the following content, stacked on screens up to 768px).

The block data is compatible with the original DLR `infoboxBlock`, so existing content renders without a migration.

### Block data

| Field        | Type                      | Description                                        |
| ------------ | ------------------------- | -------------------------------------------------- |
| `icon`       | object browser item array | Image used as icon                                 |
| `title`      | string                    | Title, rendered as `h2`                            |
| `value`      | Slate value               | Rich text body (`plaintext` is kept in sync)       |
| `buttonText` | string                    | Button label; the button is hidden when empty      |
| `buttonLink` | object browser item array | Button target                                      |
| `align`      | `left`, `right`, `center` | Alignment, defaults to `center`                    |

### Styling

The colors follow the active block theme of [Volto Light Theme](https://github.com/kitconcept/volto-light-theme), with fallbacks when it is not installed.
Override them per project with these CSS custom properties on `.block.infoboxBlock`:

| Property                            | Default                                          |
| ----------------------------------- | ------------------------------------------------ |
| `--infobox-background-color`        | `var(--theme-high-contrast-color, #ecebeb)`      |
| `--infobox-foreground-color`        | `var(--theme-foreground-color, #000)`            |
| `--infobox-button-background-color` | `var(--theme-foreground-color, #000)`            |
| `--infobox-button-foreground-color` | `var(--theme-high-contrast-color, #fff)`         |
| `--infobox-title-font-size`         | `24px`                                           |

```scss
.block.infoboxBlock {
  --infobox-background-color: #e5f0f7;
  --infobox-button-background-color: #00658b;
}
```

## Compatibility

| Add-on version | Volto | Volto Light Theme |
| -------------- | ----- | ----------------- |
| 1.x            | 19.x  | 8.x (optional)    |

The add-on depends on [`@kitconcept/volto-bm3-compat`](https://github.com/kitconcept/volto-bm3-compat), which is installed and loaded automatically.

## Installation

Add `@kitconcept/volto-infoboxes-block` to your `package.json`:

```json
"dependencies": {
    "@kitconcept/volto-infoboxes-block": "*"
}
```

Add `@kitconcept/volto-infoboxes-block` to your `volto.config.js`:

```javascript
const addons = ['@kitconcept/volto-infoboxes-block'];
```

## Test installation

Visit http://localhost:3000/ in a browser and log in.
Edit a page, add an **Infobox** block from the block chooser, and fill in its fields in the sidebar.


## Development

The development of this add-on is done in isolation using pnpm workspaces and `mrs-developer`.
For this reason, it only works with pnpm.


### Prerequisites ✅

-   An [operating system](https://6.docs.plone.org/install/create-project-cookieplone.html#prerequisites-for-installation) that runs all the requirements mentioned.
-   [nvm](https://6.docs.plone.org/install/create-project-cookieplone.html#nvm)
-   [Node.js and pnpm](https://6.docs.plone.org/install/create-project.html#node-js) 24
-   [Make](https://6.docs.plone.org/install/create-project-cookieplone.html#make)
-   [Git](https://6.docs.plone.org/install/create-project-cookieplone.html#git)
-   [Docker](https://docs.docker.com/get-started/get-docker/) (optional)

### Installation 🔧

1.  Clone this repository, then change your working directory.

    ```shell
    git clone git@github.com:kitconcept/volto-infoboxes-block.git
    cd volto-infoboxes-block
    ```

2.  Install this code base.

    ```shell
    make install
    ```


### Make convenience commands

Run `make help` to list the available commands.

```text
help                             Show this help
install                          Installs the add-on in a development environment
start                            Starts Volto, allowing reloading of the add-on during development
build                            Build a production bundle for distribution of the project with the add-on
i18n                             Sync i18n
ci-i18n                          Check if i18n is not synced
format                           Format codebase
lint                             Lint, or catch and remove problems, in code base
release                          Release the add-on on npmjs.org
release-dry-run                  Dry-run the release of the add-on on npmjs.org
test                             Run unit tests
ci-test                          Run unit tests in CI
backend-docker-start             Starts a Docker-based backend for development
storybook-start                  Start Storybook server on port 6006
storybook-build                  Build Storybook
acceptance-frontend-dev-start    Start acceptance frontend in development mode
acceptance-frontend-prod-start   Start acceptance frontend in production mode
acceptance-backend-start         Start backend acceptance server
ci-acceptance-backend-start      Start backend acceptance server in headless mode for CI
acceptance-test                  Start Playwright acceptance tests in interactive mode
install-playwright               Install the Playwright browsers used by the acceptance tests
acceptance-playwright-test       Start Playwright acceptance tests in interactive (UI) mode
ci-acceptance-playwright-test    Run Playwright acceptance tests in headless mode for CI
ci-acceptance-test               Run Playwright acceptance tests in headless mode
```

### Development environment set up

Install package requirements.

```shell
make install
```

### Start developing

Start the backend.

```shell
make backend-docker-start
```

In a separate terminal session, start the frontend.

```shell
make start
```

### Lint code

Run ESlint, Prettier, and Stylelint in analyze mode.

```shell
make lint
```

### Format code

Run ESlint, Prettier, and Stylelint in fix mode.

```shell
make format
```

### i18n

Extract the i18n messages to locales.

```shell
make i18n
```

### Unit tests

Run unit tests.

```shell
make test
```

### Run Playwright acceptance tests

Install the Playwright browser once.

```shell
make install-playwright
```

Run each of these steps in separate terminal sessions.

In the first session, start the backend acceptance server.

```shell
make acceptance-backend-start
```

In the second session, start the frontend in development mode.

```shell
make acceptance-frontend-dev-start
```

In the third session, open the Playwright interactive runner.

```shell
make acceptance-test
```

Or run the tests headlessly.

```shell
make ci-acceptance-test
```

See [acceptance/README.md](acceptance/README.md) for writing tests and the available helpers.

## License

The project is licensed under the MIT license.

## Credits and acknowledgements 🙏

Generated using [Cookieplone (2.0.2)](https://github.com/plone/cookieplone) and [cookieplone-templates (cccf30f)](https://github.com/plone/cookieplone-templates/commit/cccf30f64531530f662d9b8fb326ea1eb465b380) on 2026-10-26 16:38:13.012944. A special thanks to all contributors and supporters!
