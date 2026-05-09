"""
Generate NEET (UG) 2025 Previous Year Question Paper PDF
Source: NEET (UG) 2025 — Test Booklet Code 45 — Date: 04-05-2025
180 MCQs from Physics, Chemistry, and Biology (Botany & Zoology)
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm, mm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, KeepTogether
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY

OUT = "../../public/pyq-pdfs/neet-2025.pdf"

import os
os.makedirs(os.path.dirname(OUT), exist_ok=True)

# ─────────────────────────────────────────────────────────────────────
# DATA — NEET (UG) 2025 — Test Booklet Code 45 — Date: 04-05-2025
# Questions sourced from official NTA paper.
# ─────────────────────────────────────────────────────────────────────

QUESTIONS = [
    # ── PHYSICS (Q1–45) ──
    (1, "Consider a water tank with one wall at x = L, very wide in z direction. Filled with liquid of surface tension S and density ρ, the liquid surface makes angle θ₀ with x-axis at x = L. If y(x) is the height of the surface, the equation for y(x) is (take θ ≈ sin θ ≈ tan θ = dy/dx, g is acceleration due to gravity):",
     ["d²y/dx² = (ρg/S)x", "d²y/dx² = (ρg/S)y", "d²y/dx² = √(ρg/S)", "dy/dx = √(ρg/S)x"]),
    (2, "A microscope has an objective of focal length 2 cm, eyepiece of focal length 4 cm and tube length of 40 cm. If the distance of distinct vision of eye is 25 cm, the magnification in the microscope is:",
     ["100", "125", "150", "250"]),
    (3, "An electron (mass 9 × 10⁻³¹ kg, charge 1.6 × 10⁻¹⁹ C) moving with speed c/100 is injected into a magnetic field B of magnitude 9 × 10⁻⁴ T perpendicular to its motion. We wish to apply a uniform electric field E together with B so the electron does not deflect. Then (c = 3 × 10⁸ m/s):",
     ["E ⊥ B and |E| = 27 × 10⁴ V/m", "E ⊥ B and |E| = 27 × 10² V/m", "E ∥ B and |E| = 27 × 10² V/m", "E ∥ B and |E| = 27 × 10⁴ V/m"]),
    (4, "Two inclined surfaces of equal length L and same angle 45° with horizontal: one rough, the other perfectly smooth. A body takes 2 times as much time to slide down the rough surface as on the smooth surface. The coefficient of kinetic friction (μₖ) between the object and the rough surface is close to:",
     ["0.25", "0.40", "0.5", "0.75"]),
    (5, "Kinetic energies of two similar cars A and B are 100 J and 225 J respectively. On applying brakes, A stops after 1000 m and B stops after 1500 m. If F_A and F_B are the braking forces on A and B respectively, the ratio F_A/F_B is:",
     ["3/2", "2/3", "1/3", "1/2"]),
    (6, "The current passing through the battery in the given circuit (Wheatstone bridge with 5 V battery, 1/3 Ω, 5.5 Ω external) is:",
     ["2.0 A", "0.5 A", "2.5 A", "1.5 A"]),
    (7, "A bob of heavy mass m is suspended by a light string of length l. The bob is given a horizontal velocity v₀. If the string gets slack at point P making angle θ from the horizontal, the ratio of the speed v at P to its initial speed v₀ is:",
     ["(sin θ)^(1/2)", "[1/(2 + 3 sin θ)]^(1/2)", "[cos θ/(2 + 3 sin θ)]^(1/2)", "[sin θ/(2 + 3 sin θ)]^(1/2)"]),
    (8, "The output Y of the given logic implementation (with inputs A, B and gates as shown) is similar to the output of a/an _______ gate.",
     ["AND", "NAND", "OR", "NOR"]),
    (9, "The electric field in a plane EM wave is E_z = 60 cos(5x + 1.5 × 10⁹ t) V/m. The expression for the corresponding magnetic field is (subscripts denote direction):",
     ["B_y = 2 × 10⁻⁷ cos(5x + 1.5 × 10⁹ t) T", "B_x = 2 × 10⁻⁷ cos(5x + 1.5 × 10⁹ t) T", "B_z = 60 cos(5x + 1.5 × 10⁹ t) T", "B_y = 60 sin(5x + 1.5 × 10⁹ t) T"]),
    (10, "A 0.5 kg ball is dropped from 40 m. It rises to 10 m after the bounce. The impulse imparted to the ball during collision with the ground is (g = 9.8 m/s²):",
     ["21 Ns", "7 Ns", "0", "84 Ns"]),
    (11, "AB is a part of an electrical circuit (1 H inductor, 5 V battery, 2 Ω resistor in series). The potential difference V_A − V_B at the instant when current i = 2 A and is increasing at 1 A/s is:",
     ["5 volt", "6 volt", "9 volt", "10 volt"]),
    (12, "A 2 A current flows through two different small circular copper coils with radii ratio 1:2. The ratio of their respective magnetic moments is:",
     ["1:4", "1:2", "2:1", "4:1"]),
    (13, "A combination of four similar thin convex lenses arranged axially in contact. The power and total magnification, compared to power p and magnification m of each lens, are:",
     ["4p and 4m", "p⁴ and 4m", "4p and m⁴", "p⁴ and m⁴"]),
    (14, "An oxygen cylinder of volume 30 L has 18.20 mol of O₂. After some O₂ is withdrawn, gauge pressure drops to 11 atm at 27 °C. The mass withdrawn is nearly (R = 100/12 J mol⁻¹ K⁻¹, M(O₂) = 32, 1 atm = 1.01 × 10⁵ N/m²):",
     ["0.125 kg", "0.144 kg", "0.116 kg", "0.156 kg"]),
    (15, "Time and position of a moving particle are related by t = x² + x. The acceleration of the particle is:",
     ["−2/(x + 2)³", "−2/(2x + 1)³", "+2/(x + 1)³", "2/(2x + 1)"]),
    (16, "An AC supply of 220 V at 50 Hz is connected in series with R = 20 Ω, capacitor of reactance 25 Ω and inductor of reactance 45 Ω. The current and phase angle between current and voltage are:",
     ["7.8 A and 30°", "7.8 A and 45°", "15.6 A and 30°", "15.6 A and 45°"]),
    (17, "The Sun rotates around its centre once in 27 days. What is the period if it expanded to twice its present radius without external influence (uniform density sphere)?",
     ["100 days", "105 days", "115 days", "108 days"]),
    (18, "A model for quantized motion of an electron in a uniform magnetic field B states that the flux through the orbit is n(h/e). The magnetic moment in the lowest energy state is (m = electron mass):",
     ["he/πm", "he/(2πm)", "heB/πm", "heB/(2πm)"]),
    (19, "Three identical heat-conducting rods are connected in series. Side rods have thermal conductivity 2K, middle has K. Left end at 3T, right end at T (insulated outside). In steady state, junctions T₁ (left) and T₂ (right). The ratio T₁/T₂ is:",
     ["3/2", "4/3", "5/3", "5/4"]),
    (20, "Plates of a parallel plate capacitor are separated by d. Two slabs of dielectric K₁ and K₂ with thicknesses 3d/8 and d/2 respectively are inserted. Capacitance becomes 2× the air value. If K₁ = 1.25 K₂, the value of K₁ is:",
     ["2.66", "2.33", "1.60", "1.33"]),
    (21, "Two cities X and Y are connected by a regular bus service with a bus leaving every T min in either direction. A girl driving at 60 km/h from X to Y notices a bus passes her every 30 min in her direction and every 10 min in the opposite. The period T and bus speed are:",
     ["9 min, 40 km/h", "25 min, 100 km/h", "10 min, 90 km/h", "15 min, 120 km/h"]),
    (22, "A uniform rod (mass 20 kg, length 5 m) leans against a smooth vertical wall at 60° with it. Other end on rough horizontal floor. The friction force from the floor is (g = 10 m/s²):",
     ["100 N", "100√3 N", "200 N", "200√3 N"]),
    (23, "In an oscillating spring–mass system, sand leaks slowly from the box. Which option correctly schematically depicts the changes in average frequency ω(t) and amplitude A(t)?",
     ["ω increases, A constant", "ω increases, A decreases", "ω decreases, A increases", "ω decreases, A constant"]),
    (24, "A balloon of surface tension S, outlet area A, gas density ρ, takes spherical shape of radius R. When gas flows out freely, r changes from R to 0 in time T. If v(r) ∝ r^a and T ∝ S^α A^β ρ^γ R^δ, then:",
     ["a = 1/2, α = 1/2, β = −1, γ = +1, δ = 3/2", "a = −1/2, α = −1/2, β = −1, γ = −1/2, δ = 5/2", "a = −1/2, α = −1/2, β = −1, γ = 1/2, δ = 7/2", "a = 1/2, α = 1/2, β = −1/2, γ = 1/2, δ = 7/2"]),
    (25, "A spherical object's diameter measured with vernier callipers: 10 VSD = 9 MSD, least MSD division = 0.1 cm, zero of VS at x = 0.1 cm when jaws are closed. MSR = 5 cm, coinciding vernier division = 8. Measured diameter after zero error correction is:",
     ["5.18 cm", "5.08 cm", "4.98 cm", "5.00 cm"]),
    (26, "A parallel plate capacitor (circular plates) is being charged so that surface charge density increases at a constant rate. The magnetic field due to displacement current is:",
     ["zero everywhere", "constant between plates and zero outside", "non-zero everywhere with maximum at the imaginary cylindrical surface joining peripheries", "zero between plates and non-zero outside"]),
    (27, "Unpolarized light in air is incident on a medium of refractive index 1.73 at Brewster's angle. Then:",
     ["reflected light is completely polarized and angle of reflection ≈ 60°", "reflected light is partially polarized and angle of reflection ≈ 30°", "both reflected and transmitted are perfectly polarized with angles ≈ 60° and 30°", "transmitted light is completely polarized with angle of refraction ≈ 30°"]),
    (28, "Two identical charged conducting spheres A and B, charge q each, repel with force F. A third identical uncharged sphere is brought in contact with A first, then with B, then removed. The new force of repulsion between A and B is:",
     ["3F/5", "2F/3", "F/2", "3F/8"]),
    (29, "A container has two chambers V₁ = 2 L and V₂ = 3 L separated by a thermal insulator partition. Chambers contain n₁ = 5 mol and n₂ = 4 mol of ideal gas at p₁ = 1 atm and p₂ = 2 atm. When partition is removed, equilibrium pressure is:",
     ["1.3 atm", "1.6 atm", "1.4 atm", "1.8 atm"]),
    (30, "A particle of mass m moves around the origin with a constant inward force F. If Bohr's model is applied, radius r and speed v of the n-th orbit depend on n as:",
     ["r ∝ n^(1/3); v ∝ n^(1/3)", "r ∝ n^(1/3); v ∝ n^(2/3)", "r ∝ n^(2/3); v ∝ n^(1/3)", "r ∝ n^(4/3); v ∝ n^(−1/3)"]),
    (31, "The radius of Mars's orbit is about 4× that of Mercury. Martian year is 687 Earth days. The length of one year on Mercury is:",
     ["88 earth days", "225 earth days", "172 earth days", "124 earth days"]),
    (32, "A body weighs 48 N on Earth's surface. Its gravitational force at a height equal to one-third the Earth's radius from its surface is:",
     ["16 N", "27 N", "32 N", "36 N"]),
    (33, "A wire of resistance R is cut into 8 equal pieces. From these, two equivalent resistances are made by connecting four pieces in parallel. The two sets are then connected in series. The net effective resistance is:",
     ["R/64", "R/32", "R/16", "R/8"]),
    (34, "De-Broglie wavelength of an electron orbiting in n = 2 of hydrogen is close to (Bohr radius = 0.052 nm):",
     ["0.067 nm", "0.67 nm", "1.67 nm", "2.67 nm"]),
    (35, "An electric dipole (5 × 10⁻⁶ C·m) is aligned with a uniform field of 4 × 10⁵ N/C. It is rotated through 60° w.r.t. the field. The change in potential energy is:",
     ["0.8 J", "1.0 J", "1.2 J", "1.5 J"]),
    (36, "A constant 50 V is maintained between A and B of the circuit (with 1 Ω, 2 Ω, 3 Ω, 4 Ω as shown). The current through branch CD is:",
     ["1.5 A", "2.0 A", "2.5 A", "3.0 A"]),
    (37, "A photon and an electron of mass m have the same energy E. The ratio λ_photon/λ_electron is (c is speed of light):",
     ["√(E/2m)", "c√(2mE)", "c√(2m/E)", "(1/c)√(E/2m)"]),
    (38, "Which option(s) represent the variation of photoelectric current with the property of light shown on the x-axis (A: vs intensity-linear; B: vs intensity-flat; C: vs frequency-linear; D: vs frequency-linear)?",
     ["A only", "A and C", "A and D", "B and D"]),
    (39, "A sphere of radius R is cut from a larger solid sphere of radius 2R. The ratio of moment of inertia of the smaller sphere to the rest about the Y-axis is:",
     ["7/8", "7/40", "7/57", "7/64"]),
    (40, "A full-wave rectifier with diodes D₁ and D₂. If V_in = 220 sin(100πt) V, then at t = 15 ms:",
     ["D₁ forward, D₂ reverse", "D₁ reverse, D₂ forward", "Both forward", "Both reverse"]),
    (41, "Two gases A and B at the same pressure in cylinders with movable pistons of radii r_A and r_B. Equal heat is supplied reversibly at constant pressure; pistons of A and B move 16 cm and 9 cm. If ΔU is same, the ratio r_A/r_B is:",
     ["4/3", "3/4", "2/√3", "√3/2"]),
    (42, "A physical quantity P = a³b²/(c√d). Percent errors in a, b, c, d are 1%, 3%, 2%, 4%. The percent error in P is:",
     ["10%", "2%", "13%", "15%"]),
    (43, "A polaroid is placed at 22.5° between two crossed polarizers. The intensity of transmitted light (I₀ = intensity after first polaroid) is:",
     ["I₀/2", "I₀/4", "I₀/8", "I₀/16"]),
    (44, "Two identical point masses P and Q on springs of constants k₁ and k₂ oscillate vertically. Maximum speeds are equal. The ratio A_Q/A_P is:",
     ["k₂/k₁", "k₁/k₂", "√(k₂/k₁)", "√(k₁/k₂)"]),
    (45, "A pipe open at both ends has fundamental frequency f. Dipped vertically in water to half its length, the new fundamental frequency is:",
     ["f/2", "f", "3f/2", "2f"]),
    (46, "Ratio of wavelengths of light absorbed by hydrogen for n = 2 → n = 3 and n = 4 → n = 6 transitions is:",
     ["1/36", "1/16", "1/9", "1/4"]),

    # ── CHEMISTRY (Q47–90) ──
    (47, "Which of the following statements are true? A. Unlike Ga (high m.p.), Cs has very low m.p. B. Electronegativity values of N and Cl on Pauling scale are not the same. C. Ar, K⁺, Cl⁻, Ca²⁺, S²⁻ are all isoelectronic. D. First IE order: Si > Aℓ > Mg > Na. E. Atomic radius of Cs is greater than Li and Rb.",
     ["A, B and E only", "C and E only", "C and D only", "A, C and E only"]),
    (48, "Match (Ion) with Group in cation analysis: A. Co²⁺  B. Mg²⁺  C. Pb²⁺  D. Aℓ³⁺  ↔  I. Group I  II. Group III  III. Group IV  IV. Group VI",
     ["A-III, B-IV, C-II, D-I", "A-III, B-IV, C-I, D-II", "A-III, B-II, C-IV, D-I", "A-III, B-II, C-I, D-IV"]),
    (49, "Predict major product P: cyclopent-1-ene with CH₃ → (i) HBr, benzoyl peroxide; (ii) KCN; (iii) Na(Hg)/C₂H₅OH",
     ["1-(aminomethyl)-2-methylcyclopentane", "1-(aminomethyl)-1-methylcyclopentane", "1-(cyano)-2-methylcyclopentane", "1-(cyano)-1-methylcyclopentane"]),
    (50, "Energy and radius of first Bohr orbit of He⁺ and Li²⁺ (R_H = 2.18 × 10⁻¹⁸ J, a₀ = 52.9 pm):",
     ["E(Li²⁺) = −19.62 × 10⁻¹⁸ J; r = 17.6 pm; E(He⁺) = −8.72 × 10⁻¹⁸ J; r = 26.4 pm",
      "E(Li²⁺) = −8.72 × 10⁻¹⁸ J; r = 26.4 pm; E(He⁺) = −19.62 × 10⁻¹⁸ J; r = 17.6 pm",
      "E(Li²⁺) = −19.62 × 10⁻¹⁶ J; r = 17.6 pm; E(He⁺) = −8.72 × 10⁻¹⁶ J; r = 26.4 pm",
      "E(Li²⁺) = −8.72 × 10⁻¹⁶ J; r = 17.6 pm; E(He²⁺) = −19.62 × 10⁻¹⁶ J; r = 17.6 pm"]),
    (51, "Which of the following are paramagnetic? A. [NiCl₄]²⁻  B. Ni(CO)₄  C. [Ni(CN)₄]²⁻  D. [Ni(H₂O)₆]²⁺  E. Ni(PPh₃)₄",
     ["A and C only", "B and E only", "A and D only", "A, D and E only"]),
    (52, "Statement I: Like nitrogen forms ammonia, arsenic forms arsine. Statement II: Antimony cannot form antimony pentoxide.",
     ["Both I and II correct", "Both I and II incorrect", "I correct, II incorrect", "I incorrect, II correct"]),
    (53, "Which configurations belong to main-group elements? A. [Ne]3s¹  B. [Ar]3d³4s²  C. [Kr]4d¹⁰5s²5p⁵  D. [Ar]3d¹⁰4s¹  E. [Rn]5f⁰6d²7s²",
     ["B and E only", "A and C only", "D and E only", "A, C and D only"]),
    (54, "Dalton's atomic theory could NOT explain which?",
     ["Law of conservation of mass", "Law of constant proportion", "Law of multiple proportion", "Law of gaseous volume"]),
    (55, "Oxidation states of underlined K in KO₂, O in H₂O₂, S in H₂SO₄ respectively:",
     ["+1, −1, and +6", "+2, −2, and +6", "+1, −2, and +4", "+4, −4, and +6"]),
    (56, "If t₁/₂ for a first-order reaction is 1 minute, time for 99.9% completion is closest to:",
     ["2 minutes", "4 minutes", "5 minutes", "10 minutes"]),
    (57, "Correct order of wavelength absorbed by: A. [Co(NH₃)₆]³⁺  B. [Co(CN)₆]³⁻  C. [Cu(H₂O)₄]²⁺  D. [Ti(H₂O)₆]³⁺",
     ["B < D < A < C", "B < A < D < C", "C < D < A < B", "C < A < D < B"]),
    (58, "Which compound exhibits cis–trans isomers?",
     ["Pent-1-ene", "2-Methylhex-2-ene", "1,1-Dimethylcyclopropane", "1,2-Dimethylcyclohexane"]),
    (59, "For phosphoric acid (Ka₁, Ka₂, Ka₃, K = overall), which are true? A. log K = log Ka₁ + log Ka₂ + log Ka₃  B. H₃PO₄ stronger than H₂PO₄⁻ and HPO₄²⁻  C. Ka₁ > Ka₂ > Ka₃  D. Ka₁ = (Ka₃ + Ka₂)/2",
     ["A and B only", "A and C only", "B, C and D only", "A, B and C only"]),
    (60, "Which reaction does NOT give benzene as product?",
     ["C₆H₅COONa + sodalime/Δ", "n-hexane + Mo₂O₃ at 773 K, 10–20 atm", "HC≡CH passed through red-hot iron tube at 873 K", "C₆H₅N₂⁺Cl⁻ + H₂O (warm)"]),
    (61, "Molar conductivity Λₘ of 0.050 mol/L solution of a monobasic weak acid is 90 S cm² mol⁻¹. Λ°₊ = 349.6, Λ°₋ = 50.4 S cm² mol⁻¹. Degree of dissociation α is:",
     ["0.115", "0.125", "0.225", "0.215"]),
    (62, "Statement I: A hypothetical diatomic molecule with bond order zero is quite stable. Statement II: As bond order increases, bond length increases.",
     ["Both I and II true", "Both I and II false", "I true, II false", "I true, II true"]),
    (63, "Which complex has minimum conductance in solution?",
     ["[Co(NH₃)₃Cl₃]", "[Co(NH₃)₄Cl₂]", "[Co(NH₃)₆]Cl₃", "[Co(NH₃)₅Cl]Cl₂"]),
    (64, "Match: A. XeO₃  B. XeF₂  C. XeOF₄  D. XeF₆ ↔ I. sp³d (linear)  II. sp³ (pyramidal)  III. sp³d³ (distorted octahedral)  IV. sp³d² (square pyramidal)",
     ["A-II, B-I, C-IV, D-III", "A-II, B-I, C-III, D-IV", "A-IV, B-II, C-III, D-I", "A-IV, B-II, C-I, D-III"]),
    (65, "C(s) + 2 H₂(g) → CH₄(g); ΔH = −74.8 kJ/mol. Which energy diagram is accurate (R → P)?",
     ["Reactants higher; activation peak; products 74.8 kJ below R", "Products higher than reactants by 74.8 kJ", "Reactants and products at same level", "Activation peak smaller than 74.8 kJ"]),
    (66, "Match (Example): A. Humidity  B. Alloys  C. Amalgams  D. Smoke ↔ (Type): I. Solid in solid  II. Liquid in gas  III. Solid in gas  IV. Liquid in solid",
     ["A-II, B-IV, C-I, D-III", "A-II, B-I, C-IV, D-III", "A-III, B-I, C-IV, D-II", "A-III, B-II, C-I, D-IV"]),
    (67, "Decreasing basic strength among amines:",
     ["N-methylaniline > benzenamine > ethanamine > N-ethylethanamine",
      "N-ethylethanamine > ethanamine > benzenamine > N-methylaniline",
      "N-ethylethanamine > ethanamine > N-methylaniline > benzenamine",
      "benzenamine > ethanamine > N-methylaniline > N-ethylethanamine"]),
    (68, "Which have equal number of atoms? A. 212 g Na₂CO₃  B. 248 g Na₂O  C. 240 g NaOH  D. 12 g H₂  E. 220 g CO₂",
     ["A, B and C only", "A, B and D only", "B, C and D only", "B, D and E only"]),
    (69, "Match Vitamin with deficiency disease: A. B₁₂  B. D  C. B₂  D. B₆ ↔ I. Cheilosis  II. Convulsions  III. Rickets  IV. Pernicious anaemia",
     ["A-I, B-III, C-II, D-IV", "A-IV, B-III, C-I, D-II", "A-II, B-III, C-I, D-IV", "A-IV, B-III, C-II, D-I"]),
    (70, "Decreasing acidity of aliphatic acids:",
     ["(CH₃)₃CCOOH > (CH₃)₂CHCOOH > CH₃COOH > HCOOH",
      "CH₃COOH > (CH₃)₂CHCOOH > (CH₃)₃CCOOH > HCOOH",
      "HCOOH > CH₃COOH > (CH₃)₂CHCOOH > (CH₃)₃CCOOH",
      "HCOOH > (CH₃)₃CCOOH > (CH₃)₂CHCOOH > CH₃COOH"]),
    (71, "Statement I: Ferromagnetism is an extreme form of paramagnetism. Statement II: Number of unpaired electrons in Cr²⁺ (Z=24) is the same as in Nd³⁺ (Z=60).",
     ["Both I and II true", "Both I and II false", "I true, II false", "I false, II true"]),
    (72, "Match (Mixture) with method: A. CHCl₃ + C₆H₅NH₂  B. Crude oil  C. Glycerol from spent-lye  D. Aniline–water ↔ I. Distillation under reduced pressure  II. Steam distillation  III. Fractional distillation  IV. Simple distillation",
     ["A-IV, B-III, C-I, D-II", "A-IV, B-III, C-II, D-I", "A-III, B-IV, C-I, D-II", "A-III, B-IV, C-II, D-I"]),
    (73, "For A(g) ⇌ 2 B(g), backward rate constant is 2500× the forward at 1000 K (R = 0.0831 L·atm·mol⁻¹·K⁻¹). K_p at 1000 K is:",
     ["83.1", "2.077 × 10⁵", "0.033", "0.021"]),
    (74, "Statement I: Benzenediazonium salt is prepared by aniline + HNO₂ at 273–278 K; decomposes easily in dry state. Statement II: Iodine insertion into benzene is difficult; iodobenzene is prepared via diazonium + KI.",
     ["Both I and II correct", "Both I and II incorrect", "I correct, II incorrect", "I incorrect, II correct"]),
    (75, "Number of products (incl. stereoisomers) from monochlorination of (CH₃)₂CH–CH₂–CH₃:",
     ["2", "3", "5", "6"]),
    (76, "Bond dissociation energy order of starred C–H bond in: I (benzene C–H), II (alkyne C–H), III (cyclopropene C–H):",
     ["II > I > III", "I > II > III", "III > II > I", "II > III > I"]),
    (77, "Which compound does NOT decolourize bromine water?",
     ["Cyclohexane", "Phenol", "Styrene", "Aniline"]),
    (78, "Major product: PhCOCH₂CH₂CN + (i) excess CH₃MgBr, (ii) H₃O⁺ →",
     ["Ph-cycle with CH₃, OH, CN", "Ph–C(CH₃)(OH)–CH₂CH₂–C(CH₃)=O", "Ph–C(OH)(CH₃)–CH₂–C(CH₃)₂–OH", "Ph–CO–CH₂–CH₂–CO–CH₃"]),
    (79, "Aqueous solution with highest boiling point:",
     ["0.01 M Urea", "0.01 M KNO₃", "0.01 M Na₂SO₄", "0.015 M C₆H₁₂O₆"]),
    (80, "Match: A. Haber process  B. Wacker oxidation  C. Wilkinson catalyst  D. Ziegler catalyst ↔ I. Fe  II. PdCl₂  III. [(PPh₃)₃RhCl]  IV. TiCl₄ + Al(CH₃)₃",
     ["A-I, B-II, C-IV, D-III", "A-II, B-III, C-I, D-IV", "A-I, B-II, C-III, D-IV", "A-I, B-IV, C-III, D-II"]),
    (81, "5 mol of liquid X + 10 mol of liquid Y has vapour pressure 70 torr. Pure X = 63 torr, pure Y = 78 torr. Which is true about the solution?",
     ["Positive deviation", "Negative deviation", "Ideal", "Volume > sum of individual volumes"]),
    (82, "Sugar X: A. Found in honey. B. Keto sugar. C. Exists in α/β anomers. D. Laevorotatory. X is:",
     ["D-Glucose", "D-Fructose", "Maltose", "Sucrose"]),
    (83, "Reagent for the conversion: PhCOOCH₃ → PhCHO",
     ["(i) LiAlH₄, (ii) H⁺/H₂O", "(i) AlH(iBu)₂, (ii) H₂O", "(i) NaBH₄, (ii) H⁺/H₂O", "(i) H₂/Pd-BaSO₄"]),
    (84, "Assertion: 1-iodobutane undergoes SN2 faster than 1-chlorobutane. Reason: Iodine is a better leaving group due to its larger size.",
     ["Both A and R true; R is correct explanation", "Both A and R true; R is not correct explanation", "A true, R false", "A false, R true"]),
    (85, "Standard heat of formation of Ba²⁺ in kcal/mol [given ΔH°_f(SO₄²⁻ aq) = −216, ΔH°_cryst(BaSO₄) = −4.5, ΔH°_f(BaSO₄ s) = −349]:",
     ["−128.5", "−133.0", "+133.0", "+220.5"]),
    (86, "Total possible isomers (structural + stereo) of cyclic ethers C₄H₈O:",
     ["6", "8", "10", "11"]),
    (87, "Identify correct orders: A. H₂O > NH₃ > CHCl₃ (dipole moment)  B. XeF₄ > XeO₃ > XeF₂ (lone pairs on central atom)  C. O–H > C–H > N–O (bond length)  D. N₂ > O₂ > H₂ (bond enthalpy)",
     ["A, D only", "B, D only", "A, C only", "B, C only"]),
    (88, "Higher yield of NO in N₂ + O₂ ⇌ 2 NO (ΔH = +180.7 kJ/mol) at: A. higher T  B. lower T  C. higher [N₂]  D. higher [O₂]",
     ["A, D only", "B, C only", "B, C, D only", "A, C, D only"]),
    (89, "Rate constant 0.03 s⁻¹. Time for 7.2 mol/L to drop to 0.9 mol/L (log 2 = 0.301):",
     ["69.3 s", "23.1 s", "210 s", "21.0 s"]),
    (90, "Which reaction does NOT belong to Lassaigne's test?",
     ["Na + C + N → NaCN", "2 Na + S → Na₂S", "Na + X → NaX", "2 CuO + C → 2 Cu + CO₂"]),

    # ── BIOLOGY (Q91–180) ──
    (91, "Complex II of mitochondrial ETC is also known as:",
     ["Cytochrome bc₁", "Succinate dehydrogenase", "Cytochrome c oxidase", "NADH dehydrogenase"]),
    (92, "PCR amplifies DNA following the equation:",
     ["N²", "2ⁿ", "2n + 1", "2N²"]),
    (93, "Potential drawbacks in adoption of IVF: A. High fatality risk to mother  B. Expensive instruments and reagents  C. Husband/wife necessary as donors  D. Less adoption of orphans  E. Not available in India  F. Possibility that early embryo does not survive",
     ["B, D, F only", "A, C, D, F only", "A, B, C, D only", "A, B, C, E, F only"]),
    (94, "Blood vessel that carries deoxygenated blood from body to heart in a frog:",
     ["Aorta", "Pulmonary artery", "Pulmonary vein", "Vena cava"]),
    (95, "Reductionist Biology refers to:",
     ["Physico-chemical approach", "Physiological approach", "Chemical approach", "Behavioural approach"]),
    (96, "Statement I: In RNA world, RNA was the first genetic material; reactive and unstable. Statement II: DNA evolved from RNA, more stable; complementary strands resist changes via repair mechanisms.",
     ["Both I and II correct", "Both I and II incorrect", "I correct, II incorrect", "I incorrect, II correct"]),
    (97, "Epiphytes growing on a mango branch is an example of:",
     ["Commensalism", "Mutualism", "Predation", "Amensalism"]),
    (98, "Choose correct: A. Eukaryotic ribosomes 80S, prokaryotic 70S. B. Each ribosome has two sub-units. C. 80S = 60S + 40S; 70S = 50S + 30S. D. 80S = 60S + 20S; 70S = 50S + 20S. E. 80S = 60S + 30S; 70S = 50S + 30S.",
     ["A, B, C true", "A, B, D true", "A, B, E true", "B, D, E true"]),
    (99, "Example of ex-situ conservation:",
     ["National Park", "Wildlife Sanctuary", "Zoos and botanical gardens", "Protected areas"]),
    (100, "Statement I: Solar energy is the primary source of energy in an ecosystem. Statement II: The rate of production of organic matter during photosynthesis is called net primary productivity (NPP).",
     ["Both I and II correct", "Both I and II incorrect", "I correct, II incorrect", "I incorrect, II correct"]),
    (101, "Match: A. Emphysema  B. Angina Pectoris  C. Glomerulonephritis  D. Tetany ↔ I. Spasms (low Ca²⁺)  II. Damaged alveolar walls  III. Acute chest pain (low O₂ to heart)  IV. Inflammation of glomeruli",
     ["A-III, B-I, C-IV, D-II", "A-III, B-I, C-II, D-IV", "A-II, B-IV, C-III, D-I", "A-II, B-III, C-IV, D-I"]),
    (102, "A: Wind/water-pollinated flowers are not very colourful and lack nectar. R: They produce enormous amounts of pollen.",
     ["A and R true; R is correct explanation", "A and R true; R is NOT correct explanation", "A true, R false", "A false, R true"]),
    (103, "Non-distilled alcoholic beverage produced by yeast:",
     ["Whisky", "Brandy", "Beer", "Rum"]),
    (104, "Statement I: In a floral formula, ⊕ stands for zygomorphic and G stands for inferior ovary. Statement II: ⊕ stands for actinomorphic; G stands for superior ovary.",
     ["Both I and II correct", "Both I and II incorrect", "I correct, II incorrect", "I incorrect, II correct"]),
    (105, "Streptokinase from Streptococcus is used for:",
     ["Curd production", "Ethanol production", "Liver disease treatment", "Removing clots from blood vessels"]),
    (106, "Chromosome with the highest number of genes in human genome:",
     ["Chromosome X", "Chromosome Y", "Chromosome 1", "Chromosome 10"]),
    (107, "Location of the male frog's copulatory pad:",
     ["First and second digit of fore limb", "First digit of hind limb", "Second digit of fore limb", "First digit of fore limb"]),
    (108, "Phytohormone that promotes nutrient mobilisation, delaying leaf senescence:",
     ["Ethylene", "Abscisic acid", "Gibberellin", "Cytokinin"]),
    (109, "An animal has a body cavity with mesoderm only on the body wall, not surrounding the alimentary canal. Possible coelome:",
     ["Acoelomate", "Pseudocoelomate", "Schizocoelomate", "Spongocoelomate"]),
    (110, "Match: A. Head  B. Middle piece  C. Acrosome  D. Tail ↔ I. Enzymes  II. Sperm motility  III. Energy  IV. Genetic material",
     ["A-IV, B-III, C-I, D-II", "A-IV, B-III, C-II, D-I", "A-III, B-IV, C-II, D-I", "A-III, B-II, C-I, D-IV"]),
    (111, "Correct sequence in pteridophyte life cycle: A. Prothallus stage  B. Meiosis in spore mother cells  C. Fertilisation  D. Formation of archegonia and antheridia  E. Transfer of antherozoids to archegonia in water",
     ["B, A, D, E, C", "B, A, E, C, D", "D, E, C, A, B", "E, D, C, B, A"]),
    (112, "Cardiac activities are regulated by: A. Nodal tissue  B. A neural centre in medulla oblongata  C. Adrenal medullary hormones  D. Adrenal cortical hormones",
     ["A, B and C only", "A, B, C and D", "A, C and D only", "A, B and D only"]),
    (113, "Which organism cannot fix nitrogen? A. Azotobacter  B. Oscillatoria  C. Anabaena  D. Volvox  E. Nostoc",
     ["A only", "D only", "B only", "E only"]),
    (114, "Statement I: tRNA and rRNA do not interact with mRNA. Statement II: RNAi takes place in all eukaryotes as cellular defence.",
     ["Both I and II correct", "Both I and II incorrect", "I correct, II incorrect", "I incorrect, II correct"]),
    (115, "In a plasmid (BamHI, TetR, Ori, EcoRI, ampR, β-galactosidase) — alien DNA inserted at EcoRI. Strategy to select recombinants:",
     ["Use ampicillin & tetracycline plate", "Blue colonies are selected", "White colonies are selected", "Blue colonies grown on ampicillin plates can be selected"]),
    (116, "Genetically engineered organism used by Eli Lilly to prepare human insulin:",
     ["Bacterium", "Yeast", "Virus", "Phage"]),
    (117, "Class of enzyme that catalyzes: S–G + S# → S + S#–G",
     ["Hydrolase", "Lyase", "Transferase", "Ligase"]),
    (118, "Which is NOT correct about monocot stem?",
     ["Hypodermis is parenchymatous", "Vascular bundles are scattered", "Vascular bundles are conjoint and closed", "Phloem parenchyma is absent"]),
    (119, "Sequence in bryophyte life cycle: A. Fusion of antherozoid with egg  B. Attachment of gametophyte to substratum  C. Reduction division for haploid spores  D. Formation of sporophyte  E. Release of antherozoids into water",
     ["D, E, A, C, B", "B, E, A, C, D", "B, E, A, D, C", "D, E, A, B, C"]),
    (120, "Which are correct: A. CT/MRI detect cancers of internal organs.  B. Chemotherapeutics kill non-cancerous cells.  C. α-interferon activates immune system to destroy tumour.  D. Chemotherapeutic drugs are biological response modifiers.  E. In leukaemia, blood cell counts are decreased.",
     ["B and D only", "D and E only", "C and D only", "A and C only"]),
    (121, "Match: A. Centromere  B. Cilium  C. Cristae  D. Cell membrane ↔ I. Mitochondrion  II. Cell division  III. Cell movement  IV. Phospholipid bilayer",
     ["A-I, B-II, C-III, D-IV", "A-II, B-I, C-IV, D-III", "A-IV, B-II, C-III, D-I", "A-II, B-III, C-I, D-IV"]),
    (122, "Match: A. Chlorophyll a  B. Chlorophyll b  C. Xanthophylls  D. Carotenoids ↔ I. Yellow-green  II. Yellow  III. Blue-green  IV. Yellow to yellow-orange",
     ["A-III, B-IV, C-II, D-I", "A-III, B-I, C-II, D-IV", "A-I, B-II, C-IV, D-III", "A-I, B-IV, C-III, D-II"]),
    (123, "Correct statements: A. In human pregnancy, major organ systems form by end of 12 weeks.  B. By end of 8 weeks.  C. Heart forms after one month of gestation.  D. Limbs and digits develop by end of 2nd month.  E. Hair appears in 5th month.",
     ["A and E only", "B and C only", "B, C, D and E only", "A, C, D and E only"]),
    (124, "Outer covering of endosperm separates the embryo by a protein-rich layer called:",
     ["Coleoptile", "Coleorhiza", "Integument", "Aleurone layer"]),
    (125, "Which diagram is correct for proximal (P) and distal (D) tubule transport of nephron?",
     ["P: HCO₃⁻ in, NaCl in, H⁺/NH₃ out; D: NaCl in, H₂O in, HCO₃⁻ out, K⁺/H⁺ out (option 1)",
      "P: HCO₃⁻/NaCl in, H₂O in, H⁺/NH₃ out; D: NaCl/H₂O in, HCO₃⁻ out, K⁺/H⁺ out (option 2)",
      "P: HCO₃⁻ in, NaCl in, H₂O in, H⁺/NH₃ out; D: H₂O in, HCO₃⁻ out, NaCl/H⁺ out (option 3)",
      "P: NaCl/HCO₃⁻ in, H⁺/H₂O out; D: NaCl in, NH₃ out, K⁺/H₂O out (option 4)"]),
    (126, "Part of bioreactor used as a foam breaker (A=culture port, B=foam breaker outlet, C=impeller area, D=outlet at bottom):",
     ["A", "B", "D", "C"]),
    (127, "A: A typical unfertilized angiosperm embryo sac at maturity is 8-nucleate and 7-celled. R: The egg apparatus has 2 polar nuclei.",
     ["A and R true; R is correct explanation", "A and R true; R NOT correct explanation", "A true, R false", "A false, R true"]),
    (128, "Specialized membranous structure in prokaryotic cell that helps in cell wall formation, DNA replication and respiration:",
     ["Mesosome", "Chromatophores", "Cristae", "Endoplasmic Reticulum"]),
    (129, "Post-transcriptional events in eukaryotes: A. Transport of pre-mRNA to cytoplasm prior to splicing  B. Removal of introns and joining of exons  C. Methyl group addition at 5′ end of hnRNA  D. Adenine addition at 3′ end  E. Base pairing of two complementary RNAs",
     ["A, B, C only", "B, C, D only", "B, C, E only", "C, D, E only"]),
    (130, "Pattern of inheritance for polygenic traits:",
     ["Mendelian", "Non-Mendelian", "Autosomal dominant", "X-linked recessive"]),
    (131, "Which enzyme contains haem as the prosthetic group?",
     ["RuBisCo", "Carbonic anhydrase", "Succinate dehydrogenase", "Catalase"]),
    (132, "Increasing order of body complexity (Whittaker): A. Multicellular heterotrophs (chitin)  B. Heterotrophs with tissue/organ/organ-system  C. Prokaryotes (polysaccharide + amino acids)  D. Eukaryotic autotrophs (tissue/organ)  E. Eukaryotes with cellular body organization",
     ["A, C, E, B, D", "C, E, A, D, B", "A, C, E, D, B", "C, E, A, B, D"]),
    (133, "Father of Ecology in India:",
     ["S. R. Kashyap", "Ramdeo Misra", "Ram Udar", "Birbal Sahni"]),
    (134, "Match: A. Hershey & Chase  B. Euchromatin  C. Frederick Griffith  D. Heterochromatin ↔ I. Streptococcus pneumoniae  II. Densely packed, dark-stained  III. Loosely packed, light-stained  IV. DNA as genetic material confirmation",
     ["A-II, B-IV, C-I, D-III", "A-IV, B-II, C-I, D-III", "A-IV, B-III, C-I, D-II", "A-III, B-II, C-IV, D-I"]),
    (135, "Neoplastic cell characteristics: A. Mass of proliferating cells  B. Rapid growth  C. Invasion and damage to surrounding tissue  D. Confined to original location",
     ["A, B only", "A, B, C only", "A, B, D only", "B, C, D only"]),
    (136, "Statement I: DNA fragments from gel electrophoresis can be used to make recombinant DNA. Statement II: Smaller fragments observed near anode; larger near wells.",
     ["Both I and II correct", "Both I and II incorrect", "I correct, II incorrect", "I incorrect, II correct"]),
    (137, "Match: A. Adenosine  B. Adenylic acid  C. Adenine  D. Alanine ↔ I. Nitrogen base  II. Nucleotide  III. Nucleoside  IV. Amino acid",
     ["A-III, B-IV, C-II, D-I", "A-III, B-II, C-IV, D-I", "A-III, B-II, C-I, D-IV", "A-II, B-III, C-I, D-IV"]),
    (138, "Consider: A. Reductive division for human female gametogenesis starts earlier than male.  B. Gap between meiotic-I and II is much shorter for males.  C. The first polar body is associated with the formation of the primary oocyte.  D. LH surge leads to disintegration of the endometrium.",
     ["A and B true", "A and C true", "B and D true", "B and C true"]),
    (139, "All living members of class Cyclostomata are:",
     ["Free living", "Endoparasite", "Symbiotic", "Ectoparasite"]),
    (140, "A: Primary function of Golgi is to package materials made by ER and deliver them. R: Vesicles from ER fuse with cis face of Golgi; modified and released from trans face.",
     ["Both A and R true; R is correct explanation", "Both A and R true; R is not correct explanation", "A true, R false", "A false, R true"]),
    (141, "Match: A. Scutellum  B. Non-albuminous seed  C. Epiblast  D. Perisperm ↔ I. Persistent nucellus  II. Cotyledon of monocot seed  III. Groundnut  IV. Rudimentary cotyledon",
     ["A-II, B-III, C-IV, D-I", "A-IV, B-III, C-II, D-I", "A-IV, B-III, C-I, D-II", "A-II, B-IV, C-III, D-I"]),
    (142, "A: All vertebrates are chordates but all chordates are not vertebrates. R: Members of subphylum Vertebrata possess notochord during embryonic period; replaced by vertebral column in adults.",
     ["Both A and R true; R is correct explanation", "Both A and R true; R is not correct explanation", "A true, R false", "A false, R true"]),
    (143, "Which is NOT correct about an antibody?",
     ["Each antibody has 2 light and 2 heavy chains", "Heavy and light chains held by disulfide bonds", "Antigen binding site is at C-terminal", "Constant regions of heavy & light chains are at C-terminus"]),
    (144, "Silencing of specific mRNA via RNAi is possible because of:",
     ["Complementary dsRNA", "Inhibitory ssRNA", "Complementary tRNA", "Non-complementary ssRNA"]),
    (145, "Genes R and Y assort independently. RRYY × rryy gives F2 phenotypic ratio:",
     ["1 : 2 : 1", "3 : 1", "9 : 3 : 3 : 1", "9 : 7"]),
    (146, "Histones are enriched with:",
     ["Lysine & Arginine", "Leucine & Lysine", "Phenylalanine & Leucine", "Phenylalanine & Arginine"]),
    (147, "First menstruation is called:",
     ["Menopause", "Menarche", "Diapause", "Ovulation"]),
    (148, "Match: A. Heart  B. Kidney  C. Gastro-intestinal tract  D. Adrenal Cortex ↔ I. Erythropoietin  II. Aldosterone  III. ANF  IV. Secretin",
     ["A-II, B-I, C-III, D-IV", "A-IV, B-III, C-II, D-I", "A-I, B-III, C-IV, D-II", "A-III, B-I, C-IV, D-II"]),
    (149, "Protein portion of an enzyme is called:",
     ["Cofactor", "Coenzyme", "Apoenzyme", "Prosthetic group"]),
    (150, "Unit of productivity of an ecosystem:",
     ["g m⁻²", "kCal m⁻²", "kCal m⁻³", "(kCal m⁻²) yr⁻¹"]),
    (151, "Sweet potato and potato represent which evolution?",
     ["Analogy, convergent", "Homology, divergent", "Homology, convergent", "Analogy, divergent"]),
    (152, "From the pedigree of an X-linked recessive disease, probability that an F3 child is unaffected and a carrier (carries mutation in one allele):",
     ["1/4", "1/2", "1/8", "Zero"]),
    (153, "A: Cells of tapetum possess dense cytoplasm and have more than one nucleus. R: Multiple nuclei in tapetum increase efficiency of nourishing developing microspore mother cells.",
     ["A and R true; R correct explanation", "A and R true; R not correct explanation", "A true, R false", "A false, R true"]),
    (154, "Meiotic and mitotic divisions to develop a mature female gametophyte from megaspore mother cell in angiosperm:",
     ["2 Meiosis and 3 Mitosis", "1 Meiosis and 2 Mitosis", "1 Meiosis and 3 Mitosis", "No Meiosis and 2 Mitosis"]),
    (155, "Example of a zygomorphic flower:",
     ["Petunia", "Datura", "Pea", "Chilli"]),
    (156, "After maturation, lymphocytes migrate to secondary lymphoid organs/tissues like: A. thymus  B. bone marrow  C. spleen  D. lymph nodes  E. Peyer's patches",
     ["B, C, D only", "A, B, C only", "E, A, B only", "C, D, E only"]),
    (157, "Statement I: Fig fruit is non-vegetarian as it has enclosed fig wasps. Statement II: Fig wasp and fig tree show mutualism.",
     ["Both I and II correct", "Both I and II incorrect", "I correct, II incorrect", "I incorrect, II correct"]),
    (158, "Main function of spindle fibers during mitosis:",
     ["Separate chromosomes", "Synthesize new DNA", "Repair damaged DNA", "Regulate cell growth"]),
    (159, "Characteristic feature of gymnosperms:",
     ["Seeds enclosed in fruits", "Seeds are naked", "Seeds are absent", "Have flowers for reproduction"]),
    (160, "Functions of adrenal medullary hormones: A. Pupillary constriction  B. Hyperglycemic  C. Piloerection  D. Increases strength of heart contraction",
     ["C and D only", "B, C and D only", "A, C and D only", "D only"]),
    (161, "Why is insulin not given orally to diabetics?",
     ["Strong immune response", "Digested in GI tract", "Structural variation", "Bioavailability increases"]),
    (162, "Match: A. Pteridophyte  B. Bryophyte  C. Angiosperm  D. Gymnosperm ↔ I. Salvia  II. Ginkgo  III. Polytrichum  IV. Salvinia",
     ["A-III, B-IV, C-II, D-I", "A-IV, B-III, C-I, D-II", "A-III, B-IV, C-I, D-II", "A-IV, B-III, C-II, D-I"]),
    (163, "Who proposed that the genetic code for amino acids is made of three nucleotides?",
     ["George Gamow", "Francis Crick", "Jacque Monod", "Franklin Stahl"]),
    (164, "Match: A. The Evil Quartet  B. Ex situ conservation  C. Lantana camara  D. Dodo ↔ I. Cryopreservation  II. Alien species invasion  III. Causes of biodiversity loss  IV. Extinction",
     ["A-III, B-II, C-I, D-IV", "A-III, B-I, C-II, D-IV", "A-III, B-IV, C-II, D-I", "A-III, B-II, C-IV, D-I"]),
    (165, "Hormone released from the pituitary but synthesized in the hypothalamus:",
     ["LH", "ADH", "FSH", "ACTH"]),
    (166, "Role of water vascular system in Echinoderms: A. Respiration & Locomotion  B. Excretion & Locomotion  C. Capture & transport of food  D. Digestion & Respiration  E. Digestion & Excretion",
     ["A and B only", "A and C only", "B and C only", "B, D and E only"]),
    (167, "Type of immunity present at birth and non-specific:",
     ["Acquired", "Innate", "Cell-mediated", "Humoral"]),
    (168, "In bryophytes, gemmae help in:",
     ["Sexual reproduction", "Asexual reproduction", "Nutrient absorption", "Gaseous exchange"]),
    (169, "In frog, the renal portal system links:",
     ["Liver and intestine", "Liver and kidney", "Kidney and intestine", "Kidney and lower part of body"]),
    (170, "Statement I: In ecosystems, energy flow from producers to consumers is unidirectional. Statement II: Ecosystems are exempted from the 2nd law of thermodynamics.",
     ["Both I and II correct", "Both I and II incorrect", "I correct, II incorrect", "I incorrect, II correct"]),
    (171, "Which is true about RuBisCO?",
     ["Active only in dark", "Higher affinity for O₂ than CO₂", "Involved in photolysis of water", "Catalyzes carboxylation of RuBP"]),
    (172, "Which enzyme(s) is/are NOT essential for gene cloning? A. Restriction enzymes  B. DNA ligase  C. DNA mutase  D. DNA recombinase  E. DNA polymerase",
     ["C and D only", "A and B only", "D and E only", "B and C only"]),
    (173, "True statements about plant growth: A. Parthenocarpy can be induced by auxins.  B. PGRs can promote and inhibit growth.  C. Dedifferentiation is prerequisite for redifferentiation.  D. ABA is a growth promoter.  E. Apical dominance promotes lateral bud growth.",
     ["A, B, C only", "A, C, E only", "A, D, E only", "B, D, E only"]),
    (174, "Factor important for termination of transcription:",
     ["α (alpha)", "σ (sigma)", "ρ (rho)", "γ (gamma)"]),
    (175, "Frogs respire in water by skin and buccal cavity, and on land by skin, buccal cavity and lungs.",
     ["True for water, false for land", "True for both", "False for water, true for land", "False for both"]),
    (176, "Twins (one boy, one girl) born to a family. Which must be true?",
     ["Monozygotic twins", "Fraternal twins", "Conceived through IVF", "75% identical genetic content"]),
    (177, "Which microbes are NOT involved in preparation of household products? A. Aspergillus niger  B. Lactobacillus  C. Trichoderma polysporum  D. Saccharomyces cerevisiae  E. Propionibacterium sharmanii",
     ["A and B only", "A and C only", "C and D only", "C and E only"]),
    (178, "Match: A. Progesterone  B. Relaxin  C. Melanocyte stimulating hormone  D. Catecholamines ↔ I. Pars intermedia  II. Ovary  III. Adrenal Medulla  IV. Corpus luteum",
     ["A-IV, B-II, C-I, D-III", "A-IV, B-II, C-III, D-I", "A-II, B-IV, C-I, D-III", "A-III, B-II, C-IV, D-I"]),
    (179, "Blue/white selectable markers: Statement I: Blue colonies have DNA insert and are recombinant. Statement II: Colonies without blue colour have insert and are recombinant.",
     ["Both I and II correct", "Both I and II incorrect", "I correct, II incorrect", "I incorrect, II correct"]),
    (180, "Verhulst-Pearl Logistic Growth equation:",
     ["dN/dt = r((K − N)/K)", "dN/dt = rN((K − N)/K)", "dN/dt = rN((N − K)/N)", "dN/dt = N((r − K)/K)"]),
]

# ── ANSWER KEY (Q# → option index 1-4) — official ────────────────────
ANSWER_KEY = {
    1: 2, 2: 2, 3: 2, 4: 4, 5: 2, 6: 2, 7: 4, 8: 4, 9: 1, 10: 1,
    11: 4, 12: 1, 13: 3, 14: 3, 15: 2, 16: 2, 17: 4, 18: 2, 19: 3, 20: 1,
    21: 4, 22: 2, 23: 2, 24: 3, 25: 3, 26: 3, 27: 1, 28: 4, 29: 2, 30: 3,
    31: 1, 32: 2, 33: 3, 34: 2, 35: 2, 36: 2, 37: 3, 38: 1, 39: 3, 40: 2,
    41: 2, 42: 3, 43: 3, 44: 4, 45: 2, 46: 4, 47: 2, 48: 2, 49: 1, 50: 1,
    51: 3, 52: 3, 53: 2, 54: 4, 55: 1, 56: 4, 57: 2, 58: 4, 59: 4, 60: 4,
    61: 3, 62: 2, 63: 1, 64: 1, 65: 1, 66: 2, 67: 3, 68: 2, 69: 2, 70: 3,
    71: 3, 72: 1, 73: 3, 74: 1, 75: 4, 76: 1, 77: 1, 78: 2, 79: 3, 80: 3,
    81: 2, 82: 2, 83: 2, 84: 1, 85: 1, 86: 3, 87: 1, 88: 4, 89: 1, 90: 4,
    91: 2, 92: 2, 93: 1, 94: 4, 95: 1, 96: 1, 97: 1, 98: 1, 99: 3, 100: 3,
    101: 4, 102: 2, 103: 3, 104: 4, 105: 4, 106: 3, 107: 4, 108: 4, 109: 2, 110: 1,
    111: 1, 112: 1, 113: 2, 114: 4, 115: 3, 116: 1, 117: 3, 118: 1, 119: 3, 120: 4,
    121: 4, 122: 2, 123: 4, 124: 4, 125: 2, 126: 4, 127: 3, 128: 1, 129: 2, 130: 2,
    131: 4, 132: 2, 133: 2, 134: 3, 135: 2, 136: 1, 137: 3, 138: 1, 139: 4, 140: 1,
    141: 1, 142: 1, 143: 3, 144: 1, 145: 3, 146: 1, 147: 2, 148: 4, 149: 3, 150: 4,
    151: 1, 152: 1, 153: 3, 154: 3, 155: 3, 156: 4, 157: 2, 158: 1, 159: 2, 160: 2,
    161: 2, 162: 2, 163: 1, 164: 2, 165: 2, 166: 2, 167: 2, 168: 2, 169: 4, 170: 3,
    171: 4, 172: 1, 173: 1, 174: 3, 175: 3, 176: 2, 177: 2, 178: 1, 179: 4, 180: 2,
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


def section_header(label):
    return Paragraph(label, section_style)


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
    # Header band
    canvas.setFillColor(colors.HexColor('#047857'))
    canvas.rect(0, A4[1] - 1.4 * cm, A4[0], 1.4 * cm, stroke=0, fill=1)
    canvas.setFillColor(colors.white)
    canvas.setFont('Helvetica-Bold', 11)
    canvas.drawString(1.5 * cm, A4[1] - 0.95 * cm, 'NEET (UG) 2025 — Previous Year Question Paper')
    canvas.setFont('Helvetica', 9)
    canvas.drawRightString(A4[0] - 1.5 * cm, A4[1] - 0.95 * cm, 'Date: 04-05-2025  |  Code 45')
    # Footer
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
        title='NEET (UG) 2025 — Previous Year Question Paper',
        author='VAZHIKATTI'
    )

    story = []

    # ── Cover ──
    story.append(Spacer(1, 1.2 * cm))
    story.append(Paragraph('NEET (UG) 2025', title_style))
    story.append(Paragraph(
        'National Eligibility cum Entrance Test (Undergraduate)<br/>'
        'Date: <b>04 May 2025</b> &nbsp;|&nbsp; Test Booklet Code: <b>45</b><br/>'
        'Duration: 3 hours &nbsp;|&nbsp; 180 MCQs &nbsp;|&nbsp; Maximum Marks: 720',
        subtitle_style))

    # Instructions box
    story.append(Spacer(1, 0.3 * cm))
    story.append(Paragraph('<b>Important Instructions:</b>', qno_style))
    story.append(Paragraph(
        '1. The test contains <b>180</b> multiple-choice questions from <b>Physics, Chemistry, and Biology (Botany &amp; Zoology)</b>. '
        'All questions are compulsory.<br/>'
        '2. Each correct response: <b>+4 marks</b>. Each incorrect response: <b>−1 mark</b>. Maximum marks: <b>720</b>.<br/>'
        '3. Use a Blue/Black ballpoint pen only. Use of an electronic/manual calculator is prohibited.<br/>'
        '4. The official answer key is provided at the end of this booklet.', instr_style))
    story.append(Spacer(1, 0.4 * cm))

    story.append(Paragraph(
        '<i>Disclaimer: This document is a faithful reproduction of the question paper for educational and revision purposes. '
        'For the official paper and answer key, please refer to NTA / NMC.</i>', note_style))
    story.append(PageBreak())

    # ── Sections ──
    physics = [q for q in QUESTIONS if 1 <= q[0] <= 46]
    chemistry = [q for q in QUESTIONS if 47 <= q[0] <= 90]
    biology = [q for q in QUESTIONS if 91 <= q[0] <= 180]

    story.append(section_header(f'PHYSICS &nbsp; (Questions 1–{len(physics)})'))
    for q_no, q_text, opts in physics:
        story.append(render_question(q_no, q_text, opts))
    story.append(PageBreak())

    story.append(section_header(f'CHEMISTRY &nbsp; (Questions 47–{47 + len(chemistry) - 1})'))
    for q_no, q_text, opts in chemistry:
        story.append(render_question(q_no, q_text, opts))
    story.append(PageBreak())

    story.append(section_header(f'BIOLOGY (Botany &amp; Zoology) &nbsp; (Questions 91–{91 + len(biology) - 1})'))
    for q_no, q_text, opts in biology:
        story.append(render_question(q_no, q_text, opts))
    story.append(PageBreak())

    # ── Answer Key ──
    story.append(Paragraph('Official Answer Key — NEET (UG) 2025', ak_head_style))
    story.append(Paragraph('All answers are referenced to <b>Test Booklet Code 45</b> as released by the conducting authority.', note_style))
    story.append(Spacer(1, 0.3 * cm))

    # 4-column answer key table
    rows = []
    header = ['Q. No.', 'Ans', 'Q. No.', 'Ans', 'Q. No.', 'Ans', 'Q. No.', 'Ans']
    rows.append(header)

    nums = sorted(ANSWER_KEY.keys())
    per_col = 45  # 4 columns × 45 rows = 180
    for i in range(per_col):
        row = []
        for col in range(4):
            idx = col * per_col + i
            if idx < len(nums):
                qn = nums[idx]
                row.extend([str(qn), f'({ANSWER_KEY[qn]})'])
            else:
                row.extend(['', ''])
        rows.append(row)

    table = Table(rows, colWidths=[1.7 * cm, 1.2 * cm] * 4)
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#047857')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('FONTSIZE', (0, 1), (-1, -1), 9.5),
        ('GRID', (0, 0), (-1, -1), 0.4, colors.HexColor('#cbd5e1')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f1f5f9')]),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(table)

    story.append(Spacer(1, 0.6 * cm))
    story.append(Paragraph(
        '<b>Marking Scheme:</b> Correct: +4 &nbsp;|&nbsp; Incorrect: −1 &nbsp;|&nbsp; Unattempted: 0', note_style))
    story.append(Paragraph(
        '<b>Note:</b> For Q63, both options (1) and (2) were considered correct as per the official key.', note_style))

    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    print(f'✓ Built: {OUT}')
    print(f'  File size: {os.path.getsize(OUT) / 1024:.1f} KB')


if __name__ == '__main__':
    build()
