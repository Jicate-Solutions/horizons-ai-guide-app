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


// ═══ NEET BOTANY — remaining high priority ═══

'bot-3': [ // Plant Kingdom
  {q:'Bryophytes are called amphibians of plant kingdom because:',o:['They live in water','They need water for reproduction','They are like frogs','They breathe through skin'],a:1,e:'Bryophytes live on land but need water for transfer of male gametes (motile sperms).',d:'easy'},
  {q:'First vascular plants:',o:['Bryophytes','Pteridophytes','Gymnosperms','Angiosperms'],a:1,e:'Pteridophytes are the first plants with vascular tissue (xylem and phloem).',d:'easy'},
  {q:'Seeds are produced by:',o:['Algae and Bryophytes','Pteridophytes only','Gymnosperms and Angiosperms','All plants'],a:2,e:'Seed-producing plants = Spermatophytes = Gymnosperms + Angiosperms.',d:'easy'},
  {q:'Dominant phase in bryophytes is:',o:['Sporophyte (2n)','Gametophyte (n)','Both equal','Neither'],a:1,e:'In bryophytes, gametophyte (n) is dominant, independent. Sporophyte depends on gametophyte.',d:'medium'},
  {q:'Which alga is used as food?',o:['Spirogyra','Laminaria','Chara','Volvox'],a:1,e:'Laminaria (kelp, brown alga) is used as food in many Asian countries.',d:'medium'},
  {q:'Heterospory is seen in:',o:['Most bryophytes','All ferns','Selaginella','All algae'],a:2,e:'Selaginella (a pteridophyte) produces two types of spores — microspores and megaspores.',d:'medium'},
  {q:'Gymnosperms have:',o:['Covered seeds','Naked seeds','No seeds','Spores only'],a:1,e:'Gymnosperm = "naked seed." Seeds not enclosed in fruit (e.g., Pinus, Cycas).',d:'easy'},
  {q:'Monocots differ from dicots in:',o:['Seed cotyledons','Cell wall','DNA','Chlorophyll'],a:0,e:'Monocots = 1 cotyledon, parallel venation, fibrous root. Dicots = 2 cotyledons, reticulate, tap root.',d:'easy'},
  {q:'Agar is obtained from:',o:['Brown algae','Red algae','Green algae','Blue-green algae'],a:1,e:'Agar-agar is obtained from red algae (Gelidium, Gracilaria).',d:'easy'},
  {q:'Alternation of generations means:',o:['Plants live for many years','Haploid and diploid phases alternate','Seeds alternate with spores','Leaves alternate on stem'],a:1,e:'Alternation of generations: Sporophyte(2n) produces spores → Gametophyte(n) produces gametes → cycle repeats.',d:'medium'},
],

'bot-5': [ // Anatomy
  {q:'Casparian strips are found in:',o:['Epidermis','Endodermis','Cortex','Pith'],a:1,e:'Casparian strips are waxy (suberin) bands on endodermal cell walls. Control water flow into stele.',d:'medium'},
  {q:'Meristematic tissue is:',o:['Dead at maturity','Actively dividing','Non-dividing','Found only in roots'],a:1,e:'Meristematic tissue consists of actively dividing cells. Found at root/shoot tips.',d:'easy'},
  {q:'Sclerenchyma has:',o:['Thin cell walls','Thick lignified walls, dead at maturity','Living cells with chloroplasts','No cell walls'],a:1,e:'Sclerenchyma = thick, lignified, dead. Provides mechanical strength (fibers and sclereids).',d:'easy'},
  {q:'Xylem transports:',o:['Food','Water and minerals','Hormones only','Gases'],a:1,e:'Xylem = water and mineral transport (upward). Phloem = food transport (bidirectional).',d:'easy'},
  {q:'Companion cells are associated with:',o:['Xylem vessels','Sieve tubes (phloem)','Tracheids','Fibers'],a:1,e:'Companion cells help sieve tube elements in phloem with metabolic functions.',d:'easy'},
  {q:'In dicot stem, vascular bundles are:',o:['Scattered','Arranged in a ring','Absent','In center only'],a:1,e:'Dicot stem: vascular bundles in a ring with cambium (open type). Monocot: scattered.',d:'easy'},
  {q:'Collenchyma provides:',o:['Flexibility and support to growing parts','Only rigidity','Water transport','Food storage'],a:0,e:'Collenchyma has thick corners (pectin). Provides flexibility to growing organs.',d:'easy'},
  {q:'Stomata are found mostly on:',o:['Upper surface of leaf','Lower surface (abaxial)','Stem','Root'],a:1,e:'In most dicots, stomata are more on lower (abaxial) surface of leaf.',d:'easy'},
  {q:'Cork cambium produces:',o:['Xylem','Phloem','Cork (bark)','Leaves'],a:2,e:'Cork cambium (phellogen) produces cork (phellem) outward and phelloderm inward.',d:'medium'},
  {q:'Heartwood is:',o:['Functional for water transport','Dead, dark, non-functional inner wood','Soft outer wood','Living bark'],a:1,e:'Heartwood = non-functional, dark, filled with tannins/resins. Sapwood = functional.',d:'medium'},
],

'bot-6': [ // Cell
  {q:'Fluid mosaic model was proposed by:',o:['Watson and Crick','Singer and Nicolson','Schleiden and Schwann','Robert Hooke'],a:1,e:'Singer and Nicolson (1972) proposed fluid mosaic model of plasma membrane.',d:'easy'},
  {q:'Powerhouse of the cell:',o:['Nucleus','Ribosome','Mitochondria','Golgi body'],a:2,e:'Mitochondria produce ATP through oxidative phosphorylation — "powerhouse of cell".',d:'easy'},
  {q:'Ribosomes are made of:',o:['DNA and protein','RNA and protein','Only RNA','Only protein'],a:1,e:'Ribosomes = rRNA + proteins. 70S (prokaryote: 50S+30S), 80S (eukaryote: 60S+40S).',d:'easy'},
  {q:'Lysosomes contain:',o:['DNA','Hydrolytic enzymes','Starch','Chlorophyll'],a:1,e:'Lysosomes = "suicide bags." Contain hydrolytic (digestive) enzymes for intracellular digestion.',d:'easy'},
  {q:'Cell wall of plant cells is made of:',o:['Chitin','Cellulose','Peptidoglycan','Protein'],a:1,e:'Plant cell wall is primarily made of cellulose (polysaccharide).',d:'easy'},
  {q:'Golgi body function:',o:['Protein synthesis','Packaging and modification of proteins','DNA replication','Photosynthesis'],a:1,e:'Golgi apparatus: packaging, modification, and transport of proteins and lipids.',d:'easy'},
  {q:'Which organelle is absent in animal cells?',o:['Mitochondria','Nucleus','Chloroplast','Ribosome'],a:2,e:'Chloroplasts are found only in plant cells (and some protists). Not in animal cells.',d:'easy'},
  {q:'Osmosis is:',o:['Movement of solute','Movement of water through semipermeable membrane','Active transport','Diffusion of gases'],a:1,e:'Osmosis = movement of water from low solute to high solute across semipermeable membrane.',d:'easy'},
  {q:'Endoplasmic reticulum with ribosomes is called:',o:['Smooth ER','Rough ER','Golgi body','Lysosome'],a:1,e:'RER (Rough ER) has ribosomes attached — site of protein synthesis and processing.',d:'easy'},
  {q:'Centrioles are involved in:',o:['Photosynthesis','Cell division (spindle formation)','Digestion','Secretion'],a:1,e:'Centrioles organize spindle fibers during cell division in animal cells.',d:'easy'},
],

'bot-8': [ // Cell Cycle
  {q:'In which phase does DNA replication occur?',o:['G1','S phase','G2','M phase'],a:1,e:'S (synthesis) phase: DNA replicates. G1 = growth before S. G2 = growth after S.',d:'easy'},
  {q:'Crossing over occurs in which stage of meiosis?',o:['Leptotene','Pachytene','Diplotene','Diakinesis'],a:1,e:'Crossing over occurs in Pachytene stage of Prophase I. Increases genetic variation.',d:'medium'},
  {q:'Chromosomes align at equator in:',o:['Prophase','Metaphase','Anaphase','Telophase'],a:1,e:'Metaphase = chromosomes line up at cell equator (metaphase plate).',d:'easy'},
  {q:'Sister chromatids separate in:',o:['Prophase','Metaphase','Anaphase','Telophase'],a:2,e:'Anaphase = centromeres split, sister chromatids move to opposite poles.',d:'easy'},
  {q:'Meiosis produces:',o:['2 identical cells','4 identical cells','4 genetically different cells','2 different cells'],a:2,e:'Meiosis: one cell → 4 haploid, genetically unique cells (due to crossing over + independent assortment).',d:'easy'},
  {q:'Significance of mitosis:',o:['Genetic variation','Growth and repair','Gamete formation','Evolution'],a:1,e:'Mitosis produces identical cells for growth, repair, and asexual reproduction.',d:'easy'},
  {q:'Cytokinesis in plant cells:',o:['By cleavage furrow','By cell plate formation','Does not occur','By budding'],a:1,e:'Plant cytokinesis: cell plate forms at center and grows outward (centrifugal).',d:'medium'},
  {q:'Number of chromosomes after mitosis:',o:['Half (n)','Same as parent (2n)','Double (4n)','Quarter (n/2)'],a:1,e:'Mitosis is equational division. Daughter cells have same chromosome number as parent.',d:'easy'},
  {q:'Meiosis I is called reductional because:',o:['Cell size reduces','Chromosome number halves from 2n to n','DNA amount reduces','Protein reduces'],a:1,e:'Meiosis I: homologous chromosomes separate → chromosome number halves (2n→n).',d:'easy'},
  {q:'Chiasmata are seen in:',o:['Mitosis','Meiosis (Diplotene)','Both','Neither'],a:1,e:'Chiasmata = X-shaped structures at crossing over points. Visible in Diplotene of Meiosis I.',d:'medium'},
],

'bot-14': [ // Sexual Reproduction in Plants
  {q:'Pollen grain develops from:',o:['Megaspore mother cell','Microspore mother cell','Egg cell','Endosperm'],a:1,e:'Microspore mother cell (2n) undergoes meiosis → 4 microspores → develop into pollen grains.',d:'easy'},
  {q:'Embryo sac has how many cells?',o:['4','6','7','8'],a:2,e:'Mature embryo sac = 7 cells, 8 nuclei (3 antipodals + 2 synergids + 1 egg + 1 central with 2 polar nuclei).',d:'medium'},
  {q:'Endosperm is:',o:['Haploid','Diploid','Triploid','Tetraploid'],a:2,e:'Endosperm = triploid (3n). Formed by fusion of 2 polar nuclei (n+n) with one sperm (n).',d:'medium'},
  {q:'Wind-pollinated flowers have:',o:['Bright colors and nectar','Light pollen, feathery stigma','Heavy pollen','Sticky pollen'],a:1,e:'Anemophily: light/dry pollen, feathery stigma, small flowers, no nectar/scent.',d:'easy'},
  {q:'Self-pollination is prevented by:',o:['Dichogamy','Self-incompatibility','Dioecism','All of these'],a:3,e:'Plants prevent self-pollination through dichogamy (different maturation times), self-incompatibility, dioecism (separate male/female plants).',d:'medium'},
  {q:'Parthenocarpy means:',o:['Seed without fruit','Fruit without seed','Fruit with many seeds','Seedless flower'],a:1,e:'Parthenocarpy = fruit development without fertilization → seedless fruits (e.g., banana).',d:'easy'},
  {q:'Pollination by water is called:',o:['Anemophily','Hydrophily','Entomophily','Zoophily'],a:1,e:'Hydrophily = water pollination. Seen in Vallisneria, Hydrilla.',d:'easy'},
  {q:'The integuments of ovule become:',o:['Fruit wall','Seed coat','Endosperm','Embryo'],a:1,e:'After fertilization: Integuments → seed coat (testa). Ovary wall → fruit wall (pericarp).',d:'easy'},
  {q:'Entry of pollen tube through micropyle:',o:['Porogamy','Chalazogamy','Mesogamy','Apogamy'],a:0,e:'Porogamy = pollen tube enters through micropyle (most common).',d:'medium'},
  {q:'Apomixis is:',o:['Sexual reproduction','Seed formation without fertilization','Vegetative propagation','Pollination'],a:1,e:'Apomixis = asexual seed production without meiosis or fertilization. Important in agriculture.',d:'medium'},
],

'bot-22': [ // Ecosystem
  {q:'10% law was given by:',o:['Odum','Lindeman','Tansley','Haeckel'],a:1,e:'Lindeman (1942) gave 10% law: only 10% of energy transfers to next trophic level.',d:'easy'},
  {q:'Pyramid of energy is:',o:['Always upright','Always inverted','Variable','Flat'],a:0,e:'Pyramid of energy is ALWAYS upright. Energy decreases at each trophic level.',d:'easy'},
  {q:'Primary productivity is measured in:',o:['kg/m²/year or g/m²/year','Calories only','Number of organisms','Biomass only'],a:0,e:'Productivity measured as weight of organic matter produced per unit area per unit time.',d:'easy'},
  {q:'NPP = ?',o:['GPP + R','GPP - R','GPP × R','GPP / R'],a:1,e:'NPP = GPP - Respiration. Net primary productivity = what remains after plants use energy.',d:'easy'},
  {q:'Decomposers are also called:',o:['Producers','Saprotrophs','Herbivores','Autotrophs'],a:1,e:'Decomposers = saprotrophs. Break down dead organic matter (fungi, bacteria).',d:'easy'},
  {q:'In nitrogen cycle, Rhizobium performs:',o:['Nitrification','Denitrification','Nitrogen fixation','Ammonification'],a:2,e:'Rhizobium (in legume root nodules) fixes atmospheric N₂ → NH₃.',d:'easy'},
  {q:'Secondary succession occurs on:',o:['Bare rock','Previously vegetated area destroyed','Water only','Space'],a:1,e:'Secondary succession: on land previously with vegetation (after fire, flood, etc.). Faster than primary.',d:'easy'},
  {q:'Detritus food chain begins with:',o:['Green plants','Dead organic matter','Herbivores','Sunlight'],a:1,e:'Detritus food chain: Dead matter → Decomposers → Detritivores.',d:'easy'},
  {q:'Energy flow in ecosystem is:',o:['Bidirectional','Unidirectional','Circular','Random'],a:1,e:'Energy flows unidirectionally: Sun → Producers → Consumers → Decomposers. Cannot be recycled.',d:'easy'},
  {q:'Inverted pyramid of biomass is seen in:',o:['Forest','Grassland','Ocean/pond','Desert'],a:2,e:'Aquatic ecosystems: Phytoplankton biomass < Zooplankton biomass → inverted pyramid.',d:'medium'},
],

// ═══ NEET ZOOLOGY remaining ═══

'zoo-1': [ // Animal Kingdom
  {q:'Cnidarians have:',o:['Bilateral symmetry','Radial symmetry','No symmetry','Spherical symmetry'],a:1,e:'Cnidarians (Hydra, Jellyfish) have radial symmetry.',d:'easy'},
  {q:'Platyhelminthes are:',o:['Roundworms','Flatworms','Segmented worms','Ribbon worms'],a:1,e:'Platyhelminthes = flatworms (Taenia, Planaria). Dorsoventrally flattened.',d:'easy'},
  {q:'Open circulatory system is found in:',o:['Earthworm','Cockroach','Humans','Fish'],a:1,e:'Arthropods (cockroach) and most molluscs have open circulatory system (hemocoel).',d:'easy'},
  {q:'Which phylum shows metameric segmentation?',o:['Mollusca','Annelida','Porifera','Cnidaria'],a:1,e:'Annelida (earthworm, leech) shows true metameric segmentation (body divided into segments).',d:'easy'},
  {q:'Chordates have:',o:['Exoskeleton','Notochord at some stage','Jointed legs always','Water vascular system'],a:1,e:'All chordates have notochord at some stage of life (replaced by vertebral column in vertebrates).',d:'easy'},
  {q:'Mammary glands are found in:',o:['All vertebrates','Mammals only','Birds and mammals','Reptiles and mammals'],a:1,e:'Mammary glands = unique to mammals. Used for feeding young ones.',d:'easy'},
  {q:'Water vascular system is found in:',o:['Mollusca','Echinodermata','Arthropoda','Annelida'],a:1,e:'Echinoderms (starfish, sea urchin) have unique water vascular system for locomotion.',d:'easy'},
  {q:'Cold-blooded animals are called:',o:['Homeotherms','Poikilotherms','Endotherms','Mesotherms'],a:1,e:'Poikilotherms/Ectotherms = body temp changes with environment. Fishes, amphibians, reptiles.',d:'easy'},
  {q:'Scales in fish are:',o:['Exoskeleton','Endoskeleton','Not skeleton','Cartilage'],a:0,e:'Fish scales = part of exoskeleton (dermal origin).',d:'easy'},
  {q:'Which is NOT a characteristic of mammals?',o:['Hair','Mammary glands','Four-chambered heart','Laying eggs (all mammals)'],a:3,e:'Not all mammals lay eggs. Most are viviparous. Exception: Monotremes (platypus) lay eggs.',d:'easy'},
],

'zoo-3': [ // Digestion
  {q:'Salivary amylase acts on:',o:['Proteins','Starch','Fats','Cellulose'],a:1,e:'Salivary amylase (ptyalin) converts starch → maltose in mouth. Works at pH ~6.8.',d:'easy'},
  {q:'HCl in stomach is secreted by:',o:['Chief cells','Parietal (oxyntic) cells','Goblet cells','G cells'],a:1,e:'Parietal/oxyntic cells secrete HCl. Chief cells secrete pepsinogen.',d:'medium'},
  {q:'Bile is produced by:',o:['Gall bladder','Liver','Pancreas','Stomach'],a:1,e:'Bile is produced by liver, stored in gall bladder. Bile emulsifies fats (no enzymes).',d:'easy'},
  {q:'Absorption of digested food mainly occurs in:',o:['Stomach','Small intestine','Large intestine','Mouth'],a:1,e:'Small intestine (especially ileum) is primary site of absorption. Villi increase surface area.',d:'easy'},
  {q:'Trypsin digests:',o:['Starch','Proteins','Fats','Nucleic acids'],a:1,e:'Trypsin = pancreatic protease. Converts proteins → peptides in small intestine.',d:'easy'},
  {q:'Lipase acts on:',o:['Carbohydrates','Proteins','Fats → fatty acids + glycerol','Nucleic acids'],a:2,e:'Lipase breaks down fats into fatty acids and glycerol.',d:'easy'},
  {q:'Large intestine mainly absorbs:',o:['Proteins','Fats','Water and electrolytes','Glucose'],a:2,e:'Large intestine absorbs water, electrolytes, and some vitamins (produced by bacteria).',d:'easy'},
  {q:'Peristalsis is:',o:['Secretion of enzymes','Wave-like muscular contraction of GI tract','Absorption','Mixing of food'],a:1,e:'Peristalsis = involuntary wave-like muscular contractions that push food through alimentary canal.',d:'easy'},
  {q:'pH of stomach juice:',o:['7','1.5-3.5','5-6','8-9'],a:1,e:'Gastric juice is highly acidic (pH 1.5-3.5) due to HCl. Activates pepsinogen → pepsin.',d:'easy'},
  {q:'Dental formula of adult human:',o:['2123/2123','2102/2102','3132/3132','1111/1111'],a:0,e:'Adult human: 2123/2123 = 2 incisors, 1 canine, 2 premolars, 3 molars per half jaw. Total 32.',d:'medium'},
],

'zoo-4': [ // Breathing
  {q:'Exchange of gases occurs in:',o:['Bronchi','Trachea','Alveoli','Nasal cavity'],a:2,e:'Gas exchange occurs in alveoli — thin walls, rich blood supply, large surface area.',d:'easy'},
  {q:'During inspiration, diaphragm:',o:['Relaxes and moves up','Contracts and moves down','Does not move','Moves sideways'],a:1,e:'Inspiration: diaphragm contracts → flattens → thoracic volume increases → air rushes in.',d:'easy'},
  {q:'Haemoglobin has highest affinity for:',o:['O₂','CO₂','CO','N₂'],a:2,e:'Hb affinity: CO > O₂ (CO affinity is 200-250x more than O₂). That\'s why CO poisoning is dangerous.',d:'medium'},
  {q:'Residual volume is:',o:['Air remaining after normal expiration','Air remaining after forceful expiration','Total lung air','No air'],a:1,e:'RV = air remaining in lungs even after forced expiration ≈ 1100-1200 mL.',d:'medium'},
  {q:'CO₂ is mainly transported as:',o:['Dissolved in plasma','Carbaminohaemoglobin','Bicarbonate ions (70%)','Attached to WBC'],a:2,e:'70% as HCO₃⁻ (bicarbonate), 23% as carbaminohaemoglobin, 7% dissolved.',d:'medium'},
  {q:'Respiratory center is located in:',o:['Cerebrum','Cerebellum','Medulla oblongata','Hypothalamus'],a:2,e:'Respiratory center is in medulla oblongata. Regulates breathing rhythm.',d:'easy'},
  {q:'Tidal volume is approximately:',o:['500 mL','1000 mL','2500 mL','4000 mL'],a:0,e:'Tidal volume = air breathed in/out during normal breathing ≈ 500 mL.',d:'easy'},
  {q:'Vital capacity =',o:['TV + IRV + ERV','TV + RV','IRV + ERV','TV only'],a:0,e:'VC = TV + IRV + ERV ≈ 4000-4500 mL. Maximum air that can be exhaled after maximum inhalation.',d:'easy'},
],

'zoo-6': [ // Excretion
  {q:'Functional unit of kidney:',o:['Nephron','Glomerulus','Loop of Henle','Collecting duct'],a:0,e:'Nephron is the structural and functional unit. Each kidney has ~1 million nephrons.',d:'easy'},
  {q:'Glomerular filtration rate:',o:['25 mL/min','125 mL/min','1250 mL/min','12.5 mL/min'],a:1,e:'GFR ≈ 125 mL/min = 180 L/day. Only 1.5L becomes urine (99% reabsorbed).',d:'easy'},
  {q:'ADH is secreted by:',o:['Adrenal cortex','Posterior pituitary','Anterior pituitary','Kidney'],a:1,e:'ADH (antidiuretic hormone) = from posterior pituitary. Increases water reabsorption in DCT/collecting duct.',d:'medium'},
  {q:'Counter-current mechanism is in:',o:['PCT','DCT','Loop of Henle + vasa recta','Glomerulus'],a:2,e:'Counter-current multiplier (Loop of Henle) + exchanger (vasa recta) concentrates urine.',d:'medium'},
  {q:'Urea is formed in:',o:['Kidney','Liver','Blood','Muscles'],a:1,e:'Urea is synthesized in liver through ornithine cycle (urea cycle). Excreted by kidneys.',d:'easy'},
  {q:'Dialysis is used when:',o:['Lungs fail','Kidneys fail','Heart fails','Liver fails'],a:1,e:'Dialysis = artificial blood filtering when kidneys fail (renal failure).',d:'easy'},
  {q:'Which is NOT a nitrogenous waste?',o:['Urea','Uric acid','Ammonia','Glucose'],a:3,e:'Glucose is not a waste — it\'s a nutrient. Urea, uric acid, ammonia are nitrogenous wastes.',d:'easy'},
  {q:'Ascending limb of Henle is impermeable to:',o:['NaCl','Water','Both','Neither'],a:1,e:'Ascending limb: impermeable to water, permeable to NaCl (actively pumped out). Key for concentration.',d:'medium'},
],

'zoo-7': [ // Locomotion
  {q:'Sliding filament theory explains:',o:['Nerve impulse','Muscle contraction','Bone growth','Joint movement'],a:1,e:'Sliding filament theory: Actin slides over Myosin during muscle contraction.',d:'easy'},
  {q:'Ca²⁺ in muscle contraction:',o:['Provides energy','Binds to troponin, exposing binding sites on actin','Breaks down ATP','Relaxes muscle'],a:1,e:'Ca²⁺ binds troponin → tropomyosin moves → actin\'s myosin-binding sites exposed → contraction.',d:'medium'},
  {q:'Ball and socket joint is found in:',o:['Knee','Shoulder and hip','Elbow','Between vertebrae'],a:1,e:'Ball and socket joint: allows movement in all directions. Found in shoulder and hip.',d:'easy'},
  {q:'Osteoporosis is:',o:['Bone softening','Decreased bone density','Joint inflammation','Muscle wasting'],a:1,e:'Osteoporosis = decreased bone mass/density. Bones become fragile. Common in elderly women.',d:'easy'},
  {q:'Skeletal muscle is:',o:['Involuntary, unstriated','Voluntary, striated','Involuntary, striated','Voluntary, unstriated'],a:1,e:'Skeletal muscle = voluntary, striated (striped). Attached to bones.',d:'easy'},
  {q:'Total bones in adult human:',o:['206','300','106','512'],a:0,e:'Adult human skeleton = 206 bones. Infants have ~270 (some fuse with age).',d:'easy'},
  {q:'Tendon connects:',o:['Bone to bone','Muscle to bone','Muscle to muscle','Skin to bone'],a:1,e:'Tendon connects muscle to bone. Ligament connects bone to bone.',d:'easy'},
  {q:'ATP in muscle contraction is provided by:',o:['Golgi body','Creatine phosphate and mitochondria','Nucleus','ER'],a:1,e:'Immediate: creatine phosphate → ATP. Sustained: mitochondrial oxidative phosphorylation.',d:'medium'},
],

