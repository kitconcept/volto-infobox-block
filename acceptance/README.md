# Playwright tests

This directory contains the browser acceptance tests of `@kitconcept/volto-infoboxes-block`.
They follow the setup of [Volto Light Theme](https://github.com/kitconcept/volto-light-theme/tree/main/frontend/acceptance), and the helpers in `tests/` are copied from there.

| Project | Tests | Runtime |
| --- | --- | --- |
| `acceptance` | `tests/` | Plone acceptance backend with RobotRemote and Volto |

The project is configured in `../playwright.config.ts`.
It runs with one worker, because all tests share one backend that is reset between tests, and retries failures in CI.
Generated artifacts live in `results/acceptance/`, and the HTML report in `../playwright-report/`.

## Run acceptance tests

Install the browser from the repository root:

```sh
make install-playwright
```

Start the servers in separate terminals from the repository root:

```sh
make acceptance-backend-start
```

```sh
make acceptance-frontend-dev-start
```

Open the interactive runner:

```sh
make acceptance-test
```

Run headlessly against those servers:

```sh
make ci-acceptance-test
```

Pass extra Playwright arguments through `PLAYWRIGHT_ARGS`, and change the reporters through `PLAYWRIGHT_REPORTER` (default `list,html`):

```sh
make ci-acceptance-test PLAYWRIGHT_ARGS="--retries=1"
```

Filter tests from the repository root:

```sh
pnpm test:acceptance addons/infobox-block
```

## Write acceptance tests

Put add-on tests in `tests/addons/`, named `<name>.test.ts`.
Import `test` and `expect` from `tests/test.ts`, so each test resets the backend through RobotRemote.
Use accessible locators, web-first assertions, and response waits rather than fixed delays.
Keep UI operations under test in the browser; use `createContent` for fixture setup.
Resolve uploads and other local files with `fixturePath` from `tests/fixtures.ts`, so tests also work from editors and the repository root.

Some Volto widgets render visually hidden radio inputs inside their labels, for example the align widget.
Click the label (`label` filtered by the input's `aria-label`), not the input.

## Helpers

| File | Exports |
| --- | --- |
| `test.ts` | `test`, `expect`, with the automatic backend reset |
| `reset-fixture.ts` | `setup`, `teardown`, `applyProfile`, `runRobotKeyword` |
| `login.ts` | `login` |
| `content.ts` | `createContent` (REST API; Documents get a title and text block) |
| `fixtures.ts` | `fixturePath` for files in `../fixtures/` |
| `blocks.ts` | `addBlockFromChooser` (most used blocks), `addBlockFromSlashMenu`, `save` |
| `accessibility.ts` | `expectNoAccessibilityViolations` (axe-core) |
| `object-browser.ts` | `selectInternalLink` |
| `contents.ts` | `contentRow`, `selectContent`, `renameSelectedContent`, `deleteSelectedContent`, `contentAction` |
| `relations.ts` | `createRichtextRelation`, `createBlockRelation` and their targets |

`fixtures/` holds `image.png` (used by `createContent` for Images), `halfdome2022.jpg` and `file.pdf`.

## Configure the helpers

The helpers read these environment variables:

- `BACKEND_HOST` (default `127.0.0.1`)
- `SITE_ID` (default `plone`)
- `API_PATH` (default `http://${BACKEND_HOST}:55001/${SITE_ID}`)
- `FRONTEND_URL` (default `http://localhost:3000`)
