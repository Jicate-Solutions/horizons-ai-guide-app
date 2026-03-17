// Official syllabus + recommended books for each exam topic

export interface TopicSyllabus {
  officialTopics: string[];
  books: { name: string; author: string; why: string }[];
}

export type SyllabusMap = Record<string, Record<string, TopicSyllabus>>;

export const syllabusData: SyllabusMap = {
  // ═══ JEE MAIN — PHYSICS ═══
  "jee-main::Physics": {
    "Units & Measurements": {
      officialTopics: ["Units of measurement", "Systems of units", "SI units", "Dimensional analysis", "Errors in measurement", "Significant figures", "Vernier caliper", "Screw gauge"],
      books: [
        { name: "Concepts of Physics Vol. 1", author: "H.C. Verma", why: "Best for conceptual understanding — Chapter 1 covers units, dimensions, errors" },
        { name: "NCERT Physics Class 11", author: "NCERT", why: "Must-read — official NTA syllabus follows NCERT exactly" },
      ],
    },
    "Rotational Motion": {
      officialTopics: ["Centre of mass", "Moment of inertia", "Torque", "Angular momentum", "Conservation of angular momentum", "Rolling motion", "Radius of gyration", "Parallel & perpendicular axis theorem"],
      books: [
        { name: "Concepts of Physics Vol. 1", author: "H.C. Verma", why: "Chapters 9-10 — excellent problems on rotation and rolling" },
        { name: "NCERT Physics Class 11", author: "NCERT", why: "Chapter 7: System of Particles and Rotational Motion" },
        { name: "Problems in General Physics", author: "I.E. Irodov", why: "Advanced problems — for JEE Advanced level preparation" },
      ],
    },
    "Laws of Motion": {
      officialTopics: ["Newton's three laws", "Friction — static & kinetic", "Pseudo forces", "Free body diagrams", "Connected bodies", "Circular motion forces", "Equilibrium"],
      books: [
        { name: "Concepts of Physics Vol. 1", author: "H.C. Verma", why: "Chapters 5-7 — best problem sets for Newton's laws" },
        { name: "NCERT Physics Class 11", author: "NCERT", why: "Chapter 5: Laws of Motion — covers all NTA-level concepts" },
      ],
    },
    "Work Power & Energy": {
      officialTopics: ["Work done by constant/variable force", "Kinetic energy", "Potential energy", "Work-energy theorem", "Conservation of energy", "Power", "Collisions — elastic & inelastic"],
      books: [
        { name: "Concepts of Physics Vol. 1", author: "H.C. Verma", why: "Chapter 8 — Work and Energy with excellent examples" },
        { name: "NCERT Physics Class 11", author: "NCERT", why: "Chapter 6: Work, Energy and Power" },
      ],
    },
    "Electrostatics": {
      officialTopics: ["Coulomb's law", "Electric field", "Electric potential", "Gauss's law", "Capacitors", "Dielectrics", "Electric dipole", "Energy stored in capacitor"],
      books: [
        { name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "Chapters 29-32 — best for electrostatics problems" },
        { name: "NCERT Physics Class 12", author: "NCERT", why: "Chapters 1-2: Electric Charges, Electrostatic Potential" },
      ],
    },
    "Current Electricity": {
      officialTopics: ["Ohm's law", "Kirchhoff's laws", "Wheatstone bridge", "Meter bridge", "Potentiometer", "Internal resistance", "Series & parallel combinations", "Electrical energy & power"],
      books: [
        { name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "Chapter 32 — Electric Current in Conductors" },
        { name: "NCERT Physics Class 12", author: "NCERT", why: "Chapter 3: Current Electricity" },
      ],
    },
    "Gravitation": {
      officialTopics: ["Newton's law of gravitation", "Gravitational field & potential", "Kepler's laws", "Escape velocity", "Orbital velocity", "Satellites", "Variation of g with altitude/depth"],
      books: [
        { name: "Concepts of Physics Vol. 1", author: "H.C. Verma", why: "Chapter 11 — Gravitation" },
        { name: "NCERT Physics Class 11", author: "NCERT", why: "Chapter 8: Gravitation" },
      ],
    },
    "Heat and Thermodynamics": {
      officialTopics: ["Laws of thermodynamics", "Heat transfer", "Carnot engine", "Isothermal & adiabatic processes", "Specific heat", "Calorimetry", "Kinetic theory of gases", "Entropy"],
      books: [
        { name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "Chapters 23-28 — Heat and Thermodynamics" },
        { name: "NCERT Physics Class 11", author: "NCERT", why: "Chapters 11-13: Thermal Physics, Thermodynamics, Kinetic Theory" },
      ],
    },
    "Electromagnetic Induction": {
      officialTopics: ["Faraday's law", "Lenz's law", "Self & mutual inductance", "AC circuits", "Transformers", "LC oscillations", "Eddy currents"],
      books: [
        { name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "Chapters 38-40 — EMI and AC" },
        { name: "NCERT Physics Class 12", author: "NCERT", why: "Chapters 6-7: Electromagnetic Induction, Alternating Current" },
      ],
    },
  },

  // ═══ JEE MAIN — CHEMISTRY ═══
  "jee-main::Chemistry": {
    "Periodic Table & Classification": {
      officialTopics: ["Modern periodic law", "Periodic trends — atomic radius, ionization energy, electron affinity, electronegativity", "s, p, d, f block elements", "Diagonal relationship"],
      books: [
        { name: "NCERT Chemistry Class 11", author: "NCERT", why: "Chapter 3: Classification of Elements — NTA follows this exactly" },
        { name: "Inorganic Chemistry", author: "J.D. Lee (Concise)", why: "For deeper understanding of periodic trends" },
      ],
    },
    "Chemical Bonding": {
      officialTopics: ["Ionic bond", "Covalent bond", "VSEPR theory", "Hybridization", "Molecular orbital theory", "Hydrogen bonding", "Bond parameters"],
      books: [
        { name: "NCERT Chemistry Class 11", author: "NCERT", why: "Chapter 4: Chemical Bonding and Molecular Structure" },
        { name: "Organic Chemistry", author: "Morrison & Boyd", why: "Chapter 1-2 for bonding fundamentals" },
      ],
    },
    "Thermodynamics": {
      officialTopics: ["First & second law", "Enthalpy", "Entropy", "Gibbs free energy", "Hess's law", "Bond energy", "Spontaneity"],
      books: [
        { name: "NCERT Chemistry Class 11", author: "NCERT", why: "Chapter 6: Thermodynamics" },
        { name: "Physical Chemistry", author: "O.P. Tandon", why: "Detailed problems on thermochemistry" },
      ],
    },
    "Some Basic Concepts of Chemistry": {
      officialTopics: ["Mole concept", "Stoichiometry", "Equivalent weight", "Molarity, Molality, Normality", "Limiting reagent", "Empirical & molecular formula"],
      books: [
        { name: "NCERT Chemistry Class 11", author: "NCERT", why: "Chapter 1: Some Basic Concepts of Chemistry" },
        { name: "Physical Chemistry", author: "O.P. Tandon", why: "Best for mole concept numerical problems" },
      ],
    },
  },

  // ═══ JEE MAIN — MATHS ═══
  "jee-main::Maths": {
    "Sequences & Series": {
      officialTopics: ["AP, GP, HP", "Sum of n terms", "Arithmetic mean, Geometric mean", "Infinite GP", "Special series — Σn, Σn², Σn³"],
      books: [
        { name: "NCERT Maths Class 11", author: "NCERT", why: "Chapter 9: Sequences and Series" },
        { name: "IIT Mathematics", author: "M.L. Khanna", why: "Extensive problems on AP, GP, HP" },
      ],
    },
    "Probability": {
      officialTopics: ["Classical probability", "Conditional probability", "Bayes' theorem", "Random variables", "Binomial distribution", "Independent events"],
      books: [
        { name: "NCERT Maths Class 11 & 12", author: "NCERT", why: "Chapter 16 (Class 11) + Chapter 13 (Class 12)" },
        { name: "IIT Mathematics", author: "M.L. Khanna", why: "Chapter on Probability — excellent JEE-level problems" },
      ],
    },
    "Matrices & Determinants": {
      officialTopics: ["Types of matrices", "Matrix operations", "Determinant properties", "Inverse of matrix", "Cramer's rule", "Rank of matrix"],
      books: [
        { name: "NCERT Maths Class 12", author: "NCERT", why: "Chapters 3-4: Matrices and Determinants" },
        { name: "Higher Algebra", author: "S.K. Goyal (Arihant)", why: "Detailed problems for JEE" },
      ],
    },
  },

  // ═══ NEET — BIOLOGY ═══
  "neet::Biology": {
    "Genetics": {
      officialTopics: ["Mendel's laws", "Monohybrid & dihybrid cross", "Incomplete dominance", "Codominance", "Linkage", "Sex determination", "Mutation", "Chromosomal disorders"],
      books: [
        { name: "NCERT Biology Class 12", author: "NCERT", why: "Chapter 5: Principles of Inheritance — NEET asks directly from NCERT" },
        { name: "Trueman's Biology Vol. 2", author: "Trueman", why: "Extra MCQs for NEET practice on genetics" },
      ],
    },
    "Human Physiology": {
      officialTopics: ["Digestion", "Breathing", "Body fluids & circulation", "Excretory system", "Nervous system", "Endocrine system", "Locomotion & movement"],
      books: [
        { name: "NCERT Biology Class 11", author: "NCERT", why: "Chapters 16-22: All human physiology chapters — NEET gold mine" },
        { name: "Pradeep's Biology", author: "Pradeep", why: "Diagrams and MCQs beyond NCERT" },
      ],
    },
    "Cell Biology & Biomolecules": {
      officialTopics: ["Cell structure", "Cell organelles", "Cell cycle", "Mitosis & meiosis", "Biomolecules — carbohydrates, proteins, lipids, nucleic acids", "Enzymes"],
      books: [
        { name: "NCERT Biology Class 11", author: "NCERT", why: "Chapters 8-10: Cell — The Unit of Life, Biomolecules, Cell Cycle" },
        { name: "Trueman's Biology Vol. 1", author: "Trueman", why: "Detailed diagrams and NEET MCQs" },
      ],
    },
    "Ecology & Environment": {
      officialTopics: ["Ecosystem", "Food chain & food web", "Energy flow", "Biogeochemical cycles", "Biodiversity", "Environmental issues", "Pollution"],
      books: [
        { name: "NCERT Biology Class 12", author: "NCERT", why: "Chapters 13-16: Ecology unit — high-weightage in NEET" },
        { name: "Shankar IAS Environment", author: "Shankar", why: "For environmental issues and biodiversity" },
      ],
    },
    "Plant Kingdom": {
      officialTopics: ["Algae, Bryophytes, Pteridophytes, Gymnosperms, Angiosperms", "Plant morphology", "Anatomy of flowering plants", "Plant growth & development"],
      books: [
        { name: "NCERT Biology Class 11", author: "NCERT", why: "Chapters 3-5: Plant Kingdom, Morphology, Anatomy" },
        { name: "Pradeep's Biology", author: "Pradeep", why: "Comparative tables and diagrams" },
      ],
    },
  },

  // ═══ NEET — CHEMISTRY ═══
  "neet::Chemistry": {
    "Organic Chemistry": {
      officialTopics: ["IUPAC nomenclature", "Isomerism", "Reaction mechanisms", "Hydrocarbons", "Alcohols, Phenols, Ethers", "Aldehydes, Ketones, Carboxylic acids", "Amines", "Biomolecules"],
      books: [
        { name: "NCERT Chemistry Class 11 & 12", author: "NCERT", why: "Organic chemistry chapters — NEET follows NCERT line-by-line" },
        { name: "Organic Chemistry", author: "Morrison & Boyd", why: "For reaction mechanisms and deeper understanding" },
      ],
    },
    "Chemical Equilibrium": {
      officialTopics: ["Law of mass action", "Equilibrium constant Kc, Kp", "Le Chatelier's principle", "Ionic equilibrium", "pH, buffer solutions", "Solubility product"],
      books: [
        { name: "NCERT Chemistry Class 11", author: "NCERT", why: "Chapter 7: Equilibrium" },
        { name: "Physical Chemistry", author: "O.P. Tandon", why: "Numerical problems on equilibrium" },
      ],
    },
  },
};

