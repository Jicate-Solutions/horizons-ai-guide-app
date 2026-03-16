import { PracticeQuestion } from './types';

export interface Topic {
  id: string;
  name: string;
  icon: string;
  questions: PracticeQuestion[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  topics: Topic[];
}

export interface ExamPracticeData {
  id: string;
  name: string;
  icon: string;
  subjects: Subject[];
}

export const topicWiseData: ExamPracticeData[] = [
  // ═══════════════════════════════════
  // JEE MAIN
  // ═══════════════════════════════════
  {
    id: 'jee-main', name: 'JEE Main', icon: '⚙️',
    subjects: [
      { id: 'jee-phy', name: 'Physics', icon: '⚛️', color: 'blue', topics: [
        { id: 'jee-phy-mech', name: 'Mechanics', icon: '🔧', questions: [
          { id: 'jm-pm1', question: 'A ball is thrown vertically upward with velocity 20 m/s. Maximum height reached is (g=10 m/s²):', options: ['10 m', '20 m', '30 m', '40 m'], answer: 1, explanation: 'v²=u²-2gh. At max height v=0. h=u²/2g=(20)²/20=20m.', subject: 'Physics', difficulty: 'easy' },
          { id: 'jm-pm2', question: 'A car accelerates from rest at 2 m/s². Distance covered in 5 seconds:', options: ['25 m', '50 m', '10 m', '20 m'], answer: 0, explanation: 's=ut+½at²=0+½(2)(25)=25m.', subject: 'Physics', difficulty: 'easy' },
          { id: 'jm-pm3', question: 'A body of mass 2 kg moving with velocity 4 m/s. Its kinetic energy:', options: ['8 J', '16 J', '32 J', '4 J'], answer: 1, explanation: 'KE=½mv²=½×2×16=16J.', subject: 'Physics', difficulty: 'easy' },
          { id: 'jm-pm4', question: 'Time period of simple pendulum of length 1m (g=10 m/s²):', options: ['≈2 s', '≈1 s', '≈3 s', '≈0.5 s'], answer: 0, explanation: 'T=2π√(L/g)=2π√(0.1)≈2s.', subject: 'Physics', difficulty: 'medium' },
          { id: 'jm-pm5', question: 'Work done by a force is zero when angle between force and displacement is:', options: ['0°', '45°', '90°', '180°'], answer: 2, explanation: 'W=Fd cosθ. cos90°=0, so W=0. Perpendicular force does no work.', subject: 'Physics', difficulty: 'easy' },
        ]},
        { id: 'jee-phy-elec', name: 'Electricity & Magnetism', icon: '⚡', questions: [
          { id: 'jm-pe1', question: 'Two resistors 3Ω and 6Ω in parallel. Equivalent resistance:', options: ['9Ω', '2Ω', '4.5Ω', '1Ω'], answer: 1, explanation: '1/R=1/3+1/6=3/6=1/2. R=2Ω.', subject: 'Physics', difficulty: 'easy' },
          { id: 'jm-pe2', question: 'Wire of resistance 8Ω bent into circle. Resistance between diametrically opposite points:', options: ['2Ω', '4Ω', '8Ω', '16Ω'], answer: 0, explanation: 'Two 4Ω halves in parallel: R=4×4/(4+4)=2Ω.', subject: 'Physics', difficulty: 'medium' },
          { id: 'jm-pe3', question: 'The unit of magnetic flux is:', options: ['Tesla', 'Weber', 'Henry', 'Gauss'], answer: 1, explanation: 'Magnetic flux Φ=B⋅A. Unit: Tesla⋅m²=Weber(Wb).', subject: 'Physics', difficulty: 'easy' },
          { id: 'jm-pe4', question: 'Electric power is measured in:', options: ['Ampere', 'Volt', 'Watt', 'Ohm'], answer: 2, explanation: 'Power=VI. Unit: Watt(W)=Joule/second.', subject: 'Physics', difficulty: 'easy' },
        ]},
        { id: 'jee-phy-opt', name: 'Optics & Waves', icon: '🌊', questions: [
          { id: 'jm-po1', question: 'Which colour of light has the longest wavelength?', options: ['Violet', 'Blue', 'Green', 'Red'], answer: 3, explanation: 'VIBGYOR: Red≈700nm(longest), Violet≈400nm(shortest).', subject: 'Physics', difficulty: 'easy' },
          { id: 'jm-po2', question: 'Speed of light in vacuum is approximately:', options: ['3×10⁶ m/s', '3×10⁸ m/s', '3×10¹⁰ m/s', '3×10⁵ m/s'], answer: 1, explanation: 'c≈3×10⁸ m/s or 300,000 km/s.', subject: 'Physics', difficulty: 'easy' },
          { id: 'jm-po3', question: 'De Broglie wavelength of electron accelerated through 100V:', options: ['≈1.23 Å', '≈0.123 Å', '≈12.3 Å', '≈0.0123 Å'], answer: 0, explanation: 'λ=12.27/√V Å=12.27/10≈1.23Å.', subject: 'Physics', difficulty: 'hard' },
          { id: 'jm-po4', question: 'Object between f and 2f of convex lens forms:', options: ['Virtual image', 'Real diminished', 'Real magnified', 'No image'], answer: 2, explanation: 'Object between f and 2f: real, inverted, magnified image beyond 2f.', subject: 'Physics', difficulty: 'medium' },
          { id: 'jm-po5', question: 'Dimensional formula of Planck\'s constant:', options: ['[ML²T⁻¹]', '[MLT⁻¹]', '[ML²T⁻²]', '[ML²T⁻³]'], answer: 0, explanation: 'h=E/ν. [h]=[ML²T⁻²]/[T⁻¹]=[ML²T⁻¹].', subject: 'Physics', difficulty: 'hard' },
        ]},
      ]},
      { id: 'jee-chem', name: 'Chemistry', icon: '🧪', color: 'green', topics: [
        { id: 'jee-chem-atom', name: 'Atomic Structure & Bonding', icon: '⚛️', questions: [
          { id: 'jm-ca1', question: 'Number of electrons in Na⁺ (Z=11):', options: ['10', '11', '12', '9'], answer: 0, explanation: 'Na has 11 electrons. Na⁺ loses 1. Na⁺ has 10 electrons.', subject: 'Chemistry', difficulty: 'easy' },
          { id: 'jm-ca2', question: 'VSEPR shape of NH₃:', options: ['Linear', 'Trigonal planar', 'Tetrahedral', 'Trigonal pyramidal'], answer: 3, explanation: 'NH₃: 3 bonding + 1 lone pair (sp³) → trigonal pyramidal.', subject: 'Chemistry', difficulty: 'medium' },
          { id: 'jm-ca3', question: 'Bond order of O₂ molecule:', options: ['1', '2', '3', '1.5'], answer: 1, explanation: 'O₂ bond order=(10-6)/2=2.', subject: 'Chemistry', difficulty: 'medium' },
          { id: 'jm-ca4', question: 'Hybridization of carbon in methane CH₄:', options: ['sp', 'sp²', 'sp³', 'sp³d'], answer: 2, explanation: 'CH₄: 4 sigma bonds, 1s+3p=4 sp³ hybrid orbitals (tetrahedral).', subject: 'Chemistry', difficulty: 'easy' },
        ]},
        { id: 'jee-chem-mole', name: 'Moles & Solutions', icon: '⚗️', questions: [
          { id: 'jm-cm1', question: 'Number of moles in 36g water (M=18):', options: ['1', '2', '3', '4'], answer: 1, explanation: 'Moles=mass/MW=36/18=2.', subject: 'Chemistry', difficulty: 'easy' },
          { id: 'jm-cm2', question: 'Avogadro\'s law states:', options: ['P∝1/V', 'V∝T', 'V∝n at const T,P', 'PV=const'], answer: 2, explanation: 'V∝n at constant T,P. Equal volumes=equal moles.', subject: 'Chemistry', difficulty: 'easy' },
          { id: 'jm-cm3', question: 'pH of neutral solution at 25°C:', options: ['0', '7', '14', '1'], answer: 1, explanation: '[H⁺]=10⁻⁷M. pH=-log(10⁻⁷)=7.', subject: 'Chemistry', difficulty: 'easy' },
          { id: 'jm-cm4', question: 'Oxidation state of Mn in KMnO₄:', options: ['+2', '+4', '+5', '+7'], answer: 3, explanation: '+1+x+4(-2)=0. x-7=0. x=+7.', subject: 'Chemistry', difficulty: 'medium' },
        ]},
        { id: 'jee-chem-org', name: 'Organic Chemistry', icon: '🔬', questions: [
          { id: 'jm-co1', question: 'Number of isomers of C₄H₁₀:', options: ['1', '2', '3', '4'], answer: 1, explanation: 'n-butane + isobutane (2-methylpropane) = 2 isomers.', subject: 'Chemistry', difficulty: 'medium' },
          { id: 'jm-co2', question: 'IUPAC name of CH₃CHO:', options: ['Methanol', 'Ethanal', 'Propanal', 'Methanal'], answer: 1, explanation: '2 carbons + aldehyde = ethanal (acetaldehyde).', subject: 'Chemistry', difficulty: 'medium' },
          { id: 'jm-co3', question: 'Baking soda is chemically:', options: ['NaCl', 'NaHCO₃', 'Na₂CO₃', 'CaCO₃'], answer: 1, explanation: 'Baking soda=NaHCO₃ (sodium bicarbonate).', subject: 'Chemistry', difficulty: 'easy' },
          { id: 'jm-co4', question: 'Enthalpy of formation of element in standard state:', options: ['1 kJ/mol', '-1 kJ/mol', '0 kJ/mol', 'Variable'], answer: 2, explanation: 'By convention, ΔH°f of element in standard state=0.', subject: 'Chemistry', difficulty: 'easy' },
        ]},
      ]},
      { id: 'jee-math', name: 'Maths', icon: '📐', color: 'purple', topics: [
        { id: 'jee-math-trig', name: 'Trigonometry', icon: '📊', questions: [
          { id: 'jm-mt1', question: 'If sinθ=3/5, then cosθ is:', options: ['4/5', '3/4', '5/3', '5/4'], answer: 0, explanation: 'cos²θ=1-sin²θ=1-9/25=16/25. cosθ=4/5.', subject: 'Maths', difficulty: 'easy' },
          { id: 'jm-mt2', question: 'Value of cos60°:', options: ['0', '1/2', '√3/2', '1'], answer: 1, explanation: 'cos60°=1/2 is a standard value.', subject: 'Maths', difficulty: 'easy' },
          { id: 'jm-mt3', question: 'Value of sin90°:', options: ['0', '1/2', '√3/2', '1'], answer: 3, explanation: 'sin90°=1.', subject: 'Maths', difficulty: 'easy' },
        ]},
        { id: 'jee-math-calc', name: 'Calculus', icon: '∫', questions: [
          { id: 'jm-mc1', question: 'Derivative of x³ with respect to x:', options: ['x²', '3x²', '3x³', 'x³/3'], answer: 1, explanation: 'd/dx(xⁿ)=nxⁿ⁻¹. d/dx(x³)=3x².', subject: 'Maths', difficulty: 'easy' },
          { id: 'jm-mc2', question: '∫₀¹ 2x dx equals:', options: ['0', '1', '2', '½'], answer: 1, explanation: '∫₀¹ 2x dx=[x²]₀¹=1-0=1.', subject: 'Maths', difficulty: 'medium' },
          { id: 'jm-mc3', question: 'If f(x)=x²+2x+1, then f\'(x) is:', options: ['2x', '2x+2', 'x²+2', '2x+1'], answer: 1, explanation: "f'(x)=2x+2+0=2x+2.", subject: 'Maths', difficulty: 'easy' },
          { id: 'jm-mc4', question: 'lim(x→0) sinx/x equals:', options: ['0', '1', '∞', '-1'], answer: 1, explanation: 'Standard limit: lim(x→0)sinx/x=1.', subject: 'Maths', difficulty: 'medium' },
        ]},
        { id: 'jee-math-alg', name: 'Algebra & Geometry', icon: '📈', questions: [
          { id: 'jm-ma1', question: 'Value of i² (where i=√-1):', options: ['1', '-1', 'i', '-i'], answer: 1, explanation: 'i=√-1, i²=-1.', subject: 'Maths', difficulty: 'easy' },
          { id: 'jm-ma2', question: 'Number of terms in expansion of (a+b)⁶:', options: ['5', '6', '7', '8'], answer: 2, explanation: '(a+b)ⁿ has n+1 terms. (a+b)⁶ has 7 terms.', subject: 'Maths', difficulty: 'easy' },
          { id: 'jm-ma3', question: 'Distance between (1,2) and (4,6):', options: ['5', '7', '3', '25'], answer: 0, explanation: 'd=√((4-1)²+(6-2)²)=√(9+16)=√25=5.', subject: 'Maths', difficulty: 'easy' },
          { id: 'jm-ma4', question: 'Equation of line with slope 2 through origin:', options: ['y=2', 'x=2', 'y=2x', 'y=x/2'], answer: 2, explanation: 'y=mx+c where m=2, c=0. So y=2x.', subject: 'Maths', difficulty: 'easy' },
          { id: 'jm-ma5', question: 'Sum of interior angles of hexagon:', options: ['540°', '720°', '360°', '900°'], answer: 1, explanation: 'Sum=(n-2)×180°=(6-2)×180°=720°.', subject: 'Maths', difficulty: 'easy' },
        ]},
      ]},
    ],
  },

  // ═══════════════════════════════════
  // NEET UG
  // ═══════════════════════════════════
  {
    id: 'neet-ug', name: 'NEET UG', icon: '🏥',
    subjects: [
      { id: 'neet-bio', name: 'Biology', icon: '🧬', color: 'green', topics: [
        { id: 'neet-bio-cell', name: 'Cell Biology', icon: '🔬', questions: [
          { id: 'nb-c1', question: 'The powerhouse of the cell is:', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi body'], answer: 2, explanation: 'Mitochondria produce ATP through oxidative phosphorylation.', subject: 'Biology', difficulty: 'easy' },
          { id: 'nb-c2', question: 'Number of chromosomes in human somatic cell:', options: ['23', '44', '46', '48'], answer: 2, explanation: 'Human somatic cells: 46 chromosomes (23 pairs). Gametes: 23.', subject: 'Biology', difficulty: 'easy' },
          { id: 'nb-c3', question: 'Photosynthesis occurs in:', options: ['Mitochondria', 'Chloroplast', 'Ribosome', 'Nucleus'], answer: 1, explanation: 'Chloroplasts contain chlorophyll — site of photosynthesis.', subject: 'Biology', difficulty: 'easy' },
        ]},
        { id: 'neet-bio-gen', name: 'Genetics & Evolution', icon: '🧬', questions: [
          { id: 'nb-g1', question: 'DNA replication is:', options: ['Conservative', 'Semi-conservative', 'Dispersive', 'Non-conservative'], answer: 1, explanation: 'Meselson-Stahl proved semi-conservative: each new DNA has one old + one new strand.', subject: 'Biology', difficulty: 'easy' },
          { id: 'nb-g2', question: 'Mendel\'s law of segregation is also called:', options: ['Law of dominance', 'Law of purity of gametes', 'Law of independent assortment', 'Law of variation'], answer: 1, explanation: 'Alleles separate during gamete formation — "purity of gametes."', subject: 'Biology', difficulty: 'medium' },
          { id: 'nb-g3', question: 'Which blood group is universal donor?', options: ['A', 'B', 'AB', 'O'], answer: 3, explanation: 'O has no A or B antigens — can donate to any group.', subject: 'Biology', difficulty: 'easy' },
        ]},
        { id: 'neet-bio-physio', name: 'Human Physiology', icon: '🫀', questions: [
          { id: 'nb-p1', question: 'Functional unit of kidney is:', options: ['Neuron', 'Nephron', 'Alveoli', 'Villus'], answer: 1, explanation: 'Nephron: structural and functional unit. ~1 million per kidney.', subject: 'Biology', difficulty: 'easy' },
          { id: 'nb-p2', question: 'Enzyme that breaks starch:', options: ['Pepsin', 'Lipase', 'Amylase', 'Trypsin'], answer: 2, explanation: 'Amylase (salivary & pancreatic) breaks starch into maltose.', subject: 'Biology', difficulty: 'easy' },
          { id: 'nb-p3', question: 'Cerebellum controls:', options: ['Thinking', 'Balance & coordination', 'Breathing', 'Digestion'], answer: 1, explanation: 'Cerebellum: balance, coordination, posture. Cerebrum: thinking.', subject: 'Biology', difficulty: 'easy' },
          { id: 'nb-p4', question: 'Largest organ in human body:', options: ['Liver', 'Skin', 'Heart', 'Brain'], answer: 1, explanation: 'Skin≈1.5-2m². Liver is largest internal organ.', subject: 'Biology', difficulty: 'easy' },
          { id: 'nb-p5', question: 'HIV attacks which cells?', options: ['Red blood cells', 'Helper T-cells (CD4)', 'Platelets', 'B-cells'], answer: 1, explanation: 'HIV targets CD4+ Helper T-lymphocytes, destroying immunity.', subject: 'Biology', difficulty: 'medium' },
        ]},
        { id: 'neet-bio-plant', name: 'Plant Biology & Ecology', icon: '🌿', questions: [
          { id: 'nb-pl1', question: 'Plant tissue that transports water upward:', options: ['Phloem', 'Xylem', 'Cambium', 'Epidermis'], answer: 1, explanation: 'Xylem: water+minerals upward. Phloem: food (sugars) from leaves.', subject: 'Biology', difficulty: 'easy' },
          { id: 'nb-pl2', question: 'Ozone layer is in which atmospheric layer?', options: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'], answer: 1, explanation: 'Ozone layer: stratosphere (15-35 km), absorbs UV radiation.', subject: 'Biology', difficulty: 'easy' },
          { id: 'nb-pl3', question: 'Basic unit of classification:', options: ['Genus', 'Species', 'Family', 'Order'], answer: 1, explanation: 'Species: fundamental unit. Group that can interbreed.', subject: 'Biology', difficulty: 'easy' },
          { id: 'nb-pl4', question: 'Which is NOT renewable?', options: ['Solar', 'Wind', 'Coal', 'Biomass'], answer: 2, explanation: 'Coal: fossil fuel (non-renewable). Solar, wind, biomass: renewable.', subject: 'Biology', difficulty: 'easy' },
          { id: 'nb-pl5', question: 'Gas released during photosynthesis:', options: ['CO₂', 'N₂', 'O₂', 'H₂'], answer: 2, explanation: '6CO₂+6H₂O→C₆H₁₂O₆+6O₂. Oxygen released.', subject: 'Biology', difficulty: 'easy' },
        ]},
      ]},
      { id: 'neet-phy', name: 'Physics', icon: '⚛️', color: 'blue', topics: [
        { id: 'neet-phy-mech', name: 'Mechanics & Units', icon: '🔧', questions: [
          { id: 'np-m1', question: 'SI unit of force:', options: ['Joule', 'Newton', 'Watt', 'Pascal'], answer: 1, explanation: 'F=ma. Unit: kg⋅m/s²=Newton.', subject: 'Physics', difficulty: 'easy' },
          { id: 'np-m2', question: 'SI unit of frequency:', options: ['Newton', 'Hertz', 'Watt', 'Joule'], answer: 1, explanation: 'Frequency=cycles/second. Unit: Hertz(Hz)=s⁻¹.', subject: 'Physics', difficulty: 'easy' },
          { id: 'np-m3', question: 'Acceleration due to gravity at Earth\'s centre:', options: ['9.8 m/s²', '0 m/s²', '4.9 m/s²', 'Infinite'], answer: 1, explanation: 'At centre: g=0 (mass symmetrically distributed, cancels out).', subject: 'Physics', difficulty: 'medium' },
        ]},
        { id: 'neet-phy-opt', name: 'Optics', icon: '🔭', questions: [
          { id: 'np-o1', question: 'Image by plane mirror is always:', options: ['Real inverted', 'Virtual erect', 'Real erect', 'Virtual inverted'], answer: 1, explanation: 'Plane mirrors: virtual, erect, laterally inverted, same size.', subject: 'Physics', difficulty: 'easy' },
          { id: 'np-o2', question: 'Concave mirror f=15cm, image at 30cm. Object distance:', options: ['30 cm', '10 cm', '20 cm', '15 cm'], answer: 0, explanation: '1/f=1/v+1/u. 1/(-15)=1/(-30)+1/u. u=-30cm.', subject: 'Physics', difficulty: 'medium' },
          { id: 'np-o3', question: 'Visible light wavelength range:', options: ['100-300 nm', '400-700 nm', '700-1000 nm', '1-100 nm'], answer: 1, explanation: 'Visible: 400nm(violet) to 700nm(red).', subject: 'Physics', difficulty: 'easy' },
        ]},
      ]},
      { id: 'neet-chem', name: 'Chemistry', icon: '🧪', color: 'orange', topics: [
        { id: 'neet-chem-struct', name: 'Structure & Bonding', icon: '⚛️', questions: [
          { id: 'nc-s1', question: 'Electronic configuration of Carbon (Z=6):', options: ['1s²2s²2p²', '1s²2s²2p⁴', '1s²2s¹2p³', '1s²2s²2p⁶'], answer: 0, explanation: 'C: 6 electrons. 1s²(2)+2s²(2)+2p²(2)=6.', subject: 'Chemistry', difficulty: 'easy' },
          { id: 'nc-s2', question: 'Isotopes have same:', options: ['Mass number', 'Atomic number', 'Neutrons', 'Protons+neutrons'], answer: 1, explanation: 'Isotopes: same atomic number (protons), different mass (neutrons).', subject: 'Chemistry', difficulty: 'easy' },
          { id: 'nc-s3', question: 'Highest electronegativity element:', options: ['Oxygen', 'Nitrogen', 'Fluorine', 'Chlorine'], answer: 2, explanation: 'Fluorine: 3.98 (Pauling scale). Highest of all elements.', subject: 'Chemistry', difficulty: 'easy' },
          { id: 'nc-s4', question: 'Number of bonds in a double bond:', options: ['1σ+1π', '2σ', '2π', '1σ+2π'], answer: 0, explanation: 'Double bond=1 sigma (head-on)+1 pi (lateral overlap).', subject: 'Chemistry', difficulty: 'easy' },
        ]},
        { id: 'neet-chem-org', name: 'Organic Chemistry', icon: '🔬', questions: [
          { id: 'nc-o1', question: 'Ethanol on dehydration gives:', options: ['Ethane', 'Ethene', 'Methanol', 'Acetone'], answer: 1, explanation: 'C₂H₅OH→C₂H₄+H₂O (with conc. H₂SO₄ at 170°C).', subject: 'Chemistry', difficulty: 'medium' },
          { id: 'nc-o2', question: 'General formula of alkanes:', options: ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙHₙ'], answer: 1, explanation: 'Alkanes: CₙH₂ₙ₊₂. Alkenes: CₙH₂ₙ. Alkynes: CₙH₂ₙ₋₂.', subject: 'Chemistry', difficulty: 'easy' },
          { id: 'nc-o3', question: 'Rust is chemically:', options: ['FeO', 'Fe₂O₃', 'Fe₂O₃·xH₂O', 'Fe₃O₄'], answer: 2, explanation: 'Rust=hydrated iron(III) oxide: Fe₂O₃·xH₂O.', subject: 'Chemistry', difficulty: 'easy' },
          { id: 'nc-o4', question: 'Molecular formula of glucose:', options: ['C₆H₁₂O₆', 'C₁₂H₂₂O₁₁', 'C₆H₁₀O₅', 'C₂H₅OH'], answer: 0, explanation: 'Glucose: C₆H₁₂O₆. Sucrose: C₁₂H₂₂O₁₁.', subject: 'Chemistry', difficulty: 'easy' },
        ]},
      ]},
    ],
  },
];

// Helper to get total questions for an exam
export const getExamTotalQuestions = (examId: string): number => {
  const exam = topicWiseData.find(e => e.id === examId);
  if (!exam) return 0;
  return exam.subjects.reduce((sum, s) => sum + s.topics.reduce((tsum, t) => tsum + t.questions.length, 0), 0);
};

// Get total across all exams
export const getTotalPracticeQuestions = (): number => {
  return topicWiseData.reduce((sum, e) => sum + getExamTotalQuestions(e.id), 0);
};
