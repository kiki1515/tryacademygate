"""
AcademyGate — Release Build Script
Minifies JS & CSS assets into static/dist/ (e.g. app.js -> app.min.js).

The minifier (rjsmin) removes comments, whitespace, and line breaks, which:
  1. Shrinks payload size (faster loads).
  2. Strips all development comments and readable formatting so the client
     bundle is not casually readable via DevTools (F12) > Sources.

Note: client-side JS is inherently visible to a determined user (that is true
for every web app). The real protection is architectural: answer keys and
explanations never leave the server (see /api/package in app.py), and grading
only happens server-side on /api/submit.

Usage:
    python build_release.py            # build minified assets into static/dist/
    python build_release.py --watch    # not supported; run manually after edits
"""

import os
import re
import shutil
import sys

import rcssmin
import rjsmin

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
DIST_DIR = os.path.join(STATIC_DIR, "dist")

JS_FILES = ["app.js", "exam.js", "result.js", "materials.js", "scratchpad.js", "ui-feedback.js"]
CSS_FILES = ["main.css", "exam.css", "result.css"]

# Cache-buster version embedded in templates/index.html asset URLs.
# Regenerated per build (UTC timestamp) so every rebuild busts browser caches.
ASSET_VERSION = __import__("datetime").datetime.now().strftime("%Y%m%d_%H%M%S")


def build_js(name: str) -> None:
    src = os.path.join(STATIC_DIR, "js", name)
    with open(src, "r", encoding="utf-8") as f:
        source = f.read()

    # Collapse whitespace/comments while preserving string literals.
    minified = rjsmin.jsmin(source)

    dist_name = name.replace(".js", ".min.js")
    out = os.path.join(DIST_DIR, "js", dist_name)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8") as f:
        f.write(minified)

    src_size = len(source.encode("utf-8"))
    out_size = len(minified.encode("utf-8"))
    print(f"  {name:16s} -> {dist_name:22s} {src_size//1024:4d} KB -> {out_size//1024:4d} KB ({100 - out_size*100//max(1, src_size):2d}% smaller)")


def build_css(name: str) -> None:
    src = os.path.join(STATIC_DIR, "css", name)
    with open(src, "r", encoding="utf-8") as f:
        source = f.read()

    minified = rcssmin.cssmin(source)

    dist_name = name.replace(".css", ".min.css")
    out = os.path.join(DIST_DIR, "css", dist_name)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8") as f:
        f.write(minified)

    src_size = len(source.encode("utf-8"))
    out_size = len(minified.encode("utf-8"))
    print(f"  {name:16s} -> {dist_name:22s} {src_size//1024:4d} KB -> {out_size//1024:4d} KB ({100 - out_size*100//max(1, src_size):2d}% smaller)")


def update_index_html() -> None:
    """Point templates/index.html at the minified dist assets with a fresh cache-buster."""
    tpl_path = os.path.join(BASE_DIR, "templates", "index.html")
    with open(tpl_path, "r", encoding="utf-8") as f:
        html = f.read()

    html = re.sub(
        r"/static/(?:dist/)?css/([a-z]+)(?:\.min)?\.css(?:\?v=[\w]+)?",
        rf"/static/dist/css/\1.min.css?v={ASSET_VERSION}",
        html,
    )
    html = re.sub(
        r"/static/(?:dist/)?js/([a-z-]+)(?:\.min)?\.js(?:\?v=[\w]+)?",
        rf"/static/dist/js/\1.min.js?v={ASSET_VERSION}",
        html,
    )

    with open(tpl_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"  index.html -> dist assets (cache version {ASSET_VERSION})")


def main() -> None:
    print("AcademyGate release build")
    print("=" * 60)

    # Clean previous dist output
    if os.path.exists(DIST_DIR):
        shutil.rmtree(DIST_DIR)
    os.makedirs(os.path.join(DIST_DIR, "js"), exist_ok=True)
    os.makedirs(os.path.join(DIST_DIR, "css"), exist_ok=True)

    print("[1/3] Minifying JavaScript...")
    for name in JS_FILES:
        build_js(name)

    print("[2/3] Minifying CSS...")
    for name in CSS_FILES:
        build_css(name)

    print("[3/3] Updating templates/index.html...")
    update_index_html()

    print("=" * 60)
    print("Build complete. Run the server with: python app.py")


if __name__ == "__main__":
    if "--watch" in sys.argv:
        print("--watch is not supported. Re-run this script after each edit.")
        sys.exit(1)
    main()
