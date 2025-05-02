# Phoenix Node 23 Quickstart

This is a simple example of how to instrument an OpenAI API call using OpenTelemetry and OpenInference to a Phoenix collector.

It is split into two demonstrations:

1. A Node.js script that generates a response from the OpenAI API.
2. A React client that allows you to enter an OpenAI API key and a prompt, and see the response entirely in the browser.

The node script uses TypeScript and Node.js 23 for a build-less experience.

The react client uses Vite and React 19.

Both are instrumented for OpenTelemetry and OpenInference to a Phoenix collector.

Additionally, it is configured for ESM modules. An example of commonjs is provided in this Pull Request: https://github.com/cephalization/phoenix-node-23-quickstart/pull/1/files

## Installation

```bash
pnpm install
```

## Usage

```bash
pnpm start # for the node script
pnpm ui # for the react client
```

## Configuration

The `PHOENIX_COLLECTOR_ENDPOINT`, and `OPENAI_API_KEY` environment variables are required.

`PHOENIX_API_KEY` is optional if you are using a Phoenix instance without Authentication.

`PHOENIX_ALLOWED_ORIGINS` is required (in Phoenix's execution environment) if you would like to allow the react client to send traces from the browser directly to the Phoenix collector.

```bash
export PHOENIX_COLLECTOR_ENDPOINT=http://localhost:6006
export PHOENIX_API_KEY=your-api-key
export OPENAI_API_KEY=your-api-key
export PHOENIX_ALLOWED_ORIGINS=*
```

## Viewing the traces

```bash
open http://localhost:6006/
```
