"""
Question Bank Generator for Apple Developer Academy Online Test Simulator.
Generates 12 distinct simulation packages:
- Packages 1 to 10: Standard Academy Simulations (35 questions each, 120 mins)
- Packages 11 & 12: Authentic Special Final Exam Simulations (50 questions each, 120 mins)

Includes full visual diagram support where Figural / Pattern questions have both:
1. Main Question Visual Diagram (SVG)
2. Visual Choices / Options A, B, C, D (Interactive SVGs)
"""

import json
import os
from math import gcd

# --- Realistic CPNS / Apple Academy Figural Question & Option SVG Builders ---

def build_matrix_xor_svg(var_idx=0):
    """
    CPNS TIU 3x3 Matrix Puzzle: Line Overlay & XOR Elimination
    Rule: Cell(3) = Cell(1) XOR Cell(2) [lines present in only one cell are kept, overlapping lines cancel].
    """
    svg = """<svg viewBox="0 0 380 230" class="exam-svg-pattern" xmlns="http://www.w3.org/2000/svg">
      <!-- Row 1: Horizontal + Vertical = Cross -->
      <g transform="translate(10, 10)">
        <rect width="65" height="65" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <line x1="12" y1="32.5" x2="53" y2="32.5" stroke="#64d2ff" stroke-width="3" stroke-linecap="round"/>
        <circle cx="32.5" cy="32.5" r="4" fill="#30d158"/>
      </g>
      <text x="80" y="47" fill="#8e8e93" font-size="16" font-weight="bold">+</text>
      <g transform="translate(95, 10)">
        <rect width="65" height="65" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <line x1="32.5" y1="12" x2="32.5" y2="53" stroke="#64d2ff" stroke-width="3" stroke-linecap="round"/>
        <circle cx="32.5" cy="32.5" r="4" fill="#30d158"/>
      </g>
      <text x="165" y="47" fill="#8e8e93" font-size="16" font-weight="bold">=</text>
      <g transform="translate(180, 10)">
        <rect width="65" height="65" rx="8" fill="#181a20" stroke="#30d158" stroke-width="1.5"/>
        <line x1="12" y1="32.5" x2="53" y2="32.5" stroke="#64d2ff" stroke-width="3" stroke-linecap="round"/>
        <line x1="32.5" y1="12" x2="32.5" y2="53" stroke="#64d2ff" stroke-width="3" stroke-linecap="round"/>
        <circle cx="32.5" cy="32.5" r="4" fill="none" stroke="#ffd60a" stroke-width="2"/>
      </g>

      <!-- Row 2: Diagonal 1 + Diagonal 2 = X -->
      <g transform="translate(10, 85)">
        <rect width="65" height="65" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <line x1="15" y1="15" x2="50" y2="50" stroke="#bf5af2" stroke-width="3" stroke-linecap="round"/>
        <line x1="12" y1="32.5" x2="53" y2="32.5" stroke="#64d2ff" stroke-width="3" stroke-linecap="round"/>
      </g>
      <text x="80" y="122" fill="#8e8e93" font-size="16" font-weight="bold">+</text>
      <g transform="translate(95, 85)">
        <rect width="65" height="65" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <line x1="15" y1="50" x2="50" y2="15" stroke="#bf5af2" stroke-width="3" stroke-linecap="round"/>
        <line x1="12" y1="32.5" x2="53" y2="32.5" stroke="#64d2ff" stroke-width="3" stroke-linecap="round"/>
      </g>
      <text x="165" y="122" fill="#8e8e93" font-size="16" font-weight="bold">=</text>
      <g transform="translate(180, 85)">
        <rect width="65" height="65" rx="8" fill="#181a20" stroke="#30d158" stroke-width="1.5"/>
        <line x1="15" y1="15" x2="50" y2="50" stroke="#bf5af2" stroke-width="3" stroke-linecap="round"/>
        <line x1="15" y1="50" x2="50" y2="15" stroke="#bf5af2" stroke-width="3" stroke-linecap="round"/>
      </g>

      <!-- Row 3: Target Question (?) -->
      <g transform="translate(10, 160)">
        <rect width="65" height="65" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <rect x="20" y="20" width="25" height="25" fill="none" stroke="#ff9f0a" stroke-width="2.5"/>
        <line x1="32.5" y1="12" x2="32.5" y2="53" stroke="#64d2ff" stroke-width="3" stroke-linecap="round"/>
      </g>
      <text x="80" y="197" fill="#8e8e93" font-size="16" font-weight="bold">+</text>
      <g transform="translate(95, 160)">
        <rect width="65" height="65" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <circle cx="32.5" cy="32.5" r="14" fill="none" stroke="#ff375f" stroke-width="2.5"/>
        <line x1="32.5" y1="12" x2="32.5" y2="53" stroke="#64d2ff" stroke-width="3" stroke-linecap="round"/>
      </g>
      <text x="165" y="197" fill="#8e8e93" font-size="16" font-weight="bold">=</text>
      <g transform="translate(180, 160)">
        <rect width="65" height="65" rx="8" fill="rgba(255, 159, 10, 0.15)" stroke="#ff9f0a" stroke-width="2" stroke-dasharray="4"/>
        <text x="32.5" y="42" fill="#ff9f0a" font-size="28" font-weight="bold" text-anchor="middle">?</text>
      </g>
    </svg>"""
    return svg

def build_matrix_xor_options_svg():
    """Visual option SVGs for Matrix XOR Question"""
    return {
        "A": """<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#181a20" stroke="#30d158" stroke-width="2"/>
          <rect x="20" y="20" width="40" height="40" fill="none" stroke="#ff9f0a" stroke-width="3"/>
          <circle cx="40" cy="40" r="14" fill="none" stroke="#ff375f" stroke-width="3"/>
        </svg>""",
        "B": """<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
          <rect x="20" y="20" width="40" height="40" fill="none" stroke="#ff9f0a" stroke-width="3"/>
          <circle cx="40" cy="40" r="14" fill="none" stroke="#ff375f" stroke-width="3"/>
          <line x1="37" y1="15" x2="37" y2="65" stroke="#64d2ff" stroke-width="2.5"/>
          <line x1="43" y1="15" x2="43" y2="65" stroke="#64d2ff" stroke-width="2.5"/>
        </svg>""",
        "C": """<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
          <circle cx="40" cy="40" r="18" fill="none" stroke="#ff375f" stroke-width="3"/>
          <line x1="16" y1="40" x2="64" y2="40" stroke="#64d2ff" stroke-width="3"/>
        </svg>""",
        "D": """<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
          <rect x="20" y="20" width="40" height="40" fill="none" stroke="#ff9f0a" stroke-width="3"/>
          <line x1="20" y1="20" x2="60" y2="60" stroke="#bf5af2" stroke-width="3"/>
          <line x1="20" y1="60" x2="60" y2="20" stroke="#bf5af2" stroke-width="3"/>
        </svg>"""
    }

def build_serial_cpns_figural_svg(step_offset=0):
    """
    CPNS TIU Serial Figural (4 sequential frames, find 5th).
    Rule:
    1. Outer polygon: Triangle (3) -> Square (4) -> Pentagon (5) -> Hexagon (6) -> [Heptagon (7)]
    2. Inner arrow: rotates 45 deg clockwise each step.
    3. Black dot: jumps counter-clockwise around the outer vertices.
    """
    svg = """<svg viewBox="0 0 420 110" class="exam-svg-pattern" xmlns="http://www.w3.org/2000/svg">
      <!-- Frame 1: Triangle (3 sides), Arrow 0 deg, Dot top -->
      <g transform="translate(10, 10)">
        <rect width="70" height="70" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <polygon points="35,16 57,56 13,56" fill="none" stroke="#64d2ff" stroke-width="2"/>
        <line x1="35" y1="36" x2="35" y2="24" stroke="#ff9f0a" stroke-width="2.5" stroke-linecap="round"/>
        <polygon points="35,20 31,26 39,26" fill="#ff9f0a"/>
        <circle cx="35" cy="16" r="3.5" fill="#30d158"/>
        <text x="35" y="82" text-anchor="middle" fill="#8e8e93" font-size="10">Pola 1</text>
      </g>

      <!-- Frame 2: Square (4 sides), Arrow 45 deg, Dot bottom-right -->
      <g transform="translate(90, 10)">
        <rect width="70" height="70" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <rect x="18" y="18" width="34" height="34" fill="none" stroke="#64d2ff" stroke-width="2"/>
        <g transform="rotate(45 35 35)">
          <line x1="35" y1="35" x2="35" y2="23" stroke="#ff9f0a" stroke-width="2.5" stroke-linecap="round"/>
          <polygon points="35,19 31,25 39,25" fill="#ff9f0a"/>
        </g>
        <circle cx="52" cy="52" r="3.5" fill="#30d158"/>
        <text x="35" y="82" text-anchor="middle" fill="#8e8e93" font-size="10">Pola 2</text>
      </g>

      <!-- Frame 3: Pentagon (5 sides), Arrow 90 deg, Dot bottom-left -->
      <g transform="translate(170, 10)">
        <rect width="70" height="70" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <polygon points="35,16 54,30 47,54 23,54 16,30" fill="none" stroke="#64d2ff" stroke-width="2"/>
        <g transform="rotate(90 35 35)">
          <line x1="35" y1="35" x2="35" y2="23" stroke="#ff9f0a" stroke-width="2.5" stroke-linecap="round"/>
          <polygon points="35,19 31,25 39,25" fill="#ff9f0a"/>
        </g>
        <circle cx="23" cy="54" r="3.5" fill="#30d158"/>
        <text x="35" y="82" text-anchor="middle" fill="#8e8e93" font-size="10">Pola 3</text>
      </g>

      <!-- Frame 4: Hexagon (6 sides), Arrow 135 deg, Dot top-left -->
      <g transform="translate(250, 10)">
        <rect width="70" height="70" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <polygon points="35,16 52,26 52,44 35,54 18,44 18,26" fill="none" stroke="#64d2ff" stroke-width="2"/>
        <g transform="rotate(135 35 35)">
          <line x1="35" y1="35" x2="35" y2="23" stroke="#ff9f0a" stroke-width="2.5" stroke-linecap="round"/>
          <polygon points="35,19 31,25 39,25" fill="#ff9f0a"/>
        </g>
        <circle cx="18" cy="26" r="3.5" fill="#30d158"/>
        <text x="35" y="82" text-anchor="middle" fill="#8e8e93" font-size="10">Pola 4</text>
      </g>

      <!-- Frame 5: Target (?) -->
      <g transform="translate(330, 10)">
        <rect width="70" height="70" rx="8" fill="rgba(255, 159, 10, 0.12)" stroke="#ff9f0a" stroke-width="2" stroke-dasharray="4"/>
        <text x="35" y="44" fill="#ff9f0a" font-size="28" font-weight="bold" text-anchor="middle">?</text>
        <text x="35" y="82" text-anchor="middle" fill="#ff9f0a" font-size="10">Pola 5</text>
      </g>
    </svg>"""
    return svg

def build_serial_cpns_options_svg():
    """Visual option SVGs for Serial CPNS Figural Question"""
    return {
        "A": """<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#181a20" stroke="#30d158" stroke-width="2"/>
          <!-- Heptagon 7 sides -->
          <polygon points="40,16 58,26 62,46 49,61 31,61 18,46 22,26" fill="none" stroke="#64d2ff" stroke-width="2"/>
          <!-- Arrow pointing straight down (180 deg) -->
          <g transform="rotate(180 40 40)">
            <line x1="40" y1="40" x2="40" y2="26" stroke="#ff9f0a" stroke-width="3" stroke-linecap="round"/>
            <polygon points="40,22 35,29 45,29" fill="#ff9f0a"/>
          </g>
          <!-- Green dot at bottom vertex -->
          <circle cx="40" cy="61" r="4" fill="#30d158"/>
        </svg>""",
        "B": """<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
          <!-- Hexagon 6 sides -->
          <polygon points="40,16 60,28 60,52 40,64 20,52 20,28" fill="none" stroke="#64d2ff" stroke-width="2"/>
          <!-- Arrow pointing up (0 deg) -->
          <line x1="40" y1="42" x2="40" y2="26" stroke="#ff9f0a" stroke-width="3" stroke-linecap="round"/>
          <polygon points="40,22 35,29 45,29" fill="#ff9f0a"/>
          <circle cx="40" cy="40" r="4" fill="#30d158"/>
        </svg>""",
        "C": """<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
          <!-- Heptagon 7 sides -->
          <polygon points="40,16 58,26 62,46 49,61 31,61 18,46 22,26" fill="none" stroke="#64d2ff" stroke-width="2"/>
          <!-- Arrow pointing left (270 deg) -->
          <g transform="rotate(270 40 40)">
            <line x1="40" y1="40" x2="40" y2="26" stroke="#ff9f0a" stroke-width="3" stroke-linecap="round"/>
            <polygon points="40,22 35,29 45,29" fill="#ff9f0a"/>
          </g>
          <circle cx="40" cy="16" r="4" fill="#30d158"/>
        </svg>""",
        "D": """<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
          <!-- Octagon 8 sides -->
          <polygon points="30,16 50,16 64,30 64,50 50,64 30,64 16,50 16,30" fill="none" stroke="#64d2ff" stroke-width="2"/>
          <g transform="rotate(45 40 40)">
            <line x1="40" y1="40" x2="40" y2="26" stroke="#ff9f0a" stroke-width="3" stroke-linecap="round"/>
            <polygon points="40,22 35,29 45,29" fill="#ff9f0a"/>
          </g>
          <circle cx="64" cy="40" r="4" fill="#30d158"/>
        </svg>"""
    }

