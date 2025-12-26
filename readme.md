# 🧠 Local LeetCode — Python Practice System (80/20 Focus)

A **local LeetCode-style coding practice platform** built with **Python + Flask**, designed to teach **core Python concepts practically** through **repetition and test-driven problem solving**.

> ✨ Clone → Run → Code → See test results → Track progress
> No accounts. No internet. No distractions.

---

## 🚀 Why This Project?

Most beginners struggle because:

* Too much theory
* No structure
* No feedback loop

This project solves that by:

* Focusing on **20% Python concepts used 80–90% of the time**
* Enforcing **return-based coding (no print hacks)**
* Showing **exact test failure details**
* Providing a **LeetCode-like coding UI locally**

---

## 🎯 Features

### ✅ Core

* 🧑‍💻 VS Code–like **Monaco Editor**
* ▶️ Run code with **real test cases**
* ❌ Clear failure output (input, expected, got)
* ✅ Per-test pass/fail breakdown
* 📁 Problem navigation sidebar
* 🧠 Auto-format before run
* ⌨️ Keyboard shortcut: `Ctrl / Cmd + Enter`
* 🔁 Reset code anytime

### 📈 Learning

* 7-Day structured Python curriculum
* 80/20 concept coverage
* Repetition-based practice
* Beginner-friendly guardrails

### 📊 Progress

* Solved problems tracked locally (`progress.json`)
* Solved problems highlighted in sidebar

---

## 📚 Curriculum (7 Days)

### 🗓️ Day 1 — Variables & Data Types

* Input/output
* Arithmetic
* Type conversion

### 🗓️ Day 2 — Conditions

* if / elif / else
* Comparisons
* Decision making

### 🗓️ Day 3 — Loops

* for / while
* Counting, iteration
* Mathematical logic

### 🗓️ Day 4 — Strings & Lists

* Indexing & slicing
* String manipulation
* List operations

### 🗓️ Day 5 — Dictionaries & Tuples

* Key-value data
* Frequency counting
* Merging & searching

### 🗓️ Day 6 — Functions

* Reusable logic
* Return values
* Problem decomposition

### 🗓️ Day 7 — Integrated Problems

* FizzBuzz
* Two Sum
* Menu-driven logic
* Mini real-world problems

---

## 🛠️ Tech Stack

* **Python 3.9+**
* **Flask**
* **Monaco Editor**
* HTML / CSS / JavaScript
* JSON-based problem engine

No database. No auth. Fully local.

---

## 📂 Project Structure

```
local-leetcode/
├── app.py
├── runner/
│   └── code_runner.py
├── problems/
│   ├── day1_variables/
│   ├── day2_conditions/
│   ├── day3_loops/
│   ├── day4_strings_lists/
│   ├── day5_dicts_tuples/
│   ├── day6_functions/
│   └── day7_integrated/
├── static/
│   ├── script.js
│   └── style.css
├── templates/
│   └── problem.html
├── questions_config.json
├── generate_problems.py
├── progress.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/local-leetcode.git
cd local-leetcode
```

### 2️⃣ Create virtual environment (recommended)

```bash
python3 -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate      # Windows
```

### 3️⃣ Install dependencies

```bash
pip install flask
```

### 4️⃣ Generate problem files (one time)

```bash
python generate_problems.py
```

### 5️⃣ Run the app

```bash
python app.py
```

Open browser at:

```
http://127.0.0.1:5000
```

---

## 🧪 How Problems Work

Each problem:

* Requires implementing a `solve()` function
* Must **return**, not print
* Is validated using **multiple test cases**
* Stops execution at first failure (like LeetCode)

Example failure output:

```
Test Case 2 ✗ Failed
Input: 7
Expected: Odd
Got: Even
```

---

## 🧠 Teaching Philosophy (80/20)

This system intentionally:

* Avoids unnecessary abstractions early
* Emphasizes **repetition**
* Builds **muscle memory**
* Prepares learners for:

  * OOP
  * Frameworks
  * DSA
  * Interviews

---

## 🧩 Adding New Problems

1. Edit `questions_config.json`
2. Add problem with:

   * id
   * title
   * description
   * function signature
   * test cases
3. Run:

```bash
python generate_problems.py
```

Problems auto-appear in UI.

---

## 🔐 Notes on JSON

* JSON keys **must be strings**
* Numeric dictionary outputs use **string keys**
* This mirrors real API constraints

---

## 🏆 Who Is This For?

* Beginners learning Python
* People preparing for interviews
* Mentors teaching programming
* Anyone who wants **LeetCode practice without LeetCode**

---

## 🚀 Roadmap (Future Enhancements)

* Hidden test cases
* Difficulty levels
* Hint system
* Timer & attempt counter
* Progress dashboard
* Export as course / PDF
* Multi-language support

---

## 🤝 Contributing

PRs welcome for:

* New problems
* Bug fixes
* UI improvements
* Performance optimizations

---

## 📜 License

MIT License — free to use, modify, and share.

---

## ⭐ Final Note

If you’re serious about **learning by doing**, this system will take you from:

> *“I know Python syntax”*
> to
> *“I can solve problems confidently”*

Happy coding 🚀
