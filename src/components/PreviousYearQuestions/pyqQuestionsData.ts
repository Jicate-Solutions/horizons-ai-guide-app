// PYQ Questions Database
// Key format: "examId::subject::topicName"

export interface PYQQuestion {
  id: number;
  year: number;
  exam: string;
  question: string;
  options: string[];
  answer: number; // 0-indexed
  topic: string;
}

export const pyqQuestions: Record<string, PYQQuestion[]> = {

  // ===== JEE MAIN — PHYSICS — Units & Measurements =====
  "jee-main::Physics::Units & Measurements": [
    {
      id: 1, year: 2019, exam: "JEE Main 2019",
      question: "The number of significant figures in 0.005060 is:",
      options: ["3", "4", "5", "6"],
      answer: 1,
      topic: "Units & Measurements",
    },
    {
      id: 2, year: 2020, exam: "JEE Main 2020",
      question: "If percentage errors in mass and velocity are 2% and 3% respectively, then the maximum percentage error in kinetic energy ½mv² is:",
      options: ["5%", "7%", "8%", "10%"],
      answer: 2,
      topic: "Units & Measurements",
    },
    {
      id: 3, year: 2018, exam: "JEE Main 2018",
      question: "The dimensional formula of Planck's constant (h) is:",
      options: ["[ML²T⁻¹]", "[ML²T⁻²]", "[M⁰L²T⁻¹]", "[MLT⁻¹]"],
      answer: 0,
      topic: "Units & Measurements",
    },
    {
      id: 4, year: 2021, exam: "JEE Main 2021",
      question: "A Vernier caliper has 10 vernier divisions equal to 9 main scale divisions. If 1 MSD = 1 mm, the least count is:",
      options: ["0.1 mm", "0.01 mm", "0.9 mm", "0.09 mm"],
      answer: 0,
      topic: "Units & Measurements",
    },
    {
      id: 5, year: 2017, exam: "JEE Main 2017",
      question: "If a physical quantity is measured as (5.0 ± 0.2) m, the percentage error is:",
      options: ["2%", "4%", "5%", "10%"],
      answer: 1,
      topic: "Units & Measurements",
    },
    {
      id: 6, year: 2022, exam: "JEE Main 2022",
      question: "The dimensional formula of force is:",
      options: ["[MLT⁻¹]", "[ML²T⁻²]", "[MLT⁻²]", "[M⁰LT⁻²]"],
      answer: 2,
      topic: "Units & Measurements",
    },
    {
      id: 7, year: 2016, exam: "JEE Main 2016",
      question: "Which of the following is a dimensionless quantity?",
      options: ["Strain", "Stress", "Momentum", "Energy"],
      answer: 0,
      topic: "Units & Measurements",
    },
    {
      id: 8, year: 2020, exam: "JEE Main 2020",
      question: "The number of significant figures in 2.300 × 10³ is:",
      options: ["2", "3", "4", "5"],
      answer: 2,
      topic: "Units & Measurements",
    },
    {
      id: 9, year: 2015, exam: "JEE Main 2015",
      question: "Which of the following equations is dimensionally correct?",
      options: ["v = u + at²", "s = ut + ½at²", "F = ma²", "E = mv"],
      answer: 1,
      topic: "Units & Measurements",
    },
    {
      id: 10, year: 2021, exam: "JEE Main 2021",
      question: "If Y = a²b/c³, then percentage error in Y is: (Given percentage errors in a, b, c are Δa, Δb, Δc)",
      options: ["2Δa + Δb + 3Δc", "2Δa + Δb − 3Δc", "2Δa + Δb + Δc", "Δa + Δb + 3Δc"],
      answer: 0,
      topic: "Units & Measurements",
    },
    {
      id: 11, year: 2019, exam: "JEE Main 2019",
      question: "The SI unit of pressure is:",
      options: ["N/m", "N·m", "N/m²", "kg/m"],
      answer: 2,
      topic: "Units & Measurements",
    },
    {
      id: 12, year: 2018, exam: "JEE Main 2018",
      question: "The dimensional formula of angular momentum is:",
      options: ["[MLT⁻¹]", "[ML²T⁻¹]", "[ML²T⁻²]", "[M⁰L²T⁻¹]"],
      answer: 1,
      topic: "Units & Measurements",
    },
    {
      id: 13, year: 2022, exam: "JEE Main 2022",
      question: "The number of significant figures in 0.0200 is:",
      options: ["2", "3", "4", "5"],
      answer: 1,
      topic: "Units & Measurements",
    },
    {
      id: 14, year: 2017, exam: "JEE Main 2017",
      question: "If length, breadth and height have percentage errors 1%, 2% and 3% respectively, the maximum percentage error in volume is:",
      options: ["6%", "5%", "3%", "1%"],
      answer: 0,
      topic: "Units & Measurements",
    },
    {
      id: 15, year: 2020, exam: "JEE Main 2020",
      question: "Which of the following has dimensions of energy?",
      options: ["F × v", "F × d", "P × t⁻¹", "mv"],
      answer: 1,
      topic: "Units & Measurements",
    },
  ],

  // ===== NEET — PHYSICS — Physics and Measurement =====
  "neet::Physics::Physics and Measurement": [
    {
      id: 101, year: 2022, exam: "NEET 2022",
      question: "The dimensions [MLT⁻²A⁻²] belong to the:",
      options: ["Magnetic permeability", "Electric permittivity", "Magnetic flux", "Self-inductance"],
      answer: 0,
      topic: "Physics and Measurement",
    },
    {
      id: 102, year: 2020, exam: "NEET 2020",
      question: "Taking into account the significant figures, what is the value of 9.99 m − 0.0099 m?",
      options: ["9.98 m", "9.9 m", "9.980 m", "9.9801 m"],
      answer: 0,
      topic: "Physics and Measurement",
    },
    {
      id: 103, year: 2019, exam: "NEET 2019",
      question: "In an experiment, the percentage of error occurred in the measurement of physical quantities A, B, C, and D are 1%, 2%, 3%, and 4% respectively. Then the maximum percentage of error in the measurement X, where X = A²B^(1/2) / C^(1/3)D³, will be:",
      options: ["10%", "(3/13)%", "16%", "12%"],
      answer: 2,
      topic: "Physics and Measurement",
    },
    {
      id: 104, year: 2021, exam: "NEET 2021",
      question: "A screw gauge gives the following readings when used to measure the diameter of a wire: Main scale reading: 0 mm, Circular scale reading: 52 divisions. Given that 1 mm on main scale corresponds to 100 divisions on the circular scale. The diameter of the wire is:",
      options: ["0.52 cm", "0.052 cm", "0.26 cm", "0.026 cm"],
      answer: 1,
      topic: "Physics and Measurement",
    },
    {
      id: 105, year: 2023, exam: "NEET 2023",
      question: "If force (F), acceleration (A), and time (T) are chosen as the fundamental physical quantities, find the dimensions of energy.",
      options: ["[F][A][T]", "[F][A][T²]", "[F][A⁻¹][T]", "[F][A][T⁻¹]"],
      answer: 1,
      topic: "Physics and Measurement",
    },
    {
      id: 106, year: 2016, exam: "NEET 2016",
      question: "The unit of Stefan-Boltzmann constant is:",
      options: ["W m² K⁴", "W m⁻² K⁻⁴", "W m² K⁻⁴", "W m⁻² K⁴"],
      answer: 1,
      topic: "Physics and Measurement",
    },
    {
      id: 107, year: 2020, exam: "NEET 2020",
      question: "The dimensions of stress are:",
      options: ["[MLT⁻²]", "[ML²T⁻²]", "[ML⁻¹T⁻²]", "[ML⁰T⁻²]"],
      answer: 2,
      topic: "Physics and Measurement",
    },
    {
      id: 108, year: 2018, exam: "NEET 2018",
      question: "A student measured the diameter of a small steel ball using a screw gauge of least count 0.001 cm. The main scale reading is 5 mm and zero of circular scale division coincides with 25 divisions above the reference level. If screw gauge has a zero error of −0.004 cm, the correct diameter of the ball is:",
      options: ["0.521 cm", "0.525 cm", "0.053 cm", "0.529 cm"],
      answer: 3,
      topic: "Physics and Measurement",
    },
    {
      id: 109, year: 2013, exam: "NEET 2013",
      question: "The dimensional formula of Planck's constant (h) is:",
      options: ["[ML²T⁻²]", "[ML²T⁻¹]", "[MLT⁻¹]", "[ML²T⁻³]"],
      answer: 1,
      topic: "Physics and Measurement",
    },
    {
      id: 110, year: 2013, exam: "NEET 2013",
      question: "In an experiment, four quantities a, b, c and d are measured with percentage error 1%, 2%, 3% and 4% respectively. Quantity P is calculated as P = a³b²/(cd). Percentage error in P is:",
      options: ["14%", "10%", "7%", "4%"],
      answer: 0,
      topic: "Physics and Measurement",
    },
    {
      id: 111, year: 2015, exam: "NEET 2015",
      question: "The dimensional formula for surface tension is:",
      options: ["[ML⁰T⁻²]", "[ML¹T⁻²]", "[ML²T⁻²]", "[ML⁰T⁻¹]"],
      answer: 0,
      topic: "Physics and Measurement",
    },
    {
      id: 112, year: 2022, exam: "NEET 2022",
      question: "The area of a rectangular field (length = 55.3 m, breadth = 25 m) after rounding off to correct significant digits is:",
      options: ["1382.5 m²", "1382 m²", "1383 m²", "1.4 × 10³ m²"],
      answer: 3,
      topic: "Physics and Measurement",
    },
    {
      id: 113, year: 2014, exam: "NEET 2014",
      question: "If energy (E), velocity (V) and time (T) are chosen as the fundamental units, the dimensional formula of surface tension will be:",
      options: ["[EV⁻²T⁻²]", "[E⁻²V⁻¹T⁻³]", "[EV⁻²T⁻¹]", "[EV⁻¹T⁻²]"],
      answer: 0,
      topic: "Physics and Measurement",
    },
    {
      id: 114, year: 2017, exam: "NEET 2017",
      question: "A physical quantity of the dimensions of length that can be formed out of c, G and e²/(4πε₀) is:",
      options: ["c²[G·e²/(4πε₀)]^(1/2)", "(1/c²)[G·e²/(4πε₀)]^(1/2)", "(1/c)·G·e²/(4πε₀)", "(1/c²)[G·e²/(4πε₀)]²"],
      answer: 1,
      topic: "Physics and Measurement",
    },
    {
      id: 115, year: 2021, exam: "NEET 2021",
      question: "Which of the following is not a fundamental SI unit?",
      options: ["Ampere", "Candela", "Mole", "Tesla"],
      answer: 3,
      topic: "Physics and Measurement",
    },
  ],

  // ===== JEE MAIN — PHYSICS — Rotational Motion =====
  "jee-main::Physics::Rotational Motion": [
    { id: 101, year: 2023, exam: "JEE Main 2023", question: "Moment of inertia of a solid sphere about its diameter is:", options: ["(2/5)MR²", "(2/3)MR²", "(1/2)MR²", "MR²"], answer: 0, topic: "Rotational Motion" },
    { id: 102, year: 2022, exam: "JEE Main 2022", question: "Angular momentum is conserved when:", options: ["Net force is zero", "Net torque is zero", "Linear momentum is conserved", "Energy is conserved"], answer: 1, topic: "Rotational Motion" },
    { id: 103, year: 2021, exam: "JEE Main 2021", question: "A disc and a ring of same mass and radius roll down an incline. Which reaches bottom first?", options: ["Disc", "Ring", "Both together", "Depends on angle"], answer: 0, topic: "Rotational Motion" },
    { id: 104, year: 2024, exam: "JEE Main 2024", question: "The torque acting on a body is τ = 5t² N⋅m. Angular impulse from t=0 to t=3s is:", options: ["45 N⋅m⋅s", "15 N⋅m⋅s", "30 N⋅m⋅s", "90 N⋅m⋅s"], answer: 0, topic: "Rotational Motion" },
    { id: 105, year: 2020, exam: "JEE Main 2020", question: "Radius of gyration of a thin rod of length L about its centre is:", options: ["L/√12", "L/√3", "L/2", "L/√6"], answer: 0, topic: "Rotational Motion" },
  ],
  // ===== JEE MAIN — PHYSICS — Laws of Motion =====
  "jee-main::Physics::Laws of Motion": [
    { id: 110, year: 2023, exam: "JEE Main 2023", question: "A 5 kg block on a frictionless surface is pushed by 20 N force. Acceleration is:", options: ["2 m/s²", "4 m/s²", "5 m/s²", "10 m/s²"], answer: 1, topic: "Laws of Motion" },
    { id: 111, year: 2022, exam: "JEE Main 2022", question: "In a lift moving upward with acceleration a, apparent weight of a person is:", options: ["mg", "m(g+a)", "m(g-a)", "ma"], answer: 1, topic: "Laws of Motion" },
    { id: 112, year: 2021, exam: "JEE Main 2021", question: "Two blocks 2 kg and 3 kg connected by string, pulled by 25 N. Tension in string is:", options: ["10 N", "15 N", "5 N", "20 N"], answer: 0, topic: "Laws of Motion" },
    { id: 113, year: 2020, exam: "JEE Main 2020", question: "Coefficient of friction μ=0.5. Max angle of incline for block to stay stationary:", options: ["26.6°", "30°", "45°", "60°"], answer: 0, topic: "Laws of Motion" },
  ],
  // ===== JEE MAIN — PHYSICS — Work Power & Energy =====
  "jee-main::Physics::Work Power & Energy": [
    { id: 120, year: 2023, exam: "JEE Main 2023", question: "Spring constant 100 N/m compressed 0.2 m. PE stored:", options: ["1 J", "2 J", "4 J", "0.5 J"], answer: 1, topic: "Work Power & Energy" },
    { id: 121, year: 2022, exam: "JEE Main 2022", question: "Power is defined as:", options: ["Force × distance", "Force × velocity", "Force × acceleration", "Mass × velocity"], answer: 1, topic: "Work Power & Energy" },
    { id: 122, year: 2021, exam: "JEE Main 2021", question: "A 2 kg ball falls from 10 m. KE just before hitting ground (g=10):", options: ["100 J", "200 J", "20 J", "50 J"], answer: 1, topic: "Work Power & Energy" },
    { id: 123, year: 2024, exam: "JEE Main 2024", question: "Work done by centripetal force on body moving in circle:", options: ["Positive", "Negative", "Zero", "Variable"], answer: 2, topic: "Work Power & Energy" },
  ],
  // ===== JEE MAIN — PHYSICS — Electrostatics =====
  "jee-main::Physics::Electrostatics": [
    { id: 130, year: 2023, exam: "JEE Main 2023", question: "Two charges +2μC and -2μC are 10 cm apart. Electric field at midpoint:", options: ["1.44×10⁶ N/C", "2.88×10⁶ N/C", "0", "0.72×10⁶ N/C"], answer: 1, topic: "Electrostatics" },
    { id: 131, year: 2022, exam: "JEE Main 2022", question: "Electric flux through closed surface enclosing charge q:", options: ["q/ε₀", "qε₀", "q/4πε₀", "q²/ε₀"], answer: 0, topic: "Electrostatics" },
    { id: 132, year: 2021, exam: "JEE Main 2021", question: "Electric potential due to point charge q at distance r:", options: ["kq/r²", "kq/r", "kq²/r", "kr/q"], answer: 1, topic: "Electrostatics" },
    { id: 133, year: 2020, exam: "JEE Main 2020", question: "Electric field inside a charged conductor is:", options: ["Maximum", "Minimum", "Zero", "Depends on shape"], answer: 2, topic: "Electrostatics" },
  ],
  // ===== JEE MAIN — PHYSICS — Current Electricity =====
  "jee-main::Physics::Current Electricity": [
    { id: 140, year: 2023, exam: "JEE Main 2023", question: "Three resistors 2Ω, 3Ω, 6Ω in parallel. Equivalent resistance:", options: ["1Ω", "11Ω", "0.5Ω", "2Ω"], answer: 0, topic: "Current Electricity" },
    { id: 141, year: 2022, exam: "JEE Main 2022", question: "EMF 2V, internal resistance 0.5Ω. Current through 1.5Ω external resistance:", options: ["1A", "2A", "0.5A", "4A"], answer: 0, topic: "Current Electricity" },
    { id: 142, year: 2021, exam: "JEE Main 2021", question: "In Wheatstone bridge if P/Q=R/S, galvanometer shows:", options: ["Max deflection", "Zero deflection", "Positive deflection", "Random"], answer: 1, topic: "Current Electricity" },
    { id: 143, year: 2024, exam: "JEE Main 2024", question: "Kirchhoff's junction rule is based on conservation of:", options: ["Energy", "Charge", "Momentum", "Mass"], answer: 1, topic: "Current Electricity" },
  ],
  // ===== JEE MAIN — PHYSICS — Gravitation =====
  "jee-main::Physics::Gravitation": [
    { id: 150, year: 2023, exam: "JEE Main 2023", question: "Acceleration due to gravity at height h (h<<R) above surface:", options: ["g(1-h/R)", "g(1-2h/R)", "g(1+h/R)", "g(1+2h/R)"], answer: 1, topic: "Gravitation" },
    { id: 151, year: 2022, exam: "JEE Main 2022", question: "Escape velocity from Earth's surface:", options: ["7.9 km/s", "11.2 km/s", "3.1 km/s", "15 km/s"], answer: 1, topic: "Gravitation" },
    { id: 152, year: 2021, exam: "JEE Main 2021", question: "Time period of satellite at height h: T =", options: ["2π√((R+h)³/gR²)", "2πR/g", "2π√(R/g)", "2πh/g"], answer: 0, topic: "Gravitation" },
  ],
  // ===== JEE MAIN — CHEMISTRY =====
  "jee-main::Chemistry::Periodic Table & Classification": [
    { id: 200, year: 2023, exam: "JEE Main 2023", question: "Which has the smallest atomic radius?", options: ["Na", "Mg", "Al", "Cl"], answer: 3, topic: "Periodic Table" },
    { id: 201, year: 2022, exam: "JEE Main 2022", question: "Ionization energy increases:", options: ["Left to right in period", "Top to bottom in group", "Diagonally", "Randomly"], answer: 0, topic: "Periodic Table" },
    { id: 202, year: 2021, exam: "JEE Main 2021", question: "Most electronegative element:", options: ["Oxygen", "Nitrogen", "Fluorine", "Chlorine"], answer: 2, topic: "Periodic Table" },
    { id: 203, year: 2020, exam: "JEE Main 2020", question: "Electron affinity is highest for:", options: ["Fluorine", "Chlorine", "Bromine", "Iodine"], answer: 1, topic: "Periodic Table" },
  ],
  "jee-main::Chemistry::Chemical Bonding": [
    { id: 210, year: 2023, exam: "JEE Main 2023", question: "Shape of BF₃ molecule:", options: ["Tetrahedral", "Trigonal planar", "Linear", "Bent"], answer: 1, topic: "Chemical Bonding" },
    { id: 211, year: 2022, exam: "JEE Main 2022", question: "Bond angle in water molecule:", options: ["90°", "104.5°", "109.5°", "120°"], answer: 1, topic: "Chemical Bonding" },
    { id: 212, year: 2021, exam: "JEE Main 2021", question: "σ bond is formed by:", options: ["Lateral overlap", "Head-on overlap", "Both", "Neither"], answer: 1, topic: "Chemical Bonding" },
    { id: 213, year: 2024, exam: "JEE Main 2024", question: "Number of lone pairs on O in H₂O:", options: ["0", "1", "2", "3"], answer: 2, topic: "Chemical Bonding" },
  ],
  "jee-main::Chemistry::Thermodynamics": [
    { id: 220, year: 2023, exam: "JEE Main 2023", question: "For exothermic reaction, ΔH is:", options: ["Positive", "Negative", "Zero", "Depends"], answer: 1, topic: "Thermodynamics" },
    { id: 221, year: 2022, exam: "JEE Main 2022", question: "Entropy of universe in spontaneous process:", options: ["Decreases", "Increases", "Same", "Zero"], answer: 1, topic: "Thermodynamics" },
    { id: 222, year: 2021, exam: "JEE Main 2021", question: "ΔG=ΔH-TΔS. Spontaneous when:", options: ["ΔG>0", "ΔG<0", "ΔG=0", "ΔH>0"], answer: 1, topic: "Thermodynamics" },
  ],
  // ===== JEE MAIN — MATHS =====
  "jee-main::Maths::Sequences & Series": [
    { id: 300, year: 2023, exam: "JEE Main 2023", question: "Sum of first n natural numbers:", options: ["n(n-1)/2", "n(n+1)/2", "n²", "n(n+1)"], answer: 1, topic: "Sequences & Series" },
    { id: 301, year: 2022, exam: "JEE Main 2022", question: "If a, ar, ar² is GP, common ratio is:", options: ["a", "r", "ar", "a+r"], answer: 1, topic: "Sequences & Series" },
    { id: 302, year: 2021, exam: "JEE Main 2021", question: "Sum of infinite GP with first term 1 and ratio 1/2:", options: ["1", "2", "∞", "1/2"], answer: 1, topic: "Sequences & Series" },
  ],
  "jee-main::Maths::Probability": [
    { id: 310, year: 2023, exam: "JEE Main 2023", question: "P(A)=0.3, P(B)=0.4, A,B independent. P(A∩B):", options: ["0.12", "0.7", "0.1", "0.3"], answer: 0, topic: "Probability" },
    { id: 311, year: 2022, exam: "JEE Main 2022", question: "Two dice thrown. Probability of sum 7:", options: ["1/6", "5/36", "7/36", "1/12"], answer: 0, topic: "Probability" },
    { id: 312, year: 2021, exam: "JEE Main 2021", question: "Coin tossed 3 times. Probability of exactly 2 heads:", options: ["1/8", "3/8", "1/4", "1/2"], answer: 1, topic: "Probability" },
  ],
  "jee-main::Maths::Matrices & Determinants": [
    { id: 320, year: 2023, exam: "JEE Main 2023", question: "Determinant of [[2,3],[1,4]]:", options: ["5", "8", "11", "6"], answer: 0, topic: "Matrices" },
    { id: 321, year: 2022, exam: "JEE Main 2022", question: "If A is 3×3 with det(A)=5, then det(3A):", options: ["15", "45", "135", "5"], answer: 2, topic: "Matrices" },
    { id: 322, year: 2021, exam: "JEE Main 2021", question: "If A is invertible, det(A⁻¹):", options: ["det(A)", "1/det(A)", "-det(A)", "det(A)²"], answer: 1, topic: "Matrices" },
  ],
  // ===== NEET — BIOLOGY =====
  "neet::Biology::Genetics": [
    { id: 400, year: 2023, exam: "NEET 2023", question: "Mendel's law of independent assortment applies to genes on:", options: ["Same chromosome", "Different chromosomes", "Sex chromosomes", "Mitochondrial DNA"], answer: 1, topic: "Genetics" },
    { id: 401, year: 2022, exam: "NEET 2022", question: "In AaBb × AaBb cross, phenotypic ratio:", options: ["3:1", "9:3:3:1", "1:2:1", "1:1:1:1"], answer: 1, topic: "Genetics" },
    { id: 402, year: 2021, exam: "NEET 2021", question: "Sickle cell anemia caused by:", options: ["Deletion", "Point mutation", "Duplication", "Inversion"], answer: 1, topic: "Genetics" },
    { id: 403, year: 2020, exam: "NEET 2020", question: "Enzyme that unwinds DNA during replication:", options: ["DNA polymerase", "Helicase", "Ligase", "Primase"], answer: 1, topic: "Genetics" },
  ],
  "neet::Biology::Human Physiology": [
    { id: 410, year: 2023, exam: "NEET 2023", question: "Pacemaker of the heart:", options: ["AV node", "SA node", "Bundle of His", "Purkinje fibers"], answer: 1, topic: "Human Physiology" },
    { id: 411, year: 2022, exam: "NEET 2022", question: "Tidal volume of lungs:", options: ["500 mL", "1500 mL", "3000 mL", "150 mL"], answer: 0, topic: "Human Physiology" },
    { id: 412, year: 2021, exam: "NEET 2021", question: "Insulin secreted by:", options: ["Alpha cells", "Beta cells", "Delta cells", "PP cells"], answer: 1, topic: "Human Physiology" },
    { id: 413, year: 2024, exam: "NEET 2024", question: "Urea is formed in:", options: ["Kidney", "Liver", "Pancreas", "Intestine"], answer: 1, topic: "Human Physiology" },
    { id: 414, year: 2020, exam: "NEET 2020", question: "GFR (Glomerular Filtration Rate):", options: ["25 mL/min", "125 mL/min", "500 mL/min", "1 L/min"], answer: 1, topic: "Human Physiology" },
  ],
  "neet::Biology::Cell Biology & Biomolecules": [
    { id: 420, year: 2023, exam: "NEET 2023", question: "Ribosomes made of:", options: ["DNA+protein", "RNA+protein", "DNA+RNA", "Only protein"], answer: 1, topic: "Cell Biology" },
    { id: 421, year: 2022, exam: "NEET 2022", question: "Plant cell wall made of:", options: ["Chitin", "Cellulose", "Peptidoglycan", "Starch"], answer: 1, topic: "Cell Biology" },
    { id: 422, year: 2021, exam: "NEET 2021", question: "Suicide bag of cell:", options: ["Ribosome", "Lysosome", "Mitochondria", "Golgi"], answer: 1, topic: "Cell Biology" },
    { id: 423, year: 2020, exam: "NEET 2020", question: "ATP has how many phosphate groups?", options: ["1", "2", "3", "4"], answer: 2, topic: "Cell Biology" },
  ],
  "neet::Biology::Plant Kingdom": [
    { id: 430, year: 2023, exam: "NEET 2023", question: "Nitrogen fixation in legumes done by:", options: ["Rhizobium", "E. coli", "Yeast", "Lactobacillus"], answer: 0, topic: "Plant Kingdom" },
    { id: 431, year: 2022, exam: "NEET 2022", question: "Stomata open when guard cells become:", options: ["Flaccid", "Turgid", "Dead", "Plasmolyzed"], answer: 1, topic: "Plant Kingdom" },
    { id: 432, year: 2021, exam: "NEET 2021", question: "Plant hormone for fruit ripening:", options: ["Auxin", "Gibberellin", "Ethylene", "Cytokinin"], answer: 2, topic: "Plant Kingdom" },
  ],
  "neet::Biology::Ecology & Environment": [
    { id: 440, year: 2023, exam: "NEET 2023", question: "10% law of energy transfer given by:", options: ["Odum", "Lindeman", "Tansley", "Elton"], answer: 1, topic: "Ecology" },
    { id: 441, year: 2022, exam: "NEET 2022", question: "Highest biodiversity found in:", options: ["Tundra", "Desert", "Tropical rainforest", "Taiga"], answer: 2, topic: "Ecology" },
    { id: 442, year: 2021, exam: "NEET 2021", question: "Montreal Protocol related to:", options: ["Global warming", "Ozone depletion", "Acid rain", "Water pollution"], answer: 1, topic: "Ecology" },
  ],
  // ===== NEET — CHEMISTRY =====
  "neet::Chemistry::Organic Chemistry": [
    { id: 450, year: 2023, exam: "NEET 2023", question: "IUPAC name of CH₃CH₂OH:", options: ["Methanol", "Ethanol", "Propanol", "Butanol"], answer: 1, topic: "Organic Chemistry" },
    { id: 451, year: 2022, exam: "NEET 2022", question: "Functional group in aldehydes:", options: ["-OH", "-COOH", "-CHO", "-CO-"], answer: 2, topic: "Organic Chemistry" },
    { id: 452, year: 2021, exam: "NEET 2021", question: "Benzene has how many carbon atoms?", options: ["4", "5", "6", "8"], answer: 2, topic: "Organic Chemistry" },
    { id: 453, year: 2020, exam: "NEET 2020", question: "Isomers have same:", options: ["Structure", "Molecular formula", "Properties", "Boiling point"], answer: 1, topic: "Organic Chemistry" },
  ],
  "neet::Chemistry::Chemical Equilibrium": [
    { id: 460, year: 2023, exam: "NEET 2023", question: "Le Chatelier: if pressure increases, equilibrium shifts towards:", options: ["More moles", "Fewer moles", "No change", "Reverse always"], answer: 1, topic: "Chemical Equilibrium" },
    { id: 461, year: 2022, exam: "NEET 2022", question: "If Δn=0 then Kp vs Kc:", options: ["Kp>Kc", "Kp<Kc", "Kp=Kc", "Cannot tell"], answer: 2, topic: "Chemical Equilibrium" },
    { id: 462, year: 2021, exam: "NEET 2021", question: "Catalyst in equilibrium:", options: ["Shifts right", "Shifts left", "No change to equilibrium", "Increases Kc"], answer: 2, topic: "Chemical Equilibrium" },
  ],

};

// Helper to get questions for a topic
export const getTopicQuestions = (examId: string, subject: string, topicName: string): PYQQuestion[] => {
  // Handle exam ID aliases
  const idMap: Record<string, string> = { 'neet-ug': 'neet' };
  const resolvedId = idMap[examId] || examId;
  const key = `${resolvedId}::${subject}::${topicName}`;
  return pyqQuestions[key] || [];
};
