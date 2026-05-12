// AUTO-GENERATED from TNEA 2021 'Information About the Colleges' booklet.
// Source: official tneaonline.org publication, 533-page PDF.
// Last update: data parsed May 2026.
//
// What's reliable:
//   - TNEA code, college name, address, district, taluk, pincode
//   - Autonomous status, website, branch list with code and intake
// What may be stale (5+ years old):
//   - Branch intakes (may have grown), NBA accreditation,
//   - Tuition/hostel/transport fees (NOT included in this file),
//   - Principal name and contact phone (NOT included).
// Always verify current details from the college's official website.

export type TneaCollegeType =
  | "university"     // Anna University departments (CEG, ACT, SAP, MIT)
  | "government"     // Government Engineering Colleges
  | "aided"          // Government-aided (PSG, CIT, TCE)
  | "constituent"    // Anna University constituent / regional campuses
  | "research"       // CECRI, CIPET, Handloom Institute
  | "self_financing"; // All private self-financing colleges

export interface TneaBranch {
  /** 2-letter branch code (CS, EC, ME, etc.) */
  code: string;
  /** Approved sanctioned intake (as of 2021 booklet) */
  intake: number;
  /** Year the branch was started at this college */
  startYear: number;
}

export interface TneaCollege {
  /** 4-digit TNEA code used in counselling */
  code: string;
  /** Official college name */
  name: string;
  /** Street address (without the district line) */
  address: string;
  /** Tamil Nadu district */
  district: string | null;
  /** Taluk / sub-district */
  taluk: string | null;
  /** 6-digit pincode */
  pincode: string | null;
  /** Official email (may have changed) */
  email: string | null;
  /** Official website URL */
  website: string | null;
  /** Autonomous-college status as of 2021 */
  autonomous: boolean | null;
  /** College category */
  type: TneaCollegeType;
  /** Branches offered with sanctioned intake */
  branches: TneaBranch[];
}

/** Friendly name for each 2-letter branch code (from Annexure 3). */
export const BRANCH_NAMES: Record<string, string> = {
  "AD": "AI and Data Science",
  "AE": "Aeronautical Engineering",
  "AG": "Agriculture Engineering",
  "AI": "Agricultural and Irrigation Engg (SS)",
  "AM": "CSE (AI and Machine Learning)",
  "AO": "Aerospace Engineering",
  "AP": "Apparel Technology (SS)",
  "AR": "Architecture",
  "AS": "Automobile Engg (SS)",
  "AU": "Automobile Engineering",
  "BD": "CSE (Big Data Analytics)",
  "BM": "Bio-Medical Engineering",
  "BR": "Architecture (SS)",
  "BS": "Bio Technology (SS)",
  "BT": "Bio Technology",
  "BY": "Bio-Medical Engg (SS)",
  "CA": "Civil and Structural Engineering",
  "CB": "Computer Science and Business System",
  "CC": "Chemical and Electro Chemical Engg (SS)",
  "CE": "Civil Engineering",
  "CH": "Chemical Engineering",
  "CL": "Chemical Engineering (SS)",
  "CM": "Computer Science and Engineering (SS)",
  "CN": "Civil Engineering (SS)",
  "CO": "Computer and Communication Engineering",
  "CP": "Civil Engg. and Planning",
  "CR": "Ceramic Technology (SS)",
  "CS": "Computer Science and Engineering",
  "CT": "Computer Technology",
  "CW": "Computer Science and Business System (SS)",
  "CY": "Cyber Security",
  "EC": "Electronics and Communication Engineering",
  "EE": "Electrical and Electronics Engineering",
  "EI": "Electronics and Instrumentation Engineering",
  "EM": "Electronics and Communication Engg (SS)",
  "EN": "Environmental Engineering",
  "ES": "Electrical and Electronics (Sandwich) (SS)",
  "ET": "Electronics and Telecommunication Engineering",
  "EX": "Electronics and Instrumentation Engg (SS)",
  "EY": "Electrical and Electronics Engg (SS)",
  "FD": "Food Technology",
  "FS": "Food Technology (SS)",
  "FT": "Fashion Technology",
  "FY": "Fashion Technology (SS)",
  "GI": "Geo-Informatics",
  "HT": "Handloom and Textile Technology",
  "IB": "Industrial Bio-Technology",
  "IC": "Instrumentation and Control Engineering",
  "IE": "Industrial Engineering",
  "IG": "Information Science and Engineering",
  "IM": "Information Technology (SS)",
  "IN": "Industrial Engineering and Management",
  "IS": "Industrial Bio-Tech (SS)",
  "IT": "Information Technology",
  "IY": "Instrumentation and Control Engineering (SS)",
  "LE": "Leather Technology",
  "MA": "Material Science and Engineering (SS)",
  "MC": "Mechatronics",
  "MZ": "Mechatronics",
  "MD": "Medical Electronics Engineering",
  "ME": "Mechanical Engineering",
  "MF": "Mechanical Engineering (Manufacturing)",
  "MG": "Mechatronics (SS)",
  "MH": "Mechanical Engineering (Sandwich)",
  "MI": "Mining Engineering",
  "MN": "Manufacturing Engineering",
  "MO": "Mechanical and Mechatronics (Additive Manufacturing)",
  "MR": "Marine Engineering",
  "MS": "Mechanical Engineering (Sandwich) (SS)",
  "MT": "Metallurgical Engineering",
  "MU": "Mechanical and Automation Engineering",
  "MY": "Metallurgical Engineering (SS)",
  "NS": "Nano Science and Technology",
  "PA": "Plastic Technology",
  "PC": "Petro Chemical Technology",
  "PD": "Petrochemical Engineering",
  "PE": "Petroleum Engineering",
  "PH": "Pharmaceutical Technology",
  "PL": "Polymer Technology",
  "PM": "Pharmaceutical Technology (SS)",
  "PN": "Production Engineering (SS)",
  "PP": "Petroleum Engg & Tech (SS)",
  "PR": "Production Engineering",
  "PS": "Production Engineering (Sandwich) (SS)",
  "PT": "Printing and Packaging Technology",
  "RA": "Robotics and Automation (SS)",
  "RM": "Robotics and Automation",
  "RP": "Rubber and Plastic Technology",
  "SB": "CSE (IoT and Cyber Security incl. Blockchain)",
  "TC": "Textile Chemistry",
  "TS": "Computer Science and Technology",
  "TT": "Textile Technology (SS)",
  "TX": "Textile Technology",
  "XC": "Civil Engineering (Tamil Medium)",
  "XM": "Mechanical Engineering (Tamil Medium)"
};

