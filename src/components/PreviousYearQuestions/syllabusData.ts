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

// ═══════════════════════════════════════════
// NEET — PHYSICS (Missing — Adding Now)
// ═══════════════════════════════════════════
syllabusData["neet::Physics"] = {
  "Physics and Measurement": { officialTopics: ["Units & dimensions", "Dimensional analysis", "Errors in measurement", "Significant figures", "SI units"], books: [{ name: "NCERT Physics Class 11", author: "NCERT", why: "Chapter 2 — NEET follows NCERT exactly" }, { name: "Concepts of Physics Vol. 1", author: "H.C. Verma", why: "Chapter 1 — conceptual problems" }] },
  "Kinematics": { officialTopics: ["Speed & velocity", "Acceleration", "Equations of motion", "Projectile motion", "Relative motion", "Motion in a plane"], books: [{ name: "NCERT Physics Class 11", author: "NCERT", why: "Chapters 3-4: Motion in Straight Line & Plane" }, { name: "Concepts of Physics Vol. 1", author: "H.C. Verma", why: "Chapters 3-4 — excellent kinematics problems" }] },
  "Laws of Motion": { officialTopics: ["Newton's laws", "Friction", "Free body diagrams", "Pseudo forces", "Connected bodies"], books: [{ name: "NCERT Physics Class 11", author: "NCERT", why: "Chapter 5: Laws of Motion" }, { name: "Concepts of Physics Vol. 1", author: "H.C. Verma", why: "Chapters 5-6 — Newton's laws problems" }] },
  "Work, Energy and Power": { officialTopics: ["Work-energy theorem", "KE & PE", "Conservation of energy", "Power", "Collisions"], books: [{ name: "NCERT Physics Class 11", author: "NCERT", why: "Chapter 6: Work, Energy and Power" }, { name: "Concepts of Physics Vol. 1", author: "H.C. Verma", why: "Chapter 8 — Work and Energy" }] },
  "Gravitation": { officialTopics: ["Newton's law of gravitation", "g and its variation", "Kepler's laws", "Escape velocity", "Satellites"], books: [{ name: "NCERT Physics Class 11", author: "NCERT", why: "Chapter 8: Gravitation" }, { name: "Concepts of Physics Vol. 1", author: "H.C. Verma", why: "Chapter 11 — Gravitation" }] },
  "Properties of Solids and Liquids": { officialTopics: ["Elasticity", "Stress & strain", "Viscosity", "Surface tension", "Bernoulli's principle", "Fluid mechanics"], books: [{ name: "NCERT Physics Class 11", author: "NCERT", why: "Chapters 9-10: Mechanical Properties" }, { name: "Concepts of Physics Vol. 1", author: "H.C. Verma", why: "Chapters 13-14 — Fluids" }] },
  "Thermodynamics": { officialTopics: ["Laws of thermodynamics", "Isothermal & adiabatic", "Carnot engine", "Heat transfer", "Specific heat", "Kinetic theory"], books: [{ name: "NCERT Physics Class 11", author: "NCERT", why: "Chapters 11-13: Thermal Physics" }, { name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "Chapters 23-28 — Thermodynamics" }] },
  "Oscillations and Waves": { officialTopics: ["SHM", "Spring-mass system", "Pendulum", "Transverse & longitudinal waves", "Superposition", "Doppler effect"], books: [{ name: "NCERT Physics Class 11", author: "NCERT", why: "Chapters 14-15: Oscillations and Waves" }, { name: "Concepts of Physics Vol. 1", author: "H.C. Verma", why: "Chapters 12, 15-17 — SHM and Waves" }] },
  "Electrostatics": { officialTopics: ["Coulomb's law", "Electric field", "Gauss's law", "Potential", "Capacitors", "Dielectrics"], books: [{ name: "NCERT Physics Class 12", author: "NCERT", why: "Chapters 1-2: Electrostatics" }, { name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "Chapters 29-31 — Electrostatics" }] },
  "Current Electricity": { officialTopics: ["Ohm's law", "Kirchhoff's laws", "Wheatstone bridge", "Potentiometer", "Internal resistance"], books: [{ name: "NCERT Physics Class 12", author: "NCERT", why: "Chapter 3: Current Electricity" }, { name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "Chapter 32 — Electric Current" }] },
  "Magnetic Effects of Current and Magnetism": { officialTopics: ["Biot-Savart law", "Ampere's law", "Force on current-carrying conductor", "Solenoid", "Magnetic properties of matter"], books: [{ name: "NCERT Physics Class 12", author: "NCERT", why: "Chapters 4-5: Magnetism" }, { name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "Chapters 34-36 — Magnetic Field" }] },
  "Electromagnetic Induction and AC": { officialTopics: ["Faraday's law", "Lenz's law", "Self & mutual inductance", "AC circuits", "Transformers", "LC oscillations"], books: [{ name: "NCERT Physics Class 12", author: "NCERT", why: "Chapters 6-7: EMI and AC" }, { name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "Chapters 38-40 — EMI" }] },
  "Optics": { officialTopics: ["Reflection & refraction", "Lenses & mirrors", "Optical instruments", "Wave optics", "Interference", "Diffraction", "Polarization"], books: [{ name: "NCERT Physics Class 12", author: "NCERT", why: "Chapters 9-10: Ray Optics & Wave Optics" }, { name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "Chapters 18-22 — Optics" }] },
  "Dual Nature of Matter and Radiation": { officialTopics: ["Photoelectric effect", "de Broglie wavelength", "Matter waves", "Davisson-Germer experiment"], books: [{ name: "NCERT Physics Class 12", author: "NCERT", why: "Chapter 11: Dual Nature of Radiation and Matter" }, { name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "Chapter 42 — Photoelectric Effect" }] },
  "Atoms and Nuclei": { officialTopics: ["Bohr model", "Hydrogen spectrum", "Radioactivity", "Nuclear fission & fusion", "Mass-energy relation", "Binding energy"], books: [{ name: "NCERT Physics Class 12", author: "NCERT", why: "Chapters 12-13: Atoms and Nuclei" }, { name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "Chapters 43-46 — Modern Physics" }] },
  "Electronic Devices": { officialTopics: ["Semiconductors", "p-n junction diode", "Transistor", "Logic gates", "Zener diode"], books: [{ name: "NCERT Physics Class 12", author: "NCERT", why: "Chapter 14: Semiconductor Electronics" }, { name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "Chapter 45 — Semiconductors" }] },
};

