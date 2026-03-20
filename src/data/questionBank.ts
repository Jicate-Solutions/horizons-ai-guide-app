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
  {q:"This is a practice question from Gravitation chapter (Q1):",o:["Option A (correct)", "Option B", "Option C", "Option D"],a:0,e:"Study NCERT Gravitation chapter thoroughly for detailed understanding.",d:"easy"},
  {q:"Practice question from Gravitation (Q2):",o:["Option A", "Option B (correct)", "Option C", "Option D"],a:1,e:"Solve NCERT back exercises and PYQs from Gravitation.",d:"easy"},
  {q:"Practice question from Gravitation (Q3):",o:["Option A", "Option B", "Option C (correct)", "Option D"],a:2,e:"Practice numerical problems from Gravitation using HC Verma.",d:"medium"},
  {q:"Practice question from Gravitation (Q4):",o:["Option A", "Option B", "Option C", "Option D (correct)"],a:3,e:"Review key formulas and concepts from Gravitation.",d:"medium"},
  {q:"Conceptual question from Gravitation (Q5):",o:["Correct answer", "Wrong answer 1", "Wrong answer 2", "Wrong answer 3"],a:0,e:"Focus on understanding concepts, not just memorizing from Gravitation.",d:"easy"},
  {q:"Application question from Gravitation (Q6):",o:["Wrong", "Correct answer", "Wrong", "Wrong"],a:1,e:"Apply formulas to solve problems from Gravitation.",d:"medium"}
],

'phy-7': [
  {q:"This is a practice question from Properties of Matter chapter (Q1):",o:["Option A (correct)", "Option B", "Option C", "Option D"],a:0,e:"Study NCERT Properties of Matter chapter thoroughly for detailed understanding.",d:"easy"},
  {q:"Practice question from Properties of Matter (Q2):",o:["Option A", "Option B (correct)", "Option C", "Option D"],a:1,e:"Solve NCERT back exercises and PYQs from Properties of Matter.",d:"easy"},
  {q:"Practice question from Properties of Matter (Q3):",o:["Option A", "Option B", "Option C (correct)", "Option D"],a:2,e:"Practice numerical problems from Properties of Matter using HC Verma.",d:"medium"},
  {q:"Practice question from Properties of Matter (Q4):",o:["Option A", "Option B", "Option C", "Option D (correct)"],a:3,e:"Review key formulas and concepts from Properties of Matter.",d:"medium"},
  {q:"Conceptual question from Properties of Matter (Q5):",o:["Correct answer", "Wrong answer 1", "Wrong answer 2", "Wrong answer 3"],a:0,e:"Focus on understanding concepts, not just memorizing from Properties of Matter.",d:"easy"},
  {q:"Application question from Properties of Matter (Q6):",o:["Wrong", "Correct answer", "Wrong", "Wrong"],a:1,e:"Apply formulas to solve problems from Properties of Matter.",d:"medium"}
],

'phy-8': [
  {q:"This is a practice question from Thermodynamics chapter (Q1):",o:["Option A (correct)", "Option B", "Option C", "Option D"],a:0,e:"Study NCERT Thermodynamics chapter thoroughly for detailed understanding.",d:"easy"},
  {q:"Practice question from Thermodynamics (Q2):",o:["Option A", "Option B (correct)", "Option C", "Option D"],a:1,e:"Solve NCERT back exercises and PYQs from Thermodynamics.",d:"easy"},
  {q:"Practice question from Thermodynamics (Q3):",o:["Option A", "Option B", "Option C (correct)", "Option D"],a:2,e:"Practice numerical problems from Thermodynamics using HC Verma.",d:"medium"},
  {q:"Practice question from Thermodynamics (Q4):",o:["Option A", "Option B", "Option C", "Option D (correct)"],a:3,e:"Review key formulas and concepts from Thermodynamics.",d:"medium"},
  {q:"Conceptual question from Thermodynamics (Q5):",o:["Correct answer", "Wrong answer 1", "Wrong answer 2", "Wrong answer 3"],a:0,e:"Focus on understanding concepts, not just memorizing from Thermodynamics.",d:"easy"},
  {q:"Application question from Thermodynamics (Q6):",o:["Wrong", "Correct answer", "Wrong", "Wrong"],a:1,e:"Apply formulas to solve problems from Thermodynamics.",d:"medium"}
],

'phy-9': [
  {q:"This is a practice question from KTG chapter (Q1):",o:["Option A (correct)", "Option B", "Option C", "Option D"],a:0,e:"Study NCERT KTG chapter thoroughly for detailed understanding.",d:"easy"},
  {q:"Practice question from KTG (Q2):",o:["Option A", "Option B (correct)", "Option C", "Option D"],a:1,e:"Solve NCERT back exercises and PYQs from KTG.",d:"easy"},
  {q:"Practice question from KTG (Q3):",o:["Option A", "Option B", "Option C (correct)", "Option D"],a:2,e:"Practice numerical problems from KTG using HC Verma.",d:"medium"},
  {q:"Practice question from KTG (Q4):",o:["Option A", "Option B", "Option C", "Option D (correct)"],a:3,e:"Review key formulas and concepts from KTG.",d:"medium"},
  {q:"Conceptual question from KTG (Q5):",o:["Correct answer", "Wrong answer 1", "Wrong answer 2", "Wrong answer 3"],a:0,e:"Focus on understanding concepts, not just memorizing from KTG.",d:"easy"},
  {q:"Application question from KTG (Q6):",o:["Wrong", "Correct answer", "Wrong", "Wrong"],a:1,e:"Apply formulas to solve problems from KTG.",d:"medium"}
],

'phy-10': [
  {q:"This is a practice question from Oscillations chapter (Q1):",o:["Option A (correct)", "Option B", "Option C", "Option D"],a:0,e:"Study NCERT Oscillations chapter thoroughly for detailed understanding.",d:"easy"},
  {q:"Practice question from Oscillations (Q2):",o:["Option A", "Option B (correct)", "Option C", "Option D"],a:1,e:"Solve NCERT back exercises and PYQs from Oscillations.",d:"easy"},
  {q:"Practice question from Oscillations (Q3):",o:["Option A", "Option B", "Option C (correct)", "Option D"],a:2,e:"Practice numerical problems from Oscillations using HC Verma.",d:"medium"},
  {q:"Practice question from Oscillations (Q4):",o:["Option A", "Option B", "Option C", "Option D (correct)"],a:3,e:"Review key formulas and concepts from Oscillations.",d:"medium"},
  {q:"Conceptual question from Oscillations (Q5):",o:["Correct answer", "Wrong answer 1", "Wrong answer 2", "Wrong answer 3"],a:0,e:"Focus on understanding concepts, not just memorizing from Oscillations.",d:"easy"},
  {q:"Application question from Oscillations (Q6):",o:["Wrong", "Correct answer", "Wrong", "Wrong"],a:1,e:"Apply formulas to solve problems from Oscillations.",d:"medium"}
],

'phy-11': [
  {q:"This is a practice question from Waves chapter (Q1):",o:["Option A (correct)", "Option B", "Option C", "Option D"],a:0,e:"Study NCERT Waves chapter thoroughly for detailed understanding.",d:"easy"},
  {q:"Practice question from Waves (Q2):",o:["Option A", "Option B (correct)", "Option C", "Option D"],a:1,e:"Solve NCERT back exercises and PYQs from Waves.",d:"easy"},
  {q:"Practice question from Waves (Q3):",o:["Option A", "Option B", "Option C (correct)", "Option D"],a:2,e:"Practice numerical problems from Waves using HC Verma.",d:"medium"},
  {q:"Practice question from Waves (Q4):",o:["Option A", "Option B", "Option C", "Option D (correct)"],a:3,e:"Review key formulas and concepts from Waves.",d:"medium"},
  {q:"Conceptual question from Waves (Q5):",o:["Correct answer", "Wrong answer 1", "Wrong answer 2", "Wrong answer 3"],a:0,e:"Focus on understanding concepts, not just memorizing from Waves.",d:"easy"},
  {q:"Application question from Waves (Q6):",o:["Wrong", "Correct answer", "Wrong", "Wrong"],a:1,e:"Apply formulas to solve problems from Waves.",d:"medium"}
],

'phy-12': [
  {q:"This is a practice question from Electrostatics chapter (Q1):",o:["Option A (correct)", "Option B", "Option C", "Option D"],a:0,e:"Study NCERT Electrostatics chapter thoroughly for detailed understanding.",d:"easy"},
  {q:"Practice question from Electrostatics (Q2):",o:["Option A", "Option B (correct)", "Option C", "Option D"],a:1,e:"Solve NCERT back exercises and PYQs from Electrostatics.",d:"easy"},
  {q:"Practice question from Electrostatics (Q3):",o:["Option A", "Option B", "Option C (correct)", "Option D"],a:2,e:"Practice numerical problems from Electrostatics using HC Verma.",d:"medium"},
  {q:"Practice question from Electrostatics (Q4):",o:["Option A", "Option B", "Option C", "Option D (correct)"],a:3,e:"Review key formulas and concepts from Electrostatics.",d:"medium"},
  {q:"Conceptual question from Electrostatics (Q5):",o:["Correct answer", "Wrong answer 1", "Wrong answer 2", "Wrong answer 3"],a:0,e:"Focus on understanding concepts, not just memorizing from Electrostatics.",d:"easy"},
  {q:"Application question from Electrostatics (Q6):",o:["Wrong", "Correct answer", "Wrong", "Wrong"],a:1,e:"Apply formulas to solve problems from Electrostatics.",d:"medium"}
],

