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

// ═══ NEET 2024 ═══
{
  id: 'neet-2024', exam: 'NEET UG', year: 2024, session: 'May', date: 'May 5, 2024', shift: 'Single Shift',
  difficulty: 'Moderate', totalQuestions: 200, totalMarks: 720, duration: '3 hours 20 min',
  subjects: [
    { name: 'Physics', questions: [
      {q:'A body of mass 2 kg is thrown vertically upward with velocity 20 m/s. Maximum height (g=10):',o:['10 m','20 m','30 m','40 m'],a:1,e:'H = u²/2g = 400/20 = 20 m.',topic:'Kinematics'},
      {q:'The SI unit of impulse is:',o:['Newton','Newton-second','Joule','Watt'],a:1,e:'Impulse = Force × Time = N·s = kg·m/s.',topic:'Laws of Motion'},
      {q:'Two resistors 3Ω and 6Ω in parallel give equivalent:',o:['2Ω','9Ω','4.5Ω','1Ω'],a:0,e:'1/R = 1/3 + 1/6 = 3/6 = 1/2. R = 2Ω.',topic:'Current Electricity'},
      {q:'A concave mirror with f=15cm, object at 30cm. Image is:',o:['Virtual, erect','Real, inverted, same size','Real, inverted, larger','Virtual, larger'],a:1,e:'u=2f → image at 2f, real, inverted, same size.',topic:'Ray Optics'},
      {q:'de Broglie wavelength of electron accelerated through V volts:',o:['1.226/√V nm','12.26/√V Å','1.226/V nm','12.26/V Å'],a:1,e:'λ = 12.26/√V Å for electron.',topic:'Dual Nature'},
      {q:'In photoelectric effect, increasing intensity increases:',o:['KE of electrons','Number of electrons','Threshold frequency','Work function'],a:1,e:'Intensity ∝ number of photons ∝ number of photoelectrons.',topic:'Photoelectric'},
      {q:'Dimension of Planck constant:',o:['[ML²T⁻¹]','[MLT⁻²]','[ML²T⁻²]','[MLT⁻¹]'],a:0,e:'h = E/f = [ML²T⁻²]/[T⁻¹] = [ML²T⁻¹].',topic:'Units'},
      {q:'A transformer has 100 primary and 500 secondary turns. Input 220V gives:',o:['44V','1100V','220V','550V'],a:1,e:'Vs/Vp = Ns/Np = 500/100 = 5. Vs = 1100V.',topic:'AC'},
    ]},
    { name: 'Chemistry', questions: [
      {q:'IUPAC name of CH₃CH(OH)CH₃:',o:['1-propanol','2-propanol','propan-2-ol','isopropanol'],a:2,e:'OH on 2nd carbon of 3-carbon chain = propan-2-ol.',topic:'Alcohols'},
      {q:'Hybridization of carbon in CH₂=CH₂:',o:['sp','sp²','sp³','sp³d'],a:1,e:'Double bond = 1σ + 1π. sp² hybridization. 120° bond angle.',topic:'Bonding'},
      {q:'Which has highest lattice energy?',o:['NaCl','NaBr','NaI','NaF'],a:3,e:'Smaller ion = higher lattice energy. F⁻ is smallest halide.',topic:'Ionic Bonding'},
      {q:'pH of 0.001 M HCl:',o:['1','2','3','4'],a:2,e:'pH = -log[H⁺] = -log(10⁻³) = 3.',topic:'Equilibrium'},
      {q:'Strongest acid:',o:['CH₃COOH','HF','HCl','HI'],a:3,e:'Bond strength decreases down group → HI dissociates most easily.',topic:'Acids'},
      {q:'Which gas is collected over water?',o:['NH₃','HCl','O₂','SO₂'],a:2,e:'O₂ is insoluble in water → collected over water.',topic:'Hydrogen'},
      {q:'Number of sigma bonds in ethyne:',o:['2','3','4','5'],a:1,e:'H-C≡C-H: 2 C-H σ + 1 C-C σ = 3 sigma bonds.',topic:'Bonding'},
      {q:'Fehling test is positive for:',o:['Ketones','Aldehydes','Alcohols','Ethers'],a:1,e:'Aldehydes reduce Cu²⁺ to Cu₂O (red precipitate).',topic:'Aldehydes'},
    ]},
    { name: 'Biology', questions: [
      {q:'Restriction enzymes cut DNA at:',o:['Random sites','Specific palindromic sequences','Telomeres only','Centromeres only'],a:1,e:'Restriction enzymes recognize and cut specific palindromic DNA sequences.',topic:'Biotechnology'},
      {q:'Polymerase Chain Reaction requires:',o:['DNA ligase','Taq polymerase','RNA polymerase','Reverse transcriptase'],a:1,e:'PCR uses Taq polymerase (thermostable) for DNA amplification.',topic:'Biotechnology'},
      {q:'Mendel\'s law of segregation is also called:',o:['Law of dominance','Law of purity of gametes','Law of independent assortment','Law of inheritance'],a:1,e:'Each gamete receives only one allele of a pair = purity of gametes.',topic:'Genetics'},
      {q:'Turner syndrome karyotype:',o:['47,XXY','45,XO','47,XXX','46,XY'],a:1,e:'Turner: 45,XO. Female, short stature, sterile, webbed neck.',topic:'Genetics'},
      {q:'In C4 plants, CO₂ fixation first occurs in:',o:['Bundle sheath cells','Mesophyll cells','Guard cells','Epidermal cells'],a:1,e:'C4: CO₂ → OAA in mesophyll (PEPcase). Then malate → bundle sheath for Calvin cycle.',topic:'Photosynthesis'},
      {q:'Nitrifying bacteria convert:',o:['NH₃ to N₂','NH₃ to NO₃⁻','N₂ to NH₃','NO₃⁻ to N₂'],a:1,e:'Nitrification: NH₃ → NO₂⁻ (Nitrosomonas) → NO₃⁻ (Nitrobacter).',topic:'Ecosystem'},
      {q:'Number of chromosomes in human sperm:',o:['46','23','22','44'],a:1,e:'Sperm is haploid (n) = 23 chromosomes (22 autosomes + 1 sex).',topic:'Reproduction'},
      {q:'Amniocentesis is used for:',o:['Blood test','Detecting chromosomal abnormalities in fetus','Pregnancy test','Cancer detection'],a:1,e:'Amniocentesis: amniotic fluid analysis for prenatal diagnosis.',topic:'Reproduction'},
    ]},
  ],
},

// ═══ NEET 2023 ═══
{
  id: 'neet-2023', exam: 'NEET UG', year: 2023, session: 'May', date: 'May 7, 2023', shift: 'Single Shift',
  difficulty: 'Moderate to Difficult', totalQuestions: 200, totalMarks: 720, duration: '3 hours 20 min',
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
