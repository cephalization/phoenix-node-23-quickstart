// instrumentation.ts
const { diag, DiagConsoleLogger, DiagLogLevel } = require("@opentelemetry/api");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-proto");
const { resourceFromAttributes } = require("@opentelemetry/resources");
const { BatchSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { ATTR_SERVICE_NAME } = require("@opentelemetry/semantic-conventions");

const {
  SEMRESATTRS_PROJECT_NAME,
} = require("@arizeai/openinference-semantic-conventions");

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

const COLLECTOR_ENDPOINT = process.env.PHOENIX_COLLECTOR_ENDPOINT;
const SERVICE_NAME = "my-llm-app";

const provider = new NodeTracerProvider({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: SERVICE_NAME,
    // defaults to "default" in the Phoenix UI
    [SEMRESATTRS_PROJECT_NAME]: SERVICE_NAME,
  }),
  spanProcessors: [
    new BatchSpanProcessor(
      new OTLPTraceExporter({
        url: `${COLLECTOR_ENDPOINT}/v1/traces`,
        // (optional) if connecting to Phoenix Cloud
        // headers: { "api-key": process.env.PHOENIX_API_KEY },
        // (optional) if connecting to self-hosted Phoenix with Authentication enabled
        headers: { Authorization: `Bearer ${process.env.PHOENIX_API_KEY}` },
      }),
      {}
    ),
  ],
});

provider.register();

console.log("Provider registered");

// instrumentation.ts

// ... rest of imports
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const {
  OpenAIInstrumentation,
} = require("@arizeai/openinference-instrumentation-openai");

// ... previous code

const instrumentation = new OpenAIInstrumentation();
// instrumentation.manuallyInstrument(OpenAI);

registerInstrumentations({
  instrumentations: [instrumentation],
});
