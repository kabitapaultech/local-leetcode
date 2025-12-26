let editor;
let isRunning = false;

/* -------------------- MONACO SETUP -------------------- */

require.config({
  paths: {
    vs: "https://unpkg.com/monaco-editor@0.45.0/min/vs"
  }
});

require(["vs/editor/editor.main"], function () {
  editor = monaco.editor.create(document.getElementById("editor"), {
    value: INITIAL_CODE,
    language: "python",

    /* LOOK & FEEL */
    theme: "vs-dark",
    fontSize: 15,
    fontFamily: "JetBrains Mono, Fira Code, monospace",
    lineHeight: 22,

    /* LAYOUT */
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    smoothScrolling: true,
    automaticLayout: true,
    padding: { top: 12 },

    /* CODE HELP */
    autoIndent: "full",
    formatOnPaste: true,
    formatOnType: true,

    /* VISUAL GUIDES */
    lineNumbers: "on",
    renderIndentGuides: true,
    guides: {
      indentation: true
    },

    /* EDITING COMFORT */
    cursorBlinking: "smooth",
    cursorSmoothCaretAnimation: true,
    wordWrap: "on",

    /* SMART SUGGESTIONS */
    quickSuggestions: {
      other: true,
      comments: false,
      strings: false
    },
    suggestOnTriggerCharacters: true,

    /* PYTHON STYLE */
    tabSize: 4,
    insertSpaces: true,

    /* REDUCE NOISE */
    hover: {
      delay: 800
    }
  });

  /* Focus cursor inside solve() */
  editor.revealLineInCenter(1);
  editor.setPosition({ lineNumber: 3, column: 5 });
  editor.focus();
});

/* -------------------- RUN CODE -------------------- */

function runCode() {
  if (isRunning) return;
  isRunning = true;

  const runBtn = document.getElementById("run-btn");
  const output = document.getElementById("output");

  runBtn.disabled = true;
  runBtn.innerText = "Running...";

  output.className = "";
  output.innerHTML = "<div class='muted'>⏳ Running test cases...</div>";

  /* Auto-format before run */
  editor.getAction("editor.action.formatDocument").run();

  const code = editor.getValue();

  /* Beginner guardrail */
  if (code.includes("print(")) {
    alert("⚠️ Use return instead of print() inside solve()");
  }

  fetch("/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code: code,
      problem_id: PROBLEM_ID
    })
  })
    .then(res => res.json())
    .then(data => {
      output.innerHTML = "";
      output.className = "";

      data.details.forEach(test => {
        const row = document.createElement("div");
        row.classList.add("test-line");

        if (test.status === "passed") {
          row.classList.add("test-pass");
          row.innerText = `Test Case ${test.index} ✓ Passed`;
        }

        else if (test.status === "failed") {
          row.classList.add("test-fail");
          row.innerHTML =
            `Test Case ${test.index} ✗ Failed<br>` +
            `<span><b>Input:</b> ${JSON.stringify(test.input)}</span><br>` +
            `<span><b>Expected:</b> ${test.expected}</span><br>` +
            `<span><b>Got:</b> ${test.got}</span>`;
        }

        else if (test.status === "error") {
          row.classList.add("test-error");
          row.innerHTML =
            `Test Case ${test.index} ⚠ Error<br>` +
            (test.input
              ? `<span><b>Input:</b> ${JSON.stringify(test.input)}</span><br>`
              : "") +
            `<span>${test.error}</span>`;
        }

        output.appendChild(row);
      });

      output.classList.add(data.passed ? "success" : "failure");
    })
    .catch(err => {
      output.className = "error";
      output.innerText = "❌ System Error\n\n" + err;
    })
    .finally(() => {
      isRunning = false;
      runBtn.disabled = false;
      runBtn.innerText = "▶ Run";
    });
}

/* -------------------- RESET -------------------- */

function resetCode() {
  editor.setValue(INITIAL_CODE);
  editor.focus();
}

/* -------------------- SHORTCUT -------------------- */
/* Ctrl / Cmd + Enter → Run */

window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    runCode();
  }
});