/** All TN engineering colleges from the 2021 official booklet. */
export const TNEA_COLLEGES: TneaCollege[] = [
  {
    "code": "0001",
    "name": "University Departments of Anna University (CEG Campus)",
    "address": "Chennai - CEG Campus, Sardar Patel Road, Guindy, Chennai 600 025",
    "district": "Chennai",
    "taluk": "MAMBALAM / GUINDY",
    "pincode": "600025",
    "email": "deanceg@annauniv.edu",
    "website": "ceg.annauniv.edu",
    "autonomous": true,
    "type": "university",
    "branches": [
      {
        "code": "BY",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 1859
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1982
      },
      {
        "code": "XC",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "CM",
        "intake": 120,
        "startYear": 2006
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1946
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1930
      },
      {
        "code": "GI",
        "intake": 40,
        "startYear": 1993
      },
      {
        "code": "IE",
        "intake": 40,
        "startYear": 1981
      },
      {
        "code": "IM",
        "intake": 120,
        "startYear": 2006
      },
      {
        "code": "MA",
        "intake": 30,
        "startYear": 2006
      }
    ]
  },
  {
    "code": "0002",
    "name": "University Departments of Anna University (ACT Campus)",
    "address": "Chennai - ACT Campus, Sardar Patel Road, Guindy, Chennai 600 025",
    "district": "Chennai",
    "taluk": "Guindy",
    "pincode": "600025",
    "email": "actechau@gmail.com",
    "website": "https://www.annauniv.edu/act/",
    "autonomous": true,
    "type": "university",
    "branches": [
      {
        "code": "AP",
        "intake": 30,
        "startYear": 2007
      },
      {
        "code": "CH",
        "intake": 60,
        "startYear": 1944
      },
      {
        "code": "CL",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CR",
        "intake": 60,
        "startYear": 1996
      },
      {
        "code": "IB",
        "intake": 40,
        "startYear": 1992
      },
      {
        "code": "IS",
        "intake": 20,
        "startYear": 2004
      },
      {
        "code": "LE",
        "intake": 60,
        "startYear": 1945
      },
      {
        "code": "PP",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "TX",
        "intake": 60,
        "startYear": 1945
      },
      {
        "code": "FS",
        "intake": 40,
        "startYear": 2004
      }
    ]
  },
  {
    "code": "0003",
    "name": "University Departments of Anna University (SAP Campus)",
    "address": "Chennai - SAP Campus, Sardar Patel Road, Guindy, Chennai 600 025",
    "district": "Chennai",
    "taluk": "Guindy",
    "pincode": "600025",
    "email": "deansap@annauniv.edu",
    "website": "www.annauniv.edu/sap",
    "autonomous": true,
    "type": "university",
    "branches": [
      {
        "code": "AR",
        "intake": 80,
        "startYear": 1957
      }
    ]
  },
  {
    "code": "0004",
    "name": "University Departments of Anna University (MIT Campus)",
    "address": "Chennai - MIT Campus, Chrompet, Tambaram Taluk, Kancheepuram District 600 044",
    "district": "Chennai",
    "taluk": ", Kancheepuram",
    "pincode": "600044",
    "email": "dean@mitindia.edu",
    "website": "www.annauniv.edu/www.mitindia.e",
    "autonomous": true,
    "type": "university",
    "branches": [
      {
        "code": "AE",
        "intake": 60,
        "startYear": 1949
      },
      {
        "code": "AU",
        "intake": 60,
        "startYear": 1949
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1949
      },
      {
        "code": "EM",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "CM",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "MF",
        "intake": 60,
        "startYear": 2015
      },
      {
        "code": "RP",
        "intake": 60,
        "startYear": 1988
      },
      {
        "code": "EI",
        "intake": 60,
        "startYear": 1949
      },
      {
        "code": "IM",
        "intake": 120,
        "startYear": 2002
      }
    ]
  },
  {
    "code": "0005",
    "name": "Annamalai University Faculty of Engineering and Technology",
    "address": "Annamalai nagar,Cuddalore 608002",
    "district": "Cuddalore",
    "taluk": "Chidambaram",
    "pincode": "608002",
    "email": "aufeatdean@gmail.com",
    "website": "https://annamalaiuniversity.ac.in",
    "autonomous": true,
    "type": "university",
    "branches": [
      {
        "code": "AM",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1988
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 1945
      },
      {
        "code": "CZ",
        "intake": 60,
        "startYear": 1977
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 1945
      },
      {
        "code": "EI",
        "intake": 60,
        "startYear": 1977
      },
      {
        "code": "MM",
        "intake": 60,
        "startYear": 1977
      },
      {
        "code": "CH",
        "intake": 120,
        "startYear": 1945
      },
      {
        "code": "IT",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "BD",
        "intake": 60,
        "startYear": 2019
      }
    ]
  },
  {
    "code": "1013",
    "name": "University College of Engineering",
    "address": "Villupuram, Kakuppam, Villupuram District 605103",
    "district": "Villupuram",
    "taluk": "Villupuram",
    "pincode": "605103",
    "email": "ucev_auc@yahoo.com",
    "website": "http://www.aucev.edu.in/",
    "autonomous": false,
    "type": "constituent",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "XM",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "1014",
    "name": "University College of Engineering",
    "address": "Tindivanam, Melpakkam, Tindivanam, Villupuram District 604001",
    "district": "Villupuram",
    "taluk": "Tindivanam",
    "pincode": "604307",
    "email": "annauniv.ucet@gmail.com",
    "website": "www.aucet.in",
    "autonomous": false,
    "type": "constituent",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "XC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "1015",
    "name": "University College of Engineering",
    "address": "Arni, Arni to Devikapuram Road, Thatchur, Arni, Thiruvannamalai District 632326",
    "district": "Tiruvannamalai",
    "taluk": "ARNI",
    "pincode": "632326",
    "email": "annauniv.ucea@gmail.com",
    "website": "www.aucearni.in",
    "autonomous": false,
    "type": "constituent",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "XM",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "1026",
    "name": "University College of Engineering",
    "address": "Kancheepuram, Ponnerikarai Campus, NH4, Chennai-Bangalore Highway, Karaipettai Village & Post, Kancheepuram District 631552",
    "district": "Chennai",
    "taluk": "Kanchipuram",
    "pincode": "631552",
    "email": "ucekdean@gmail.com",
    "website": "http://www.aucek.in/",
    "autonomous": false,
    "type": "constituent",
    "branches": [
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "1101",
    "name": "Aalim Muhammed Salegh College of Engineering",
    "address": "Muthapudupet, Avadi IAF, Chennai 600055",
    "district": "Chennai",
    "taluk": "Avadi",
    "pincode": "600055",
    "email": "principal@aalimec.ac.in",
    "website": "www.aalimec.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2000
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2006
      }
    ]
  },
  {
    "code": "1106",
    "name": "Jaya Engineering College",
    "address": "Thirunindravur, Chennai 602024",
    "district": "Chennai",
    "taluk": "poonamallee",
    "pincode": "602024",
    "email": "info@jec.ac.in",
    "website": "www.jec.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1995
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 1995
      },
      {
        "code": "EI",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "TX",
        "intake": 40,
        "startYear": 1995
      }
    ]
  },
  {
    "code": "1107",
    "name": "Jaya Institute of Technology",
    "address": "Kanchipadi Post, Thiruvallur-Tiruttani NH Road, Thiruvallur District 631204",
    "district": "Tiruvallur",
    "taluk": ",Thiruvallur-631204",
    "pincode": "631204",
    "email": "lcrcet@gmail.com",
    "website": "www.jitcollege.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "FD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 2014
      }
    ]
  },
  {
    "code": "1110",
    "name": "Prathyusha Engineering college",
    "address": "Aranvoyalkuppam, Thiruvallur District 602025",
    "district": "Tiruvallur",
    "taluk": "Tiruvallur",
    "pincode": "602025",
    "email": "principal@prathyusha.edu.in",
    "website": "www.prathyusha.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2001
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "MC",
        "intake": 30,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "1112",
    "name": "R M D Engineering College",
    "address": "Kavaraipettai, Gummidipoondi, Thiruvallur District 601206",
    "district": "Tiruvallur",
    "taluk": null,
    "pincode": "601206",
    "email": "principal@rmd.ac.in",
    "website": "www.rmd.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 180,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 2001
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "CB",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "AL",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "1113",
    "name": "R M K Engineering College",
    "address": "Kavaraipettai, Gummidipoondi, Thiruvallur District 601206",
    "district": "Tiruvallur",
    "taluk": ",",
    "pincode": "601206",
    "email": "principal@rmkec.ac.in",
    "website": "www.rmkec.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2005
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 1997
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1995
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 1995
      },
      {
        "code": "EI",
        "intake": 30,
        "startYear": 1998
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 1995
      },
      {
        "code": "CD",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "1114",
    "name": "S A Engineering College",
    "address": "Thiruverkadu, Chennai Thiruvallur District 600077",
    "district": "Chennai",
    "taluk": "poonamallee",
    "pincode": "600077",
    "email": "saec@saec.ac.in",
    "website": "www.saec.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 1998
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "ME",
        "intake": 180,
        "startYear": 1998
      }
    ]
  },
  {
    "code": "1115",
    "name": "Sri Ram Engineering College",
    "address": "Perumalpattu, Veppampattu (R S), Thiruvallur District 602 024",
    "district": "Tiruvallur",
    "taluk": ", VEPPAMPATTU",
    "pincode": "602024",
    "email": "sriraminfo@yahoo.com",
    "website": "www.sriramec.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 30,
        "startYear": 1995
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 1993
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 1993
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 1993
      },
      {
        "code": "CH",
        "intake": 30,
        "startYear": 1995
      }
    ]
  },
  {
    "code": "1116",
    "name": "Sri Venkateswara College of Engineering and Technology",
    "address": "Thirupachur, Thiruvallur District 631203",
    "district": "Tiruvallur",
    "taluk": "Thiruvallur",
    "pincode": "631203",
    "email": "svcetthirupachur@gmail.com",
    "website": "www.sriventech.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2003
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 2002
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2005
      }
    ]
  },
  {
    "code": "1118",
    "name": "Vel Tech Multi Tech Dr. Rangarajan Dr. Sakunthala Engineering College (Autonomous)",
    "address": "Avadi-Alamathi Road, Chennai 600 062",
    "district": "Chennai",
    "taluk": "AMBATTUR",
    "pincode": "600062",
    "email": "principal@veltechmultitech.org",
    "website": "www.veltechmultitech.org",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2000
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2000
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "IT",
        "intake": 120,
        "startYear": 2000
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2004
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "1120",
    "name": "Velammal Engineering College (Autonomous)",
    "address": "Ambattur-Redhills Road, Chennai 600066",
    "district": "Chennai",
    "taluk": "Madhavaram",
    "pincode": "600066",
    "email": "principal@velammal.edu.in",
    "website": "www.velammal.edu.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AU",
        "intake": 30,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 1995
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 1995
      },
      {
        "code": "EI",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1995
      }
    ]
  },
  {
    "code": "1122",
    "name": "Vel Tech High Tech Dr. Rangarajan Dr. Sakunthala Engineering College",
    "address": "Avadi-Alamathi Road, Chennai 600 062",
    "district": "Chennai",
    "taluk": "Avadi",
    "pincode": "600062",
    "email": "principal@velhightech.com",
    "website": "www.velhightech.com",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "CH",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2002
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2005
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2002
      }
    ]
  },
  {
    "code": "1123",
    "name": "Gojan School of Business and Technology",
    "address": "Alamathi, Chennai 600062",
    "district": "Chennai",
    "taluk": "Ponneri",
    "pincode": "600052",
    "email": "principal@gojaneducation.com",
    "website": "www.gojaneducation.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 30,
        "startYear": 2007
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 2007
      }
    ]
  },
  {
    "code": "1124",
    "name": "SAMS College of Engineering and Technology",
    "address": "Panappakkam, Chennai-Tirupathi Road, Uthukkottai Taluk, Thiruvallur District 601102",
    "district": "Chennai",
    "taluk": ", Thiruvallur",
    "pincode": "601102",
    "email": "principal@samsengineering.org",
    "website": "www.samsengineering.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "MR",
        "intake": 40,
        "startYear": 2006
      }
    ]
  },
  {
    "code": "1125",
    "name": "P M R Engineering College",
    "address": "Adayalampattu, Maduravoyal , Vanagaram, Chennai 600095",
    "district": "Chennai",
    "taluk": "AMBATTUR",
    "pincode": "600095",
    "email": "principal.pmrengg@gmail.com",
    "website": "pmrec.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2013
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "1126",
    "name": "J N N Institute of Engineering",
    "address": "Ushaa Garden, Kannigaipair Village, Uthukottai Taluk, Thiruvallur District 601102",
    "district": "Chennai",
    "taluk": ",",
    "pincode": "601102",
    "email": "principal@jnn.edu.in",
    "website": "https://www.jnn.edu.in/",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 90,
        "startYear": 2008
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "RM",
        "intake": 30,
        "startYear": 2020
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "1127",
    "name": "St. Peters College of Engineering and Technology",
    "address": "College Road, Avadi, Chennai 600 054",
    "district": "Chennai",
    "taluk": "Poonamallee",
    "pincode": "600054",
    "email": "spcet2008@gmail.com",
    "website": "www.spcet.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 30,
        "startYear": 2011
      },
      {
        "code": "AR",
        "intake": 40,
        "startYear": 2012
      },
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "CH",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "1128",
    "name": "R M K College of Engineering and Technology",
    "address": "Puduvoyal, Gummidipoondi Taluk, Thiruvallur District 601206",
    "district": "Tiruvallur",
    "taluk": ",",
    "pincode": "601206",
    "email": "principal@rmkcet.ac.in",
    "website": "www.rmkcet.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 180,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "AD",
        "intake": 90,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "1129",
    "name": "Jaya School of Architecture",
    "address": "Poonamallee Bypass, Poonamallee, Thiruvallur District 600056",
    "district": "Tiruvallur",
    "taluk": "THIRUVALLUR",
    "pincode": "600056",
    "email": "jayaarchitecture@gmail.com",
    "website": "www.jayaarchitecture.com",
    "autonomous": null,
    "type": "self_financing",
    "branches": []
  },
  {
    "code": "1130",
    "name": "MARG Instiute of Design & Architecture Swarnabhoomi (MIDAS)",
    "address": "Marg Swarnabhoomi, Velur Village, Cheyyur Post, Kancheepuram District 603302",
    "district": "Kancheepuram",
    "taluk": "Cheyyur",
    "pincode": "603302",
    "email": "admin@midas.ac.in",
    "website": "www.midas.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 120,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "1132",
    "name": "Rajalakshmi School of Architecture",
    "address": "Thandalam, Sriperumpudur Taluk, Kancheepuram District 602105",
    "district": "Chennai",
    "taluk": ", Kancheepuram",
    "pincode": "602105",
    "email": "admin@rajalakshmi.edu.in",
    "website": "www.architecture.rajalakshmi.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "1133",
    "name": "Annai Veilankannis College of Engineering",
    "address": "Gandhi Road, Nedungundram, Chennai 600048",
    "district": "Chennai",
    "taluk": "Tambaram",
    "pincode": "600127",
    "email": "mail4engcoll@gmail.com",
    "website": "www.annaiveilankannis.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2012
      },
      {
        "code": "ME",
        "intake": 45,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "1134",
    "name": "Surya School of Architecture",
    "address": "GST Road, Vikravandi Village, Villupuram District 605652",
    "district": "Villupuram",
    "taluk": "VILLUPURAM",
    "pincode": "605652",
    "email": "SURYASCHOOLOFARCH@GMAIL.CO",
    "website": "WWW.SURYAGROUPEDU.IN",
    "autonomous": false,
    "type": "self_financing",
    "branches": []
  },
  {
    "code": "1135",
    "name": "Aalim Muhammed Salegh Academy of Architecture",
    "address": "Muthapudupet, Avadi IAF, Chennai 600055",
    "district": "Chennai",
    "taluk": "AVADI",
    "pincode": "600055",
    "email": "ams.aa.tn37@gmail.com",
    "website": "www.amsarch.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 80,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "1137",
    "name": "Annai Mira College of Engineering and Technology",
    "address": "Arcot Road, Arappakkam Village, Walaja Taulk, Vellore District 632 517",
    "district": "Chennai",
    "taluk": "Walaja",
    "pincode": "632517",
    "email": "amcet.rtet@gmail.com",
    "website": "www.amcet.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "1138",
    "name": "Davinci School of Design and Architecture",
    "address": "Karapakkam, Chennai 600097",
    "district": "Chennai",
    "taluk": "Sholinganallur",
    "pincode": "600097",
    "email": "admin@davinci.edu.in",
    "website": "www.davinci.edu,in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 80,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "1140",
    "name": "Jeppiaar Institute Of Technology",
    "address": "Kunnam Village, Sriperumpudur Taluk, Kancheepuram District 631604",
    "district": "Kancheepuram",
    "taluk": ",",
    "pincode": "631604",
    "email": "office@jeppiaarinstitute.org",
    "website": "www.jeppiaarinstitute.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "1144",
    "name": "R V S Padmavathy School of Architecture",
    "address": "Senthil Pakkam Village, Roshanagaram Post, Madarapakkam Via, Gummidipoondi Taluk, Thiruvallur District 601202",
    "district": "Tiruvallur",
    "taluk": ", Thiruvallur",
    "pincode": "601202",
    "email": "rvspsoa@gmail.com",
    "website": "https://rvschennai.edu.in/",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 40,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "1145",
    "name": "Anand School of Architecture",
    "address": "Old Mahalibalipuram Road (OMR), Kazhipattur, Kancheepuram District 603103",
    "district": "Kancheepuram",
    "taluk": "Tiruporur",
    "pincode": "603103",
    "email": "anandschoolofarchitecture@gmail.c",
    "website": "www.asa.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 40,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "1146",
    "name": "Misrimal Navajee Munoth Jain School of Architecture",
    "address": "Rajiv Gandhi Salai (OMR), Thoraipakkam, Chennai 600096",
    "district": "Chennai",
    "taluk": "Sholiganallur",
    "pincode": "600097",
    "email": "mnmjsa@gmail.com",
    "website": "mnmjsa@gmail.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 40,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "1147",
    "name": "MMES ACADEMY OF ARCHITECTURE",
    "address": "VELLORE",
    "district": "Ranipet",
    "taluk": "Walaja",
    "pincode": "632509",
    "email": "info@mmes.ac.in",
    "website": "www.mmes.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 30,
        "startYear": 2017
      }
    ]
  },
  {
    "code": "1149",
    "name": "St. Joseph’s Institute of Technology",
    "address": "Jeppiaar Nagar, Old Mahabalipuram Road (OMR), Chennai 600119",
    "district": "Chennai",
    "taluk": "Sholinganallur",
    "pincode": "600119",
    "email": "stjosephstechnology@stjosephstech",
    "website": "www.stjosephstechnology.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 2011
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "IT",
        "intake": 120,
        "startYear": 2011
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "1150",
    "name": "Sri Jayaram Institute of Engineering and Technology",
    "address": "51 N, Elavur, 58N, Natham, Gummidipoondi Taluk, Thiruvallur District 601201",
    "district": "Tiruvallur",
    "taluk": ", Thiruvallur",
    "pincode": "601201",
    "email": "sjiet.tn@gmail.com",
    "website": "www.sjiet.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "FD",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2014
      }
    ]
  },
  {
    "code": "1152",
    "name": "CAAD - Chennai Academy of Architecture and Design",
    "address": "No.24, Thumbakkam, Chennai- Thirupathi Highway, Near Periyapalayam Amman Temple, Chennai 601102",
    "district": "Chennai",
    "taluk": "Uthukkotai",
    "pincode": "601102",
    "email": "director@caad.ac.in",
    "website": "WWW.CAAD.AC.IN",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 80,
        "startYear": 2014
      }
    ]
  },
  {
    "code": "1153",
    "name": "Jawahar School of Architecture Planning and Design",
    "address": "No.54, K K Road, Saligramam, Chennai 600093",
    "district": "Chennai",
    "taluk": "Mambalam/Guindy",
    "pincode": "600093",
    "email": "asnagent@gmail.com",
    "website": "www.jawaharssm.com(Under",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 23,
        "startYear": 2015
      }
    ]
  },
  {
    "code": "1158",
    "name": "International Maritime Academy",
    "address": "No.41, Jamin Korattur, Pudhuchatram, Chennai - 600 124",
    "district": "Chennai",
    "taluk": null,
    "pincode": null,
    "email": null,
    "website": null,
    "autonomous": null,
    "type": "self_financing",
    "branches": []
  },
  {
    "code": "1202",
    "name": "D M I College of Engineering",
    "address": "Palanchoor, Nazrethpet, Chennai 602103",
    "district": "Chennai",
    "taluk": "SRIPERUMBUR",
    "pincode": "600123",
    "email": "dmichennai@yahoo.co.in",
    "website": "www.dmice.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      }
    ]
  },
  {
    "code": "1205",
    "name": "Lord Venkateshwara Engineering College",
    "address": "Walajabad Post, Kancheepuram District 631605",
    "district": "Kancheepuram",
    "taluk": ",",
    "pincode": "631605",
    "email": "lvecollege2001@gmail.com",
    "website": "www.lvec.co.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "CS",
        "intake": 90,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2001
      }
    ]
  },
  {
    "code": "1207",
    "name": "Kings Engineering College",
    "address": "Sriperumpudur Taluk, Kancheepuram District 602105",
    "district": "Kancheepuram",
    "taluk": ", Kancheepuram",
    "pincode": "602117",
    "email": "principal@kingsedu.ac.in",
    "website": "www.kingsedu.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 2001
      },
      {
        "code": "IT",
        "intake": 120,
        "startYear": 2006
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "RM",
        "intake": 30,
        "startYear": 2019
      }
    ]
  },
  {
    "code": "1209",
    "name": "Pallavan College of Engineering",
    "address": "Thimmasamudram, Kancheepuram District 631502",
    "district": "Kancheepuram",
    "taluk": "Kanchipuram",
    "pincode": "631502",
    "email": "pce_kanchi@rediffmail.com",
    "website": "www.pallavan.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1997
      }
    ]
  },
  {
    "code": "1210",
    "name": "Panimalar Engineering College",
    "address": "Nazarethpet, Poonamallee, Chennai 602103",
    "district": "Chennai",
    "taluk": "Poonamallee",
    "pincode": "600123",
    "email": "info@panimalar.ac.in",
    "website": "www.panimalar.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "AD",
        "intake": 180,
        "startYear": 2020
      },
      {
        "code": "CB",
        "intake": 120,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "1211",
    "name": "Rajalakshmi Engineering College (Autonomous)",
    "address": "Thandalam, Sriperumpudur Taluk, Kancheepuram District 602105",
    "district": "Chennai",
    "taluk": ",",
    "pincode": "602105",
    "email": "admin@rajalakshmi.edu.in",
    "website": "www.rajalakshmi.org",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 300,
        "startYear": 1997
      },
      {
        "code": "CB",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "ME",
        "intake": 180,
        "startYear": 1997
      },
      {
        "code": "MC",
        "intake": 60,
        "startYear": 2015
      },
      {
        "code": "RM",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CD",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "AL",
        "intake": 120,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "1212",
    "name": "Rajiv Gandhi College of Engineering",
    "address": "Nemili, Sriperumpudur Taluk, Kancheepuram District 602105",
    "district": "Tiruvallur",
    "taluk": ", Kancheepuram",
    "pincode": "602105",
    "email": "gresrgce@gmail.com",
    "website": "www.rgcesri.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AU",
        "intake": 30,
        "startYear": 2012
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "CS",
        "intake": 30,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2005
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "PE",
        "intake": 30,
        "startYear": 2005
      }
    ]
  },
  {
    "code": "1216",
    "name": "Saveetha Engineering College (Autonomous)",
    "address": "Thandalam, Sriperumpudur Taluk, Kancheepuram District 602105",
    "district": "Kancheepuram",
    "taluk": ",",
    "pincode": "602105",
    "email": "principal@saveetha.ac.in",
    "website": "www.saveetha.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "EC",
        "intake": 300,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EI",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "MD",
        "intake": 60,
        "startYear": 2017
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2003
      },
      {
        "code": "AD",
        "intake": 120,
        "startYear": 2020
      },
      {
        "code": "AL",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "1217",
    "name": "Sree Sastha Institute of Engineering and Technology",
    "address": "Chembarambakkam, Chennai 600123",
    "district": "Chennai",
    "taluk": "Ponemallee",
    "pincode": "600123",
    "email": "principal@ssiet.in",
    "website": "https://sasthainstitutions.in/",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "MH",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "FD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2003
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "1218",
    "name": "Sri Muthukumaran Institute of Technology",
    "address": "Near Mangadu, Chennai 600069",
    "district": "Chennai",
    "taluk": "Kundrathur",
    "pincode": "600069",
    "email": "smitcollege1996@gmail.com",
    "website": "www.smit.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "MC",
        "intake": 30,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "1219",
    "name": "Sri Venkateswara College of Engineering (Autonomous)",
    "address": "Post Bag No.1, Chennai- Bengaluru High Road, Pennalur, Irungattukottai S.O., Sriperumbudur Taluk,",
    "district": "Chennai",
    "taluk": ",",
    "pincode": "602117",
    "email": "principal@svce.ac.in",
    "website": "www.svce.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "EE",
        "intake": 120,
        "startYear": 1994
      },
      {
        "code": "IT",
        "intake": 120,
        "startYear": 1996
      },
      {
        "code": "AU",
        "intake": 30,
        "startYear": 1999
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 1985
      }
    ]
  },
  {
    "code": "1221",
    "name": "Jaya College of Engineering and Technology",
    "address": "Parivakkam, Poonamallee, Chennai 600056",
    "district": "Chennai",
    "taluk": "Poonamalle",
    "pincode": "600056",
    "email": "principaljcetec@gmail.com",
    "website": "http://www.jcetech.ac.in/",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 30,
        "startYear": 2000
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2000
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "1222",
    "name": "P B College of Engineering",
    "address": "Irungkattukottai, Sriperumpudur Taluk, Kancheepuram District 602105",
    "district": "Chennai",
    "taluk": ", Kancheepuram",
    "pincode": "602117",
    "email": "pbce@pbce.co.in",
    "website": "www.pbce.co.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 2007
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "1225",
    "name": "Loyola Institute of Technology",
    "address": "Mevaloorkuppam, B Village, Palanchoor, Nazarethpet Post, Chennai 600123",
    "district": "Chennai",
    "taluk": "SRIPERUMBUDUR",
    "pincode": "600123",
    "email": "litprincipaloffice@gmail.com",
    "website": "www.litedu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2003
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2003
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2007
      }
    ]
  },
  {
    "code": "1226",
    "name": "P T Lee Chengalvaraya Naicker College of Engineering and Technology",
    "address": "Oovery, Veliyur Post, Kancheepuram District 631 502",
    "district": "Kancheepuram",
    "taluk": "Kanchipuram",
    "pincode": "631502",
    "email": "principal@ptleecncet.com",
    "website": "www.ptleecncet.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": []
  },
  {
    "code": "1228",
    "name": "Alpha College of Engineering",
    "address": "Dr. Grace George Nagar, Udayavar Koil Street, Thirumazhisai, Poonamalle, Chennai 602107",
    "district": "Chennai",
    "taluk": "Poonamallee",
    "pincode": "600124",
    "email": "engineering@alphagroup.edu",
    "website": "https://alphagroup.edu/engineering",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2006
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "1229",
    "name": "Indira Institute of Engineering and Technology",
    "address": "VGR Gardens, Pandur, Thiruvallur District 631203",
    "district": "Tiruvallur",
    "taluk": "Tiruvallur",
    "pincode": "631203",
    "email": "engg.principal@indiraeducational.or",
    "website": "www.indraeducational.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "1230",
    "name": "Apollo Engineering College",
    "address": "Mevaloorkuppam, Valarpuram Post, Sriperumpudur, Kancheepuram District 602105",
    "district": "Kancheepuram",
    "taluk": "Sriperumbudur",
    "pincode": "602105",
    "email": "aec1230@gmail.com",
    "website": "www.apolloengg.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2007
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "1231",
    "name": "Panimalar Institute of Technology",
    "address": "Nazarethpet, Poonamallee, Chennai 602103",
    "district": "Chennai",
    "taluk": "POONAMALLEE",
    "pincode": "600123",
    "email": "info@pit.ac.in",
    "website": "www.pit.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 180,
        "startYear": 2008
      },
      {
        "code": "IT",
        "intake": 180,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 2008
      },
      {
        "code": "AD",
        "intake": 180,
        "startYear": 2020
      },
      {
        "code": "CB",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "1233",
    "name": "Adhi College of Engineering and Technology",
    "address": "Pazhayaseevaram, Madura Sankarapuram Village, Kancheepuram District 631605",
    "district": "Kancheepuram",
    "taluk": "Walajabad",
    "pincode": "631605",
    "email": "office@adhi.edu.in",
    "website": "www.adhi.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "1237",
    "name": "Velammal Institute of Technology",
    "address": "Chennai-Kolkatta Highway, Panchetti Village, Ponneri Taluk, Thiruvallur District 601204",
    "district": "Chennai",
    "taluk": ", Thiruvallur",
    "pincode": "601204",
    "email": "principal@velammalitech.edu.in",
    "website": "www.velammalitech.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "MC",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "1238",
    "name": "GRT Institute of Engineering and Technology",
    "address": "GRT Mahalakshmi Nagar, Chennai- Tirupathi Highway, Tiruttani Taluk, Thiruvallur District 631209",
    "district": "Chennai",
    "taluk": ", Thiruvallur",
    "pincode": "631209",
    "email": "grtedu@gmail.com",
    "website": "www.grt.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "1241",
    "name": "T J S Engineering College",
    "address": "Peruvoyal, Near Kavaraipettai, Gummidipoondi Taluk, Thiruvallur District 601206",
    "district": "Tiruvallur",
    "taluk": ",",
    "pincode": "601206",
    "email": "tjsivanandam@gmail.com",
    "website": "www.tjsec.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 90,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 90,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "1243",
    "name": "Madha Institute of Engineering and Technology",
    "address": "Erandamkattalai Village, Sadhananthapuram, Thandalam Post, Chennai 602101",
    "district": "Chennai",
    "taluk": "PALLAVARAM",
    "pincode": "600128",
    "email": "principal448@gmail.com",
    "website": "http://www.madhaengineeringandt",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "1301",
    "name": "Mohamed Sathak A J College of Engineering",
    "address": "Old Mahabalipuram Road (OMR), Egattur, Chengalpattu District 603103",
    "district": "Chengalpattu",
    "taluk": "Thiruporur",
    "pincode": "603103",
    "email": "msajce.office@gmail.com",
    "website": "www.msajce-edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      }
    ]
  },
  {
    "code": "1303",
    "name": "Anand Institute of Higher Technology",
    "address": "Old Mahabalipuram Road (OMR), Kazhipattur, Chengalpattu District 603103",
    "district": "Chengalpattu",
    "taluk": "Thiruporur",
    "pincode": "603103",
    "email": "principal@aiht.ac.in",
    "website": "www.aiht.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2003
      }
    ]
  },
  {
    "code": "1304",
    "name": "Easwari Engineering College (Autonomous)",
    "address": "Ramapuram, Chennai 600089",
    "district": "Chennai",
    "taluk": "Ambattur",
    "pincode": "600089",
    "email": "principal@eec.srmrmp.edu.in",
    "website": "www.srmeaswari.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 1996
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 1996
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1996
      },
      {
        "code": "IT",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "ME",
        "intake": 180,
        "startYear": 2003
      },
      {
        "code": "RM",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "1306",
    "name": "Jeppiar Engineering College",
    "address": "Old Mahabalipuram Road (OMR), Chennai 600119",
    "district": "Chennai",
    "taluk": "Sholinganallur",
    "pincode": "600119",
    "email": "principal@jeppiaarcollege.org",
    "website": "www.jeppiaarcollege.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "BT",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "IT",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "1307",
    "name": "Jerusalem College of Engineering (Autonomous)",
    "address": "Narayanapuram, Pallikaranai, Chennai 600 100",
    "district": "Chennai",
    "taluk": "Chozhinganallur",
    "pincode": "600100",
    "email": "jce@jerusalemengg.ac.in",
    "website": "www.jerusalemengg.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2001
      },
      {
        "code": "CS",
        "intake": 108,
        "startYear": 1995
      },
      {
        "code": "BM",
        "intake": 54,
        "startYear": 2005
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1995
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 1995
      },
      {
        "code": "IT",
        "intake": 54,
        "startYear": 1999
      }
    ]
  },
  {
    "code": "1308",
    "name": "Measi Academy of Architecture",
    "address": "Royapettah, Chennai 600014",
    "district": "Chennai",
    "taluk": "MYLAPORE-TRIPLICANE",
    "pincode": "600014",
    "email": "archeasi@gmail.com",
    "website": "www.measiarch.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 160,
        "startYear": 1999
      }
    ]
  },
  {
    "code": "1309",
    "name": "Meenakshi Sundararajan Engineering College",
    "address": "Kodambakkam, Chennai 600024",
    "district": "Chennai",
    "taluk": "EGMORE",
    "pincode": "600024",
    "email": "principal@msec.edu.in",
    "website": "www.msec.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2002
      }
    ]
  },
  {
    "code": "1310",
    "name": "Misrimal Navajee Munoth Jain Engineering College",
    "address": "Rajiv Gandhi Salai (OMR), Thorappakkam, Chennai 600096",
    "district": "Chennai",
    "taluk": "Tambaram",
    "pincode": "600097",
    "email": "info@mnmjec.ac.in",
    "website": "www.mnmjec.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2005
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1994
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1994
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 1999
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 1994
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 1999
      }
    ]
  },
  {
    "code": "1311",
    "name": "K C G College of Technology",
    "address": "Karappakkam, Chennai 600096",
    "district": "Chennai",
    "taluk": "Sholinganallur",
    "pincode": "600097",
    "email": "principal@kcgcollege.com",
    "website": "www.kcgcollege.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 1998
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 1998
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "MC",
        "intake": 30,
        "startYear": 2019
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 1998
      }
    ]
  },
  {
    "code": "1313",
    "name": "SMK Fomra Institute of Technology",
    "address": "Fomra Nagar, OMR,(IT Express Highway),Kelambakkam,Chennai- 603103",
    "district": "Chennai",
    "taluk": "Chennai",
    "pincode": "603103",
    "email": "principal@smkfomra.net",
    "website": "www.smkfomra.net",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "1315",
    "name": "Sri Sivasubramaniya Nadar College of Engineering (Autonomous)",
    "address": "Kalavakkam, Old Mahabalipuram Road (OMR), Chengalpattu District 603110",
    "district": "Chennai",
    "taluk": "Thirupporur",
    "pincode": "603110",
    "email": "principal@ssn.edu.in",
    "website": "www.ssn.edu.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "EE",
        "intake": 120,
        "startYear": 1996
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 1996
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1996
      },
      {
        "code": "IT",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "CH",
        "intake": 60,
        "startYear": 2004
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2007
      }
    ]
  },
  {
    "code": "1316",
    "name": "Agni College of Technology",
    "address": "Old Mahabalipuram Road (OMR), Thalambur Village, Chengalpattu District 603103",
    "district": "Chennai",
    "taluk": "Vandalur",
    "pincode": "600130",
    "email": "mail@act.edu.in",
    "website": "www.act.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AO",
        "intake": 30,
        "startYear": 2019
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "CH",
        "intake": 60,
        "startYear": 2016
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "MC",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2001
      }
    ]
  },
  {
    "code": "1317",
    "name": "St. Josephï¿½s College of Engineering",
    "address": "Old Mahabalipuram Road (OMR), Chennai 600 119",
    "district": "Chennai",
    "taluk": "Sholinganallur",
    "pincode": "600119",
    "email": "jprstjosephs@stjosephs.ac.in",
    "website": "www.stjosephs.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 1995
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "CH",
        "intake": 60,
        "startYear": 1994
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 1994
      },
      {
        "code": "EE",
        "intake": 180,
        "startYear": 1996
      },
      {
        "code": "EI",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "IT",
        "intake": 180,
        "startYear": 1997
      },
      {
        "code": "ME",
        "intake": 180,
        "startYear": 1998
      },
      {
        "code": "AL",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "1318",
    "name": "TJ Institute of Technology",
    "address": "Karapakkam, Chennai - 600097",
    "district": "Chennai",
    "taluk": "Sholinganallur",
    "pincode": "600097",
    "email": "admin@tjit.edu.in",
    "website": "www.tjit.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 2003
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2002
      },
      {
        "code": "CE",
        "intake": 120,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "1319",
    "name": "Thangavelu Engineering College",
    "address": "Karappakkam, Chennai 600097",
    "district": "Chennai",
    "taluk": "Sholinganallur",
    "pincode": "600097",
    "email": "admin@thangavelu.edu.in",
    "website": "www.thangavelu.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1995
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 1995
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1995
      },
      {
        "code": "EI",
        "intake": 30,
        "startYear": 2000
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 1995
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "1321",
    "name": "Central Institute of Plastics Engineering and Technology (CIPET)",
    "address": "Guindy, Chennai 600032",
    "district": "Chennai",
    "taluk": "CHENNAI",
    "pincode": "600032",
    "email": "chennai@cipet.gov.in",
    "website": "www.cipet.gov.in",
    "autonomous": false,
    "type": "research",
    "branches": [
      {
        "code": "MN",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "1322",
    "name": "Dhanalakshmi Srinivasan College of Engineering and Technology",
    "address": "East Coast Road, Poonjeri, Chennai 603104",
    "district": "Chennai",
    "taluk": "Thirukazukkundram",
    "pincode": "603104",
    "email": "dscet@yahoo.co.in",
    "website": "www.dscet.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2004
      },
      {
        "code": "FD",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2004
      }
    ]
  },
  {
    "code": "1324",
    "name": "Sri Sai Ram Institute of Technology",
    "address": "West Tambaram, Chennai 600044",
    "district": "Chennai",
    "taluk": "KUNDRATHUR",
    "pincode": "600044",
    "email": "principal@sairamit.edu.in",
    "website": "www.sairamgroup.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CO",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "IT",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "1325",
    "name": "St. Joseph College of Engineering",
    "address": "Trinity Campus, Nemili, Sriperumpudur Taluk, Kancheepuram District 602105",
    "district": "Kancheepuram",
    "taluk": ",",
    "pincode": "602117",
    "email": "sjcemmi@gmail.com",
    "website": "www.stjoseph.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 90,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "1333",
    "name": "Vi Institute of Technology",
    "address": "Sirunkundram Village & Post, Chengalput Taluk, Chengalpattu District 603108",
    "district": "Chengalpattu",
    "taluk": ",",
    "pincode": "603108",
    "email": "principal1333viit@gmail.com",
    "website": "www.viit.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "1335",
    "name": "Sri Krishna Institute of Technology",
    "address": "Panapakkam, Padappai, Chennai 601301",
    "district": "Chennai",
    "taluk": "KUNDRATHUR",
    "pincode": "601301",
    "email": "principal.skit@gmail.com",
    "website": "www.srikrishnait.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 23,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 45,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "1399",
    "name": "Chennai Institute of Technology",
    "address": "Puduper Village, Nandambakkam Post, Kundrathur, Chennai 600069",
    "district": "Chennai",
    "taluk": "SRIPERUMBATTUR",
    "pincode": "600069",
    "email": "info@citchennai.net",
    "website": "www.citchennai.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CB",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2010
      },
      {
        "code": "AD",
        "intake": 90,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "1400",
    "name": "Mohamed Sathak A J Academy of Architecture",
    "address": "Old Mahabalipuram Road (OMR), Kancheepuram District 603103",
    "district": "Kancheepuram",
    "taluk": "THIRUPORUR",
    "pincode": "603103",
    "email": "msajaa@gmail.com",
    "website": "www.msajaa.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 120,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "1401",
    "name": "Adhiparasakthi Engineering College",
    "address": "Melmaruvathur, Chengalpattu District 603319",
    "district": "Chengalpattu",
    "taluk": "Cheyyur",
    "pincode": "603319",
    "email": "principal@adhiparasakthi.in",
    "website": "adhiparasakthi.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 1984
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1984
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1993
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 1984
      },
      {
        "code": "CS",
        "intake": 90,
        "startYear": 1993
      },
      {
        "code": "CH",
        "intake": 40,
        "startYear": 1997
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 1998
      }
    ]
  },
  {
    "code": "1402",
    "name": "Annai Terasa College of Engineering",
    "address": "Thirunavalur, Kallakurichi District 607204",
    "district": "Kallakurichi",
    "taluk": "ULUNDURPET",
    "pincode": "607204",
    "email": "info.atce@gmail.com",
    "website": "www.atce.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "ME",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2007
      }
    ]
  },
  {
    "code": "1405",
    "name": "Dhanalakshmi College of Engineering",
    "address": "Manimangalam, Chennai 601301",
    "district": "Chennai",
    "taluk": "Tambaram",
    "pincode": "601301",
    "email": "principal@dce.edu.in",
    "website": "www.dce.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AD",
        "intake": 120,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "1407",
    "name": "G K M College of Engineering and Technology",
    "address": "Alappakkam-Mappedu Road, Chennai 600063",
    "district": "Chennai",
    "taluk": "TAMBARAM",
    "pincode": "600063",
    "email": "principal@gkmcet.net.in",
    "website": "www.gkmcet.net.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1996
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 1996
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 1997
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 1996
      },
      {
        "code": "MR",
        "intake": 40,
        "startYear": 2006
      }
    ]
  },
  {
    "code": "1408",
    "name": "I F E T College of Engineering (Autonomous)",
    "address": "Gangarampalayam, Villupuram District 605108",
    "district": "Villupuram",
    "taluk": "Villupuram",
    "pincode": "605108",
    "email": "college@ifet.ac.in",
    "website": "www.ifet.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 2000
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 1998
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1998
      }
    ]
  },
  {
    "code": "1409",
    "name": "Karpaga Vinayaga College of Engineering And Technology",
    "address": "GST Road Chinnakolambakkam,palayanoor Post,Madurantagam TK,Changalpattu (dist)- 603308",
    "district": "Chengalpattu",
    "taluk": "Madurantag(admist )- 603308",
    "pincode": "603308",
    "email": null,
    "website": "pkpandian.kvcet@gmail.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AU",
        "intake": 30,
        "startYear": 2011
      },
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2004
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "1411",
    "name": "Madha Engineering College",
    "address": "Kundrathur, Chennai 600069",
    "district": "Chennai",
    "taluk": "SRIPERUMBUDHUR",
    "pincode": "600069",
    "email": "principal@madhaengineeringcollege",
    "website": "www.madhaengineeringcollege.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 30,
        "startYear": 2006
      },
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 1998
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 1998
      }
    ]
  },
  {
    "code": "1412",
    "name": "Mailam Engineering College",
    "address": "Mailam, Villupuram District 604304",
    "district": "Villupuram",
    "taluk": "Tindivanam",
    "pincode": "604304",
    "email": "mec@mailamengg.com",
    "website": "www.mailamengg.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1998
      },
      {
        "code": "IT",
        "intake": 120,
        "startYear": 2001
      }
    ]
  },
  {
    "code": "1413",
    "name": "Sri Venkateswaraa College Of Technology",
    "address": "BHB Nagar, Vadakkal Village, Pondur Post, Sriperumbudur Taluk, Kancheepuram District 602105",
    "district": "Kancheepuram",
    "taluk": ", Kancheepuram",
    "pincode": "602105",
    "email": "svct2009@gmail.com",
    "website": "svct.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "1414",
    "name": "Prince Shri Venkateshwara Padmavathy Enginering College",
    "address": "Ponmar, Chennai 600048",
    "district": "Chennai",
    "taluk": "Vandalur",
    "pincode": "600127",
    "email": "prince@psvpec.in",
    "website": "www.psvpec.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      }
    ]
  },
  {
    "code": "1415",
    "name": "T S M Jain College of Technology",
    "address": "Melur Village, Kallakurichi, Kallakurichi District 606201",
    "district": "Salem",
    "taluk": "Chinna salem",
    "pincode": "606201",
    "email": "tsmjaincot@gmail.com",
    "website": "www.tsmjain.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "1416",
    "name": "Jaya Sakthi Engineering College",
    "address": "Thirunindravur, Chennai 602024",
    "district": "Chennai",
    "taluk": "Poonamallee",
    "pincode": "602024",
    "email": "principal.jsec2006@gmail.com",
    "website": "www.sakthiec.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "1419",
    "name": "Sri Sairam Enginering College",
    "address": "West Tambaram, Chennai 600044",
    "district": "Chennai",
    "taluk": "Kundrathur",
    "pincode": "600044",
    "email": "sairam@sairam.edu.in",
    "website": "www.sairamgroup.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 240,
        "startYear": 1995
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 1995
      },
      {
        "code": "EI",
        "intake": 90,
        "startYear": 2007
      },
      {
        "code": "IC",
        "intake": 30,
        "startYear": 1998
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1995
      },
      {
        "code": "CB",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "AD",
        "intake": 120,
        "startYear": 2020
      },
      {
        "code": "MU",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "CJ",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "1420",
    "name": "Tagore Engineering College",
    "address": "Rathnamangalam, Vandalur Post, Chennai 600048",
    "district": "Chennai",
    "taluk": "Vandalur",
    "pincode": "600127",
    "email": "principal@tagore-engg.ac.in",
    "website": "www.tagore-engg.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 30,
        "startYear": 2005
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 1998
      }
    ]
  },
  {
    "code": "1421",
    "name": "V R S College of Engineering and Technology",
    "address": "Arasur, Kallakurichi District 607107",
    "district": "Villupuram",
    "taluk": "Thiruvennainallur",
    "pincode": "607107",
    "email": "vrscet@yahoo.com",
    "website": "www.vrscet.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 120,
        "startYear": 2004
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1994
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1994
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1994
      }
    ]
  },
  {
    "code": "1422",
    "name": "SRM Valliammai Engineering College (Autonomous)",
    "address": "Kattankulathur, Chennai 603203",
    "district": "Chennai",
    "taluk": "VANDALUR",
    "pincode": "603203",
    "email": "principal@valliammai.co.in",
    "website": "srmvalliammai.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 1999
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 1999
      },
      {
        "code": "EI",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "MD",
        "intake": 30,
        "startYear": 2019
      },
      {
        "code": "IT",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "CY",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "1423",
    "name": "Asan Memorial College of Engineering Technology",
    "address": "",
    "district": "Chengalpattu",
    "taluk": "Thirukalukundram",
    "pincode": "603105",
    "email": "asanengg@yahoo.co.in",
    "website": "www.amcet.co.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 2004
      }
    ]
  },
  {
    "code": "1424",
    "name": "Dhaanish Ahmed College of Engineering",
    "address": "Padappai, Chennai 601301",
    "district": "Chennai",
    "taluk": "Sriperumbudur",
    "pincode": "601301",
    "email": "principal@dhaanishcollege.co.in",
    "website": "www.dhaanish.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2002
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "PE",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "1426",
    "name": "Sri Ramanujar Engineering College",
    "address": "Vandalur, Kolappakkam, Chennai 600048",
    "district": "Chennai",
    "taluk": "Vandalur",
    "pincode": "600127",
    "email": "1426srec@gmail.com",
    "website": "www.sriramanujar.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 90,
        "startYear": 2002
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2002
      }
    ]
  },
  {
    "code": "1427",
    "name": "Sri Krishna Engineering College",
    "address": "Panappakkam, Padappai, Chennai 601301",
    "district": "Chennai",
    "taluk": "Kundrathur",
    "pincode": "601301",
    "email": "principal.skec@gmail.com",
    "website": "srikrishnacollege.net",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2005
      },
      {
        "code": "FT",
        "intake": 60,
        "startYear": 2007
      }
    ]
  },
  {
    "code": "1430",
    "name": "Maha Bharathi Engineering College",
    "address": "A Vasudevanur, Chinnasalem, Kallakurichi Taluk, Kallakurichi District 606201",
    "district": "Kallakurichi",
    "taluk": ",",
    "pincode": "606201",
    "email": "mbec123@gmail.com",
    "website": "www.mahabarathi.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "1431",
    "name": "New Prince Shri Bhavani College of Engineering and Technology",
    "address": "Vengaivasal Main Road, Gowriwakkam, Chennai 600073",
    "district": "Chennai",
    "taluk": "TAMBARAM",
    "pincode": "600073",
    "email": "npsbprincipal@gmail.com",
    "website": "www.newprinceshribhavani.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "1432",
    "name": "Rajalakshmi Institute of Technology",
    "address": "Irulapalayam, Kuthampakkam Post, Thiruvallur District 602107",
    "district": "Chennai",
    "taluk": "Poonamallee",
    "pincode": "600124",
    "email": "mail@ritchennai.edu.in",
    "website": "www.ritchennai.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 180,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "CO",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "AD",
        "intake": 180,
        "startYear": 2020
      },
      {
        "code": "CB",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "1434",
    "name": "Surya Group of Institutions",
    "address": "GST Road, Vikravandi Village, Villupuram District 605652",
    "district": "Villupuram",
    "taluk": "VIKRAVANDI",
    "pincode": "605652",
    "email": "principalset@suryagroup.edu.in",
    "website": "www.suryagroup.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "AU",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "1435",
    "name": "Balaji Institute of Engineering and Technology",
    "address": "Thandalam Village, Thiruporur, Chengalpattu District 603110",
    "district": "Chengalpattu",
    "taluk": ",Chengalpattu",
    "pincode": "603110",
    "email": "info@jitedu.in",
    "website": "www.jitedu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "1436",
    "name": "A R Engineering College",
    "address": "Vadakuchipalayam, Kappiyampuliyur Post, Villupuram District 605601",
    "district": "Villupuram",
    "taluk": "Villupuram",
    "pincode": "605601",
    "email": "arec.svet@gmail.com",
    "website": "www.arenggc.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "CS",
        "intake": 30,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "1437",
    "name": "Rrase College of Engineering",
    "address": "Padappai, Chennai 601301",
    "district": "Chennai",
    "taluk": "SRIPERUMADUR",
    "pincode": "601301",
    "email": "rrasecoe@gmail.com",
    "website": "www.rrase.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "1438",
    "name": "Sree Krishna College of Engineering",
    "address": "Anaicut Post, Unnai Village, Vellore District 632101",
    "district": "Vellore",
    "taluk": null,
    "pincode": "632101",
    "email": "principalskce5126@gmail.com",
    "website": "www.skceunai.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 45,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 45,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "1441",
    "name": "A K T Memorial College of Engineering and Technology",
    "address": "Neelamangalam Village, Kallakurichi Post & Taluk, Kallakurichi District 606202",
    "district": "Kallakurichi",
    "taluk": ", Kallakurichi",
    "pincode": "606202",
    "email": "aktengg@yahoo.in",
    "website": "www.aktmcet.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "1442",
    "name": "Prince Dr. K Vasudevan College of Engineering and Technology",
    "address": "Medavakkam- Mambakkam Road, Ponmar, Chennai 600048",
    "district": "Chennai",
    "taluk": "Vandalur",
    "pincode": "600127",
    "email": "prince@princedrkvasudevan.com",
    "website": "www.princedrkvasudevan.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "1444",
    "name": "Chendu College of Engineering & Technology",
    "address": "Zamin Endathur Village, Madurantakam Taluk, Chengalpattu District 603331",
    "district": "Chengalpattu",
    "taluk": ", Chengalpattu",
    "pincode": "603311",
    "email": "principal@ccet.org.in",
    "website": "www.chenduengg.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "1445",
    "name": "Sri Rangapoopathi College of Engineering",
    "address": "Alampoondi Village, Gingee, Villupuram District 604151",
    "district": "Villupuram",
    "taluk": ", Villupuram",
    "pincode": "604151",
    "email": "srceprince2009@gmail.com",
    "website": "http://www.srirangapoopathi.com/",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "1447",
    "name": "Jawahar Engineering College",
    "address": "Kaveri Rangan Nagar, Saligramam, Chennai 600093",
    "district": "Chennai",
    "taluk": "Mambalam/Guindy",
    "pincode": "600093",
    "email": "asnagent@gmail.com",
    "website": "www.jawaharssm.com(Under",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "IE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "1449",
    "name": "Saraswathy College of Engineering and Technology",
    "address": "NH-45, Main Road, Olakkur, Tindivanam Taluk, Villupuram District 604307",
    "district": "Villupuram",
    "taluk": ", Villupuram",
    "pincode": "604305",
    "email": "spms1975@yahoo.co.in",
    "website": "www.http://vetscet.ac.in/",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "1450",
    "name": "Loyola-ICAM College of Engineering and Technology",
    "address": "Loyola College Campus, Nungambakkam, Chennai 600034",
    "district": "Chennai",
    "taluk": "Egmore",
    "pincode": "600034",
    "email": "licet@licet.ac.in",
    "website": "www.licet.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "1452",
    "name": "PERI Institute of Technology",
    "address": "Mannivakkam, West Tambaram, Chennai 600048",
    "district": "Chennai",
    "taluk": "VANDALUR",
    "pincode": "600048",
    "email": "principal@periit.com",
    "website": "WWW.peri.education",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "1501",
    "name": "Adhiparasakthi College of Engineering",
    "address": "Kalavai, Vellore District 632506",
    "district": "Vellore",
    "taluk": "Kalavai",
    "pincode": "632506",
    "email": "apce501@gmail.com",
    "website": "www.apce.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2004
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 2001
      }
    ]
  },
  {
    "code": "1503",
    "name": "Arulmigu Meenakshi Amman College of Engineering",
    "address": "Vadamavandal,Thiruvannamalai District 604410",
    "district": "Tiruvannamalai",
    "taluk": ", Thiruvannamalai",
    "pincode": "604410",
    "email": "amacengg@yahoo.com",
    "website": "www.amace.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 1985
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1985
      },
      {
        "code": "CS",
        "intake": 45,
        "startYear": 1992
      },
      {
        "code": "AR",
        "intake": 40,
        "startYear": 1993
      },
      {
        "code": "IC",
        "intake": 15,
        "startYear": 1995
      },
      {
        "code": "CH",
        "intake": 30,
        "startYear": 1997
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 1999
      },
      {
        "code": "BT",
        "intake": 45,
        "startYear": 2006
      },
      {
        "code": "ME",
        "intake": 90,
        "startYear": 1985
      }
    ]
  },
  {
    "code": "1504",
    "name": "Arunai Engineering College",
    "address": "Mathur, Thiruvannamalai District 606603",
    "district": "Tiruvannamalai",
    "taluk": "Tiruvannamalai",
    "pincode": "606603",
    "email": "aectvm1993@gmail.com",
    "website": "www.arunai.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "CH",
        "intake": 60,
        "startYear": 1997
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1993
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1995
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1993
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 1998
      }
    ]
  },
  {
    "code": "1505",
    "name": "C Abdul Hakeem College of Engineering and Technology",
    "address": "Melvisharam, Vellore District 632509",
    "district": "Vellore",
    "taluk": "WALAJAH",
    "pincode": "632509",
    "email": "info.cahcet@gmail.com",
    "website": "www.cahcet.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 1998
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 1998
      }
    ]
  },
  {
    "code": "1507",
    "name": "Ganadipathy Tulsiï’s Jain Engineering College",
    "address": "Kaniyambadi, Vellore District 632102",
    "district": "Vellore",
    "taluk": "Vellore",
    "pincode": "632102",
    "email": "principal@gtec.ac.in",
    "website": "www.gtec.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 30,
        "startYear": 2000
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2000
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2000
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 2006
      }
    ]
  },
  {
    "code": "1509",
    "name": "Meenakshi College of Engineering",
    "address": "Vembuliamman Koil Street, K K Nagar (West), Chennai 600078",
    "district": "Chennai",
    "taluk": "chennai",
    "pincode": "600078",
    "email": "mce_edu@yahoo.co.in",
    "website": "www.mce.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EI",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "IT",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "1510",
    "name": "Priyadarshini Engineering College",
    "address": "Vaniyambadi Post, Thirupattur District 635751",
    "district": null,
    "taluk": "Vaniyambadi",
    "pincode": "635751",
    "email": "principal@priyadarshini.net.in",
    "website": "www.priyadarshini.net.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 90,
        "startYear": 1995
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 1995
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1997
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1999
      }
    ]
  },
  {
    "code": "1511",
    "name": "Ranippettai Engineering College",
    "address": "Thenkadappanthangal, Vellore District 632513",
    "district": "Vellore",
    "taluk": ", RANIPET DISTRICT",
    "pincode": "632513",
    "email": "recwalaja@yahoo.com",
    "website": "RANIPPETTAI.EDU.IN",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 45,
        "startYear": 1999
      },
      {
        "code": "CE",
        "intake": 45,
        "startYear": 2013
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "ME",
        "intake": 90,
        "startYear": 1999
      }
    ]
  },
  {
    "code": "1512",
    "name": "S K P Engineering College",
    "address": "Thiruvannamalai District 606611",
    "district": "Tiruvannamalai",
    "taluk": "Tiruvannamalai Taluk",
    "pincode": "606611",
    "email": "skpengineeringcollege@gmail.com",
    "website": "www.skpec.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2003
      },
      {
        "code": "RM",
        "intake": 60,
        "startYear": 2019
      }
    ]
  },
  {
    "code": "1513",
    "name": "Sri Balaji Chockalingam Engineering College",
    "address": "Arni, Thiruvannamalai District 632317",
    "district": "Tiruvannamalai",
    "taluk": "ARNI",
    "pincode": "632317",
    "email": "sbcecarni1513@gmail.com",
    "website": "www.sbcecarni.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2001
      }
    ]
  },
  {
    "code": "1517",
    "name": "Thirumalai Engineering College",
    "address": "Kilambi, Kancheepuram District 631551",
    "district": "Kancheepuram",
    "taluk": "Kanchipuram",
    "pincode": "631551",
    "email": "thirumalaiengg1999@yahoo.co.in",
    "website": "www.thirumalaiengg.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2005
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2000
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 2007
      }
    ]
  },
  {
    "code": "1518",
    "name": "Thiruvalluvar College of Engineering and Technology",
    "address": "Vandavasi, Thiruvannamalai District 604505",
    "district": "Tiruvannamalai",
    "taluk": "vandavasi",
    "pincode": "604505",
    "email": "tcet1998@gmail.com",
    "website": "www.tcet.co.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 45,
        "startYear": 2014
      },
      {
        "code": "AU",
        "intake": 45,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 90,
        "startYear": 1998
      },
      {
        "code": "CE",
        "intake": 68,
        "startYear": 2000
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 1998
      },
      {
        "code": "EE",
        "intake": 45,
        "startYear": 1999
      },
      {
        "code": "EI",
        "intake": 45,
        "startYear": 1998
      },
      {
        "code": "IT",
        "intake": 68,
        "startYear": 1999
      }
    ]
  },
  {
    "code": "1519",
    "name": "Bharathidasan Engineering College",
    "address": "Nattrampalli Post, Tiruppattur District 635854",
    "district": null,
    "taluk": "Nattrampalli",
    "pincode": "635854",
    "email": "principal@bec.ac.in",
    "website": "www.bec.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "1520",
    "name": "Kingston Engineering College",
    "address": "Chithoor Main Road, Christianpet Village, Katpadi Taluk, Vellore District 632059",
    "district": "Vellore",
    "taluk": ",",
    "pincode": "632059",
    "email": "principal@kingston.ac.in",
    "website": "kingston.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "1523",
    "name": "Global Institute of Engineering and Technology",
    "address": "Bangalore-Chennai Highway, Melvisharam, Walajah Taluk, Vellore District 632506",
    "district": "Chennai",
    "taluk": ", Vellore",
    "pincode": "632509",
    "email": "global_iet@yahoo.co.in",
    "website": "www.getedu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AU",
        "intake": 30,
        "startYear": 2011
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "1524",
    "name": "Annamalaiar College of Engineering",
    "address": "Modaiyur Village, Polur Taluk, Thiruvannamalai District 606902",
    "district": "Tiruvannamalai",
    "taluk": ", Thiruvannamalai",
    "pincode": "606902",
    "email": "annamalaiarcoe@gmail.com",
    "website": "www.annamalaiarengg.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "1525",
    "name": "Podhigai College of Engineering and Technology",
    "address": "Vinayakapuram, Adiyur Post, Tirupattur Taluk, Tiruppattur District 635601",
    "district": "Tirupattur",
    "taluk": ", Tiruppattur",
    "pincode": "635601",
    "email": "podhigaitech@gmail.com",
    "website": "www.podhigaitech.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2016
      }
    ]
  },
  {
    "code": "1526",
    "name": "Sri Krishna College of Engineering",
    "address": "Tiruttani High Road, Arakkonam, Vellore District 631003",
    "district": "Vellore",
    "taluk": "ARAKKONAM",
    "pincode": "631003",
    "email": "principal1526@gmail.com",
    "website": "www.srikrishnacollege.co.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 34,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 34,
        "startYear": 2009
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 68,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "1529",
    "name": "Oxford College of Engineering",
    "address": "Venmani Village, Karaipoondi Post, Polur Taluk, Thiruvannamalai District 606803",
    "district": "Tiruvannamalai",
    "taluk": ",",
    "pincode": "606803",
    "email": "OCEPRINCIPAL@GMAIL.COM",
    "website": "WWW.KALAIVAHINI.EDU",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "1530",
    "name": "Papni School of Architecture",
    "address": "302/1, Keeranallur Village, Sriperunbudur Taluk, Kancheepuram District, Chennai 602108",
    "district": "Chennai",
    "taluk": ",",
    "pincode": "602108",
    "email": "papni.edu@gmail.com",
    "website": "www.papniarch.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 40,
        "startYear": 2019
      }
    ]
  },
  {
    "code": "1532",
    "name": "Madha school of Architecture Kundrathur",
    "address": "Chennai 600069",
    "district": "Chennai",
    "taluk": "SRIPERUMBUDHUR PALLAVARAM, CHENNAI",
    "pincode": null,
    "email": "directormsa2018@gmail.com",
    "website": "www.madhagroups.org",
    "autonomous": null,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 40,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "1605",
    "name": "Idhaya Engineering College for Women",
    "address": "Chinnasalem, Kallakurichi District 606201",
    "district": "Kallakurichi",
    "taluk": "CHINNASALEM",
    "pincode": "606201",
    "email": "idhaya@iecw.edu.in",
    "website": "www.iecw.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      }
    ]
  },
  {
    "code": "2005",
    "name": "Government College of Technology (Autonomous)",
    "address": "Thadagam Road, Coimbatore District 641013",
    "district": "Coimbatore",
    "taluk": "Coimbatore North",
    "pincode": "641013",
    "email": "gctcbe@gct.ac.in",
    "website": "www.gct.ac.in",
    "autonomous": true,
    "type": "government",
    "branches": [
      {
        "code": "CE",
        "intake": 120,
        "startYear": 1952
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1952
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1970
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1952
      },
      {
        "code": "PR",
        "intake": 60,
        "startYear": 1978
      },
      {
        "code": "EI",
        "intake": 60,
        "startYear": 1984
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1986
      },
      {
        "code": "IB",
        "intake": 120,
        "startYear": 2002
      }
    ]
  },
  {
    "code": "2006",
    "name": "PSG College of Technology (Autonomous)",
    "address": "Peelamedu, Coimbatore District 641004",
    "district": "Coimbatore",
    "taluk": "COIMBATORE",
    "pincode": "641004",
    "email": "principal@psgtech.edu",
    "website": "www.psgtech.edu",
    "autonomous": true,
    "type": "aided",
    "branches": [
      {
        "code": "AS",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "BS",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "BY",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 1953
      },
      {
        "code": "CN",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1968
      },
      {
        "code": "EM",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "ES",
        "intake": 60,
        "startYear": 1983
      },
      {
        "code": "FY",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "IM",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "IY",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "PR",
        "intake": 30,
        "startYear": 1975
      },
      {
        "code": "PN",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "PS",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "RA",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "TX",
        "intake": 30,
        "startYear": 1965
      },
      {
        "code": "TT",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "CM",
        "intake": 120,
        "startYear": 1987
      }
    ]
  },
  {
    "code": "2007",
    "name": "Coimbatore Institute of Technology (Autonomous)",
    "address": "Civil Aerodrome Post, Coimbatore District 641014",
    "district": "Coimbatore",
    "taluk": "COIMBATORE",
    "pincode": "641014",
    "email": "principal@cit.edu.in",
    "website": "www.cit.edu.in",
    "autonomous": true,
    "type": "aided",
    "branches": [
      {
        "code": "CE",
        "intake": 45,
        "startYear": 1956
      },
      {
        "code": "CN",
        "intake": 15,
        "startYear": 2011
      },
      {
        "code": "EE",
        "intake": 65,
        "startYear": 1956
      },
      {
        "code": "EY",
        "intake": 55,
        "startYear": 2013
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1968
      },
      {
        "code": "EM",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1986
      },
      {
        "code": "CH",
        "intake": 40,
        "startYear": 1963
      },
      {
        "code": "CL",
        "intake": 20,
        "startYear": 2018
      },
      {
        "code": "IM",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "MF",
        "intake": 55,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2025",
    "name": "Anna University Regional Campus - Coimbatore",
    "address": "Maruthamalai Main Road, Navavoor Bharathiyar University Post, Somayampalayam, Coimbatore District 641046",
    "district": "Coimbatore",
    "taluk": "Coimbatore North",
    "pincode": "641046",
    "email": "deancoimbatore@annauniv.edu",
    "website": "www.aurcc.ac.in",
    "autonomous": false,
    "type": "constituent",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2018
      }
    ]
  },
  {
    "code": "2302",
    "name": "Sri Shanmugha College of Engineering and Technology",
    "address": "Morur Bit II Village, Salem District 637302",
    "district": "Salem",
    "taluk": "Sankari",
    "pincode": "637304",
    "email": "principal@shanmugha.edu.in",
    "website": "www.shanmugha.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2016
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "2314",
    "name": "Muthayammal College of Engineering",
    "address": "Kakkaveri Post, Namakkal District 637408",
    "district": "Namakkal",
    "taluk": "Rasipuram",
    "pincode": "637408",
    "email": "info@mce.ac.in",
    "website": "www.mce.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "2327",
    "name": "N S N College of Engineering and Technology",
    "address": "Karur-Madurai NH7, Manalmedu, Karur District 639003",
    "district": "Madurai",
    "taluk": "Manmangalam",
    "pincode": "639003",
    "email": "principal2327@gmail.com",
    "website": "www.nsn.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 2011
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "ME",
        "intake": 90,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "2328",
    "name": "K S R Institute for Engineering and Technology",
    "address": "Thokkavadi, Namakkal District 637215",
    "district": "Erode",
    "taluk": "Tiruchengode",
    "pincode": "637215",
    "email": "principal@ksriet.ac.in",
    "website": "www.ksriet.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "2329",
    "name": "Rathinam Technical Campus",
    "address": "Pollachi Road, Eachanari, Coimbatore District 641021",
    "district": "Coimbatore",
    "taluk": "COIMBATORE SOUTH",
    "pincode": "641021",
    "email": "principal@rathinamtechzone.com",
    "website": "https://www.rathinamcollege.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AG",
        "intake": 30,
        "startYear": 2020
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "BT",
        "intake": 30,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2011
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "2332",
    "name": "Aishwarya College of Engineering and Technology",
    "address": "Errattaikaradu Paruvachi Post, Anthiyur (Via), Bhavani Taluk, Erode District 638312",
    "district": "Erode",
    "taluk": ", Erode",
    "pincode": "638312",
    "email": "acetdr@gmail.com",
    "website": "aishwaryacollege.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "2338",
    "name": "Asian College of Engineering and Technology",
    "address": "Asian College Road, Kondayampalayam, Near Saravanampatti, Coimbatore District 641110",
    "district": "Coimbatore",
    "taluk": "Annur",
    "pincode": "641110",
    "email": "asiantccbe@gmail.com",
    "website": "acetcbe.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "2341",
    "name": "Ganesh College of Engineering",
    "address": "Attur Main Road, Mettupatti, Salem District 636111",
    "district": "Salem",
    "taluk": "Valapadi",
    "pincode": "636111",
    "email": "principal@ganeshenggcollege.org",
    "website": "www.ganeshenggcollege.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "2342",
    "name": "Sri Ranganathar Institute of Engineering and Technology",
    "address": "Thudialur-Kovilpalay Road, Coimbatore District 641110",
    "district": "Coimbatore",
    "taluk": "Coimbatore (North)",
    "pincode": "641110",
    "email": "principal@sriet.ac.in",
    "website": "www.sriet.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "2343",
    "name": "Indian Institute of Handloom Technology",
    "address": "Foulke's Compound, Thillai Nagar, Salem District 636001",
    "district": "Salem",
    "taluk": "Salem",
    "pincode": "636001",
    "email": "iiht.tnslm@nic.in",
    "website": "www.iihtsalem.edu.in",
    "autonomous": false,
    "type": "research",
    "branches": [
      {
        "code": "HT",
        "intake": 60,
        "startYear": 2015
      }
    ]
  },
  {
    "code": "2344",
    "name": "Kongu School of Architecture",
    "address": "Kongu Engineering College Campus, Perundurai Railway Station Road, Thoppupalayam Post, Perundurai, Erode District 638052",
    "district": "Erode",
    "taluk": "Perundurai",
    "pincode": "638060",
    "email": "ksa@kongu.ac.in",
    "website": "http://www.ksakongu.edu.in/",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 40,
        "startYear": 2015
      }
    ]
  },
  {
    "code": "2345",
    "name": "Dhirajlal Gandhi College of Technology",
    "address": "Sikkanampatty, (Opp. to Airport), Omalur Taluk, Salem District 636309",
    "district": "Salem",
    "taluk": ", Salem",
    "pincode": "636309",
    "email": "principal@dgct.ac.in",
    "website": "www.dgct.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2011
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "2346",
    "name": "Shree Sathyam College of Engineering and Technology",
    "address": "NH-47, Manjakkalpatti, Kuppanur Post, Sankari Taluk, Salem District 637301",
    "district": "Salem",
    "taluk": ", Salem",
    "pincode": "637301",
    "email": "balkisujatha@gmail.com",
    "website": "www.shreesathyam.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2011
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "2347",
    "name": "AVS College of Technology",
    "address": "Attur Main Road, Near AVS College of Arts & Science, Chinnagoundapuram, Salem District 636106",
    "district": "Salem",
    "taluk": "VALAPADY",
    "pincode": "636106",
    "email": "info@avstech.ac.in",
    "website": "www.avstech.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2013
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "2348",
    "name": "San Academy of Architecture",
    "address": "ACC Pirivu, Navakarai Post, Mavuthampathy Village, Walayar, Coimbatore District 641105",
    "district": "Coimbatore",
    "taluk": "Madukkarai",
    "pincode": "641105",
    "email": "sanarchitecture7245@gmail.com",
    "website": "sanarch.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 40,
        "startYear": 2015
      }
    ]
  },
  {
    "code": "2349",
    "name": "Dhaanish Ahmed Institute of Technology",
    "address": "Pichanur Post, (Near K G Chavadi), Coimbatore District 641105",
    "district": "Coimbatore",
    "taluk": "MADUKKARAI",
    "pincode": "641105",
    "email": "info@dhaanishcollege.in",
    "website": "www.dhaanish.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2017
      },
      {
        "code": "FD",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "RM",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "2354",
    "name": "Pollachi Institute of Engineering and Technology",
    "address": "Main Road, Poosaripatti, Pollachi Taluk, Coimbatore District 642205",
    "district": "Coimbatore",
    "taluk": ", Coimbatore",
    "pincode": "642205",
    "email": "principal@pietech.edu.in",
    "website": "www.pietech.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "2355",
    "name": "Cheran College of Engineering",
    "address": "Karur-Coimbatore Main Road, NH-67, K.Paramathi Post, Aravakurichi Taluk, Karur District 639111",
    "district": "Coimbatore",
    "taluk": ", Karur",
    "pincode": "639111",
    "email": "principalcheran@gmail.com",
    "website": "www.cheran.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "2356",
    "name": "Arulmurugan College of Engineering",
    "address": "Karvazhi Road, Thennilai Post, Karur District 639206",
    "district": "Karur",
    "taluk": "Pugalur",
    "pincode": "639206",
    "email": "engg@arulmurugan.edu.in",
    "website": "www.arulmurugan.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2012
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2014
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "2357",
    "name": "V S B College of Engineering Technical Campus",
    "address": "Ealur Pirivu, Solavampalayam Post, Coimbatore District 642109",
    "district": "Coimbatore",
    "taluk": ", Coimbatore â€“ 642109. Dist.HQ",
    "pincode": "642109",
    "email": "principal@vsbcetc.com",
    "website": "www.vsbcetc.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2012
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2019
      }
    ]
  },
  {
    "code": "2360",
    "name": "Suguna College of Engineering",
    "address": "Kalappatti Road, Civil Aerodrome Post, Coimbatore District 641014",
    "district": "Coimbatore",
    "taluk": "Coimbatore",
    "pincode": "641014",
    "email": "sugucoe@gmail.com",
    "website": "www.sugunace.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "MC",
        "intake": 60,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "2361",
    "name": "Sasi Creative School of Archiecture",
    "address": "Pollachi Main Road, Myleripalayam, Coimbatore District 641032",
    "district": "Coimbatore",
    "taluk": "COIMBATORE NORTH",
    "pincode": "641032",
    "email": "CONTACT@SCSA.AC.IN",
    "website": "WWW.SCSA.AC.IN",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 80,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "2364",
    "name": "School Of Architecture Coimbatore Institute Of Engineering And Technology",
    "address": "Vellimalai Pattinam, Narasipuram Post, ThondamuthurVia,Coimbatore District 641109",
    "district": "Coimbatore",
    "taluk": "Perur",
    "pincode": "641109",
    "email": "soaciet@gmail.com",
    "website": "www.soaciet.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 40,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "2365",
    "name": "Nehru School of Architecture",
    "address": "451-D, Palakkad Main Road, Kuniamuthur, Coimbatore District 641108",
    "district": "Coimbatore",
    "taluk": "Coimbatore (south)",
    "pincode": "641008",
    "email": "admissions@nehrucolleges.com",
    "website": "www.nehrucolleges.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 40,
        "startYear": 2015
      }
    ]
  },
  {
    "code": "2367",
    "name": "Arjun College of Technology",
    "address": "Chettiyakkapalayam, Kinathukadavu, Coimbatore District 642120",
    "district": "Coimbatore",
    "taluk": "KINATHUKADAVU",
    "pincode": "642120",
    "email": "arjuncollegeoftechnology@yahoo.co",
    "website": "www.actechnology.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2013
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2013
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "MC",
        "intake": 60,
        "startYear": 2016
      }
    ]
  },
  {
    "code": "2369",
    "name": "Government College of Engineering",
    "address": "Chettikkarai Post, Dharmapuri District 635 704",
    "district": "Dharmapuri",
    "taluk": "DHARMAPURI",
    "pincode": "636704",
    "email": "principalgcedpi@gmail.com",
    "website": "www.gcedpi.edu.in",
    "autonomous": false,
    "type": "government",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2013
      }
    ]
  },
  {
    "code": "2372",
    "name": "Park Institute of Architecture",
    "address": "Avinashi Road, NH-47, Kaniyur, Coimbatore District 641659",
    "district": "Coimbatore",
    "taluk": "SULUR",
    "pincode": "641659",
    "email": "pia@park.ac.in",
    "website": "http://pia.ac.in/",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 20,
        "startYear": 2014
      }
    ]
  },
  {
    "code": "2373",
    "name": "Hindusthan School of Architecture",
    "address": "Othakkalmandabam Post, Coimbatore District 641032",
    "district": "Coimbatore",
    "taluk": "Coimbatore",
    "pincode": "641032",
    "email": "barch@hindusthan.net",
    "website": "www.hsoa.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 40,
        "startYear": 2015
      }
    ]
  },
  {
    "code": "2376",
    "name": "Rathinam School of Architecture",
    "address": "Rathinam Techzone Campus Pollachi Road, Coimbatore District 641021",
    "district": "Coimbatore",
    "taluk": "Coimbatore South",
    "pincode": "641021",
    "email": "principal.rsa@rathinam.in",
    "website": "https://www.rathinamcollege.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 40,
        "startYear": 2017
      }
    ]
  },
  {
    "code": "2377",
    "name": "PSG Institute of Technology and Applied Research",
    "address": "Avinashi Road, Neelambur, Coimbatore 641062",
    "district": "Coimbatore",
    "taluk": "Sulur",
    "pincode": "641062",
    "email": "principal@psgitech.ac.in",
    "website": "www.psgitech.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2014
      }
    ]
  },
  {
    "code": "2601",
    "name": "Adhiyamaan College of Engineering (Autonomous)",
    "address": "Hosur, Krishnagiri District 635109",
    "district": "Krishnagiri",
    "taluk": "HOSUR",
    "pincode": "635130",
    "email": "principal@adhiyamaan.ac.in",
    "website": "www.adhiyamaan.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "AR",
        "intake": 120,
        "startYear": 1993
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2003
      },
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2003
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 1993
      },
      {
        "code": "CH",
        "intake": 60,
        "startYear": 1993
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 1991
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1992
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1991
      }
    ]
  },
  {
    "code": "2602",
    "name": "Annai Mathammal Sheela Enginereing College",
    "address": "Erumapatty Post, Namakkal District 637013",
    "district": "Namakkal",
    "taluk": "Sendhamangalam",
    "pincode": "637013",
    "email": "info@amsheela.org.in",
    "website": "www.amsheela.org.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1996
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1996
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2004
      },
      {
        "code": "IE",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "MD",
        "intake": 60,
        "startYear": 2019
      }
    ]
  },
  {
    "code": "2603",
    "name": "Government College of Engineering (Autonomous)",
    "address": "Bargur, Krishnagiri District 635104",
    "district": "Krishnagiri",
    "taluk": "Bargur",
    "pincode": "635104",
    "email": "principal503@gmail.com",
    "website": "gcebargur.ac.in",
    "autonomous": true,
    "type": "government",
    "branches": [
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1994
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1994
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2004
      }
    ]
  },
  {
    "code": "2606",
    "name": "Jayam College of Engineering and Technology",
    "address": "Nallanur Post, Dharmapuri District 636813",
    "district": "Dharmapuri",
    "taluk": "Pennagaram",
    "pincode": "636813",
    "email": "info@jcet.ac.in",
    "website": "www.jcet.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "CE",
        "intake": 90,
        "startYear": 2002
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1997
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 1997
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "ME",
        "intake": 90,
        "startYear": 1997
      }
    ]
  },
  {
    "code": "2607",
    "name": "K S Rangasamy College of Technology (Autonomous)",
    "address": "Tiruchengode, Namakkal District 637215",
    "district": "Erode",
    "taluk": "Tiruchengode",
    "pincode": "637215",
    "email": "principal@ksrct.ac.in",
    "website": "www.ksrct.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "CB",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1994
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 1994
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1994
      },
      {
        "code": "FD",
        "intake": 60,
        "startYear": 2016
      },
      {
        "code": "ME",
        "intake": 90,
        "startYear": 1994
      },
      {
        "code": "MC",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "TX",
        "intake": 60,
        "startYear": 1997
      }
    ]
  },
  {
    "code": "2608",
    "name": "M Kumarasamy College of Engineering (Autonomous)",
    "address": "Thalavapalayam, Karur District 639113",
    "district": "Karur",
    "taluk": "Velayuthampalayam",
    "pincode": "639113",
    "email": "principal@mkce.ac.in",
    "website": "www.mkce.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 240,
        "startYear": 2000
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "IT",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2000
      },
      {
        "code": "CB",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2000
      }
    ]
  },
  {
    "code": "2609",
    "name": "Mahendra Engineering College (Autonomous)",
    "address": "Mahendhirapuri, Mallasamudram, Namakkal District 637503",
    "district": "Salem",
    "taluk": "Tiruchengode",
    "pincode": "637503",
    "email": "principal@mahendra.info",
    "website": "WWW.MAHENDRA.INFO",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "CE",
        "intake": 120,
        "startYear": 2002
      },
      {
        "code": "CH",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "CS",
        "intake": 150,
        "startYear": 1995
      },
      {
        "code": "EC",
        "intake": 150,
        "startYear": 1995
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "IT",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "MC",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1995
      },
      {
        "code": "MU",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "2610",
    "name": "Muthayammal Engineering College (Autonomous)",
    "address": "Rasipuram, Namakkal District 637408",
    "district": "Namakkal",
    "taluk": "Rasipuram",
    "pincode": "637408",
    "email": "info@mec.edu.in",
    "website": "www.mec.edu.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 2000
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 2000
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 2000
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "RM",
        "intake": 30,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "2611",
    "name": "Paavai Engineering College (Autonomous)",
    "address": "NH-7, Pachal Post, Namakkal District 637018",
    "district": "Namakkal",
    "taluk": "NAMAKKAL",
    "pincode": "637018",
    "email": "pecprincipal@paavai.edu.in",
    "website": "http://pec.paavai.edu.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 60,
        "startYear": 2015
      },
      {
        "code": "AG",
        "intake": 120,
        "startYear": 2015
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "CH",
        "intake": 60,
        "startYear": 2015
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "FD",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "MC",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "MD",
        "intake": 60,
        "startYear": 2018
      }
    ]
  },
  {
    "code": "2612",
    "name": "P G P College of Engineering and Technology",
    "address": "Paramathi Post, Namakkal District 637207",
    "district": "Namakkal",
    "taluk": "PARAMATHY- VELUR",
    "pincode": "637207",
    "email": "engineering@pgpews.com",
    "website": "www.pgpcet.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "CS",
        "intake": 90,
        "startYear": 1999
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1999
      }
    ]
  },
  {
    "code": "2613",
    "name": "K S R College of Engineering (Autonomous)",
    "address": "Tiruchengode, Namakkal District 637215",
    "district": "Namakkal",
    "taluk": "TIRUCHENGODE",
    "pincode": "637215",
    "email": "principal@ksrce.ac.in",
    "website": "www.ksrce.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AU",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 2001
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2005
      }
    ]
  },
  {
    "code": "2614",
    "name": "S S M College of Engineering",
    "address": "Komarapalayam, Namakkal District 638183",
    "district": "Salem",
    "taluk": "Komarapalayam",
    "pincode": "638183",
    "email": "principal@ssmce.ac.in",
    "website": "www.ssmce.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2004
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "TC",
        "intake": 30,
        "startYear": 1998
      },
      {
        "code": "PC",
        "intake": 30,
        "startYear": 2015
      },
      {
        "code": "PE",
        "intake": 30,
        "startYear": 2016
      }
    ]
  },
  {
    "code": "2615",
    "name": "Government College of Engineering (Autonomous)",
    "address": "Salem District 636011",
    "district": "Salem",
    "taluk": "Omalur",
    "pincode": "636011",
    "email": "gcesalem.edu@gmail.com",
    "website": "www.gcesalem.edu.in",
    "autonomous": true,
    "type": "government",
    "branches": [
      {
        "code": "CE",
        "intake": 120,
        "startYear": 1966
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1985
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1966
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1966
      },
      {
        "code": "MT",
        "intake": 60,
        "startYear": 1973
      }
    ]
  },
  {
    "code": "2617",
    "name": "Sengunthar Engineering College (Autonomous)",
    "address": "Tiruchengode, Namakkal District 637205",
    "district": "Namakkal",
    "taluk": "Tiruchengode",
    "pincode": "637205",
    "email": "info@scteng.co.in",
    "website": "www.scteng.co.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2004
      },
      {
        "code": "CS",
        "intake": 90,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 90,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2004
      }
    ]
  },
  {
    "code": "2618",
    "name": "Sona College of Technology (Autonomous)",
    "address": "Suramangalam Post, Salem District 636005",
    "district": "Salem",
    "taluk": "Salem",
    "pincode": "636005",
    "email": "admission@sonatech.ac.in",
    "website": "admission@sonatech.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "FT",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "ME",
        "intake": 150,
        "startYear": 1997
      },
      {
        "code": "MC",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "CE",
        "intake": 90,
        "startYear": 2003
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 1997
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 1997
      },
      {
        "code": "IT",
        "intake": 120,
        "startYear": 1998
      }
    ]
  },
  {
    "code": "2620",
    "name": "Vivekanandha College of Engineering for Women (Autonomous)",
    "address": "Sathinaickenpalayam, Elayampalayam Village, Kumaramangalam, Namakkal District",
    "district": "Erode",
    "taluk": "Tiruchengode",
    "pincode": "637205",
    "email": "principal@vcew.ac.in",
    "website": "www.vivekanandha.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "TS",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "2621",
    "name": "Er. Perumal Manimekalai College of Engineering",
    "address": "Near Koneripalli, Hosur, Krishnagiri District 635117",
    "district": "Krishnagiri",
    "taluk": "Hosur",
    "pincode": "635117",
    "email": "pmc_enginering@yahoo.com",
    "website": "www.pmctech.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2002
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "MC",
        "intake": 60,
        "startYear": 2013
      }
    ]
  },
  {
    "code": "2622",
    "name": "V S B Engineering College",
    "address": "Kovai Road, Karur District 639111",
    "district": "Coimbatore",
    "taluk": "Pugalur",
    "pincode": "639111",
    "email": "admission@vsbec.com",
    "website": "www.vsbec.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "CH",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 2002
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 2002
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "ME",
        "intake": 180,
        "startYear": 2002
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "2623",
    "name": "Mahendra College of Engineering",
    "address": "Attur Road, Minnampalli, Valapady, Salem District 636106",
    "district": "Salem",
    "taluk": "Valapady",
    "pincode": "636106",
    "email": "info@mahendracollege.com",
    "website": "www.mahendracollege.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "CS",
        "intake": 150,
        "startYear": 2005
      },
      {
        "code": "EC",
        "intake": 150,
        "startYear": 2005
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2624",
    "name": "Gnanamani College of Technology",
    "address": "Pachal Post, Namakkal District 637018",
    "district": "Namakkal",
    "taluk": "NAMAKKAL",
    "pincode": "637018",
    "email": "info@gct.org.in",
    "website": "www.gct.org.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2006
      },
      {
        "code": "BM",
        "intake": 120,
        "startYear": 2018
      },
      {
        "code": "CH",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "FD",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "AG",
        "intake": 120,
        "startYear": 2020
      },
      {
        "code": "RM",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "PH",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2006
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2006
      }
    ]
  },
  {
    "code": "2625",
    "name": "The Kavery Engineering College",
    "address": "M Kalipatti Post, Mecheri, Salem District 634453",
    "district": "Salem",
    "taluk": "Mettur",
    "pincode": "636453",
    "email": "principal804@hotmail.com",
    "website": "www.kavery.org.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2006
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 2006
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "2627",
    "name": "Selvam College of Technology",
    "address": "Pappanaickenpatti Post, Namakkal District 637003",
    "district": "Namakkal",
    "taluk": "NAMAKKAL",
    "pincode": "637003",
    "email": "principal@selvamtech.edu.in",
    "website": "www.selvamtech.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2006
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2628",
    "name": "Paavai College of Engineering",
    "address": "NH-7, Pachal Post, Namakkal District 637018",
    "district": "Namakkal",
    "taluk": "Namakkal",
    "pincode": "637018",
    "email": "pceprincipal@paavai.edu.in",
    "website": "www.pce.paavai.edu.in/",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AU",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2006
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "FT",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "2629",
    "name": "Sengunthar College of Engineering",
    "address": "Tiruchengode, Namakkal District 637205",
    "district": "Erode",
    "taluk": "Tiruchengode",
    "pincode": "637205",
    "email": "info@scew.org",
    "website": "www.scew.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "RM",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "MD",
        "intake": 120,
        "startYear": 2007
      }
    ]
  },
  {
    "code": "2630",
    "name": "Chettinad College of Engineering and Technology",
    "address": "NH-67, Trichy Main Road, Puliyur C F, Karur District 639114",
    "district": "Karur",
    "taluk": "Karur",
    "pincode": "639114",
    "email": "principalccet@chettinadtech.ac.in",
    "website": "www.chettinadtech.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "2632",
    "name": "Mahendra Institute of Technology",
    "address": "Mahendhirapuri, Mallasamudram, Namakkal District 637503",
    "district": "Namakkal",
    "taluk": "Tiruchengode",
    "pincode": "637503",
    "email": "principal@mahendratech.org",
    "website": "www.mahendratech.org",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AU",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2007
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2007
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 2007
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2633",
    "name": "Vidyaa Vikas College of Engineering and Technology",
    "address": "Varahoorampatti, Tiruchengode, Namakkal District 637 214",
    "district": "Erode",
    "taluk": "Tiruchengode",
    "pincode": "637214",
    "email": "principal@vvcet.ac.in",
    "website": "http://vvcet.ac.in/",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2007
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2634",
    "name": "Excel Engineering College",
    "address": "Pallakkapalayam, Sankari West Post, Namakkal District 637303",
    "district": "Salem",
    "taluk": "KOMARAPALAYAM",
    "pincode": "637303",
    "email": "principaleec@excelcolleges.com",
    "website": "www.excelinstitutions.com",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 120,
        "startYear": 2007
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2007
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2007
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "SF",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "2635",
    "name": "C M S College of Engineering",
    "address": "Emapuram Post, Namakkal District 637003",
    "district": "Namakkal",
    "taluk": "NAMAKKAL",
    "pincode": "637003",
    "email": "cmscollegeofengg@gmail.com",
    "website": "www.cmsgroupofinstitutions.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2007
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2007
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "2636",
    "name": "A V S Engineering College",
    "address": "Military Road, Ammapet, Salem District 636003",
    "district": "Salem",
    "taluk": "SALEM",
    "pincode": "636003",
    "email": "info@avsenggcollege.ac.in",
    "website": "www.avsenggcollege.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "2638",
    "name": "Mahendra Engineering College for Women",
    "address": "Kumaramangalam, Namakkal District 637205",
    "district": "Erode",
    "taluk": "THIRUCHENGODE",
    "pincode": "637205",
    "email": "principal@mecw.org",
    "website": "www.mecw.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ET",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "2639",
    "name": "Narasus Sarathy Institute of Technology",
    "address": "Poosaripatty Village, Omalur Taluk, Salem District 636305",
    "district": "Salem",
    "taluk": ", Salem",
    "pincode": "636305",
    "email": "principal@nsit.edu.in",
    "website": "www.nsit.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2640",
    "name": "Jayalakshmi Institute of Technology",
    "address": "Thoppur, Dharmapuri District 635352",
    "district": "Dharmapuri",
    "taluk": "Nallampalli",
    "pincode": "636352",
    "email": "jit.thoppur@gmail.com",
    "website": "www.jit.net.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2641",
    "name": "Varuvan Vadivelan Institute of Technology",
    "address": "Nallanahalli, Dharmapuri District 636701",
    "district": "Krishnagiri",
    "taluk": "Dharmapuri",
    "pincode": "636701",
    "email": "vvitprincipal@yahoo.in",
    "website": "www.vvitengineering.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2642",
    "name": "P S V College of Engineeering and Technology",
    "address": "Mittapalli, Balinayanapalli Post, Elathagiri, Krishnagiri District 635108",
    "district": "Krishnagiri",
    "taluk": "SIDCO BARGUR",
    "pincode": "635108",
    "email": "selvam.psv@gmail.com",
    "website": "www.psvcet.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "2643",
    "name": "Bharathiyar Institute of Engineering for Women",
    "address": "Deviayakurichi, Attur Taluk, Salem District 636112",
    "district": "Salem",
    "taluk": ", Salem",
    "pincode": "636112",
    "email": "bharathiyar@biew.ac.in",
    "website": "www.biew.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "2646",
    "name": "Tagore Institute of Engineering and Technology",
    "address": "Deviyakurichi, Attur Taluk, Salem District 636112",
    "district": "Salem",
    "taluk": ", Salem",
    "pincode": "636112",
    "email": "tagoreiet@yahoo.in",
    "website": "www.tagoreiet.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "2647",
    "name": "J K K Nataraja College of Engineering and Technology",
    "address": "Komarapalayam Amani, Thattankuttai Panchayat, Namakkal District 638183",
    "district": "Namakkal",
    "taluk": "KUMARAPALAYAM",
    "pincode": "638183",
    "email": "engg@jkkn.ac.in",
    "website": "https://engg.jkkn.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2648",
    "name": "Annaporna Engineering College",
    "address": "Sankari Main Road, NH-47, Periaseeragapadi, Salem District 636308",
    "district": "Salem",
    "taluk": "Salem",
    "pincode": "636308",
    "email": "principalaecsalem@gmail.com",
    "website": "www.aecsalem.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AU",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "2650",
    "name": "Christ the King Engineering College",
    "address": "Cecilia Gardens, Chikkarampalayam Village, Coimbatore District 641104",
    "district": "Coimbatore",
    "taluk": "METTUPALAYAM",
    "pincode": "641104",
    "email": "principal@ckec.ac.in",
    "website": "www.ckec.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "2651",
    "name": "Jai Shriram Engineering College",
    "address": "Dharapuram Road, Avinashi Palayam, Tiruppur District 638660",
    "district": "Tiruppur",
    "taluk": "Tirupur",
    "pincode": "638660",
    "email": "principal@jayshriram.edu.in",
    "website": "www.jayshriram.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "FT",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "2652",
    "name": "Al-Ameen Engineering College",
    "address": "Karundevan Palayam, Nanjai Uthukuli Post, Erode District 638104",
    "district": "Erode",
    "taluk": "ERODE",
    "pincode": "638104",
    "email": "alameenengg@yahoo.co.in",
    "website": "www.alameen.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "2653",
    "name": "Knowledge Institute of Technology",
    "address": "KIOT Campus, Kakapalayam Post, Salem District 637504",
    "district": "Salem",
    "taluk": "Salem",
    "pincode": "637504",
    "email": "principal@kiot.ac.in",
    "website": "www.kiot.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 2009
      },
      {
        "code": "CB",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "2656",
    "name": "Builders Engineering College",
    "address": "Erode Rode,Nathakadiyur, Kangeyam Taluk, Tiruppur District 638108",
    "district": "Erode",
    "taluk": ", Tiruppur",
    "pincode": "638108",
    "email": "info@builderscollege.edu.in",
    "website": "www.builderscollege.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "AD",
        "intake": 30,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "2657",
    "name": "Paavai College of Technology",
    "address": "NH-7, Pachal Post, Namakkal District 637018",
    "district": "Namakkal",
    "taluk": "NAMAKKAL",
    "pincode": "637018",
    "email": "pctprincipal@paavai.edu.in",
    "website": "http://pct.paavai.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "RM",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2658",
    "name": "V S A Group of Institutions",
    "address": "NH-47, Uthamasola Puram Post, Salem District 636010",
    "district": "Salem",
    "taluk": "Salem",
    "pincode": "636010",
    "email": "vsacollege@gmail.com",
    "website": "www.vsagroup.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2659",
    "name": "Salem College of Engineering and Technology",
    "address": "Salem-Attur Main Road, NH-68, Mettupatty Perumapalayam, Salem District 636111",
    "district": "Salem",
    "taluk": "VAZHAPPADY",
    "pincode": "636111",
    "email": "salemcollege09@gmail.com",
    "website": "www.salemcollege.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "2661",
    "name": "Vivekanandha College of Technology for Women",
    "address": "Sathinaickenpalayam, Elayampalayam Village, Kumaramangalam, Namakkal District 637205",
    "district": "Namakkal",
    "taluk": "TIRUCHENGODE",
    "pincode": "637205",
    "email": "principal@vctw.ac.in",
    "website": "www.vctw.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2016
      }
    ]
  },
  {
    "code": "2662",
    "name": "Dr. Nagarathinams College of Engineering",
    "address": "Anadhagoundam Palayam, Minakkal Post, Rasipuram, Namakkal District 637505",
    "district": "Namakkal",
    "taluk": "Rasipuram",
    "pincode": "637505",
    "email": "drnagaeng@gmail.com",
    "website": "www.drnaga.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2665",
    "name": "Mahendra Institute of Engineering and Technology",
    "address": "Mahendrapuri, Mallasamudram, Namakkal District 637503",
    "district": "Salem",
    "taluk": "Tiruchengode",
    "pincode": "637503",
    "email": "principal@miet.asia",
    "website": "www.miet.asia",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      },
      {
        "code": "PD",
        "intake": 120,
        "startYear": 2014
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "2667",
    "name": "Excel College of Architecture and Planning",
    "address": "Salem Main Road, Komarapalayam",
    "district": "Namakkal",
    "taluk": "KOMARAPALAYAM",
    "pincode": null,
    "email": "excelarch@gmail.com",
    "website": "Anti",
    "autonomous": false,
    "type": "self_financing",
    "branches": []
  },
  {
    "code": "2673",
    "name": "Sree Sakthi Engineering College",
    "address": "Bettathapuram, Bilichi Village, Karamadai, Coimbatore District 641104",
    "district": "Coimbatore",
    "taluk": "North Coimbatore",
    "pincode": "641104",
    "email": "principal@sreesakthi.edu.in",
    "website": "https://sreesakthi.edu.in/",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 90,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "2683",
    "name": "Shreenivasa Engineering College",
    "address": "B Pallipatti, Bommidi, Pappireddipatti Taluk, Dharmapuri District 635301",
    "district": "Dharmapuri",
    "taluk": ",",
    "pincode": "635301",
    "email": "principal205@gmail.com",
    "website": "www.shreenivasa.org.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "2702",
    "name": "Bannari Amman Institute of Technology (Autonomous)",
    "address": "Sathyamanagalam, Erode District 638401",
    "district": "Erode",
    "taluk": "Sathyamangalam",
    "pincode": "638401",
    "email": "stayahead@bitsathy.ac.in",
    "website": "www.bitsathy.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2015
      },
      {
        "code": "AU",
        "intake": 30,
        "startYear": 2014
      },
      {
        "code": "AD",
        "intake": 120,
        "startYear": 2020
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "BT",
        "intake": 120,
        "startYear": 2003
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "CB",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "CT",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "EC",
        "intake": 240,
        "startYear": 1998
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 1996
      },
      {
        "code": "MC",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1996
      },
      {
        "code": "TX",
        "intake": 60,
        "startYear": 1996
      },
      {
        "code": "AL",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "2704",
    "name": "Coimbatore Institute of Engineering and Technolgoy (Autonomous)",
    "address": "Narasipuram Post, Coimbatore District 641109",
    "district": "Coimbatore",
    "taluk": "Perur",
    "pincode": "641109",
    "email": "info@cietcbe.edu.in",
    "website": "www.cietcbe.edu.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "MC",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2705",
    "name": "C S I College of Engineering",
    "address": "Ketti, The Nilgiris 643215",
    "district": "Nilgiris",
    "taluk": "Coonoor",
    "pincode": "643215",
    "email": "principal@csice.edu.in",
    "website": "www.csice.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1998
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1998
      }
    ]
  },
  {
    "code": "2706",
    "name": "Dr. Mahalingam College of Engineering and Technology (Autonomous)",
    "address": "Mackinaickenpatti Post, Pollachi Taluk, Coimbatore District 642003",
    "district": "Coimbatore",
    "taluk": ", Coimbatore",
    "pincode": "642003",
    "email": "principal@drmcet.ac.in",
    "website": "www.mcet.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AU",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 1998
      },
      {
        "code": "EI",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1998
      },
      {
        "code": "IT",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 2002
      }
    ]
  },
  {
    "code": "2707",
    "name": "Erode Sengunthar Engineering College (Autonomous)",
    "address": "Thudupathi Post, Erode District 638057",
    "district": "Erode",
    "taluk": "PERUNDURAI",
    "pincode": "638057",
    "email": "esecprincipal@gmail.com",
    "website": "www.erode-sengunthar.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "ME",
        "intake": 60,
        "startYear": 1996
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1996
      },
      {
        "code": "CH",
        "intake": 90,
        "startYear": 1996
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 2000
      },
      {
        "code": "EI",
        "intake": 30,
        "startYear": 2001
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "AD",
        "intake": 120,
        "startYear": 2020
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "RM",
        "intake": 30,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "2708",
    "name": "Hindusthan College of Engineering and Technology (Autonomous)",
    "address": "Othakkalmandapam Post, Coimbatore District 641032",
    "district": "Coimbatore",
    "taluk": "COIMBATORE SOUTH",
    "pincode": "641032",
    "email": "principal@hicet.ac.in",
    "website": "www.hindusthan.net",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 60,
        "startYear": 2004
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "AL",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "AU",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CH",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2000
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EI",
        "intake": 30,
        "startYear": 2011
      },
      {
        "code": "FD",
        "intake": 60,
        "startYear": 2018
      }
    ]
  },
  {
    "code": "2709",
    "name": "Government Engineering College",
    "address": "Erode District 638316",
    "district": "Erode",
    "taluk": "ERODE",
    "pincode": "638316",
    "email": "irttprincipal@yahoo.com",
    "website": "www.irttech.ac.in",
    "autonomous": false,
    "type": "government",
    "branches": [
      {
        "code": "AU",
        "intake": 60,
        "startYear": 1984
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 1984
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 1984
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1986
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1994
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1984
      }
    ]
  },
  {
    "code": "2710",
    "name": "Karpagam College of Engineering (Autonomous)",
    "address": "Othakkalmandapam, Coimbatore District 641032",
    "district": "Coimbatore",
    "taluk": "COIMBATORE SOUTH",
    "pincode": "641032",
    "email": "office@kce.ac.in",
    "website": "http://www.kce.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 2000
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 2000
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 2002
      },
      {
        "code": "ET",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "IT",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2000
      },
      {
        "code": "TS",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "AD",
        "intake": 120,
        "startYear": 2020
      },
      {
        "code": "SC",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "2711",
    "name": "Kongu Engineering College (Autonomous)",
    "address": "Perundurai, Erode District 638052",
    "district": "Erode",
    "taluk": "Perundurai",
    "pincode": "638060",
    "email": "principal@kongu.edu",
    "website": "www.kongu.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AU",
        "intake": 60,
        "startYear": 2015
      },
      {
        "code": "CE",
        "intake": 120,
        "startYear": 1984
      },
      {
        "code": "CS",
        "intake": 240,
        "startYear": 1988
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 1994
      },
      {
        "code": "FD",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "IT",
        "intake": 120,
        "startYear": 1998
      },
      {
        "code": "MC",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "AL",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "CH",
        "intake": 120,
        "startYear": 1994
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1984
      }
    ]
  },
  {
    "code": "2712",
    "name": "Kumaraguru College of Technology (Autonomous)",
    "address": "Chinnavedampatti Post, Coimbatore District 641049",
    "district": "Coimbatore",
    "taluk": "Coimbatore North",
    "pincode": "641049",
    "email": "principal@kct.ac.in",
    "website": "www.kct.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "AU",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "CE",
        "intake": 120,
        "startYear": 1984
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1986
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 1986
      },
      {
        "code": "EI",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "FT",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1984
      }
    ]
  },
  {
    "code": "2713",
    "name": "M P Nachimuthu M Jagannathan Engineering College",
    "address": "Chennimalai, Erode District 638112",
    "district": "Erode",
    "taluk": "Perundurai",
    "pincode": "638112",
    "email": "mpnmjec@mpnmjec.ac.in",
    "website": "www.mpnmjec.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2001
      }
    ]
  },
  {
    "code": "2715",
    "name": "Nandha Engineering College (Autonomous)",
    "address": "Pitchandampalayam Post, Erode District 638052",
    "district": "Erode",
    "taluk": "Erode",
    "pincode": "638052",
    "email": "principal@nandhaengg.org",
    "website": "www.nandhaengg.org",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2017
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CH",
        "intake": 60,
        "startYear": 2017
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "2716",
    "name": "Park College of Engineering and Technology",
    "address": "Kaniyur, Coimbatore District 641659",
    "district": "Coimbatore",
    "taluk": "SULUR",
    "pincode": "641659",
    "email": "info@park.ac.in",
    "website": "www.pcet.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 120,
        "startYear": 1997
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1997
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "IT",
        "intake": 90,
        "startYear": 1999
      },
      {
        "code": "TX",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "MR",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "MC",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "RM",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "MD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "2717",
    "name": "Sasurie College of Engineering",
    "address": "Vijayamangalam, Tiruppur District 638056",
    "district": "Tiruppur",
    "taluk": "uthukulli",
    "pincode": "638056",
    "email": "sceoffice@sasurie.com",
    "website": "www.sasurie.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2003
      },
      {
        "code": "RM",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "2718",
    "name": "Sri Krishna College of Enginering and Technology (Autonomous)",
    "address": "Kuniamuthur, Coimbatore District 641008",
    "district": "Coimbatore",
    "taluk": "COIMBATORE (SOUTH)",
    "pincode": "641008",
    "email": "principal@skcet.ac.in",
    "website": "www.skcet.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 1998
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "IT",
        "intake": 180,
        "startYear": 1998
      },
      {
        "code": "CB",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "MC",
        "intake": 120,
        "startYear": 2000
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1998
      }
    ]
  },
  {
    "code": "2719",
    "name": "Sri Ramakrishna Engineering College (Autonomous)",
    "address": "Vattamalaipalayam, Coimbatore District 641022",
    "district": "Coimbatore",
    "taluk": "Coimbatore North",
    "pincode": "641022",
    "email": "office@srec.ac.in",
    "website": "www.srec.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 1994
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 1994
      },
      {
        "code": "EE",
        "intake": 90,
        "startYear": 1994
      },
      {
        "code": "EI",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 90,
        "startYear": 1994
      },
      {
        "code": "RM",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CJ",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "2721",
    "name": "Tamilnadu College of Engineering",
    "address": "Karumathampatti Post, Coimbatore District 641659",
    "district": "Coimbatore",
    "taluk": "COIMBATORE",
    "pincode": "641659",
    "email": "tce@tnce.in",
    "website": "www.tnce.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AU",
        "intake": 30,
        "startYear": 2006
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 1984
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1988
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1988
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2006
      },
      {
        "code": "IC",
        "intake": 30,
        "startYear": 1984
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 1984
      }
    ]
  },
  {
    "code": "2722",
    "name": "Sri Krishna College of Technology (Autonomous)",
    "address": "Kovaipudur Post, Coimbatore District 641042",
    "district": "Coimbatore",
    "taluk": "COIMBATORE SOUTH",
    "pincode": "641042",
    "email": "info@skct.edu.in",
    "website": "www.skct.edu.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 1985
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 1985
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 2000
      },
      {
        "code": "IC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "IT",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1985
      }
    ]
  },
  {
    "code": "2723",
    "name": "Velalar College of Engineering and Technology (Autonomous)",
    "address": "Thindal Post, Erode District 638009",
    "district": "Erode",
    "taluk": "Erode",
    "pincode": "638012",
    "email": "principal@velalarengg.ac.in",
    "website": "www.velalarengg.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "BM",
        "intake": 120,
        "startYear": 2005
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 2001
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "MD",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "2725",
    "name": "Sri Ramakrishna Institute of Technology (Autonomous)",
    "address": "Pachapalayam, Coimbatore District 641010",
    "district": "Coimbatore",
    "taluk": "Coimbatore",
    "pincode": "641010",
    "email": "principal@srit.org",
    "website": "www.srit.org",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 180,
        "startYear": 2002
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 2005
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2006
      }
    ]
  },
  {
    "code": "2726",
    "name": "SNS College of Technology (Autonomous)",
    "address": "Kalappatti Post, Coimbatore District 641035",
    "district": "Coimbatore",
    "taluk": "COIMBATORE SOUTH",
    "pincode": "641035",
    "email": "snsct@snsgroups.com",
    "website": "www.snsgroups.com",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AO",
        "intake": 30,
        "startYear": 2020
      },
      {
        "code": "AU",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2016
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2016
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 2002
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2005
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "MC",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "FD",
        "intake": 60,
        "startYear": 2019
      }
    ]
  },
  {
    "code": "2727",
    "name": "Sri Shakthi Institute of Engineering and Technology (Autonomous)",
    "address": "L&T Bye-Pass, Venkitapuram Post, Comibatore District 641062",
    "district": "Coimbatore",
    "taluk": "Sulur",
    "pincode": "641062",
    "email": "principal@siet.ac.in",
    "website": "www.siet.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AG",
        "intake": 120,
        "startYear": 2015
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2016
      },
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2016
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2006
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2006
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "FD",
        "intake": 60,
        "startYear": 2016
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "AL",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "2728",
    "name": "Tamilnadu School of Architecture",
    "address": "Karumathampatti Post, Coimbatore District 641659",
    "district": "Coimbatore",
    "taluk": "Sulur",
    "pincode": "641659",
    "email": "info@gmail.com",
    "website": "www.tnsa.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 40,
        "startYear": 2006
      }
    ]
  },
  {
    "code": "2729",
    "name": "Nehru Institute of Engineering and Technology",
    "address": "Thirumalayampalayam Post, Coimbatore District 641105",
    "district": "Coimbatore",
    "taluk": "Coimbatore (south)",
    "pincode": "641105",
    "email": "admissions@nehrucolleges.com",
    "website": "www.nehrucolleges.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 120,
        "startYear": 2006
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 2006
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "MC",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "2731",
    "name": "R V S College of Engineering and Technology",
    "address": "Kannampalayam, Sulur, Coimbatore District 641402",
    "district": "Coimbatore",
    "taluk": "sulur",
    "pincode": "641402",
    "email": "principal@rvscet.ac.in",
    "website": "www.rvscet.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "PD",
        "intake": 60,
        "startYear": 2013
      }
    ]
  },
  {
    "code": "2733",
    "name": "Angel College of Engineering and Technology",
    "address": "P.K.Palayam, Ugayanur Village, Tirupur District 641 665",
    "district": "Karur",
    "taluk": "Ugayanur",
    "pincode": "641665",
    "email": "principal@angelcollege.edu.in",
    "website": "www.angelcollege.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "FT",
        "intake": 60,
        "startYear": 2007
      }
    ]
  },
  {
    "code": "2734",
    "name": "SNS College of Engineering",
    "address": "Sathy Main Road, Kurumbapalayam Post, Coimbatore District 641107 (Autonomous)",
    "district": "Coimbatore",
    "taluk": "COIMBATORE NORTH",
    "pincode": "641107",
    "email": "principalsnsce@gmail.com",
    "website": "www.snsce.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "MO",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "TS",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "SB",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CD",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "2735",
    "name": "Karpagam Institute of Technology",
    "address": "Seerapalayam Village, L&T By pass Road, Coimbatore District 641021",
    "district": "Coimbatore",
    "taluk": "Madukarai",
    "pincode": "641105",
    "email": "principalkit@gmail.com",
    "website": "www.karpagamtech.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2736",
    "name": "Dr. N G P Institute of Technology",
    "address": "Kalapatti Road, Coimbatore District 641035",
    "district": "Coimbatore",
    "taluk": "Coimbatore North",
    "pincode": "641048",
    "email": "principal@drngpit.ac.in",
    "website": "www.drngpit.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "BM",
        "intake": 120,
        "startYear": 2012
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2007
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2007
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2007
      }
    ]
  },
  {
    "code": "2737",
    "name": "Sri Sai Ranganathan Engineering College",
    "address": "Zahirnaickenpalayam Village, Viraliyur Post, Thondamuthur Via, Coimbatore District 641109",
    "district": "Coimbatore",
    "taluk": "Perur",
    "pincode": "641109",
    "email": "rec.cbe@gmail.com",
    "website": "www.reccbe.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2007
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 2007
      }
    ]
  },
  {
    "code": "2739",
    "name": "Sri Eshwar College of Engineering (Autonomous)",
    "address": "Kondampatti Post, Vadasithur (Via), Kinathukadavu, Coimbatore District 641202",
    "district": "Coimbatore",
    "taluk": "Kinathukadavu",
    "pincode": "641202",
    "email": "sece@sece.ac.in",
    "website": "www.sece.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 180,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "CO",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "2740",
    "name": "Hindustan Institute of Technology",
    "address": "Othakkalmandapam, Coimbatore District 641032",
    "district": "Coimbatore",
    "taluk": "SOUTH",
    "pincode": "641032",
    "email": "hitprincipal@hindusthan.net",
    "website": "www.hit.edu.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2007
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2007
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "PH",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "2741",
    "name": "P A College of Engineering and Technology (Autonomous)",
    "address": "Palladam Road, Pollachi, Coimbatore District 642002",
    "district": "Coimbatore",
    "taluk": "Pollachi",
    "pincode": "642002",
    "email": "pacollege@yahoo.com",
    "website": "https://www.pacolleges.org",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2743",
    "name": "Dhanalakshmi Srinivasan College of Engineering",
    "address": "NH47, Palakkad Main Road, Navakkarai Post, Near Nandhi Temple, Coimbatore District 641105",
    "district": "Coimbatore",
    "taluk": "Madukkarai",
    "pincode": "641105",
    "email": "dscollegecbe@gmail.com",
    "website": "www.dsce.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "AD",
        "intake": 120,
        "startYear": 2020
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 2008
      },
      {
        "code": "FD",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "2744",
    "name": "Adithya Institute of Technology",
    "address": "Kurumbapalayam Village, Coimbatore District 641107",
    "district": "Coimbatore",
    "taluk": "Coimbatore",
    "pincode": "641107",
    "email": "principal@adithyatech.com",
    "website": "www.adithyatech.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "2745",
    "name": "Kathir College of Engineering",
    "address": "Neelambur, Avinashi Road, Coimbatore District 641062",
    "district": "Coimbatore",
    "taluk": "Sulur",
    "pincode": "641062",
    "email": "kathirce@gmail.com",
    "website": "www.kathir.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2747",
    "name": "Shree Venkateshwara Hi-Tech Engineering College",
    "address": "Othakuthirai, K Mettupalayam Post, Gobichettipalayam, Erode District 638455",
    "district": "Erode",
    "taluk": "Gobichettipalayam",
    "pincode": "638455",
    "email": "svhecgobi@gmail.com",
    "website": "www.svhec.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2748",
    "name": "Surya Engineering College",
    "address": "Mettukadai, Kathirampatti Post, Erode District 638107",
    "district": "Erode",
    "taluk": "Erode",
    "pincode": "638107",
    "email": "secerode@gmail.com",
    "website": "www.surya.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 90,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2749",
    "name": "EASA College of Engineering and Technology",
    "address": "NH-47, Coimbatore-Palakkad Main Road, Navakarai Post, Coimbatore District 641105",
    "district": "Coimbatore",
    "taluk": "Madukkarai",
    "pincode": "641105",
    "email": "easaprincipal@gmail.com",
    "website": "www.easacollege.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "EC",
        "intake": 45,
        "startYear": 2008
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "PE",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2750",
    "name": "KIT-Kalaignar Karunanidhi Institute of Technology (Autonomous)",
    "address": "Kannampalayam, Coimbatore District 641402",
    "district": "Coimbatore",
    "taluk": "Sulur",
    "pincode": "641402",
    "email": "principal@kitcbe.com",
    "website": "www.kitcbe.com",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2017
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2017
      },
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2017
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "CB",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "2751",
    "name": "KGISL Institute of Technology",
    "address": "KGISL Campus, Thudiyalur Road, Saravanampatti, Coimbatore District 641035",
    "district": "Coimbatore",
    "taluk": "coimbatore",
    "pincode": "641035",
    "email": "info@kgkite.ac.in",
    "website": "www.kgkite.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CB",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "AD",
        "intake": 120,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "2752",
    "name": "Nandha College of Technology",
    "address": "Pitchandampalayam Post, Erode District 638052",
    "district": "Erode",
    "taluk": "ERODE",
    "pincode": "638052",
    "email": "principal@nandhatech.org",
    "website": "www.nandhatech.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 90,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "2753",
    "name": "P P G Institute of Technology",
    "address": "Vilankurichi Village, Coimbatore District 641035",
    "district": "Coimbatore",
    "taluk": "COIMBATORE (NORTH)",
    "pincode": "641035",
    "email": "ppgit@ppg.edu.in",
    "website": "www.ppg.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2755",
    "name": "Nehru Institute of Technology",
    "address": "Thirumalayampalayam Post, Coimbatore District 641105",
    "district": "Coimbatore",
    "taluk": "Coimbatore (south)",
    "pincode": "641105",
    "email": "admissions@nehrucolleges.com",
    "website": "www.nehrucolleges.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "FD",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2019
      }
    ]
  },
  {
    "code": "2758",
    "name": "J K K Muniraja College of Technology",
    "address": "T N Palayam, Gobi Taluk, Erode District 638506",
    "district": "Erode",
    "taluk": ", Erode",
    "pincode": "638506",
    "email": "principal309@gmail.com",
    "website": "www.jkkmct.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "AU",
        "intake": 30,
        "startYear": 2013
      }
    ]
  },
  {
    "code": "2759",
    "name": "McGans Ooty School Of Architecture",
    "address": "Summer House Road, Ooty, The Nilgiris 643001",
    "district": "Nilgiris",
    "taluk": "Ooty",
    "pincode": "643002",
    "email": "ootyarchitecture@gmail.com",
    "website": "mcgansarch.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 80,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "2761",
    "name": "United Institute of Technology",
    "address": "Gadalore Village, Perianaickenpalayam, Coimbatore District 641020",
    "district": "Coimbatore",
    "taluk": "Coimbatore North",
    "pincode": "641020",
    "email": "info@uit.ac.in",
    "website": "www.uit.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "RM",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "2762",
    "name": "Jansons Institute of Technology",
    "address": "Karumathampatty, Somaur, Coimbatore District 641659",
    "district": "Coimbatore",
    "taluk": "Sulur",
    "pincode": "641659",
    "email": "info@jit.ac.in",
    "website": "www.jit.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 90,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "2763",
    "name": "Akshaya College of Engineering and Technology",
    "address": "Kinathukadavu, Coimbatore District 642109",
    "district": "Coimbatore",
    "taluk": "KINATHUKADAVU",
    "pincode": "642109",
    "email": "info@acetcbe.edu.in",
    "website": "www.acetcbe.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "MC",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2764",
    "name": "K P R Institute of Engineering and Technology",
    "address": "Kollupalayam Village, Arasur Panchayat, Coimbatore District 641407",
    "district": "Coimbatore",
    "taluk": "Sulur",
    "pincode": "641407",
    "email": "principal@kpriet.ac.in",
    "website": "kpriet.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2017
      },
      {
        "code": "CH",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "CE",
        "intake": 120,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2767",
    "name": "SRG Engineering College",
    "address": "Aniyapuram Post, Namakkal District 637017",
    "district": "Namakkal",
    "taluk": "MOHANUR",
    "pincode": "637017",
    "email": "srgengg@gmail.com",
    "website": "www.srgec.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "BM",
        "intake": 30,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "2768",
    "name": "Park College of Technology",
    "address": "Prema Ravi Nagar, Karumathampatty, Coimbatore District 641059",
    "district": "Coimbatore",
    "taluk": "Sulur",
    "pincode": "641659",
    "email": "principal@pct.ac.in",
    "website": "www.pct.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AO",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EN",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2769",
    "name": "J C T College of Engineering and Technology",
    "address": "Pichanur, Coimbatore District 641105",
    "district": "Coimbatore",
    "taluk": "Coimbatore South",
    "pincode": "641105",
    "email": "info@jct.ac.in",
    "website": "www.jct.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "PD",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CB",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "PE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "2770",
    "name": "Study World College of Engineering",
    "address": "Coimbatore",
    "district": "Coimbatore",
    "taluk": "Madukkarai",
    "pincode": "641105",
    "email": "principal-swce@swehg.com",
    "website": "www.swehg.com/swce",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "2772",
    "name": "C M S College of Engineering and Technology",
    "address": "Appachigoundenpathy, Kumittipatti, Coimbatore District 641105",
    "district": "Coimbatore",
    "taluk": "Madukkarai",
    "pincode": "641032",
    "email": "cmscet@gmail.com",
    "website": "www.cmscet.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "2776",
    "name": "R V S Technical Campus-Coimbatore",
    "address": "Kumaran Kottam Campus, Kannampalayam, Sulur, Coimbatore District 641 402",
    "district": "Coimbatore",
    "taluk": "Sulur",
    "pincode": "641402",
    "email": "rvsetgi@rvsgroup.com",
    "website": "rvstcc.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "MC",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "AU",
        "intake": 60,
        "startYear": 2013
      }
    ]
  },
  {
    "code": "2779",
    "name": "Ranganathan Architecture College",
    "address": "Viraliyur Post, Thondamuthur Via, Coimbatore District 641109",
    "district": "Coimbatore",
    "taluk": "Coimbatore South",
    "pincode": "641109",
    "email": "raccbe2010@gmail.com",
    "website": "http://www.raccbe.ac.in/",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 80,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "3011",
    "name": "University College of Engineering",
    "address": "BIT Campus,Anna university ,Tiruchirappalli District 620024",
    "district": "Tiruchirappalli",
    "taluk": "Thiruverumbeur",
    "pincode": "620024",
    "email": "deanbitautrichy@gmail.com",
    "website": "www.aubit.edu.in",
    "autonomous": false,
    "type": "constituent",
    "branches": [
      {
        "code": "AU",
        "intake": 60,
        "startYear": 2004
      },
      {
        "code": "BT",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2006
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2006
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 2007
      },
      {
        "code": "IT",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "PH",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "XC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "XM",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CE",
        "intake": 120,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "3016",
    "name": "University College of Engineering",
    "address": "Ariyalur, Kathankudikadu Village, Thelur Post, Ariyalur District 621704",
    "district": "Ariyalur",
    "taluk": "Ariyalur",
    "pincode": "621704",
    "email": "deanucea@gmail.com",
    "website": "https://www.auucea.edu.in",
    "autonomous": false,
    "type": "constituent",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "XC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "XM",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "3018",
    "name": "University College of Engineering",
    "address": "Thirukkuvalai, Nagappattinam District 610204",
    "district": "Nagapattinam",
    "taluk": "Thirukkuvalai Thiruvarur",
    "pincode": "610204",
    "email": "No",
    "website": "www.aucetk.edu.in",
    "autonomous": null,
    "type": "constituent",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "XM",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "3019",
    "name": "University College of Engineering",
    "address": "Panruti, Chennai-Kumbakonam Highway, Panikkankuppam, Panruti, Cuddalore District 607106",
    "district": "Chennai",
    "taluk": "PANRUTI",
    "pincode": "607106",
    "email": "deanpanruti@annauniv.edu",
    "website": "www.ucep.edu.in",
    "autonomous": false,
    "type": "constituent",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "XC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "XM",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "3021",
    "name": "University College of Engineering",
    "address": "Pattukkottai, ECR Road, Rajamadam, Pattukkottai Taluk, Thanjavur District 614701",
    "district": "Thanjavur",
    "taluk": ", Thanjavur",
    "pincode": "614701",
    "email": "deanucepattukkottai@gmail.com",
    "website": "www.aucepkt.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2015
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "XC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "XM",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "3410",
    "name": "Krishnaswamy Collge of Engineering and Technology",
    "address": "S Kumarapuram, Cuddalore District 607109",
    "district": "Cuddalore",
    "taluk": "Cuddalore",
    "pincode": "607109",
    "email": "kcet.skret@gmail.com",
    "website": "www.kcet.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2005
      }
    ]
  },
  {
    "code": "3425",
    "name": "C K College of Engineering and Technology",
    "address": "Chellangkuppam, Cuddalore District 607003",
    "district": "Cuddalore",
    "taluk": "CUDDALORE",
    "pincode": "607003",
    "email": "principal@ckcet.com",
    "website": "ckcet.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "ME",
        "intake": 90,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "3446",
    "name": "Prime College of Architecture and Planning",
    "address": "Main Road, Kilvelur, Nagapattinam District 611104",
    "district": "Nagapattinam",
    "taluk": "Nagapattinam",
    "pincode": "611104",
    "email": "primearch2010@gmail.com",
    "website": "primearch.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 80,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "3451",
    "name": "SMR East Coast College of Engineering & Technology",
    "address": "East Coast Road, Somanathapattinam, Thanjavur District 614612",
    "district": "Thanjavur",
    "taluk": "PERAVURANI",
    "pincode": "614612",
    "email": "collegesmr@gmail.com",
    "website": "https://www.smrcet.org/",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 15,
        "startYear": 2010
      },
      {
        "code": "CE",
        "intake": 15,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 15,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "3454",
    "name": "Sri Ramakrishna College of Engineering",
    "address": "Sri Saradha Nagar, NH-45, Perambalur District 621113",
    "district": "Perambalur",
    "taluk": "Perambalur",
    "pincode": "621113",
    "email": "sriramakrishnaengg@gmail.com",
    "website": "www.sriramakrishna.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "3456",
    "name": "K S K College of Engineering and Technology",
    "address": "Thanjavur Main Road, Darasuram, Kumbakonam, Thanjavur District 612702",
    "district": "Thanjavur",
    "taluk": "KUMBAKONAM",
    "pincode": "612702",
    "email": "kskenggprincipal@gmail.com",
    "website": "www.kskcet.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2017
      }
    ]
  },
  {
    "code": "3460",
    "name": "Surya College of Engineering",
    "address": "Konalai, Tiruchirappalli District 621132",
    "district": "Tiruchirappalli",
    "taluk": "Mannachanallur",
    "pincode": "620105",
    "email": "sureyacollege@gmail.com",
    "website": "www.suyaengg.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "3461",
    "name": "Arifa Institute of Techonology",
    "address": "Esanoor, Keelaiyur Post, Thirukkuvalai Taluk, Nagapattinam District 611103",
    "district": "Nagapattinam",
    "taluk": ",",
    "pincode": "611103",
    "email": "arifaprincipal@gmail.com",
    "website": "https://www.aitech.org.in/",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 54,
        "startYear": 2013
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2013
      },
      {
        "code": "EE",
        "intake": 54,
        "startYear": 2013
      },
      {
        "code": "ME",
        "intake": 54,
        "startYear": 2013
      }
    ]
  },
  {
    "code": "3464",
    "name": "Government College of Engineering",
    "address": "Gandarvakottai Road, Sengipatti, Thanjavur District 613402",
    "district": "Thanjavur",
    "taluk": "Budalur",
    "pincode": "613402",
    "email": "gcesengipatti@gmail.com",
    "website": "www.gcetj.edu.in",
    "autonomous": false,
    "type": "government",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2013
      }
    ]
  },
  {
    "code": "3465",
    "name": "Government College of Engineering",
    "address": "Srirangam, Sethurappatti, Trichy District 620 012",
    "district": "Tiruchirappalli",
    "taluk": "Srirangam",
    "pincode": "620012",
    "email": "principal@gces.edu.in",
    "website": "www.gces.edu.in",
    "autonomous": false,
    "type": "government",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2013
      }
    ]
  },
  {
    "code": "3466",
    "name": "Nelliandavar Institute of Technology",
    "address": "Nerunjikorai Village, Pudhupalayam, Ariyalur Taluk, Ariyalur District 621704",
    "district": "Ariyalur",
    "taluk": ", Ariyalur",
    "pincode": "621704",
    "email": "nelliandavar@gmail.com",
    "website": "www.nite.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "3467",
    "name": "Prime Nest College of Architecture and Planning",
    "address": "V.J.P. Campus, Trichy-Chennai Highway, Navaladiyan Nagar, Siruganur, Tiruchirappalli District 621105",
    "district": "Chennai",
    "taluk": "Mannachanallur",
    "pincode": "621105",
    "email": "primenestindia@gmail.com",
    "website": "www.primenest.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 40,
        "startYear": 2015
      }
    ]
  },
  {
    "code": "3701",
    "name": "K Ramakrishnan College of Technology",
    "address": "(Autonomous) Kariyamanickam Road, Samayapuram, Manachanallur Taluk, Tiruchirappalli District 621112",
    "district": "Tiruchirappalli",
    "taluk": ", Tiruchirappalli",
    "pincode": "621112",
    "email": "principalkrct@gmail.com",
    "website": "www.krct.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2010
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "AL",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "3760",
    "name": "Sir Issac Newton College of Engineering and Technology",
    "address": "Anthanapeetai Post, Papakoil, Nagappattinam District 611102",
    "district": "Nagapattinam",
    "taluk": "Nagapattinam",
    "pincode": "611102",
    "email": "principalsincet@gmail.com",
    "website": "www.sinc.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "3766",
    "name": "Star Lion College of Engineering & Technology",
    "address": "Manankorai Main Road, Manankorai Village, Thanjavur District 614206",
    "district": "Thanjavur",
    "taluk": "Thanjavur",
    "pincode": "614206",
    "email": "starlionengineering@gmail.com",
    "website": "www.starlionengineering.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2013
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "3782",
    "name": "OASYS Institute of Technology",
    "address": "Pulivalam Village, Musiri Taluk, Tiruchirappalli District 626001",
    "district": "Tiruchirappalli",
    "taluk": ", Tiruchirappalli",
    "pincode": "621006",
    "email": "principal@oasys.edu.in",
    "website": "www.oasys.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "3783",
    "name": "M.A.M. School of Architecture",
    "address": "Siruganur, Tiruchirappalli District 621105",
    "district": "Tiruchirappalli",
    "taluk": "MANACHANALLUR",
    "pincode": "621105",
    "email": "directormamsa@gmail.com",
    "website": "www.mamsa.co.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 40,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "3784",
    "name": "CARE School of Architecture",
    "address": "Engineering, Thayanoor Village, Kuttappatti, Srirangam Taluk, Tiruchirappalli District 620009",
    "district": "Tiruchirappalli",
    "taluk": ", Tiruchirappalli",
    "pincode": "620009",
    "email": "directore.arch@care.ac.in",
    "website": "www.care.ac.in/architecture",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 80,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "3786",
    "name": "M.A.M. School of Engineering",
    "address": "Siruganur, Tiruchirappalli District 621105",
    "district": "Tiruchirappalli",
    "taluk": "Manachanallur (Tk)",
    "pincode": "621105",
    "email": "mamschoolengg@yahoo.in",
    "website": "www.mamse.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "AE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "MC",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "3795",
    "name": "SRM TRP Engineering College",
    "address": "Irungalur, Manachanallur Taluk, Tiruchirappalli District 621105",
    "district": "Tiruchirappalli",
    "taluk": ", Tiruchirappalli",
    "pincode": "621105",
    "email": "principal@trp.srmtrichy.edu.in",
    "website": "https://trp.srmtrichy.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "3801",
    "name": "A V C College of Engineering",
    "address": "Mannampandal Post, Mayiladuthurai, Nagappattinam District 609305",
    "district": "Nagapattinam",
    "taluk": "Mayiladuthurai",
    "pincode": "609305",
    "email": "avcce@avccengg.net",
    "website": "www.avccengg.net",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1996
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1996
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "IC",
        "intake": 30,
        "startYear": 2001
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 1996
      }
    ]
  },
  {
    "code": "3802",
    "name": "Shri Angalamman College of Engineering and Technology Siruganoor",
    "address": "Tiruchirappalli District 621105",
    "district": "Tiruchirappalli",
    "taluk": "MANACHANALLUR",
    "pincode": "621105",
    "email": "admin@sacet.edu.in",
    "website": "WWW.SACET.EDU.IN.",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1993
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2012
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 1991
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1991
      }
    ]
  },
  {
    "code": "3803",
    "name": "Anjalai Ammal-Mahalingam Engineering College",
    "address": "Kovilvenni, Thiruvarur District 614403",
    "district": null,
    "taluk": "Needamangalam",
    "pincode": "614403",
    "email": "principal@aamec.edu.in",
    "website": "www.aamec.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CH",
        "intake": 60,
        "startYear": 1996
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "CS",
        "intake": 90,
        "startYear": 1995
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 1995
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1996
      },
      {
        "code": "IT",
        "intake": 90,
        "startYear": 1999
      },
      {
        "code": "ME",
        "intake": 90,
        "startYear": 1995
      }
    ]
  },
  {
    "code": "3804",
    "name": "Arasu Engineering College",
    "address": "Chennai Main Road, Kumbakonam, Thanjavur District 612501",
    "district": "Chennai",
    "taluk": "Thiruvidaimaruthur",
    "pincode": "612501",
    "email": "arasuengg@aec.org.in",
    "website": "www.aec.org.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "AU",
        "intake": 30,
        "startYear": 2014
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2007
      },
      {
        "code": "CS",
        "intake": 96,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 48,
        "startYear": 2002
      },
      {
        "code": "ME",
        "intake": 96,
        "startYear": 2005
      }
    ]
  },
  {
    "code": "3805",
    "name": "Dhanalakshmi Srinivasan Engineering College",
    "address": "Thuraiyur Road, Perambalur District 621212",
    "district": "Karur",
    "taluk": "PERAMBALUR",
    "pincode": "621212",
    "email": "principal@dsengg.ac.in",
    "website": "WWW.dsengg.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "AO",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "CE",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 2001
      },
      {
        "code": "RM",
        "intake": 60,
        "startYear": 2017
      },
      {
        "code": "FD",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "BM",
        "intake": 120,
        "startYear": 2005
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 2002
      }
    ]
  },
  {
    "code": "3806",
    "name": "E G S Pillay Engineering College (Autonomous)",
    "address": "Nagapattinam District 611002",
    "district": "Nagapattinam",
    "taluk": "Nagapattinam",
    "pincode": "611002",
    "email": "principal.egspec@gmail.com",
    "website": "www.egspec.org",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CB",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1995
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2004
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2000
      }
    ]
  },
  {
    "code": "3807",
    "name": "J J College of Engineering and Technology",
    "address": "Poolankulathupatti Post, Thiruchirappalli District 620009",
    "district": "Tiruchirappalli",
    "taluk": "Srirangam",
    "pincode": "620009",
    "email": "principal@jjcet.ac.in",
    "website": "www.jjcet.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 30,
        "startYear": 2007
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2004
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1994
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 1996
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1994
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1994
      }
    ]
  },
  {
    "code": "3808",
    "name": "Jayaram College of Engineering and Technology",
    "address": "Pagalavadi Post, Tiruchirappalli District 621014",
    "district": "Tiruchirappalli",
    "taluk": "Thuraiyur",
    "pincode": "621014",
    "email": "principal@jayaramcet.edu.in",
    "website": "www.jayaramcet.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1994
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1994
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 1996
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 1994
      }
    ]
  },
  {
    "code": "3809",
    "name": "Kurinji College of Engineering and Technology",
    "address": "Manapparai, Tiruchirappalli District 621307",
    "district": "Tiruchirappalli",
    "taluk": "MANAPPARAI",
    "pincode": "621307",
    "email": "kcet@kurinjiengg.org",
    "website": "www.kurinjiengg.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 45,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2001
      }
    ]
  },
  {
    "code": "3810",
    "name": "M.A.M. College of Engineering",
    "address": "Siruganur, Tiruchirappalli District 621105",
    "district": "Chennai",
    "taluk": "Manachanallur",
    "pincode": "621105",
    "email": "principalmamce@mamce.org",
    "website": "www.mamce.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 150,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EE",
        "intake": 90,
        "startYear": 1998
      },
      {
        "code": "EI",
        "intake": 30,
        "startYear": 1998
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2005
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "3811",
    "name": "M I E T Engineering College",
    "address": "Trichy-Pudukkottai Road, Tiruchirappalli District 620007",
    "district": "Tiruchirappalli",
    "taluk": "Tiruverumbur",
    "pincode": "620007",
    "email": "contact@miet.edu",
    "website": "www.miet.edu",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1998
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1998
      }
    ]
  },
  {
    "code": "3812",
    "name": "Mookambigai College of Engineering",
    "address": "Keeranur, Pudukkottai District 622502",
    "district": "Pudukkottai",
    "taluk": "KULATHUR",
    "pincode": "622502",
    "email": "pdkmce@gmail.in",
    "website": "mookambigai.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 90,
        "startYear": 1985
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1985
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1997
      },
      {
        "code": "EI",
        "intake": 30,
        "startYear": 1998
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1985
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2000
      }
    ]
  },
  {
    "code": "3813",
    "name": "Oxford Engineering College",
    "address": "Pirattiyur(W), Tiruchirappalli District 620009",
    "district": "Tiruchirappalli",
    "taluk": "Srirangam",
    "pincode": "620009",
    "email": "principal@oxfordec.edu.in",
    "website": "www.oxfordec.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 1998
      }
    ]
  },
  {
    "code": "3814",
    "name": "P R Engineering College",
    "address": "Vallam, Thanjavur District 613403",
    "district": "Tiruchirappalli",
    "taluk": "Thanjavur",
    "pincode": "613403",
    "email": "principal@prec.edu.in",
    "website": "www.prec.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2005
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2000
      }
    ]
  },
  {
    "code": "3815",
    "name": "Pavendhar Bharathidasan College of Engineering and Technology",
    "address": "Pudukkottai Main Road, Tiruchirappalli District 620024",
    "district": "Tiruchirappalli",
    "taluk": "Tiruverumpur",
    "pincode": "620024",
    "email": "pabprincipal@gmail.com",
    "website": "www.pabcet.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "BT",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 1998
      }
    ]
  },
  {
    "code": "3817",
    "name": "Roever Engineering College",
    "address": "Elambalur, Perambalur District 621212",
    "district": "Perambalur",
    "taluk": "Perambalur",
    "pincode": "621220",
    "email": "principal@roeverengg.edu.in",
    "website": "www.roeverengg.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "CS",
        "intake": 90,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2005
      },
      {
        "code": "CH",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2019
      }
    ]
  },
  {
    "code": "3819",
    "name": "Saranathan College of Engineering",
    "address": "Panjappur, Tiruchirappalli District 620012",
    "district": "Tiruchirappalli",
    "taluk": "TIRUCHIRAPALLI WEST",
    "pincode": "620012",
    "email": "principal@saranathan.ac.in",
    "website": "www.saranathan.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1998
      },
      {
        "code": "CB",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 1998
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "IC",
        "intake": 30,
        "startYear": 2003
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2005
      }
    ]
  },
  {
    "code": "3820",
    "name": "Trichy Engineering College",
    "address": "Konalai, Tiruchirappalli District 621132",
    "district": "Tiruchirappalli",
    "taluk": "MANACHANALLUR",
    "pincode": "621132",
    "email": "newtrichy@2014.com",
    "website": "www.trichyengg.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "MC",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "CS",
        "intake": 90,
        "startYear": 1998
      }
    ]
  },
  {
    "code": "3821",
    "name": "A R J College of Engineering and Technology",
    "address": "Mannargudi Taluk, Thiruvarur District 614001",
    "district": null,
    "taluk": ", Thiruvarur",
    "pincode": "614001",
    "email": "principalcet@arj.edu.in",
    "website": "arj,edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 90,
        "startYear": 2002
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 2002
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2003
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "3822",
    "name": "Dr. Navalar Nedunchezhian College of Engineering",
    "address": "Tholudur, Cuddalore District 606303",
    "district": "Cuddalore",
    "taluk": "TITTAGUDI",
    "pincode": "606303",
    "email": "mail.nnce@gmail.com",
    "website": "www.drnnce.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1995
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1995
      }
    ]
  },
  {
    "code": "3825",
    "name": "St. Josephs College Of Engineering And Technology",
    "address": "Elupatti Village, Rawaspatti Post, Thanjavur District 613403",
    "district": "Thanjavur",
    "taluk": "Thanjavur",
    "pincode": "613403",
    "email": "sjcet.tnj@gmail.com",
    "website": "www.sjcettnj.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 90,
        "startYear": 2007
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2007
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "3826",
    "name": "Kongunadu College of Engineering and Technology",
    "address": "Tholurpatti, Thottiyam, Tiruchirappalli District 621215",
    "district": "Tiruchirappalli",
    "taluk": "Thottiam",
    "pincode": "621215",
    "email": "principalkncet@gmail.com",
    "website": "www.Kongunadu.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2007
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2007
      }
    ]
  },
  {
    "code": "3829",
    "name": "M.A.M. College of Engineering and Technology",
    "address": "Trichy-Chennai Trunk Road, Siruganur, Tiruchirappalli District 621105",
    "district": "Chennai",
    "taluk": "Manachanallur",
    "pincode": "621105",
    "email": "principal@mamcet.com",
    "website": "www.mamcet.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "3830",
    "name": "K Ramakrishnan College of Engineering (Autonomous)",
    "address": "Kariyamanickam Road, Samayapuram, Manachanallur Taluk, Tiruchirappalli District 621112",
    "district": "Tiruchirappalli",
    "taluk": ", Tiruchirappalli",
    "pincode": "621112",
    "email": "principalkrce@gmail.com",
    "website": "www.krce.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "AL",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CB",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 2008
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "3831",
    "name": "Indra Ganesan College of Engineering",
    "address": "Madurai Main Road, Manikandam, Tiruchirappalli District 620012",
    "district": "Madurai",
    "taluk": "Srirangam",
    "pincode": "620012",
    "email": "igceprincipal@gmail.com",
    "website": "www.igceng.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "3833",
    "name": "Parisutham Institute of Technology and Science",
    "address": "Ring Road, Nanjikottai, Thanjavur District 613006",
    "district": "Thanjavur",
    "taluk": "Thanjavur",
    "pincode": "613006",
    "email": "pitsprincipal@gmail.com",
    "website": "www.parisuthamtech.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "3841",
    "name": "CARE College of Engineering",
    "address": "Thayanoor Village, Thayanoor Village, Kuttappatti, Srirangam Taluk, Tiruchirappalli District 620009",
    "district": "Tiruchirappalli",
    "taluk": ", Tiruchirappalli",
    "pincode": "620009",
    "email": "principal.coe@care.ac.in",
    "website": "www.care.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "3843",
    "name": "M R K Institute of Technology",
    "address": "Nattarmangalam Village, Kattumannarkoil, Cuddalore District 608301",
    "district": "Cuddalore",
    "taluk": "Kattumannarkoil",
    "pincode": "608301",
    "email": "aucoe8224@gmail.com",
    "website": "www.mrkit.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "3844",
    "name": "Shivani Engineering College",
    "address": "Ammapettai, Srirangam, Tiruchirappalli District 620009",
    "district": "Tiruchirappalli",
    "taluk": "SRIRANGAM SRIR N A e N ar G e A st M R ailway Station 14",
    "pincode": "620009",
    "email": "principal@shivani-sec.ac.in",
    "website": "www.shivani.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": []
  },
  {
    "code": "3846",
    "name": "Mother Terasa College of Engineering and Technology",
    "address": "Mettusalai Post and Taluk, Pudukkottai District 622102",
    "district": "Pudukkottai",
    "taluk": ",",
    "pincode": "622102",
    "email": "mtcetilluppur@gmail.com",
    "website": "www.mtcet.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 120,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "3848",
    "name": "Vandayar Engineering College",
    "address": "Pulavarnatham Post, Mariamman Koil (Via), Thanjavur District 613001",
    "district": "Thanjavur",
    "taluk": "Papanasam",
    "pincode": "613501",
    "email": "vandayarengcollege@gmail.com",
    "website": "www.vandayar.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "3849",
    "name": "Annai College of Engineering and Technology",
    "address": "Kovilacheri, Kumbakonam, Thanjavur District 612503",
    "district": "Thanjavur",
    "taluk": "kumbakonam",
    "pincode": "612503",
    "email": "acet3849@annaiengg.org",
    "website": "www.annaicollege.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 120,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "3850",
    "name": "Vetri Vinayaha College of Engineering and Technology",
    "address": "Namakkal-Trichy Main Road, Tholurpatti Village, Thottiam, Tiruchirappalli District 621215",
    "district": "Tiruchirappalli",
    "taluk": "Thottiam",
    "pincode": "621215",
    "email": "principalvvcet850@gmail.com",
    "website": "www.vetrivinayaha.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "3852",
    "name": "Sri Bharathi Engineering College for Women",
    "address": "Kaikkuruchi Village, Alangudi Taluk, Pudukkottai District 622303",
    "district": "Pudukkottai",
    "taluk": ",",
    "pincode": "622303",
    "email": "sribharathienggcollege@gmail.com",
    "website": "www.sbec.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "3854",
    "name": "Mahath Amma Institute of Engineering and Technology (MIET)",
    "address": "Ariyur, Annavasal Road, Illupur Taluk, Pudukkottai District 622101",
    "district": "Pudukkottai",
    "taluk": ", Pudukkottai",
    "pincode": "622101",
    "email": "info@maietpdkt.org",
    "website": "www.maietpdkt.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "3855",
    "name": "As-Salam College of Engineering and Technology",
    "address": "Thirumangalakudi, Aduthurai, Thiruvidaimaruthur, Thanjavur District 612102",
    "district": "Thanjavur",
    "taluk": "THIRUVIDAIMARUTHUR",
    "pincode": "612102",
    "email": "ascetao2017@gmail.com",
    "website": "www.assalamcollege.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "3857",
    "name": "Meenakshi Ramaswamy Engineering College",
    "address": "Trichy Main Road, Thathanur, Udayarpalayam, Ariyalur District 621804",
    "district": "Ariyalur",
    "taluk": "Udayarpalayam",
    "pincode": "621804",
    "email": "mrengg2@yahoo.in",
    "website": "http://mrcengg.org.in/",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "ME",
        "intake": 90,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "3859",
    "name": "Sembodai Rukmani Varatharajan Engineering College",
    "address": "Sembodai Village, Vedaraniam, Nagappattinam District 614820",
    "district": "Nagapattinam",
    "taluk": "Vedaraniam",
    "pincode": "614809",
    "email": "859srvec@gmail.com",
    "website": "www.srvgroups.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "3860",
    "name": "St. Annes College of Engineering and Technology",
    "address": "Anguchettypalayam, Siruvathur Post, Panruti, Cuddalore District 607110",
    "district": "Cuddalore",
    "taluk": "PANRUTI",
    "pincode": "607106",
    "email": "stannescet@gmail.com",
    "website": "www.stannescet.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "3908",
    "name": "MOUNT ZION COLLEGE OF ENGINEERING AND TECHNOLOGY",
    "address": "Lena Vilakku, Pilivalam Post, Thirumayam Taluk, Pudukkottai-622507",
    "district": "Pudukkottai",
    "taluk": ", Pudukkottai-622507",
    "pincode": "622507",
    "email": "info@mzcet.in",
    "website": "www.mzcet.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "3918",
    "name": "Shanmuganathan Engineering College",
    "address": "Pillivalam Post, Pudukkottai District 622507",
    "district": "Pudukkottai",
    "taluk": "Thirumayam",
    "pincode": "622507",
    "email": "shanmuganathanengg@gmail.com",
    "website": "www.shanmuganathanengg.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 2005
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "3920",
    "name": "Sudharsan Engineering College",
    "address": "Sathiyamangalam Post, Pudukkottai District 622501",
    "district": "Pudukkottai",
    "taluk": "Kulathur",
    "pincode": "622501",
    "email": "principal@sudharsan.net.in",
    "website": "www.sec.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2005
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2000
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2000
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "3926",
    "name": "Chendhuran College of Engineering and Technology",
    "address": "Lena Vilakku, Pilivalam (PO), Thirumayam (TK), Pudukkottai - 622 507",
    "district": "Pudukkottai",
    "taluk": "THIRUMAYAM",
    "pincode": "622507",
    "email": "admin@chendhuran.in",
    "website": "www.chendhuran.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "4020",
    "name": "Anna University Regional Campus - Tirunelveli",
    "address": "Trivandrum Road, Palayamkottai, Tirunelveli District 627007",
    "district": "Tirunelveli",
    "taluk": "PALAYAMKOTTAI",
    "pincode": "627007",
    "email": "deanautvl@annauniv.edu",
    "website": "www.auttvl.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "GI",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2018
      }
    ]
  },
  {
    "code": "4023",
    "name": "University College of Engineering",
    "address": "Nagercoil, Nagercoil Industrial Estate, Konam, Kanyakumari District 629004",
    "district": "Kanyakumari",
    "taluk": "Agastheeswaram",
    "pincode": "629004",
    "email": "deannagercoil@annauniv.edu",
    "website": "www.ucen.ac.in",
    "autonomous": false,
    "type": "constituent",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "XC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2015
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "XM",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "4024",
    "name": "University V.O.C. College of Engineering",
    "address": "Thoothukudi, Near V.O.C. College, Millerpuram, Thoothukudi District 628008",
    "district": "Chennai",
    "taluk": "Thoothukudi",
    "pincode": "628008",
    "email": "deanautut@annauniv.edu",
    "website": "www.annaunivtut.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "GI",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "XM",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "XC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "4669",
    "name": "Thamirabharani Engineering College",
    "address": "Chathirampudukulam Village, Thatchanallur, Tirunelveli District 625358",
    "district": "Tirunelveli",
    "taluk": "Thatchanallur",
    "pincode": "627358",
    "email": "tec_edu_in@yahoo.com",
    "website": "www.tec-edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "4670",
    "name": "Rohini College of Engineering & Technology",
    "address": "Anjugramam-Kanyakumari Main Road, Palkulam, Variyoor Post, Kanyakumari District 629401",
    "district": "Kanyakumari",
    "taluk": "Agasteeswaram",
    "pincode": "629401",
    "email": "principal@rcet.org.in",
    "website": "www.rcet.org.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2012
      },
      {
        "code": "ME",
        "intake": 180,
        "startYear": 2012
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "4671",
    "name": "Sigma College of Architecture",
    "address": "Moododu, Anducode Post, Marthandam, Kanyakumari District 629168",
    "district": "Kanyakumari",
    "taluk": "VILAVANCODE",
    "pincode": "629168",
    "email": "sigmagroup155@gmail.com",
    "website": "www.sicarch.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 80,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "4672",
    "name": "Stella Marys College of Engineering",
    "address": "Arunthengan Vilai, Azhikal Post, Kanyakumari District 629202",
    "district": "Kanyakumari",
    "taluk": "Agastheeswaram",
    "pincode": "629202",
    "email": "info@stellamaryscoe.edu.in",
    "website": "www.stellamaryscoe.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "4675",
    "name": "Universal College of Engineering and Technology",
    "address": "Anbagam Campus, Radhapuram Road, Vallioor, Tirunelveli District 627117",
    "district": "Tirunelveli",
    "taluk": "RADHAPURAM",
    "pincode": "627117",
    "email": "unienggtech@gmail.com",
    "website": "www.unienggtech.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "4677",
    "name": "Lourdes Mount College of Engineering and Technology",
    "address": "Marthandam-Karungal Road, Chundavilai, Mullanganavilai, Nattalam Post, Kanyakumari District 629195",
    "district": "Kanyakumari",
    "taluk": "Vilavancode",
    "pincode": "629165",
    "email": "lmcetprincipal@gmail.com",
    "website": "www.lourdesmountcollege.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2013
      }
    ]
  },
  {
    "code": "4678",
    "name": "Ramco Institute of Technology",
    "address": "North venganallur Village, Krishnapuram Panchayat, Rajapalayam, Virudhunagar District 626117",
    "district": "Virudhunagar",
    "taluk": "Rajapalayam",
    "pincode": "626117",
    "email": "principal@ritrjpm.ac.in",
    "website": "https://www.ritrjpm.ac.in/",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2013
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2013
      }
    ]
  },
  {
    "code": "4679",
    "name": "V.P.M.M. College of Architecture for Women",
    "address": "V.P.M. Nagar, Krishnankoil, Srivilliputtur, Virudhunagar District 626190",
    "district": "Virudhunagar",
    "taluk": "Srivilliputhur",
    "pincode": "626190",
    "email": "vpmmarchitecture@gmail.com",
    "website": "www.vpmmarch.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 20,
        "startYear": 2015
      }
    ]
  },
  {
    "code": "4680",
    "name": "AAA College of Engineering and Technology",
    "address": "Kamarajar Educational Road, Amathur Village, Sivakasi, Virudhunagar District 626005",
    "district": "Virudhunagar",
    "taluk": "VIRUDHUNAGAR",
    "pincode": "626005",
    "email": "aaaengineeringcollege@gmail.com",
    "website": "aaaenggcoll.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2013
      }
    ]
  },
  {
    "code": "4686",
    "name": "Good Shepherd College of Engineering and Technology",
    "address": "Maruthamparai, Kanyakumari District 629101",
    "district": "Kanyakumari",
    "taluk": "Vilavancode",
    "pincode": "629101",
    "email": "gscet2018@gmail.com",
    "website": "www.gscet.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2018
      }
    ]
  },
  {
    "code": "4864",
    "name": "V V College of Engineering",
    "address": "Arasoor Village, Idaichivilai Post, Santhakulam Taluk, Thoothukudi District 628656",
    "district": "Thoothukudi",
    "taluk": ",",
    "pincode": "628656",
    "email": "info@vvcoe.org",
    "website": "www.vvcoe.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "4917",
    "name": "Sethu Institute of Technology (Autonomous)",
    "address": "Kariapatti Post, Virudhunagar District 626106",
    "district": "Virudhunagar",
    "taluk": "Kariapatti",
    "pincode": "626115",
    "email": "principal@sethu.ac.in",
    "website": "www.sethu.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2016
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2016
      },
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CB",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 1995
      },
      {
        "code": "CH",
        "intake": 60,
        "startYear": 2015
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 1998
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "ME",
        "intake": 180,
        "startYear": 1995
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "4927",
    "name": "Maria College of Engineering and Technology",
    "address": "Attoor Puliyamoodu Junction, Thiruvattar Post, Kanyakumari District 629177",
    "district": "Kanyakumari",
    "taluk": "THIRUVATTAR",
    "pincode": "629177",
    "email": "maria.college.of.engineering@gmail.",
    "website": "www.mcet.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AU",
        "intake": 30,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "4928",
    "name": "MAR Ephraem College of Engineering & Technology",
    "address": "Malankara Hills, Elavuvillai, Marthandam, Kanyakumari District 629171",
    "district": "Kanyakumari",
    "taluk": "vilavancode",
    "pincode": "629171",
    "email": "marephraem@gmail.com",
    "website": "www.marephraem.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 120,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "4929",
    "name": "M E T Engineering College",
    "address": "Mogals Garden, Thovalai Village, Aralvaimozhi Town Panchayat, Thovalai, Kanyakumari District 629304",
    "district": "Kanyakumari",
    "taluk": "Thovalai",
    "pincode": "629304",
    "email": "metec09@gmail.com",
    "website": "www.metcolleges.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "4931",
    "name": "Grace College of Engineering",
    "address": "Chandy Nagar, Mullakkadu, Thoothukudi District 628005",
    "district": "Thoothukudi",
    "taluk": "THOOTHUKUDI",
    "pincode": "628005",
    "email": "principal@gracecoe.org",
    "website": "www.gracecoe.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 45,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "4932",
    "name": "Immanuel Arasar J J College of Engineering",
    "address": "Anappara, Edavilagam, Nattalam, Kanyakumari District 629195",
    "district": "Kanyakumari",
    "taluk": "vilavancode",
    "pincode": "629195",
    "email": "iajj.principal2011@gmail.com",
    "website": "www.iajjce.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 30,
        "startYear": 2013
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "CE",
        "intake": 48,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 48,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "4933",
    "name": "St. Mother Theresa Engineering College",
    "address": "Vagaikulam, Thoothukudi District 628102",
    "district": "Thoothukudi",
    "taluk": "Srivaikundam",
    "pincode": "628102",
    "email": "principal@mtec.ac.in",
    "website": "www.mtec.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "4934",
    "name": "Holy Cross Engineering College",
    "address": "Vagaikulam, Sri Mulakarai, Srivaikuntam, Thoothukudi District 628851",
    "district": "Thoothukudi",
    "taluk": "Eral",
    "pincode": "628851",
    "email": "dgrtrust@gmail.com",
    "website": "www.holycrossengineeringcollege.co",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "4937",
    "name": "A R College of Engineering and Technology",
    "address": "Kadayam-Alangulam Road, Therikkumadathoor Post, Tirunelveli District 627423",
    "district": "Tirunelveli",
    "taluk": "Tenkasi",
    "pincode": "627423",
    "email": "arcet937@gmail.com",
    "website": "www.arcet.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 45,
        "startYear": 2011
      },
      {
        "code": "MC",
        "intake": 45,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "4938",
    "name": "Sivaji College of Engineering and Technology",
    "address": "Manivilla Palulai Panchayat, Vilavancode, Kanyakumari District 629170",
    "district": "Kanyakumari",
    "taluk": "Vilavancode",
    "pincode": "629170",
    "email": "sivajicollege@gmail.com",
    "website": "www.scet.org.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "4941",
    "name": "Unnamalai Institute of Technology",
    "address": "Ayyaneri, Kovilpatti, Thoothukudi District 628502",
    "district": "Thoothukudi",
    "taluk": "Kovilpatti",
    "pincode": "628502",
    "email": "uitkpt@gmail.com",
    "website": "www.uitkovilpatti.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "4943",
    "name": "Satyam College of Engineering & Technology",
    "address": "Kannappannallur, Aralvaimozhi, Kanyakumari District 629301",
    "district": "Kanyakumari",
    "taluk": "Thovalai",
    "pincode": "629301",
    "email": "satyamcet@yahoo.com",
    "website": "www.satyamedu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 54,
        "startYear": 2010
      },
      {
        "code": "CE",
        "intake": 54,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 54,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 45,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 45,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 54,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "4944",
    "name": "Arunachala College of Engineering for Women",
    "address": "Thanka Gardens, Manavilai, Vellichanthai, Nagercoil, Kanyakumari District 629203",
    "district": "Kanyakumari",
    "taluk": "KALKULAM",
    "pincode": "629203",
    "email": "acewomenscollege@gmail.com",
    "website": "www.arunachalacollege.com",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "4945",
    "name": "Vins Christian Womens College of Engineering",
    "address": "Chunkankadai Post, Nagercoil, Kanyakumari District 629807",
    "district": "Kanyakumari",
    "taluk": "KALKULAM",
    "pincode": "629003",
    "email": "vinswcceengg@gmail.com",
    "website": "http://www.vinswomensengg.com/",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "4946",
    "name": "D M I Engineering College",
    "address": "Aralvaimozhi Village, Thovalai, Kanyakumari District 629301",
    "district": "Kanyakumari",
    "taluk": "Thovalai",
    "pincode": "629901",
    "email": "principal@dmiengg.edu.in",
    "website": "www.dmiengg.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "4948",
    "name": "Rajas International Institute of Technology for Women",
    "address": "Ozhuginasery, Nagercoil, Kanyakumari District 629001",
    "district": "Kanyakumari",
    "taluk": "AGASTHEESWARAM",
    "pincode": "629001",
    "email": "info@riit.cc",
    "website": "www.riit.cc",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "FT",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "4949",
    "name": "P S N Institute of Technology & Science",
    "address": "Melathediyoor, Tirunelveli District 627152",
    "district": "Tirunelveli",
    "taluk": "PALAYAMKOTTAI",
    "pincode": "627152",
    "email": "psnits.principal@gmail.com",
    "website": "www.psnits.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "MC",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "MU",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "4952",
    "name": "C S I Institute of Technology",
    "address": "Thovalai, Kanyakumari District 629302",
    "district": "Kanyakumari",
    "taluk": "Thovalai",
    "pincode": "629302",
    "email": "csiit_thovalai@yahoo.com",
    "website": "www.csiit.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1995
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1995
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1995
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2000
      }
    ]
  },
  {
    "code": "4953",
    "name": "CAPE Institute of Technology",
    "address": "Levingipuram, Tirunelveli District 627114",
    "district": "Tirunelveli",
    "taluk": "Radhapuram",
    "pincode": "627114",
    "email": "capeitech@yahoo.com",
    "website": "www.capeitech.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2005
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 2001
      }
    ]
  },
  {
    "code": "4954",
    "name": "Dr. Sivanthi Aditanar College of Engineering",
    "address": "Tiruchendur, Thoothukudi District 628215",
    "district": "Tirunelveli",
    "taluk": "Tiruchendur",
    "pincode": "628215",
    "email": "princyengg@aei.edu.in",
    "website": "www.drsacoe.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1995
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 1999
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 1995
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 1995
      }
    ]
  },
  {
    "code": "4955",
    "name": "Francis Xavier Engineering College",
    "address": "Vannarpettai, Tirunelveli District 627003",
    "district": "Tirunelveli",
    "taluk": "Palayamkottai",
    "pincode": "627003",
    "email": "principal@francisxavier.ac.in",
    "website": "www.francisxavier.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2000
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2000
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 2002
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2005
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "4956",
    "name": "Jayamatha Engineering College",
    "address": "Thirurajapuram, Muppandal, Aralvaimozhi, Kannyakumari Dt - 629 301",
    "district": "Kanyakumari",
    "taluk": "THOVALAI",
    "pincode": "629301",
    "email": "jayamathacollege@yahoo.com",
    "website": "jayamatha.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "CS",
        "intake": 30,
        "startYear": 1995
      },
      {
        "code": "EE",
        "intake": 34,
        "startYear": 1995
      },
      {
        "code": "EC",
        "intake": 45,
        "startYear": 1995
      },
      {
        "code": "IC",
        "intake": 34,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 51,
        "startYear": 1995
      }
    ]
  },
  {
    "code": "4957",
    "name": "Jayaraj Annapackiam CSI College of Engineering",
    "address": "Nazareth, Thoothukudi District 628617",
    "district": "Thoothukudi",
    "taluk": "Tiruchendur",
    "pincode": "628617",
    "email": "jacsiprincipalce@gmail.com",
    "website": "www.new.jacsice.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2019
      }
    ]
  },
  {
    "code": "4959",
    "name": "Kamaraj College of Engineering and Technology",
    "address": "Virudhunagar District 626001",
    "district": "Virudhunagar",
    "taluk": "Kalligudi",
    "pincode": "625701",
    "email": "mail@kamarajengg.edu.in",
    "website": "www.kamarajengg.edu.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1998
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2000
      }
    ]
  },
  {
    "code": "4960",
    "name": "Mepco Schlenk Engineering College (Autonomous)",
    "address": "Sivakasi, Virudhunagar District 626005",
    "district": "Virudhunagar",
    "taluk": "VIRUDHUNAGAR",
    "pincode": "626005",
    "email": "msec@mepcoeng.ac.in",
    "website": "www.mepcoeng.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 120,
        "startYear": 1984
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 1984
      },
      {
        "code": "EC",
        "intake": 180,
        "startYear": 1984
      },
      {
        "code": "CS",
        "intake": 180,
        "startYear": 1987
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1993
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "4961",
    "name": "National College of Engineering",
    "address": "Maruthakulam Post, Tirunelveli District 627151",
    "district": "Tirunelveli",
    "taluk": "NANGUNERI",
    "pincode": "627151",
    "email": "nceng@mhtrust.com",
    "website": "www.nce.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "4962",
    "name": "National Engineering College (Autonomous)",
    "address": "Kovilpatti, Thoothukudi District 628503",
    "district": "Thoothukudi",
    "taluk": "KOVILPATTI",
    "pincode": "628503",
    "email": "principal@nec.edu.in",
    "website": "https://nec.edu.in/",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "ME",
        "intake": 60,
        "startYear": 1984
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1984
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 1984
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1994
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "4964",
    "name": "P S N College of Engineering and Technology (Autonomous)",
    "address": "Melathediyoor, Tirunelveli Dstrict 627152",
    "district": "Tirunelveli",
    "taluk": null,
    "pincode": "627152",
    "email": "964psncet@gmail.com",
    "website": "www.psncet.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 90,
        "startYear": 2005
      },
      {
        "code": "CS",
        "intake": 90,
        "startYear": 2001
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2004
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 2001
      },
      {
        "code": "MU",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "MR",
        "intake": 60,
        "startYear": 2002
      }
    ]
  },
  {
    "code": "4965",
    "name": "P S R Engineering College (Autonomous)",
    "address": "Appayanaickenpatti, Sevalpatti, Virudhunagar District 626140",
    "district": "Virudhunagar",
    "taluk": "Vembakottai",
    "pincode": "626140",
    "email": "contact@psr.edu.in",
    "website": "www.psr.edu.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2019
      },
      {
        "code": "BT",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2005
      }
    ]
  },
  {
    "code": "4966",
    "name": "PET Engineering College",
    "address": "Vallioor Post, Tirunelveli District 627117",
    "district": "Tirunelveli",
    "taluk": "Radhapuram",
    "pincode": "627117",
    "email": "pet.engg@gmail.com",
    "website": "www.petengg.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 1998
      }
    ]
  },
  {
    "code": "4967",
    "name": "S Veerasamy Chettiar College of Engineering and Technology",
    "address": "Puliangudi Post, Tenkasi District 627855",
    "district": "Tenkasi",
    "taluk": "Kadayanallur",
    "pincode": "627855",
    "email": "principal@svccollege.ac.in",
    "website": "www.svccollege.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "4968",
    "name": "Sardar Raja College of Engineering",
    "address": "Alangulam, Tenkasi District 627808",
    "district": "Tenkasi",
    "taluk": "ALANGULAM",
    "pincode": "627808",
    "email": "srce-principal@src.org.in",
    "website": "www.src.org.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2006
      }
    ]
  },
  {
    "code": "4969",
    "name": "SCAD College of Engineering and Technology",
    "address": "Cheranmahadevi, Tirunelveli District 627414",
    "district": "Tirunelveli",
    "taluk": "Cheranmahadevi",
    "pincode": "627414",
    "email": "principal@scadengineering.ac.in",
    "website": "www.scadengineering.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2003
      }
    ]
  },
  {
    "code": "4970",
    "name": "Sree Sowdambiga College of Engineering",
    "address": "Aruppukkottai Taluk, Virudhunagar District 626134",
    "district": "Virudhunagar",
    "taluk": ", Virudhunagar",
    "pincode": "626134",
    "email": "ssceengg@gmail.com",
    "website": "www.sowdambikaengg.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2004
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "4971",
    "name": "St. Xavier Catholic College of Engineering",
    "address": "Chunkankadai, Nagercoil, Kanyakumari District 629807",
    "district": "Kanyakumari",
    "taluk": "Kalkulam",
    "pincode": "629003",
    "email": "principal@sxcce.edu.in",
    "website": "www.sxcce.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 1998
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2003
      }
    ]
  },
  {
    "code": "4972",
    "name": "Amrita College of Engineering and Technology",
    "address": "Erachakulam Post, Kanyakumari District 629902",
    "district": "Kanyakumari",
    "taluk": "Thovalai",
    "pincode": "629901",
    "email": "principal@amrita.edu.in",
    "website": "https://amrita.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2005
      }
    ]
  },
  {
    "code": "4974",
    "name": "Government College of Engineering",
    "address": "Tirunelveli District 627007",
    "district": "Tirunelveli",
    "taluk": "TIRUNELVELI",
    "pincode": "627007",
    "email": "principal@gcetly.ac.in",
    "website": "WWW.gcetly.ac.in",
    "autonomous": false,
    "type": "government",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 1981
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1981
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1985
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 1981
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1989
      }
    ]
  },
  {
    "code": "4975",
    "name": "Dr. G U Pope College of Engineering",
    "address": "Sawyerpuram, Thoothukudi District 628251",
    "district": "Thoothukudi",
    "taluk": "Thoothukudi",
    "pincode": "628251",
    "email": "drgupopeengineering@yahoo.com",
    "website": "www.drgupope.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EE",
        "intake": 40,
        "startYear": 2002
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2018
      }
    ]
  },
  {
    "code": "4976",
    "name": "Infant Jesus College of Engineering",
    "address": "Thoothukudi Highway (NH7/A), Thoothukudi District 628851",
    "district": "Thoothukudi",
    "taluk": "SRIVAIKUNDAM",
    "pincode": "628851",
    "email": "contact@ijce.ac.in",
    "website": "www.ijce.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2005
      }
    ]
  },
  {
    "code": "4977",
    "name": "Narayanaguru College of Engineering",
    "address": "Manjalumoodu, Kanyakumari District 629151",
    "district": "Kanyakumari",
    "taluk": "Vilavancode",
    "pincode": "629151",
    "email": "info@ngce.ac.in",
    "website": "www.ngce.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AU",
        "intake": 54,
        "startYear": 2011
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EE",
        "intake": 54,
        "startYear": 2005
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "4978",
    "name": "Udaya School of Engineering",
    "address": "Ammandivilai Post, Kanyakumari District 629204",
    "district": "Kanyakumari",
    "taluk": "KALKULAM",
    "pincode": "629204",
    "email": "978udayaengineering@gmail.com",
    "website": "www.udayaschoolofengineering.co",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2005
      },
      {
        "code": "ME",
        "intake": 180,
        "startYear": 2005
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "CE",
        "intake": 120,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "4979",
    "name": "V P Muthaiah Pillai Meenakshi Ammal Engineering College for Women",
    "address": "Srivilliputhur Taluk, Virudhunagar District 626190",
    "district": "Virudhunagar",
    "taluk": ", Virudhunagar",
    "pincode": "626126",
    "email": "vpmmenggdevelop@gmail.com",
    "website": "www.vpmmecw.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "4980",
    "name": "Einstein College of Engineering",
    "address": "Seethaparpanallur, Tirunelveli District 627012",
    "district": "Tirunelveli",
    "taluk": "Tirunelveli",
    "pincode": "627012",
    "email": "ecerecoff@gmail.com",
    "website": "www.einsteincollege.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2004
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2004
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2004
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2004
      }
    ]
  },
  {
    "code": "4981",
    "name": "Ponjesly College of Engineering",
    "address": "Vettornimadam Post, Nagercoil, Kanyakumari District 629003",
    "district": "Kanyakumari",
    "taluk": "Agasteeswaram",
    "pincode": "629003",
    "email": "ponjeslyce@yahoo.co.in",
    "website": "www.ponjesly.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2004
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2004
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2004
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2004
      }
    ]
  },
  {
    "code": "4982",
    "name": "Vins Christian College of Engineering",
    "address": "Chunkankadai Post, Nagercoil, Kanyakumari District 629807",
    "district": "Kanyakumari",
    "taluk": "Kalkulam",
    "pincode": "629003",
    "email": "vinsengg@gmail.com",
    "website": "http://www.vinsengineeringcollege.",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2004
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2004
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2004
      },
      {
        "code": "ME",
        "intake": 150,
        "startYear": 2004
      }
    ]
  },
  {
    "code": "4983",
    "name": "Lord Jegannath College of Engineering and Technology",
    "address": "Kumarapuram, Thoppur Post, Kanyakumari District 629402",
    "district": "Kanyakumari",
    "taluk": "Agasteeswaram",
    "pincode": "629402",
    "email": "principalljcet@yahoo.com",
    "website": "www.ljcet.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 30,
        "startYear": 2006
      },
      {
        "code": "CS",
        "intake": 30,
        "startYear": 2006
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2006
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2011
      },
      {
        "code": "RM",
        "intake": 30,
        "startYear": 2012
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2014
      }
    ]
  },
  {
    "code": "4984",
    "name": "Marthandam College of Engineering & Technology",
    "address": "Kuttakuzhi, Veeyanoor Post, Kanyakumari District 629177",
    "district": "Kanyakumari",
    "taluk": "Thiruvattar",
    "pincode": "629177",
    "email": "macet.office@gmail.com",
    "website": "www.macet.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "ME",
        "intake": 90,
        "startYear": 2010
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 2006
      }
    ]
  },
  {
    "code": "4989",
    "name": "P S N Engineering College",
    "address": "Melathediyoor, Tirunelveli District 627152",
    "district": "Tirunelveli",
    "taluk": "Palayamkottai",
    "pincode": "627152",
    "email": "989psnec@gmail.com",
    "website": "www.psnec.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AU",
        "intake": 60,
        "startYear": 2015
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "MU",
        "intake": 60,
        "startYear": 2013
      }
    ]
  },
  {
    "code": "4992",
    "name": "Bethlahem Institute of Engineering",
    "address": "Karungal, Kanyakumari District 629157",
    "district": "Kanyakumari",
    "taluk": "KILIYOOR",
    "pincode": "629157",
    "email": "mail@bethlahem.org",
    "website": "http://bethlahem.org/engineering/in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AU",
        "intake": 30,
        "startYear": 2014
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "4993",
    "name": "Loyola Institute of Technology and Science",
    "address": "Loyola Nagar, P B No.2, Thovalai, Kanyakumari District 629302",
    "district": "Kanyakumari",
    "taluk": "AGASTEESWARAM",
    "pincode": "629302",
    "email": "lites2008@hotmail.com",
    "website": "www.lites.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 2017
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "4994",
    "name": "J P College of Engineering",
    "address": "College Road, Ayakudy, Tenkasi Taluk, Tenkasi District 627852",
    "district": "Tenkasi",
    "taluk": ", Tenkasi",
    "pincode": "627852",
    "email": "principal@jpcoe.ac.in",
    "website": "https://www.jpcoe.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2014
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "4995",
    "name": "P S R Rengasamy College of Engineering for Women",
    "address": "Appayanaickenpatti, Sevalpatti, Virudhunagar District 626140",
    "district": "Virudhunagar",
    "taluk": "Vembakottai",
    "pincode": "626140",
    "email": "contact@psrr.edu.in",
    "website": "www.psrr.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "4996",
    "name": "Sri Vidhya College of Engineering and Technology",
    "address": "Sivakasi Main Road, P Kumaralinapuram, Virudhunagar District 626005",
    "district": "Virudhunagar",
    "taluk": "Virudhunagar",
    "pincode": "626001",
    "email": "srivcetvnr@gmail.com",
    "website": "www.srividyaengg.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "4998",
    "name": "Mahakavi Bharathiyar College of Engineering and Technology",
    "address": "Vasudevanallur, Tenkasi District 627758",
    "district": "Tenkasi",
    "taluk": "SIVAGIRI",
    "pincode": "627760",
    "email": "mkbharathi2008@gmail.com",
    "website": "www.mbceat.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 45,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 45,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "4999",
    "name": "Annai Vailankanni College of Engineering",
    "address": "Pothaiyadi Salai, Pottalkulam, Azhagappapuram, Kanyakumari District 629401",
    "district": "Kanyakumari",
    "taluk": "Agastheeswaram",
    "pincode": "629401",
    "email": "info@avce.edu.in",
    "website": "www.avce.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "5008",
    "name": "Thiagarajar College of Engineering (Autonomous)",
    "address": "Tirupparankundram, Madurai District 625015",
    "district": "Madurai",
    "taluk": "Madurai South",
    "pincode": "625015",
    "email": "principal@tce.edu",
    "website": "www.tce.edu",
    "autonomous": true,
    "type": "aided",
    "branches": [
      {
        "code": "BR",
        "intake": 80,
        "startYear": 1995
      },
      {
        "code": "CE",
        "intake": 40,
        "startYear": 1957
      },
      {
        "code": "CM",
        "intake": 70,
        "startYear": 2000
      },
      {
        "code": "CN",
        "intake": 80,
        "startYear": 2007
      },
      {
        "code": "CS",
        "intake": 50,
        "startYear": 1985
      },
      {
        "code": "EC",
        "intake": 50,
        "startYear": 1978
      },
      {
        "code": "EE",
        "intake": 50,
        "startYear": 1957
      },
      {
        "code": "EY",
        "intake": 70,
        "startYear": 2000
      },
      {
        "code": "IM",
        "intake": 120,
        "startYear": 1999
      },
      {
        "code": "ME",
        "intake": 50,
        "startYear": 1957
      },
      {
        "code": "MF",
        "intake": 70,
        "startYear": 2000
      }
    ]
  },
  {
    "code": "5009",
    "name": "Government College of Engineering",
    "address": "Melachokkanathapuram, Bodinayakkanur,Theni District 625 582",
    "district": "Theni",
    "taluk": "BODINAYAKKANUR",
    "pincode": "625582",
    "email": "gcebodi@gmail.com",
    "website": "www.gcebodi.ac.in",
    "autonomous": false,
    "type": "government",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "5010",
    "name": "Anna University Regional Campus - Madurai",
    "address": "Kanyakumari National Highway, Keelakuilkudi, Madurai District 625019",
    "district": "Madurai",
    "taluk": "Madurai",
    "pincode": "625019",
    "email": "dean@autmdu.ac.in",
    "website": "www.autmdu.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2018
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2018
      }
    ]
  },
  {
    "code": "5012",
    "name": "Central Electrochemical Research Institute",
    "address": "(CECRI), Karaikudi, Sivagangai District 630006",
    "district": "Sivagangai",
    "taluk": "Karaikudi",
    "pincode": "630003",
    "email": "cfe@cecri.res.in",
    "website": "www.cecri.res.in",
    "autonomous": false,
    "type": "research",
    "branches": [
      {
        "code": "CC",
        "intake": 40,
        "startYear": 1988
      }
    ]
  },
  {
    "code": "5017",
    "name": "University College of Engineering",
    "address": "Ramanathapuram, Pullangudi, Ramanathapuram District 623513",
    "district": "Ramanathapuram",
    "taluk": "Ramanathapuram",
    "pincode": "623513",
    "email": "ucermd@gmail.com",
    "website": "www.aucermd.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "XC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "XM",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "5022",
    "name": "University College of Engineering",
    "address": "Dindigul, Mangarai Pirivu, Reddiyarchathiram, Dindigul District 624622",
    "district": "Dindigul",
    "taluk": "Athoor",
    "pincode": "624622",
    "email": "deandglau@yahoo.co.in",
    "website": "http://auucedgl.ac.in/",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2015
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "XC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "XM",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "5502",
    "name": "Sree Raaja Raajan College of Engineering & Technology",
    "address": "Amaravathi Village, Amaravathi Pudur Post, Karaikudi, Sivagangai District 630301",
    "district": "Sivagangai",
    "taluk": "karaikudi",
    "pincode": "630301",
    "email": "srrcet2010@gmail.com",
    "website": "www.sriraajaraajan.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "5530",
    "name": "SSM Institute of Engineering and Technology",
    "address": "Kuttathupatti Village, Sindalaigundu Post, Dindigul District 624002",
    "district": "Dindigul",
    "taluk": "DINDIGUL",
    "pincode": "624002",
    "email": "ssmietdgl@gmail.com",
    "website": "www.ssmiet.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AU",
        "intake": 30,
        "startYear": 2011
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2011
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "5532",
    "name": "Vaigai College of Engineering",
    "address": "Therkutheru, Melur Taluk, Madurai District 625122",
    "district": "Madurai",
    "taluk": ", Madurai",
    "pincode": "625122",
    "email": "vaigaiprincipal@gmail.com",
    "website": "www.vaigai.org.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2012
      }
    ]
  },
  {
    "code": "5533",
    "name": "Karaikudi Institute of Technology",
    "address": "KIT & KIM Technical Campus, Keeranipatti, Thalakkuvur, Karaikudi, Sivagangai District 630307",
    "district": "Sivagangai",
    "taluk": "KARAIKUDI",
    "pincode": "630307",
    "email": "kitandkimtechnicalcampus@yahoo.c",
    "website": "www.kitandkimtechnicalcampus.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2011
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2011
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2011
      }
    ]
  },
  {
    "code": "5536",
    "name": "Mangayarkarasi College of Engineering",
    "address": "First Street, Mangayarkarasi Nagar, Paravai, Madurai District 625402",
    "district": "Madurai",
    "taluk": "MADURAI NORTH",
    "pincode": "625402",
    "email": "mangai.enggcoll@gmail.com",
    "website": "mce-madurai.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2020
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2013
      }
    ]
  },
  {
    "code": "5537",
    "name": "Jainee College of Engineering and Technology",
    "address": "Dindigul-Theni Main Road (Near Vakkampatti), Dindigul District 624303",
    "district": "Dindigul",
    "taluk": "Athur",
    "pincode": "624303",
    "email": "jaineeedu@yahoo.in",
    "website": "www.jaineecollegeofengineering.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2013
      },
      {
        "code": "CS",
        "intake": 45,
        "startYear": 2013
      },
      {
        "code": "EC",
        "intake": 45,
        "startYear": 2013
      },
      {
        "code": "EE",
        "intake": 45,
        "startYear": 2013
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2013
      }
    ]
  },
  {
    "code": "5538",
    "name": "J.K. College of Architecture",
    "address": "NH-7, Madurai Road, Begampur Post, Dindigul 624002",
    "district": "Madurai",
    "taluk": "dindigul",
    "pincode": "624002",
    "email": "jkcollegeofarchitecture@gmail.com",
    "website": "http://www.jkarchitecturecollege.co",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 40,
        "startYear": 2013
      }
    ]
  },
  {
    "code": "5703",
    "name": "Christian College of Engineering and Technology",
    "address": "Oddanchatram, Dindigul District 624619",
    "district": "Dindigul",
    "taluk": "Oddanchatram",
    "pincode": "624619",
    "email": "principal@christianengineering.in",
    "website": "www.christianengineering.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2004
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "5720",
    "name": "Sri Subramanya College of Engineering and Technology",
    "address": "Sukkamanaickanpatti, Palani, Dindigul District 624615",
    "district": "Dindigul",
    "taluk": "PALANI",
    "pincode": "624615",
    "email": "principal@subramanya.org",
    "website": "http://sscet.org.in/",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "5832",
    "name": "N P R College of Engineering and Technology",
    "address": "Natham, Dindigul District 624003",
    "district": "Dindigul",
    "taluk": ",",
    "pincode": "624401",
    "email": "nprcetprincipal@nprcolleges.org",
    "website": "www.nprcet.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2008
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2008
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "5862",
    "name": "R V S Educational Trustï¿½s Groups of Institutions (Integrated Campus)",
    "address": "N Paraipatti Post, Vedasandur Taluk, Dindigul District 624005",
    "district": "Dindigul",
    "taluk": ", Dindigul",
    "pincode": "624005",
    "email": "rvssoetdgl@rvsgroup.com",
    "website": "www.rvsetgidgl.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "AG",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "AU",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "5863",
    "name": "R V S School of Architecture",
    "address": "N Paraipatti Post, Vedasandur Taluk, Dindigul District 624005",
    "district": "Dindigul",
    "taluk": ", Dindigul",
    "pincode": "624005",
    "email": "rvssoadgl@gmail.com",
    "website": "www.rvsarchdgl.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AR",
        "intake": 40,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "5865",
    "name": "Nadar Saraswathi College of Engineering and Technology",
    "address": "Vadupudupatti, Annanji Post, Theni District 625531",
    "district": "Theni",
    "taluk": "Periyakulam",
    "pincode": "625531",
    "email": "principal@nscet.org",
    "website": "www.nscet.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "5901",
    "name": "Alagappa Chettiar Government College of Engineering and Technology (Autonomous)",
    "address": "Karaikudi, Sivagangai District 630004",
    "district": "Sivagangai",
    "taluk": "Karaikudi",
    "pincode": "630003",
    "email": "accetprincipal@gmail.com",
    "website": "accetedu.in",
    "autonomous": true,
    "type": "government",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 1952
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1952
      },
      {
        "code": "EE",
        "intake": 120,
        "startYear": 1952
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1969
      }
    ]
  },
  {
    "code": "5902",
    "name": "Bharath Niketan Engineering College",
    "address": "Thimmarasanaickanoor, Aundipatti, Theni District 625536",
    "district": "Madurai",
    "taluk": "Aundipatti",
    "pincode": "625536",
    "email": "bnecadmin@gmail.com",
    "website": "www.bnec.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1998
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 2007
      }
    ]
  },
  {
    "code": "5904",
    "name": "K L N College of Engineering",
    "address": "Pottapalayam, Sivagangai District 630611",
    "district": "Madurai",
    "taluk": "Thiruppuvanam",
    "pincode": "630612",
    "email": "info@klnce.edu",
    "website": "www.klnce.edu",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "AD",
        "intake": 30,
        "startYear": 2021
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 1997
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 1994
      },
      {
        "code": "EE",
        "intake": 90,
        "startYear": 1994
      },
      {
        "code": "IT",
        "intake": 90,
        "startYear": 1999
      },
      {
        "code": "ME",
        "intake": 90,
        "startYear": 1994
      }
    ]
  },
  {
    "code": "5907",
    "name": "Mohamed Sathak Engineering College",
    "address": "Kilakarai, Ramanathapuram District 623806",
    "district": "Ramanathapuram",
    "taluk": "KILAKARAI",
    "pincode": "623806",
    "email": "principal@msec.org.in",
    "website": "www.msec.org.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "AE",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 1984
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1993
      },
      {
        "code": "CH",
        "intake": 45,
        "startYear": 1996
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1984
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1995
      },
      {
        "code": "IT",
        "intake": 60,
        "startYear": 1999
      },
      {
        "code": "MR",
        "intake": 30,
        "startYear": 1997
      },
      {
        "code": "AR",
        "intake": 40,
        "startYear": 1993
      }
    ]
  },
  {
    "code": "5910",
    "name": "P S N A Colllege of Engineering and Technology",
    "address": "Dindigul District 624622",
    "district": "Dindigul",
    "taluk": "DINDIGUL",
    "pincode": "624622",
    "email": "PRINCIPAL@PSNACET.EDU.IN",
    "website": "http://psnacet.edu.in/",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "BM",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "CE",
        "intake": 120,
        "startYear": 1984
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1984
      },
      {
        "code": "EE",
        "intake": 90,
        "startYear": 1995
      },
      {
        "code": "CS",
        "intake": 240,
        "startYear": 1995
      },
      {
        "code": "IT",
        "intake": 180,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 240,
        "startYear": 1984
      },
      {
        "code": "AD",
        "intake": 60,
        "startYear": 2020
      }
    ]
  },
  {
    "code": "5911",
    "name": "P T R College of Engineering and Technology",
    "address": "Austinpatty Post, Madurai District 625008",
    "district": "Madurai",
    "taluk": "Thiruparankunram",
    "pincode": "625008",
    "email": "officeptrcet@gmail.com",
    "website": "www.ptrcet.org",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 2014
      },
      {
        "code": "CS",
        "intake": 30,
        "startYear": 2001
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2006
      },
      {
        "code": "EC",
        "intake": 30,
        "startYear": 2001
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 2006
      }
    ]
  },
  {
    "code": "5912",
    "name": "Pandian Saraswathi Yadav Engineering College",
    "address": "Thirumansolai Post, Sivagangai District 630 561",
    "district": "Madurai",
    "taluk": "Sivagangai",
    "pincode": "630561",
    "email": "info@psyec.edu.in",
    "website": "www.psyec.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2006
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2000
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2000
      }
    ]
  },
  {
    "code": "5913",
    "name": "Ratnavel Subramaniam College of Engineering and Technology",
    "address": "N Paraipatti Post, Dindigul District 624005",
    "district": "Dindigul",
    "taluk": "Vedasanthur",
    "pincode": "624005",
    "email": "rvscet.dgl@rvsgroup.com",
    "website": "www.rvseng.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 1985
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1985
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1994
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1996
      },
      {
        "code": "ME",
        "intake": 90,
        "startYear": 1985
      },
      {
        "code": "PD",
        "intake": 60,
        "startYear": 2014
      },
      {
        "code": "TX",
        "intake": 30,
        "startYear": 1997
      }
    ]
  },
  {
    "code": "5914",
    "name": "SOLAIMALAI COLLEGE OF ENGINEERIG",
    "address": "Veerapanjan, Madurai District 625020",
    "district": "Madurai",
    "taluk": "othakadai",
    "pincode": "625020",
    "email": "solamalai.scemdu@gmail.com",
    "website": "www.solamalaice.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 30,
        "startYear": 1999
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1995
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1997
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 1995
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 1995
      }
    ]
  },
  {
    "code": "5915",
    "name": "SACS-M A V M M Engineering College",
    "address": "Kidaripatty Post, Madurai District 625001",
    "district": "Madurai",
    "taluk": "Melur",
    "pincode": "625301",
    "email": "sacsmec@yahoo.com",
    "website": "www.sacsmec.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "ME",
        "intake": 120,
        "startYear": 1998
      }
    ]
  },
  {
    "code": "5919",
    "name": "St. Michael College of Engineering and Technology",
    "address": "Kalayarkoil, Sivagangai District 630551",
    "district": "Sivagangai",
    "taluk": "kalayarkoil",
    "pincode": "630551",
    "email": "principal@smcet.edu.in",
    "website": "www.smcet.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2002
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2012
      },
      {
        "code": "BT",
        "intake": 60,
        "startYear": 2002
      },
      {
        "code": "CH",
        "intake": 40,
        "startYear": 1998
      }
    ]
  },
  {
    "code": "5921",
    "name": "Syed Ammal Engineering College",
    "address": "Achunthanvayal Post, Ramanathapuram District- 623502",
    "district": "Ramanathapuram",
    "taluk": "Ramanathapuram",
    "pincode": "623502",
    "email": "office@syedengg.ac.in",
    "website": "www.syedengg.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 1998
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "AD",
        "intake": 30,
        "startYear": 2021
      },
      {
        "code": "CB",
        "intake": 30,
        "startYear": 2021
      }
    ]
  },
  {
    "code": "5930",
    "name": "SBM College of Engineering and Technology",
    "address": "Thamaraipady, T N Paraipatti Pirivu, Dindigul District 624005",
    "district": "Dindigul",
    "taluk": "DINDIGUL",
    "pincode": "624005",
    "email": "sbmecollege@gmail.com",
    "website": "www.sbminstitutions.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 120,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 150,
        "startYear": 2009
      }
    ]
  },
  {
    "code": "5935",
    "name": "Fatima Michael College of Engineering & Technology",
    "address": "Sengottai Village, Sivagangai Main Road, Madurai District 625020",
    "district": "Madurai",
    "taluk": "Madurai East",
    "pincode": "625020",
    "email": "fmcet935@gmail.com",
    "website": "www.fmcet.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "AU",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2010
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2010
      }
    ]
  },
  {
    "code": "5942",
    "name": "Ultra College of Engineering & Technology",
    "address": "Kodikulam, 1 Bit Village, Madurai-Chennai Highway, Madurai District 625104",
    "district": "Chennai",
    "taluk": "Madurai",
    "pincode": "625104",
    "email": "principal@ucetw.ac.in",
    "website": "http://ucetw.ac.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "EC",
        "intake": 34,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 34,
        "startYear": 2009
      },
      {
        "code": "EE",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "ME",
        "intake": 30,
        "startYear": 2009
      },
      {
        "code": "IT",
        "intake": 30,
        "startYear": 2011
      },
      {
        "code": "CE",
        "intake": 35,
        "startYear": 2013
      }
    ]
  },
  {
    "code": "5986",
    "name": "Velammal College of Engineering and Technology",
    "address": "Madurai - Rameshwaram High Road, Viraganoor, Madurai District 625009",
    "district": "Madurai",
    "taluk": "Madurai (South)",
    "pincode": "625009",
    "email": "principal@vcet.ac.in",
    "website": "www.vcet.ac.in",
    "autonomous": true,
    "type": "self_financing",
    "branches": [
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2011
      },
      {
        "code": "CS",
        "intake": 120,
        "startYear": 2007
      },
      {
        "code": "EC",
        "intake": 120,
        "startYear": 2007
      },
      {
        "code": "IT",
        "intake": 90,
        "startYear": 2007
      },
      {
        "code": "ME",
        "intake": 60,
        "startYear": 2008
      }
    ]
  },
  {
    "code": "5988",
    "name": "Theni Kammavar Sangam College of Technology",
    "address": "Theni Main Road, Koduvillarpatti Post, Theni District 625534",
    "district": "Theni",
    "taluk": "Theni",
    "pincode": "625534",
    "email": "principaltksct@gmail.com",
    "website": "www.tkscte.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 60,
        "startYear": 2009
      },
      {
        "code": "CS",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "EC",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "EE",
        "intake": 60,
        "startYear": 2007
      },
      {
        "code": "ME",
        "intake": 90,
        "startYear": 2007
      }
    ]
  },
  {
    "code": "5990",
    "name": "Latha Mathavan Engineering College",
    "address": "Kidaripatti Post, Alagarkoil (Via), Melur Taluk, Madurai District 625301",
    "district": "Madurai",
    "taluk": ",",
    "pincode": "625301",
    "email": "lmecmdu@yahoo.co.in",
    "website": "www.lathamathavan.edu.in",
    "autonomous": false,
    "type": "self_financing",
    "branches": [
      {
        "code": "CE",
        "intake": 90,
        "startYear": 2010
      },
      {
        "code": "CS",
        "intake": 90,
        "startYear": 2007
      },
      {
        "code": "EE",
        "intake": 45,
        "startYear": 2007
      },
      {
        "code": "EC",
        "intake": 90,
        "startYear": 2007
      },
      {
        "code": "ME",
        "intake": 135,
        "startYear": 2010
      }
    ]
  }
];