export const getTopicSyllabus = (examId: string, subject: string, topicName: string): TopicSyllabus | null => {
  const idMap: Record<string, string> = { 'neet-ug': 'neet' };
  const resolvedId = idMap[examId] || examId;
  const key = `${resolvedId}::${subject}`;
  return syllabusData[key]?.[topicName] || null;
};

// ═══ JEE ADVANCED — PHYSICS ═══
syllabusData["jee-advanced::Physics"] = {
  "Rotational Motion": { officialTopics: ["Moment of inertia", "Torque", "Angular momentum conservation", "Rolling without slipping", "Fixed axis rotation", "Rotation about moving axis", "Combined translational and rotational motion"], books: [{ name: "Concepts of Physics Vol. 1", author: "H.C. Verma", why: "Must solve all rotation problems — Ch 9-10" }, { name: "Problems in General Physics", author: "I.E. Irodov", why: "JEE Advanced level rotation problems" }, { name: "NCERT Physics Class 11", author: "NCERT", why: "Chapter 7 — build fundamentals first" }] },
  "Electrostatics": { officialTopics: ["Coulomb's law", "Gauss's law applications", "Electric potential", "Capacitors with dielectrics", "Conductors in electric field", "Energy in electric field", "Method of images"], books: [{ name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "Ch 29-32 — best for JEE Advanced electrostatics" }, { name: "Introduction to Electrodynamics", author: "Griffiths (selected chapters)", why: "For deeper understanding of Gauss's law" }] },
  "Optics": { officialTopics: ["Reflection & refraction", "Thin lens formula", "Interference — Young's double slit", "Diffraction — single slit", "Polarization", "Optical instruments", "Total internal reflection"], books: [{ name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "Optics chapters — covers all JEE Advanced patterns" }, { name: "Optics", author: "Ajoy Ghatak", why: "For wave optics deep understanding" }] },
};
syllabusData["jee-advanced::Chemistry"] = {
  "Organic Chemistry": { officialTopics: ["IUPAC nomenclature", "Isomerism — structural & stereo", "Reaction mechanisms — SN1, SN2, E1, E2", "Named reactions", "Functional group transformations", "Grignard reagent", "Aldol condensation", "Aromatic chemistry"], books: [{ name: "Organic Chemistry", author: "Morrison & Boyd", why: "Gold standard for reaction mechanisms" }, { name: "Organic Chemistry", author: "M.S. Chauhan", why: "Best problem book for JEE Advanced organic" }, { name: "NCERT Chemistry Class 11 & 12", author: "NCERT", why: "Covers all named reactions for JEE" }] },
  "Inorganic Chemistry": { officialTopics: ["Coordination compounds", "Metallurgy", "Qualitative analysis", "d-block & f-block elements", "Chemical bonding in complexes", "Crystal field theory"], books: [{ name: "Concise Inorganic Chemistry", author: "J.D. Lee", why: "Best reference for coordination chemistry and d-block" }, { name: "NCERT Chemistry Class 12", author: "NCERT", why: "Chapters 8-9 — d-block, coordination compounds" }] },
};
syllabusData["jee-advanced::Maths"] = {
  "Calculus": { officialTopics: ["Limits & continuity", "Differentiability", "Application of derivatives", "Definite & indefinite integrals", "Area under curves", "Differential equations"], books: [{ name: "IIT Mathematics", author: "M.L. Khanna", why: "Comprehensive calculus problems for JEE Advanced" }, { name: "Problems in Calculus of One Variable", author: "I.A. Maron", why: "Advanced integration and application problems" }, { name: "NCERT Maths Class 12", author: "NCERT", why: "Chapters 5-9 — build foundation" }] },
  "Algebra": { officialTopics: ["Complex numbers", "Quadratic equations", "Permutations & combinations", "Binomial theorem", "Matrices & determinants", "Mathematical induction", "Sequences & series"], books: [{ name: "Higher Algebra", author: "Hall & Knight", why: "Classic algebra problems — must for JEE Advanced" }, { name: "IIT Mathematics", author: "M.L. Khanna", why: "Algebra chapters — extensive problem sets" }] },
};

