# Phoenix Node 23 Quickstart

This is a simple example of how to instrument an OpenAI API call using OpenTelemetry and OpenInference to a Phoenix collector.

It is split into three demonstrations:

1. An ESM Node.js script that generates a response from the OpenAI API. Located in the main (this) branch.
2. A CommonJS Node.js script that generates a response from the OpenAI API. Located in the commonjs branch.
3. A React client that allows you to enter an OpenAI API key and a prompt, and see the response entirely in the browser. Located in the web branch.

The node script uses TypeScript and Node.js 23 for a build-less experience.

## Installation

```bash
npm install
```

## Usage

```bash
npm run start
```

## Configuration

The `PHOENIX_COLLECTOR_ENDPOINT`, and `OPENAI_API_KEY` environment variables are required.

`PHOENIX_API_KEY` is optional if you are using a Phoenix instance without Authentication.

Run the following commands in your terminal to set the environment variables:

```bash
export PHOENIX_COLLECTOR_ENDPOINT=http://localhost:6006
export OPENAI_API_KEY=your-api-key
# optional
export PHOENIX_API_KEY=your-api-key
```

## Viewing the traces

```bash
# run phoenix locally with in memory database
docker run --pull=always -d --name arize-phoenix -p 6006:6006 -e PHOENIX_SQL_DATABASE_URL="sqlite:///:memory:" arizephoenix/phoenix:latest

# view the traces
open http://localhost:6006/
```
