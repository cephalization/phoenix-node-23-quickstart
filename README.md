# Phoenix Node 23 Quickstart

This is a simple example of how to instrument an OpenAI API call using OpenTelemetry and OpenInference to a Phoenix collector.

It uses TypeScript and Node.js 23 for a build-less experience.

Additionally, it is configured for ESM modules. An example of commonjs is provided in this Pull Request: https://github.com/cephalization/phoenix-node-23-quickstart/pull/1/files

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

## Configuration

The `PHOENIX_COLLECTOR_ENDPOINT`, and `OPENAI_API_KEY` environment variables are required.

`PHOENIX_API_KEY` is optional if you are using a Phoenix instance without Authentication.

```bash
export PHOENIX_COLLECTOR_ENDPOINT=http://localhost:6006
export PHOENIX_API_KEY=your-api-key
export OPENAI_API_KEY=your-api-key
```

## Running the example

```bash
npm start
```

## Viewing the traces

```bash
open http://localhost:6006/
```