// ═══ BITSAT ═══
syllabusData["bitsat::Physics"] = {
  "Mechanics": { officialTopics: ["Newton's laws", "Work, energy, power", "Rotational motion", "Gravitation", "Properties of matter", "Oscillations & waves"], books: [{ name: "Concepts of Physics Vol. 1", author: "H.C. Verma", why: "All mechanics chapters — BITSAT follows same syllabus as JEE" }, { name: "NCERT Physics Class 11", author: "NCERT", why: "All chapters — BITSAT is NCERT-based" }] },
  "Electrodynamics": { officialTopics: ["Electrostatics", "Current electricity", "Magnetic effects", "EMI", "AC circuits", "EM waves"], books: [{ name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "All electricity & magnetism chapters" }, { name: "NCERT Physics Class 12", author: "NCERT", why: "Chapters 1-8 — direct questions in BITSAT" }] },
};
syllabusData["bitsat::Chemistry"] = {
  "Physical Chemistry": { officialTopics: ["Atomic structure", "Thermodynamics", "Chemical equilibrium", "Electrochemistry", "Chemical kinetics", "Surface chemistry"], books: [{ name: "NCERT Chemistry Class 11 & 12", author: "NCERT", why: "BITSAT follows NCERT syllabus exactly" }, { name: "Physical Chemistry", author: "O.P. Tandon", why: "Numerical problems for physical chemistry" }] },
  "Organic Chemistry": { officialTopics: ["Hydrocarbons", "Haloalkanes", "Alcohols & phenols", "Aldehydes & ketones", "Carboxylic acids", "Amines", "Biomolecules"], books: [{ name: "NCERT Chemistry Class 11 & 12", author: "NCERT", why: "All organic chapters — BITSAT asks NCERT-level" }, { name: "Organic Chemistry", author: "Morrison & Boyd", why: "For deeper mechanism understanding" }] },
};
syllabusData["bitsat::Maths"] = {
  "Algebra & Trigonometry": { officialTopics: ["Complex numbers", "Quadratic equations", "Sequences & series", "Permutations", "Binomial theorem", "Trigonometric functions", "Inverse trig"], books: [{ name: "NCERT Maths Class 11", author: "NCERT", why: "All algebra + trig chapters" }, { name: "IIT Mathematics", author: "M.L. Khanna", why: "Extra practice problems" }] },
  "Calculus & Coordinate Geometry": { officialTopics: ["Limits & derivatives", "Integrals", "Differential equations", "Straight lines", "Circles", "Conics", "Vectors & 3D"], books: [{ name: "NCERT Maths Class 12", author: "NCERT", why: "Calculus + coordinate geometry chapters" }, { name: "Coordinate Geometry", author: "S.L. Loney", why: "Classic problems on conics" }] },
};