def build_analogy_cpns_figural_svg():
    """
    CPNS TIU Analogy Figural: A : B = C : ?
    Rule:
    A -> B: Outer shape gains +1 side, inner shape inverts color (white to black) and rotates 180 degrees.
    C -> ?: Square + white triangle becomes Pentagon + inverted black triangle.
    """
    svg = """<svg viewBox="0 0 380 110" class="exam-svg-pattern" xmlns="http://www.w3.org/2000/svg">
      <!-- Pair 1: Circle + white diamond -> Square + black diamond -->
      <g transform="translate(10, 10)">
        <rect width="70" height="70" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <circle cx="35" cy="35" r="22" fill="none" stroke="#64d2ff" stroke-width="2"/>
        <polygon points="35,22 45,35 35,48 25,35" fill="none" stroke="#ffffff" stroke-width="1.8"/>
        <text x="35" y="94" text-anchor="middle" fill="#8e8e93" font-size="11">Gambar I</text>
      </g>
      <text x="88" y="50" fill="#8e8e93" font-size="18" font-weight="bold">:</text>
      <g transform="translate(100, 10)">
        <rect width="70" height="70" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <polygon points="35,16 57,54 13,54" fill="none" stroke="#64d2ff" stroke-width="2"/>
        <polygon points="35,28 47,38 35,48 23,38" fill="#ffd60a"/>
        <text x="35" y="94" text-anchor="middle" fill="#8e8e93" font-size="11">Gambar II</text>
      </g>

      <text x="180" y="50" fill="#ff9f0a" font-size="18" font-weight="bold">::</text>

      <!-- Pair 2: Square + upright white triangle -> ? -->
      <g transform="translate(200, 10)">
        <rect width="70" height="70" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <polygon points="35,16 57,54 13,54" fill="none" stroke="#64d2ff" stroke-width="2"/>
        <polygon points="35,28 43,46 27,46" fill="none" stroke="#ffffff" stroke-width="1.8"/>
        <text x="35" y="94" text-anchor="middle" fill="#8e8e93" font-size="11">Gambar III</text>
      </g>
      <text x="278" y="50" fill="#8e8e93" font-size="18" font-weight="bold">:</text>
      <g transform="translate(290, 10)">
        <rect width="70" height="70" rx="8" fill="rgba(255, 159, 10, 0.12)" stroke="#ff9f0a" stroke-width="2" stroke-dasharray="4"/>
        <text x="35" y="44" fill="#ff9f0a" font-size="28" font-weight="bold" text-anchor="middle">?</text>
        <text x="35" y="94" text-anchor="middle" fill="#ff9f0a" font-size="11">Gambar IV</text>
      </g>
    </svg>"""
    return svg

def build_analogy_options_svg():
    """Visual option SVGs for Analogy CPNS Figural Question"""
    return {
        "A": """<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#181a20" stroke="#30d158" stroke-width="2"/>
          <!-- Outer Square (4 sides) -->
          <rect x="18" y="18" width="44" height="44" fill="none" stroke="#64d2ff" stroke-width="2.5"/>
          <!-- Inner solid yellow inverted triangle (180 deg) -->
          <polygon points="40,54 28,32 52,32" fill="#ffd60a"/>
        </svg>""",
        "B": """<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
          <!-- Outer Triangle (3 sides) -->
          <polygon points="40,16 62,58 18,58" fill="none" stroke="#64d2ff" stroke-width="2.5"/>
          <!-- Inner upright white outline triangle -->
          <polygon points="40,30 48,48 32,48" fill="none" stroke="#ffffff" stroke-width="2"/>
        </svg>""",
        "C": """<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
          <!-- Outer Circle -->
          <circle cx="40" cy="40" r="24" fill="none" stroke="#64d2ff" stroke-width="2.5"/>
          <!-- Inner solid yellow upright triangle -->
          <polygon points="40,26 52,48 28,48" fill="#ffd60a"/>
        </svg>""",
        "D": """<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
          <!-- Empty Square -->
          <rect x="18" y="18" width="44" height="44" fill="none" stroke="#64d2ff" stroke-width="2.5"/>
        </svg>"""
    }

def build_cube_net_svg():
    """
    CPNS TIU Cube Net / Jaring-jaring Kubus (Spatial Reasoning)
    6 face symbols: Circle, Star, Cross, Square, Diagonal, Dot.
    """
    svg = """<svg viewBox="0 0 320 180" class="exam-svg-pattern" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(70, 10)">
        <!-- Top face (1): Star -->
        <rect x="40" y="0" width="40" height="40" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <polygon points="60,8 63,16 72,16 65,22 68,30 60,25 52,30 55,22 48,16 57,16" fill="#ffd60a"/>

        <!-- Middle row: Left (2, Cross), Middle (3, Circle), Right (4, Filled Square), Far Right (5, Diagonal) -->
        <rect x="0" y="40" width="40" height="40" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <line x1="8" y1="48" x2="32" y2="72" stroke="#ff375f" stroke-width="3"/>
        <line x1="8" y1="72" x2="32" y2="48" stroke="#ff375f" stroke-width="3"/>

        <rect x="40" y="40" width="40" height="40" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <circle cx="60" cy="60" r="12" fill="none" stroke="#30d158" stroke-width="3"/>

        <rect x="80" y="40" width="40" height="40" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <rect x="90" y="50" width="20" height="20" fill="#64d2ff"/>

        <rect x="120" y="40" width="40" height="40" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <line x1="126" y1="46" x2="154" y2="74" stroke="#bf5af2" stroke-width="3"/>

        <!-- Bottom face (6): Dot -->
        <rect x="40" y="80" width="40" height="40" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <circle cx="60" cy="100" r="6" fill="#ff9f0a"/>
      </g>
      <text x="160" y="150" text-anchor="middle" fill="#8e8e93" font-size="12">Jaring-jaring Kubus 2D</text>
    </svg>"""
    return svg

def build_cube_net_options_svg():
    """Visual option SVGs for Cube Net Question"""
    return {
        "A": """<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#181a20" stroke="#30d158" stroke-width="2"/>
          <!-- Orange Dot Face -->
          <circle cx="40" cy="40" r="12" fill="#ff9f0a"/>
        </svg>""",
        "B": """<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
          <!-- Red Cross Face -->
          <line x1="20" y1="20" x2="60" y2="60" stroke="#ff375f" stroke-width="5" stroke-linecap="round"/>
          <line x1="20" y1="60" x2="60" y2="20" stroke="#ff375f" stroke-width="5" stroke-linecap="round"/>
        </svg>""",
        "C": """<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
          <!-- Green Circle Face -->
          <circle cx="40" cy="40" r="18" fill="none" stroke="#30d158" stroke-width="4"/>
        </svg>""",
        "D": """<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
          <!-- Cyan Square Face -->
          <rect x="22" y="22" width="36" height="36" fill="#64d2ff"/>
        </svg>"""
    }

def build_matrix_compass_svg():
    """
    CPNS TIU 3x3 Matrix: Pointer rotation 90 deg clockwise + Dot count increment
    """
    svg = """<svg viewBox="0 0 340 180" class="exam-svg-pattern" xmlns="http://www.w3.org/2000/svg">
      <!-- Row 1 -->
      <g transform="translate(20, 10)">
        <rect x="0" y="0" width="48" height="48" rx="6" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <line x1="24" y1="36" x2="24" y2="12" stroke="#64d2ff" stroke-width="2.5"/>
        <polygon points="24,8 19,16 29,16" fill="#64d2ff"/>
        <circle cx="38" cy="38" r="3" fill="#30d158"/>

        <rect x="56" y="0" width="48" height="48" rx="6" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <line x1="12" y1="24" x2="36" y2="24" stroke="#64d2ff" stroke-width="2.5"/>
        <polygon points="40,24 32,19 32,29" fill="#64d2ff"/>
        <circle cx="12" cy="38" r="3" fill="#30d158"/>
        <circle cx="20" cy="38" r="3" fill="#30d158"/>

        <rect x="112" y="0" width="48" height="48" rx="6" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <line x1="24" y1="12" x2="24" y2="36" stroke="#64d2ff" stroke-width="2.5"/>
        <polygon points="24,40 19,32 29,32" fill="#64d2ff"/>
        <circle cx="10" cy="14" r="3" fill="#30d158"/>
        <circle cx="18" cy="14" r="3" fill="#30d158"/>
        <circle cx="26" cy="14" r="3" fill="#30d158"/>
      </g>

      <!-- Row 2 -->
      <g transform="translate(20, 64)">
        <rect x="0" y="0" width="48" height="48" rx="6" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <line x1="12" y1="24" x2="36" y2="24" stroke="#bf5af2" stroke-width="2.5"/>
        <polygon points="40,24 32,19 32,29" fill="#bf5af2"/>
        <circle cx="12" cy="12" r="3" fill="#30d158"/>
        <circle cx="20" cy="12" r="3" fill="#30d158"/>

        <rect x="56" y="0" width="48" height="48" rx="6" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <line x1="24" y1="12" x2="24" y2="36" stroke="#bf5af2" stroke-width="2.5"/>
        <polygon points="24,40 19,32 29,32" fill="#bf5af2"/>
        <circle cx="10" cy="12" r="3" fill="#30d158"/>
        <circle cx="18" cy="12" r="3" fill="#30d158"/>
        <circle cx="26" cy="12" r="3" fill="#30d158"/>

        <rect x="112" y="0" width="48" height="48" rx="6" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <line x1="36" y1="24" x2="12" y2="24" stroke="#bf5af2" stroke-width="2.5"/>
        <polygon points="8,24 16,19 16,29" fill="#bf5af2"/>
        <circle cx="28" cy="12" r="3" fill="#30d158"/>
        <circle cx="36" cy="12" r="3" fill="#30d158"/>
        <circle cx="28" cy="38" r="3" fill="#30d158"/>
        <circle cx="36" cy="38" r="3" fill="#30d158"/>
      </g>

      <!-- Row 3 (Target at 3,3) -->
      <g transform="translate(20, 118)">
        <rect x="0" y="0" width="48" height="48" rx="6" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <line x1="24" y1="12" x2="24" y2="36" stroke="#ff9f0a" stroke-width="2.5"/>
        <polygon points="24,40 19,32 29,32" fill="#ff9f0a"/>
        <circle cx="10" cy="12" r="3" fill="#30d158"/>
        <circle cx="18" cy="12" r="3" fill="#30d158"/>
        <circle cx="26" cy="12" r="3" fill="#30d158"/>

        <rect x="56" y="0" width="48" height="48" rx="6" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
        <line x1="36" y1="24" x2="12" y2="24" stroke="#ff9f0a" stroke-width="2.5"/>
        <polygon points="8,24 16,19 16,29" fill="#ff9f0a"/>
        <circle cx="28" cy="12" r="3" fill="#30d158"/>
        <circle cx="36" cy="12" r="3" fill="#30d158"/>
        <circle cx="28" cy="38" r="3" fill="#30d158"/>
        <circle cx="36" cy="38" r="3" fill="#30d158"/>

        <rect x="112" y="0" width="48" height="48" rx="6" fill="rgba(255, 159, 10, 0.15)" stroke="#ff9f0a" stroke-width="2" stroke-dasharray="3"/>
        <text x="136" y="32" fill="#ff9f0a" font-size="22" font-weight="bold" text-anchor="middle">?</text>
      </g>
    </svg>"""
    return svg

def build_matrix_compass_options_svg():
    """Visual option SVGs for Matrix Compass Question"""
    return {
        "A": """<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#181a20" stroke="#30d158" stroke-width="2"/>
          <!-- Arrow pointing straight UP (0 deg) -->
          <line x1="40" y1="58" x2="40" y2="24" stroke="#64d2ff" stroke-width="4" stroke-linecap="round"/>
          <polygon points="40,16 32,28 48,28" fill="#64d2ff"/>
          <!-- 5 Green Dots -->
          <circle cx="20" cy="20" r="4" fill="#30d158"/>
          <circle cx="60" cy="20" r="4" fill="#30d158"/>
          <circle cx="20" cy="60" r="4" fill="#30d158"/>
          <circle cx="60" cy="60" r="4" fill="#30d158"/>
          <circle cx="40" cy="42" r="4" fill="#30d158"/>
        </svg>""",
        "B": """<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
          <!-- Arrow pointing RIGHT (90 deg) -->
          <line x1="22" y1="40" x2="56" y2="40" stroke="#64d2ff" stroke-width="4" stroke-linecap="round"/>
          <polygon points="64,40 52,32 52,48" fill="#64d2ff"/>
          <!-- 3 Dots -->
          <circle cx="20" cy="60" r="4" fill="#30d158"/>
          <circle cx="40" cy="60" r="4" fill="#30d158"/>
          <circle cx="60" cy="60" r="4" fill="#30d158"/>
        </svg>""",
        "C": """<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
          <!-- Arrow pointing DOWN (180 deg) -->
          <line x1="40" y1="22" x2="40" y2="56" stroke="#64d2ff" stroke-width="4" stroke-linecap="round"/>
          <polygon points="40,64 32,52 48,52" fill="#64d2ff"/>
          <!-- 2 Dots -->
          <circle cx="24" cy="24" r="4" fill="#30d158"/>
          <circle cx="56" cy="24" r="4" fill="#30d158"/>
        </svg>""",
        "D": """<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#181a20" stroke="#0a84ff" stroke-width="1.5"/>
          <!-- Arrow pointing LEFT (270 deg) -->
          <line x1="58" y1="40" x2="24" y2="40" stroke="#64d2ff" stroke-width="4" stroke-linecap="round"/>
          <polygon points="16,40 28,32 28,48" fill="#64d2ff"/>
          <!-- 4 Dots -->
          <circle cx="20" cy="20" r="4" fill="#30d158"/>
          <circle cx="60" cy="20" r="4" fill="#30d158"/>
          <circle cx="20" cy="60" r="4" fill="#30d158"/>
          <circle cx="60" cy="60" r="4" fill="#30d158"/>
        </svg>"""
    }


