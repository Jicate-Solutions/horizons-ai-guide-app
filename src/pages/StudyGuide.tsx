import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, ChevronRight, ExternalLink, Lightbulb, FileText, Star, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

// ═══ STUDY GUIDE DATA ═══
interface TopicGuide {
  id: string;
  name: string;
  ncertChapter: string; // e.g. "Class 11 Ch.1" or "Class 12 Ch.5"
  keyConcepts: string[];
  importantFormulas?: string[];
  recommendedBooks: string[];
  tips: string;
  weightage: string; // e.g. "~8-10 marks" or "2-3 questions"
  difficulty: 'easy' | 'medium' | 'hard';
}

interface SubjectGuide {
  id: string;
  name: string;
  emoji: string;
  color: string;
  topics: TopicGuide[];
}

interface ExamStudyGuide {
  id: string;
  name: string;
  emoji: string;
  totalTopics: number;
  subjects: SubjectGuide[];
  generalTips: string[];
  topBooks: string[];
}

// ═══ NEET UG STUDY GUIDE ═══
const neetGuide: ExamStudyGuide = {
  id: 'neet', name: 'NEET UG 2026', emoji: '🏥', totalTopics: 40,
  generalTips: [
    'NCERT is the BIBLE for NEET — read every line, including examples and diagrams',
    'Biology = 360/720 marks (50%). Master it first for guaranteed high score',
    'Solve 10 years of PYQs — 30-40% questions are repeated concepts',
    'Physics needs practice, not just reading. Solve numericals daily',
  ],
  topBooks: ['NCERT Biology (Class 11 & 12) — MUST READ', 'NCERT Physics (HC Verma for practice)', 'NCERT Chemistry (OP Tandon for Physical, Morrison Boyd for Organic)', 'MTG NEET Objective Biology', 'DC Pandey Physics for NEET'],
  subjects: [
    {
      id: 'neet-botany', name: 'Biology — Botany', emoji: '🌿', color: 'bg-emerald-500',
      topics: [
        { id: 'nb-living-world', name: 'The Living World', ncertChapter: 'Class 11 Ch.1', keyConcepts: ['Taxonomy & Systematics', 'Taxonomic hierarchy: Species → Genus → Family → Order → Class → Phylum → Kingdom', 'Binomial nomenclature rules (ICBN for plants, ICZN for animals)', 'Types of taxonomic aids: Herbarium, Botanical garden, Museum, Zoological parks, Keys'], recommendedBooks: ['NCERT Class 11 Biology Ch.1', 'Trueman Biology Vol 1'], tips: 'Memorize the hierarchy with mnemonic: "King Philip Came Over For Good Spaghetti"', weightage: '1-2 questions', difficulty: 'easy' },
        { id: 'nb-bio-class', name: 'Biological Classification', ncertChapter: 'Class 11 Ch.2', keyConcepts: ['Five Kingdom Classification (Whittaker 1969): Monera, Protista, Fungi, Plantae, Animalia', 'Monera: Bacteria — Archaebacteria (extremophiles) vs Eubacteria', 'Protista: Chrysophytes (diatoms), Dinoflagellates, Euglenoids, Slime moulds, Protozoans', 'Fungi: Phycomycetes, Ascomycetes, Basidiomycetes, Deuteromycetes', 'Viruses: Non-cellular, obligate parasites. Viroids (RNA only), Prions (protein only)'], recommendedBooks: ['NCERT Class 11 Biology Ch.2', 'MTG NEET Objective Biology'], tips: 'Make a comparison table of all 5 kingdoms with cell type, cell wall, nutrition, reproduction', weightage: '2-3 questions', difficulty: 'medium' },
        { id: 'nb-plant-kingdom', name: 'Plant Kingdom', ncertChapter: 'Class 11 Ch.3', keyConcepts: ['Algae: Chlorophyceae (green), Phaeophyceae (brown), Rhodophyceae (red)', 'Bryophytes: Liverworts, Mosses — amphibians of plant kingdom', 'Pteridophytes: First vascular plants — Selaginella, Equisetum, Ferns', 'Gymnosperms: Naked seeds — Cycas, Pinus, Ginkgo', 'Angiosperms: Covered seeds — Monocots vs Dicots', 'Alternation of generations: Sporophyte (2n) ↔ Gametophyte (n)'], recommendedBooks: ['NCERT Class 11 Biology Ch.3'], tips: 'Draw lifecycle diagrams for each group. NEET loves lifecycle questions.', weightage: '2-3 questions', difficulty: 'medium' },
        { id: 'nb-morphology', name: 'Morphology of Flowering Plants', ncertChapter: 'Class 11 Ch.5', keyConcepts: ['Root system: Tap root vs Fibrous root, Modifications (storage, pneumatophores, parasitic)', 'Stem modifications: Stolon, Runner, Sucker, Tuber, Bulb, Corm', 'Leaf: Parts, Venation (parallel/reticulate), Simple vs Compound (pinnate/palmate)', 'Inflorescence types: Racemose vs Cymose', 'Flower structure: Calyx, Corolla, Androecium, Gynoecium', 'Fruit types: Simple, Aggregate, Composite', 'Floral formula writing'], recommendedBooks: ['NCERT Class 11 Biology Ch.5', 'Pradeep Biology'], tips: 'Most asked chapter in Botany. Learn ALL modifications with examples. Draw floral diagrams.', weightage: '3-5 questions', difficulty: 'medium' },
        { id: 'nb-photosynthesis', name: 'Photosynthesis in Higher Plants', ncertChapter: 'Class 11 Ch.13', keyConcepts: ['Light reaction: PS-II → Cytochrome b6f → PS-I → NADP⁺ reductase', 'Cyclic vs Non-cyclic photophosphorylation', 'Calvin Cycle (C3): CO₂ fixation by RuBisCO → 3-PGA → G3P → Regeneration of RuBP', 'C4 pathway: PEP carboxylase in mesophyll, RuBisCO in bundle sheath (Kranz anatomy)', 'CAM plants: Night CO₂ fixation (succulents like cacti)', 'Photorespiration: Why C3 plants are less efficient'], importantFormulas: ['6CO₂ + 12H₂O → C₆H₁₂O₆ + 6H₂O + 6O₂', 'Light reaction: 12H₂O + 12NADP⁺ + 18ADP → 6O₂ + 12NADPH + 18ATP', 'Calvin cycle: 3CO₂ + 9ATP + 6NADPH → G3P + 9ADP + 6NADP⁺'], recommendedBooks: ['NCERT Class 11 Biology Ch.13', 'Trueman Biology'], tips: 'Understand Z-scheme diagram thoroughly. Compare C3, C4, and CAM pathways in a table.', weightage: '2-3 questions', difficulty: 'hard' },
        { id: 'nb-genetics', name: 'Principles of Inheritance', ncertChapter: 'Class 12 Ch.5', keyConcepts: ['Mendel\'s laws: Dominance, Segregation, Independent Assortment', 'Monohybrid (3:1) and Dihybrid (9:3:3:1) crosses', 'Incomplete dominance (1:2:1), Co-dominance (ABO blood groups)', 'Multiple alleles: ABO blood group — Iᴬ, Iᴮ, i', 'Sex determination: XX-XY (humans), ZW-ZZ (birds)', 'Sex-linked inheritance: Colour blindness, Haemophilia', 'Chromosomal disorders: Down (Trisomy 21), Turner (45,X), Klinefelter (47,XXY)'], recommendedBooks: ['NCERT Class 12 Biology Ch.5', 'GR Bathla Genetics'], tips: 'HIGHEST weightage topic in Biology. Practice Punnett squares until you can do them in your sleep.', weightage: '5-8 questions', difficulty: 'medium' },
        { id: 'nb-molecular', name: 'Molecular Basis of Inheritance', ncertChapter: 'Class 12 Ch.6', keyConcepts: ['DNA structure: Watson-Crick model, Antiparallel strands, Base pairing (A=T, G≡C)', 'DNA Replication: Semi-conservative (Meselson-Stahl experiment), Okazaki fragments', 'Transcription: DNA → mRNA by RNA polymerase', 'Genetic code: 64 codons, AUG (start), UAA/UAG/UGA (stop), Degenerate, Universal', 'Translation: mRNA → Protein at ribosome, tRNA brings amino acids', 'Lac operon: Structural genes, Operator, Promoter, Regulator', 'Human Genome Project: 3.2 billion bp, ~20,000-25,000 genes'], recommendedBooks: ['NCERT Class 12 Biology Ch.6', 'MTG NEET Objective Biology'], tips: 'Draw the Central Dogma (DNA→RNA→Protein) and Lac Operon diagrams repeatedly.', weightage: '4-6 questions', difficulty: 'hard' },
        { id: 'nb-ecology', name: 'Ecology & Environment', ncertChapter: 'Class 12 Ch.13-16', keyConcepts: ['Population interactions: Mutualism, Parasitism, Competition, Commensalism, Amensalism, Predation', 'Population growth: Exponential (J-curve) vs Logistic (S-curve, carrying capacity K)', 'Ecosystem: Producers → Consumers → Decomposers, Energy flow (10% law)', 'Ecological pyramids: Energy (always upright), Biomass, Numbers', 'Biogeochemical cycles: Carbon, Nitrogen, Phosphorus', 'Biodiversity: Alpha, Beta, Gamma diversity', 'Conservation: In situ (National parks) vs Ex situ (Zoos, Seed banks)', 'Environmental issues: Ozone depletion, Greenhouse effect, Eutrophication'], recommendedBooks: ['NCERT Class 12 Biology Ch.13-16', 'Shankar IAS Environment'], tips: 'Ecology = easy marks. Memorize all interactions with examples. Draw energy flow diagrams.', weightage: '6-8 questions', difficulty: 'easy' },
      ]
    },
    {
      id: 'neet-zoology', name: 'Biology — Zoology', emoji: '🦠', color: 'bg-teal-500',
      topics: [
        { id: 'nz-digestion', name: 'Digestion & Absorption', ncertChapter: 'Class 11 Ch.16', keyConcepts: ['Alimentary canal: Mouth → Pharynx → Oesophagus → Stomach → Small intestine → Large intestine', 'Enzymes: Amylase (starch→maltose), Pepsin (protein→peptones), Lipase (fats→fatty acids)', 'Stomach: HCl + Pepsinogen → Pepsin. Mucus protects stomach lining', 'Small intestine: Bile (emulsification) + Pancreatic juice + Intestinal juice', 'Absorption: Mostly in small intestine (villi & microvilli increase surface area)', 'Large intestine: Water absorption, bacterial fermentation'], recommendedBooks: ['NCERT Class 11 Biology Ch.16'], tips: 'Make a table: Enzyme → Source → Substrate → Product → pH. This covers 80% of questions.', weightage: '2-3 questions', difficulty: 'medium' },
        { id: 'nz-breathing', name: 'Breathing & Gas Exchange', ncertChapter: 'Class 11 Ch.17', keyConcepts: ['Respiratory system: Nose → Pharynx → Larynx → Trachea → Bronchi → Bronchioles → Alveoli', 'Breathing mechanism: Inspiration (diaphragm contracts) vs Expiration (diaphragm relaxes)', 'Lung volumes: TV (~500ml), IRV (~2500ml), ERV (~1000ml), RV (~1100ml)', 'Vital capacity = TV + IRV + ERV = ~4000ml', 'Gas transport: O₂ by haemoglobin (oxyhaemoglobin), CO₂ as bicarbonate (70%), carbamino (23%), dissolved (7%)', 'Bohr effect: High CO₂/H⁺ → O₂ dissociates from Hb (shifts curve right)'], importantFormulas: ['Vital Capacity = TV + IRV + ERV', 'Total Lung Capacity = VC + RV'], recommendedBooks: ['NCERT Class 11 Biology Ch.17'], tips: 'Learn the oxygen dissociation curve. NEET asks about Bohr effect almost every year.', weightage: '2-3 questions', difficulty: 'medium' },
        { id: 'nz-reproduction', name: 'Human Reproduction', ncertChapter: 'Class 12 Ch.3', keyConcepts: ['Male: Testis → Seminiferous tubules → Spermatogenesis → Spermiogenesis → Spermiation', 'Female: Ovary → Follicle → Ovulation → Corpus luteum → Menstrual cycle (28 days)', 'Menstrual cycle: Menstrual (1-5) → Follicular (6-13) → Ovulation (14) → Luteal (15-28)', 'Hormones: FSH, LH, Estrogen, Progesterone', 'Fertilization: In ampulla of fallopian tube, Zygote → Morula → Blastocyst → Implantation', 'Placenta: Structure, functions (nutrition, respiration, excretion, hormone production — hCG, hPL)'], recommendedBooks: ['NCERT Class 12 Biology Ch.3', 'MTG NEET Biology'], tips: 'Draw the menstrual cycle graph with hormone levels. This question comes every single year.', weightage: '3-5 questions', difficulty: 'medium' },
        { id: 'nz-evolution', name: 'Evolution', ncertChapter: 'Class 12 Ch.7', keyConcepts: ['Origin of life: Oparin-Haldane theory, Miller-Urey experiment', 'Darwin\'s Natural Selection vs Lamarck\'s Inheritance of Acquired Characters', 'Evidences: Homologous organs, Analogous organs, Vestigial organs, Embryological', 'Hardy-Weinberg principle: p² + 2pq + q² = 1 (genotype), p + q = 1 (allele)', 'Factors disturbing equilibrium: Gene flow, Drift, Mutation, Selection, Non-random mating', 'Human evolution: Dryopithecus → Ramapithecus → Australopithecus → Homo habilis → H. erectus → H. sapiens'], importantFormulas: ['Hardy-Weinberg: p² + 2pq + q² = 1', 'p + q = 1'], recommendedBooks: ['NCERT Class 12 Biology Ch.7'], tips: 'Hardy-Weinberg numerical problems are common. Practice solving for p and q.', weightage: '2-3 questions', difficulty: 'medium' },
      ]
    },
    {
      id: 'neet-physics', name: 'Physics', emoji: '⚡', color: 'bg-blue-500',
      topics: [
        { id: 'np-mechanics', name: 'Mechanics (Laws of Motion, Work-Energy)', ncertChapter: 'Class 11 Ch.4-6', keyConcepts: ['Newton\'s three laws of motion', 'Free body diagrams — always draw before solving', 'Friction: Static (μₛmg) vs Kinetic (μₖmg)', 'Work = F·d·cosθ, KE = ½mv², PE = mgh', 'Work-Energy theorem: Net work = Change in KE', 'Conservation of energy and momentum', 'Collisions: Elastic (KE conserved) vs Inelastic'], importantFormulas: ['F = ma', 'W = Fd cosθ', 'KE = ½mv²', 'PE = mgh', 'P = Fv', 'Impulse = FΔt = Δp'], recommendedBooks: ['NCERT Physics Class 11', 'HC Verma Part 1 (Concepts of Physics)', 'DC Pandey Mechanics'], tips: 'Mechanics = 25-30% of Physics. Master FBD and conservation laws. Solve 50+ HC Verma problems.', weightage: '8-10 questions', difficulty: 'medium' },
        { id: 'np-electro', name: 'Electrostatics & Current Electricity', ncertChapter: 'Class 12 Ch.1-3', keyConcepts: ['Coulomb\'s law: F = kq₁q₂/r²', 'Electric field E = F/q, Electric potential V = kq/r', 'Gauss\'s law: Φ = q/ε₀', 'Capacitor: C = Q/V, Energy = ½CV²', 'Ohm\'s law: V = IR, Resistance R = ρL/A', 'Kirchhoff\'s laws: Junction rule (ΣI = 0), Loop rule (ΣV = 0)', 'Wheatstone bridge, Meter bridge, Potentiometer'], importantFormulas: ['F = kq₁q₂/r²', 'E = kq/r²', 'V = kq/r', 'C = εₒA/d', 'R = ρL/A', 'P = I²R = V²/R'], recommendedBooks: ['NCERT Physics Class 12', 'HC Verma Part 2', 'Irodov (advanced)'], tips: 'Most scoring Physics chapter for NEET. Learn Kirchhoff\'s laws with circuit diagrams.', weightage: '6-8 questions', difficulty: 'medium' },
        { id: 'np-optics', name: 'Optics (Ray + Wave)', ncertChapter: 'Class 12 Ch.9-10', keyConcepts: ['Mirror formula: 1/f = 1/v + 1/u', 'Lens formula: 1/f = 1/v - 1/u', 'Power of lens P = 1/f (in meters)', 'Total Internal Reflection: Critical angle sinC = 1/n', 'Young\'s double slit: Fringe width β = λD/d', 'Diffraction, Polarization — Malus law: I = I₀cos²θ'], importantFormulas: ['1/f = 1/v + 1/u (mirror)', '1/f = 1/v - 1/u (lens)', 'P = 1/f (diopters)', 'n = c/v', 'β = λD/d'], recommendedBooks: ['NCERT Physics Class 12 Ch.9-10', 'DC Pandey Optics'], tips: 'Sign convention is KEY. Use real-is-negative convention consistently. Practice ray diagrams.', weightage: '4-5 questions', difficulty: 'medium' },
        { id: 'np-modern', name: 'Modern Physics (Atomic + Nuclear)', ncertChapter: 'Class 12 Ch.11-13', keyConcepts: ['Photoelectric effect: KE_max = hf - φ (Einstein equation)', 'Bohr model: rₙ = n²r₁, Eₙ = -13.6/n² eV', 'de Broglie wavelength: λ = h/mv', 'Radioactivity: α, β, γ decay', 'Half-life: N = N₀(1/2)^(t/t½)', 'Nuclear fission (U-235) and fusion (H→He)', 'Mass-energy: E = mc²'], importantFormulas: ['KE = hf - φ', 'rₙ = 0.529n²/Z Å', 'Eₙ = -13.6Z²/n² eV', 'λ = h/mv', 'N = N₀e^(-λt)', 'E = mc²'], recommendedBooks: ['NCERT Physics Class 12', 'HC Verma Part 2'], tips: 'Photoelectric effect + Bohr model = guaranteed 2-3 questions. Learn energy level transitions.', weightage: '3-5 questions', difficulty: 'medium' },
      ]
    },
    {
      id: 'neet-chemistry', name: 'Chemistry', emoji: '⚗️', color: 'bg-purple-500',
      topics: [
        { id: 'nc-organic', name: 'Organic Chemistry (Reactions & Mechanisms)', ncertChapter: 'Class 11 Ch.12-13, Class 12 Ch.10-12', keyConcepts: ['IUPAC Nomenclature rules for all functional groups', 'Reaction mechanisms: SN1 vs SN2, E1 vs E2', 'Name reactions: Wurtz, Kolbe, Friedel-Crafts, Cannizzaro, Aldol, Reimer-Tiemann', 'Functional groups: -OH (alcohol), -CHO (aldehyde), -COOH (acid), -NH₂ (amine)', 'Isomerism: Structural (chain, position, functional) + Stereo (geometric, optical)', 'GOC: Inductive effect, Resonance, Hyperconjugation, Electromeric effect'], recommendedBooks: ['NCERT Chemistry Class 11 Ch.12-13, Class 12 Ch.10-12', 'Morrison & Boyd (reference)', 'MS Chouhan Organic Chemistry'], tips: 'Learn ALL name reactions with mechanisms. NEET asks 2-3 name reaction questions every year.', weightage: '8-10 questions', difficulty: 'hard' },
        { id: 'nc-physical', name: 'Physical Chemistry', ncertChapter: 'Class 11 Ch.1-7, Class 12 Ch.1-4', keyConcepts: ['Mole concept: Moles = mass/MW = molecules/Avogadro = volume/22.4L at STP', 'Chemical Equilibrium: Kc, Kp, Le Chatelier\'s principle', 'Acids & Bases: pH = -log[H⁺], Buffer solutions', 'Thermodynamics: ΔG = ΔH - TΔS, Spontaneity', 'Chemical Kinetics: Rate law, Order of reaction, Arrhenius equation', 'Electrochemistry: Nernst equation, Faraday\'s laws, Galvanic vs Electrolytic cells', 'Solutions: Raoult\'s law, Colligative properties (ΔTb, ΔTf, π)'], importantFormulas: ['pH = -log[H⁺]', 'ΔG = ΔH - TΔS', 'k = Ae^(-Ea/RT)', 'E = E° - (RT/nF)lnQ', 'π = iCRT'], recommendedBooks: ['NCERT Chemistry', 'OP Tandon Physical Chemistry', 'N Avasthi Problems'], tips: 'Physical Chemistry is formula-heavy. Make a formula sheet and revise daily. Practice numericals.', weightage: '8-10 questions', difficulty: 'medium' },
        { id: 'nc-inorganic', name: 'Inorganic Chemistry', ncertChapter: 'Class 11 Ch.8-11, Class 12 Ch.6-9', keyConcepts: ['Periodic Table: Trends in atomic radius, IE, EA, EN, metallic character', 'Chemical Bonding: Ionic, Covalent, VSEPR theory, Hybridization', 's-block: Alkali metals (Group 1), Alkaline earth (Group 2)', 'p-block: Groups 13-18 with properties, compounds, uses', 'd-block: Transition elements, Variable oxidation states, Color, Magnetic properties', 'f-block: Lanthanoids & Actinoids', 'Coordination compounds: Werner\'s theory, Nomenclature, Isomerism, VBT, CFT'], recommendedBooks: ['NCERT Chemistry (read every line for inorganic)', 'JD Lee Concise Inorganic Chemistry', 'VK Jaiswal Inorganic'], tips: 'Inorganic = pure NCERT. Read the NCERT textbook 4-5 times. Focus on p-block & d-block.', weightage: '8-10 questions', difficulty: 'medium' },
      ]
    }
  ]
};

