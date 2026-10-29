# Benchmark Frontend DOM Performance

This repository benchmarks DOM rendering and update performance across four popular frontend frameworks:

- React
- Angular
- Vue
- Svelte

Each app implements the same to-do list functionality with add, edit, delete, and priority features so the DOM operations can be compared fairly.

## Objective

Students compare how each framework handles:

- Initial render of large lists
- Update of multiple tasks
- Deletion of multiple tasks
- Memory and timing behavior in the browser

## Included apps

- `apps/react-benchmark`
- `apps/angular-benchmark`
- `apps/vue-benchmark`
- `apps/svelte-benchmark`

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm

### Install all dependencies

```bash
npm install
bash scripts/install-all.sh
```

### Run apps locally

```bash
npm run dev:react
npm run dev:angular
npm run dev:vue
npm run dev:svelte
```

Or run all at once:

```bash
npm run start:all
```

## Benchmark procedure

Use the same set of operations in each app:

1. Render 100, 500, and 1000 tasks
2. Update 50 tasks
3. Delete 50 tasks
4. Record timing using `performance.now()` and browser dev tools

## Example benchmark table

```md
Framework | Render 100 | Render 500 | Render 1000 | Update 50 | Delete 50
---|---:|---:|---:|---:|---:
React | 12ms | 35ms | 74ms | 20ms | 18ms
Angular | 18ms | 48ms | 92ms | 25ms | 22ms
Vue | 14ms | 39ms | 80ms | 21ms | 19ms
Svelte | 10ms | 32ms | 69ms | 17ms | 15ms
```

## Reflection guide

Write a 200–300 word report covering:

- challenges in optimizing DOM operations
- difference in update model across frameworks
- which framework performed best and why

## License

Educational use only.