# --- Complete Question Generator Functions ---

def get_logic_questions(pkg_id, total_needed=10):
    """Generates varied Logic & Realistic CPNS Figural questions with full SVG Question & Option graphics"""
    qs = []
    
    # 1. Number series
    seed = (pkg_id * 7) % 17 + 3
    s1, s2, s3, s4, s5 = seed, seed + 3, (seed + 3) * 2, (seed + 3) * 2 + 3, ((seed + 3) * 2 + 3) * 2
    ans_s6 = s5 + 3
    qs.append({
        "category": "logic",
        "difficulty": "Medium",
        "question_id": f"Tentukan angka berikutnya dari deret berulang berikut:\n{s1}, {s2}, {s3}, {s4}, {s5}, ...",
        "question_en": f"Determine the next number in the recurring series:\n{s1}, {s2}, {s3}, {s4}, {s5}, ...",
        "options_id": {"A": str(ans_s6), "B": str(s5 * 2), "C": str(ans_s6 + 5), "D": str(s5 + 6)},
        "options_en": {"A": str(ans_s6), "B": str(s5 * 2), "C": str(ans_s6 + 5), "D": str(s5 + 6)},
        "correct_answer": "A",
        "explanation_id": f"Pola operasi adalah selang-seling (+3 lalu ×2):\n{s1} (+3) -> {s2} (×2) -> {s3} (+3) -> {s4} (×2) -> {s5}.\nLangkah berikutnya adalah +3, sehingga {s5} + 3 = {ans_s6}.",
        "explanation_en": f"The operational pattern alternates (+3 then ×2):\n{s1} (+3) -> {s2} (×2) -> {s3} (+3) -> {s4} (×2) -> {s5}.\nNext step is +3, giving {s5} + 3 = {ans_s6}."
    })
    
    # 2. Syllogism (Deductive Logic)
    syllogisms = [
        ("Semua kandidat Apple Developer Academy memiliki computational thinking yang baik. Sebagian lulusan informatika adalah kandidat Apple Developer Academy.",
         "All Apple Developer Academy candidates possess strong computational thinking. Some computer science graduates are Apple Developer Academy candidates.",
         "Sebagian lulusan informatika memiliki computational thinking yang baik.", "Some computer science graduates possess strong computational thinking.",
         "Semua lulusan informatika pasti diterima di Apple Academy.", "All computer science graduates are admitted to Apple Academy.",
         "Hanya kandidat Apple Academy yang menguasai computational thinking.", "Only Apple Academy candidates master computational thinking.",
         "Tidak ada lulusan informatika yang gagal dalam tes.", "No computer science graduates fail the test.",
         "A", "Silogisme kategorik: Semua A adalah B, Sebagian C adalah A -> Kesimpulan sah: Sebagian C adalah B.",
         "Categorical syllogism: All A are B, Some C are A -> Valid conclusion: Some C are B."),
        
        ("Jika aplikasi menggunakan Swift Concurrency async/await, maka thread UI tidak akan mengalami freeze. Aplikasi Foto 'LensCraft' mengalami freeze pada thread UI.",
         "If an app uses Swift Concurrency async/await, the UI thread will not freeze. The 'LensCraft' Photo App experiences UI thread freeze.",
         "Aplikasi Foto 'LensCraft' tidak menggunakan Swift Concurrency async/await secara optimal.", "The 'LensCraft' Photo App does not utilize Swift Concurrency async/await properly.",
         "Aplikasi 'LensCraft' pasti berjalan di iOS versi lama.", "The 'LensCraft' app definitely runs on an older iOS version.",
         "Semua aplikasi iOS pasti pernah mengalami freeze.", "All iOS applications inevitably experience freezes.",
         "Thread UI tidak berhubungan dengan async/await.", "The UI thread is unrelated to async/await.",
         "A", "Kaidah Modus Tollens (P -> ~Q, diberikan Q, maka kesimpulannya ~P).",
         "Modus Tollens inference rule (P -> ~Q, given Q, conclusion is ~P)."),
        
        ("Semua struktur data Struct di Swift bersifat Value Type. Semua Value Type disalin saat dioper ke fungsi (copy-on-write).",
         "All Struct data structures in Swift are Value Types. All Value Types are copied when passed to functions (copy-on-write).",
         "Semua struktur data Struct di Swift disalin saat dioper ke fungsi.", "All Struct data structures in Swift are copied when passed to functions.",
         "Hanya Class yang disalin saat dioper ke fungsi.", "Only Classes are copied when passed to functions.",
         "Sebagian Struct di Swift adalah Reference Type.", "Some Structs in Swift are Reference Types.",
         "Semua Value Type selalu disimpan di Heap.", "All Value Types are permanently stored on the Heap.",
         "A", "Silogisme transitif: Semua A adalah B, Semua B adalah C -> Semua A adalah C.",
         "Transitive syllogism: All A are B, All B are C -> All A are C.")
    ]
    syl = syllogisms[(pkg_id - 1) % len(syllogisms)]
    qs.append({
        "category": "logic",
        "difficulty": "Medium",
        "question_id": f"Pilihlah kesimpulan logis deduktif yang paling valid dari premis berikut:\n\"{syl[0]}\"",
        "question_en": f"Select the most valid deductive conclusion from the following premise:\n\"{syl[1]}\"",
        "options_id": {"A": syl[2], "B": syl[4], "C": syl[6], "D": syl[8]},
        "options_en": {"A": syl[3], "B": syl[5], "C": syl[7], "D": syl[9]},
        "correct_answer": syl[10],
        "explanation_id": syl[11],
        "explanation_en": syl[12]
    })
    
    # 3. CPNS Figural 1: Matrix XOR Puzzle with SVG Options
    qs.append({
        "category": "logic",
        "difficulty": "Medium",
        "question_id": "Perhatikan matriks logika figural 3x3 di bawah ini. Garis dan elemen pada kolom 1 dan 2 digabungkan untuk menghasilkan kolom 3 (elemen yang berimpit/sama saling meniadakan / XOR). Gambar pilihan manakah yang seharusnya menggantikan tanda tanya (?)?",
        "question_en": "Observe the 3x3 figural matrix below. Elements in column 1 and 2 combine to form column 3 (identical overlapping elements eliminate each other / XOR logic). Which option figure should replace the question mark (?)?",
        "visual_svg": build_matrix_xor_svg(pkg_id),
        "options_svg": build_matrix_xor_options_svg(),
        "options_id": {
            "A": "Bentuk Persegi luar dan Lingkaran dalam menyatu, sedangkan garis vertikal yang berimpit menghilang.",
            "B": "Bentuk Persegi luar dengan garis vertikal ganda di tengah.",
            "C": "Hanya lingkaran dengan satu garis horizontal.",
            "D": "Kotak persegi dengan garis diagonal silang."
        },
        "options_en": {
            "A": "Outer Square and inner Circle combined, while the overlapping vertical center line is eliminated.",
            "B": "Outer Square with double vertical lines in the center.",
            "C": "Circle only with one horizontal line.",
            "D": "Square box with diagonal crossing lines."
        },
        "correct_answer": "A",
        "explanation_id": "Pola operasi per baris adalah Boolean XOR (gabungan bentuk unik, bagian yang berimpit saling membatalkan). Pada baris 3, kedua kotak memiliki garis vertikal di tengah, sehingga garis tersebut saling meniadakan, menyisakan Persegi luar dan Lingkaran dalam (Opsi A).",
        "explanation_en": "The row pattern follows Boolean XOR (unique shapes combine, identical overlapping lines cancel out). In row 3, both cells have a vertical center line which cancels out, leaving only the outer Square and inner Circle (Option A)."
    })
    
    # 4. CPNS Figural 2: Serial Multi-Element with SVG Options
    qs.append({
        "category": "logic",
        "difficulty": "Medium",
        "question_id": "Perhatikan deret pola serial figural di bawah ini. Terdapat 3 aturan simultan: jumlah sisi poligon luar bertambah (+1), jarum panah berputar searah jarum jam (+45°), dan titik hijau melompat berlawanan jarum jam. Manakah gambar pilihan untuk Pola ke-5 yang tepat?",
        "question_en": "Observe the sequential figural series below. Three rules apply simultaneously: outer polygon sides increase (+1), inner arrow rotates clockwise (+45°), and the green dot jumps counter-clockwise. What is the correct 5th pattern figure?",
        "visual_svg": build_serial_cpns_figural_svg(pkg_id),
        "options_svg": build_serial_cpns_options_svg(),
        "options_id": {
            "A": "Segitujuh (Heptagon, 7 sisi), jarum menghadap ke bawah (180°), titik hijau di sudut bawah-tengah.",
            "B": "Segienam (Hexagon, 6 sisi), jarum menghadap ke atas (0°), titik hijau di pusat.",
            "C": "Segitujuh (Heptagon, 7 sisi), jarum menghadap ke kiri (270°), titik hijau di atas.",
            "D": "Segidelapan (Octagon, 8 sisi), jarum menghadap diagonal 45°."
        },
        "options_en": {
            "A": "Heptagon (7 sides), arrow pointing straight down (180°), green dot at bottom-center vertex.",
            "B": "Hexagon (6 sides), arrow pointing up (0°), green dot at the center.",
            "C": "Heptagon (7 sides), arrow pointing left (270°), green dot at top.",
            "D": "Octagon (8 sides), arrow pointing 45° diagonally."
        },
        "correct_answer": "A",
        "explanation_id": "Analisis 3 elemen:\n1. Sisi poligon luar: 3 (segitiga) -> 4 (persegi) -> 5 (segilima) -> 6 (segienam) -> 7 (segitujuh / heptagon).\n2. Arah panah: 0° -> 45° -> 90° -> 135° -> 180° (menghadap ke bawah).\n3. Titik hijau: berada di sudut bawah poligon (Opsi A).",
        "explanation_en": "Analysis of 3 elements:\n1. Polygon sides: 3 -> 4 -> 5 -> 6 -> 7 (Heptagon).\n2. Arrow angle: 0° -> 45° -> 90° -> 135° -> 180° (pointing straight down).\n3. Green dot: shifts counter-clockwise along vertices to the bottom (Option A)."
    })
    
    # 5. Seating Arrangement Logic
    qs.append({
        "category": "logic",
        "difficulty": "Hard",
        "question_id": "Enam developer (Alif, Bella, Candra, Dita, Erwin, Farhan) duduk melingkar saat sesi sprint review:\n1. Alif duduk berhadapan langsung dengan Dita.\n2. Bella duduk di sebelah kanan Alif.\n3. Erwin duduk tepat di sebelah kiri Dita.\n4. Candra tidak duduk bersebelahan dengan Alif maupun Dita.\nSiapakah yang duduk tepat di sebelah kiri Alif?",
        "question_en": "Six developers (Alif, Bella, Candra, Dita, Erwin, Farhan) sit in a circular table during a sprint review:\n1. Alif sits directly opposite Dita.\n2. Bella sits to the right of Alif.\n3. Erwin sits directly to the left of Dita.\n4. Candra is not adjacent to Alif or Dita.\nWho sits directly to the left of Alif?",
        "options_id": {"A": "Farhan", "B": "Candra", "C": "Erwin", "D": "Bella"},
        "options_en": {"A": "Farhan", "B": "Candra", "C": "Erwin", "D": "Bella"},
        "correct_answer": "A",
        "explanation_id": "Pemetaan kursi melingkar 1-6:\n- Misalkan Alif di posisi 1, Dita di posisi 4 (berhadapan).\n- Bella di kanan Alif (posisi 6).\n- Erwin di kiri Dita (posisi 3).\n- Candra tidak boleh di samping Alif (2, 6) atau Dita (3, 5), maka Candra di posisi 5.\n- Sisa posisi 2 (sebelah kiri Alif) harus diisi oleh Farhan.",
        "explanation_en": "Circular table mapping seats 1 to 6:\n- Let Alif = seat 1, Dita = seat 4 (opposite).\n- Bella = right of Alif (seat 6).\n- Erwin = left of Dita (seat 3).\n- Candra cannot be adjacent to Alif (2, 6) or Dita (3, 5), so Candra = seat 5.\n- Remaining seat 2 (left of Alif) must be Farhan."
    })
    
    # 6. Probability Logic
    r_balls = 4 + (pkg_id % 3)
    b_balls = 6 + (pkg_id % 2)
    tot = r_balls + b_balls
    num = r_balls * (r_balls - 1)
    den = tot * (tot - 1)
    g = gcd(num, den)
    p_num = num // g
    p_den = den // g
    qs.append({
        "category": "logic",
        "difficulty": "Medium",
        "question_id": f"Dalam kotak penyimpanan prototipe, terdapat {r_balls} kabel adaptor merah dan {b_balls} kabel adaptor biru. Jika seorang teknisi mengambil 2 kabel secara acak satu per satu tanpa pengembalian, berapa probabilitas bahwa kedua kabel yang terambil berwarna merah?",
        "question_en": f"In a prototype storage box, there are {r_balls} red adapter cables and {b_balls} blue adapter cables. If a technician draws 2 cables at random one by one without replacement, what is the probability that both cables drawn are red?",
        "options_id": {
            "A": f"{p_num}/{p_den}",
            "B": f"{r_balls}/{tot}",
            "C": f"{(p_num + 1)}/{p_den}",
            "D": f"{p_num}/{(p_den + 3)}"
        },
        "options_en": {
            "A": f"{p_num}/{p_den}",
            "B": f"{r_balls}/{tot}",
            "C": f"{(p_num + 1)}/{p_den}",
            "D": f"{p_num}/{(p_den + 3)}"
        },
        "correct_answer": "A",
        "explanation_id": f"Peluang = ({r_balls}/{tot}) × ({r_balls - 1}/{tot - 1}) = {num}/{den} = {p_num}/{p_den}.",
        "explanation_en": f"Probability = ({r_balls}/{tot}) × ({r_balls - 1}/{tot - 1}) = {num}/{den} = {p_num}/{p_den}."
    })
    
    # 7. CPNS Figural 3: Analogy Shape Transformation with SVG Options
    qs.append({
        "category": "logic",
        "difficulty": "Medium",
        "question_id": "Perhatikan analogi hubungan figural Gambar I : Gambar II = Gambar III : Gambar IV di bawah. Tentukan gambar pilihan yang tepat untuk mengisi Gambar IV berdasarkan transformasi bentuk luar dan rotasi/warna objek dalam!",
        "question_en": "Observe the figural analogy relationship Figure I : Figure II = Figure III : Figure IV below. Determine the correct option figure for Figure IV based on the outer shape transformation and inner shape inversion!",
        "visual_svg": build_analogy_cpns_figural_svg(),
        "options_svg": build_analogy_options_svg(),
        "options_id": {
            "A": "Bentuk luar Persegi (4 sisi) dan segitiga dalam berwarna kuning pejal serta terbalik (180°).",
            "B": "Bentuk luar segitiga dengan segitiga putih tegak.",
            "C": "Bentuk luar lingkaran dengan segitiga kuning tegak.",
            "D": "Persegi kosong tanpa objek dalam."
        },
        "options_en": {
            "A": "Outer Square (4 sides) and inner triangle becomes solid yellow and inverted (180°).",
            "B": "Outer triangle with white upright triangle.",
            "C": "Outer circle with yellow upright triangle.",
            "D": "Empty square with no inner object."
        },
        "correct_answer": "A",
        "explanation_id": "Aturan analogi: 1) Bentuk luar bertambah 1 sisi (Lingkaran 0 -> Segitiga 3 -> Persegi 4). 2) Objek dalam berubah dari outline putih menjadi terisi warna penuh dan dirotasi 180° (terbalik). Gambar yang memenuhi adalah Opsi A.",
        "explanation_en": "Analogy rule: 1) Outer shape gains sides (Triangle -> Square). 2) Inner object changes from white outline to solid fill and inverts 180°. The matching option is Option A."
    })
    
    # 8. Knights & Liars (AI Truth Verification)
    qs.append({
        "category": "logic",
        "difficulty": "Hard",
        "question_id": "Dua sistem AI cerdas, Alpha dan Beta, diuji logikanya. Sistem T selalu memberi respons jujur (True), sedangkan sistem F selalu memberi respons palsu (False).\nAlpha menyatakan: \"Setidaknya salah satu dari kami berdua adalah sistem F (Palsu).\"\nManakah kesimpulan yang pasti benar mengenai Alpha dan Beta?",
        "question_en": "Two smart AI modules, Alpha and Beta, undergo a logic test. Type T always speaks the truth, while Type F always lies.\nAlpha states: \"At least one of us is a Type F (Liar).\"\nWhich conclusion is definitely true regarding Alpha and Beta?",
        "options_id": {
            "A": "Alpha adalah sistem T (Jujur) dan Beta adalah sistem F (Palsu).",
            "B": "Kedua sistem bertipe F (Palsu).",
            "C": "Alpha bertipe F dan Beta bertipe T.",
            "D": "Kedua sistem bertipe T (Jujur)."
        },
        "options_en": {
            "A": "Alpha is Type T (Truthful) and Beta is Type F (Liar).",
            "B": "Both systems are Type F (Liars).",
            "C": "Alpha is Type F and Beta is Type T.",
            "D": "Both systems are Type T (Truthful)."
        },
        "correct_answer": "A",
        "explanation_id": "Jika Alpha adalah F (pembohong), maka pernyataannya salah, yang berarti 'tidak ada yang F' (keduanya T), kontradiksi karena Alpha adalah F. Maka Alpha pasti T (jujur). Karena pernyataannya benar bahwa setidaknya satu adalah F dan Alpha adalah T, maka Beta pastilah F.",
        "explanation_en": "If Alpha were F (liar), its statement would be false implying both are T — a direct contradiction. Thus Alpha must be T (truthful). Since its statement is true and Alpha is T, Beta must be F."
    })
    
    # 9. CPNS Figural 4: 3D Spatial Cube Net with SVG Options
    qs.append({
        "category": "logic",
        "difficulty": "Medium",
        "question_id": "Perhatikan pola jaring-jaring kubus 2D di bawah ini. Jika jaring-jaring tersebut dilipat membentuk kubus 3 dimensi, simbol muka manakah yang berada di sisi yang TEPAT BERHADAPAN (berlawanan arah) dengan simbol Bintang Kuning (Top Face)?",
        "question_en": "Observe the 2D cube net below. If folded into a 3D cube, which face symbol will be on the side DIRECTLY OPPOSITE to the Yellow Star (Top Face)?",
        "visual_svg": build_cube_net_svg(),
        "options_svg": build_cube_net_options_svg(),
        "options_id": {
            "A": "Simbol Titik Oranye (Bottom Face).",
            "B": "Simbol Silang Merah.",
            "C": "Simbol Lingkaran Hijau.",
            "D": "Simbol Persegi Biru."
        },
        "options_en": {
            "A": "Orange Dot symbol (Bottom Face).",
            "B": "Red Cross symbol.",
            "C": "Green Circle symbol.",
            "D": "Blue Square symbol."
        },
        "correct_answer": "A",
        "explanation_id": "Pada jaring-jaring kubus bentuk salib, dua bidang yang diselingi oleh tepat satu bidang akan saling berhadapan saat dilipat. Bidang Bintang atas dan Bidang Titik bawah diselingi oleh bidang Lingkaran tengah, sehingga keduanya berhadapan langsung (Opsi A).",
        "explanation_en": "In a cross-type cube net, faces separated by exactly one intermediate face become opposite sides when folded. The Top Star and Bottom Dot are separated by the Center Circle, so they are directly opposite (Option A)."
    })
    
    # 10. Inclusion-Exclusion Logic (Venn Diagram)
    qs.append({
        "category": "logic",
        "difficulty": "Easy",
        "question_id": "Dari 120 peserta bootcamp iOS:\n- 75 peserta menguasai SwiftUI\n- 55 peserta menguasai CoreML\n- 25 peserta menguasai keduanya (SwiftUI & CoreML)\nBerapa jumlah peserta yang BELUM menguasai SwiftUI maupun CoreML?",
        "question_en": "Out of 120 iOS bootcamp attendees:\n- 75 attendees know SwiftUI\n- 55 attendees know CoreML\n- 25 attendees know both (SwiftUI & CoreML)\nHow many attendees know NEITHER SwiftUI NOR CoreML?",
        "options_id": {"A": "15 orang", "B": "20 orang", "C": "10 orang", "D": "25 orang"},
        "options_en": {"A": "15 people", "B": "20 people", "C": "10 people", "D": "25 people"},
        "correct_answer": "A",
        "explanation_id": "Prinsip Inklusi-Eksklusi: Total yang menguasai setidaknya satu = 75 + 55 - 25 = 105 orang. Peserta yang belum menguasai keduanya = 120 - 105 = 15 orang.",
        "explanation_en": "Inclusion-Exclusion Principle: Attendees knowing at least one = 75 + 55 - 25 = 105 people. Attendees knowing neither = 120 - 105 = 15 people."
    })
    
    # Additional questions for 50-question packages (up to 15 logic questions)
    if total_needed > 10:
        # 11. CPNS Figural 5: 3x3 Compass Pointer & Dot Matrix with SVG Options
        qs.append({
            "category": "logic",
            "difficulty": "Medium",
            "question_id": "Perhatikan matriks figural rotasi kompas 3x3 di bawah ini. Pada setiap baris, arah panah berputar +90° searah jarum jam dan jumlah titik bertambah +1. Gambar manakah yang harus berada pada kotak (?) baris 3 kolom 3?",
            "question_en": "Observe the 3x3 compass rotation matrix below. In each row, the arrow rotates +90° clockwise and the dot count increases by +1. Which option figure must be in cell (?) at row 3 column 3?",
            "visual_svg": build_matrix_compass_svg(),
            "options_svg": build_matrix_compass_options_svg(),
            "options_id": {
                "A": "Panah menghadap ke ATAS (0°) dengan 5 titik hijau.",
                "B": "Panah menghadap ke KANAN (90°) dengan 3 titik hijau.",
                "C": "Panah menghadap ke BAWAH (180°) dengan 2 titik hijau.",
                "D": "Panah menghadap ke KIRI (270°) dengan 4 titik hijau."
            },
            "options_en": {
                "A": "Arrow pointing UP (0°) with 5 green dots.",
                "B": "Arrow pointing RIGHT (90°) with 3 green dots.",
                "C": "Arrow pointing DOWN (180°) with 2 green dots.",
                "D": "Arrow pointing LEFT (270°) with 4 green dots."
            },
            "correct_answer": "A",
            "explanation_id": "Pada baris 3: Kolom 1 (Panah Bawah, 3 dot) -> Kolom 2 (Panah Kiri, 4 dot) -> Kolom 3 (Panah berputar +90° menjadi Panah Atas, dan jumlah titik menjadi 4 + 1 = 5 dot, Opsi A).",
            "explanation_en": "In row 3: Col 1 (Down, 3 dots) -> Col 2 (Left, 4 dots) -> Col 3 (Arrow rotates +90° to UP, dot count becomes 4 + 1 = 5 dots, Option A)."
        })
        
        # 12. Arithmetic Custom Operator
        qs.append({
            "category": "logic",
            "difficulty": "Medium",
            "question_id": "Sebuah operator biner didefinisikan sebagai a ⊗ b = (a² - b) / 2. Jika 8 ⊗ k = 27, berapakah nilai k?",
            "question_en": "A custom binary operator is defined as a ⊗ b = (a² - b) / 2. If 8 ⊗ k = 27, what is the value of k?",
            "options_id": {"A": "10", "B": "8", "C": "12", "D": "14"},
            "options_en": {"A": "10", "B": "8", "C": "12", "D": "14"},
            "correct_answer": "A",
            "explanation_id": "(8² - k) / 2 = 27 -> 64 - k = 54 -> k = 64 - 54 = 10.",
            "explanation_en": "(8² - k) / 2 = 27 -> 64 - k = 54 -> k = 64 - 54 = 10."
        })
        
        # 13. Speed & Pair Programming Logic
        qs.append({
            "category": "logic",
            "difficulty": "Medium",
            "question_id": "Dev A dapat membangun fitur CoreData dalam 4 jam, sedangkan Dev B menyelesaikannya dalam 12 jam. Jika keduanya bekerja bersama secara berpasangan (Pair Programming), berapa lama fitur tersebut selesai?",
            "question_en": "Dev A can build a CoreData feature in 4 hours, while Dev B finishes it in 12 hours. If both collaborate simultaneously via Pair Programming, how long will it take?",
            "options_id": {"A": "3 jam", "B": "2.5 jam", "C": "4 jam", "D": "5 jam"},
            "options_en": {"A": "3 hours", "B": "2.5 hours", "C": "4 hours", "D": "5 hours"},
            "correct_answer": "A",
            "explanation_id": "Laju bersama = 1/4 + 1/12 = 3/12 + 1/12 = 4/12 = 1/3 per jam. Waktu = 1 / (1/3) = 3 jam.",
            "explanation_en": "Combined rate = 1/4 + 1/12 = 4/12 = 1/3 per hour. Total time = 3 hours."
        })
        
        # 14. Letter Series Pattern
        qs.append({
            "category": "logic",
            "difficulty": "Easy",
            "question_id": "Tentukan huruf berikutnya dari pola deret berikut:\nB, D, G, K, P, ...",
            "question_en": "Determine the next letter in the pattern:\nB, D, G, K, P, ...",
            "options_id": {"A": "V", "B": "U", "C": "W", "D": "T"},
            "options_en": {"A": "V", "B": "U", "C": "W", "D": "T"},
            "correct_answer": "A",
            "explanation_id": "Pola kenaikan indeks abjad: B(+2) -> D(+3) -> G(+4) -> K(+5) -> P(+6) -> V (huruf ke-22).",
            "explanation_en": "Alphabet index step increments: B(+2) -> D(+3) -> G(+4) -> K(+5) -> P(+6) -> V (22nd letter)."
        })
        
        # 15. Conditional Syllogism
        qs.append({
            "category": "logic",
            "difficulty": "Medium",
            "question_id": "Jika user mengaktifkan fitur Do Not Disturb, maka semua notifikasi dinonaktifkan. Pengguna tetap menerima notifikasi panggilan penting.",
            "question_en": "If a user enables Do Not Disturb mode, all notifications are muted. The user still receives urgent call notifications.",
            "options_id": {
                "A": "Fitur Do Not Disturb tidak aktif atau ada pengecualian panggilan penting.",
                "B": "Perangkat pengguna sedang kehabisan baterai.",
                "C": "Semua panggilan suara diblokir permanen.",
                "D": "Mode getar otomatis aktif."
            },
            "options_en": {
                "A": "Do Not Disturb is not active or an urgent call whitelist exception applies.",
                "B": "The user device has run out of battery.",
                "C": "All voice calls are permanently blocked.",
                "D": "Vibrate mode is automatically enabled."
            },
            "correct_answer": "A",
            "explanation_id": "Modus Tollens / Pengecualian Logika Kondisional: Karena notifikasi tetap diterima, kondisi Do Not Disturb mutlak tidak terpenuhi.",
            "explanation_en": "Modus Tollens / Logical condition exception: Since notifications are received, absolute Do Not Disturb condition was not fulfilled."
        })

    return qs[:total_needed]