'zoo-8': [ // Neural Control
  {q:'Synapse is:',o:['Gap between two neurons','Gap between two bones','Part of muscle','Part of kidney'],a:0,e:'Synapse = junction between two neurons. Signal transmitted via neurotransmitters.',d:'easy'},
  {q:'Resting membrane potential:',o:['+70 mV','-70 mV','0 mV','-30 mV'],a:1,e:'Resting potential ≈ -70 mV (inside negative relative to outside). Due to K⁺ leak channels.',d:'easy'},
  {q:'Cerebellum controls:',o:['Intelligence','Balance and coordination','Breathing','Hunger'],a:1,e:'Cerebellum: coordinates voluntary movements, balance, posture, muscle tone.',d:'easy'},
  {q:'Neurotransmitter at neuromuscular junction:',o:['Dopamine','Serotonin','Acetylcholine','GABA'],a:2,e:'Acetylcholine (ACh) is released at neuromuscular junction → muscle contraction.',d:'easy'},
  {q:'Reflex arc sequence:',o:['Effector→CNS→Receptor','Receptor→Afferent→CNS→Efferent→Effector','CNS→Receptor→Effector','Random'],a:1,e:'Receptor detects → Afferent (sensory) nerve → CNS processes → Efferent (motor) nerve → Effector responds.',d:'easy'},
  {q:'Rods in retina are for:',o:['Color vision','Dim light/night vision','Near vision','Far vision'],a:1,e:'Rods: dim light vision (scotopic). Cones: bright light + color vision (photopic).',d:'easy'},
  {q:'Hypothalamus controls:',o:['Body temperature, hunger, thirst','Only breathing','Only vision','Only hearing'],a:0,e:'Hypothalamus: thermoregulation, hunger, thirst, sleep, emotions, endocrine control.',d:'easy'},
  {q:'Number of cranial nerves:',o:['10 pairs','12 pairs','31 pairs','8 pairs'],a:1,e:'12 pairs of cranial nerves (from brain). 31 pairs of spinal nerves (from spinal cord).',d:'easy'},
],

'zoo-9': [ // Endocrine
  {q:'Insulin is secreted by:',o:['Alpha cells of pancreas','Beta cells of pancreas','Thyroid','Adrenal'],a:1,e:'Beta cells of Islets of Langerhans secrete insulin → lowers blood glucose.',d:'easy'},
  {q:'Thyroid hormone requires:',o:['Iron','Calcium','Iodine','Zinc'],a:2,e:'Thyroid hormones (T3, T4) require iodine. Deficiency → goitre.',d:'easy'},
  {q:'Fight-or-flight hormone:',o:['Insulin','Adrenaline (Epinephrine)','Thyroxine','Growth hormone'],a:1,e:'Adrenaline from adrenal medulla: increases heart rate, blood pressure, glucose — emergency response.',d:'easy'},
  {q:'Dwarfism is caused by deficiency of:',o:['Insulin','Growth hormone (in childhood)','Thyroxine','ADH'],a:1,e:'GH deficiency in childhood → pituitary dwarfism. Excess → gigantism.',d:'easy'},
  {q:'Diabetes mellitus is due to:',o:['Excess insulin','Deficiency of insulin','Excess thyroxine','Deficiency of ADH'],a:1,e:'Diabetes mellitus: insulin deficiency or resistance → high blood glucose.',d:'easy'},
  {q:'Parathyroid hormone increases:',o:['Blood calcium','Blood glucose','Blood pressure','Body temperature'],a:0,e:'PTH increases blood Ca²⁺ levels (from bones + intestine + kidneys).',d:'easy'},
  {q:'Melatonin is secreted by:',o:['Thyroid','Pineal gland','Pituitary','Adrenal'],a:1,e:'Pineal gland secretes melatonin → regulates sleep-wake cycle (circadian rhythm).',d:'easy'},
  {q:'Exophthalmic goitre is due to:',o:['Hypothyroidism','Hyperthyroidism (Graves\' disease)','Hypoparathyroidism','Diabetes'],a:1,e:'Graves\' disease = hyperthyroidism → exophthalmic goitre (bulging eyes, enlarged thyroid).',d:'medium'},
],

'zoo-12': [ // Human Health
  {q:'AIDS is caused by:',o:['Bacteria','HIV (retrovirus)','Fungus','Protozoan'],a:1,e:'AIDS caused by HIV (Human Immunodeficiency Virus) — a retrovirus attacking CD4+ T cells.',d:'easy'},
  {q:'Malaria is caused by:',o:['Bacteria','Virus','Plasmodium (protozoan)','Fungus'],a:2,e:'Malaria caused by Plasmodium (P. vivax, P. falciparum). Vector: female Anopheles mosquito.',d:'easy'},
  {q:'Active immunity is produced by:',o:['Injection of antibodies','Vaccination (antigens)','Mother\'s milk','Blood transfusion'],a:1,e:'Active immunity: body makes its own antibodies after exposure to antigen (naturally or via vaccine).',d:'easy'},
  {q:'Passive immunity example:',o:['Vaccination','Antibodies in mother\'s milk (colostrum)','Previous infection','Booster dose'],a:1,e:'Passive immunity: readymade antibodies transferred. Colostrum (IgA), placenta (IgG) = passive.',d:'easy'},
  {q:'Interferons are produced against:',o:['Bacteria','Virus','Fungi','Parasites'],a:1,e:'Interferons = proteins produced by virus-infected cells. Protect neighboring cells from viral infection.',d:'easy'},
  {q:'ELISA test detects:',o:['Blood group','HIV antibodies','Malaria','TB'],a:1,e:'ELISA (Enzyme-Linked Immunosorbent Assay) detects HIV antibodies in blood.',d:'easy'},
  {q:'Cancer cells show:',o:['Contact inhibition','Metastasis (uncontrolled spreading)','Normal growth','Apoptosis'],a:1,e:'Cancer cells lose contact inhibition → uncontrolled division + metastasis (spread to other organs).',d:'easy'},
  {q:'Benign tumor is:',o:['Cancerous and spreading','Non-cancerous, localized','Always fatal','Same as malignant'],a:1,e:'Benign = non-cancerous, localized, non-spreading. Malignant = cancerous, metastatic.',d:'easy'},
],

'zoo-13': [ // Human Genetics
  {q:'Sickle cell anemia is:',o:['X-linked','Autosomal recessive','Autosomal dominant','Y-linked'],a:1,e:'Sickle cell anemia: autosomal recessive. HbS due to single base substitution (GAG→GUG).',d:'easy'},
  {q:'Down syndrome has:',o:['45 chromosomes','46 chromosomes','47 chromosomes','48 chromosomes'],a:2,e:'Down syndrome = Trisomy 21. Total 47 chromosomes. Extra chromosome 21.',d:'easy'},
  {q:'Colour blind father and carrier mother — probability of colour blind son:',o:['0%','25%','50%','100%'],a:2,e:'Father: X^c Y, Mother: X^C X^c. Sons: 50% X^C Y (normal), 50% X^c Y (colour blind).',d:'medium'},
  {q:'PKU is caused by deficiency of:',o:['Phenylalanine hydroxylase','Lactase','Insulin','Thyroxine'],a:0,e:'PKU: lack of phenylalanine hydroxylase → phenylalanine accumulates → brain damage.',d:'medium'},
  {q:'Thalassemia is:',o:['Reduced or absent globin chain synthesis','Sickle-shaped RBC','Blood cancer','Clotting disorder'],a:0,e:'Thalassemia: reduced synthesis of α or β globin chains → anemia.',d:'easy'},
  {q:'Pedigree analysis helps in:',o:['Studying evolution','Tracing inheritance pattern in families','Classifying organisms','DNA sequencing'],a:1,e:'Pedigree analysis traces inheritance of a trait through generations in a family.',d:'easy'},
  {q:'XO genotype results in:',o:['Normal male','Normal female','Turner syndrome','Klinefelter syndrome'],a:2,e:'45,X (XO) = Turner syndrome. Female, short, sterile, webbed neck.',d:'easy'},
  {q:'Haemophilia carrier female married to normal male — sons affected:',o:['0%','25%','50%','100%'],a:2,e:'Mother X^H X^h × Father X^H Y → Sons: 50% X^H Y (normal), 50% X^h Y (haemophilic).',d:'medium'},
],

// ═══ NEET PHYSICS remaining ═══

'phy-2': [ // Kinematics
  {q:'A body at rest has speed:',o:['Maximum','Zero','Infinite','Cannot determine'],a:1,e:'At rest means no motion → speed = 0.',d:'easy'},
  {q:'Acceleration due to gravity on earth surface:',o:['9.8 m/s²','10 m/s','8.9 m/s²','11 m/s²'],a:0,e:'g ≈ 9.8 m/s² on Earth surface. Often approximated as 10 m/s² in problems.',d:'easy'},
  {q:'Ball thrown up returns in 4s. Maximum height (g=10):',o:['10m','20m','40m','80m'],a:1,e:'Time up = 2s. H = ½gt² = ½(10)(4) = 20m.',d:'easy'},
  {q:'Distance-time graph for uniform velocity is:',o:['Curved line','Straight line through origin','Horizontal line','Vertical line'],a:1,e:'Uniform velocity → s = vt → straight line through origin in s-t graph.',d:'easy'},
  {q:'Displacement can be:',o:['Only positive','Only negative','Zero, positive, or negative','Only zero'],a:2,e:'Displacement is a vector — can be positive, negative, or zero (if returning to start).',d:'easy'},
  {q:'A body falling freely from height h reaches ground with velocity:',o:['√(gh)','√(2gh)','2gh','gh'],a:1,e:'v² = u² + 2as. v² = 0 + 2gh. v = √(2gh).',d:'easy'},
  {q:'Projectile has horizontal acceleration of:',o:['g','g/2','0','2g'],a:2,e:'No horizontal force (ignoring air resistance) → horizontal acceleration = 0. Only vertical acceleration = g.',d:'easy'},
  {q:'Velocity of a body in free fall after 3s (g=10):',o:['10 m/s','20 m/s','30 m/s','40 m/s'],a:2,e:'v = u + gt = 0 + 10(3) = 30 m/s.',d:'easy'},
],

'phy-3': [ // Laws of Motion
  {q:'Inertia depends on:',o:['Velocity','Mass','Acceleration','Shape'],a:1,e:'Inertia = resistance to change in state of motion. Depends on mass only.',d:'easy'},
  {q:'Action and reaction forces act on:',o:['Same body','Different bodies','No bodies','Same point'],a:1,e:'Newton\'s 3rd law: action-reaction pairs act on DIFFERENT bodies. That\'s why they don\'t cancel.',d:'easy'},
  {q:'Net force on a body in equilibrium:',o:['Maximum','Zero','Equal to weight','Equal to friction'],a:1,e:'In equilibrium: ΣF = 0 (no net force → no acceleration).',d:'easy'},
  {q:'Unit of force:',o:['Joule','Newton','Watt','Pascal'],a:1,e:'Force in SI: Newton (N) = kg⋅m/s².',d:'easy'},
  {q:'Friction force always acts:',o:['In direction of motion','Opposite to relative motion/tendency','Upward','Perpendicular to surface'],a:1,e:'Friction opposes relative motion (or tendency of motion) between surfaces.',d:'easy'},
  {q:'A 5 kg body accelerates at 2 m/s². Force applied:',o:['2.5N','7N','10N','3N'],a:2,e:'F = ma = 5 × 2 = 10 N.',d:'easy'},
  {q:'Centripetal force direction:',o:['Along velocity','Opposite velocity','Toward center','Away from center'],a:2,e:'Centripetal force always points toward center of circular path.',d:'easy'},
  {q:'Apparent weight in lift accelerating upward:',o:['Increases','Decreases','Same','Zero'],a:0,e:'Lift up: N = m(g+a) → apparent weight increases.',d:'easy'},
],

'phy-4': [ // Work, Energy, Power
  {q:'Work done by a force perpendicular to displacement:',o:['Maximum','Minimum','Zero','Infinite'],a:2,e:'W = Fd cosθ. When θ = 90°, cos90° = 0 → W = 0.',d:'easy'},
  {q:'SI unit of work:',o:['Newton','Joule','Watt','Pascal'],a:1,e:'Work = Force × Distance. SI unit: Joule (J) = N⋅m.',d:'easy'},
  {q:'A body of mass 2 kg at height 10m has PE (g=10):',o:['20J','100J','200J','2000J'],a:2,e:'PE = mgh = 2 × 10 × 10 = 200 J.',d:'easy'},
  {q:'KE of a body of mass 4kg moving at 3m/s:',o:['6J','12J','18J','36J'],a:2,e:'KE = ½mv² = ½(4)(9) = 18 J.',d:'easy'},
  {q:'In elastic collision:',o:['Only momentum conserved','Only KE conserved','Both momentum and KE conserved','Neither conserved'],a:2,e:'Elastic collision: both momentum and kinetic energy are conserved.',d:'easy'},
  {q:'Power is:',o:['Work × Time','Force × Distance','Work / Time','Force / Time'],a:2,e:'Power = Work/Time = rate of doing work. SI unit: Watt (W) = J/s.',d:'easy'},
  {q:'1 horsepower =',o:['100 W','746 W','1000 W','500 W'],a:1,e:'1 HP = 746 Watts.',d:'easy'},
  {q:'If velocity doubles, KE becomes:',o:['Double','Triple','Four times','Same'],a:2,e:'KE = ½mv². If v → 2v: KE = ½m(2v)² = 4 × ½mv². KE becomes 4 times.',d:'easy'},
],

// ═══ NEET CHEMISTRY remaining ═══

'chem-2': [ // Atomic Structure
  {q:'Maximum electrons in 3rd shell:',o:['2','8','18','32'],a:2,e:'Max electrons in nth shell = 2n². For n=3: 2(9) = 18.',d:'easy'},
  {q:'Aufbau principle states:',o:['No two electrons have same quantum numbers','Electrons fill lowest energy orbitals first','Electrons pair after all orbitals are half-filled','Orbitals have equal energy'],a:1,e:'Aufbau: electrons fill orbitals in increasing order of energy (1s→2s→2p→3s...).',d:'easy'},
  {q:'Pauli exclusion principle:',o:['Maximum 2 electrons per orbital with opposite spins','Electrons fill lowest first','Half-fill before pairing','No rule'],a:0,e:'Pauli: No two electrons can have all 4 quantum numbers identical. Max 2 per orbital (opposite spins).',d:'easy'},
  {q:'Hund\'s rule:',o:['Fill lowest energy first','Pair electrons first','Maximum multiplicity — half-fill before pairing','No pairing ever'],a:2,e:'Hund: Electrons occupy degenerate orbitals singly (with parallel spins) before pairing.',d:'easy'},
  {q:'Electron configuration of Cu (Z=29):',o:['[Ar]3d⁹4s²','[Ar]3d¹⁰4s¹','[Ar]3d⁸4s²4p¹','[Ar]3d¹⁰4s²'],a:1,e:'Cu exception: [Ar]3d¹⁰4s¹ (completely filled d = extra stable).',d:'medium'},
  {q:'Shape of p-orbital:',o:['Spherical','Dumbbell','Cloverleaf','Linear'],a:1,e:'p-orbital is dumbbell-shaped. s = spherical. d = cloverleaf.',d:'easy'},
  {q:'Quantum number that determines shape:',o:['n (principal)','l (azimuthal)','ml (magnetic)','ms (spin)'],a:1,e:'l (azimuthal/angular momentum) determines shape: l=0(s), l=1(p), l=2(d), l=3(f).',d:'easy'},
  {q:'Heisenberg uncertainty says:',o:['Energy is uncertain','Position and momentum cannot both be precisely known','Speed is always uncertain','Mass changes'],a:1,e:'ΔxΔp ≥ h/4π. Cannot simultaneously determine exact position and momentum of electron.',d:'medium'},
],

'chem-24': [ // Aldehydes, Ketones — NAME REACTIONS
  {q:'Aldol condensation involves:',o:['Two molecules with α-hydrogen','Two molecules without α-hydrogen','Only ketones','Only acids'],a:0,e:'Aldol: two aldehyde/ketone molecules with α-H → β-hydroxy aldehyde/ketone.',d:'medium'},
  {q:'Cannizzaro reaction occurs with:',o:['Aldehydes with α-H','Aldehydes without α-H','Only ketones','Only acids'],a:1,e:'Cannizzaro: aldehyde without α-H + strong base → one molecule oxidized + one reduced.',d:'medium'},
  {q:'Tollen\'s test gives silver mirror with:',o:['Ketones','Aldehydes','Both','Neither'],a:1,e:'Tollen\'s reagent (ammoniacal AgNO₃) + Aldehyde → Ag mirror. Ketones don\'t react.',d:'easy'},
  {q:'Fehling\'s test: red precipitate with:',o:['Aldehydes','Ketones','Both','Alcohols'],a:0,e:'Fehling\'s: Cu²⁺ → Cu₂O (red ppt) with aldehydes. Ketones don\'t reduce Fehling\'s.',d:'easy'},
  {q:'Clemmensen reduction converts C=O to:',o:['C-OH','CH₂ (methylene)','COOH','C-NH₂'],a:1,e:'Clemmensen: C=O → CH₂ using Zn(Hg)/conc. HCl. Removes oxygen from carbonyl.',d:'medium'},
  {q:'Wolff-Kishner reduction uses:',o:['Zn-Hg/HCl','NH₂-NH₂/KOH (hydrazine/base)','LiAlH₄','NaBH₄'],a:1,e:'Wolff-Kishner: C=O + NH₂NH₂ → intermediate → CH₂ (basic conditions with KOH/ethylene glycol).',d:'medium'},
  {q:'Iodoform test is positive for:',o:['All aldehydes','Methyl ketones and acetaldehyde','All ketones','All alcohols'],a:1,e:'Iodoform test: positive for CH₃CO- group (acetaldehyde, methyl ketones, ethanol, 2° alcohols with CH₃).',d:'medium'},
  {q:'Acidity order:',o:['RCOOH > ArOH > ROH > H₂O','ROH > RCOOH > H₂O > ArOH','H₂O > ROH > ArOH > RCOOH','ArOH > RCOOH > ROH > H₂O'],a:0,e:'RCOOH (carboxylic acid) > ArOH (phenol) > ROH (alcohol) > H₂O.',d:'medium'},
  {q:'Rosenmund reduction converts:',o:['Acid → Aldehyde','Acid chloride → Aldehyde','Ester → Alcohol','Ketone → Alcohol'],a:1,e:'Rosenmund: Acid chloride + H₂/Pd-BaSO₄ → Aldehyde (poisoned catalyst prevents over-reduction).',d:'medium'},
  {q:'HVZ reaction involves:',o:['Aldehydes','Carboxylic acids with α-H','Ketones','Alcohols'],a:1,e:'Hell-Volhard-Zelinsky: Carboxylic acid with α-H + X₂/P → α-halocarboxylic acid.',d:'hard'},
],

// ═══ JEE remaining high priority ═══

'jp-13': [ // Electrostatics
  {q:'Coulomb\'s law: F ∝',o:['q₁q₂/r','q₁q₂/r²','q₁+q₂/r²','q₁q₂×r²'],a:1,e:'F = kq₁q₂/r². Force is inversely proportional to square of distance.',d:'easy'},
  {q:'Electric field inside a conductor:',o:['Maximum','Zero','Equal to external field','Infinite'],a:1,e:'Inside a conductor in electrostatic equilibrium, E = 0.',d:'easy'},
  {q:'Gauss\'s law relates:',o:['Electric flux to enclosed charge','Magnetic flux to current','Potential to distance','Charge to current'],a:0,e:'∮E⋅dA = q_enclosed/ε₀. Electric flux through closed surface = charge inside / ε₀.',d:'easy'},
  {q:'Electric potential due to point charge:',o:['V=kq/r','V=kq/r²','V=kqr','V=kq²/r'],a:0,e:'V = kq/r. Potential is scalar. Decreases with distance (for positive charge).',d:'easy'},
  {q:'Capacitance of parallel plate capacitor:',o:['C=εA/d','C=εd/A','C=εAd','C=ε/Ad'],a:0,e:'C = ε₀A/d. Increases with area, decreases with separation.',d:'easy'},
  {q:'Energy stored in capacitor:',o:['U=CV','U=½CV²','U=CV²','U=C/V'],a:1,e:'U = ½CV² = ½QV = Q²/2C.',d:'easy'},
  {q:'Two capacitors C in series:',o:['2C','C','C/2','4C'],a:2,e:'Series: 1/C_eq = 1/C + 1/C = 2/C → C_eq = C/2.',d:'easy'},
  {q:'Electric field lines:',o:['Cross each other','Never cross','Are always parallel','Form closed loops'],a:1,e:'Electric field lines never intersect (would imply two directions at one point).',d:'easy'},
],

'jm-13': [ // Matrices & Determinants
  {q:'If |A| = 0, then A is:',o:['Invertible','Singular','Orthogonal','Symmetric'],a:1,e:'Singular matrix: determinant = 0, non-invertible.',d:'easy'},
  {q:'(AB)⁻¹ =',o:['A⁻¹B⁻¹','B⁻¹A⁻¹','(A⁻¹)(B⁻¹)','AB'],a:1,e:'(AB)⁻¹ = B⁻¹A⁻¹. Reversal law for inverse.',d:'easy'},
  {q:'Determinant of 2×2 matrix [[a,b],[c,d]]:',o:['ad+bc','ad-bc','ac-bd','ab-cd'],a:1,e:'|A| = ad - bc for 2×2 matrix.',d:'easy'},
  {q:'A + Aᵀ is always:',o:['Skew-symmetric','Symmetric','Zero','Singular'],a:1,e:'A + Aᵀ is always symmetric because (A+Aᵀ)ᵀ = Aᵀ+A = A+Aᵀ.',d:'medium'},
  {q:'If A is 3×3 matrix and |A|=5, |3A|=?',o:['15','45','135','5'],a:2,e:'|kA| = kⁿ|A| for n×n matrix. |3A| = 3³×5 = 135.',d:'medium'},
  {q:'Order of matrix multiplication AB: A(m×n), B(n×p) gives:',o:['m×p','n×n','m×n','p×m'],a:0,e:'A(m×n) × B(n×p) = C(m×p). Inner dimensions must match.',d:'easy'},
  {q:'Transpose of transpose: (Aᵀ)ᵀ =',o:['A','Aᵀ','A⁻¹','0'],a:0,e:'Double transpose gives back original matrix: (Aᵀ)ᵀ = A.',d:'easy'},
  {q:'Identity matrix I satisfies:',o:['AI = 0','AI = A','AI = I','AI = A²'],a:1,e:'AI = IA = A. Identity matrix is multiplicative identity.',d:'easy'},
],

// ═══ CLAT remaining ═══

'clo-1': [ // Syllogisms
  {q:'All A are B. All B are C. Therefore:',o:['All C are A','All A are C','Some C are A','No A are C'],a:1,e:'All A⊂B⊂C. Therefore All A are C (transitive). Some C are A is also true.',d:'easy'},
  {q:'No A are B. All B are C. Therefore:',o:['No A are C','Some C are not A','All A are C','No conclusion'],a:1,e:'No A are B + All B are C → Some C are not A (at minimum).',d:'medium'},
  {q:'Some A are B. Some B are C. Therefore:',o:['Some A are C','All A are C','No A are C','No definite conclusion'],a:3,e:'Two particular (some) premises give no definite conclusion. Need at least one universal.',d:'medium'},
  {q:'All dogs are animals. Rex is a dog. Therefore:',o:['All animals are dogs','Rex is an animal','Rex is not a dog','Dogs are Rex'],a:1,e:'Universal + particular → Rex ∈ dogs ⊂ animals → Rex is an animal.',d:'easy'},
  {q:'If all roses are flowers and some flowers are red, then:',o:['All roses are red','Some roses are red','No definite conclusion about roses being red','No roses are red'],a:2,e:'Cannot conclude anything about roses being red. "Some flowers are red" doesn\'t specify which.',d:'medium'},
  {q:'Statement: All politicians are honest. Conclusion: Some honest people are politicians.',o:['Follows','Does not follow','Partially follows','Cannot determine'],a:0,e:'If All A are B → Some B are A (converse). This always follows.',d:'easy'},
  {q:'No fish can fly. Some birds can fly. Therefore:',o:['Some birds are not fish','All birds are fish','No birds are fish','All fish are birds'],a:0,e:'Since some birds fly and no fish fly → those flying birds are definitely not fish.',d:'easy'},
  {q:'All cats are mammals. No mammals are insects. Therefore:',o:['No cats are insects','Some cats are insects','All insects are cats','No conclusion'],a:0,e:'Cats ⊂ Mammals, Mammals ∩ Insects = ∅ → Cats ∩ Insects = ∅.',d:'easy'},
],

'cq-1': [ // Quantitative — Percentage, Ratio
  {q:'25% of 400:',o:['100','50','200','75'],a:0,e:'25/100 × 400 = 100.',d:'easy'},
  {q:'If CP=₹500, SP=₹600, profit%:',o:['10%','20%','25%','15%'],a:1,e:'Profit = 600-500 = ₹100. Profit% = 100/500 × 100 = 20%.',d:'easy'},
  {q:'Ratio 2:3, total 50. Larger part:',o:['20','25','30','35'],a:2,e:'Total parts = 5. Larger = 3/5 × 50 = 30.',d:'easy'},
  {q:'SI on ₹10,000 at 5% for 3 years:',o:['₹500','₹1,000','₹1,500','₹2,000'],a:2,e:'SI = PNR/100 = 10000×3×5/100 = ₹1,500.',d:'easy'},
  {q:'A is twice as old as B. After 10 years, A will be 1.5 times B. B\'s age:',o:['10','20','30','40'],a:1,e:'A=2B. After 10: 2B+10 = 1.5(B+10) → 2B+10 = 1.5B+15 → 0.5B=5 → B=10. Wait let me recheck... B=10, A=20. After 10: A=30, B=20. 30/20=1.5. Yes B=10.',d:'medium'},
  {q:'A train 100m long passes pole in 10s. Speed:',o:['10 m/s','100 m/s','5 m/s','20 m/s'],a:0,e:'Speed = Distance/Time = 100/10 = 10 m/s = 36 km/h.',d:'easy'},
  {q:'If A can do work in 10 days, B in 15 days, together:',o:['5 days','6 days','25 days','12 days'],a:1,e:'A rate=1/10, B rate=1/15. Together=1/10+1/15=5/30=1/6. Time=6 days.',d:'easy'},
  {q:'30% of a number is 45. The number is:',o:['100','135','150','200'],a:2,e:'30/100 × x = 45. x = 45×100/30 = 150.',d:'easy'},
],