// ═══ VITEEE ═══
syllabusData["viteee::Physics"] = {
  "Mechanics & Thermodynamics": { officialTopics: ["Laws of motion", "Work & energy", "Rotational mechanics", "Gravitation", "Properties of matter", "Heat & thermodynamics", "Oscillations"], books: [{ name: "NCERT Physics Class 11", author: "NCERT", why: "VITEEE is 100% NCERT-based — read line by line" }, { name: "Concepts of Physics Vol. 1", author: "H.C. Verma", why: "For practice problems" }] },
  "Electrodynamics & Modern Physics": { officialTopics: ["Electrostatics", "Current electricity", "Magnetism", "EMI", "Optics", "Dual nature", "Atoms & nuclei", "Semiconductor"], books: [{ name: "NCERT Physics Class 12", author: "NCERT", why: "All chapters — VITEEE directly asks from NCERT" }, { name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "Problem solving practice" }] },
};
syllabusData["viteee::Chemistry"] = {
  "Physical & Inorganic": { officialTopics: ["Atomic structure", "Periodic table", "Chemical bonding", "Thermodynamics", "Equilibrium", "Redox reactions", "Coordination compounds", "Metallurgy"], books: [{ name: "NCERT Chemistry Class 11 & 12", author: "NCERT", why: "VITEEE follows NCERT — most questions directly from textbook" }, { name: "Concise Inorganic Chemistry", author: "J.D. Lee", why: "For periodic table trends and d-block" }] },
  "Organic Chemistry": { officialTopics: ["IUPAC nomenclature", "Isomerism", "Hydrocarbons", "Alcohols, phenols, ethers", "Carbonyl compounds", "Amines", "Biomolecules & polymers"], books: [{ name: "NCERT Chemistry Class 11 & 12", author: "NCERT", why: "Organic chapters — VITEEE is NCERT-heavy" }, { name: "Organic Chemistry", author: "Morrison & Boyd", why: "For mechanism understanding" }] },
};
syllabusData["viteee::Maths"] = {
  "Algebra & Calculus": { officialTopics: ["Matrices & determinants", "Complex numbers", "Trigonometry", "Probability", "Limits & derivatives", "Integrals", "Differential equations", "Vectors"], books: [{ name: "NCERT Maths Class 11 & 12", author: "NCERT", why: "All chapters — VITEEE is NCERT-based" }, { name: "IIT Mathematics", author: "M.L. Khanna", why: "Extra problem practice" }] },
};