def get_ct_questions(pkg_id, total_needed=8):
    """Generates Computational Thinking questions (Decomposition, Patterns, Abstraction, Algorithms)"""
    qs = []
    
    # 1. Decomposition
    qs.append({
        "category": "comp_thinking",
        "difficulty": "Easy",
        "question_id": "Ketika merancang aplikasi iOS pelacak kesehatan (Health Tracker) yang kompleks, seorang pengembang memecah sistem menjadi modul independen: Modul Sensor Detak Jantung, Modul Database CoreData, Modul UI SwiftUI, dan Modul CloudKit. Pilar Computational Thinking manakah yang sedang diterapkan?",
        "question_en": "When architecting a complex iOS Health Tracker application, a developer breaks down the system into independent modules: Heart Rate Sensor, CoreData Storage, SwiftUI View, and CloudKit Sync. Which Computational Thinking pillar is being applied?",
        "options_id": {"A": "Dekomposisi (Decomposition)", "B": "Abstraksi (Abstraction)", "C": "Pengenalan Pola (Pattern Recognition)", "D": "Perancangan Algoritma"},
        "options_en": {"A": "Decomposition", "B": "Abstraction", "C": "Pattern Recognition", "D": "Algorithm Design"},
        "correct_answer": "A",
        "explanation_id": "Dekomposisi adalah teknik memecah masalah yang rumit/besar menjadi bagian-bagian yang lebih kecil dan dapat dikelola secara mandiri.",
        "explanation_en": "Decomposition is the technique of breaking down a complex problem into smaller, independently manageable sub-components."
    })
    
    # 2. Pattern Recognition (Debouncing)
    qs.append({
        "category": "comp_thinking",
        "difficulty": "Medium",
        "question_id": "Seorang engineer mengamati bahwa setiap ketukan tombol pencarian memicu panggilan API berlebihan sehingga terjadi lag. Engineer menerapkan pola Debouncing (menunda request 300ms setelah user berhenti mengetik). Pilar Computational Thinking apa yang digunakan untuk mengidentifikasi kesamaan masalah berulang ini?",
        "question_en": "An engineer observes that every keystroke triggers excessive API calls causing lag. The engineer applies Debouncing (delaying requests 300ms after user pauses typing). Which Computational Thinking pillar is used to identify this recurring problem pattern?",
        "options_id": {"A": "Pengenalan Pola (Pattern Recognition)", "B": "De-alokasi Memori", "C": "Kompilasi Dinamis", "D": "Dekomposisi Paralel"},
        "options_en": {"A": "Pattern Recognition", "B": "Memory De-allocation", "C": "Dynamic Compilation", "D": "Parallel Decomposition"},
        "correct_answer": "A",
        "explanation_id": "Pengenalan pola melibatkan kemampuan melihat kesamaan atau keteraturan tren masalah untuk menerapkan solusi desain yang terbukti.",
        "explanation_en": "Pattern recognition involves identifying similarities and recurring trends across problems to apply proven design patterns."
    })
    
    # 3. Abstraction
    qs.append({
        "category": "comp_thinking",
        "difficulty": "Medium",
        "question_id": "Dalam merancang model UI peta GPS di iOS, developer hanya menampilkan garis jalan, arah belokan, dan estimasi waktu, sambil mengabaikan warna cat genteng rumah atau jenis pohon di pinggir jalan. Konsep ini paling tepat merepresentasikan:",
        "question_en": "When designing a GPS navigation UI on iOS, a developer renders only route paths, turn arrows, and ETA, while filtering out house roof colors or roadside tree types. This concept best represents:",
        "options_id": {
            "A": "Abstraksi (Abstraction) — menyaring detail yang tidak relevan agar fokus pada informasi esensial.",
            "B": "Brute Force — memproses seluruh data lingkungan secara mentah.",
            "C": "Rekursi Linear — melakukan perulangan tanpa henti.",
            "D": "Dekomposisi Objek — membagi poligon menjadi array."
        },
        "options_en": {
            "A": "Abstraction — filtering out non-essential details to focus purely on core functional information.",
            "B": "Brute Force — processing all raw environmental data unfiltered.",
            "C": "Linear Recursion — repeating instructions indefinitely.",
            "D": "Object Decomposition — partitioning polygons into arrays."
        },
        "correct_answer": "A",
        "explanation_id": "Abstraksi adalah proses menyembunyikan detail yang tidak esensial untuk memusatkan perhatian pada informasi yang krusial bagi penyelesaian masalah.",
        "explanation_en": "Abstraction is the process of hiding non-essential details to focus on the crucial information required to solve the problem."
    })
    
    # 4. Tracing Loop
    lim = 3 + (pkg_id % 3)
    val = 2
    for _ in range(lim):
        val = (val * 2) - 1
    qs.append({
        "category": "comp_thinking",
        "difficulty": "Medium",
        "question_id": f"Perhatikan cuplikan pseudocode algoritma berikut:\n\n```\nval = 2\nFOR i FROM 1 TO {lim} DO:\n    val = (val * 2) - 1\nEND FOR\nOUTPUT val\n```\n\nBerapakah nilai akhir val yang dicetak?",
        "question_en": f"Observe the following pseudocode algorithm:\n\n```\nval = 2\nFOR i FROM 1 TO {lim} DO:\n    val = (val * 2) - 1\nEND FOR\nOUTPUT val\n```\n\nWhat is the final output value of val?",
        "code_snippet": f"var val = 2\nfor _ in 1...{lim} {{\n    val = (val * 2) - 1\n}}\nprint(val)",
        "options_id": {"A": str(val), "B": str(val + 2), "C": str(val * 2), "D": str(2 ** lim)},
        "options_en": {"A": str(val), "B": str(val + 2), "C": str(val * 2), "D": str(2 ** lim)},
        "correct_answer": "A",
        "explanation_id": f"Hasil trace bertahap sebanyak {lim} iterasi menghasilkan nilai akhir {val}.",
        "explanation_en": f"Step-by-step tracing for {lim} iterations yields the final value {val}."
    })
    
    # 5. Binary Search Complexity
    qs.append({
        "category": "comp_thinking",
        "difficulty": "Hard",
        "question_id": "Jika kamu memiliki daftar kontak terurut alfabetik berisi 2.048 nama di iOS, berapa jumlah maksimum perbandingan yang dibutuhkan untuk menemukan kontak menggunakan algoritma Binary Search?",
        "question_en": "If you have an alphabetically sorted contact list of 2,048 names in iOS, what is the maximum number of comparisons needed to locate a contact using Binary Search?",
        "options_id": {
            "A": "11 kali perbandingan (karena log2(2048) = 11)",
            "B": "1.024 kali perbandingan",
            "C": "2.048 kali perbandingan",
            "D": "32 kali perbandingan"
        },
        "options_en": {
            "A": "11 comparisons (since log2(2048) = 11)",
            "B": "1,024 comparisons",
            "C": "2,048 comparisons",
            "D": "32 comparisons"
        },
        "correct_answer": "A",
        "explanation_id": "Kompleksitas Binary Search adalah O(log2 N). Untuk N = 2048 = 2^11, perbandingan terburuk adalah 11 kali.",
        "explanation_en": "Binary Search complexity is O(log2 N). For N = 2048 = 2^11, maximum worst-case comparisons = 11."
    })
    
    # 6. Stack LIFO vs Queue FIFO
    qs.append({
        "category": "comp_thinking",
        "difficulty": "Easy",
        "question_id": "Fitur navigasi halaman 'NavigationStack' di SwiftUI dan riwayat Undo/Redo pada text editor mengandalkan struktur data dengan prinsip:",
        "question_en": "NavigationStack in SwiftUI and Undo/Redo history in text editors rely on a data structure operating on:",
        "options_id": {
            "A": "Stack (LIFO - Last In First Out)",
            "B": "Queue (FIFO - First In First Out)",
            "C": "Priority Heap",
            "D": "Circular Ring Buffer"
        },
        "options_en": {
            "A": "Stack (LIFO - Last In First Out)",
            "B": "Queue (FIFO - First In First Out)",
            "C": "Priority Heap",
            "D": "Circular Ring Buffer"
        },
        "correct_answer": "A",
        "explanation_id": "Stack menggunakan prinsip LIFO (elemen terakhir yang masuk menjadi yang pertama keluar saat tombol Back ditekan).",
        "explanation_en": "Stack uses LIFO (last item pushed is the first one popped when navigating back)."
    })
    
    # 7. Algorithm State Machine / Flowchart
    qs.append({
        "category": "comp_thinking",
        "difficulty": "Medium",
        "question_id": "Sebuah sistem pengunduhan file di iOS memiliki transisi state: [Idle] -> [Downloading] -> [Paused] / [Completed] / [Failed]. Jika terjadi kegagalan jaringan saat [Downloading], sistem mencoba reconnect hingga 3 kali. Jika tetap gagal, state apa yang dituju?",
        "question_en": "An iOS file download manager has states: [Idle] -> [Downloading] -> [Paused] / [Completed] / [Failed]. If network drops during [Downloading], it retries up to 3 times. If still unsuccessful, which target state is reached?",
        "options_id": {"A": "State [Failed]", "B": "State [Idle]", "C": "State [Completed]", "D": "State [Paused]"},
        "options_en": {"A": "State [Failed]", "B": "State [Idle]", "C": "State [Completed]", "D": "State [Paused]"},
        "correct_answer": "A",
        "explanation_id": "Setelah threshold retry reconnect habis (≥ 3 kali), Finite State Machine berpindah ke state terminal [Failed] dan mengabarkan error kepada user.",
        "explanation_en": "After retry attempts are exhausted (≥ 3 times), the Finite State Machine transitions to the terminal [Failed] state."
    })
    
    # 8. Big-O Space-Time Tradeoff
    qs.append({
        "category": "comp_thinking",
        "difficulty": "Hard",
        "question_id": "Seorang developer mengganti pencarian linear dalam Array berukuran N (O(N)) dengan struktur data Set atau Dictionary berindeks hash. Apa keuntungan dan konsekuensi utama dari perubahan ini?",
        "question_en": "A developer replaces linear lookups in an Array of size N (O(N)) with a hash-indexed Set or Dictionary. What is the primary advantage and tradeoff of this modification?",
        "options_id": {
            "A": "Waktu lookup menjadi O(1) konstan, dengan konsekuensi konsumsi memori (space complexity) yang lebih besar.",
            "B": "Waktu lookup menjadi O(N²), tetapi memori lebih hemat.",
            "C": "Waktu lookup tetap O(N) tanpa ada perubahan memori.",
            "D": "Semua elemen otomatis diurutkan secara alfabetis tanpa overhead."
        },
        "options_en": {
            "A": "Lookup time becomes O(1) constant, with the tradeoff of higher memory footprint (space complexity).",
            "B": "Lookup time degrades to O(N²), but saves memory.",
            "C": "Lookup time stays O(N) with no memory changes.",
            "D": "Elements are automatically sorted with zero overhead."
        },
        "correct_answer": "A",
        "explanation_id": "Hash tables (Set/Dictionary) menawarkan lookup O(1) konstan (time complexity cepat) dengan trade-off penggunaan memori (space complexity) untuk tabel hash.",
        "explanation_en": "Hash tables (Set/Dictionary) provide O(1) constant lookup time with the tradeoff of increased memory space complexity for hash buckets."
    })
    
    # Additional CT questions for 50-question package
    if total_needed > 8:
        # 9. Recursion vs Iteration
        qs.append({
            "category": "comp_thinking",
            "difficulty": "Medium",
            "question_id": "Apa bahaya utama dari pemanggilan fungsi rekursif yang tidak memiliki base condition (kondisi berhenti) atau kedalaman rekursi yang terlalu tinggi di iOS?",
            "question_en": "What is the primary danger of a recursive function lacking a base condition or having extreme recursion depth in iOS?",
            "options_id": {
                "A": "Stack Overflow Crash (kehabisan call stack memory).",
                "B": "Heap Fragmentation Error.",
                "C": "Koneksi Wi-Fi terputus.",
                "D": "Aplikasi beralih ke background mode."
            },
            "options_en": {
                "A": "Stack Overflow Crash (call stack memory exhaustion).",
                "B": "Heap Fragmentation Error.",
                "C": "Wi-Fi connection drop.",
                "D": "App transitions to background mode."
            },
            "correct_answer": "A",
            "explanation_id": "Setiap pemanggilan fungsi rekursif menyimpan stack frame baru di Call Stack. Tanpa base case, memori stack akan habis dan memicu crash Stack Overflow.",
            "explanation_en": "Each recursive call allocates a new stack frame. Without a base case, call stack memory is exhausted leading to a Stack Overflow crash."
        })
        
        # 10. Graph Traversal BFS vs DFS
        qs.append({
            "category": "comp_thinking",
            "difficulty": "Hard",
            "question_id": "Algoritma penjelajahan graf manakah yang paling ideal untuk menemukan rute terpendek (shortest path) dengan jumlah langkah paling sedikit pada peta jaringan stasiun kereta tanpa bobot?",
            "question_en": "Which graph traversal algorithm is best suited to find the shortest path with the minimum number of hops on an unweighted railway transit network?",
            "options_id": {
                "A": "Breadth-First Search (BFS) menggunakan antrean (Queue).",
                "B": "Depth-First Search (DFS) menggunakan tumpukan (Stack).",
                "C": "Bubble Sort Traversal.",
                "D": "In-order Binary Tree Traversal."
            },
            "options_en": {
                "A": "Breadth-First Search (BFS) using a Queue.",
                "B": "Depth-First Search (DFS) using a Stack.",
                "C": "Bubble Sort Traversal.",
                "D": "In-order Binary Tree Traversal."
            },
            "correct_answer": "A",
            "explanation_id": "BFS menjelajah simpul lapis demi lapis (level-by-level) sehingga menjamin ditemukannya rute dengan jumlah edge paling sedikit pada graf tanpa bobot.",
            "explanation_en": "BFS explores graph nodes level-by-level, guaranteeing the shortest path in terms of edge count for unweighted graphs."
        })
        
        # 11. Greedy Algorithm
        qs.append({
            "category": "comp_thinking",
            "difficulty": "Medium",
            "question_id": "Pendekatan algoritma yang selalu memilih opsi terbaik secara lokal pada setiap langkah dengan harapan mencapai solusi optimal global disebut:",
            "question_en": "An algorithmic approach that always selects the locally optimal choice at each step hoping to find a global optimum is known as:",
            "options_id": {
                "A": "Algoritma Greedy",
                "B": "Dynamic Programming",
                "C": "Genetic Programming",
                "D": "Brute Force Exhaustive"
            },
            "options_en": {
                "A": "Greedy Algorithm",
                "B": "Dynamic Programming",
                "C": "Genetic Programming",
                "D": "Brute Force Exhaustive"
            },
            "correct_answer": "A",
            "explanation_id": "Algoritma Greedy membuat keputusan optimal lokal pada setiap langkah tanpa melakukan backtracking.",
            "explanation_en": "A Greedy algorithm makes locally optimal choices at each stage without backtracking."
        })
        
        # 12. Dynamic Programming Memoization
        qs.append({
            "category": "comp_thinking",
            "difficulty": "Hard",
            "question_id": "Dalam menghitung bilangan Fibonacci, teknik menyimpan hasil sub-masalah yang telah dihitung sebelumnya ke dalam tabel/cache agar tidak dihitung berulang kali disebut:",
            "question_en": "When calculating Fibonacci numbers, the technique of storing previously computed sub-problem results in a lookup table/cache to avoid recalculation is called:",
            "options_id": {
                "A": "Memoization (Top-down Dynamic Programming)",
                "B": "Garbage Collection",
                "C": "Deadlock Resolution",
                "D": "Context Switching"
            },
            "options_en": {
                "A": "Memoization (Top-down Dynamic Programming)",
                "B": "Garbage Collection",
                "C": "Deadlock Resolution",
                "D": "Context Switching"
            },
            "correct_answer": "A",
            "explanation_id": "Memoization mengoptimalkan rekursi dari O(2^N) menjadi O(N) dengan meng-cache hasil komputasi.",
            "explanation_en": "Memoization optimizes recursive calls from exponential O(2^N) to linear O(N) by caching intermediate results."
        })

    return qs[:total_needed]