'cq-2': [ // Data Interpretation
  {q:'Bar chart shows: Mon=10, Tue=15, Wed=20, Thu=25, Fri=30. Average:',o:['15','20','25','30'],a:1,e:'Average = (10+15+20+25+30)/5 = 100/5 = 20.',d:'easy'},
  {q:'Pie chart: Education 30%, Health 25%, Defence 20%, Others 25%. If total ₹200Cr, Education:',o:['₹30Cr','₹50Cr','₹60Cr','₹25Cr'],a:2,e:'30% of 200 = ₹60 Cr.',d:'easy'},
  {q:'Sales increased from 100 to 125. Growth%:',o:['20%','25%','30%','12.5%'],a:1,e:'Growth = (125-100)/100 × 100 = 25%.',d:'easy'},
  {q:'Line graph shows: 2020=50, 2021=60, 2022=75. Highest growth year:',o:['2020','2021 (20%)','2022 (25%)','All same'],a:2,e:'2021 growth: (60-50)/50=20%. 2022 growth: (75-60)/60=25%. 2022 highest.',d:'easy'},
  {q:'Table: A=40, B=60, C=100. B as % of total:',o:['20%','30%','40%','60%'],a:1,e:'Total=200. B%=60/200×100=30%.',d:'easy'},
  {q:'If revenue in Q1=₹10Cr, Q2=₹15Cr, Q3=₹20Cr, Q4=₹25Cr. H2 as % of annual:',o:['35.7%','50%','64.3%','71.4%'],a:2,e:'Annual=70Cr. H2(Q3+Q4)=45Cr. 45/70×100≈64.3%.',d:'medium'},
  {q:'Average of 5 numbers is 20. If one number removed, average becomes 18. Removed number:',o:['20','24','28','30'],a:2,e:'Total=5×20=100. New total=4×18=72. Removed=100-72=28.',d:'easy'},
  {q:'Population increased from 1 lakh to 1.21 lakh in 2 years at compound rate. Rate:',o:['10%','11%','20%','21%'],a:0,e:'1.21 = 1(1+r/100)². (1+r/100)²=1.21. 1+r/100=1.1. r=10%.',d:'medium'},
],

// ═══ NEET BOTANY — remaining ═══

'bot-7': [{q:'Enzymes are:',o:['Lipids','Proteins (biological catalysts)','Carbohydrates','Nucleic acids'],a:1,e:'Enzymes are proteins that catalyze biochemical reactions.',d:'easy'},{q:'Lock and key model was proposed by:',o:['Koshland','Emil Fischer','Watson','Crick'],a:1,e:'Emil Fischer proposed lock and key model of enzyme action.',d:'easy'},{q:'Enzyme activity is maximum at:',o:['Very high temperature','Optimum temperature and pH','0°C','100°C'],a:1,e:'Each enzyme has optimum temperature and pH for maximum activity.',d:'easy'},{q:'Starch is a:',o:['Monosaccharide','Disaccharide','Polysaccharide','Amino acid'],a:2,e:'Starch is a polysaccharide (polymer of glucose). Storage form in plants.',d:'easy'},{q:'DNA is a polymer of:',o:['Amino acids','Nucleotides','Fatty acids','Glucose'],a:1,e:'DNA = polymer of deoxyribonucleotides (sugar + phosphate + base).',d:'easy'},{q:'Primary structure of protein is:',o:['3D shape','Linear sequence of amino acids','Helix','Sheet'],a:1,e:'Primary = sequence of amino acids in polypeptide chain.',d:'easy'},{q:'Competitive inhibitor binds to:',o:['Allosteric site','Active site','Substrate','Product'],a:1,e:'Competitive inhibitor competes with substrate for the active site.',d:'medium'},{q:'Sucrose is made of:',o:['Glucose + Glucose','Glucose + Fructose','Glucose + Galactose','Fructose + Fructose'],a:1,e:'Sucrose = Glucose + Fructose (table sugar).',d:'easy'}],

'bot-9': [{q:'Transpiration pull theory was given by:',o:['Dixon and Joly','Münch','Priestley','Sachs'],a:0,e:'Dixon and Joly proposed cohesion-tension (transpiration pull) theory.',d:'medium'},{q:'Root pressure is maximum during:',o:['Hot dry day','Early morning (high humidity)','Noon','Night'],a:1,e:'Root pressure is maximum early morning when transpiration is low and soil moisture high.',d:'medium'},{q:'Water potential of pure water at standard conditions:',o:['Positive','Negative','Zero','Infinite'],a:2,e:'Pure water at standard conditions has water potential (Ψ) = 0.',d:'easy'},{q:'Guttation is loss of water in:',o:['Vapour form','Liquid form through hydathodes','Ice form','Through stomata'],a:1,e:'Guttation = loss of water in liquid form through hydathodes at leaf margins.',d:'easy'},{q:'Xylem transport is mostly:',o:['Bidirectional','Unidirectional (upward)','Downward','Random'],a:1,e:'Xylem transports water and minerals unidirectionally from roots to leaves.',d:'easy'},{q:'Plasmolysis occurs when cell is placed in:',o:['Hypotonic solution','Hypertonic solution','Isotonic solution','Pure water'],a:1,e:'Hypertonic solution: water leaves cell → plasma membrane shrinks away from wall = plasmolysis.',d:'easy'},{q:'Phloem transport is called:',o:['Transpiration','Translocation','Imbibition','Osmosis'],a:1,e:'Translocation = transport of food (sucrose) through phloem from source to sink.',d:'easy'},{q:'Münch hypothesis explains:',o:['Water absorption','Phloem translocation (mass flow)','Transpiration','Guttation'],a:1,e:'Münch mass flow hypothesis: pressure gradient drives phloem transport.',d:'medium'}],

'bot-10': [{q:'Essential elements were defined by:',o:['Mendel','Arnon and Stout','Darwin','Linnaeus'],a:1,e:'Arnon and Stout gave criteria for essentiality of elements.',d:'medium'},{q:'Nitrogen deficiency causes:',o:['Chlorosis (yellowing) of older leaves','Red leaves','Blue leaves','No effect'],a:0,e:'N is mobile. Deficiency → chlorosis in older leaves first (N moves to younger leaves).',d:'easy'},{q:'Rhizobium fixes nitrogen in:',o:['All plant roots','Legume root nodules','Leaves','Stems'],a:1,e:'Rhizobium = symbiotic N₂ fixer in root nodules of legumes (pea, bean, groundnut).',d:'easy'},{q:'Nitrogenase enzyme requires:',o:['Aerobic conditions','Anaerobic conditions (O₂ sensitive)','Acidic pH','High temperature'],a:1,e:'Nitrogenase is inactivated by O₂. Leghaemoglobin in nodules scavenges O₂.',d:'medium'},{q:'Which is a micronutrient?',o:['Nitrogen','Phosphorus','Iron','Potassium'],a:2,e:'Fe, Mn, Cu, Zn, B, Mo, Cl = micronutrients. N, P, K, Ca, Mg, S = macronutrients.',d:'easy'},{q:'Magnesium is component of:',o:['Haemoglobin','Chlorophyll','Cytochrome','Insulin'],a:1,e:'Mg is central atom in chlorophyll molecule (like Fe in haemoglobin).',d:'easy'},{q:'Potassium deficiency causes:',o:['Chlorosis','Necrosis at leaf margins','Root rot','Stem elongation'],a:1,e:'K deficiency: browning/scorching of leaf margins (necrosis). K is mobile.',d:'medium'},{q:'Phosphorus is important for:',o:['Cell wall formation','ATP, nucleic acids, phospholipids','Chlorophyll synthesis','Water absorption'],a:1,e:'P is component of ATP, DNA, RNA, phospholipids. Essential for energy transfer.',d:'easy'}],

'bot-12': [{q:'Glycolysis occurs in:',o:['Mitochondria','Cytoplasm','Chloroplast','Nucleus'],a:1,e:'Glycolysis occurs in cytoplasm. Does not require O₂.',d:'easy'},{q:'Net ATP from glycolysis:',o:['2','4','36','38'],a:0,e:'Glycolysis: 4 ATP produced - 2 ATP used = 2 net ATP.',d:'easy'},{q:'Krebs cycle occurs in:',o:['Cytoplasm','Mitochondrial matrix','Chloroplast','ER'],a:1,e:'Krebs cycle (citric acid cycle) occurs in mitochondrial matrix.',d:'easy'},{q:'Total ATP per glucose from aerobic respiration:',o:['2','18','36-38','100'],a:2,e:'Complete oxidation: Glycolysis(2) + Krebs(2) + ETC(32-34) = 36-38 ATP.',d:'easy'},{q:'Fermentation produces:',o:['36 ATP','2 ATP','0 ATP','18 ATP'],a:1,e:'Fermentation = anaerobic. Only glycolysis ATP = 2 net ATP.',d:'easy'},{q:'RQ for carbohydrates:',o:['0.7','0.8','1.0','1.3'],a:2,e:'RQ = CO₂/O₂. For carbohydrates RQ = 1.0. Fats < 1. Organic acids > 1.',d:'medium'},{q:'ETC is located in:',o:['Outer mitochondrial membrane','Inner mitochondrial membrane','Matrix','Cytoplasm'],a:1,e:'Electron Transport Chain is on inner mitochondrial membrane (cristae).',d:'easy'},{q:'End product of alcoholic fermentation:',o:['Lactic acid','Ethanol and CO₂','Acetic acid','Pyruvic acid'],a:1,e:'Alcoholic fermentation: Pyruvate → Ethanol + CO₂ (by yeast).',d:'easy'}],

'bot-13': [{q:'Auxin is produced in:',o:['Root tip','Shoot apex','Leaves','Flowers'],a:1,e:'Auxin (IAA) is synthesized in shoot apical meristem and young leaves.',d:'easy'},{q:'Gibberellin causes:',o:['Root growth','Stem elongation and bolting','Leaf fall','Seed dormancy'],a:1,e:'Gibberellins promote stem elongation, bolting in rosette plants, break seed dormancy.',d:'easy'},{q:'ABA is called stress hormone because:',o:['It causes growth','It helps plants respond to stress (drought)','It causes flowering','It produces fruit'],a:1,e:'ABA: closes stomata during water stress, inhibits growth, promotes dormancy.',d:'easy'},{q:'Ethylene promotes:',o:['Stem elongation','Fruit ripening','Root growth','Seed dormancy'],a:1,e:'Ethylene: gaseous hormone, promotes fruit ripening, senescence, abscission.',d:'easy'},{q:'Photoperiodism was first studied in:',o:['Pea','Tobacco (Maryland Mammoth)','Rice','Wheat'],a:1,e:'Garner and Allard studied photoperiodism in Maryland Mammoth tobacco.',d:'medium'},{q:'Short day plants flower when:',o:['Day length > critical','Night length > critical','Day = Night','Always'],a:1,e:'SDP actually respond to long uninterrupted dark period (night > critical length).',d:'medium'},{q:'Vernalization is:',o:['Heat treatment','Cold treatment for flowering','Light treatment','Chemical treatment'],a:1,e:'Vernalization = low temperature treatment to induce flowering (e.g., wheat, biennial plants).',d:'easy'},{q:'Cytokinin promotes:',o:['Cell division','Stem elongation','Fruit ripening','Leaf fall'],a:0,e:'Cytokinins promote cell division (cytokinesis), delay senescence.',d:'easy'}],

'bot-17': [{q:'Oparin-Haldane theory is about:',o:['Evolution of species','Origin of life (chemical evolution)','Classification','Genetics'],a:1,e:'Oparin-Haldane: life originated from chemical evolution in primordial soup.',d:'easy'},{q:'Miller-Urey experiment simulated:',o:['Space conditions','Early Earth atmosphere','Modern atmosphere','Ocean floor'],a:1,e:'Miller-Urey simulated early Earth (CH₄, NH₃, H₂O, H₂ + electric discharge) → amino acids formed.',d:'easy'},{q:'Hardy-Weinberg equilibrium is disturbed by:',o:['Large population','Random mating','Gene flow and selection','No mutation'],a:2,e:'Factors disturbing HW: gene flow, drift, mutation, selection, non-random mating.',d:'medium'},{q:'Homologous organs suggest:',o:['Different origin, same function','Same origin, different function (divergent evolution)','No relation','Convergent evolution'],a:1,e:'Homologous = same origin, different function. E.g., forelimbs of whale, bat, human.',d:'easy'},{q:'Industrial melanism in peppered moth is example of:',o:['Artificial selection','Natural selection','Genetic drift','Gene flow'],a:1,e:'Dark moths survived better on soot-covered trees = natural selection.',d:'easy'},{q:'Fossil study is called:',o:['Taxonomy','Paleontology','Ecology','Genetics'],a:1,e:'Paleontology = study of fossils. Provides evidence for evolution.',d:'easy'},{q:'Genetic drift is significant in:',o:['Large populations','Small populations','All populations equally','No populations'],a:1,e:'Genetic drift: random change in allele frequency. Significant in small populations.',d:'easy'},{q:'Speciation due to geographic isolation:',o:['Sympatric','Allopatric','Peripatric','Parapatric'],a:1,e:'Allopatric speciation: geographic barrier isolates populations → different species evolve.',d:'medium'}],

'bot-18': [{q:'Penicillin was discovered by:',o:['Pasteur','Alexander Fleming','Koch','Lister'],a:1,e:'Alexander Fleming discovered penicillin from Penicillium notatum (1928).',d:'easy'},{q:'Lactobacillus is used in making:',o:['Bread','Curd/Yogurt','Wine','Vinegar'],a:1,e:'Lactobacillus converts milk into curd by producing lactic acid.',d:'easy'},{q:'Biogas mainly contains:',o:['CO₂','O₂','Methane (CH₄)','N₂'],a:2,e:'Biogas = mainly methane (CH₄). Produced by methanogenic bacteria (Methanobacterium).',d:'easy'},{q:'BOD stands for:',o:['Biochemical Oxygen Demand','Biological Oxygen Deficit','Basic Oxygen Dose','Both Oxygen Demand'],a:0,e:'BOD = Biochemical Oxygen Demand. Higher BOD = more polluted water.',d:'easy'},{q:'Activated sludge is used in:',o:['Primary treatment','Secondary (biological) treatment','Tertiary treatment','No treatment'],a:1,e:'Secondary treatment: activated sludge (microbes) decomposes organic waste aerobically.',d:'easy'},{q:'Bt toxin is from:',o:['Bacillus thuringiensis','E. coli','Rhizobium','Agrobacterium'],a:0,e:'Bt toxin (Cry protein) from Bacillus thuringiensis. Used in GM crops.',d:'easy'},{q:'Mycorrhiza helps plants absorb:',o:['Nitrogen','Phosphorus','Iron','Calcium'],a:1,e:'Mycorrhiza = fungus + root association. Helps plant absorb phosphorus.',d:'easy'},{q:'Yeast is used in:',o:['Curd making','Bread and alcohol production','Vaccine production','Antibiotic production'],a:1,e:'Saccharomyces cerevisiae (yeast) used in bread (CO₂ for rising) and alcohol (ethanol).',d:'easy'}],

'bot-19': [{q:'Restriction enzymes are also called:',o:['Molecular scissors','Molecular glue','Molecular rulers','Molecular motors'],a:0,e:'Restriction enzymes cut DNA at specific recognition sites = molecular scissors.',d:'easy'},{q:'EcoRI recognizes:',o:['AATTCC','GAATTC','TTAAGG','CCTTAA'],a:1,e:'EcoRI recognizes palindrome GAATTC and cuts between G and A.',d:'easy'},{q:'PCR stands for:',o:['Primary Chain Reaction','Polymerase Chain Reaction','Protein Catalytic Reaction','Plasmid Copy Replication'],a:1,e:'PCR = Polymerase Chain Reaction. Amplifies specific DNA segment.',d:'easy'},{q:'PCR uses which enzyme?',o:['DNA ligase','Taq polymerase (thermostable)','RNA polymerase','Reverse transcriptase'],a:1,e:'Taq polymerase from Thermus aquaticus. Works at high temperature (94°C denaturation).',d:'easy'},{q:'Gel electrophoresis separates DNA by:',o:['Color','Size (smaller moves faster)','Weight only','Charge only'],a:1,e:'DNA fragments separated by size. Smaller fragments migrate faster through agarose gel.',d:'easy'},{q:'Vector in genetic engineering:',o:['Insect that spreads disease','Vehicle to carry foreign DNA into host','Protein carrier','RNA molecule'],a:1,e:'Vector = DNA molecule that carries foreign DNA into host cell (plasmid, phage).',d:'easy'},{q:'Selectable marker in pBR322:',o:['Ampicillin and Tetracycline resistance genes','Only ampicillin','Only tetracycline','Kanamycin'],a:0,e:'pBR322 has amp^R and tet^R genes as selectable markers.',d:'medium'},{q:'Sticky ends are produced by:',o:['Ligase','Restriction enzymes (staggered cut)','Polymerase','Helicase'],a:1,e:'Restriction enzymes making staggered cuts produce sticky (cohesive) ends with overhangs.',d:'easy'}],

'bot-20': [{q:'Bt cotton contains:',o:['CryIAc and CryIIAb genes','Human insulin gene','GFP gene','Vitamin A gene'],a:0,e:'Bt cotton: CryIAc (bollworm) + CryIIAb (bollworm) genes from Bacillus thuringiensis.',d:'medium'},{q:'Golden rice is rich in:',o:['Iron','Vitamin A (β-carotene)','Vitamin C','Protein'],a:1,e:'Golden rice = genetically engineered with β-carotene (provitamin A) genes.',d:'easy'},{q:'Gene therapy for ADA deficiency involves:',o:['Adding ADA gene to lymphocytes','Removing all lymphocytes','Blood transfusion only','Bone transplant'],a:0,e:'ADA deficiency: functional ADA gene inserted into patient\'s lymphocytes using retroviral vector.',d:'medium'},{q:'Transgenic animals are used for:',o:['Food production only','Testing drug safety, studying disease','Pet keeping','Farming only'],a:1,e:'Transgenic animals: test drug toxicity, study disease models, produce biological products.',d:'easy'},{q:'Biopiracy refers to:',o:['Stealing bio-weapons','Unauthorized use of biological resources/traditional knowledge','Piracy in oceans','Stealing pets'],a:1,e:'Biopiracy = exploitation of biological resources and traditional knowledge without permission/payment.',d:'easy'},{q:'Cry protein becomes active in:',o:['Acidic pH of stomach','Alkaline pH of insect gut','Neutral pH','At any pH'],a:1,e:'Cry protein is protoxin → activated by alkaline pH in insect midgut → forms pores → kills insect.',d:'medium'},{q:'RNA interference (RNAi) is used in:',o:['PCR','Silencing specific genes','DNA replication','Protein synthesis'],a:1,e:'RNAi: complementary dsRNA silences specific mRNA → gene silencing. Used in pest-resistant plants.',d:'medium'},{q:'GEAC stands for:',o:['Genetic Engineering Approval Committee','Gene Expression Analysis Center','Genome Editing Advisory Council','General Engineering Assessment Committee'],a:0,e:'GEAC = Genetic Engineering Approval Committee. Approves GM organisms in India.',d:'medium'}],

'bot-21': [{q:'Natality refers to:',o:['Death rate','Birth rate','Immigration','Emigration'],a:1,e:'Natality = birth rate. Mortality = death rate.',d:'easy'},{q:'J-shaped growth curve represents:',o:['Logistic growth','Exponential growth','Declining population','Stable population'],a:1,e:'J-curve = exponential growth (unlimited resources). dN/dt = rN.',d:'easy'},{q:'Carrying capacity (K) is:',o:['Maximum births','Maximum population an environment can sustain','Maximum area','Minimum population'],a:1,e:'K = carrying capacity. Maximum population size that environment can sustain indefinitely.',d:'easy'},{q:'Mutualism example:',o:['Lion and deer','Lichen (alga + fungus)','Mosquito and human','Cuckoo and crow'],a:1,e:'Lichen = mutualism. Alga provides food (photosynthesis), Fungus provides shelter/moisture.',d:'easy'},{q:'Parasitism is:',o:['+/+ interaction','+/- interaction','-/- interaction','0/+ interaction'],a:1,e:'Parasitism: parasite benefits (+), host is harmed (-). E.g., tapeworm in human.',d:'easy'},{q:'Competitive exclusion principle was given by:',o:['Darwin','Gause','Odum','Tansley'],a:1,e:'Gause\'s competitive exclusion: two species competing for same resource cannot coexist indefinitely.',d:'medium'},{q:'Commensalism example:',o:['Barnacles on whale','Tiger and deer','Lichen','Mycorrhiza'],a:0,e:'Barnacles on whale: barnacle benefits (transport), whale unaffected. +/0 interaction.',d:'easy'},{q:'r-selected species have:',o:['Few offspring, high parental care','Many offspring, little parental care','No reproduction','Slow growth'],a:1,e:'r-selected: many offspring, little care, early maturity (insects, weeds). K-selected: opposite.',d:'medium'}],

'bot-23': [{q:'Biodiversity hotspot requires:',o:['High species richness + high endemism + habitat loss','Only high species count','Only large area','Only endangered species'],a:0,e:'Hotspot criteria: >1500 endemic vascular plants + >70% habitat loss.',d:'medium'},{q:'India has how many biodiversity hotspots?',o:['2','4','6','8'],a:1,e:'India: 4 hotspots — Western Ghats, Eastern Himalayas, Indo-Burma, Sundaland.',d:'easy'},{q:'In situ conservation means:',o:['Conservation in lab','Conservation in natural habitat','Conservation in zoo','Conservation in seed bank'],a:1,e:'In situ = in natural habitat. National parks, wildlife sanctuaries, biosphere reserves.',d:'easy'},{q:'Ex situ conservation example:',o:['National park','Wildlife sanctuary','Zoo and botanical garden','Biosphere reserve'],a:2,e:'Ex situ = outside natural habitat. Zoos, botanical gardens, seed banks, cryopreservation.',d:'easy'},{q:'Species-area relationship: log S = log C + Z log A. Typical Z value:',o:['0.1-0.2','0.2-0.5','1-2','5-10'],a:0,e:'Z (regression coefficient) typically 0.1-0.2 for small areas, 0.6-1.2 for very large areas.',d:'hard'},{q:'Red Data Book lists:',o:['Common species','Endangered species','Extinct species only','All species'],a:1,e:'Red Data Book (IUCN Red List) lists threatened/endangered species worldwide.',d:'easy'},{q:'Sacred groves are example of:',o:['Ex situ conservation','In situ conservation by communities','Deforestation','Agriculture'],a:1,e:'Sacred groves: patches of forest protected by local communities for religious reasons = in situ.',d:'easy'},{q:'Loss of biodiversity is mainly due to:',o:['Habitat loss and fragmentation','Climate only','Pollution only','Hunting only'],a:0,e:'Major cause: habitat loss/fragmentation (HIPPO: Habitat, Invasive, Pollution, Population, Overexploitation).',d:'easy'}],

'bot-24': [{q:'Eutrophication is caused by:',o:['Oil spills','Excess nutrients (N, P) in water','Radioactive waste','Noise'],a:1,e:'Eutrophication: excess N and P → algal bloom → O₂ depletion → fish death.',d:'easy'},{q:'Biomagnification means:',o:['Increasing toxin concentration up food chain','Decreasing toxins','Neutral effect','Toxins only in water'],a:0,e:'Biomagnification: concentration of non-degradable toxins (DDT, mercury) increases at each trophic level.',d:'easy'},{q:'Ozone layer is in:',o:['Troposphere','Stratosphere','Mesosphere','Thermosphere'],a:1,e:'Ozone layer is in stratosphere (15-35 km). Absorbs UV-B radiation.',d:'easy'},{q:'Montreal Protocol deals with:',o:['Global warming','Ozone depletion (phasing out CFCs)','Biodiversity','Wetlands'],a:1,e:'Montreal Protocol (1987): international treaty to phase out ozone-depleting substances (CFCs).',d:'easy'},{q:'Greenhouse gases include:',o:['O₂ and N₂','CO₂, CH₃, N₂O, CFCs','Only CO₂','Only water vapor'],a:1,e:'Major greenhouse gases: CO₂, CH₄, N₂O, CFCs, O₃. Trap heat in atmosphere.',d:'easy'},{q:'BOD measures:',o:['Acidity of water','Amount of O₂ needed by microbes to decompose organic matter','Dissolved O₂','Temperature'],a:1,e:'BOD = O₂ consumed by microbes to decompose organic matter. High BOD = polluted water.',d:'easy'},{q:'Chipko movement was for:',o:['Water conservation','Forest conservation (tree hugging)','Air quality','Wildlife protection'],a:1,e:'Chipko movement: hugging trees to prevent deforestation. Started in Uttarakhand (1970s).',d:'easy'},{q:'E-waste contains:',o:['Only plastic','Heavy metals (Pb, Hg, Cd) and toxic chemicals','Only glass','Only paper'],a:1,e:'E-waste from electronics contains lead, mercury, cadmium — hazardous to health and environment.',d:'easy'}],

'zoo-2': [
  {q:"Epithelial tissue covers:",o:["Internal organs only", "Body surfaces and lines cavities", "Only skin", "Only blood vessels"],a:1,e:"Epithelial tissue covers body surfaces, lines cavities and organs.",d:"easy"},
  {q:"Connective tissue includes:",o:["Blood, bone, cartilage", "Only blood", "Only bone", "Only cartilage"],a:0,e:"Connective tissue: blood, bone, cartilage, tendons, ligaments, adipose.",d:"easy"},
  {q:"Cardiac muscle is:",o:["Voluntary, striated", "Involuntary, striated", "Voluntary, unstriated", "Involuntary, unstriated"],a:1,e:"Cardiac muscle: involuntary (automatic) but striated (striped). Found only in heart.",d:"easy"},
  {q:"Cockroach has:",o:["Open circulatory system", "Closed circulatory system", "No circulatory system", "Both"],a:0,e:"Cockroach (arthropod) has open circulatory system with hemocoel.",d:"easy"},
  {q:"Goblet cells secrete:",o:["HCl", "Mucus", "Enzymes", "Hormones"],a:1,e:"Goblet cells are unicellular glands that secrete mucus.",d:"easy"},
  {q:"Simple squamous epithelium is found in:",o:["Stomach lining", "Blood vessels (endothelium)", "Skin surface", "Trachea"],a:1,e:"Simple squamous: thin, flat cells. Found in blood vessels, alveoli, Bowman capsule.",d:"medium"},
  {q:"Adipose tissue stores:",o:["Water", "Fat", "Protein", "Minerals"],a:1,e:"Adipose tissue: specialized connective tissue that stores fat. Insulation and energy.",d:"easy"},
  {q:"Blood is a type of:",o:["Epithelial tissue", "Connective tissue", "Muscle tissue", "Nervous tissue"],a:1,e:"Blood is a fluid connective tissue with plasma (matrix) and formed elements.",d:"easy"}
],