// ═══ SRMJEEE ═══
syllabusData["srmjeee::Physics"] = {
  "Mechanics & Waves": { officialTopics: ["Units & measurements", "Kinematics", "Laws of motion", "Work & energy", "Gravitation", "Properties of matter", "Oscillations & waves"], books: [{ name: "NCERT Physics Class 11", author: "NCERT", why: "SRMJEEE is entirely NCERT-based" }, { name: "Concepts of Physics Vol. 1", author: "H.C. Verma", why: "Practice problems for mechanics" }] },
  "Electricity & Modern Physics": { officialTopics: ["Electrostatics", "Current electricity", "Magnetism", "EMI & AC", "Optics", "Modern physics", "Semiconductor"], books: [{ name: "NCERT Physics Class 12", author: "NCERT", why: "All chapters covered in SRMJEEE" }, { name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "Additional practice" }] },
};
syllabusData["srmjeee::Chemistry"] = {
  "Chemistry": { officialTopics: ["Atomic structure", "Chemical bonding", "Periodic table", "Thermodynamics", "Equilibrium", "Electrochemistry", "Organic chemistry — all chapters", "Biomolecules"], books: [{ name: "NCERT Chemistry Class 11 & 12", author: "NCERT", why: "SRMJEEE follows NCERT completely" }, { name: "Physical Chemistry", author: "O.P. Tandon", why: "For numerical problems" }] },
};
syllabusData["srmjeee::Maths"] = {
  "Mathematics": { officialTopics: ["Sets & relations", "Complex numbers", "Matrices", "Trigonometry", "Sequences & series", "Calculus — limits, derivatives, integrals", "Probability", "Vectors & 3D", "Coordinate geometry"], books: [{ name: "NCERT Maths Class 11 & 12", author: "NCERT", why: "SRMJEEE follows NCERT syllabus" }, { name: "IIT Mathematics", author: "M.L. Khanna", why: "Additional problem practice" }] },
};