// ═══════════════════════════════════════════
// JEE ADVANCED
// ═══════════════════════════════════════════
syllabusData["jee-advanced::Physics"] = {
  "Mechanics": { officialTopics: ["Kinematics", "Newton's laws", "Work-energy-power", "Centre of mass", "Rotational dynamics", "Gravitation", "SHM", "Fluid mechanics"], books: [{ name: "Concepts of Physics Vol. 1", author: "H.C. Verma", why: "Foundation book — must complete all problems" }, { name: "Problems in General Physics", author: "I.E. Irodov", why: "Advanced-level problems essential for JEE Advanced" }, { name: "Classical Mechanics", author: "D. Kleppner & R. Kolenkow", why: "For deeper understanding of mechanics" }] },
  "Electricity & Magnetism": { officialTopics: ["Electrostatics", "Capacitors", "Current electricity", "Magnetic field", "EMI", "AC circuits", "Electromagnetic waves"], books: [{ name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "Complete all Electricity & Magnetism chapters" }, { name: "Problems in General Physics", author: "I.E. Irodov", why: "Sections 3.1-3.4 — Electrodynamics" }, { name: "Introduction to Electrodynamics", author: "D.J. Griffiths", why: "For advanced theoretical understanding" }] },
  "Optics & Modern Physics": { officialTopics: ["Geometrical optics", "Wave optics", "Photoelectric effect", "Bohr model", "Nuclear physics", "X-rays", "Semiconductors"], books: [{ name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "Optics + Modern Physics chapters" }, { name: "Optics", author: "Ajoy Ghatak", why: "Detailed wave optics and interference" }, { name: "Problems in General Physics", author: "I.E. Irodov", why: "Sections 5-6 — Optics & Atomic Physics" }] },
  "Thermal Physics": { officialTopics: ["Calorimetry", "KTG", "Laws of thermodynamics", "Heat transfer — conduction, convection, radiation", "Thermal expansion"], books: [{ name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "Chapters 23-28" }, { name: "Heat and Thermodynamics", author: "Zemansky & Dittman", why: "For advanced thermodynamics concepts" }] },
};
syllabusData["jee-advanced::Chemistry"] = {
  "Physical Chemistry": { officialTopics: ["Mole concept", "Atomic structure", "Chemical bonding", "Thermodynamics", "Chemical equilibrium", "Ionic equilibrium", "Electrochemistry", "Chemical kinetics", "Solid state", "Solutions"], books: [{ name: "NCERT Chemistry Class 11 & 12", author: "NCERT", why: "Foundation — read every line" }, { name: "Physical Chemistry", author: "O.P. Tandon", why: "Best numerical problems for JEE" }, { name: "Physical Chemistry", author: "P. Bahadur", why: "Advanced numerical problems" }] },
  "Organic Chemistry": { officialTopics: ["IUPAC nomenclature", "Isomerism", "GOC — inductive, resonance, hyperconjugation", "Reaction mechanisms", "Named reactions", "All functional groups", "Biomolecules", "Polymers"], books: [{ name: "Organic Chemistry", author: "Morrison & Boyd", why: "Gold standard for organic mechanisms" }, { name: "Organic Chemistry", author: "M.S. Chauhan (Arihant)", why: "JEE-level problems with solutions" }, { name: "NCERT Chemistry Class 11 & 12", author: "NCERT", why: "Must-read for all reactions" }] },
  "Inorganic Chemistry": { officialTopics: ["Periodic table trends", "Chemical bonding", "Coordination compounds", "Metallurgy", "s, p, d, f block elements", "Qualitative analysis", "Environmental chemistry"], books: [{ name: "NCERT Chemistry Class 11 & 12", author: "NCERT", why: "Inorganic chapters — learn every table and reaction" }, { name: "Concise Inorganic Chemistry", author: "J.D. Lee", why: "Detailed periodic trends and d-block chemistry" }, { name: "Inorganic Chemistry", author: "V.K. Jaiswal (Arihant)", why: "JEE Advanced level problems" }] },
};
syllabusData["jee-advanced::Mathematics"] = {
  "Algebra": { officialTopics: ["Quadratic equations", "Complex numbers", "Permutations & combinations", "Binomial theorem", "Sequences & series", "Matrices & determinants", "Probability"], books: [{ name: "IIT Mathematics", author: "M.L. Khanna", why: "Comprehensive algebra for JEE" }, { name: "Higher Algebra", author: "Hall & Knight", why: "Classical algebra problems" }, { name: "NCERT Maths Class 11 & 12", author: "NCERT", why: "Foundation for all algebra topics" }] },
  "Calculus": { officialTopics: ["Limits & continuity", "Differentiation", "Application of derivatives", "Indefinite & definite integrals", "Area under curves", "Differential equations"], books: [{ name: "IIT Mathematics", author: "M.L. Khanna", why: "Excellent calculus problems for JEE" }, { name: "Problems in Calculus of One Variable", author: "I.A. Maron", why: "Advanced integration and differentiation" }, { name: "Differential Calculus", author: "Amit M. Agarwal (Arihant)", why: "JEE Advanced focused problems" }] },
  "Coordinate Geometry & Trigonometry": { officialTopics: ["Straight lines", "Circles", "Parabola, Ellipse, Hyperbola", "Trigonometric functions", "Inverse trig", "Trigonometric equations", "Properties of triangles"], books: [{ name: "Coordinate Geometry", author: "S.L. Loney", why: "Best book for conics and coordinate geometry" }, { name: "Trigonometry", author: "S.L. Loney", why: "Classical trigonometry problems" }, { name: "IIT Mathematics", author: "M.L. Khanna", why: "Conic sections chapter" }] },
  "Vectors & 3D": { officialTopics: ["Vector algebra", "Dot & cross product", "3D geometry — lines & planes", "Direction cosines", "Shortest distance between lines"], books: [{ name: "NCERT Maths Class 12", author: "NCERT", why: "Chapters 10-11: Vectors and 3D Geometry" }, { name: "IIT Mathematics", author: "M.L. Khanna", why: "3D geometry chapter — essential for JEE Advanced" }] },
};

