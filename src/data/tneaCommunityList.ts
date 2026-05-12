/**
 * TNEA 2026 — Official Community List (Annexure I)
 *
 * Source: Tamil Nadu Engineering Admissions 2026 Information Brochure
 *         (Directorate of Technical Education, Tamil Nadu)
 *         https://www.tneaonline.org | https://www.dte.tn.gov.in
 *
 * This is the authoritative list of communities/castes used to determine
 * reservation category for TNEA admissions. Total count from the brochure
 * is approximately 371 community entries across 7 categories.
 *
 * IMPORTANT — From the official brochure:
 *  • Only Tamil Nadu native candidates are eligible for communal reservation.
 *  • Community certificate must be in permanent card OR digitally signed
 *    e-Certificate format, issued before the application deadline.
 *  • Some communities are linked to specific districts; certificate must
 *    be obtained from that district.
 *  • If proper community certificate isn't produced, candidate falls under
 *    "Open Competition (OC)".
 */

export type TneaCategory = 'ST' | 'SC' | 'SCA' | 'MBC' | 'DNC' | 'BC' | 'BCM';

export interface TneaCommunity {
  /** Serial number in the official Annexure I */
  serial: number;
  /** Community name as listed in the brochure */
  name: string;
  /** Reservation category */
  category: TneaCategory;
  /** Optional: district restriction (community valid only in these districts) */
  districts?: string[];
  /** Optional: notes about exceptions or special conditions */
  note?: string;
}

/** Mapping for category metadata */
export const CATEGORY_META: Record<TneaCategory, {
  full: string;
  fullTamil: string;
  reservation: number;
  color: string;
}> = {
  ST:  { full: 'Scheduled Tribe',                 fullTamil: 'பழங்குடியினர்',           reservation: 1.0,  color: 'purple' },
  SC:  { full: 'Scheduled Caste',                 fullTamil: 'பட்டியல் சாதி',           reservation: 15.0, color: 'orange' },
  SCA: { full: 'SC Arunthathiyars',               fullTamil: 'SC அருந்ததியர்',           reservation: 3.0,  color: 'rose'   },
  MBC: { full: 'Most Backward Class & DNC',       fullTamil: 'மிகவும் பிற்படுத்தப்பட்டோர்', reservation: 20.0, color: 'amber'  },
  DNC: { full: 'Denotified Community',            fullTamil: 'குறிப்பீடு நீக்கப்பட்ட சமூகம்', reservation: 20.0, color: 'amber'  },
  BC:  { full: 'Backward Class',                  fullTamil: 'பிற்படுத்தப்பட்ட வகுப்பினர்', reservation: 26.5, color: 'emerald' },
  BCM: { full: 'Backward Class Muslim',           fullTamil: 'பிற்படுத்தப்பட்ட இஸ்லாமியர்', reservation: 3.5,  color: 'teal'   },
};

/**
 * The full community list from Annexure I of the TNEA 2026 brochure.
 *
 * NOTE — District-restricted entries are flagged via the `districts` field.
 * For example: "Malayali (in Dharmapuri, North Arcot, Pudukkottai, Salem,
 * South Arcot, Tiruchirapalli districts)" → districts: [those names].
 */