'phy-13': [
  {q:"This is a practice question from Capacitance chapter (Q1):",o:["Option A (correct)", "Option B", "Option C", "Option D"],a:0,e:"Study NCERT Capacitance chapter thoroughly for detailed understanding.",d:"easy"},
  {q:"Practice question from Capacitance (Q2):",o:["Option A", "Option B (correct)", "Option C", "Option D"],a:1,e:"Solve NCERT back exercises and PYQs from Capacitance.",d:"easy"},
  {q:"Practice question from Capacitance (Q3):",o:["Option A", "Option B", "Option C (correct)", "Option D"],a:2,e:"Practice numerical problems from Capacitance using HC Verma.",d:"medium"},
  {q:"Practice question from Capacitance (Q4):",o:["Option A", "Option B", "Option C", "Option D (correct)"],a:3,e:"Review key formulas and concepts from Capacitance.",d:"medium"},
  {q:"Conceptual question from Capacitance (Q5):",o:["Correct answer", "Wrong answer 1", "Wrong answer 2", "Wrong answer 3"],a:0,e:"Focus on understanding concepts, not just memorizing from Capacitance.",d:"easy"},
  {q:"Application question from Capacitance (Q6):",o:["Wrong", "Correct answer", "Wrong", "Wrong"],a:1,e:"Apply formulas to solve problems from Capacitance.",d:"medium"}
],

'phy-15': [
  {q:"This is a practice question from Magnetism chapter (Q1):",o:["Option A (correct)", "Option B", "Option C", "Option D"],a:0,e:"Study NCERT Magnetism chapter thoroughly for detailed understanding.",d:"easy"},
  {q:"Practice question from Magnetism (Q2):",o:["Option A", "Option B (correct)", "Option C", "Option D"],a:1,e:"Solve NCERT back exercises and PYQs from Magnetism.",d:"easy"},
  {q:"Practice question from Magnetism (Q3):",o:["Option A", "Option B", "Option C (correct)", "Option D"],a:2,e:"Practice numerical problems from Magnetism using HC Verma.",d:"medium"},
  {q:"Practice question from Magnetism (Q4):",o:["Option A", "Option B", "Option C", "Option D (correct)"],a:3,e:"Review key formulas and concepts from Magnetism.",d:"medium"},
  {q:"Conceptual question from Magnetism (Q5):",o:["Correct answer", "Wrong answer 1", "Wrong answer 2", "Wrong answer 3"],a:0,e:"Focus on understanding concepts, not just memorizing from Magnetism.",d:"easy"},
  {q:"Application question from Magnetism (Q6):",o:["Wrong", "Correct answer", "Wrong", "Wrong"],a:1,e:"Apply formulas to solve problems from Magnetism.",d:"medium"}
],

'phy-16': [
  {q:"This is a practice question from Magnetism & Matter chapter (Q1):",o:["Option A (correct)", "Option B", "Option C", "Option D"],a:0,e:"Study NCERT Magnetism & Matter chapter thoroughly for detailed understanding.",d:"easy"},
  {q:"Practice question from Magnetism & Matter (Q2):",o:["Option A", "Option B (correct)", "Option C", "Option D"],a:1,e:"Solve NCERT back exercises and PYQs from Magnetism & Matter.",d:"easy"},
  {q:"Practice question from Magnetism & Matter (Q3):",o:["Option A", "Option B", "Option C (correct)", "Option D"],a:2,e:"Practice numerical problems from Magnetism & Matter using HC Verma.",d:"medium"},
  {q:"Practice question from Magnetism & Matter (Q4):",o:["Option A", "Option B", "Option C", "Option D (correct)"],a:3,e:"Review key formulas and concepts from Magnetism & Matter.",d:"medium"},
  {q:"Conceptual question from Magnetism & Matter (Q5):",o:["Correct answer", "Wrong answer 1", "Wrong answer 2", "Wrong answer 3"],a:0,e:"Focus on understanding concepts, not just memorizing from Magnetism & Matter.",d:"easy"},
  {q:"Application question from Magnetism & Matter (Q6):",o:["Wrong", "Correct answer", "Wrong", "Wrong"],a:1,e:"Apply formulas to solve problems from Magnetism & Matter.",d:"medium"}
],

'phy-17': [
  {q:"This is a practice question from EMI chapter (Q1):",o:["Option A (correct)", "Option B", "Option C", "Option D"],a:0,e:"Study NCERT EMI chapter thoroughly for detailed understanding.",d:"easy"},
  {q:"Practice question from EMI (Q2):",o:["Option A", "Option B (correct)", "Option C", "Option D"],a:1,e:"Solve NCERT back exercises and PYQs from EMI.",d:"easy"},
  {q:"Practice question from EMI (Q3):",o:["Option A", "Option B", "Option C (correct)", "Option D"],a:2,e:"Practice numerical problems from EMI using HC Verma.",d:"medium"},
  {q:"Practice question from EMI (Q4):",o:["Option A", "Option B", "Option C", "Option D (correct)"],a:3,e:"Review key formulas and concepts from EMI.",d:"medium"},
  {q:"Conceptual question from EMI (Q5):",o:["Correct answer", "Wrong answer 1", "Wrong answer 2", "Wrong answer 3"],a:0,e:"Focus on understanding concepts, not just memorizing from EMI.",d:"easy"},
  {q:"Application question from EMI (Q6):",o:["Wrong", "Correct answer", "Wrong", "Wrong"],a:1,e:"Apply formulas to solve problems from EMI.",d:"medium"}
],

'phy-18': [
  {q:"This is a practice question from AC chapter (Q1):",o:["Option A (correct)", "Option B", "Option C", "Option D"],a:0,e:"Study NCERT AC chapter thoroughly for detailed understanding.",d:"easy"},
  {q:"Practice question from AC (Q2):",o:["Option A", "Option B (correct)", "Option C", "Option D"],a:1,e:"Solve NCERT back exercises and PYQs from AC.",d:"easy"},
  {q:"Practice question from AC (Q3):",o:["Option A", "Option B", "Option C (correct)", "Option D"],a:2,e:"Practice numerical problems from AC using HC Verma.",d:"medium"},
  {q:"Practice question from AC (Q4):",o:["Option A", "Option B", "Option C", "Option D (correct)"],a:3,e:"Review key formulas and concepts from AC.",d:"medium"},
  {q:"Conceptual question from AC (Q5):",o:["Correct answer", "Wrong answer 1", "Wrong answer 2", "Wrong answer 3"],a:0,e:"Focus on understanding concepts, not just memorizing from AC.",d:"easy"},
  {q:"Application question from AC (Q6):",o:["Wrong", "Correct answer", "Wrong", "Wrong"],a:1,e:"Apply formulas to solve problems from AC.",d:"medium"}
],

'phy-20': [
  {q:"This is a practice question from Wave Optics chapter (Q1):",o:["Option A (correct)", "Option B", "Option C", "Option D"],a:0,e:"Study NCERT Wave Optics chapter thoroughly for detailed understanding.",d:"easy"},
  {q:"Practice question from Wave Optics (Q2):",o:["Option A", "Option B (correct)", "Option C", "Option D"],a:1,e:"Solve NCERT back exercises and PYQs from Wave Optics.",d:"easy"},
  {q:"Practice question from Wave Optics (Q3):",o:["Option A", "Option B", "Option C (correct)", "Option D"],a:2,e:"Practice numerical problems from Wave Optics using HC Verma.",d:"medium"},
  {q:"Practice question from Wave Optics (Q4):",o:["Option A", "Option B", "Option C", "Option D (correct)"],a:3,e:"Review key formulas and concepts from Wave Optics.",d:"medium"},
  {q:"Conceptual question from Wave Optics (Q5):",o:["Correct answer", "Wrong answer 1", "Wrong answer 2", "Wrong answer 3"],a:0,e:"Focus on understanding concepts, not just memorizing from Wave Optics.",d:"easy"},
  {q:"Application question from Wave Optics (Q6):",o:["Wrong", "Correct answer", "Wrong", "Wrong"],a:1,e:"Apply formulas to solve problems from Wave Optics.",d:"medium"}
],

'phy-21': [
  {q:"This is a practice question from Dual Nature chapter (Q1):",o:["Option A (correct)", "Option B", "Option C", "Option D"],a:0,e:"Study NCERT Dual Nature chapter thoroughly for detailed understanding.",d:"easy"},
  {q:"Practice question from Dual Nature (Q2):",o:["Option A", "Option B (correct)", "Option C", "Option D"],a:1,e:"Solve NCERT back exercises and PYQs from Dual Nature.",d:"easy"},
  {q:"Practice question from Dual Nature (Q3):",o:["Option A", "Option B", "Option C (correct)", "Option D"],a:2,e:"Practice numerical problems from Dual Nature using HC Verma.",d:"medium"},
  {q:"Practice question from Dual Nature (Q4):",o:["Option A", "Option B", "Option C", "Option D (correct)"],a:3,e:"Review key formulas and concepts from Dual Nature.",d:"medium"},
  {q:"Conceptual question from Dual Nature (Q5):",o:["Correct answer", "Wrong answer 1", "Wrong answer 2", "Wrong answer 3"],a:0,e:"Focus on understanding concepts, not just memorizing from Dual Nature.",d:"easy"},
  {q:"Application question from Dual Nature (Q6):",o:["Wrong", "Correct answer", "Wrong", "Wrong"],a:1,e:"Apply formulas to solve problems from Dual Nature.",d:"medium"}
],

'phy-22': [
  {q:"This is a practice question from Atoms Nuclei chapter (Q1):",o:["Option A (correct)", "Option B", "Option C", "Option D"],a:0,e:"Study NCERT Atoms Nuclei chapter thoroughly for detailed understanding.",d:"easy"},
  {q:"Practice question from Atoms Nuclei (Q2):",o:["Option A", "Option B (correct)", "Option C", "Option D"],a:1,e:"Solve NCERT back exercises and PYQs from Atoms Nuclei.",d:"easy"},
  {q:"Practice question from Atoms Nuclei (Q3):",o:["Option A", "Option B", "Option C (correct)", "Option D"],a:2,e:"Practice numerical problems from Atoms Nuclei using HC Verma.",d:"medium"},
  {q:"Practice question from Atoms Nuclei (Q4):",o:["Option A", "Option B", "Option C", "Option D (correct)"],a:3,e:"Review key formulas and concepts from Atoms Nuclei.",d:"medium"},
  {q:"Conceptual question from Atoms Nuclei (Q5):",o:["Correct answer", "Wrong answer 1", "Wrong answer 2", "Wrong answer 3"],a:0,e:"Focus on understanding concepts, not just memorizing from Atoms Nuclei.",d:"easy"},
  {q:"Application question from Atoms Nuclei (Q6):",o:["Wrong", "Correct answer", "Wrong", "Wrong"],a:1,e:"Apply formulas to solve problems from Atoms Nuclei.",d:"medium"}
],

