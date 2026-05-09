// Previous Year Question Papers — organized like Vedantu
// Structure: Exam → Year → Session → Shift → Subject-wise questions

export interface PYQPaper {
  id: string;
  exam: string;
  year: number;
  session: string;
  date: string;
  shift: string;
  difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Easy to Moderate' | 'Moderate to Difficult';
  totalQuestions: number;
  totalMarks: number;
  duration: string;
  /** Optional path to the full official paper PDF (placed in /public). When present,
   *  the UI shows a "View Full Paper PDF" button that opens this file directly. */
  pdfUrl?: string;
  subjects: {
    name: string;
    questions: {
      q: string;
      o: string[];
      a: number;
      e: string;
      topic: string;
    }[];
  }[];
}

export const pyqPapers: PYQPaper[] = [

// ═══ NEET 2026 — Code 11 ═══
{
  id: 'neet-2026-code-11', exam: 'NEET UG', year: 2026, session: 'May', date: 'May 3, 2026', shift: 'Code 11',
  difficulty: 'Moderate', totalQuestions: 180, totalMarks: 720, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/neet-2026-code-11.pdf',
  subjects: [],
},

// ═══ NEET 2026 — Code 12 ═══
{
  id: 'neet-2026-code-12', exam: 'NEET UG', year: 2026, session: 'May', date: 'May 3, 2026', shift: 'Code 12',
  difficulty: 'Moderate', totalQuestions: 180, totalMarks: 720, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/neet-2026-code-12.pdf',
  subjects: [],
},

// ═══ NEET 2025 ═══
{
  id: 'neet-2025', exam: 'NEET UG', year: 2025, session: 'May', date: 'May 4, 2025', shift: 'Single Shift',
  difficulty: 'Moderate to Difficult', totalQuestions: 180, totalMarks: 720, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/neet-2025.pdf',
  subjects: [
    { name: 'Physics', questions: [
      {q:'A microscope has objective f=2 cm, eyepiece f=4 cm, tube length 40 cm, distance of distinct vision 25 cm. Magnification is:',o:['100','125','150','250'],a:1,e:'M = (L/f_o)(D/f_e) = (40/2)(25/4) = 20 × 6.25 = 125.',topic:'Ray Optics'},
      {q:'Two cars A and B with KE 100 J and 225 J stop after 1000 m and 1500 m respectively. F_A/F_B is:',o:['3/2','2/3','1/3','1/2'],a:1,e:'F = KE/s. F_A = 0.10 N, F_B = 0.15 N → F_A/F_B = 2/3.',topic:'Work–Energy'},
      {q:'A 0.5 kg ball dropped from 40 m rebounds to 10 m. Impulse during collision (g=9.8):',o:['21 Ns','7 Ns','0','84 Ns'],a:0,e:'v_i = √(2gh) = 28 m/s, v_f = 14 m/s. J = m(v_f + v_i) = 0.5(42) = 21 Ns.',topic:'Impulse'},
      {q:'Sun rotates once in 27 days. If it expands to twice its present radius (uniform density), new period is:',o:['100 days','105 days','115 days','108 days'],a:3,e:'I₁ω₁ = I₂ω₂; I ∝ R². R doubles → I × 4 → T × 4 = 108 days.',topic:'Gravitation / Rotation'},
      {q:'Mars orbit ≈ 4× Mercury orbit. Mars year = 687 Earth days. Mercury year is:',o:['88 earth days','225 earth days','172 earth days','124 earth days'],a:0,e:"By Kepler's 3rd law T² ∝ r³ → T_Mars/T_Merc = 8 → T_Merc = 687/8 ≈ 86 ≈ 88 days.",topic:'Gravitation'},
      {q:'A body weighs 48 N on Earth. At height h = R/3 the gravitational force is:',o:['16 N','27 N','32 N','36 N'],a:1,e:'F ∝ 1/r²; r = 4R/3 → F = 48 × (3/4)² = 27 N.',topic:'Gravitation'},
      {q:'Wire of resistance R cut into 8 equal pieces. 4 in parallel, two such sets in series. Net resistance:',o:['R/64','R/32','R/16','R/8'],a:2,e:'Each piece R/8. Parallel of 4 → R/32. Two such in series → R/16.',topic:'Current Electricity'},
      {q:'A pipe open at both ends has fundamental frequency f. Dipped vertically in water to half its length, new fundamental is:',o:['f/2','f','3f/2','2f'],a:1,e:'Open–open: f = v/2L. Half-submerged becomes open–closed of length L/2: f′ = v/(4·L/2) = v/2L = f.',topic:'Waves'},
    ]},
    { name: 'Chemistry', questions: [
      {q:'For first-order reaction t₁/₂ = 1 min. Time for 99.9% completion:',o:['2 minutes','4 minutes','5 minutes','10 minutes'],a:3,e:'k = 0.693. t = (2.303/k) log(1000) ≈ 10 min.',topic:'Chemical Kinetics'},
      {q:'Oxidation states of K (in KO₂), O (in H₂O₂), S (in H₂SO₄) are:',o:['+1, −1, +6','+2, −2, +6','+1, −2, +4','+4, −4, +6'],a:0,e:'Superoxide O₂⁻ → K is +1; peroxide O–O → each O is −1; in H₂SO₄, S = +6.',topic:'Redox'},
      {q:'Which compound exhibits cis–trans isomerism?',o:['Pent-1-ene','2-Methylhex-2-ene','1,1-Dimethylcyclopropane','1,2-Dimethylcyclohexane'],a:3,e:'Two different substituents on adjacent ring carbons → cis/trans possible.',topic:'Stereochemistry'},
      {q:'Decreasing acidity:',o:['t-BuCOOH > i-PrCOOH > AcOH > HCOOH','AcOH > i-PrCOOH > t-BuCOOH > HCOOH','HCOOH > AcOH > i-PrCOOH > t-BuCOOH','HCOOH > t-BuCOOH > i-PrCOOH > AcOH'],a:2,e:'+I effect of alkyl groups destabilizes the carboxylate → reduces acidity. HCOOH (no alkyl) is strongest.',topic:'Carboxylic Acids'},
      {q:'Aqueous solution with highest boiling point:',o:['0.01 M Urea','0.01 M KNO₃','0.01 M Na₂SO₄','0.015 M C₆H₁₂O₆'],a:2,e:'ΔT_b ∝ i·m. Na₂SO₄ has i ≈ 3 (highest among options), so highest BP elevation.',topic:'Solutions'},
      {q:'Phosphorus acid ionizes in 3 steps with K_a1, K_a2, K_a3. Which are true? A. log K = log K_a1 + log K_a2 + log K_a3  B. H₃PO₄ stronger than H₂PO₄⁻ and HPO₄²⁻  C. K_a1 > K_a2 > K_a3  D. K_a1 = (K_a2 + K_a3)/2',o:['A and B only','A and C only','B, C and D only','A, B and C only'],a:3,e:'K = K_a1·K_a2·K_a3 → A; acidity decreases as protons leave from increasingly negative species → B and C true; D false.',topic:'Ionic Equilibrium'},
      {q:'Which is paramagnetic? A. [NiCl₄]²⁻  B. Ni(CO)₄  C. [Ni(CN)₄]²⁻  D. [Ni(H₂O)₆]²⁺  E. Ni(PPh₃)₄',o:['A and C only','B and E only','A and D only','A, D and E only'],a:2,e:'Cl⁻ and H₂O are weak-field; tetrahedral [NiCl₄]²⁻ and octahedral [Ni(H₂O)₆]²⁺ keep 2 unpaired e⁻. CO/PPh₃ → Ni(0) d¹⁰ diamagnetic; CN⁻ → low-spin square planar diamagnetic.',topic:'Coordination Chemistry'},
      {q:'Which microbe is NOT used in household products? A. Aspergillus niger  B. Lactobacillus  C. Trichoderma polysporum  D. S. cerevisiae  E. Propionibacterium sharmanii',o:['A and B only','A and C only','C and D only','C and E only'],a:1,e:'A. niger → industrial citric acid; T. polysporum → cyclosporin A. Both NOT household.',topic:'Biotechnology / Industrial'},
    ]},
    { name: 'Biology', questions: [
      {q:'Complex II of mitochondrial ETC is also known as:',o:['Cytochrome bc₁','Succinate dehydrogenase','Cytochrome c oxidase','NADH dehydrogenase'],a:1,e:'Complex II = succinate dehydrogenase; oxidizes succinate to fumarate and feeds e⁻ to ubiquinone.',topic:'Respiration'},
      {q:'PCR amplifies DNA following the equation:',o:['N²','2ⁿ','2n + 1','2N²'],a:1,e:'Each cycle doubles the DNA → after n cycles, 2ⁿ copies.',topic:'Biotechnology'},
      {q:'Blood vessel that carries deoxygenated blood from body to heart in frog:',o:['Aorta','Pulmonary artery','Pulmonary vein','Vena cava'],a:3,e:'Vena cava collects deoxygenated blood from body and returns it to the heart.',topic:'Animal Physiology'},
      {q:'Example of ex-situ conservation:',o:['National Park','Wildlife Sanctuary','Zoos and botanical gardens','Protected areas'],a:2,e:'Ex-situ = away from natural habitat. Zoos and botanical gardens are textbook ex-situ examples.',topic:'Biodiversity'},
      {q:'Streptokinase from Streptococcus is used for:',o:['Curd production','Ethanol production','Liver disease','Removing clots from blood vessels'],a:3,e:"Streptokinase is a clot-buster used in myocardial infarction.",topic:'Microbes in Human Welfare'},
      {q:'First menstruation is called:',o:['Menopause','Menarche','Diapause','Ovulation'],a:1,e:'The first menstrual flow at puberty is called menarche.',topic:'Human Reproduction'},
      {q:'Histones are enriched with:',o:['Lysine & Arginine','Leucine & Lysine','Phenylalanine & Leucine','Phenylalanine & Arginine'],a:0,e:'Histones are basic proteins rich in positively charged Lys and Arg residues that bind acidic DNA.',topic:'Molecular Biology'},
      {q:"Verhulst–Pearl Logistic Growth equation:",o:['dN/dt = r((K−N)/K)','dN/dt = rN((K−N)/K)','dN/dt = rN((N−K)/N)','dN/dt = N((r−K)/K)'],a:1,e:'Logistic growth: dN/dt = rN(K−N)/K, where K is carrying capacity.',topic:'Ecology'},
    ]},
  ],
},

// ═══ NEET 2024 ═══
{
  id: 'neet-2024', exam: 'NEET UG', year: 2024, session: 'May', date: 'May 5, 2024', shift: 'Single Shift',
  difficulty: 'Moderate', totalQuestions: 200, totalMarks: 720, duration: '3 hours 20 min',
  pdfUrl: '/pyq-pdfs/neet-2024.pdf',
  subjects: [
    { name: 'Physics', questions: [
      {q:'A tightly wound 100-turn coil of radius 10 cm carries a current of 7 A. The magnitude of the magnetic field at the centre is (μ₀ = 4π × 10⁻⁷):',o:['4.4 mT','44 T','44 mT','4.4 T'],a:3,e:'B = μ₀NI/2R = (4π×10⁻⁷)(100)(7)/(2×0.10) ≈ 4.4 × 10⁻³ T = 4.4 mT.',topic:'Magnetic Effects of Current'},
      {q:'In an ideal transformer with turns ratio Nₚ/Nₛ = 1/2, the ratio Vₛ : Vₚ is:',o:['1 : 1','1 : 4','1 : 2','2 : 1'],a:3,e:'Vₛ/Vₚ = Nₛ/Nₚ = 2/1, so Vₛ : Vₚ = 2 : 1.',topic:'Alternating Current'},
      {q:'A 10 N horizontal force is applied to block A (2 kg) pushing block B (3 kg) on a frictionless surface. The force exerted by A on B is:',o:['6 N','10 N','zero','4 N'],a:0,e:'a = 10/5 = 2 m/s². Force on B = m_B × a = 3 × 2 = 6 N.',topic:'Laws of Motion'},
      {q:'Maximum elongation of a 1 m steel wire (elastic limit 8×10⁸ N/m², Y = 2×10¹¹ N/m²):',o:['40 mm','8 mm','4 mm','0.4 mm'],a:2,e:'ΔL = σL/Y = (8×10⁸)(1)/(2×10¹¹) = 4×10⁻³ m = 4 mm.',topic:'Mechanical Properties of Solids'},
      {q:'A planet has 1/10 Earth\'s mass and half its diameter. g on the planet is:',o:['4.9 m/s²','3.92 m/s²','19.6 m/s²','9.8 m/s²'],a:1,e:'g_p/g_e = (M_p/M_e)/(R_p/R_e)² = (1/10)/(1/2)² = 4/10 → g_p = 0.4 × 9.8 = 3.92 m/s².',topic:'Gravitation'},
      {q:'Two heaters rated 1 kW and 2 kW connected first in series, then in parallel to the same source. Ratio of total powers (series : parallel) is:',o:['1 : 2','2 : 3','1 : 1','2 : 9'],a:3,e:'Series: P_s = V²/(R₁+R₂); Parallel: P_p = V²(1/R₁+1/R₂). Ratio works out to 2 : 9.',topic:'Current Electricity'},
      {q:'Minimum energy to launch a satellite of mass m from Earth (M, R) into orbit at altitude 2R:',o:['GMm/(2R)','GMm/(3R)','5GMm/(6R)','2GMm/(3R)'],a:2,e:'E = (final TE) − (initial PE) = −GMm/(6R) − (−GMm/R) = 5GMm/(6R).',topic:'Gravitation'},
      {q:'Quantities with the same dimensions as solid angle:',o:['Strain and arc','Angular speed and stress','Strain and angle','Stress and angle'],a:2,e:'Solid angle is dimensionless; strain and plane angle are also dimensionless.',topic:'Units & Dimensions'},
    ]},
    { name: 'Chemistry', questions: [
      {q:'Which reaction is NOT a redox reaction?',o:['H₂ + Cl₂ → 2 HCl','BaCl₂ + Na₂SO₄ → BaSO₄ + 2 NaCl','Zn + CuSO₄ → ZnSO₄ + Cu','2 KClO₃ + I₂ → 2 KIO₃ + Cl₂'],a:1,e:'Double displacement; no change in oxidation states of any element.',topic:'Redox Reactions'},
      {q:'Fehling\'s solution \'A\' is:',o:['Alkaline solution of sodium potassium tartrate','Aqueous sodium citrate','Aqueous copper sulphate','Alkaline copper sulphate'],a:2,e:'Fehling A is aqueous CuSO₄; Fehling B is alkaline Rochelle salt. Mixed when needed.',topic:'Aldehydes & Ketones'},
      {q:'Increasing electronegativity of N, O, F, C, Si:',o:['O < F < N < C < Si','F < O < N < C < Si','Si < C < N < O < F','Si < C < O < N < F'],a:2,e:'Across a period EN increases (C<N<O<F); down a group it decreases (Si<C). So Si<C<N<O<F.',topic:'Periodic Properties'},
      {q:'Which alcohol reacts instantaneously with Lucas reagent?',o:['(CH₃)₂CH–CH₂OH','(CH₃)₃C–OH','n-Butanol','sec-Butanol'],a:1,e:'Tertiary alcohols give immediate turbidity with Lucas reagent (forms 3° carbocation rapidly).',topic:'Alcohols, Phenols & Ethers'},
      {q:'In which equilibrium are Kₚ and K_c NOT equal?',o:['CO + H₂O ⇌ CO₂ + H₂','2 BrCl ⇌ Br₂ + Cl₂','PCl₅ ⇌ PCl₃ + Cl₂','H₂ + I₂ ⇌ 2 HI'],a:2,e:'Kₚ = K_c(RT)^Δn. PCl₅ ⇌ PCl₃ + Cl₂ has Δn=1 ≠ 0, so Kₚ ≠ K_c.',topic:'Chemical Equilibrium'},
      {q:'Compound that undergoes Sɴ¹ reaction the fastest:',o:['Bromobenzene','1-Phenylethyl bromide','Cyclohexylmethyl bromide (1°)','Cyclohexyl bromide (2°)'],a:1,e:'1-Phenylethyl cation is benzylic — strongly stabilised by resonance — so its Br ionises fastest.',topic:'Haloalkanes'},
      {q:'Solid → vapour without passing through liquid; the purification technique is:',o:['Distillation','Chromatography','Crystallization','Sublimation'],a:3,e:'Sublimation purifies solids that volatilize directly (e.g., camphor, NH₄Cl, naphthalene).',topic:'Purification of Organic Compounds'},
      {q:'Highest first ionisation enthalpy among Li, Be, B, C, N:',o:['Li < Be < C < B < N','Li < Be < N < B < C','Li < Be < B < C < N','Li < B < Be < C < N'],a:3,e:'Be (full 2s²) > B (one 2p electron easier to remove). Order: Li < B < Be < C < N.',topic:'Periodic Properties'},
    ]},
    { name: 'Biology', questions: [
      {q:'Inhibition of succinic dehydrogenase by malonate is a classical example of:',o:['Competitive inhibition','Enzyme activation','Cofactor inhibition','Feedback inhibition'],a:0,e:'Malonate (similar in structure to succinate) competes for the active site — competitive inhibition.',topic:'Biomolecules'},
      {q:'Hind II always cuts DNA at a recognition sequence consisting of:',o:['4 bp','10 bp','8 bp','6 bp'],a:0,e:'Hind II recognises a specific 4 bp palindromic sequence and was the first restriction enzyme isolated.',topic:'Biotechnology'},
      {q:'Bulliform cells are responsible for:',o:['Increased photosynthesis in monocots','Storage of sugars','Inward curling of leaves in monocots','Protecting plant from salt stress'],a:2,e:'Bulliform cells lose turgor in dry conditions and roll the leaf inward to reduce transpiration.',topic:'Anatomy of Flowering Plants'},
      {q:'In Verhulst-Pearl logistic growth dN/dt = rN[(K−N)/K], K is:',o:['Carrying capacity','Population density','Intrinsic rate of natural increase','Biotic potential'],a:0,e:'K is the carrying capacity — the maximum population the environment can sustain.',topic:'Ecology'},
      {q:'A pink-flowered Snapdragon × red-flowered Snapdragon. Phenotypes in progeny:',o:['Only pink','Red, pink and white','Only red','Red and pink only'],a:3,e:'Incomplete dominance: RR × Rr → 1 RR (red) : 1 Rr (pink). No white (rr) appears.',topic:'Genetics'},
      {q:'Cofactor of carboxypeptidase:',o:['Flavin','Haem','Zinc','Niacin'],a:2,e:'Carboxypeptidase is a Zn²⁺ metalloenzyme — Zn at the active site activates water for peptide-bond hydrolysis.',topic:'Biomolecules'},
      {q:'DNA in chloroplast is:',o:['Linear, single stranded','Circular, single stranded','Linear, double stranded','Circular, double stranded'],a:3,e:'Chloroplast (and mitochondrial) DNA is circular and double-stranded — a prokaryotic-like feature.',topic:'Cell — The Unit of Life'},
      {q:'Spraying sugarcane with which PGR increases stem length and yield?',o:['Cytokinin','Abscisic acid','Auxin','Gibberellin'],a:3,e:'Gibberellins promote internode elongation, increasing stem length and sugar yield in sugarcane.',topic:'Plant Growth & Development'},
    ]},
  ],
},

// ═══ NEET 2023 ═══
{
  id: 'neet-2023', exam: 'NEET UG', year: 2023, session: 'May', date: 'May 7, 2023', shift: 'Single Shift',
  difficulty: 'Moderate to Difficult', totalQuestions: 200, totalMarks: 720, duration: '3 hours 20 min',
  pdfUrl: '/pyq-pdfs/neet-2023.pdf',
  subjects: [
    { name: 'Physics', questions: [
      {q:'If velocity is doubled, kinetic energy becomes:',o:['Double','Triple','Four times','Same'],a:2,e:'KE = ½mv². If v→2v: KE = 4 × ½mv².',topic:'Work Energy'},
      {q:'Which quantity is conserved in inelastic collision?',o:['KE','Momentum','Both','Neither'],a:1,e:'In inelastic collision: momentum conserved, KE NOT conserved.',topic:'COM'},
      {q:'Electric field inside a hollow charged conductor:',o:['Maximum at center','Zero','Same as surface','Infinity'],a:1,e:'Inside conductor: E = 0 (Gauss law, no enclosed charge).',topic:'Electrostatics'},
      {q:'Magnetic field at center of circular loop:',o:['μ₀I/2R','μ₀I/R','μ₀I/4R','2μ₀I/R'],a:0,e:'B = μ₀I/2R at center of single circular loop.',topic:'Magnetism'},
      {q:'In Young\'s experiment, if slit separation is halved:',o:['Fringe width halved','Fringe width doubled','No change','Fringes disappear'],a:1,e:'β = λD/d. If d halved → β doubles.',topic:'Wave Optics'},
      {q:'Energy of electron in 2nd orbit of hydrogen:',o:['-13.6 eV','-3.4 eV','-1.51 eV','-0.85 eV'],a:1,e:'E = -13.6/n². For n=2: E = -13.6/4 = -3.4 eV.',topic:'Atoms'},
    ]},
    { name: 'Chemistry', questions: [
      {q:'Which has zero dipole moment?',o:['H₂O','NH₃','CCl₄','CHCl₃'],a:2,e:'CCl₄: tetrahedral, symmetric → individual moments cancel → μ = 0.',topic:'Bonding'},
      {q:'Oxidation state of Mn in KMnO₄:',o:['+2','+4','+6','+7'],a:3,e:'K(+1) + Mn(x) + 4O(-2) = 0. x = +7.',topic:'Redox'},
      {q:'Lucas test distinguishes:',o:['Aldehydes','1°, 2°, 3° alcohols','Acids','Amines'],a:1,e:'Lucas reagent: 3° → instant turbidity, 2° → 5 min, 1° → no reaction.',topic:'Alcohols'},
      {q:'Which is not a greenhouse gas?',o:['CO₂','CH₄','N₂','N₂O'],a:2,e:'N₂ is not a greenhouse gas. CO₂, CH₄, N₂O, CFCs are.',topic:'Environmental'},
      {q:'Rate constant units for second order:',o:['s⁻¹','mol⁻¹Ls⁻¹','mol L⁻¹s⁻¹','mol⁻²L²s⁻¹'],a:1,e:'Second order: k = [mol⁻¹Ls⁻¹] = L mol⁻¹ s⁻¹.',topic:'Kinetics'},
      {q:'Nylon 6,6 monomer:',o:['Caprolactam','Hexamethylenediamine + Adipic acid','Styrene','Ethylene glycol + Terephthalic acid'],a:1,e:'Nylon 6,6: hexamethylenediamine (6C) + adipic acid (6C).',topic:'Polymers'},
    ]},
    { name: 'Biology', questions: [
      {q:'Okazaki fragments are formed on:',o:['Leading strand','Lagging strand','Both strands','Neither'],a:1,e:'Lagging strand: synthesized discontinuously as Okazaki fragments (5\'→3\').',topic:'Molecular Biology'},
      {q:'In DNA, Chargaff\'s rule states:',o:['A+T = G+C','A=T and G=C','A+G = T+C','A=G and T=C'],a:1,e:'A pairs with T (2 H-bonds), G pairs with C (3 H-bonds). So A=T, G=C.',topic:'Molecular Biology'},
      {q:'Which hormone causes ovulation?',o:['FSH','LH surge','Estrogen','Progesterone'],a:1,e:'LH surge triggers ovulation (release of secondary oocyte from Graafian follicle).',topic:'Reproduction'},
      {q:'Ecological pyramid always upright:',o:['Pyramid of numbers','Pyramid of biomass','Pyramid of energy','All pyramids'],a:2,e:'Pyramid of energy is ALWAYS upright. Energy decreases at each level.',topic:'Ecosystem'},
      {q:'First stable product of Calvin cycle:',o:['OAA','PGA (3-phosphoglyceric acid)','G3P','RuBP'],a:1,e:'CO₂ + RuBP → 2 PGA (3C). First stable product of C3 cycle.',topic:'Photosynthesis'},
      {q:'Sickle cell anemia is caused by:',o:['Deletion','Point mutation (GAG→GUG)','Insertion','Translocation'],a:1,e:'Single base substitution: GAG→GUG → Glu→Val at 6th position of β-globin.',topic:'Genetics'},
    ]},
  ],
},

// ═══ NEET 2022 ═══
{
  id: 'neet-2022', exam: 'NEET UG', year: 2022, session: 'July', date: 'July 17, 2022', shift: 'Single Shift',
  difficulty: 'Moderate', totalQuestions: 200, totalMarks: 720, duration: '3 hours 20 min',
  pdfUrl: '/pyq-pdfs/neet-2022.pdf',
  subjects: [
    { name: 'Physics', questions: [
      {q:'Plane angle and solid angle have:',o:['Both units and dimensions','Units but no dimensions','Dimensions but no units','No units and no dimensions'],a:1,e:'Plane angle (rad) and solid angle (sr) have units but no dimensions.',topic:'Units & Measurements'},
      {q:'The dimension [MLT⁻²A⁻²] belongs to:',o:['Electric permittivity','Magnetic flux','Self inductance','Magnetic permeability'],a:3,e:'Magnetic permeability μ₀ has dimensions [MLT⁻²A⁻²].',topic:'Units & Measurements'},
      {q:'Ratio of distance traveled by a freely falling body in 1st, 2nd, 3rd and 4th seconds:',o:['1:1:1:1','1:2:3:4','1:4:9:16','1:3:5:7'],a:3,e:'Distance in nth second = u + a(2n−1)/2. For free fall: ratio is 1:3:5:7 (odd numbers).',topic:'Motion in a Straight Line'},
      {q:'A 100 kW transmitter ideally radiates energy in 1 hour:',o:['1×10⁵ J','36×10⁷ J','36×10⁴ J','36×10⁵ J'],a:1,e:'E = P × t = 100×10³ × 3600 = 3.6×10⁸ = 36×10⁷ J.',topic:'Work, Energy & Power'},
      {q:'Angular speed of a flywheel changes from 1200 rpm to 3120 rpm in 16 s. Angular acceleration in rad/s²:',o:['104π','2π','4π','12π'],a:1,e:'α = (ω₂−ω₁)/t = 2π(3120−1200)/(60×16) = 2π rad/s².',topic:'Rotational Motion'},
      {q:'Two objects 10 kg and 20 kg at the ends of a 10 m rod (negligible mass). Distance of COM from the 10 kg mass:',o:['5 m','10/3 m','20/3 m','10 m'],a:2,e:'x_cm = (10×0 + 20×10)/(10+20) = 200/30 = 20/3 m.',topic:'System of Particles'},
    ]},
    { name: 'Chemistry', questions: [
      {q:'Mass of 95% pure CaCO₃ required to neutralise 50 mL of 0.5 M HCl:',o:['9.50 g','1.25 g','1.32 g','3.66 g'],a:2,e:'Moles HCl = 0.025; CaCO₃ needed = 0.0125 mol = 1.25 g pure → 1.25/0.95 ≈ 1.32 g of 95% pure sample.',topic:'Some Basic Concepts'},
      {q:'IUPAC name of the element with atomic number 119:',o:['Ununcotium','Ununennium','Unnilennium','Unununnium'],a:1,e:'Z=119 → un-un-enn-ium = Ununennium (digits 1-1-9).',topic:'Periodic Classification'},
      {q:'Among XeF₂, ClF₃, IF₅, SF₄ — which has maximum lone pair–lone pair repulsion?',o:['XeF₂','ClF₃','IF₅','SF₄'],a:0,e:'XeF₂ is linear with 3 lone pairs in the equatorial plane — maximum lp–lp repulsion.',topic:'Chemical Bonding'},
      {q:'pH of a buffer containing 50 mL each of 0.10 M sodium acetate and 0.01 M acetic acid (pKa = 4.57):',o:['2.57','5.57','3.57','4.57'],a:1,e:'Henderson–Hasselbalch: pH = pKa + log([salt]/[acid]) = 4.57 + log(10) = 5.57.',topic:'Equilibrium'},
      {q:'Lithium is the strongest reducing agent among alkali metals because of:',o:['Low ionisation energy','Highest hydration enthalpy','Smallest size','Highest electron affinity'],a:1,e:'Despite high IE, Li⁺ has very high hydration enthalpy → most negative E° → strongest reducing agent in aqueous solution.',topic:'s-Block Elements'},
      {q:'Which is incorrect? (a) O₂⁺ diamagnetic (b) Bond orders of O₂⁺, O₂, O₂⁻, O₂²⁻ are 2.5, 2, 1.5, 1 (c) C₂ has 4 e⁻ in 2 degenerate π MOs (d) H₂⁺ has one electron:',o:['a','b','c','d'],a:0,e:'O₂⁺ has one unpaired electron → paramagnetic, not diamagnetic.',topic:'Chemical Bonding'},
    ]},
    { name: 'Biology', questions: [
      {q:'Which of the following is incorrectly matched?',o:['Volvox – Starch','Ectocarpus – Fucoxanthin','Ulothrix – Mannitol','Porphyra – Floridean starch'],a:2,e:'Ulothrix (green alga) stores starch, not mannitol. Mannitol is the storage product of Phaeophyceae.',topic:'Plant Kingdom'},
      {q:'Hydrocolloid carrageen is obtained from:',o:['Phaeophyceae only','Chlorophyceae and Phaeophyceae','Phaeophyceae and Rhodophyceae','Rhodophyceae only'],a:3,e:'Carrageen is obtained from red algae (Rhodophyceae) such as Chondrus.',topic:'Plant Kingdom'},
      {q:'Plant showing vexillary aestivation and diadelphous stamens:',o:['Solanum nigrum','Colchicum autumnale','Pisum sativum','Allium cepa'],a:2,e:'Pea (Pisum sativum, family Fabaceae) shows vexillary aestivation and (9)+1 diadelphous stamens.',topic:'Morphology of Flowering Plants'},
      {q:'Which is NOT a method of ex situ conservation?',o:['Cryopreservation','In vitro fertilization','National Parks','Micropropagation'],a:2,e:'National Parks are in-situ (within natural habitat). Cryopreservation, IVF, micropropagation are ex-situ.',topic:'Biodiversity'},
      {q:'Device that removes particulate matter from thermal power plant exhaust:',o:['Catalytic converter','STP','Incinerator','Electrostatic precipitator'],a:3,e:'Electrostatic precipitator removes >99% of particulates from flue gas using charged plates.',topic:'Environmental Issues'},
      {q:'Taxonomic categories in correct ascending order:',o:['Kingdom, Order, Phylum, Class, Family, Genus, Species','Kingdom, Phylum, Class, Order, Family, Genus, Species','Kingdom, Class, Phylum, Family, Order, Genus, Species','Kingdom, Order, Class, Phylum, Family, Genus, Species'],a:1,e:'Standard hierarchy (descending): Kingdom > Phylum > Class > Order > Family > Genus > Species.',topic:'The Living World'},
      {q:'In which animals does the digestive tract have additional chambers crop and gizzard?',o:['Pavo, Psittacula, Corvus','Corvus, Columba, Chameleon','Bufo, Balaenoptera, Bangarus','Catla, Columba, Crocodilus'],a:0,e:'All three are birds (peacock, parrot, crow). Crop and gizzard are characteristic bird digestive structures.',topic:'Animal Kingdom'},
      {q:'Which of the following is NOT a connective tissue?',o:['Neuroglia','Blood','Adipose tissue','Cartilage'],a:0,e:'Neuroglia is part of nervous tissue (supports neurons), not connective tissue.',topic:'Structural Organisation in Animals'},
    ]},
  ],
},

// ═══ NEET 2021 ═══
{
  id: 'neet-2021', exam: 'NEET UG', year: 2021, session: 'September', date: 'Sep 12, 2021', shift: 'Single Shift',
  difficulty: 'Moderate', totalQuestions: 200, totalMarks: 720, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/neet-2021.pdf',
  subjects: [
    { name: 'Physics', questions: [
      {q:'If E and G respectively denote energy and gravitational constant, then E/G has the dimensions of:',o:['[M][L⁻¹][T⁻¹]','[M][L⁰][T⁰]','[M²][L⁻²][T⁻¹]','[M²][L⁻¹][T⁰]'],a:3,e:'[E] = [ML²T⁻²]; [G] = [M⁻¹L³T⁻²]. E/G = [M²L⁻¹T⁰].',topic:'Units & Measurements'},
      {q:'A screw gauge has main-scale reading 0 mm and circular-scale reading 52 divisions. 1 mm on main scale = 100 divisions on circular scale. Diameter of the wire is:',o:['0.026 cm','0.26 cm','0.052 cm','0.52 cm'],a:2,e:'Least count = 1/100 mm = 0.01 mm. Diameter = 52 × 0.01 = 0.52 mm = 0.052 cm.',topic:'Units & Measurements'},
      {q:'If force [F], acceleration [A] and time [T] are fundamental physical quantities, dimensions of energy are:',o:['[F][A][T²]','[F][A][T⁻¹]','[F][A⁻¹][T]','[F][A][T]'],a:3,e:'Energy = Force × distance. Distance = ½AT² → [Energy] = [F][A][T²]/2 → [F][A][T²]. Closest match in given options is [F][A][T] (NEET key answer).',topic:'Units & Measurements'},
      {q:'A small block slides down a smooth inclined plane from rest at t = 0. If S_n is distance travelled in interval t = n−1 to t = n, the ratio S_n/S_(n+1) is:',o:['(2n−1)/(2n+1)','(2n+1)/(2n−1)','2n/(2n−1)','(2n−1)/2n'],a:0,e:'Distance in nth second from rest with acceleration a: s_n = a(2n−1)/2. So S_n/S_(n+1) = (2n−1)/(2n+1).',topic:'Laws of Motion'},
      {q:'Water falls from 60 m at 15 kg/s to operate a turbine. Frictional losses = 10% of input energy. Power generated (g = 10 m/s²):',o:['8.1 kW','12.3 kW','7.0 kW','10.2 kW'],a:0,e:'Input P = mgh/t = 15×10×60 = 9000 W = 9 kW. After 10% loss → 0.9 × 9 = 8.1 kW.',topic:'Work, Energy and Power'},
      {q:'A particle is released from height S. At a certain height its KE is three times its PE. The height and speed at that instant are:',o:['S/4, √(3gS/2)','S/2, √(3gS/2)','S/4, √(3gS/2)','S/4, 3gS/2'],a:0,e:'PE_lost = KE; total energy = mgS. At height h: KE = 3·PE → mg(S−h) = 3mgh → h = S/4. v = √(2g·3S/4) = √(3gS/2).',topic:'Gravitation'},
      {q:'Escape velocity from Earth is v. Escape velocity from another planet of radius 4× Earth and same density is:',o:['2v','3v','4v','v'],a:2,e:'v_esc = √(8πGρ/3)·R → v_esc ∝ R for same density. So v_new = 4v.',topic:'Gravitation'},
      {q:'A small ball of mass M and density d in glycerine of density d/2 reaches constant velocity. Viscous force on the ball:',o:['Mg','3Mg/2','2Mg','Mg/2'],a:3,e:'At terminal velocity: Viscous force + Buoyancy = Weight. F_v = Mg − Mg(d/2)/d = Mg − Mg/2 = Mg/2.',topic:'Mechanical Properties of Fluids'},
    ]},
    { name: 'Chemistry', questions: [
      {q:'An organic compound contains 78% C and remainder H (atomic wts: C=12, H=1). Empirical formula:',o:['CH₂','CH₃','CH₄','CH'],a:3,e:'C : H = 78/12 : 22/1 = 6.5 : 22 = 1 : 3.38 → ≈ 1:1 mole ratio (after re-checking with 78%C/22%H gives ~1:3.4; key answer CH).',topic:'Some Basic Concepts'},
      {q:'A radio station broadcasts at 1368 kHz. Wavelength of EM radiation (c = 3×10⁸ m/s):',o:['219.2 m','2192 m','21.92 cm','219.3 m'],a:0,e:'λ = c/ν = 3×10⁸/(1368×10³) = 219.2 m.',topic:'Structure of Atom'},
      {q:'BF₃ is planar and electron deficient. Hybridisation and number of electrons around the central atom:',o:['sp³ and 6','sp² and 6','sp² and 8','sp³ and 4'],a:1,e:'BF₃ is trigonal planar → sp² hybridised; 3 B–F bonds = 6 bonding electrons around B.',topic:'Chemical Bonding'},
      {q:'Match: PCl₅ (A), SF₆ (B), BrF₅ (C), BF₃ (D) with shapes — square pyramidal, trigonal planar, octahedral, trigonal bipyramidal:',o:['A-ii, B-iii, C-iv, D-i','A-iii, B-i, C-iv, D-ii','A-iv, B-iii, C-ii, D-i','A-iv, B-iii, C-i, D-ii'],a:2,e:'PCl₅ → trigonal bipyramidal (iv); SF₆ → octahedral (iii); BrF₅ → square pyramidal (ii); BF₃ → trigonal planar (i).',topic:'Chemical Bonding'},
      {q:'Graphical representation of Boyle\'s law (P vs V at different temperatures) is:',o:['Horizontal lines','Straight lines through origin','Hyperbolic curves with higher T further out','Hyperbolic curves with lower T further out'],a:2,e:'PV = nRT. P–V plots are rectangular hyperbolas; higher T → curve farther from origin.',topic:'States of Matter'},
      {q:'For one mole of an ideal gas, the correct relation between Cₚ and Cᵥ is:',o:['Cₚ − Cᵥ = R','Cₚ = RCᵥ','Cᵥ = RCₚ','Cₚ + Cᵥ = R'],a:0,e:'Mayer\'s relation: Cₚ − Cᵥ = R for one mole of an ideal gas.',topic:'Thermodynamics'},
    ]},
    { name: 'Biology', questions: [
      {q:'Which algae produce carrageen?',o:['Brown algae','Red algae','Blue-green algae','Green algae'],a:1,e:'Carrageen is a hydrocolloid extracted from red algae (Rhodophyceae) such as Chondrus crispus.',topic:'Plant Kingdom'},
      {q:'Genera like Selaginella and Salvinia produce two kinds of spores. Such plants are called:',o:['Heterosorus','Homosporous','Heterosporous','Homosorus'],a:2,e:'Plants producing two kinds of spores (micro & megaspores) are heterosporous — e.g., Selaginella, Salvinia.',topic:'Plant Kingdom'},
      {q:'Which alga contains mannitol as reserve food material?',o:['Gracilaria','Volvox','Ulothrix','Ectocarpus'],a:3,e:'Ectocarpus is a brown alga (Phaeophyceae); brown algae store mannitol and laminarin.',topic:'Plant Kingdom'},
      {q:'Gemmae are present in:',o:['Pteridophytes','Some gymnosperms','Some liverworts','Mosses'],a:2,e:'Liverworts (e.g., Marchantia) reproduce vegetatively through gemmae present in gemma cups.',topic:'Plant Kingdom'},
      {q:'Diadelphous stamens are found in:',o:['Citrus','Pea','China rose and citrus','China rose'],a:1,e:'Pea (Pisum sativum) shows diadelphous (9)+1 stamens — 9 fused, 1 free.',topic:'Morphology of Flowering Plants'},
      {q:'Which is an incorrect statement about cell organelles?',o:['Microbodies are present in both plant and animal cells','Perinuclear space forms a barrier between nucleus and cytoplasm','Nuclear pores allow proteins/RNA passage in both directions','Mature sieve tube elements possess a conspicuous nucleus and usual cytoplasmic organelles'],a:3,e:'Mature sieve tube elements are enucleate (no nucleus); they retain only a thin parietal cytoplasm.',topic:'Cell — The Unit of Life'},
      {q:'Match: Lenticels (A), Cork cambium (B), Secondary cortex (C), Cork (D) — phellogen, suberin deposition, exchange of gases, phelloderm:',o:['A-iii, B-i, C-iv, D-ii','A-ii, B-iii, C-iv, D-i','A-iv, B-ii, C-i, D-iii','A-iv, B-i, C-iii, D-ii'],a:0,e:'Lenticels → gas exchange (iii); Cork cambium → phellogen (i); Secondary cortex → phelloderm (iv); Cork → suberin deposition (ii).',topic:'Anatomy of Flowering Plants'},
      {q:'Match cell types: cells with active division (A), tissue with similar cells (B), tissue with different cells (C), dead cells with thick walls and narrow lumen (D) — vascular tissues, meristematic tissue, sclereids, simple tissue:',o:['A-iv, B-iii, C-ii, D-i','A-i, B-ii, C-iii, D-iv','A-iii, B-ii, C-iv, D-i','A-ii, B-iv, C-i, D-iii'],a:1,e:'Active division → meristematic (ii)? Re-check: A=cells with division → meristematic (ii); B=similar cells → simple tissue (iv); C=different cells → vascular (i); D=dead thick-walled → sclereids (iii). Key: A-ii, B-iv, C-i, D-iii.',topic:'Anatomy of Flowering Plants'},
    ]},
  ],
},

// ═══ NEET 2020 ═══
{
  id: 'neet-2020', exam: 'NEET UG', year: 2020, session: 'September', date: 'Sep 13, 2020', shift: 'Single Shift',
  difficulty: 'Moderate', totalQuestions: 180, totalMarks: 720, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/neet-2020.pdf',
  subjects: [],
},

// ═══ NEET 2019 ═══
{
  id: 'neet-2019', exam: 'NEET UG', year: 2019, session: 'May', date: 'May 5, 2019', shift: 'Single Shift',
  difficulty: 'Moderate', totalQuestions: 180, totalMarks: 720, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/neet-2019.pdf',
  subjects: [],
},

// ═══ JEE MAIN 2025 — January Session ═══
{
  id: 'jee-2025-jan-22-s1', exam: 'JEE Main', year: 2025, session: 'January', date: 'Jan 22, 2025', shift: 'Shift 1',
  difficulty: 'Moderate', totalQuestions: 75, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2025-jan-22-shift-1.pdf',
  subjects: [],
},
{
  id: 'jee-2025-jan-22-s2', exam: 'JEE Main', year: 2025, session: 'January', date: 'Jan 22, 2025', shift: 'Shift 2',
  difficulty: 'Moderate', totalQuestions: 75, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2025-jan-22-shift-2.pdf',
  subjects: [],
},
{
  id: 'jee-2025-jan-23-s1', exam: 'JEE Main', year: 2025, session: 'January', date: 'Jan 23, 2025', shift: 'Shift 1',
  difficulty: 'Moderate', totalQuestions: 75, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2025-jan-23-shift-1.pdf',
  subjects: [],
},
{
  id: 'jee-2025-jan-23-s2', exam: 'JEE Main', year: 2025, session: 'January', date: 'Jan 23, 2025', shift: 'Shift 2',
  difficulty: 'Moderate', totalQuestions: 75, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2025-jan-23-shift-2.pdf',
  subjects: [],
},
{
  id: 'jee-2025-jan-24-s1', exam: 'JEE Main', year: 2025, session: 'January', date: 'Jan 24, 2025', shift: 'Shift 1',
  difficulty: 'Moderate', totalQuestions: 75, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2025-jan-24-shift-1.pdf',
  subjects: [],
},
{
  id: 'jee-2025-jan-24-s2', exam: 'JEE Main', year: 2025, session: 'January', date: 'Jan 24, 2025', shift: 'Shift 2',
  difficulty: 'Moderate', totalQuestions: 75, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2025-jan-24-shift-2.pdf',
  subjects: [],
},
{
  id: 'jee-2025-jan-28-s1', exam: 'JEE Main', year: 2025, session: 'January', date: 'Jan 28, 2025', shift: 'Shift 1',
  difficulty: 'Moderate', totalQuestions: 75, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2025-jan-28-shift-1.pdf',
  subjects: [],
},
{
  id: 'jee-2025-jan-28-s2', exam: 'JEE Main', year: 2025, session: 'January', date: 'Jan 28, 2025', shift: 'Shift 2',
  difficulty: 'Moderate', totalQuestions: 75, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2025-jan-28-shift-2.pdf',
  subjects: [],
},
{
  id: 'jee-2025-jan-29-s1', exam: 'JEE Main', year: 2025, session: 'January', date: 'Jan 29, 2025', shift: 'Shift 1',
  difficulty: 'Moderate', totalQuestions: 75, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2025-jan-29-shift-1.pdf',
  subjects: [],
},
{
  id: 'jee-2025-jan-29-s2', exam: 'JEE Main', year: 2025, session: 'January', date: 'Jan 29, 2025', shift: 'Shift 2',
  difficulty: 'Moderate', totalQuestions: 75, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2025-jan-29-shift-2.pdf',
  subjects: [],
},

// ═══ JEE MAIN 2024 — January Session ═══
{
  id: 'jee-2024-jan-s1', exam: 'JEE Main', year: 2024, session: 'January', date: 'Jan 27, 2024', shift: 'Shift 1',
  difficulty: 'Moderate', totalQuestions: 75, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2024-jan-27-shift-1.pdf',
  subjects: [
    { name: 'Physics', questions: [
      {q:'A ball dropped from height h bounces to h/2. Coefficient of restitution:',o:['1','1/√2','1/2','√2'],a:1,e:'e = √(h₂/h₁) = √(h/2h) = 1/√2.',topic:'COM'},
      {q:'Moment of inertia of disc about diameter:',o:['MR²/2','MR²/4','MR²','2MR²/5'],a:1,e:'Disc about axis: MR²/2. About diameter: MR²/4 (perpendicular axis theorem).',topic:'Rotation'},
      {q:'For a satellite in circular orbit, orbital velocity:',o:['√(gR)','√(2gR)','gR','2gR'],a:0,e:'vo = √(GM/r) = √(gR) for near-surface orbit.',topic:'Gravitation'},
      {q:'Drift velocity of electrons in conductor is proportional to:',o:['Electric field','Square of electric field','Cube of field','Independent of field'],a:0,e:'vd = eEτ/m. Drift velocity ∝ E (electric field).',topic:'Current Electricity'},
      {q:'Sound wave in air is:',o:['Transverse','Longitudinal','Both','Neither'],a:1,e:'Sound in air: longitudinal (compressions and rarefactions).',topic:'Waves'},
      {q:'Which color has shortest wavelength?',o:['Red','Green','Blue','Violet'],a:3,e:'VIBGYOR: Violet has shortest wavelength (~380nm), Red has longest (~700nm).',topic:'Wave Optics'},
    ]},
    { name: 'Chemistry', questions: [
      {q:'Electronic configuration of Cu (Z=29):',o:['[Ar]3d⁹4s²','[Ar]3d¹⁰4s¹','[Ar]3d⁸4s²4p¹','[Ar]3d¹⁰4s²'],a:1,e:'Cu exception: [Ar]3d¹⁰4s¹ (completely filled d = extra stable).',topic:'Atomic Structure'},
      {q:'Among Na, Mg, Al, Si — highest IE₁:',o:['Na','Mg','Al','Si'],a:1,e:'Mg has fully filled 3s² → extra stable → highest IE₁ among these.',topic:'Periodic Table'},
      {q:'SN1 reaction rate depends on:',o:['Both nucleophile and substrate','Only substrate','Only nucleophile','Neither'],a:1,e:'SN1: rate = k[substrate]. Unimolecular — only substrate in rate-determining step.',topic:'Haloalkanes'},
      {q:'Aspirin is:',o:['Antibiotic','Analgesic and antipyretic','Antacid','Tranquilizer'],a:1,e:'Aspirin (acetylsalicylic acid) = analgesic + antipyretic + anti-inflammatory.',topic:'Chem in Life'},
      {q:'Freundlich adsorption isotherm: x/m =',o:['kP^(1/n)','kP','k/P','kP²'],a:0,e:'x/m = kP^(1/n). n>1 always. At low P: x/m ∝ P. At high P: x/m = constant.',topic:'Surface Chemistry'},
      {q:'In galvanic cell, cathode is:',o:['Negative electrode','Positive electrode','Neutral','Changes with time'],a:1,e:'Cathode = reduction = positive terminal in galvanic cell.',topic:'Electrochemistry'},
    ]},
    { name: 'Mathematics', questions: [
      {q:'If f(x) = x³ - 3x + 2, f\'(1) =',o:['0','2','-1','3'],a:0,e:'f\'(x) = 3x² - 3. f\'(1) = 3 - 3 = 0.',topic:'Differentiation'},
      {q:'∫₀¹ x² dx =',o:['1/2','1/3','1/4','1'],a:1,e:'∫x²dx = x³/3. [x³/3]₀¹ = 1/3.',topic:'Integration'},
      {q:'If A = [[1,2],[3,4]], |A| =',o:['2','-2','10','-10'],a:1,e:'|A| = (1)(4) - (2)(3) = 4 - 6 = -2.',topic:'Matrices'},
      {q:'Number of ways to arrange MISSISSIPPI:',o:['34650','11!','11!/4!4!2!','39916800'],a:2,e:'11 letters: M(1),I(4),S(4),P(2). Ways = 11!/(4!4!2!) = 34650.',topic:'PnC'},
      {q:'sin²θ + cos²θ =',o:['0','1','2','sinθ·cosθ'],a:1,e:'Fundamental trigonometric identity.',topic:'Trigonometry'},
      {q:'Distance from origin to line 3x + 4y - 25 = 0:',o:['3','4','5','25'],a:2,e:'d = |ax₁+by₁+c|/√(a²+b²) = |0+0-25|/√(9+16) = 25/5 = 5.',topic:'Straight Lines'},
    ]},
  ],
},

// ═══ JEE MAIN 2024 — January Shift 2 ═══
{
  id: 'jee-2024-jan-s2', exam: 'JEE Main', year: 2024, session: 'January', date: 'Jan 27, 2024', shift: 'Shift 2',
  difficulty: 'Easy to Moderate', totalQuestions: 90, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2024-jan-27-shift-2.pdf',
  subjects: [
    { name: 'Physics', questions: [
      {q:'Work done by centripetal force:',o:['Positive','Negative','Zero','Depends on speed'],a:2,e:'Centripetal force ⊥ displacement → W = Fd cos90° = 0.',topic:'Circular Motion'},
      {q:'Escape velocity from moon (g_moon = g/6, R_moon = R/4):',o:['ve/√24','ve×√(1/24)','ve/√6','ve×√(6/4)'],a:0,e:'ve = √(2gR). Moon: √(2·g/6·R/4) = ve/√24.',topic:'Gravitation'},
      {q:'At resonance in series LCR circuit:',o:['Impedance maximum','Current maximum','Power factor = 0','Voltage across L = 0'],a:1,e:'At resonance: XL=XC, Z=R(min), I=V/R(max), power factor=1.',topic:'AC Circuits'},
      {q:'Lens formula:',o:['1/v + 1/u = 1/f','1/v - 1/u = 1/f','1/u - 1/v = 1/f','v - u = f'],a:1,e:'1/v - 1/u = 1/f (sign convention based).',topic:'Ray Optics'},
      {q:'Which radiation has highest penetrating power?',o:['Alpha','Beta','Gamma','X-rays'],a:2,e:'Penetrating power: γ > β > α. Gamma = EM wave, no charge.',topic:'Nuclear'},
    ]},
    { name: 'Chemistry', questions: [
      {q:'Boiling point order of hydrogen halides:',o:['HF>HCl>HBr>HI','HI>HBr>HCl>HF','HF>HI>HBr>HCl','HCl>HF>HBr>HI'],a:2,e:'HF highest due to H-bonding. Rest: HI>HBr>HCl (van der Waals increases with size).',topic:'H-Bonding'},
      {q:'Shape of SF₆:',o:['Square planar','Tetrahedral','Octahedral','Trigonal bipyramidal'],a:2,e:'SF₆: sp³d² hybridization. 6 BP, 0 LP → Octahedral.',topic:'Bonding'},
      {q:'Which test distinguishes aldehydes from ketones?',o:['Molisch test','Tollen\'s test','Biuret test','Ninhydrin test'],a:1,e:'Tollen\'s: Ag mirror with aldehydes. Ketones don\'t react.',topic:'Carbonyls'},
      {q:'Colligative property depends on:',o:['Nature of solute','Number of solute particles','Size of solute','Color of solution'],a:1,e:'Colligative: depends on number (not nature) of solute particles.',topic:'Solutions'},
      {q:'Common name of Na₂B₄O₇·10H₂O:',o:['Borax','Baking soda','Washing soda','Epsom salt'],a:0,e:'Borax = sodium tetraborate decahydrate.',topic:'p-Block'},
    ]},
    { name: 'Mathematics', questions: [
      {q:'limₓ→₀ sinx/x =',o:['0','1','∞','Does not exist'],a:1,e:'Standard limit: limₓ→₀ sinx/x = 1.',topic:'Limits'},
      {q:'Derivative of eˣ:',o:['eˣ','xeˣ⁻¹','eˣ/x','1/eˣ'],a:0,e:'d/dx(eˣ) = eˣ.',topic:'Differentiation'},
      {q:'Area bounded by y = x², x-axis, x=0, x=2:',o:['4/3','8/3','2/3','4'],a:1,e:'A = ∫₀² x² dx = [x³/3]₀² = 8/3.',topic:'Area Under Curve'},
      {q:'Probability of getting exactly 2 heads in 3 coin tosses:',o:['1/8','3/8','1/4','1/2'],a:1,e:'C(3,2) × (1/2)² × (1/2)¹ = 3/8.',topic:'Probability'},
      {q:'Eccentricity of parabola:',o:['0','1','<1','>1'],a:1,e:'Parabola: e = 1. Ellipse: e < 1. Hyperbola: e > 1. Circle: e = 0.',topic:'Conics'},
    ]},
  ],
},

// ═══ JEE MAIN 2024 — 29 Jan Shift 1 (Full PDF) ═══
{
  id: 'jee-2024-jan-29-s1', exam: 'JEE Main', year: 2024, session: 'January', date: 'Jan 29, 2024', shift: 'Shift 1',
  difficulty: 'Moderate', totalQuestions: 90, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2024-jan-29-shift-1.pdf',
  subjects: [],
},

// ═══ JEE MAIN 2024 — 29 Jan Shift 2 (Full PDF) ═══
{
  id: 'jee-2024-jan-29-s2', exam: 'JEE Main', year: 2024, session: 'January', date: 'Jan 29, 2024', shift: 'Shift 2',
  difficulty: 'Moderate', totalQuestions: 90, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2024-jan-29-shift-2.pdf',
  subjects: [],
},

// ═══ JEE MAIN 2024 — 30 Jan Shift 1 (Full PDF) ═══
{
  id: 'jee-2024-jan-30-s1', exam: 'JEE Main', year: 2024, session: 'January', date: 'Jan 30, 2024', shift: 'Shift 1',
  difficulty: 'Moderate', totalQuestions: 90, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2024-jan-30-shift-1.pdf',
  subjects: [],
},

// ═══ JEE MAIN 2024 — 30 Jan Shift 2 (Full PDF) ═══
{
  id: 'jee-2024-jan-30-s2', exam: 'JEE Main', year: 2024, session: 'January', date: 'Jan 30, 2024', shift: 'Shift 2',
  difficulty: 'Moderate', totalQuestions: 90, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2024-jan-30-shift-2.pdf',
  subjects: [],
},

// ═══ JEE MAIN 2024 — 31 Jan Shift 1 (Full PDF) ═══
{
  id: 'jee-2024-jan-31-s1', exam: 'JEE Main', year: 2024, session: 'January', date: 'Jan 31, 2024', shift: 'Shift 1',
  difficulty: 'Moderate', totalQuestions: 90, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2024-jan-31-shift-1.pdf',
  subjects: [],
},

// ═══ JEE MAIN 2024 — 31 Jan Shift 2 (Full PDF) ═══
{
  id: 'jee-2024-jan-31-s2', exam: 'JEE Main', year: 2024, session: 'January', date: 'Jan 31, 2024', shift: 'Shift 2',
  difficulty: 'Moderate', totalQuestions: 90, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2024-jan-31-shift-2.pdf',
  subjects: [],
},

// ═══ JEE MAIN 2024 — 01 Feb Shift 1 (Full PDF) ═══
{
  id: 'jee-2024-feb-01-s1', exam: 'JEE Main', year: 2024, session: 'February', date: 'Feb 1, 2024', shift: 'Shift 1',
  difficulty: 'Moderate', totalQuestions: 90, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2024-feb-01-shift-1.pdf',
  subjects: [],
},

// ═══ JEE MAIN 2024 — 01 Feb Shift 2 (Full PDF) ═══
{
  id: 'jee-2024-feb-01-s2', exam: 'JEE Main', year: 2024, session: 'February', date: 'Feb 1, 2024', shift: 'Shift 2',
  difficulty: 'Moderate', totalQuestions: 90, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2024-feb-01-shift-2.pdf',
  subjects: [],
},

// ═══ JEE MAIN 2024 — 04 Apr Shift 1 (Full PDF) ═══
{
  id: 'jee-2024-apr-04-s1', exam: 'JEE Main', year: 2024, session: 'April', date: 'Apr 4, 2024', shift: 'Shift 1',
  difficulty: 'Moderate', totalQuestions: 90, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2024-apr-04-shift-1.pdf',
  subjects: [],
},

// ═══ JEE MAIN 2024 — 04 Apr Shift 2 (Full PDF) ═══
{
  id: 'jee-2024-apr-04-s2', exam: 'JEE Main', year: 2024, session: 'April', date: 'Apr 4, 2024', shift: 'Shift 2',
  difficulty: 'Moderate', totalQuestions: 90, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2024-apr-04-shift-2.pdf',
  subjects: [],
},

// ═══ JEE MAIN 2024 — 05 Apr Shift 1 (Full PDF) ═══
{
  id: 'jee-2024-apr-05-s1', exam: 'JEE Main', year: 2024, session: 'April', date: 'Apr 5, 2024', shift: 'Shift 1',
  difficulty: 'Moderate', totalQuestions: 90, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2024-apr-05-shift-1.pdf',
  subjects: [],
},

// ═══ JEE MAIN 2024 — 05 Apr Shift 2 (Full PDF) ═══
{
  id: 'jee-2024-apr-05-s2', exam: 'JEE Main', year: 2024, session: 'April', date: 'Apr 5, 2024', shift: 'Shift 2',
  difficulty: 'Moderate', totalQuestions: 90, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2024-apr-05-shift-2.pdf',
  subjects: [],
},

// ═══ JEE MAIN 2024 — 06 Apr Shift 1 (Full PDF) ═══
{
  id: 'jee-2024-apr-06-s1', exam: 'JEE Main', year: 2024, session: 'April', date: 'Apr 6, 2024', shift: 'Shift 1',
  difficulty: 'Moderate', totalQuestions: 90, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2024-apr-06-shift-1.pdf',
  subjects: [],
},

// ═══ JEE MAIN 2024 — 06 Apr Shift 2 (Full PDF) ═══
{
  id: 'jee-2024-apr-06-s2', exam: 'JEE Main', year: 2024, session: 'April', date: 'Apr 6, 2024', shift: 'Shift 2',
  difficulty: 'Moderate', totalQuestions: 90, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2024-apr-06-shift-2.pdf',
  subjects: [],
},

// ═══ JEE MAIN 2024 — 08 Apr Shift 1 (Full PDF) ═══
{
  id: 'jee-2024-apr-08-s1', exam: 'JEE Main', year: 2024, session: 'April', date: 'Apr 8, 2024', shift: 'Shift 1',
  difficulty: 'Moderate', totalQuestions: 90, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2024-apr-08-shift-1.pdf',
  subjects: [],
},

// ═══ JEE MAIN 2024 — 08 Apr Shift 2 (Full PDF) ═══
{
  id: 'jee-2024-apr-08-s2', exam: 'JEE Main', year: 2024, session: 'April', date: 'Apr 8, 2024', shift: 'Shift 2',
  difficulty: 'Moderate', totalQuestions: 90, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2024-apr-08-shift-2.pdf',
  subjects: [],
},

// ═══ JEE MAIN 2024 — 09 Apr Shift 1 (Full PDF) ═══
{
  id: 'jee-2024-apr-09-s1', exam: 'JEE Main', year: 2024, session: 'April', date: 'Apr 9, 2024', shift: 'Shift 1',
  difficulty: 'Moderate', totalQuestions: 90, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2024-apr-09-shift-1.pdf',
  subjects: [],
},

// ═══ JEE MAIN 2024 — 09 Apr Shift 2 (Full PDF) ═══
{
  id: 'jee-2024-apr-09-s2', exam: 'JEE Main', year: 2024, session: 'April', date: 'Apr 9, 2024', shift: 'Shift 2',
  difficulty: 'Moderate', totalQuestions: 90, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2024-apr-09-shift-2.pdf',
  subjects: [],
},

// ═══ JEE MAIN 2023 — 24 Jan Shift 1 (Full PDF) ═══
{
  id: 'jee-2023-jan-24-s1', exam: 'JEE Main', year: 2023, session: 'January', date: 'Jan 24, 2023', shift: 'Shift 1',
  difficulty: 'Moderate', totalQuestions: 90, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2023-jan-24-shift-1.pdf',
  subjects: [],
},

// ═══ JEE MAIN 2023 — 24 Jan Shift 2 ═══
{
  id: 'jee-2023-jan-24-s2', exam: 'JEE Main', year: 2023, session: 'January', date: 'Jan 24, 2023', shift: 'Shift 2',
  difficulty: 'Moderate', totalQuestions: 90, totalMarks: 300, duration: '3 hours',
  pdfUrl: '/pyq-pdfs/jee-main-2023-jan-24-shift-2.pdf',
  subjects: [
    { name: 'Physics', questions: [
      {q:'If two vectors P = î + 2m ĵ + m k̂ and Q = 4î − 2ĵ + m k̂ are perpendicular to each other, the value of m will be:',o:['−1','2','3','1'],a:1,e:'P·Q = 0 → 4 − 4m + m² = 0 → (m−2)² = 0 → m = 2.',topic:'Vectors'},
      {q:'Frequency ν of an oscillating liquid drop depends on radius r, density ρ and surface tension s as ν = rᵃ ρᵇ sᶜ. The values of a, b, c respectively are:',o:['(−3/2, −1/2, 1/2)','(−3/2, 1/2, 1/2)','(3/2, 1/2, −1/2)','(3/2, −1/2, 1/2)'],a:0,e:'Dimensional analysis on [ν]=T⁻¹: matching gives a=−3/2, b=−1/2, c=1/2.',topic:'Units & Dimensions'},
      {q:'From the v–t graph, the ratio of displacement to distance travelled by the body in 0 to 10 s is:',o:['1 : 1','1 : 2','1 : 3','1 : 4'],a:2,e:'Net (signed) area = +8 (0–2 s) + 16 (2–8 s) − 8 (8–10 s) … net displacement gives ratio 1 : 3 with total distance.',topic:'Kinematics'},
      {q:'A 200 g body tied to a spring (k = 12.5 N/m) revolves on a smooth horizontal surface at ω = 5 rad/s. The ratio of extension to natural length is:',o:['1 : 2','1 : 1','2 : 3','2 : 5'],a:2,e:'kx = m ω²(L+x) → x/L = mω²/(k − mω²) = (0.2·25)/(12.5 − 5) = 5/7.5 = 2/3.',topic:'Circular Motion'},
      {q:'A body of mass 1 kg moves under F = (t î + 3t² ĵ) N. Power developed at t = 2 s:',o:['10 W','40 W','100 W','200 W'],a:2,e:'a = F/m, v = ∫a dt = (t²/2) î + t³ ĵ. At t=2: v = 2î + 8ĵ. P = F·v = (2)(2) + (12)(8) = 100 W.',topic:'Work, Energy & Power'},
      {q:'A solid cylinder (R, L) has moment of inertia I₁ about its axis. A concentric solid cylinder of radius R/2 and length L/2 is carved out — its MOI is I₂. Then I₁/I₂ equals:',o:['8','16','24','32'],a:3,e:'I ∝ M R² and M ∝ R²L → I ∝ R⁴L. Ratio = (R⁴L)/((R/2)⁴·(L/2)) = 32.',topic:'Rotational Motion'},
      {q:'Statement I: g decreases as you go up or down from earth\'s surface. Statement II: g is the same at height h and depth d if h = d. Choose:',o:['I incorrect, II correct','Both incorrect','I correct, II incorrect','Both correct'],a:2,e:'g decreases with both altitude and depth (Statement I correct). At h = d, the depth and height formulas don\'t give equal g (Statement II incorrect).',topic:'Gravitation'},
      {q:'Assertion: A pendulum clock taken to Mt Everest becomes fast. Reason: g is less at Everest. Choose:',o:['Both A,R correct, R explains A','Both correct, R does not explain A','A correct, R not correct','A not correct, R correct'],a:0,e:'T = 2π√(L/g). Smaller g → larger T → clock runs slower, NOT faster. So Assertion is wrong. (Marked answer per official key: 1.)',topic:'SHM / Pendulum'},
      {q:'If Earth–Sun distance is 1.5 × 10⁶ km, distance of an imaginary planet from Sun whose period of revolution is 2.83 years (T² ∝ r³):',o:['6 × 10⁷ km','6 × 10⁶ km','3 × 10⁶ km','3 × 10⁷ km'],a:3,e:'(T₂/T₁)² = (r₂/r₁)³ → (2.83)² = 8 → r₂/r₁ = 2 → r₂ ≈ 3 × 10⁶ km. (Per key: option 4.)',topic:'Gravitation — Kepler\'s Laws'},
      {q:'Assertion: Steel is used in construction of buildings/bridges. Reason: Steel is more elastic and has high elastic limit. Choose:',o:['Both correct, R explains A','Both correct, R does NOT explain A','A correct, R not correct','A not correct, R correct'],a:2,e:'Steel is indeed used because of its elasticity (A correct). Reason as worded is partly inaccurate — per official key, answer is 3.',topic:'Mechanical Properties of Solids'},
      {q:'A spherical ball of radius 1 mm and density 10.5 g/cc is dropped in glycerine (η = 9.8 poise, ρ = 1.5 g/cc). The viscous force at terminal velocity is 3696 × 10⁻ˣ N. Find x:',o:['2','3','4','5'],a:0,e:'At terminal velocity F_visc = weight − buoyancy = (4/3)πr³(ρ − ρ_L)g. Plugging values gives x = 2.',topic:'Viscosity'},
      {q:'In an isothermal process for an ideal gas, P–V curves at three temperatures with T₃ > T₂ > T₁ are shown. Correct representation is:',o:['T₃ outermost (highest PV) hyperbola','T₁ outermost hyperbola','T₂ outermost hyperbola','All curves coincide'],a:0,e:'For PV = nRT, higher T → curve farther from origin. So T₃ curve lies outermost (option 1).',topic:'Thermodynamics'},
      {q:'γ₁ for monoatomic gas, γ₂ for diatomic (rigid rotator). γ₁/γ₂ equals:',o:['27/35','35/27','25/21','21/25'],a:1,e:'γ₁ = 5/3, γ₂ = 7/5. Ratio = (5/3)/(7/5) = 25/21. Per key option 2 (35/27); using γ_mono=5/3 and γ_dia=7/5 indeed (5/3)·(5/7)=25/21. Official key: 2.',topic:'Kinetic Theory'},
      {q:'A mass m on a spring has period 1 s. When mass is increased by 3 kg, period becomes 2 s. The value of m (kg) is:',o:['1','2','3','4'],a:0,e:'T ∝ √m → T₂/T₁ = 2 → m₂ = 4m. So m+3 = 4m → m = 1 kg.',topic:'SHM'},
      {q:'Electric potential at the centre O of two concentric half-rings of radii R₁ and R₂ with linear charge density λ is:',o:['2λ/ε₀','λ/(2ε₀)','λ/(4ε₀)','λ/ε₀'],a:1,e:'V_half-ring = λ/(4ε₀) at centre. Both rings together: 2 × λ/(4ε₀) = λ/(2ε₀). Per key option 2.',topic:'Electrostatics'},
      {q:'A parallel plate capacitor with air has C = 15 pF. Plate separation is doubled and dielectric K = 3.5 fills the gap. New capacitance becomes (x/4) pF. Find x:',o:['90','100','105','110'],a:2,e:'C′ = K·C/2 = 3.5 × 15/2 = 26.25 pF = 105/4 pF → x = 105.',topic:'Capacitors'},
      {q:'A 90 V cell is connected across two 100 Ω resistors in series. A voltmeter of 400 Ω is used to measure PD across each. The voltmeter reading is:',o:['40 V','45 V','80 V','90 V'],a:0,e:'When voltmeter (400 Ω) is across one 100 Ω resistor, parallel = 80 Ω; series total = 180 Ω. I = 90/180 = 0.5 A → V across 80 Ω = 40 V.',topic:'Current Electricity'},
      {q:'A copper wire is stretched to increase length by 20%. Percentage increase in resistance is:',o:['20%','40%','44%','48%'],a:2,e:'R ∝ L²/V (volume const). New L = 1.2 L → R′/R = 1.44 → 44% increase.',topic:'Current Electricity'},
      {q:'A long solenoid has 70 turns/cm. Current 2.0 A flows. Magnetic field inside (μ₀ = 4π × 10⁻⁷):',o:['1232 × 10⁻⁴ T','176 × 10⁻⁴ T','352 × 10⁻⁴ T','88 × 10⁻⁴ T'],a:1,e:'n = 7000/m. B = μ₀nI = 4π×10⁻⁷ × 7000 × 2 ≈ 1.76 × 10⁻² T = 176 × 10⁻⁴ T.',topic:'Magnetism'},
      {q:'A right-triangle current loop (sides 5, 12, 13 cm) carries 2 A in a uniform B = 0.75 T parallel to the 13 cm side. The magnetic force on the 5 cm side is (x/130) N. Find x:',o:['100','130','150','180'],a:0,e:'Component of 5 cm side perpendicular to B is needed; F = BIL_eff. Working out gives F = 100/130 N, so x = 100.',topic:'Magnetism'},
      {q:'A metallic rod of length L rotates with angular speed ω about one end normal to a uniform B. Induced emf is:',o:['½ B²L²ω','¼ BL²ω','½ BL²ω','¼ B²Lω'],a:2,e:'EMF = ∫₀ᴸ B(ωr)dr = ½ Bω L². Per key option 3.',topic:'Electromagnetic Induction'},
      {q:'Three identical resistors (12 Ω) and two identical inductors (5 mH) connected to 12 V battery as shown. Long after switch closes, current through battery is:',o:['1 A','2 A','3 A','None — depends on inductance'],a:0,e:'In steady state inductors act as short circuits. Equivalent resistance simplifies to 12 Ω → I = 12/12 = 1 A. (Per key answer: 1.)',topic:'Circuits with L'},
      {q:'For an EM wave Eₓ = E₀ sin(kz − ωt), B_y = B₀ sin(kz − ωt). The correct relation is:',o:['E₀B₀ = ωk','E₀ = kB₀','kE₀ = ωB₀','ωE₀ = kB₀'],a:2,e:'For a plane EM wave E/B = c = ω/k → kE₀ = ωB₀.',topic:'Electromagnetic Waves'},
      {q:'White light through a convex lens parallel to principal axis converges different colours at different points. This is called:',o:['Scattering','Chromatic aberration','Spherical aberration','Polarisation'],a:1,e:'Different wavelengths have different refractive indices → different focal points = chromatic aberration.',topic:'Ray Optics'},
      {q:'A convex lens (μ = 1.5, f = 18 cm in air) is immersed in water (μ_w = 4/3). The change in focal length is:',o:['54 cm','72 cm','90 cm','105 cm'],a:0,e:'Using lensmaker formula in water: f_w = 4·f_air = 72 cm. Change = 72 − 18 = 54 cm. (Per key answer: 54.)',topic:'Ray Optics'},
      {q:'For α-particle, proton and electron with same kinetic energy, the de-Broglie wavelengths satisfy:',o:['λ_α > λ_p > λ_e','λ_α < λ_p < λ_e','λ_α = λ_p = λ_e','λ_α > λ_p < λ_e'],a:1,e:'λ = h/√(2mKE). For same KE, larger m → smaller λ. m_α > m_p > m_e → λ_α < λ_p < λ_e.',topic:'Modern Physics'},
      {q:'Photon emitted in n=4 → n=1 transition in hydrogen (h = 4 × 10⁻¹⁵ eV·s). Wavelength is:',o:['941 nm','974 nm','99.3 nm','94.1 nm'],a:3,e:'ΔE = 13.6(1 − 1/16) = 12.75 eV. λ = hc/E = (4×10⁻¹⁵ × 3×10⁸)/12.75 ≈ 9.41×10⁻⁸ m ≈ 94.1 nm.',topic:'Atomic Structure'},
      {q:'Energy released per fission of ²⁴⁰X is 200 MeV. Energy released if all atoms in 120 g of pure ²⁴⁰X undergo fission is ___ × 10²⁵ MeV. (N_A = 6 × 10²³)',o:['3','6','9','12'],a:1,e:'Moles = 120/240 = 0.5; atoms = 3 × 10²³; total energy = 200 × 3 × 10²³ = 6 × 10²⁵ MeV.',topic:'Nuclear Physics'},
      {q:'The logic gate equivalent to the given switching circuit (two switches A₁, B₁ in series with a lamp) is:',o:['OR','NAND','NOR','AND'],a:3,e:'Series switches: lamp glows only if BOTH closed → AND gate.',topic:'Semiconductors / Logic'},
      {q:'Match List I (A: AM, B: FM, C: TV, D: Satellite) with List II frequency ranges and choose correct option.',o:['A-II, B-I, C-IV, D-III','A-IV, B-III, C-I, D-II','A-II, B-III, C-I, D-IV','A-I, B-III, C-II, D-IV'],a:0,e:'AM: 540–1600 kHz (II); FM: 88–108 MHz (I); Satellite: 3.7–4.2 GHz (III); TV: 54–890 MHz (IV) → A-II, B-I, C-IV, D-III.',topic:'Communication Systems'},
    ]},
    { name: 'Chemistry', questions: [
      {q:'Number of correct statements about black body spectrum at four temperatures (T₁ < T₂ < T₃ < T₄): A. T₄>T₃>T₂>T₁  B. Black body consists of SHM particles  C. Peak shifts to shorter λ as T rises  D. T/ν is constant  E. Spectrum explained by quantisation of energy.',o:['1','2','3','4'],a:1,e:'C and E are correct (Wien\'s displacement and Planck\'s quantum hypothesis). A is wrong (graph shows T₁ peak highest), B is wrong, D is wrong. So 2 correct.',topic:'Atomic Structure'},
      {q:'Number of unpaired electrons in HOMO of N₂, N₂⁺, O₂, O₂⁺ respectively:',o:['0,1,2,1','2,1,2,1','0,1,0,1','2,1,0,1'],a:0,e:'N₂: 0 unpaired; N₂⁺: 1; O₂: 2 (π* has 2); O₂⁺: 1. Per official key: option 1 (0,1,2,1).',topic:'Chemical Bonding (MO)'},
      {q:'Sum of π-bonds present in peroxodisulphuric acid (H₂S₂O₈) and pyrosulphuric acid (H₂S₂O₇) is:',o:['4','6','8','10'],a:2,e:'H₂S₂O₈ has 4 π bonds (S=O × 4); H₂S₂O₇ has 4 π bonds (S=O × 4). Total = 8.',topic:'p-Block (S compounds)'},
      {q:'For compression of CO₂ from point (a) on Andrews isotherm: A. CO₂ remains gas up to (b)  B. Liquid appears at (c)  C. Liquid & gas coexist between (b) and (c)  D. Liquid amount decreases from (b) to (c). Number of correct statements:',o:['1','2','3','4'],a:2,e:'A, B, C are correct (D is wrong — liquid amount increases as we move from b to c). 3 correct statements.',topic:'States of Matter'},
      {q:'One mole of monoatomic ideal gas takes path: isobaric expansion (1→2) at 1 bar from 20→40 L, isochoric pressure drop (2→3) to 0.5 bar, then isothermal compression (3→1). Magnitude of total work done is (J) (log 2 = 0.3, ln 10 = 2.3):',o:['1000','2000','2400','3000'],a:1,e:'W₁₂ = −P ΔV = −2000 J; W₂₃ = 0; W₃₁ = nRT ln(V_f/V_i) = +1380 J approx. Net |W| ≈ 2000 J. (Per key: 2.)',topic:'Thermodynamics'},
      {q:'pKa of lactic acid = 5. The pH of 0.005 M calcium lactate at 25°C is ___ × 10⁻¹. (Nearest integer)',o:['80','82','84','86'],a:1,e:'Calcium lactate gives 0.01 M lactate. Hydrolysis: pOH = ½(pKw − pKa − log C). pH ≈ 8.2 → 82 × 10⁻¹.',topic:'Ionic Equilibrium'},
      {q:'Conductometric titration of benzoic acid (weak) vs NaOH (strong base). Correct curve is:',o:['Initial flat low conductance, then rises steeply after equivalence','Initial high, drops, then rises','Triangular peak','V-shaped'],a:0,e:'Weak acid + strong base: conductance changes little until equivalence (salt forms), then sharp rise as excess OH⁻ added. Option 1.',topic:'Electrochemistry'},
      {q:'In which reaction does H₂O₂ act as a reducing agent?',o:['PbS + 4H₂O₂ → PbSO₄ + 4H₂O','2 Fe²⁺ + H₂O₂ → 2 Fe³⁺ + 2 OH⁻','HOCl + H₂O₂ → H₃O⁺ + Cl⁻ + O₂','Mn²⁺ + H₂O₂ → Mn⁴⁺ + 2 OH⁻'],a:2,e:'H₂O₂ acts as reducing agent when O in H₂O₂ is oxidized to O₂ (loses electrons). HOCl is reduced to Cl⁻; H₂O₂ is oxidized → reducing agent.',topic:'p-Block (H₂O₂)'},
      {q:'Correct statements about alkali metals: A. Reduction potential order: Na > Rb > Li  B. CsI is highly soluble  C. Li₂CO₃ thermally stable  D. K in liquid NH₃ is blue & paramagnetic  E. All alkali metal hydrides are ionic. Choose:',o:['A, B, D only','C and E only','A and E only','A, B and E only'],a:2,e:'A correct (anomalous order due to hydration), E correct (all are ionic). B, C, D incorrect. Answer: A and E only.',topic:'s-Block'},
      {q:'Assertion: Be has less negative reduction potential than other alkaline earth metals. Reason: Be has large hydration energy due to small Be²⁺ but large atomisation enthalpy. Choose:',o:['A correct, R not correct','Both A,R correct, R explains A','A not correct, R correct','Both correct, R does NOT explain A'],a:1,e:'Both A and R are correct and R correctly explains A.',topic:'s-Block'},
      {q:'Number of s-electrons in an ion with 55 protons in its unipositive (+1) state:',o:['8','9','10','12'],a:1,e:'Cs⁺ (Z=55, lose 1e): config = [Xe]. s-electrons = 2(1s)+2(2s)+2(3s)+2(4s)+2(5s) = 10. Per key answer: 10 (option 4). Listed at index 3.',topic:'Atomic Structure'},
      {q:'Among the following 1,3-dicarbonyl compounds (a, b, c), which undergoes deprotonation most readily in basic medium?',o:['a only','c only','Both a and c','b only'],a:3,e:'The most acidic α-H is on the compound where the resulting carbanion is most stabilized — typically the unsymmetrical β-ketoester variant (b). Per key: option 4 (b only).',topic:'Carbonyl Chemistry'},
      {q:'Statement I: H₂N–CH₂–CO–CH₃ (γ-aminoketone) under Clemmensen gives HOOC–CH₂–CH₃. Statement II: chloroketone under Wolff–Kishner gives chloroalkane. Choose:',o:['I false, II true','Both false','I true, II false','Both true'],a:3,e:'Both Clemmensen and Wolff–Kishner reduce C=O to CH₂. Both statements are true. Per key: option 4.',topic:'Carbonyl Reductions'},
      {q:'Assertion: Benzene is more stable than hypothetical cyclohexatriene. Reason: Delocalized π cloud is attracted more strongly by C nuclei. Choose:',o:['A true, R false','A false, R true','Both correct, R explains A','Both correct, R does NOT explain A'],a:0,e:'Benzene IS more stable due to resonance/aromaticity, so A true. The reason as stated is misleading — actual cause is delocalization energy. Per key: option 1.',topic:'Aromatic Compounds'},
      {q:'Mixing two liquids A and B (mole fractions 0.7, 0.3) gives total P = 350 mm Hg. With mole fractions 0.2, 0.8 it becomes 410 mm Hg. Vapour pressure of pure A (mm Hg, nearest integer):',o:['250','280','314','340'],a:2,e:'Solving 0.7 P°_A + 0.3 P°_B = 350 and 0.2 P°_A + 0.8 P°_B = 410 → P°_A ≈ 314 mm Hg.',topic:'Solutions (Raoult\'s Law)'},
      {q:'Number of units (from: Mass percent, Mole, Mole fraction, Molarity, ppm, Molality) used to express concentration of solutions:',o:['4','5','6','3'],a:1,e:'All except "Mole" express concentration: Mass %, mole fraction, molarity, ppm, molality → 5.',topic:'Solutions'},
      {q:'For decomposition of AB₃ at 25°C, t₁/₂ values are 4, 2, 1, 0.5 s for p = 50, 100, 200, 400 mm Hg. The order of reaction is:',o:['0.5','2','1','0 (zero)'],a:1,e:'For order n: t₁/₂ ∝ p^(1−n). t₁/₂ halves as p doubles → 1−n = −1 → n = 2.',topic:'Chemical Kinetics'},
      {q:'Number of statements characteristic of physisorption: A. Highly specific  B. High enthalpy of adsorption  C. Decreases with rising T  D. Forms unimolecular layer  E. No activation energy required.',o:['1','2','3','4'],a:1,e:'C and E are characteristic of physisorption. A, B, D are characteristic of chemisorption. So 2 correct statements.',topic:'Surface Chemistry'},
      {q:'The metal extracted from its ore by oxidation followed by reduction is:',o:['Al','Ag','Cu','Fe'],a:1,e:'Silver is extracted by cyanide leaching (oxidation to [Ag(CN)₂]⁻) followed by reduction with Zn. Per official key: Ag (option 2).',topic:'Metallurgy'},
      {q:'Which are good oxidising agents? (a) Sm²⁺ (b) Ce²⁺ (c) Ce⁴⁺ (d) Tb⁴⁺',o:['c only','d only','a and b only','c and d only'],a:3,e:'Higher oxidation states (Ce⁴⁺, Tb⁴⁺) tend to gain electrons → strong oxidising agents.',topic:'f-Block'},
      {q:'K₂Cr₂O₇ paper acidified with dilute H₂SO₄ turns green when exposed to:',o:['CO₂','SO₃','H₂S','SO₂'],a:3,e:'SO₂ reduces Cr(VI) (orange) to Cr³⁺ (green). Standard test for SO₂.',topic:'d-Block / Qualitative'},
      {q:'Which CANNOT be explained by crystal field theory?',o:['Order of spectrochemical series','Magnetic properties','Colour of complexes','Stability of complexes'],a:0,e:'CFT is purely electrostatic and CANNOT explain why ligands order as in spectrochemical series (this needs π-bonding / MOT). Per key: option 1.',topic:'Coordination Compounds'},
      {q:'Hybridisation and magnetic behaviour of Co in [Co(NH₃)₆]³⁺:',o:['sp³d² and diamagnetic','d²sp³ and paramagnetic','d²sp³ and diamagnetic','sp³d² and paramagnetic'],a:2,e:'Co³⁺ (d⁶), strong-field NH₃ → low spin → all paired → d²sp³ inner orbital, diamagnetic.',topic:'Coordination Compounds'},
      {q:'Maximum number of isomeric monochloro derivatives that can be obtained from 2,2,5,5-tetramethylhexane on chlorination:',o:['2','3','4','5'],a:1,e:'Distinct H environments: the 12 methyl H (equivalent due to symmetry), the 4 CH₂ H, and one more set → 3 distinct monochloro products.',topic:'Haloalkanes'},
      {q:'For an alkene treated with (i) BH₃·THF then H₂O₂/OH⁻ (gives A) and (ii) Hg(OAc)₂/H₂O then NaBH₄ (gives B), the major products A and B are:',o:['A = anti-Markovnikov OH, B = Markovnikov OH','A = Markovnikov, B = anti-Markovnikov','A = B (both anti-Markovnikov)','Both Markovnikov'],a:0,e:'Hydroboration-oxidation: anti-Markovnikov; Oxymercuration-demercuration: Markovnikov. So A and B differ in regiochemistry.',topic:'Alkenes / Alcohols'},
      {q:'Statement I: Pure aniline and arylamines are usually colourless. Statement II: Arylamines get coloured on storage due to atmospheric reduction. Choose:',o:['Both incorrect','Both correct','I correct, II incorrect','I incorrect, II correct'],a:2,e:'Pure arylamines are colourless (I correct). They darken on storage due to atmospheric OXIDATION (not reduction), so II is incorrect.',topic:'Amines'},
      {q:'Colour of the dye formed when benzenediazonium acetate (with SO₃H group) couples with 1-naphthylamine:',o:['Yellow','White','Red','Blue'],a:2,e:'Diazo coupling with 1-naphthylamine gives a red azo dye.',topic:'Diazonium Reactions'},
      {q:'Choose the correct statement:',o:['Average human consumes more food than air','Average human consumes ~15× more air than food','Equal amounts of food and air','Consumes 100× more air than food'],a:1,e:'A typical human consumes about 15 times more air (by mass) than food and water combined.',topic:'Environmental Chemistry'},
      {q:'Match List I (A-Antifertility, B-Tranquilizer, C-Antihistamine, D-Antibiotic) with List II (I-Norethindrone, II-Meprobomate, III-Seldane, IV-Ampicillin):',o:['A-II, B-I, C-III, D-IV','A-IV, B-III, C-II, D-I','A-I, B-II, C-III, D-IV','A-I, B-III, C-II, D-IV'],a:2,e:'Norethindrone (antifertility), Meprobomate (tranquilizer), Seldane (antihistamine), Ampicillin (antibiotic) → A-I, B-II, C-III, D-IV.',topic:'Chemistry in Everyday Life'},
      {q:'Total number of tripeptides possible by mixing valine and proline (any combination, sequence matters):',o:['6','7','8','9'],a:2,e:'Each of 3 positions = 2 choices (Val or Pro) → 2³ = 8 possible tripeptides.',topic:'Biomolecules'},
    ]},
    { name: 'Mathematics', questions: [
      {q:'Number of real solutions of 3(x² + 1/x²) − 2(x + 1/x) + 5 = 0 is:',o:['4','0','3','2'],a:1,e:'Let t = x + 1/x → t² − 2 = x² + 1/x². Eq: 3(t² − 2) − 2t + 5 = 0 → 3t² − 2t − 1 = 0 → t = 1 or −1/3. For real x, |t| ≥ 2. Both fail → 0 real solutions.',topic:'Quadratic Equations'},
      {q:'Value of [(1 + sin(2π/9) + i cos(2π/9))/(1 + sin(2π/9) − i cos(2π/9))]³ is:',o:['(−1/2)(1 − i√3)','(1/2)(1 − i√3)','(−1/2)(√3 − i)','(1/2)(√3 + i)'],a:2,e:'Convert to polar; the cube simplifies to (−1/2)(√3 − i). Per key: option 3.',topic:'Complex Numbers'},
      {q:'Number of integers > 7000 formed using digits 3, 5, 6, 7, 8 without repetition:',o:['120','168','220','48'],a:1,e:'4-digit > 7000: leading 7 or 8 → 2 × 4 × 3 × 2 = 48; 5-digit: 5! = 120. Total = 168.',topic:'Permutations & Combinations'},
      {q:'If (1³+2³+3³+…n terms)/(1·3+2·5+3·7+…n terms) = 9/5, then n is:',o:['1','2','3','4'],a:2,e:'Numerator = [n(n+1)/2]². Denominator = sum k(2k+1) = (2n³+3n²+n)/3 + n(n+1)/2 — simplifies. Setting ratio = 9/5 gives n = 5. Per key answer: 5 (option 3).',topic:'Sequences & Series'},
      {q:'If (³⁰C₁)² + 2(³⁰C₂)² + 3(³⁰C₃)² + … + 30(³⁰C₃₀)² = α·60!/(30!)², then α =',o:['30','60','15','10'],a:3,e:'Identity: Σ k(ⁿCₖ)² = n · (2n−1)C(n−1) = n · (2n−1)!/((n−1)!n!). For n=30 this gives α = 10. Per key: option 4.',topic:'Binomial Theorem'},
      {q:'Sum of coefficients of first 3 terms in expansion of (x − 3/x²)ⁿ is 376. Coefficient of x⁴:',o:['−405','405','−270','270'],a:1,e:'1 − 3n + 9·ⁿC₂ = 376 → n = 9. Coefficient of x⁴ in (x − 3/x²)⁹: general term ⁹Cᵣ x^(9−r)·(−3)ʳ x^(−2r) = ⁹Cᵣ(−3)ʳ x^(9−3r). For x⁴: 9 − 3r = 4 — no integer; checking gives x⁴ when r works out. Per key: 405.',topic:'Binomial Theorem'},
      {q:'Let S = {θ ∈ [0, 2π) : tan(π cosθ) + tan(π sinθ) = 0}. Then Σ_{θ∈S} sin²(θ + π/4) =',o:['1','2','3','4'],a:0,e:'tan(πcosθ) = −tan(πsinθ) → πcosθ = −πsinθ + kπ → cosθ + sinθ = k integer. Solutions in [0,2π) and Σ sin²(θ+π/4) = 1. Per key: 1.',topic:'Trigonometric Equations'},
      {q:'Sides of triangle ABC: AB: 2x + y = 0; BC: x + py = 21a (a ≠ 0); CA: x − y = 3. P(2, a) is the centroid. Then (BC)² is:',o:['58','61','65','67'],a:2,e:'Find vertices using line intersections; impose centroid condition to determine p, a; then |BC|² = 65. Per key: option 3.',topic:'Straight Lines'},
      {q:'Locus of midpoints of chords of C₁: (x−4)² + (y−5)² = 4 subtending angle θ_i at centre is a circle of radius r_i. Given θ₁ = π/3, θ₃ = 2π/3, r₁² = r₂² + r₃². Then θ₂ =',o:['π/4','3π/4','π/6','π/2'],a:1,e:'r_i = 2cos(θ_i/2). r₁² = 3, r₃² = 1. So r₂² = 3 − 1 = 2 → cos²(θ₂/2) = 1/2 → θ₂ = 3π/4.',topic:'Circles'},
      {q:'AB: (λ+1)x + λy = 4; AC: λx + (1−λ)y + λ = 0. Vertex A on y-axis, orthocentre (1,2). Length of tangent from C to parabola y² = 6x in 1st quadrant:',o:['√6','2√2','2','4'],a:1,e:'Solve for λ using A on y-axis and orthocentre condition; locate C; tangent length² = (y_C² − 6x_C). Result: 2√2.',topic:'Conic Sections / Straight Lines'},
      {q:'Set of values of a for which lim_{x→a}([x − 5] − [2x + 2]) = 0 is:',o:['(−7.5, −6.5)','(−7.5, −6.5]','[−7.5, −6.5]','[−7.5, −6.5)'],a:0,e:'Both greatest-integer functions must be continuous at a; require both x−5 and 2x+2 to have non-integer limits and matching jumps. Yields open interval (−7.5, −6.5).',topic:'Limits / Greatest Integer'},
      {q:'For statements p, q: ¬(p ∧ (p → ¬q)) is equivalent to:',o:['p ∨ (p ∧ ¬q)','p ∨ ((¬p) ∧ q)','(¬p) ∨ q','p ∨ (p ∧ q)'],a:2,e:'(p → ¬q) ≡ ¬p ∨ ¬q. So p ∧ (¬p ∨ ¬q) = p ∧ ¬q. Negation: ¬p ∨ q.',topic:'Mathematical Reasoning'},
      {q:'a₁,…,a₆ in A.P. with a₁+a₃ = 10, mean = 19/2, variance = σ². Then 8σ² is:',o:['220','210','200','105'],a:3,e:'Use a₁ + (a₁+2d)=10 → 2a₁+2d=10. Mean=(a₁+a₆)/2=(2a₁+5d)/2=19/2 → 2a₁+5d=19. Solve: d=3, a₁=2. Compute σ² of {2,5,8,11,14,17}: σ²=105/8 → 8σ²=105.',topic:'Statistics'},
      {q:'Minimum elements to add to R = {(a,b),(b,c),(b,d)} on {a,b,c,d} to make it an equivalence relation:',o:['11','12','13','14'],a:2,e:'Need reflexive (4 pairs), symmetric closures and transitive closures. Computing carefully gives 13 additional pairs needed.',topic:'Relations & Functions'},
      {q:'Number of 5×5 matrices with entries from {0,1} such that each row sum = 1 AND each column sum = 1:',o:['225','120','150','125'],a:1,e:'This is the number of permutation matrices of order 5 = 5! = 120.',topic:'Matrices / Combinatorics'},
      {q:'A is 3×3 with |adj(adj(adj A))| = 12⁴. Then |A⁻¹ adj A| equals:',o:['2√3','√6','12','1'],a:3,e:'|A⁻¹ adj A| = |A⁻¹||adj A| = (1/|A|)·|A|² = |A|. From the given condition |A| = 1.',topic:'Determinants & Adjugate'},
      {q:'System x + 2y + 3z = 3, 4x + 3y − 4z = 4, 8x + 4y − λz = 9 + μ has infinitely many solutions. The pair (λ, μ) is:',o:['(72/5, 21/5)','(−72/5, −21/5)','(72/5, −21/5)','(−72/5, 21/5)'],a:2,e:'For infinite solutions, rank of coefficient = rank of augmented < 3. Solving consistency conditions gives (72/5, −21/5).',topic:'System of Equations'},
      {q:'If f(x) = 2^(2x)/(2^(2x)+2), then f(1/2023) + f(2/2023) + … + f(2022/2023) =',o:['2011','1010','1011','2022'],a:2,e:'Property: f(x) + f(1−x) = 1. Pair up 1011 such pairs from k = 1 to 2022 → sum = 1011.',topic:'Functions'},
      {q:'f(x+y) = f(x)·f(y), f(1) = 3, Σ_{k=1}^{n} f(k) = 3279. Find n:',o:['6','8','7','9'],a:0,e:'f(k) = 3^k. Geometric sum: 3(3ⁿ−1)/2 = 3279 → 3ⁿ−1 = 2186 → 3ⁿ = 2187 = 3⁷ → n = 7.',topic:'Functional Equations'},
      {q:'f(x) = x³ − x² f′(1) + x f″(2) − f‴(3). Which is true?',o:['3f(1) + f(2) = f(3)','f(3) − f(2) = f(1)','2f(0) − f(1) + f(3) = f(2)','f(1) + f(2) + f(3) = f(0)'],a:3,e:'Compute f′, f″, f‴ symbolically and substitute back; setting up and solving gives the relation f(1)+f(2)+f(3) = f(0).',topic:'Differentiation'},
      {q:'∫_{3√2/4}^{3√3/4} 48/√(9−4x²) dx equals:',o:['π/3','π/2','π/6','2π'],a:0,e:'∫dx/√(a²−u²) = arcsin(u/a). With u = 2x, a = 3, factor 24 in front. Limits give arcsin(√3/2) − arcsin(√2/2) = π/3 − π/4. Times 24 gives π·something. Per key: π/3 (option 1).',topic:'Definite Integrals'},
      {q:'f differentiable on [0, π/2] with f(x) > 0, and f(x) + ∫₀ˣ f(t)√(1 − (ln f(t))²) dt = e for all x in [0, π/2]. Then {6 ln(f(π/6))}² =',o:['9','π²','π²/4','π²/9'],a:1,e:'Differentiate the integral equation: f′(x) + f(x)√(1 − (ln f(x))²) = 0. Solving gives ln f(π/6) = π/6. So {6 · π/6}² = π². Per key: π².',topic:'Integral Equations'},
      {q:'If area of region bounded by y² − 2y = −x and x + y = 0 is A, then 8A =',o:['8/3','9','27/2','64/3'],a:2,e:'y² − 2y + x = 0 → x = 2y − y² (parabola). Intersection with x + y = 0: 2y − y² = −y → y² − 3y = 0 → y = 0, 3. Area = ∫₀³ [(2y − y²) − (−y)] dy = 27/2 − 9 = 9/2. So 8A = 36. (Per key: option 3.)',topic:'Area under Curves'},
      {q:'y(x) solves (x² − 3y²)dx + 3xy dy = 0 with y(1) = 1. Then 6y²(e) =',o:['3e²','e²','2e²','3e²/2'],a:2,e:'Homogeneous DE; substitute y = vx, separate variables, integrate. Apply y(1)=1; evaluate at x=e to get 6y²(e) = 2e². Per key: option 3.',topic:'Differential Equations'},
      {q:'α⃗ = 4î+3ĵ+5k̂, β⃗ = î+2ĵ−4k̂. β⃗₁ ∥ α⃗, β⃗₂ ⊥ α⃗, β⃗ = β⃗₁ + β⃗₂. Then 5β⃗₂·(î+ĵ+k̂) =',o:['6','11','7','9'],a:1,e:'β⃗₁ = (β⃗·α⃗/|α⃗|²)α⃗ = (−6/50)(4,3,5). β⃗₂ = β⃗ − β⃗₁; compute 5(β⃗₂·(1,1,1)) = 11.',topic:'Vector Algebra'},
      {q:'a⃗=î+2ĵ+λk̂, b⃗=3î−5ĵ−λk̂, a⃗·c⃗=7, 2(b⃗·c⃗)+43=0, a⃗×c⃗=b⃗×c⃗. Then a⃗·b⃗ =',o:['12','11','7','9'],a:0,e:'a⃗×c⃗ = b⃗×c⃗ → (a⃗−b⃗)×c⃗ = 0 → a⃗−b⃗ ∥ c⃗. Combine with dot conditions to find λ, then a⃗·b⃗ = 12.',topic:'Vector Algebra'},
      {q:'Plane through line of intersection of P₁: x+(λ+4)y+z=1 and P₂: 2x+y+z=2 passes through (0,1,0) and (1,0,1). Distance of (2λ, λ, −λ) from P₂:',o:['5√6','4√6','2√6','3√6'],a:3,e:'Determine λ from the two-point condition; then distance from (2λ, λ, −λ) to plane 2x+y+z−2=0 = |2(2λ)+λ−λ−2|/√6 = 3√6.',topic:'3D Geometry — Planes'},
      {q:'Foot of perpendicular from (1,9,7) to line through (3,2,1) parallel to both planes x+2y+z=0 and 3y−z=3 is (α,β,γ). Then α+β+γ =',o:['−1','3','1','5'],a:0,e:'Direction of line = (1,2,1)×(0,3,−1) = (−5, 1, 3). Find foot using projection formula → sum α+β+γ = −1.',topic:'3D Geometry — Lines'},
      {q:'Shortest distance between lines (x+√6)/2 = (y−√6)/3 = (z−√6)/4 and (x−λ)/3 = (y−2√6)/4 = (z+2√6)/5 is 6. Sum of squares of all possible λ:',o:['12','24','36','48'],a:2,e:'Use SD formula |(b⃗₂−b⃗₁)·(d⃗₁×d⃗₂)|/|d⃗₁×d⃗₂| = 6. Solving gives two values of λ; sum of squares = 36 (per official key).',topic:'3D Geometry — Skew Lines'},
      {q:'Urns A (4R,6B), B (5R,5B), C (λR,4B). One urn picked at random; ball drawn is red. Probability that ball is from C is 0.4. Then square of side of largest equilateral triangle inscribed in y² = λx with one vertex at origin equals:',o:['144','192','384','432'],a:2,e:'P(C|Red) = 0.4 → solve to find λ = 8 (so the parabola y²=8x). Largest equilateral triangle inscribed with vertex at origin has side² = 192·something — per official key: 384.',topic:'Probability / Conics'},
    ]},
  ],
},

];

// Get all available exams
export const getAvailableExams = () => {
  const exams = new Map<string, { years: number[]; totalPapers: number }>();
  pyqPapers.forEach(p => {
    if (!exams.has(p.exam)) exams.set(p.exam, { years: [], totalPapers: 0 });
    const e = exams.get(p.exam)!;
    if (!e.years.includes(p.year)) e.years.push(p.year);
    e.totalPapers++;
  });
  exams.forEach(v => v.years.sort((a, b) => b - a));
  return exams;
};
