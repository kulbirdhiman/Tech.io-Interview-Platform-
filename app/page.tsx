"use client";

import { useState } from "react";
import axios from "axios";

const languages = [
  { id: 63, name: "JavaScript" },
  { id: 71, name: "Python" },
  { id: 54, name: "C++" },
  { id: 50, name: "C" },
  { id: 62, name: "Java" },
  { id: 72, name: "Ruby" },
  { id: 51, name: "C#" },
  { id: 83, name: "Go" },
];

export default function Compiler() {
  const [code, setCode] = useState('print("Hello World")');
  const [languageId, setLanguageId] = useState(71); // Python default
  const [output, setOutput] = useState("");

  const runCode = async () => {
    setOutput("Running...");

    try {
      const res = await axios.post("/api/compile", {
        language_id: languageId,
        source_code: code,
      });

      const data = res.data;

      setOutput(
        data.stdout ||
          data.stderr ||
          data.compile_output ||
          "No output"
      );
    } catch (error:any) {
      setOutput("Error: " + error.message);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Multi-Language Compiler</h1>

      {/* Language Dropdown */}
      <select
        className="p-2 border rounded"
        value={languageId}
        onChange={(e) => setLanguageId(Number(e.target.value))}
      >
        {languages.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.name}
          </option>
        ))}
      </select>

      {/* Code Editor */}
      <textarea
        className="w-full h-60 p-3 border rounded"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      {/* Run Button */}
      <button
        onClick={runCode}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Run Code
      </button>

      {/* Output Console */}
      <div className="bg-black text-green-400 p-4 rounded h-40 overflow-auto">
        {output}
      </div>
    </div>
  );
}