'phy-23': [
  {q:"This is a practice question from Semiconductors chapter (Q1):",o:["Option A (correct)", "Option B", "Option C", "Option D"],a:0,e:"Study NCERT Semiconductors chapter thoroughly for detailed understanding.",d:"easy"},
  {q:"Practice question from Semiconductors (Q2):",o:["Option A", "Option B (correct)", "Option C", "Option D"],a:1,e:"Solve NCERT back exercises and PYQs from Semiconductors.",d:"easy"},
  {q:"Practice question from Semiconductors (Q3):",o:["Option A", "Option B", "Option C (correct)", "Option D"],a:2,e:"Practice numerical problems from Semiconductors using HC Verma.",d:"medium"},
  {q:"Practice question from Semiconductors (Q4):",o:["Option A", "Option B", "Option C", "Option D (correct)"],a:3,e:"Review key formulas and concepts from Semiconductors.",d:"medium"},
  {q:"Conceptual question from Semiconductors (Q5):",o:["Correct answer", "Wrong answer 1", "Wrong answer 2", "Wrong answer 3"],a:0,e:"Focus on understanding concepts, not just memorizing from Semiconductors.",d:"easy"},
  {q:"Application question from Semiconductors (Q6):",o:["Wrong", "Correct answer", "Wrong", "Wrong"],a:1,e:"Apply formulas to solve problems from Semiconductors.",d:"medium"}
],

'phy-24': [
  {q:"This is a practice question from EM Waves chapter (Q1):",o:["Option A (correct)", "Option B", "Option C", "Option D"],a:0,e:"Study NCERT EM Waves chapter thoroughly for detailed understanding.",d:"easy"},
  {q:"Practice question from EM Waves (Q2):",o:["Option A", "Option B (correct)", "Option C", "Option D"],a:1,e:"Solve NCERT back exercises and PYQs from EM Waves.",d:"easy"},
  {q:"Practice question from EM Waves (Q3):",o:["Option A", "Option B", "Option C (correct)", "Option D"],a:2,e:"Practice numerical problems from EM Waves using HC Verma.",d:"medium"},
  {q:"Practice question from EM Waves (Q4):",o:["Option A", "Option B", "Option C", "Option D (correct)"],a:3,e:"Review key formulas and concepts from EM Waves.",d:"medium"},
  {q:"Conceptual question from EM Waves (Q5):",o:["Correct answer", "Wrong answer 1", "Wrong answer 2", "Wrong answer 3"],a:0,e:"Focus on understanding concepts, not just memorizing from EM Waves.",d:"easy"},
  {q:"Application question from EM Waves (Q6):",o:["Wrong", "Correct answer", "Wrong", "Wrong"],a:1,e:"Apply formulas to solve problems from EM Waves.",d:"medium"}
],

'chem-1': [
  {q:"NEET question from Mole Concept (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT Mole Concept chapter line by line.",d:"easy"},
  {q:"NEET question from Mole Concept (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from Mole Concept.",d:"easy"},
  {q:"NEET question from Mole Concept (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from Mole Concept chapter.",d:"medium"},
  {q:"Conceptual from Mole Concept (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in Mole Concept.",d:"medium"},
  {q:"Application from Mole Concept (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from Mole Concept.",d:"easy"},
  {q:"Important from Mole Concept (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from Mole Concept.",d:"easy"}
],

'chem-3': [
  {q:"NEET question from Periodic Table (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT Periodic Table chapter line by line.",d:"easy"},
  {q:"NEET question from Periodic Table (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from Periodic Table.",d:"easy"},
  {q:"NEET question from Periodic Table (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from Periodic Table chapter.",d:"medium"},
  {q:"Conceptual from Periodic Table (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in Periodic Table.",d:"medium"},
  {q:"Application from Periodic Table (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from Periodic Table.",d:"easy"},
  {q:"Important from Periodic Table (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from Periodic Table.",d:"easy"}
],

'chem-5': [
  {q:"NEET question from States of Matter (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT States of Matter chapter line by line.",d:"easy"},
  {q:"NEET question from States of Matter (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from States of Matter.",d:"easy"},
  {q:"NEET question from States of Matter (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from States of Matter chapter.",d:"medium"},
  {q:"Conceptual from States of Matter (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in States of Matter.",d:"medium"},
  {q:"Application from States of Matter (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from States of Matter.",d:"easy"},
  {q:"Important from States of Matter (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from States of Matter.",d:"easy"}
],

'chem-6': [
  {q:"NEET question from Thermodynamics (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT Thermodynamics chapter line by line.",d:"easy"},
  {q:"NEET question from Thermodynamics (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from Thermodynamics.",d:"easy"},
  {q:"NEET question from Thermodynamics (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from Thermodynamics chapter.",d:"medium"},
  {q:"Conceptual from Thermodynamics (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in Thermodynamics.",d:"medium"},
  {q:"Application from Thermodynamics (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from Thermodynamics.",d:"easy"},
  {q:"Important from Thermodynamics (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from Thermodynamics.",d:"easy"}
],

'chem-8': [
  {q:"NEET question from Redox (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT Redox chapter line by line.",d:"easy"},
  {q:"NEET question from Redox (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from Redox.",d:"easy"},
  {q:"NEET question from Redox (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from Redox chapter.",d:"medium"},
  {q:"Conceptual from Redox (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in Redox.",d:"medium"},
  {q:"Application from Redox (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from Redox.",d:"easy"},
  {q:"Important from Redox (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from Redox.",d:"easy"}
],

'chem-9': [
  {q:"NEET question from Hydrogen (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT Hydrogen chapter line by line.",d:"easy"},
  {q:"NEET question from Hydrogen (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from Hydrogen.",d:"easy"},
  {q:"NEET question from Hydrogen (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from Hydrogen chapter.",d:"medium"},
  {q:"Conceptual from Hydrogen (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in Hydrogen.",d:"medium"},
  {q:"Application from Hydrogen (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from Hydrogen.",d:"easy"},
  {q:"Important from Hydrogen (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from Hydrogen.",d:"easy"}
],

'chem-10': [
  {q:"NEET question from s-Block (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT s-Block chapter line by line.",d:"easy"},
  {q:"NEET question from s-Block (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from s-Block.",d:"easy"},
  {q:"NEET question from s-Block (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from s-Block chapter.",d:"medium"},
  {q:"Conceptual from s-Block (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in s-Block.",d:"medium"},
  {q:"Application from s-Block (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from s-Block.",d:"easy"},
  {q:"Important from s-Block (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from s-Block.",d:"easy"}
],

'chem-11': [
  {q:"NEET question from p-Block 13-14 (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT p-Block 13-14 chapter line by line.",d:"easy"},
  {q:"NEET question from p-Block 13-14 (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from p-Block 13-14.",d:"easy"},
  {q:"NEET question from p-Block 13-14 (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from p-Block 13-14 chapter.",d:"medium"},
  {q:"Conceptual from p-Block 13-14 (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in p-Block 13-14.",d:"medium"},
  {q:"Application from p-Block 13-14 (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from p-Block 13-14.",d:"easy"},
  {q:"Important from p-Block 13-14 (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from p-Block 13-14.",d:"easy"}
],

'chem-12': [
  {q:"NEET question from GOC (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT GOC chapter line by line.",d:"easy"},
  {q:"NEET question from GOC (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from GOC.",d:"easy"},
  {q:"NEET question from GOC (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from GOC chapter.",d:"medium"},
  {q:"Conceptual from GOC (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in GOC.",d:"medium"},
  {q:"Application from GOC (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from GOC.",d:"easy"},
  {q:"Important from GOC (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from GOC.",d:"easy"}
],

'chem-13': [
  {q:"NEET question from Hydrocarbons (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT Hydrocarbons chapter line by line.",d:"easy"},
  {q:"NEET question from Hydrocarbons (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from Hydrocarbons.",d:"easy"},
  {q:"NEET question from Hydrocarbons (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from Hydrocarbons chapter.",d:"medium"},
  {q:"Conceptual from Hydrocarbons (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in Hydrocarbons.",d:"medium"},
  {q:"Application from Hydrocarbons (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from Hydrocarbons.",d:"easy"},
  {q:"Important from Hydrocarbons (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from Hydrocarbons.",d:"easy"}
],

'chem-14': [
  {q:"NEET question from Environmental (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT Environmental chapter line by line.",d:"easy"},
  {q:"NEET question from Environmental (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from Environmental.",d:"easy"},
  {q:"NEET question from Environmental (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from Environmental chapter.",d:"medium"},
  {q:"Conceptual from Environmental (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in Environmental.",d:"medium"},
  {q:"Application from Environmental (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from Environmental.",d:"easy"},
  {q:"Important from Environmental (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from Environmental.",d:"easy"}
],

'chem-15': [
  {q:"NEET question from Solutions (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT Solutions chapter line by line.",d:"easy"},
  {q:"NEET question from Solutions (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from Solutions.",d:"easy"},
  {q:"NEET question from Solutions (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from Solutions chapter.",d:"medium"},
  {q:"Conceptual from Solutions (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in Solutions.",d:"medium"},
  {q:"Application from Solutions (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from Solutions.",d:"easy"},
  {q:"Important from Solutions (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from Solutions.",d:"easy"}
],

'chem-17': [
  {q:"NEET question from Kinetics (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT Kinetics chapter line by line.",d:"easy"},
  {q:"NEET question from Kinetics (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from Kinetics.",d:"easy"},
  {q:"NEET question from Kinetics (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from Kinetics chapter.",d:"medium"},
  {q:"Conceptual from Kinetics (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in Kinetics.",d:"medium"},
  {q:"Application from Kinetics (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from Kinetics.",d:"easy"},
  {q:"Important from Kinetics (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from Kinetics.",d:"easy"}
],

'chem-18': [
  {q:"NEET question from Surface Chemistry (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT Surface Chemistry chapter line by line.",d:"easy"},
  {q:"NEET question from Surface Chemistry (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from Surface Chemistry.",d:"easy"},
  {q:"NEET question from Surface Chemistry (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from Surface Chemistry chapter.",d:"medium"},
  {q:"Conceptual from Surface Chemistry (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in Surface Chemistry.",d:"medium"},
  {q:"Application from Surface Chemistry (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from Surface Chemistry.",d:"easy"},
  {q:"Important from Surface Chemistry (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from Surface Chemistry.",d:"easy"}
],

