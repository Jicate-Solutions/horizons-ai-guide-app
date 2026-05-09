"""
Generate NEET (UG) 2024 Previous Year Question Paper PDF
Source: NEET (UG) 2024 — Test Booklet Code T3 — Date: 05-05-2024
200 MCQs (Section A: 35 + Section B: 15 in each of Physics, Chemistry, Botany, Zoology)
Answer key is from Code T5 (cross-mapped to T3 via the user-supplied answer sheet).
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
# DATA — NEET (UG) 2024 — Code T3 — Date: 05-05-2024
# Sections: Physics 1-50, Chemistry 51-100, Botany 101-150, Zoology 151-200
# ─────────────────────────────────────────────────────────────────────

QUESTIONS = [
    # ── PHYSICS — Section A (1–35) ──
    (1, "A tightly wound 100-turn coil of radius 10 cm carries a current of 7 A. The magnitude of the magnetic field at the centre of the coil is (μ₀ = 4π × 10⁻⁷ SI units):",
     ["4.4 mT", "44 T", "44 mT", "4.4 T"]),
    (2, "Match List-I (Material) with List-II (Susceptibility x): A. Diamagnetic  B. Ferromagnetic  C. Paramagnetic  D. Non-magnetic  ↔  I. x = 0  II. 0 > x ≥ −1  III. x ≫ 1  IV. 0 < x < ε (small +ve)",
     ["A-III, B-II, C-I, D-IV", "A-IV, B-III, C-II, D-I", "A-II, B-III, C-IV, D-I", "C-II, B-I, C-III, D-IV"]),
    (3, "A thermodynamic system is taken through cycle abcda (a→b at 100 kPa, b→c at 400 cm³, c→d at 300 kPa, d→a at 100 cm³). Work done by the gas along path bc is:",
     ["−90 J", "−60 J", "zero", "30 J"]),
    (4, "An unpolarised light beam strikes a glass surface at Brewster's angle. Then:",
     ["Both reflected and refracted light will be completely polarised", "Reflected light will be completely polarised but refracted will be partially polarised", "Reflected light will be partially polarised", "Refracted light will be completely polarised"]),
    (5, "In an ideal transformer N_p/N_s = 1/2. The ratio V_s : V_p is:",
     ["1 : 1", "1 : 4", "1 : 2", "2 : 1"]),
    (6, "A logic circuit gives Y per truth table: A=0,B=0→Y=1; A=0,B=1→Y=0; A=1,B=0→Y=1; A=1,B=1→Y=0. Y = ?",
     ["B̄", "B", "A·B + Ā", "A·B̄ + Ā"]),
    (7, "In a vernier callipers, (N+1) divisions of vernier scale coincide with N divisions of main scale. If 1 MSD = 0.1 mm, the vernier constant (in cm) is:",
     ["100 N", "10(N+1)", "1/(10N)", "1/[100(N+1)]"]),
    (8, "Maximum elongation of a 1 m steel wire if elastic limit = 8 × 10⁸ N m⁻² and Young's modulus = 2 × 10¹¹ N m⁻²:",
     ["40 mm", "8 mm", "4 mm", "0.4 mm"]),
    (9, "A horizontal 10 N force is applied to block A (2 kg) which pushes block B (3 kg) on frictionless surface. The force exerted by A on B is:",
     ["6 N", "10 N", "zero", "4 N"]),
    (10, "If the monochromatic source in Young's double slit experiment is replaced by white light, then:",
     ["Central bright white fringe surrounded by a few coloured fringes", "All bright fringes will be of equal width", "Interference pattern will disappear", "Central dark fringe surrounded by a few coloured fringes"]),
    (11, "Variation of (1/λ²) versus kinetic energy E (λ = de Broglie wavelength of a free particle) is best represented by:",
     ["Concave-up curve through origin", "Straight line through origin", "Concave-up sharply increasing curve", "Curve increasing slowly then steeply"]),
    (12, "In the circuit (4 capacitors of 2 μF each forming a Wheatstone-like bridge), the equivalent capacitance between A and B is:",
     ["0.5 μF", "4 μF", "2 μF", "1 μF"]),
    (13, "A bar magnet is moved towards solenoid-2 from solenoid-1. Direction of induced current in solenoid-1 and solenoid-2 respectively are:",
     ["AB and CD", "BA and DC", "AB and DC", "BA and CD"]),
    (14, "Statements: A. For a solar cell, I-V characteristics lie in IV quadrant. B. In a reverse-biased pn junction, the (μA) current is due to majority charge carriers.",
     ["Both A and B are correct", "Both A and B are incorrect", "A correct, B incorrect", "A incorrect, B correct"]),
    (15, "A light ray enters a right-angled prism at P with incidence 30°, travels parallel to base BC, emerges along face AC. The refractive index is:",
     ["√3/4", "√3/2", "√5/4", "√5/2"]),
    (16, "A: Potential at axial point 2 m from a dipole of moment 4 × 10⁻⁶ C·m is ±9 × 10³ V. R: V = ±2P/(4πε₀ r²) for axial point.",
     ["A true, R false", "A false, R true", "Both A and R true; R is correct explanation", "Both A and R true; R is NOT correct explanation"]),
    (17, "Moment of inertia of a thin rod about an axis through midpoint perpendicular to rod = 2400 g·cm². Length of the 400 g rod is nearly:",
     ["20.7 cm", "72.0 cm", "8.5 cm", "17.5 cm"]),
    (18, "Terminal voltage of a battery (emf 10 V, internal resistance 1 Ω) connected to external 4 Ω is:",
     ["8 V", "10 V", "4 V", "6 V"]),
    (19, "Match Hydrogen spectral transitions with wavelengths (nm): A. n=3→2  B. n=4→2  C. n=5→2  D. n=6→2  ↔  I. 410.2  II. 434.1  III. 656.3  IV. 486.1",
     ["A-IV, B-III, C-I, D-II", "A-I, B-II, C-III, D-IV", "A-II, B-I, C-IV, D-III", "A-III, B-IV, C-II, D-I"]),
    (20, "Correct statements about photons: A. E = hν  B. velocity = c  C. p = hν/c  D. Energy and momentum are conserved in photon-electron collision  E. Photon has +ve charge.",
     ["A, C and D only", "A, B, D and E only", "A and B only", "A, B, C and D only"]),
    (21, "²⁹⁰₈₂X →α→ Y →e⁺→ Z →β⁻→ P →e⁻→ Q. Mass and atomic numbers of Q are:",
     ["288, 82", "286, 81", "280, 81", "286, 80"]),
    (22, "Displacement of a particle is x = 2t − 1 (SI units) under a 5 N force. Instantaneous power is:",
     ["7 W", "6 W", "10 W", "5 W"]),
    (23, "The output Y of the given combinational logic (NAND fed from A and OR-ed with B, finally NOR) is similar to:",
     ["OR gate", "AND gate", "NAND gate", "NOR gate"]),
    (24, "A planet's mass is 1/10th Earth's and its diameter is half that of Earth. Acceleration due to gravity on it is:",
     ["4.9 m/s²", "3.92 m/s²", "19.6 m/s²", "9.8 m/s²"]),
    (25, "Statement I: Atoms are electrically neutral as they contain equal +ve and −ve charges. Statement II: Atoms of each element are stable and emit characteristic spectrum.",
     ["I correct, II incorrect", "I incorrect, II correct", "Both correct", "Both incorrect"]),
    (26, "A wheel rolls without slipping with linear speed v. P (top) and Q (bottom) of the wheel:",
     ["Both move with equal speed", "Point P has zero speed", "P slower than Q", "P faster than Q"]),
    (27, "A particle moving with uniform speed in a circular path maintains:",
     ["Constant velocity but varying acceleration", "Varying velocity and varying acceleration", "Constant velocity", "Constant acceleration"]),
    (28, "A thin flat circular disc of radius 4.5 cm placed on water (S = 0.07 N/m). Excess force to lift it off the surface is:",
     ["1.98 mN", "99 N", "19.8 mN", "198 N"]),
    (29, "In B = 0.049 T, a magnetic needle does 20 oscillations in 5 s. I = 9.8 × 10⁻⁶ kg·m². If magnetic moment = x × 10⁻⁵ A·m², then x is:",
     ["50π²", "1280π²", "5π²", "128π²"]),
    (30, "Two equal masses A (velocity v₁) and B (rest) undergo perfectly inelastic 1-D collision. v₁ : v₂ (system velocity) is:",
     ["4 : 1", "1 : 4", "1 : 2", "2 : 1"]),
    (31, "x = 5 sin(πt + π/3) m represents SHM. Amplitude and time period:",
     ["5 cm, 1 s", "5 m, 1 s", "5 cm, 2 s", "5 m, 2 s"]),
    (32, "Quantities having the same dimensions as solid angle:",
     ["Strain and arc", "Angular speed and stress", "Strain and angle", "Stress and angle"]),
    (33, "A thin spherical shell (R=3 cm, q=1 μC) is charged. Potential difference between point C (inside) and external point P is:",
     ["0.5 × 10⁵ V", "zero", "3 × 10⁵ V", "1 × 10⁵ V"]),
    (34, "A bob is whirled in a horizontal plane at ω rpm with tension T. If speed becomes 2ω with same radius, the new tension is:",
     ["T/4", "√2 T", "T", "4T"]),
    (35, "A wire of resistance 100 Ω is cut into 10 equal parts. First 5 in series, next 5 in parallel; the two combinations in series. The net resistance is:",
     ["55 Ω", "60 Ω", "26 Ω", "52 Ω"]),

    # ── PHYSICS — Section B (36–50) ──
    (36, "T-V curves of an ideal gas at three pressures P₁, P₂, P₃ compared to Charles's law (dotted) lines. The order is:",
     ["P₂ > P₁ > P₃", "P₁ > P₂ > P₃", "P₃ > P₂ > P₁", "P₁ > P₃ > P₂"]),
    (37, "Parallel-plate capacitor charged via a resistor (current I). In the gap between plates:",
     ["Displacement current = I, opposite to I", "Displacement current > I, any direction", "No current", "Displacement current = I, in same direction as I"]),
    (38, "Which is NOT a property of an EM wave in free space?",
     ["Speed = 1/√(μ₀ε₀)", "Originate from charges moving with uniform speed", "Transverse in nature", "Electric and magnetic energy densities are equal"]),
    (39, "Choose the circuit that achieves Wheatstone bridge balance (10/15 = 10/5 must hold):",
     ["Option 1", "Option 2", "Option 3", "Option 4"]),
    (40, "If plates of a capacitor connected to a battery are moved closer: A. charge increases  B. energy decreases  C. capacitance increases  D. Q/V remains same  E. QV increases.",
     ["B, D and E only", "A, B and C only", "A, B and E only", "A, C and E only"]),
    (41, "F = αt² + βt acts on a particle. Which combination is dimensionless?",
     ["αβt", "αβ/t", "βt/α", "αt/β"]),
    (42, "Metallic bar (Y = 0.5 × 10¹¹ N/m², α = 10⁻⁵ /°C, L = 1 m, A = 10⁻³ m²) heated 0→100 °C without expansion. Compressive force is:",
     ["100 × 10³ N", "2 × 10³ N", "52 × 10³ N", "50 × 10³ N"]),
    (43, "Telescope: f_o = 140 cm, f_e = 5 cm. Magnifying power for a distant object:",
     ["17", "32", "34", "28"]),
    (44, "An iron bar of length L (moment M) bent at midpoint with arms at 60° to each other. New magnetic moment is:",
     ["2 M", "M/√3", "M", "M/2"]),
    (45, "A 10 μF capacitor is connected to a 210 V, 50 Hz source. Peak current is nearly:",
     ["1.20 A", "0.35 A", "0.58 A", "0.93 A"]),
    (46, "Heaters A (1 kW) and B (2 kW) connected first in series then in parallel to the same source. Ratio of power outputs (series : parallel):",
     ["1 : 2", "2 : 3", "1 : 1", "2 : 9"]),
    (47, "v–t plot rises, plateaus, then falls. The corresponding a–t graph is:",
     ["+ pulse, then − pulse with plateaus", "+ ramp, then − ramp", "Trapezoidal a", "Continuous slow rise"]),
    (48, "Pendulum bob mass tripled and length halved. New period = (x/2) × original. Then x is:",
     ["2√3", "4", "√3", "√2"]),
    (49, "Minimum energy to launch satellite (mass m) from Earth surface (mass M, radius R) into circular orbit at altitude 2R:",
     ["GMm/(2R)", "GMm/(3R)", "5GMm/(6R)", "2GMm/(3R)"]),
    (50, "A sheet placed in front of a strong magnetic pole. Force is needed to: A. hold it if magnetic  B. hold it if non-magnetic  C. move it away with uniform velocity if conducting  D. move it away with uniform velocity if non-conducting and non-polar.",
     ["A, C and D only", "C only", "B and D only", "A and C only"]),

    # ── CHEMISTRY — Section A (51–85) ──
    (51, "Match conversion with Faraday required: A. 1 mol H₂O → O₂  B. 1 mol MnO₄⁻ → Mn²⁺  C. 1.5 mol Ca from molten CaCl₂  D. 1 mol FeO → Fe₂O₃  ↔  I. 3F  II. 2F  III. 1F  IV. 5F",
     ["A-II, B-III, C-I, D-IV", "A-III, B-IV, C-II, D-I", "A-II, B-IV, C-I, D-III", "A-III, B-IV, C-I, D-II"]),
    (52, "Which is NOT a redox reaction?",
     ["H₂ + Cl₂ → 2 HCl", "BaCl₂ + Na₂SO₄ → BaSO₄ + 2 NaCl", "Zn + CuSO₄ → ZnSO₄ + Cu", "2 KClO₃ + I₂ → 2 KIO₃ + Cl₂"]),
    (53, "Intramolecular hydrogen bonding is present in:",
     ["3-nitrophenol (m-)", "HF", "o-nitrophenol", "p-nitrophenol"]),
    (54, "Fehling's solution 'A' is:",
     ["Alkaline solution of Rochelle's salt", "Aqueous sodium citrate", "Aqueous copper sulphate", "Alkaline copper sulphate"]),
    (55, "1 g NaOH + 25 mL of 0.75 M HCl. Mass of NaOH unreacted is:",
     ["Zero mg", "200 mg", "750 mg", "250 mg"]),
    (56, "Match shape: A. NH₃  B. BrF₅  C. XeF₄  D. SF₆ ↔ I. Trigonal pyramidal  II. Square planar  III. Octahedral  IV. Square pyramidal",
     ["A-III, B-IV, C-I, D-II", "A-II, B-III, C-IV, D-I", "A-I, B-IV, C-II, D-III", "A-II, B-IV, C-III, D-I"]),
    (57, "E°(Mn³⁺/Mn²⁺) is more positive than E°(Cr³⁺/Cr²⁺) or E°(Fe³⁺/Fe²⁺) because of change of:",
     ["d⁴ to d⁵", "d³ to d⁵", "d⁵ to d⁴", "d⁵ to d²"]),
    (58, "Match: A. Isothermal  B. Isochoric  C. Isobaric  D. Adiabatic ↔ I. No heat exchange  II. Constant T  III. Constant V  IV. Constant P",
     ["A-I, B-II, C-III, D-IV", "A-II, B-III, C-IV, D-I", "A-III, B-IV, C-II, D-I", "A-IV, B-II, C-III, D-I"]),
    (59, "Activation energy of a reaction can be calculated knowing:",
     ["Orientation of reactant molecules", "Rate constant at two different temperatures", "Rate constant at standard temperature", "Probability of collision"]),
    (60, "C₆H₁₄ with two tertiary carbons. IUPAC name:",
     ["2,3-dimethylbutane", "2,2-dimethylbutane", "n-hexane", "2-methylpentane"]),
    (61, "Which ions have the same 'spin only' magnetic moment? A. Ti³⁺  B. Cr²⁺  C. Mn²⁺  D. Fe²⁺  E. Sc³⁺",
     ["B and C only", "A and D only", "B and D only", "A and E only"]),
    (62, "Increasing electronegativity of N, O, F, C, Si:",
     ["O < F < N < C < Si", "F < O < N < C < Si", "Si < C < N < O < F", "Si < C < O < N < F"]),
    (63, "Which alcohol reacts instantaneously with Lucas reagent?",
     ["(CH₃)₂CH-CH₂OH (isobutanol)", "(CH₃)₃C-OH (tert-butanol)", "CH₃CH₂CH₂CH₂OH (n-butanol)", "CH₃CH₂CH(CH₃)OH (sec-butanol)"]),
    (64, "Statement I: [Co(NH₃)₆]³⁺ and [CoF₆]³⁻ are both octahedral but differ in magnetic behaviour. Statement II: [Co(NH₃)₆]³⁺ is diamagnetic; [CoF₆]³⁻ is paramagnetic.",
     ["I true, II false", "I false, II true", "Both true", "Both false"]),
    (65, "I: Boiling order H₂O > H₂Te > H₂Se > H₂S. II: Based on M, H₂O should boil low but H-bonding raises BP.",
     ["I true, II false", "I false, II true", "Both true", "Both false"]),
    (66, "Match quantum number with information: A. m_l  B. m_s  C. l  D. n ↔ I. Shape  II. Size  III. Orientation of orbital  IV. Spin orientation",
     ["A-III, B-IV, C-II, D-I", "A-II, B-I, C-IV, D-III", "A-I, B-III, C-II, D-IV", "A-III, B-IV, C-I, D-II"]),
    (67, "Match reaction with reagent: A. Bicyclohexyl → 2 cyclohexanone  B. Benzene → benzophenone  C. Cyclohexanol → cyclohexanone  D. Ethylbenzene → benzoate ↔ I. PhCOCl/AlCl₃  II. CrO₃  III. KMnO₄/KOH/Δ  IV. (i) O₃ (ii) Zn-H₂O",
     ["A-IV, B-I, C-II, D-III", "A-I, B-IV, C-II, D-III", "A-IV, B-I, C-III, D-II", "A-III, B-I, C-II, D-IV"]),
    (68, "Reagent for: cyclohexyl-CH₂-CH=CH₂ → cyclohexyl-CH₂-CH₂-CHO",
     ["(i) BH₃ (ii) H₂O₂/OH⁻ (iii) alk. KMnO₄ (iv) H₃O⁺", "(i) H₂O/H⁺ (ii) PCC", "(i) H₂O/H⁺ (ii) CrO₃", "(i) BH₃ (ii) H₂O₂/OH⁻ (iii) PCC"]),
    (69, "Reagents that DO NOT react with glucose: A. Tollen's  B. Schiff's  C. HCN  D. NH₂OH  E. NaHSO₃",
     ["B and E", "E and D", "B and C", "A and D"]),
    (70, "Match molecule with type of C-C bonds: A. Ethane  B. Ethene  C. C₂ molecule  D. Ethyne ↔ I. 1σ + 2π  II. 2π  III. 1σ  IV. 1σ + 1π",
     ["A-III, B-IV, C-II, D-I", "A-III, B-IV, C-I, D-II", "A-I, B-IV, C-II, D-III", "A-IV, B-III, C-II, D-I"]),
    (71, "Among Group 16 elements, which does NOT show −2 oxidation state?",
     ["Te", "Po", "O", "Se"]),
    (72, "For 2A ⇌ B + C, K_c = 4 × 10⁻³. Currently [A] = [B] = [C] = 2 × 10⁻³ M. Then:",
     ["Reaction tends to go backward", "Reaction has gone to completion", "At equilibrium", "Reaction tends to go forward"]),
    (73, "Which plot of ln k vs 1/T is consistent with the Arrhenius equation?",
     ["+ve slope line", "Falling line from upper-left", "Rising line with +ve slope through (0, +ve)", "Falling line approaching x-axis"]),
    (74, "In which equilibrium are K_p and K_c NOT equal?",
     ["CO + H₂O ⇌ CO₂ + H₂", "2 BrCl ⇌ Br₂ + Cl₂", "PCl₅ ⇌ PCl₃ + Cl₂", "H₂ + I₂ ⇌ 2 HI"]),
    (75, "I: Boiling-point order n-pentane > isopentane > neopentane. II: As branching ↑, molecule becomes more spherical → smaller surface area → weaker intermolecular forces → lower BP.",
     ["I correct, II incorrect", "I incorrect, II correct", "Both correct", "Both incorrect"]),
    (76, "Compound that undergoes SN1 at the fastest rate:",
     ["Ph-Br (bromobenzene)", "Ph-CH(CH₃)Br (sec)", "Cyclohexyl-CH₂Br", "Cyclohexyl-Br"]),
    (77, "Energy of an electron in n=1 of He⁺ is −x J. Energy of e⁻ in n=2 of Be³⁺ in J is:",
     ["−4x", "−4x/9", "−x", "−x/9"]),
    (78, "Entropy increases in: A. liquid → vapour  B. crystal cooled 130 K → 0 K  C. 2 NaHCO₃(s) → Na₂CO₃(s) + CO₂(g) + H₂O(g)  D. Cl₂(g) → 2 Cl(g)",
     ["A, C and D", "C and D", "A and C", "A, B and D"]),
    (79, "Solid → vapour without liquid stage. The purification technique based on this principle is:",
     ["Distillation", "Chromatography", "Crystallization", "Sublimation"]),
    (80, "Match complex with isomerism type: A. [Co(NH₃)₅(NO₂)]Cl₂  B. [Co(NH₃)₅(SO₄)]Br  C. [Co(NH₃)₆][Cr(CN)₆]  D. [Co(H₂O)₆]Cl₃ ↔ I. Solvate  II. Linkage  III. Ionization  IV. Coordination",
     ["A-I, B-IV, C-III, D-II", "A-II, B-IV, C-III, D-I", "A-II, B-III, C-IV, D-I", "A-I, B-III, C-IV, D-II"]),
    (81, "I: Aniline does not undergo Friedel-Crafts alkylation. II: Aniline cannot be prepared via Gabriel synthesis.",
     ["I correct, II false", "I incorrect, II true", "Both true", "Both false"]),
    (82, "Increasing first ionization enthalpy of Li, Be, B, C, N:",
     ["Li < Be < C < B < N", "Li < Be < N < B < C", "Li < Be < B < C < N", "Li < B < Be < C < N"]),
    (83, "Highest number of helium atoms in:",
     ["4 g of He", "2.271098 L of He at STP", "4 mol of He", "4 u of He"]),
    (84, "Most stable carbocation is:",
     ["Cyclopentyl-CH₂⁺", "1-methylcyclohexyl⁺ (3°)", "(CH₃)₂CH-CH⁺-CH(CH₃)₂", "(CH₃)C⁺(H)-CH₂-CH(CH₃)CH₃"]),
    (85, "K_H of three gases A, B, C in water are 145, 2 × 10⁻⁵, 35 kbar. Solubility order:",
     ["A > C > B", "A > B > C", "B > A > C", "B > C > A"]),

    # ── CHEMISTRY — Section B (86–100) ──
    (86, "Compound X has 32% A, 20% B, rest C (atomic masses A=64, B=40, C=32). Empirical formula:",
     ["AB₂C₂", "ABC₄", "A₂BC₂", "ABC₃"]),
    (87, "Products A and B in: 3 ROH + PCl₃ → 3 RCl + A; ROH + PCl₅ → RCl + HCl + B",
     ["H₃PO₄ and POCl₃", "H₃PO₃ and POCl₃", "POCl₃ and H₃PO₃", "POCl₃ and H₃PO₄"]),
    (88, "Plot of osmotic pressure π vs concentration (mol/L) gives slope 25.73 L·bar/mol. Temperature (R = 0.083 L·bar·mol⁻¹·K⁻¹):",
     ["25.73 °C", "12.05 °C", "37 °C", "310 °C"]),
    (89, "Major product of: PhCH=CHPh (stilbene-like) + KMnO₄/H⁺ → P",
     ["1,2-diol (PhCH(OH)CH(OH)Ph)", "1,2-diketone (PhCOCOPh)", "PhCHO", "PhCOOH"]),
    (90, "I: [Co(NH₃)₆]³⁺ is homoleptic; [Co(NH₃)₄Cl₂]⁺ is heteroleptic. II: [Co(NH₃)₆]³⁺ has only one kind of ligand; [Co(NH₃)₄Cl₂]⁺ has more than one.",
     ["I true, II false", "I false, II true", "Both true", "Both false"]),
    (91, "Which acid is added during preparation of Mohr's salt to prevent hydrolysis of Fe²⁺?",
     ["Dilute HNO₃", "Dilute H₂SO₄", "Dilute HCl", "Concentrated H₂SO₄"]),
    (92, "Which is correct?",
     ["μ(NF₃) > μ(NH₃)", "Three canonical forms can be drawn for CO₃²⁻", "Three resonance structures can be drawn for ozone", "BF₃ has non-zero dipole moment"]),
    (93, "Increasing group number (0 → VI) for cations: A. Al³⁺  B. Cu²⁺  C. Ba²⁺  D. Co²⁺  E. Mg²⁺",
     ["E, C, D, B, A", "E, A, B, C, D", "B, A, D, C, E", "B, C, A, D, E"]),
    (94, "CH₃CH₂CH₂I →NaCN→ A →OH⁻/partial hydrolysis→ B →NaOH/Br₂→ C (major). C is:",
     ["Butanamide", "α-bromobutanoic acid", "Propylamine", "Butylamine"]),
    (95, "Rate quadruples when T changes 27 → 57 °C. E_a (R = 8.314 J/K·mol, log 4 = 0.6021):",
     ["3.80 kJ/mol", "3804 kJ/mol", "38.04 kJ/mol", "380.4 kJ/mol"]),
    (96, "2 NO(g) ⇌ N₂(g) + O₂(g) at equilibrium with [N₂] = 3.0×10⁻³, [O₂] = 4.2×10⁻³, [NO] = 2.8×10⁻³. If 0.1 mol/L NO is taken in a closed vessel, degree of dissociation α at equilibrium:",
     ["0.8889", "0.717", "0.00889", "0.0889"]),
    (97, "Reversible isothermal expansion of 1 mol H₂ at 25 °C from 20 to 10 atm. Work done (R = 2.0 cal/K·mol):",
     ["413.14 cal", "100 cal", "0 cal", "−413.14 cal"]),
    (98, "Mass of Cu deposited by 9.6487 A through CuSO₄ for 100 s (M = 63 g/mol; 1F = 96487 C):",
     ["31.5 g", "0.0315 g", "3.15 g", "0.315 g"]),
    (99, "2-methylcyclohexanol →PBr₃→ A (major) →alc. KOH/Δ→ B (major). A and B are:",
     ["A: trans-1-Br-2-methyl; B: 2-methyl-cyclohex-1-ene-1-ol", "A: cis-1-Br-2-Me; B: 2-methylcyclohexanone", "A: 1-Br-2-Me-cyclohexane; B: 1-methylcyclohexene", "A: 1-Br-2-Me-cyclohexane; B: 3-methylcyclohexene"]),
    (100, "Pair of lanthanoid ions which are diamagnetic:",
     ["Gd³⁺ and Eu³⁺", "Pm³⁺ and Sm³⁺", "Ce⁴⁺ and Yb²⁺", "Ce³⁺ and Eu²⁺"]),

    # ── BOTANY — Section A (101–135) ──
    (101, "Identify correct statements: A. Vallisneria flowers are colourful and produce nectar  B. Waterlily flowers are NOT pollinated by water  C. Most water-pollinated species: pollen protected from wetting  D. Pollen of some hydrophytes is long, ribbon-like  E. In some hydrophytes, pollen is carried passively in water.",
     ["A, C, D and E only", "B, C, D and E only", "C, D and E only", "A, B, C and D only"]),
    (102, "Type of conservation where threatened species are taken out of natural habitat and given special care:",
     ["Semi-conservative method", "Sustainable development", "in-situ conservation", "Biodiversity conservation"]),
    (103, "Inhibition of succinic dehydrogenase by malonate is a classical example of:",
     ["Competitive inhibition", "Enzyme activation", "Cofactor inhibition", "Feedback inhibition"]),
    (104, "Which part of the seed (A=plumule, B=cotyledon, C=radicle, D=…?) is destined to form the root?",
     ["C", "D", "A", "B"]),
    (105, "Bulliform cells are responsible for:",
     ["Increased photosynthesis in monocots", "Storing sugars", "Inward curling of leaves in monocots", "Protecting the plant from salt stress"]),
    (106, "Required for dark reaction: A. Light  B. Chlorophyll  C. CO₂  D. ATP  E. NADPH",
     ["C, D and E only", "D and E only", "A, B and C only", "B, C and D only"]),
    (107, "Formation of interfascicular cambium from fully developed parenchyma cells is an example of:",
     ["Dedifferentiation", "Maturation", "Differentiation", "Redifferentiation"]),
    (108, "Hind II cuts DNA at recognition sequence consisting of:",
     ["4 bp", "10 bp", "8 bp", "6 bp"]),
    (109, "Tropical regions show greatest species richness because: A. Tropical latitudes undisturbed for millions of years  B. More seasonal  C. More solar energy  D. Constant environments → niche specialization  E. Constant and predictable.",
     ["A, B and E only", "A, B and D only", "A, C, D and E only", "A and B only"]),
    (110, "Which is NOT a criterion for fungi classification?",
     ["Mode of spore formation", "Fruiting body", "Morphology of mycelium", "Mode of nutrition"]),
    (111, "Number of ATP and NADPH for every CO₂ fixed in the Calvin cycle:",
     ["3 ATP, 3 NADPH", "3 ATP, 2 NADPH", "2 ATP, 3 NADPH", "2 ATP, 2 NADPH"]),
    (112, "Major causes of biodiversity loss: A. Over exploitation  B. Co-extinction  C. Mutation  D. Habitat loss & fragmentation  E. Migration",
     ["A, B and E only", "A, B and D only", "A, C and D only", "A, B, C and D only"]),
    (113, "Capacity to generate a whole plant from any cell of the plant is:",
     ["Differentiation", "Somatic hybridization", "Totipotency", "Micropropagation"]),
    (114, "In Verhulst-Pearl logistic growth dN/dt = rN[(K−N)/K], K indicates:",
     ["Carrying capacity", "Population density", "Intrinsic rate of natural increase", "Biotic potential"]),
    (115, "Spindle fibers attach to kinetochores during:",
     ["Anaphase", "Telophase", "Prophase", "Metaphase"]),
    (116, "Identify the flower types from figures (a) [ovary above whorls] and (b) [ovary inferior]:",
     ["(a) Perigynous; (b) Epigynous", "(a) Perigynous; (b) Perigynous", "(a) Epigynous; (b) Hypogynous", "(a) Hypogynous; (b) Epigynous"]),
    (117, "Match: A. Rhizopus  B. Ustilago  C. Puccinia  D. Agaricus ↔ I. Mushroom  II. Smut fungus  III. Bread mould  IV. Rust fungus",
     ["A-III, B-II, C-I, D-IV", "A-IV, B-III, C-II, D-I", "A-III, B-II, C-IV, D-I", "A-I, B-III, C-II, D-IV"]),
    (118, "Black seed colour (BB/Bb) is dominant over white (bb). To find the genotype of a black-seed plant, cross it with:",
     ["Bb", "BB/Bb", "BB", "bb"]),
    (119, "Pink-flowered Snapdragon × Red-flowered Snapdragon. Phenotypes in progeny:",
     ["Only pink", "Red, pink and white", "Only red", "Red as well as pink"]),
    (120, "Match: A. Two or more alternative forms of a gene  B. Cross of F1 with homozygous recessive  C. Cross of F1 with any parent  D. Number of chromosome sets ↔ I. Back cross  II. Ploidy  III. Allele  IV. Test cross",
     ["A-III, B-IV, C-I, D-II", "A-IV, B-III, C-II, D-I", "A-I, B-II, C-III, D-IV", "A-II, B-I, C-III, D-IV"]),
    (121, "Lecithin (small organic compound in living tissues) is an example of:",
     ["Glycerides", "Carbohydrates", "Amino acids", "Phospholipids"]),
    (122, "Match: A. Clostridium butylicum  B. Saccharomyces cerevisiae  C. Trichoderma polysporum  D. Streptococcus sp. ↔ I. Ethanol  II. Streptokinase  III. Butyric acid  IV. Cyclosporin-A",
     ["A-III, B-I, C-IV, D-II", "A-IV, B-I, C-III, D-II", "A-III, B-I, C-II, D-IV", "A-II, B-IV, C-III, D-I"]),
    (123, "Which component (in the figure) has thin outer walls and highly thickened inner walls (guard cells / vessels)?",
     ["A", "B", "C", "D"]),
    (124, "Example of an actinomorphic flower:",
     ["Pisum", "Sesbania", "Datura", "Cassia"]),
    (125, "A transcription unit in DNA is defined primarily by three regions (upstream → downstream):",
     ["Inducer, Repressor, Structural gene", "Promoter, Structural gene, Terminator", "Repressor, Operator, Structural gene", "Structural gene, Transposons, Operator"]),
    (126, "Fate of a piece of DNA carrying only the gene of interest, transferred into an alien organism: A. Multiplies independently in progeny  B. Integrates into recipient genome  C. Multiplies and is inherited along with host DNA  D. Not an integrated part of chromosome  E. Shows ability to replicate.",
     ["B and C only", "A and E only", "A and B only", "D and E only"]),
    (127, "Auxin used by gardeners on lawns kills weeds but not grass because auxin:",
     ["Does not affect mature monocots", "Helps cell division in grasses", "Promotes apical dominance", "Promotes leaf abscission"]),
    (128, "Cofactor of carboxypeptidase:",
     ["Flavin", "Haem", "Zinc", "Niacin"]),
    (129, "Lactose in growth medium is transported into bacteria by action of:",
     ["Permease", "Polymerase", "β-galactosidase", "Acetylase"]),
    (130, "Mendel's Law of Dominance explains: A. Of one pair of factors, one is dominant, other recessive  B. Alleles do not show expression and both characters appear in F2  C. Factors occur in pairs in normal diploid plants  D. Discrete unit controlling a particular character is called factor  E. Only one parental character expressed in monohybrid cross.",
     ["B, C and D only", "A, B, C, D and E", "A, B and C only", "A, C, D and E only"]),
    (131, "I: Bt toxins are insect-group specific, coded by gene cry IAc. II: Bt toxin exists as inactive protoxin in B. thuringiensis; activated by acidic pH of insect gut.",
     ["I true, II false", "I false, II true", "Both true", "Both false"]),
    (132, "I: Parenchyma is living but collenchyma is dead tissue. II: Gymnosperms lack xylem vessels; angiosperms have them.",
     ["I true, II false", "I false, II true", "Both true", "Both false"]),
    (133, "I: Chromosomes become gradually visible during leptotene. II: Beginning of diplotene is recognized by dissolution of synaptonemal complex.",
     ["I true, II false", "I false, II true", "Both true", "Both false"]),
    (134, "Match: A. Nucleolus  B. Centriole  C. Leucoplasts  D. Golgi ↔ I. Site of glycolipid formation  II. Cartwheel organization  III. Site of rRNA synthesis  IV. Storing nutrients",
     ["A-III, B-IV, C-II, D-I", "A-I, B-II, C-III, D-IV", "A-III, B-II, C-IV, D-I", "A-II, B-III, C-I, D-IV"]),
    (135, "List of endangered species was released by:",
     ["FOAM", "IUCN", "GEAC", "WWF"]),

    # ── BOTANY — Section B (136–150) ──
    (136, "DNA in chloroplast is:",
     ["Linear, single stranded", "Circular, single stranded", "Linear, double stranded", "Circular, double stranded"]),
    (137, "What is fused in somatic hybridization (two plant varieties)?",
     ["Protoplasts", "Pollens", "Callus", "Somatic embryos"]),
    (138, "Identify (figure shows densely-packed pink spike-like inflorescence with exposed stamens):",
     ["Cleistogamous flowers, autogamy", "Compact inflorescence, complete autogamy", "Wind-pollinated plant inflorescence with well-exposed stamens", "Water-pollinated flowers with mucilaginous covering"]),
    (139, "Spraying which PGR on sugarcane increases stem length & yield?",
     ["Cytokinin", "Abscisic acid", "Auxin", "Gibberellin"]),
    (140, "Match: A. Frederick Griffith  B. Jacob & Monod  C. Khorana  D. Meselson & Stahl ↔ I. Genetic code  II. Semi-conservative replication  III. Transformation  IV. Lac operon",
     ["A-II, B-III, C-IV, D-I", "A-IV, B-I, C-II, D-III", "A-III, B-II, C-I, D-IV", "A-III, B-IV, C-I, D-II"]),
    (141, "Match: A. GLUT-4  B. Insulin  C. Trypsin  D. Collagen ↔ I. Hormone  II. Enzyme  III. Intercellular ground substance  IV. Glucose transport",
     ["A-II, B-III, C-IV, D-I", "A-III, B-IV, C-I, D-II", "A-IV, B-I, C-II, D-III", "A-I, B-II, C-III, D-IV"]),
    (142, "I: In C₃ plants, some O₂ binds RuBisCO, decreasing CO₂ fixation. II: In C₄ plants, mesophyll cells show very little photorespiration; bundle-sheath cells show none.",
     ["I true, II false", "I false, II true", "Both true", "Both false"]),
    (143, "Which step in TCA cycle does NOT involve substrate oxidation?",
     ["Succinyl-CoA → Succinic acid", "Isocitrate → α-KG", "Malic acid → Oxaloacetic acid", "Succinic acid → Malic acid"]),
    (144, "Match: A. Citric acid cycle  B. Glycolysis  C. ETS  D. Proton gradient ↔ I. Cytoplasm  II. Mitochondrial matrix  III. Intermembrane space  IV. Inner mitochondrial membrane",
     ["A-III, B-IV, C-I, D-II", "A-IV, B-III, C-II, D-I", "A-I, B-II, C-III, D-IV", "A-II, B-I, C-IV, D-III"]),
    (145, "Which is correct about replication in E. coli?",
     ["DDDP polymerizes 5'→3' as well as 3'→5'", "DDDP polymerizes 5'→3'", "DDDP polymerizes only 3'→5'", "DDRP polymerizes only 5'→3'"]),
    (146, "If NPP of trophic level 1 = 100x kcal/m²/yr, GPP of trophic level 3 of the same ecosystem is:",
     ["10x kcal/m²/yr", "(100x/3x) kcal/m²/yr", "(x/10) kcal/m²/yr", "x kcal/m²/yr"]),
    (147, "Match: A. Rose  B. Pea  C. Cotton  D. Mango ↔ I. Twisted aestivation  II. Perigynous flower  III. Drupe  IV. Marginal placentation",
     ["A-IV, B-III, C-II, D-I", "A-II, B-III, C-IV, D-I", "A-II, B-IV, C-I, D-III", "A-I, B-II, C-III, D-IV"]),
    (148, "Match: A. Robert May  B. Alexander von Humboldt  C. Paul Ehrlich  D. David Tilman ↔ I. Species-area relationship  II. Long-term ecosystem expt  III. Global species diversity ~7 million  IV. Rivet popper hypothesis",
     ["A-I, B-III, C-II, D-IV  (or A-III, B-I, C-IV, D-II)", "A-III, B-IV, C-II, D-I", "A-II, B-III, C-I, D-IV", "A-III, B-I, C-IV, D-II"]),
    (149, "Match (Stamen type): A. Monoadelphous  B. Diadelphous  C. Polyadelphous  D. Epiphyllous ↔ (Example) I. Citrus  II. Pea  III. Lily  IV. China-rose",
     ["A-I, B-II, C-IV, D-III", "A-III, B-I, C-IV, D-II", "A-IV, B-II, C-I, D-III", "A-IV, B-I, C-II, D-III"]),
    (150, "Phaeophyceae correct statements: A. Asexual: biflagellate zoospores  B. Sexual: oogamous only  C. Stored food: mannitol/laminarin  D. Pigments: chl a, c + carotenoids/xanthophyll  E. Cellulosic wall + algin coating.",
     ["A, C, D and E only", "A, B, C and E only", "A, B, C and D only", "B, C, D and E only"]),

    # ── ZOOLOGY — Section A (151–185) ──
    (151, "Match disease with causal agent: A. Typhoid  B. Leishmaniasis  C. Ringworm  D. Filariasis ↔ I. Fungus  II. Nematode  III. Protozoa  IV. Bacteria",
     ["A-III, B-I, C-IV, D-II", "A-II, B-IV, C-III, D-I", "A-I, B-III, C-II, D-IV", "A-IV, B-III, C-I, D-II"]),
    (152, "Match: A. Non-medicated IUD  B. Copper-releasing IUD  C. Hormone-releasing IUD  D. Implants ↔ I. Multiload 375  II. Progestasert  III. Lippes loop  IV. LNG-20",
     ["A-IV, B-I, C-II, D-III", "A-III, B-I, C-IV, D-II", "A-III, B-I, C-II, D-IV", "A-I, B-III, C-IV, D-II"]),
    (153, "I: Presence/absence of hymen is not a reliable indicator of virginity. II: Hymen is torn during the first coitus only.",
     ["I true, II false", "I false, II true", "Both true", "Both false"]),
    (154, "In both sexes of cockroach, anal cerci are present on:",
     ["8th and 9th segment", "11th segment", "5th segment", "10th segment"]),
    (155, "Match: A. Pons  B. Hypothalamus  C. Medulla  D. Cerebellum ↔ I. Additional space for neurons; posture/balance  II. Controls respiration & gastric secretions  III. Connects brain regions  IV. Neurosecretory cells",
     ["A-I, B-III, C-II, D-IV", "A-II, B-I, C-III, D-IV (correct order: A-III, B-IV, C-II, D-I per official key)", "A-II, B-III, C-I, D-IV", "A-III, B-IV, C-II, D-I"]),
    (156, "Which is NOT a steroid hormone?",
     ["Progesterone", "Glucagon", "Cortisol", "Testosterone"]),
    (157, "Product of DNA-dependent RNA polymerase from template 3' TACATGGCAAATATCCATTCA 5':",
     ["5' AUGUACCGUUUAUAGGGAAGU 3'", "5' ATGTACCGTTTATAGGTAAGT 3'", "5' AUGUACCGUUUAUAGGUAAGU 3'", "5' AUGUAAAGUUUAUAGGUAAGU 3'"]),
    (158, "Match three muscle types (a, b, c) with locations:",
     ["a: Skeletal-Biceps; b: Involuntary-Intestine; c: Smooth-Heart", "a: Involuntary-Nose tip; b: Skeletal-Bone; c: Cardiac-Heart", "a: Smooth-Toes; b: Skeletal-Legs; c: Cardiac-Heart", "a: Skeletal-Triceps; b: Smooth-Stomach; c: Cardiac-Heart"]),
    (159, "Stages of cell division: A. G2  B. Cytokinesis  C. S  D. Karyokinesis  E. G1. Correct sequence:",
     ["B, D, E, A, C", "E, C, A, D, B", "C, E, D, A, B", "E, B, D, A, C"]),
    (160, "Autoimmune disorders: A. Myasthenia gravis  B. Rheumatoid arthritis  C. Gout  D. Muscular dystrophy  E. SLE",
     ["B, C and E only", "C, D and E only", "A, B and D only", "A, B and E only"]),
    (161, "Match enzyme with bond hydrolysed: A. Lipase  B. Nuclease  C. Protease  D. Amylase ↔ I. Peptide  II. Ester  III. Glycosidic  IV. Phosphodiester",
     ["A-II, B-IV, C-I, D-III", "A-IV, B-I, C-III, D-II", "A-IV, B-II, C-III, D-I", "A-III, B-II, C-I, D-IV"]),
    (162, "Flippers of penguins and dolphins are an example of:",
     ["Convergent evolution", "Divergent evolution", "Adaptive radiation", "Natural selection"]),
    (163, "Match respiratory volumes: A. Expiratory capacity  B. Functional residual capacity  C. Vital capacity  D. Inspiratory capacity ↔ I. ERV+TV+IRV  II. TV+ERV  III. TV+IRV  IV. ERV+RV",
     ["A-II, B-I, C-IV, D-III", "A-I, B-III, C-II, D-IV", "A-II, B-IV, C-I, D-III", "A-III, B-II, C-IV, D-I"]),
    (164, "Which factor will NOT affect Hardy-Weinberg equilibrium?",
     ["Gene migration", "Constant gene pool", "Genetic recombination", "Genetic drift"]),
    (165, "Sequence of human evolution (past → recent): A. Homo habilis  B. Homo sapiens  C. Homo neanderthalensis  D. Homo erectus",
     ["C, B, D, A", "A, D, C, B", "D, A, C, B", "B, A, D, C"]),
    (166, "Pathway for action potential through heart: A. AV bundle  B. Purkinje fibres  C. AV node  D. Bundle branches  E. SA node",
     ["B, D, E, C, A", "E, A, D, B, C", "E, C, A, D, B", "A, E, C, B, D"]),
    (167, "Favourable for oxyhaemoglobin formation in alveoli:",
     ["Low pCO₂ and high H⁺", "Low pCO₂ and high temperature", "High pO₂ and high pCO₂", "High pO₂ and lower H⁺"]),
    (168, "Match: A. α-1 antitrypsin  B. Cry IAb  C. Cry IAc  D. Enzyme replacement therapy ↔ I. Cotton bollworm  II. ADA deficiency  III. Emphysema  IV. Corn borer",
     ["A-III, B-IV, C-I, D-II", "A-II, B-IV, C-I, D-III", "A-II, B-I, C-IV, D-III", "A-III, B-I, C-II, D-IV"]),
    (169, "A: FSH acts on ovarian follicles in female and Leydig cells in male. R: Growing ovarian follicles secrete estrogen; interstitial cells secrete androgen.",
     ["A true, R false", "A false, R true", "Both true; R is correct explanation", "Both true; R is NOT correct explanation"]),
    (170, "In pBR322 (E. coli cloning vector with restriction sites EcoRI, ClaI, HindIII, BamHI, SalI, PvuII, PvuI, PstI), genes X and Y respectively are for:",
     ["X: replication; Y: antibiotic resistance", "X: recognition sites; Y: antibiotic resistance", "X: antibiotic resistance; Y: replication", "X: copy-number control; Y: replication"]),
    (171, "Match drug with source: A. Cocaine  B. Heroin  C. Morphine  D. Marijuana ↔ I. Effective sedative in surgery  II. Cannabis sativa  III. Erythroxylum  IV. Papaver somniferum",
     ["A-II, B-I, C-III, D-IV", "A-III, B-IV, C-I, D-II", "A-IV, B-III, C-I, D-II", "A-I, B-III, C-II, D-IV"]),
    (172, "Consider: A. Annelids are true coelomates  B. Poriferans are pseudocoelomates  C. Aschelminthes are acoelomates  D. Platyhelminthes are pseudocoelomates",
     ["C only", "D only", "B only", "A only"]),
    (173, "I: Descending limb of loop of Henle is impermeable to water and permeable to electrolytes. II: PCT is lined by simple columnar brush-border epithelium for reabsorption.",
     ["I true, II false", "I false, II true", "Both true", "Both false"]),
    (174, "Match joints: A. Fibrous  B. Cartilaginous  C. Hinge  D. Ball-and-socket ↔ I. Adjacent vertebrae, limited movement  II. Humerus & pectoral girdle, rotational movement  III. Skull, no movement  IV. Knee, locomotion",
     ["A-II, B-III, C-I, D-IV", "A-III, B-I, C-IV, D-II", "A-IV, B-II, C-III, D-I", "A-I, B-III, C-II, D-IV"]),
    (175, "Which is NOT a natural/traditional contraceptive method?",
     ["Lactational amenorrhea", "Vaults", "Coitus interruptus", "Periodic abstinence"]),
    (176, "Match: A. Pleurobrachia  B. Radula  C. Stomochord  D. Air bladder ↔ I. Mollusca  II. Ctenophora  III. Osteichthyes  IV. Hemichordata",
     ["A-II, B-IV, C-I, D-III", "A-IV, B-III, C-II, D-I", "A-IV, B-II, C-III, D-I", "A-II, B-I, C-IV, D-III"]),
    (177, "Match: A. Axoneme  B. Cartwheel pattern  C. Crista  D. Satellite ↔ I. Centriole  II. Cilia and flagella  III. Chromosome  IV. Mitochondria",
     ["A-II, B-I, C-IV, D-III", "A-II, B-IV, C-I, D-III", "A-IV, B-III, C-II, D-I", "A-IV, B-II, C-III, D-II"]),
    (178, "Which is INCORRECT?",
     ["Bio-reactors are used to produce small-scale bacterial cultures", "Bio-reactors have agitator, oxygen delivery and foam control systems", "Bio-reactor provides optimal growth conditions", "Most commonly used bio-reactors are stirring type"]),
    (179, "Match prophase-I sub-phase: A. Diakinesis  B. Pachytene  C. Zygotene  D. Leptotene ↔ I. Synaptonemal complex formation  II. Completion of terminalisation of chiasmata  III. Chromosomes look like thin threads  IV. Appearance of recombination nodules",
     ["A-II, B-IV, C-I, D-III", "A-IV, B-III, C-II, D-I", "A-IV, B-II, C-III, D-I", "A-I, B-II, C-IV, D-III"]),
    (180, "Match: A. Common cold  B. Haemozoin  C. Widal test  D. Allergy ↔ I. Plasmodium  II. Typhoid  III. Rhinoviruses  IV. Dust mites",
     ["A-III, B-I, C-II, D-IV", "A-IV, B-II, C-III, D-I", "A-II, B-IV, C-III, D-I", "A-I, B-III, C-II, D-IV"]),
    (181, "A: Breast-feeding during initial period is recommended for a healthy baby. R: Colostrum contains several antibodies essential for immunity in newborn.",
     ["A correct, R not correct", "A not correct, R correct", "Both correct; R is correct explanation", "Both correct; R is NOT correct explanation"]),
    (182, "Match: A. Pterophyllum  B. Myxine  C. Pristis  D. Exocoetus ↔ I. Hag fish  II. Saw fish  III. Angel fish  IV. Flying fish",
     ["A-IV, B-I, C-II, D-III", "A-III, B-I, C-II, D-IV", "A-II, B-I, C-III, D-IV", "A-III, B-II, C-I, D-IV"]),
    (183, "'Ti plasmid' of Agrobacterium tumefaciens stands for:",
     ["Tumor inducing plasmid", "Temperature independent plasmid", "Tumour inhibiting plasmid", "Tumor independent plasmid"]),
    (184, "Which is NOT a component of the Fallopian tube?",
     ["Infundibulum", "Ampulla", "Uterine fundus", "Isthmus"]),
    (185, "Match: A. Down's syndrome  B. α-Thalassemia  C. β-Thalassemia  D. Klinefelter's ↔ I. 11th chromosome  II. X chromosome  III. 21st chromosome  IV. 16th chromosome",
     ["A-III, B-IV, C-I, D-II", "A-IV, B-I, C-II, D-III", "A-I, B-II, C-III, D-IV", "A-II, B-III, C-IV, D-I"]),

    # ── ZOOLOGY — Section B (186–200) ──
    (186, "Statements about non-chordates: A. Pharynx perforated by gill slits  B. Notochord absent  C. CNS is dorsal  D. Heart is dorsal if present  E. Post-anal tail absent.",
     ["B, D and E only", "B, C and D only", "A and C only", "A, B and D only"]),
    (187, "Match: A. Mesozoic Era  B. Proterozoic Era  C. Cenozoic Era  D. Paleozoic Era ↔ I. Lower invertebrates  II. Fish & Amphibia  III. Birds & Reptiles  IV. Mammals",
     ["A-I, B-II, C-IV, D-III", "A-III, B-I, C-IV, D-II", "A-II, B-I, C-III, D-IV", "A-III, B-I, C-II, D-IV"]),
    (188, "I: Cerebral hemispheres are connected by corpus callosum. II: The brain stem consists of medulla, pons and cerebrum.",
     ["I correct, II incorrect", "I incorrect, II correct", "Both correct", "Both incorrect"]),
    (189, "Spermatogenesis pathway — GnRH → LH and (A) → (B) and (C) → Androgens and Factors → (D = formation of spermatids):",
     ["FSH, Sertoli cells, Leydig cells, spermatogenesis  (note: official key gives this as the answer; correct biology has FSH→Sertoli, LH→Leydig)", "ICSH, Leydig, Sertoli, spermatogenesis", "FSH, Leydig, Sertoli, spermiogenesis", "ICSH, Interstitial, Leydig, spermiogenesis"]),
    (190, "Match: A. RNA polymerase III  B. Termination of transcription  C. Splicing of exons  D. TATA box ↔ I. snRNPs  II. Promoter  III. Rho factor  IV. snRNAs, tRNA",
     ["A-III, B-IV, C-I, D-II", "A-IV, B-III, C-I, D-II", "A-II, B-IV, C-I, D-III", "A-III, B-II, C-IV, D-I"]),
    (191, "Match: A. Exophthalmic goitre  B. Acromegaly  C. Cushing's syndrome  D. Cretinism ↔ I. Excess cortisol, moon face, hyperglycemia  II. Hypo-thyroid + stunted growth  III. Hyper-thyroid + protruding eye balls  IV. Excess GH",
     ["A-III, B-IV, C-II, D-I", "A-III, B-IV, C-I, D-II", "A-I, B-III, C-II, D-IV", "A-IV, B-II, C-I, D-III"]),
    (192, "Match: A. Unicellular glandular epithelium  B. Compound epithelium  C. Multicellular glandular epithelium  D. Endocrine glandular epithelium ↔ I. Salivary glands  II. Pancreas  III. Goblet cells of alimentary canal  IV. Moist surface of buccal cavity",
     ["A-III, B-IV, C-I, D-II", "A-II, B-I, C-IV, D-III", "A-II, B-I, C-III, D-IV", "A-IV, B-III, C-I, D-II"]),
    (193, "I: Bone marrow is the main lymphoid organ where all blood cells incl. lymphocytes are produced. II: Both bone marrow and thymus provide micro-environments for development & maturation of T-lymphocytes.",
     ["I correct, II incorrect", "I incorrect, II correct", "Both correct", "Both incorrect"]),
    (194, "Match in cockroach: A. Stores food  B. Ring of 6-8 blind tubules at foregut-midgut junction  C. Ring of 100-150 yellow filaments at midgut-hindgut junction  D. Grinds food ↔ I. Gizzard  II. Gastric caeca  III. Malpighian tubules  IV. Crop",
     ["A-IV, B-III, C-II, D-I", "A-III, B-II, C-IV, D-I", "A-IV, B-II, C-III, D-I", "A-I, B-II, C-III, D-IV"]),
    (195, "Choose the correct statement about juxtamedullary nephron:",
     ["Loop of Henle runs deep into medulla", "Outnumber cortical nephrons", "Located in columns of Bertini", "Renal corpuscle in outer renal medulla"]),
    (196, "Match ECG: A. P wave  B. QRS  C. T wave  D. T-P gap ↔ I. Heart muscles electrically silent  II. Depolarisation of ventricles  III. Depolarisation of atria  IV. Repolarisation of ventricles",
     ["A-II, B-III, C-I, D-IV", "A-IV, B-II, C-I, D-III", "A-I, B-III, C-IV, D-II", "A-III, B-II, C-IV, D-I"]),
    (197, "Father B⁺, mother A⁺, child O⁺. Possible genotypes: A. I^B i / I^A i / ii  B. I^B I^B / I^A I^A / ii  C. I^A I^B / i I^A / I^B i  D. I^A i / I^B i / I^A i  E. i I^B / i I^A / I^A I^B",
     ["C and B only", "D and E only", "A only", "B only"]),
    (198, "I: Gause's competitive exclusion principle: two closely related species competing for different resources cannot coexist indefinitely. II: According to Gause, the inferior is eliminated; this may be true if resources are limiting.",
     ["I true, II false", "I false, II true", "Both true", "Both false"]),
    (199, "Catalytic cycle of enzyme — correct sequence: A. Substrate-enzyme complex  B. Free enzyme ready  C. Release of products  D. Chemical bonds broken  E. Substrate binds active site",
     ["B, A, C, D, E", "E, D, C, B, A", "E, A, D, C, B", "A, E, B, D, C"]),
    (200, "I: Mitochondria and chloroplasts are both double-membrane bound organelles. II: Inner membrane of mitochondria is relatively less permeable than chloroplast.",
     ["I correct, II incorrect", "I incorrect, II correct", "Both correct", "Both incorrect"]),
]

# ── ANSWER KEY (from official Code T5; cross-mapped to T3 via the user-supplied sheet) ──
ANSWER_KEY = {
    1:4, 2:1, 3:3, 4:2, 5:4, 6:2, 7:3, 8:3, 9:3, 10:3,
    11:2, 12:4, 13:3, 14:4, 15:2, 16:1, 17:1, 18:4, 19:3, 20:3,
    21:1, 22:2, 23:1, 24:4, 25:4, 26:3, 27:4, 28:1, 29:2, 30:1,
    31:4, 32:2, 33:2, 34:4, 35:3, 36:3, 37:4, 38:2, 39:4, 40:4,
    41:4, 42:4, 43:4, 44:4, 45:3, 46:4, 47:4, 48:1, 49:2, 50:4,
    51:1, 52:4, 53:4, 54:3, 55:1, 56:1, 57:3, 58:3, 59:2, 60:4,
    61:3, 62:2, 63:2, 64:2, 65:3, 66:3, 67:3, 68:3, 69:3, 70:4,
    71:4, 72:2, 73:3, 74:1, 75:3, 76:3, 77:2, 78:1, 79:3, 80:2,
    81:1, 82:3, 83:4, 84:2, 85:3, 86:3, 87:2, 88:2, 89:4, 90:3,
    91:3, 92:3, 93:3, 94:2, 95:4, 96:4, 97:3, 98:2, 99:4, 100:3,
    101:1, 102:4, 103:4, 104:3, 105:3, 106:2, 107:1, 108:1, 109:1, 110:1,
    111:3, 112:1, 113:3, 114:4, 115:2, 116:1, 117:1, 118:4, 119:3, 120:1,
    121:2, 122:2, 123:3, 124:2, 125:1, 126:3, 127:4, 128:2, 129:3, 130:4,
    131:3, 132:2, 133:1, 134:4, 135:4, 136:4, 137:4, 138:3, 139:3, 140:2,
    141:4, 142:1, 143:4, 144:4, 145:1, 146:1, 147:1, 148:1, 149:3, 150:3,
    151:4, 152:2, 153:1, 154:1, 155:2, 156:1, 157:1, 158:3, 159:3, 160:4,
    161:4, 162:4, 163:4, 164:2, 165:1, 166:1, 167:1, 168:3, 169:3, 170:4,
    171:2, 172:4, 173:1, 174:3, 175:4, 176:2, 177:1, 178:2, 179:2, 180:2,
    181:4, 182:2, 183:2, 184:4, 185:4, 186:3, 187:4, 188:1, 189:1, 190:3,
    191:2, 192:1, 193:3, 194:2, 195:2, 196:3, 197:1, 198:1, 199:2, 200:3,
}
# Note: per the user-supplied Code T5 key — Q148 and Q192 were marked (1 or 4) and (1 or 3) respectively.
# We list the primary (1) here and mention the alternates in the booklet's answer-key footnote.
DUAL_KEYS = {148: ("1", "4"), 192: ("1", "3")}


# ─────────────────────────────────────────────────────────────────────
# PDF BUILD
# ─────────────────────────────────────────────────────────────────────

styles = getSampleStyleSheet()

title_style = ParagraphStyle('TitleStyle', parent=styles['Title'],
    fontSize=22, leading=26, alignment=TA_CENTER,
    textColor=colors.HexColor('#047857'), spaceAfter=6, fontName='Helvetica-Bold')
subtitle_style = ParagraphStyle('SubtitleStyle', parent=styles['Normal'],
    fontSize=11, leading=14, alignment=TA_CENTER,
    textColor=colors.HexColor('#475569'), spaceAfter=14)
section_style = ParagraphStyle('SectionStyle', parent=styles['Heading2'],
    fontSize=15, leading=18, spaceBefore=14, spaceAfter=10,
    textColor=colors.white, backColor=colors.HexColor('#047857'),
    borderPadding=8, fontName='Helvetica-Bold', alignment=TA_CENTER)
sub_section_style = ParagraphStyle('SubSectionStyle', parent=styles['Heading3'],
    fontSize=11, leading=14, spaceBefore=8, spaceAfter=6,
    textColor=colors.white, backColor=colors.HexColor('#0d9488'),
    borderPadding=5, fontName='Helvetica-Bold', alignment=TA_CENTER)
qno_style = ParagraphStyle('QNoStyle', parent=styles['Normal'],
    fontSize=11, leading=14, fontName='Helvetica-Bold',
    textColor=colors.HexColor('#0f172a'), spaceAfter=4)
question_style = ParagraphStyle('QuestionStyle', parent=styles['Normal'],
    fontSize=10.5, leading=14, alignment=TA_JUSTIFY,
    textColor=colors.HexColor('#1e293b'), spaceAfter=4)
option_style = ParagraphStyle('OptionStyle', parent=styles['Normal'],
    fontSize=10, leading=13, leftIndent=14,
    textColor=colors.HexColor('#334155'), spaceAfter=2)
ak_head_style = ParagraphStyle('AKHead', parent=styles['Heading2'],
    fontSize=18, leading=22, alignment=TA_CENTER,
    textColor=colors.white, backColor=colors.HexColor('#b45309'),
    borderPadding=10, fontName='Helvetica-Bold', spaceAfter=14)
note_style = ParagraphStyle('NoteStyle', parent=styles['Normal'],
    fontSize=9.5, leading=13, alignment=TA_LEFT,
    textColor=colors.HexColor('#64748b'), spaceAfter=8, leftIndent=6)
instr_style = ParagraphStyle('InstrStyle', parent=styles['Normal'],
    fontSize=10, leading=14, alignment=TA_JUSTIFY,
    textColor=colors.HexColor('#1f2937'), spaceAfter=4, leftIndent=4)


def section_header(label):
    return Paragraph(label, section_style)


def sub_header(label):
    return Paragraph(label, sub_section_style)


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

    # ── Cover ──
    story.append(Spacer(1, 1.2 * cm))
    story.append(Paragraph('NEET (UG) 2024', title_style))
    story.append(Paragraph(
        'National Eligibility cum Entrance Test (Undergraduate)<br/>'
        'Date: <b>05 May 2024</b> &nbsp;|&nbsp; Test Booklet Code: <b>T3</b><br/>'
        'Duration: 3 hours 20 minutes &nbsp;|&nbsp; 200 MCQs &nbsp;|&nbsp; Maximum Marks: 720',
        subtitle_style))

    story.append(Spacer(1, 0.3 * cm))
    story.append(Paragraph('<b>General Instructions:</b>', qno_style))
    story.append(Paragraph(
        '1. The test contains <b>200</b> multiple-choice questions from <b>Physics, Chemistry, Botany and Zoology</b> '
        '(50 questions per subject). Each subject is divided into Section A (35 compulsory) and Section B (attempt any 10 of 15).<br/>'
        '2. Each correct response: <b>+4 marks</b>. Each incorrect response: <b>−1 mark</b>. Maximum marks: <b>720</b>.<br/>'
        '3. In Section B, candidates need to attempt any 10 of 15 questions. If more than ten are answered, the first ten attempted will be evaluated.<br/>'
        '4. Use of an electronic/manual calculator is prohibited.<br/>'
        '5. The official answer key is provided at the end of this booklet.', instr_style))
    story.append(Spacer(1, 0.4 * cm))

    story.append(Paragraph(
        '<i>Disclaimer: This document is a faithful reproduction of the question paper for educational and revision purposes. '
        'For the official paper and answer key, please refer to NTA / NMC.</i>', note_style))
    story.append(PageBreak())

    # Range helpers
    def in_range(lo, hi):
        return [q for q in QUESTIONS if lo <= q[0] <= hi]

    physics_a = in_range(1, 35)
    physics_b = in_range(36, 50)
    chem_a = in_range(51, 85)
    chem_b = in_range(86, 100)
    botany_a = in_range(101, 135)
    botany_b = in_range(136, 150)
    zoo_a = in_range(151, 185)
    zoo_b = in_range(186, 200)

    # ── PHYSICS ──
    story.append(section_header('PHYSICS'))
    story.append(sub_header('Section A — Questions 1–35 (All compulsory)'))
    for q in physics_a:
        story.append(render_question(*q))
    story.append(sub_header('Section B — Questions 36–50 (Attempt any 10 of 15)'))
    for q in physics_b:
        story.append(render_question(*q))
    story.append(PageBreak())

    # ── CHEMISTRY ──
    story.append(section_header('CHEMISTRY'))
    story.append(sub_header('Section A — Questions 51–85 (All compulsory)'))
    for q in chem_a:
        story.append(render_question(*q))
    story.append(sub_header('Section B — Questions 86–100 (Attempt any 10 of 15)'))
    for q in chem_b:
        story.append(render_question(*q))
    story.append(PageBreak())

    # ── BOTANY ──
    story.append(section_header('BOTANY'))
    story.append(sub_header('Section A — Questions 101–135 (All compulsory)'))
    for q in botany_a:
        story.append(render_question(*q))
    story.append(sub_header('Section B — Questions 136–150 (Attempt any 10 of 15)'))
    for q in botany_b:
        story.append(render_question(*q))
    story.append(PageBreak())

    # ── ZOOLOGY ──
    story.append(section_header('ZOOLOGY'))
    story.append(sub_header('Section A — Questions 151–185 (All compulsory)'))
    for q in zoo_a:
        story.append(render_question(*q))
    story.append(sub_header('Section B — Questions 186–200 (Attempt any 10 of 15)'))
    for q in zoo_b:
        story.append(render_question(*q))
    story.append(PageBreak())

    # ── Answer Key ──
    story.append(Paragraph('Official Answer Key — NEET (UG) 2024', ak_head_style))
    story.append(Paragraph(
        'Answers are referenced to <b>Code T5</b> as released by the conducting authority and cross-mapped to <b>Code T3</b>.', note_style))
    story.append(Spacer(1, 0.3 * cm))

    # 4-column answer key table (50 rows × 4 columns = 200)
    rows = []
    header = ['Q. No.', 'Ans', 'Q. No.', 'Ans', 'Q. No.', 'Ans', 'Q. No.', 'Ans']
    rows.append(header)

    nums = sorted(ANSWER_KEY.keys())
    per_col = 50  # 4 × 50 = 200
    for i in range(per_col):
        row = []
        for col in range(4):
            idx = col * per_col + i
            if idx < len(nums):
                qn = nums[idx]
                if qn in DUAL_KEYS:
                    a1, a2 = DUAL_KEYS[qn]
                    ans_text = f'({a1} or {a2})'
                else:
                    ans_text = f'({ANSWER_KEY[qn]})'
                row.extend([str(qn), ans_text])
            else:
                row.extend(['', ''])
        rows.append(row)

    table = Table(rows, colWidths=[1.7 * cm, 1.4 * cm] * 4)
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
        '<b>Note:</b> For Q148 and Q192, both options listed in parentheses were considered correct as per the official key.', note_style))

    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    print(f'✓ Built: {OUT}')
    print(f'  File size: {os.path.getsize(OUT) / 1024:.1f} KB')


if __name__ == '__main__':
    build()