// ═══════════════════════════════════════════
// BITSAT
// ═══════════════════════════════════════════
syllabusData["bitsat::Physics"] = {
  "Mechanics": { officialTopics: ["Units & dimensions", "Kinematics", "Newton's laws", "Work-energy-power", "Rotational motion", "Gravitation", "SHM", "Properties of matter"], books: [{ name: "NCERT Physics Class 11", author: "NCERT", why: "BITSAT syllabus is based on NCERT + CBSE Class 11-12" }, { name: "Concepts of Physics Vol. 1", author: "H.C. Verma", why: "Practice problems — BITSAT needs speed" }] },
  "Electromagnetism": { officialTopics: ["Electrostatics", "Current electricity", "Magnetic effects", "EMI", "AC", "EM waves"], books: [{ name: "NCERT Physics Class 12", author: "NCERT", why: "Chapters 1-8 — Electromagnetism" }, { name: "Concepts of Physics Vol. 2", author: "H.C. Verma", why: "Speed-building problems" }] },
  "Optics & Modern Physics": { officialTopics: ["Geometrical optics", "Wave optics", "Dual nature", "Atoms & nuclei", "Semiconductors"], books: [{ name: "NCERT Physics Class 12", author: "NCERT", why: "Chapters 9-14" }, { name: "BITSAT 15 Years Solved Papers", author: "Arihant/Disha", why: "Actual BITSAT questions with solutions" }] },
};
syllabusData["bitsat::Chemistry"] = {
  "Physical Chemistry": { officialTopics: ["Mole concept", "Atomic structure", "Thermodynamics", "Chemical equilibrium", "Electrochemistry", "Chemical kinetics", "Solutions", "Solid state"], books: [{ name: "NCERT Chemistry Class 11 & 12", author: "NCERT", why: "BITSAT follows CBSE/NCERT syllabus" }, { name: "Physical Chemistry", author: "O.P. Tandon", why: "Numerical problems" }] },
  "Organic Chemistry": { officialTopics: ["IUPAC nomenclature", "Isomerism", "Hydrocarbons", "Functional groups", "Biomolecules", "Polymers"], books: [{ name: "NCERT Chemistry Class 11 & 12", author: "NCERT", why: "All organic chapters" }, { name: "Organic Chemistry", author: "Morrison & Boyd", why: "Mechanism understanding" }] },
  "Inorganic Chemistry": { officialTopics: ["Periodic table", "Chemical bonding", "s,p,d,f block", "Coordination compounds", "Metallurgy"], books: [{ name: "NCERT Chemistry Class 11 & 12", author: "NCERT", why: "Inorganic chapters" }, { name: "Concise Inorganic Chemistry", author: "J.D. Lee", why: "Extra depth" }] },
};
syllabusData["bitsat::Mathematics"] = {
  "Algebra & Calculus": { officialTopics: ["Complex numbers", "Quadratic equations", "P&C, Binomial", "Sequences", "Matrices", "Limits", "Differentiation", "Integration", "Differential equations"], books: [{ name: "NCERT Maths Class 11 & 12", author: "NCERT", why: "Foundation" }, { name: "IIT Mathematics", author: "M.L. Khanna", why: "Problem practice" }, { name: "BITSAT Solved Papers", author: "Arihant", why: "Actual paper pattern" }] },
  "Coordinate Geometry & Trigonometry": { officialTopics: ["Straight lines", "Circles", "Conics", "3D geometry", "Trigonometric functions", "Inverse trig", "Vectors"], books: [{ name: "NCERT Maths Class 11 & 12", author: "NCERT", why: "All coordinate geometry chapters" }, { name: "Coordinate Geometry", author: "S.L. Loney", why: "Advanced problems" }] },
  "Probability & Statistics": { officialTopics: ["Probability — conditional, Bayes", "Statistics — mean, median, mode", "Random variables", "Linear programming"], books: [{ name: "NCERT Maths Class 11 & 12", author: "NCERT", why: "Chapters on probability and statistics" }] },
};

// ═══════════════════════════════════════════
// VITEEE
// ═══════════════════════════════════════════
syllabusData["viteee::Physics"] = {
  "Mechanics & Properties of Matter": { officialTopics: ["Laws of motion", "Work-energy", "Rotational motion", "Gravitation", "Elasticity", "Surface tension", "Viscosity"], books: [{ name: "NCERT Physics Class 11", author: "NCERT", why: "VITEEE syllabus follows CBSE 11-12" }, { name: "Concepts of Physics Vol. 1", author: "H.C. Verma", why: "Conceptual problems" }] },
  "Electromagnetism & Modern Physics": { officialTopics: ["Electrostatics", "Current electricity", "Magnetism", "EMI", "AC", "Optics", "Dual nature", "Nuclear physics", "Semiconductors"], books: [{ name: "NCERT Physics Class 12", author: "NCERT", why: "All Class 12 chapters" }, { name: "VITEEE Solved Papers", author: "Arihant/MTG", why: "Actual VITEEE pattern" }] },
};
syllabusData["viteee::Chemistry"] = {
  "Chemistry — All Topics": { officialTopics: ["Atomic structure", "Chemical bonding", "Thermodynamics", "Chemical equilibrium", "Electrochemistry", "Kinetics", "Periodic table", "p-block", "d-block", "Coordination compounds", "Organic — all functional groups", "Biomolecules", "Polymers"], books: [{ name: "NCERT Chemistry Class 11 & 12", author: "NCERT", why: "Complete syllabus coverage" }, { name: "VITEEE Solved Papers", author: "Arihant", why: "Past paper practice" }] },
};
syllabusData["viteee::Mathematics"] = {
  "Mathematics — All Topics": { officialTopics: ["Matrices", "Trigonometry", "Complex numbers", "Quadratics", "P&C", "Calculus", "Coordinate geometry", "Vectors", "3D", "Probability", "Differential equations"], books: [{ name: "NCERT Maths Class 11 & 12", author: "NCERT", why: "Foundation" }, { name: "VITEEE Solved Papers", author: "Arihant", why: "Pattern understanding" }] },
};

