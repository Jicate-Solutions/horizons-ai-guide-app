// Complete chapter-level syllabus for each exam
// Sources: User-verified NEET 2026 syllabus, JEE Main NTA syllabus, CLAT consortium syllabus

export interface Chapter {
  id: string;
  name: string;
  subject: string;
  class?: string; // '11' or '12'
  priority: 'high' | 'medium' | 'low';
  expectedQuestions?: number; // approximate
}

export interface ExamSyllabus {
  examId: string;
  examName: string;
  emoji: string;
  totalChapters: number;
  subjects: {
    id: string;
    name: string;
    emoji: string;
    color: string; // tailwind bg color
    chapters: Chapter[];
  }[];
}

export const syllabusData: Record<string, ExamSyllabus> = {
  neet: {
    examId: 'neet', examName: 'NEET UG 2026', emoji: '🏥', totalChapters: 79,
    subjects: [
      {
        id: 'botany', name: 'Botany', emoji: '🌿', color: 'bg-emerald-500',
        chapters: [
          { id: 'bot-1', name: 'The Living World', subject: 'Botany', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'bot-2', name: 'Biological Classification', subject: 'Botany', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'bot-3', name: 'Plant Kingdom', subject: 'Botany', class: '11', priority: 'high', expectedQuestions: 3 },
          { id: 'bot-4', name: 'Morphology of Flowering Plants', subject: 'Botany', class: '11', priority: 'high', expectedQuestions: 3 },
          { id: 'bot-5', name: 'Anatomy of Flowering Plants', subject: 'Botany', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'bot-6', name: 'Cell: The Unit of Life', subject: 'Botany', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'bot-7', name: 'Biomolecules', subject: 'Botany', class: '11', priority: 'medium', expectedQuestions: 2 },
          { id: 'bot-8', name: 'Cell Cycle & Cell Division', subject: 'Botany', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'bot-9', name: 'Transport in Plants', subject: 'Botany', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'bot-10', name: 'Mineral Nutrition', subject: 'Botany', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'bot-11', name: 'Photosynthesis in Higher Plants', subject: 'Botany', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'bot-12', name: 'Respiration in Plants', subject: 'Botany', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'bot-13', name: 'Plant Growth & Development', subject: 'Botany', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'bot-14', name: 'Sexual Reproduction in Plants', subject: 'Botany', class: '12', priority: 'high', expectedQuestions: 3 },
          { id: 'bot-15', name: 'Principles of Inheritance & Variation', subject: 'Botany', class: '12', priority: 'high', expectedQuestions: 4 },
          { id: 'bot-16', name: 'Molecular Basis of Inheritance', subject: 'Botany', class: '12', priority: 'high', expectedQuestions: 4 },
          { id: 'bot-17', name: 'Evolution', subject: 'Botany', class: '12', priority: 'medium', expectedQuestions: 2 },
          { id: 'bot-18', name: 'Microbes in Human Welfare', subject: 'Botany', class: '12', priority: 'medium', expectedQuestions: 1 },
          { id: 'bot-19', name: 'Biotechnology: Principles & Processes', subject: 'Botany', class: '12', priority: 'medium', expectedQuestions: 2 },
          { id: 'bot-20', name: 'Biotechnology & Its Applications', subject: 'Botany', class: '12', priority: 'medium', expectedQuestions: 2 },
          { id: 'bot-21', name: 'Organisms & Populations', subject: 'Botany', class: '12', priority: 'medium', expectedQuestions: 2 },
          { id: 'bot-22', name: 'Ecosystem', subject: 'Botany', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'bot-23', name: 'Biodiversity & Conservation', subject: 'Botany', class: '12', priority: 'medium', expectedQuestions: 2 },
          { id: 'bot-24', name: 'Environmental Issues', subject: 'Botany', class: '12', priority: 'medium', expectedQuestions: 1 },
        ],
      },
      {
        id: 'zoology', name: 'Zoology', emoji: '🐾', color: 'bg-orange-500',
        chapters: [
          { id: 'zoo-1', name: 'Animal Kingdom', subject: 'Zoology', class: '11', priority: 'high', expectedQuestions: 3 },
          { id: 'zoo-2', name: 'Structural Organisation in Animals', subject: 'Zoology', class: '11', priority: 'medium', expectedQuestions: 2 },
          { id: 'zoo-3', name: 'Digestion & Absorption', subject: 'Zoology', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'zoo-4', name: 'Breathing & Exchange of Gases', subject: 'Zoology', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'zoo-5', name: 'Body Fluids & Circulation', subject: 'Zoology', class: '11', priority: 'high', expectedQuestions: 3 },
          { id: 'zoo-6', name: 'Excretory Products & Elimination', subject: 'Zoology', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'zoo-7', name: 'Locomotion & Movement', subject: 'Zoology', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'zoo-8', name: 'Neural Control & Coordination', subject: 'Zoology', class: '11', priority: 'high', expectedQuestions: 3 },
          { id: 'zoo-9', name: 'Chemical Coordination (Endocrine)', subject: 'Zoology', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'zoo-10', name: 'Human Reproduction', subject: 'Zoology', class: '12', priority: 'high', expectedQuestions: 3 },
          { id: 'zoo-11', name: 'Reproductive Health', subject: 'Zoology', class: '12', priority: 'medium', expectedQuestions: 2 },
          { id: 'zoo-12', name: 'Human Health & Disease', subject: 'Zoology', class: '12', priority: 'high', expectedQuestions: 3 },
          { id: 'zoo-13', name: 'Human Genetics & Disorders', subject: 'Zoology', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'zoo-14', name: 'Animal Husbandry', subject: 'Zoology', class: '12', priority: 'low', expectedQuestions: 1 },
        ],
      },
      {
        id: 'physics', name: 'Physics', emoji: '⚛️', color: 'bg-blue-500',
        chapters: [
          { id: 'phy-1', name: 'Physical World & Measurement', subject: 'Physics', class: '11', priority: 'low', expectedQuestions: 1 },
          { id: 'phy-2', name: 'Kinematics', subject: 'Physics', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'phy-3', name: 'Laws of Motion', subject: 'Physics', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'phy-4', name: 'Work, Energy & Power', subject: 'Physics', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'phy-5', name: 'System of Particles & Rotational Motion', subject: 'Physics', class: '11', priority: 'medium', expectedQuestions: 2 },
          { id: 'phy-6', name: 'Gravitation', subject: 'Physics', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'phy-7', name: 'Properties of Bulk Matter', subject: 'Physics', class: '11', priority: 'medium', expectedQuestions: 2 },
          { id: 'phy-8', name: 'Thermodynamics', subject: 'Physics', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'phy-9', name: 'Kinetic Theory of Gases', subject: 'Physics', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'phy-10', name: 'Oscillations', subject: 'Physics', class: '11', priority: 'medium', expectedQuestions: 2 },
          { id: 'phy-11', name: 'Waves', subject: 'Physics', class: '11', priority: 'medium', expectedQuestions: 2 },
          { id: 'phy-12', name: 'Electric Charges & Fields', subject: 'Physics', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'phy-13', name: 'Electrostatic Potential & Capacitance', subject: 'Physics', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'phy-14', name: 'Current Electricity', subject: 'Physics', class: '12', priority: 'high', expectedQuestions: 4 },
          { id: 'phy-15', name: 'Moving Charges & Magnetism', subject: 'Physics', class: '12', priority: 'medium', expectedQuestions: 2 },
          { id: 'phy-16', name: 'Magnetism & Matter', subject: 'Physics', class: '12', priority: 'low', expectedQuestions: 1 },
          { id: 'phy-17', name: 'Electromagnetic Induction', subject: 'Physics', class: '12', priority: 'medium', expectedQuestions: 2 },
          { id: 'phy-18', name: 'Alternating Current', subject: 'Physics', class: '12', priority: 'medium', expectedQuestions: 2 },
          { id: 'phy-19', name: 'Ray Optics', subject: 'Physics', class: '12', priority: 'high', expectedQuestions: 3 },
          { id: 'phy-20', name: 'Wave Optics', subject: 'Physics', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'phy-21', name: 'Dual Nature of Radiation & Matter', subject: 'Physics', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'phy-22', name: 'Atoms & Nuclei', subject: 'Physics', class: '12', priority: 'high', expectedQuestions: 3 },
          { id: 'phy-23', name: 'Semiconductor Devices', subject: 'Physics', class: '12', priority: 'medium', expectedQuestions: 2 },
          { id: 'phy-24', name: 'Electromagnetic Waves', subject: 'Physics', class: '12', priority: 'low', expectedQuestions: 1 },
        ],
      },
      {
        id: 'chemistry', name: 'Chemistry', emoji: '🧪', color: 'bg-purple-500',
        chapters: [
          { id: 'chem-1', name: 'Some Basic Concepts of Chemistry', subject: 'Chemistry', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'chem-2', name: 'Structure of Atom', subject: 'Chemistry', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'chem-3', name: 'Classification of Elements & Periodicity', subject: 'Chemistry', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'chem-4', name: 'Chemical Bonding & Molecular Structure', subject: 'Chemistry', class: '11', priority: 'high', expectedQuestions: 3 },
          { id: 'chem-5', name: 'States of Matter', subject: 'Chemistry', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'chem-6', name: 'Thermodynamics', subject: 'Chemistry', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'chem-7', name: 'Equilibrium', subject: 'Chemistry', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'chem-8', name: 'Redox Reactions', subject: 'Chemistry', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'chem-9', name: 'Hydrogen', subject: 'Chemistry', class: '11', priority: 'low', expectedQuestions: 1 },
          { id: 'chem-10', name: 's-Block Elements', subject: 'Chemistry', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'chem-11', name: 'p-Block Elements (13 & 14)', subject: 'Chemistry', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'chem-12', name: 'Organic Chemistry — Basic Principles', subject: 'Chemistry', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'chem-13', name: 'Hydrocarbons', subject: 'Chemistry', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'chem-14', name: 'Environmental Chemistry', subject: 'Chemistry', class: '11', priority: 'low', expectedQuestions: 1 },
          { id: 'chem-15', name: 'Solutions', subject: 'Chemistry', class: '12', priority: 'medium', expectedQuestions: 2 },
          { id: 'chem-16', name: 'Electrochemistry', subject: 'Chemistry', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'chem-17', name: 'Chemical Kinetics', subject: 'Chemistry', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'chem-18', name: 'Surface Chemistry', subject: 'Chemistry', class: '12', priority: 'medium', expectedQuestions: 1 },
          { id: 'chem-19', name: 'p-Block Elements (15, 16, 17, 18)', subject: 'Chemistry', class: '12', priority: 'high', expectedQuestions: 3 },
          { id: 'chem-20', name: 'd & f-Block Elements', subject: 'Chemistry', class: '12', priority: 'medium', expectedQuestions: 2 },
          { id: 'chem-21', name: 'Coordination Compounds', subject: 'Chemistry', class: '12', priority: 'high', expectedQuestions: 3 },
          { id: 'chem-22', name: 'Haloalkanes & Haloarenes', subject: 'Chemistry', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'chem-23', name: 'Alcohols, Phenols & Ethers', subject: 'Chemistry', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'chem-24', name: 'Aldehydes, Ketones & Carboxylic Acids', subject: 'Chemistry', class: '12', priority: 'high', expectedQuestions: 3 },
          { id: 'chem-25', name: 'Amines', subject: 'Chemistry', class: '12', priority: 'medium', expectedQuestions: 2 },
          { id: 'chem-26', name: 'Biomolecules', subject: 'Chemistry', class: '12', priority: 'medium', expectedQuestions: 1 },
          { id: 'chem-27', name: 'Polymers', subject: 'Chemistry', class: '12', priority: 'low', expectedQuestions: 1 },
          { id: 'chem-28', name: 'Chemistry in Everyday Life', subject: 'Chemistry', class: '12', priority: 'low', expectedQuestions: 1 },
        ],
      },
    ],
  },

  jee: {
    examId: 'jee', examName: 'JEE Main 2026', emoji: '⚙️', totalChapters: 75,
    subjects: [
      {
        id: 'jee-physics', name: 'Physics', emoji: '⚛️', color: 'bg-blue-500',
        chapters: [
          { id: 'jp-1', name: 'Units, Dimensions & Errors', subject: 'Physics', class: '11', priority: 'low', expectedQuestions: 1 },
          { id: 'jp-2', name: 'Kinematics (1D & 2D)', subject: 'Physics', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'jp-3', name: 'Laws of Motion & Friction', subject: 'Physics', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'jp-4', name: 'Work, Energy & Power', subject: 'Physics', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'jp-5', name: 'Centre of Mass & Collisions', subject: 'Physics', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'jp-6', name: 'Rotational Motion', subject: 'Physics', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'jp-7', name: 'Gravitation', subject: 'Physics', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'jp-8', name: 'Mechanical Properties of Solids & Fluids', subject: 'Physics', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'jp-9', name: 'Thermal Properties & Thermodynamics', subject: 'Physics', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'jp-10', name: 'Kinetic Theory of Gases', subject: 'Physics', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'jp-11', name: 'Oscillations (SHM)', subject: 'Physics', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'jp-12', name: 'Waves & Sound', subject: 'Physics', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'jp-13', name: 'Electrostatics', subject: 'Physics', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'jp-14', name: 'Capacitance', subject: 'Physics', class: '12', priority: 'medium', expectedQuestions: 1 },
          { id: 'jp-15', name: 'Current Electricity', subject: 'Physics', class: '12', priority: 'high', expectedQuestions: 3 },
          { id: 'jp-16', name: 'Magnetic Effects of Current', subject: 'Physics', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'jp-17', name: 'Magnetism & Matter', subject: 'Physics', class: '12', priority: 'low', expectedQuestions: 1 },
          { id: 'jp-18', name: 'Electromagnetic Induction', subject: 'Physics', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'jp-19', name: 'Alternating Current', subject: 'Physics', class: '12', priority: 'medium', expectedQuestions: 1 },
          { id: 'jp-20', name: 'EM Waves', subject: 'Physics', class: '12', priority: 'low', expectedQuestions: 1 },
          { id: 'jp-21', name: 'Ray Optics', subject: 'Physics', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'jp-22', name: 'Wave Optics', subject: 'Physics', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'jp-23', name: 'Modern Physics (Photoelectric, Bohr)', subject: 'Physics', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'jp-24', name: 'Nuclear Physics & Semiconductors', subject: 'Physics', class: '12', priority: 'medium', expectedQuestions: 2 },
        ],
      },
      {
        id: 'jee-chemistry', name: 'Chemistry', emoji: '🧪', color: 'bg-purple-500',
        chapters: [
          { id: 'jc-1', name: 'Mole Concept & Stoichiometry', subject: 'Chemistry', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'jc-2', name: 'Atomic Structure', subject: 'Chemistry', class: '11', priority: 'high', expectedQuestions: 1 },
          { id: 'jc-3', name: 'Chemical Bonding', subject: 'Chemistry', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'jc-4', name: 'Thermodynamics & Thermochemistry', subject: 'Chemistry', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'jc-5', name: 'Equilibrium (Ionic + Chemical)', subject: 'Chemistry', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'jc-6', name: 'States of Matter', subject: 'Chemistry', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'jc-7', name: 'Redox Reactions', subject: 'Chemistry', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'jc-8', name: 'Periodic Table & Properties', subject: 'Chemistry', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'jc-9', name: 's-Block Elements', subject: 'Chemistry', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'jc-10', name: 'p-Block Elements (13, 14)', subject: 'Chemistry', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'jc-11', name: 'Organic: GOC & Isomerism', subject: 'Chemistry', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'jc-12', name: 'Hydrocarbons', subject: 'Chemistry', class: '11', priority: 'high', expectedQuestions: 1 },
          { id: 'jc-13', name: 'Hydrogen & Environmental Chemistry', subject: 'Chemistry', class: '11', priority: 'low', expectedQuestions: 1 },
          { id: 'jc-14', name: 'Solutions & Colligative Properties', subject: 'Chemistry', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'jc-15', name: 'Electrochemistry', subject: 'Chemistry', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'jc-16', name: 'Chemical Kinetics', subject: 'Chemistry', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'jc-17', name: 'Surface Chemistry', subject: 'Chemistry', class: '12', priority: 'low', expectedQuestions: 1 },
          { id: 'jc-18', name: 'p-Block Elements (15-18)', subject: 'Chemistry', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'jc-19', name: 'd & f-Block Elements', subject: 'Chemistry', class: '12', priority: 'medium', expectedQuestions: 1 },
          { id: 'jc-20', name: 'Coordination Compounds', subject: 'Chemistry', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'jc-21', name: 'Haloalkanes & Haloarenes', subject: 'Chemistry', class: '12', priority: 'high', expectedQuestions: 1 },
          { id: 'jc-22', name: 'Alcohols, Phenols & Ethers', subject: 'Chemistry', class: '12', priority: 'high', expectedQuestions: 1 },
          { id: 'jc-23', name: 'Aldehydes, Ketones & Carboxylic Acids', subject: 'Chemistry', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'jc-24', name: 'Amines & Diazonium Salts', subject: 'Chemistry', class: '12', priority: 'medium', expectedQuestions: 1 },
          { id: 'jc-25', name: 'Biomolecules, Polymers & Chemistry in Life', subject: 'Chemistry', class: '12', priority: 'low', expectedQuestions: 1 },
        ],
      },
      {
        id: 'jee-maths', name: 'Mathematics', emoji: '📐', color: 'bg-amber-500',
        chapters: [
          { id: 'jm-1', name: 'Sets, Relations & Functions', subject: 'Maths', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'jm-2', name: 'Complex Numbers', subject: 'Maths', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'jm-3', name: 'Quadratic Equations', subject: 'Maths', class: '11', priority: 'high', expectedQuestions: 1 },
          { id: 'jm-4', name: 'Sequences & Series', subject: 'Maths', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'jm-5', name: 'Binomial Theorem', subject: 'Maths', class: '11', priority: 'high', expectedQuestions: 1 },
          { id: 'jm-6', name: 'Permutations & Combinations', subject: 'Maths', class: '11', priority: 'high', expectedQuestions: 1 },
          { id: 'jm-7', name: 'Trigonometry', subject: 'Maths', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'jm-8', name: 'Straight Lines', subject: 'Maths', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'jm-9', name: 'Circles', subject: 'Maths', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'jm-10', name: 'Conic Sections (Parabola, Ellipse, Hyperbola)', subject: 'Maths', class: '11', priority: 'high', expectedQuestions: 2 },
          { id: 'jm-11', name: 'Statistics & Probability (Basics)', subject: 'Maths', class: '11', priority: 'medium', expectedQuestions: 1 },
          { id: 'jm-12', name: 'Mathematical Reasoning', subject: 'Maths', class: '11', priority: 'low', expectedQuestions: 1 },
          { id: 'jm-13', name: 'Matrices & Determinants', subject: 'Maths', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'jm-14', name: 'Limits, Continuity & Differentiability', subject: 'Maths', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'jm-15', name: 'Differentiation (Methods & Applications)', subject: 'Maths', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'jm-16', name: 'Integration (Indefinite & Definite)', subject: 'Maths', class: '12', priority: 'high', expectedQuestions: 3 },
          { id: 'jm-17', name: 'Area Under Curves', subject: 'Maths', class: '12', priority: 'medium', expectedQuestions: 1 },
          { id: 'jm-18', name: 'Differential Equations', subject: 'Maths', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'jm-19', name: 'Vectors', subject: 'Maths', class: '12', priority: 'high', expectedQuestions: 1 },
          { id: 'jm-20', name: '3D Geometry', subject: 'Maths', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'jm-21', name: 'Probability (Bayes, Distributions)', subject: 'Maths', class: '12', priority: 'high', expectedQuestions: 2 },
          { id: 'jm-22', name: 'Inverse Trigonometric Functions', subject: 'Maths', class: '12', priority: 'medium', expectedQuestions: 1 },
          { id: 'jm-23', name: 'Linear Programming', subject: 'Maths', class: '12', priority: 'low', expectedQuestions: 0 },
        ],
      },
    ],
  },

  clat: {
    examId: 'clat', examName: 'CLAT 2027', emoji: '⚖️', totalChapters: 25,
    subjects: [
      {
        id: 'clat-english', name: 'English Language', emoji: '🔤', color: 'bg-sky-500',
        chapters: [
          { id: 'ce-1', name: 'Reading Comprehension (Main Idea, Viewpoints)', subject: 'English', priority: 'high', expectedQuestions: 8 },
          { id: 'ce-2', name: 'Vocabulary in Context (Synonyms, Antonyms)', subject: 'English', priority: 'high', expectedQuestions: 5 },
          { id: 'ce-3', name: 'Grammar (Error Spotting, Sentence Correction)', subject: 'English', priority: 'medium', expectedQuestions: 4 },
          { id: 'ce-4', name: 'Summary & Paraphrasing', subject: 'English', priority: 'medium', expectedQuestions: 3 },
          { id: 'ce-5', name: 'Para Jumbles & Sentence Arrangement', subject: 'English', priority: 'medium', expectedQuestions: 4 },
        ],
      },
      {
        id: 'clat-gk', name: 'Current Affairs & GK', emoji: '📰', color: 'bg-rose-500',
        chapters: [
          { id: 'cg-1', name: 'National & International News', subject: 'GK', priority: 'high', expectedQuestions: 8 },
          { id: 'cg-2', name: 'Government Policies & Schemes', subject: 'GK', priority: 'high', expectedQuestions: 5 },
          { id: 'cg-3', name: 'Sports, Awards & Personalities', subject: 'GK', priority: 'medium', expectedQuestions: 4 },
          { id: 'cg-4', name: 'Science & Technology Developments', subject: 'GK', priority: 'medium', expectedQuestions: 3 },
          { id: 'cg-5', name: 'Indian History, Geography, Polity, Economy (Static)', subject: 'GK', priority: 'high', expectedQuestions: 5 },
          { id: 'cg-6', name: 'Constitution & Important Amendments', subject: 'GK', priority: 'high', expectedQuestions: 3 },
          { id: 'cg-7', name: 'Legal Events & Landmark Judgments', subject: 'GK', priority: 'medium', expectedQuestions: 2 },
        ],
      },
      {
        id: 'clat-legal', name: 'Legal Reasoning', emoji: '⚖️', color: 'bg-emerald-500',
        chapters: [
          { id: 'cl-1', name: 'Principle-Fact Application', subject: 'Legal', priority: 'high', expectedQuestions: 10 },
          { id: 'cl-2', name: 'Law of Torts', subject: 'Legal', priority: 'high', expectedQuestions: 5 },
          { id: 'cl-3', name: 'Law of Contract', subject: 'Legal', priority: 'high', expectedQuestions: 4 },
          { id: 'cl-4', name: 'Criminal Law (IPC Basics)', subject: 'Legal', priority: 'medium', expectedQuestions: 4 },
          { id: 'cl-5', name: 'Constitutional Law Principles', subject: 'Legal', priority: 'high', expectedQuestions: 3 },
          { id: 'cl-6', name: 'Legal Maxims & Landmark Judgments', subject: 'Legal', priority: 'medium', expectedQuestions: 4 },
        ],
      },
      {
        id: 'clat-logical', name: 'Logical Reasoning', emoji: '🧠', color: 'bg-violet-500',
        chapters: [
          { id: 'clo-1', name: 'Syllogisms & Statements', subject: 'Logical', priority: 'high', expectedQuestions: 5 },
          { id: 'clo-2', name: 'Assumptions & Inferences', subject: 'Logical', priority: 'high', expectedQuestions: 5 },
          { id: 'clo-3', name: 'Strengthen/Weaken Arguments', subject: 'Logical', priority: 'high', expectedQuestions: 5 },
          { id: 'clo-4', name: 'Analogies & Series', subject: 'Logical', priority: 'medium', expectedQuestions: 4 },
          { id: 'clo-5', name: 'Critical Reasoning Passages', subject: 'Logical', priority: 'high', expectedQuestions: 5 },
        ],
      },
      {
        id: 'clat-quant', name: 'Quantitative Techniques', emoji: '🔢', color: 'bg-amber-500',
        chapters: [
          { id: 'cq-1', name: 'Percentage, Profit & Loss, Ratio', subject: 'Quant', priority: 'high', expectedQuestions: 5 },
          { id: 'cq-2', name: 'Data Interpretation (Graphs, Charts, Tables)', subject: 'Quant', priority: 'high', expectedQuestions: 5 },
        ],
      },
    ],
  },
};