def get_ai_math_questions(pkg_id, total_needed=6):
    """Generates AI Concepts & Applied Mathematics questions"""
    qs = []
    
    # 1. Matrix Dot Product
    v1 = [2, 3]
    v2 = [4, 1]
    dot_val = v1[0]*v2[0] + v1[1]*v2[1]
    qs.append({
        "category": "ai_math",
        "difficulty": "Medium",
        "question_id": f"Diberikan dua vektor representasi fitur gambar dalam model Machine Learning: u = [{v1[0]}, {v1[1]}] dan v = [{v2[0]}, {v2[1]}]. Berapakah hasil perkalian titik (Dot Product) u · v?",
        "question_en": f"Given two feature representation vectors in a Machine Learning model: u = [{v1[0]}, {v1[1]}] and v = [{v2[0]}, {v2[1]}]. What is the Dot Product u · v?",
        "options_id": {"A": str(dot_val), "B": str(dot_val + 3), "C": str(dot_val - 2), "D": str(v1[0]*v2[1] + v1[1]*v2[0])},
        "options_en": {"A": str(dot_val), "B": str(dot_val + 3), "C": str(dot_val - 2), "D": str(v1[0]*v2[1] + v1[1]*v2[0])},
        "correct_answer": "A",
        "explanation_id": f"Perkalian dot product = ({v1[0]} × {v2[0]}) + ({v1[1]} × {v2[1]}) = {v1[0]*v2[0]} + {v1[1]*v2[1]} = {dot_val}.",
        "explanation_en": f"Dot product calculation = ({v1[0]} × {v2[0]}) + ({v1[1]} × {v2[1]}) = {v1[0]*v2[0]} + {v1[1]*v2[1]} = {dot_val}."
    })
    
    # 2. Activation Function (ReLU)
    qs.append({
        "category": "ai_math",
        "difficulty": "Easy",
        "question_id": "Fungsi aktivasi ReLU (Rectified Linear Unit) yang umum digunakan pada deep learning CoreML didefinisikan sebagai f(x) = max(0, x). Jika nilai input x = -4.5, berapakah output dari neuron tersebut?",
        "question_en": "The ReLU (Rectified Linear Unit) activation function in deep learning CoreML models is defined as f(x) = max(0, x). If the input value is x = -4.5, what is the output of the neuron?",
        "options_id": {"A": "0", "B": "-4.5", "C": "4.5", "D": "1"},
        "options_en": {"A": "0", "B": "-4.5", "C": "4.5", "D": "1"},
        "correct_answer": "A",
        "explanation_id": "ReLU mengubah semua nilai negatif menjadi 0, dan mempertahankan nilai positif. max(0, -4.5) = 0.",
        "explanation_en": "ReLU maps all negative inputs to 0, and keeps positive values unchanged. max(0, -4.5) = 0."
    })
    
    # 3. Supervised vs Unsupervised
    qs.append({
        "category": "ai_math",
        "difficulty": "Easy",
        "question_id": "Aplikasi pengenal objek foto di iOS dilatih menggunakan 10.000 gambar yang masing-masing sudah memiliki label nama objek (misal: 'Kucing', 'Mobil', 'Pohon'). Paradigma pembelajaran mesin apakah ini?",
        "question_en": "An iOS photo object recognition model is trained on 10,000 images where each image is pre-labeled with its class name ('Cat', 'Car', 'Tree'). Which machine learning paradigm is this?",
        "options_id": {
            "A": "Supervised Learning (Pembelajaran Terawasi)",
            "B": "Unsupervised Learning (Pembelajaran Tak Terawasi)",
            "C": "Reinforcement Learning (Pembelajaran Penguatan)",
            "D": "Genetic Algorithm"
        },
        "options_en": {
            "A": "Supervised Learning",
            "B": "Unsupervised Learning",
            "C": "Reinforcement Learning",
            "D": "Genetic Algorithm"
        },
        "correct_answer": "A",
        "explanation_id": "Supervised learning menggunakan dataset berlabel (ground truth) untuk melatih model memetakan input ke output.",
        "explanation_en": "Supervised learning uses labeled training datasets (ground truth) to train models to map inputs to outputs."
    })
    
    # 4. Overfitting & Regularization
    qs.append({
        "category": "ai_math",
        "difficulty": "Medium",
        "question_id": "Ketika model AI mendapatkan akurasi 99.8% pada data training tetapi akurasinya anjlok menjadi 54% saat diuji pada data baru (validation set), kondisi apakah yang sedang terjadi pada model?",
        "question_en": "When an AI model achieves 99.8% accuracy on training data but drops to 54% accuracy when evaluated on unseen validation data, what condition is the model experiencing?",
        "options_id": {
            "A": "Overfitting (model menghafal noise data training dan gagal generalisasi).",
            "B": "Underfitting (model terlalu sederhana).",
            "C": "Vanishing Gradient.",
            "D": "Optimal Convergence."
        },
        "options_en": {
            "A": "Overfitting (model memorized training noise and fails to generalize).",
            "B": "Underfitting (model is too simplistic).",
            "C": "Vanishing Gradient.",
            "D": "Optimal Convergence."
        },
        "correct_answer": "A",
        "explanation_id": "Overfitting terjadi saat model terlalu kompleks dan menghafal detail spesifik data latih sehingga kehilangan kemampuan generalisasi pada data baru.",
        "explanation_en": "Overfitting occurs when a model memorizes the training data including noise and fails to generalize to unseen test data."
    })
    
    # 5. Precision vs Recall
    qs.append({
        "category": "ai_math",
        "difficulty": "Hard",
        "question_id": "Pada aplikasi medis pendeteksi dini kanker kulit berbasis Vision Framework, metrik evaluasi manakah yang paling krusial untuk diminimalkan potensi False Negative (pasien kanker terlewat tidak terdeteksi)?",
        "question_en": "In a medical skin cancer detection app using Apple Vision Framework, which evaluation metric is most critical to maximize in order to minimize False Negatives (cancer cases missed)?",
        "options_id": {
            "A": "Recall (Sensitivitas) — memastikan sebanyak mungkin kasus positif terdeteksi.",
            "B": "Precision — proporsi prediksi positif yang benar.",
            "C": "Latency — kecepatan inferensi model.",
            "D": "Model File Size."
        },
        "options_en": {
            "A": "Recall (Sensitivity) — ensuring as many positive cases as possible are captured.",
            "B": "Precision — proportion of positive identifications that were correct.",
            "C": "Latency — model inference speed.",
            "D": "Model File Size."
        },
        "correct_answer": "A",
        "explanation_id": "Recall = TP / (TP + FN). Memaksimalkan Recall berarti meminimalkan False Negative (menghindari pasien sakit tidak terdiagnosis).",
        "explanation_en": "Recall = TP / (TP + FN). Maximizing recall minimizes False Negatives, critical in medical screening."
    })
    
    # 6. Gradient Descent
    qs.append({
        "category": "ai_math",
        "difficulty": "Medium",
        "question_id": "Dalam algoritma Gradient Descent untuk optimasi loss function pada model AI, peranan Learning Rate (α) adalah:",
        "question_en": "In the Gradient Descent algorithm for optimizing an AI model's loss function, the role of the Learning Rate (α) is to:",
        "options_id": {
            "A": "Mengatur ukuran langkah pembaruan bobot model pada setiap iterasi gradien.",
            "B": "Menentukan jumlah thread CPU yang digunakan.",
            "C": "Mengukur kapasitas penyimpanan SSD perangkat.",
            "D": "Mengatur resolusi layar iPhone."
        },
        "options_en": {
            "A": "Control the step size taken towards the minimum of the loss function during weight updates.",
            "B": "Determine CPU thread count.",
            "C": "Measure device SSD storage capacity.",
            "D": "Set iPhone screen resolution."
        },
        "correct_answer": "A",
        "explanation_id": "Learning rate mengontrol seberapa besar bobot disesuaikan terhadap gradien loss function pada setiap langkah iterasi.",
        "explanation_en": "The learning rate controls the magnitude of weight adjustments relative to the loss gradient at each step."
    })
    
    # Additional AI questions for 50-question package
    if total_needed > 6:
        # 7. Cosine Similarity
        qs.append({
            "category": "ai_math",
            "difficulty": "Hard",
            "question_id": "Metrik perbandingan yang mengukur kemiripan arah antara dua embedding vektor dokumen teks tanpa mempedulikan panjang magnitude-nya disebut:",
            "question_en": "Which metric measures the similarity in orientation between two text embedding vectors regardless of their magnitude?",
            "options_id": {
                "A": "Cosine Similarity",
                "B": "Euclidean Distance L2",
                "C": "Manhattan Distance L1",
                "D": "Hamming Distance"
            },
            "options_en": {
                "A": "Cosine Similarity",
                "B": "Euclidean Distance L2",
                "C": "Manhattan Distance L1",
                "D": "Hamming Distance"
            },
            "correct_answer": "A",
            "explanation_id": "Cosine Similarity menghitung cosinus sudut antara dua vektor (A · B) / (||A|| ||B||), ideal untuk text embeddings.",
            "explanation_en": "Cosine Similarity computes the cosine of the angle between two vectors, invariant to vector magnitude."
        })
        
        # 8. Softmax Function
        qs.append({
            "category": "ai_math",
            "difficulty": "Medium",
            "question_id": "Fungsi matematika yang mengubah vektor skor logit mentah menjadi distribusi probabilitas dengan jumlah total bernilai tepat 1.0 pada klasifikasi multi-kelas adalah:",
            "question_en": "Which mathematical function normalizes a vector of raw logits into a probability distribution summing to exactly 1.0 for multi-class classification?",
            "options_id": {
                "A": "Softmax",
                "B": "Binary Sigmoid",
                "C": "Tanh",
                "D": "Linear Step"
            },
            "options_en": {
                "A": "Softmax",
                "B": "Binary Sigmoid",
                "C": "Tanh",
                "D": "Linear Step"
            },
            "correct_answer": "A",
            "explanation_id": "Softmax memetakan nilai real menjadi probabilitas di rentang [0, 1] dengan total sigma = 1.",
            "explanation_en": "Softmax normalizes real-valued inputs into probabilities in range [0, 1] that sum to 1."
        })

    return qs[:total_needed]