// ═══ JEE MAIN STUDY GUIDE ═══
const jeeGuide: ExamStudyGuide = {
  id: 'jee', name: 'JEE Main 2026', emoji: '⚙️', totalTopics: 30,
  generalTips: [
    'JEE Main tests CONCEPTS + SPEED. You need both understanding and practice',
    'NCERT for Chemistry (especially inorganic), HC Verma for Physics, RD Sharma + Cengage for Maths',
    'Solve previous 10 years JEE Main papers — pattern recognition is key',
    'Time management: 20 min/subject section. Don\'t get stuck on one question > 3 minutes',
  ],
  topBooks: ['HC Verma — Concepts of Physics Vol 1 & 2', 'DC Pandey — Understanding Physics (all volumes)', 'OP Tandon — Physical Chemistry', 'MS Chouhan — Organic Chemistry', 'RD Sharma + Cengage — Mathematics', 'NCERT Chemistry textbook (for Inorganic)'],
  subjects: [
    {
      id: 'jee-physics', name: 'Physics', emoji: '⚡', color: 'bg-blue-500',
      topics: [
        { id: 'jp-mech', name: 'Mechanics', ncertChapter: 'Class 11 Ch.2-9', keyConcepts: ['Kinematics: Equations of motion, Projectile, Relative velocity', 'Newton\'s Laws: FBD, Friction, Circular motion', 'Work-Energy-Power: Conservation of energy, Collisions', 'Rotational Motion: Torque, Moment of Inertia, Angular momentum', 'Gravitation: Kepler\'s laws, Orbital velocity, Escape velocity'], importantFormulas: ['v = u + at', 'R = u²sin2θ/g', 'τ = Iα', 'L = Iω', 'vₑ = √(2gR)'], recommendedBooks: ['HC Verma Part 1', 'DC Pandey Mechanics', 'Irodov (advanced)'], tips: 'Mechanics = 30% of Physics. Master it first. Practice 100+ problems from HC Verma.', weightage: '8-10 questions', difficulty: 'medium' },
        { id: 'jp-em', name: 'Electromagnetism', ncertChapter: 'Class 12 Ch.1-8', keyConcepts: ['Electrostatics: Coulomb\'s law, Gauss\'s law, Capacitors', 'Current Electricity: Kirchhoff\'s, Wheatstone bridge', 'Magnetism: Biot-Savart, Ampere\'s law, Solenoid', 'EMI: Faraday\'s law, Lenz\'s law, Self/Mutual inductance', 'AC circuits: Impedance, Resonance, Power factor', 'EM Waves: Properties, spectrum'], importantFormulas: ['F = qE + qv×B', 'Φ = BA cosθ', 'emf = -dΦ/dt', 'Z = √(R² + (XL-XC)²)'], recommendedBooks: ['HC Verma Part 2', 'DC Pandey Electricity & Magnetism'], tips: 'EM + Electrostatics = 25% of Physics. Learn Gauss\'s law applications thoroughly.', weightage: '7-9 questions', difficulty: 'hard' },
        { id: 'jp-waves', name: 'Waves & Thermodynamics', ncertChapter: 'Class 11 Ch.11-15', keyConcepts: ['SHM: x = A sin(ωt+φ), Time period of pendulum & spring', 'Wave motion: v = fλ, Standing waves, Beats', 'Sound: Doppler effect, Resonance in pipes', 'Thermodynamics: Laws, Carnot cycle, Entropy', 'Kinetic theory of gases: PV = nRT, KE = 3/2 kT'], importantFormulas: ['T = 2π√(l/g)', 'v = √(T/μ)', 'f\' = f(v±vₒ)/(v±vₛ)', 'η = 1 - T₂/T₁'], recommendedBooks: ['HC Verma', 'DC Pandey Waves & Thermodynamics'], tips: 'SHM + Waves = easy marks if you understand the math. Practice Doppler effect problems.', weightage: '5-7 questions', difficulty: 'medium' },
      ]
    },
    {
      id: 'jee-chemistry', name: 'Chemistry', emoji: '⚗️', color: 'bg-purple-500',
      topics: [
        { id: 'jc-phys', name: 'Physical Chemistry', ncertChapter: 'Class 11-12', keyConcepts: ['Mole concept & Stoichiometry', 'Atomic structure: Bohr model, Quantum numbers, Electronic configuration', 'Chemical equilibrium: Kc, Kp, Le Chatelier', 'Thermodynamics & Thermochemistry: Hess\'s law, Born-Haber cycle', 'Electrochemistry: Nernst equation, Conductivity', 'Chemical Kinetics: Rate laws, Arrhenius', 'Solutions: Raoult\'s law, Colligative properties'], importantFormulas: ['PV = nRT', 'ΔG° = -nFE°', 'k = Ae^(-Ea/RT)', 'π = iMRT'], recommendedBooks: ['OP Tandon Physical Chemistry', 'N Avasthi Problems', 'NCERT'], tips: 'Physical Chemistry = numericals. Make formula sheet. Solve Avasthi for practice.', weightage: '8-10 questions', difficulty: 'medium' },
        { id: 'jc-org', name: 'Organic Chemistry', ncertChapter: 'Class 11-12', keyConcepts: ['GOC: Inductive, Resonance, Hyperconjugation effects', 'Reaction mechanisms: SN1/SN2, E1/E2, Electrophilic addition', 'Name reactions: 25+ reactions you MUST know', 'Functional group interconversions', 'Biomolecules: Carbohydrates, Proteins, Nucleic acids', 'Polymers: Addition vs Condensation, examples'], recommendedBooks: ['MS Chouhan Organic Chemistry', 'Morrison & Boyd (reference)', 'Himanshu Pandey Advanced Problems'], tips: 'Draw mechanisms, don\'t just memorize. Understand WHY a reaction happens. Practice MS Chouhan daily.', weightage: '8-10 questions', difficulty: 'hard' },
        { id: 'jc-inorg', name: 'Inorganic Chemistry', ncertChapter: 'Class 11-12', keyConcepts: ['Periodic properties: Trends and exceptions', 'Chemical bonding: VSEPR, MOT, Hybridization', 'p-block: Group 13-18 elements and compounds', 'd and f block: Properties, compounds, uses', 'Coordination compounds: Nomenclature, Isomerism, Bonding theories', 'Metallurgy: Extraction of Al, Cu, Fe, Zn'], recommendedBooks: ['NCERT Chemistry (read every line)', 'JD Lee Inorganic Chemistry', 'VK Jaiswal'], tips: 'NCERT is ENOUGH for inorganic. Read it 5 times. Make comparison tables for p-block groups.', weightage: '6-8 questions', difficulty: 'easy' },
      ]
    },
    {
      id: 'jee-maths', name: 'Mathematics', emoji: '📐', color: 'bg-indigo-500',
      topics: [
        { id: 'jm-algebra', name: 'Algebra', ncertChapter: 'Class 11-12', keyConcepts: ['Quadratic equations, Complex numbers', 'Sequences & Series: AP, GP, HP, AGP', 'Binomial Theorem: General term, Properties', 'Permutations & Combinations', 'Matrices & Determinants: Operations, Inverse, Cramer\'s rule', 'Probability: Bayes theorem, Binomial distribution'], importantFormulas: ['Sₙ = n/2(2a+(n-1)d)', 'ⁿCᵣ = n!/(r!(n-r)!)', '(a+b)ⁿ = Σ ⁿCᵣ aⁿ⁻ʳ bʳ'], recommendedBooks: ['RD Sharma Class 11-12', 'SK Goyal Algebra', 'Cengage Mathematics'], tips: 'PnC and Probability are tricky but high-scoring. Practice 50+ problems of each type.', weightage: '8-10 questions', difficulty: 'medium' },
        { id: 'jm-calc', name: 'Calculus', ncertChapter: 'Class 11-12', keyConcepts: ['Limits & Continuity: Standard limits, L\'Hôpital\'s rule', 'Differentiation: Chain rule, Implicit, Parametric', 'Application of Derivatives: Maxima/Minima, Tangent/Normal, Rate of change', 'Integration: Substitution, By parts, Partial fractions', 'Definite integrals: Properties, Area under curves', 'Differential equations: Variable separable, Linear, Homogeneous'], importantFormulas: ['d/dx(xⁿ) = nxⁿ⁻¹', '∫xⁿdx = xⁿ⁺¹/(n+1)', 'lim(x→0) sinx/x = 1'], recommendedBooks: ['Cengage Calculus', 'Amit M Agarwal Integral Calculus', 'RD Sharma'], tips: 'Calculus = 30-35% of Maths. If you master Calculus, you\'ve mastered JEE Maths. Practice daily.', weightage: '10-12 questions', difficulty: 'hard' },
        { id: 'jm-coord', name: 'Coordinate Geometry', ncertChapter: 'Class 11', keyConcepts: ['Straight lines: Slope, Equations, Distance, Angle between lines', 'Circles: Standard form, General form, Tangent, Family of circles', 'Parabola, Ellipse, Hyperbola: Standard equations, Tangent, Normal, Focus', 'Locus problems'], importantFormulas: ['y-y₁ = m(x-x₁)', '(x-h)²+(y-k)²=r²', 'x²/a²+y²/b²=1'], recommendedBooks: ['SL Loney Coordinate Geometry', 'Cengage Coordinate Geometry'], tips: 'Conics (Parabola/Ellipse/Hyperbola) = 3-4 questions guaranteed. Learn tangent equations for all.', weightage: '5-7 questions', difficulty: 'medium' },
      ]
    }
  ]
};