// ═══ CUET-UG ═══
syllabusData["cuet::English"] = {
  "English Language": { officialTopics: ["Reading comprehension", "Vocabulary — synonyms, antonyms", "Grammar — tenses, articles, prepositions", "Sentence correction", "Idioms & phrases", "Fill in the blanks", "Para jumbles", "Cloze test"], books: [{ name: "NCERT English Class 12 — Flamingo & Vistas", author: "NCERT", why: "CUET English is directly from NCERT 12th textbooks" }, { name: "Word Power Made Easy", author: "Norman Lewis", why: "Best for vocabulary building" }, { name: "Wren & Martin English Grammar", author: "Wren & Martin", why: "Complete grammar reference" }] },
};
syllabusData["cuet::General Test"] = {
  "General Knowledge & Reasoning": { officialTopics: ["Current affairs", "General knowledge", "Numerical ability", "Logical reasoning", "Quantitative reasoning", "General mental ability"], books: [{ name: "Lucent's General Knowledge", author: "Lucent", why: "Best GK reference book for all competitive exams" }, { name: "CUET Previous Year Papers", author: "NTA", why: "Solve last 3 years papers — pattern repeats" }, { name: "Quantitative Aptitude", author: "R.S. Aggarwal", why: "For numerical ability section" }] },
};

