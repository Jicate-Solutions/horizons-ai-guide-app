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

  // ===== JEE MAIN — PHYSICS — More Topics =====
  "jee-main::Physics::Motion in a Straight Line": [
    { id: 500, year: 2023, exam: "JEE Main 2023", question: "A body starts from rest with acceleration 4 m/s². Velocity after 5 seconds:", options: ["10 m/s", "20 m/s", "25 m/s", "40 m/s"], answer: 1, topic: "Motion in a Straight Line" },
    { id: 501, year: 2022, exam: "JEE Main 2022", question: "A ball is dropped from 80 m height. Time to reach ground (g=10):", options: ["2 s", "4 s", "8 s", "16 s"], answer: 1, topic: "Motion in a Straight Line" },
    { id: 502, year: 2021, exam: "JEE Main 2021", question: "Displacement-time graph of a body at rest is:", options: ["Straight line with slope", "Horizontal line", "Parabola", "Vertical line"], answer: 1, topic: "Motion in a Straight Line" },
  ],
  "jee-main::Physics::Motion in a Plane": [
    { id: 510, year: 2023, exam: "JEE Main 2023", question: "Range of projectile is maximum when angle of projection is:", options: ["30°", "45°", "60°", "90°"], answer: 1, topic: "Motion in a Plane" },
    { id: 511, year: 2022, exam: "JEE Main 2022", question: "A ball thrown at 45° with 20 m/s. Maximum height (g=10):", options: ["5 m", "10 m", "20 m", "40 m"], answer: 1, topic: "Motion in a Plane" },
    { id: 512, year: 2021, exam: "JEE Main 2021", question: "Time of flight of projectile on level ground at angle θ:", options: ["2u sinθ/g", "u sinθ/g", "2u cosθ/g", "u²sin2θ/g"], answer: 0, topic: "Motion in a Plane" },
  ],
  "jee-main::Physics::Circular Motion": [
    { id: 520, year: 2023, exam: "JEE Main 2023", question: "Centripetal acceleration of body in circle of radius r with speed v:", options: ["v/r", "v²/r", "vr", "v²r"], answer: 1, topic: "Circular Motion" },
    { id: 521, year: 2022, exam: "JEE Main 2022", question: "A car turns on circular road. Friction provides:", options: ["Tangential force", "Centripetal force", "Gravitational force", "Normal force"], answer: 1, topic: "Circular Motion" },
    { id: 522, year: 2021, exam: "JEE Main 2021", question: "Minimum speed at top of vertical circle of radius R:", options: ["√(gR)", "√(2gR)", "√(5gR)", "√(gR/2)"], answer: 0, topic: "Circular Motion" },
  ],
  "jee-main::Physics::Heat and Thermodynamics": [
    { id: 530, year: 2023, exam: "JEE Main 2023", question: "In isothermal process, temperature:", options: ["Increases", "Decreases", "Remains constant", "First increases then decreases"], answer: 2, topic: "Heat and Thermodynamics" },
    { id: 531, year: 2022, exam: "JEE Main 2022", question: "Efficiency of Carnot engine between 600K and 300K:", options: ["25%", "50%", "75%", "100%"], answer: 1, topic: "Heat and Thermodynamics" },
    { id: 532, year: 2021, exam: "JEE Main 2021", question: "In adiabatic process:", options: ["ΔQ=0", "ΔW=0", "ΔU=0", "ΔT=0"], answer: 0, topic: "Heat and Thermodynamics" },
    { id: 533, year: 2020, exam: "JEE Main 2020", question: "Specific heat of ideal gas in isothermal process:", options: ["0", "∞", "Cp", "Cv"], answer: 1, topic: "Heat and Thermodynamics" },
  ],
  "jee-main::Physics::Simple Harmonic Motion": [
    { id: 540, year: 2023, exam: "JEE Main 2023", question: "Time period of spring-mass system (mass m, spring constant k):", options: ["2π√(m/k)", "2π√(k/m)", "2πmk", "1/2π√(k/m)"], answer: 0, topic: "Simple Harmonic Motion" },
    { id: 541, year: 2022, exam: "JEE Main 2022", question: "In SHM, acceleration is maximum at:", options: ["Mean position", "Extreme position", "Between mean and extreme", "Everywhere same"], answer: 1, topic: "Simple Harmonic Motion" },
    { id: 542, year: 2021, exam: "JEE Main 2021", question: "KE of body in SHM is maximum at:", options: ["Mean position", "Extreme position", "Quarter amplitude", "Depends on mass"], answer: 0, topic: "Simple Harmonic Motion" },
  ],
  "jee-main::Physics::Waves": [
    { id: 550, year: 2023, exam: "JEE Main 2023", question: "Speed of sound in air at 0°C is approximately:", options: ["232 m/s", "332 m/s", "432 m/s", "532 m/s"], answer: 1, topic: "Waves" },
    { id: 551, year: 2022, exam: "JEE Main 2022", question: "In stationary waves, distance between consecutive nodes:", options: ["λ", "λ/2", "λ/4", "2λ"], answer: 1, topic: "Waves" },
    { id: 552, year: 2021, exam: "JEE Main 2021", question: "Doppler effect: when source moves towards observer, frequency:", options: ["Increases", "Decreases", "Same", "Zero"], answer: 0, topic: "Waves" },
  ],
  "jee-main::Physics::Wave Optics": [
    { id: 560, year: 2023, exam: "JEE Main 2023", question: "In Young's double slit experiment, fringe width β is:", options: ["λD/d", "λd/D", "D/λd", "d/λD"], answer: 0, topic: "Wave Optics" },
    { id: 561, year: 2022, exam: "JEE Main 2022", question: "Diffraction is maximum when slit width is:", options: ["Much larger than λ", "Equal to λ", "Much smaller than λ", "Zero"], answer: 1, topic: "Wave Optics" },
    { id: 562, year: 2021, exam: "JEE Main 2021", question: "In single slit diffraction, central maximum width is:", options: ["β", "2β", "β/2", "3β"], answer: 1, topic: "Wave Optics" },
  ],
  "jee-main::Physics::Geometrical Optics": [
    { id: 570, year: 2023, exam: "JEE Main 2023", question: "Focal length of convex lens is:", options: ["Always positive", "Always negative", "Can be both", "Zero"], answer: 0, topic: "Geometrical Optics" },
    { id: 571, year: 2022, exam: "JEE Main 2022", question: "Refractive index of medium with critical angle 30°:", options: ["1", "√2", "2", "1.5"], answer: 2, topic: "Geometrical Optics" },
    { id: 572, year: 2021, exam: "JEE Main 2021", question: "Power of lens in dioptre when f = 25 cm:", options: ["2 D", "4 D", "0.25 D", "25 D"], answer: 1, topic: "Geometrical Optics" },
  ],
  "jee-main::Physics::Atoms and Nuclei": [
    { id: 580, year: 2023, exam: "JEE Main 2023", question: "In Bohr model, radius of nth orbit ∝:", options: ["n", "n²", "1/n", "1/n²"], answer: 1, topic: "Atoms and Nuclei" },
    { id: 581, year: 2022, exam: "JEE Main 2022", question: "Half-life of a radioactive element is 10 days. Fraction remaining after 30 days:", options: ["1/2", "1/4", "1/8", "1/16"], answer: 2, topic: "Atoms and Nuclei" },
    { id: 582, year: 2021, exam: "JEE Main 2021", question: "In alpha decay, mass number decreases by:", options: ["1", "2", "4", "0"], answer: 2, topic: "Atoms and Nuclei" },
  ],
  "jee-main::Physics::Semiconductor": [
    { id: 590, year: 2023, exam: "JEE Main 2023", question: "In p-type semiconductor, majority carriers are:", options: ["Electrons", "Holes", "Protons", "Neutrons"], answer: 1, topic: "Semiconductor" },
    { id: 591, year: 2022, exam: "JEE Main 2022", question: "Forward biased diode has resistance:", options: ["Very high", "Very low", "Infinite", "Zero"], answer: 1, topic: "Semiconductor" },
    { id: 592, year: 2021, exam: "JEE Main 2021", question: "AND gate output is 1 when:", options: ["Any input is 1", "All inputs are 1", "All inputs are 0", "No input"], answer: 1, topic: "Semiconductor" },
  ],
  "jee-main::Physics::Electromagnetic Induction": [
    { id: 600, year: 2023, exam: "JEE Main 2023", question: "Faraday's law: induced EMF ∝:", options: ["Flux", "Rate of change of flux", "Current", "Resistance"], answer: 1, topic: "Electromagnetic Induction" },
    { id: 601, year: 2022, exam: "JEE Main 2022", question: "Lenz's law is based on conservation of:", options: ["Charge", "Mass", "Energy", "Momentum"], answer: 2, topic: "Electromagnetic Induction" },
    { id: 602, year: 2021, exam: "JEE Main 2021", question: "Self-inductance of a solenoid is proportional to:", options: ["N", "N²", "1/N", "√N"], answer: 1, topic: "Electromagnetic Induction" },
  ],
  "jee-main::Physics::Magnetic Effect of Current": [
    { id: 610, year: 2023, exam: "JEE Main 2023", question: "Magnetic field at centre of circular loop carrying current I, radius R:", options: ["μ₀I/2R", "μ₀I/R", "μ₀IR/2", "μ₀I/4πR"], answer: 0, topic: "Magnetic Effect of Current" },
    { id: 611, year: 2022, exam: "JEE Main 2022", question: "Force on current-carrying conductor in magnetic field F =:", options: ["BIL sinθ", "BIL cosθ", "BIL", "BI/L"], answer: 0, topic: "Magnetic Effect of Current" },
    { id: 612, year: 2021, exam: "JEE Main 2021", question: "Two parallel wires carrying current in same direction:", options: ["Repel", "Attract", "No force", "Rotate"], answer: 1, topic: "Magnetic Effect of Current" },
  ],

  // ===== JEE MAIN — CHEMISTRY — More Topics =====
  "jee-main::Chemistry::Some Basic Concepts of Chemistry": [
    { id: 700, year: 2023, exam: "JEE Main 2023", question: "1 mole of any gas at STP occupies:", options: ["11.2 L", "22.4 L", "44.8 L", "5.6 L"], answer: 1, topic: "Some Basic Concepts" },
    { id: 701, year: 2022, exam: "JEE Main 2022", question: "Equivalent weight of H₂SO₄:", options: ["49", "98", "32", "64"], answer: 0, topic: "Some Basic Concepts" },
    { id: 702, year: 2021, exam: "JEE Main 2021", question: "Molarity is defined as moles of solute per:", options: ["kg of solvent", "litre of solution", "litre of solvent", "kg of solution"], answer: 1, topic: "Some Basic Concepts" },
  ],
  "jee-main::Chemistry::Structure of Atom": [
    { id: 710, year: 2023, exam: "JEE Main 2023", question: "Maximum electrons in a shell with n=3:", options: ["8", "18", "32", "2"], answer: 1, topic: "Structure of Atom" },
    { id: 711, year: 2022, exam: "JEE Main 2022", question: "Heisenberg's uncertainty principle applies to:", options: ["Position and velocity simultaneously", "Mass and energy", "Charge and spin", "Temperature and pressure"], answer: 0, topic: "Structure of Atom" },
    { id: 712, year: 2021, exam: "JEE Main 2021", question: "Shape of p-orbital is:", options: ["Spherical", "Dumbbell", "Clover-leaf", "Conical"], answer: 1, topic: "Structure of Atom" },
  ],
  "jee-main::Chemistry::Electrochemistry": [
    { id: 720, year: 2023, exam: "JEE Main 2023", question: "In electrolysis, reduction occurs at:", options: ["Anode", "Cathode", "Both", "Neither"], answer: 1, topic: "Electrochemistry" },
    { id: 721, year: 2022, exam: "JEE Main 2022", question: "Standard hydrogen electrode potential is:", options: ["-1 V", "0 V", "+1 V", "0.5 V"], answer: 1, topic: "Electrochemistry" },
    { id: 722, year: 2021, exam: "JEE Main 2021", question: "Faraday's first law: mass deposited ∝:", options: ["Voltage", "Charge passed", "Resistance", "Temperature"], answer: 1, topic: "Electrochemistry" },
  ],
  "jee-main::Chemistry::Chemical Kinetics and Nuclear Chemistry": [
    { id: 730, year: 2023, exam: "JEE Main 2023", question: "Unit of first order rate constant:", options: ["mol/L/s", "s⁻¹", "L/mol/s", "mol²/L²/s"], answer: 1, topic: "Chemical Kinetics" },
    { id: 731, year: 2022, exam: "JEE Main 2022", question: "Half-life of first order reaction is:", options: ["0.693/k", "k/0.693", "2.303/k", "k/2.303"], answer: 0, topic: "Chemical Kinetics" },
    { id: 732, year: 2021, exam: "JEE Main 2021", question: "Arrhenius equation: rate constant increases with:", options: ["Decreasing temperature", "Increasing temperature", "Increasing pressure", "Adding catalyst only"], answer: 1, topic: "Chemical Kinetics" },
  ],
  "jee-main::Chemistry::Solutions": [
    { id: 740, year: 2023, exam: "JEE Main 2023", question: "Raoult's law: partial vapour pressure of component ∝:", options: ["Molarity", "Mole fraction", "Molality", "Mass fraction"], answer: 1, topic: "Solutions" },
    { id: 741, year: 2022, exam: "JEE Main 2022", question: "Boiling point elevation ΔTb = Kb × m. Kb is called:", options: ["Cryoscopic constant", "Ebullioscopic constant", "Gas constant", "Raoult constant"], answer: 1, topic: "Solutions" },
    { id: 742, year: 2021, exam: "JEE Main 2021", question: "Osmotic pressure π = CRT applies to:", options: ["Concentrated solutions", "Dilute solutions", "Pure solvents", "Gases only"], answer: 1, topic: "Solutions" },
  ],

  // ===== JEE MAIN — MATHS — More Topics =====
  "jee-main::Maths::Limits, Continuity & Differentiability": [
    { id: 800, year: 2023, exam: "JEE Main 2023", question: "lim(x→0) (eˣ-1)/x equals:", options: ["0", "1", "e", "∞"], answer: 1, topic: "Limits" },
    { id: 801, year: 2022, exam: "JEE Main 2022", question: "A function is continuous at x=a if:", options: ["f(a) exists", "lim f(x) exists", "f(a) = lim f(x)", "All of these"], answer: 3, topic: "Limits" },
    { id: 802, year: 2021, exam: "JEE Main 2021", question: "lim(x→∞) (1+1/x)ˣ equals:", options: ["0", "1", "e", "∞"], answer: 2, topic: "Limits" },
  ],
  "jee-main::Maths::Integrals": [
    { id: 810, year: 2023, exam: "JEE Main 2023", question: "∫ eˣ dx equals:", options: ["eˣ + C", "xeˣ + C", "eˣ/x + C", "ln(x) + C"], answer: 0, topic: "Integrals" },
    { id: 811, year: 2022, exam: "JEE Main 2022", question: "∫₀^π sin x dx equals:", options: ["0", "1", "2", "-1"], answer: 2, topic: "Integrals" },
    { id: 812, year: 2021, exam: "JEE Main 2021", question: "∫ 1/x dx equals:", options: ["x + C", "ln|x| + C", "1/x² + C", "-1/x + C"], answer: 1, topic: "Integrals" },
  ],
  "jee-main::Maths::Differential Equations": [
    { id: 820, year: 2023, exam: "JEE Main 2023", question: "Order of differential equation d²y/dx² + 3(dy/dx) = 0:", options: ["1", "2", "3", "0"], answer: 1, topic: "Differential Equations" },
    { id: 821, year: 2022, exam: "JEE Main 2022", question: "Degree of d²y/dx² + (dy/dx)³ = 0:", options: ["1", "2", "3", "Not defined"], answer: 0, topic: "Differential Equations" },
    { id: 822, year: 2021, exam: "JEE Main 2021", question: "Solution of dy/dx = y is:", options: ["y = eˣ", "y = Ceˣ", "y = x", "y = ln x"], answer: 1, topic: "Differential Equations" },
  ],
  "jee-main::Maths::Coordinate Geometry": [
    { id: 830, year: 2023, exam: "JEE Main 2023", question: "Equation of circle with centre (0,0) and radius 5:", options: ["x²+y²=5", "x²+y²=25", "x+y=5", "(x-5)²+(y-5)²=25"], answer: 1, topic: "Coordinate Geometry" },
    { id: 831, year: 2022, exam: "JEE Main 2022", question: "Distance of point (3,4) from origin:", options: ["3", "4", "5", "7"], answer: 2, topic: "Coordinate Geometry" },
    { id: 832, year: 2021, exam: "JEE Main 2021", question: "Slope of line 3x+4y=12:", options: ["3/4", "-3/4", "4/3", "-4/3"], answer: 1, topic: "Coordinate Geometry" },
  ],
  "jee-main::Maths::Sets, Relations & Functions": [
    { id: 840, year: 2023, exam: "JEE Main 2023", question: "If A={1,2,3} and B={2,3,4}, then A∪B:", options: ["{2,3}", "{1,2,3,4}", "{1,4}", "{1,2,3}"], answer: 1, topic: "Sets" },
    { id: 841, year: 2022, exam: "JEE Main 2022", question: "Number of subsets of a set with n elements:", options: ["n", "2n", "2ⁿ", "n²"], answer: 2, topic: "Sets" },
    { id: 842, year: 2021, exam: "JEE Main 2021", question: "A function f:A→B is onto if:", options: ["Every element of B has pre-image", "f is one-one", "A=B", "f is constant"], answer: 0, topic: "Sets" },
  ],
  "jee-main::Maths::Permutations & Combinations": [
    { id: 850, year: 2023, exam: "JEE Main 2023", question: "⁵P₃ equals:", options: ["10", "60", "120", "20"], answer: 1, topic: "Permutations" },
    { id: 851, year: 2022, exam: "JEE Main 2022", question: "⁶C₂ equals:", options: ["12", "15", "30", "6"], answer: 1, topic: "Permutations" },
    { id: 852, year: 2021, exam: "JEE Main 2021", question: "Number of ways to arrange letters of BOOK:", options: ["12", "24", "6", "4"], answer: 0, topic: "Permutations" },
  ],
  "jee-main::Maths::Complex Numbers": [
    { id: 860, year: 2023, exam: "JEE Main 2023", question: "|3+4i| equals:", options: ["5", "7", "1", "25"], answer: 0, topic: "Complex Numbers" },
    { id: 861, year: 2022, exam: "JEE Main 2022", question: "Conjugate of 2+3i:", options: ["2-3i", "-2+3i", "-2-3i", "3+2i"], answer: 0, topic: "Complex Numbers" },
    { id: 862, year: 2021, exam: "JEE Main 2021", question: "i⁴ equals:", options: ["1", "-1", "i", "-i"], answer: 0, topic: "Complex Numbers" },
  ],
  "jee-main::Maths::Vectors & 3D Geometry": [
    { id: 870, year: 2023, exam: "JEE Main 2023", question: "If â·b̂ = 0, the vectors are:", options: ["Parallel", "Perpendicular", "Equal", "Anti-parallel"], answer: 1, topic: "Vectors" },
    { id: 871, year: 2022, exam: "JEE Main 2022", question: "Magnitude of vector 3î+4ĵ:", options: ["5", "7", "1", "25"], answer: 0, topic: "Vectors" },
    { id: 872, year: 2021, exam: "JEE Main 2021", question: "Cross product of parallel vectors:", options: ["Maximum", "Minimum", "Zero vector", "Unit vector"], answer: 2, topic: "Vectors" },
  ],

  // ===== NEET — More Topics =====
  "neet::Biology::Molecular Basis of Inheritance": [
    { id: 900, year: 2023, exam: "NEET 2023", question: "DNA double helix model was proposed by:", options: ["Mendel", "Watson & Crick", "Darwin", "Lamarck"], answer: 1, topic: "Molecular Basis" },
    { id: 901, year: 2022, exam: "NEET 2022", question: "mRNA carries genetic code from:", options: ["Ribosome to cytoplasm", "DNA to ribosome", "Nucleus to ER", "Golgi to membrane"], answer: 1, topic: "Molecular Basis" },
    { id: 902, year: 2021, exam: "NEET 2021", question: "Codon is made of how many nucleotides?", options: ["1", "2", "3", "4"], answer: 2, topic: "Molecular Basis" },
  ],
  "neet::Biology::Human Reproduction": [
    { id: 910, year: 2023, exam: "NEET 2023", question: "Fertilization in humans occurs in:", options: ["Uterus", "Ovary", "Fallopian tube", "Vagina"], answer: 2, topic: "Human Reproduction" },
    { id: 911, year: 2022, exam: "NEET 2022", question: "Normal gestation period in humans:", options: ["6 months", "9 months", "12 months", "7 months"], answer: 1, topic: "Human Reproduction" },
    { id: 912, year: 2021, exam: "NEET 2021", question: "Placenta produces which hormone?", options: ["Insulin", "hCG", "ADH", "TSH"], answer: 1, topic: "Human Reproduction" },
  ],
  "neet::Biology::Evolution": [
    { id: 920, year: 2023, exam: "NEET 2023", question: "Theory of natural selection was given by:", options: ["Lamarck", "Darwin", "Mendel", "De Vries"], answer: 1, topic: "Evolution" },
    { id: 921, year: 2022, exam: "NEET 2022", question: "Homologous organs indicate:", options: ["Analogous evolution", "Divergent evolution", "Convergent evolution", "No evolution"], answer: 1, topic: "Evolution" },
    { id: 922, year: 2021, exam: "NEET 2021", question: "Hardy-Weinberg equilibrium assumes:", options: ["No mutation", "Large population", "Random mating", "All of these"], answer: 3, topic: "Evolution" },
  ],
  "neet::Chemistry::Chemical Bonding & Molecular Structure": [
    { id: 930, year: 2023, exam: "NEET 2023", question: "CO₂ molecular shape:", options: ["Linear", "Bent", "Trigonal", "Tetrahedral"], answer: 0, topic: "Chemical Bonding" },
    { id: 931, year: 2022, exam: "NEET 2022", question: "Ionic bond is formed between:", options: ["Two metals", "Metal and non-metal", "Two non-metals", "Noble gases"], answer: 1, topic: "Chemical Bonding" },
    { id: 932, year: 2021, exam: "NEET 2021", question: "Hydrogen bond is strongest in:", options: ["HCl", "HF", "HBr", "HI"], answer: 1, topic: "Chemical Bonding" },
  ],
  "neet::Chemistry::Thermodynamics": [
    { id: 940, year: 2023, exam: "NEET 2023", question: "First law of thermodynamics: ΔU =", options: ["q + w", "q - w", "q × w", "q / w"], answer: 0, topic: "Thermodynamics" },
    { id: 941, year: 2022, exam: "NEET 2022", question: "Enthalpy of combustion is always:", options: ["Positive", "Negative", "Zero", "Variable"], answer: 1, topic: "Thermodynamics" },
    { id: 942, year: 2021, exam: "NEET 2021", question: "Hess's law is based on:", options: ["Conservation of mass", "Conservation of energy", "Le Chatelier", "Avogadro"], answer: 1, topic: "Thermodynamics" },
  ],

  // ═══ CLAT PYQs ═══
  "clat::Legal::Principle-Fact Application": [
    { id: 1001, year: 2023, exam: "CLAT 2023", question: "Principle: An act done in good faith for the benefit of a person without consent is not an offence. Fact: A doctor performs emergency surgery on an unconscious accident victim. The doctor is:", options: ["Liable for assault", "Not liable under good faith", "Liable for negligence", "Liable only if patient dies"], answer: 1, topic: "Principle-Fact Application" },
    { id: 1002, year: 2022, exam: "CLAT 2022", question: "Principle: Nothing is an offence done by a child under 7. Fact: A 6-year-old throws a stone injuring a passerby. The child is:", options: ["Liable for hurt", "Not liable due to age", "Liable if parents are negligent", "Liable under tort"], answer: 1, topic: "Principle-Fact Application" },
    { id: 1003, year: 2023, exam: "CLAT 2023", question: "Principle: Volenti non fit injuria — a person who consents to harm cannot claim damages. Fact: A spectator at a cricket match is hit by a ball. The spectator:", options: ["Can claim damages", "Cannot claim — assumed risk", "Can claim only if ball hit head", "Can claim if no safety nets"], answer: 1, topic: "Principle-Fact Application" },
    { id: 1004, year: 2021, exam: "CLAT 2021", question: "Principle: An agreement without consideration is void. Fact: A promises to give B ₹10,000 as a gift. A later refuses. B sues. Court will:", options: ["Order A to pay", "Dismiss — no consideration", "Order partial payment", "Award damages to B"], answer: 1, topic: "Principle-Fact Application" },
  ],
  "clat::Legal::Law of Torts": [
    { id: 1010, year: 2023, exam: "CLAT 2023", question: "In Rylands v Fletcher, the principle established was:", options: ["Contributory negligence", "Strict liability for dangerous things", "Vicarious liability", "Negligence per se"], answer: 1, topic: "Law of Torts" },
    { id: 1011, year: 2022, exam: "CLAT 2022", question: "Defamation in written form is called:", options: ["Slander", "Libel", "Tort", "Nuisance"], answer: 1, topic: "Law of Torts" },
    { id: 1012, year: 2021, exam: "CLAT 2021", question: "Nuisance affecting the general public is called:", options: ["Private nuisance", "Public nuisance", "Negligence", "Trespass"], answer: 1, topic: "Law of Torts" },
  ],
  "clat::English::Reading Comprehension": [
    { id: 1020, year: 2023, exam: "CLAT 2023", question: "The author's primary purpose in the passage is to:", options: ["Entertain the reader", "Present a balanced argument", "Criticize government policy", "Describe a historical event"], answer: 1, topic: "Reading Comprehension" },
    { id: 1021, year: 2022, exam: "CLAT 2022", question: "The word 'ubiquitous' as used in the passage most nearly means:", options: ["Rare", "Everywhere", "Dangerous", "Beautiful"], answer: 1, topic: "Reading Comprehension" },
    { id: 1022, year: 2023, exam: "CLAT 2023", question: "Which of the following can be inferred from the passage?", options: ["The author supports the policy", "The author is neutral", "The author opposes the policy", "The author is uncertain"], answer: 2, topic: "Reading Comprehension" },
  ],
  "clat::GK::Constitutional Law": [
    { id: 1030, year: 2023, exam: "CLAT 2023", question: "Which Article provides for equality before law?", options: ["Article 19", "Article 14", "Article 21", "Article 32"], answer: 1, topic: "Constitutional Law" },
    { id: 1031, year: 2022, exam: "CLAT 2022", question: "Right to Constitutional Remedies is under:", options: ["Article 14", "Article 19", "Article 21", "Article 32"], answer: 3, topic: "Constitutional Law" },
    { id: 1032, year: 2021, exam: "CLAT 2021", question: "73rd Amendment is related to:", options: ["Panchayati Raj", "Municipalities", "Fundamental Duties", "GST"], answer: 0, topic: "Constitutional Law" },
    { id: 1033, year: 2023, exam: "CLAT 2023", question: "Kesavananda Bharati case established:", options: ["Judicial review", "Basic structure doctrine", "Right to property", "Emergency provisions"], answer: 1, topic: "Constitutional Law" },
  ],
  "clat::Logical::Critical Reasoning": [
    { id: 1040, year: 2023, exam: "CLAT 2023", question: "Statement: All judges are lawyers. Some lawyers are politicians. Conclusion: Some judges are politicians.", options: ["Definitely true", "Probably true", "Definitely false", "Cannot be determined"], answer: 3, topic: "Critical Reasoning" },
    { id: 1041, year: 2022, exam: "CLAT 2022", question: "If increasing taxes reduces spending, and reduced spending causes recession, then:", options: ["Increasing taxes always causes recession", "Increasing taxes may lead to recession", "Taxes and recession are unrelated", "Recession causes tax increase"], answer: 1, topic: "Critical Reasoning" },
    { id: 1042, year: 2021, exam: "CLAT 2021", question: "Argument: 'We should ban all vehicles because they cause pollution.' This argument is weak because:", options: ["Pollution is not harmful", "It ignores benefits of vehicles", "Vehicles don't cause pollution", "Banning is unconstitutional"], answer: 1, topic: "Critical Reasoning" },
  ],
  "clat::Quantitative::Data Interpretation": [
    { id: 1050, year: 2023, exam: "CLAT 2023", question: "If Company A's revenue was ₹50 Cr in 2022 and ₹60 Cr in 2023, the growth rate is:", options: ["10%", "15%", "20%", "25%"], answer: 2, topic: "Data Interpretation" },
    { id: 1051, year: 2022, exam: "CLAT 2022", question: "A pie chart shows Education: 25%, Health: 20%, Defence: 30%, Others: 25%. If total budget is ₹1000 Cr, Defence spending is:", options: ["₹200 Cr", "₹250 Cr", "₹300 Cr", "₹350 Cr"], answer: 2, topic: "Data Interpretation" },
  ],

  // ═══ BITSAT PYQs ═══
  "bitsat::Physics::Mechanics": [
    { id: 1100, year: 2023, exam: "BITSAT 2023", question: "A ball is dropped from 80m. Time to reach ground (g=10):", options: ["2s", "4s", "8s", "16s"], answer: 1, topic: "Mechanics" },
    { id: 1101, year: 2022, exam: "BITSAT 2022", question: "Two forces 3N and 4N act at right angles. Resultant is:", options: ["1N", "5N", "7N", "12N"], answer: 1, topic: "Mechanics" },
    { id: 1102, year: 2023, exam: "BITSAT 2023", question: "A body of mass 5kg moves at 10m/s. Its momentum is:", options: ["2 kg⋅m/s", "15 kg⋅m/s", "50 kg⋅m/s", "500 kg⋅m/s"], answer: 2, topic: "Mechanics" },
    { id: 1103, year: 2021, exam: "BITSAT 2021", question: "The centripetal acceleration of a body moving in a circle of radius 2m at 4m/s is:", options: ["2 m/s²", "4 m/s²", "8 m/s²", "16 m/s²"], answer: 2, topic: "Mechanics" },
  ],
  "bitsat::Chemistry::Organic": [
    { id: 1110, year: 2023, exam: "BITSAT 2023", question: "IUPAC name of CH₃CH₂OH is:", options: ["Methanol", "Ethanol", "Propanol", "Butanol"], answer: 1, topic: "Organic" },
    { id: 1111, year: 2022, exam: "BITSAT 2022", question: "Benzene undergoes:", options: ["Addition", "Electrophilic substitution", "Nucleophilic substitution", "Elimination"], answer: 1, topic: "Organic" },
    { id: 1112, year: 2021, exam: "BITSAT 2021", question: "Grignard reagent is:", options: ["RLi", "RMgX", "RZnCl", "RNa"], answer: 1, topic: "Organic" },
  ],
  "bitsat::Maths::Calculus": [
    { id: 1120, year: 2023, exam: "BITSAT 2023", question: "d/dx(sin x) =", options: ["cos x", "-cos x", "sin x", "-sin x"], answer: 0, topic: "Calculus" },
    { id: 1121, year: 2022, exam: "BITSAT 2022", question: "∫cos x dx =", options: ["sin x + C", "-sin x + C", "cos x + C", "tan x + C"], answer: 0, topic: "Calculus" },
    { id: 1122, year: 2023, exam: "BITSAT 2023", question: "The maximum value of sin x is:", options: ["0", "1", "2", "∞"], answer: 1, topic: "Calculus" },
  ],
  "bitsat::English::Vocabulary": [
    { id: 1130, year: 2023, exam: "BITSAT 2023", question: "Synonym of 'Gregarious':", options: ["Shy", "Sociable", "Angry", "Silent"], answer: 1, topic: "Vocabulary" },
    { id: 1131, year: 2022, exam: "BITSAT 2022", question: "Antonym of 'Opaque':", options: ["Dark", "Transparent", "Heavy", "Dense"], answer: 1, topic: "Vocabulary" },
  ],

  // ═══ VITEEE PYQs ═══
  "viteee::Physics::Electromagnetism": [
    { id: 1200, year: 2023, exam: "VITEEE 2023", question: "The SI unit of magnetic flux is:", options: ["Tesla", "Weber", "Henry", "Gauss"], answer: 1, topic: "Electromagnetism" },
    { id: 1201, year: 2022, exam: "VITEEE 2022", question: "Faraday's law: emf = ", options: ["dΦ/dt", "-dΦ/dt", "Φ/t", "-Φ×t"], answer: 1, topic: "Electromagnetism" },
    { id: 1202, year: 2023, exam: "VITEEE 2023", question: "A transformer with 100 primary and 500 secondary turns, input 220V gives:", options: ["44V", "1100V", "2200V", "440V"], answer: 1, topic: "Electromagnetism" },
  ],
  "viteee::Chemistry::Physical": [
    { id: 1210, year: 2023, exam: "VITEEE 2023", question: "pH of 0.001 M NaOH is:", options: ["3", "11", "7", "14"], answer: 1, topic: "Physical" },
    { id: 1211, year: 2022, exam: "VITEEE 2022", question: "Rate constant units for first order reaction:", options: ["mol/L/s", "s⁻¹", "L/mol/s", "mol²/L²/s"], answer: 1, topic: "Physical" },
    { id: 1212, year: 2021, exam: "VITEEE 2021", question: "Nernst equation relates EMF to:", options: ["Temperature only", "Concentration of reactants/products", "Pressure only", "Volume"], answer: 1, topic: "Physical" },
  ],
  "viteee::Maths::Algebra": [
    { id: 1220, year: 2023, exam: "VITEEE 2023", question: "If A is 2×2 matrix with |A|=5, then |3A| =", options: ["15", "45", "5", "9"], answer: 1, topic: "Algebra" },
    { id: 1221, year: 2022, exam: "VITEEE 2022", question: "The number of terms in (a+b)¹⁰ is:", options: ["10", "11", "9", "20"], answer: 1, topic: "Algebra" },
  ],
  "viteee::Aptitude::Logical Reasoning": [
    { id: 1230, year: 2023, exam: "VITEEE 2023", question: "If MOUSE is coded as PRXVH, then CHAIR is:", options: ["FKDLU", "FKDLR", "EKDLU", "FLDLU"], answer: 0, topic: "Logical Reasoning" },
    { id: 1231, year: 2022, exam: "VITEEE 2022", question: "Next in series: 2, 3, 5, 7, 11, 13, ?", options: ["15", "17", "19", "21"], answer: 1, topic: "Logical Reasoning" },
  ],

  // ═══ MORE NEET PYQs — Frequently asked chapters ═══
  "neet::Biology::Reproduction": [
    { id: 1300, year: 2023, exam: "NEET 2023", question: "Double fertilization occurs in:", options: ["Gymnosperms", "Angiosperms", "Bryophytes", "Pteridophytes"], answer: 1, topic: "Reproduction" },
    { id: 1301, year: 2022, exam: "NEET 2022", question: "The menstrual cycle is regulated by:", options: ["Thyroid hormones", "FSH and LH", "Insulin", "Adrenaline"], answer: 1, topic: "Reproduction" },
    { id: 1302, year: 2021, exam: "NEET 2021", question: "Corpus luteum secretes:", options: ["Estrogen only", "Progesterone mainly", "FSH", "LH"], answer: 1, topic: "Reproduction" },
    { id: 1303, year: 2023, exam: "NEET 2023", question: "Fertilization in humans occurs in:", options: ["Uterus", "Ampulla of fallopian tube", "Cervix", "Vagina"], answer: 1, topic: "Reproduction" },
  ],
  "neet::Biology::Biotechnology": [
    { id: 1310, year: 2023, exam: "NEET 2023", question: "Restriction enzymes cut DNA at:", options: ["Random sites", "Specific palindromic sequences", "Any AT-rich region", "Telomeres only"], answer: 1, topic: "Biotechnology" },
    { id: 1311, year: 2022, exam: "NEET 2022", question: "PCR requires:", options: ["DNA ligase", "Taq polymerase", "RNA polymerase", "Reverse transcriptase"], answer: 1, topic: "Biotechnology" },
    { id: 1312, year: 2021, exam: "NEET 2021", question: "Bt toxin kills insects by:", options: ["Blocking nerve signals", "Creating pores in midgut", "Destroying DNA", "Inhibiting respiration"], answer: 1, topic: "Biotechnology" },
  ],
  "neet::Physics::Optics": [
    { id: 1320, year: 2023, exam: "NEET 2023", question: "Power of a lens with focal length 50cm is:", options: ["0.5 D", "2 D", "5 D", "50 D"], answer: 1, topic: "Optics" },
    { id: 1321, year: 2022, exam: "NEET 2022", question: "Critical angle for TIR depends on:", options: ["Angle of incidence", "Refractive indices of media", "Color of light only", "Intensity"], answer: 1, topic: "Optics" },
    { id: 1322, year: 2021, exam: "NEET 2021", question: "In Young's double slit, if slit separation is halved, fringe width:", options: ["Halved", "Doubled", "Same", "Quadrupled"], answer: 1, topic: "Optics" },
  ],
  "neet::Chemistry::Electrochemistry": [
    { id: 1330, year: 2023, exam: "NEET 2023", question: "In a galvanic cell, oxidation occurs at:", options: ["Cathode", "Anode", "Salt bridge", "Both electrodes"], answer: 1, topic: "Electrochemistry" },
    { id: 1331, year: 2022, exam: "NEET 2022", question: "Faraday's first law: mass deposited is proportional to:", options: ["Voltage", "Quantity of electricity", "Resistance", "Temperature"], answer: 1, topic: "Electrochemistry" },
    { id: 1332, year: 2021, exam: "NEET 2021", question: "Standard hydrogen electrode has E° =", options: ["-1V", "0V", "+1V", "+0.5V"], answer: 1, topic: "Electrochemistry" },
  ],

};

// Helper to get questions for a topic
export const getTopicQuestions = (examId: string, subject: string, topicName: string): PYQQuestion[] => {
  // Handle exam ID aliases
  const idMap: Record<string, string> = { 'neet-ug': 'neet', 'jee-main': 'jee-main', 'bitsat': 'bitsat', 'viteee': 'viteee', 'clat': 'clat' };
  const resolvedId = idMap[examId] || examId;
  const key = `${resolvedId}::${subject}::${topicName}`;
  return pyqQuestions[key] || [];
};