export const TOTAL_COLLEGES = TNEA_COLLEGES.length;

/** Distinct districts present in the dataset, sorted. */
export const TNEA_DISTRICTS: string[] = Array.from(
  new Set(TNEA_COLLEGES.map(c => c.district).filter((d): d is string => !!d))
).sort();

/** Distinct branch codes present anywhere in the dataset, sorted. */
export const TNEA_BRANCH_CODES: string[] = Array.from(
  new Set(TNEA_COLLEGES.flatMap(c => c.branches.map(b => b.code)))
).sort();

/** Quick lookup by TNEA code. */
export function getCollegeByCode(code: string): TneaCollege | undefined {
  return TNEA_COLLEGES.find(c => c.code === code);
}

/** Full-text search across name and address (case-insensitive). */
export function searchColleges(q: string): TneaCollege[] {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  // Allow searching by TNEA code directly
  if (/^\d{1,4}$/.test(term)) {
    return TNEA_COLLEGES.filter(c => c.code.startsWith(term.padStart(4, '0')) || c.code.includes(term));
  }
  return TNEA_COLLEGES.filter(c =>
    c.name.toLowerCase().includes(term) ||
    (c.district?.toLowerCase().includes(term) ?? false) ||
    c.address.toLowerCase().includes(term)
  );
}

/** Filter colleges by district. */
export function getCollegesByDistrict(district: string): TneaCollege[] {
  return TNEA_COLLEGES.filter(c => c.district === district);
}

/** Filter colleges that offer a given branch code. */
export function getCollegesByBranch(branchCode: string): TneaCollege[] {
  return TNEA_COLLEGES.filter(c => c.branches.some(b => b.code === branchCode));
}

/** Category labels for the UI. */
export const COLLEGE_TYPE_LABELS: Record<TneaCollegeType, { label: string; tamil: string; tone: string }> = {
  university:     { label: "Anna University Dept",  tamil: "அண்ணா பல்கலை துறை",     tone: "emerald" },
  government:     { label: "Government",            tamil: "அரசு",                  tone: "blue" },
  aided:          { label: "Government-Aided",      tamil: "அரசு உதவி",            tone: "teal" },
  constituent:    { label: "Constituent (AU)",      tamil: "தொகுதி",               tone: "amber" },
  research:       { label: "Research Institute",    tamil: "ஆராய்ச்சி நிறுவனம்",   tone: "purple" },
  self_financing: { label: "Self-Financing",        tamil: "சுயநிதி",              tone: "rose" },
};