'chem-19': [
  {q:"NEET question from p-Block 15-18 (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT p-Block 15-18 chapter line by line.",d:"easy"},
  {q:"NEET question from p-Block 15-18 (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from p-Block 15-18.",d:"easy"},
  {q:"NEET question from p-Block 15-18 (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from p-Block 15-18 chapter.",d:"medium"},
  {q:"Conceptual from p-Block 15-18 (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in p-Block 15-18.",d:"medium"},
  {q:"Application from p-Block 15-18 (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from p-Block 15-18.",d:"easy"},
  {q:"Important from p-Block 15-18 (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from p-Block 15-18.",d:"easy"}
],

'chem-20': [
  {q:"NEET question from d-f Block (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT d-f Block chapter line by line.",d:"easy"},
  {q:"NEET question from d-f Block (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from d-f Block.",d:"easy"},
  {q:"NEET question from d-f Block (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from d-f Block chapter.",d:"medium"},
  {q:"Conceptual from d-f Block (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in d-f Block.",d:"medium"},
  {q:"Application from d-f Block (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from d-f Block.",d:"easy"},
  {q:"Important from d-f Block (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from d-f Block.",d:"easy"}
],

'chem-21': [
  {q:"NEET question from Coordination (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT Coordination chapter line by line.",d:"easy"},
  {q:"NEET question from Coordination (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from Coordination.",d:"easy"},
  {q:"NEET question from Coordination (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from Coordination chapter.",d:"medium"},
  {q:"Conceptual from Coordination (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in Coordination.",d:"medium"},
  {q:"Application from Coordination (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from Coordination.",d:"easy"},
  {q:"Important from Coordination (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from Coordination.",d:"easy"}
],

'chem-23': [
  {q:"NEET question from Alcohols Phenols (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT Alcohols Phenols chapter line by line.",d:"easy"},
  {q:"NEET question from Alcohols Phenols (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from Alcohols Phenols.",d:"easy"},
  {q:"NEET question from Alcohols Phenols (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from Alcohols Phenols chapter.",d:"medium"},
  {q:"Conceptual from Alcohols Phenols (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in Alcohols Phenols.",d:"medium"},
  {q:"Application from Alcohols Phenols (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from Alcohols Phenols.",d:"easy"},
  {q:"Important from Alcohols Phenols (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from Alcohols Phenols.",d:"easy"}
],

'chem-25': [
  {q:"NEET question from Amines (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT Amines chapter line by line.",d:"easy"},
  {q:"NEET question from Amines (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from Amines.",d:"easy"},
  {q:"NEET question from Amines (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from Amines chapter.",d:"medium"},
  {q:"Conceptual from Amines (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in Amines.",d:"medium"},
  {q:"Application from Amines (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from Amines.",d:"easy"},
  {q:"Important from Amines (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from Amines.",d:"easy"}
],

'chem-26': [
  {q:"NEET question from Biomolecules (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT Biomolecules chapter line by line.",d:"easy"},
  {q:"NEET question from Biomolecules (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from Biomolecules.",d:"easy"},
  {q:"NEET question from Biomolecules (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from Biomolecules chapter.",d:"medium"},
  {q:"Conceptual from Biomolecules (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in Biomolecules.",d:"medium"},
  {q:"Application from Biomolecules (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from Biomolecules.",d:"easy"},
  {q:"Important from Biomolecules (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from Biomolecules.",d:"easy"}
],

'chem-27': [
  {q:"NEET question from Polymers (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT Polymers chapter line by line.",d:"easy"},
  {q:"NEET question from Polymers (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from Polymers.",d:"easy"},
  {q:"NEET question from Polymers (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from Polymers chapter.",d:"medium"},
  {q:"Conceptual from Polymers (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in Polymers.",d:"medium"},
  {q:"Application from Polymers (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from Polymers.",d:"easy"},
  {q:"Important from Polymers (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from Polymers.",d:"easy"}
],

'chem-28': [
  {q:"NEET question from Chemistry Life (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Read NCERT Chemistry Life chapter line by line.",d:"easy"},
  {q:"NEET question from Chemistry Life (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Solve previous year NEET questions from Chemistry Life.",d:"easy"},
  {q:"NEET question from Chemistry Life (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Practice numericals from Chemistry Life chapter.",d:"medium"},
  {q:"Conceptual from Chemistry Life (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Understand key reactions and mechanisms in Chemistry Life.",d:"medium"},
  {q:"Application from Chemistry Life (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Apply concepts to solve problems from Chemistry Life.",d:"easy"},
  {q:"Important from Chemistry Life (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Focus on frequently asked topics from Chemistry Life.",d:"easy"}
],

'jp-1': [
  {q:"JEE question from Units (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Units.",d:"easy"},
  {q:"JEE question from Units (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Units.",d:"medium"},
  {q:"JEE question from Units (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Units.",d:"medium"},
  {q:"Application from Units (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Units.",d:"easy"},
  {q:"Important from Units (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Units. Practice daily.",d:"easy"},
  {q:"Numerical from Units (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Units.",d:"medium"}
],

'jp-3': [
  {q:"JEE question from Laws of Motion (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Laws of Motion.",d:"easy"},
  {q:"JEE question from Laws of Motion (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Laws of Motion.",d:"medium"},
  {q:"JEE question from Laws of Motion (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Laws of Motion.",d:"medium"},
  {q:"Application from Laws of Motion (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Laws of Motion.",d:"easy"},
  {q:"Important from Laws of Motion (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Laws of Motion. Practice daily.",d:"easy"},
  {q:"Numerical from Laws of Motion (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Laws of Motion.",d:"medium"}
],

'jp-4': [
  {q:"JEE question from Work Energy (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Work Energy.",d:"easy"},
  {q:"JEE question from Work Energy (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Work Energy.",d:"medium"},
  {q:"JEE question from Work Energy (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Work Energy.",d:"medium"},
  {q:"Application from Work Energy (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Work Energy.",d:"easy"},
  {q:"Important from Work Energy (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Work Energy. Practice daily.",d:"easy"},
  {q:"Numerical from Work Energy (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Work Energy.",d:"medium"}
],

'jp-5': [
  {q:"JEE question from COM (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from COM.",d:"easy"},
  {q:"JEE question from COM (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from COM.",d:"medium"},
  {q:"JEE question from COM (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of COM.",d:"medium"},
  {q:"Application from COM (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from COM.",d:"easy"},
  {q:"Important from COM (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from COM. Practice daily.",d:"easy"},
  {q:"Numerical from COM (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for COM.",d:"medium"}
],

'jp-6': [
  {q:"JEE question from Rotation (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Rotation.",d:"easy"},
  {q:"JEE question from Rotation (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Rotation.",d:"medium"},
  {q:"JEE question from Rotation (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Rotation.",d:"medium"},
  {q:"Application from Rotation (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Rotation.",d:"easy"},
  {q:"Important from Rotation (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Rotation. Practice daily.",d:"easy"},
  {q:"Numerical from Rotation (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Rotation.",d:"medium"}
],

'jp-7': [
  {q:"JEE question from Gravitation (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Gravitation.",d:"easy"},
  {q:"JEE question from Gravitation (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Gravitation.",d:"medium"},
  {q:"JEE question from Gravitation (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Gravitation.",d:"medium"},
  {q:"Application from Gravitation (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Gravitation.",d:"easy"},
  {q:"Important from Gravitation (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Gravitation. Practice daily.",d:"easy"},
  {q:"Numerical from Gravitation (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Gravitation.",d:"medium"}
],

'jp-8': [
  {q:"JEE question from Fluids (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Fluids.",d:"easy"},
  {q:"JEE question from Fluids (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Fluids.",d:"medium"},
  {q:"JEE question from Fluids (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Fluids.",d:"medium"},
  {q:"Application from Fluids (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Fluids.",d:"easy"},
  {q:"Important from Fluids (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Fluids. Practice daily.",d:"easy"},
  {q:"Numerical from Fluids (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Fluids.",d:"medium"}
],

'jp-9': [
  {q:"JEE question from Thermo (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Thermo.",d:"easy"},
  {q:"JEE question from Thermo (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Thermo.",d:"medium"},
  {q:"JEE question from Thermo (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Thermo.",d:"medium"},
  {q:"Application from Thermo (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Thermo.",d:"easy"},
  {q:"Important from Thermo (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Thermo. Practice daily.",d:"easy"},
  {q:"Numerical from Thermo (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Thermo.",d:"medium"}
],

'jp-10': [
  {q:"JEE question from KTG (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from KTG.",d:"easy"},
  {q:"JEE question from KTG (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from KTG.",d:"medium"},
  {q:"JEE question from KTG (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of KTG.",d:"medium"},
  {q:"Application from KTG (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from KTG.",d:"easy"},
  {q:"Important from KTG (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from KTG. Practice daily.",d:"easy"},
  {q:"Numerical from KTG (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for KTG.",d:"medium"}
],

'jp-11': [
  {q:"JEE question from SHM (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from SHM.",d:"easy"},
  {q:"JEE question from SHM (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from SHM.",d:"medium"},
  {q:"JEE question from SHM (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of SHM.",d:"medium"},
  {q:"Application from SHM (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from SHM.",d:"easy"},
  {q:"Important from SHM (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from SHM. Practice daily.",d:"easy"},
  {q:"Numerical from SHM (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for SHM.",d:"medium"}
],

'jp-12': [
  {q:"JEE question from Waves (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Waves.",d:"easy"},
  {q:"JEE question from Waves (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Waves.",d:"medium"},
  {q:"JEE question from Waves (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Waves.",d:"medium"},
  {q:"Application from Waves (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Waves.",d:"easy"},
  {q:"Important from Waves (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Waves. Practice daily.",d:"easy"},
  {q:"Numerical from Waves (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Waves.",d:"medium"}
],

'jp-14': [
  {q:"JEE question from Capacitance (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Capacitance.",d:"easy"},
  {q:"JEE question from Capacitance (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Capacitance.",d:"medium"},
  {q:"JEE question from Capacitance (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Capacitance.",d:"medium"},
  {q:"Application from Capacitance (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Capacitance.",d:"easy"},
  {q:"Important from Capacitance (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Capacitance. Practice daily.",d:"easy"},
  {q:"Numerical from Capacitance (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Capacitance.",d:"medium"}
],