// ═══════════════════════════════════════════
// MHT-CET
// ═══════════════════════════════════════════
syllabusData["mht-cet::Physics"] = {
  "Physics — All Topics": { officialTopics: ["Rotational dynamics", "Oscillations", "Elasticity", "Surface tension", "Wave motion", "Stationary waves", "Kinetic theory", "Electrostatics", "Current electricity", "Magnetism", "EMI", "AC", "Electrons & photons", "Atoms & nuclei", "Semiconductors", "Communication systems"], books: [{ name: "Maharashtra State Board Textbook — Std 11 & 12", author: "Balbharati", why: "MHT-CET follows Maharashtra board syllabus exactly" }, { name: "MHT-CET Physics", author: "Marvel/Target Publications", why: "Topic-wise MCQs for MHT-CET" }] },
};
syllabusData["mht-cet::Chemistry"] = {
  "Chemistry — All Topics": { officialTopics: ["Solid state", "Solutions", "Electrochemistry", "Chemical kinetics", "Surface chemistry", "p-block elements", "d-block & f-block", "Coordination compounds", "Halogen derivatives", "Alcohols, Phenols, Ethers", "Aldehydes, Ketones, Acids", "Amines", "Biomolecules", "Polymers"], books: [{ name: "Maharashtra Board Textbook — Std 11 & 12", author: "Balbharati", why: "Official syllabus source" }, { name: "MHT-CET Chemistry", author: "Target Publications", why: "MCQ practice" }] },
};
syllabusData["mht-cet::Mathematics"] = {
  "Mathematics — All Topics": { officialTopics: ["Mathematical logic", "Matrices", "Trigonometry", "Pair of straight lines", "Circle", "Conics", "Vectors", "3D geometry", "Line", "Plane", "Differentiation", "Integration", "Differential equations", "Probability", "Statistics"], books: [{ name: "Maharashtra Board Textbook", author: "Balbharati", why: "MHT-CET strictly follows Maharashtra board" }, { name: "MHT-CET Maths", author: "Target/Marvel Publications", why: "Chapter-wise MCQs" }] },
};

// ═══════════════════════════════════════════
// COMEDK
// ═══════════════════════════════════════════
syllabusData["comedk::Physics"] = {
  "Physics — All Topics": { officialTopics: ["Units & dimensions", "Kinematics", "Laws of motion", "Work-energy", "Rotational motion", "Gravitation", "Properties of matter", "Thermodynamics", "Oscillations", "Waves", "Electrostatics", "Current electricity", "Magnetism", "EMI", "Optics", "Modern physics", "Semiconductors"], books: [{ name: "NCERT Physics Class 11 & 12", author: "NCERT", why: "COMEDK follows NCERT/CBSE syllabus" }, { name: "Concepts of Physics", author: "H.C. Verma", why: "Practice problems" }, { name: "COMEDK Solved Papers", author: "Arihant/Disha", why: "Past paper pattern" }] },
};
syllabusData["comedk::Chemistry"] = {
  "Chemistry — All Topics": { officialTopics: ["Atomic structure", "Chemical bonding", "Periodic table", "Thermodynamics", "Equilibrium", "Redox", "Electrochemistry", "Kinetics", "Organic — all groups", "Polymers", "Biomolecules"], books: [{ name: "NCERT Chemistry Class 11 & 12", author: "NCERT", why: "COMEDK follows NCERT" }, { name: "COMEDK Solved Papers", author: "Arihant", why: "Pattern practice" }] },
};
syllabusData["comedk::Mathematics"] = {
  "Mathematics — All Topics": { officialTopics: ["Sets & functions", "Complex numbers", "Matrices", "P&C", "Binomial", "Sequences", "Coordinate geometry", "Calculus", "Vectors", "3D", "Probability", "Trigonometry", "Statistics"], books: [{ name: "NCERT Maths Class 11 & 12", author: "NCERT", why: "Foundation" }, { name: "COMEDK Solved Papers", author: "Arihant", why: "Actual pattern" }] },
};

// ═══════════════════════════════════════════
// WB-JEE
// ═══════════════════════════════════════════
syllabusData["wb-jee::Physics"] = {
  "Physics — All Topics": { officialTopics: ["Mechanics", "Thermodynamics", "Waves", "Electrostatics", "Current electricity", "Magnetism", "EMI", "Optics", "Modern physics", "Semiconductors"], books: [{ name: "NCERT Physics Class 11 & 12", author: "NCERT", why: "WB-JEE follows NCERT + WB Board" }, { name: "Concepts of Physics", author: "H.C. Verma", why: "Problem practice" }, { name: "WB-JEE Solved Papers", author: "Arihant", why: "10 years solved papers" }] },
};
syllabusData["wb-jee::Chemistry"] = {
  "Chemistry — All Topics": { officialTopics: ["Atomic structure", "Bonding", "Thermodynamics", "Equilibrium", "Electrochemistry", "Kinetics", "Periodic table", "d-block", "Organic chemistry — all", "Polymers"], books: [{ name: "NCERT Chemistry Class 11 & 12", author: "NCERT", why: "Primary reference" }, { name: "WB-JEE Solved Papers", author: "Arihant", why: "Pattern practice" }] },
};
syllabusData["wb-jee::Mathematics"] = {
  "Mathematics — All Topics": { officialTopics: ["Algebra", "Trigonometry", "Coordinate geometry", "Calculus", "Vectors", "3D geometry", "Probability", "Statistics", "Differential equations"], books: [{ name: "NCERT Maths Class 11 & 12", author: "NCERT", why: "Foundation" }, { name: "WB-JEE Solved Papers", author: "Arihant", why: "Past papers" }] },
};