// ═══ CLAT STUDY GUIDE ═══
const clatGuide: ExamStudyGuide = {
  id: 'clat', name: 'CLAT 2027', emoji: '⚖️', totalTopics: 15,
  generalTips: [
    'CLAT is passage-based since 2020. Practice reading comprehension speed.',
    'Read The Hindu newspaper daily — Current Affairs = 25% of marks',
    'Legal Reasoning tests logical application of principles, not memorization of law',
    'No negative marking removed after 2023 — attempt every question',
  ],
  topBooks: ['Word Power Made Easy (Norman Lewis) — Vocabulary', 'Legal Aptitude by AP Bhardwaj', 'Pearson CLAT Guide', 'The Hindu newspaper (daily)', 'Manorama Yearbook (GK)'],
  subjects: [
    {
      id: 'clat-english', name: 'English Language', emoji: '📝', color: 'bg-blue-500',
      topics: [
        { id: 'ce-rc', name: 'Reading Comprehension', ncertChapter: 'No specific NCERT — practice based', keyConcepts: ['Passage types: Opinion, Factual, Analytical, Narrative', 'Question types: Main idea, Inference, Vocabulary in context, Author\'s tone', 'Speed reading techniques: Skimming for main idea, Scanning for details', 'Eliminating wrong answers: Too extreme, Out of scope, Opposite of passage'], recommendedBooks: ['Word Power Made Easy (Norman Lewis)', 'Wren & Martin English Grammar', 'Previous year CLAT papers'], tips: 'Read 2-3 long articles daily from The Hindu editorial. Time yourself — aim for 450 words/minute.', weightage: '22-26 questions', difficulty: 'medium' },
      ]
    },
    {
      id: 'clat-gk', name: 'Current Affairs & GK', emoji: '🌍', color: 'bg-amber-500',
      topics: [
        { id: 'cg-current', name: 'Current Affairs (Last 12 months)', ncertChapter: 'Newspapers & Yearbooks', keyConcepts: ['Indian polity events: Constitutional amendments, SC judgments, Elections', 'International affairs: G20, UN resolutions, Bilateral treaties', 'Economy: Budget highlights, RBI policies, GDP, Inflation data', 'Science & Tech: Space missions, AI developments, Awards (Nobel, Padma)', 'Sports: Major tournaments, records, Indian achievements', 'Art & Culture: National awards, Heritage sites, Cultural events'], recommendedBooks: ['The Hindu / Indian Express (daily)', 'Manorama Yearbook 2026', 'Pratiyogita Darpan monthly', 'GKToday.in'], tips: 'Make weekly notes from newspaper. Focus on SC/HC judgments — they love asking legal news.', weightage: '25-30 questions', difficulty: 'medium' },
        { id: 'cg-static', name: 'Static GK (Polity & Constitution)', ncertChapter: 'NCERT Polity Class 9-12', keyConcepts: ['Fundamental Rights (Art 14-32)', 'Directive Principles (Art 36-51)', 'Fundamental Duties (Art 51A)', 'Important Constitutional Amendments: 42nd, 44th, 73rd, 86th, 101st', 'Organs: Parliament, Judiciary, Executive', 'International organizations: UN, WHO, WTO, ICC, ICJ'], recommendedBooks: ['Laxmikanth Indian Polity', 'NCERT Class 9-12 Civics'], tips: 'Laxmikanth is the gold standard. Read it once, then revise from your notes. Focus on Articles.', weightage: '8-10 questions', difficulty: 'medium' },
      ]
    },
    {
      id: 'clat-legal', name: 'Legal Reasoning', emoji: '⚖️', color: 'bg-emerald-500',
      topics: [
        { id: 'cl-pr', name: 'Principle-Fact Application', ncertChapter: 'No NCERT — Legal aptitude books', keyConcepts: ['Format: Principle given → Fact situation → Apply principle to facts', 'Constitutional principles: Equality, Free speech, Right to life', 'Tort law: Negligence, Strict liability, Nuisance, Defamation', 'Contract law: Offer, Acceptance, Consideration, Free consent, Void/Voidable', 'Criminal law: Mens rea (guilty mind), Actus reus (guilty act), Exceptions', 'Important maxims: Audi alteram partem, Res judicata, Caveat emptor'], recommendedBooks: ['AP Bhardwaj Legal Aptitude', 'Universal\'s CLAT Guide', 'Previous year CLAT papers'], tips: 'Don\'t study actual law. CLAT tests logical reasoning WITH legal principles. Apply the principle as given, even if you disagree with it.', weightage: '22-26 questions', difficulty: 'hard' },
      ]
    },
    {
      id: 'clat-logical', name: 'Logical Reasoning', emoji: '🧩', color: 'bg-violet-500',
      topics: [
        { id: 'cl-lr', name: 'Critical Reasoning & Arguments', ncertChapter: 'Practice based', keyConcepts: ['Passage-based reasoning (since CLAT 2020)', 'Identifying arguments: Premise + Conclusion', 'Strengthening / Weakening arguments', 'Assumptions: Stated vs Unstated', 'Logical fallacies: Ad hominem, Straw man, False cause, Slippery slope', 'Analogical reasoning', 'Syllogisms: All/Some/No statements, Venn diagrams'], recommendedBooks: ['RS Aggarwal Logical Reasoning', 'Pearson CLAT Guide', 'Previous year papers'], tips: 'Practice passage-based reasoning. Old CLAT pattern (standalone questions) is gone. Everything is passage-based now.', weightage: '22-26 questions', difficulty: 'medium' },
      ]
    },
    {
      id: 'clat-quant', name: 'Quantitative Techniques', emoji: '🔢', color: 'bg-red-500',
      topics: [
        { id: 'cq-math', name: 'Basic Mathematics & Data Interpretation', ncertChapter: 'Class 10 Maths', keyConcepts: ['CLAT Maths is Class 10 level — NOT advanced', 'Percentage, Profit & Loss, Simple & Compound Interest', 'Ratio & Proportion, Time & Work, Speed & Distance', 'Data Interpretation: Tables, Bar graphs, Pie charts, Line graphs', 'Statistics: Mean, Median, Mode', 'Number system basics, Averages, Mixtures'], recommendedBooks: ['RS Aggarwal Quantitative Aptitude', 'NCERT Class 10 Maths', 'Arun Sharma (for DI)'], tips: 'CLAT Maths is easy compared to engineering exams. Focus on DI — it\'s passage-based now. Speed matters more than difficulty.', weightage: '10-14 questions', difficulty: 'easy' },
      ]
    }
  ]
};

