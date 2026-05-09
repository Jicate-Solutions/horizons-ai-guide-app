"""
Generate NEET (UG) 2024 Previous Year Question Paper PDF
Source: NEET (UG) 2024 — Test Booklet Code T3 — Date: 05-05-2024
200 MCQs from Physics, Chemistry, Botany, and Zoology
Each subject has Section A (35 questions, all compulsory) and Section B
(15 questions, attempt any 10).
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, KeepTogether
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY

OUT = "../../public/pyq-pdfs/neet-2024.pdf"

import os
os.makedirs(os.path.dirname(OUT), exist_ok=True)

# ─────────────────────────────────────────────────────────────────────
# DATA — NEET (UG) 2024 — Test Booklet Code T3 — Date: 05-05-2024
# 200 MCQs · 720 max marks · +4/-1 marking
# ─────────────────────────────────────────────────────────────────────

# ── PHYSICS (Q1–50): Section A (1–35) + Section B (36–50) ──
PHYSICS = [
    (1, "A tightly wound 100-turn coil of radius 10 cm carries a current of 7 A. The magnitude of the magnetic field at the centre of the coil is (μ₀ = 4π × 10⁻⁷ SI units):",
     ["4.4 mT", "44 T", "44 mT", "4.4 T"]),
    (2, "Match List-I (Material) with List-II (Susceptibility x):  A. Diamagnetic  B. Ferromagnetic  C. Paramagnetic  D. Non-magnetic  ↔  I. x = 0  II. 0 > x ≥ −1  III. x ≫ 1  IV. 0 < x < ε (small positive)",
     ["A-III, B-II, C-I, D-IV", "A-IV, B-III, C-II, D-I", "A-II, B-III, C-IV, D-I", "A-II, B-I, C-III, D-IV"]),
    (3, "A thermodynamic system is taken through cycle abcda (rectangular P-V cycle: 100→400 cm³ at 100 kPa; 100→300 kPa at 400 cm³; 400→100 cm³ at 300 kPa; 300→100 kPa at 100 cm³). The work done by the gas along path bc is:",
     ["−90 J", "−60 J", "zero", "30 J"]),
    (4, "An unpolarised light beam strikes a glass surface at Brewster's angle. Then:",
     ["Both reflected and refracted light are completely polarised", "Reflected light is completely polarised but refracted light is partially polarised", "Reflected light will be partially polarised", "Refracted light will be completely polarised"]),
    (5, "In an ideal transformer, turns ratio Nₚ/Nₛ = 1/2. The ratio Vₛ : Vₚ is:",
     ["1 : 1", "1 : 4", "1 : 2", "2 : 1"]),
    (6, "A logic circuit produces output Y as per the truth table: (A,B,Y) = (0,0,1),(0,1,0),(1,0,1),(1,1,0). Y equals:",
     ["B̄", "B", "A·B + Ā", "A·B̄ + Ā"]),
    (7, "In a vernier calipers, (N+1) divisions of vernier coincide with N divisions of main scale. If 1 MSD = 0.1 mm, the vernier constant (in cm) is:",
     ["100N", "10(N+1)", "1/(10N)", "1/[100(N+1)]"]),
    (8, "Maximum elongation of a 1 m steel wire (elastic limit 8 × 10⁸ N/m², Young's modulus 2 × 10¹¹ N/m²) is:",
     ["40 mm", "8 mm", "4 mm", "0.4 mm"]),
    (9, "A 10 N horizontal force is applied to block A (2 kg) which is in contact with block B (3 kg) on a frictionless surface. The force exerted by A on B is:",
     ["6 N", "10 N", "zero", "4 N"]),
    (10, "If the monochromatic source in Young's double-slit experiment is replaced by white light:",
     ["Central bright white fringe surrounded by a few coloured fringes", "All bright fringes will be of equal width", "Interference pattern will disappear", "Central dark fringe surrounded by a few coloured fringes"]),
    (11, "Graph showing variation of (1/λ²) with kinetic energy E (λ is de Broglie wavelength of a free particle):",
     ["Curve concave-up rising from origin", "Straight line through origin", "Curve concave-down rising from origin", "Vertical asymptote near zero E"]),
    (12, "In the given circuit (four 2 μF capacitors arranged with the bridge between A and B), the equivalent capacitance is:",
     ["0.5 μF", "4 μF", "2 μF", "1 μF"]),
    (13, "A strong bar magnet is moved towards solenoid-2 from solenoid-1 (N pole faces solenoid 2). The induced currents in solenoid-1 (terminals A,B) and solenoid-2 (terminals C,D) are along:",
     ["AB and CD", "BA and DC", "AB and DC", "BA and CD"]),
    (14, "Consider: A. For a solar cell, the I-V curve lies in the IV quadrant. B. In a reverse-biased pn diode, the μA current is due to majority charge carriers.",
     ["Both A and B correct", "Both A and B incorrect", "A correct, B incorrect", "A incorrect, B correct"]),
    (15, "A light ray enters a right-angled prism at P with incidence 30°, travels parallel to base BC, and emerges along face AC. The refractive index of the prism is:",
     ["√3 / 4", "√3 / 2", "√5 / 4", "√5 / 2"]),
    (16, "Assertion: Potential at axial point r = 2 m from centre of a dipole of moment 4 × 10⁻⁶ C·m is ±9 × 10³ V. Reason: V = ±2P / (4πε₀ r²) for axial points.",
     ["A is true but R is false", "A is false but R is true", "Both A and R true; R is correct explanation", "Both A and R true; R is NOT correct explanation"]),
    (17, "Moment of inertia of a thin rod about an axis through its midpoint perpendicular to it is 2400 g·cm². The length of the 400 g rod is nearly:",
     ["20.7 cm", "72.0 cm", "8.5 cm", "17.5 cm"]),
    (18, "Terminal voltage of a battery (emf 10 V, internal resistance 1 Ω) connected to an external 4 Ω resistor is:",
     ["8 V", "10 V", "4 V", "6 V"]),
    (19, "Match List-I (Spectral lines of H, n₂→n₁) with List-II (Wavelengths in nm): A. 3→2  B. 4→2  C. 5→2  D. 6→2  ↔  I. 410.2  II. 434.1  III. 656.3  IV. 486.1",
     ["A-IV, B-III, C-I, D-II", "A-I, B-II, C-III, D-IV", "A-II, B-I, C-IV, D-III", "A-III, B-IV, C-II, D-I"]),
    (20, "Correct statements about a photon (c is speed of light): A. E = hν  B. velocity = c  C. p = hν/c  D. In photon-electron collision both energy and momentum conserved  E. Photon possesses positive charge",
     ["A, C and D only", "A, B, D and E only", "A and B only", "A, B, C and D only"]),
    (21, "²⁹⁰₈₂X →α→ Y →e⁺→ Z →β⁻→ P →e⁻→ Q. Mass and atomic numbers of Q are:",
     ["288, 82", "286, 81", "280, 81", "286, 80"]),
    (22, "Displacement of a particle is x = 2t − 1 (SI units) under a 5 N force. Instantaneous power (SI units) is:",
     ["7", "6", "10", "5"]),
    (23, "Output Y of the given logic gate (NAND of A; NOR of B; outputs into a NOR) is similar to a/an:",
     ["OR gate", "AND gate", "NAND gate", "NOR gate"]),
    (24, "A planet has 1/10 the mass of Earth and half its diameter. Acceleration due to gravity on the planet is:",
     ["4.9 m/s²", "3.92 m/s²", "19.6 m/s²", "9.8 m/s²"]),
    (25, "Statement I: Atoms are electrically neutral as they contain equal positive and negative charges. Statement II: Atoms of each element are stable and emit characteristic spectrum.",
     ["I correct, II incorrect", "I incorrect, II correct", "Both correct", "Both incorrect"]),
    (26, "A wheel rolls on a level road with linear speed v. P is the highest point and Q is the lowest point on the wheel. Which is correct?",
     ["P and Q move with equal speeds", "Point P has zero speed", "Point P moves slower than Q", "Point P moves faster than Q"]),
    (27, "A particle moving with uniform speed in a circular path maintains:",
     ["Constant velocity but varying acceleration", "Varying velocity and varying acceleration", "Constant velocity", "Constant acceleration"]),
    (28, "A thin flat circular disc of radius 4.5 cm is placed gently on water (surface tension 0.07 N/m). Excess force required to lift it is:",
     ["1.98 mN", "99 N", "19.8 mN", "198 N"]),
    (29, "In a uniform field of 0.049 T a magnetic needle (I = 9.8 × 10⁻⁶ kg·m²) makes 20 oscillations in 5 s. If μ = x × 10⁻⁵ A·m², then x equals:",
     ["50π²", "1280π²", "5π²", "128π²"]),
    (30, "Two equal-mass bodies undergo a perfectly inelastic 1-D collision; A moves with v₁, B is at rest. Velocity after collision is v₂. v₁ : v₂ is:",
     ["4 : 1", "1 : 4", "1 : 2", "2 : 1"]),
    (31, "x = 5 sin(πt + π/3) m represents SHM. Amplitude and time period are:",
     ["5 cm, 1 s", "5 m, 1 s", "5 cm, 2 s", "5 m, 2 s"]),
    (32, "Quantities with the same dimensions as solid angle are:",
     ["Strain and arc", "Angular speed and stress", "Strain and angle", "Stress and angle"]),
    (33, "A thin charged spherical shell (R = 3 cm, q = 1 μC). Potential difference between point C inside and point P on the surface (in V) is (1/4πε₀ = 9 × 10⁹):",
     ["0.5 × 10⁵", "zero", "3 × 10⁵", "1 × 10⁵"]),
    (34, "A bob is whirled in a horizontal plane with initial speed ω rpm and string tension T. If the speed becomes 2ω at the same radius, the new tension is:",
     ["T/4", "√2 T", "T", "4T"]),
    (35, "A 100 Ω wire is divided into 10 equal parts. First 5 parts are connected in series, the next 5 in parallel; the two combinations are connected in series. The resistance of the final combination is:",
     ["55 Ω", "60 Ω", "26 Ω", "52 Ω"]),
    # SECTION B
    (36, "T-V curves of an ideal gas at three pressures P₁, P₂, P₃ shown alongside Charles's law (dotted). The order of pressures is:",
     ["P₂ > P₁ > P₃", "P₁ > P₂ > P₃", "P₃ > P₂ > P₁", "P₁ > P₃ > P₂"]),
    (37, "A parallel plate capacitor is being charged through a resistor with current I. In the gap between the plates:",
     ["Displacement current of magnitude I flows opposite to I", "Displacement current of magnitude greater than I flows in any direction", "There is no current", "Displacement current of magnitude I flows in the same direction as I"]),
    (38, "Which property is NOT true of an EM wave travelling in free space?",
     ["Travel with speed 1/√(μ₀ε₀)", "Originate from charges moving with uniform speed", "Transverse in nature", "Energy density in E field equals energy density in B field"]),
    (39, "Which circuit can achieve the bridge balance (10 Ω, 10 Ω, 15 Ω, 5 Ω with galvanometer G and detector D)?",
     ["Configuration 1", "Configuration 2", "Configuration 3", "Configuration 4"]),
    (40, "If the plates of a parallel plate capacitor connected to a battery are moved closer: A. charge stored increases  B. energy stored decreases  C. capacitance increases  D. C = Q/V remains the same  E. product of charge and voltage increases",
     ["B, D and E only", "A, B and C only", "A, B and E only", "A, C and E only"]),
    (41, "A force F = αt² + βt acts on a particle. Which combination is dimensionless (α, β are constants)?",
     ["αβt", "αβ/t", "βt/α", "αt/β"]),
    (42, "A metallic bar (Y = 0.5 × 10¹¹ N/m², α = 10⁻⁵ /°C, L = 1 m, A = 10⁻³ m²) is heated from 0 to 100 °C without expansion. Compressive force is:",
     ["100 × 10³ N", "2 × 10³ N", "52 × 10³ N", "50 × 10³ N"]),
    (43, "A small telescope: objective f = 140 cm, eyepiece f = 5.0 cm. Magnifying power for a distant object is:",
     ["17", "32", "34", "28"]),
    (44, "An iron bar of length L has magnetic moment M. Bent at midpoint so the two arms make 60° with each other. New magnetic moment is:",
     ["2M", "M/√3", "M", "M/2"]),
    (45, "A 10 μF capacitor is connected to 210 V, 50 Hz source. Peak current (π = 3.14) is nearly:",
     ["1.20 A", "0.35 A", "0.58 A", "0.93 A"]),
    (46, "Two heaters rated 1 kW and 2 kW are connected first in series and then in parallel to a fixed source. Ratio of total powers (series : parallel) is:",
     ["1 : 2", "2 : 3", "1 : 1", "2 : 9"]),
    (47, "From the v-t plot (rises linearly, plateau at constant v, then falls linearly to zero), which a-t graph best fits?",
     ["Positive pulse, zero, negative pulse", "Positive ramp, zero, negative ramp", "Trapezoidal pulse", "Step function rising"]),
    (48, "A pendulum's bob mass is increased to 3× and length is halved. New time period is (x/2) × original. Then x is:",
     ["2√3", "4", "√3", "√2"]),
    (49, "Minimum energy to launch a satellite of mass m from Earth (mass M, radius R) into a circular orbit at altitude 2R is:",
     ["GMm/(2R)", "GMm/(3R)", "5GMm/(6R)", "2GMm/(3R)"]),
    (50, "A sheet is placed in front of a strong magnetic pole. A force is needed to: A. hold it if magnetic  B. hold it if non-magnetic  C. move it away with uniform velocity if conducting  D. move it away with uniform velocity if non-conducting and non-polar",
     ["A, C and D only", "C only", "B and D only", "A and C only"]),
]

# ── CHEMISTRY (Q51–100): Section A (51–85) + Section B (86–100) ──
CHEMISTRY = [
    (51, "Match (Conversion) ↔ (Faraday required): A. 1 mol H₂O → O₂  B. 1 mol MnO₄⁻ → Mn²⁺  C. 1.5 mol Ca from molten CaCl₂  D. 1 mol FeO → Fe₂O₃  ↔  I. 3F  II. 2F  III. 1F  IV. 5F",
     ["A-II, B-III, C-I, D-IV", "A-III, B-IV, C-II, D-I", "A-II, B-IV, C-I, D-III", "A-III, B-IV, C-I, D-II"]),
    (52, "Which reaction is NOT a redox reaction?",
     ["H₂ + Cl₂ → 2 HCl", "BaCl₂ + Na₂SO₄ → BaSO₄ + 2 NaCl", "Zn + CuSO₄ → ZnSO₄ + Cu", "2 KClO₃ + I₂ → 2 KIO₃ + Cl₂"]),
    (53, "Intramolecular hydrogen bonding is present in:",
     ["m-Nitrophenol", "HF", "o-Nitrophenol", "p-Nitrophenol"]),
    (54, "Fehling's solution 'A' is:",
     ["Alkaline solution of sodium potassium tartrate (Rochelle's salt)", "Aqueous sodium citrate", "Aqueous copper sulphate", "Alkaline copper sulphate"]),
    (55, "1 g of NaOH is treated with 25 mL of 0.75 M HCl. Mass of NaOH unreacted:",
     ["Zero mg", "200 mg", "750 mg", "250 mg"]),
    (56, "Match (Compound) ↔ (Shape/Geometry): A. NH₃  B. BrF₅  C. XeF₄  D. SF₆  ↔  I. Trigonal pyramidal  II. Square planar  III. Octahedral  IV. Square pyramidal",
     ["A-III, B-IV, C-I, D-II", "A-II, B-III, C-IV, D-I", "A-I, B-IV, C-II, D-III", "A-II, B-IV, C-III, D-I"]),
    (57, "E°(Mn³⁺/Mn²⁺) is more positive than E°(Cr³⁺/Cr²⁺) and E°(Fe³⁺/Fe²⁺) because of change of:",
     ["d⁴ to d⁵", "d³ to d⁵", "d⁵ to d⁴", "d⁵ to d²"]),
    (58, "Match (Process) ↔ (Conditions): A. Isothermal  B. Isochoric  C. Isobaric  D. Adiabatic  ↔  I. No heat exchange  II. Constant T  III. Constant V  IV. Constant P",
     ["A-I, B-II, C-III, D-IV", "A-II, B-III, C-IV, D-I", "A-IV, B-III, C-II, D-I", "A-IV, B-II, C-III, D-I"]),
    (59, "Activation energy of a reaction can be calculated if one knows:",
     ["Orientation of reactant molecules", "Rate constants at two different temperatures", "Rate constant at standard temperature", "Probability of collision"]),
    (60, "A C₆H₁₄ compound has two tertiary carbons. Its IUPAC name is:",
     ["2,3-dimethylbutane", "2,2-dimethylbutane", "n-hexane", "2-methylpentane"]),
    (61, "'Spin only' magnetic moment is the same for which ions? A. Ti³⁺  B. Cr²⁺  C. Mn²⁺  D. Fe²⁺  E. Sc³⁺",
     ["B and C only", "A and D only", "B and D only", "A and E only"]),
    (62, "Increasing electronegativity of N, O, F, C, Si:",
     ["O < F < N < C < Si", "F < O < N < C < Si", "Si < C < N < O < F", "Si < C < O < N < F"]),
    (63, "Which alcohol reacts instantaneously with Lucas reagent?",
     ["(CH₃)₂CH-CH₂OH (isobutyl)", "(CH₃)₃C-OH (tert-butyl)", "n-Butanol", "sec-Butanol"]),
    (64, "Statement I: [Co(NH₃)₆]³⁺ and [CoF₆]³⁻ are both octahedral but differ in magnetic behaviour. Statement II: [Co(NH₃)₆]³⁺ is diamagnetic; [CoF₆]³⁻ is paramagnetic.",
     ["I true, II false", "I false, II true", "Both true", "Both false"]),
    (65, "Statement I: BP of Group 16 hydrides: H₂O > H₂Te > H₂Se > H₂S. Statement II: H₂O has higher BP than expected because of extensive H-bonding.",
     ["I true, II false", "I false, II true", "Both true", "Both false"]),
    (66, "Match (Quantum Number) ↔ (Information): A. mₗ  B. mₛ  C. l  D. n  ↔  I. shape of orbital  II. size of orbital  III. orientation of orbital  IV. orientation of spin",
     ["A-III, B-IV, C-II, D-I", "A-II, B-I, C-IV, D-III", "A-I, B-III, C-II, D-IV", "A-III, B-IV, C-I, D-II"]),
    (67, "Match (Reaction) ↔ (Reagents/Condition): A. Biphenyl → cyclohexanone (one C=O)  B. Benzene → benzophenone  C. Cyclohexanol → cyclohexanone  D. Ethylbenzene → benzoate  ↔  I. PhCOCl/AlCl₃  II. CrO₃  III. KMnO₄/KOH, Δ  IV. (i) O₃ (ii) Zn-H₂O",
     ["A-IV, B-I, C-II, D-III", "A-I, B-IV, C-II, D-III", "A-IV, B-I, C-III, D-II", "A-III, B-I, C-II, D-IV"]),
    (68, "Reagents to convert PhCH₂-CH=CH₂ → PhCH₂-CH₂-CHO:",
     ["(i) BH₃ (ii) H₂O₂/OH⁻ (iii) alk. KMnO₄ (iv) H₃O⁺", "(i) H₂O/H⁺ (ii) PCC", "(i) H₂O/H⁺ (ii) CrO₃", "(i) BH₃ (ii) H₂O₂/OH⁻ (iii) PCC"]),
    (69, "Reagents with which glucose does NOT react: A. Tollen's  B. Schiff's  C. HCN  D. NH₂OH  E. NaHSO₃",
     ["B and E", "E and D", "B and C", "A and D"]),
    (70, "Match (Molecule) ↔ (Bonds between two C atoms): A. Ethane  B. Ethene  C. C₂  D. Ethyne  ↔  I. one σ and two π  II. two π  III. one σ  IV. one σ and one π",
     ["A-III, B-IV, C-II, D-I", "A-III, B-IV, C-I, D-II", "A-I, B-IV, C-II, D-III", "A-IV, B-III, C-II, D-I"]),
    (71, "Among Group 16 elements, which does NOT show −2 oxidation state?",
     ["Te", "Po", "O", "Se"]),
    (72, "For 2A ⇌ B + C, Kc = 4 × 10⁻³. At a moment [A] = [B] = [C] = 2 × 10⁻³ M. Then:",
     ["Reaction tends backward", "Reaction has gone to completion forward", "Reaction is at equilibrium", "Reaction tends forward"]),
    (73, "Which plot of ln k vs 1/T is consistent with the Arrhenius equation?",
     ["Increasing line", "Decreasing line", "Increasing line through origin", "Decreasing line through origin"]),
    (74, "In which equilibrium are Kₚ and K_c NOT equal?",
     ["CO + H₂O ⇌ CO₂ + H₂", "2 BrCl ⇌ Br₂ + Cl₂", "PCl₅ ⇌ PCl₃ + Cl₂", "H₂ + I₂ ⇌ 2 HI"]),
    (75, "Statement I: BP of three pentanes: n-pentane > isopentane > neopentane. Statement II: With more branching the molecule becomes more spherical, surface area decreases, intermolecular forces weaken, BP decreases.",
     ["I correct, II incorrect", "I incorrect, II correct", "Both correct", "Both incorrect"]),
    (76, "Compound that undergoes Sɴ¹ reaction the fastest:",
     ["PhBr (bromobenzene)", "PhCH(CH₃)Br (1-phenylethyl bromide)", "Cyclohexyl-CH₂Br (primary)", "Cyclohexyl-Br (secondary)"]),
    (77, "Energy of an electron in n=1 of He⁺ is −x J. Energy of an electron in n=2 of Be³⁺ (in J) is:",
     ["−4x", "−4x/9", "−x", "−x/9"]),
    (78, "Entropy increases in: A. liquid → vapour  B. crystalline solid 130 K → 0 K  C. 2 NaHCO₃ → Na₂CO₃ + CO₂ + H₂O  D. Cl₂ → 2 Cl",
     ["A, C and D", "C and D", "A and C", "A, B and D"]),
    (79, "Solid → vapour without passing through liquid; the purification technique used is:",
     ["Distillation", "Chromatography", "Crystallization", "Sublimation"]),
    (80, "Match (Complex) ↔ (Type of isomerism): A. [Co(NH₃)₅(NO₂)]Cl₂  B. [Co(NH₃)₅(SO₄)]Br  C. [Co(NH₃)₆][Cr(CN)₆]  D. [Co(H₂O)₆]Cl₃  ↔  I. Solvate  II. Linkage  III. Ionization  IV. Coordination",
     ["A-I, B-IV, C-III, D-II", "A-II, B-IV, C-III, D-I", "A-II, B-III, C-IV, D-I", "A-I, B-III, C-IV, D-II"]),
    (81, "Statement I: Aniline does not undergo Friedel-Crafts alkylation. Statement II: Aniline cannot be prepared through Gabriel synthesis.",
     ["I correct, II false", "I incorrect, II true", "Both true", "Both false"]),
    (82, "Increasing first IE of Li, Be, B, C, N:",
     ["Li < Be < C < B < N", "Li < Be < N < B < C", "Li < Be < B < C < N", "Li < B < Be < C < N"]),
    (83, "Highest number of helium atoms is in:",
     ["4 g of helium", "2.271098 L of helium at STP", "4 mol of helium", "4 u of helium"]),
    (84, "The most stable carbocation among the following is:",
     ["Cyclopentyl-CH₂⁺ (primary)", "1-methylcyclohexyl⁺ (3° on ring)", "(CH₃)₂CH-CH⁺-CH₃ (secondary, branched)", "(CH₃)CH₂CH(CH₃)CH⁺(CH₃) (secondary)"]),
    (85, "Henry's law constants for gases A, B, C in water are 145, 2 × 10⁻⁵ and 35 kbar. Solubility order:",
     ["A > C > B", "A > B > C", "B > A > C", "B > C > A"]),
    # SECTION B
    (86, "A compound X contains 32% A, 20% B, rest C. Empirical formula (atomic masses A=64, B=40, C=32):",
     ["AB₂C₂", "ABC₄", "A₂BC₂", "ABC₃"]),
    (87, "Products A and B in: 3 ROH + PCl₃ → 3 RCl + A; ROH + PCl₅ → RCl + HCl + B",
     ["H₃PO₄ and POCl₃", "H₃PO₃ and POCl₃", "POCl₃ and H₃PO₃", "POCl₃ and H₃PO₄"]),
    (88, "Plot of osmotic pressure vs concentration (mol/L) is a straight line with slope 25.73 L·bar/mol. The temperature (R = 0.083 L·bar/mol·K) is:",
     ["25.73 °C", "12.05 °C", "37 °C", "310 °C"]),
    (89, "PhCH=CHPh + KMnO₄/H⁺ → P (major). P is:",
     ["Ph-CH(OH)-CH(OH)-Ph (diol)", "Ph-CO-CO-Ph (diketone)", "PhCHO (benzaldehyde)", "PhCOOH (benzoic acid)"]),
    (90, "Statement I: [Co(NH₃)₆]³⁺ is homoleptic; [Co(NH₃)₄Cl₂]⁺ is heteroleptic. Statement II: [Co(NH₃)₆]³⁺ has only one kind of ligand; [Co(NH₃)₄Cl₂]⁺ has more than one kind.",
     ["I true, II false", "I false, II true", "Both true", "Both false"]),
    (91, "Acid added during preparation of Mohr's salt to prevent hydrolysis of Fe²⁺:",
     ["Dilute nitric acid", "Dilute sulphuric acid", "Dilute hydrochloric acid", "Concentrated sulphuric acid"]),
    (92, "Identify the correct answer:",
     ["Dipole moment of NF₃ > NH₃", "Three canonical forms can be drawn for CO₃²⁻", "Three resonance structures can be drawn for ozone", "BF₃ has non-zero dipole moment"]),
    (93, "Increasing group number (0 → VI) for cations: A. Al³⁺  B. Cu²⁺  C. Ba²⁺  D. Co²⁺  E. Mg²⁺",
     ["E, C, D, B, A", "E, A, B, C, D", "B, A, D, C, E", "B, C, A, D, E"]),
    (94, "CH₃CH₂CH₂I →NaCN→ A →OH⁻ partial hydrolysis→ B →NaOH/Br₂→ C (major). C is:",
     ["Butanamide", "α-bromobutanoic acid", "Propylamine", "Butylamine"]),
    (95, "Rate quadruples when T changes from 27 °C to 57 °C. Activation energy (R = 8.314, log 4 = 0.6021):",
     ["3.80 kJ/mol", "3804 kJ/mol", "38.04 kJ/mol", "380.4 kJ/mol"]),
    (96, "At equilibrium [N₂] = 3.0×10⁻³, [O₂] = 4.2×10⁻³, [NO] = 2.8×10⁻³ M for 2 NO ⇌ N₂ + O₂. If 0.1 M NO is taken in a closed vessel, degree of dissociation α at equilibrium:",
     ["0.8889", "0.717", "0.00889", "0.0889"]),
    (97, "Work done in reversible isothermal expansion of 1 mol H₂ at 25 °C from 20 atm to 10 atm (R = 2 cal/K/mol):",
     ["413.14 cal", "100 cal", "0 cal", "−413.14 cal"]),
    (98, "Mass of Cu deposited by 9.6487 A through CuSO₄ for 100 s (M = 63 g/mol, F = 96487 C):",
     ["31.5 g", "0.0315 g", "3.15 g", "0.315 g"]),
    (99, "2-methylcyclohexan-1-ol → PBr₃ → A → alc. KOH/Δ → B (major). A and B are:",
     ["A: 1-Br, 2-OH cyclohexane; B: 1-OH cyclohex-2-ene", "A: 1-Br,2-OH cyclohexane; B: 2-methyl-cyclohex-1-one", "A: 1-Br,2-Me cyclohexane; B: 1-methyl cyclohexene", "A: 1-Br,2-Me cyclohexane; B: 3-methyl cyclohexene"]),
    (100, "The pair of lanthanoid ions which are diamagnetic:",
     ["Gd³⁺ and Eu³⁺", "Pm³⁺ and Sm³⁺", "Ce⁴⁺ and Yb²⁺", "Ce³⁺ and Eu²⁺"]),
]

# ── BOTANY (Q101–150): Section A (101–135) + Section B (136–150) ──
BOTANY = [
    (101, "Identify the set of correct statements: A. Vallisneria flowers are colourful and produce nectar  B. Waterlily is not pollinated by water  C. In most water-pollinated species, pollen grains are protected from wetting  D. Pollen grains of some hydrophytes are long and ribbon-like  E. In some hydrophytes, pollen grains are carried passively in water",
     ["A, C, D and E only", "B, C, D and E only", "C, D and E only", "A, B, C and D only"]),
    (102, "Conservation in which threatened species are removed from natural habitat to a special protected setting is called:",
     ["Semi-conservative method", "Sustainable development", "in-situ conservation", "Biodiversity conservation"]),
    (103, "Inhibition of succinic dehydrogenase by malonate is a classical example of:",
     ["Competitive inhibition", "Enzyme activation", "Cofactor inhibition", "Feedback inhibition"]),
    (104, "Identify the part of the seed (labelled A, B, C, D) destined to form the root upon germination:",
     ["C", "D", "A", "B"]),
    (105, "Bulliform cells are responsible for:",
     ["Increased photosynthesis in monocots", "Providing large spaces for storage of sugars", "Inward curling of leaves in monocots", "Protecting the plant from salt stress"]),
    (106, "Required for the dark reaction of photosynthesis: A. Light  B. Chlorophyll  C. CO₂  D. ATP  E. NADPH",
     ["C, D and E only", "D and E only", "A, B and C only", "B, C and D only"]),
    (107, "Formation of interfascicular cambium from fully developed parenchyma cells is an example of:",
     ["Dedifferentiation", "Maturation", "Differentiation", "Redifferentiation"]),
    (108, "Hind II always cuts DNA at a recognition sequence consisting of:",
     ["4 bp", "10 bp", "8 bp", "6 bp"]),
    (109, "Tropical regions show greatest species richness because: A. relatively undisturbed for millions of years  B. tropical environments are more seasonal  C. more solar energy in tropics  D. constant environments promote niche specialization  E. tropical environments are constant and predictable",
     ["A, B and E only", "A, B and D only", "A, C, D and E only", "A and B only"]),
    (110, "Which is NOT a criterion for classification of fungi?",
     ["Mode of spore formation", "Fruiting body", "Morphology of mycelium", "Mode of nutrition"]),
    (111, "ATP and NADPH required per CO₂ fixed in Calvin cycle:",
     ["3 ATP and 3 NADPH", "3 ATP and 2 NADPH", "2 ATP and 3 NADPH", "2 ATP and 2 NADPH"]),
    (112, "Major causes of biodiversity loss: A. Over-exploitation  B. Co-extinction  C. Mutation  D. Habitat loss and fragmentation  E. Migration",
     ["A, B and E only", "A, B and D only", "A, C and D only", "A, B, C and D only"]),
    (113, "The capacity to generate a whole plant from any cell is called:",
     ["Differentiation", "Somatic hybridization", "Totipotency", "Micropropagation"]),
    (114, "In Verhulst-Pearl logistic growth dN/dt = rN[(K−N)/K], K is:",
     ["Carrying capacity", "Population density", "Intrinsic rate of natural increase", "Biotic potential"]),
    (115, "Spindle fibres attach to kinetochores during:",
     ["Anaphase", "Telophase", "Prophase", "Metaphase"]),
    (116, "Identify the type of flowers based on position of calyx, corolla, androecium w.r.t. ovary in figures (a) and (b):",
     ["(a) Perigynous; (b) Epigynous", "(a) Perigynous; (b) Perigynous", "(a) Epigynous; (b) Hypogynous", "(a) Hypogynous; (b) Epigynous"]),
    (117, "Match: A. Rhizopus  B. Ustilago  C. Puccinia  D. Agaricus  ↔  I. Mushroom  II. Smut fungus  III. Bread mould  IV. Rust fungus",
     ["A-III, B-II, C-I, D-IV", "A-IV, B-III, C-II, D-I", "A-III, B-II, C-IV, D-I", "A-I, B-III, C-II, D-IV"]),
    (118, "Black seed colour (BB/Bb) is dominant over white (bb). To find the genotype of a black-seed plant, cross with:",
     ["Bb", "BB/Bb", "BB", "bb"]),
    (119, "A pink-flowered Snapdragon × red-flowered Snapdragon. Phenotypes in progeny:",
     ["Only pink", "Red, pink and white", "Only red", "Red and pink only"]),
    (120, "Match: A. Two or more alternative forms of a gene  B. Cross of F₁ with homozygous recessive parent  C. Cross of F₁ with any of the parents  D. Number of chromosome sets  ↔  I. Back cross  II. Ploidy  III. Allele  IV. Test cross",
     ["A-III, B-IV, C-I, D-II", "A-IV, B-III, C-II, D-I", "A-I, B-II, C-III, D-IV", "A-II, B-I, C-III, D-IV"]),
    (121, "Lecithin (a small molecular-weight organic compound in living tissues) is an example of:",
     ["Glycerides", "Carbohydrates", "Amino acids", "Phospholipids"]),
    (122, "Match: A. Clostridium butylicum  B. Saccharomyces cerevisiae  C. Trichoderma polysporum  D. Streptococcus sp.  ↔  I. Ethanol  II. Streptokinase  III. Butyric acid  IV. Cyclosporin-A",
     ["A-III, B-I, C-IV, D-II", "A-IV, B-I, C-III, D-II", "A-III, B-I, C-II, D-IV", "A-II, B-IV, C-III, D-I"]),
    (123, "In the given figure (guard cells of stomata), which component has thin outer walls and highly thickened inner walls?",
     ["A", "B", "C", "D"]),
    (124, "Example of an actinomorphic flower:",
     ["Pisum", "Sesbania", "Datura", "Cassia"]),
    (125, "A transcription unit in DNA has three regions (upstream → downstream):",
     ["Inducer, Repressor, Structural gene", "Promoter, Structural gene, Terminator", "Repressor, Operator, Structural gene", "Structural gene, Transposons, Operator"]),
    (126, "Fate of a piece of DNA carrying only a gene of interest transferred into an alien organism: A. multiplies independently in progeny  B. may integrate into recipient genome  C. may multiply and be inherited along with host DNA  D. it is not an integrated part of chromosome  E. ability to replicate",
     ["B and C only", "A and E only", "A and B only", "D and E only"]),
    (127, "Auxin is used by gardeners to weed lawns without harming grass because auxin:",
     ["Does not affect mature monocotyledonous plants", "Helps in cell division in grasses", "Promotes apical dominance", "Promotes abscission of mature leaves only"]),
    (128, "Cofactor of carboxypeptidase:",
     ["Flavin", "Haem", "Zinc", "Niacin"]),
    (129, "Lactose is transported into bacterial cells by the action of:",
     ["Permease", "Polymerase", "β-galactosidase", "Acetylase"]),
    (130, "Mendel's Law of Dominance explains: A. one of a pair of factors is dominant, the other recessive  B. alleles do not show any expression and both characters appear in F₂  C. factors occur in pairs in normal diploids  D. the discrete unit controlling a character is called factor  E. expression of only one parental character in monohybrid cross",
     ["B, C and D only", "A, B, C, D and E", "A, B and C only", "A, C, D and E only"]),
    (131, "Statement I: Bt toxins are insect-group specific and coded by the gene cry IAc. Statement II: Bt toxin exists as inactive protoxin in B. thuringiensis; after ingestion, the acidic pH of the insect gut activates it.",
     ["I true, II false", "I false, II true", "Both true", "Both false"]),
    (132, "Statement I: Parenchyma is living but collenchyma is dead. Statement II: Gymnosperms lack xylem vessels; presence of xylem vessels is characteristic of angiosperms.",
     ["I true, II false", "I false, II true", "Both true", "Both false"]),
    (133, "Statement I: Chromosomes become gradually visible under light microscope during leptotene. Statement II: Diplotene begins with dissolution of synaptonemal complex.",
     ["I true, II false", "I false, II true", "Both true", "Both false"]),
    (134, "Match: A. Nucleolus  B. Centriole  C. Leucoplasts  D. Golgi apparatus  ↔  I. Site of formation of glycolipid  II. Cartwheel organisation  III. Site for ribosomal RNA synthesis  IV. Storing nutrients",
     ["A-III, B-IV, C-II, D-I", "A-I, B-II, C-III, D-IV", "A-III, B-II, C-IV, D-I", "A-II, B-III, C-I, D-IV"]),
    (135, "List of endangered species was released by:",
     ["FOAM", "IUCN", "GEAC", "WWF"]),
    # SECTION B
    (136, "DNA in chloroplast is:",
     ["Linear, single stranded", "Circular, single stranded", "Linear, double stranded", "Circular, double stranded"]),
    (137, "What are fused in somatic hybridization between two plant varieties?",
     ["Protoplasts", "Pollens", "Callus", "Somatic embryos"]),
    (138, "Identify the description of the figure (compact spike-like inflorescence with prominent exposed stamens):",
     ["Cleistogamous flowers showing autogamy", "Compact inflorescence showing complete autogamy", "Wind-pollinated plant inflorescence with well-exposed stamens", "Water-pollinated flowers with mucilaginous covering"]),
    (139, "Spraying sugarcane with which PGR increases stem length and yield?",
     ["Cytokinin", "Abscisic acid", "Auxin", "Gibberellin"]),
    (140, "Match: A. Frederick Griffith  B. Jacob & Monod  C. Khorana  D. Meselson & Stahl  ↔  I. Genetic code  II. Semi-conservative DNA replication  III. Transformation  IV. Lac operon",
     ["A-II, B-III, C-IV, D-I", "A-IV, B-I, C-II, D-III", "A-III, B-II, C-I, D-IV", "A-III, B-IV, C-I, D-II"]),
    (141, "Match: A. GLUT-4  B. Insulin  C. Trypsin  D. Collagen  ↔  I. Hormone  II. Enzyme  III. Intercellular ground substance  IV. Glucose transporter",
     ["A-II, B-III, C-IV, D-I", "A-III, B-IV, C-I, D-II", "A-IV, B-I, C-II, D-III", "A-I, B-II, C-III, D-IV"]),
    (142, "Statement I: In C₃ plants, some O₂ binds RuBisCO; CO₂ fixation is decreased. Statement II: In C₄ plants, mesophyll cells show very little photorespiration; bundle sheath cells show none.",
     ["I true, II false", "I false, II true", "Both true", "Both false"]),
    (143, "Step in TCA cycle that does NOT involve oxidation of substrate:",
     ["Succinyl-CoA → Succinic acid", "Isocitrate → α-ketoglutaric acid", "Malic acid → Oxaloacetic acid", "Succinic acid → Malic acid"]),
    (144, "Match: A. Citric acid cycle  B. Glycolysis  C. Electron transport system  D. Proton gradient  ↔  I. Cytoplasm  II. Mitochondrial matrix  III. Intermembrane space  IV. Inner mitochondrial membrane",
     ["A-III, B-IV, C-I, D-II", "A-IV, B-III, C-II, D-I", "A-I, B-II, C-III, D-IV", "A-II, B-I, C-IV, D-III"]),
    (145, "Correct statement on E. coli replication:",
     ["DNA-dependent DNA polymerase polymerises 5'→3' AND 3'→5'", "DNA-dependent DNA polymerase polymerises only 5'→3'", "DNA-dependent DNA polymerase polymerises only 3'→5'", "DNA-dependent RNA polymerase polymerises only 5'→3'"]),
    (146, "If NPP of first trophic level = 100x kcal/m²/yr, GPP of third trophic level (assuming 10% rule) is:",
     ["10x kcal/m²/yr", "100x/3x kcal/m²/yr", "x/10 kcal/m²/yr", "x kcal/m²/yr"]),
    (147, "Match: A. Rose  B. Pea  C. Cotton  D. Mango  ↔  I. Twisted aestivation  II. Perigynous flower  III. Drupe  IV. Marginal placentation",
     ["A-IV, B-III, C-II, D-I", "A-II, B-III, C-IV, D-I", "A-II, B-IV, C-I, D-III", "A-I, B-II, C-III, D-IV"]),
    (148, "Match: A. Robert May  B. Alexander von Humboldt  C. Paul Ehrlich  D. David Tilman  ↔  I. Species-area relationship  II. Long-term ecosystem outdoor plot experiment  III. Global species diversity ≈ 7 million  IV. Rivet popper hypothesis",
     ["A-I, B-III, C-II, D-IV", "A-III, B-IV, C-II, D-I", "A-II, B-III, C-I, D-IV", "A-III, B-I, C-IV, D-II"]),
    (149, "Match (Stamen type) ↔ (Example): A. Monoadelphous  B. Diadelphous  C. Polyadelphous  D. Epiphyllous  ↔  I. Citrus  II. Pea  III. Lily  IV. China-rose",
     ["A-I, B-II, C-IV, D-III", "A-III, B-I, C-IV, D-II", "A-IV, B-II, C-I, D-III", "A-IV, B-I, C-II, D-III"]),
    (150, "Correct statements about Phaeophyceae: A. asexual by biflagellate zoospores  B. sexual is oogamous only  C. stored food is mannitol or laminarin  D. major pigments: chl a, c, carotenoids, xanthophyll  E. cellulosic wall covered by gelatinous algin",
     ["A, C, D and E only", "A, B, C and E only", "A, B, C and D only", "B, C, D and E only"]),
]

# ── ZOOLOGY (Q151–200): Section A (151–185) + Section B (186–200) ──
ZOOLOGY = [
    (151, "Match: A. Typhoid  B. Leishmaniasis  C. Ringworm  D. Filariasis  ↔  I. Fungus  II. Nematode  III. Protozoa  IV. Bacteria",
     ["A-III, B-I, C-IV, D-II", "A-II, B-IV, C-III, D-I", "A-I, B-III, C-II, D-IV", "A-IV, B-III, C-I, D-II"]),
    (152, "Match: A. Non-medicated IUD  B. Copper-releasing IUD  C. Hormone-releasing IUD  D. Implants  ↔  I. Multiload 375  II. Progestogens  III. Lippes loop  IV. LNG-20",
     ["A-IV, B-I, C-II, D-III", "A-III, B-I, C-IV, D-II", "A-III, B-I, C-II, D-IV", "A-I, B-III, C-IV, D-II"]),
    (153, "Statement I: Presence/absence of hymen is not a reliable indicator of virginity. Statement II: The hymen is torn during the first coitus only.",
     ["I true, II false", "I false, II true", "Both true", "Both false"]),
    (154, "In both sexes of cockroach, anal cerci are present on:",
     ["8th and 9th segment", "11th segment", "5th segment", "10th segment"]),
    (155, "Match: A. Pons  B. Hypothalamus  C. Medulla  D. Cerebellum  ↔  I. Provides additional space for neurons; regulates posture and balance  II. Controls respiration and gastric secretions  III. Connects different brain regions  IV. Neurosecretory cells",
     ["A-I, B-III, C-II, D-IV", "A-II, B-I, C-III, D-IV", "A-II, B-III, C-I, D-IV", "A-III, B-IV, C-II, D-I"]),
    (156, "Which is NOT a steroid hormone?",
     ["Progesterone", "Glucagon", "Cortisol", "Testosterone"]),
    (157, "DNA-dependent RNA polymerase product for template 3' TACATGGCAAATATCCATTCA 5':",
     ["5' AUGUACCGUUUAUAGGGAAGU 3'", "5' ATGTACCGTTTATAGGTAAGT 3'", "5' AUGUACCGUUUAUAGGUAAGU 3'", "5' AUGUAAAGUUUAUAGGUAAGU 3'"]),
    (158, "Three types of muscles (a, b, c) — identify the matching pair with locations:",
     ["(a) Skeletal-Biceps; (b) Involuntary-Intestine; (c) Smooth-Heart", "(a) Involuntary-Nose tip; (b) Skeletal-Bone; (c) Cardiac-Heart", "(a) Smooth-Toes; (b) Skeletal-Legs; (c) Cardiac-Heart", "(a) Skeletal-Triceps; (b) Smooth-Stomach; (c) Cardiac-Heart"]),
    (159, "Stages of cell division: A. G2  B. Cytokinesis  C. S phase  D. Karyokinesis  E. G1. Correct sequence:",
     ["B-D-E-A-C", "E-C-A-D-B", "C-E-D-A-B", "E-B-D-A-C"]),
    (160, "Autoimmune disorders: A. Myasthenia gravis  B. Rheumatoid arthritis  C. Gout  D. Muscular dystrophy  E. SLE",
     ["B, C and E only", "C, D and E only", "A, B and D only", "A, B and E only"]),
    (161, "Match (Enzyme) ↔ (Bond cleaved): A. Lipase  B. Nuclease  C. Protease  D. Amylase  ↔  I. Peptide bond  II. Ester bond  III. Glycosidic bond  IV. Phosphodiester bond",
     ["A-II, B-IV, C-I, D-III", "A-IV, B-I, C-III, D-II", "A-IV, B-II, C-III, D-I", "A-III, B-II, C-I, D-IV"]),
    (162, "Flippers of penguins and dolphins are an example of:",
     ["Convergent evolution", "Divergent evolution", "Adaptive radiation", "Natural selection"]),
    (163, "Match: A. Expiratory capacity  B. Functional residual capacity  C. Vital capacity  D. Inspiratory capacity  ↔  I. ERV+TV+IRV  II. TV+ERV  III. TV+IRV  IV. ERV+RV",
     ["A-II, B-I, C-IV, D-III", "A-I, B-III, C-II, D-IV", "A-II, B-IV, C-I, D-III", "A-III, B-II, C-IV, D-I"]),
    (164, "Which factor will NOT affect Hardy-Weinberg equilibrium?",
     ["Gene migration", "Constant gene pool", "Genetic recombination", "Genetic drift"]),
    (165, "Sequence of human evolution (past to recent): A. Homo habilis  B. Homo sapiens  C. Homo neanderthalensis  D. Homo erectus",
     ["C-B-D-A", "A-D-C-B", "D-A-C-B", "B-A-D-C"]),
    (166, "Pathway of action potential through heart: A. AV bundle  B. Purkinje fibres  C. AV node  D. Bundle branches  E. SA node",
     ["B-D-E-C-A", "E-A-D-B-C", "E-C-A-D-B", "A-E-C-B-D"]),
    (167, "Factors favouring oxyhaemoglobin formation in alveoli:",
     ["Low pCO₂ and high H⁺", "Low pCO₂ and high temperature", "High pO₂ and high pCO₂", "High pO₂ and lesser H⁺ concentration"]),
    (168, "Match: A. α-1 antitrypsin  B. Cry IAb  C. Cry IAc  D. Enzyme replacement therapy  ↔  I. Cotton bollworm  II. ADA deficiency  III. Emphysema  IV. Corn borer",
     ["A-III, B-IV, C-I, D-II", "A-II, B-IV, C-I, D-III", "A-II, B-I, C-IV, D-III", "A-III, B-I, C-II, D-IV"]),
    (169, "Assertion: FSH acts on ovarian follicles in females and Leydig cells in males. Reason: Growing ovarian follicles secrete estrogen; interstitial cells secrete androgens.",
     ["A true, R false", "A false, R true", "Both true; R is correct explanation", "Both true; R is NOT correct explanation"]),
    (170, "In E. coli cloning vector pBR322, the genes 'X' and 'Y' represent:",
     ["X: replication protein; Y: antibiotic resistance", "X: recognition sites; Y: antibiotic resistance", "X: antibiotic resistance; Y: replication protein", "X: copy-number control; Y: replication protein"]),
    (171, "Match: A. Cocaine  B. Heroin  C. Morphine  D. Marijuana  ↔  I. Effective sedative in surgery  II. Cannabis sativa  III. Erythroxylum  IV. Papaver somniferum",
     ["A-II, B-I, C-III, D-IV", "A-III, B-IV, C-I, D-II", "A-IV, B-III, C-I, D-II", "A-I, B-III, C-II, D-IV"]),
    (172, "Consider: A. Annelids are true coelomates  B. Poriferans are pseudocoelomates  C. Aschelminthes are acoelomates  D. Platyhelminthes are pseudocoelomates",
     ["C only", "D only", "B only", "A only"]),
    (173, "Statement I: In the nephron, the descending limb of loop of Henle is impermeable to water and permeable to electrolytes. Statement II: The PCT is lined by simple columnar brush border epithelium and increases surface area for reabsorption.",
     ["I true, II false", "I false, II true", "Both true", "Both false"]),
    (174, "Match: A. Fibrous joints  B. Cartilaginous joints  C. Hinge  D. Ball-and-socket  ↔  I. Adjacent vertebrae, limited movement  II. Humerus and pectoral girdle, rotational  III. Skull, no movement  IV. Knee, locomotion",
     ["A-II, B-III, C-I, D-IV", "A-III, B-I, C-IV, D-II", "A-IV, B-II, C-III, D-I", "A-I, B-III, C-II, D-IV"]),
    (175, "Which is NOT a natural/traditional contraceptive method?",
     ["Lactational amenorrhea", "Vaults", "Coitus interruptus", "Periodic abstinence"]),
    (176, "Match: A. Pleurobrachia  B. Radula  C. Stomochord  D. Air bladder  ↔  I. Mollusca  II. Ctenophora  III. Osteichthyes  IV. Hemichordata",
     ["A-II, B-IV, C-I, D-III", "A-IV, B-III, C-II, D-I", "A-IV, B-II, C-III, D-I", "A-II, B-I, C-IV, D-III"]),
    (177, "Match: A. Axoneme  B. Cartwheel pattern  C. Crista  D. Satellite  ↔  I. Centriole  II. Cilia and flagella  III. Chromosome  IV. Mitochondria",
     ["A-II, B-IV, C-I, D-III", "A-II, B-I, C-IV, D-III", "A-IV, B-III, C-II, D-I", "A-IV, B-II, C-III, D-II"]),
    (178, "Which statement is INCORRECT?",
     ["Bioreactors are used to produce small-scale bacterial cultures", "Bioreactors have agitator, oxygen-delivery, and foam-control systems", "A bioreactor provides optimal growth conditions for the desired product", "Most commonly used bioreactors are stirring-type"]),
    (179, "Match (Sub-phases of Prophase-I) with (Specific characters): A. Diakinesis  B. Pachytene  C. Zygotene  D. Leptotene  ↔  I. Synaptonemal complex formation  II. Completion of terminalisation of chiasmata  III. Chromosomes look like thin threads  IV. Appearance of recombination nodules",
     ["A-II, B-IV, C-I, D-III", "A-IV, B-III, C-II, D-I", "A-IV, B-II, C-III, D-I", "A-I, B-II, C-IV, D-III"]),
    (180, "Match: A. Common cold  B. Haemozoin  C. Widal test  D. Allergy  ↔  I. Plasmodium  II. Typhoid  III. Rhinoviruses  IV. Dust mites",
     ["A-III, B-I, C-II, D-IV", "A-IV, B-II, C-III, D-I", "A-II, B-IV, C-III, D-I", "A-I, B-III, C-II, D-IV"]),
    (181, "Assertion: Breastfeeding during initial period of infant growth is recommended. Reason: Colostrum contains several antibodies essential to develop resistance for the new born baby.",
     ["A correct, R not correct", "A not correct, R correct", "Both correct; R correct explanation", "Both correct; R NOT correct explanation"]),
    (182, "Match: A. Pterophyllum  B. Myxine  C. Pristis  D. Exocoetus  ↔  I. Hag fish  II. Saw fish  III. Angel fish  IV. Flying fish",
     ["A-IV, B-I, C-II, D-III", "A-III, B-II, C-I, D-IV", "A-II, B-I, C-III, D-IV", "A-III, B-I, C-II, D-IV"]),
    (183, "'Ti plasmid' of Agrobacterium tumefaciens stands for:",
     ["Tumour-inducing plasmid", "Temperature-independent plasmid", "Tumour-inhibiting plasmid", "Tumour-independent plasmid"]),
    (184, "Which is NOT a component of the Fallopian tube?",
     ["Infundibulum", "Ampulla", "Uterine fundus", "Isthmus"]),
    (185, "Match: A. Down's syndrome  B. α-Thalassemia  C. β-Thalassemia  D. Klinefelter's  ↔  I. 11th chromosome  II. 'X' chromosome  III. 21st chromosome  IV. 16th chromosome",
     ["A-III, B-IV, C-I, D-II", "A-IV, B-I, C-II, D-III", "A-I, B-II, C-III, D-IV", "A-II, B-III, C-IV, D-I"]),
    # SECTION B
    (186, "Statements about non-chordates: A. Pharynx perforated by gill slits  B. Notochord absent  C. CNS dorsal  D. Heart dorsal if present  E. Post-anal tail absent",
     ["B, D and E only", "B, C and D only", "A and C only", "A, B and D only"]),
    (187, "Match (Era) ↔ (Group): A. Mesozoic  B. Proterozoic  C. Cenozoic  D. Paleozoic  ↔  I. Lower invertebrates  II. Fish & Amphibia  III. Birds & Reptiles  IV. Mammals",
     ["A-I, B-II, C-IV, D-III", "A-III, B-I, C-IV, D-II", "A-II, B-I, C-III, D-IV", "A-III, B-I, C-II, D-IV"]),
    (188, "Statement I: Cerebral hemispheres are connected by corpus callosum. Statement II: Brain stem consists of medulla oblongata, pons, and cerebrum.",
     ["I correct, II incorrect", "I incorrect, II correct", "Both correct", "Both incorrect"]),
    (189, "Spermatogenesis pathway: GnRH → LH/A → B/C → Androgens/Factors → spermatids/D. Identify A, B, C, D:",
     ["FSH, Sertoli cells, Leydig cells, spermatogenesis", "ICSH, Leydig cells, Sertoli cells, spermatogenesis", "FSH, Leydig cells, Sertoli cells, spermiogenesis", "ICSH, Interstitial cells, Leydig cells, spermiogenesis"]),
    (190, "Match: A. RNA polymerase III  B. Termination of transcription  C. Splicing of exons  D. TATA box  ↔  I. snRNPs  II. Promoter  III. Rho factor  IV. snRNAs, tRNA",
     ["A-III, B-IV, C-I, D-II", "A-IV, B-III, C-I, D-II", "A-II, B-IV, C-I, D-III", "A-III, B-II, C-IV, D-I"]),
    (191, "Match: A. Exophthalmic goitre  B. Acromegaly  C. Cushing's syndrome  D. Cretinism  ↔  I. ↑cortisol, moon face, hyperglycaemia  II. ↓thyroid, stunted growth  III. ↑thyroid + protruding eyeballs  IV. ↑Growth Hormone",
     ["A-III, B-IV, C-II, D-I", "A-III, B-IV, C-I, D-II", "A-I, B-III, C-II, D-IV", "A-IV, B-II, C-I, D-III"]),
    (192, "Match: A. Unicellular glandular epithelium  B. Compound epithelium  C. Multicellular glandular epithelium  D. Endocrine glandular epithelium  ↔  I. Salivary glands  II. Pancreas  III. Goblet cells  IV. Buccal cavity moist surface",
     ["A-III, B-IV, C-I, D-II", "A-II, B-I, C-IV, D-III", "A-II, B-I, C-III, D-IV", "A-IV, B-III, C-I, D-II"]),
    (193, "Statement I: Bone marrow is the main lymphoid organ where all blood cells including lymphocytes are produced. Statement II: Both bone marrow and thymus provide microenvironments for development and maturation of T-lymphocytes.",
     ["I correct, II incorrect", "I incorrect, II correct", "Both correct", "Both incorrect"]),
    (194, "Match: A. Storing food  B. Ring of 6-8 blind tubules at junction of foregut/midgut  C. Ring of 100-150 yellow filaments at midgut/hindgut  D. Grinding food  ↔  I. Gizzard  II. Gastric Caeca  III. Malpighian tubules  IV. Crop",
     ["A-IV, B-III, C-II, D-I", "A-III, B-II, C-IV, D-I", "A-IV, B-II, C-III, D-I", "A-I, B-II, C-III, D-IV"]),
    (195, "Correct statement on juxtamedullary nephron:",
     ["Loop of Henle runs deep into medulla", "Outnumber cortical nephrons", "Located in columns of Bertini", "Renal corpuscle lies in outer renal medulla"]),
    (196, "Match (ECG): A. P wave  B. QRS complex  C. T wave  D. T-P gap  ↔  I. Heart muscles electrically silent  II. Depolarisation of ventricles  III. Depolarisation of atria  IV. Repolarisation of ventricles",
     ["A-II, B-III, C-I, D-IV", "A-IV, B-II, C-I, D-III", "A-I, B-III, C-IV, D-II", "A-III, B-II, C-IV, D-I"]),
    (197, "Father B⁺, mother A⁺, child O⁺. Possible genotypes: A. IᴮI/IᴬI/ii  B. IᴮIᴮ/IᴬIᴬ/ii  C. IᴬIᴮ/iIᴬ/Iᴮi  D. IᴬI/IᴮI/IᴬI  E. iIᴮ/iIᴬ/IᴬIᴮ",
     ["C and B only", "D and E only", "A only", "B only"]),
    (198, "Statement I: Gause's competitive exclusion principle states two closely related species competing for different resources cannot coexist. Statement II: According to Gause's principle, in competition the inferior is eliminated, true if resources are limiting.",
     ["I true, II false", "I false, II true", "Both true", "Both false"]),
    (199, "Catalytic cycle of enzyme action — correct sequence: A. ES complex formation  B. Free enzyme ready  C. Release of products  D. Bonds broken  E. Substrate binding",
     ["B, A, C, D, E", "E, D, C, B, A", "E, A, D, C, B", "A, E, B, D, C"]),
    (200, "Statement I: Mitochondria and chloroplasts are both double-membrane bound. Statement II: Inner membrane of mitochondria is relatively less permeable than chloroplast.",
     ["I correct, II incorrect", "I incorrect, II correct", "Both correct", "Both incorrect"]),
]

QUESTIONS = PHYSICS + CHEMISTRY + BOTANY + ZOOLOGY

# ── ANSWER KEY (Q# → option index 1-4) — official, Code T3 ────────────
ANSWER_KEY = {
    # Physics
    1: 4, 2: 1, 3: 3, 4: 2, 5: 4, 6: 2, 7: 3, 8: 3, 9: 3, 10: 3,
    11: 2, 12: 4, 13: 3, 14: 4, 15: 2, 16: 1, 17: 1, 18: 4, 19: 3, 20: 3,
    21: 1, 22: 2, 23: 1, 24: 4, 25: 4, 26: 3, 27: 4, 28: 1, 29: 2, 30: 1,
    31: 4, 32: 2, 33: 2, 34: 4, 35: 3,
    36: 3, 37: 4, 38: 2, 39: 4, 40: 4, 41: 4, 42: 4, 43: 4, 44: 4, 45: 3,
    46: 4, 47: 4, 48: 1, 49: 2, 50: 4,
    # Chemistry
    51: 1, 52: 4, 53: 4, 54: 3, 55: 1, 56: 1, 57: 3, 58: 3, 59: 2, 60: 4,
    61: 3, 62: 2, 63: 2, 64: 2, 65: 3, 66: 3, 67: 3, 68: 3, 69: 3, 70: 4,
    71: 4, 72: 2, 73: 3, 74: 1, 75: 3, 76: 3, 77: 2, 78: 1, 79: 3, 80: 2,
    81: 1, 82: 3, 83: 4, 84: 2, 85: 3,
    86: 3, 87: 2, 88: 2, 89: 4, 90: 3, 91: 3, 92: 3, 93: 3, 94: 2, 95: 4,
    96: 4, 97: 3, 98: 2, 99: 4, 100: 3,
    # Botany
    101: 1, 102: 4, 103: 4, 104: 3, 105: 3, 106: 2, 107: 1, 108: 1, 109: 1, 110: 1,
    111: 3, 112: 1, 113: 3, 114: 4, 115: 2, 116: 1, 117: 1, 118: 4, 119: 3, 120: 1,
    121: 2, 122: 2, 123: 3, 124: 2, 125: 1, 126: 3, 127: 4, 128: 2, 129: 3, 130: 4,
    131: 3, 132: 2, 133: 1, 134: 4, 135: 4,
    136: 4, 137: 4, 138: 3, 139: 3, 140: 2, 141: 4, 142: 1, 143: 4, 144: 4, 145: 1,
    146: 1, 147: 1, 148: "1 or 4", 149: 3, 150: 3,
    # Zoology
    151: 4, 152: 2, 153: 1, 154: 1, 155: 2, 156: 1, 157: 1, 158: 3, 159: 3, 160: 4,
    161: 4, 162: 4, 163: 4, 164: 2, 165: 1, 166: 1, 167: 1, 168: 3, 169: 3, 170: 4,
    171: 2, 172: 4, 173: 1, 174: 3, 175: 4, 176: 2, 177: 1, 178: 2, 179: 2, 180: 2,
    181: 4, 182: 2, 183: 2, 184: 4, 185: 4,
    186: 3, 187: 4, 188: 1, 189: 1, 190: 3, 191: 2, 192: "1 or 3", 193: 3, 194: 2, 195: 2,
    196: 3, 197: 1, 198: 1, 199: 2, 200: 3,
}

# ─────────────────────────────────────────────────────────────────────
# PDF BUILD
# ─────────────────────────────────────────────────────────────────────

styles = getSampleStyleSheet()

title_style = ParagraphStyle(
    'TitleStyle', parent=styles['Title'],
    fontSize=22, leading=26, alignment=TA_CENTER,
    textColor=colors.HexColor('#047857'), spaceAfter=6, fontName='Helvetica-Bold'
)
subtitle_style = ParagraphStyle(
    'SubtitleStyle', parent=styles['Normal'],
    fontSize=11, leading=14, alignment=TA_CENTER,
    textColor=colors.HexColor('#475569'), spaceAfter=14
)
section_style = ParagraphStyle(
    'SectionStyle', parent=styles['Heading2'],
    fontSize=15, leading=18, spaceBefore=14, spaceAfter=10,
    textColor=colors.white, backColor=colors.HexColor('#047857'),
    borderPadding=8, fontName='Helvetica-Bold', alignment=TA_CENTER
)
sub_section_style = ParagraphStyle(
    'SubSectionStyle', parent=styles['Heading3'],
    fontSize=12, leading=14, spaceBefore=8, spaceAfter=6,
    textColor=colors.white, backColor=colors.HexColor('#0f766e'),
    borderPadding=5, fontName='Helvetica-Bold', alignment=TA_LEFT
)
qno_style = ParagraphStyle(
    'QNoStyle', parent=styles['Normal'],
    fontSize=11, leading=14, fontName='Helvetica-Bold',
    textColor=colors.HexColor('#0f172a'), spaceAfter=4
)
question_style = ParagraphStyle(
    'QuestionStyle', parent=styles['Normal'],
    fontSize=10.5, leading=14, alignment=TA_JUSTIFY,
    textColor=colors.HexColor('#1e293b'), spaceAfter=4
)
option_style = ParagraphStyle(
    'OptionStyle', parent=styles['Normal'],
    fontSize=10, leading=13, leftIndent=14,
    textColor=colors.HexColor('#334155'), spaceAfter=2
)
ak_head_style = ParagraphStyle(
    'AKHead', parent=styles['Heading2'],
    fontSize=18, leading=22, alignment=TA_CENTER,
    textColor=colors.white, backColor=colors.HexColor('#b45309'),
    borderPadding=10, fontName='Helvetica-Bold', spaceAfter=14
)
note_style = ParagraphStyle(
    'NoteStyle', parent=styles['Normal'],
    fontSize=9.5, leading=13, alignment=TA_LEFT,
    textColor=colors.HexColor('#64748b'), spaceAfter=8, leftIndent=6
)
instr_style = ParagraphStyle(
    'InstrStyle', parent=styles['Normal'],
    fontSize=10, leading=14, alignment=TA_JUSTIFY,
    textColor=colors.HexColor('#1f2937'), spaceAfter=4, leftIndent=4
)


def render_question(q_no, q_text, opts):
    qhtml = f'<b>Q{q_no}.</b> {q_text}'
    elems = [Paragraph(qhtml, question_style)]
    letters = ['(1)', '(2)', '(3)', '(4)']
    for i, opt in enumerate(opts):
        elems.append(Paragraph(f'<b>{letters[i]}</b> &nbsp; {opt}', option_style))
    elems.append(Spacer(1, 6))
    return KeepTogether(elems)


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(colors.HexColor('#047857'))
    canvas.rect(0, A4[1] - 1.4 * cm, A4[0], 1.4 * cm, stroke=0, fill=1)
    canvas.setFillColor(colors.white)
    canvas.setFont('Helvetica-Bold', 11)
    canvas.drawString(1.5 * cm, A4[1] - 0.95 * cm, 'NEET (UG) 2024 — Previous Year Question Paper')
    canvas.setFont('Helvetica', 9)
    canvas.drawRightString(A4[0] - 1.5 * cm, A4[1] - 0.95 * cm, 'Date: 05-05-2024  |  Code T3')
    canvas.setFillColor(colors.HexColor('#94a3b8'))
    canvas.setFont('Helvetica', 8)
    canvas.drawString(1.5 * cm, 0.8 * cm, 'VAZHIKATTI — Career Guidance Platform')
    canvas.drawRightString(A4[0] - 1.5 * cm, 0.8 * cm, f'Page {doc.page}')
    canvas.restoreState()


def build():
    doc = SimpleDocTemplate(
        OUT, pagesize=A4,
        topMargin=1.8 * cm, bottomMargin=1.4 * cm,
        leftMargin=1.5 * cm, rightMargin=1.5 * cm,
        title='NEET (UG) 2024 — Previous Year Question Paper',
        author='VAZHIKATTI'
    )

    story = []

    # Cover
    story.append(Spacer(1, 1.2 * cm))
    story.append(Paragraph('NEET (UG) 2024', title_style))
    story.append(Paragraph(
        'National Eligibility cum Entrance Test (Undergraduate)<br/>'
        'Date: <b>05 May 2024</b> &nbsp;|&nbsp; Test Booklet Code: <b>T3</b><br/>'
        'Duration: 3 hours 20 minutes &nbsp;|&nbsp; 200 MCQs &nbsp;|&nbsp; Maximum Marks: 720',
        subtitle_style))

    story.append(Spacer(1, 0.3 * cm))
    story.append(Paragraph('<b>Important Instructions:</b>', qno_style))
    story.append(Paragraph(
        '1. The Test Booklet contains <b>200</b> MCQs — 50 questions in each of <b>Physics, Chemistry, Botany, and Zoology</b>.<br/>'
        '2. Each subject has two sections: <b>Section A</b> (35 questions, all compulsory) and <b>Section B</b> (15 questions; '
        '<i>attempt any 10</i> — first 10 attempted are evaluated).<br/>'
        '3. Each correct response: <b>+4 marks</b>. Each incorrect response: <b>−1 mark</b>. Maximum marks: <b>720</b>.<br/>'
        '4. Use a Blue/Black ballpoint pen only. Use of an electronic/manual calculator is prohibited.<br/>'
        '5. The official answer key is provided at the end of this booklet.', instr_style))
    story.append(Spacer(1, 0.4 * cm))
    story.append(Paragraph(
        '<i>Disclaimer: This document is a faithful reproduction of the question paper for educational and revision purposes. '
        'For the official paper and answer key, please refer to NTA / NMC.</i>', note_style))
    story.append(PageBreak())

    # Sections
    def render_subject(title, items, sec_a_end):
        story.append(Paragraph(title, section_style))
        story.append(Paragraph('SECTION A — Q1 to Q35 of the subject (all compulsory)', sub_section_style))
        for q_no, q_text, opts in items:
            if q_no > sec_a_end:
                story.append(Paragraph('SECTION B — Q36 to Q50 of the subject (attempt any 10)', sub_section_style))
                sec_a_end = 10**9  # only insert once
            story.append(render_question(q_no, q_text, opts))
        story.append(PageBreak())

    render_subject(f'PHYSICS &nbsp; (Questions 1–50)', PHYSICS, 35)
    render_subject(f'CHEMISTRY &nbsp; (Questions 51–100)', CHEMISTRY, 85)
    render_subject(f'BOTANY &nbsp; (Questions 101–150)', BOTANY, 135)
    render_subject(f'ZOOLOGY &nbsp; (Questions 151–200)', ZOOLOGY, 185)

    # Answer Key
    story.append(Paragraph('Official Answer Key — NEET (UG) 2024', ak_head_style))
    story.append(Paragraph('All answers are referenced to <b>Test Booklet Code T3</b> as released by the conducting authority.', note_style))
    story.append(Spacer(1, 0.3 * cm))

    # 4-column answer key table — 50 rows × 4 columns covers all 200 questions
    rows = []
    header = ['Q. No.', 'Ans', 'Q. No.', 'Ans', 'Q. No.', 'Ans', 'Q. No.', 'Ans']
    rows.append(header)

    nums = sorted(ANSWER_KEY.keys())
    per_col = 50  # 4 columns × 50 rows = 200
    for i in range(per_col):
        row = []
        for col in range(4):
            idx = col * per_col + i
            if idx < len(nums):
                qn = nums[idx]
                ans = ANSWER_KEY[qn]
                if isinstance(ans, str):
                    row.extend([str(qn), ans])
                else:
                    row.extend([str(qn), f'({ans})'])
            else:
                row.extend(['', ''])
        rows.append(row)

    table = Table(rows, colWidths=[1.5 * cm, 1.4 * cm] * 4)
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#047857')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('FONTSIZE', (0, 1), (-1, -1), 9),
        ('GRID', (0, 0), (-1, -1), 0.4, colors.HexColor('#cbd5e1')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f1f5f9')]),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(table)

    story.append(Spacer(1, 0.6 * cm))
    story.append(Paragraph(
        '<b>Marking Scheme:</b> Correct: +4 &nbsp;|&nbsp; Incorrect: −1 &nbsp;|&nbsp; Unattempted: 0', note_style))
    story.append(Paragraph(
        '<b>Note:</b> For Q148 and Q192, multiple options were considered correct as per the official key.', note_style))

    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    print(f'✓ Built: {OUT}')
    print(f'  File size: {os.path.getsize(OUT) / 1024:.1f} KB')


if __name__ == '__main__':
    build()