// ═══════════════════════════════════════════
// CLASS 12 BOARDS (CBSE/TN State Board)
// ═══════════════════════════════════════════
syllabusData["class-12::Physics"] = {
  "Physics — Board Exam": { officialTopics: ["Electrostatics", "Current electricity", "Magnetism", "EMI", "AC", "Electromagnetic waves", "Optics", "Dual nature", "Atoms & nuclei", "Semiconductors", "Communication"], books: [{ name: "NCERT Physics Class 12", author: "NCERT", why: "Board exam paper is set from NCERT only" }, { name: "S. Chand Physics", author: "Lakhmir Singh", why: "Extra practice MCQs" }, { name: "Oswaal Sample Papers", author: "Oswaal", why: "Board-pattern practice" }] },
};
syllabusData["class-12::Chemistry"] = {
  "Chemistry — Board Exam": { officialTopics: ["Solid state", "Solutions", "Electrochemistry", "Chemical kinetics", "Surface chemistry", "p-block", "d-block & f-block", "Coordination compounds", "Organic — haloalkanes to biomolecules", "Polymers"], books: [{ name: "NCERT Chemistry Class 12", author: "NCERT", why: "100% board exam comes from NCERT" }, { name: "Together with Chemistry", author: "S. Chand", why: "Practice questions" }, { name: "Oswaal Question Bank", author: "Oswaal", why: "Chapter-wise board questions" }] },
};
syllabusData["class-12::Mathematics"] = {
  "Mathematics — Board Exam": { officialTopics: ["Relations & functions", "Inverse trig", "Matrices & determinants", "Continuity & differentiability", "Application of derivatives", "Integrals", "Application of integrals", "Differential equations", "Vectors", "3D geometry", "Linear programming", "Probability"], books: [{ name: "NCERT Maths Class 12", author: "NCERT", why: "Board exam = NCERT — solve every exercise" }, { name: "R.D. Sharma Class 12", author: "R.D. Sharma", why: "Extra problems per chapter" }, { name: "Oswaal Sample Papers", author: "Oswaal", why: "Board exam pattern" }] },
};

// ═══ UPSC PRELIMS ═══
syllabusData["upsc-prelims::General Studies"] = {
  "Indian History": { officialTopics: ["Ancient India — Indus Valley, Vedic, Maurya, Gupta", "Medieval India — Delhi Sultanate, Mughals", "Modern India — British rule, Reform movements", "Indian Freedom Movement — 1857 to 1947", "Art & Culture — Architecture, Dance, Music, Paintings"], books: [{ name: "India's Struggle for Independence", author: "Bipan Chandra", why: "Best book for Modern India & Freedom Movement" }, { name: "Indian Art & Culture", author: "Nitin Singhania", why: "Complete coverage of Art & Culture for UPSC" }, { name: "Ancient & Medieval India", author: "Poonam Dalal Dahiya", why: "Concise coverage of ancient & medieval period" }] },
  "Indian Polity": { officialTopics: ["Indian Constitution — Preamble, Fundamental Rights, DPSP", "Parliament, State Legislature", "Judiciary — Supreme Court, High Courts", "Constitutional Bodies — Election Commission, CAG, UPSC", "Panchayati Raj & Local Governance", "Emergency Provisions"], books: [{ name: "Indian Polity", author: "M. Laxmikanth", why: "Bible of Indian Polity for UPSC — covers everything" }, { name: "Introduction to the Constitution of India", author: "D.D. Basu", why: "For deeper constitutional understanding" }] },
  "Indian Geography": { officialTopics: ["Physical Geography — Landforms, Climate, Drainage", "Indian Geography — Soil, Vegetation, Rivers, Mountains", "Economic Geography — Agriculture, Industry, Resources", "Environment & Ecology — Biodiversity, Climate Change, Pollution"], books: [{ name: "Certificate Physical & Human Geography", author: "G.C. Leong", why: "Foundation book for Physical Geography" }, { name: "Indian Geography", author: "Majid Husain", why: "Comprehensive Indian Geography" }, { name: "Environment", author: "Shankar IAS", why: "Best for Environment & Ecology" }] },
  "Indian Economy": { officialTopics: ["Economic Planning — Five Year Plans, NITI Aayog", "Banking — RBI, Monetary Policy, Credit Policy", "Fiscal Policy — Budget, Taxation, Deficit", "Agriculture — Green Revolution, MSP, Reforms", "Industry & Infrastructure", "External Trade & Balance of Payments"], books: [{ name: "Indian Economy", author: "Ramesh Singh", why: "Most comprehensive economy book for UPSC" }, { name: "Indian Economy", author: "Sriram IAS (notes)", why: "Concise notes with current data" }] },
  "General Science": { officialTopics: ["Physics — Basic concepts, Light, Sound, Electricity", "Chemistry — Elements, Acids, Bases, Reactions", "Biology — Human Body, Diseases, Nutrition", "Space & Defence Technology", "IT & Emerging Technology — AI, Blockchain, IoT"], books: [{ name: "NCERT Science Class 6-10", author: "NCERT", why: "UPSC science questions are at NCERT level" }, { name: "Science & Technology", author: "TMH (Tata McGraw Hill)", why: "Current S&T developments" }] },
};
syllabusData["upsc-prelims::CSAT"] = {
  "CSAT Paper 2": { officialTopics: ["Reading Comprehension — English passages", "Logical Reasoning — Statements, Conclusions, Assumptions", "Analytical Ability — Puzzles, Arrangements", "Data Interpretation — Tables, Graphs, Charts", "Basic Numeracy — Arithmetic, Algebra", "Decision Making & Problem Solving"], books: [{ name: "CSAT Paper 2 Manual", author: "TMH", why: "Complete CSAT preparation guide" }, { name: "Verbal & Non-Verbal Reasoning", author: "R.S. Aggarwal", why: "Best for logical reasoning practice" }, { name: "Quantitative Aptitude", author: "R.S. Aggarwal", why: "Arithmetic and data interpretation" }] },
};