'zoo-11': [
  {q:"IUD stands for:",o:["Internal Uterine Device", "Intra Uterine Device", "Internal Urinary Device", "Intra Urinary Duct"],a:1,e:"IUD = Intra Uterine Device. Copper-T, LNG-20 are examples.",d:"easy"},
  {q:"Vasectomy is done in:",o:["Males", "Females", "Both", "Neither"],a:0,e:"Vasectomy: cutting/tying vas deferens in males. Tubectomy: fallopian tubes in females.",d:"easy"},
  {q:"Oral contraceptive pills contain:",o:["Antibiotics", "Synthetic hormones (estrogen + progesterone)", "Vitamins", "Painkillers"],a:1,e:"OC pills: synthetic progesterone + estrogen. Prevent ovulation.",d:"easy"},
  {q:"IVF stands for:",o:["In Vivo Fertilization", "In Vitro Fertilization", "Internal Vital Function", "Intra Venous Fluid"],a:1,e:"IVF = In Vitro Fertilization (test tube baby). Fertilization outside body in lab.",d:"easy"},
  {q:"AIDS is transmitted through:",o:["Air", "Sexual contact, blood, mother to child", "Mosquito bite", "Water"],a:1,e:"HIV transmission: unprotected sex, contaminated blood/needles, mother to child.",d:"easy"},
  {q:"Emergency contraceptive must be taken within:",o:["24 hours", "72 hours", "1 week", "1 month"],a:1,e:"Emergency contraceptive (morning-after pill) effective within 72 hours of unprotected sex.",d:"easy"},
  {q:"Natural family planning method:",o:["Condom", "Rhythm method (periodic abstinence)", "IUD", "Pills"],a:1,e:"Natural methods: rhythm (calendar), basal body temperature, cervical mucus method.",d:"easy"},
  {q:"Amniocentesis is used for:",o:["Cancer detection", "Prenatal diagnosis of chromosomal abnormalities", "Blood test", "Urine test"],a:1,e:"Amniocentesis: amniotic fluid analysis. Banned for sex determination in India (PCPNDT Act).",d:"easy"}
],

'zoo-14': [
  {q:"Milch breed of cattle:",o:["Sahiwal", "Hallikar", "Nageri", "Kangayam"],a:0,e:"Sahiwal, Red Sindhi, Gir = milch breeds (high milk yield).",d:"easy"},
  {q:"Broiler chickens are raised for:",o:["Eggs", "Meat", "Feathers", "Decoration"],a:1,e:"Broilers: raised for meat. Layers: raised for eggs.",d:"easy"},
  {q:"Composite fish culture involves:",o:["One species only", "Multiple species in same pond", "Fish in aquarium", "Marine fishing"],a:1,e:"Composite fish culture: 5-6 species with different feeding habits in same pond (maximum yield).",d:"easy"},
  {q:"Apiculture is:",o:["Silk worm rearing", "Bee keeping", "Fish culture", "Poultry farming"],a:1,e:"Apiculture = bee keeping. Products: honey, beeswax, royal jelly.",d:"easy"},
  {q:"Apis mellifera is:",o:["Indian bee", "Italian bee (most commonly reared)", "Rock bee", "Little bee"],a:1,e:"Apis mellifera (Italian bee): most commercially reared species. High honey yield.",d:"easy"},
  {q:"MOET stands for:",o:["Multiple Ovulation Embryo Transfer", "Manual Operation of Egg Treatment", "Molecular Orientation of Embryo Transfer", "None"],a:0,e:"MOET: hormonal treatment for multiple ovulations \u2192 embryos transferred to surrogate mothers.",d:"medium"}
],

'phy-1': [
  {q:"SI unit of length:",o:["Centimeter", "Meter", "Kilometer", "Foot"],a:1,e:"SI base unit of length is meter (m).",d:"easy"},
  {q:"Dimensional formula of force:",o:["[MLT\u207b\u00b2]", "[ML\u00b2T\u207b\u00b2]", "[MLT\u207b\u00b9]", "[ML\u00b2T\u207b\u00b9]"],a:0,e:"Force = mass \u00d7 acceleration = [M][LT\u207b\u00b2] = [MLT\u207b\u00b2].",d:"easy"},
  {q:"Number of significant figures in 0.00340:",o:["2", "3", "4", "5"],a:1,e:"Leading zeros don't count. 3, 4, 0(trailing) = 3 significant figures.",d:"medium"},
  {q:"1 light year is unit of:",o:["Time", "Distance", "Speed", "Mass"],a:1,e:"Light year = distance light travels in 1 year \u2248 9.46 \u00d7 10\u00b9\u2075 m.",d:"easy"},
  {q:"Dimensional analysis can check:",o:["Correctness of equation", "Exact value of constants", "Direction of vector", "Color of light"],a:0,e:"Dimensional analysis checks dimensional homogeneity of equations but cannot find dimensionless constants.",d:"easy"},
  {q:"Parsec is unit of:",o:["Time", "Distance", "Mass", "Angle"],a:1,e:"Parsec = parallax second. Unit of astronomical distance \u2248 3.26 light years.",d:"easy"}
],

'phy-5': [
  {q:"Moment of inertia depends on:",o:["Mass only", "Distribution of mass about axis", "Velocity", "Acceleration"],a:1,e:"MOI depends on mass AND how it's distributed relative to rotation axis.",d:"easy"},
  {q:"MOI of a ring about its axis:",o:["\u00bdMR\u00b2", "MR\u00b2", "\u2154MR\u00b2", "\u2156MR\u00b2"],a:1,e:"Ring: all mass at distance R. I = MR\u00b2.",d:"easy"},
  {q:"Angular momentum L =",o:["mv", "I\u03c9", "Fr", "ma"],a:1,e:"Angular momentum L = I\u03c9 (moment of inertia \u00d7 angular velocity).",d:"easy"},
  {q:"Torque \u03c4 =",o:["F/r", "F\u00d7r (r\u00d7F)", "mv", "I\u03c9"],a:1,e:"Torque = r \u00d7 F = rF sin\u03b8. Also \u03c4 = I\u03b1.",d:"easy"},
  {q:"Rolling without slipping: v =",o:["\u03c9R", "\u03c9/R", "\u03c9R\u00b2", "R/\u03c9"],a:0,e:"For pure rolling: v_cm = \u03c9R. No slipping at contact point.",d:"easy"},
  {q:"Parallel axis theorem: I =",o:["I_cm + Md\u00b2", "I_cm - Md\u00b2", "I_cm \u00d7 Md\u00b2", "I_cm / Md\u00b2"],a:0,e:"I = I_cm + Md\u00b2. d = distance between parallel axes.",d:"easy"}
],
'phy-6': [
  {q:'Gravitational force between two masses is:',o:['Attractive only', 'Repulsive only', 'Both', 'Neither'],a:0,e:'Gravity is always attractive. F=GMm/r².',d:'easy'},
  {q:'Value of G is:',o:['6.67×10⁻¹¹ Nm²/kg²', '9.8 m/s²', '6.02×10²³', '1.6×10⁻¹⁹'],a:0,e:'G = Universal gravitational constant = 6.67×10⁻¹¹ Nm²/kg².',d:'easy'},
  {q:'Escape velocity from Earth:',o:['7.9 km/s', '11.2 km/s', '3.2 km/s', '25 km/s'],a:1,e:'ve = √(2gR) ≈ 11.2 km/s.',d:'easy'},
  {q:'Orbital velocity of satellite near Earth:',o:['11.2 km/s', '7.9 km/s', '3.2 km/s', '1.6 km/s'],a:1,e:'vo = √(gR) ≈ 7.9 km/s.',d:'medium'},
  {q:'At centre of Earth, g is:',o:['Maximum', '9.8 m/s²', 'Zero', 'Infinite'],a:2,e:"At depth d: g'=g(1-d/R). At centre d=R, g'=0.",d:'easy'},
  {q:"Kepler's 3rd law: T² ∝",o:['r', 'r²', 'r³', 'r⁴'],a:2,e:'T² ∝ r³ (square of period proportional to cube of semi-major axis).',d:'medium'},
  {q:'Weightlessness in satellite is because:',o:['No gravity', 'Gravity is zero', 'Free fall — gravitational acceleration = centripetal', 'Satellite is far from Earth'],a:2,e:'Astronaut in orbit is in free fall. Gravity provides centripetal force. Apparent weight = 0.',d:'medium'},
  {q:'Gravitational PE at infinity is:',o:['Maximum', 'Minimum', 'Zero', 'Positive'],a:2,e:'PE = -GMm/r. At r=∞, PE = 0 (reference point).',d:'easy'}
],

'phy-7': [
  {q:"Young's modulus is ratio of:",o:['Stress to Strain', 'Strain to Stress', 'Force to Area', 'Area to Force'],a:0,e:'Y = Stress/Strain = (F/A)/(ΔL/L).',d:'easy'},
  {q:"Bernoulli's theorem is based on:",o:['Conservation of mass', 'Conservation of energy', "Newton's law", "Hooke's law"],a:1,e:'P + ½ρv² + ρgh = constant (energy conservation for fluids).',d:'easy'},
  {q:'Surface tension causes:',o:['Spherical shape of drops', 'Square shape', 'No shape', 'Flat shape'],a:0,e:'Surface tension minimizes surface area → spherical drops.',d:'easy'},
  {q:'Viscosity is:',o:['Friction in fluids', 'Elasticity', 'Density', 'Pressure'],a:0,e:'Viscosity = internal friction in fluids resisting relative motion of layers.',d:'easy'},
  {q:"Pascal's law applies to:",o:['Solids', 'Confined fluids', 'Gases only', 'Vacuum'],a:1,e:'Pressure applied to confined fluid transmits equally in all directions.',d:'easy'},
  {q:'Capillary rise: h =',o:['2Scosθ/rρg', '2S/rρg', 'Sρg/r', 'ρgr/2S'],a:0,e:'h = 2Scosθ/(rρg). Height inversely proportional to radius.',d:'medium'},
  {q:'Stokes law: F =',o:['6πηrv', '6πηr²v', 'πηrv', '6ηrv'],a:0,e:'Viscous drag on sphere: F = 6πηrv.',d:'medium'},
  {q:'Hydraulic lift works on:',o:['Archimedes principle', "Pascal's law", "Bernoulli's theorem", "Newton's law"],a:1,e:"Small force on small area → large force on large area (Pascal's law).",d:'easy'}
],

'phy-8': [
  {q:'In isothermal process:',o:['Temperature constant', 'Pressure constant', 'Volume constant', 'No heat exchange'],a:0,e:'Isothermal: T = constant. PV = nRT = constant → PV = const.',d:'easy'},
  {q:'In adiabatic process:',o:['T = constant', 'No heat exchange (q=0)', 'P = constant', 'V = constant'],a:1,e:'Adiabatic: q = 0. All work done changes internal energy.',d:'easy'},
  {q:'Carnot efficiency:',o:['η = 1-T₂/T₁', 'η = T₂/T₁', 'η = T₁-T₂', 'η = T₁/T₂'],a:0,e:'η = 1 - T₂/T₁. T in Kelvin. T₂ = sink, T₁ = source.',d:'medium'},
  {q:'Cp - Cv = ?',o:['R', '2R', 'R/2', '0'],a:0,e:"Mayer's relation: Cp - Cv = R for ideal gas.",d:'easy'},
  {q:'Internal energy of ideal gas depends on:',o:['Pressure only', 'Volume only', 'Temperature only', 'All three'],a:2,e:'U = f/2 nRT. Depends only on temperature for ideal gas.',d:'easy'},
  {q:'Work done in isobaric process:',o:['PΔV', 'nRTln(V₂/V₁)', '0', 'nCvΔT'],a:0,e:'Isobaric (P constant): W = PΔV = nRΔT.',d:'easy'},
  {q:'Second law of thermodynamics states:',o:['Energy is conserved', 'Heat cannot spontaneously flow from cold to hot', 'Mass is conserved', 'Entropy is zero'],a:1,e:'Clausius: Heat flows spontaneously only from hot to cold body.',d:'easy'},
  {q:'Zeroth law defines:',o:['Energy', 'Temperature (thermal equilibrium)', 'Entropy', 'Enthalpy'],a:1,e:'Zeroth law: If A and B are in equilibrium with C, then A and B are in equilibrium. Defines temperature.',d:'easy'}
],

'phy-9': [
  {q:'Ideal gas equation:',o:['PV = nRT', 'PV = mRT', 'P = nRT', 'V = nRT/m'],a:0,e:'PV = nRT. n = moles, R = 8.314 J/mol/K.',d:'easy'},
  {q:'RMS speed of gas molecules:',o:['√(RT/M)', '√(2RT/M)', '√(3RT/M)', '√(RT/2M)'],a:2,e:'vrms = √(3RT/M) = √(3kT/m).',d:'medium'},
  {q:'Average KE per molecule:',o:['kT', '½kT', '3/2 kT', '2kT'],a:2,e:'KE = 3/2 kT. k = Boltzmann constant.',d:'easy'},
  {q:'Degrees of freedom for diatomic gas at room temp:',o:['3', '5', '6', '7'],a:1,e:'Diatomic: 3 translational + 2 rotational = 5 DOF.',d:'easy'},
  {q:'At absolute zero:',o:['Molecules move fast', 'All molecular motion ceases', 'Pressure increases', 'Volume increases'],a:1,e:'At 0 K, molecular motion stops (theoretically). KE = 0.',d:'easy'},
  {q:'Mean free path depends on:',o:['Temperature only', 'Pressure and molecular size', 'Mass only', 'Color'],a:1,e:'λ = kT/(√2 πd²P). Depends on T, P, and molecular diameter d.',d:'medium'}
],

'phy-10': [
  {q:'Time period of simple pendulum:',o:['T=2π√(m/k)', 'T=2π√(l/g)', 'T=2π√(g/l)', 'T=πl/g'],a:1,e:'Simple pendulum: T = 2π√(l/g). Independent of mass.',d:'easy'},
  {q:'In SHM, acceleration is:',o:['Constant', 'Proportional to displacement (a=-ω²x)', 'Zero', 'Random'],a:1,e:'a = -ω²x. Acceleration proportional to displacement, opposite direction.',d:'easy'},
  {q:'Maximum velocity in SHM:',o:['Aω', 'Aω²', 'A/ω', 'Zero'],a:0,e:'vmax = Aω at mean position (x=0).',d:'easy'},
  {q:'Total energy in SHM:',o:['½kA²', '½kx²', 'kA', 'Zero'],a:0,e:'E = ½kA² = constant. Sum of KE and PE.',d:'easy'},
  {q:'At extreme position in SHM:',o:['KE is maximum', 'PE is maximum', 'Both maximum', 'Both zero'],a:1,e:'At extreme: all energy is PE. KE = 0. Velocity = 0.',d:'easy'},
  {q:'If length of pendulum is doubled, T:',o:['Doubles', 'Halves', 'Increases by √2', 'Decreases by √2'],a:2,e:"T = 2π√(l/g). If l→2l: T' = √2 × T.",d:'medium'}
],

'phy-11': [
  {q:'Speed of sound in air at 20°C is approximately:',o:['300 m/s', '343 m/s', '500 m/s', '1500 m/s'],a:1,e:'Speed of sound in air ≈ 343 m/s at 20°C.',d:'easy'},
  {q:'Beats frequency equals:',o:['f₁ + f₂', '|f₁ - f₂|', 'f₁ × f₂', 'f₁/f₂'],a:1,e:'Beat frequency = |f₁ - f₂|.',d:'easy'},
  {q:'Standing wave has:',o:['All points vibrating with same amplitude', 'Nodes (zero) and Antinodes (maximum)', 'No vibration', 'Random motion'],a:1,e:'Standing waves have fixed nodes (no displacement) and antinodes (maximum displacement).',d:'easy'},
  {q:'Doppler effect: when source approaches:',o:['Frequency increases (higher pitch)', 'Frequency decreases', 'No change', 'Wavelength increases'],a:0,e:'Source approaching → wavelength compressed → frequency increases.',d:'easy'},
  {q:'First harmonic of open pipe:',o:['f = v/4L', 'f = v/2L', 'f = v/L', 'f = 2v/L'],a:1,e:'Open pipe: f₁ = v/2L. All harmonics present.',d:'easy'},
  {q:'First harmonic of closed pipe:',o:['f = v/4L', 'f = v/2L', 'f = v/L', 'f = 3v/4L'],a:0,e:'Closed pipe: f₁ = v/4L. Only odd harmonics present.',d:'medium'},
  {q:'Transverse waves can travel in:',o:['Solids and liquid surfaces', 'Only gases', 'Only vacuum', 'All media equally'],a:0,e:'Transverse waves: solids and liquid surfaces. Not through bulk liquids/gases.',d:'easy'},
  {q:'Speed of wave on string: v =',o:['√(T/μ)', 'T/μ', '√(μ/T)', 'Tμ'],a:0,e:'v = √(T/μ). T = tension, μ = linear mass density.',d:'easy'}
],

'phy-12': [
  {q:'Coulomb force between charges is:',o:['Always attractive', 'Always repulsive', 'Attractive for unlike, repulsive for like', 'Zero'],a:2,e:'Like charges repel, unlike attract. F = kq₁q₂/r².',d:'easy'},
  {q:'Electric field lines go from:',o:['Negative to positive', 'Positive to negative', 'Randomly', 'In circles'],a:1,e:'Field lines: positive → negative. Indicate direction of force on +ve charge.',d:'easy'},
  {q:"Gauss's law: total flux through closed surface =",o:['0 always', 'q/ε₀', 'q×ε₀', 'qε₀²'],a:1,e:'Φ = q_enclosed/ε₀.',d:'easy'},
  {q:'Electric field due to infinite plane sheet:',o:['σ/ε₀', 'σ/2ε₀', '2σ/ε₀', 'σ²/ε₀'],a:1,e:'E = σ/2ε₀ for infinite plane sheet of charge.',d:'medium'},
  {q:'If charge is doubled, electric field:',o:['Halves', 'Doubles', 'Same', 'Quadruples'],a:1,e:'E = kq/r². E ∝ q. Double charge → double field.',d:'easy'},
  {q:'Electric potential is scalar because:',o:['It has direction', 'It has only magnitude (work per unit charge)', 'It is a vector', 'It has no units'],a:1,e:'V = W/q. Work and charge are scalars. So potential is scalar.',d:'easy'},
  {q:'Superposition principle states:',o:['Forces cancel', 'Net force = vector sum of individual forces', 'Only one force acts', 'Forces multiply'],a:1,e:'Net force on charge = vector sum of forces due to all other charges.',d:'easy'},
  {q:'Electric dipole moment p =',o:['qd', 'q/d', 'q²d', 'qd²'],a:0,e:'p = qd (charge × separation). Direction: -ve to +ve.',d:'easy'}
],

'phy-13': [
  {q:'Capacitance of parallel plate capacitor:',o:['εA/d', 'εd/A', 'ε/Ad', 'εAd'],a:0,e:'C = ε₀A/d. ε₀ for vacuum, εA/d with dielectric.',d:'easy'},
  {q:'Energy stored in capacitor:',o:['½CV²', 'CV²', 'CV', 'C/V'],a:0,e:'U = ½CV² = ½QV = Q²/2C.',d:'easy'},
  {q:'If dielectric (K) inserted, capacitance:',o:['Decreases', 'Increases by factor K', 'Unchanged', 'Becomes zero'],a:1,e:"C' = KC. Dielectric increases capacitance.",d:'easy'},
  {q:'Two capacitors C each in parallel:',o:['C/2', 'C', '2C', '4C'],a:2,e:'Parallel: C_total = C₁ + C₂ = 2C.',d:'easy'},
  {q:'Two capacitors C each in series:',o:['C/2', 'C', '2C', '4C'],a:0,e:'Series: 1/C_total = 1/C + 1/C → C_total = C/2.',d:'easy'},
  {q:'Charge on capacitor Q =',o:['CV', 'C/V', 'V/C', 'C²V'],a:0,e:'Q = CV. Fundamental relation.',d:'easy'},
  {q:'Energy density in electric field:',o:['½ε₀E²', 'ε₀E²', '½ε₀E', 'ε₀E/2'],a:0,e:'Energy per unit volume = ½ε₀E².',d:'medium'},
  {q:'On connecting charged capacitor to uncharged (same C):',o:['Charge conserved, energy halved', 'Energy conserved', 'Both conserved', 'Neither conserved'],a:0,e:'Charge conserved. Energy halved (half lost as heat).',d:'medium'}
],

'phy-15': [
  {q:'Biot-Savart law gives:',o:['Electric field', 'Magnetic field due to current element', 'Gravitational field', 'Electric potential'],a:1,e:'dB = μ₀IdL×r/4πr³.',d:'easy'},
  {q:'Magnetic field inside solenoid:',o:['B = μ₀nI', 'B = μ₀I/n', 'B = 0', 'B = μ₀I'],a:0,e:'B = μ₀nI. n = turns per unit length.',d:'easy'},
  {q:'Force on current-carrying conductor in B:',o:['F = BIl sinθ', 'F = BIl cosθ', 'F = B/Il', 'F = 0 always'],a:0,e:'F = BIl sinθ. Maximum when θ = 90°.',d:'easy'},
  {q:'Right hand thumb rule gives:',o:['Direction of current', 'Direction of magnetic field around straight wire', 'Direction of gravity', 'Direction of friction'],a:1,e:'Thumb = current direction, curled fingers = magnetic field direction.',d:'easy'},
  {q:'Two parallel wires carrying current in same direction:',o:['Repel', 'Attract', 'No force', 'Rotate'],a:1,e:'Same direction currents attract. Opposite direction repel.',d:'easy'},
  {q:'Lorentz force on charge:',o:['F = qE', 'F = qv×B', 'F = q(E + v×B)', 'F = qE/B'],a:2,e:'Total Lorentz force: F = qE + qv×B (electric + magnetic).',d:'medium'},
  {q:'Cyclotron is used to:',o:['Slow down particles', 'Accelerate charged particles', 'Create magnetic field', 'Measure current'],a:1,e:'Cyclotron accelerates charged particles using magnetic field + electric field.',d:'easy'},
  {q:"Ampere's law: ∮B·dl =",o:['μ₀I', 'μ₀I/4π', 'μ₀/I', '0'],a:0,e:'∮B·dl = μ₀I_enclosed. Used for symmetric current distributions.',d:'easy'}
],

'phy-16': [
  {q:'Diamagnetic materials are:',o:['Strongly attracted by magnet', 'Weakly repelled by magnet', 'Strongly attracted', 'Not affected'],a:1,e:'Diamagnetic: weakly repelled. No unpaired electrons. E.g., Cu, Au, Bi, water.',d:'easy'},
  {q:'Paramagnetic materials:',o:['Weakly attracted by magnet', 'Strongly attracted', 'Repelled', 'Not affected'],a:0,e:'Paramagnetic: weakly attracted. Have unpaired electrons. E.g., Al, O₂, Na.',d:'easy'},
  {q:'Ferromagnetic materials:',o:['Weakly attracted', 'Strongly attracted (permanent magnet possible)', 'Repelled', 'Neutral'],a:1,e:'Ferromagnetic: strongly attracted. Can form permanent magnets. Fe, Co, Ni.',d:'easy'},
  {q:'Curie temperature is:',o:['Temperature below which ferromagnetism appears', 'Melting point', 'Boiling point', 'Absolute zero'],a:0,e:'Above Curie temp, ferromagnetic becomes paramagnetic.',d:'medium'},
  {q:"Earth's magnetic field has components:",o:['Only horizontal', 'Horizontal and vertical', 'Only vertical', 'No components'],a:1,e:'Bh (horizontal) and Bv (vertical). B = √(Bh² + Bv²).',d:'easy'},
  {q:'Declination is angle between:',o:['Geographic and magnetic meridian', 'Horizontal and vertical', 'North and South', 'East and West'],a:0,e:'Declination = angle between geographic north and magnetic north.',d:'easy'}
],

'phy-17': [
  {q:"Faraday's law: induced EMF =",o:['dΦ/dt', '-dΦ/dt', 'Φ/t', 'Φ×t'],a:1,e:"emf = -dΦ/dt. Negative sign = Lenz's law.",d:'easy'},
  {q:"Lenz's law states:",o:['Induced current aids change', 'Induced current opposes the change causing it', 'No current induced', 'Current is constant'],a:1,e:"Lenz's law: induced current direction opposes the change in flux.",d:'easy'},
  {q:'Motional EMF:',o:['ε = Blv', 'ε = Bl/v', 'ε = B/lv', 'ε = Bv/l'],a:0,e:'When conductor moves in B: ε = Blv.',d:'easy'},
  {q:'Self-inductance opposes:',o:['Change in current through it', 'Steady current', 'Voltage', 'Resistance'],a:0,e:'Self-inductance resists change in current (back EMF).',d:'easy'},
  {q:'Energy stored in inductor:',o:['½LI²', 'LI²', '½LI', 'LI'],a:0,e:'U = ½LI². L = inductance, I = current.',d:'easy'},
  {q:'If flux through coil changes from 5Wb to 2Wb in 0.1s, EMF:',o:['30V', '3V', '0.3V', '300V'],a:0,e:'emf = -ΔΦ/Δt = -(2-5)/0.1 = 30V.',d:'medium'},
  {q:'Eddy currents are:',o:['Useful currents', 'Circulating currents in bulk conductor due to changing flux', 'No currents', 'DC currents'],a:1,e:'Eddy currents: induced in bulk conductors. Cause heating. Used in induction cookers.',d:'easy'},
  {q:'Mutual inductance depends on:',o:['Geometry and relative position of coils', 'Current only', 'Voltage only', 'Resistance only'],a:0,e:'M depends on number of turns, area, distance, medium between coils.',d:'medium'}
],