'jp-16': [
  {q:"JEE question from Magnetic Effects (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Magnetic Effects.",d:"easy"},
  {q:"JEE question from Magnetic Effects (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Magnetic Effects.",d:"medium"},
  {q:"JEE question from Magnetic Effects (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Magnetic Effects.",d:"medium"},
  {q:"Application from Magnetic Effects (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Magnetic Effects.",d:"easy"},
  {q:"Important from Magnetic Effects (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Magnetic Effects. Practice daily.",d:"easy"},
  {q:"Numerical from Magnetic Effects (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Magnetic Effects.",d:"medium"}
],

'jp-17': [
  {q:"JEE question from Magnetism (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Magnetism.",d:"easy"},
  {q:"JEE question from Magnetism (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Magnetism.",d:"medium"},
  {q:"JEE question from Magnetism (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Magnetism.",d:"medium"},
  {q:"Application from Magnetism (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Magnetism.",d:"easy"},
  {q:"Important from Magnetism (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Magnetism. Practice daily.",d:"easy"},
  {q:"Numerical from Magnetism (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Magnetism.",d:"medium"}
],

'jp-18': [
  {q:"JEE question from EMI (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from EMI.",d:"easy"},
  {q:"JEE question from EMI (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from EMI.",d:"medium"},
  {q:"JEE question from EMI (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of EMI.",d:"medium"},
  {q:"Application from EMI (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from EMI.",d:"easy"},
  {q:"Important from EMI (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from EMI. Practice daily.",d:"easy"},
  {q:"Numerical from EMI (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for EMI.",d:"medium"}
],

'jp-19': [
  {q:"JEE question from AC (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from AC.",d:"easy"},
  {q:"JEE question from AC (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from AC.",d:"medium"},
  {q:"JEE question from AC (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of AC.",d:"medium"},
  {q:"Application from AC (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from AC.",d:"easy"},
  {q:"Important from AC (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from AC. Practice daily.",d:"easy"},
  {q:"Numerical from AC (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for AC.",d:"medium"}
],

'jp-20': [
  {q:"JEE question from EM Waves (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from EM Waves.",d:"easy"},
  {q:"JEE question from EM Waves (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from EM Waves.",d:"medium"},
  {q:"JEE question from EM Waves (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of EM Waves.",d:"medium"},
  {q:"Application from EM Waves (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from EM Waves.",d:"easy"},
  {q:"Important from EM Waves (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from EM Waves. Practice daily.",d:"easy"},
  {q:"Numerical from EM Waves (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for EM Waves.",d:"medium"}
],

'jp-21': [
  {q:"JEE question from Ray Optics (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Ray Optics.",d:"easy"},
  {q:"JEE question from Ray Optics (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Ray Optics.",d:"medium"},
  {q:"JEE question from Ray Optics (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Ray Optics.",d:"medium"},
  {q:"Application from Ray Optics (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Ray Optics.",d:"easy"},
  {q:"Important from Ray Optics (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Ray Optics. Practice daily.",d:"easy"},
  {q:"Numerical from Ray Optics (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Ray Optics.",d:"medium"}
],

'jp-22': [
  {q:"JEE question from Wave Optics (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Wave Optics.",d:"easy"},
  {q:"JEE question from Wave Optics (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Wave Optics.",d:"medium"},
  {q:"JEE question from Wave Optics (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Wave Optics.",d:"medium"},
  {q:"Application from Wave Optics (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Wave Optics.",d:"easy"},
  {q:"Important from Wave Optics (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Wave Optics. Practice daily.",d:"easy"},
  {q:"Numerical from Wave Optics (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Wave Optics.",d:"medium"}
],

'jp-23': [
  {q:"JEE question from Modern Physics (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Modern Physics.",d:"easy"},
  {q:"JEE question from Modern Physics (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Modern Physics.",d:"medium"},
  {q:"JEE question from Modern Physics (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Modern Physics.",d:"medium"},
  {q:"Application from Modern Physics (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Modern Physics.",d:"easy"},
  {q:"Important from Modern Physics (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Modern Physics. Practice daily.",d:"easy"},
  {q:"Numerical from Modern Physics (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Modern Physics.",d:"medium"}
],

'jp-24': [
  {q:"JEE question from Nuclear (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Nuclear.",d:"easy"},
  {q:"JEE question from Nuclear (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Nuclear.",d:"medium"},
  {q:"JEE question from Nuclear (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Nuclear.",d:"medium"},
  {q:"Application from Nuclear (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Nuclear.",d:"easy"},
  {q:"Important from Nuclear (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Nuclear. Practice daily.",d:"easy"},
  {q:"Numerical from Nuclear (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Nuclear.",d:"medium"}
],

'jc-1': [
  {q:"JEE question from Mole Concept (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Mole Concept.",d:"easy"},
  {q:"JEE question from Mole Concept (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Mole Concept.",d:"medium"},
  {q:"JEE question from Mole Concept (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Mole Concept.",d:"medium"},
  {q:"Application from Mole Concept (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Mole Concept.",d:"easy"},
  {q:"Important from Mole Concept (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Mole Concept. Practice daily.",d:"easy"},
  {q:"Numerical from Mole Concept (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Mole Concept.",d:"medium"}
],

'jc-2': [
  {q:"JEE question from Atomic Structure (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Atomic Structure.",d:"easy"},
  {q:"JEE question from Atomic Structure (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Atomic Structure.",d:"medium"},
  {q:"JEE question from Atomic Structure (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Atomic Structure.",d:"medium"},
  {q:"Application from Atomic Structure (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Atomic Structure.",d:"easy"},
  {q:"Important from Atomic Structure (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Atomic Structure. Practice daily.",d:"easy"},
  {q:"Numerical from Atomic Structure (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Atomic Structure.",d:"medium"}
],

'jc-3': [
  {q:"JEE question from Bonding (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Bonding.",d:"easy"},
  {q:"JEE question from Bonding (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Bonding.",d:"medium"},
  {q:"JEE question from Bonding (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Bonding.",d:"medium"},
  {q:"Application from Bonding (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Bonding.",d:"easy"},
  {q:"Important from Bonding (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Bonding. Practice daily.",d:"easy"},
  {q:"Numerical from Bonding (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Bonding.",d:"medium"}
],

'jc-4': [
  {q:"JEE question from Thermo (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Thermo.",d:"easy"},
  {q:"JEE question from Thermo (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Thermo.",d:"medium"},
  {q:"JEE question from Thermo (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Thermo.",d:"medium"},
  {q:"Application from Thermo (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Thermo.",d:"easy"},
  {q:"Important from Thermo (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Thermo. Practice daily.",d:"easy"},
  {q:"Numerical from Thermo (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Thermo.",d:"medium"}
],

'jc-5': [
  {q:"JEE question from Equilibrium (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Equilibrium.",d:"easy"},
  {q:"JEE question from Equilibrium (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Equilibrium.",d:"medium"},
  {q:"JEE question from Equilibrium (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Equilibrium.",d:"medium"},
  {q:"Application from Equilibrium (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Equilibrium.",d:"easy"},
  {q:"Important from Equilibrium (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Equilibrium. Practice daily.",d:"easy"},
  {q:"Numerical from Equilibrium (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Equilibrium.",d:"medium"}
],

'jc-6': [
  {q:"JEE question from States (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from States.",d:"easy"},
  {q:"JEE question from States (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from States.",d:"medium"},
  {q:"JEE question from States (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of States.",d:"medium"},
  {q:"Application from States (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from States.",d:"easy"},
  {q:"Important from States (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from States. Practice daily.",d:"easy"},
  {q:"Numerical from States (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for States.",d:"medium"}
],

'jc-7': [
  {q:"JEE question from Redox (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Redox.",d:"easy"},
  {q:"JEE question from Redox (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Redox.",d:"medium"},
  {q:"JEE question from Redox (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Redox.",d:"medium"},
  {q:"Application from Redox (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Redox.",d:"easy"},
  {q:"Important from Redox (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Redox. Practice daily.",d:"easy"},
  {q:"Numerical from Redox (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Redox.",d:"medium"}
],

'jc-8': [
  {q:"JEE question from Periodic (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Periodic.",d:"easy"},
  {q:"JEE question from Periodic (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Periodic.",d:"medium"},
  {q:"JEE question from Periodic (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Periodic.",d:"medium"},
  {q:"Application from Periodic (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Periodic.",d:"easy"},
  {q:"Important from Periodic (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Periodic. Practice daily.",d:"easy"},
  {q:"Numerical from Periodic (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Periodic.",d:"medium"}
],

'jc-9': [
  {q:"JEE question from s-Block (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from s-Block.",d:"easy"},
  {q:"JEE question from s-Block (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from s-Block.",d:"medium"},
  {q:"JEE question from s-Block (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of s-Block.",d:"medium"},
  {q:"Application from s-Block (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from s-Block.",d:"easy"},
  {q:"Important from s-Block (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from s-Block. Practice daily.",d:"easy"},
  {q:"Numerical from s-Block (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for s-Block.",d:"medium"}
],

'jc-10': [
  {q:"JEE question from p-Block 13-14 (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from p-Block 13-14.",d:"easy"},
  {q:"JEE question from p-Block 13-14 (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from p-Block 13-14.",d:"medium"},
  {q:"JEE question from p-Block 13-14 (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of p-Block 13-14.",d:"medium"},
  {q:"Application from p-Block 13-14 (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from p-Block 13-14.",d:"easy"},
  {q:"Important from p-Block 13-14 (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from p-Block 13-14. Practice daily.",d:"easy"},
  {q:"Numerical from p-Block 13-14 (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for p-Block 13-14.",d:"medium"}
],

'jc-12': [
  {q:"JEE question from Hydrocarbons (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Hydrocarbons.",d:"easy"},
  {q:"JEE question from Hydrocarbons (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Hydrocarbons.",d:"medium"},
  {q:"JEE question from Hydrocarbons (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Hydrocarbons.",d:"medium"},
  {q:"Application from Hydrocarbons (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Hydrocarbons.",d:"easy"},
  {q:"Important from Hydrocarbons (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Hydrocarbons. Practice daily.",d:"easy"},
  {q:"Numerical from Hydrocarbons (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Hydrocarbons.",d:"medium"}
],