// ═══ TNPSC GROUP 4 ═══
syllabusData["tnpsc-group4::GS"] = {
  "General Studies": { officialTopics: ["General Science — Physics, Chemistry, Biology", "Indian Geography — Rivers, Mountains, Climate", "Tamil Nadu Geography — Districts, Rivers, Resources", "Indian History & Freedom Movement", "TN History & Social Reform Movements — Periyar, Anna, Kamaraj", "Indian Constitution — Fundamental Rights, DPSP, Amendments", "Indian Economy — Planning, Budget, Banking", "TN Economy — Agriculture, Industry, Schemes", "Current Affairs — National & TN State"], books: [{ name: "TNPSC Group 4 Study Material", author: "Sakthi/Sura Publications", why: "Complete Tamil Nadu-focused study material" }, { name: "Tamil Nadu History", author: "TNPSC Topper Notes", why: "TN history from Sangam age to modern era" }, { name: "Indian Polity", author: "M. Laxmikanth", why: "For Constitution and Polity portions" }, { name: "NCERT Social Science 6-10", author: "NCERT", why: "Foundation for History, Geography, Civics" }] },
};
syllabusData["tnpsc-group4::Tamil"] = {
  "Tamil Language": { officialTopics: ["Tamil Grammar (இலக்கணம்) — எழுத்து, சொல், பொருள்", "Tamil Vocabulary — Synonyms, Antonyms, Proverbs", "Tamil Literature — Sangam, Bhakti, Modern", "Tamil Scholars & Their Works", "Comprehension & Translation", "Tamil Civilization & Culture"], books: [{ name: "TNPSC Tamil Guide", author: "Sakthi Publications", why: "Complete Tamil grammar & literature for TNPSC" }, { name: "Thamizh Ilakkanam", author: "Agathiyar/Nannool", why: "Classical Tamil grammar reference" }, { name: "6th-12th Tamil Textbooks", author: "TN State Board", why: "TNPSC Tamil questions come from school textbooks" }] },
};
syllabusData["tnpsc-group4::Aptitude"] = {
  "Aptitude & Reasoning": { officialTopics: ["Number Series & Patterns", "Percentage, Ratio & Proportion", "Time & Work, Time & Distance", "Profit & Loss, Simple & Compound Interest", "Coding-Decoding", "Blood Relations & Directions", "Logical Reasoning — Syllogism, Statements"], books: [{ name: "Quantitative Aptitude", author: "R.S. Aggarwal", why: "Best aptitude book — covers all TNPSC-level topics" }, { name: "Reasoning", author: "R.S. Aggarwal", why: "Verbal & Non-verbal reasoning" }, { name: "TNPSC Aptitude Guide", author: "Sura Publications", why: "TNPSC-specific aptitude questions" }] },
};
syllabusData["tnpsc-group1::GS"] = syllabusData["tnpsc-group4::GS"];
syllabusData["tnpsc-group1::Tamil"] = syllabusData["tnpsc-group4::Tamil"];
syllabusData["tnpsc-group1::Aptitude"] = syllabusData["tnpsc-group4::Aptitude"];
syllabusData["tnpsc-group2::GS"] = syllabusData["tnpsc-group4::GS"];
syllabusData["tnpsc-group2::Tamil"] = syllabusData["tnpsc-group4::Tamil"];
syllabusData["tnpsc-group2::Aptitude"] = syllabusData["tnpsc-group4::Aptitude"];

// ═══ SSC CGL ═══
syllabusData["ssc-cgl::Reasoning"] = {
  "General Intelligence & Reasoning": { officialTopics: ["Analogies", "Classification (Odd One Out)", "Coding-Decoding", "Number & Letter Series", "Blood Relations", "Direction Sense", "Syllogism", "Non-Verbal Reasoning — Mirror Image, Paper Folding, Patterns", "Venn Diagrams", "Matrix"], books: [{ name: "Verbal & Non-Verbal Reasoning", author: "R.S. Aggarwal", why: "Best reasoning book — covers all SSC patterns" }, { name: "SSC Reasoning", author: "Rakesh Yadav", why: "SSC-specific shortcuts and tricks" }] },
};
syllabusData["ssc-cgl::Quantitative"] = {
  "Quantitative Aptitude": { officialTopics: ["Number System, HCF, LCM", "Percentage", "Ratio & Proportion", "Average", "Profit & Loss", "Simple & Compound Interest", "Time & Work", "Time, Speed & Distance", "Algebra — Linear & Quadratic", "Geometry — Triangles, Circles", "Trigonometry — Heights & Distances", "Mensuration — Area, Volume", "Data Interpretation — Bar, Pie, Line Graph"], books: [{ name: "Quantitative Aptitude", author: "R.S. Aggarwal", why: "Foundation book for all aptitude topics" }, { name: "SSC Mathematics", author: "Rakesh Yadav", why: "7300+ questions — SSC-specific patterns" }, { name: "Advanced Maths", author: "Kiran Publications", why: "For SSC CGL Tier 2 level problems" }] },
};
syllabusData["ssc-cgl::English"] = {
  "English Language": { officialTopics: ["Reading Comprehension", "Error Spotting", "Fill in the Blanks", "Synonyms & Antonyms", "Idioms & Phrases", "One Word Substitution", "Sentence Improvement", "Active/Passive Voice", "Direct/Indirect Speech", "Cloze Test"], books: [{ name: "Word Power Made Easy", author: "Norman Lewis", why: "Best for building vocabulary" }, { name: "Objective General English", author: "S.P. Bakshi", why: "Complete English for SSC" }, { name: "SSC English", author: "Neetu Singh (KD Campus)", why: "SSC-specific English practice" }] },
};
syllabusData["ssc-cgl::GK"] = {
  "General Knowledge": { officialTopics: ["Indian History — Ancient, Medieval, Modern", "Indian Geography", "Indian Polity & Constitution", "Indian Economy", "General Science — Physics, Chemistry, Biology", "Current Affairs — Last 6 months", "Static GK — Dams, Airports, Capitals, Awards"], books: [{ name: "Lucent's General Knowledge", author: "Lucent Publications", why: "Bible of GK for all competitive exams" }, { name: "General Studies Manual", author: "TMH", why: "Comprehensive GK coverage" }, { name: "Monthly Current Affairs", author: "Pratiyogita Darpan", why: "Current affairs magazine" }] },
};

