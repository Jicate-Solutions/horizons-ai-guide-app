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
