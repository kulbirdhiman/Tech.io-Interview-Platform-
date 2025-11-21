"use client";

import { useState } from "react";

export default function CompilerPage() {
  const [code, setCode] = useState(`console.log("Hello World")`);
  const [output, setOutput] = useState("");

  const runCode = () => {
    try {
      let consoleOutput :any = [];

      // Capture console.log output
      const originalLog = console.log;
      console.log = (...args) => consoleOutput.push(args.join(" "));

      eval(code); // Execute code

      console.log = originalLog; // Restore console.log

      setOutput(consoleOutput.join("\n"));
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Online JS Compiler</h1>

      {/* Code Editor */}
      <textarea
        className="w-full h-64 p-3 border rounded"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      {/* Run Button */}
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={runCode}
      >
        Run Code
      </button>

      {/* Output */}
      <div className="mt-4 p-3 border rounded bg-black text-green-400 h-40 overflow-auto">
        {output || "Output will appear here..."}
      </div>
    </div>
  );
}