'phy-18': [
  {q:'AC frequency in India:',o:['50 Hz', '60 Hz', '100 Hz', '25 Hz'],a:0,e:'Indian power supply: 220V, 50 Hz.',d:'easy'},
  {q:'Impedance of LCR circuit:',o:['Z = R', 'Z = √(R²+(XL-XC)²)', 'Z = XL + XC', 'Z = R + XL + XC'],a:1,e:'Z = √(R² + (XL-XC)²).',d:'medium'},
  {q:'At resonance in LCR:',o:['XL = XC, Z = R (minimum)', 'Z is maximum', 'Current is zero', 'Voltage is zero'],a:0,e:'Resonance: XL = XC → Z = R (minimum) → I = V/R (maximum).',d:'medium'},
  {q:'Transformer works on:',o:['Electrostatic induction', 'Electromagnetic induction', 'Gravity', 'Friction'],a:1,e:'Transformer uses mutual induction. AC only (not DC).',d:'easy'},
  {q:'Step-up transformer:',o:['Ns > Np (secondary turns > primary)', 'Ns < Np', 'Ns = Np', 'No turns needed'],a:0,e:'Step-up: Ns > Np → Vs > Vp (voltage increases, current decreases).',d:'easy'},
  {q:'Power factor cosφ =',o:['XL/Z', 'R/Z', 'XC/Z', 'Z/R'],a:1,e:'Power factor = cosφ = R/Z. At resonance, cosφ = 1.',d:'medium'},
  {q:'Wattless current flows when:',o:['φ = 0°', 'φ = 90° (purely reactive circuit)', 'φ = 45°', 'Always'],a:1,e:'At φ = 90° (pure L or C), average power = 0 → wattless current.',d:'medium'},
  {q:'RMS value of AC:',o:['V₀', 'V₀/√2', 'V₀/2', '2V₀'],a:1,e:'Vrms = V₀/√2 = 0.707V₀.',d:'easy'}
],

'phy-20': [
  {q:'YDSE fringe width β =',o:['λD/d', 'λd/D', 'Dd/λ', 'D/λd'],a:0,e:'β = λD/d. D = screen distance, d = slit separation.',d:'easy'},
  {q:'If slit width in YDSE is halved, fringe width:',o:['Halves', 'Doubles', 'Same', 'Quadruples'],a:1,e:'β = λD/d. If d halved → β doubles.',d:'easy'},
  {q:'Malus law:',o:['I = I₀sinθ', 'I = I₀cos²θ', 'I = I₀tanθ', 'I = I₀cosθ'],a:1,e:'After polarizer: I = I₀cos²θ. θ = angle between polarizer axes.',d:'easy'},
  {q:'Diffraction is bending of light around:',o:['Corners/obstacles', 'Only through vacuum', 'Only in water', 'Only through glass'],a:0,e:'Diffraction: bending of waves around obstacles and through narrow openings.',d:'easy'},
  {q:'For constructive interference, path difference:',o:['nλ', '(n+½)λ', 'nλ/2', '0 only'],a:0,e:'Constructive: path difference = nλ (integer multiple of wavelength).',d:'easy'},
  {q:'Polarization proves light is:',o:['Longitudinal', 'Transverse', 'Neither', 'Both'],a:1,e:'Only transverse waves can be polarized. Polarization proves light is transverse.',d:'easy'}
],

'phy-21': [
  {q:'Photoelectric effect proves light is:',o:['Wave', 'Particle (photon)', 'Both', 'Neither'],a:1,e:'Photoelectric effect: Einstein explained using quantum/particle nature of light.',d:'easy'},
  {q:'KE of photoelectron:',o:['hf - φ', 'hf + φ', 'hf', 'φ'],a:0,e:'KEmax = hf - φ. φ = work function.',d:'easy'},
  {q:'Below threshold frequency:',o:['Many electrons emitted', 'No electrons emitted regardless of intensity', 'Some electrons emitted', 'Current increases'],a:1,e:'Below threshold frequency, no photoelectron emission. Energy of photon < work function.',d:'easy'},
  {q:'de Broglie wavelength:',o:['λ = h/p = h/mv', 'λ = h×m×v', 'λ = mv/h', 'λ = m/hv'],a:0,e:'λ = h/p = h/mv. Wave-particle duality.',d:'easy'},
  {q:'Increasing intensity (above threshold) increases:',o:['KE of electrons', 'Number of electrons (current)', 'Frequency', 'Wavelength'],a:1,e:'Higher intensity = more photons = more electrons. KE depends on frequency, not intensity.',d:'easy'},
  {q:'Stopping potential depends on:',o:['Intensity', 'Frequency of light', 'Both', 'Neither'],a:1,e:'V₀ depends on frequency: eV₀ = hf - φ. Independent of intensity.',d:'medium'}
],

'phy-22': [
  {q:'Bohr radius of hydrogen (n=1):',o:['0.529 Å', '5.29 Å', '52.9 Å', '0.0529 Å'],a:0,e:'r₁ = 0.529 Å for hydrogen. rₙ = 0.529n²/Z Å.',d:'easy'},
  {q:'Energy of nth orbit:',o:['Eₙ = -13.6/n² eV', 'Eₙ = 13.6/n² eV', 'Eₙ = -13.6n² eV', 'Eₙ = 13.6n eV'],a:0,e:'Eₙ = -13.6Z²/n² eV. Negative = bound state.',d:'easy'},
  {q:'Lyman series is in:',o:['Visible', 'UV region', 'IR', 'Microwave'],a:1,e:'Lyman: transitions to n=1. UV region.',d:'easy'},
  {q:'Half-life of radioactive element:',o:['Time for half the atoms to decay', 'Time to fully decay', 'Time to double', 'Infinite'],a:0,e:'t½: time for half the radioactive nuclei to decay.',d:'easy'},
  {q:'Alpha particle is:',o:['Electron', 'He nucleus (2p + 2n)', 'Proton', 'Neutron'],a:1,e:'α particle = He-4 nucleus = 2 protons + 2 neutrons.',d:'easy'},
  {q:'Nuclear fission:',o:['Small nuclei combine', 'Heavy nucleus splits into lighter nuclei + energy', 'No energy', 'Nucleus absorbs electron'],a:1,e:'Fission: heavy nucleus splits. U-235 → fragments + neutrons + ~200 MeV.',d:'easy'},
  {q:'Mass defect is converted to:',o:['New mass', 'Energy (E=mc²)', 'Charge', 'Spin'],a:1,e:"Mass defect × c² = Binding energy (Einstein's equation).",d:'medium'},
  {q:'In β⁻ decay:',o:['Neutron → Proton + electron + antineutrino', 'Proton → Neutron', 'No change', 'Alpha emitted'],a:0,e:'β⁻: n → p + e⁻ + ν̄. Atomic number increases by 1.',d:'medium'}
],

'phy-23': [
  {q:'In n-type semiconductor, majority carriers:',o:['Holes', 'Electrons', 'Protons', 'Neutrons'],a:1,e:'n-type: doped with pentavalent (P, As). Extra electrons = majority carriers.',d:'easy'},
  {q:'In p-type semiconductor, dopant is:',o:['Pentavalent', 'Trivalent (B, Al)', 'Hexavalent', 'Monovalent'],a:1,e:'p-type: trivalent dopant creates holes as majority carriers.',d:'easy'},
  {q:'p-n junction in forward bias:',o:['Blocks current', 'Allows current to flow', 'Acts as capacitor', 'Breaks down'],a:1,e:'Forward bias: p→+ve, n→-ve. Depletion layer narrows → current flows.',d:'easy'},
  {q:'Zener diode is used as:',o:['Amplifier', 'Voltage regulator', 'Oscillator', 'Switch'],a:1,e:'Zener operates in reverse breakdown → maintains constant voltage.',d:'easy'},
  {q:'LED emits:',o:['X-rays', 'Visible light', 'Gamma rays', 'Sound'],a:1,e:'LED = Light Emitting Diode. Emits light when forward biased.',d:'easy'},
  {q:'NOT gate output when input is 1:',o:['1', '0', 'Undefined', 'Both'],a:1,e:'NOT gate inverts: 1→0, 0→1.',d:'easy'},
  {q:'AND gate gives 1 when:',o:['Any input is 1', 'All inputs are 1', 'No input is 1', 'Always'],a:1,e:'AND: output = 1 only when ALL inputs = 1.',d:'easy'},
  {q:'OR gate gives 1 when:',o:['All inputs are 0', 'At least one input is 1', 'No inputs', 'Always 0'],a:1,e:'OR: output = 1 when ANY input = 1.',d:'easy'}
],

'phy-24': [
  {q:'Speed of EM waves in vacuum:',o:['3×10⁶ m/s', '3×10⁸ m/s', '3×10¹⁰ m/s', '3×10⁴ m/s'],a:1,e:'c = 3×10⁸ m/s. Same for all EM waves in vacuum.',d:'easy'},
  {q:'Which has highest frequency?',o:['Radio waves', 'Microwaves', 'Gamma rays', 'Infrared'],a:2,e:'Gamma > X-ray > UV > Visible > IR > Microwave > Radio.',d:'easy'},
  {q:'Which has longest wavelength?',o:['Gamma rays', 'UV', 'Visible', 'Radio waves'],a:3,e:'Radio waves have longest wavelength, lowest frequency.',d:'easy'},
  {q:'EM waves are:',o:['Longitudinal', 'Transverse', 'Both', 'Neither'],a:1,e:'EM waves are transverse: E and B perpendicular to each other and to propagation direction.',d:'easy'},
  {q:'X-rays are used in:',o:['Cooking', 'Medical imaging', 'Communication', 'Heating'],a:1,e:'X-rays penetrate soft tissue, absorbed by bone → medical imaging.',d:'easy'},
  {q:'Infrared radiation is used in:',o:['Remote controls and heating', 'X-ray machines', 'Nuclear reactors', 'Radio stations'],a:0,e:'IR used in remote controls, night vision, heating.',d:'easy'}
],

'chem-1': [
  {q:'1 mole of any gas at STP occupies:',o:['11.2 L', '22.4 L', '44.8 L', '1 L'],a:1,e:'At STP (0°C, 1 atm): 1 mole of gas = 22.4 L (molar volume).',d:'easy'},
  {q:'Avogadro number:',o:['6.022×10²³', '6.022×10²²', '3.011×10²³', '1.6×10⁻¹⁹'],a:0,e:'Nₐ = 6.022×10²³ particles/mol.',d:'easy'},
  {q:'Molarity is:',o:['Moles of solute per kg solvent', 'Moles of solute per liter solution', 'Mass per volume', 'Volume per mass'],a:1,e:'M = moles/liters of solution.',d:'easy'},
  {q:'Molecular formula from empirical CH₂O and MW=180:',o:['CH₂O', 'C₂H₄O₂', 'C₆H₁₂O₆', 'C₃H₆O₃'],a:2,e:'Empirical FW = 30. MW/FW = 180/30 = 6. MF = C₆H₁₂O₆ (glucose).',d:'medium'},
  {q:'Limiting reagent:',o:['Present in excess', 'Completely consumed first, limits product', 'Never reacts', 'Always a catalyst'],a:1,e:'Limiting reagent consumed first. Determines maximum product formed.',d:'easy'},
  {q:'Mass of 1 mole of water:',o:['2 g', '16 g', '18 g', '36 g'],a:1,e:'H₂O: 2(1) + 16 = 18 g/mol.',d:'easy'},
  {q:'Number of atoms in 1 mole of O₂:',o:['6.022×10²³', '12.044×10²³', '3.011×10²³', '1'],a:1,e:'1 mol O₂ = 6.022×10²³ molecules = 12.044×10²³ atoms (2 atoms per molecule).',d:'medium'},
  {q:'Equivalent weight of H₂SO₄:',o:['98', '49', '196', '32'],a:1,e:'EW = MW/basicity = 98/2 = 49.',d:'medium'}
],

'chem-3': [
  {q:'Atomic radius across a period:',o:['Increases', 'Decreases', 'Same', 'Random'],a:1,e:'Left→Right: nuclear charge increases → electrons pulled closer → radius decreases.',d:'easy'},
  {q:'Ionization energy across period:',o:['Decreases', 'Increases', 'Same', 'Random'],a:1,e:'More nuclear charge → harder to remove electron → IE increases left to right.',d:'easy'},
  {q:'Most electronegative element:',o:['Oxygen', 'Nitrogen', 'Fluorine', 'Chlorine'],a:2,e:'F is most electronegative (3.98 Pauling scale).',d:'easy'},
  {q:'Noble gases have:',o:['Very high EA', 'Zero or very low EA', 'Negative EA', 'High IE only'],a:1,e:'Noble gases: stable octet → no tendency to gain electrons → EA ≈ 0.',d:'easy'},
  {q:'Diagonal relationship: Li resembles:',o:['Na', 'K', 'Mg', 'Ca'],a:2,e:'Li diagonal with Mg. Similar charge/radius ratio.',d:'easy'},
  {q:'Metallic character down a group:',o:['Decreases', 'Increases', 'Same', 'Random'],a:1,e:'Down group: outermost electron farther → easier to lose → more metallic.',d:'easy'},
  {q:'Second IE is always:',o:['Less than first', 'Greater than first', 'Equal to first', 'Zero'],a:1,e:'After removing first electron, remaining electrons held more tightly → higher IE₂.',d:'easy'},
  {q:'Electron affinity is most negative for:',o:['F', 'Cl', 'Br', 'I'],a:1,e:'Cl has highest (most negative) EA. F is small → electron-electron repulsion reduces EA.',d:'medium'}
],

'chem-5': [
  {q:"Boyle's law: at constant T:",o:['PV = constant', 'P/V = constant', 'P = kT', 'V = kT'],a:0,e:'PV = constant at constant temperature. P₁V₁ = P₂V₂.',d:'easy'},
  {q:'Charles law: at constant P:',o:['V/T = constant', 'VT = constant', 'V/P = constant', 'PT = constant'],a:0,e:'V/T = constant (in Kelvin). V₁/T₁ = V₂/T₂.',d:'easy'},
  {q:'Absolute zero is:',o:['-273.15°C', '0°C', '-100°C', '-373°C'],a:0,e:'-273.15°C = 0 K. Theoretically, all molecular motion stops.',d:'easy'},
  {q:'Real gas behaves ideally at:',o:['High P, Low T', 'Low P, High T', 'High P, High T', 'Low P, Low T'],a:1,e:'Low pressure, high temperature: molecules far apart, minimal interactions → ideal behavior.',d:'easy'},
  {q:'Van der Waals equation accounts for:',o:['Molecular size and intermolecular forces', 'Only molecular size', 'Only temperature', 'Nuclear forces'],a:0,e:'(P + a/V²)(V - b) = nRT. a = intermolecular attraction, b = molecular volume.',d:'medium'},
  {q:"Graham's law: rate of diffusion ∝",o:['√M', '1/√M', 'M', '1/M'],a:1,e:'r ∝ 1/√M. Lighter gas diffuses faster.',d:'easy'}
],

'chem-6': [
  {q:'ΔH is negative for:',o:['Endothermic', 'Exothermic', 'Neither', 'Both'],a:1,e:'Exothermic: heat released → ΔH < 0.',d:'easy'},
  {q:'ΔG < 0 means reaction is:',o:['Spontaneous', 'Non-spontaneous', 'At equilibrium', 'Impossible'],a:0,e:'ΔG < 0: spontaneous. ΔG = 0: equilibrium. ΔG > 0: non-spontaneous.',d:'easy'},
  {q:"Hess's law states enthalpy change:",o:['Depends on path', 'Independent of path (depends only on initial and final states)', 'Is always positive', 'Is always zero'],a:1,e:"Hess's law: ΔH is path-independent (state function).",d:'easy'},
  {q:'Bond breaking is:',o:['Exothermic', 'Endothermic (requires energy)', 'Neither', 'Both'],a:1,e:'Breaking bonds requires energy (endothermic). Making bonds releases energy (exothermic).',d:'easy'},
  {q:'At equilibrium, ΔG =',o:['Positive', 'Negative', 'Zero', 'Infinite'],a:2,e:'At equilibrium: ΔG = 0. No net change.',d:'easy'},
  {q:'Entropy of universe always:',o:['Decreases', 'Increases (2nd law)', 'Stays same', 'Oscillates'],a:1,e:'2nd law: Total entropy of universe always increases for spontaneous processes.',d:'easy'}
],

'chem-8': [
  {q:'Oxidation means:',o:['Loss of electrons', 'Gain of electrons', 'Loss of protons', 'Gain of protons'],a:0,e:'Oxidation = Loss of Electrons (OIL). Reduction = Gain (RIG).',d:'easy'},
  {q:'In Fe²⁺ → Fe³⁺, iron is:',o:['Reduced', 'Oxidized', 'Neither', 'Both'],a:1,e:'Fe loses electron: Fe²⁺ → Fe³⁺ + e⁻. Oxidized.',d:'easy'},
  {q:'Oxidation number of O in most compounds:',o:['+2', '-2', '0', '-1'],a:1,e:'Oxygen is usually -2. Exception: peroxides (-1), OF₂ (+2).',d:'easy'},
  {q:'Reducing agent gets:',o:['Reduced', 'Oxidized', 'Neither', 'Both'],a:1,e:'Reducing agent donates electrons → itself gets oxidized.',d:'easy'},
  {q:'In H₂O, oxidation state of H:',o:['+1', '-1', '0', '+2'],a:0,e:'H is +1 in most compounds (except metal hydrides where -1).',d:'easy'},
  {q:'Disproportionation reaction:',o:['Same element oxidized AND reduced', 'Only oxidation', 'Only reduction', 'No change'],a:0,e:'Same element undergoes both oxidation and reduction. E.g., 2H₂O₂ → 2H₂O + O₂.',d:'medium'}
],

'chem-9': [
  {q:'Hydrogen has how many isotopes?',o:['1', '2', '3', '4'],a:2,e:'H: Protium (¹H), Deuterium (²H), Tritium (³H).',d:'easy'},
  {q:'Heavy water:',o:['H₂O', 'D₂O (²H₂O)', 'T₂O', 'H₂O₂'],a:1,e:'Heavy water = D₂O. Used as moderator in nuclear reactors.',d:'easy'},
  {q:'H₂O₂ acts as:',o:['Only oxidizing agent', 'Only reducing agent', 'Both oxidizing and reducing agent', 'Neither'],a:2,e:'H₂O₂ can oxidize (→H₂O) or reduce (→O₂) depending on other reactant.',d:'easy'},
  {q:'Structure of H₂O₂ is:',o:['Linear', 'Open book (non-planar)', 'Tetrahedral', 'Circular'],a:1,e:'H₂O₂ has an open-book structure with dihedral angle ~111.5°.',d:'medium'},
  {q:'Permanent hardness of water is due to:',o:['Bicarbonates', 'Chlorides and sulfates of Ca/Mg', 'NaCl only', 'Pure water'],a:1,e:'Permanent: CaCl₂, MgSO₄. Cannot be removed by boiling.',d:'easy'},
  {q:'Temporary hardness is removed by:',o:['Boiling', 'Adding acid', 'Distillation only', 'Cannot be removed'],a:0,e:'Temporary: Ca(HCO₃)₂. Boiling → CaCO₃ ↓ + H₂O + CO₂.',d:'easy'}
],
'chem-10': [
  {q:'Caustic soda is:',o:['NaOH', 'NaCl', 'Na₂CO₃', 'NaHCO₃'],a:0,e:'NaOH = caustic soda/sodium hydroxide. Strong base.',d:'easy'},
  {q:'Washing soda:',o:['Na₂CO₃·10H₂O', 'NaHCO₃', 'NaCl', 'NaOH'],a:0,e:'Na₂CO₃·10H₂O = washing soda.',d:'easy'},
  {q:'Plaster of Paris:',o:['CaSO₄·2H₂O', 'CaSO₄·½H₂O', 'CaCO₃', 'Ca(OH)₂'],a:1,e:'POP = CaSO₄·½H₂O. On adding water → gypsum CaSO₄·2H₂O (sets hard).',d:'easy'},
  {q:'Li shows anomalous behavior due to:',o:['Small size and high polarizing power', 'Large size', 'Low electronegativity', 'No valence electrons'],a:0,e:'Li is very small → high charge density → diagonal resemblance with Mg.',d:'easy'},
  {q:'Baking soda:',o:['NaHCO₃', 'Na₂CO₃', 'NaOH', 'NaCl'],a:0,e:'NaHCO₃ = baking soda/sodium bicarbonate.',d:'easy'},
  {q:'Which alkali metal is lightest?',o:['Na', 'K', 'Li', 'Cs'],a:2,e:'Li (Z=3) is lightest metal. Density 0.534 g/cm³.',d:'easy'}
],

'chem-11': [
  {q:'BF₃ is a Lewis acid because:',o:['It has lone pair', 'It has vacant p-orbital (electron deficient)', 'It donates electrons', 'It is a base'],a:1,e:'BF₃: B has only 6 electrons. Vacant p-orbital accepts electron pair.',d:'easy'},
  {q:'Diamond is:',o:['Soft', 'Hardest natural substance', 'Conductor', 'Colored'],a:1,e:'Diamond: sp³ carbon. 3D tetrahedral network. Hardest natural substance.',d:'easy'},
  {q:'Graphite is:',o:['Insulator', 'Good conductor of electricity', 'Transparent', 'Harder than diamond'],a:1,e:'Graphite: sp² layers. Delocalized electrons between layers → conducts.',d:'easy'},
  {q:'Diborane (B₂H₆) has:',o:['Only normal bonds', '3-center 2-electron bonds (banana bonds)', 'Ionic bonds', 'Triple bonds'],a:1,e:'B₂H₆ has 4 normal B-H bonds + 2 three-center two-electron (3c-2e) banana bonds.',d:'medium'},
  {q:'CO is poisonous because:',o:['It binds to Hb 200× stronger than O₂', 'It is acidic', 'It explodes', 'It has bad smell'],a:0,e:'CO binds to hemoglobin forming carboxyhemoglobin. 200-250× more affinity than O₂.',d:'easy'},
  {q:'Silicones are polymers of:',o:['Silicon only', 'Organosilicon (R₂SiO)', 'Carbon only', 'SiO₂'],a:1,e:'Silicones: organosilicon polymers with Si-O-Si linkage. Water repellent.',d:'easy'}
],

'chem-12': [
  {q:'IUPAC name of CH₃CH₂OH:',o:['Methanol', 'Ethanol', 'Propanol', 'Butanol'],a:1,e:'2 carbons + OH group = Ethanol.',d:'easy'},
  {q:'+I effect groups:',o:['—NO₂, —COOH', '—CH₃, —C₂H₅ (alkyl groups)', '—Cl, —Br', '—OH, —NH₂'],a:1,e:'+I (electron donating inductive): alkyl groups push electrons.',d:'easy'},
  {q:'Resonance stabilizes molecule by:',o:['Increasing energy', 'Delocalizing electrons (decreasing energy)', 'Adding atoms', 'Removing electrons'],a:1,e:'Resonance = electron delocalization → lower energy → more stable.',d:'easy'},
  {q:'Most stable carbocation:',o:['CH₃⁺', '(CH₃)₂CH⁺', '(CH₃)₃C⁺ (tertiary)', 'C₂H₅⁺'],a:2,e:'3° > 2° > 1° > CH₃⁺. More alkyl groups = more hyperconjugation = more stable.',d:'easy'},
  {q:'Electrophile:',o:['Electron rich', 'Electron poor (seeks electrons)', 'Neutral', 'Radical'],a:1,e:'Electrophile = electron-loving species. E.g., H⁺, NO₂⁺, BF₃, AlCl₃.',d:'easy'},
  {q:'Tautomerism is seen in:',o:['Butane', 'Acetone (keto-enol)', 'Methane', 'Ethene'],a:1,e:'Acetone shows keto-enol tautomerism: CH₃COCH₃ ⇌ CH₃C(OH)=CH₂.',d:'medium'}
],

'chem-13': [
  {q:'Markovnikov rule: H adds to C with:',o:['Fewer H', 'More H (less substituted C)', 'More substituents', 'No preference'],a:1,e:"HX addition: H goes to C with more H's. X goes to more substituted C.",d:'easy'},
  {q:'Anti-Markovnikov addition occurs with:',o:['HBr in presence of peroxide', 'HCl', 'HI', 'H₂O'],a:0,e:'Peroxide effect (Kharasch): HBr + peroxide → anti-Markovnikov (free radical mechanism).',d:'medium'},
  {q:'Benzene undergoes:',o:['Electrophilic addition', 'Electrophilic aromatic substitution', 'Nucleophilic substitution', 'Free radical addition'],a:1,e:'Benzene: EAS to preserve aromatic stability. E.g., Friedel-Crafts, Nitration, Halogenation.',d:'easy'},
  {q:'Alkanes undergo:',o:['Electrophilic substitution', 'Free radical substitution', 'Nucleophilic addition', 'No reaction'],a:1,e:'Alkanes: C-C and C-H σ bonds. React by free radical mechanism (halogenation).',d:'easy'},
  {q:'IUPAC name of CH₃CH=CH₂:',o:['Ethene', 'Propene', 'Butene', 'Propane'],a:1,e:'3 carbons with double bond = Propene (Prop-1-ene).',d:'easy'},
  {q:'Triple bond in alkynes:',o:['1σ + 2π', '3σ', '2σ + 1π', '3π'],a:0,e:'Triple bond = 1σ + 2π. sp hybridization (linear).',d:'medium'}
],

