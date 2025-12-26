import subprocess
import tempfile
import sys


def evaluate_code(user_code, problem):
    results = []

    for idx, case in enumerate(problem["test_cases"], start=1):

        full_code = (
            user_code.strip()
            + "\n\n"
            + "if __name__ == '__main__':\n"
            + f"    result = solve({case['input']})\n"
            + "    if result is not None:\n"
            + "        print(result)\n"
        )

        with tempfile.NamedTemporaryFile(
            suffix=".py", mode="w", delete=False
        ) as f:
            f.write(full_code)
            filename = f.name

        proc = subprocess.run(
            [sys.executable, filename],
            capture_output=True,
            text=True,
            timeout=2
        )

        if proc.stderr:
            results.append({
                "index": idx,
                "status": "error",
                "error": proc.stderr.strip()
            })
            break

        output = proc.stdout.strip()
        expected = case["output"]

        if output == expected:
            results.append({
                "index": idx,
                "status": "passed"
            })
        else:
            results.append({
                "index": idx,
                "status": "failed",    
                "input": case["input"],
                "expected": expected,
                "got": output
            })
            break

    passed_all = all(r["status"] == "passed" for r in results)

    return passed_all, results