'jc-13': [
  {q:"JEE question from Hydrogen Env (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Hydrogen Env.",d:"easy"},
  {q:"JEE question from Hydrogen Env (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Hydrogen Env.",d:"medium"},
  {q:"JEE question from Hydrogen Env (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Hydrogen Env.",d:"medium"},
  {q:"Application from Hydrogen Env (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Hydrogen Env.",d:"easy"},
  {q:"Important from Hydrogen Env (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Hydrogen Env. Practice daily.",d:"easy"},
  {q:"Numerical from Hydrogen Env (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Hydrogen Env.",d:"medium"}
],

'jc-14': [
  {q:"JEE question from Solutions (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Solutions.",d:"easy"},
  {q:"JEE question from Solutions (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Solutions.",d:"medium"},
  {q:"JEE question from Solutions (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Solutions.",d:"medium"},
  {q:"Application from Solutions (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Solutions.",d:"easy"},
  {q:"Important from Solutions (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Solutions. Practice daily.",d:"easy"},
  {q:"Numerical from Solutions (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Solutions.",d:"medium"}
],

'jc-15': [
  {q:"JEE question from Electrochemistry (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Electrochemistry.",d:"easy"},
  {q:"JEE question from Electrochemistry (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Electrochemistry.",d:"medium"},
  {q:"JEE question from Electrochemistry (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Electrochemistry.",d:"medium"},
  {q:"Application from Electrochemistry (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Electrochemistry.",d:"easy"},
  {q:"Important from Electrochemistry (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Electrochemistry. Practice daily.",d:"easy"},
  {q:"Numerical from Electrochemistry (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Electrochemistry.",d:"medium"}
],

'jc-16': [
  {q:"JEE question from Kinetics (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Kinetics.",d:"easy"},
  {q:"JEE question from Kinetics (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Kinetics.",d:"medium"},
  {q:"JEE question from Kinetics (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Kinetics.",d:"medium"},
  {q:"Application from Kinetics (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Kinetics.",d:"easy"},
  {q:"Important from Kinetics (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Kinetics. Practice daily.",d:"easy"},
  {q:"Numerical from Kinetics (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Kinetics.",d:"medium"}
],

'jc-17': [
  {q:"JEE question from Surface (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Surface.",d:"easy"},
  {q:"JEE question from Surface (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Surface.",d:"medium"},
  {q:"JEE question from Surface (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Surface.",d:"medium"},
  {q:"Application from Surface (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Surface.",d:"easy"},
  {q:"Important from Surface (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Surface. Practice daily.",d:"easy"},
  {q:"Numerical from Surface (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Surface.",d:"medium"}
],

'jc-18': [
  {q:"JEE question from p-Block 15-18 (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from p-Block 15-18.",d:"easy"},
  {q:"JEE question from p-Block 15-18 (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from p-Block 15-18.",d:"medium"},
  {q:"JEE question from p-Block 15-18 (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of p-Block 15-18.",d:"medium"},
  {q:"Application from p-Block 15-18 (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from p-Block 15-18.",d:"easy"},
  {q:"Important from p-Block 15-18 (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from p-Block 15-18. Practice daily.",d:"easy"},
  {q:"Numerical from p-Block 15-18 (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for p-Block 15-18.",d:"medium"}
],

'jc-19': [
  {q:"JEE question from d-f Block (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from d-f Block.",d:"easy"},
  {q:"JEE question from d-f Block (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from d-f Block.",d:"medium"},
  {q:"JEE question from d-f Block (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of d-f Block.",d:"medium"},
  {q:"Application from d-f Block (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from d-f Block.",d:"easy"},
  {q:"Important from d-f Block (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from d-f Block. Practice daily.",d:"easy"},
  {q:"Numerical from d-f Block (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for d-f Block.",d:"medium"}
],

'jc-20': [
  {q:"JEE question from Coordination (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Coordination.",d:"easy"},
  {q:"JEE question from Coordination (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Coordination.",d:"medium"},
  {q:"JEE question from Coordination (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Coordination.",d:"medium"},
  {q:"Application from Coordination (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Coordination.",d:"easy"},
  {q:"Important from Coordination (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Coordination. Practice daily.",d:"easy"},
  {q:"Numerical from Coordination (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Coordination.",d:"medium"}
],

'jc-21': [
  {q:"JEE question from Haloalkanes (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Haloalkanes.",d:"easy"},
  {q:"JEE question from Haloalkanes (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Haloalkanes.",d:"medium"},
  {q:"JEE question from Haloalkanes (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Haloalkanes.",d:"medium"},
  {q:"Application from Haloalkanes (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Haloalkanes.",d:"easy"},
  {q:"Important from Haloalkanes (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Haloalkanes. Practice daily.",d:"easy"},
  {q:"Numerical from Haloalkanes (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Haloalkanes.",d:"medium"}
],

'jc-22': [
  {q:"JEE question from Alcohols (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Alcohols.",d:"easy"},
  {q:"JEE question from Alcohols (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Alcohols.",d:"medium"},
  {q:"JEE question from Alcohols (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Alcohols.",d:"medium"},
  {q:"Application from Alcohols (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Alcohols.",d:"easy"},
  {q:"Important from Alcohols (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Alcohols. Practice daily.",d:"easy"},
  {q:"Numerical from Alcohols (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Alcohols.",d:"medium"}
],

'jc-23': [
  {q:"JEE question from Carbonyls (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Carbonyls.",d:"easy"},
  {q:"JEE question from Carbonyls (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Carbonyls.",d:"medium"},
  {q:"JEE question from Carbonyls (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Carbonyls.",d:"medium"},
  {q:"Application from Carbonyls (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Carbonyls.",d:"easy"},
  {q:"Important from Carbonyls (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Carbonyls. Practice daily.",d:"easy"},
  {q:"Numerical from Carbonyls (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Carbonyls.",d:"medium"}
],

'jc-24': [
  {q:"JEE question from Amines (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Amines.",d:"easy"},
  {q:"JEE question from Amines (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Amines.",d:"medium"},
  {q:"JEE question from Amines (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Amines.",d:"medium"},
  {q:"Application from Amines (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Amines.",d:"easy"},
  {q:"Important from Amines (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Amines. Practice daily.",d:"easy"},
  {q:"Numerical from Amines (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Amines.",d:"medium"}
],

'jc-25': [
  {q:"JEE question from Biomolecules (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Biomolecules.",d:"easy"},
  {q:"JEE question from Biomolecules (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Biomolecules.",d:"medium"},
  {q:"JEE question from Biomolecules (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Biomolecules.",d:"medium"},
  {q:"Application from Biomolecules (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Biomolecules.",d:"easy"},
  {q:"Important from Biomolecules (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Biomolecules. Practice daily.",d:"easy"},
  {q:"Numerical from Biomolecules (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Biomolecules.",d:"medium"}
],

'jm-1': [
  {q:"JEE question from Sets (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Sets.",d:"easy"},
  {q:"JEE question from Sets (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Sets.",d:"medium"},
  {q:"JEE question from Sets (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Sets.",d:"medium"},
  {q:"Application from Sets (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Sets.",d:"easy"},
  {q:"Important from Sets (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Sets. Practice daily.",d:"easy"},
  {q:"Numerical from Sets (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Sets.",d:"medium"}
],

'jm-2': [
  {q:"JEE question from Complex Numbers (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Complex Numbers.",d:"easy"},
  {q:"JEE question from Complex Numbers (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Complex Numbers.",d:"medium"},
  {q:"JEE question from Complex Numbers (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Complex Numbers.",d:"medium"},
  {q:"Application from Complex Numbers (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Complex Numbers.",d:"easy"},
  {q:"Important from Complex Numbers (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Complex Numbers. Practice daily.",d:"easy"},
  {q:"Numerical from Complex Numbers (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Complex Numbers.",d:"medium"}
],

'jm-3': [
  {q:"JEE question from Quadratic (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Quadratic.",d:"easy"},
  {q:"JEE question from Quadratic (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Quadratic.",d:"medium"},
  {q:"JEE question from Quadratic (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Quadratic.",d:"medium"},
  {q:"Application from Quadratic (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Quadratic.",d:"easy"},
  {q:"Important from Quadratic (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Quadratic. Practice daily.",d:"easy"},
  {q:"Numerical from Quadratic (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Quadratic.",d:"medium"}
],

'jm-5': [
  {q:"JEE question from Binomial (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Binomial.",d:"easy"},
  {q:"JEE question from Binomial (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Binomial.",d:"medium"},
  {q:"JEE question from Binomial (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Binomial.",d:"medium"},
  {q:"Application from Binomial (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Binomial.",d:"easy"},
  {q:"Important from Binomial (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Binomial. Practice daily.",d:"easy"},
  {q:"Numerical from Binomial (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Binomial.",d:"medium"}
],

'jm-6': [
  {q:"JEE question from PnC (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from PnC.",d:"easy"},
  {q:"JEE question from PnC (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from PnC.",d:"medium"},
  {q:"JEE question from PnC (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of PnC.",d:"medium"},
  {q:"Application from PnC (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from PnC.",d:"easy"},
  {q:"Important from PnC (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from PnC. Practice daily.",d:"easy"},
  {q:"Numerical from PnC (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for PnC.",d:"medium"}
],

'jm-7': [
  {q:"JEE question from Trig (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Trig.",d:"easy"},
  {q:"JEE question from Trig (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Trig.",d:"medium"},
  {q:"JEE question from Trig (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Trig.",d:"medium"},
  {q:"Application from Trig (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Trig.",d:"easy"},
  {q:"Important from Trig (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Trig. Practice daily.",d:"easy"},
  {q:"Numerical from Trig (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Trig.",d:"medium"}
],

'jm-8': [
  {q:"JEE question from Straight Lines (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Straight Lines.",d:"easy"},
  {q:"JEE question from Straight Lines (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Straight Lines.",d:"medium"},
  {q:"JEE question from Straight Lines (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Straight Lines.",d:"medium"},
  {q:"Application from Straight Lines (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Straight Lines.",d:"easy"},
  {q:"Important from Straight Lines (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Straight Lines. Practice daily.",d:"easy"},
  {q:"Numerical from Straight Lines (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Straight Lines.",d:"medium"}
],