def get_swift_questions(pkg_id, total_needed=6):
    """Generates Swift Basics & iOS logic questions"""
    qs = []
    
    # 1. Optionals Unwrapping (guard let vs if let)
    qs.append({
        "category": "swift",
        "difficulty": "Medium",
        "question_id": "Perhatikan kode Swift berikut. Apa output yang dicetak ke konsol ketika fungsi dipanggil dengan argumen nil?",
        "question_en": "Observe the following Swift code. What is printed to the console when the function is invoked with a nil argument?",
        "code_snippet": "func processUser(name: String?) {\n    guard let unwrappedName = name else {\n        print(\"Anonymous\")\n        return\n    }\n    print(\"Hello, \\(unwrappedName)\")\n}\nprocessUser(name: nil)",
        "options_id": {"A": "Anonymous", "B": "Hello, nil", "C": "Runtime Crash", "D": "Hello, Anonymous"},
        "options_en": {"A": "Anonymous", "B": "Hello, nil", "C": "Runtime Crash", "D": "Hello, Anonymous"},
        "correct_answer": "A",
        "explanation_id": "Karena argumen yang diberikan bernilai nil, kondisi 'guard let' gagal dan mengeksekusi blok 'else' yang mencetak 'Anonymous' lalu me-return fungsi.",
        "explanation_en": "Since name is nil, guard let fails and enters the else block, printing 'Anonymous' and exiting early."
    })
    
    # 2. Variable Mutability (let vs var)
    qs.append({
        "category": "swift",
        "difficulty": "Easy",
        "question_id": "Perhatikan baris kode deklarasi variabel di Swift berikut. Apa yang akan terjadi ketika kode tersebut dikompilasi?",
        "question_en": "Observe the following Swift variable declaration. What happens when this code is compiled?",
        "code_snippet": "let appVersion = \"1.0.0\"\nappVersion = \"1.1.0\"\nprint(appVersion)",
        "options_id": {
            "A": "Compile-time Error: Nilai konstan yang dideklarasikan dengan 'let' tidak dapat diubah (immutable).",
            "B": "Mencetak '1.1.0' tanpa masalah.",
            "C": "Mencetak '1.0.0'.",
            "D": "Runtime Exception."
        },
        "options_en": {
            "A": "Compile-time Error: Constants declared with 'let' cannot be reassigned (immutable).",
            "B": "Prints '1.1.0' normally.",
            "C": "Prints '1.0.0'.",
            "D": "Runtime Exception."
        },
        "correct_answer": "A",
        "explanation_id": "Kata kunci 'let' mendefinisikan konstanta yang nilainya tidak dapat diubah setelah diinisialisasi.",
        "explanation_en": "The 'let' keyword creates an immutable constant; reassignment triggers a compile-time error."
    })
    
    # 3. Nil-Coalescing Operator
    qs.append({
        "category": "swift",
        "difficulty": "Easy",
        "question_id": "Perhatikan ekspresi operasi Optional di Swift berikut. Berapakah nilai akhir dari variabel finalScore?",
        "question_en": "Observe the following Swift optional expression. What is the final value of finalScore?",
        "code_snippet": "let storedScore: Int? = nil\nlet finalScore = storedScore ?? 100\nprint(finalScore)",
        "options_id": {"A": "100", "B": "nil", "C": "0", "D": "Fatal Error"},
        "options_en": {"A": "100", "B": "nil", "C": "0", "D": "Fatal Error"},
        "correct_answer": "A",
        "explanation_id": "Nil-coalescing operator (??) menyediakan nilai default (100) jika optional di sisi kiri bernilai nil.",
        "explanation_en": "The nil-coalescing operator (??) returns the default value (100) when the left-hand optional is nil."
    })
    
    # 4. Closures & Trailing Closure Syntax
    qs.append({
        "category": "swift",
        "difficulty": "Medium",
        "question_id": "Perhatikan kode manipulasi array menggunakan Higher-Order Function di Swift berikut. Apa output array yang dihasilkan?",
        "question_en": "Observe the following Swift array higher-order function chain. What is the resulting output array?",
        "code_snippet": "let numbers = [1, 2, 3, 4, 5]\nlet results = numbers.filter { $0 % 2 != 0 }.map { $0 * 10 }\nprint(results)",
        "options_id": {"A": "[10, 30, 50]", "B": "[20, 40]", "C": "[10, 20, 30, 40, 50]", "D": "[1, 3, 5]"},
        "options_en": {"A": "[10, 30, 50]", "B": "[20, 40]", "C": "[10, 20, 30, 40, 50]", "D": "[1, 3, 5]"},
        "correct_answer": "A",
        "explanation_id": "filter { $0 % 2 != 0 } menyaring bilangan ganjil [1, 3, 5], lalu map { $0 * 10 } mengalikan setiap elemen dengan 10 menghasilkan [10, 30, 50].",
        "explanation_en": "filter retains odd numbers [1, 3, 5], and map multiplies each by 10 resulting in [10, 30, 50]."
    })
    
    # 5. String Interpolation & Types
    qs.append({
        "category": "swift",
        "difficulty": "Easy",
        "question_id": "Tipe data default apakah yang disimpulkan (type inference) oleh compiler Swift untuk variabel `let speed = 9.8`?",
        "question_en": "Which default data type does the Swift compiler infer for `let speed = 9.8`?",
        "options_id": {"A": "Double", "B": "Float", "C": "CGFloat", "D": "Decimal"},
        "options_en": {"A": "Double", "B": "Float", "C": "CGFloat", "D": "Decimal"},
        "correct_answer": "A",
        "explanation_id": "Secara default, Swift selalu menginferensikan angka desimal floating-point sebagai tipe Double (64-bit precision).",
        "explanation_en": "By default, Swift always infers floating-point literal numbers as Double (64-bit precision)."
    })
    
    # 6. Switch Pattern Matching
    qs.append({
        "category": "swift",
        "difficulty": "Medium",
        "question_id": "Perhatikan kode Swift Pattern Matching berikut. Apa output yang dicetak ke konsol?",
        "question_en": "Observe the following Swift switch pattern matching code. What is printed to the console?",
        "code_snippet": "let status = 404\nswitch status {\ncase 200...299:\n    print(\"Success\")\ncase 400...499:\n    print(\"Client Error\")\ndefault:\n    print(\"Other\")\n}",
        "options_id": {"A": "Client Error", "B": "Success", "C": "Other", "D": "Compile Error"},
        "options_en": {"A": "Client Error", "B": "Success", "C": "Other", "D": "Compile Error"},
        "correct_answer": "A",
        "explanation_id": "Nilai 404 cocok dengan rentang tertutup (closed range) `400...499`, sehingga mencetak 'Client Error'.",
        "explanation_en": "The value 404 matches the closed range `400...499`, executing that branch and printing 'Client Error'."
    })
    
    # Additional Swift questions for 50-question package
    if total_needed > 6:
        # 7. In-Out Parameters
        qs.append({
            "category": "swift",
            "difficulty": "Hard",
            "question_id": "Kata kunci apakah yang digunakan pada parameter fungsi Swift untuk memungkinkan fungsi memodifikasi variabel asli di luar scope fungsi (Pass-by-reference effect)?",
            "question_en": "Which keyword is used in a Swift function parameter to allow the function to directly modify the original passed variable outside its scope?",
            "options_id": {"A": "inout", "B": "mutating", "C": "defer", "D": "escaping"},
            "options_en": {"A": "inout", "B": "mutating", "C": "defer", "D": "escaping"},
            "correct_answer": "A",
            "explanation_id": "Parameter `inout` memungkinkan nilai dioper masuk dan dimodifikasi langsung (disertai simbol `&` saat pemanggilan fungsi).",
            "explanation_en": "The `inout` keyword allows a parameter to be modified directly by passing its memory reference with `&`."
        })
        
        # 8. Defer Statement
        qs.append({
            "category": "swift",
            "difficulty": "Medium",
            "question_id": "Kapan blok kode di dalam pernyataan `defer { ... }` dieksekusi di Swift?",
            "question_en": "When does code inside a Swift `defer { ... }` block execute?",
            "options_id": {
                "A": "Tepat sebelum eksekusi meninggalkan scope fungsi saat ini (baik melalui return, throw, atau akhir fungsi).",
                "B": "Secara instan saat baris defer dideklarasikan.",
                "C": "Pada background thread di masa mendatang.",
                "D": "Hanya saat terjadi runtime exception."
            },
            "options_en": {
                "A": "Immediately before execution leaves the current enclosing scope (via return, throw, or natural exit).",
                "B": "Instantly when the defer line is declared.",
                "C": "On a background thread in the future.",
                "D": "Only when a runtime exception occurs."
            },
            "correct_answer": "A",
            "explanation_id": "`defer` menunda eksekusi blok kode hingga scope blok fungsi selesai, sangat berguna untuk cleanup resource.",
            "explanation_en": "`defer` guarantees execution right before the current scope exits, ideal for resource cleanup."
        })

    return qs[:total_needed]

