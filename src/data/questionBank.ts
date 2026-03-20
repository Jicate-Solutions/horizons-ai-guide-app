// ═══════════════════════════════════════════════
// CHAPTER-WISE QUESTION BANK
// Mapped to syllabusData chapter IDs
// Every question is NCERT/syllabus-based
// ═══════════════════════════════════════════════

export interface QBQuestion {
  q: string;
  o: string[]; // 4 options
  a: number;   // correct answer index (0-3)
  e: string;   // explanation
  d: 'easy' | 'medium' | 'hard';
}

export const questionBank: Record<string, QBQuestion[]> = {

// ═══ NEET BOTANY ═══

'bot-1': [ // The Living World
  {q:'Taxonomy is the study of:',o:['Classification of organisms','Naming of organisms','Identification and classification','All: identification, naming, classification'],a:3,e:'Taxonomy includes identification, nomenclature, and classification of organisms.',d:'easy'},
  {q:'Binomial nomenclature was given by:',o:['Linnaeus','Aristotle','Whittaker','Darwin'],a:0,e:'Carolus Linnaeus introduced binomial nomenclature in Systema Naturae.',d:'easy'},
  {q:'ICBN stands for:',o:['Indian Code of Botanical Nomenclature','International Code of Botanical Nomenclature','International Congress of Biological Names','Indian Congress of Biological Nomenclature'],a:1,e:'ICBN = International Code of Botanical Nomenclature, used for naming plants.',d:'easy'},
  {q:'Which is the basic unit of classification?',o:['Genus','Family','Species','Order'],a:2,e:'Species is the basic/fundamental unit of classification.',d:'easy'},
  {q:'Herbarium is:',o:['A garden of herbs','A collection of dried plant specimens','A type of museum','A botanical laboratory'],a:1,e:'Herbarium is a storehouse of collected, dried, pressed, and preserved plant specimens.',d:'easy'},
  {q:'Correct sequence of taxonomic hierarchy is:',o:['Species-Genus-Family-Order-Class-Phylum-Kingdom','Species-Family-Genus-Order-Class-Phylum-Kingdom','Species-Genus-Order-Family-Class-Phylum-Kingdom','Kingdom-Phylum-Class-Order-Family-Genus-Species'],a:0,e:'The ascending order: Species→Genus→Family→Order→Class→Phylum→Kingdom.',d:'medium'},
  {q:'Who proposed five kingdom classification?',o:['Linnaeus','Whittaker','Haeckel','Copeland'],a:1,e:'R.H. Whittaker proposed 5 kingdom classification in 1969.',d:'easy'},
  {q:'A taxonomic key is based on:',o:['Contrasting characters','Similar characters','Morphological characters only','Molecular characters only'],a:0,e:'Taxonomic keys use contrasting characters (couplets) to identify organisms.',d:'medium'},
  {q:'In binomial nomenclature, the first word represents:',o:['Species','Genus','Family','Order'],a:1,e:'First word = Generic name (Genus), Second word = Specific epithet (Species).',d:'easy'},
  {q:'Which is NOT a taxonomic aid?',o:['Herbarium','Botanical garden','Museum','Hospital'],a:3,e:'Hospital is not a taxonomic aid. Herbarium, gardens, museums, and keys are.',d:'easy'},
  {q:'Systematics deals with:',o:['Naming only','Classification only','Evolutionary relationships','Only identification'],a:2,e:'Systematics studies diversity and evolutionary relationships of organisms.',d:'medium'},
  {q:'Zoological parks are established for:',o:['Entertainment only','Ex situ conservation','Taxonomy only','Breeding pets'],a:1,e:'Zoological parks serve as ex situ conservation and allow study of animal behavior.',d:'medium'},
  {q:'Species name is always written in:',o:['Capital letters','Small letters','Any format','Numbers'],a:1,e:'Specific epithet (species name) always starts with a small letter. Genus with capital.',d:'easy'},
  {q:'Botanical gardens help in:',o:['Growing ornamental plants','Providing plant specimens for identification','Entertainment','Selling plants'],a:1,e:'Botanical gardens maintain collections of living plants for identification and reference.',d:'easy'},
  {q:'Monograph contains information about:',o:['One taxon','All taxa','One family only','One genus only'],a:0,e:'Monograph is a detailed account of any one taxon (could be genus, family, order, etc.).',d:'medium'},
],

'bot-2': [ // Biological Classification
  {q:'Which kingdom includes prokaryotes?',o:['Protista','Monera','Fungi','Plantae'],a:1,e:'Monera includes all prokaryotes (bacteria and cyanobacteria).',d:'easy'},
  {q:'Archaebacteria differ from eubacteria in:',o:['Cell wall composition','Having no DNA','Being eukaryotic','Having chloroplasts'],a:0,e:'Archaebacteria have different cell wall composition (no peptidoglycan).',d:'medium'},
  {q:'Diatoms belong to:',o:['Monera','Protista','Fungi','Plantae'],a:1,e:'Diatoms (Chrysophytes) are classified under Kingdom Protista.',d:'easy'},
  {q:'Cell wall of fungi is made of:',o:['Cellulose','Chitin','Peptidoglycan','Pectin'],a:1,e:'Fungal cell wall is composed of chitin (a nitrogen-containing polysaccharide).',d:'easy'},
  {q:'Viruses are considered non-living because they:',o:['Are very small','Cannot reproduce independently','Have DNA','Have protein coat'],a:1,e:'Viruses are obligate intracellular parasites — cannot reproduce without host cell.',d:'easy'},
  {q:'Deuteromycetes are called imperfect fungi because:',o:['They are parasites','Sexual reproduction is unknown','They lack cell wall','They are unicellular'],a:1,e:'Deuteromycetes = Fungi Imperfecti because their sexual phase is not known.',d:'medium'},
  {q:'Lichens are example of:',o:['Parasitism','Mutualism','Commensalism','Predation'],a:1,e:'Lichens = Algae + Fungi in mutualistic relationship. Algae make food, fungi provide shelter.',d:'easy'},
  {q:'Viroids consist of:',o:['Protein only','RNA only','DNA only','RNA + Protein'],a:1,e:'Viroids are free RNA molecules without protein coat. Discovered by T.O. Diener.',d:'medium'},
  {q:'Cyanobacteria are also called:',o:['Red algae','Blue-green algae','Brown algae','Green algae'],a:1,e:'Cyanobacteria are prokaryotic organisms also known as blue-green algae.',d:'easy'},
  {q:'Which is NOT a characteristic of Kingdom Monera?',o:['Prokaryotic','Cell wall present','Membrane-bound nucleus','Some are autotrophic'],a:2,e:'Monera lacks membrane-bound nucleus (prokaryotic). This is the defining feature.',d:'easy'},
  {q:'Saprophytic nutrition is found in:',o:['All fungi','All bacteria','All protists','All plants'],a:0,e:'Most fungi are saprophytic — they decompose dead organic matter.',d:'medium'},
  {q:'Prions are:',o:['Infectious RNA','Infectious DNA','Infectious proteins','Infectious lipids'],a:2,e:'Prions are abnormally folded proteins that cause diseases like mad cow disease.',d:'medium'},
  {q:'Dinoflagellates have cell wall made of:',o:['Silica','Cellulose plates','Chitin','Peptidoglycan'],a:1,e:'Dinoflagellates have stiff cellulose plates on their outer surface.',d:'hard'},
  {q:'Red tide is caused by:',o:['Red algae','Dinoflagellates','Diatoms','Euglenoids'],a:1,e:'Rapid multiplication of dinoflagellates (like Gonyaulax) makes sea appear red = Red tide.',d:'medium'},
  {q:'TMV stands for:',o:['Total Microbial Volume','Tobacco Mosaic Virus','Toxic Microbial Variety','Trans-Membrane Vesicle'],a:1,e:'TMV = Tobacco Mosaic Virus, discovered by Ivanowsky and crystallized by Stanley.',d:'easy'},
],

'bot-15': [ // Principles of Inheritance — HIGHEST weightage
  {q:'Mendel\'s law of segregation is also called:',o:['Law of dominance','Law of purity of gametes','Law of independent assortment','Law of variation'],a:1,e:'Law of segregation = Law of purity of gametes. Each gamete receives only one allele.',d:'easy'},
  {q:'Monohybrid ratio in F2 is:',o:['1:2:1','3:1','9:3:3:1','1:1'],a:1,e:'F2 phenotypic ratio of monohybrid cross = 3:1 (dominant:recessive).',d:'easy'},
  {q:'Dihybrid F2 ratio is:',o:['3:1','1:2:1','9:3:3:1','9:7'],a:2,e:'Dihybrid cross F2 phenotypic ratio = 9:3:3:1.',d:'easy'},
  {q:'Incomplete dominance produces F2 ratio of:',o:['3:1','1:2:1','9:3:3:1','1:1'],a:1,e:'In incomplete dominance, heterozygote shows intermediate phenotype → 1:2:1.',d:'medium'},
  {q:'ABO blood groups show:',o:['Dominance','Incomplete dominance','Codominance','Epistasis'],a:2,e:'ABO blood groups show codominance (Iᴬ and Iᴮ are codominant) and multiple allelism.',d:'medium'},
  {q:'A person with blood group AB has genotype:',o:['IᴬIᴬ','IᴬIᴮ','IᴮIᴮ','ii'],a:1,e:'AB blood group = IᴬIᴮ. Both alleles express equally (codominance).',d:'easy'},
  {q:'Haemophilia is:',o:['Autosomal dominant','Autosomal recessive','X-linked recessive','X-linked dominant'],a:2,e:'Haemophilia is X-linked recessive. More common in males (XᴴY).',d:'medium'},
  {q:'Colour blindness is more common in males because:',o:['Males have two X chromosomes','Males have only one X chromosome','Y chromosome carries the gene','Testosterone causes it'],a:1,e:'Males have one X. If it carries the recessive allele, the trait is expressed. No second X to mask it.',d:'medium'},
  {q:'Down syndrome has karyotype:',o:['44+XXY','44+X','45+XX or XY','44+XXX'],a:2,e:'Down syndrome = Trisomy 21. Total 47 chromosomes (45 autosomes + XX or XY).',d:'medium'},
  {q:'Turner syndrome karyotype is:',o:['47,XXY','45,X','47,XXX','44,XY'],a:1,e:'Turner syndrome = 45,X (monosomy of X). Female, short stature, sterile.',d:'medium'},
  {q:'Klinefelter syndrome karyotype:',o:['45,X','47,XXY','47,XXX','44,XY'],a:1,e:'Klinefelter = 47,XXY. Male, gynecomastia, sterile.',d:'medium'},
  {q:'Test cross is crossing with:',o:['F1 hybrid','Homozygous dominant','Homozygous recessive','F2 generation'],a:2,e:'Test cross = crossing unknown genotype with homozygous recessive to determine genotype.',d:'easy'},
  {q:'In humans, sex determination is:',o:['XX-XY type','XX-XO type','ZW-ZZ type','Haplodiploidy'],a:0,e:'Humans follow XX-XY system. Female=XX, Male=XY.',d:'easy'},
  {q:'Phenylketonuria is:',o:['Autosomal dominant','Autosomal recessive','X-linked','Y-linked'],a:1,e:'PKU is autosomal recessive — lack of enzyme phenylalanine hydroxylase.',d:'medium'},
  {q:'Sickle cell anemia is caused by substitution of:',o:['Valine by Glutamic acid','Glutamic acid by Valine','Alanine by Glycine','Leucine by Proline'],a:1,e:'In HbS, glutamic acid is replaced by valine at 6th position of β-chain (GAG→GUG).',d:'hard'},
  {q:'Multiple alleles means:',o:['Many genes control one trait','One gene has more than 2 allelic forms in population','Multiple traits by one gene','Polygenic inheritance'],a:1,e:'Multiple alleles = more than 2 allelic forms of a gene exist in a population (e.g., ABO has 3: Iᴬ, Iᴮ, i).',d:'medium'},
  {q:'Mendel worked on:',o:['Drosophila','Pisum sativum','Neurospora','E. coli'],a:1,e:'Mendel performed his experiments on garden pea (Pisum sativum).',d:'easy'},
  {q:'Pleiotropy means:',o:['One gene affects multiple traits','Multiple genes affect one trait','Genes on same chromosome','Linked genes'],a:0,e:'Pleiotropy = one gene influences multiple phenotypic traits (e.g., sickle cell gene affects multiple organs).',d:'medium'},
  {q:'Polygenic inheritance example in humans:',o:['Blood group','Skin colour','Haemophilia','Colour blindness'],a:1,e:'Skin colour is controlled by 3+ genes (polygenic) showing continuous variation.',d:'medium'},
  {q:'Law of independent assortment is applicable when genes are:',o:['On same chromosome','On different chromosomes','Linked','Pleiotropic'],a:1,e:'Independent assortment applies to genes on different chromosomes (non-linked genes).',d:'medium'},
],

'bot-16': [ // Molecular Basis of Inheritance
  {q:'DNA is made of:',o:['Amino acids','Nucleotides','Fatty acids','Monosaccharides'],a:1,e:'DNA is a polymer of nucleotides (deoxyribonucleotides).',d:'easy'},
  {q:'Complementary base pairs in DNA:',o:['A-G, T-C','A-T, G-C','A-C, T-G','A-U, G-C'],a:1,e:'Chargaff\'s rule: A pairs with T (2 H-bonds), G pairs with C (3 H-bonds).',d:'easy'},
  {q:'DNA replication is:',o:['Conservative','Semi-conservative','Dispersive','Random'],a:1,e:'Semi-conservative replication proved by Meselson and Stahl using heavy nitrogen (N15).',d:'easy'},
  {q:'Okazaki fragments are formed on:',o:['Leading strand','Lagging strand','Both strands','Neither strand'],a:1,e:'Lagging strand is synthesized discontinuously as Okazaki fragments (5\'→3\' direction).',d:'medium'},
  {q:'Central dogma is:',o:['DNA→Protein→RNA','RNA→DNA→Protein','DNA→RNA→Protein','Protein→RNA→DNA'],a:2,e:'Central dogma: DNA→(transcription)→RNA→(translation)→Protein.',d:'easy'},
  {q:'Start codon is:',o:['UAA','UAG','UGA','AUG'],a:3,e:'AUG is the start/initiation codon. It codes for Methionine.',d:'easy'},
  {q:'Stop codons are:',o:['AUG, GUG, CUG','UAA, UAG, UGA','AAA, GGG, CCC','ATG, TAG, TGA'],a:1,e:'UAA(ochre), UAG(amber), UGA(opal) are stop/termination codons.',d:'easy'},
  {q:'How many codons code for amino acids?',o:['20','61','64','63'],a:1,e:'64 total codons - 3 stop codons = 61 codons code for 20 amino acids.',d:'medium'},
  {q:'Genetic code is degenerate because:',o:['Some codons are meaningless','Multiple codons code for same amino acid','Codons overlap','Code is ambiguous'],a:1,e:'Degeneracy = more than one codon can code for the same amino acid (e.g., Leucine has 6 codons).',d:'medium'},
  {q:'Lac operon is regulated by:',o:['Lactose (inducer)','Glucose','Galactose','Fructose'],a:0,e:'Lactose acts as inducer — it binds to repressor, inactivating it, allowing transcription.',d:'medium'},
  {q:'In lac operon, structural genes are:',o:['a, b, c','x, y, z','z, y, a','p, q, r'],a:2,e:'Lac operon structural genes: z (β-galactosidase), y (permease), a (transacetylase).',d:'medium'},
  {q:'RNA polymerase in prokaryotes:',o:['Needs primer','Does not need primer','Needs DNA polymerase','Only works on RNA template'],a:1,e:'RNA polymerase can initiate transcription de novo (no primer needed). DNA polymerase needs primer.',d:'medium'},
  {q:'Human genome has approximately:',o:['3 million bp','3 billion bp','30 billion bp','300 million bp'],a:1,e:'Human genome = 3.2 × 10⁹ bp (approximately 3 billion base pairs).',d:'medium'},
  {q:'tRNA has:',o:['Cloverleaf shape','Linear shape','Circular shape','Branched shape'],a:0,e:'tRNA has a cloverleaf secondary structure with anticodon loop, acceptor stem, etc.',d:'easy'},
  {q:'Transcription occurs in:',o:['Cytoplasm','Nucleus','Ribosome','Golgi body'],a:1,e:'In eukaryotes, transcription occurs in nucleus. Translation in cytoplasm.',d:'easy'},
],

'zoo-10': [ // Human Reproduction
  {q:'Spermatogenesis occurs in:',o:['Epididymis','Seminiferous tubules','Vas deferens','Prostate'],a:1,e:'Spermatogenesis occurs in seminiferous tubules of testis.',d:'easy'},
  {q:'Ovulation occurs on day ____ of menstrual cycle:',o:['1','7','14','28'],a:2,e:'Ovulation typically occurs on day 14 (middle of 28-day cycle), triggered by LH surge.',d:'easy'},
  {q:'Fertilization in humans occurs in:',o:['Uterus','Ampulla of fallopian tube','Cervix','Ovary'],a:1,e:'Fertilization occurs in ampulla (ampullary-isthmic junction) of the fallopian tube.',d:'easy'},
  {q:'hCG is produced by:',o:['Ovary','Pituitary','Placenta','Uterus'],a:2,e:'hCG (human Chorionic Gonadotropin) is produced by trophoblast/placenta after implantation.',d:'medium'},
  {q:'LH surge causes:',o:['Menstruation','Ovulation','Implantation','Fertilization'],a:1,e:'LH surge (peak on day 13-14) triggers ovulation — release of secondary oocyte from Graafian follicle.',d:'medium'},
  {q:'Corpus luteum secretes:',o:['Estrogen only','Progesterone mainly','FSH','LH'],a:1,e:'Corpus luteum secretes progesterone (and some estrogen) to maintain uterine lining.',d:'easy'},
  {q:'Implantation occurs in:',o:['Fallopian tube','Endometrium of uterus','Cervix','Vagina'],a:1,e:'Blastocyst implants in the endometrium (uterine wall) about 6-7 days after fertilization.',d:'easy'},
  {q:'Acrosome of sperm contains:',o:['Mitochondria','Enzymes for egg penetration','DNA','Lipids'],a:1,e:'Acrosome contains hydrolytic enzymes (hyaluronidase, acrosin) that help penetrate egg coats.',d:'medium'},
  {q:'Menstrual phase occurs due to:',o:['High progesterone','Fall in progesterone and estrogen','Rise in FSH','Rise in LH'],a:1,e:'When corpus luteum degenerates, progesterone and estrogen drop → endometrium sheds = menstruation.',d:'medium'},
  {q:'The correct sequence of spermatogenesis:',o:['Spermatogonia→Spermatocyte→Spermatid→Sperm','Spermatid→Spermatocyte→Spermatogonia→Sperm','Sperm→Spermatid→Spermatocyte→Spermatogonia','Spermatocyte→Spermatogonia→Sperm→Spermatid'],a:0,e:'Spermatogonia(2n)→Primary spermatocyte(2n)→Secondary(n)→Spermatid(n)→Sperm(n).',d:'medium'},
  {q:'Placenta connects:',o:['Two fetuses','Fetus to mother','Ovary to uterus','Uterus to vagina'],a:1,e:'Placenta is the structural and functional connection between fetus and maternal body.',d:'easy'},
  {q:'Number of sperms produced from one primary spermatocyte:',o:['1','2','4','8'],a:2,e:'One primary spermatocyte → 2 secondary → 4 spermatids → 4 sperms.',d:'medium'},
  {q:'Number of eggs from one primary oocyte:',o:['1','2','3','4'],a:0,e:'One primary oocyte → 1 ovum + 3 polar bodies (unequal division conserves cytoplasm).',d:'medium'},
  {q:'Progesterone is also called:',o:['Stress hormone','Pregnancy hormone','Growth hormone','Emergency hormone'],a:1,e:'Progesterone = pregnancy hormone. Maintains endometrium and supports early pregnancy.',d:'easy'},
  {q:'Leydig cells secrete:',o:['Estrogen','Progesterone','Testosterone','FSH'],a:2,e:'Leydig cells (interstitial cells) in testis secrete testosterone (male sex hormone).',d:'easy'},
],

// ═══ NEET PHYSICS ═══

'phy-14': [ // Current Electricity — HIGHEST scoring
  {q:'Ohm\'s law states:',o:['V = IR','V = I/R','R = VI','I = VR'],a:0,e:'V = IR. Voltage = Current × Resistance. Valid for ohmic conductors at constant temperature.',d:'easy'},
  {q:'SI unit of resistance is:',o:['Ampere','Volt','Ohm','Watt'],a:2,e:'Resistance is measured in Ohms (Ω). Named after Georg Ohm.',d:'easy'},
  {q:'In a Wheatstone bridge, when balanced:',o:['Current through galvanometer is zero','All resistances are equal','Voltage is zero','Current is maximum'],a:0,e:'When P/Q = R/S, no current flows through galvanometer (balanced condition).',d:'medium'},
  {q:'Resistivity of a conductor depends on:',o:['Length','Area','Material and temperature','All of these'],a:2,e:'Resistivity (ρ) depends on material and temperature, NOT on dimensions.',d:'medium'},
  {q:'Two resistors 4Ω and 6Ω in parallel have equivalent resistance:',o:['10Ω','2.4Ω','24Ω','5Ω'],a:1,e:'1/R = 1/4 + 1/6 = 5/12, R = 12/5 = 2.4Ω.',d:'easy'},
  {q:'EMF of a cell is measured by:',o:['Ammeter','Voltmeter','Potentiometer','Galvanometer'],a:2,e:'Potentiometer measures EMF accurately (draws no current at null point).',d:'medium'},
  {q:'Kirchhoff\'s junction rule is based on conservation of:',o:['Energy','Charge','Momentum','Mass'],a:1,e:'Junction rule (ΣI = 0) is based on conservation of charge.',d:'easy'},
  {q:'Kirchhoff\'s loop rule is based on conservation of:',o:['Charge','Energy','Mass','Momentum'],a:1,e:'Loop rule (ΣV = 0) is based on conservation of energy.',d:'easy'},
  {q:'Power dissipated in a resistor:',o:['P = V²/R','P = I²R','P = VI','All of these'],a:3,e:'All three are equivalent: P = VI = I²R = V²/R.',d:'easy'},
  {q:'Meter bridge works on the principle of:',o:['Ohm\'s law','Wheatstone bridge','Ampere\'s law','Faraday\'s law'],a:1,e:'Meter bridge is a practical form of Wheatstone bridge.',d:'easy'},
  {q:'Drift velocity of electrons in a conductor is:',o:['Very fast (speed of light)','Very slow (mm/s)','Zero','Same as thermal velocity'],a:1,e:'Drift velocity is very small (~1 mm/s), though electric signal travels at speed of light.',d:'medium'},
  {q:'A wire of resistance R is stretched to double length. New resistance:',o:['R','2R','4R','R/2'],a:2,e:'R = ρL/A. When length doubles, area halves (volume constant). R\' = ρ(2L)/(A/2) = 4R.',d:'medium'},
  {q:'Terminal voltage of a cell:',o:['V = E + Ir','V = E - Ir','V = E × I','V = E/I'],a:1,e:'Terminal voltage V = E - Ir (when discharging). E = EMF, r = internal resistance.',d:'medium'},
  {q:'Current through a 10Ω resistor connected to 20V:',o:['0.5A','2A','200A','10A'],a:1,e:'I = V/R = 20/10 = 2A.',d:'easy'},
  {q:'Specific resistance of a material:',o:['Increases with length','Decreases with area','Is a material property','Depends on current'],a:2,e:'Specific resistance (resistivity) is an intrinsic property of the material.',d:'easy'},
],

// ═══ NEET CHEMISTRY ═══

'chem-7': [ // Equilibrium — pH problems every year
  {q:'pH of pure water at 25°C is:',o:['0','7','14','1'],a:1,e:'Pure water: [H⁺] = [OH⁻] = 10⁻⁷ M. pH = -log(10⁻⁷) = 7.',d:'easy'},
  {q:'pH of 0.01 M HCl:',o:['1','2','3','7'],a:1,e:'HCl is strong acid. [H⁺] = 0.01 = 10⁻². pH = 2.',d:'easy'},
  {q:'pH of 0.001 M NaOH:',o:['3','11','7','14'],a:1,e:'[OH⁻] = 10⁻³, pOH = 3, pH = 14-3 = 11.',d:'medium'},
  {q:'Le Chatelier\'s principle: If temperature increases for exothermic reaction:',o:['Equilibrium shifts forward','Equilibrium shifts backward','No change','Reaction stops'],a:1,e:'For exothermic reaction, heat is a product. Adding heat shifts equilibrium backward.',d:'medium'},
  {q:'Buffer solution resists change in:',o:['Temperature','Volume','pH','Concentration'],a:2,e:'Buffer solutions resist changes in pH when small amounts of acid/base are added.',d:'easy'},
  {q:'Kw at 25°C equals:',o:['10⁻⁷','10⁻¹⁴','10⁻²','1'],a:1,e:'Kw = [H⁺][OH⁻] = 10⁻¹⁴ at 25°C.',d:'easy'},
  {q:'Common ion effect:',o:['Increases solubility','Decreases solubility','No effect on solubility','Increases pH only'],a:1,e:'Common ion effect decreases solubility of sparingly soluble salts.',d:'medium'},
  {q:'Henderson-Hasselbalch equation:',o:['pH = pKa + log[salt/acid]','pH = pKa - log[salt/acid]','pH = pKa × [salt/acid]','pH = Ka + [salt]'],a:0,e:'pH = pKa + log([A⁻]/[HA]) — used for buffer pH calculations.',d:'medium'},
  {q:'Strong acid has:',o:['High Ka','Low Ka','Ka = 0','Ka = 1'],a:0,e:'Strong acids completely dissociate → very high Ka values.',d:'easy'},
  {q:'pH + pOH = ?',o:['7','14','0','1'],a:1,e:'At 25°C, pH + pOH = pKw = 14.',d:'easy'},
  {q:'Acidic solution has pH:',o:['Greater than 7','Equal to 7','Less than 7','Equal to 14'],a:2,e:'Acidic: pH < 7. Neutral: pH = 7. Basic: pH > 7.',d:'easy'},
  {q:'Which shifts equilibrium: adding catalyst?',o:['Shifts right','Shifts left','No shift — reaches equilibrium faster','Stops reaction'],a:2,e:'Catalyst speeds up both forward and reverse equally. Equilibrium position unchanged.',d:'medium'},
  {q:'Kp and Kc relation:',o:['Kp = Kc(RT)^Δn','Kp = Kc/RT','Kp = Kc + RT','Kp = Kc × T'],a:0,e:'Kp = Kc(RT)^Δn where Δn = moles of gaseous products - moles of gaseous reactants.',d:'medium'},
  {q:'Conjugate base of H₂O is:',o:['H₃O⁺','OH⁻','O²⁻','H₂'],a:1,e:'H₂O loses H⁺ → OH⁻ (its conjugate base).',d:'easy'},
  {q:'Lewis acid is:',o:['Proton donor','Proton acceptor','Electron pair acceptor','Electron pair donor'],a:2,e:'Lewis acid = electron pair acceptor. Lewis base = electron pair donor.',d:'medium'},
],

'chem-22': [ // Haloalkanes — SN1 vs SN2
  {q:'SN2 reaction is:',o:['Two-step','One-step (concerted)','Three-step','No steps'],a:1,e:'SN2 is bimolecular, one-step, backside attack → Walden inversion.',d:'easy'},
  {q:'SN1 reaction proceeds via:',o:['Free radical','Carbocation intermediate','Carbanion','Concerted mechanism'],a:1,e:'SN1: Step 1 = carbocation formation (slow), Step 2 = nucleophilic attack (fast).',d:'medium'},
  {q:'SN2 is favored by:',o:['Tertiary substrate','Primary substrate','Both equally','Neither'],a:1,e:'SN2 prefers 1° substrates (less steric hindrance for backside attack).',d:'medium'},
  {q:'SN1 gives:',o:['Inversion','Retention','Racemization','No optical activity change'],a:2,e:'SN1 produces racemic mixture because nucleophile attacks carbocation from both sides.',d:'medium'},
  {q:'Walden inversion occurs in:',o:['SN1','SN2','E1','E2'],a:1,e:'SN2: backside attack → complete inversion of configuration (Walden inversion).',d:'medium'},
  {q:'Grignard reagent formula:',o:['RLi','RMgX','RZnCl','RNa'],a:1,e:'Grignard reagent = RMgX (organomagnesium halide). Used for C-C bond formation.',d:'easy'},
  {q:'Wurtz reaction produces:',o:['Alkene','Higher alkane','Alcohol','Aldehyde'],a:1,e:'Wurtz reaction: 2RX + 2Na → R-R + 2NaX. Forms higher alkane.',d:'easy'},
  {q:'Saytzeff rule applies to:',o:['Substitution','Elimination','Addition','Rearrangement'],a:1,e:'Saytzeff rule: Elimination gives the more substituted (stable) alkene as major product.',d:'medium'},
  {q:'Order of reactivity of halides in SN1:',o:['1° > 2° > 3°','3° > 2° > 1°','All same','2° > 3° > 1°'],a:1,e:'SN1: 3° > 2° > 1° because 3° carbocation is most stable.',d:'medium'},
  {q:'Which is NOT a name reaction of haloalkanes?',o:['Wurtz','Fittig','Sandmeyer','Aldol'],a:3,e:'Aldol is a carbonyl compound reaction, not haloalkane reaction.',d:'easy'},
  {q:'Fluorine is most electronegative but C-F bond is least reactive because:',o:['F is too small','C-F bond is very strong','F has no lone pair','F is not a halogen'],a:1,e:'C-F bond dissociation energy is highest (strongest bond) → least reactive despite high EN.',d:'hard'},
  {q:'In SN2, rate depends on:',o:['[Substrate] only','[Nucleophile] only','Both [substrate] and [nucleophile]','Neither'],a:2,e:'SN2: Rate = k[substrate][nucleophile]. Both are in the rate-determining step.',d:'medium'},
  {q:'Vinyl halides are less reactive in SN because:',o:['C-X bond has partial double bond character (resonance)','They are too large','Carbon is sp³','Halogen is too big'],a:0,e:'In vinyl halides, lone pair of halogen resonates with C=C → partial double bond → stronger C-X.',d:'hard'},
  {q:'DDT is:',o:['An insecticide','A fertilizer','A vitamin','An enzyme'],a:0,e:'DDT (dichlorodiphenyltrichloroethane) is an organochlorine insecticide. Now banned due to bioaccumulation.',d:'easy'},
  {q:'Freon (CFC) causes:',o:['Water pollution','Ozone depletion','Acid rain','Global warming only'],a:1,e:'CFCs (chlorofluorocarbons/Freons) cause ozone layer depletion.',d:'easy'},
],

// ═══ JEE PHYSICS ═══

'jp-2': [ // Kinematics
  {q:'A body starts from rest with acceleration 2 m/s². Distance in 5s:',o:['10m','25m','50m','100m'],a:1,e:'s = ut + ½at² = 0 + ½(2)(25) = 25m.',d:'easy'},
  {q:'Projectile range is maximum at:',o:['30°','45°','60°','90°'],a:1,e:'R = u²sin2θ/g. Maximum when sin2θ = 1, i.e., θ = 45°.',d:'easy'},
  {q:'A ball is thrown up with 20m/s. Maximum height (g=10):',o:['10m','20m','40m','80m'],a:1,e:'H = u²/2g = 400/20 = 20m.',d:'easy'},
  {q:'Velocity-time graph for uniform acceleration is:',o:['Horizontal line','Straight line with slope','Parabola','Vertical line'],a:1,e:'v = u + at is linear. Slope of v-t graph = acceleration.',d:'easy'},
  {q:'Area under v-t graph gives:',o:['Acceleration','Velocity','Displacement','Force'],a:2,e:'Area under velocity-time graph = displacement.',d:'easy'},
  {q:'Time of flight of projectile:',o:['usinθ/g','2usinθ/g','u²sinθ/g','u²sin2θ/g'],a:1,e:'T = 2usinθ/g (time to go up and come back down).',d:'medium'},
  {q:'Two bodies dropped from heights h and 4h. Ratio of times:',o:['1:2','1:4','2:1','4:1'],a:0,e:'t = √(2h/g). Ratio = √h/√4h = 1/2 = 1:2.',d:'medium'},
  {q:'Relative velocity of A w.r.t. B:',o:['vₐ + vᵦ','vₐ - vᵦ','vₐ × vᵦ','vₐ / vᵦ'],a:1,e:'Relative velocity of A w.r.t. B = vₐ - vᵦ (vector subtraction).',d:'easy'},
  {q:'A body in free fall has acceleration:',o:['0','g (9.8 m/s²)','2g','g/2'],a:1,e:'In free fall (no air resistance), acceleration = g ≈ 9.8 m/s² downward.',d:'easy'},
  {q:'At highest point of projectile, velocity is:',o:['Zero','ucosθ','usinθ','u'],a:1,e:'At highest point, vertical component = 0, only horizontal component ucosθ remains.',d:'medium'},
  {q:'Displacement after time t with initial velocity u and acceleration a:',o:['ut + at²','ut + ½at²','½ut²','u + at'],a:1,e:'s = ut + ½at². Second equation of motion.',d:'easy'},
  {q:'A car moves 100m in 10s from rest. Acceleration:',o:['1 m/s²','2 m/s²','10 m/s²','0.5 m/s²'],a:1,e:'s = ½at². 100 = ½a(100). a = 2 m/s².',d:'easy'},
  {q:'Projectile at 30° and 60° with same speed have:',o:['Same range','Same height','Same time','Different everything'],a:0,e:'Complementary angles (30°+60°=90°) give same range: R = u²sin2θ/g.',d:'medium'},
  {q:'Average velocity for first half distance at v₁ and second at v₂:',o:['(v₁+v₂)/2','2v₁v₂/(v₁+v₂)','√(v₁v₂)','v₁v₂/(v₁+v₂)'],a:1,e:'For equal distances: v_avg = 2v₁v₂/(v₁+v₂) (harmonic mean).',d:'hard'},
  {q:'Slope of displacement-time graph gives:',o:['Acceleration','Velocity','Force','Momentum'],a:1,e:'Slope of s-t graph = ds/dt = velocity.',d:'easy'},
],

// ═══ JEE CHEMISTRY ═══

'jc-11': [ // GOC & Isomerism
  {q:'sp³ hybridized carbon has bond angle:',o:['90°','109.5°','120°','180°'],a:1,e:'sp³: tetrahedral geometry, bond angle 109.5° (e.g., CH₄).',d:'easy'},
  {q:'Inductive effect is:',o:['Temporary','Permanent','Only in aromatic compounds','Only in alkenes'],a:1,e:'Inductive effect is a permanent polarization of σ bonds through the chain.',d:'easy'},
  {q:'Carbocation stability order:',o:['1° > 2° > 3°','3° > 2° > 1°','All same','2° > 3° > 1°'],a:1,e:'3° > 2° > 1° > methyl. More alkyl groups = more hyperconjugation/induction = more stable.',d:'easy'},
  {q:'Resonance involves delocalization of:',o:['σ electrons','π electrons and lone pairs','Only lone pairs','Only σ bonds'],a:1,e:'Resonance involves delocalization of π electrons and/or lone pairs over adjacent atoms.',d:'medium'},
  {q:'Hyperconjugation involves:',o:['π-π overlap','σ-p overlap (C-H bond with empty p orbital)','σ-σ overlap','Lone pair donation'],a:1,e:'Hyperconjugation = σ-p overlap. α C-H bonds overlap with adjacent empty p-orbital.',d:'medium'},
  {q:'Tautomerism is seen between:',o:['Keto and enol forms','Cis and trans forms','D and L forms','Positional isomers'],a:0,e:'Tautomerism: Keto ⇌ Enol interconversion (e.g., acetone ⇌ prop-1-en-2-ol).',d:'medium'},
  {q:'Number of structural isomers of C₄H₁₀:',o:['1','2','3','4'],a:1,e:'C₄H₁₀ has 2 isomers: n-butane and isobutane (2-methylpropane).',d:'easy'},
  {q:'Electrophile is:',o:['Electron-rich species','Electron-poor species (seeks electrons)','Neutral always','A radical'],a:1,e:'Electrophile = electron-loving. Electron-deficient species that attacks electron-rich sites.',d:'easy'},
  {q:'Which has strongest +I effect?',o:['—CH₃','—C₂H₅','—C(CH₃)₃','—H'],a:2,e:'+I effect increases with more alkyl groups: —C(CH₃)₃ > —C₂H₅ > —CH₃ > —H.',d:'medium'},
  {q:'Metamerism occurs in:',o:['Same functional group, different alkyl groups on either side','Different functional groups','Same molecular formula only','Only in alkanes'],a:0,e:'Metamerism: Same functional group but different distribution of carbon atoms on either side.',d:'medium'},
  {q:'Which shows optical isomerism?',o:['Methane','Ethanol','Lactic acid','Ethene'],a:2,e:'Lactic acid has a chiral center (asymmetric carbon) → shows optical isomerism.',d:'medium'},
  {q:'Nucleophile is:',o:['Electron-poor','Electron-rich (donates electron pair)','Always positively charged','A radical'],a:1,e:'Nucleophile = nucleus-loving. Electron-rich species that donates electron pair.',d:'easy'},
  {q:'Homolytic fission produces:',o:['Ions','Free radicals','Carbocations','Carbanions'],a:1,e:'Homolytic fission: bond breaks symmetrically → each atom gets one electron → free radicals.',d:'easy'},
  {q:'Heterolytic fission produces:',o:['Free radicals','Ions (cation + anion)','Only cations','Only anions'],a:1,e:'Heterolytic fission: bond breaks asymmetrically → one atom gets both electrons → ions.',d:'easy'},
  {q:'—NO₂ group is:',o:['+I effect','-I and -R (electron withdrawing)','Electron donating','Neutral'],a:1,e:'—NO₂ has both -I (inductive withdrawal) and -R (resonance withdrawal) effects.',d:'medium'},
],

// ═══ JEE MATHS ═══

'jm-16': [ // Integration — highest JEE weightage
  {q:'∫x² dx =',o:['x³/3 + C','2x + C','x³ + C','3x² + C'],a:0,e:'∫xⁿ dx = xⁿ⁺¹/(n+1) + C. Here n=2: x³/3 + C.',d:'easy'},
  {q:'∫sin x dx =',o:['cos x + C','-cos x + C','sin x + C','-sin x + C'],a:1,e:'∫sin x dx = -cos x + C.',d:'easy'},
  {q:'∫eˣ dx =',o:['xeˣ + C','eˣ + C','eˣ/x + C','ln x + C'],a:1,e:'∫eˣ dx = eˣ + C. Exponential function is its own integral.',d:'easy'},
  {q:'∫1/x dx =',o:['ln|x| + C','1/x² + C','x + C','-1/x² + C'],a:0,e:'∫1/x dx = ln|x| + C (natural logarithm).',d:'easy'},
  {q:'∫cos x dx =',o:['-sin x + C','sin x + C','cos x + C','tan x + C'],a:1,e:'∫cos x dx = sin x + C.',d:'easy'},
  {q:'∫sec²x dx =',o:['sec x + C','tan x + C','sec x tan x + C','cot x + C'],a:1,e:'∫sec²x dx = tan x + C.',d:'easy'},
  {q:'Integration by parts formula:',o:['∫uv = u∫v - ∫(u\'∫v)','∫uv = uv - ∫u\'v\'','∫u dv = uv - ∫v du','∫u dv = uv + ∫v du'],a:2,e:'Integration by parts: ∫u dv = uv - ∫v du. Choose u by LIATE rule.',d:'medium'},
  {q:'∫₀^π sin x dx =',o:['0','1','2','-1'],a:2,e:'[-cos x]₀^π = -cos π - (-cos 0) = -(-1) + 1 = 2.',d:'medium'},
  {q:'∫₋ₐ^a f(x) dx when f(x) is odd:',o:['2∫₀^a f(x) dx','0','a','∫₀^a f(x) dx'],a:1,e:'For odd function f(-x) = -f(x), integral over symmetric interval = 0.',d:'medium'},
  {q:'∫₋ₐ^a f(x) dx when f(x) is even:',o:['0','2∫₀^a f(x) dx','a','f(a)'],a:1,e:'For even function f(-x) = f(x), ∫₋ₐ^a = 2∫₀^a f(x) dx.',d:'medium'},
  {q:'∫dx/(1+x²) =',o:['tan⁻¹x + C','sin⁻¹x + C','ln(1+x²) + C','sec⁻¹x + C'],a:0,e:'Standard integral: ∫dx/(1+x²) = tan⁻¹x + C.',d:'easy'},
  {q:'∫dx/√(1-x²) =',o:['tan⁻¹x + C','sin⁻¹x + C','cos⁻¹x + C','sec⁻¹x + C'],a:1,e:'Standard integral: ∫dx/√(1-x²) = sin⁻¹x + C.',d:'easy'},
  {q:'LIATE rule is used for choosing u in:',o:['Substitution','By parts','Partial fractions','All methods'],a:1,e:'LIATE: Log > Inverse trig > Algebraic > Trig > Exponential. Used in integration by parts.',d:'medium'},
  {q:'∫₀^1 x³ dx =',o:['1/3','1/4','1/2','1'],a:1,e:'[x⁴/4]₀¹ = 1/4 - 0 = 1/4.',d:'easy'},
  {q:'∫(2x+3) dx =',o:['x²+3x+C','2x²+3x+C','x²+3+C','2x+3x+C'],a:0,e:'∫2x dx + ∫3 dx = x² + 3x + C.',d:'easy'},
],

// ═══ CLAT ═══

'cl-1': [ // Principle-Fact Application
  {q:'Principle: Consent is a valid defence to tort. Fact: A voluntarily enters a boxing ring and gets injured. A can:',o:['Sue for damages','Not sue — volenti non fit injuria','Sue the organizer only','Get partial compensation'],a:1,e:'Volenti non fit injuria — person who consents to risk cannot claim damages.',d:'medium'},
  {q:'Principle: Minor\'s agreement is void. Fact: A (16 years) signs a contract to buy a car. The contract is:',o:['Valid','Voidable','Void','Illegal'],a:2,e:'Under Indian Contract Act, agreement with minor is void ab initio.',d:'easy'},
  {q:'Principle: Nothing done in good faith is an offence if done for benefit of person under 12 without consent. Fact: Doctor operates on unconscious 10-year-old child. Doctor is:',o:['Liable','Not liable — good faith','Liable for negligence','Partially liable'],a:1,e:'Section 92 IPC — good faith act for benefit of person incapable of giving consent.',d:'medium'},
  {q:'Principle: Defamation requires publication to third person. Fact: A writes defamatory letter to B about B. This is:',o:['Defamation','Not defamation — no publication to third person','Slander','Libel'],a:1,e:'Defamation requires communication to a third person. A letter only to the person = no defamation.',d:'medium'},
  {q:'Principle: An employer is vicariously liable for acts of employee done in course of employment. Fact: A bus driver hits pedestrian while on duty. Who is liable?',o:['Driver only','Bus company (employer)','Pedestrian','Nobody'],a:1,e:'Vicarious liability — employer liable for employee\'s tort done during employment.',d:'easy'},
  {q:'Principle: A person is liable for nuisance if they unreasonably interfere with use of land. Fact: Factory smoke damages neighbor\'s crops daily. This is:',o:['Trespass','Nuisance','Negligence','Strict liability'],a:1,e:'Continuous interference with neighbor\'s enjoyment of land = nuisance.',d:'easy'},
  {q:'Principle: Consideration must be lawful. Fact: A promises B ₹5 lakh to assault C. This contract is:',o:['Valid','Voidable','Void — unlawful consideration','Unenforceable'],a:2,e:'Consideration for assault is unlawful. Contract with unlawful consideration is void.',d:'easy'},
  {q:'Principle: Self-defence is available if threat is imminent. Fact: A attacks B with knife. B shoots A in defence. B has:',o:['Committed murder','Right of self-defence','No defence','Partial defence only'],a:1,e:'Right of private defence when facing imminent threat to life (Section 96-106 IPC).',d:'medium'},
  {q:'Principle: Strict liability — person who brings dangerous thing on land is liable if it escapes. Fact: A builds dam. Water escapes and floods B\'s farm. A is:',o:['Not liable — Act of God','Liable under strict liability','Liable only if negligent','Not liable — natural cause'],a:1,e:'Rylands v Fletcher — strict liability for escape of dangerous thing.',d:'medium'},
  {q:'Principle: Fraud makes contract voidable. Fact: A sells fake diamond ring claiming it\'s real. B discovers truth. B can:',o:['Do nothing','Avoid the contract','Sue for murder','Keep the ring and claim more money'],a:1,e:'Fraud = intentional misrepresentation. Makes contract voidable at option of aggrieved party.',d:'easy'},
  {q:'Principle: Act of child below 7 is not an offence. Fact: A 5-year-old throws heavy toy at another child causing injury. 5-year-old is:',o:['Guilty of hurt','Not guilty — below 7','Guilty but reduced punishment','Guilty if parents are negligent'],a:1,e:'Section 82 IPC — nothing is an offence done by child under 7 years (doli incapax).',d:'easy'},
  {q:'Principle: Acceptance must be communicated. Fact: A offers to sell car for ₹5L. B decides to accept but doesn\'t tell A. B later demands car.',o:['A must sell','No contract — acceptance not communicated','Contract exists from B\'s decision','A can choose'],a:1,e:'Mental acceptance is not acceptance. Acceptance must be communicated to offeror.',d:'medium'},
  {q:'Principle: Negligence requires breach of duty of care. Fact: Doctor follows all standard procedures but patient dies. Doctor is:',o:['Negligent','Not negligent — duty of care fulfilled','Guilty of murder','Strictly liable'],a:1,e:'If standard of care was followed, there is no breach of duty. No negligence.',d:'medium'},
  {q:'Principle: Free consent is essential. Coercion vitiates consent. Fact: A signs contract because B threatens to kill A\'s family.',o:['Contract valid','Contract voidable (coercion)','Contract void','Contract illegal'],a:1,e:'Coercion (Section 15) makes consent not free → contract is voidable.',d:'easy'},
  {q:'Principle: Contributory negligence reduces damages. Fact: A crosses road without looking. B drives negligently and hits A.',o:['Only B is liable','Only A is liable','Both share liability — contributory negligence','Nobody is liable'],a:2,e:'Both parties negligent. A\'s damages reduced proportionally due to contributory negligence.',d:'medium'},
],

// ═══ MORE NEET BOTANY ═══

'bot-4': [ // Morphology — HIGH weightage
  {q:'Tap root is found in:',o:['Monocots','Dicots','Both equally','Ferns'],a:1,e:'Dicots have tap root system. Monocots have fibrous root.',d:'easy'},
  {q:'Pneumatophores are found in:',o:['Xerophytes','Mangroves','Hydrophytes','Epiphytes'],a:1,e:'Pneumatophores = breathing roots in mangroves (Rhizophora). Help in gaseous exchange.',d:'easy'},
  {q:'Runner is a modification of:',o:['Root','Stem','Leaf','Flower'],a:1,e:'Runner is a creeping stem that grows horizontally (e.g., grass, strawberry).',d:'easy'},
  {q:'Parallel venation is characteristic of:',o:['Dicots','Monocots','Gymnosperms','Ferns'],a:1,e:'Monocots show parallel venation. Dicots show reticulate venation.',d:'easy'},
  {q:'Racemose inflorescence has:',o:['Terminal flower blooms first','Basal flowers bloom first','All bloom together','No flowers'],a:1,e:'In racemose, flowers open from base to apex (acropetal succession).',d:'medium'},
  {q:'Number of petals in monocot flower:',o:['4 or 5','3 or multiples of 3','2','7'],a:1,e:'Monocot flowers: trimerous (3 or multiples of 3). Dicot: pentamerous (4 or 5).',d:'easy'},
  {q:'Bulb is a modified:',o:['Root','Underground stem','Leaf','Fruit'],a:1,e:'Bulb (onion) = modified underground stem with fleshy leaves storing food.',d:'easy'},
  {q:'Tendril in pea is modification of:',o:['Stem','Root','Leaf','Flower'],a:2,e:'In pea plant, leaf tendrils (leaflet modification) help in climbing.',d:'medium'},
  {q:'Placentation in mustard is:',o:['Axile','Parietal','Free central','Basal'],a:1,e:'Mustard has parietal placentation (ovules on inner wall of ovary).',d:'medium'},
  {q:'Epipetalous stamens are found when:',o:['Stamens attached to sepals','Stamens attached to petals','Stamens are free','Stamens are fused'],a:1,e:'Epipetalous = stamens attached to petals.',d:'medium'},
  {q:'Aggregate fruit develops from:',o:['Single ovary','Many ovaries of one flower','Many flowers','Inflorescence'],a:1,e:'Aggregate fruit = from many free carpels of single flower (e.g., raspberry, lotus).',d:'medium'},
  {q:'Phyllotaxy refers to:',o:['Arrangement of flowers','Arrangement of leaves on stem','Type of roots','Venation pattern'],a:1,e:'Phyllotaxy = pattern of arrangement of leaves on the stem (alternate, opposite, whorled).',d:'easy'},
  {q:'Stamen consists of:',o:['Filament and anther','Stigma and style','Ovary and ovule','Petal and sepal'],a:0,e:'Stamen = Filament (stalk) + Anther (pollen-producing part). Male reproductive organ.',d:'easy'},
  {q:'Gynoecium refers to:',o:['Male part','Female part','Both parts','Accessory parts'],a:1,e:'Gynoecium = female reproductive part = pistil = stigma + style + ovary.',d:'easy'},
  {q:'Composite fruit develops from:',o:['Single flower','Entire inflorescence','Single carpel','Apocarpous ovary'],a:1,e:'Composite fruit = from entire inflorescence (e.g., pineapple, fig).',d:'medium'},
],

'bot-11': [ // Photosynthesis
  {q:'Photosynthesis occurs in:',o:['Mitochondria','Chloroplast','Nucleus','Ribosome'],a:1,e:'Photosynthesis occurs in chloroplasts — thylakoids (light reaction) and stroma (Calvin cycle).',d:'easy'},
  {q:'The pigment that absorbs red and blue light:',o:['Carotenoid','Xanthophyll','Chlorophyll a','Phycocyanin'],a:2,e:'Chlorophyll a absorbs red (680nm) and blue (430nm) light, reflects green.',d:'easy'},
  {q:'In C3 plants, first stable product of CO₂ fixation is:',o:['OAA','PGA (3-PGA)','G3P','RuBP'],a:1,e:'In Calvin cycle (C3), RuBisCO fixes CO₂ + RuBP → 2 molecules of 3-PGA.',d:'medium'},
  {q:'In C4 plants, CO₂ fixation in mesophyll cells is by:',o:['RuBisCO','PEP carboxylase','Carbonic anhydrase','ATP synthase'],a:1,e:'C4 plants: PEP carboxylase (mesophyll) fixes CO₂ first. RuBisCO works in bundle sheath.',d:'medium'},
  {q:'Kranz anatomy is characteristic of:',o:['C3 plants','C4 plants','CAM plants','All plants'],a:1,e:'Kranz anatomy = bundle sheath cells with chloroplasts. Found in C4 plants (maize, sugarcane).',d:'medium'},
  {q:'Photolysis of water occurs in:',o:['PS-I','PS-II','Stroma','Cytoplasm'],a:1,e:'Water splitting (photolysis) occurs at PS-II in thylakoid: 2H₂O → 4H⁺ + 4e⁻ + O₂.',d:'medium'},
  {q:'Cyclic photophosphorylation involves:',o:['Only PS-I','Only PS-II','Both PS-I and PS-II','Neither'],a:0,e:'Cyclic photophosphorylation involves only PS-I. Produces ATP only, no NADPH, no O₂.',d:'medium'},
  {q:'RuBisCO stands for:',o:['Ribulose bisphosphate carboxylase oxygenase','Ribonucleic acid base compound','Ribulose biphosphate compound','None of these'],a:0,e:'RuBisCO = Ribulose-1,5-bisphosphate carboxylase/oxygenase. Most abundant enzyme on Earth.',d:'medium'},
  {q:'In CAM plants, CO₂ is fixed at:',o:['Day time','Night time','Both equally','Neither'],a:1,e:'CAM plants fix CO₂ at night (stomata open) using PEP carboxylase. Calvin cycle runs during day.',d:'medium'},
  {q:'Net equation of photosynthesis:',o:['6CO₂+6H₂O→C₆H₁₂O₆+6O₂','C₆H₁₂O₆+6O₂→6CO₂+6H₂O','6CO₂→6C+3O₂','H₂O→H₂+O'],a:0,e:'6CO₂ + 12H₂O → C₆H₁₂O₆ + 6H₂O + 6O₂ (simplified: 6CO₂+6H₂O→C₆H₁₂O₆+6O₂).',d:'easy'},
  {q:'Number of CO₂ molecules needed to make 1 glucose in Calvin cycle:',o:['3','6','12','18'],a:1,e:'6 CO₂ molecules are fixed in 6 turns of Calvin cycle to produce 1 glucose.',d:'medium'},
  {q:'Photorespiration reduces efficiency of:',o:['C4 plants','C3 plants','CAM plants','All plants equally'],a:1,e:'Photorespiration occurs in C3 plants when RuBisCO binds O₂ instead of CO₂. Wastes energy.',d:'medium'},
],

'zoo-5': [ // Body Fluids & Circulation
  {q:'Normal human blood pH is:',o:['6.4','7.4','8.4','7.0'],a:1,e:'Blood pH = 7.35-7.45. Slightly alkaline. Maintained by buffer systems.',d:'easy'},
  {q:'Pacemaker of heart is:',o:['AV node','SA node','Bundle of His','Purkinje fibers'],a:1,e:'SA node (sinoatrial node) = natural pacemaker. Located in right atrium.',d:'easy'},
  {q:'ECG P wave represents:',o:['Ventricular depolarization','Atrial depolarization','Ventricular repolarization','Atrial repolarization'],a:1,e:'P wave = atrial depolarization (contraction). QRS = ventricular. T = ventricular repolarization.',d:'medium'},
  {q:'Double circulation means blood passes through heart:',o:['Once per cycle','Twice per cycle','Three times','Not at all'],a:1,e:'Double circulation: Blood passes through heart twice — pulmonary + systemic circuits.',d:'easy'},
  {q:'RBC lifespan is approximately:',o:['7 days','30 days','120 days','365 days'],a:2,e:'RBC lifespan ≈ 120 days. Destroyed in spleen (graveyard of RBC).',d:'easy'},
  {q:'Universal donor blood group:',o:['A','B','AB','O'],a:3,e:'O group = universal donor (no antigens on RBC). AB = universal recipient.',d:'easy'},
  {q:'Cardiac output per minute:',o:['500 mL','1 L','5 L','50 L'],a:2,e:'Cardiac output = Stroke volume × Heart rate ≈ 70 mL × 72 = ~5 L/min.',d:'medium'},
  {q:'Erythroblastosis fetalis occurs when:',o:['Both parents Rh+','Both parents Rh-','Mother Rh- and fetus Rh+','Mother Rh+ and fetus Rh-'],a:2,e:'Rh- mother carrying Rh+ fetus. Mother\'s antibodies attack fetal RBCs in subsequent pregnancies.',d:'medium'},
  {q:'WBC that increases during allergic reaction:',o:['Neutrophils','Eosinophils','Basophils','Monocytes'],a:1,e:'Eosinophils increase during allergic reactions and parasitic infections.',d:'medium'},
  {q:'Blood clotting requires:',o:['Ca²⁺ ions','Na⁺ ions','K⁺ ions','Cl⁻ ions'],a:0,e:'Calcium ions (Ca²⁺) are essential for blood clotting cascade.',d:'easy'},
  {q:'Cardiac cycle duration:',o:['0.4 sec','0.8 sec','1.2 sec','2.0 sec'],a:1,e:'One cardiac cycle = 0.8 sec at 72 beats/min. Systole 0.3s + Diastole 0.5s.',d:'medium'},
  {q:'Platelets are fragments of:',o:['RBC','WBC','Megakaryocytes','Lymphocytes'],a:2,e:'Platelets = thrombocytes, fragments of megakaryocytes in bone marrow.',d:'medium'},
],

'phy-19': [ // Ray Optics — 3 questions in NEET
  {q:'For a converging lens, focal length is:',o:['Positive','Negative','Zero','Infinite'],a:0,e:'Converging (convex) lens has positive focal length by sign convention.',d:'easy'},
  {q:'Image formed by concave mirror when object is at infinity:',o:['At F, real, inverted, diminished','At C, real, same size','At infinity','No image'],a:0,e:'Parallel rays converge at focus. Image: at F, real, inverted, highly diminished (point-sized).',d:'easy'},
  {q:'Snell\'s law:',o:['n₁sinθ₁ = n₂sinθ₂','n₁cosθ₁ = n₂cosθ₂','n₁tanθ₁ = n₂tanθ₂','n₁/sinθ₁ = n₂/sinθ₂'],a:0,e:'Snell\'s law of refraction: n₁sinθ₁ = n₂sinθ₂.',d:'easy'},
  {q:'Total internal reflection occurs when light goes from:',o:['Rarer to denser','Denser to rarer medium','Any direction','Only in vacuum'],a:1,e:'TIR occurs when light travels from denser to rarer medium at angle > critical angle.',d:'easy'},
  {q:'Power of a lens in diopters when f = 25 cm:',o:['0.25 D','2.5 D','4 D','25 D'],a:2,e:'P = 1/f(meters) = 1/0.25 = 4 D.',d:'easy'},
  {q:'In myopia (near-sightedness), image forms:',o:['Behind retina','On retina','In front of retina','On lens'],a:2,e:'Myopia: image forms in front of retina. Corrected by concave (diverging) lens.',d:'easy'},
  {q:'Hypermetropia is corrected by:',o:['Concave lens','Convex lens','Cylindrical lens','No lens needed'],a:1,e:'Hypermetropia (far-sightedness): image behind retina. Corrected by convex (converging) lens.',d:'easy'},
  {q:'When object is between F and optical center of convex lens:',o:['Real, inverted','Virtual, erect, magnified','No image','Real, diminished'],a:1,e:'Object between F and O of convex lens gives virtual, erect, magnified image (like magnifying glass).',d:'medium'},
  {q:'Magnifying power of simple microscope:',o:['D/f','1+D/f','f/D','f×D'],a:1,e:'M = 1 + D/f (when final image at near point D = 25 cm).',d:'medium'},
  {q:'Dispersion of light through prism shows that white light is:',o:['Single color','Mixture of seven colors','Only red and blue','Only RGB'],a:1,e:'Newton showed white light = VIBGYOR (7 colors). Violet bends most, Red least.',d:'easy'},
  {q:'Critical angle depends on:',o:['Color of light only','Nature of two media','Size of medium','Angle of incidence'],a:1,e:'sinC = n₂/n₁. Depends on refractive indices of both media.',d:'medium'},
  {q:'A concave mirror is used as:',o:['Rear-view mirror','Shaving/makeup mirror','Both','Neither'],a:1,e:'Concave mirror for shaving/makeup (magnified virtual image). Convex for rear-view.',d:'easy'},
],

'chem-4': [ // Chemical Bonding
  {q:'VSEPR theory predicts shape based on:',o:['Atomic size','Electron pairs around central atom','Electronegativity','Mass number'],a:1,e:'VSEPR: shape determined by minimizing repulsion between electron pairs (bond + lone).',d:'easy'},
  {q:'Shape of NH₃:',o:['Linear','Trigonal planar','Pyramidal','Tetrahedral'],a:2,e:'NH₃: 3 bond pairs + 1 lone pair = sp³ but pyramidal shape (lone pair compresses angle).',d:'easy'},
  {q:'Bond angle in H₂O:',o:['180°','120°','109.5°','104.5°'],a:3,e:'H₂O: 2 BP + 2 LP = bent shape. Bond angle 104.5° (LP-LP repulsion compresses).',d:'medium'},
  {q:'sp hybridization gives:',o:['Tetrahedral','Trigonal planar','Linear','Pyramidal'],a:2,e:'sp: 2 electron domains → linear geometry (180°). Example: BeCl₂, CO₂.',d:'easy'},
  {q:'sp² hybridization gives bond angle:',o:['90°','109.5°','120°','180°'],a:2,e:'sp²: 3 electron domains → trigonal planar (120°). Example: BF₃, ethene.',d:'easy'},
  {q:'Bond order of O₂ by MOT:',o:['1','2','3','1.5'],a:1,e:'O₂: Bond order = (10-6)/2 = 2. O₂ is paramagnetic (2 unpaired electrons in π*).',d:'medium'},
  {q:'Strongest hydrogen bond is in:',o:['HCl','HBr','HF','HI'],a:2,e:'HF has strongest H-bond because F is most electronegative and smallest.',d:'easy'},
  {q:'Ionic bond is formed between:',o:['Two metals','Two non-metals','Metal and non-metal','Two noble gases'],a:2,e:'Ionic bond = electron transfer from metal to non-metal (e.g., NaCl).',d:'easy'},
  {q:'Coordinate bond is a type of:',o:['Ionic bond','Covalent bond','Metallic bond','Van der Waals'],a:1,e:'Coordinate (dative) bond: both shared electrons come from one atom. Special type of covalent.',d:'easy'},
  {q:'Dipole moment of CO₂:',o:['Very high','Moderate','Zero','Negative'],a:2,e:'CO₂ is linear and symmetric. Bond dipoles cancel → net dipole moment = 0.',d:'medium'},
  {q:'Which has maximum ionic character?',o:['LiF','NaCl','KBr','CsI'],a:0,e:'LiF: Large EN difference (Li very electropositive + F very electronegative) → maximum ionic character.',d:'medium'},
  {q:'σ bond is:',o:['Weaker than π','Stronger than π','Same as π','Not a real bond'],a:1,e:'σ bond is stronger than π bond because of head-on overlap (greater extent of overlap).',d:'easy'},
],

'chem-16': [ // Electrochemistry
  {q:'In galvanic cell, oxidation occurs at:',o:['Cathode','Anode','Salt bridge','Both'],a:1,e:'Anode = oxidation (AN OX). Cathode = reduction (RED CAT).',d:'easy'},
  {q:'E°cell = ?',o:['E°cathode + E°anode','E°cathode - E°anode','E°anode - E°cathode','E°cathode × E°anode'],a:1,e:'E°cell = E°cathode - E°anode (standard reduction potentials).',d:'easy'},
  {q:'Nernst equation at 25°C:',o:['E = E° - 0.0591/n × logQ','E = E° + 0.0591/n × logQ','E = E° × Q','E = E°/n'],a:0,e:'Nernst: E = E° - (0.0591/n)logQ at 25°C.',d:'medium'},
  {q:'Faraday constant F =',o:['6.023×10²³','96500 C/mol','1.6×10⁻¹⁹','8.314 J/mol/K'],a:1,e:'F = 96500 coulombs/mol of electrons. F = Nₐ × e.',d:'easy'},
  {q:'1 Faraday of electricity deposits ___ of Ag (108g/mol):',o:['54 g','108 g','216 g','27 g'],a:1,e:'Ag⁺ + e⁻ → Ag. 1 mole electrons deposits 1 mole Ag = 108 g.',d:'medium'},
  {q:'Conductivity of electrolyte increases with:',o:['Decrease in temperature','Increase in dilution','Increase in concentration','Decrease in dilution'],a:1,e:'On dilution, more ions are free → conductivity increases. Molar conductivity also increases.',d:'medium'},
  {q:'Salt bridge maintains:',o:['Electrical neutrality','Temperature','Pressure','pH'],a:0,e:'Salt bridge maintains electrical neutrality by allowing ion flow between half-cells.',d:'easy'},
  {q:'Standard hydrogen electrode has E° =',o:['-1 V','0 V','+1 V','0.5 V'],a:1,e:'SHE is the reference electrode. E° = 0.00 V by convention.',d:'easy'},
  {q:'Kohlrausch\'s law relates to:',o:['Conductance at infinite dilution','Electrode potential','Cell constant','Specific conductance'],a:0,e:'Kohlrausch: Λ°m = λ°(cation) + λ°(anion). Molar conductivity at infinite dilution.',d:'medium'},
  {q:'ΔG° = ?',o:['-nFE°','nFE°','nF/E°','E°/nF'],a:0,e:'ΔG° = -nFE°. Negative ΔG° means spontaneous reaction.',d:'medium'},
  {q:'Electrolysis of water produces:',o:['H₂ at cathode, O₂ at anode','O₂ at cathode, H₂ at anode','Both at cathode','Both at anode'],a:0,e:'Cathode: 2H₂O + 2e⁻ → H₂ + 2OH⁻. Anode: 2H₂O → O₂ + 4H⁺ + 4e⁻.',d:'medium'},
  {q:'Corrosion of iron is:',o:['Oxidation at anode','Reduction at cathode','Both','Neither'],a:0,e:'Rusting: Fe → Fe²⁺ + 2e⁻ (oxidation = anodic reaction). Electrochemical process.',d:'medium'},
],

// ═══ MORE JEE ═══

'jp-15': [ // Current Electricity — JEE highest
  {q:'Three resistors 2Ω each in parallel give:',o:['6Ω','2Ω','2/3Ω','3/2Ω'],a:2,e:'1/R = 1/2+1/2+1/2 = 3/2. R = 2/3Ω.',d:'easy'},
  {q:'In potentiometer, at null point:',o:['Current through galvanometer is zero','EMF equals potential drop','Both A and B','Neither'],a:2,e:'At null point: no current through galvanometer AND EMF = potential drop across wire.',d:'medium'},
  {q:'Colour code: Brown Black Red Gold =',o:['10Ω ±5%','100Ω ±5%','1000Ω ±5%','1kΩ ±5%'],a:2,e:'Brown(1) Black(0) Red(×100) Gold(±5%) = 10×100 = 1000Ω ±5%.',d:'medium'},
  {q:'Current in circuit with 12V battery and 4Ω resistance:',o:['3A','4A','48A','0.33A'],a:0,e:'I = V/R = 12/4 = 3A.',d:'easy'},
  {q:'Two cells of EMF 2V each in series give:',o:['1V','2V','4V','0V'],a:2,e:'Cells in series: total EMF = E₁ + E₂ = 2 + 2 = 4V.',d:'easy'},
  {q:'Potentiometer is preferred over voltmeter because:',o:['It is cheaper','It draws no current at null point','It is smaller','It measures AC'],a:1,e:'Potentiometer draws no current → measures true EMF. Voltmeter draws some current.',d:'medium'},
  {q:'Equivalent resistance of n identical resistors R in series:',o:['nR','R/n','R','nR²'],a:0,e:'Series: R_eq = R₁+R₂+...+Rₙ = nR.',d:'easy'},
  {q:'If length of wire is halved, resistance:',o:['Doubles','Halves','Same','Quadruples'],a:1,e:'R = ρL/A. If L halves, R halves (assuming area unchanged).',d:'easy'},
  {q:'Internal resistance causes terminal voltage to be:',o:['Greater than EMF','Less than EMF','Equal to EMF','Zero'],a:1,e:'V = E - Ir. Terminal voltage < EMF when current flows.',d:'medium'},
  {q:'Maximum power theorem: max power when:',o:['R = 0','R = r (external = internal)','R = ∞','R = 2r'],a:1,e:'Maximum power transfer when external resistance = internal resistance.',d:'hard'},
],

'jm-4': [ // Sequences & Series
  {q:'Sum of first n natural numbers:',o:['n(n+1)','n(n+1)/2','n²','n(n-1)/2'],a:1,e:'Σn = n(n+1)/2. For n=100: 100×101/2 = 5050.',d:'easy'},
  {q:'10th term of AP: 3, 7, 11, ...?',o:['39','43','37','41'],a:0,e:'a=3, d=4. T₁₀ = a + 9d = 3 + 36 = 39.',d:'easy'},
  {q:'Sum of infinite GP with a=1, r=1/2:',o:['1','2','∞','1/2'],a:1,e:'S∞ = a/(1-r) = 1/(1-1/2) = 2. Valid when |r| < 1.',d:'easy'},
  {q:'If a, b, c are in GP, then b² =',o:['a+c','ac','a-c','a/c'],a:1,e:'In GP: b/a = c/b → b² = ac. Geometric mean.',d:'easy'},
  {q:'AM of a and b:',o:['(a+b)/2','√(ab)','2ab/(a+b)','a×b'],a:0,e:'Arithmetic Mean = (a+b)/2.',d:'easy'},
  {q:'GM of a and b:',o:['(a+b)/2','√(ab)','2ab/(a+b)','a+b'],a:1,e:'Geometric Mean = √(ab).',d:'easy'},
  {q:'HM of a and b:',o:['(a+b)/2','√(ab)','2ab/(a+b)','ab/(a+b)'],a:2,e:'Harmonic Mean = 2ab/(a+b).',d:'medium'},
  {q:'Relation: AM ≥ GM ≥ HM for positive numbers.',o:['Always true','True only for a=b','Sometimes true','Never true'],a:0,e:'AM ≥ GM ≥ HM always holds for positive numbers. Equality when a=b.',d:'medium'},
  {q:'Sum of first 20 terms of AP: 2, 5, 8, ...?',o:['590','610','630','570'],a:1,e:'a=2, d=3. S₂₀ = 20/2(2×2+19×3) = 10(4+57) = 610.',d:'medium'},
  {q:'Common ratio of GP: 4, 12, 36, ...?',o:['2','3','4','8'],a:1,e:'r = 12/4 = 3.',d:'easy'},
  {q:'If 3rd term of AP is 7 and 7th term is 15, find d:',o:['1','2','3','4'],a:1,e:'T₃=a+2d=7, T₇=a+6d=15. Subtract: 4d=8, d=2.',d:'easy'},
  {q:'Sum of n terms of GP:',o:['a(rⁿ-1)/(r-1)','n/2(2a+(n-1)d)','na','ar^n'],a:0,e:'GP sum: Sₙ = a(rⁿ-1)/(r-1) when r>1, or a(1-rⁿ)/(1-r) when r<1.',d:'easy'},
],

// ═══ MORE CLAT ═══

'ce-1': [ // Reading Comprehension
  {q:'The main idea of a passage is:',o:['The first sentence always','The central argument or theme','A minor detail','The conclusion only'],a:1,e:'Main idea = central argument/theme that the entire passage revolves around.',d:'easy'},
  {q:'Inference means:',o:['A fact stated in the passage','A logical conclusion drawn from passage','Author\'s biography','A random guess'],a:1,e:'Inference = what is logically implied but not explicitly stated.',d:'easy'},
  {q:'Author\'s tone can be:',o:['Only positive','Only negative','Neutral, positive, negative, sarcastic, etc.','Always formal'],a:2,e:'Tone can vary: persuasive, critical, neutral, optimistic, sarcastic, informative, etc.',d:'easy'},
  {q:'"Ubiquitous" most nearly means:',o:['Rare','Found everywhere','Dangerous','Ancient'],a:1,e:'Ubiquitous = present, appearing, or found everywhere.',d:'easy'},
  {q:'A passage states "Democracy is the worst form of government, except for all the others." This suggests:',o:['Democracy is terrible','Democracy is the best available despite flaws','Other forms are better','Government is unnecessary'],a:1,e:'Rhetorical device: praising by seemingly criticizing. Democracy is best among imperfect options.',d:'medium'},
  {q:'"Pernicious" most nearly means:',o:['Beneficial','Harmless','Highly destructive','Beautiful'],a:2,e:'Pernicious = having a harmful effect, especially in a gradual or subtle way.',d:'medium'},
  {q:'Skimming means:',o:['Reading every word carefully','Quickly reading for main idea','Reading backwards','Reading only last paragraph'],a:1,e:'Skimming = quick reading to get overall idea/gist. Scanning = looking for specific info.',d:'easy'},
  {q:'Which is NOT a valid inference technique?',o:['Using context clues','Drawing from passage evidence','Using personal opinion not in passage','Identifying author\'s implication'],a:2,e:'Inferences must be based on passage content, not personal opinions or outside knowledge.',d:'medium'},
  {q:'"The elephant in the room" means:',o:['A large animal','An obvious problem no one addresses','A room that is too small','A zoo'],a:1,e:'Idiom: "elephant in the room" = an obvious, important issue that people avoid discussing.',d:'easy'},
  {q:'A persuasive passage primarily aims to:',o:['Inform neutrally','Convince the reader','Tell a story','Describe a place'],a:1,e:'Persuasive writing aims to convince/influence the reader\'s opinion or action.',d:'easy'},
],

'cg-6': [ // Constitution & Amendments
  {q:'Fundamental Rights are in Part ___ of Constitution:',o:['I','II','III','IV'],a:2,e:'Part III: Fundamental Rights (Articles 12-35).',d:'easy'},
  {q:'Right to Education (Article 21A) was added by:',o:['42nd Amendment','86th Amendment','44th Amendment','73rd Amendment'],a:1,e:'86th Amendment (2002) added Article 21A — Right to Education for children 6-14 years.',d:'medium'},
  {q:'Article 32 deals with:',o:['Right to equality','Right to freedom','Right to constitutional remedies','Right to property'],a:2,e:'Article 32: Right to Constitutional Remedies. Dr. Ambedkar called it "heart and soul of Constitution".',d:'easy'},
  {q:'GST was introduced by:',o:['99th Amendment','100th Amendment','101st Amendment','102nd Amendment'],a:2,e:'101st Amendment (2016) introduced GST (Goods and Services Tax).',d:'medium'},
  {q:'Panchayati Raj was constitutionalized by:',o:['42nd Amendment','73rd Amendment','74th Amendment','44th Amendment'],a:1,e:'73rd Amendment (1992) constitutionalized Panchayati Raj (Part IX). 74th for Municipalities.',d:'easy'},
  {q:'Directive Principles are in Part:',o:['III','IV','IVA','V'],a:1,e:'Part IV: Directive Principles of State Policy (Articles 36-51).',d:'easy'},
  {q:'Fundamental Duties were added by:',o:['42nd Amendment','44th Amendment','73rd Amendment','86th Amendment'],a:0,e:'42nd Amendment (1976) added Part IVA — Fundamental Duties (Article 51A). Originally 10, now 11.',d:'medium'},
  {q:'Right to Property was removed from FR by:',o:['42nd Amendment','44th Amendment','73rd Amendment','86th Amendment'],a:1,e:'44th Amendment (1978) removed Right to Property from FR. Now a legal right under Article 300A.',d:'medium'},
  {q:'How many Fundamental Rights are currently there?',o:['5','6','7','8'],a:1,e:'6 Fundamental Rights (originally 7, Right to Property removed). Art 14-18, 19-22, 23-24, 25-28, 29-30, 32.',d:'medium'},
  {q:'Article 21 provides:',o:['Right to equality','Right to life and personal liberty','Right to religion','Right to education'],a:1,e:'Article 21: No person shall be deprived of life/personal liberty except by procedure established by law.',d:'easy'},
],


};