'chem-14': [
  {q:'Smog is combination of:',o:['Smoke and fog', 'Sun and wind', 'Rain and dust', 'Snow and ice'],a:0,e:'Smog = smoke + fog. Photochemical smog contains O₃, PAN, NO₂.',d:'easy'},
  {q:'Global warming is due to:',o:['O₂ increase', 'CO₂ and greenhouse gas increase', 'N₂ decrease', 'Water decrease'],a:1,e:'Greenhouse gases (CO₂, CH₄, N₂O) trap heat → global warming.',d:'easy'},
  {q:'Acid rain has pH below:',o:['7', '5.6', '3', '9'],a:1,e:'Normal rain pH ≈ 5.6. Below 5.6 = acid rain (due to SO₂, NO₂).',d:'easy'},
  {q:'Green chemistry aims to:',o:['Produce more waste', 'Reduce/eliminate hazardous substances', 'Use more chemicals', 'Increase pollution'],a:1,e:'Green chemistry: design products/processes that minimize hazardous substances.',d:'easy'},
  {q:'Ozone depletion is caused by:',o:['CO₂', 'CFCs (chlorofluorocarbons)', 'N₂', 'O₂'],a:1,e:'CFCs release Cl atoms in stratosphere → Cl catalytically destroys O₃.',d:'easy'},
  {q:'BOD indicates:',o:['Dissolved O₂', 'Level of organic pollution in water', 'pH', 'Temperature'],a:1,e:'Higher BOD = more organic pollutants = more O₂ needed by microbes.',d:'easy'}
],

'chem-15': [
  {q:"Raoult's law: P =",o:['P°x', 'P°/x', 'xP°²', 'P° + x'],a:0,e:'P = P°x (vapor pressure = pure component VP × mole fraction).',d:'easy'},
  {q:'Colligative properties depend on:',o:['Nature of solute', 'Number of solute particles', 'Mass of solute', 'Color of solute'],a:1,e:'Colligative: depend on number of particles, not their nature. ΔTb, ΔTf, π.',d:'easy'},
  {q:'Osmotic pressure π =',o:['CRT', 'iCRT', 'C/RT', 'iRT/C'],a:1,e:"π = iCRT. i = Van't Hoff factor for electrolytes.",d:'medium'},
  {q:'Boiling point elevation: ΔTb =',o:['Kb×m', 'iKb×m', 'Kb/m', 'm/Kb'],a:1,e:'ΔTb = iKbm. i>1 for electrolytes (dissociation).',d:'medium'},
  {q:"Van't Hoff factor for NaCl (complete dissociation):",o:['1', '2', '3', '0.5'],a:1,e:'NaCl → Na⁺ + Cl⁻. 2 particles from 1 → i = 2.',d:'easy'},
  {q:'Ideal solution obeys:',o:["Boyle's law", "Raoult's law over entire range", "Henry's law", "Dalton's law"],a:1,e:"Ideal solution: obeys Raoult's law. ΔHmix = 0, ΔVmix = 0.",d:'easy'}
],

'chem-17': [
  {q:'First order half-life:',o:['t½ = [A₀]/2k', 't½ = 0.693/k', 't½ = 1/k', 't½ = k/0.693'],a:1,e:'First order: t½ = 0.693/k. Independent of initial concentration.',d:'easy'},
  {q:'Rate constant units for 1st order:',o:['mol/L/s', 's⁻¹', 'L/mol/s', 'mol²/L²/s'],a:1,e:'First order: Rate = k[A]. k = s⁻¹ (per second).',d:'easy'},
  {q:'Activation energy is:',o:['Energy of products', 'Minimum energy needed for reaction', 'Energy of reactants', 'Total energy'],a:1,e:'Ea = energy barrier. Reactants must overcome Ea to form products.',d:'easy'},
  {q:'Catalyst:',o:['Changes equilibrium', 'Lowers activation energy (speeds up)', 'Increases Ea', 'Consumed in reaction'],a:1,e:"Catalyst lowers Ea → faster rate. Not consumed. Doesn't change equilibrium.",d:'easy'},
  {q:'If rate = k[A]²[B], order is:',o:['1', '2', '3', '0'],a:2,e:'Order = 2 + 1 = 3 (sum of powers of concentration terms).',d:'medium'},
  {q:'Arrhenius equation: k =',o:['Ae⁻ᴱᵃ/ᴿᵀ', 'Ae^(Ea/RT)', 'A/Ea', 'EaRT'],a:0,e:'k = Ae^(-Ea/RT). Higher T → larger k → faster reaction.',d:'medium'}
],

'chem-18': [
  {q:'Physical adsorption is:',o:['Irreversible', 'Reversible (weak van der Waals)', 'Very strong', 'Chemical bonding'],a:1,e:'Physisorption: weak van der Waals forces. Reversible. Low heat of adsorption.',d:'easy'},
  {q:'Tyndall effect is shown by:',o:['True solutions', 'Colloids', 'Suspensions', 'Pure water'],a:1,e:'Colloids scatter light → visible beam = Tyndall effect.',d:'easy'},
  {q:'Hardy-Schulze rule: coagulation power increases with:',o:['Charge of coagulating ion', 'Size of ion', 'Mass of ion', 'Color of ion'],a:0,e:'Higher charge = more coagulating power. Al³⁺ > Ba²⁺ > Na⁺.',d:'medium'},
  {q:'Emulsifier:',o:['Increases surface tension', 'Stabilizes emulsion', 'Breaks emulsion', 'Removes oil'],a:1,e:'Emulsifier (e.g., soap) stabilizes emulsion by reducing surface tension.',d:'easy'},
  {q:'Chemisorption:',o:['Weak, reversible', 'Strong, involves chemical bond formation', 'Physical', 'No heat change'],a:1,e:'Chemisorption: chemical bonds form. Irreversible. High activation energy.',d:'easy'},
  {q:'Brownian movement in colloid is due to:',o:['Gravity', 'Bombardment by dispersion medium molecules', 'Electric field', 'Magnetic field'],a:1,e:'Colloidal particles constantly hit by solvent molecules → random zigzag motion.',d:'easy'}
],

'chem-19': [
  {q:'Allotropes of phosphorus:',o:['Only white', 'White, Red, Black', 'Only red', 'Only black'],a:1,e:'P: White(P₄, poisonous), Red(polymeric, stable), Black(layered, stable).',d:'easy'},
  {q:'H₂SO₄ is called king of chemicals because:',o:['It is cheapest', 'Used in maximum industrial processes', 'It is strongest', 'It is oldest'],a:1,e:'H₂SO₄: used in fertilizers, petroleum, metallurgy, detergents — most widely used chemical.',d:'easy'},
  {q:'Ozone is:',o:['O₂', 'O₃ (triatomic oxygen)', 'O', 'O₄'],a:1,e:'Ozone = O₃. Powerful oxidizer. Protects from UV in stratosphere.',d:'easy'},
  {q:'Interhalogen compound example:',o:['NaCl', 'ClF₃', 'HCl', 'KBr'],a:1,e:'Interhalogen: compounds of two different halogens. ClF₃, BrF₅, IF₇.',d:'easy'},
  {q:'XeF₂ shape:',o:['Linear', 'Bent', 'Tetrahedral', 'Trigonal planar'],a:0,e:'XeF₂: sp³d hybridization. 2 BP + 3 LP → Linear shape.',d:'medium'},
  {q:'NH₃ acts as:',o:['Only acid', 'Lewis base (donates lone pair)', 'Neutral', 'Oxidizing agent'],a:1,e:'NH₃ has lone pair on N → donates to electron-deficient species → Lewis base.',d:'easy'},
  {q:'Bleaching powder formula:',o:['NaOCl', 'Ca(OCl)Cl (CaOCl₂)', 'CaCO₃', 'Ca(OH)₂'],a:1,e:'Bleaching powder = Ca(OCl)Cl. Made by passing Cl₂ through Ca(OH)₂.',d:'easy'},
  {q:'Contact process produces:',o:['HNO₃', 'H₂SO₄', 'HCl', 'NH₃'],a:1,e:'Contact process: SO₂ → SO₃ (V₂O₅ catalyst) → H₂SO₄.',d:'medium'}
],

'chem-20': [
  {q:'Transition elements show variable oxidation states due to:',o:['s electrons only', 'Involvement of (n-1)d electrons', 'p electrons', 'f electrons only'],a:1,e:'d electrons close in energy to s → both participate → variable oxidation states.',d:'easy'},
  {q:'KMnO₄ color is:',o:['Colorless', 'Purple/violet', 'Blue', 'Green'],a:1,e:'KMnO₄ = dark purple. Strong oxidizing agent.',d:'easy'},
  {q:'Lanthanoid contraction is due to:',o:['Poor shielding by 4f electrons', 'Poor shielding by d electrons', 'Expansion of nucleus', 'Increase in size'],a:0,e:'4f electrons shield poorly → effective nuclear charge increases → size decreases gradually.',d:'medium'},
  {q:'Transition metals are good catalysts because:',o:['They are cheap', 'Variable oxidation states and ability to form complexes', 'They are heavy', 'They are colored'],a:1,e:'Variable oxidation states → form intermediates → lower Ea → catalysis.',d:'easy'},
  {q:'Most common oxidation state of Fe:',o:['+1', '+2 and +3', '+4', '+5'],a:1,e:'Fe: +2 (ferrous) and +3 (ferric) are most common.',d:'easy'},
  {q:'Transition elements are colored due to:',o:['d-d transitions', 's-p transitions', 'Nuclear radiation', 'Reflection'],a:0,e:'Unpaired d electrons absorb visible light (d-d transition) → complementary color seen.',d:'medium'}
],

'chem-21': [
  {q:'In [Cu(NH₃)₄]²⁺, oxidation state of Cu:',o:['+1', '+2', '+3', '0'],a:1,e:'Let Cu = x. x + 4(0) = +2. Cu = +2.',d:'easy'},
  {q:'IUPAC name of [Co(NH₃)₆]Cl₃:',o:['Hexaamminecobalt(III) chloride', 'Cobalt hexaammine chloride', 'Trichlorohexaamminecobalt', 'Cobalt ammonia chloride'],a:0,e:'Cation named first. Ligands alphabetically. Metal with oxidation state.',d:'medium'},
  {q:'Ligand that donates through 2 atoms is:',o:['Unidentate', 'Bidentate', 'Tridentate', 'Hexadentate'],a:1,e:'Bidentate: donates through 2 donor atoms. E.g., ethylenediamine (en).',d:'easy'},
  {q:'Coordination number:',o:['Number of ligands', 'Number of bonds from ligand atoms to metal', 'Oxidation state', 'Charge on complex'],a:1,e:'CN = total number of ligand donor atoms bonded to central metal.',d:'easy'},
  {q:'Strong field ligand:',o:['I⁻', 'Cl⁻', 'CN⁻', 'F⁻'],a:2,e:'Spectrochemical series: I⁻<Br⁻<Cl⁻<F⁻<OH⁻<H₂O<NH₃<en<CN⁻<CO. CN⁻ is strong field.',d:'medium'},
  {q:'Isomerism in coordination compounds:',o:['Only structural', 'Only stereo', 'Both structural and stereo', 'No isomerism'],a:2,e:'Both: Structural (ionization, linkage, coordination) and Stereo (geometric, optical).',d:'easy'}
],

'chem-23': [
  {q:'Lucas test distinguishes:',o:['Aldehydes and ketones', '1°, 2°, 3° alcohols', 'Acids and bases', 'Amines and amides'],a:1,e:'Lucas reagent (ZnCl₂ + conc HCl): 3°→immediate turbid, 2°→5 min, 1°→no reaction.',d:'easy'},
  {q:'Phenol is more acidic than alcohol because:',o:['Phenol is larger', 'Phenoxide ion stabilized by resonance', 'Phenol has more H', 'Alcohol is neutral'],a:1,e:'PhO⁻: negative charge delocalized over benzene ring (resonance) → stable → more acidic.',d:'easy'},
  {q:'Williamson synthesis produces:',o:['Alcohol', 'Ether (R-O-R)', 'Aldehyde', 'Ketone'],a:1,e:"RONa + R'X → R-O-R' + NaX. Synthesis of ethers.",d:'easy'},
  {q:'Kolbe reaction on phenol gives:',o:['Ether', 'Salicylic acid (ortho-hydroxybenzoic acid)', 'Alcohol', 'Ketone'],a:1,e:'Phenol + CO₂ + NaOH → Sodium salicylate → Salicylic acid.',d:'medium'},
  {q:'Iodoform test positive for:',o:['Methanol', 'Ethanol and methyl ketones', 'Methane', 'Butanol'],a:1,e:'CH₃CH(OH)- or CH₃CO- gives yellow CHI₃ precipitate.',d:'easy'},
  {q:'Dehydration of alcohol gives:',o:['Ester', 'Alkene', 'Aldehyde', 'Amine'],a:1,e:'Alcohol + conc H₂SO₄ at 170°C → Alkene + H₂O (elimination).',d:'easy'}
],

'chem-25': [
  {q:'Basicity order:',o:['Aromatic > Aliphatic', 'Aliphatic amines > NH₃ > Aromatic amines', 'NH₃ > all amines', 'All same'],a:1,e:'Aliphatic amines (more electron-donating) > NH₃ > Aniline (resonance decreases basicity).',d:'easy'},
  {q:'Carbylamine test is for:',o:['2° amines', '1° amines only', '3° amines', 'All amines'],a:1,e:'1° amine + CHCl₃ + KOH → Isocyanide (foul smell). Only primary amines.',d:'easy'},
  {q:'Hinsberg test distinguishes:',o:['Acids', '1°, 2°, 3° amines', 'Alcohols', 'Ketones'],a:1,e:'Hinsberg: 1° → soluble sulfonamide, 2° → insoluble, 3° → no reaction.',d:'easy'},
  {q:'Diazonium salt is formed from:',o:['Alcohol', 'Primary aromatic amine + HNO₂', 'Ketone', 'Ester'],a:1,e:'ArNH₂ + NaNO₂ + HCl (0-5°C) → ArN₂⁺Cl⁻.',d:'medium'},
  {q:'Sandmeyer reaction replaces N₂⁺ with:',o:['OH', 'Cl, Br, or CN', 'NH₂', 'CH₃'],a:1,e:'ArN₂⁺ + CuCl → ArCl, CuBr → ArBr, CuCN → ArCN.',d:'medium'},
  {q:'Gabriel phthalimide synthesis gives:',o:['1° amine', '2° amine', '3° amine', 'Amide'],a:0,e:'Gabriel: makes pure 1° amines from alkyl halides.',d:'medium'}
],

'chem-26': [
  {q:'Glucose is an:',o:['Amino acid', 'Aldohexose (aldehyde + 6C sugar)', 'Ketone', 'Lipid'],a:1,e:'Glucose = C₆H₁₂O₆. Aldehyde group + 6 carbons = aldohexose.',d:'easy'},
  {q:'Amino acids at isoelectric point are:',o:['Positively charged', 'Negatively charged', 'Zwitterionic (both + and -)', 'Neutral only'],a:2,e:'At pI: amino acid has both NH₃⁺ and COO⁻ (zwitterion). Net charge = 0.',d:'easy'},
  {q:'Peptide bond links:',o:['Two sugars', 'Two amino acids (-CO-NH-)', 'Two fatty acids', 'Two nucleotides'],a:1,e:'Peptide bond: -CO-NH- formed between -COOH of one AA and -NH₂ of another.',d:'easy'},
  {q:'DNA has sugar:',o:['Ribose', 'Deoxyribose', 'Glucose', 'Fructose'],a:1,e:"DNA: deoxyribose sugar. RNA: ribose sugar (has -OH at 2' position).",d:'easy'},
  {q:'Vitamin C deficiency causes:',o:['Night blindness', 'Scurvy', 'Rickets', 'Beriberi'],a:1,e:'Vitamin C (ascorbic acid) deficiency → scurvy (bleeding gums, slow healing).',d:'easy'},
  {q:'Fat-soluble vitamins:',o:['B and C', 'A, D, E, K', 'Only A', 'Only D'],a:1,e:'Fat-soluble: A, D, E, K. Water-soluble: B complex, C.',d:'easy'}
],

'chem-27': [
  {q:'Nylon 6,6 is made from:',o:['Hexamethylenediamine + Adipic acid', 'Caprolactam only', 'Ethylene only', 'Styrene only'],a:0,e:'Nylon 6,6: hexamethylenediamine (6C) + adipic acid (6C) → condensation polymer.',d:'easy'},
  {q:'Bakelite is:',o:['Thermoplastic', 'Thermosetting (cross-linked)', 'Elastomer', 'Fiber'],a:1,e:'Bakelite = phenol + formaldehyde → thermosetting (cannot be remolded).',d:'easy'},
  {q:'Natural rubber is polymer of:',o:['Ethylene', 'Isoprene (2-methyl-1,3-butadiene)', 'Styrene', 'Vinyl chloride'],a:1,e:'Natural rubber = cis-1,4-polyisoprene.',d:'easy'},
  {q:'PVC stands for:',o:['Poly Vinyl Chloride', 'Poly Vinyl Carbon', 'Pure Vinyl Compound', 'Plastic Vinyl Chemical'],a:0,e:'PVC = poly(vinyl chloride). Used in pipes, insulation.',d:'easy'},
  {q:'Teflon is polymer of:',o:['CF₂=CF₂ (tetrafluoroethylene)', 'CH₂=CH₂', 'CHCl=CHCl', 'CH₂=CHCl'],a:0,e:'PTFE (Teflon) = polytetrafluoroethylene. Non-stick, chemically resistant.',d:'easy'},
  {q:'Vulcanization of rubber uses:',o:['Oxygen', 'Sulfur', 'Nitrogen', 'Carbon'],a:1,e:'Vulcanization: heating rubber with sulfur → cross-links → stronger, elastic.',d:'easy'}
],

'chem-28': [
  {q:'Aspirin is:',o:['Antibiotic', 'Analgesic (painkiller) and antipyretic', 'Antacid', 'Antiseptic'],a:1,e:'Aspirin = acetylsalicylic acid. Analgesic + Antipyretic + Anti-inflammatory.',d:'easy'},
  {q:'Penicillin is:',o:['Analgesic', 'Antibiotic', 'Antacid', 'Tranquilizer'],a:1,e:'Penicillin: first antibiotic discovered by Alexander Fleming.',d:'easy'},
  {q:'Antacid neutralizes:',o:['Base in stomach', 'Excess HCl in stomach', 'Food', 'Water'],a:1,e:'Antacids (NaHCO₃, Mg(OH)₂): neutralize excess stomach acid.',d:'easy'},
  {q:'Soap is:',o:['Sodium salt of fatty acid', 'Sodium chloride', 'Detergent', 'Acid'],a:0,e:'Soap = RCOONa (sodium salt of long-chain fatty acid). Made by saponification.',d:'easy'},
  {q:'Difference between soap and detergent:',o:['No difference', 'Soap fails in hard water, detergent works', 'Detergent fails in hard water', 'Both fail'],a:1,e:'Soap forms scum with Ca²⁺/Mg²⁺ in hard water. Detergent works in all water.',d:'easy'},
  {q:'Antiseptic example:',o:['Dettol', 'Aspirin', 'Milk of magnesia', 'Morphine'],a:0,e:'Antiseptics: applied on living tissue. Dettol, iodine, boric acid.',d:'easy'}
],

'jp-1': [
  {q:'Dimensional formula of energy:',o:['[MLT⁻²]', '[ML²T⁻²]', '[MLT⁻¹]', '[ML²T⁻¹]'],a:1,e:'Energy = work = force × distance = [MLT⁻²][L] = [ML²T⁻²].',d:'easy'},
  {q:'1 parsec ≈',o:['3.26 light years', '1 light year', '10 light years', '100 km'],a:0,e:'Parsec = parallax second ≈ 3.26 light years.',d:'easy'},
  {q:'Significant figures in 0.0560:',o:['2', '3', '4', '5'],a:1,e:"Leading zeros don't count. 5,6,0(trailing) = 3 sig figs.",d:'medium'},
  {q:'Which is dimensionless?',o:['Force', 'Strain (ΔL/L)', 'Pressure', 'Energy'],a:1,e:'Strain = change in length/original length = dimensionless ratio.',d:'easy'},
  {q:'1 angstrom =',o:['10⁻⁸ m', '10⁻¹⁰ m', '10⁻¹² m', '10⁻⁶ m'],a:1,e:'1 Å = 10⁻¹⁰ m = 0.1 nm.',d:'easy'},
  {q:'Systematic error is:',o:['Random', 'Consistent in one direction', 'Unpredictable', 'Zero'],a:1,e:'Systematic errors are consistent and reproducible. Can be eliminated.',d:'easy'}
],

'jp-3': [
  {q:"Newton's 1st law defines:",o:['Force', 'Inertia', 'Energy', 'Power'],a:1,e:'1st law defines inertia: body at rest stays at rest unless acted upon.',d:'easy'},
  {q:'If F=0, body:',o:['Accelerates', 'Moves with constant velocity or stays at rest', 'Decelerates', 'Stops immediately'],a:1,e:'No net force → no acceleration → constant velocity (or rest).',d:'easy'},
  {q:'Friction on block on rough surface:',o:['Always kinetic', 'Static if not sliding, Kinetic if sliding', 'Always zero', 'Always maximum'],a:1,e:'Static friction when no relative motion. Kinetic when sliding.',d:'easy'},
  {q:'For circular motion, net force:',o:['Along tangent', 'Toward center (centripetal)', 'Away from center', 'Zero'],a:1,e:'Centripetal force = mv²/r directed toward center.',d:'easy'},
  {q:'Rocket works on:',o:['1st law', '3rd law (action-reaction)', '2nd law only', 'No law'],a:1,e:'Exhaust gases pushed back (action) → rocket pushed forward (reaction).',d:'easy'},
  {q:'Weight in lift going down with a=g:',o:['mg', '0 (weightlessness)', '2mg', 'mg/2'],a:1,e:'N = m(g-a). If a=g: N=0. Free fall = weightlessness.',d:'easy'}
],

'jp-4': [
  {q:'Work done against gravity lifting mass m by h:',o:['mgh', '½mv²', 'mgh + ½mv²', '0'],a:0,e:'W = mgh (force × displacement against gravity).',d:'easy'},
  {q:'Conservative force example:',o:['Friction', 'Gravity', 'Air resistance', 'Viscous force'],a:1,e:'Gravity is conservative: work done depends only on initial and final positions.',d:'easy'},
  {q:'Momentum is conserved when:',o:['No external force acts', 'Friction is present', 'Gravity acts', 'Always'],a:0,e:'In isolated system (no external force), total momentum is conserved.',d:'easy'},
  {q:'In perfectly inelastic collision:',o:['Bodies bounce back', 'Bodies stick together', 'KE is conserved', 'Both separate'],a:1,e:'Perfectly inelastic: bodies stick. Maximum KE loss. Momentum still conserved.',d:'easy'},
  {q:'If speed doubles, KE becomes:',o:['2 times', '4 times', '8 times', 'Same'],a:1,e:'KE = ½mv². Speed ×2 → KE ×4.',d:'easy'},
  {q:'1 HP =',o:['746 W', '100 W', '1000 W', '500 W'],a:0,e:'1 Horsepower = 746 Watts.',d:'easy'}
],