def get_oop_questions(pkg_id, total_needed=5):
    """Generates OOP & Swift Architecture questions (Class vs Struct, POP, ARC)"""
    qs = []
    
    # 1. Struct vs Class (Value vs Reference)
    qs.append({
        "category": "oop",
        "difficulty": "Medium",
        "question_id": "Perhatikan kode Swift berikut. Apa output yang dicetak ke konsol?",
        "question_en": "Observe the following Swift code. What is printed to the console?",
        "code_snippet": "struct Device {\n    var model: String\n}\nvar phone1 = Device(model: \"iPhone 15\")\nvar phone2 = phone1\nphone2.model = \"iPhone 16 Pro\"\nprint(phone1.model)",
        "options_id": {"A": "iPhone 15", "B": "iPhone 16 Pro", "C": "nil", "D": "Compile Error"},
        "options_en": {"A": "iPhone 15", "B": "iPhone 16 Pro", "C": "nil", "D": "Compile Error"},
        "correct_answer": "A",
        "explanation_id": "Karena `Device` adalah `struct` (Value Type), penugasan `phone2 = phone1` membuat salinan memori independen. Perubahan pada `phone2` tidak memengaruhi `phone1`.",
        "explanation_en": "Because `Device` is a `struct` (Value Type), `phone2 = phone1` creates an independent copy. Mutating `phone2` does not affect `phone1`."
    })
    
    # 2. Protocol Oriented Programming
    qs.append({
        "category": "oop",
        "difficulty": "Medium",
        "question_id": "Dalam paradigma Protocol-Oriented Programming di Swift, apa keuntungan utama menggunakan Protocol Extension dibandingkan pewarisan kelas (Class Inheritance)?",
        "question_en": "In Swift Protocol-Oriented Programming, what is the primary benefit of using Protocol Extensions over Class Inheritance?",
        "options_id": {
            "A": "Dapat memberikan implementasi default method ke banyak tipe data (termasuk Struct & Enum) tanpa pewarisan tunggal kelas.",
            "B": "Menghilangkan kebutuhan penggunaan tipe data Optionals.",
            "C": "Mengubah semua Struct menjadi Reference Type di memori Heap.",
            "D": "Membuat aplikasi otomatis multi-threaded."
        },
        "options_en": {
            "A": "Provides default method implementations across multiple types (including Structs & Enums) without single-inheritance limitations.",
            "B": "Eliminates the need for Optionals.",
            "C": "Converts all Structs into Heap Reference Types.",
            "D": "Automatically makes code multi-threaded."
        },
        "correct_answer": "A",
        "explanation_id": "Protocol extension memungkinkan berbagi implementasi kode secara modular ke struct, enum, dan class tanpa batasan single-inheritance.",
        "explanation_en": "Protocol extensions allow sharing default behavior across value and reference types without rigid inheritance trees."
    })
    
    # 3. Encapsulation (Access Control)
    qs.append({
        "category": "oop",
        "difficulty": "Easy",
        "question_id": "Access control level di Swift yang membatasi akses properti atau method HANYA di dalam file sumber (.swift) yang sama adalah:",
        "question_en": "Which Swift access control level restricts access to an entity strictly within its enclosing source file (.swift)?",
        "options_id": {"A": "fileprivate", "B": "private", "C": "internal", "D": "public"},
        "options_en": {"A": "fileprivate", "B": "private", "C": "internal", "D": "public"},
        "correct_answer": "A",
        "explanation_id": "`fileprivate` membatasi akses hanya untuk kode di dalam file sumber yang sama, sedangkan `private` membatasi hingga enclosing declaration.",
        "explanation_en": "`fileprivate` restricts usage to its defining source file, whereas `private` limits to the enclosing declaration."
    })
    
    # 4. ARC & Retain Cycle Prevention
    qs.append({
        "category": "oop",
        "difficulty": "Hard",
        "question_id": "Untuk mencegah terjadinya Retain Cycle (Memory Leak) ketika dua instance Class saling mereferensikan satu sama lain atau di dalam closure capture list, kata kunci referensi apa yang harus digunakan?",
        "question_en": "To prevent a Retain Cycle (Memory Leak) when two Class instances reference each other or inside closure capture lists, which keyword should be used?",
        "options_id": {
            "A": "weak atau unowned (tidak menambah reference count ARC)",
            "B": "strong atau static",
            "C": "final atau override",
            "D": "lazy atau mutating"
        },
        "options_en": {
            "A": "weak or unowned (does not increment ARC reference count)",
            "B": "strong or static",
            "C": "final or override",
            "D": "lazy or mutating"
        },
        "correct_answer": "A",
        "explanation_id": "Referensi `weak` dan `unowned` tidak menambah retain count ARC, sehingga memutus siklus referensi sirkular dan mencegah kebocoran memori.",
        "explanation_en": "`weak` and `unowned` references do not increment the retain count, breaking strong reference cycles to prevent leaks."
    })
    
    # 5. Polymorphism & Method Overriding
    qs.append({
        "category": "oop",
        "difficulty": "Medium",
        "question_id": "Kata kunci apakah yang wajib dicantumkan pada subclass di Swift saat mengimplementasikan ulang method yang diwarisi dari superclass?",
        "question_en": "Which keyword is mandatory in a Swift subclass when providing a custom implementation for an inherited superclass method?",
        "options_id": {"A": "override", "B": "mutating", "C": "convenience", "D": "open"},
        "options_en": {"A": "override", "B": "mutating", "C": "convenience", "D": "open"},
        "correct_answer": "A",
        "explanation_id": "Swift mewajibkan kata kunci `override` untuk mencegah penimpaan method secara tidak sengaja dan memvalidasi kecocokan signature.",
        "explanation_en": "Swift requires the `override` keyword to safeguard against accidental method overriding and verify signature compatibility."
    })
    
    # Additional OOP questions for 50-question package
    if total_needed > 5:
        # 6. Delegation Pattern
        qs.append({
            "category": "oop",
            "difficulty": "Hard",
            "question_id": "Mengapa properti delegate pada Delegation Design Pattern di iOS selalu dideklarasikan sebagai `weak var delegate: SomeDelegate?`?",
            "question_en": "Why is the delegate property in iOS Delegation Design Pattern always declared as `weak var delegate: SomeDelegate?`?",
            "options_id": {
                "A": "Untuk mencegah strong reference cycle antara parent object (delegator) dan child object (delegate).",
                "B": "Agar delegate dapat berjalan pada background thread otomatis.",
                "C": "Karena protocol tidak dapat disimpan di memori.",
                "D": "Agar delegate dapat diakses secara global di seluruh aplikasi."
            },
            "options_en": {
                "A": "To prevent strong reference cycles between the delegator and the delegate instance.",
                "B": "To allow the delegate to execute on background threads automatically.",
                "C": "Because protocols cannot reside in memory.",
                "D": "To make the delegate globally accessible across the entire app."
            },
            "correct_answer": "A",
            "explanation_id": "Jika delegate bertipe strong, kedua objek akan saling menahan di memori (retain cycle), sehingga memori tidak pernah dideallokasi.",
            "explanation_en": "A strong delegate creates a bidirectional retain cycle, preventing deallocation when either object is dismissed."
        })
        
        # 7. Final Keyword
        qs.append({
            "category": "oop",
            "difficulty": "Medium",
            "question_id": "Apa dampak menambahkan kata kunci `final` pada deklarasi `final class UserProfile { ... }` di Swift?",
            "question_en": "What is the effect of adding the `final` keyword to `final class UserProfile { ... }` in Swift?",
            "options_id": {
                "A": "Mencegah class tersebut diwarisi (subclassing) dan memungkinkan compiler melakukan optimasi Static Dispatch.",
                "B": "Menghapus semua properti instan saat aplikasi ditutup.",
                "C": "Mengubah class menjadi struct secara runtime.",
                "D": "Mengizinkan class diakses dari modul eksternal tanpa import."
            },
            "options_en": {
                "A": "Prevents subclassing and enables compiler Static Dispatch optimizations for faster execution.",
                "B": "Clears all instance variables on app termination.",
                "C": "Converts class to struct at runtime.",
                "D": "Allows external module access without import statements."
            },
            "correct_answer": "A",
            "explanation_id": "Kata kunci `final` melarang inheritance dan mempercepat performa pemanggilan method melalui direct static dispatch.",
            "explanation_en": "`final` disallows inheritance and enables direct static dispatch optimizations by eliminating vtable lookup overhead."
        })

    return qs[:total_needed]