// ═══ CLAT ═══
syllabusData["clat::English"] = {
  "English Language": { officialTopics: ["Reading comprehension — 450-word passages", "Vocabulary in context", "Critical reasoning from passages", "Grammar & sentence correction", "Inference questions"], books: [{ name: "Word Power Made Easy", author: "Norman Lewis", why: "Essential for CLAT vocabulary" }, { name: "High School English Grammar", author: "Wren & Martin", why: "Grammar fundamentals" }, { name: "CLAT Previous Year Papers", author: "Various", why: "Best way to understand passage-based format" }] },
};
syllabusData["clat::Legal Aptitude"] = {
  "Legal Reasoning": { officialTopics: ["Legal principles & rules", "Passage-based legal reasoning", "Indian Constitution basics", "Fundamental rights", "Landmark judgments awareness", "Legal maxims", "Contracts Act basics"], books: [{ name: "Legal Aptitude for CLAT", author: "A.P. Bhardwaj", why: "Best CLAT-specific legal reasoning book" }, { name: "Indian Polity", author: "M. Laxmikanth", why: "Chapters on Fundamental Rights, DPSP, Constitution" }, { name: "CLAT Previous Year Papers", author: "Consortium of NLUs", why: "Understand passage-based legal reasoning pattern" }] },
};
syllabusData["clat::General Knowledge"] = {
  "Current Affairs & GK": { officialTopics: ["Current affairs — last 12 months", "National & international events", "Awards & honours", "Government schemes", "Legal news & judgments", "Sports, science, economy"], books: [{ name: "The Hindu / Indian Express", author: "Daily newspaper", why: "Read daily for 6 months — most GK comes from newspapers" }, { name: "Lucent's General Knowledge", author: "Lucent", why: "Static GK reference" }, { name: "Monthly current affairs magazine", author: "Pratiyogita Darpan / Competition Success", why: "Monthly compilation of important events" }] },
};

// ═══ NDA ═══
syllabusData["nda::Maths"] = {
  "Mathematics (Paper I)": { officialTopics: ["Algebra — matrices, determinants, complex numbers", "Trigonometry", "Analytical geometry — 2D & 3D", "Calculus — differential & integral", "Vectors", "Statistics & probability"], books: [{ name: "NDA Mathematics", author: "R.S. Aggarwal", why: "Written specifically for NDA maths paper" }, { name: "NCERT Maths Class 11 & 12", author: "NCERT", why: "NDA maths is based on 10+2 NCERT syllabus" }, { name: "Quantitative Aptitude", author: "R.S. Aggarwal", why: "For quick calculation practice" }] },
};
syllabusData["nda::General Ability"] = {
  "GAT (Paper II)": { officialTopics: ["English — grammar, vocabulary, comprehension", "Physics — mechanics, heat, optics", "Chemistry — physical, organic, inorganic", "General science", "History of India", "Geography", "Current affairs & defence"], books: [{ name: "NDA/NA Exam Guide", author: "Arihant / Pathfinder", why: "Complete NDA preparation guide with all subjects" }, { name: "Lucent's General Knowledge", author: "Lucent", why: "History, geography, polity, science in one book" }, { name: "NCERT Science & Social Science (6-12)", author: "NCERT", why: "NDA GAT covers school-level science and social studies" }] },
};

