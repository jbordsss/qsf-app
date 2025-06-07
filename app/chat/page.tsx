"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResponse("");

    const res = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage: input }),
    });

    const data = await res.json();
    setResponse(data.response);
    setLoading(false);
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Ask My Assistant</h1>
      <textarea
        rows={4}
        style={{ width: "100%", maxWidth: 600 }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <br />
      <button onClick={handleSubmit} disabled={loading} style={{ marginTop: "1rem" }}>
        {loading ? "Thinking..." : "Submit"}
      </button>
      <div style={{ marginTop: "2rem" }}>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </main>
  );
}