'jm-9': [
  {q:"JEE question from Circles (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Circles.",d:"easy"},
  {q:"JEE question from Circles (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Circles.",d:"medium"},
  {q:"JEE question from Circles (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Circles.",d:"medium"},
  {q:"Application from Circles (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Circles.",d:"easy"},
  {q:"Important from Circles (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Circles. Practice daily.",d:"easy"},
  {q:"Numerical from Circles (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Circles.",d:"medium"}
],

'jm-10': [
  {q:"JEE question from Conics (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Conics.",d:"easy"},
  {q:"JEE question from Conics (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Conics.",d:"medium"},
  {q:"JEE question from Conics (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Conics.",d:"medium"},
  {q:"Application from Conics (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Conics.",d:"easy"},
  {q:"Important from Conics (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Conics. Practice daily.",d:"easy"},
  {q:"Numerical from Conics (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Conics.",d:"medium"}
],

'jm-11': [
  {q:"JEE question from Stats Prob (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Stats Prob.",d:"easy"},
  {q:"JEE question from Stats Prob (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Stats Prob.",d:"medium"},
  {q:"JEE question from Stats Prob (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Stats Prob.",d:"medium"},
  {q:"Application from Stats Prob (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Stats Prob.",d:"easy"},
  {q:"Important from Stats Prob (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Stats Prob. Practice daily.",d:"easy"},
  {q:"Numerical from Stats Prob (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Stats Prob.",d:"medium"}
],

'jm-12': [
  {q:"JEE question from Math Reasoning (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Math Reasoning.",d:"easy"},
  {q:"JEE question from Math Reasoning (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Math Reasoning.",d:"medium"},
  {q:"JEE question from Math Reasoning (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Math Reasoning.",d:"medium"},
  {q:"Application from Math Reasoning (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Math Reasoning.",d:"easy"},
  {q:"Important from Math Reasoning (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Math Reasoning. Practice daily.",d:"easy"},
  {q:"Numerical from Math Reasoning (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Math Reasoning.",d:"medium"}
],

'jm-14': [
  {q:"JEE question from Limits (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Limits.",d:"easy"},
  {q:"JEE question from Limits (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Limits.",d:"medium"},
  {q:"JEE question from Limits (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Limits.",d:"medium"},
  {q:"Application from Limits (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Limits.",d:"easy"},
  {q:"Important from Limits (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Limits. Practice daily.",d:"easy"},
  {q:"Numerical from Limits (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Limits.",d:"medium"}
],

'jm-15': [
  {q:"JEE question from Differentiation (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Differentiation.",d:"easy"},
  {q:"JEE question from Differentiation (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Differentiation.",d:"medium"},
  {q:"JEE question from Differentiation (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Differentiation.",d:"medium"},
  {q:"Application from Differentiation (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Differentiation.",d:"easy"},
  {q:"Important from Differentiation (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Differentiation. Practice daily.",d:"easy"},
  {q:"Numerical from Differentiation (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Differentiation.",d:"medium"}
],

'jm-17': [
  {q:"JEE question from Area Curves (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Area Curves.",d:"easy"},
  {q:"JEE question from Area Curves (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Area Curves.",d:"medium"},
  {q:"JEE question from Area Curves (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Area Curves.",d:"medium"},
  {q:"Application from Area Curves (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Area Curves.",d:"easy"},
  {q:"Important from Area Curves (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Area Curves. Practice daily.",d:"easy"},
  {q:"Numerical from Area Curves (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Area Curves.",d:"medium"}
],

'jm-18': [
  {q:"JEE question from Diff Equations (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Diff Equations.",d:"easy"},
  {q:"JEE question from Diff Equations (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Diff Equations.",d:"medium"},
  {q:"JEE question from Diff Equations (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Diff Equations.",d:"medium"},
  {q:"Application from Diff Equations (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Diff Equations.",d:"easy"},
  {q:"Important from Diff Equations (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Diff Equations. Practice daily.",d:"easy"},
  {q:"Numerical from Diff Equations (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Diff Equations.",d:"medium"}
],

'jm-19': [
  {q:"JEE question from Vectors (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Vectors.",d:"easy"},
  {q:"JEE question from Vectors (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Vectors.",d:"medium"},
  {q:"JEE question from Vectors (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Vectors.",d:"medium"},
  {q:"Application from Vectors (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Vectors.",d:"easy"},
  {q:"Important from Vectors (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Vectors. Practice daily.",d:"easy"},
  {q:"Numerical from Vectors (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Vectors.",d:"medium"}
],

'jm-20': [
  {q:"JEE question from 3D Geometry (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from 3D Geometry.",d:"easy"},
  {q:"JEE question from 3D Geometry (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from 3D Geometry.",d:"medium"},
  {q:"JEE question from 3D Geometry (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of 3D Geometry.",d:"medium"},
  {q:"Application from 3D Geometry (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from 3D Geometry.",d:"easy"},
  {q:"Important from 3D Geometry (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from 3D Geometry. Practice daily.",d:"easy"},
  {q:"Numerical from 3D Geometry (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for 3D Geometry.",d:"medium"}
],

'jm-21': [
  {q:"JEE question from Probability (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Probability.",d:"easy"},
  {q:"JEE question from Probability (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Probability.",d:"medium"},
  {q:"JEE question from Probability (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Probability.",d:"medium"},
  {q:"Application from Probability (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Probability.",d:"easy"},
  {q:"Important from Probability (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Probability. Practice daily.",d:"easy"},
  {q:"Numerical from Probability (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Probability.",d:"medium"}
],

'jm-22': [
  {q:"JEE question from Inverse Trig (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Inverse Trig.",d:"easy"},
  {q:"JEE question from Inverse Trig (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Inverse Trig.",d:"medium"},
  {q:"JEE question from Inverse Trig (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Inverse Trig.",d:"medium"},
  {q:"Application from Inverse Trig (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Inverse Trig.",d:"easy"},
  {q:"Important from Inverse Trig (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Inverse Trig. Practice daily.",d:"easy"},
  {q:"Numerical from Inverse Trig (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Inverse Trig.",d:"medium"}
],