const allGuides = [neetGuide, jeeGuide, clatGuide];

// ═══ COMPONENT ═══
const StudyGuide = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const guide = selectedExam ? allGuides.find(g => g.id === selectedExam) : null;

  // Exam selection
  if (!selectedExam) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-4 pb-24">
        <div className="max-w-lg mx-auto space-y-5">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-3xl shadow-lg mb-4">📖</div>
            <h1 className="text-2xl font-bold text-gray-900">Study Guide</h1>
            <p className="text-sm text-gray-500 mt-1">Topic-by-topic — concepts, formulas, books & tips</p>
          </div>
          <div className="space-y-3">
            {allGuides.map(g => (
              <button key={g.id} onClick={() => setSelectedExam(g.id)}
                className="w-full bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-indigo-400 hover:shadow-lg transition-all text-left flex items-center gap-4 active:scale-[0.98]">
                <span className="text-3xl">{g.emoji}</span>
                <div className="flex-1">
                  <p className="text-base font-bold text-gray-900">{g.name}</p>
                  <p className="text-xs text-gray-500">{g.totalTopics} topics · {g.subjects.length} subjects</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-4 pb-24">
      <div className="max-w-lg mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <button onClick={() => { setSelectedExam(null); setExpandedSubject(null); setExpandedTopic(null); }}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4" /> Change Exam
          </button>
        </div>

        {/* Exam header */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{guide!.emoji}</span>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{guide!.name} — Study Guide</h1>
              <p className="text-xs text-gray-500">{guide!.totalTopics} topics across {guide!.subjects.length} subjects</p>
            </div>
          </div>
          {/* General tips */}
          <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 space-y-1">
            <p className="text-[10px] font-bold text-amber-700 mb-1">💡 Key Tips</p>
            {guide!.generalTips.map((t, i) => (
              <p key={i} className="text-xs text-amber-700">• {t}</p>
            ))}
          </div>
        </div>

        {/* Top Books */}
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-xs font-bold text-gray-700 mb-2">📚 Must-Read Books</p>
          {guide!.topBooks.map((b, i) => (
            <p key={i} className="text-xs text-gray-600 mb-1">{i + 1}. {b}</p>
          ))}
        </div>

        {/* Subjects */}
        <div className="space-y-3">
          {guide!.subjects.map(sub => {
            const isSubOpen = expandedSubject === sub.id;
            return (
              <div key={sub.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button onClick={() => setExpandedSubject(isSubOpen ? null : sub.id)}
                  className="w-full p-4 text-left flex items-center gap-3 hover:bg-gray-50">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg", sub.color)}>
                    {sub.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{sub.name}</p>
                    <p className="text-[10px] text-gray-500">{sub.topics.length} topics</p>
                  </div>
                  {isSubOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>

                {isSubOpen && (
                  <div className="border-t border-gray-100 p-3 space-y-2">
                    {sub.topics.map(topic => {
                      const isOpen = expandedTopic === topic.id;
                      return (
                        <div key={topic.id} className="border border-gray-200 rounded-xl overflow-hidden">
                          <button onClick={() => setExpandedTopic(isOpen ? null : topic.id)}
                            className="w-full p-3 text-left flex items-center gap-2 hover:bg-gray-50">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-xs font-bold text-gray-800">{topic.name}</p>
                                <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded",
                                  topic.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700' :
                                  topic.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                                  'bg-red-100 text-red-700')}>{topic.difficulty}</span>
                                <span className="text-[9px] text-gray-400">{topic.weightage}</span>
                              </div>
                              <p className="text-[10px] text-gray-500 mt-0.5">📖 {topic.ncertChapter}</p>
                            </div>
                            {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
                          </button>

                          {isOpen && (
                            <div className="border-t border-gray-100 p-3 space-y-3">
                              {/* Key Concepts */}
                              <div>
                                <p className="text-[10px] font-bold text-indigo-700 mb-1.5">🎯 Key Concepts</p>
                                <div className="space-y-1">
                                  {topic.keyConcepts.map((c, i) => (
                                    <p key={i} className="text-xs text-gray-700 leading-relaxed bg-indigo-50 rounded-lg px-3 py-2">• {c}</p>
                                  ))}
                                </div>
                              </div>

                              {/* Formulas */}
                              {topic.importantFormulas && topic.importantFormulas.length > 0 && (
                                <div>
                                  <p className="text-[10px] font-bold text-purple-700 mb-1.5">📝 Important Formulas</p>
                                  <div className="bg-purple-50 rounded-lg p-3 space-y-1">
                                    {topic.importantFormulas.map((f, i) => (
                                      <p key={i} className="text-xs font-mono text-purple-800">{f}</p>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Books */}
                              <div>
                                <p className="text-[10px] font-bold text-emerald-700 mb-1">📚 Recommended Books</p>
                                {topic.recommendedBooks.map((b, i) => (
                                  <p key={i} className="text-xs text-gray-600">• {b}</p>
                                ))}
                              </div>

                              {/* Tip */}
                              <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                                <p className="text-xs text-amber-700">💡 {topic.tips}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudyGuide;
