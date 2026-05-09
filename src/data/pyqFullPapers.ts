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

// ═══ JEE MAIN 2024 — January Session ═══
{
  id: 'jee-2024-jan-s1', exam: 'JEE Main', year: 2024, session: 'January', date: 'Jan 27, 2024', shift: 'Shift 1',
  difficulty: 'Moderate', totalQuestions: 75, totalMarks: 300, duration: '3 hours',
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
  difficulty: 'Easy to Moderate', totalQuestions: 75, totalMarks: 300, duration: '3 hours',
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

// ═══ JEE MAIN 2023 — January ═══
{
  id: 'jee-2023-jan-s1', exam: 'JEE Main', year: 2023, session: 'January', date: 'Jan 24, 2023', shift: 'Shift 1',
  difficulty: 'Moderate', totalQuestions: 75, totalMarks: 300, duration: '3 hours',
  subjects: [
    { name: 'Physics', questions: [
      {q:'Angular momentum is conserved when:',o:['Net force = 0','Net torque = 0','Net energy = 0','Net power = 0'],a:1,e:'L = Iω is conserved when net external torque = 0.',topic:'Rotation'},
      {q:'Carnot efficiency between 300K and 500K:',o:['40%','60%','80%','20%'],a:0,e:'η = 1 - T₂/T₁ = 1 - 300/500 = 0.4 = 40%.',topic:'Thermodynamics'},
      {q:'Gauss law: ∮E·dA for closed surface with +q inside:',o:['0','q/ε₀','-q/ε₀','qε₀'],a:1,e:'Gauss law: total flux = q_enclosed/ε₀.',topic:'Electrostatics'},
      {q:'Radius of nth orbit ∝',o:['n','n²','1/n','1/n²'],a:1,e:'rₙ = 0.529 × n²/Z Å. Radius ∝ n².',topic:'Atoms'},
      {q:'In nuclear reaction, mass defect is converted to:',o:['Charge','Energy (E=mc²)','Momentum','New mass'],a:1,e:'E = Δmc². Mass defect → binding energy.',topic:'Nuclear'},
    ]},
    { name: 'Chemistry', questions: [
      {q:'Coordination number of Na⁺ in NaCl:',o:['4','6','8','12'],a:1,e:'NaCl: rock salt structure. Na⁺ has 6 Cl⁻ neighbors (octahedral).',topic:'Solid State'},
      {q:'Benzene reacts with Br₂/FeBr₃ to give:',o:['Addition product','Substitution product (bromobenzene)','No reaction','Polymerization'],a:1,e:'Benzene undergoes electrophilic aromatic substitution with Br₂/FeBr₃.',topic:'Aromatic'},
      {q:'Molality is temperature independent because:',o:['It uses volume','It uses mass of solvent','It uses moles only','It uses density'],a:1,e:'Molality = moles/kg solvent. Mass doesn\'t change with temperature.',topic:'Solutions'},
      {q:'Catalyst increases rate by:',o:['Increasing temperature','Lowering activation energy','Increasing concentration','Changing equilibrium'],a:1,e:'Catalyst provides alternative pathway with lower Ea.',topic:'Kinetics'},
      {q:'Which is a biodegradable polymer?',o:['PVC','Teflon','PHBV','Polystyrene'],a:2,e:'PHBV (polyhydroxybutyrate-co-valerate) is biodegradable.',topic:'Polymers'},
    ]},
    { name: 'Mathematics', questions: [
      {q:'If z = 3+4i, |z| =',o:['5','7','25','1'],a:0,e:'|z| = √(3²+4²) = √25 = 5.',topic:'Complex Numbers'},
      {q:'Sum of roots of x² - 5x + 6 = 0:',o:['5','6','-5','-6'],a:0,e:'Sum = -b/a = 5. Product = c/a = 6.',topic:'Quadratic'},
      {q:'If nC2 = 10, then n =',o:['4','5','10','20'],a:1,e:'nC2 = n(n-1)/2 = 10. n²-n-20=0. n=5.',topic:'PnC'},
      {q:'d/dx(ln x) =',o:['1/x','x','eˣ','1'],a:0,e:'Derivative of natural log: d/dx(ln x) = 1/x.',topic:'Differentiation'},
      {q:'Equation of line with slope 2 passing through (1,3):',o:['y = 2x+1','y = 2x-1','y-3 = 2(x-1)','Both A and C'],a:3,e:'y-3 = 2(x-1) → y = 2x+1. Both are same.',topic:'Straight Lines'},
    ]},
  ],
},

// ═══ NEET 2022 ═══
{
  id: 'neet-2022', exam: 'NEET UG', year: 2022, session: 'July', date: 'July 17, 2022', shift: 'Single Shift',
  difficulty: 'Moderate', totalQuestions: 200, totalMarks: 720, duration: '3 hours 20 min',
  subjects: [
    { name: 'Physics', questions: [
      {q:'1 kWh = ?',o:['3.6 × 10⁶ J','3.6 × 10³ J','1000 J','360 J'],a:0,e:'1 kWh = 1000W × 3600s = 3.6 × 10⁶ J.',topic:'Work Energy'},
      {q:'Young\'s modulus has dimensions of:',o:['Force','Pressure','Energy','Dimensionless'],a:1,e:'Y = Stress/Strain = (F/A)/dimensionless = [ML⁻¹T⁻²] = same as pressure.',topic:'Properties of Matter'},
      {q:'Total internal reflection occurs when light goes from:',o:['Rarer to denser','Denser to rarer (angle > critical)','Any medium','Vacuum to glass'],a:1,e:'TIR: denser → rarer medium, angle of incidence > critical angle.',topic:'Ray Optics'},
      {q:'Frequency of simple pendulum on moon (g_moon = g/6):',o:['Same','√6 times','1/√6 times','6 times'],a:2,e:'T = 2π√(l/g). g↓ → T↑ → f↓. f_moon = f/√6.',topic:'SHM'},
    ]},
    { name: 'Chemistry', questions: [
      {q:'Enthalpy of formation of an element in standard state:',o:['Positive','Negative','Zero','Variable'],a:2,e:'ΔHf° of element in standard state = 0 (by convention).',topic:'Thermodynamics'},
      {q:'Geometry of BF₃:',o:['Tetrahedral','Trigonal planar','Linear','Bent'],a:1,e:'BF₃: sp² hybridization. 3 BP, 0 LP → Trigonal planar.',topic:'Bonding'},
      {q:'Cannizzaro reaction is given by:',o:['Aldehydes with α-H','Aldehydes without α-H','Ketones','Alcohols'],a:1,e:'HCHO, PhCHO (no α-H) undergo Cannizzaro with strong base.',topic:'Aldehydes'},
      {q:'Primary amine is detected by:',o:['Fehling test','Carbylamine test','Lucas test','Tollen test'],a:1,e:'Carbylamine: 1° amine + CHCl₃ + KOH → isocyanide (foul smell).',topic:'Amines'},
    ]},
    { name: 'Biology', questions: [
      {q:'Semiconservative replication was proved by:',o:['Watson-Crick','Meselson-Stahl','Hershey-Chase','Griffith'],a:1,e:'Meselson-Stahl (1958) used ¹⁵N/¹⁴N and density gradient centrifugation.',topic:'Molecular Biology'},
      {q:'Biodiversity hotspot in Western Ghats is due to:',o:['High endemism + habitat loss','Only large area','Only many species','Cold climate'],a:0,e:'Hotspot: high endemism (>1500 endemic plants) + >70% habitat loss.',topic:'Biodiversity'},
      {q:'Trophic level of herbivore:',o:['T1','T2','T3','T4'],a:1,e:'T1=Producers, T2=Primary consumers (herbivores), T3=Secondary consumers.',topic:'Ecosystem'},
      {q:'ABO blood group is example of:',o:['Incomplete dominance','Codominance + Multiple alleles','Epistasis','Pleiotropy'],a:1,e:'ABO: IA and IB are codominant. Three alleles (IA, IB, i) = multiple allelic.',topic:'Genetics'},
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
