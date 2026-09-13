"""
Apple Developer Academy Tryout Exam Server
Backend API & Static Web Server powered by Flask
"""

import mimetypes
# Fix Windows registry MIME type corruption where .css is mapped to 'application/x-css' or 'text/plain'
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('image/svg+xml', '.svg')

from flask import Flask, jsonify, request, send_from_directory, render_template
import json
import os
import time
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")

# Initialize Flask without default static url path to avoid Windows registry MIME corruption
app = Flask(__name__, static_folder=None, template_folder=TEMPLATES_DIR)

@app.route('/static/<path:filename>')
def serve_custom_static(filename):
    mimetype = 'text/plain'
    if filename.endswith('.css'):
        mimetype = 'text/css'
    elif filename.endswith('.js'):
        mimetype = 'application/javascript'
    elif filename.endswith('.svg'):
        mimetype = 'image/svg+xml'
    elif filename.endswith('.png'):
        mimetype = 'image/png'
    elif filename.endswith('.json'):
        mimetype = 'application/json'
    response = send_from_directory(STATIC_DIR, filename, mimetype=mimetype)
    response.headers['Content-Type'] = f'{mimetype}; charset=utf-8' if mimetype.startswith('text/') or mimetype == 'application/javascript' else mimetype
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    return response

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
PACKAGES_DIR = os.path.join(DATA_DIR, "packages")

# On serverless hosts (Vercel) the filesystem is read-only except /tmp.
# History is therefore ephemeral there: each isolated lambda instance keeps
# its own /tmp file and the data resets on cold starts. On local dev the
# regular data/history.json is used as before.
IS_SERVERLESS = os.environ.get("VERCEL") == "1" or os.environ.get("VERCEL_ENV")
if IS_SERVERLESS:
    HISTORY_DIR = "/tmp/academygate-data"
    os.makedirs(HISTORY_DIR, exist_ok=True)
    HISTORY_FILE = os.path.join(HISTORY_DIR, "history.json")
else:
    HISTORY_FILE = os.path.join(DATA_DIR, "history.json")

def load_history():
    if not os.path.exists(HISTORY_FILE):
        return []
    try:
        with open(HISTORY_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []

def save_history(history):
    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=2, ensure_ascii=False)

def get_package_data(package_id):
    file_path = os.path.join(PACKAGES_DIR, f"package_{package_id}.json")
    if not os.path.exists(file_path):
        return None
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/packages", methods=["GET"])
def get_packages():
    index_file = os.path.join(DATA_DIR, "packages_index.json")
    if not os.path.exists(index_file):
        return jsonify({"error": "Packages index not found"}), 404
        
    with open(index_file, "r", encoding="utf-8") as f:
        packages = json.load(f)
        
    history = load_history()
    
    # Calculate stats per package
    for pkg in packages:
        pkg_attempts = [h for h in history if h.get("package_id") == pkg["id"]]
        if pkg_attempts:
            best_score = max(h.get("score_percent", 0) for h in pkg_attempts)
            last_score = pkg_attempts[-1].get("score_percent", 0)
            pkg["attempts_count"] = len(pkg_attempts)
            pkg["best_score"] = best_score
            pkg["last_score"] = last_score
            pkg["passed"] = best_score >= 75.0
        else:
            pkg["attempts_count"] = 0
            pkg["best_score"] = None
            pkg["last_score"] = None
            pkg["passed"] = False
            
    return jsonify({
        "packages": packages,
        "total_packages": len(packages),
        "total_questions": sum(p["total_questions"] for p in packages),
        "overall_stats": {
            "completed_count": len([p for p in packages if p.get("attempts_count", 0) > 0]),
            "passed_count": len([p for p in packages if p.get("passed")]),
            "average_score": round(sum(h.get("score_percent", 0) for h in history) / max(1, len(history)), 1) if history else 0
        }
    })

@app.route("/api/package/<int:pkg_id>", methods=["GET"])
def get_package(pkg_id):
    data = get_package_data(pkg_id)
    if not data:
        return jsonify({"error": f"Package {pkg_id} not found"}), 404
        
    mode = request.args.get("mode", "exam")

    # Security: answer keys and explanations are NEVER sent to the client in any
    # mode. Grading happens server-side on /api/submit; explanations are returned
    # only in the post-submit review payload. This prevents answer leaking via
    # browser DevTools (F12 Network/Sources inspection).
    client_questions = []
    for q in data["questions"]:
        q_copy = dict(q)
        q_copy.pop("correct_answer", None)
        q_copy.pop("explanation_id", None)
        q_copy.pop("explanation_en", None)
        client_questions.append(q_copy)
        
    response_data = dict(data)
    response_data["questions"] = client_questions
    response_data["mode"] = mode
    return jsonify(response_data)