# --- Package Generator Orchestrator ---

def create_all_packages():
    packages = []
    
    # 1. Standard Packages 1 through 10 (35 Questions each)
    for pkg_num in range(1, 11):
        questions = []
        q_counter = 1
        
        # 1. Logic (10 questions)
        for q in get_logic_questions(pkg_num, total_needed=10):
            q_copy = dict(q)
            q_copy["number"] = q_counter
            questions.append(q_copy)
            q_counter += 1
            
        # 2. Computational Thinking (8 questions)
        for q in get_ct_questions(pkg_num, total_needed=8):
            q_copy = dict(q)
            q_copy["number"] = q_counter
            questions.append(q_copy)
            q_counter += 1
            
        # 3. AI & Math (6 questions)
        for q in get_ai_math_questions(pkg_num, total_needed=6):
            q_copy = dict(q)
            q_copy["number"] = q_counter
            questions.append(q_copy)
            q_counter += 1
            
        # 4. Swift (6 questions)
        for q in get_swift_questions(pkg_num, total_needed=6):
            q_copy = dict(q)
            q_copy["number"] = q_counter
            questions.append(q_copy)
            q_counter += 1
            
        # 5. OOP (5 questions)
        for q in get_oop_questions(pkg_num, total_needed=5):
            q_copy = dict(q)
            q_copy["number"] = q_counter
            questions.append(q_copy)
            q_counter += 1
            
        pkg_data = {
            "id": pkg_num,
            "is_final_exam": False,
            "title_id": f"Paket Simulasi {pkg_num}",
            "title_en": f"Simulation Package {pkg_num}",
            "description_id": "35 Soal Kisi-kisi Resmi Apple Developer Academy: Logika & Figural CPNS Medium (dengan Opsi Bergambar), Computational Thinking, AI & Matriks, Swift, OOP.",
            "description_en": "35 Official Academy Test Questions: Logic & CPNS Medium Figural (with Visual SVG Options), Computational Thinking, AI & Matrices, Swift, OOP.",
            "duration_minutes": 120,
            "total_questions": len(questions),
            "difficulty": "Standard Academy Level",
            "category_distribution": {
                "logic": 10,
                "comp_thinking": 8,
                "ai_math": 6,
                "swift": 6,
                "oop": 5
            },
            "questions": questions
        }
        packages.append(pkg_data)

    # 2. Special Final Exam Packages (Paket 11 & Paket 12 - 50 Questions each)
    final_configs = [
        (11, "Final Exam Cohort Simulation - Paket A", "Final Exam Cohort Simulation - Package A",
         "Simulasi Ujian Penuh 50 Soal Realistis (Standar Seleksi Apple Developer Academy): Komprehensif Logika & Figural CPNS Medium (Opsi Visual Penuh), Algoritma Lanjut, AI Math, Swift Modern, & Architecture.",
         "Authentic 50-Question Final Exam Simulation (Official Academy Standard): Comprehensive Logic, Medium CPNS Figural (Full Visual Options), Advanced CT, AI Math, Swift, & System Architecture."),
        (12, "Final Exam Cohort Simulation - Paket B", "Final Exam Cohort Simulation - Package B",
         "Simulasi Ujian Penuh 50 Soal Realistis (Standar Seleksi Apple Developer Academy): Uji Ketahanan Berpikir Komputasi, Penalaran Visual Matriks Spasial & Opsi Bergambar, Swift OOP, & Problem Solving 120 Menit.",
         "Authentic 50-Question Final Exam Simulation (Official Academy Standard): Computational Endurance, Spatial Figural Matrices with Visual Options, Swift OOP, & Problem Solving under 120 Minutes.")
    ]

    for pkg_num, title_id, title_en, desc_id, desc_en in final_configs:
        questions = []
        q_counter = 1
        
        # 1. Logic & Figural (15 questions)
        for q in get_logic_questions(pkg_num, total_needed=15):
            q_copy = dict(q)
            q_copy["number"] = q_counter
            questions.append(q_copy)
            q_counter += 1
            
        # 2. Computational Thinking (12 questions)
        for q in get_ct_questions(pkg_num, total_needed=12):
            q_copy = dict(q)
            q_copy["number"] = q_counter
            questions.append(q_copy)
            q_counter += 1
            
        # 3. AI & Math (8 questions)
        for q in get_ai_math_questions(pkg_num, total_needed=8):
            q_copy = dict(q)
            q_copy["number"] = q_counter
            questions.append(q_copy)
            q_counter += 1
            
        # 4. Swift Basics (8 questions)
        for q in get_swift_questions(pkg_num, total_needed=8):
            q_copy = dict(q)
            q_copy["number"] = q_counter
            questions.append(q_copy)
            q_counter += 1
            
        # 5. OOP & Architecture (7 questions)
        for q in get_oop_questions(pkg_num, total_needed=7):
            q_copy = dict(q)
            q_copy["number"] = q_counter
            questions.append(q_copy)
            q_counter += 1
            
        pkg_data = {
            "id": pkg_num,
            "is_final_exam": True,
            "badge_tag": "FINAL EXAM (50 SOAL)",
            "title_id": title_id,
            "title_en": title_en,
            "description_id": desc_id,
            "description_en": desc_en,
            "duration_minutes": 120,
            "total_questions": len(questions),
            "difficulty": "Realistic Final Exam (50 Qs)",
            "category_distribution": {
                "logic": 15,
                "comp_thinking": 12,
                "ai_math": 8,
                "swift": 8,
                "oop": 7
            },
            "questions": questions
        }
        packages.append(pkg_data)
        
    return packages

def save_all():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(base_dir, "data")
    pkg_dir = os.path.join(data_dir, "packages")
    os.makedirs(pkg_dir, exist_ok=True)
    
    packages = create_all_packages()
    
    # Save each package file
    index_list = []
    for pkg in packages:
        pkg_file = os.path.join(pkg_dir, f"package_{pkg['id']}.json")
        with open(pkg_file, "w", encoding="utf-8") as f:
            json.dump(pkg, f, ensure_ascii=False, indent=2)
            
        # Index summary metadata
        index_list.append({
            "id": pkg["id"],
            "is_final_exam": pkg.get("is_final_exam", False),
            "badge_tag": pkg.get("badge_tag", ""),
            "title_id": pkg["title_id"],
            "title_en": pkg["title_en"],
            "description_id": pkg["description_id"],
            "description_en": pkg["description_en"],
            "duration_minutes": pkg["duration_minutes"],
            "total_questions": pkg["total_questions"],
            "difficulty": pkg["difficulty"],
            "category_distribution": pkg["category_distribution"]
        })
        
    # Save packages_index.json
    index_file = os.path.join(data_dir, "packages_index.json")
    with open(index_file, "w", encoding="utf-8") as f:
        json.dump(index_list, f, ensure_ascii=False, indent=2)
        
    print(f"Successfully generated {len(packages)} packages with interactive SVG options.")

if __name__ == "__main__":
    save_all()