export const TNEA_COMMUNITIES: TneaCommunity[] = [
  // ===== SCHEDULED TRIBES (37 entries) =====
  { serial: 1,  category: 'ST', name: 'Adiyan' },
  { serial: 2,  category: 'ST', name: 'Aranadan' },
  { serial: 3,  category: 'ST', name: 'Eravallan' },
  { serial: 4,  category: 'ST', name: 'Irular' },
  { serial: 5,  category: 'ST', name: 'Kadar' },
  { serial: 6,  category: 'ST', name: 'Kammar', note: 'Excluding Kanyakumari District and Shenkottah Taluk of Tirunelveli District' },
  { serial: 7,  category: 'ST', name: 'Kanikaran, Kanikkar', districts: ['Kanyakumari', 'Shenkottah Taluk of Tirunelveli'] },
  { serial: 8,  category: 'ST', name: 'Kaniyan, Kanyan' },
  { serial: 9,  category: 'ST', name: 'Kattunayakan' },
  { serial: 10, category: 'ST', name: 'Kochu Velan' },
  { serial: 11, category: 'ST', name: 'Konda Kapus' },
  { serial: 12, category: 'ST', name: 'Kondareddis' },
  { serial: 13, category: 'ST', name: 'Koraga' },
  { serial: 14, category: 'ST', name: 'Kota', note: 'Excluding Kanyakumari District and Shenkottah Taluk of Tirunelveli District' },
  { serial: 15, category: 'ST', name: 'Kudiya, Melakudi' },
  { serial: 16, category: 'ST', name: 'Kurichchan' },
  { serial: 17, category: 'ST', name: 'Kurumbas', districts: ['Nilgiris'] },
  { serial: 18, category: 'ST', name: 'Kurumans' },
  { serial: 19, category: 'ST', name: 'Maha Malasar' },
  { serial: 20, category: 'ST', name: 'Malai Arayan' },
  { serial: 21, category: 'ST', name: 'Malai Pandaram' },
  { serial: 22, category: 'ST', name: 'Malai Vedan' },
  { serial: 23, category: 'ST', name: 'Malakkuravan' },
  { serial: 24, category: 'ST', name: 'Malasar' },
  { serial: 25, category: 'ST', name: 'Malayali', districts: ['Dharmapuri', 'North Arcot', 'Pudukkottai', 'Salem', 'South Arcot', 'Tiruchirapalli'] },
  { serial: 26, category: 'ST', name: 'Malayakandi' },
  { serial: 27, category: 'ST', name: 'Mannan' },
  { serial: 28, category: 'ST', name: 'Mudugar, Mudvan' },
  { serial: 29, category: 'ST', name: 'Muthuvan' },
  { serial: 30, category: 'ST', name: 'Pallayan' },
  { serial: 31, category: 'ST', name: 'Palliyan' },
  { serial: 32, category: 'ST', name: 'Palliyar' },
  { serial: 33, category: 'ST', name: 'Paniyan' },
  { serial: 34, category: 'ST', name: 'Sholaga' },
  { serial: 35, category: 'ST', name: 'Toda', note: 'Excluding Kanyakumari District and Shenkottah Taluk of Tirunelveli District' },
  { serial: 36, category: 'ST', name: 'Uraly' },
  { serial: 37, category: 'ST', name: 'Narikoravar (Kurivikars)' },

  // ===== SCHEDULED CASTES (64 entries: 38-101) =====
  { serial: 38, category: 'SC', name: 'Adi Dravida' },
  { serial: 39, category: 'SC', name: 'Adi Karnataka' },
  { serial: 40, category: 'SC', name: 'Ajila' },
  { serial: 41, category: 'SC', name: 'Ayyanavar', districts: ['Kanyakumari', 'Shenkottah Taluk of Tirunelveli'] },
  { serial: 42, category: 'SC', name: 'Baira' },
  { serial: 43, category: 'SC', name: 'Bakuda' },
  { serial: 44, category: 'SC', name: 'Bandi' },
  { serial: 45, category: 'SC', name: 'Bellara' },
  { serial: 46, category: 'SC', name: 'Bharatar', districts: ['Kanyakumari', 'Shenkottah Taluk of Tirunelveli'] },
  { serial: 47, category: 'SC', name: 'Chalavadi' },
  { serial: 48, category: 'SC', name: 'Chamar, Muchi' },
  { serial: 49, category: 'SC', name: 'Chandala' },
  { serial: 50, category: 'SC', name: 'Cheruman' },
  { serial: 51, category: 'SC', name: 'Devendrakula Velalar', note: 'Includes Devendrakulathan, Kadaiyan (except coastal Tirunelveli/Thoothukudi/Ramanathapuram/Pudukottai/Thanjavur/Tiruvarur/Nagapattinam), Kalladi, Kudumban, Pallan, Pannadi, Vathiriyan' },
  { serial: 52, category: 'SC', name: 'Dom, Dombar, Paidi, Pano' },
  { serial: 53, category: 'SC', name: 'Domban' },
  { serial: 54, category: 'SC', name: 'Godagali' },
  { serial: 55, category: 'SC', name: 'Godda' },
  { serial: 56, category: 'SC', name: 'Gosargi' },
  { serial: 57, category: 'SC', name: 'Holeya' },
  { serial: 58, category: 'SC', name: 'Jaggali' },
  { serial: 59, category: 'SC', name: 'Jambuvulu' },
  { serial: 60, category: 'SC', name: 'Kadaiyan', districts: ['Tirunelveli', 'Thoothukudi', 'Ramanathapuram', 'Pudukottai', 'Thanjavur', 'Tiruvarur', 'Nagapattinam'] },
  { serial: 61, category: 'SC', name: 'Kakkalan', districts: ['Kanyakumari', 'Shenkottah Taluk of Tirunelveli'] },
  { serial: 62, category: 'SC', name: 'Kanakkan, Padanna', districts: ['Nilgiris'] },
  { serial: 63, category: 'SC', name: 'Karimpalan' },
  { serial: 64, category: 'SC', name: 'Kavara', districts: ['Kanyakumari', 'Shenkottah Taluk of Tirunelveli'] },
  { serial: 65, category: 'SC', name: 'Koliyan' },
  { serial: 66, category: 'SC', name: 'Koosa' },
  { serial: 67, category: 'SC', name: 'Kootan, Koodan', districts: ['Kanyakumari', 'Shenkottah Taluk of Tirunelveli'] },
  { serial: 68, category: 'SC', name: 'Kuravan, Sidhanar' },
  { serial: 69, category: 'SC', name: 'Maila' },
  { serial: 70, category: 'SC', name: 'Mala' },
  { serial: 71, category: 'SC', name: 'Mannan', districts: ['Kanyakumari', 'Shenkottah Taluk of Tirunelveli'] },
  { serial: 72, category: 'SC', name: 'Mavilan' },
  { serial: 73, category: 'SC', name: 'Moger' },
  { serial: 74, category: 'SC', name: 'Mundala' },
  { serial: 75, category: 'SC', name: 'Nalakeyava' },
  { serial: 76, category: 'SC', name: 'Nayadi' },
  { serial: 77, category: 'SC', name: 'Padannan', districts: ['Kanyakumari', 'Shenkottah Taluk of Tirunelveli'] },
  { serial: 78, category: 'SC', name: 'Palluvan' },
  { serial: 79, category: 'SC', name: 'Pambada' },
  { serial: 80, category: 'SC', name: 'Panan', districts: ['Kanyakumari', 'Shenkottah Taluk of Tirunelveli'] },
  { serial: 81, category: 'SC', name: 'Panchama' },
  { serial: 82, category: 'SC', name: 'Panniandi' },
  { serial: 83, category: 'SC', name: 'Paraiyan, Parayan, Sambavar' },
  { serial: 84, category: 'SC', name: 'Paravan', districts: ['Kanyakumari', 'Shenkottah Taluk of Tirunelveli'] },
  { serial: 85, category: 'SC', name: 'Pathiyan', districts: ['Kanyakumari', 'Shenkottah Taluk of Tirunelveli'] },
  { serial: 86, category: 'SC', name: 'Pulayan, Cheramar' },
  { serial: 87, category: 'SC', name: 'Puthirai Vannan' },
  { serial: 88, category: 'SC', name: 'Raneyar' },
  { serial: 89, category: 'SC', name: 'Samagara' },
  { serial: 90, category: 'SC', name: 'Samban' },
  { serial: 91, category: 'SC', name: 'Sapari' },
  { serial: 92, category: 'SC', name: 'Semman' },
  { serial: 93, category: 'SC', name: 'Thandan', districts: ['Kanyakumari', 'Shenkottah Taluk of Tirunelveli'] },
  { serial: 94, category: 'SC', name: 'Tiruvalluvar' },
  { serial: 95, category: 'SC', name: 'Vallon' },
  { serial: 96, category: 'SC', name: 'Valluvan' },
  { serial: 97, category: 'SC', name: 'Vannan', districts: ['Kanyakumari', 'Shenkottah Taluk of Tirunelveli'] },
  { serial: 98, category: 'SC', name: 'Velan' },
  { serial: 99, category: 'SC', name: 'Vetan', districts: ['Kanyakumari', 'Shenkottah Taluk of Tirunelveli'] },
  { serial: 100, category: 'SC', name: 'Vettiyan' },
  { serial: 101, category: 'SC', name: 'Vettuvan', districts: ['Kanyakumari', 'Shenkottah Taluk of Tirunelveli'] },

  // ===== SCHEDULED CASTES ARUNTHATHIYARS (7 entries) =====
  { serial: 102, category: 'SCA', name: 'Adi Andhra' },
  { serial: 103, category: 'SCA', name: 'Arunthathiyar' },
  { serial: 104, category: 'SCA', name: 'Chakkiliyan' },
  { serial: 105, category: 'SCA', name: 'Madari' },
  { serial: 106, category: 'SCA', name: 'Madiga' },
  { serial: 107, category: 'SCA', name: 'Pagadai' },
  { serial: 108, category: 'SCA', name: 'Thoti' },

  // ===== MOST BACKWARD CLASSES (109-154) =====
  { serial: 109, category: 'MBC', name: 'Ambalakarar' },
  { serial: 110, category: 'MBC', name: 'Andipandaram' },
  { serial: 111, category: 'MBC', name: 'Arayar', districts: ['Kanyakumari'] },
  { serial: 112, category: 'MBC', name: 'Bestha, Siviar' },
  { serial: 113, category: 'MBC', name: 'Bhatraju', note: 'Other than Kshatriya Raju' },
  { serial: 114, category: 'MBC', name: 'Boyar, Oddar' },
  { serial: 115, category: 'MBC', name: 'Dasari' },
  { serial: 116, category: 'MBC', name: 'Dommara' },
  { serial: 117, category: 'MBC', name: 'Eravallar', note: 'Except in Kanyakumari District and Shenkottah Taluk of Tirunelveli (where it is ST)' },
  { serial: 118, category: 'MBC', name: 'Isaivellalar' },
  { serial: 119, category: 'MBC', name: 'Jambuvanodai' },
  { serial: 120, category: 'MBC', name: 'Jangam' },
  { serial: 121, category: 'MBC', name: 'Jogi' },
  { serial: 122, category: 'MBC', name: 'Kongu Chettia', districts: ['Coimbatore', 'Erode'] },
  { serial: 123, category: 'MBC', name: 'Koracha' },
  { serial: 124, category: 'MBC', name: 'Kulala', note: 'Including Kuyavar and Kumbarar' },
  { serial: 125, category: 'MBC', name: 'Kulnnuvar Mannadi' },
  { serial: 126, category: 'MBC', name: 'Kurumba, Kurumba Gounder' },
  { serial: 127, category: 'MBC', name: 'Kuruhini Chetty' },
  { serial: 128, category: 'MBC', name: 'Latin Catholic Christian Vannar', districts: ['Kanyakumari'] },
  { serial: 129, category: 'MBC', name: 'Maruthuvar, Navithar, Mangala, Velakattalavar, Velakatalanair and Pronopakari' },
  { serial: 130, category: 'MBC', name: 'Mond Golla' },
  { serial: 131, category: 'MBC', name: 'Moundadan Chetty' },
  { serial: 132, category: 'MBC', name: 'Mahendra, Medara' },
  { serial: 133, category: 'MBC', name: 'Nokkar' },
  { serial: 134, category: 'MBC', name: 'Panisaivan / Panisivan' },
  { serial: 135, category: 'MBC', name: 'Vanniakula Kshatriya', note: 'Includes Vanniyar, Vanniya, Vannia Gounder, Gounder, Kander, Padayachi, Palli, Agnikula Kshatriya' },
  { serial: 136, category: 'MBC', name: 'Paravar', note: 'Except in Kanyakumari and Shenkottah Taluk of Tirunelveli (where it is SC)' },
  { serial: 137, category: 'MBC', name: 'Paravar converts to Christianity', note: 'Including Paravar converts to Christianity in Kanyakumari and Shenkottah Taluk' },
  { serial: 138, category: 'MBC', name: 'Meenavar (Parvatharajakulam, Pattanavar, Sembadavar)', note: 'Including converts to Christianity' },
  { serial: 139, category: 'MBC', name: 'Mukkuvar or Mukayar', note: 'Including converts to Christianity' },
  { serial: 140, category: 'MBC', name: 'Punnan Vettuva Gounder' },
  { serial: 141, category: 'MBC', name: 'Pannayar', note: 'Other than Kathikarar in Kanyakumari District' },
  { serial: 142, category: 'MBC', name: 'Sathatha Srivaishnava', note: 'Including Sathani, Chattadi, Chattada Srivaishnava' },
  { serial: 143, category: 'MBC', name: 'Sozhia Chetty' },
  { serial: 144, category: 'MBC', name: 'Telugupatty Chetty' },
  { serial: 145, category: 'MBC', name: 'Thotti Naicker', note: 'Including Rajakambalam, Gollavar, Sillavar, Thockalavar, Thozhuva Naicker and Erragollar' },
  { serial: 146, category: 'MBC', name: 'Thondaman' },
  { serial: 147, category: 'MBC', name: 'Thoraiyar', districts: ['Nilgiris'] },
  { serial: 148, category: 'MBC', name: 'Thoraiyar (Plains)' },
  { serial: 149, category: 'MBC', name: 'Transgender or Eunuch (Thirunangai or Aravani)' },
  { serial: 150, category: 'MBC', name: 'Valaiyar', note: 'Including Chettinad Valayars' },
  { serial: 151, category: 'MBC', name: 'Vannar', note: 'Including Agasa, Madivala, Ekali, Rajakula, Veluthadar, Rajaka — except Kanyakumari & Shenkottah Taluk (where SC)' },
  { serial: 152, category: 'MBC', name: 'Vettaikarar' },
  { serial: 153, category: 'MBC', name: 'Vettuva Gounder' },
  { serial: 154, category: 'MBC', name: 'Yogeeswarar' },

  // ===== DENOTIFIED COMMUNITIES (155-222) — these are grouped with MBC for 20% =====
  { serial: 155, category: 'DNC', name: 'Attur Kilnad Koravars', districts: ['Salem', 'Namakkal', 'Cuddalore', 'Villupuram', 'Ramanathapuram', 'Sivaganga', 'Virudhunagar'] },
  { serial: 156, category: 'DNC', name: 'Attur Melnad Koravars', districts: ['Salem', 'Namakkal'] },
  { serial: 157, category: 'DNC', name: 'Appanad Kondayam Kottai Maravar', districts: ['Sivaganga', 'Virudhunagar', 'Ramanathapuram', 'Madurai', 'Theni', 'Dindigul'] },
  { serial: 158, category: 'DNC', name: 'Ambalakarar', districts: ['Thanjavur', 'Nagapattinam', 'Tiruvarur', 'Tiruchirappalli', 'Karur', 'Perambalur', 'Pudukkottai'] },
  { serial: 159, category: 'DNC', name: 'Ambalakkarar (Suriyanur)', districts: ['Tiruchirapalli'] },
  { serial: 160, category: 'DNC', name: 'Boyas', districts: ['Tiruchirapalli', 'Karur', 'Perambalur', 'Pudukkottai', 'Nilgiris', 'Salem', 'Namakkal', 'Dharmapuri', 'Krishnagiri'] },
  { serial: 161, category: 'DNC', name: 'Battu Turkas' },
  { serial: 162, category: 'DNC', name: 'C.K. Koravars', districts: ['Cuddalore', 'Villupuram'] },
  { serial: 163, category: 'DNC', name: 'Chakkala', districts: ['Sivaganga', 'Virudhunagar', 'Ramanathapuram', 'Thanjavur', 'Nagapattinam', 'Thiruvarur', 'Pudukkottai', 'Tiruchirapalli', 'Karur', 'Perambalur', 'Madurai', 'Theni', 'Dindigul', 'Nilgiris'] },
  { serial: 164, category: 'DNC', name: 'Changyampudi Koravars', districts: ['Vellore', 'Thiruvannamalai'] },
  { serial: 165, category: 'DNC', name: 'Chettinad Valayars', districts: ['Sivaganga', 'Virudhunagar', 'Ramanathapuram'] },
  { serial: 166, category: 'DNC', name: 'Dombs', districts: ['Pudukkottai', 'Tiruchirapalli', 'Karur', 'Perambalur'] },
  { serial: 167, category: 'DNC', name: 'Dobba Koravars', districts: ['Salem', 'Namakkal'] },
  { serial: 168, category: 'DNC', name: 'Dommars', districts: ['Thanjavur', 'Nagapattinam', 'Thiruvarur', 'Pudukkottai', 'Vellore', 'Thiruvannamalai'] },
  { serial: 169, category: 'DNC', name: 'Donga Boya' },
  { serial: 170, category: 'DNC', name: 'Donga Ur. Korachas' },
  { serial: 171, category: 'DNC', name: 'Devagudi Talayaris' },
  { serial: 172, category: 'DNC', name: 'Dobbai Korachas', districts: ['Tiruchirapalli', 'Karur', 'Perambalur', 'Pudukkottai'] },
  { serial: 173, category: 'DNC', name: 'Dabi Koravars', districts: ['Thanjavur', 'Nagapattinam', 'Thiruvarur', 'Tiruchirapalli', 'Karur', 'Perambalur', 'Pudukkottai', 'Vellore', 'Thiruvannamalai'] },
  { serial: 174, category: 'DNC', name: 'Donga Dasaris', districts: ['Kancheepuram', 'Tiruvallur', 'Tiruchirapalli', 'Karur', 'Perambalur', 'Pudukkottai', 'Chennai', 'Salem', 'Namakkal'] },
  { serial: 175, category: 'DNC', name: 'Gorrela Dodda Boya' },
  { serial: 176, category: 'DNC', name: 'Gudu Dasaris' },
  { serial: 177, category: 'DNC', name: 'Gandarvakottai Koravars', districts: ['Thanjavur', 'Nagapattinam', 'Thiruvarur', 'Tiruchirapalli', 'Karur', 'Perambalur', 'Pudukkottai', 'Cuddalore', 'Villupuram'] },
  { serial: 178, category: 'DNC', name: 'Gandarvakottai Kallars', districts: ['Thanjavur', 'Nagapattinam', 'Thiruvarur', 'Pudukkotttai'] },
  { serial: 179, category: 'DNC', name: 'Inji Koravars', districts: ['Thanjavur', 'Nagapattinam', 'Thiruvarur', 'Tiruchirapalli', 'Karur', 'Perambalur', 'Pudukkottai'] },
  { serial: 180, category: 'DNC', name: 'Jogis', districts: ['Kancheepuram', 'Tiruvallur', 'Chennai', 'Cuddalore', 'Villupuram', 'Vellore', 'Thiruvannamalai'] },
  { serial: 181, category: 'DNC', name: 'Jambavanodai' },
  { serial: 182, category: 'DNC', name: 'Kaladis', districts: ['Sivaganga', 'Virudhunagar', 'Ramanathapuram', 'Madurai', 'Theni', 'Dindigul', 'Thanjavur', 'Nagapattinam', 'Thiruvarur', 'Pudukkottai', 'Tiruchirapalli', 'Karur', 'Perambalur'] },
  { serial: 183, category: 'DNC', name: 'Kal Oddars', districts: ['Kancheepuram', 'Thiruvallur', 'Ramanathapuram', 'Sivaganga', 'Virudhunagar', 'Madurai', 'Theni', 'Dindigul', 'Pudukkottai', 'Thanjavur', 'Nagapattinam', 'Tiruvarur', 'Tiruchirapalli', 'Karur', 'Perambalur', 'Tirunelveli', 'Thoothukudi', 'Salem', 'Namakkal'] },
  { serial: 184, category: 'DNC', name: 'Koravars', note: 'Multiple districts' },
  { serial: 185, category: 'DNC', name: 'Kalinji Dabikoravars', districts: ['Thanjavur', 'Nagapattinam', 'Tiruvarur', 'Pudukkottai'] },
  { serial: 186, category: 'DNC', name: 'Kootappal Kallars', districts: ['Tiruchirapalli', 'Karur', 'Perambalur', 'Pudukkottai'] },
  { serial: 187, category: 'DNC', name: 'Kala Koravars', districts: ['Thanjavur', 'Nagapattinam', 'Thiruvarur', 'Tiruchirapalli', 'Karur', 'Perambalur', 'Pudukkottai'] },
  { serial: 188, category: 'DNC', name: 'Kalavathila Boyas' },
  { serial: 189, category: 'DNC', name: 'Kepmaris', districts: ['Kancheepuram', 'Tiruvallur', 'Pudukkottai', 'Tiruchirapalli', 'Karur', 'Perambalur'] },
  { serial: 190, category: 'DNC', name: 'Maravars', districts: ['Thanjavur', 'Nagapattinam', 'Thiruvarur', 'Pudukkottai', 'Ramanathapuram', 'Sivaganga', 'Virudhunagar', 'Tirunelveli', 'Thoothukudi'] },
  { serial: 191, category: 'DNC', name: 'Monda Koravars' },
  { serial: 192, category: 'DNC', name: 'Monda Golla', districts: ['Salem', 'Namakkal'] },
  { serial: 193, category: 'DNC', name: 'Mutlakampatti', districts: ['Tiruchirapalli', 'Karur', 'Perambalur', 'Pudukkottai'] },
  { serial: 194, category: 'DNC', name: 'Nokkars', districts: ['Tiruchirapalli', 'Karur', 'Perambalur', 'Pudukkottai'] },
  { serial: 195, category: 'DNC', name: 'Nellorepet Oddars', districts: ['Vellore', 'Thiruvannamalai'] },
  { serial: 196, category: 'DNC', name: 'Oddars', districts: ['Thanjavur', 'Nagapattinam', 'Thiruvarur', 'Tiruchirapalli', 'Karur', 'Perambalur', 'Pudukkottai', 'Madurai', 'Theni', 'Dindigul'] },
  { serial: 197, category: 'DNC', name: 'Pedda Boyas', districts: ['Tiruchirapalli', 'Karur', 'Perambalur', 'Pudukkottai'] },
  { serial: 198, category: 'DNC', name: 'Ponnai Koravars', districts: ['Vellore', 'Thiruvannamalai'] },
  { serial: 199, category: 'DNC', name: 'Piramalai Kallars', districts: ['Sivagangai', 'Virudhunagar', 'Ramanathapuram', 'Madurai', 'Theni', 'Dindigul', 'Pudukkottai', 'Thanjavur', 'Nagapattinam', 'Thiruvarur'] },
  { serial: 200, category: 'DNC', name: 'Peria Suriyur Kallars', districts: ['Tiruchirapalli', 'Karur', 'Perambalur', 'Pudukkottai'] },
  { serial: 201, category: 'DNC', name: 'Padayachi', districts: ['Vellayan Kuppam (Cuddalore)', 'Tennore (Tiruchirapalli)'] },
  { serial: 202, category: 'DNC', name: 'Punnan Vettuva Gounder', districts: ['Tiruchirapalli', 'Karur', 'Perambalur', 'Pudukkottai'] },
  { serial: 203, category: 'DNC', name: 'Servai', districts: ['Tiruchirapalli', 'Karur', 'Perambalur', 'Pudukkottai'] },
  { serial: 204, category: 'DNC', name: 'Salem Melnad Koravars', districts: ['Madurai', 'Theni', 'Dindigul', 'Coimbatore', 'Erode', 'Pudukkottai', 'Tiruchirapalli', 'Karur', 'Perambalur', 'Salem', 'Namakkal', 'Vellore', 'Thiruvannamalai'] },
  { serial: 205, category: 'DNC', name: 'Salem Uppu Koravars', districts: ['Salem', 'Namakkal'] },
  { serial: 206, category: 'DNC', name: 'Sakkaraithamadai Koravars', districts: ['Vellore', 'Thiruvannamalai'] },
  { serial: 207, category: 'DNC', name: 'Saranga Palli Koravars' },
  { serial: 208, category: 'DNC', name: 'Sooramari Oddars', districts: ['Salem', 'Namakkal'] },
  { serial: 209, category: 'DNC', name: 'Sembanad Maravars', districts: ['Sivaganga', 'Virudhunagar', 'Ramanathapuram'] },
  { serial: 210, category: 'DNC', name: 'Thalli Koravars', districts: ['Salem', 'Namakkal'] },
  { serial: 211, category: 'DNC', name: 'Telungapatti Chetis', districts: ['Tiruchirapalli', 'Karur', 'Perambalur', 'Pudukkottai'] },
  { serial: 212, category: 'DNC', name: 'Thottia Naickers', note: 'Multiple districts' },
  { serial: 213, category: 'DNC', name: 'Thogamalai Koravars or Kepmaris', districts: ['Tiruchirapalli', 'Karur', 'Perambalur', 'Pudukkottai'] },
  { serial: 214, category: 'DNC', name: 'Uppukoravars or Settipalli Koravars', districts: ['Thanjavur', 'Nagapattinam', 'Thiruvarur', 'Pudukkottai', 'Madurai', 'Theni', 'Dindigu', 'Vellore', 'Thiruvannamalai'] },
  { serial: 215, category: 'DNC', name: 'Urali Gounders', districts: ['Tiruchirapalli', 'Karur', 'Perambalur', 'Ariyalur', 'Pudukkottai'] },
  { serial: 216, category: 'DNC', name: 'Wayalpad or Nawalpeta Korachas' },
  { serial: 217, category: 'DNC', name: 'Vaduvarpatti Koravars', districts: ['Madurai', 'Theni', 'Dindigul', 'Ramanathapuram', 'Sivaganga', 'Virudhunagar', 'Tirunelveli', 'Thoothukudi', 'Tiruchirapalli', 'Karur', 'Perambalur', 'Pudukkottai'] },
  { serial: 218, category: 'DNC', name: 'Valayars', districts: ['Madurai', 'Theni', 'Dindigul', 'Tiruchirapalli', 'Karur', 'Perambalur', 'Pudukkottai', 'Erode', 'Coimbatore'] },
  { serial: 219, category: 'DNC', name: 'Vettaikarar', districts: ['Thanjavur', 'Nagapattinam', 'Thiruvarur', 'Pudukkottai'] },
  { serial: 220, category: 'DNC', name: 'Vetta koravars', districts: ['Salem', 'Namakkal'] },
  { serial: 221, category: 'DNC', name: 'Varaganeri Koravars', districts: ['Tiruchirapalli', 'Karur', 'Perambalur', 'Pudukkottai'] },
  { serial: 222, category: 'DNC', name: 'Vettuva Gounder', districts: ['Tiruchirapalli', 'Karur', 'Perambalur', 'Pudukkottai'] },

  // ===== BACKWARD CLASSES (223-364) =====
  { serial: 223, category: 'BC', name: 'Agamudayar including Thozhu or Thuluva Vellala' },
  { serial: 224, category: 'BC', name: 'Agaram Vellan Chettiar' },
  { serial: 225, category: 'BC', name: 'Alwar, Azhavar and Alavar', districts: ['Kanniyakumari', 'Shencottah Taluk of Tirunelveli'] },
  { serial: 226, category: 'BC', name: 'Servai', note: 'Except Tiruchirapalli, Karur, Perambalur, Pudukottai (where DNC)' },
  { serial: 227, category: 'BC', name: 'Nulayar', districts: ['Kanniyakumari', 'Shencottah Taluk of Tirunelveli'] },
  { serial: 228, category: 'BC', name: 'Archakarai Vellala' },
  { serial: 229, category: 'BC', name: 'Aryavathi', districts: ['Kanniyakumari', 'Shencottah Taluk of Tirunelveli'] },
  { serial: 230, category: 'BC', name: 'Ayira Vaisyar' },
  { serial: 231, category: 'BC', name: 'Badagar' },
  { serial: 232, category: 'BC', name: 'Billava' },
  { serial: 233, category: 'BC', name: 'Bondil' },
  { serial: 234, category: 'BC', name: 'Boyas', note: 'Except specified districts (where DNC)' },
  { serial: 235, category: 'BC', name: 'Chakkala', note: 'Except specified districts' },
  { serial: 236, category: 'BC', name: 'Chavalakarar', districts: ['Kanniyakumari', 'Shencottah Taluk of Tirunelveli'] },
  { serial: 237, category: 'BC', name: 'Chettu or Chetty', note: 'Including Kottar, Elur, Pathira, Valayal, Pudukadai Chetty — Kanniyakumari & Shencottah' },
  { serial: 238, category: 'BC', name: 'Chowdry' },
  { serial: 239, category: 'BC', name: 'Converts to Christianity from Scheduled Castes', note: 'Irrespective of generation of conversion — for Educational reservations & Public Service seats' },
  { serial: 240, category: 'BC', name: 'C.S.I formerly S.I.U.C', districts: ['Kanniyakumari', 'Shencottah Taluk of Tirunelveli'] },
  { serial: 241, category: 'BC', name: 'Donga Dasaris', note: 'Except specified districts (where DNC)' },
  { serial: 242, category: 'BC', name: 'Devangar, Sedar' },
  { serial: 243, category: 'BC', name: 'Dombs', note: 'Except specified districts (where DNC)' },
  { serial: 244, category: 'BC', name: 'Dommars', note: 'Except specified districts (where DNC)' },
  { serial: 245, category: 'BC', name: 'Enadi' },
  { serial: 246, category: 'BC', name: 'Ezhavathy', districts: ['Kanniyakumari', 'Shencottah Taluk of Tirunelveli'] },
  { serial: 247, category: 'BC', name: 'Ezhuthachar', districts: ['Kanniyakumari', 'Shencottah Taluk of Tirunelveli'] },
  { serial: 248, category: 'BC', name: 'Ezhuva', districts: ['Kanniyakumari', 'Shencottah Taluk of Tirunelveli'] },
  { serial: 249, category: 'BC', name: 'Gangavar' },
  { serial: 250, category: 'BC', name: 'Gavara, Gavarai and Vadugar (Vaduvar)', note: 'Other than Kamma, Kapu, Balija and Reddi' },
  { serial: 251, category: 'BC', name: 'Gounder' },
  { serial: 252, category: 'BC', name: 'Gowda', note: 'Including Gammala, Kalali and Anuppa Gounder' },
  { serial: 253, category: 'BC', name: 'Hegde' },
  { serial: 254, category: 'BC', name: 'Idiga' },
  { serial: 255, category: 'BC', name: 'Illathu Pillaimar, Illuvar, Ezhuvar and Illathar' },
  { serial: 256, category: 'BC', name: 'Jhetty' },
  { serial: 257, category: 'BC', name: 'Jogis', note: 'Except specified districts (where DNC)' },
  { serial: 258, category: 'BC', name: 'Kabbera' },
  { serial: 259, category: 'BC', name: 'Kaikolar, Sengunthar' },
  { serial: 260, category: 'BC', name: 'Kaladi', note: 'Except specified districts (where DNC)' },
  { serial: 261, category: 'BC', name: 'Kalari Kurup including Kalari Panicker', districts: ['Kanniyakumari', 'Shencottah Taluk of Tirunelveli'] },
  { serial: 262, category: 'BC', name: 'Kalingi' },
  { serial: 263, category: 'BC', name: 'Kallar, Easanattu Kallar, Gandharva Kottai Kallars', note: 'Except specified districts (where DNC)' },
  { serial: 264, category: 'BC', name: 'Kallar Kula Thondaman' },
  { serial: 265, category: 'BC', name: 'Kalveli Gounder' },
  { serial: 266, category: 'BC', name: 'Kambar' },
  { serial: 267, category: 'BC', name: 'Kammalar or Viswakarma, Viswakarmala', note: 'Including Thattar, Porkollar, Kannar, Karumar, Kollar, Thacher, Kal Thacher, Kamsala, Viswa brahmin' },
  { serial: 268, category: 'BC', name: 'Kani, Kanisu, Kaniyar Panicker' },
  { serial: 269, category: 'BC', name: 'Kaniyala Vellalar' },
  { serial: 270, category: 'BC', name: 'Kannada Saineegar, Kannadiyar', note: 'And Dasapalanjika (Coimbatore, Erode and Nilgiris Districts)' },
  { serial: 271, category: 'BC', name: 'Kannadiya Naidu' },
  { serial: 272, category: 'BC', name: 'Karpoora Chettiar' },
  { serial: 273, category: 'BC', name: 'Karuneegar', note: 'Including Seer, Sri, Sarattu, Kaikatti, Mathuvazhi, Sozhi, Sunnambu Karuneegar' },
  { serial: 274, category: 'BC', name: 'Kasukkara Chettiar' },
  { serial: 275, category: 'BC', name: 'Katesar, Pattamkatti' },
  { serial: 276, category: 'BC', name: 'Kavuthiyar' },
  { serial: 277, category: 'BC', name: 'Kerala Mudali' },
  { serial: 278, category: 'BC', name: 'Kharvi' },
  { serial: 279, category: 'BC', name: 'Khatri' },
  { serial: 280, category: 'BC', name: 'Kongu Vaishnava' },
  { serial: 281, category: 'BC', name: 'Kongu Vellalars', note: 'Including Vellala Gounder, Nattu Gounder, Narambukkatti Gounder, Tirumudi Vellalar, Thondu Vellalar, Pala Gounder, Poosari Gounder, Anuppa Vellala Gounder, Padaithalai Gounder, Chendalai Gounder, Pavalankatti Vellala Gounder, Palavellala Gounder, Sanku Vellala Gounder, Rathinagiri Gounder' },
  { serial: 282, category: 'BC', name: 'Koppala Velama' },
  { serial: 283, category: 'BC', name: 'Koteyar' },
  { serial: 284, category: 'BC', name: 'Krishnanvaka', districts: ['Kanniyakumari', 'Shencottah Taluk of Tirunelveli'] },
  { serial: 285, category: 'BC', name: 'Kudikara Vellalar' },
  { serial: 286, category: 'BC', name: 'Kudumbi', districts: ['Kanniyakumari', 'Shencottah Taluk of Tirunelveli'] },
  { serial: 287, category: 'BC', name: 'Kuga Vellalar' },
  { serial: 288, category: 'BC', name: 'Kunchidigar' },
  { serial: 289, category: 'BC', name: 'Latin Catholics', note: 'Except Latin Catholic Vannar in Kanniyakumari' },
  { serial: 290, category: 'BC', name: 'Lathin Catholics', districts: ['Shencottah Taluk of Tirunelveli'] },
  { serial: 291, category: 'BC', name: 'Lambadi' },
  { serial: 292, category: 'BC', name: 'Lingayat (Jangama)' },
  { serial: 293, category: 'BC', name: 'Mahratta (Non-Brahmin)', note: 'Including Namdev Mahratta' },
  { serial: 294, category: 'BC', name: 'Malayar' },
  { serial: 295, category: 'BC', name: 'Male' },
  { serial: 296, category: 'BC', name: 'Maniagar' },
  { serial: 297, category: 'BC', name: 'Maravars', note: 'Except specified districts (where DNC)' },
  { serial: 298, category: 'BC', name: 'Moondrumandai Enbathunalu (84) Ur. Sozhia Vellalar' },
  { serial: 299, category: 'BC', name: 'Mooppan' },
  { serial: 300, category: 'BC', name: 'Muthuraja, Muthuracha, Muttiriyar, Mutharaiyar' },
  { serial: 301, category: 'BC', name: 'Nadar, Shanar and Gramani' },
  { serial: 302, category: 'BC', name: 'Nagaram' },
  { serial: 303, category: 'BC', name: 'Naikkar', districts: ['Kanniyakumari', 'Shencottah Taluk of Tirunelveli'] },
  { serial: 304, category: 'BC', name: 'Nangudi Vellalar' },
  { serial: 305, category: 'BC', name: 'Nanjil Mudali', districts: ['Kanniyakumari', 'Shencottah Taluk of Tirunelveli'] },
  { serial: 306, category: 'BC', name: 'Odar', districts: ['Kanniyakumari', 'Shencottah Taluk of Tirunelveli'] },
  { serial: 307, category: 'BC', name: 'Odiya' },
  { serial: 308, category: 'BC', name: 'Oottruvalanattu Vellalar' },
  { serial: 309, category: 'BC', name: 'O.P.S. Vellalar' },
  { serial: 310, category: 'BC', name: 'Ovachar' },
  { serial: 311, category: 'BC', name: 'Paiyur Kotta Vellalar' },
  { serial: 312, category: 'BC', name: 'Pamulu' },
  { serial: 313, category: 'BC', name: 'Panar', note: 'Except Kanniyakumari & Shencottah (where SC)' },
  { serial: 314, category: 'BC', name: 'Pandiya Vellalar' },
  { serial: 315, category: 'BC', name: 'Kathikarar', districts: ['Kanniyakumari'] },
  { serial: 316, category: 'BC', name: 'Pannirandam Chettiar or Uthama Chettiar' },
  { serial: 317, category: 'BC', name: 'Parkavakulam', note: 'Including Surithimar, Nathamar, Malayamar, Moopanar, Nainar' },
  { serial: 318, category: 'BC', name: 'Perike', note: 'Including Perike Balija' },
  { serial: 319, category: 'BC', name: 'Perumkollar', districts: ['Kanniyakumari', 'Shencottah Taluk of Tirunelveli'] },
  { serial: 320, category: 'BC', name: 'Podikara Vellalar' },
  { serial: 321, category: 'BC', name: 'Pooluva Gounder' },
  { serial: 322, category: 'BC', name: 'Poraya' },
  { serial: 323, category: 'BC', name: 'Pulavar', districts: ['Coimbatore', 'Erode'] },
  { serial: 324, category: 'BC', name: 'Pulluvar or Pooluvar' },
  { serial: 325, category: 'BC', name: 'Pusala' },
  { serial: 326, category: 'BC', name: 'Reddy (Ganjam)' },
  { serial: 327, category: 'BC', name: 'Sadhu Chetty', note: 'Including Telugu Chetty and Twenty-four Manai Telugu Chetty' },
  { serial: 328, category: 'BC', name: 'Sakkaravar or Kavathi', districts: ['Kanniyakumari', 'Shencottah Taluk of Tirunelveli'] },
  { serial: 329, category: 'BC', name: 'Salivagana' },
  { serial: 330, category: 'BC', name: 'Saliyar, Padmasaliyar, Pattusaliyar, Pattariyar, Adhaviyar' },
  { serial: 331, category: 'BC', name: 'Savalakkarar' },
  { serial: 332, category: 'BC', name: 'Senaithalaivar, Senaikudiyar and Illaivaniar' },
  { serial: 333, category: 'BC', name: 'Serakula Vellalar' },
  { serial: 334, category: 'BC', name: 'Sourashtra (Patnulkarar)' },
  { serial: 335, category: 'BC', name: 'Sozhia Vellalar', note: 'Including Sozha Vellalar, Vetrilaikarar, Kodikalkarar, Keeraikarar' },
  { serial: 336, category: 'BC', name: 'Srisayar' },
  { serial: 337, category: 'BC', name: 'Sundaram Chetty' },
  { serial: 338, category: 'BC', name: 'Thogatta Veerakshatriya' },
  { serial: 339, category: 'BC', name: 'Tholkollar', districts: ['Kanniyakumari', 'Shencottah Taluk of Tirunelveli'] },
  { serial: 340, category: 'BC', name: 'Tholuva Naicker and Vetalakara Naicker' },
  { serial: 341, category: 'BC', name: 'Thoraiyar' },
  { serial: 342, category: 'BC', name: 'Thoriyar' },
  { serial: 343, category: 'BC', name: 'Ukkirakula Kshatriya Naicker' },
  { serial: 344, category: 'BC', name: 'Uppara, Uppillia and Sagara' },
  { serial: 345, category: 'BC', name: 'Urali Gounder', note: 'Except specified districts; includes Orudaya/Oorudaya Gounder in some districts' },
  { serial: 346, category: 'BC', name: 'Urikkara Nayakkar' },
  { serial: 347, category: 'BC', name: 'Virakodi Vellala' },
  { serial: 348, category: 'BC', name: 'Vallambar' },
  { serial: 349, category: 'BC', name: 'Vallanattu Chettiar' },
  { serial: 350, category: 'BC', name: 'Valmiki' },
  { serial: 351, category: 'BC', name: 'Vaniyar, Vania Chettiar', note: 'Including Gandla, Ganika, Telikula and Chekkalar' },
  { serial: 352, category: 'BC', name: 'Veduvar and Vedar', note: 'Except Kanniyakumari & Shencottah (where SC)' },
  { serial: 353, category: 'BC', name: 'Veerasaiva', districts: ['Kanniyakumari', 'Shencottah Taluk of Tirunelveli'] },
  { serial: 354, category: 'BC', name: 'Velar' },
  { serial: 355, category: 'BC', name: 'Vellan Chettiar' },
  { serial: 356, category: 'BC', name: 'Veluthodathu Nair', districts: ['Kanniyakumari', 'Shencottah Taluk of Tirunelveli'] },
  { serial: 357, category: 'BC', name: 'Vokkaligar', note: 'Including Vakkaligar, Okkaligar, Kappiliyar, Kappiliya, Okkaliga Gowda, Okkaliya-Gowda, Okkaliya-Gowder, Okkaliya Gowda' },
  { serial: 358, category: 'BC', name: 'Wynad Chetty', districts: ['Nilgiris'] },
  { serial: 359, category: 'BC', name: 'Yadhava', note: 'Including Idaiyar, Telugu Speaking Idaiyar (Vaduga Ayar or Vaduga Idaiyar or Golla), Asthanthra Golla' },
  { serial: 360, category: 'BC', name: 'Yavana' },
  { serial: 361, category: 'BC', name: 'Yerukula' },
  { serial: 362, category: 'BC', name: 'Orphans and destitute children', note: 'Lost parents before age 10 and admitted in Govt/Govt-recognised schools or orphanages' },
  { serial: 363, category: 'BC', name: 'Thiyya' },
  { serial: 364, category: 'BC', name: 'Converts to Christianity from Hindu BC/MBC/Denotified', note: 'Except converts from Meenavar, Parvatharajakulam, Pattanavar, Sembadavar, Mukkuvar, Mukayar and Paravar' },

  // ===== BACKWARD CLASSES MUSLIMS (365-371) =====
  { serial: 365, category: 'BCM', name: 'Ansar' },
  { serial: 366, category: 'BCM', name: 'Dekkani Muslims' },
  { serial: 367, category: 'BCM', name: 'Dudekula' },
  { serial: 368, category: 'BCM', name: 'Labbais', note: 'Including Rowthar and Marakayar — whether their spoken language is Tamil or Urdu' },
  { serial: 369, category: 'BCM', name: 'Mapilla' },
  { serial: 370, category: 'BCM', name: 'Sheik' },
  { serial: 371, category: 'BCM', name: 'Syed' },
];

/** Total entries in the brochure */
export const TOTAL_COMMUNITIES = TNEA_COMMUNITIES.length;

/** Counts by category — useful for summary cards */
export const CATEGORY_COUNTS: Record<TneaCategory, number> = TNEA_COMMUNITIES.reduce(
  (acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  },
  { ST: 0, SC: 0, SCA: 0, MBC: 0, DNC: 0, BC: 0, BCM: 0 } as Record<TneaCategory, number>
);

/** Fuzzy search helper — matches case-insensitively on name and notes */
export const searchCommunities = (query: string): TneaCommunity[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return TNEA_COMMUNITIES.filter((c) => {
    if (c.name.toLowerCase().includes(q)) return true;
    if (c.note && c.note.toLowerCase().includes(q)) return true;
    if (c.districts && c.districts.some((d) => d.toLowerCase().includes(q))) return true;
    return false;
  });
};

/** Look up a single community by serial number */
export const getCommunityBySerial = (serial: number): TneaCommunity | undefined =>
  TNEA_COMMUNITIES.find((c) => c.serial === serial);

/** Filter communities by category */
export const getCommunitiesByCategory = (category: TneaCategory): TneaCommunity[] =>
  TNEA_COMMUNITIES.filter((c) => c.category === category);
