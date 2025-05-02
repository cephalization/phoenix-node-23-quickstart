import "./instrumentation";

import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import { OpenAI } from "openai";

const App = () => {
  const [apiKey, _setApiKey] = useState(() => {
    const key = localStorage.getItem("apiKey");
    if (!key) {
      return "";
    }
    return key;
  });

  const setApiKey = (key: string) => {
    localStorage.setItem("apiKey", key);
    _setApiKey(key);
  };

  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  return (
    <main
      style={{
        padding: 16,
        minHeight: "100vh",
        backgroundColor: "oklch(44.2% 0.017 285.786)",
        color: "oklch(98.5% 0 0)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
        <form
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setPrompt("");
            setResponse("");
            const openai = new OpenAI({
              apiKey: apiKey,
              dangerouslyAllowBrowser: true,
            });
            const response = await openai.chat.completions.create({
              model: "gpt-4o",
              messages: [{ role: "user", content: prompt }],
              stream: true,
            });
            for await (const chunk of response) {
              const delta = chunk.choices[0].delta.content;
              if (delta) {
                setResponse((prev) => prev + delta);
              }
            }
            setLoading(false);
          }}
        >
          {/* openai api key */}
          <label
            style={{ display: "flex", flexDirection: "column", gap: "4px" }}
          >
            <span>OpenAI API Key</span>
            <input
              type="password"
              autoComplete="off"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </label>
          {/* prompt input */}
          <label
            style={{ display: "flex", flexDirection: "column", gap: "4px" }}
          >
            <span>Prompt</span>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </label>
          {/* submit button */}
          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Submit"}
          </button>
        </form>
        {/* response */}
        <pre
          style={{
            whiteSpace: "pre-wrap",
            maxHeight: "500px",
            minHeight: "500px",
            overflow: "auto",
            backgroundColor: "oklch(21% 0.006 285.885)",
            color: "oklch(70.5% 0.015 286.067)",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          {response}
        </pre>
      </div>
    </main>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
