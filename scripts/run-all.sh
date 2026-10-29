#!/usr/bin/env bash
set -e

concurrently \
  "npm run dev --prefix apps/react-benchmark" \
  "npm run start --prefix apps/angular-benchmark" \
  "npm run dev --prefix apps/vue-benchmark" \
  "npm run dev --prefix apps/svelte-benchmark"