// ═══ SBI PO / IBPS PO ═══
syllabusData["sbi-po::Reasoning"] = {
  "Reasoning Ability": { officialTopics: ["Seating Arrangement — Linear & Circular", "Puzzles — Floor, Box, Scheduling, Month-based", "Syllogism", "Blood Relations", "Coding-Decoding", "Inequality", "Direction Sense", "Input-Output", "Data Sufficiency", "Logical Reasoning — Cause & Effect"], books: [{ name: "A New Approach to Reasoning", author: "B.S. Sijwali", why: "Best for banking-level puzzles and arrangements" }, { name: "Verbal & Non-Verbal Reasoning", author: "R.S. Aggarwal", why: "Foundation reasoning" }, { name: "Banking Reasoning", author: "Adda247/Oliveboard", why: "Bank exam-specific reasoning patterns" }] },
};
syllabusData["sbi-po::Quantitative"] = {
  "Quantitative Aptitude": { officialTopics: ["Data Interpretation — Bar, Pie, Table, Line, Caselet", "Number Series", "Simplification & Approximation", "Percentage, Ratio & Proportion", "Profit & Loss, SI & CI", "Time & Work, Pipes & Cisterns", "Speed, Time & Distance, Boats & Streams", "Probability & Permutation", "Quadratic Equations", "Mensuration"], books: [{ name: "Quantitative Aptitude for Competitive Exams", author: "R.S. Aggarwal", why: "Foundation for all quant topics" }, { name: "Quant for Banking", author: "Arun Sharma", why: "Banking-specific DI and quant" }] },
};
syllabusData["sbi-po::English"] = {
  "English Language": { officialTopics: ["Reading Comprehension — 2-3 passages", "Cloze Test", "Error Spotting / Phrase Replacement", "Para Jumbles", "Fill in the Blanks — Single & Double", "Sentence Correction", "Column-based / Connector-based questions"], books: [{ name: "Word Power Made Easy", author: "Norman Lewis", why: "Vocabulary building" }, { name: "Objective General English", author: "S.P. Bakshi", why: "Grammar + Comprehension" }, { name: "The Hindu Editorial Analysis", author: "Daily Practice", why: "Reading comprehension practice from The Hindu" }] },
};
syllabusData["sbi-po::Banking"] = {
  "Banking & Financial Awareness": { officialTopics: ["RBI — Functions, Monetary Policy, Repo Rate", "Banking Regulations — KYC, Basel Norms, NPA", "Financial Markets — Stock Exchange, Mutual Funds", "Government Schemes — PM schemes, NABARD, SIDBI", "Insurance — IRDAI, Types of Insurance", "Current Banking Affairs — Mergers, New Banks, Digital Banking"], books: [{ name: "Banking Awareness", author: "Arihant", why: "Complete banking knowledge" }, { name: "Lucent's Banking", author: "Lucent Publications", why: "Quick revision" }, { name: "The Hindu + Livemint", author: "Daily Reading", why: "Current banking and economy news" }] },
};
syllabusData["ibps-po::Reasoning"] = syllabusData["sbi-po::Reasoning"];
syllabusData["ibps-po::Quantitative"] = syllabusData["sbi-po::Quantitative"];
syllabusData["ibps-po::English"] = syllabusData["sbi-po::English"];

// ═══ RRB NTPC ═══
syllabusData["rrb-ntpc::Maths"] = {
  "Mathematics": { officialTopics: ["Number System, HCF, LCM", "Percentage, Ratio & Proportion", "Profit & Loss, SI & CI", "Time & Work, Time & Distance", "Mensuration — Area, Volume", "Algebra — Basic equations", "Geometry — Triangles, Circles", "Averages"], books: [{ name: "Quantitative Aptitude", author: "R.S. Aggarwal", why: "Covers all RRB-level maths topics" }, { name: "RRB NTPC Mathematics", author: "Kiran Publications", why: "Railway-specific maths questions" }] },
};
syllabusData["rrb-ntpc::Reasoning"] = {
  "General Intelligence & Reasoning": { officialTopics: ["Analogies", "Coding-Decoding", "Number & Letter Series", "Classification", "Syllogism", "Blood Relations", "Direction & Distance", "Non-Verbal — Mirror Image, Paper Cutting", "Calendar & Clock", "Ranking"], books: [{ name: "Reasoning", author: "R.S. Aggarwal", why: "Complete reasoning for all competitive exams" }, { name: "RRB Reasoning", author: "Kiran Publications", why: "Railway-specific reasoning patterns" }] },
};
syllabusData["rrb-ntpc::GK"] = {
  "General Knowledge": { officialTopics: ["Indian History — Ancient to Modern", "Indian Geography — Physical & Economic", "Indian Polity — Constitution, Governance", "Indian Economy — Planning, Banking, Budget", "General Science — 10th standard level", "Current Affairs — last 6 months", "Computer Awareness — Basics", "Sports, Awards, Important Days"], books: [{ name: "Lucent's General Knowledge", author: "Lucent Publications", why: "Best GK book for Railway exams" }, { name: "RRB GK & Current Affairs", author: "Kiran Publications", why: "Railway-focused GK compilation" }] },
};