'jc-1': [
  {q:'JEE Mole: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE Mole shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE Mole: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for Mole. Focus on conceptual traps.',d:'easy'},
  {q:'JEE Mole: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of Mole concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE Mole: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing Mole.',d:'medium'},
  {q:'JEE Mole: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of Mole. Don't just memorize formulas.",d:'easy'},
  {q:'JEE Mole: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Mole concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-2': [
  {q:'JEE Atomic: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE Atomic shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE Atomic: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for Atomic. Focus on conceptual traps.',d:'easy'},
  {q:'JEE Atomic: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of Atomic concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE Atomic: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing Atomic.',d:'medium'},
  {q:'JEE Atomic: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of Atomic. Don't just memorize formulas.",d:'easy'},
  {q:'JEE Atomic: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Atomic concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-3': [
  {q:'JEE Bonding: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE Bonding shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE Bonding: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for Bonding. Focus on conceptual traps.',d:'easy'},
  {q:'JEE Bonding: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of Bonding concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE Bonding: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing Bonding.',d:'medium'},
  {q:'JEE Bonding: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of Bonding. Don't just memorize formulas.",d:'easy'},
  {q:'JEE Bonding: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Bonding concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-4': [
  {q:'JEE Thermo: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE Thermo shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE Thermo: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for Thermo. Focus on conceptual traps.',d:'easy'},
  {q:'JEE Thermo: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of Thermo concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE Thermo: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing Thermo.',d:'medium'},
  {q:'JEE Thermo: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of Thermo. Don't just memorize formulas.",d:'easy'},
  {q:'JEE Thermo: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Thermo concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-5': [
  {q:'JEE Equilibrium: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE Equilibrium shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE Equilibrium: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for Equilibrium. Focus on conceptual traps.',d:'easy'},
  {q:'JEE Equilibrium: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of Equilibrium concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE Equilibrium: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing Equilibrium.',d:'medium'},
  {q:'JEE Equilibrium: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of Equilibrium. Don't just memorize formulas.",d:'easy'},
  {q:'JEE Equilibrium: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Equilibrium concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-6': [
  {q:'JEE States: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE States shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE States: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for States. Focus on conceptual traps.',d:'easy'},
  {q:'JEE States: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of States concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE States: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing States.',d:'medium'},
  {q:'JEE States: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of States. Don't just memorize formulas.",d:'easy'},
  {q:'JEE States: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise States concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-7': [
  {q:'JEE Redox: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE Redox shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE Redox: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for Redox. Focus on conceptual traps.',d:'easy'},
  {q:'JEE Redox: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of Redox concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE Redox: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing Redox.',d:'medium'},
  {q:'JEE Redox: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of Redox. Don't just memorize formulas.",d:'easy'},
  {q:'JEE Redox: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Redox concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-8': [
  {q:'JEE Periodic: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE Periodic shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE Periodic: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for Periodic. Focus on conceptual traps.',d:'easy'},
  {q:'JEE Periodic: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of Periodic concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE Periodic: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing Periodic.',d:'medium'},
  {q:'JEE Periodic: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of Periodic. Don't just memorize formulas.",d:'easy'},
  {q:'JEE Periodic: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Periodic concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-9': [
  {q:'JEE s-Block: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE s-Block shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE s-Block: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for s-Block. Focus on conceptual traps.',d:'easy'},
  {q:'JEE s-Block: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of s-Block concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE s-Block: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing s-Block.',d:'medium'},
  {q:'JEE s-Block: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of s-Block. Don't just memorize formulas.",d:'easy'},
  {q:'JEE s-Block: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise s-Block concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-10': [
  {q:'JEE p-Block: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE p-Block shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE p-Block: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for p-Block. Focus on conceptual traps.',d:'easy'},
  {q:'JEE p-Block: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of p-Block concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE p-Block: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing p-Block.',d:'medium'},
  {q:'JEE p-Block: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of p-Block. Don't just memorize formulas.",d:'easy'},
  {q:'JEE p-Block: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise p-Block concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-12': [
  {q:'JEE HC: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE HC shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE HC: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for HC. Focus on conceptual traps.',d:'easy'},
  {q:'JEE HC: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of HC concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE HC: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing HC.',d:'medium'},
  {q:'JEE HC: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of HC. Don't just memorize formulas.",d:'easy'},
  {q:'JEE HC: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise HC concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-13': [
  {q:'JEE H-Env: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE H-Env shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE H-Env: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for H-Env. Focus on conceptual traps.',d:'easy'},
  {q:'JEE H-Env: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of H-Env concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE H-Env: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing H-Env.',d:'medium'},
  {q:'JEE H-Env: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of H-Env. Don't just memorize formulas.",d:'easy'},
  {q:'JEE H-Env: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise H-Env concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-14': [
  {q:'JEE Solutions: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE Solutions shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE Solutions: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for Solutions. Focus on conceptual traps.',d:'easy'},
  {q:'JEE Solutions: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of Solutions concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE Solutions: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing Solutions.',d:'medium'},
  {q:'JEE Solutions: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of Solutions. Don't just memorize formulas.",d:'easy'},
  {q:'JEE Solutions: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Solutions concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-15': [
  {q:'JEE Electro: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE Electro shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE Electro: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for Electro. Focus on conceptual traps.',d:'easy'},
  {q:'JEE Electro: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of Electro concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE Electro: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing Electro.',d:'medium'},
  {q:'JEE Electro: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of Electro. Don't just memorize formulas.",d:'easy'},
  {q:'JEE Electro: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Electro concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-16': [
  {q:'JEE Kinetics: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE Kinetics shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE Kinetics: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for Kinetics. Focus on conceptual traps.',d:'easy'},
  {q:'JEE Kinetics: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of Kinetics concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE Kinetics: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing Kinetics.',d:'medium'},
  {q:'JEE Kinetics: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of Kinetics. Don't just memorize formulas.",d:'easy'},
  {q:'JEE Kinetics: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Kinetics concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-17': [
  {q:'JEE Surface: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE Surface shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE Surface: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for Surface. Focus on conceptual traps.',d:'easy'},
  {q:'JEE Surface: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of Surface concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE Surface: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing Surface.',d:'medium'},
  {q:'JEE Surface: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of Surface. Don't just memorize formulas.",d:'easy'},
  {q:'JEE Surface: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Surface concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-18': [
  {q:'JEE p-Block2: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE p-Block2 shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE p-Block2: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for p-Block2. Focus on conceptual traps.',d:'easy'},
  {q:'JEE p-Block2: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of p-Block2 concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE p-Block2: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing p-Block2.',d:'medium'},
  {q:'JEE p-Block2: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of p-Block2. Don't just memorize formulas.",d:'easy'},
  {q:'JEE p-Block2: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise p-Block2 concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-19': [
  {q:'JEE d-f: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE d-f shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE d-f: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for d-f. Focus on conceptual traps.',d:'easy'},
  {q:'JEE d-f: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of d-f concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE d-f: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing d-f.',d:'medium'},
  {q:'JEE d-f: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of d-f. Don't just memorize formulas.",d:'easy'},
  {q:'JEE d-f: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise d-f concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-20': [
  {q:'JEE Coord: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE Coord shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE Coord: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for Coord. Focus on conceptual traps.',d:'easy'},
  {q:'JEE Coord: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of Coord concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE Coord: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing Coord.',d:'medium'},
  {q:'JEE Coord: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of Coord. Don't just memorize formulas.",d:'easy'},
  {q:'JEE Coord: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Coord concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-21': [
  {q:'JEE Haloalkanes: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE Haloalkanes shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE Haloalkanes: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for Haloalkanes. Focus on conceptual traps.',d:'easy'},
  {q:'JEE Haloalkanes: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of Haloalkanes concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE Haloalkanes: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing Haloalkanes.',d:'medium'},
  {q:'JEE Haloalkanes: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of Haloalkanes. Don't just memorize formulas.",d:'easy'},
  {q:'JEE Haloalkanes: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Haloalkanes concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-22': [
  {q:'JEE Alcohols: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE Alcohols shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE Alcohols: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for Alcohols. Focus on conceptual traps.',d:'easy'},
  {q:'JEE Alcohols: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of Alcohols concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE Alcohols: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing Alcohols.',d:'medium'},
  {q:'JEE Alcohols: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of Alcohols. Don't just memorize formulas.",d:'easy'},
  {q:'JEE Alcohols: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Alcohols concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-23': [
  {q:'JEE Carbonyls: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE Carbonyls shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE Carbonyls: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for Carbonyls. Focus on conceptual traps.',d:'easy'},
  {q:'JEE Carbonyls: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of Carbonyls concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE Carbonyls: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing Carbonyls.',d:'medium'},
  {q:'JEE Carbonyls: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of Carbonyls. Don't just memorize formulas.",d:'easy'},
  {q:'JEE Carbonyls: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Carbonyls concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-24': [
  {q:'JEE Amines: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE Amines shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE Amines: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for Amines. Focus on conceptual traps.',d:'easy'},
  {q:'JEE Amines: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of Amines concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE Amines: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing Amines.',d:'medium'},
  {q:'JEE Amines: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of Amines. Don't just memorize formulas.",d:'easy'},
  {q:'JEE Amines: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Amines concepts regularly. Make formula sheets.',d:'easy'}
],

'jc-25': [
  {q:'JEE Bio-Poly: Same concepts as NEET. Focus on numerical depth and application. Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'JEE Bio-Poly shares syllabus with NEET but tests deeper problem-solving. Practice HC Verma/OP Tandon.',d:'easy'},
  {q:'JEE Bio-Poly: Practice advanced problems. Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve previous year JEE papers for Bio-Poly. Focus on conceptual traps.',d:'easy'},
  {q:'JEE Bio-Poly: Application-based Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'JEE tests application of Bio-Poly concepts. Practice numerical problems daily.',d:'medium'},
  {q:'JEE Bio-Poly: Numerical Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Speed and accuracy matter in JEE. Time yourself while practicing Bio-Poly.',d:'medium'},
  {q:'JEE Bio-Poly: Conceptual Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:"Understand fundamentals of Bio-Poly. Don't just memorize formulas.",d:'easy'},
  {q:'JEE Bio-Poly: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Bio-Poly concepts regularly. Make formula sheets.',d:'easy'}
],

'jm-1': [
  {q:'JEE Maths Sets: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Practice RD Sharma and Cengage for Sets. Focus on speed.',d:'easy'},
  {q:'JEE Maths Sets: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve 50+ problems from Sets chapter.',d:'easy'},
  {q:'JEE Maths Sets: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Sets is tested regularly. Practice PYQs.',d:'medium'},
  {q:'JEE Maths Sets: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Conceptual understanding of Sets is key.',d:'medium'},
  {q:'JEE Maths Sets: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Make formula sheet for Sets. Revise daily.',d:'easy'},
  {q:'JEE Maths Sets: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Sets: practice both easy and hard problems.',d:'easy'}
],

'jm-2': [
  {q:'JEE Maths Complex: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Practice RD Sharma and Cengage for Complex. Focus on speed.',d:'easy'},
  {q:'JEE Maths Complex: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve 50+ problems from Complex chapter.',d:'easy'},
  {q:'JEE Maths Complex: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Complex is tested regularly. Practice PYQs.',d:'medium'},
  {q:'JEE Maths Complex: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Conceptual understanding of Complex is key.',d:'medium'},
  {q:'JEE Maths Complex: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Make formula sheet for Complex. Revise daily.',d:'easy'},
  {q:'JEE Maths Complex: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Complex: practice both easy and hard problems.',d:'easy'}
],

'jm-3': [
  {q:'JEE Maths Quadratic: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Practice RD Sharma and Cengage for Quadratic. Focus on speed.',d:'easy'},
  {q:'JEE Maths Quadratic: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve 50+ problems from Quadratic chapter.',d:'easy'},
  {q:'JEE Maths Quadratic: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Quadratic is tested regularly. Practice PYQs.',d:'medium'},
  {q:'JEE Maths Quadratic: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Conceptual understanding of Quadratic is key.',d:'medium'},
  {q:'JEE Maths Quadratic: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Make formula sheet for Quadratic. Revise daily.',d:'easy'},
  {q:'JEE Maths Quadratic: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Quadratic: practice both easy and hard problems.',d:'easy'}
],

'jm-5': [
  {q:'JEE Maths Binomial: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Practice RD Sharma and Cengage for Binomial. Focus on speed.',d:'easy'},
  {q:'JEE Maths Binomial: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve 50+ problems from Binomial chapter.',d:'easy'},
  {q:'JEE Maths Binomial: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Binomial is tested regularly. Practice PYQs.',d:'medium'},
  {q:'JEE Maths Binomial: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Conceptual understanding of Binomial is key.',d:'medium'},
  {q:'JEE Maths Binomial: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Make formula sheet for Binomial. Revise daily.',d:'easy'},
  {q:'JEE Maths Binomial: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Binomial: practice both easy and hard problems.',d:'easy'}
],

'jm-6': [
  {q:'JEE Maths PnC: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Practice RD Sharma and Cengage for PnC. Focus on speed.',d:'easy'},
  {q:'JEE Maths PnC: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve 50+ problems from PnC chapter.',d:'easy'},
  {q:'JEE Maths PnC: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'PnC is tested regularly. Practice PYQs.',d:'medium'},
  {q:'JEE Maths PnC: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Conceptual understanding of PnC is key.',d:'medium'},
  {q:'JEE Maths PnC: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Make formula sheet for PnC. Revise daily.',d:'easy'},
  {q:'JEE Maths PnC: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'PnC: practice both easy and hard problems.',d:'easy'}
],

'jm-7': [
  {q:'JEE Maths Trig: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Practice RD Sharma and Cengage for Trig. Focus on speed.',d:'easy'},
  {q:'JEE Maths Trig: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve 50+ problems from Trig chapter.',d:'easy'},
  {q:'JEE Maths Trig: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Trig is tested regularly. Practice PYQs.',d:'medium'},
  {q:'JEE Maths Trig: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Conceptual understanding of Trig is key.',d:'medium'},
  {q:'JEE Maths Trig: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Make formula sheet for Trig. Revise daily.',d:'easy'},
  {q:'JEE Maths Trig: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Trig: practice both easy and hard problems.',d:'easy'}
],

'jm-8': [
  {q:'JEE Maths Lines: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Practice RD Sharma and Cengage for Lines. Focus on speed.',d:'easy'},
  {q:'JEE Maths Lines: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve 50+ problems from Lines chapter.',d:'easy'},
  {q:'JEE Maths Lines: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Lines is tested regularly. Practice PYQs.',d:'medium'},
  {q:'JEE Maths Lines: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Conceptual understanding of Lines is key.',d:'medium'},
  {q:'JEE Maths Lines: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Make formula sheet for Lines. Revise daily.',d:'easy'},
  {q:'JEE Maths Lines: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Lines: practice both easy and hard problems.',d:'easy'}
],

'jm-9': [
  {q:'JEE Maths Circles: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Practice RD Sharma and Cengage for Circles. Focus on speed.',d:'easy'},
  {q:'JEE Maths Circles: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve 50+ problems from Circles chapter.',d:'easy'},
  {q:'JEE Maths Circles: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Circles is tested regularly. Practice PYQs.',d:'medium'},
  {q:'JEE Maths Circles: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Conceptual understanding of Circles is key.',d:'medium'},
  {q:'JEE Maths Circles: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Make formula sheet for Circles. Revise daily.',d:'easy'},
  {q:'JEE Maths Circles: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Circles: practice both easy and hard problems.',d:'easy'}
],

'jm-10': [
  {q:'JEE Maths Conics: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Practice RD Sharma and Cengage for Conics. Focus on speed.',d:'easy'},
  {q:'JEE Maths Conics: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve 50+ problems from Conics chapter.',d:'easy'},
  {q:'JEE Maths Conics: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Conics is tested regularly. Practice PYQs.',d:'medium'},
  {q:'JEE Maths Conics: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Conceptual understanding of Conics is key.',d:'medium'},
  {q:'JEE Maths Conics: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Make formula sheet for Conics. Revise daily.',d:'easy'},
  {q:'JEE Maths Conics: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Conics: practice both easy and hard problems.',d:'easy'}
],

'jm-11': [
  {q:'JEE Maths Stats: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Practice RD Sharma and Cengage for Stats. Focus on speed.',d:'easy'},
  {q:'JEE Maths Stats: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve 50+ problems from Stats chapter.',d:'easy'},
  {q:'JEE Maths Stats: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Stats is tested regularly. Practice PYQs.',d:'medium'},
  {q:'JEE Maths Stats: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Conceptual understanding of Stats is key.',d:'medium'},
  {q:'JEE Maths Stats: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Make formula sheet for Stats. Revise daily.',d:'easy'},
  {q:'JEE Maths Stats: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Stats: practice both easy and hard problems.',d:'easy'}
],

'jm-12': [
  {q:'JEE Maths Reasoning: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Practice RD Sharma and Cengage for Reasoning. Focus on speed.',d:'easy'},
  {q:'JEE Maths Reasoning: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve 50+ problems from Reasoning chapter.',d:'easy'},
  {q:'JEE Maths Reasoning: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Reasoning is tested regularly. Practice PYQs.',d:'medium'},
  {q:'JEE Maths Reasoning: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Conceptual understanding of Reasoning is key.',d:'medium'},
  {q:'JEE Maths Reasoning: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Make formula sheet for Reasoning. Revise daily.',d:'easy'},
  {q:'JEE Maths Reasoning: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Reasoning: practice both easy and hard problems.',d:'easy'}
],

'jm-14': [
  {q:'JEE Maths Limits: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Practice RD Sharma and Cengage for Limits. Focus on speed.',d:'easy'},
  {q:'JEE Maths Limits: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve 50+ problems from Limits chapter.',d:'easy'},
  {q:'JEE Maths Limits: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Limits is tested regularly. Practice PYQs.',d:'medium'},
  {q:'JEE Maths Limits: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Conceptual understanding of Limits is key.',d:'medium'},
  {q:'JEE Maths Limits: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Make formula sheet for Limits. Revise daily.',d:'easy'},
  {q:'JEE Maths Limits: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Limits: practice both easy and hard problems.',d:'easy'}
],

'jm-15': [
  {q:'JEE Maths Differentiation: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Practice RD Sharma and Cengage for Differentiation. Focus on speed.',d:'easy'},
  {q:'JEE Maths Differentiation: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve 50+ problems from Differentiation chapter.',d:'easy'},
  {q:'JEE Maths Differentiation: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Differentiation is tested regularly. Practice PYQs.',d:'medium'},
  {q:'JEE Maths Differentiation: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Conceptual understanding of Differentiation is key.',d:'medium'},
  {q:'JEE Maths Differentiation: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Make formula sheet for Differentiation. Revise daily.',d:'easy'},
  {q:'JEE Maths Differentiation: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Differentiation: practice both easy and hard problems.',d:'easy'}
],

'jm-17': [
  {q:'JEE Maths Area: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Practice RD Sharma and Cengage for Area. Focus on speed.',d:'easy'},
  {q:'JEE Maths Area: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve 50+ problems from Area chapter.',d:'easy'},
  {q:'JEE Maths Area: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Area is tested regularly. Practice PYQs.',d:'medium'},
  {q:'JEE Maths Area: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Conceptual understanding of Area is key.',d:'medium'},
  {q:'JEE Maths Area: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Make formula sheet for Area. Revise daily.',d:'easy'},
  {q:'JEE Maths Area: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Area: practice both easy and hard problems.',d:'easy'}
],

'jm-18': [
  {q:'JEE Maths DE: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Practice RD Sharma and Cengage for DE. Focus on speed.',d:'easy'},
  {q:'JEE Maths DE: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve 50+ problems from DE chapter.',d:'easy'},
  {q:'JEE Maths DE: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'DE is tested regularly. Practice PYQs.',d:'medium'},
  {q:'JEE Maths DE: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Conceptual understanding of DE is key.',d:'medium'},
  {q:'JEE Maths DE: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Make formula sheet for DE. Revise daily.',d:'easy'},
  {q:'JEE Maths DE: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'DE: practice both easy and hard problems.',d:'easy'}
],

'jm-19': [
  {q:'JEE Maths Vectors: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Practice RD Sharma and Cengage for Vectors. Focus on speed.',d:'easy'},
  {q:'JEE Maths Vectors: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve 50+ problems from Vectors chapter.',d:'easy'},
  {q:'JEE Maths Vectors: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Vectors is tested regularly. Practice PYQs.',d:'medium'},
  {q:'JEE Maths Vectors: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Conceptual understanding of Vectors is key.',d:'medium'},
  {q:'JEE Maths Vectors: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Make formula sheet for Vectors. Revise daily.',d:'easy'},
  {q:'JEE Maths Vectors: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Vectors: practice both easy and hard problems.',d:'easy'}
],

'jm-20': [
  {q:'JEE Maths 3D: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Practice RD Sharma and Cengage for 3D. Focus on speed.',d:'easy'},
  {q:'JEE Maths 3D: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve 50+ problems from 3D chapter.',d:'easy'},
  {q:'JEE Maths 3D: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'3D is tested regularly. Practice PYQs.',d:'medium'},
  {q:'JEE Maths 3D: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Conceptual understanding of 3D is key.',d:'medium'},
  {q:'JEE Maths 3D: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Make formula sheet for 3D. Revise daily.',d:'easy'},
  {q:'JEE Maths 3D: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'3D: practice both easy and hard problems.',d:'easy'}
],

'jm-21': [
  {q:'JEE Maths Probability: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Practice RD Sharma and Cengage for Probability. Focus on speed.',d:'easy'},
  {q:'JEE Maths Probability: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve 50+ problems from Probability chapter.',d:'easy'},
  {q:'JEE Maths Probability: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Probability is tested regularly. Practice PYQs.',d:'medium'},
  {q:'JEE Maths Probability: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Conceptual understanding of Probability is key.',d:'medium'},
  {q:'JEE Maths Probability: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Make formula sheet for Probability. Revise daily.',d:'easy'},
  {q:'JEE Maths Probability: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Probability: practice both easy and hard problems.',d:'easy'}
],

'jm-22': [
  {q:'JEE Maths Inverse Trig: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Practice RD Sharma and Cengage for Inverse Trig. Focus on speed.',d:'easy'},
  {q:'JEE Maths Inverse Trig: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve 50+ problems from Inverse Trig chapter.',d:'easy'},
  {q:'JEE Maths Inverse Trig: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Inverse Trig is tested regularly. Practice PYQs.',d:'medium'},
  {q:'JEE Maths Inverse Trig: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Conceptual understanding of Inverse Trig is key.',d:'medium'},
  {q:'JEE Maths Inverse Trig: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Make formula sheet for Inverse Trig. Revise daily.',d:'easy'},
  {q:'JEE Maths Inverse Trig: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Inverse Trig: practice both easy and hard problems.',d:'easy'}
],

'jm-23': [
  {q:'JEE Maths LP: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Practice RD Sharma and Cengage for LP. Focus on speed.',d:'easy'},
  {q:'JEE Maths LP: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Solve 50+ problems from LP chapter.',d:'easy'},
  {q:'JEE Maths LP: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'LP is tested regularly. Practice PYQs.',d:'medium'},
  {q:'JEE Maths LP: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Conceptual understanding of LP is key.',d:'medium'},
  {q:'JEE Maths LP: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Make formula sheet for LP. Revise daily.',d:'easy'},
  {q:'JEE Maths LP: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'LP: practice both easy and hard problems.',d:'easy'}
],

'cl-2': [
  {q:'CLAT Torts: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study AP Bhardwaj for Torts. Practice passage-based questions.',d:'easy'},
  {q:'CLAT Torts: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Read The Hindu daily for Torts preparation.',d:'easy'},
  {q:'CLAT Torts: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Practice previous year CLAT papers for Torts.',d:'medium'},
  {q:'CLAT Torts: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'All CLAT questions are passage-based since 2020. Practice speed reading.',d:'medium'},
  {q:'CLAT Torts: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Torts: focus on application, not memorization.',d:'easy'},
  {q:'CLAT Torts: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Regular practice of Torts section improves speed and accuracy.',d:'easy'}
],

'cl-3': [
  {q:'CLAT Contract: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study AP Bhardwaj for Contract. Practice passage-based questions.',d:'easy'},
  {q:'CLAT Contract: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Read The Hindu daily for Contract preparation.',d:'easy'},
  {q:'CLAT Contract: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Practice previous year CLAT papers for Contract.',d:'medium'},
  {q:'CLAT Contract: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'All CLAT questions are passage-based since 2020. Practice speed reading.',d:'medium'},
  {q:'CLAT Contract: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Contract: focus on application, not memorization.',d:'easy'},
  {q:'CLAT Contract: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Regular practice of Contract section improves speed and accuracy.',d:'easy'}
],

'cl-4': [
  {q:'CLAT Criminal: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study AP Bhardwaj for Criminal. Practice passage-based questions.',d:'easy'},
  {q:'CLAT Criminal: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Read The Hindu daily for Criminal preparation.',d:'easy'},
  {q:'CLAT Criminal: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Practice previous year CLAT papers for Criminal.',d:'medium'},
  {q:'CLAT Criminal: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'All CLAT questions are passage-based since 2020. Practice speed reading.',d:'medium'},
  {q:'CLAT Criminal: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Criminal: focus on application, not memorization.',d:'easy'},
  {q:'CLAT Criminal: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Regular practice of Criminal section improves speed and accuracy.',d:'easy'}
],

'cl-5': [
  {q:'CLAT Constitutional: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study AP Bhardwaj for Constitutional. Practice passage-based questions.',d:'easy'},
  {q:'CLAT Constitutional: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Read The Hindu daily for Constitutional preparation.',d:'easy'},
  {q:'CLAT Constitutional: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Practice previous year CLAT papers for Constitutional.',d:'medium'},
  {q:'CLAT Constitutional: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'All CLAT questions are passage-based since 2020. Practice speed reading.',d:'medium'},
  {q:'CLAT Constitutional: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Constitutional: focus on application, not memorization.',d:'easy'},
  {q:'CLAT Constitutional: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Regular practice of Constitutional section improves speed and accuracy.',d:'easy'}
],

'cl-6': [
  {q:'CLAT Maxims: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study AP Bhardwaj for Maxims. Practice passage-based questions.',d:'easy'},
  {q:'CLAT Maxims: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Read The Hindu daily for Maxims preparation.',d:'easy'},
  {q:'CLAT Maxims: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Practice previous year CLAT papers for Maxims.',d:'medium'},
  {q:'CLAT Maxims: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'All CLAT questions are passage-based since 2020. Practice speed reading.',d:'medium'},
  {q:'CLAT Maxims: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Maxims: focus on application, not memorization.',d:'easy'},
  {q:'CLAT Maxims: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Regular practice of Maxims section improves speed and accuracy.',d:'easy'}
],

'clo-2': [
  {q:'CLAT Assumptions: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study AP Bhardwaj for Assumptions. Practice passage-based questions.',d:'easy'},
  {q:'CLAT Assumptions: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Read The Hindu daily for Assumptions preparation.',d:'easy'},
  {q:'CLAT Assumptions: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Practice previous year CLAT papers for Assumptions.',d:'medium'},
  {q:'CLAT Assumptions: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'All CLAT questions are passage-based since 2020. Practice speed reading.',d:'medium'},
  {q:'CLAT Assumptions: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Assumptions: focus on application, not memorization.',d:'easy'},
  {q:'CLAT Assumptions: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Regular practice of Assumptions section improves speed and accuracy.',d:'easy'}
],

'clo-3': [
  {q:'CLAT Strengthen: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study AP Bhardwaj for Strengthen. Practice passage-based questions.',d:'easy'},
  {q:'CLAT Strengthen: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Read The Hindu daily for Strengthen preparation.',d:'easy'},
  {q:'CLAT Strengthen: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Practice previous year CLAT papers for Strengthen.',d:'medium'},
  {q:'CLAT Strengthen: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'All CLAT questions are passage-based since 2020. Practice speed reading.',d:'medium'},
  {q:'CLAT Strengthen: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Strengthen: focus on application, not memorization.',d:'easy'},
  {q:'CLAT Strengthen: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Regular practice of Strengthen section improves speed and accuracy.',d:'easy'}
],

'clo-4': [
  {q:'CLAT Analogies: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study AP Bhardwaj for Analogies. Practice passage-based questions.',d:'easy'},
  {q:'CLAT Analogies: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Read The Hindu daily for Analogies preparation.',d:'easy'},
  {q:'CLAT Analogies: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Practice previous year CLAT papers for Analogies.',d:'medium'},
  {q:'CLAT Analogies: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'All CLAT questions are passage-based since 2020. Practice speed reading.',d:'medium'},
  {q:'CLAT Analogies: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Analogies: focus on application, not memorization.',d:'easy'},
  {q:'CLAT Analogies: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Regular practice of Analogies section improves speed and accuracy.',d:'easy'}
],

'clo-5': [
  {q:'CLAT Critical: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study AP Bhardwaj for Critical. Practice passage-based questions.',d:'easy'},
  {q:'CLAT Critical: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Read The Hindu daily for Critical preparation.',d:'easy'},
  {q:'CLAT Critical: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Practice previous year CLAT papers for Critical.',d:'medium'},
  {q:'CLAT Critical: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'All CLAT questions are passage-based since 2020. Practice speed reading.',d:'medium'},
  {q:'CLAT Critical: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Critical: focus on application, not memorization.',d:'easy'},
  {q:'CLAT Critical: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Regular practice of Critical section improves speed and accuracy.',d:'easy'}
],

'ce-2': [
  {q:'CLAT Vocabulary: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study AP Bhardwaj for Vocabulary. Practice passage-based questions.',d:'easy'},
  {q:'CLAT Vocabulary: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Read The Hindu daily for Vocabulary preparation.',d:'easy'},
  {q:'CLAT Vocabulary: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Practice previous year CLAT papers for Vocabulary.',d:'medium'},
  {q:'CLAT Vocabulary: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'All CLAT questions are passage-based since 2020. Practice speed reading.',d:'medium'},
  {q:'CLAT Vocabulary: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Vocabulary: focus on application, not memorization.',d:'easy'},
  {q:'CLAT Vocabulary: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Regular practice of Vocabulary section improves speed and accuracy.',d:'easy'}
],

'ce-3': [
  {q:'CLAT Grammar: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study AP Bhardwaj for Grammar. Practice passage-based questions.',d:'easy'},
  {q:'CLAT Grammar: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Read The Hindu daily for Grammar preparation.',d:'easy'},
  {q:'CLAT Grammar: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Practice previous year CLAT papers for Grammar.',d:'medium'},
  {q:'CLAT Grammar: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'All CLAT questions are passage-based since 2020. Practice speed reading.',d:'medium'},
  {q:'CLAT Grammar: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Grammar: focus on application, not memorization.',d:'easy'},
  {q:'CLAT Grammar: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Regular practice of Grammar section improves speed and accuracy.',d:'easy'}
],

'ce-4': [
  {q:'CLAT Summary: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study AP Bhardwaj for Summary. Practice passage-based questions.',d:'easy'},
  {q:'CLAT Summary: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Read The Hindu daily for Summary preparation.',d:'easy'},
  {q:'CLAT Summary: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Practice previous year CLAT papers for Summary.',d:'medium'},
  {q:'CLAT Summary: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'All CLAT questions are passage-based since 2020. Practice speed reading.',d:'medium'},
  {q:'CLAT Summary: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Summary: focus on application, not memorization.',d:'easy'},
  {q:'CLAT Summary: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Regular practice of Summary section improves speed and accuracy.',d:'easy'}
],

'ce-5': [
  {q:'CLAT ParaJumble: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study AP Bhardwaj for ParaJumble. Practice passage-based questions.',d:'easy'},
  {q:'CLAT ParaJumble: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Read The Hindu daily for ParaJumble preparation.',d:'easy'},
  {q:'CLAT ParaJumble: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Practice previous year CLAT papers for ParaJumble.',d:'medium'},
  {q:'CLAT ParaJumble: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'All CLAT questions are passage-based since 2020. Practice speed reading.',d:'medium'},
  {q:'CLAT ParaJumble: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'ParaJumble: focus on application, not memorization.',d:'easy'},
  {q:'CLAT ParaJumble: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Regular practice of ParaJumble section improves speed and accuracy.',d:'easy'}
],

'cg-1': [
  {q:'CLAT News: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study AP Bhardwaj for News. Practice passage-based questions.',d:'easy'},
  {q:'CLAT News: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Read The Hindu daily for News preparation.',d:'easy'},
  {q:'CLAT News: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Practice previous year CLAT papers for News.',d:'medium'},
  {q:'CLAT News: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'All CLAT questions are passage-based since 2020. Practice speed reading.',d:'medium'},
  {q:'CLAT News: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'News: focus on application, not memorization.',d:'easy'},
  {q:'CLAT News: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Regular practice of News section improves speed and accuracy.',d:'easy'}
],

'cg-2': [
  {q:'CLAT Schemes: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study AP Bhardwaj for Schemes. Practice passage-based questions.',d:'easy'},
  {q:'CLAT Schemes: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Read The Hindu daily for Schemes preparation.',d:'easy'},
  {q:'CLAT Schemes: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Practice previous year CLAT papers for Schemes.',d:'medium'},
  {q:'CLAT Schemes: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'All CLAT questions are passage-based since 2020. Practice speed reading.',d:'medium'},
  {q:'CLAT Schemes: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Schemes: focus on application, not memorization.',d:'easy'},
  {q:'CLAT Schemes: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Regular practice of Schemes section improves speed and accuracy.',d:'easy'}
],

'cg-3': [
  {q:'CLAT Sports: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study AP Bhardwaj for Sports. Practice passage-based questions.',d:'easy'},
  {q:'CLAT Sports: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Read The Hindu daily for Sports preparation.',d:'easy'},
  {q:'CLAT Sports: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Practice previous year CLAT papers for Sports.',d:'medium'},
  {q:'CLAT Sports: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'All CLAT questions are passage-based since 2020. Practice speed reading.',d:'medium'},
  {q:'CLAT Sports: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Sports: focus on application, not memorization.',d:'easy'},
  {q:'CLAT Sports: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Regular practice of Sports section improves speed and accuracy.',d:'easy'}
],

'cg-4': [
  {q:'CLAT SciTech: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study AP Bhardwaj for SciTech. Practice passage-based questions.',d:'easy'},
  {q:'CLAT SciTech: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Read The Hindu daily for SciTech preparation.',d:'easy'},
  {q:'CLAT SciTech: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Practice previous year CLAT papers for SciTech.',d:'medium'},
  {q:'CLAT SciTech: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'All CLAT questions are passage-based since 2020. Practice speed reading.',d:'medium'},
  {q:'CLAT SciTech: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'SciTech: focus on application, not memorization.',d:'easy'},
  {q:'CLAT SciTech: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Regular practice of SciTech section improves speed and accuracy.',d:'easy'}
],

'cg-5': [
  {q:'CLAT History: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study AP Bhardwaj for History. Practice passage-based questions.',d:'easy'},
  {q:'CLAT History: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Read The Hindu daily for History preparation.',d:'easy'},
  {q:'CLAT History: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Practice previous year CLAT papers for History.',d:'medium'},
  {q:'CLAT History: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'All CLAT questions are passage-based since 2020. Practice speed reading.',d:'medium'},
  {q:'CLAT History: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'History: focus on application, not memorization.',d:'easy'},
  {q:'CLAT History: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Regular practice of History section improves speed and accuracy.',d:'easy'}
],

'cg-7': [
  {q:'CLAT Legal Events: Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study AP Bhardwaj for Legal Events. Practice passage-based questions.',d:'easy'},
  {q:'CLAT Legal Events: Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Read The Hindu daily for Legal Events preparation.',d:'easy'},
  {q:'CLAT Legal Events: Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Practice previous year CLAT papers for Legal Events.',d:'medium'},
  {q:'CLAT Legal Events: Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'All CLAT questions are passage-based since 2020. Practice speed reading.',d:'medium'},
  {q:'CLAT Legal Events: Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Legal Events: focus on application, not memorization.',d:'easy'},
  {q:'CLAT Legal Events: Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Regular practice of Legal Events section improves speed and accuracy.',d:'easy'}
],
'jp-5': [
  {q:'COM of two equal masses is at:',o:['Closer to heavier', 'Midpoint', 'At one mass', 'Outside both'],a:1,e:'Equal masses: COM at geometric center/midpoint.',d:'easy'},
  {q:'In elastic collision, coefficient of restitution e =',o:['0', '1', '0.5', '∞'],a:1,e:'Elastic: e=1 (no KE loss). Perfectly inelastic: e=0.',d:'easy'},
  {q:'If no external force, total momentum:',o:['Changes', 'Conserved', 'Doubles', 'Zero always'],a:1,e:'Conservation of momentum when ΣF_ext = 0.',d:'easy'},
  {q:'COM of Earth-Moon system:',o:['At Earth center', 'At Moon center', 'Inside Earth (closer to Earth)', 'In space between'],a:2,e:'COM closer to heavier body (Earth). Located inside Earth.',d:'medium'},
  {q:'Impulse equals:',o:['Force', 'Change in momentum (FΔt)', 'Energy', 'Power'],a:1,e:'Impulse = FΔt = Δp (change in momentum).',d:'easy'},
  {q:'In head-on elastic collision of equal masses:',o:['Both stop', 'Velocities exchange', 'Both reverse', 'Nothing happens'],a:1,e:'Equal mass elastic collision: velocities exchange completely.',d:'easy'}
],

'jp-6': [
  {q:'MOI of solid sphere:',o:['MR²', '½MR²', '⅖MR²', '⅔MR²'],a:2,e:'Solid sphere: I = ⅖MR². Hollow sphere: I = ⅔MR².',d:'easy'},
  {q:'Angular momentum is conserved when:',o:['Net external force = 0', 'Net external torque = 0', 'Both', 'Neither'],a:1,e:'L = Iω is conserved when net external torque = 0.',d:'easy'},
  {q:'Parallel axis theorem: I =',o:['Icm + Md²', 'Icm - Md²', 'Icm/Md²', 'Md²'],a:0,e:'I about parallel axis = Icm + Md².',d:'easy'},
  {q:'Rolling KE:',o:['½mv² only', '½Iω² only', '½mv² + ½Iω²', 'Zero'],a:2,e:'Rolling = translation + rotation. KE = ½mv² + ½Iω².',d:'medium'},
  {q:'Torque τ =',o:['F×d', 'r × F', 'F/r', 'r/F'],a:1,e:'τ = r × F = rFsinθ.',d:'easy'},
  {q:'Radius of gyration K:',o:['I/M', '√(I/M)', 'I×M', 'M/I'],a:1,e:'I = MK². K = √(I/M). Effective distance of mass from axis.',d:'easy'}
],

'jp-7': [
  {q:'g at height h (h<<R):',o:['g(1-2h/R)', 'g(1+2h/R)', 'g/2', '2g'],a:0,e:"g decreases with height: g'=g(1-2h/R) for h<<R.",d:'easy'},
  {q:'Escape velocity is √2 times:',o:['Speed of light', 'Orbital velocity', 'Sound speed', 'Terminal velocity'],a:1,e:'ve = √2 × vo = √(2gR).',d:'easy'},
  {q:'Geostationary satellite time period:',o:['12 hours', '24 hours', '1 hour', '1 year'],a:1,e:'Geostationary: T = 24 hours. Same as Earth rotation.',d:'easy'},
  {q:'Weight at center of Earth:',o:['Maximum', 'Same as surface', 'Zero', 'Double'],a:2,e:'g=0 at center → Weight = mg = 0.',d:'easy'},
  {q:'Kepler 2nd law: equal areas means:',o:['Constant speed', 'Faster near sun, slower far away (areal velocity constant)', 'Constant acceleration', 'Zero gravity'],a:1,e:'Equal areas in equal times → planet moves faster when closer to sun.',d:'medium'},
  {q:'Satellite orbiting near Earth surface: T ≈',o:['24 hr', '84.6 min', '60 min', '365 days'],a:1,e:'T = 2π√(R/g) ≈ 84.6 minutes for near-surface orbit.',d:'medium'}
],

'jp-8': [
  {q:'Bernoulli equation:',o:['P+½ρv²+ρgh = const', 'PV = nRT', 'F = ma', 'E = mc²'],a:0,e:'Energy conservation for fluids.',d:'easy'},
  {q:'Terminal velocity:',o:['Increases indefinitely', 'Constant velocity when drag = weight', 'Zero', 'Negative'],a:1,e:'When drag force = gravitational force → constant velocity.',d:'easy'},
  {q:'Hydraulic lift: F₁/A₁ =',o:['F₂/A₂', 'F₂×A₂', 'A₂/F₂', 'F₂-A₂'],a:0,e:"Pascal's law: Pressure equal → F₁/A₁ = F₂/A₂.",d:'easy'},
  {q:'Viscosity coefficient units:',o:['Pa·s (poiseuille)', 'N/m', 'J/s', 'kg/m'],a:0,e:'η in Pa·s or poise.',d:'medium'},
  {q:'Reynolds number predicts:',o:['Temperature', 'Laminar vs turbulent flow', 'Pressure', 'Density'],a:1,e:'Re < 2000: laminar. Re > 4000: turbulent.',d:'medium'},
  {q:'Archimedes principle: buoyant force =',o:['Weight of body', 'Weight of fluid displaced', 'Volume of body', 'Density of fluid'],a:1,e:'Buoyant force = weight of fluid displaced by the body.',d:'easy'}
],

'jp-9': [
  {q:'Isothermal: PV =',o:['Variable', 'Constant', 'Zero', 'Infinite'],a:1,e:'T constant → PV = nRT = constant.',d:'easy'},
  {q:'Adiabatic: q =',o:['Maximum', 'Minimum', 'Zero', 'Constant'],a:2,e:'No heat exchange in adiabatic process.',d:'easy'},
  {q:'In free expansion:',o:['W > 0', 'W = 0 and q = 0', 'W < 0', 'ΔT > 0'],a:1,e:'Free expansion into vacuum: W=0 (no external pressure), q=0, ΔU=0.',d:'medium'},
  {q:'For ideal gas in isothermal: ΔU =',o:['Positive', 'Negative', 'Zero', 'Undefined'],a:2,e:'ΔU depends on T only. Isothermal: ΔT=0 → ΔU=0.',d:'easy'},
  {q:'Work done in cyclic process =',o:['Zero', 'Area of PV loop', 'PΔV', 'nRΔT'],a:1,e:'Cyclic: ΔU=0 → W = q = area enclosed in PV diagram.',d:'easy'},
  {q:'Efficiency of heat engine:',o:['Always 100%', 'Always < 100% for real engines', 'Always > 100%', 'Exactly 50%'],a:1,e:'2nd law: no engine is 100% efficient. Carnot gives maximum efficiency.',d:'easy'}
],

'jp-10': [
  {q:'RMS speed ∝',o:['√T', 'T', 'T²', '1/T'],a:0,e:'vrms = √(3kT/m). Proportional to √T.',d:'easy'},
  {q:'At same T, lighter gas has:',o:['Lower speed', 'Higher RMS speed', 'Same speed', 'Zero speed'],a:1,e:'v ∝ 1/√M. Lighter molecules move faster.',d:'easy'},
  {q:'Average KE per molecule:',o:['½kT', 'kT', '3/2 kT', '2kT'],a:2,e:'KE = 3/2 kT per molecule.',d:'easy'},
  {q:'Pressure of ideal gas: P =',o:['⅓ ρv²rms', 'ρv²rms', '½ρv²rms', '2ρv²rms'],a:0,e:'P = ⅓ ρ<v²> = ⅓ nm<v²>.',d:'medium'},
  {q:'Mean free path increases with:',o:['Increasing pressure', 'Decreasing pressure (fewer collisions)', 'Increasing density', 'Decreasing temperature'],a:1,e:'λ ∝ T/P. Lower P → fewer molecules → longer mean free path.',d:'medium'},
  {q:'Specific heat ratio γ for monoatomic:',o:['1.67', '1.40', '1.33', '1.00'],a:0,e:'γ = Cp/Cv = 5/3 ≈ 1.67 for monoatomic.',d:'easy'}
],

'jp-11': [
  {q:'SHM: a ∝',o:['-x', 'x', 'x²', '1/x'],a:0,e:'a = -ω²x. Proportional to displacement, opposite direction.',d:'easy'},
  {q:'Time period of spring-mass:',o:['2π√(l/g)', '2π√(m/k)', '2π√(k/m)', '2πmk'],a:1,e:'T = 2π√(m/k). Independent of amplitude.',d:'easy'},
  {q:'At mean position in SHM:',o:['KE = 0', 'KE = maximum', 'PE = maximum', 'Velocity = 0'],a:1,e:'Mean position: all energy is KE. Maximum velocity.',d:'easy'},
  {q:'If spring constant doubles, T:',o:['Doubles', 'Halves', '×1/√2', '×√2'],a:2,e:'T = 2π√(m/k). k×2 → T×(1/√2).',d:'medium'},
  {q:'Phase difference between displacement and velocity:',o:['0°', '90°', '180°', '45°'],a:1,e:'x = Asinωt, v = Aωcosωt. Phase diff = π/2 = 90°.',d:'medium'},
  {q:'SHM is:',o:['Linear motion', 'Periodic + oscillatory', 'Only periodic', 'Random'],a:1,e:'SHM: periodic oscillatory motion. Restoring force proportional to displacement.',d:'easy'}
],

'jp-12': [
  {q:'Speed of sound in air depends on:',o:['Pressure only', 'Temperature (v ∝ √T)', 'Humidity only', 'Frequency'],a:1,e:'v ∝ √T. Sound faster in warm air.',d:'easy'},
  {q:'Resonance in tube: length for 1st harmonic (closed):',o:['λ/4', 'λ/2', 'λ', '3λ/4'],a:0,e:'Closed tube: L = λ/4 for fundamental.',d:'easy'},
  {q:'If frequency of source increases, wavelength:',o:['Increases', 'Decreases (v = fλ constant speed)', 'Same', 'Doubles'],a:1,e:'v = fλ. v constant → f↑ then λ↓.',d:'easy'},
  {q:'Intensity of sound ∝',o:['Amplitude', 'Amplitude²', 'Frequency', 'Wavelength'],a:1,e:'I ∝ A². Double amplitude → 4× intensity.',d:'easy'},
  {q:'Two notes of 256 Hz and 260 Hz. Beats:',o:['4 per second', '256', '260', '516'],a:0,e:'Beats = |f₁-f₂| = |256-260| = 4 beats/s.',d:'easy'},
  {q:'Node in standing wave has:',o:['Maximum displacement', 'Zero displacement', 'Maximum velocity', 'Random displacement'],a:1,e:'Node: permanently zero displacement. Antinode: maximum displacement.',d:'easy'}
],

'jp-14': [
  {q:'Energy in capacitor doubles if:',o:['V doubles', 'C doubles at same V', 'Both C and V halve', 'V halves'],a:1,e:'U = ½CV². If C doubles: U doubles.',d:'easy'},
  {q:'Capacitance increases by:',o:['Increasing d', 'Increasing A and decreasing d', 'Decreasing A', 'Increasing d and decreasing A'],a:1,e:'C = ε₀A/d. Larger A, smaller d → larger C.',d:'easy'},
  {q:'Dielectric constant K > 1 always because:',o:['Materials always reduce field inside', 'Materials always increase field', 'K can be < 1', 'K is always exactly 1'],a:0,e:'Dielectric reduces internal field → C increases → K > 1.',d:'medium'},
  {q:'Series capacitors: charge on each:',o:['Different', 'Same', 'Zero', 'Infinite'],a:1,e:'Series: same charge Q on each capacitor.',d:'easy'},
  {q:'Parallel capacitors: voltage across each:',o:['Different', 'Same', 'Zero', 'Infinite'],a:1,e:'Parallel: same voltage across each capacitor.',d:'easy'},
  {q:'1 Farad is a very:',o:['Small capacitance', 'Large capacitance', 'Normal capacitance', 'Zero'],a:1,e:'1F is huge. Practical: μF, nF, pF.',d:'easy'}
],

'jp-16': [
  {q:'Force between two parallel current-carrying wires:',o:['Always repulsive', 'Attractive if same direction, repulsive if opposite', 'Always zero', 'Always attractive'],a:1,e:'Same direction: attract. Opposite: repel.',d:'easy'},
  {q:'Moving charge in magnetic field experiences:',o:['Force parallel to B', 'Force perpendicular to both v and B', 'No force', 'Gravitational force only'],a:1,e:'F = qv×B. Perpendicular to both v and B.',d:'easy'},
  {q:'Charged particle in uniform B moves in:',o:['Straight line', 'Circle (if v ⊥ B)', 'Parabola', 'Random path'],a:1,e:'v ⊥ B: circular motion. v at angle: helical.',d:'easy'},
  {q:'Magnetic field at center of coil:',o:['B = μ₀NI/2R', 'B = μ₀I/2R', 'B = μ₀NI/R', 'B = μ₀I'],a:0,e:'N-turn coil: B = μ₀NI/2R at center.',d:'medium'},
  {q:'Torque on current loop in B:',o:['τ = BIl', 'τ = NBIA sinθ', 'τ = BI/A', 'τ = 0 always'],a:1,e:'τ = NBIA sinθ. N=turns, A=area.',d:'easy'},
  {q:'Force on stationary charge in B:',o:['F = qvB', 'F = 0 (v=0)', 'F = qB', 'F = B/q'],a:1,e:'F = qvBsinθ. If v=0, F=0. No force on stationary charge.',d:'easy'}
],

'jp-17': [
  {q:'Magnetism: Core concept Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study Magnetism from HC Verma / DC Pandey.',d:'easy'},
  {q:'Magnetism: Application Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Practice JEE PYQs from Magnetism.',d:'easy'},
  {q:'Magnetism: Numerical Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Numerical problems from Magnetism are key.',d:'medium'},
  {q:'Magnetism: Conceptual Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Understand why, not just how, in Magnetism.',d:'medium'},
  {q:'Magnetism: Important Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Magnetism: frequently tested in JEE.',d:'easy'},
  {q:'Magnetism: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Magnetism formulas and concepts weekly.',d:'easy'}
],

'jp-18': [
  {q:'EMI: Core concept Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study EMI from HC Verma / DC Pandey.',d:'easy'},
  {q:'EMI: Application Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Practice JEE PYQs from EMI.',d:'easy'},
  {q:'EMI: Numerical Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Numerical problems from EMI are key.',d:'medium'},
  {q:'EMI: Conceptual Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Understand why, not just how, in EMI.',d:'medium'},
  {q:'EMI: Important Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'EMI: frequently tested in JEE.',d:'easy'},
  {q:'EMI: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise EMI formulas and concepts weekly.',d:'easy'}
],

'jp-19': [
  {q:'AC: Core concept Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study AC from HC Verma / DC Pandey.',d:'easy'},
  {q:'AC: Application Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Practice JEE PYQs from AC.',d:'easy'},
  {q:'AC: Numerical Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Numerical problems from AC are key.',d:'medium'},
  {q:'AC: Conceptual Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Understand why, not just how, in AC.',d:'medium'},
  {q:'AC: Important Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'AC: frequently tested in JEE.',d:'easy'},
  {q:'AC: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise AC formulas and concepts weekly.',d:'easy'}
],

'jp-20': [
  {q:'EM Waves: Core concept Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study EM Waves from HC Verma / DC Pandey.',d:'easy'},
  {q:'EM Waves: Application Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Practice JEE PYQs from EM Waves.',d:'easy'},
  {q:'EM Waves: Numerical Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Numerical problems from EM Waves are key.',d:'medium'},
  {q:'EM Waves: Conceptual Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Understand why, not just how, in EM Waves.',d:'medium'},
  {q:'EM Waves: Important Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'EM Waves: frequently tested in JEE.',d:'easy'},
  {q:'EM Waves: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise EM Waves formulas and concepts weekly.',d:'easy'}
],

'jp-21': [
  {q:'Ray Optics: Core concept Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study Ray Optics from HC Verma / DC Pandey.',d:'easy'},
  {q:'Ray Optics: Application Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Practice JEE PYQs from Ray Optics.',d:'easy'},
  {q:'Ray Optics: Numerical Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Numerical problems from Ray Optics are key.',d:'medium'},
  {q:'Ray Optics: Conceptual Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Understand why, not just how, in Ray Optics.',d:'medium'},
  {q:'Ray Optics: Important Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Ray Optics: frequently tested in JEE.',d:'easy'},
  {q:'Ray Optics: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Ray Optics formulas and concepts weekly.',d:'easy'}
],

'jp-22': [
  {q:'Wave Optics: Core concept Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study Wave Optics from HC Verma / DC Pandey.',d:'easy'},
  {q:'Wave Optics: Application Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Practice JEE PYQs from Wave Optics.',d:'easy'},
  {q:'Wave Optics: Numerical Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Numerical problems from Wave Optics are key.',d:'medium'},
  {q:'Wave Optics: Conceptual Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Understand why, not just how, in Wave Optics.',d:'medium'},
  {q:'Wave Optics: Important Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Wave Optics: frequently tested in JEE.',d:'easy'},
  {q:'Wave Optics: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Wave Optics formulas and concepts weekly.',d:'easy'}
],

'jp-23': [
  {q:'Modern Physics: Core concept Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study Modern Physics from HC Verma / DC Pandey.',d:'easy'},
  {q:'Modern Physics: Application Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Practice JEE PYQs from Modern Physics.',d:'easy'},
  {q:'Modern Physics: Numerical Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Numerical problems from Modern Physics are key.',d:'medium'},
  {q:'Modern Physics: Conceptual Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Understand why, not just how, in Modern Physics.',d:'medium'},
  {q:'Modern Physics: Important Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Modern Physics: frequently tested in JEE.',d:'easy'},
  {q:'Modern Physics: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Modern Physics formulas and concepts weekly.',d:'easy'}
],

'jp-24': [
  {q:'Nuclear: Core concept Q1',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Study Nuclear from HC Verma / DC Pandey.',d:'easy'},
  {q:'Nuclear: Application Q2',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Practice JEE PYQs from Nuclear.',d:'easy'},
  {q:'Nuclear: Numerical Q3',o:['Wrong', 'Wrong', 'Correct', 'Wrong'],a:2,e:'Numerical problems from Nuclear are key.',d:'medium'},
  {q:'Nuclear: Conceptual Q4',o:['Wrong', 'Wrong', 'Wrong', 'Correct'],a:3,e:'Understand why, not just how, in Nuclear.',d:'medium'},
  {q:'Nuclear: Important Q5',o:['Correct', 'Wrong', 'Wrong', 'Wrong'],a:0,e:'Nuclear: frequently tested in JEE.',d:'easy'},
  {q:'Nuclear: Mixed Q6',o:['Wrong', 'Correct', 'Wrong', 'Wrong'],a:1,e:'Revise Nuclear formulas and concepts weekly.',d:'easy'}
],
};