// ═══ TNAU ═══
syllabusData["tnau::Biology"] = {
  "Biology (Botany + Zoology)": { officialTopics: ["Cell biology", "Genetics & evolution", "Plant physiology", "Plant taxonomy", "Ecology", "Biotechnology", "Human physiology", "Reproduction"], books: [{ name: "NCERT Biology Class 11 & 12", author: "NCERT", why: "TNAU admission is based on 12th marks — NCERT is the textbook" }, { name: "Tamil Nadu State Board Biology", author: "TN Textbook Corp", why: "If you studied in TN state board, this IS your syllabus" }, { name: "Trueman's Biology", author: "Trueman", why: "Additional MCQs for practice" }] },
};
syllabusData["tnau::Chemistry"] = {
  "Chemistry": { officialTopics: ["Atomic structure", "Chemical bonding", "Coordination chemistry", "Organic chemistry", "Biomolecules", "Environmental chemistry", "Electrochemistry"], books: [{ name: "NCERT Chemistry Class 11 & 12", author: "NCERT", why: "TNAU considers 12th marks — score well in board exam" }, { name: "Tamil Nadu State Board Chemistry", author: "TN Textbook Corp", why: "State board students — this is your syllabus" }] },
};

// ═══ CA FOUNDATION ═══
syllabusData["ca-cs-cma-foundation::Accounting"] = {
  "Principles of Accounting": { officialTopics: ["Accounting concepts & conventions", "Journal entries", "Ledger & trial balance", "Final accounts", "Depreciation", "Inventory valuation", "Bank reconciliation", "Bills of exchange", "Partnership accounts", "Company accounts"], books: [{ name: "CA Foundation Study Material", author: "ICAI", why: "Official ICAI study material — exam is set from this book only" }, { name: "Principles of Accounting", author: "T.S. Grewal", why: "Best for building accounting fundamentals" }, { name: "CA Foundation Scanner", author: "Suchitra Prakashan", why: "Solved past papers chapter-wise" }] },
};
syllabusData["ca-cs-cma-foundation::Law"] = {
  "Business Law": { officialTopics: ["Indian Contract Act 1872", "Sale of Goods Act 1930", "Indian Partnership Act 1932", "LLP Act 2008", "Companies Act 2013 — basics", "Negotiable Instruments Act"], books: [{ name: "CA Foundation Study Material — Paper 2", author: "ICAI", why: "Official ICAI material — exam follows this exactly" }, { name: "Business Laws", author: "N.D. Kapoor", why: "Simplified explanation of all Acts" }] },
};
syllabusData["ca-cs-cma-foundation::Maths"] = {
  "Business Mathematics & Statistics": { officialTopics: ["Ratio & proportion", "Simple & compound interest", "Permutations & combinations", "Sequences & series", "Sets & functions", "Measures of central tendency", "Probability", "Theoretical distributions", "Correlation & regression", "Index numbers"], books: [{ name: "CA Foundation Study Material — Paper 3A", author: "ICAI", why: "Official material — follow this for exam" }, { name: "Business Mathematics", author: "R.S. Aggarwal", why: "Easy explanations with solved examples" }] },
};
syllabusData["ca-cs-cma-foundation::Economics"] = {
  "Business Economics": { officialTopics: ["Demand & supply", "Consumer behaviour", "Production & costs", "Market structure — perfect competition, monopoly, oligopoly", "National income", "Business cycles", "Money & banking", "Government budget"], books: [{ name: "CA Foundation Study Material — Paper 4", author: "ICAI", why: "Official ICAI economics material" }, { name: "Indian Economy", author: "Ramesh Singh", why: "For Indian economy context" }, { name: "Microeconomics & Macroeconomics", author: "NCERT Class 11 & 12", why: "Build economics fundamentals" }] },
};
