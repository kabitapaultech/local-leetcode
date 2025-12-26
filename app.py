from flask import Flask, render_template, request, jsonify
import json
import os
from runner.code_runner import evaluate_code

app = Flask(__name__)

PROBLEMS_DIR = "problems"
PROGRESS_FILE = "progress.json"


# -------------------- LOAD PROBLEM --------------------

def load_problem(problem_id):
    for day in os.listdir(PROBLEMS_DIR):
        day_path = os.path.join(PROBLEMS_DIR, day)

        if not os.path.isdir(day_path):
            continue

        for file in os.listdir(day_path):
            if file.endswith(".json"):
                file_path = os.path.join(day_path, file)
                with open(file_path) as f:
                    p = json.load(f)
                    if p["id"] == problem_id:
                        return p

    raise Exception(f"Problem {problem_id} not found")


# -------------------- SIDEBAR INDEX --------------------

def load_problem_index():
    index = []

    for day in sorted(os.listdir(PROBLEMS_DIR)):
        day_path = os.path.join(PROBLEMS_DIR, day)

        if not os.path.isdir(day_path):
            continue

        problems = []
        for file in sorted(os.listdir(day_path)):
            if file.endswith(".json"):
                with open(os.path.join(day_path, file)) as f:
                    p = json.load(f)
                    problems.append({
                        "id": p["id"],
                        "title": p["title"]
                    })

        if problems:
            index.append({
                "day": day.replace("_", " ").title(),
                "problems": problems
            })

    print("✅ Sidebar index:", index)  # DEBUG (you WILL see this now)
    return index


# -------------------- PROGRESS --------------------

def load_progress():
    if not os.path.exists(PROGRESS_FILE):
        return {"solved": []}
    with open(PROGRESS_FILE) as f:
        return json.load(f)


def save_progress(progress):
    with open(PROGRESS_FILE, "w") as f:
        json.dump(progress, f, indent=2)


# -------------------- ROUTES --------------------

@app.route("/")
@app.route("/problem/<problem_id>")
def show_problem(problem_id=None):

    sidebar = load_problem_index()

    if not sidebar:
        return "❌ No problems found. Check problems/ folder."

    if problem_id is None:
        problem_id = sidebar[0]["problems"][0]["id"]

    problem = load_problem(problem_id)
    progress = load_progress()

    return render_template(
        "problem.html",
        problem=problem,
        sidebar=sidebar,
        solved=progress.get("solved", [])
    )


@app.route("/run", methods=["POST"])
def run_code():
    data = request.json
    code = data["code"]
    problem_id = data["problem_id"]

    problem = load_problem(problem_id)
    passed, details = evaluate_code(code, problem)

    progress = load_progress()
    if passed and problem_id not in progress["solved"]:
        progress["solved"].append(problem_id)
        save_progress(progress)

    return jsonify({
        "passed": passed,
        "details": details
    })


if __name__ == "__main__":
    app.run(debug=True)