@app.route("/api/submit", methods=["POST"])
def submit_exam():
    payload = request.get_json() or {}
    pkg_id = payload.get("package_id")
    user_answers = payload.get("answers", {})  # { "1": "A", "2": "B", ... }
    mode = payload.get("mode", "exam")
    time_spent = payload.get("time_spent_seconds", 0)
    tab_switches = payload.get("tab_switches", 0)
    flags = payload.get("flags", [])
    language = payload.get("language", "id")
    
    pkg_data = get_package_data(pkg_id)
    if not pkg_data:
        return jsonify({"error": "Invalid package id"}), 400
        
    questions = pkg_data["questions"]
    total_q = len(questions)
    
    correct_count = 0
    incorrect_count = 0
    unanswered_count = 0
    
    category_breakdown = {
        "logic": {"name_id": "Logika & Penalaran", "name_en": "Logic & Reasoning", "total": 0, "correct": 0},
        "comp_thinking": {"name_id": "Computational Thinking", "name_en": "Computational Thinking", "total": 0, "correct": 0},
        "ai_math": {"name_id": "Konsep AI & Matematika", "name_en": "AI Concepts & Mathematics", "total": 0, "correct": 0},
        "swift": {"name_id": "Dasar Pemrograman Swift", "name_en": "Swift Programming Basics", "total": 0, "correct": 0},
        "oop": {"name_id": "OOP & Swift Architecture", "name_en": "OOP & Swift Architecture", "total": 0, "correct": 0}
    }
    
    detailed_results = []
    
    for q in questions:
        q_num_str = str(q["number"])
        user_ans = user_answers.get(q_num_str)
        correct_ans = q["correct_answer"]
        cat = q["category"]
        
        if cat in category_breakdown:
            category_breakdown[cat]["total"] += 1
            
        is_correct = (user_ans == correct_ans)
        is_unanswered = (user_ans is None or user_ans == "")
        
        if is_unanswered:
            unanswered_count += 1
            status = "unanswered"
        elif is_correct:
            correct_count += 1
            status = "correct"
            if cat in category_breakdown:
                category_breakdown[cat]["correct"] += 1
        else:
            incorrect_count += 1
            status = "incorrect"
            
        detailed_results.append({
            "number": q["number"],
            "category": cat,
            "difficulty": q.get("difficulty", "Medium"),
            "question_id": q["question_id"],
            "question_en": q["question_en"],
            "options_id": q["options_id"],
            "options_en": q["options_en"],
            "options_svg": q.get("options_svg"),
            "code_snippet": q.get("code_snippet"),
            "visual_svg": q.get("visual_svg"),
            "visual_matrix": q.get("visual_matrix"),
            "user_answer": user_ans,
            "correct_answer": correct_ans,
            "is_correct": is_correct,
            "status": status,
            "is_flagged": q["number"] in flags,
            "explanation_id": q["explanation_id"],
            "explanation_en": q["explanation_en"]
        })
        
    score_percent = round((correct_count / max(1, total_q)) * 100, 1)
    scaled_score = round(score_percent * 10)  # out of 1000 standard
    passed = score_percent >= 75.0
    
    # Calculate category percentages
    for cat_key, cat_data in category_breakdown.items():
        tot = cat_data["total"]
        cor = cat_data["correct"]
        cat_data["percentage"] = round((cor / max(1, tot)) * 100, 1)
        
    attempt_record = {
        "id": int(time.time() * 1000),
        "package_id": pkg_id,
        "package_title_id": pkg_data["title_id"],
        "package_title_en": pkg_data["title_en"],
        "timestamp": datetime.now().isoformat(),
        "mode": mode,
        "language": language,
        "total_questions": total_q,
        "correct_count": correct_count,
        "incorrect_count": incorrect_count,
        "unanswered_count": unanswered_count,
        "score_percent": score_percent,
        "scaled_score": scaled_score,
        "passed": passed,
        "time_spent_seconds": time_spent,
        "tab_switches": tab_switches,
        "category_breakdown": category_breakdown
    }
    
    # Persist in history
    history = load_history()
    history.append(attempt_record)
    save_history(history)
    
    return jsonify({
        "attempt": attempt_record,
        "detailed_results": detailed_results
    })

@app.route("/api/history", methods=["GET"])
def get_history():
    history = load_history()
    return jsonify({"history": list(reversed(history))})

@app.route("/api/reset-history", methods=["POST"])
def reset_history():
    save_history([])
    return jsonify({"success": True, "message": "History cleared successfully"})

if __name__ == "__main__":
    print("=" * 60)
    print(" Apple Developer Academy Tryout Simulator Server")
    print(" Running at http://localhost:5000")
    print("=" * 60)
    app.run(host="0.0.0.0", port=5000, debug=True)