'jm-23': [
  {q:"JEE question from Linear Programming (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Solve HC Verma / RD Sharma problems from Linear Programming.",d:"easy"},
  {q:"JEE question from Linear Programming (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year JEE from Linear Programming.",d:"medium"},
  {q:"JEE question from Linear Programming (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Focus on conceptual understanding of Linear Programming.",d:"medium"},
  {q:"Application from Linear Programming (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply formulas and concepts from Linear Programming.",d:"easy"},
  {q:"Important from Linear Programming (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"High-yield topic from Linear Programming. Practice daily.",d:"easy"},
  {q:"Numerical from Linear Programming (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Numerical practice is key for Linear Programming.",d:"medium"}
],

'cl-2': [
  {q:"CLAT question from Torts (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Study Torts from AP Bhardwaj / Pearson CLAT Guide.",d:"easy"},
  {q:"CLAT question from Torts (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year CLAT from Torts.",d:"easy"},
  {q:"CLAT question from Torts (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Read The Hindu daily for Torts preparation.",d:"medium"},
  {q:"Application from Torts (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply logical reasoning to Torts problems.",d:"medium"},
  {q:"Important from Torts (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Key concepts from Torts for CLAT.",d:"easy"},
  {q:"Practice from Torts (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Regular practice from Torts section.",d:"easy"}
],

'cl-3': [
  {q:"CLAT question from Contract (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Study Contract from AP Bhardwaj / Pearson CLAT Guide.",d:"easy"},
  {q:"CLAT question from Contract (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year CLAT from Contract.",d:"easy"},
  {q:"CLAT question from Contract (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Read The Hindu daily for Contract preparation.",d:"medium"},
  {q:"Application from Contract (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply logical reasoning to Contract problems.",d:"medium"},
  {q:"Important from Contract (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Key concepts from Contract for CLAT.",d:"easy"},
  {q:"Practice from Contract (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Regular practice from Contract section.",d:"easy"}
],

'cl-4': [
  {q:"CLAT question from Criminal Law (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Study Criminal Law from AP Bhardwaj / Pearson CLAT Guide.",d:"easy"},
  {q:"CLAT question from Criminal Law (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year CLAT from Criminal Law.",d:"easy"},
  {q:"CLAT question from Criminal Law (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Read The Hindu daily for Criminal Law preparation.",d:"medium"},
  {q:"Application from Criminal Law (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply logical reasoning to Criminal Law problems.",d:"medium"},
  {q:"Important from Criminal Law (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Key concepts from Criminal Law for CLAT.",d:"easy"},
  {q:"Practice from Criminal Law (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Regular practice from Criminal Law section.",d:"easy"}
],

'cl-5': [
  {q:"CLAT question from Constitutional (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Study Constitutional from AP Bhardwaj / Pearson CLAT Guide.",d:"easy"},
  {q:"CLAT question from Constitutional (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year CLAT from Constitutional.",d:"easy"},
  {q:"CLAT question from Constitutional (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Read The Hindu daily for Constitutional preparation.",d:"medium"},
  {q:"Application from Constitutional (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply logical reasoning to Constitutional problems.",d:"medium"},
  {q:"Important from Constitutional (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Key concepts from Constitutional for CLAT.",d:"easy"},
  {q:"Practice from Constitutional (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Regular practice from Constitutional section.",d:"easy"}
],

'cl-6': [
  {q:"CLAT question from Legal Maxims (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Study Legal Maxims from AP Bhardwaj / Pearson CLAT Guide.",d:"easy"},
  {q:"CLAT question from Legal Maxims (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year CLAT from Legal Maxims.",d:"easy"},
  {q:"CLAT question from Legal Maxims (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Read The Hindu daily for Legal Maxims preparation.",d:"medium"},
  {q:"Application from Legal Maxims (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply logical reasoning to Legal Maxims problems.",d:"medium"},
  {q:"Important from Legal Maxims (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Key concepts from Legal Maxims for CLAT.",d:"easy"},
  {q:"Practice from Legal Maxims (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Regular practice from Legal Maxims section.",d:"easy"}
],

'clo-2': [
  {q:"CLAT question from Assumptions (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Study Assumptions from AP Bhardwaj / Pearson CLAT Guide.",d:"easy"},
  {q:"CLAT question from Assumptions (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year CLAT from Assumptions.",d:"easy"},
  {q:"CLAT question from Assumptions (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Read The Hindu daily for Assumptions preparation.",d:"medium"},
  {q:"Application from Assumptions (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply logical reasoning to Assumptions problems.",d:"medium"},
  {q:"Important from Assumptions (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Key concepts from Assumptions for CLAT.",d:"easy"},
  {q:"Practice from Assumptions (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Regular practice from Assumptions section.",d:"easy"}
],

'clo-3': [
  {q:"CLAT question from Strengthen Weaken (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Study Strengthen Weaken from AP Bhardwaj / Pearson CLAT Guide.",d:"easy"},
  {q:"CLAT question from Strengthen Weaken (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year CLAT from Strengthen Weaken.",d:"easy"},
  {q:"CLAT question from Strengthen Weaken (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Read The Hindu daily for Strengthen Weaken preparation.",d:"medium"},
  {q:"Application from Strengthen Weaken (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply logical reasoning to Strengthen Weaken problems.",d:"medium"},
  {q:"Important from Strengthen Weaken (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Key concepts from Strengthen Weaken for CLAT.",d:"easy"},
  {q:"Practice from Strengthen Weaken (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Regular practice from Strengthen Weaken section.",d:"easy"}
],

'clo-4': [
  {q:"CLAT question from Analogies (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Study Analogies from AP Bhardwaj / Pearson CLAT Guide.",d:"easy"},
  {q:"CLAT question from Analogies (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year CLAT from Analogies.",d:"easy"},
  {q:"CLAT question from Analogies (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Read The Hindu daily for Analogies preparation.",d:"medium"},
  {q:"Application from Analogies (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply logical reasoning to Analogies problems.",d:"medium"},
  {q:"Important from Analogies (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Key concepts from Analogies for CLAT.",d:"easy"},
  {q:"Practice from Analogies (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Regular practice from Analogies section.",d:"easy"}
],

'clo-5': [
  {q:"CLAT question from Critical Reasoning (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Study Critical Reasoning from AP Bhardwaj / Pearson CLAT Guide.",d:"easy"},
  {q:"CLAT question from Critical Reasoning (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year CLAT from Critical Reasoning.",d:"easy"},
  {q:"CLAT question from Critical Reasoning (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Read The Hindu daily for Critical Reasoning preparation.",d:"medium"},
  {q:"Application from Critical Reasoning (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply logical reasoning to Critical Reasoning problems.",d:"medium"},
  {q:"Important from Critical Reasoning (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Key concepts from Critical Reasoning for CLAT.",d:"easy"},
  {q:"Practice from Critical Reasoning (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Regular practice from Critical Reasoning section.",d:"easy"}
],

'ce-2': [
  {q:"CLAT question from Vocabulary (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Study Vocabulary from AP Bhardwaj / Pearson CLAT Guide.",d:"easy"},
  {q:"CLAT question from Vocabulary (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year CLAT from Vocabulary.",d:"easy"},
  {q:"CLAT question from Vocabulary (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Read The Hindu daily for Vocabulary preparation.",d:"medium"},
  {q:"Application from Vocabulary (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply logical reasoning to Vocabulary problems.",d:"medium"},
  {q:"Important from Vocabulary (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Key concepts from Vocabulary for CLAT.",d:"easy"},
  {q:"Practice from Vocabulary (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Regular practice from Vocabulary section.",d:"easy"}
],

'ce-3': [
  {q:"CLAT question from Grammar (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Study Grammar from AP Bhardwaj / Pearson CLAT Guide.",d:"easy"},
  {q:"CLAT question from Grammar (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year CLAT from Grammar.",d:"easy"},
  {q:"CLAT question from Grammar (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Read The Hindu daily for Grammar preparation.",d:"medium"},
  {q:"Application from Grammar (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply logical reasoning to Grammar problems.",d:"medium"},
  {q:"Important from Grammar (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Key concepts from Grammar for CLAT.",d:"easy"},
  {q:"Practice from Grammar (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Regular practice from Grammar section.",d:"easy"}
],

'ce-4': [
  {q:"CLAT question from Summary (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Study Summary from AP Bhardwaj / Pearson CLAT Guide.",d:"easy"},
  {q:"CLAT question from Summary (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year CLAT from Summary.",d:"easy"},
  {q:"CLAT question from Summary (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Read The Hindu daily for Summary preparation.",d:"medium"},
  {q:"Application from Summary (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply logical reasoning to Summary problems.",d:"medium"},
  {q:"Important from Summary (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Key concepts from Summary for CLAT.",d:"easy"},
  {q:"Practice from Summary (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Regular practice from Summary section.",d:"easy"}
],

'ce-5': [
  {q:"CLAT question from Para Jumbles (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Study Para Jumbles from AP Bhardwaj / Pearson CLAT Guide.",d:"easy"},
  {q:"CLAT question from Para Jumbles (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year CLAT from Para Jumbles.",d:"easy"},
  {q:"CLAT question from Para Jumbles (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Read The Hindu daily for Para Jumbles preparation.",d:"medium"},
  {q:"Application from Para Jumbles (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply logical reasoning to Para Jumbles problems.",d:"medium"},
  {q:"Important from Para Jumbles (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Key concepts from Para Jumbles for CLAT.",d:"easy"},
  {q:"Practice from Para Jumbles (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Regular practice from Para Jumbles section.",d:"easy"}
],

'cg-1': [
  {q:"CLAT question from National News (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Study National News from AP Bhardwaj / Pearson CLAT Guide.",d:"easy"},
  {q:"CLAT question from National News (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year CLAT from National News.",d:"easy"},
  {q:"CLAT question from National News (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Read The Hindu daily for National News preparation.",d:"medium"},
  {q:"Application from National News (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply logical reasoning to National News problems.",d:"medium"},
  {q:"Important from National News (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Key concepts from National News for CLAT.",d:"easy"},
  {q:"Practice from National News (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Regular practice from National News section.",d:"easy"}
],

'cg-2': [
  {q:"CLAT question from Govt Schemes (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Study Govt Schemes from AP Bhardwaj / Pearson CLAT Guide.",d:"easy"},
  {q:"CLAT question from Govt Schemes (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year CLAT from Govt Schemes.",d:"easy"},
  {q:"CLAT question from Govt Schemes (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Read The Hindu daily for Govt Schemes preparation.",d:"medium"},
  {q:"Application from Govt Schemes (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply logical reasoning to Govt Schemes problems.",d:"medium"},
  {q:"Important from Govt Schemes (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Key concepts from Govt Schemes for CLAT.",d:"easy"},
  {q:"Practice from Govt Schemes (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Regular practice from Govt Schemes section.",d:"easy"}
],

'cg-3': [
  {q:"CLAT question from Sports Awards (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Study Sports Awards from AP Bhardwaj / Pearson CLAT Guide.",d:"easy"},
  {q:"CLAT question from Sports Awards (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year CLAT from Sports Awards.",d:"easy"},
  {q:"CLAT question from Sports Awards (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Read The Hindu daily for Sports Awards preparation.",d:"medium"},
  {q:"Application from Sports Awards (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply logical reasoning to Sports Awards problems.",d:"medium"},
  {q:"Important from Sports Awards (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Key concepts from Sports Awards for CLAT.",d:"easy"},
  {q:"Practice from Sports Awards (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Regular practice from Sports Awards section.",d:"easy"}
],

'cg-4': [
  {q:"CLAT question from Science Tech (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Study Science Tech from AP Bhardwaj / Pearson CLAT Guide.",d:"easy"},
  {q:"CLAT question from Science Tech (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year CLAT from Science Tech.",d:"easy"},
  {q:"CLAT question from Science Tech (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Read The Hindu daily for Science Tech preparation.",d:"medium"},
  {q:"Application from Science Tech (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply logical reasoning to Science Tech problems.",d:"medium"},
  {q:"Important from Science Tech (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Key concepts from Science Tech for CLAT.",d:"easy"},
  {q:"Practice from Science Tech (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Regular practice from Science Tech section.",d:"easy"}
],

'cg-5': [
  {q:"CLAT question from History Geography (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Study History Geography from AP Bhardwaj / Pearson CLAT Guide.",d:"easy"},
  {q:"CLAT question from History Geography (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year CLAT from History Geography.",d:"easy"},
  {q:"CLAT question from History Geography (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Read The Hindu daily for History Geography preparation.",d:"medium"},
  {q:"Application from History Geography (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply logical reasoning to History Geography problems.",d:"medium"},
  {q:"Important from History Geography (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Key concepts from History Geography for CLAT.",d:"easy"},
  {q:"Practice from History Geography (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Regular practice from History Geography section.",d:"easy"}
],

'cg-7': [
  {q:"CLAT question from Legal Events (Q1):",o:["Correct", "Wrong B", "Wrong C", "Wrong D"],a:0,e:"Study Legal Events from AP Bhardwaj / Pearson CLAT Guide.",d:"easy"},
  {q:"CLAT question from Legal Events (Q2):",o:["Wrong A", "Correct", "Wrong C", "Wrong D"],a:1,e:"Practice previous year CLAT from Legal Events.",d:"easy"},
  {q:"CLAT question from Legal Events (Q3):",o:["Wrong A", "Wrong B", "Correct", "Wrong D"],a:2,e:"Read The Hindu daily for Legal Events preparation.",d:"medium"},
  {q:"Application from Legal Events (Q4):",o:["Wrong", "Wrong", "Wrong", "Correct"],a:3,e:"Apply logical reasoning to Legal Events problems.",d:"medium"},
  {q:"Important from Legal Events (Q5):",o:["Correct", "Wrong", "Wrong", "Wrong"],a:0,e:"Key concepts from Legal Events for CLAT.",d:"easy"},
  {q:"Practice from Legal Events (Q6):",o:["Wrong", "Correct", "Wrong", "Wrong"],a:1,e:"Regular practice from Legal Events section.",d:"easy"}
],
};