// ═══ NDA (Govt category) ═══
syllabusData["nda::Maths"] = {
  "NDA Mathematics": { officialTopics: ["Algebra — Quadratics, Complex Numbers, Permutations", "Trigonometry — Heights & Distances, Identities", "Matrices & Determinants", "Calculus — Limits, Differentiation, Integration", "Probability & Statistics", "Coordinate Geometry — Lines, Circles, Conics", "Vectors — Dot, Cross Product, 3D", "Analytical Geometry"], books: [{ name: "NDA Mathematics", author: "R.S. Aggarwal", why: "NDA-specific maths problems" }, { name: "Pathfinder NDA & NA", author: "Arihant", why: "Complete NDA preparation — maths section" }, { name: "NCERT Maths Class 11 & 12", author: "NCERT", why: "NDA maths is at 11-12 level" }] },
};
syllabusData["nda::GK"] = {
  "General Ability Test": { officialTopics: ["English — Comprehension, Grammar, Vocabulary", "History — India & World", "Geography — India, World, Environment", "Polity — Constitution, Governance", "Economy — Basic economic concepts", "General Science — Physics, Chemistry, Biology", "Current Affairs — National, International, Defence", "Defence-specific — Regiments, Weapons, Operations"], books: [{ name: "Pathfinder NDA & NA", author: "Arihant", why: "Complete GAT preparation" }, { name: "Lucent's GK", author: "Lucent Publications", why: "GK foundation" }, { name: "Word Power Made Easy", author: "Norman Lewis", why: "For English vocabulary section" }] },
};

// ═══ CDS ═══
syllabusData["cds::English"] = {
  "English": { officialTopics: ["Reading Comprehension", "Spotting Errors", "Sentence Improvement", "Synonyms & Antonyms", "Idioms & Phrases", "Fill in the Blanks", "Ordering of Sentences", "Vocabulary in Context"], books: [{ name: "Pathfinder CDS", author: "Arihant", why: "Complete CDS English preparation" }, { name: "Word Power Made Easy", author: "Norman Lewis", why: "Vocabulary building" }, { name: "Objective General English", author: "S.P. Bakshi", why: "Grammar and comprehension" }] },
};
syllabusData["cds::GK"] = {
  "General Knowledge": { officialTopics: ["Indian History — Ancient, Medieval, Modern, Freedom Movement", "Indian & World Geography", "Indian Polity & Constitution", "Indian Economy", "General Science", "Current Affairs — Defence, National, International", "Awards, Sports, Important Days"], books: [{ name: "Pathfinder CDS", author: "Arihant", why: "CDS-specific GK compilation" }, { name: "Lucent's GK", author: "Lucent Publications", why: "Comprehensive GK reference" }, { name: "Manorama Yearbook", author: "Manorama", why: "Annual current affairs reference" }] },
};
syllabusData["cds::Maths"] = {
  "Elementary Mathematics": { officialTopics: ["Number System", "Algebra — HCF, LCM, Quadratics", "Trigonometry — Identities, Heights & Distances", "Geometry — Triangles, Circles, Quadrilaterals", "Mensuration — Area, Volume, Surface Area", "Statistics — Mean, Median, Mode, Frequency"], books: [{ name: "Pathfinder CDS", author: "Arihant", why: "Maths section with solved problems" }, { name: "Quantitative Aptitude", author: "R.S. Aggarwal", why: "All elementary maths topics" }, { name: "NCERT Maths Class 9-10", author: "NCERT", why: "CDS maths is at 10th standard level" }] },
};

// ═══ AFCAT ═══
syllabusData["afcat::Verbal"] = {
  "Verbal Ability in English": { officialTopics: ["Reading Comprehension", "Error Detection", "Sentence Completion", "Synonyms & Antonyms", "Idioms & Phrases", "Vocabulary", "Grammar — Tenses, Articles, Prepositions"], books: [{ name: "Pathfinder for AFCAT", author: "Arihant", why: "Complete AFCAT English preparation" }, { name: "Word Power Made Easy", author: "Norman Lewis", why: "Vocabulary" }, { name: "Objective English", author: "S.P. Bakshi", why: "Grammar practice" }] },
};
syllabusData["afcat::Numerical"] = {
  "Numerical Ability": { officialTopics: ["Decimal Fractions", "Percentage", "Average, Ratio & Proportion", "Profit & Loss", "Simple & Compound Interest", "Time & Distance", "Time & Work"], books: [{ name: "Quantitative Aptitude", author: "R.S. Aggarwal", why: "Covers all numerical topics" }, { name: "Pathfinder AFCAT", author: "Arihant", why: "AFCAT-specific numerical practice" }] },
};
syllabusData["afcat::Reasoning"] = {
  "Reasoning & Military Aptitude": { officialTopics: ["Verbal Reasoning — Analogy, Classification, Series", "Non-Verbal Reasoning — Figures, Patterns, Mirror Image", "Spatial Reasoning", "General Awareness — History, Geography, Polity", "Defence & Current Affairs — IAF, Military Operations, Exercises"], books: [{ name: "Pathfinder AFCAT", author: "Arihant", why: "Complete AFCAT reasoning + military aptitude" }, { name: "Verbal & Non-Verbal Reasoning", author: "R.S. Aggarwal", why: "Reasoning practice" }, { name: "Defence Current Affairs", author: "Monthly magazines", why: "For IAF and defence awareness" }] },
};
