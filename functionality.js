/* ========================================================================== */
/*  SECTION: Constants & Demo Data                                            */
/*  Purpose: Define static values, demo seed users, and opportunity records. */
/* ========================================================================== */
//#region Constants & Demo Data
/** ---------- Storage + Data ---------- **/

// Persistent localStorage key for the full app state (users, applications, docs, config).
const STORE_KEY = "tvet_seta_mvp_store_v1";
// sessionStorage key for the active signed-in user id across hash-route navigation.
const SESSION_KEY = "tvet_seta_mvp_session_user_id";
const MOBILE_DASHBOARD_VIEW_KEY = "tvet_seta_mvp_mobile_dashboard_view";
const APP_VERSION = "2026-03-02-01";
const STORAGE_VERSION_KEY = "tvet_seta_storage_version";
const DEBUG = true;
const APP_STORAGE_PREFIXES = ["tvet_", "student_", "admin_", "applications_", "documents_", "guidance_"];
const SHOW_DEMO_TOOLS = /localhost|127\.0\.0\.1/.test(String(location.hostname || ""));
const PLATFORM_ADMIN_ROLES = new Set(["admin", "super_admin", "reviewer"]);
const PARTNER_WORKSPACE_ROLES = new Set(["institution_admin", "corporate_partner"]);
const ADMIN_ROLES = new Set([...PLATFORM_ADMIN_ROLES, ...PARTNER_WORKSPACE_ROLES]);
const APPLICATION_PIPELINE_STAGES = ["applied", "under_review", "shortlisted", "interview", "accepted", "rejected"];
const PUBLIC_SIGNUP_ROLE = "student";

// Interest catalogue used by onboarding, career quiz, and bursary eligibility filters.
const INTERESTS = [
  "Information Technology (Software)",
  "Cybersecurity",
  "Data & Analytics",
  "Networking & Cloud",
  "Entrepreneurship & Startups",
  "Marketing & Sales",
  "Finance & Investment",
  "Accounting & Auditing",
  "Law & Compliance",
  "Healthcare & Wellness",
  "Education & Training",
  "Construction & Built Environment",
  "Mechanical & Automotive",
  "Electrical & Renewable Energy",
  "Hospitality & Tourism",
  "Logistics & Supply Chain",
  "Agriculture & Food Systems",
  "Design & Creative Media",
  "Public Service & Government",
  "Science & Research"
];
const APPLICATION_STATUSES = ["draft", "submitted", "in_review", "shortlisted", "rejected", "funded", "completed"];
const LEGACY_STATUS_TO_APPLICATION_STATUS = {
  "Submitted": "submitted",
  "Under Review": "in_review",
  "Accepted": "funded",
  "Rejected": "rejected"
};
const APPLICATION_STATUS_LABELS = {
  draft: "Draft",
  submitted: "Submitted",
  in_review: "In review",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
  funded: "Funded",
  completed: "Completed"
};
const STATUSES = APPLICATION_STATUSES;
const PROVINCES = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "Northern Cape",
  "North West",
  "Western Cape"
];
const DOC_CATEGORIES = [
  "ID Copy",
  "Matric Certificate / School Report",
  "TVET Transcript",
  "Other Transcript",
  "Proof of Income"
];
const ACADEMIC_DOC_CATEGORIES = [
  "Matric Certificate / School Report",
  "TVET Transcript",
  "Other Transcript"
];
const ALLOWED_FILE_EXTENSIONS = new Set(["png", "jpg", "jpeg", "pdf"]);
const LIFECYCLE_PROGRESS = ["On Track", "At Risk", "Critical"];
const PLACEMENT_STATUSES = ["Not placed", "Interviewing", "Placed"];
const OPPORTUNITY_TYPES = ["Bursary", "Learnership", "Internship", "Course"];
const OPPORTUNITY_STORE_BUCKETS = ["courses", "bursaries", "learnerships"];
const OPPORTUNITY_REQUIRED_DOCUMENT_OPTIONS = ["ID Copy", "Academic Transcript", "Proof of Address", "CV"];
const CAREER_CATEGORIES = ["IT", "Engineering", "Business", "Trades", "Science"];
const CAREER_GUIDANCE_DOC_CATEGORIES = [
  "ID Copy",
  "Latest results/transcript",
  "Proof of address"
];
// Career Guidance wizard step definitions (labels, input type, options, and required state).
const CAREER_QUIZ_QUESTIONS = [
  {
    id: "educationLevel",
    label: "Education level",
    type: "single",
    options: ["Grade 10–12", "Matric", "NCV", "N1–N6", "Diploma/Bachelor’s"],
    required: false
  },
  {
    id: "province",
    label: "Province",
    type: "single",
    options: PROVINCES,
    required: true
  },
  {
    id: "interests",
    label: "Interests",
    type: "multi",
    options: INTERESTS,
    required: true
  },
  {
    id: "subjects",
    label: "Favourite subjects",
    type: "multi",
    options: [
      "Mathematics",
      "Mathematical Literacy",
      "English",
      "Afrikaans",
      "isiZulu",
      "Life Orientation",
      "Physical Sciences",
      "Accounting",
      "Life Sciences",
      "Geography",
      "History",
      "Business Studies",
      "Economics",
      "CAT (Computer Applications Technology)",
      "IT (Information Technology)",
      "EGD (Engineering Graphics & Design)",
      "Civil Technology",
      "Mechanical Technology",
      "Electrical Technology",
      "Tourism",
      "Consumer Studies",
      "Agricultural Sciences",
      "Visual Arts",
      "Dramatic Arts",
      "Music"
    ],
    required: false
  },
  {
    id: "workStyle",
    label: "Work style",
    type: "single",
    options: ["Hands-on", "Desk work", "Mix"],
    required: false
  },
  {
    id: "environment",
    label: "Environment",
    type: "single",
    options: ["Indoors", "Outdoors", "Both"],
    required: false
  },
  {
    id: "strengths",
    label: "Strengths",
    type: "multi",
    options: [
      "Problem-solving",
      "People skills",
      "Creativity",
      "Detail",
      "Leadership",
      "Analytical thinking",
      "Attention to detail",
      "Communication (written)",
      "Communication (verbal)",
      "Teamwork & collaboration",
      "Leadership potential",
      "Time management",
      "Adaptability",
      "Practical hands-on ability",
      "Technical aptitude",
      "Customer service mindset",
      "Research skills",
      "Planning & organisation",
      "Conflict resolution",
      "Resilience",
      "Initiative / self-starter",
      "Presentation skills",
      "Working under pressure",
      "Negotiation",
      "Critical thinking"
    ],
    required: false
  },
  {
    id: "preference",
    label: "Preference",
    type: "single",
    options: [
      "Stability",
      "High earning potential",
      "Entrepreneurship",
      "Helping community"
    ],
    required: false
  },
  {
    id: "availability",
    label: "Availability",
    type: "single",
    options: ["Full-time study", "Part-time", "Learn-while-you-earn"],
    required: false
  },
  {
    id: "timeframe",
    label: "Timeframe",
    type: "single",
    options: ["ASAP", "3–6 months", "6–12 months", "1–2 years"],
    required: false
  }
];

// Name parsing helpers keep user records normalized for display and profile editing.
function splitFullName(fullName) {
  const cleaned = String(fullName || "").trim().replace(/\s+/g, " ");
  if (!cleaned) return { firstName: "", surname: "" };
  const parts = cleaned.split(" ");
  if (parts.length === 1) return { firstName: parts[0], surname: "" };
  return {
    firstName: parts[0],
    surname: parts.slice(1).join(" ")
  };
}

function buildFullName(firstName, surname, fallback = "") {
  const first = String(firstName || "").trim();
  const sur = String(surname || "").trim();
  const composed = [first, sur].filter(Boolean).join(" ").trim();
  return composed || String(fallback || "").trim();
}

function normalizeUserRecord(rawUser) {
  const user = rawUser && typeof rawUser === "object" ? rawUser : {};
  const baseName = String(user.name || "").trim();
  const baseProfile = user.profile && typeof user.profile === "object" ? user.profile : null;
  const profileName = baseProfile?.fullName || baseName;
  const split = splitFullName(profileName);

  const firstName = String(baseProfile?.firstName || split.firstName || "").trim();
  const surname = String(baseProfile?.surname || split.surname || "").trim();
  const fullName = buildFullName(firstName, surname, profileName || baseName);

  const normalized = {
    ...user,
    name: fullName || baseName || String(user.email || "User"),
    email: String(user.email || "").trim(),
    password: String(user.password || ""),
    role: user.role || "student"
  };

  if (!baseProfile) return normalized;

  normalized.profile = {
    ...baseProfile,
    fullName: baseProfile.fullName || fullName || baseName,
    firstName,
    surname,
    email: baseProfile.email || normalized.email,
    password: baseProfile.password || normalized.password,
    profilePhotoDataUrl: baseProfile.profilePhotoDataUrl || "",
    profilePhotoMeta: baseProfile.profilePhotoMeta || null
  };

  return normalized;
}

// Demo seed accounts available for quick login in the MVP.
const demoUsers = [
  {
    id: "user-admin-demo",
    name: "Demo Admin",
    email: "admin@demo.co.za",
    password: "password123",
    role: "admin"
  },
  {
    id: "user-student-demo",
    name: "Demo Student",
    email: "student@demo.co.za",
    password: "password123",
    role: "student"
  },
  {
    id: "user-corporate-demo",
    name: "Standard Bank Talent Partnerships",
    email: "corporate@demo.co.za",
    password: "password123",
    role: "corporate_partner",
    institutionId: "standard-bank-talent-partnerships",
    profile: {
      organisationName: "Standard Bank Talent Partnerships",
      institutionId: "standard-bank-talent-partnerships"
    }
  },
  {
    id: "user-institute-demo",
    name: "Wits Digital Campus",
    email: "institute@demo.co.za",
    password: "password123",
    role: "institution_admin",
    institutionId: "wits-digital-campus",
    profile: {
      organisationName: "Wits Digital Campus",
      institutionId: "wits-digital-campus"
    }
  }
];

// Demo opportunity catalogue across bursaries, learnerships, internships, and courses.
const opportunities = [
  {
    id: "opp-bur-001",
    type: "Bursary",
    title: "Mechanical Engineering Bursary Programme",
    institution: "Sasol Foundation",
    location: "Mpumalanga",
    sector: "Engineering",
    closingDate: "2026-07-31",
    stipendOrValue: "Up to R85,000/year",
    requirements: ["South African citizen", "Grade 12 with Mathematics and Physical Science", "Proof of household income"],
    description: "Bursary support for first-year mechanical engineering students at TVET and university pathways."
  },
  {
    id: "opp-bur-002",
    type: "Bursary",
    title: "ICT Support Skills Bursary",
    institution: "MICT SETA",
    location: "National",
    sector: "IT",
    closingDate: "2026-06-30",
    stipendOrValue: "Up to R70,000/year",
    requirements: ["Grade 12", "Computer literacy", "Motivation letter"],
    description: "Funding for learners entering IT support, networking, and software support programmes."
  },
  {
    id: "opp-bur-003",
    type: "Bursary",
    title: "Public Finance Bursary",
    institution: "National Treasury Partner Fund",
    location: "Gauteng",
    sector: "Finance",
    closingDate: "2026-08-15",
    stipendOrValue: "Up to R90,000/year",
    requirements: ["Accounting or Mathematics pass", "South African ID", "Academic results"],
    description: "Supports students pursuing public finance, accounting, and financial management qualifications."
  },
  {
    id: "opp-bur-004",
    type: "Bursary",
    title: "Health Sciences Access Bursary",
    institution: "KwaZulu-Natal Department of Health",
    location: "KwaZulu-Natal",
    sector: "Science",
    closingDate: "2026-05-30",
    stipendOrValue: "Up to R95,000/year",
    requirements: ["Life Sciences pass", "South African citizen", "Commitment to community service"],
    description: "Bursary for learners entering health sciences and laboratory support pathways."
  },
  {
    id: "opp-bur-005",
    type: "Bursary",
    title: "Renewable Energy Technician Bursary",
    institution: "EWSETA Green Skills Programme",
    location: "Northern Cape",
    sector: "Engineering",
    closingDate: "2026-09-10",
    stipendOrValue: "Up to R80,000/year",
    requirements: ["Mathematics and Science pass", "Interest in energy sector", "Proof of residence"],
    description: "Funds learners focused on solar, wind, and electrical infrastructure technician pathways."
  },
  {
    id: "opp-bur-006",
    type: "Bursary",
    title: "Artisan Development Bursary",
    institution: "merSETA Skills Fund",
    location: "Limpopo",
    sector: "Trades",
    closingDate: "2026-07-20",
    stipendOrValue: "Up to R65,000/year",
    requirements: ["N2 or Grade 12", "Technical aptitude", "ID Copy"],
    description: "Bursary support for artisan development in welding, fitting, and related trades."
  },
  {
    id: "opp-lear-001",
    type: "Learnership",
    title: "Banking Operations Learnership",
    institution: "Standard Bank",
    location: "Gauteng",
    sector: "Finance",
    closingDate: "2026-04-30",
    stipendOrValue: "R6,500/month",
    fundingAmount: "R6,500/month",
    focusArea: "Banking Operations, Customer Service, Financial Administration",
    badges: ["Open", "Banking"],
    tags: ["Open", "Banking", "Operations"],
    image: "images/Standard-Bank.jpg",
    siteLocation: "Johannesburg",
    requirements: ["Grade 12 / Matric", "Communication skills", "South African ID"],
    description: "Entry-level banking operations learnership focused on customer support, branch administration, and service delivery.",
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-lear-002",
    type: "Learnership",
    title: "Chemical Engineering Learnership",
    institution: "Sasol",
    location: "Mpumalanga",
    sector: "Engineering",
    closingDate: "2026-05-25",
    stipendOrValue: "R8,000/month",
    fundingAmount: "R8,000/month",
    focusArea: "Chemical Engineering, Plant Operations, Process Control",
    badges: ["Open", "Engineering"],
    tags: ["Open", "Engineering", "Chemical"],
    image: "images/Sasol.jpeg",
    siteLocation: "Secunda",
    requirements: ["Matric with Mathematics and Physical Science", "Engineering interest", "CV"],
    description: "Workplace-based chemical engineering learnership linked to plant operations and production support.",
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-lear-003",
    type: "Learnership",
    title: "Retail Management Learnership",
    institution: "Shoprite Group",
    location: "Western Cape",
    sector: "Business",
    closingDate: "2026-06-05",
    stipendOrValue: "R5,500/month",
    fundingAmount: "R5,500/month",
    focusArea: "Retail Operations, Store Administration, Customer Experience",
    badges: ["Open", "Retail"],
    tags: ["Open", "Retail", "Management"],
    image: "images/Shoprite.png",
    siteLocation: "Cape Town",
    requirements: ["Grade 12 / Matric", "Customer service mindset", "Willingness to work retail shifts"],
    description: "Retail leadership learnership for students interested in store operations, supervision, and customer experience.",
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-int-001",
    type: "Internship",
    title: "Digital Marketing Internship",
    institution: "Vodacom",
    location: "Gauteng",
    sector: "Marketing",
    closingDate: "2026-05-12",
    stipendOrValue: "R7,200/month",
    fundingAmount: "R7,200/month",
    focusArea: "Digital Marketing, Campaign Analytics, Content Performance",
    badges: ["Open", "Marketing"],
    tags: ["Open", "Marketing", "Internship"],
    image: "images/Vodacom.jpg",
    siteLocation: "Midrand",
    requirements: ["Marketing or media qualification", "Digital communication skills", "Portfolio or CV"],
    description: "Hands-on internship supporting digital campaigns, reporting, and brand growth across Vodacom channels.",
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-int-002",
    type: "Internship",
    title: "Software Development Internship",
    institution: "MTN",
    location: "Gauteng",
    sector: "IT",
    closingDate: "2026-06-28",
    stipendOrValue: "R9,000/month",
    fundingAmount: "R9,000/month",
    focusArea: "Software Development, APIs, Product Engineering",
    badges: ["Open", "Technology"],
    tags: ["Open", "Technology", "Internship"],
    image: "images/MTN.jpg",
    siteLocation: "Johannesburg",
    requirements: ["Software development qualification", "Portfolio or GitHub", "Problem-solving skills"],
    description: "Engineering internship for emerging developers contributing to internal products and digital platforms.",
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-int-003",
    type: "Internship",
    title: "Municipal Finance Internship",
    institution: "City of Cape Town",
    location: "Western Cape",
    sector: "Finance",
    closingDate: "2026-07-02",
    stipendOrValue: "R6,200/month",
    fundingAmount: "R6,200/month",
    focusArea: "Municipal Finance, Budgeting, Public Administration",
    badges: ["Open", "Public Service"],
    tags: ["Open", "Public Service", "Finance"],
    image: "images/City of Cape Town.jpg.webp",
    siteLocation: "Cape Town",
    requirements: ["Finance or public administration qualification", "Spreadsheet skills", "South African ID"],
    description: "Internship in municipal finance supporting budgeting, reporting, and community-facing service functions.",
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-crs-001",
    type: "Course",
    title: "Data Analytics Short Course",
    institution: "UCT Online",
    location: "National",
    sector: "Data & Analytics",
    closingDate: "Rolling",
    stipendOrValue: "12 weeks",
    fundingAmount: "12 weeks",
    duration: "12 weeks",
    certificationType: "Short Course Certificate",
    focusArea: "Excel, SQL, Data Visualisation, Decision-making",
    tags: ["Excel", "SQL", "Data Visualisation"],
    image: "images/UCT Online.png",
    requirements: ["Grade 12 recommended", "Basic numeracy", "Reliable internet access"],
    description: "Practical online course introducing core analytics tools, dashboards, and decision-making frameworks.",
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-crs-002",
    type: "Course",
    title: "AI & Machine Learning Foundations",
    institution: "Wits Digital Campus",
    location: "National",
    sector: "Artificial Intelligence / Data Science",
    closingDate: "Rolling",
    stipendOrValue: "10 weeks",
    fundingAmount: "10 weeks",
    duration: "10 weeks",
    certificationType: "Certificate of Completion",
    focusArea: "Machine Learning, Python, AI Concepts",
    tags: ["AI", "Python", "Machine Learning"],
    image: "images/wits digital campus.jpg",
    requirements: ["Grade 12 recommended", "Analytical mindset", "Laptop access"],
    description: "Foundation course covering machine learning concepts, data handling, and practical AI problem solving.",
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-crs-003",
    type: "Course",
    title: "Software Engineering Bootcamp",
    institution: "HyperionDev",
    location: "National",
    sector: "Computer Science / ICT",
    closingDate: "Rolling",
    stipendOrValue: "6 months",
    fundingAmount: "6 months",
    duration: "6 months",
    certificationType: "Bootcamp Certificate",
    focusArea: "JavaScript, Python, Git, Full-stack Development",
    tags: ["JavaScript", "Python", "Git"],
    image: "images/hyperiondev.png",
    requirements: ["Basic computer literacy", "Problem-solving mindset", "Laptop access"],
    description: "Immersive software engineering programme covering programming fundamentals, web development, and portfolio work.",
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-crs-004",
    type: "Course",
    title: "Professional Foundations",
    institution: "ALX Africa",
    location: "National",
    sector: "Business",
    closingDate: "Rolling",
    stipendOrValue: "8 weeks",
    fundingAmount: "8 weeks",
    duration: "8 weeks",
    certificationType: "Professional Certificate",
    focusArea: "Communication, Productivity, Career Readiness",
    tags: ["Communication", "Career Readiness", "Productivity"],
    image: "images/alx_Africa_Business_Communities.png",
    requirements: ["Open to all learners", "Commitment to coursework", "Reliable connectivity"],
    description: "Career-readiness programme designed to build professional communication, productivity, and workplace confidence.",
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-crs-005",
    type: "Course",
    title: "IT Support Certificate",
    institution: "Google Career Certificates",
    location: "National",
    sector: "Computer Science / ICT",
    closingDate: "Rolling",
    stipendOrValue: "6 months",
    fundingAmount: "6 months",
    duration: "6 months",
    certificationType: "Professional Certificate",
    focusArea: "IT Support, Troubleshooting, Networking, Systems",
    tags: ["IT Support", "Troubleshooting", "Networking"],
    image: "images/google.webp",
    requirements: ["No prior experience required", "Basic digital skills", "Internet access"],
    description: "Beginner-friendly IT support programme covering troubleshooting, systems, networking, and customer service.",
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-crs-006",
    type: "Course",
    title: "Azure Fundamentals",
    institution: "Microsoft Learn",
    location: "National",
    sector: "Computer Science / ICT",
    closingDate: "Rolling",
    stipendOrValue: "4 weeks",
    fundingAmount: "4 weeks",
    duration: "4 weeks",
    certificationType: "Certification Prep",
    focusArea: "Azure, Cloud Fundamentals, Infrastructure",
    tags: ["Azure", "Cloud", "Infrastructure"],
    image: "images/Microsoft Learn.png",
    requirements: ["Basic cloud interest", "Self-paced study discipline", "Internet access"],
    description: "Cloud fundamentals course introducing Azure services, infrastructure basics, and certification preparation.",
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-lear-004",
    type: "Learnership",
    title: "Mechanical Engineering Learnership",
    institution: "Transnet",
    location: "KwaZulu-Natal",
    sector: "Engineering",
    closingDate: "2026-06-12",
    stipendOrValue: "R7,800/month",
    fundingAmount: "R7,800/month",
    focusArea: "Mechanical Engineering, Maintenance, Rail Operations",
    badges: ["Open", "Engineering"],
    tags: ["Open", "Engineering", "Rail"],
    image: "images/transnet.png",
    siteLocation: "Durban",
    requirements: ["Matric with Maths and Science", "Mechanical aptitude", "South African ID"],
    description: "Engineering learnership supporting rail and mechanical operations within a major logistics environment.",
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-lear-005",
    type: "Learnership",
    title: "Automotive Engineering Learnership",
    institution: "Toyota South Africa",
    location: "KwaZulu-Natal",
    sector: "Engineering",
    closingDate: "2026-07-18",
    stipendOrValue: "R7,500/month",
    fundingAmount: "R7,500/month",
    focusArea: "Automotive Engineering, Production, Quality Systems",
    badges: ["Open", "Automotive"],
    tags: ["Open", "Automotive", "Engineering"],
    image: "images/Toyota South Africa.jpg",
    siteLocation: "Durban",
    requirements: ["Matric with Maths and Science", "Interest in manufacturing", "CV"],
    description: "Automotive engineering learnership exposing learners to plant production, quality, and technical operations.",
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-lear-006",
    type: "Learnership",
    title: "Electrical Technician Learnership",
    institution: "Eskom",
    location: "Free State",
    sector: "Engineering",
    closingDate: "2026-07-31",
    stipendOrValue: "R6,800/month",
    fundingAmount: "R6,800/month",
    focusArea: "Electrical Maintenance, Energy Systems, Field Operations",
    badges: ["Closing Soon", "Energy"],
    tags: ["Closing Soon", "Energy", "Engineering"],
    image: "images/eskom-logo_orig.png",
    siteLocation: "Bloemfontein",
    requirements: ["N2 Electrical or Matric with science", "Medical fitness", "South African ID"],
    description: "Technical learnership for aspiring electrical technicians supporting energy and field maintenance work.",
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-int-004",
    type: "Internship",
    title: "Cloud Support Internship",
    institution: "IBM South Africa",
    location: "Gauteng",
    sector: "Computer Science / ICT",
    closingDate: "2026-08-08",
    stipendOrValue: "R9,500/month",
    fundingAmount: "R9,500/month",
    focusArea: "Cloud Support, Enterprise Systems, Client Success",
    badges: ["Open", "Cloud"],
    tags: ["Open", "Cloud", "Technology"],
    image: "images/IBM South Africa.png",
    siteLocation: "Johannesburg",
    requirements: ["IT or cloud qualification", "Customer support mindset", "CV"],
    description: "Cloud support internship focused on troubleshooting, service delivery, and enterprise client environments.",
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-crs-007",
    type: "Course",
    title: "Business Strategy Certificate",
    institution: "Coursera + University of London",
    location: "National",
    sector: "Business / Finance",
    closingDate: "Rolling",
    stipendOrValue: "10 weeks",
    fundingAmount: "10 weeks",
    duration: "10 weeks",
    certificationType: "University Certificate",
    focusArea: "Strategy, Leadership, Business Analysis",
    tags: ["Strategy", "Leadership", "Business Analysis"],
    image: "images/U_of_Londo_Coursera.png",
    requirements: ["Open to graduates and working professionals", "Internet access", "Commitment to coursework"],
    description: "Business strategy course introducing market positioning, leadership, and decision-making in modern organisations.",
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-crs-008",
    type: "Course",
    title: "Cloud Practitioner Certification",
    institution: "AWS Training",
    location: "National",
    sector: "Computer Science / ICT",
    closingDate: "Rolling",
    stipendOrValue: "6 weeks",
    fundingAmount: "6 weeks",
    duration: "6 weeks",
    certificationType: "Certification Prep",
    focusArea: "AWS Cloud, Security, Billing, Architecture Basics",
    tags: ["AWS", "Cloud", "Security"],
    image: "images/AWS Training.png",
    requirements: ["Basic computer literacy", "Internet access", "Self-paced study discipline"],
    description: "Foundational AWS training covering cloud concepts, billing, security, and exam preparation.",
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-crs-009",
    type: "Course",
    title: "Digital Marketing Certificate",
    institution: "IIE Varsity College",
    location: "National",
    sector: "Marketing",
    closingDate: "Rolling",
    stipendOrValue: "12 weeks",
    fundingAmount: "12 weeks",
    duration: "12 weeks",
    certificationType: "Certificate",
    focusArea: "Digital Marketing, Content Strategy, Campaign Analytics",
    tags: ["Digital Marketing", "Analytics", "Content"],
    image: "images/IIE Varsity College.png",
    requirements: ["Open to school leavers and graduates", "Communication skills", "Internet access"],
    description: "Digital marketing course covering campaign planning, content, paid media, and analytics fundamentals.",
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-crs-010",
    type: "Course",
    title: "Project Management Fundamentals",
    institution: "UNISA Short Courses",
    location: "National",
    sector: "Business",
    closingDate: "Rolling",
    stipendOrValue: "10 weeks",
    fundingAmount: "10 weeks",
    duration: "10 weeks",
    certificationType: "Short Course Certificate",
    focusArea: "Project Planning, Stakeholder Management, Risk Control",
    tags: ["Project Planning", "Stakeholder Management", "Risk"],
    image: "images/unisa-short-courses.webp",
    requirements: ["Open to all learners", "Basic workplace literacy", "Internet access"],
    description: "Short course in practical project management with a focus on planning, delivery, and stakeholder management.",
    verifiedPartner: true,
    listingStatus: "open"
  }
];
const CURATED_BURSARY_LISTING_OPPORTUNITIES = [
  {
    id: "opp-bur-nedbank",
    type: "Bursary",
    title: "Nedbank External Bursary Programme",
    institution: "Nedbank Group",
    provider: "Nedbank Group",
    location: "National",
    province: "National",
    sector: "Finance & Business",
    closingDate: "2026-08-31",
    stipendOrValue: "Up to R120,000 per year",
    fundingAmount: "Up to R120,000 per year",
    focusArea: "Finance, Accounting, Economics, Data Science",
    badges: ["Finance", "Applications Open"],
    tags: ["Finance", "Applications Open"],
    image: "images/nedbank.jpg",
    ctaText: "View bursary",
    description: "Financial support for high-performing students pursuing finance, economics, and data-focused degrees.",
    requirements: ["South African citizen", "Strong academic results", "Relevant tertiary study programme"],
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-bur-csir",
    type: "Bursary",
    title: "CSIR Data Science & AI Bursary",
    institution: "Council for Scientific and Industrial Research",
    provider: "Council for Scientific and Industrial Research",
    location: "National",
    province: "National",
    sector: "Artificial Intelligence / Data Science",
    closingDate: "2026-07-15",
    stipendOrValue: "Full tuition + research support",
    fundingAmount: "Full tuition + research support",
    focusArea: "AI, Data Science, Engineering, Computer Science",
    badges: ["STEM", "Research Programme"],
    tags: ["STEM", "Research Programme"],
    image: "images/csir.jpeg",
    ctaText: "View bursary",
    description: "Research-led bursary support for students advancing into AI, data science, and engineering pathways.",
    requirements: ["South African citizen", "Strong STEM academic record", "Relevant tertiary qualification"],
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-bur-absa",
    type: "Bursary",
    title: "Absa Fellowship Programme",
    institution: "Absa Group",
    provider: "Absa Group",
    location: "National",
    province: "National",
    sector: "Finance / Economics",
    closingDate: "2026-09-30",
    stipendOrValue: "Full tuition + leadership programme",
    fundingAmount: "Full tuition + leadership programme",
    focusArea: "Finance, Economics, Actuarial Science, Data Analytics",
    badges: ["Leadership", "Finance"],
    tags: ["Leadership", "Finance"],
    image: "images/Absa.copy.webp",
    ctaText: "View bursary",
    description: "A leadership-focused bursary supporting future finance and analytics professionals.",
    requirements: ["South African citizen", "Academic excellence", "Leadership potential"],
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-bur-transnet",
    type: "Bursary",
    title: "Transnet Engineering Bursary",
    institution: "Transnet SOC Ltd",
    provider: "Transnet SOC Ltd",
    location: "National",
    province: "National",
    sector: "Engineering",
    closingDate: "2026-07-31",
    stipendOrValue: "Full tuition + internship pathway",
    fundingAmount: "Full tuition + internship pathway",
    focusArea: "Mechanical, Electrical, Civil, Industrial Engineering",
    badges: ["Engineering", "Graduate Pipeline"],
    tags: ["Engineering", "Graduate Pipeline"],
    image: "images/transnet.png",
    ctaText: "View bursary",
    description: "Engineering bursary support with an internship pipeline into transport infrastructure careers.",
    requirements: ["South African citizen", "Engineering study pathway", "Strong mathematics and science results"],
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-bur-vodacom",
    type: "Bursary",
    title: "Vodacom Technology Bursary",
    institution: "Vodacom Group",
    provider: "Vodacom Group",
    location: "National",
    province: "National",
    sector: "Computer Science / ICT",
    closingDate: "2026-08-31",
    stipendOrValue: "Up to R100,000 per year",
    fundingAmount: "Up to R100,000 per year",
    focusArea: "Computer Science, Information Systems, Data Science, Electronic Engineering",
    badges: ["Technology", "Applications Open"],
    tags: ["Technology", "Applications Open"],
    image: "images/Vodacom.jpg",
    ctaText: "View bursary",
    description: "Technology bursary support for students building careers in ICT, data science, and engineering.",
    requirements: ["South African citizen", "Strong academic results", "Relevant technology qualification"],
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-bur-anglo-american",
    type: "Bursary",
    title: "Anglo American Mining Engineering Bursary",
    institution: "Anglo American",
    provider: "Anglo American",
    location: "National",
    province: "National",
    sector: "Mining Engineering",
    closingDate: "2026-06-30",
    stipendOrValue: "Full tuition + graduate programme",
    fundingAmount: "Full tuition + graduate programme",
    focusArea: "Mining Engineering, Metallurgy, Geology, Environmental Science",
    badges: ["Engineering", "Mining"],
    tags: ["Engineering", "Mining"],
    image: "images/anglo-americanlogo.jpg",
    ctaText: "View bursary",
    description: "Mining and earth sciences bursary with a graduate pipeline into Anglo American programmes.",
    requirements: ["South African citizen", "Mining or earth sciences study path", "Strong STEM academic results"],
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-bur-investec",
    type: "Bursary",
    title: "Investec Tertiary Bursary",
    institution: "Investec",
    provider: "Investec",
    location: "National",
    province: "National",
    sector: "Finance / Investment Banking",
    closingDate: "2026-09-30",
    stipendOrValue: "Full tuition + mentorship",
    fundingAmount: "Full tuition + mentorship",
    focusArea: "Finance, Economics, Engineering, Computer Science",
    badges: ["Finance", "Leadership"],
    tags: ["Finance", "Leadership"],
    image: "images/Investec.png",
    ctaText: "View bursary",
    description: "Tertiary bursary support paired with mentorship for future finance and technology talent.",
    requirements: ["South African citizen", "Excellent academic results", "Relevant undergraduate study path"],
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-bur-standard-bank",
    type: "Bursary",
    title: "Standard Bank Africa Bursary",
    institution: "Standard Bank Group",
    provider: "Standard Bank Group",
    location: "National",
    province: "National",
    sector: "Finance / Data Science",
    closingDate: "2026-09-15",
    stipendOrValue: "Full tuition + laptop",
    fundingAmount: "Full tuition + laptop",
    focusArea: "Finance, Data Science, Actuarial Science, Economics",
    badges: ["Finance", "Graduate Programme"],
    tags: ["Finance", "Graduate Programme"],
    image: "images/Standard-Bank.jpg",
    ctaText: "View bursary",
    description: "Bursary support for finance and data-driven disciplines with graduate programme exposure.",
    requirements: ["South African citizen", "Strong quantitative results", "Relevant tertiary programme"],
    verifiedPartner: true,
    listingStatus: "open"
  },
  {
    id: "opp-bur-eskom",
    type: "Bursary",
    title: "Eskom Electrical Engineering Bursary",
    institution: "Eskom Holdings",
    provider: "Eskom Holdings",
    location: "National",
    province: "National",
    sector: "Electrical Engineering",
    closingDate: "2026-06-30",
    stipendOrValue: "Full tuition + internship",
    fundingAmount: "Full tuition + internship",
    focusArea: "Electrical Engineering, Mechanical Engineering, Energy Studies",
    badges: ["Engineering", "Energy"],
    tags: ["Engineering", "Energy"],
    image: "images/eskom-logo_orig.png",
    ctaText: "View bursary",
    description: "Engineering bursary support that connects students to energy-sector training and internships.",
    requirements: ["South African citizen", "Engineering study path", "Strong mathematics and science results"],
    verifiedPartner: true,
    listingStatus: "open"
  }
];

function getStaticOpportunityCatalogue() {
  return [...CURATED_BURSARY_LISTING_OPPORTUNITIES, ...opportunities];
}

function defaultOpportunityStore() {
  return {
    courses: [],
    bursaries: [],
    learnerships: []
  };
}

function opportunityTypeToBucket(type) {
  const normalized = String(type || "").trim().toLowerCase();
  if (normalized === "bursary") return "bursaries";
  if (normalized === "course") return "courses";
  return "learnerships";
}

function defaultTypeForOpportunityBucket(bucket) {
  if (bucket === "bursaries") return "Bursary";
  if (bucket === "courses") return "Course";
  return "Learnership";
}

function normalizeOpportunityClosingDate(value) {
  const raw = String(value || "").trim();
  if (!raw || /^rolling$/i.test(raw)) return "Rolling";
  const parsed = new Date(raw).getTime();
  return Number.isFinite(parsed) ? raw : "Rolling";
}

function normalizeOpportunityTags(value) {
  if (Array.isArray(value)) {
    return value
      .map((tag) => String(tag || "").trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeOpportunityRequiredDocuments(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => String(item || "").trim())
    .filter((item) => OPPORTUNITY_REQUIRED_DOCUMENT_OPTIONS.includes(item));
}

function normalizeOpportunityRecord(rawOpportunity, bucketHint = "") {
  if (!rawOpportunity || typeof rawOpportunity !== "object") return null;

  const bucket = OPPORTUNITY_STORE_BUCKETS.includes(bucketHint)
    ? bucketHint
    : opportunityTypeToBucket(rawOpportunity.type || "");
  const typeCandidate = String(rawOpportunity.type || "").trim();
  const type = OPPORTUNITY_TYPES.includes(typeCandidate)
    ? typeCandidate
    : defaultTypeForOpportunityBucket(bucket);

  const title = String(rawOpportunity.title || "").trim();
  if (!title) return null;

  const provider = String(rawOpportunity.provider || rawOpportunity.institution || "").trim() || "Not specified";
  const province = String(rawOpportunity.province || rawOpportunity.location || "").trim() || "National";
  const sector = String(rawOpportunity.sector || "").trim() || "General";
  const closingDate = normalizeOpportunityClosingDate(rawOpportunity.closingDate);
  const tags = normalizeOpportunityTags(rawOpportunity.tags);
  const requiredDocuments = normalizeOpportunityRequiredDocuments(rawOpportunity.requiredDocuments);
  const requirements = Array.isArray(rawOpportunity.requirements)
    ? rawOpportunity.requirements.map((item) => String(item || "").trim()).filter(Boolean)
    : [];

  return {
    id: String(rawOpportunity.id || uid("opp")).trim(),
    type,
    title,
    provider,
    institution: provider,
    province,
    location: province,
    sector,
    closingDate,
    tags,
    requiredDocuments,
    requirements,
    description: String(rawOpportunity.description || "").trim() || "No description provided.",
    stipendOrValue: String(rawOpportunity.stipendOrValue || rawOpportunity.value || "-"),
    fundingAmount: String(rawOpportunity.fundingAmount || rawOpportunity.stipendOrValue || rawOpportunity.value || "-").trim() || "-",
    nqfLevel: String(rawOpportunity.nqfLevel || "").trim(),
    institutionId: String(rawOpportunity.institutionId || provider || "inst-partner").trim().toLowerCase().replaceAll(" ", "-"),
    verifiedPartner: rawOpportunity.verifiedPartner !== false,
    logoUrl: String(rawOpportunity.logoUrl || "").trim(),
    listingStatus: ["open", "closed", "archived"].includes(String(rawOpportunity.listingStatus || "").toLowerCase())
      ? String(rawOpportunity.listingStatus || "").toLowerCase()
      : "open"
  };
}

function normalizeOpportunityStore(rawStore) {
  const defaults = defaultOpportunityStore();
  const source = rawStore && typeof rawStore === "object" ? rawStore : {};
  const normalized = {
    courses: [],
    bursaries: [],
    learnerships: []
  };

  OPPORTUNITY_STORE_BUCKETS.forEach((bucket) => {
    const list = Array.isArray(source[bucket]) ? source[bucket] : defaults[bucket];
    normalized[bucket] = list
      .map((item) => normalizeOpportunityRecord(item, bucket))
      .filter(Boolean);
  });

  const seenIds = new Set();
  OPPORTUNITY_STORE_BUCKETS.forEach((bucket) => {
    normalized[bucket] = normalized[bucket].map((item) => {
      let id = String(item.id || "").trim();
      if (!id || seenIds.has(id)) {
        id = uid("opp");
      }
      seenIds.add(id);
      return {
        ...item,
        id
      };
    });
  });

  return normalized;
}

function flattenOpportunityStore(opportunityStore) {
  const source = opportunityStore && typeof opportunityStore === "object" ? opportunityStore : defaultOpportunityStore();
  return OPPORTUNITY_STORE_BUCKETS.flatMap((bucket) => (Array.isArray(source[bucket]) ? source[bucket] : []));
}

function ensureOpportunityStore() {
  store.opportunities = normalizeOpportunityStore(store.opportunities);
  return store.opportunities;
}

function getOpportunityCatalogue() {
  const staticCatalogue = Array.isArray(opportunities) ? opportunities : [];
  const stored = flattenOpportunityStore(store?.opportunities);
  if (!stored.length) return staticCatalogue;

  const merged = new Map(staticCatalogue.map((opportunity) => [opportunity.id, opportunity]));
  stored.forEach((opportunity) => {
    const existing = merged.get(opportunity.id) || {};
    merged.set(opportunity.id, { ...existing, ...opportunity });
  });

  return Array.from(merged.values());
}

function upsertOpportunityRecord(rawOpportunity, options = {}) {
  const opportunity = normalizeOpportunityRecord(rawOpportunity, options.bucket || "");
  if (!opportunity) {
    return { ok: false, error: "Opportunity title is required." };
  }

  const opportunityStore = ensureOpportunityStore();
  const targetBucket = opportunityTypeToBucket(opportunity.type);
  let updated = false;

  OPPORTUNITY_STORE_BUCKETS.forEach((bucket) => {
    const index = opportunityStore[bucket].findIndex((item) => item.id === opportunity.id);
    if (index !== -1) {
      opportunityStore[bucket].splice(index, 1);
      updated = true;
    }
  });

  opportunityStore[targetBucket].unshift(opportunity);

  if (options.save !== false) {
    saveStore(store);
  }

  logAuditEvent(updated ? "opportunity.updated" : "opportunity.created", {
    opportunityId: opportunity.id,
    title: opportunity.title,
    type: opportunity.type
  });

  return { ok: true, updated, opportunity };
}

function deleteOpportunityRecord(opportunityId, options = {}) {
  const id = String(opportunityId || "").trim();
  if (!id) return false;

  const opportunityStore = ensureOpportunityStore();
  let removed = false;

  OPPORTUNITY_STORE_BUCKETS.forEach((bucket) => {
    const before = opportunityStore[bucket].length;
    opportunityStore[bucket] = opportunityStore[bucket].filter((item) => item.id !== id);
    if (opportunityStore[bucket].length !== before) {
      removed = true;
    }
  });

  if (removed && options.save !== false) {
    saveStore(store);
  }

  if (removed) {
    logAuditEvent("opportunity.deleted", { opportunityId: id });
  }

  return removed;
}

function importOpportunitiesFromArray(records, options = {}) {
  if (!Array.isArray(records)) {
    return { ok: false, error: "Imported data must be a JSON array." };
  }

  const opportunityStore = ensureOpportunityStore();
  let inserted = 0;
  let updated = 0;
  let skipped = 0;

  records.forEach((record) => {
    const normalized = normalizeOpportunityRecord(record, "");
    if (!normalized) {
      skipped += 1;
      return;
    }

    const targetBucket = opportunityTypeToBucket(normalized.type);
    let hadExisting = false;

    OPPORTUNITY_STORE_BUCKETS.forEach((bucket) => {
      const index = opportunityStore[bucket].findIndex((item) => item.id === normalized.id);
      if (index !== -1) {
        opportunityStore[bucket].splice(index, 1);
        hadExisting = true;
      }
    });

    opportunityStore[targetBucket].unshift(normalized);
    if (hadExisting) updated += 1;
    else inserted += 1;
  });

  if (options.save !== false) {
    saveStore(store);
  }

  return {
    ok: true,
    inserted,
    updated,
    skipped,
    total: records.length
  };
}

// Unique id helper for new records generated during runtime interactions.
function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function defaultBursaryConfig() {
  return {
    brandName: "Corporate Bursary Programme",
    targetProvince: "",
    eligibility: {
      minAge: "",
      province: "",
      requiredInterests: []
    }
  };
}

function defaultInstitutions() {
  return [
    {
      id: "inst-sasol-foundation",
      name: "Sasol Foundation",
      type: "Corporate Partner",
      contactPerson: "Programme Office",
      contactEmail: "partnerships@sasolfoundation.org",
      accreditation: "DHET / SETA aligned",
      status: "verified",
      verified: true,
      registrationDocuments: [],
      submittedAt: "",
      reviewedAt: "",
      notes: "Seeded verified partner"
    },
    {
      id: "inst-mict-seta",
      name: "MICT SETA",
      type: "SETA",
      contactPerson: "Partnerships Desk",
      contactEmail: "partners@mict.org.za",
      accreditation: "SETA",
      status: "verified",
      verified: true,
      registrationDocuments: [],
      submittedAt: "",
      reviewedAt: "",
      notes: "Seeded verified partner"
    }
  ];
}

function getWorkspaceHomeRoute(user, options = {}) {
  if (!user) return "/home";

  const role = String(user.role || "").trim().toLowerCase();
  if (role === "corporate_partner") return "/corporate/dashboard";
  if (role === "institution_admin") return "/institute/dashboard";
  if (isPlatformAdminRole(role)) return "/admin/dashboard";
  if (options.allowOnboarding !== false && isStudentOnboardingRequired(user)) return "/student/onboarding";
  return "/student/dashboard";
}

function getSupplementalDemoStudents() {
  return [
    {
      id: "user-student-seed-01",
      name: "Lerato Dlamini",
      email: "lerato.seed@ydh.local",
      password: "password123",
      role: "student",
      profile: {
        fullName: "Lerato Dlamini",
        province: "Gauteng",
        educationLevel: "Matric",
        interests: ["Finance & Investment", "Accounting & Auditing", "Data & Analytics"],
        onboarding: { completed: true }
      }
    },
    {
      id: "user-student-seed-02",
      name: "Sipho Nkosi",
      email: "sipho.seed@ydh.local",
      password: "password123",
      role: "student",
      profile: {
        fullName: "Sipho Nkosi",
        province: "KwaZulu-Natal",
        educationLevel: "TVET N6",
        interests: ["Information Technology (Software)", "Data & Analytics", "Business Studies"],
        onboarding: { completed: true }
      }
    }
  ];
}

function getPartnerDemoInstitutions() {
  return [
    {
      id: "standard-bank-talent-partnerships",
      name: "Standard Bank Talent Partnerships",
      type: "Corporate Partner",
      contactPerson: "Recruitment Office",
      contactEmail: "corporate@demo.co.za",
      accreditation: "Corporate Employer",
      status: "verified",
      verified: true,
      registrationDocuments: [],
      submittedAt: "2026-02-01T09:00:00.000Z",
      reviewedAt: "2026-02-03T09:00:00.000Z",
      notes: "Demo employer workspace"
    },
    {
      id: "wits-digital-campus",
      name: "Wits Digital Campus",
      type: "Institute / College",
      contactPerson: "Programme Office",
      contactEmail: "institute@demo.co.za",
      accreditation: "University Provider",
      status: "verified",
      verified: true,
      registrationDocuments: [],
      submittedAt: "2026-02-05T09:00:00.000Z",
      reviewedAt: "2026-02-06T09:00:00.000Z",
      notes: "Demo institute workspace"
    }
  ];
}

function getPartnerDemoOpportunitySeedData() {
  return [
    {
      id: "opp-corp-demo-001",
      type: "Learnership",
      title: "Banking Operations Learnership",
      provider: "Standard Bank Talent Partnerships",
      province: "Gauteng",
      sector: "Finance",
      closingDate: "2026-08-14",
      stipendOrValue: "R6,500 / month",
      description: "An entry-level banking operations learnership with branch exposure, compliance basics, and customer operations training.",
      requirements: ["Matric certificate", "South African ID", "Strong communication skills"],
      tags: ["Finance", "Customer service", "Operations"],
      institutionId: "standard-bank-talent-partnerships",
      logoUrl: "images/Standard-Bank.jpg",
      listingStatus: "open"
    },
    {
      id: "opp-corp-demo-002",
      type: "Internship",
      title: "Data Insights Internship",
      provider: "Standard Bank Talent Partnerships",
      province: "Johannesburg",
      sector: "Data & Analytics",
      closingDate: "2026-08-28",
      stipendOrValue: "R8,200 / month",
      description: "A practical internship for graduates building reporting, dashboarding, and analytics support skills in banking teams.",
      requirements: ["Diploma or degree in analytics, finance, or IT", "Excel or Power BI exposure", "Presentation skills"],
      tags: ["Analytics", "Power BI", "Banking"],
      institutionId: "standard-bank-talent-partnerships",
      logoUrl: "images/Standard-Bank.jpg",
      listingStatus: "open"
    },
    {
      id: "opp-corp-demo-003",
      type: "Bursary",
      title: "Future Finance Bursary",
      provider: "Standard Bank Talent Partnerships",
      province: "National",
      sector: "Finance",
      closingDate: "2026-09-10",
      stipendOrValue: "Full tuition + device support",
      description: "A bursary programme focused on finance, actuarial science, and economics pathways for high-potential learners.",
      requirements: ["Grade 12 or equivalent", "Strong maths results", "Proof of household income"],
      tags: ["Finance", "Bursary", "Talent pipeline"],
      institutionId: "standard-bank-talent-partnerships",
      logoUrl: "images/Standard-Bank.jpg",
      listingStatus: "open"
    },
    {
      id: "opp-inst-demo-001",
      type: "Course",
      title: "Data Analytics Foundations",
      provider: "Wits Digital Campus",
      province: "Online",
      sector: "Data & Analytics",
      closingDate: "Rolling",
      stipendOrValue: "12 weeks",
      description: "A short programme covering SQL, Excel analytics, storytelling with data, and portfolio-ready projects.",
      requirements: ["Basic digital literacy", "Matric or equivalent"],
      tags: ["Analytics", "SQL", "Excel"],
      institutionId: "wits-digital-campus",
      logoUrl: "images/wits digital campus.jpg",
      listingStatus: "open"
    },
    {
      id: "opp-inst-demo-002",
      type: "Course",
      title: "AI & Machine Learning Foundations",
      provider: "Wits Digital Campus",
      province: "Online",
      sector: "Information Technology (Software)",
      closingDate: "Rolling",
      stipendOrValue: "10 weeks",
      description: "An applied programme introducing machine-learning concepts, Python workflows, and responsible AI basics.",
      requirements: ["Curiosity about AI", "Basic computer literacy"],
      tags: ["AI", "Python", "Machine learning"],
      institutionId: "wits-digital-campus",
      logoUrl: "images/wits digital campus.jpg",
      listingStatus: "open"
    },
    {
      id: "opp-inst-demo-003",
      type: "Course",
      title: "Digital Business Communication",
      provider: "Wits Digital Campus",
      province: "Online",
      sector: "Business",
      closingDate: "Rolling",
      stipendOrValue: "8 weeks",
      description: "A communication and workplace-readiness course for students moving into internships, learnerships, and entry-level roles.",
      requirements: ["Open to current and recent students"],
      tags: ["Communication", "Professional skills", "Career readiness"],
      institutionId: "wits-digital-campus",
      logoUrl: "images/wits digital campus.jpg",
      listingStatus: "open"
    }
  ];
}

function getPartnerDemoApplicationSeedData() {
  return [
    {
      id: "app-corp-demo-001",
      studentId: "user-student-demo",
      opportunityId: "opp-corp-demo-001",
      opportunityType: "Learnership",
      status: "submitted",
      createdAt: "2026-02-12T08:00:00.000Z",
      updatedAt: "2026-02-13T10:00:00.000Z",
      submittedAt: "2026-02-12T10:00:00.000Z",
      timeline: [
        { status: "draft", at: "2026-02-12T08:00:00.000Z" },
        { status: "submitted", at: "2026-02-12T10:00:00.000Z" }
      ],
      tags: { shortlisted: false, interviewed: false, funded: false, graduated: false },
      docsComplete: true,
      docsIncomplete: false,
      qualityScore: 81,
      qualityReasons: ["Strong maths background and complete documents."],
      score: 81,
      fundedAt: "",
      placementStatus: "Not placed",
      employer: "Standard Bank Talent Partnerships",
      placedAt: ""
    },
    {
      id: "app-corp-demo-002",
      studentId: "user-student-seed-01",
      opportunityId: "opp-corp-demo-002",
      opportunityType: "Internship",
      status: "shortlisted",
      createdAt: "2026-02-10T08:00:00.000Z",
      updatedAt: "2026-02-14T09:00:00.000Z",
      submittedAt: "2026-02-10T09:00:00.000Z",
      timeline: [
        { status: "draft", at: "2026-02-10T08:00:00.000Z" },
        { status: "submitted", at: "2026-02-10T09:00:00.000Z" },
        { status: "shortlisted", at: "2026-02-14T09:00:00.000Z" }
      ],
      tags: { shortlisted: true, interviewed: false, funded: false, graduated: false },
      docsComplete: true,
      docsIncomplete: false,
      qualityScore: 88,
      qualityReasons: ["Relevant analytics interest profile and strong written communication."],
      score: 88,
      fundedAt: "",
      placementStatus: "Interviewing",
      employer: "Standard Bank Talent Partnerships",
      placedAt: ""
    },
    {
      id: "app-corp-demo-003",
      studentId: "user-student-seed-02",
      opportunityId: "opp-corp-demo-003",
      opportunityType: "Bursary",
      status: "in_review",
      createdAt: "2026-02-15T08:00:00.000Z",
      updatedAt: "2026-02-16T11:00:00.000Z",
      submittedAt: "2026-02-15T09:00:00.000Z",
      timeline: [
        { status: "draft", at: "2026-02-15T08:00:00.000Z" },
        { status: "submitted", at: "2026-02-15T09:00:00.000Z" },
        { status: "in_review", at: "2026-02-16T11:00:00.000Z" }
      ],
      tags: { shortlisted: false, interviewed: false, funded: false, graduated: false },
      docsComplete: false,
      docsIncomplete: true,
      qualityScore: 74,
      qualityReasons: ["Awaiting updated income documents for bursary review."],
      score: 74,
      fundedAt: "",
      placementStatus: "Not placed",
      employer: "Standard Bank Talent Partnerships",
      placedAt: ""
    },
    {
      id: "app-inst-demo-001",
      studentId: "user-student-demo",
      opportunityId: "opp-inst-demo-001",
      opportunityType: "Course",
      status: "submitted",
      createdAt: "2026-02-18T08:00:00.000Z",
      updatedAt: "2026-02-18T10:00:00.000Z",
      submittedAt: "2026-02-18T10:00:00.000Z",
      timeline: [
        { status: "draft", at: "2026-02-18T08:00:00.000Z" },
        { status: "submitted", at: "2026-02-18T10:00:00.000Z" }
      ],
      tags: { shortlisted: false, interviewed: false, funded: false, graduated: false },
      docsComplete: true,
      docsIncomplete: false,
      qualityScore: 79,
      qualityReasons: ["Strong profile fit for analytics foundations."],
      score: 79,
      fundedAt: "",
      placementStatus: "Not placed",
      employer: "Wits Digital Campus",
      placedAt: ""
    },
    {
      id: "app-inst-demo-002",
      studentId: "user-student-seed-01",
      opportunityId: "opp-inst-demo-002",
      opportunityType: "Course",
      status: "in_review",
      createdAt: "2026-02-19T08:00:00.000Z",
      updatedAt: "2026-02-20T10:00:00.000Z",
      submittedAt: "2026-02-19T10:00:00.000Z",
      timeline: [
        { status: "draft", at: "2026-02-19T08:00:00.000Z" },
        { status: "submitted", at: "2026-02-19T10:00:00.000Z" },
        { status: "in_review", at: "2026-02-20T10:00:00.000Z" }
      ],
      tags: { shortlisted: false, interviewed: false, funded: false, graduated: false },
      docsComplete: true,
      docsIncomplete: false,
      qualityScore: 83,
      qualityReasons: ["Strong digital foundations and high readiness score."],
      score: 83,
      fundedAt: "",
      placementStatus: "Not placed",
      employer: "Wits Digital Campus",
      placedAt: ""
    },
    {
      id: "app-inst-demo-003",
      studentId: "user-student-seed-02",
      opportunityId: "opp-inst-demo-003",
      opportunityType: "Course",
      status: "shortlisted",
      createdAt: "2026-02-21T08:00:00.000Z",
      updatedAt: "2026-02-22T10:00:00.000Z",
      submittedAt: "2026-02-21T10:00:00.000Z",
      timeline: [
        { status: "draft", at: "2026-02-21T08:00:00.000Z" },
        { status: "submitted", at: "2026-02-21T10:00:00.000Z" },
        { status: "shortlisted", at: "2026-02-22T10:00:00.000Z" }
      ],
      tags: { shortlisted: true, interviewed: false, funded: false, graduated: false },
      docsComplete: false,
      docsIncomplete: true,
      qualityScore: 76,
      qualityReasons: ["Good fit but awaiting one supporting document."],
      score: 76,
      fundedAt: "",
      placementStatus: "Not placed",
      employer: "Wits Digital Campus",
      placedAt: ""
    }
  ];
}

function ensureWorkspaceDemoState(targetStore) {
  if (!targetStore || typeof targetStore !== "object") return targetStore;

  targetStore.users = Array.isArray(targetStore.users) ? targetStore.users.map((user) => normalizeUserRecord(user)) : [];
  const existingUsers = new Set(targetStore.users.map((user) => String(user.id || "").trim().toLowerCase()));
  const existingEmails = new Set(targetStore.users.map((user) => String(user.email || "").trim().toLowerCase()));

  [...demoUsers, ...getSupplementalDemoStudents()].forEach((seedUser) => {
    const seedId = String(seedUser.id || "").trim().toLowerCase();
    const seedEmail = String(seedUser.email || "").trim().toLowerCase();
    if (existingUsers.has(seedId) || existingEmails.has(seedEmail)) return;
    targetStore.users.push(normalizeUserRecord({ ...seedUser }));
    existingUsers.add(seedId);
    existingEmails.add(seedEmail);
  });

  targetStore.institutions = Array.isArray(targetStore.institutions) ? targetStore.institutions : defaultInstitutions();
  const existingInstitutions = new Set(targetStore.institutions.map((entry) => String(entry.id || "").trim().toLowerCase()));
  getPartnerDemoInstitutions().forEach((institution) => {
    const id = String(institution.id || "").trim().toLowerCase();
    if (existingInstitutions.has(id)) return;
    targetStore.institutions.push({ ...institution });
    existingInstitutions.add(id);
  });

  targetStore.opportunities = normalizeOpportunityStore(targetStore.opportunities);
  const existingOpportunityIds = new Set(flattenOpportunityStore(targetStore.opportunities).map((entry) => String(entry.id || "").trim()));
  getPartnerDemoOpportunitySeedData().forEach((seedOpportunity) => {
    if (existingOpportunityIds.has(seedOpportunity.id)) return;
    const bucket = opportunityTypeToBucket(seedOpportunity.type || "");
    const normalizedOpportunity = normalizeOpportunityRecord(seedOpportunity, bucket);
    if (!normalizedOpportunity) return;
    targetStore.opportunities[bucket].push(normalizedOpportunity);
    existingOpportunityIds.add(normalizedOpportunity.id);
  });

  targetStore.applications = Array.isArray(targetStore.applications) ? targetStore.applications : [];
  const validStudentIds = new Set(targetStore.users.filter((user) => String(user.role || "") === "student").map((user) => user.id));
  const validOpportunityIds = new Set([
    ...flattenOpportunityStore(targetStore.opportunities).map((entry) => entry.id),
    ...getStaticOpportunityCatalogue().map((entry) => entry.id)
  ]);
  const existingApplicationIds = new Set(targetStore.applications.map((entry) => String(entry.id || "").trim()));

  getPartnerDemoApplicationSeedData().forEach((application) => {
    if (existingApplicationIds.has(application.id)) return;
    if (!validStudentIds.has(application.studentId)) return;
    if (!validOpportunityIds.has(application.opportunityId)) return;
    targetStore.applications.push({ ...application });
    existingApplicationIds.add(application.id);
  });

  return targetStore;
}

// Baseline store shape used on first load and during normalization fallbacks.
function createDefaultStore() {
  const defaults = {
    users: demoUsers.map((user) => normalizeUserRecord({ ...user })),
    opportunities: defaultOpportunityStore(),
    applications: [],
    documents: [],
    appMeta: {},
    bursaryConfig: defaultBursaryConfig(),
    lifecycle: {},
    careerGuidance: {},
    careerGuidanceDocuments: {},
    institutions: defaultInstitutions(),
    savedOpportunities: {},
    reminders: {},
    notifications: {},
    placementStats: {
      placedStudents: 2300,
      activeInstitutions: 48,
      activeOpportunities: 0,
      monthlyApplications: 0
    },
    testimonials: [
      {
        id: "testimonial-1",
        author: "Lerato M.",
        quote: "I found my first bursary and tracked every step in one place.",
        placement: "Bursary placement"
      },
      {
        id: "testimonial-2",
        author: "Siyabonga N.",
        quote: "The checklist made my first application easy to finish.",
        placement: "Learnership placement"
      }
    ],
    auditLogs: [],
    adminSecurity: {
      twoFactorEnabled: true,
      trustedDevices: [],
      documentVerificationQueue: [],
      fraudReports: []
    }
  };

  return ensureWorkspaceDemoState(defaults);
}

// Defensive store normalization to preserve backward compatibility with legacy data.
function normalizeStore(data) {
  const defaults = createDefaultStore();
  const legacyAppMeta = data?.appMeta && typeof data.appMeta === "object" ? data.appMeta : {};
  const normalizedCareerGuidance =
    data?.careerGuidance && typeof data.careerGuidance === "object" ? data.careerGuidance : {};
  const normalizedCareerGuidanceDocuments =
    data?.careerGuidanceDocuments && typeof data.careerGuidanceDocuments === "object"
      ? data.careerGuidanceDocuments
      : {};
  const normalizedOpportunities = normalizeOpportunityStore(data?.opportunities);
  const normalizedOpportunityList = flattenOpportunityStore(normalizedOpportunities);

  const normalized = {

    users:
      Array.isArray(data?.users) && data.users.length
        ? data.users.map((user) => normalizeUserRecord(user))
        : defaults.users,
    opportunities: normalizedOpportunities,
    applications: Array.isArray(data?.applications)
      ? data.applications
          .map((app) => {
            if (!app || !app.studentId || !app.opportunityId) return null;
const opportunity = normalizedOpportunityList.find((item) => item.id === app.opportunityId) || getStaticOpportunityCatalogue().find((item) => item.id === app.opportunityId) || null;
const legacyMeta = legacyAppMeta[app.id] || {};
const tags = {
  shortlisted: Boolean(app?.tags?.shortlisted ?? legacyMeta.shortlisted),
  interviewed: Boolean(app?.tags?.interviewed ?? legacyMeta.interviewed),
  funded: Boolean(app?.tags?.funded ?? legacyMeta.funded),
  graduated: Boolean(app?.tags?.graduated ?? legacyMeta.graduated)
};

const docsComplete =
  typeof app.docsComplete === "boolean"
    ? app.docsComplete
    : typeof app.docsIncomplete === "boolean"
    ? !app.docsIncomplete
    : false;

const createdAt = app.createdAt || new Date().toISOString();
const inferredStatus = tags.funded
  ? "funded"
  : normalizeApplicationStatus(app.status, "draft");
const status = normalizeApplicationStatus(inferredStatus, "draft");
const submittedAt =
  app.submittedAt != null
    ? toTimestamp(app.submittedAt, toTimestamp(createdAt))
    : status === "draft"
    ? null
    : toTimestamp(createdAt);
const updatedAt =
  app.updatedAt != null
    ? toTimestamp(app.updatedAt, submittedAt || toTimestamp(createdAt))
    : submittedAt || toTimestamp(createdAt);
const qualityScore = clampScore(app.qualityScore != null ? app.qualityScore : app.score);
const qualityReasons = Array.isArray(app.qualityReasons)
  ? app.qualityReasons
      .filter((reason) => String(reason || "").trim())
      .map((reason) => String(reason))
      .slice(0, 4)
  : [];
const timeline = normalizeApplicationTimeline(app.timeline, status, createdAt, updatedAt, submittedAt);

return {
  ...app,
  id: app.id || uid("app"),
  opportunityType: OPPORTUNITY_TYPES.includes(app.opportunityType)
    ? app.opportunityType
    : opportunity?.type || "Course",
  status,
  createdAt,
  updatedAt,
  submittedAt,
  timeline,
  tags,
  docsComplete,
  docsIncomplete:
    typeof app.docsIncomplete === "boolean" ? app.docsIncomplete : !docsComplete,
  qualityScore,
  qualityReasons,
  score: qualityScore,
  fundedAt: app.fundedAt || legacyMeta.fundedAt || "",
  placementStatus: PLACEMENT_STATUSES.includes(app.placementStatus || legacyMeta.placementStatus)
    ? app.placementStatus || legacyMeta.placementStatus
    : "Not placed",
  employer: app.employer || legacyMeta.employer || "",
  placedAt: app.placedAt || legacyMeta.placedAt || ""
};
          })
          .filter(Boolean)
      : defaults.applications,
    documents: Array.isArray(data?.documents)
      ? data.documents.filter((document) => document && document.studentId && document.id)
      : defaults.documents,
    appMeta: legacyAppMeta,
    bursaryConfig: {
      ...defaults.bursaryConfig,
      ...(data?.bursaryConfig || {}),
      eligibility: {
        ...defaults.bursaryConfig.eligibility,
        ...((data?.bursaryConfig && data.bursaryConfig.eligibility) || {}),
        requiredInterests: Array.isArray(data?.bursaryConfig?.eligibility?.requiredInterests)
          ? data.bursaryConfig.eligibility.requiredInterests.filter((interest) => INTERESTS.includes(interest))
          : []
      }
    },
    lifecycle: data?.lifecycle && typeof data.lifecycle === "object" ? data.lifecycle : defaults.lifecycle,
    careerGuidance: Object.keys(normalizedCareerGuidance).reduce((accumulator, studentId) => {
      const entry = normalizedCareerGuidance[studentId];
      if (!entry || typeof entry !== "object") return accumulator;
      accumulator[studentId] = {
        answers: entry.answers && typeof entry.answers === "object" ? entry.answers : {},
        result: entry.result && typeof entry.result === "object" ? entry.result : null,
        pathway: entry.pathway && typeof entry.pathway === "object" ? entry.pathway : null,
        savedAt: entry.savedAt || ""
      };
      return accumulator;
    }, {}),
    careerGuidanceDocuments: Object.keys(normalizedCareerGuidanceDocuments).reduce(
      (accumulator, studentId) => {
        const studentBucket = normalizedCareerGuidanceDocuments[studentId];
        if (!studentBucket || typeof studentBucket !== "object") return accumulator;

        accumulator[studentId] = CAREER_GUIDANCE_DOC_CATEGORIES.reduce((bucket, category) => {
          bucket[category] = Array.isArray(studentBucket[category])
            ? studentBucket[category]
                .filter((item) => item && typeof item === "object")
                .map((item) => ({
                  id: item.id || uid("cgd"),
                  category,
                  filename: item.filename || "document",
                  fileType: item.fileType || "application/octet-stream",
                  size: Number(item.size || 0),
                  uploadedAt: item.uploadedAt || new Date().toISOString()
                }))
            : [];
          return bucket;
        }, {});

        return accumulator;
      },
      {}
    )
  };

  normalized.institutions = Array.isArray(data?.institutions)
    ? data.institutions
        .filter((item) => item && typeof item === "object")
        .map((item) => ({
          id: String(item.id || uid("inst")).trim(),
          name: String(item.name || "Unnamed institution").trim(),
          type: String(item.type || "Institution").trim(),
          contactPerson: String(item.contactPerson || "").trim(),
          contactEmail: String(item.contactEmail || "").trim(),
          accreditation: String(item.accreditation || "").trim(),
          status: String(item.status || "pending").trim().toLowerCase(),
          verified: Boolean(item.verified || String(item.status || "").toLowerCase() === "verified"),
          registrationDocuments: Array.isArray(item.registrationDocuments) ? item.registrationDocuments : [],
          submittedAt: String(item.submittedAt || "").trim(),
          reviewedAt: String(item.reviewedAt || "").trim(),
          notes: String(item.notes || "").trim()
        }))
    : defaults.institutions;

  normalized.savedOpportunities = data?.savedOpportunities && typeof data.savedOpportunities === "object"
    ? data.savedOpportunities
    : {};

  normalized.reminders = data?.reminders && typeof data.reminders === "object"
    ? data.reminders
    : {};

  normalized.notifications = data?.notifications && typeof data.notifications === "object"
    ? data.notifications
    : {};

  normalized.placementStats = data?.placementStats && typeof data.placementStats === "object"
    ? {
        ...defaults.placementStats,
        ...data.placementStats
      }
    : defaults.placementStats;

  normalized.testimonials = Array.isArray(data?.testimonials) && data.testimonials.length
    ? data.testimonials
        .filter((item) => item && typeof item === "object")
        .map((item, indexPos) => ({
          id: String(item.id || ("testimonial-" + String(indexPos + 1))),
          author: String(item.author || "Youth Digital Hub Student"),
          quote: String(item.quote || ""),
          placement: String(item.placement || "")
        }))
    : defaults.testimonials;

  normalized.auditLogs = Array.isArray(data?.auditLogs)
    ? data.auditLogs
        .filter((item) => item && typeof item === "object")
        .map((item) => ({
          id: String(item.id || uid("audit")),
          action: String(item.action || "action"),
          actorId: String(item.actorId || "system"),
          actorRole: String(item.actorRole || "system"),
          at: item.at || new Date().toISOString(),
          details: item.details && typeof item.details === "object" ? item.details : {}
        }))
        .slice(-800)
    : [];

  normalized.adminSecurity = data?.adminSecurity && typeof data.adminSecurity === "object"
    ? {
        ...defaults.adminSecurity,
        ...data.adminSecurity,
        trustedDevices: Array.isArray(data.adminSecurity.trustedDevices)
          ? data.adminSecurity.trustedDevices
          : defaults.adminSecurity.trustedDevices,
        documentVerificationQueue: Array.isArray(data.adminSecurity.documentVerificationQueue)
          ? data.adminSecurity.documentVerificationQueue
          : defaults.adminSecurity.documentVerificationQueue,
        fraudReports: Array.isArray(data.adminSecurity.fraudReports)
          ? data.adminSecurity.fraudReports
          : defaults.adminSecurity.fraudReports
      }
    : defaults.adminSecurity;

  return ensureWorkspaceDemoState(normalized);
}

// Optional demo document metadata seed so checklist UIs have realistic initial state.
function seedDemoDocuments(targetStore) {
  const demoStudentId = "user-student-demo";
  const existingDemoDocs = targetStore.documents.filter((doc) => doc.studentId === demoStudentId);

  if (existingDemoDocs.length) {
    return false;
  }

  const now = Date.now();

  targetStore.documents.unshift(
    {
      id: uid("doc"),
      studentId: demoStudentId,
      category: "Matric Certificate / School Report",
      filename: "demo-matric-report.pdf",
      fileType: "application/pdf",
      size: 284000,
      uploadedAt: new Date(now - 1000 * 60 * 60 * 24 * 3).toISOString()
    },
    {
      id: uid("doc"),
      studentId: demoStudentId,
      category: "ID Copy",
      filename: "demo-id-copy.pdf",
      fileType: "application/pdf",
      size: 220000,
      uploadedAt: new Date(now - 1000 * 60 * 60 * 24 * 5).toISOString()
    }
  );

  return true;
}

// Storage load/save boundary: read persisted state, normalize it, and seed when needed.
function loadStore() {
  const raw = localStorage.getItem(STORE_KEY);
  const defaults = createDefaultStore();

  if (!raw) {
    seedDemoDocuments(defaults);
    return defaults;
  }

  try {
    const parsed = JSON.parse(raw);
    const normalized = normalizeStore(parsed);

    if (seedDemoDocuments(normalized)) {
      saveStore(normalized);
    }

    return normalized;
  } catch {
    seedDemoDocuments(defaults);
    return defaults;
  }
}

function saveStore(nextStore) {
  localStorage.setItem(STORE_KEY, JSON.stringify(nextStore));
}

function getSessionUserId() {
  return sessionStorage.getItem(SESSION_KEY);
}

function setSessionUserId(id) {
  if (id) sessionStorage.setItem(SESSION_KEY, id);
  else sessionStorage.removeItem(SESSION_KEY);
}

function isAppScopedStorageKey(key) {
  return APP_STORAGE_PREFIXES.some((prefix) => String(key || "").startsWith(prefix));
}

function clearAppScopedStorageKeys() {
  const keys = Object.keys(localStorage);
  keys.forEach((key) => {
    if (isAppScopedStorageKey(key)) {
      localStorage.removeItem(key);
    }
  });
}

function runStorageVersionMigration() {
  try {
    const currentVersion = localStorage.getItem(STORAGE_VERSION_KEY);
    if (currentVersion === APP_VERSION) return;

    clearAppScopedStorageKeys();
    localStorage.setItem(STORAGE_VERSION_KEY, APP_VERSION);
    console.log("App updated — demo data reset");
  } catch (error) {
    console.error("[storage-migration]", error);
  }
}

function resetDemoData() {
  if (!confirm("Reset demo data?")) return;

  try {
    clearAppScopedStorageKeys();
  } catch (error) {
    console.error("[reset-demo-data]", error);
  }

  setSessionUserId(null);
  location.hash = "#/home";
  location.reload();
}

/** ---------- App State ---------- **/
runStorageVersionMigration();
// Runtime in-memory app state backing all page renders and event handlers.
let store = loadStore();
let currentUserId = getSessionUserId();
function getRouteFromHash() {
  const normalized = location.hash.replace("#", "").trim();
  if (!normalized || normalized === "/") return "/home";
  return normalized;
}

if (!location.hash || location.hash === "#" || location.hash === "#/") {
  location.hash = "#/home";
}

let route = getRouteFromHash();

// Cross-tab sync: refresh in-memory store when persisted state changes elsewhere.
window.addEventListener("storage", (event) => {
  if (event.key === STORE_KEY && event.newValue) {
    try {
      store = normalizeStore(JSON.parse(event.newValue));
      render();
    } catch {
    }
  }
});

// Hash-router listener: re-render the matching page whenever URL hash changes.
window.addEventListener("hashchange", () => {
  route = getRouteFromHash();
  render();
});

// Session and route guard helpers used by all protected student/admin pages.
function currentUser() {
  return store.users.find((user) => user.id === currentUserId) || null;
}

function navigate(path) {
  location.hash = path;
}

function requireAuth() {
  const user = currentUser();
  if (!user) {
    navigate("/login");
    return null;
  }
  return user;
}

function isAdminRole(role) {
  return ADMIN_ROLES.has(String(role || "").trim().toLowerCase());
}

function isPlatformAdminRole(role) {
  return PLATFORM_ADMIN_ROLES.has(String(role || "").trim().toLowerCase());
}

function requireRole(role) {
  const user = requireAuth();
  if (!user) return null;

  if (role === "admin") {
    if (!isPlatformAdminRole(user.role)) {
      navigate("/student/dashboard");
      return null;
    }
    return user;
  }

  if (user.role !== role) {
    navigate(getWorkspaceHomeRoute(user));
    return null;
  }

  return user;
}

function requireAdminAccess(allowedRoles = []) {
  const user = requireRole("admin");
  if (!user) return null;

  if (!Array.isArray(allowedRoles) || !allowedRoles.length) return user;

  const normalizedAllowed = allowedRoles.map((entry) => String(entry || "").trim().toLowerCase());
  const userRole = String(user.role || "").trim().toLowerCase();
  if (!normalizedAllowed.includes(userRole)) {
    navigate("/admin/dashboard");
    return null;
  }

  return user;
}

function shouldShowDemoTools() {
  return SHOW_DEMO_TOOLS;
}

function ensureAdminRuntimeState() {
  try {
    store = normalizeStore(store && typeof store === "object" ? store : {});
    saveStore(store);
  } catch (error) {
    console.error("[admin-runtime-state]", error);
    store = createDefaultStore();
    saveStore(store);
  }
}

function logAuditEvent(action, details = {}) {
  const actor = currentUser();
  store.auditLogs = Array.isArray(store.auditLogs) ? store.auditLogs : [];
  store.auditLogs.unshift({
    id: uid("audit"),
    action: String(action || "action"),
    actorId: actor?.id || "system",
    actorRole: actor?.role || "system",
    at: new Date().toISOString(),
    details: details && typeof details === "object" ? details : {}
  });
  if (store.auditLogs.length > 1200) {
    store.auditLogs = store.auditLogs.slice(0, 1200);
  }
}

function getStudentOnboardingState(student) {
  if (!student || student.role !== "student") {
    return {
      basicsCompleted: false,
      careerQuizCompleted: false,
      personalizationCompleted: false,
      completed: false
    };
  }

  const profile = getUserProfile(student) || {};
  const onboarding = profile.onboarding && typeof profile.onboarding === "object" ? profile.onboarding : {};
  const interests = Array.isArray(profile.interests) ? profile.interests : [];
  const basicsCompleted = Boolean(
    String(profile.fullName || student.name || "").trim() &&
    String(profile.age || "").trim() &&
    String(profile.province || "").trim() &&
    String(profile.educationLevel || "").trim() &&
    interests.length
  );

  const quizAnswers = onboarding.quizAnswers && typeof onboarding.quizAnswers === "object" ? onboarding.quizAnswers : {};
  const legacyGuidance = getCareerGuidanceRecord(student.id, student);
  const careerQuizCompleted = Boolean(
    onboarding.careerQuizCompleted ||
      (String(quizAnswers.preferredField || "").trim() &&
        String(quizAnswers.relocation || "").trim() &&
        String(quizAnswers.preference || "").trim()) ||
      legacyGuidance?.result?.topCategory
  );

  const personalizationCompleted = Boolean(onboarding.personalizationCompleted);
  const completed = Boolean(onboarding.completed || (basicsCompleted && careerQuizCompleted && personalizationCompleted));

  return {
    basicsCompleted,
    careerQuizCompleted,
    personalizationCompleted,
    completed,
    quizAnswers
  };
}

function isStudentOnboardingComplete(student) {
  return getStudentOnboardingState(student).completed;
}

function setStudentOnboardingState(studentId, patch = {}) {
  const index = store.users.findIndex((entry) => entry.id === studentId && entry.role === "student");
  if (index === -1) return null;

  const user = store.users[index];
  const profile = getUserProfile(user) || {};
  const current = profile.onboarding && typeof profile.onboarding === "object" ? profile.onboarding : {};

  const nextOnboarding = {
    ...current,
    ...patch,
    updatedAt: new Date().toISOString()
  };

  const nextProfile = {
    ...profile,
    onboarding: nextOnboarding
  };

  store.users[index] = {
    ...user,
    profile: nextProfile
  };

  const recomputed = getStudentOnboardingState(store.users[index]);
  if (recomputed.completed && !nextOnboarding.completedAt) {
    store.users[index].profile.onboarding = {
      ...store.users[index].profile.onboarding,
      completed: true,
      completedAt: new Date().toISOString()
    };
  }

  saveStore(store);
  return store.users[index];
}

function isStudentOnboardingRequired(student) {
  if (!student || student.role !== "student") return false;
  const id = String(student.id || "").toLowerCase();
  if (id.includes("demo")) return false;
  return !isStudentOnboardingComplete(student);
}

function getOpportunity(id) {
  return getOpportunityCatalogue().find((opportunity) => opportunity.id === id) || CURATED_BURSARY_LISTING_OPPORTUNITIES.find((opportunity) => opportunity.id === id) || null;
}

function routeForOpportunityType(type) {
  if (type === "Bursary") return "/student/bursaries";
  if (type === "Course") return "/student/courses";
  return "/student/learnerships";
}

function isLearnershipType(type) {
  return type === "Learnership" || type === "Internship";
}

function matchesOpportunityTypeFilter(opportunityType, filterKey) {
  if (filterKey === "all") return true;
  if (filterKey === "Bursary") return opportunityType === "Bursary";
  if (filterKey === "Course") return opportunityType === "Course";
  if (filterKey === "Learnership/Internship") return isLearnershipType(opportunityType);
  return opportunityType === filterKey;
}

function getApplicationsTabTheme(filterKey) {
  if (filterKey === "Bursary") return "theme-bursary";
  if (filterKey === "Learnership/Internship") return "theme-learnership";
  if (filterKey === "Course") return "theme-course";
  return "theme-neutral";
}

function resolveOpportunitySector(opportunity) {
  return String(opportunity?.sector || opportunity?.category || "").trim();
}

function getUserById(userId) {
  return store.users.find((user) => user.id === userId) || null;
}

function clampScore(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.max(0, Math.min(100, Math.round(numeric)));
}

function toTimestamp(value, fallback = Date.now()) {
  const numeric = Number(value);
  if (Number.isFinite(numeric) && numeric > 0) return numeric;
  const parsed = new Date(value);
  const time = parsed.getTime();
  return Number.isFinite(time) && time > 0 ? time : fallback;
}

function normalizeApplicationStatus(status, fallback = "draft") {
  const rawStatus = String(status || "").trim();
  if (APPLICATION_STATUSES.includes(rawStatus)) return rawStatus;
  if (Object.prototype.hasOwnProperty.call(LEGACY_STATUS_TO_APPLICATION_STATUS, rawStatus)) {
    return LEGACY_STATUS_TO_APPLICATION_STATUS[rawStatus];
  }

  const normalized = rawStatus.toLowerCase().replace(/[\s-]+/g, "_");
  if (APPLICATION_STATUSES.includes(normalized)) return normalized;
  if (normalized === "inreview") return "in_review";

  return APPLICATION_STATUSES.includes(fallback) ? fallback : "draft";
}

function getApplicationStatusLabel(status) {
  const normalized = normalizeApplicationStatus(status, "draft");
  return APPLICATION_STATUS_LABELS[normalized] || APPLICATION_STATUS_LABELS.draft;
}

function getApplicationStatusBadgeClass(status) {
  const normalized = normalizeApplicationStatus(status, "draft");
  if (normalized === "submitted") return "badgeBlue";
  if (normalized === "in_review") return "badgePurple";
  if (normalized === "shortlisted") return "badgeGreen";
  if (normalized === "rejected") return "badgeOrange";
  if (normalized === "funded" || normalized === "completed") return "badgeGreen";
  return "badge";
}

function normalizeApplicationTimeline(rawTimeline, status, createdAtIso, updatedAtEpoch, submittedAtEpoch) {
  const source = Array.isArray(rawTimeline) ? rawTimeline : [];
  const timeline = source
    .filter((entry) => entry && typeof entry === "object")
    .map((entry) => ({
      status: normalizeApplicationStatus(entry.status, "draft"),
      at: toTimestamp(entry.at, updatedAtEpoch)
    }));

  if (!timeline.length) {
    timeline.push({
      status: "draft",
      at: toTimestamp(createdAtIso, updatedAtEpoch)
    });
  }

  const normalizedStatus = normalizeApplicationStatus(status, "draft");
  if (!timeline.some((entry) => entry.status === normalizedStatus)) {
    timeline.push({
      status: normalizedStatus,
      at: normalizedStatus === "draft" ? toTimestamp(createdAtIso, updatedAtEpoch) : submittedAtEpoch || updatedAtEpoch
    });
  }

  timeline.sort((first, second) => first.at - second.at);
  return timeline;
}

function getUserProfile(user) {
  return user && user.profile && typeof user.profile === "object" ? user.profile : null;
}

function getUserNameParts(user) {
  const profile = getUserProfile(user);
  const split = splitFullName(profile?.fullName || user?.name || "");
  const firstName = String(profile?.firstName || split.firstName || "").trim();
  const surname = String(profile?.surname || split.surname || "").trim();
  return { firstName, surname };
}

function getUserDisplayName(user) {
  if (!user) return "Unknown User";
  const parts = getUserNameParts(user);
  const fullName = buildFullName(parts.firstName, parts.surname, user.name || user.email || "User");
  return fullName || user.name || user.email || "User";
}

function getUserInitials(user) {
  const parts = getUserNameParts(user);
  const first = parts.firstName || user?.name || user?.email || "U";
  const second = parts.surname || "";
  const chars = `${first.charAt(0)}${second.charAt(0)}`.trim().toUpperCase();
  return chars || String(first).charAt(0).toUpperCase() || "U";
}

function getUserPhotoDataUrl(user) {
  const profile = getUserProfile(user);
  return profile?.profilePhotoDataUrl || "";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderUserAvatar(user, className = "") {
  const photo = getUserPhotoDataUrl(user);
  if (photo) {
    return `<span class="userAvatar ${className}"><img src="${photo}" alt="Avatar" /></span>`;
  }
  return `<span class="userAvatar userAvatarInitials ${className}">${escapeHtml(getUserInitials(user))}</span>`;
}

// Interest-to-keyword mapping used for heuristic recommendation matching against opportunities.
const INTEREST_KEYWORDS = {
  "Information Technology (Software)": [
    "it",
    "software",
    "digital",
    "systems",
    "technology",
    "ict",
    "programming"
  ],
  Cybersecurity: ["cyber", "security", "infosec", "network security"],
  "Data & Analytics": ["data", "analytics", "analysis", "database", "business intelligence"],
  "Networking & Cloud": ["network", "cloud", "infrastructure", "systems", "it support"],
  "Entrepreneurship & Startups": ["entrepreneur", "startup", "innovation", "venture", "business"],
  "Marketing & Sales": ["marketing", "sales", "brand", "customer", "commercial"],
  "Finance & Investment": ["finance", "investment", "bank", "financial", "treasury"],
  "Accounting & Auditing": ["accounting", "audit", "bookkeeping", "financial"],
  "Law & Compliance": ["law", "legal", "compliance", "regulatory", "policy"],
  "Healthcare & Wellness": ["health", "medical", "wellness", "clinic", "care"],
  "Education & Training": ["education", "teaching", "training", "learning", "facilitation"],
  "Construction & Built Environment": [
    "construction",
    "built environment",
    "civil",
    "infrastructure",
    "site"
  ],
  "Mechanical & Automotive": ["mechanical", "automotive", "vehicle", "maintenance", "technician"],
  "Electrical & Renewable Energy": ["electrical", "renewable", "energy", "solar", "wind", "power"],
  "Hospitality & Tourism": ["hospitality", "tourism", "hotel", "travel", "guest"],
  "Logistics & Supply Chain": ["logistics", "supply chain", "warehouse", "transport", "procurement"],
  "Agriculture & Food Systems": ["agriculture", "farming", "food", "agri", "crop"],
  "Design & Creative Media": ["design", "creative", "media", "visual", "content"],
  "Public Service & Government": ["public service", "government", "municipal", "policy", "administration"],
  "Science & Research": ["science", "research", "laboratory", "lab", "biological"],
  Science: ["science", "laboratory", "health", "biological", "research"],
  Engineering: ["engineering", "electrical", "mechanical", "civil", "infrastructure", "energy"],
  Business: ["business", "finance", "management", "administration", "office", "hospitality", "tourism"],
  IT: ["it", "digital", "software", "systems", "technology", "data", "network"],
  Trades: ["trades", "artisan", "plumbing", "welding", "construction", "maintenance"]
};

function isOpportunityRecommended(opportunity, interests) {
  const activeInterests = Array.isArray(interests) ? interests : [];
  if (!activeInterests.length) return false;

  const haystack = [
    opportunity?.title || "",
    resolveOpportunitySector(opportunity),
    opportunity?.type || "",
    opportunity?.description || ""
  ]
    .join(" ")
    .toLowerCase();

  return activeInterests.some((interest) => {
    const keywords = INTEREST_KEYWORDS[interest] || [String(interest).toLowerCase()];
    return keywords.some((keyword) => haystack.includes(keyword.toLowerCase()));
  });
}

function recommendedIdsForStudent(studentId) {
  const student = store.users.find((user) => user.id === studentId && user.role === "student");
  const interests = student?.profile?.interests || [];
  return new Set(
    getOpportunityCatalogue()
      .filter((opportunity) => isOpportunityRecommended(opportunity, interests))
      .map((opportunity) => opportunity.id)
  );
}

function studentApplications(studentId) {
  return store.applications
    .filter((application) => application.studentId === studentId)
    .sort((first, second) => second.createdAt.localeCompare(first.createdAt));
}

/** ---------- Documents ---------- **/
function getStudentDocuments(studentId) {
  return store.documents
    .filter((document) => document.studentId === studentId)
    .sort((first, second) => second.uploadedAt.localeCompare(first.uploadedAt));
}

function addDocument(document) {
  store.documents.unshift(document);
  if (document?.studentId) {
    refreshStudentApplicationScores(document.studentId, { save: false });
  }
  saveStore(store);
}

function removeDocument(documentId) {
  const target = store.documents.find((document) => document.id === documentId) || null;
  const before = store.documents.length;
  store.documents = store.documents.filter((document) => document.id !== documentId);
  if (store.documents.length !== before) {
    if (target?.studentId) {
      refreshStudentApplicationScores(target.studentId, { save: false });
    }
    saveStore(store);
  }
}

function getDocumentChecklist(studentId, opportunityType = "") {
  const documents = getStudentDocuments(studentId);
  const categorySet = new Set(documents.map((document) => document.category));
  const hasIdCopy = categorySet.has("ID Copy");
  const hasAcademic = ACADEMIC_DOC_CATEGORIES.some((category) => categorySet.has(category));
  const hasProofOfIncome = categorySet.has("Proof of Income");
  const needsProofOfIncomeOptional = opportunityType === "Bursary";

  return {
    hasIdCopy,
    hasAcademic,
    hasProofOfIncome,
    complete: hasIdCopy && hasAcademic,
    needsProofOfIncomeOptional,
    byCategory: DOC_CATEGORIES.map((category) => ({
      category,
      uploaded: categorySet.has(category),
      required: category === "ID Copy" || ACADEMIC_DOC_CATEGORIES.includes(category)
    })),
    total: documents.length
  };
}

function inferFileType(file) {
  const name = String(file?.name || "");
  const extension = name.includes(".") ? name.split(".").pop().toLowerCase() : "";
  if (extension === "pdf") return "application/pdf";
  if (extension === "png") return "image/png";
  if (extension === "jpg" || extension === "jpeg") return "image/jpeg";
  return file?.type || "application/octet-stream";
}

function validateUploadFile(file) {
  if (!file) return "Select a file to upload.";

  const extension = String(file.name || "").split(".").pop().toLowerCase();
  if (!ALLOWED_FILE_EXTENSIONS.has(extension)) {
    return "Only .png, .jpg, .jpeg, and .pdf files are allowed.";
  }

  return "";
}

function readImagePreview(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      const rawDataUrl = typeof reader.result === "string" ? reader.result : "";
      if (!rawDataUrl) {
        resolve("");
        return;
      }

      const image = new Image();
      image.onload = () => {
        const maxWidth = 220;
        const scale = image.width > maxWidth ? maxWidth / image.width : 1;
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");
        if (!context) {
          resolve(rawDataUrl);
          return;
        }

        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.75));
      };

      image.onerror = () => resolve(rawDataUrl);
      image.src = rawDataUrl;
    };

    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

/** ---------- Career Guidance ---------- **/
// Career Guidance answer defaults and normalization keep quiz state stable across saves/loads.
const CAREER_GUIDANCE_GOAL_OPTIONS = [
  {
    value: "bursary",
    label: "Find a bursary",
    description: "Prioritise funding opportunities that support your studies."
  },
  {
    value: "learnership",
    label: "Find a learnership",
    description: "Focus on practical programmes that help you earn while you learn."
  },
  {
    value: "internship",
    label: "Find an internship",
    description: "Surface entry routes that build experience and workplace confidence."
  },
  {
    value: "courses",
    label: "Explore courses",
    description: "Match me with courses and training pathways that build my next step."
  },
  {
    value: "unsure",
    label: "I'm not sure yet",
    description: "Show me a balanced set of opportunities while I explore my options."
  }
];

const CAREER_GUIDANCE_EDUCATION_OPTIONS = [
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12 / Matric",
  "TVET Student",
  "University Student",
  "Graduate",
  "Other"
];

const CAREER_GUIDANCE_INTEREST_OPTIONS = [
  {
    value: "IT / Technology",
    label: "IT / Technology",
    mappedValues: [
      "IT",
      "Information Technology (Software)",
      "Cybersecurity",
      "Data & Analytics",
      "Networking & Cloud"
    ]
  },
  {
    value: "Engineering",
    label: "Engineering",
    mappedValues: [
      "Engineering",
      "Construction & Built Environment",
      "Mechanical & Automotive",
      "Electrical & Renewable Energy",
      "Logistics & Supply Chain"
    ]
  },
  {
    value: "Business / Finance",
    label: "Business / Finance",
    mappedValues: [
      "Business",
      "Entrepreneurship & Startups",
      "Marketing & Sales",
      "Finance & Investment",
      "Accounting & Auditing",
      "Law & Compliance"
    ]
  },
  {
    value: "Health Sciences",
    label: "Health Sciences",
    mappedValues: ["Healthcare & Wellness", "Science"]
  },
  {
    value: "Education",
    label: "Education",
    mappedValues: ["Education & Training"]
  },
  {
    value: "Public Service",
    label: "Public Service",
    mappedValues: ["Public Service & Government"]
  },
  {
    value: "Creative / Media",
    label: "Creative / Media",
    mappedValues: ["Design & Creative Media"]
  },
  {
    value: "Science / Research",
    label: "Science / Research",
    mappedValues: ["Science", "Science & Research", "Agriculture & Food Systems"]
  },
  {
    value: "Trades / Technical",
    label: "Trades / Technical",
    mappedValues: ["Trades", "Construction & Built Environment", "Mechanical & Automotive"]
  },
  {
    value: "Other",
    label: "Other",
    mappedValues: []
  }
];

const CAREER_GUIDANCE_PROVINCE_OPTIONS = ["All provinces", ...PROVINCES];

function normalizeCareerGuidanceGoal(value) {
  const raw = String(value || "").trim().toLowerCase();
  return CAREER_GUIDANCE_GOAL_OPTIONS.some((option) => option.value === raw) ? raw : "";
}

function normalizeCareerGuidanceEducationLevel(value) {
  const raw = String(value || "").trim();
  return CAREER_GUIDANCE_EDUCATION_OPTIONS.includes(raw) ? raw : "";
}

function normalizeCareerGuidanceStepperProvince(value) {
  const raw = String(value || "").trim();
  return CAREER_GUIDANCE_PROVINCE_OPTIONS.includes(raw) ? raw : "";
}

function normalizeCareerGuidanceStepperInterests(values) {
  if (!Array.isArray(values)) return [];
  const allowed = new Set(CAREER_GUIDANCE_INTEREST_OPTIONS.map((option) => option.value));
  const unique = [];

  values.forEach((value) => {
    const label = String(value || "").trim();
    if (!label || !allowed.has(label) || unique.includes(label)) return;
    unique.push(label);
  });

  return unique;
}

function mapStoredCareerInterestsToStepperSelections(values) {
  if (!Array.isArray(values)) return [];

  const matches = [];
  values.forEach((entry) => {
    const value = String(entry || "").trim();
    const option = CAREER_GUIDANCE_INTEREST_OPTIONS.find((candidate) =>
      candidate.value === value || candidate.mappedValues.includes(value)
    );
    if (option && !matches.includes(option.value)) {
      matches.push(option.value);
    }
  });

  return matches;
}

function getDefaultCareerGuidanceStepperState(user, answers = null) {
  const profile = user?.profile || {};
  const source = answers && typeof answers === "object" ? answers : {};
  const sourceProvince = String(source.province || profile.province || "").trim();

  return {
    goal: normalizeCareerGuidanceGoal(source.goal || profile.goals || ""),
    educationLevel: normalizeCareerGuidanceEducationLevel(source.educationLevel || profile.educationLevel || ""),
    interests: normalizeCareerGuidanceStepperInterests(
      mapStoredCareerInterestsToStepperSelections(source.interests || profile.interests || [])
    ),
    province: normalizeCareerGuidanceStepperProvince(
      sourceProvince === "National" ? "All provinces" : sourceProvince
    )
  };
}

function getCareerGuidanceGoalDerivatives(goal) {
  if (goal === "bursary") {
    return {
      workStyle: "Desk work",
      preference: "stability",
      availability: "full-time study",
      timeframe: "6–12 months"
    };
  }

  if (goal === "learnership") {
    return {
      workStyle: "Hands-on",
      preference: "high earning potential",
      availability: "learn-while-you-earn",
      timeframe: "asap"
    };
  }

  if (goal === "internship") {
    return {
      workStyle: "Mix",
      preference: "high earning potential",
      availability: "part-time",
      timeframe: "3–6 months"
    };
  }

  if (goal === "courses") {
    return {
      workStyle: "Desk work",
      preference: "stability",
      availability: "full-time study",
      timeframe: "6–12 months"
    };
  }

  return {
    workStyle: "",
    preference: "",
    availability: "",
    timeframe: ""
  };
}

function getDefaultCareerQuizAnswers(user) {
  const profile = user?.profile || {};
  return {
    goal: normalizeCareerGuidanceGoal(profile.goals || ""),
    educationLevel: profile.educationLevel || "",
    province: profile.province || "",
    interests: Array.isArray(profile.interests)
      ? profile.interests.filter((interest) => INTERESTS.includes(interest))
      : [],
    subjects: [],
    workStyle: "",
    environment: "",
    strengths: [],
    preference: "",
    availability: "",
    timeframe: ""
  };
}

function normalizeCareerQuizAnswers(rawAnswers, user) {
  const defaults = getDefaultCareerQuizAnswers(user);
  const answers = rawAnswers && typeof rawAnswers === "object" ? rawAnswers : {};
  const normalized = { ...defaults };

  CAREER_QUIZ_QUESTIONS.forEach((question) => {
    if (question.type === "multi") {
      normalized[question.id] = Array.isArray(answers[question.id])
        ? answers[question.id].filter((value) => question.options.includes(value))
        : defaults[question.id];
      return;
    }

    const value = typeof answers[question.id] === "string" ? answers[question.id] : "";
    normalized[question.id] = question.options.includes(value) ? value : defaults[question.id];
  });

  normalized.goal = normalizeCareerGuidanceGoal(answers.goal || defaults.goal);
  return normalized;
}

function deriveCareerGuidanceAnswersFromStepper(stepperState, user) {
  const defaults = getDefaultCareerQuizAnswers(user);
  const derivedGoal = getCareerGuidanceGoalDerivatives(stepperState?.goal || "");
  const selectedInterests = normalizeCareerGuidanceStepperInterests(stepperState?.interests || []).flatMap((value) => {
    const option = CAREER_GUIDANCE_INTEREST_OPTIONS.find((candidate) => candidate.value === value);
    return option ? option.mappedValues : [];
  });

  return normalizeCareerQuizAnswers(
    {
      ...defaults,
      goal: normalizeCareerGuidanceGoal(stepperState?.goal || ""),
      educationLevel: normalizeCareerGuidanceEducationLevel(stepperState?.educationLevel || ""),
      province:
        stepperState?.province === "All provinces"
          ? "National"
          : normalizeCareerGuidanceStepperProvince(stepperState?.province || ""),
      interests: Array.from(new Set(selectedInterests)),
      workStyle: derivedGoal.workStyle || "",
      preference: derivedGoal.preference || "",
      availability: derivedGoal.availability || "",
      timeframe: derivedGoal.timeframe || ""
    },
    user
  );
}

function getCareerGuidanceRecord(studentId, user) {

  const rawRecord = store.careerGuidance?.[studentId];
  if (!rawRecord || typeof rawRecord !== "object") return null;
  return {
    answers: normalizeCareerQuizAnswers(rawRecord.answers, user),
    result: rawRecord.result && typeof rawRecord.result === "object" ? rawRecord.result : null,
    pathway: rawRecord.pathway && typeof rawRecord.pathway === "object" ? rawRecord.pathway : null,
    savedAt: rawRecord.savedAt || ""
  };
}

function saveCareerGuidanceRecord(studentId, payload, user) {
  if (!store.careerGuidance || typeof store.careerGuidance !== "object") {
    store.careerGuidance = {};
  }

  store.careerGuidance[studentId] = {
    answers: normalizeCareerQuizAnswers(payload.answers, user),
    result: payload.result && typeof payload.result === "object" ? payload.result : null,
    pathway: payload.pathway && typeof payload.pathway === "object" ? payload.pathway : null,
    savedAt: payload.savedAt || new Date().toISOString()
  };

  refreshStudentApplicationScores(studentId, { save: false });
  saveStore(store);
}

function resetCareerGuidanceRecord(studentId) {
  if (!store.careerGuidance || typeof store.careerGuidance !== "object") return;
  delete store.careerGuidance[studentId];
  refreshStudentApplicationScores(studentId, { save: false });
  saveStore(store);
}

// Career Guidance document metadata bucket helpers (separate from main document uploads).
function getCareerGuidanceDocumentBucket(studentId) {
  const source =
    store.careerGuidanceDocuments && typeof store.careerGuidanceDocuments === "object"
      ? store.careerGuidanceDocuments
      : {};
  const rawBucket = source[studentId] && typeof source[studentId] === "object" ? source[studentId] : {};

  return CAREER_GUIDANCE_DOC_CATEGORIES.reduce((bucket, category) => {
    bucket[category] = Array.isArray(rawBucket[category]) ? [...rawBucket[category]] : [];
    return bucket;
  }, {});
}

function setCareerGuidanceDocumentBucket(studentId, bucket) {
  if (!store.careerGuidanceDocuments || typeof store.careerGuidanceDocuments !== "object") {
    store.careerGuidanceDocuments = {};
  }
  store.careerGuidanceDocuments[studentId] = CAREER_GUIDANCE_DOC_CATEGORIES.reduce((nextBucket, category) => {
    nextBucket[category] = Array.isArray(bucket[category]) ? bucket[category] : [];
    return nextBucket;
  }, {});
  saveStore(store);
}

function addCareerGuidanceDocumentMetadata(studentId, category, file) {
  if (!CAREER_GUIDANCE_DOC_CATEGORIES.includes(category)) return;
  const bucket = getCareerGuidanceDocumentBucket(studentId);

  bucket[category].unshift({
    id: uid("cgdoc"),
    category,
    filename: file.name,
    fileType: inferFileType(file),
    size: file.size,
    uploadedAt: new Date().toISOString()
  });

  setCareerGuidanceDocumentBucket(studentId, bucket);
}

function removeCareerGuidanceDocumentMetadata(studentId, category, documentId) {
  if (!CAREER_GUIDANCE_DOC_CATEGORIES.includes(category)) return;
  const bucket = getCareerGuidanceDocumentBucket(studentId);
  bucket[category] = bucket[category].filter((item) => item.id !== documentId);
  setCareerGuidanceDocumentBucket(studentId, bucket);
}

function getCareerGuidanceDocumentStatus(studentId) {
  const bucket = getCareerGuidanceDocumentBucket(studentId);
  const baseDocuments = getStudentDocuments(studentId);

  const statusMap = {
    "ID Copy":
      bucket["ID Copy"].length > 0 || baseDocuments.some((doc) => doc.category === "ID Copy"),
    "Latest results/transcript":
      bucket["Latest results/transcript"].length > 0 ||
      baseDocuments.some((doc) => ACADEMIC_DOC_CATEGORIES.includes(doc.category)),
    "Proof of address":
      bucket["Proof of address"].length > 0 ||
      baseDocuments.some((doc) => String(doc.category || "").toLowerCase() === "proof of address")
  };

  return { statusMap, bucket };
}

function routeForCareerCategory(category) {
  if (category === "Business") return "/student/bursaries";
  if (category === "Science") return "/student/courses";
  return "/student/learnerships";
}

function addCareerScore(scores, categories, points) {
  categories.forEach((category) => {
    if (Object.prototype.hasOwnProperty.call(scores, category)) {
      scores[category] += points;
    }
  });
}

// Human-readable rationale text for each matched career category shown in results cards.
function buildCareerFitExplanation(category, answers) {
  const interests = answers.interests || [];
  const subjects = answers.subjects || [];
  const strengths = answers.strengths || [];
  const interestNote = interests.includes(category)
    ? `${category} is one of your selected interests`
    : `${category} aligns with your selected profile indicators`;

  if (category === "IT") {
    return `${interestNote}. Your subject and strength profile indicates digital problem-solving potential.`;
  }
  if (category === "Engineering") {
    return `${interestNote}. Your work-style and technical preference fit engineering and technical pathways.`;
  }
  if (category === "Business") {
    return `${interestNote}. Your choices support pathways in administration, finance, and business operations.`;
  }
  if (category === "Trades") {
    return `${interestNote}. Your practical orientation indicates a fit for artisan and hands-on opportunities.`;
  }

  if (subjects.includes("Life Sciences") || strengths.includes("Detail") || strengths.includes("Attention to detail")) {
    return `${interestNote}. Your detail and science profile supports laboratory and applied science tracks.`;
  }

  return `${interestNote}. Your responses suggest a good match for science-focused training routes.`;
}

function getOpportunityCategoryKeywords(category) {
  if (category === "IT") {
    return ["it", "software", "systems", "digital", "network", "technology", "ict", "data"];
  }
  if (category === "Engineering") {
    return [
      "engineering",
      "electrical",
      "mechanical",
      "civil",
      "infrastructure",
      "technician",
      "energy"
    ];
  }
  if (category === "Business") {
    return [
      "business",
      "finance",
      "accounting",
      "administration",
      "office",
      "management",
      "hospitality",
      "tourism",
      "services"
    ];
  }
  if (category === "Trades") {
    return [
      "trades",
      "artisan",
      "welding",
      "plumbing",
      "construction",
      "workshop",
      "maintenance"
    ];
  }
  return ["science", "laboratory", "health", "biological", "research", "lab"];
}

function opportunityMatchesCareerCategory(opportunity, category) {
  const keywords = getOpportunityCategoryKeywords(category);
  const haystack = [
    opportunity.title,
    opportunity.institution,
    opportunity.location,
    opportunity.sector,
    opportunity.description
  ]
    .join(" ")
    .toLowerCase();

  return keywords.some((keyword) => haystack.includes(keyword));
}

function sortCareerRecommendations(opportunitiesList, province) {
  return [...opportunitiesList].sort((first, second) => {
    const firstLocalScore = first.location === province ? 2 : first.location === "National" ? 1 : 0;
    const secondLocalScore = second.location === province ? 2 : second.location === "National" ? 1 : 0;

    if (firstLocalScore !== secondLocalScore) return secondLocalScore - firstLocalScore;

    const firstDate = closingDateSortValue(first.closingDate);
    const secondDate = closingDateSortValue(second.closingDate);
    if (firstDate !== secondDate) return firstDate - secondDate;

    return first.title.localeCompare(second.title);
  });
}

function getCareerRecommendations(topCategory, province) {
  const categoryMatches = getOpportunityCatalogue().filter((opportunity) =>
    opportunityMatchesCareerCategory(opportunity, topCategory)
  );
  const recommendationPool = categoryMatches.length ? categoryMatches : getOpportunityCatalogue();
  const ranked = sortCareerRecommendations(recommendationPool, province);

  const pick = (predicate) => ranked.filter(predicate).slice(0, 3);

  return {
    bursaries: pick((opportunity) => opportunity.type === "Bursary"),
    learnerships: pick((opportunity) => isLearnershipType(opportunity.type)),
    courses: pick((opportunity) => opportunity.type === "Course")
  };
}

function buildCareerPathway(topCategory, answers, documentStatusMap) {
  const stageOneChecklist = [
    "Complete learner profile with current education level",
    `Upload ID Copy (${documentStatusMap["ID Copy"] ? "done" : "pending"})`,
    `Upload latest results/transcript (${documentStatusMap["Latest results/transcript"] ? "done" : "pending"})`,
    "Select at least 3 matching opportunities"
  ];

  const stageTwoChecklist = [
    `Apply to ${topCategory} opportunities in your province`,
    "Track application progress weekly",
    "Prepare supporting documents and references"
  ];

  const stageThreeChecklist = [
    "Complete interviews / assessments",
    "Accept placement or funded programme",
    "Track progress and outcomes on your dashboard"
  ];

  if ((answers.availability || "").toLowerCase() === "learn-while-you-earn") {
    stageTwoChecklist.unshift("Prioritize learnership and internship pathways");
  }

  return {
    title: `Your recommended pathway: ${topCategory}`,
    topCategory,
    stages: [
      {
        id: "start",
        title: "Start Here (0–3 months)",
        checklist: stageOneChecklist,
        actionLabel: "Go to Documents",
        actionHref: "/student/documents"
      },
      {
        id: "build",
        title: "Build Skills (3–12 months)",
        checklist: stageTwoChecklist,
        actionLabel: "Browse matched opportunities",
        actionHref: routeForCareerCategory(topCategory)
      },
      {
        id: "placed",
        title: "Get Placed (6–24 months)",
        checklist: stageThreeChecklist,
        actionLabel: "Track applications",
        actionHref: "/student/dashboard"
      }
    ]
  };
}

// Scoring model: weights quiz interests/subjects/strengths + preferences into top category matches.
// Note: this documentation does not alter scoring behavior.
function computeCareerMatchResult(answers) {
  const scores = CAREER_CATEGORIES.reduce((map, category) => {
    map[category] = 10;
    return map;
  }, {});

  const interestWeights = {
    "Information Technology (Software)": ["IT"],
    Cybersecurity: ["IT"],
    "Data & Analytics": ["IT", "Business", "Science"],
    "Networking & Cloud": ["IT", "Engineering"],
    "Entrepreneurship & Startups": ["Business", "IT", "Trades"],
    "Marketing & Sales": ["Business"],
    "Finance & Investment": ["Business", "Science"],
    "Accounting & Auditing": ["Business"],
    "Law & Compliance": ["Business", "Science"],
    "Healthcare & Wellness": ["Science"],
    "Education & Training": ["Business", "Science"],
    "Construction & Built Environment": ["Engineering", "Trades"],
    "Mechanical & Automotive": ["Engineering", "Trades"],
    "Electrical & Renewable Energy": ["Engineering", "Trades", "Science"],
    "Hospitality & Tourism": ["Business"],
    "Logistics & Supply Chain": ["Business", "Engineering"],
    "Agriculture & Food Systems": ["Science", "Trades", "Engineering"],
    "Design & Creative Media": ["IT", "Business"],
    "Public Service & Government": ["Business", "Science"],
    "Science & Research": ["Science"],
    IT: ["IT"],
    Engineering: ["Engineering"],
    Business: ["Business"],
    Trades: ["Trades"],
    Science: ["Science"]
  };

  (answers.interests || []).forEach((interest) =>
    addCareerScore(scores, interestWeights[interest] || [interest], 28)
  );

  const subjectWeights = {
    Mathematics: ["IT", "Engineering", "Business", "Science"],
    "Mathematical Literacy": ["Business", "Trades"],
    "English Home Language": ["Business", "Science"],
    "English First Additional Language": ["Business"],
    Afrikaans: ["Business"],
    isiZulu: ["Business"],
    "Life Orientation": ["Business", "Science"],
    "Physical Sciences": ["Engineering", "Science", "Trades"],
    "Life Sciences": ["Science"],
    Geography: ["Science", "Business"],
    History: ["Business", "Science"],
    Accounting: ["Business"],
    "Business Studies": ["Business"],
    Economics: ["Business"],
    "CAT (Computer Applications Technology)": ["IT", "Business"],
    "IT (Information Technology)": ["IT", "Engineering"],
    "EGD (Engineering Graphics & Design)": ["Engineering", "Trades"],
    "Civil Technology": ["Engineering", "Trades"],
    "Mechanical Technology": ["Engineering", "Trades"],
    "Electrical Technology": ["Engineering", "Trades"],
    Tourism: ["Business"],
    "Consumer Studies": ["Business", "Science"],
    "Agricultural Sciences": ["Science", "Trades"],
    "Visual Arts": ["Business", "IT"],
    "Dramatic Arts": ["Business"],
    Music: ["Business"],
    Maths: ["IT", "Engineering", "Business", "Science"],
    "Physical Science": ["Engineering", "Science", "Trades"],
    "CAT/IT": ["IT", "Business"],
    "Technical subjects": ["Engineering", "Trades"]
  };

  (answers.subjects || []).forEach((subject) => addCareerScore(scores, subjectWeights[subject] || [], 12));

  const strengthWeights = {
    "Problem-solving": ["IT", "Engineering", "Science"],
    "People skills": ["Business"],
    Creativity: ["Business", "IT"],
    Detail: ["Science", "IT", "Business"],
    Leadership: ["Business", "Engineering"],
    "Analytical thinking": ["IT", "Engineering", "Science", "Business"],
    "Attention to detail": ["Science", "IT", "Business"],
    "Communication (written)": ["Business", "Science"],
    "Communication (verbal)": ["Business"],
    "Teamwork & collaboration": ["Business", "Engineering", "Trades"],
    "Leadership potential": ["Business", "Engineering"],
    "Time management": ["Business", "Trades"],
    Adaptability: ["IT", "Business", "Trades"],
    "Practical hands-on ability": ["Engineering", "Trades"],
    "Technical aptitude": ["IT", "Engineering", "Trades"],
    "Customer service mindset": ["Business"],
    "Research skills": ["Science", "IT"],
    "Planning & organisation": ["Business", "Engineering"],
    "Conflict resolution": ["Business"],
    Resilience: ["Trades", "Engineering", "Business"],
    "Initiative / self-starter": ["Business", "IT", "Trades"],
    "Presentation skills": ["Business"],
    "Working under pressure": ["Engineering", "Trades", "Business"],
    Negotiation: ["Business"],
    "Critical thinking": ["IT", "Science", "Business"]
  };

  (answers.strengths || []).forEach((strength) =>
    addCareerScore(scores, strengthWeights[strength] || [], 8)
  );

  const workStyle = (answers.workStyle || "").toLowerCase();
  if (workStyle === "hands-on") addCareerScore(scores, ["Engineering", "Trades"], 6);
  if (workStyle === "desk work") addCareerScore(scores, ["IT", "Business", "Science"], 6);
  if (workStyle === "mix") addCareerScore(scores, ["IT", "Engineering", "Business"], 5);

  const environment = (answers.environment || "").toLowerCase();
  if (environment === "indoors") addCareerScore(scores, ["IT", "Business", "Science"], 4);
  if (environment === "outdoors") addCareerScore(scores, ["Engineering", "Trades"], 4);
  if (environment === "both") addCareerScore(scores, ["Engineering", "Science", "Trades"], 3);

  const preference = (answers.preference || "").toLowerCase();
  if (preference === "stability") addCareerScore(scores, ["Business", "Science"], 5);
  if (preference === "high earning potential") addCareerScore(scores, ["IT", "Engineering"], 5);
  if (preference === "entrepreneurship") addCareerScore(scores, ["Business", "Trades"], 5);
  if (preference === "helping community") addCareerScore(scores, ["Science", "Trades", "Business"], 5);

  const availability = (answers.availability || "").toLowerCase();
  if (availability === "full-time study") addCareerScore(scores, ["Science", "IT"], 4);
  if (availability === "part-time") addCareerScore(scores, ["Business", "IT"], 3);
  if (availability === "learn-while-you-earn") addCareerScore(scores, ["Trades", "Engineering", "Business"], 4);

  const timeframe = (answers.timeframe || "").toLowerCase();
  if (timeframe === "asap") addCareerScore(scores, ["Trades", "Business"], 3);
  if (timeframe === "3–6 months") addCareerScore(scores, ["IT", "Trades"], 3);
  if (timeframe === "6–12 months") addCareerScore(scores, ["Engineering", "Business"], 3);
  if (timeframe === "1–2 years") addCareerScore(scores, ["Science", "Engineering"], 3);

  const sorted = [...CAREER_CATEGORIES]
    .map((category) => ({ category, score: scores[category] }))
    .sort((first, second) => second.score - first.score);

  const topScore = sorted[0]?.score || 1;
  const topMatches = sorted.slice(0, 3).map((item) => ({
    category: item.category,
    score: item.score,
    percent: Math.max(1, Math.round((item.score / topScore) * 100)),
    why: buildCareerFitExplanation(item.category, answers)
  }));

  const topCategory = topMatches[0]?.category || "Business";
  const recommendations = getCareerRecommendations(topCategory, answers.province);

  return {
    scores,
    topCategory,
    topMatches,
    recommendations
  };
}

/** ---------- Admin metadata + scoring ---------- **/
// Admin pipeline metadata defaults (shortlist/interview/funding/placement tracking).
function defaultApplicationMeta() {
  return {
    shortlisted: false,
    interviewed: false,
    funded: false,
    graduated: false,
    fundedAt: "",
    placementStatus: "Not placed",
    employer: "",
    placedAt: ""
  };
}

function getApplicationById(applicationId) {
  return store.applications.find((application) => application.id === applicationId) || null;
}

function getApplicationMeta(applicationId) {
  if (!store.appMeta[applicationId]) {
    const application = getApplicationById(applicationId);
    const base = defaultApplicationMeta();
    store.appMeta[applicationId] = {
      ...base,
      shortlisted: Boolean(application?.tags?.shortlisted),
      interviewed: Boolean(application?.tags?.interviewed),
      funded: Boolean(application?.tags?.funded),
      graduated: Boolean(application?.tags?.graduated),
      fundedAt: application?.fundedAt || "",
      placementStatus: application?.placementStatus || base.placementStatus,
      employer: application?.employer || "",
      placedAt: application?.placedAt || ""
    };
  }
  return store.appMeta[applicationId];
}

function updateApplicationMeta(applicationId, patch) {
  const meta = getApplicationMeta(applicationId);
  Object.assign(meta, patch);

  if (Object.prototype.hasOwnProperty.call(patch, "funded")) {
    if (meta.funded && !meta.fundedAt) {
      meta.fundedAt = new Date().toISOString();
    }

    if (!meta.funded) {
      meta.fundedAt = "";
      meta.graduated = false;
      meta.placementStatus = "Not placed";
      meta.placedAt = "";
      meta.employer = "";
    }
  }

  if (Object.prototype.hasOwnProperty.call(patch, "graduated") && meta.graduated) {
    if (!meta.funded) {
      meta.funded = true;
      if (!meta.fundedAt) meta.fundedAt = new Date().toISOString();
    }
  }

  if (Object.prototype.hasOwnProperty.call(patch, "placementStatus")) {
    if (meta.placementStatus === "Placed") {
      if (!meta.placedAt) meta.placedAt = new Date().toISOString();
    } else {
      meta.placedAt = "";
    }
  }

  if (Object.prototype.hasOwnProperty.call(patch, "employer") && !meta.employer.trim()) {
    if (meta.placementStatus !== "Placed") {
      meta.placedAt = "";
    }
  }

  const index = store.applications.findIndex((application) => application.id === applicationId);
  if (index !== -1) {
    const application = store.applications[index];
const currentStatus = normalizeApplicationStatus(application.status, "draft");
let nextStatus = currentStatus;
if (meta.funded) {
  nextStatus = "funded";
} else if (meta.shortlisted && ["draft", "submitted", "in_review"].includes(currentStatus)) {
  nextStatus = "shortlisted";
} else if (!meta.shortlisted && currentStatus === "shortlisted") {
  nextStatus = "in_review";
}

const now = Date.now();
const submittedAt =
  nextStatus === "draft"
    ? null
    : application.submittedAt != null
    ? toTimestamp(application.submittedAt, now)
    : now;

store.applications[index] = {
  ...application,
  opportunityType: OPPORTUNITY_TYPES.includes(application.opportunityType)
    ? application.opportunityType
    : getOpportunity(application.opportunityId)?.type || "Course",
  status: nextStatus,
  updatedAt: now,
  submittedAt,
  timeline: normalizeApplicationTimeline(
    application.timeline,
    nextStatus,
    application.createdAt || new Date().toISOString(),
    now,
    submittedAt
  ),
  tags: {
    shortlisted: Boolean(meta.shortlisted),
    interviewed: Boolean(meta.interviewed),
    funded: Boolean(meta.funded),
    graduated: Boolean(meta.graduated)
  },
  fundedAt: meta.fundedAt || "",
  placementStatus: meta.placementStatus || "Not placed",
  employer: meta.employer || "",
  placedAt: meta.placedAt || ""
};
  }

  refreshApplicationScore(applicationId, { save: false, preserveUpdatedAt: true });
  saveStore(store);
  logAuditEvent("application.meta.updated", { applicationId, patch });
}

function setApplicationStatus(applicationId, newStatus, options = {}) {
  const index = store.applications.findIndex((application) => application.id === applicationId);
  if (index === -1) return null;

  const nextStatus = normalizeApplicationStatus(newStatus, "draft");
  if (!APPLICATION_STATUSES.includes(nextStatus)) return null;

  const now = Date.now();
  const current = store.applications[index];
  const timeline = Array.isArray(current.timeline)
    ? current.timeline
        .filter((entry) => entry && typeof entry === "object")
        .map((entry) => ({
          status: normalizeApplicationStatus(entry.status, "draft"),
          at: toTimestamp(entry.at, now)
        }))
    : [];

  if (!timeline.length) {
    timeline.push({ status: "draft", at: toTimestamp(current.createdAt, now) });
  }

  const submittedAt =
    nextStatus === "draft"
      ? null
      : current.submittedAt != null
      ? toTimestamp(current.submittedAt, now)
      : now;

  if (!timeline.some((entry) => entry.status === nextStatus)) {
    timeline.push({ status: nextStatus, at: now });
  } else {
    const last = timeline[timeline.length - 1];
    if (last && last.status !== nextStatus) {
      timeline.push({ status: nextStatus, at: now });
    }
  }

  timeline.sort((first, second) => first.at - second.at);

  store.applications[index] = {
    ...current,
    status: nextStatus,
    updatedAt: now,
    submittedAt,
    timeline
  };

  if (nextStatus === "shortlisted") {
    updateApplicationMeta(applicationId, { shortlisted: true });
  } else if (nextStatus === "funded" || nextStatus === "completed") {
    updateApplicationMeta(applicationId, { funded: true });
  }

  if (options.refreshScore !== false) {
    refreshApplicationScore(applicationId, { save: false });
  }

  if (options.save !== false) {
    saveStore(store);
  }

  return store.applications[index];
}

function updateStatus(applicationId, status) {
  const updated = setApplicationStatus(applicationId, status);
  if (updated) {
    logAuditEvent("application.status.updated", { applicationId, status: normalizeApplicationStatus(status, "draft") });
  }
}

function defaultLifecycleEntry() {
  return {
    progress: "On Track",
    resultUploads: [],
    lastPaidDate: "",
    amount: ""
  };
}

function getLifecycleEntry(applicationId) {
  if (!store.lifecycle[applicationId]) {
    store.lifecycle[applicationId] = defaultLifecycleEntry();
  }
  return store.lifecycle[applicationId];
}

function peekLifecycleEntry(applicationId) {
  return store.lifecycle[applicationId] || defaultLifecycleEntry();
}

function updateLifecycleEntry(applicationId, patch) {
  const lifecycle = getLifecycleEntry(applicationId);
  Object.assign(lifecycle, patch);
  saveStore(store);
}

function addLifecycleResultUpload(applicationId, fileMeta) {
  const lifecycle = getLifecycleEntry(applicationId);
  lifecycle.resultUploads = Array.isArray(lifecycle.resultUploads) ? lifecycle.resultUploads : [];
  lifecycle.resultUploads.unshift(fileMeta);
  saveStore(store);
}

function stableSeedFromString(value) {
  let hash = 0;
  const source = String(value || "seed");

  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 31 + source.charCodeAt(index)) % 100000;
  }

  return hash;
}

function evaluateEligibility(student, eligibilityConfig) {
  const reasons = [];
  let pass = true;

  const minAgeRaw = eligibilityConfig?.minAge ?? "";
  const minAge = Number(minAgeRaw);
  if (String(minAgeRaw).trim() !== "" && !Number.isNaN(minAge)) {
    const age = Number(student?.profile?.age || 0);
    if (age >= minAge) reasons.push(`Age ${age} meets minimum ${minAge}`);
    else {
      pass = false;
      reasons.push(`Age below minimum (${minAge})`);
    }
  }

  const provinceRule = eligibilityConfig?.province || "";
  if (provinceRule) {
    const province = student?.profile?.province || "";
    if (province === provinceRule) reasons.push(`Province matches (${provinceRule})`);
    else {
      pass = false;
      reasons.push(`Province must be ${provinceRule}`);
    }
  }

  const requiredInterests = Array.isArray(eligibilityConfig?.requiredInterests)
    ? eligibilityConfig.requiredInterests
    : [];
  if (requiredInterests.length) {
    const studentInterests = student?.profile?.interests || [];
    const missingInterests = requiredInterests.filter((interest) => !studentInterests.includes(interest));

    if (missingInterests.length) {
      pass = false;
      reasons.push(`Missing interests: ${missingInterests.join(", ")}`);
    } else {
      reasons.push("Required interests satisfied");
    }
  }

  if (!reasons.length) reasons.push("No eligibility rules configured");

  return { pass, reasons };
}

function computeApplicationScore(application, user, opportunity) {
  let score = 0;
  const reasons = [];

  const profile = user?.profile || {};
  const profileChecks = [
    ["age", Boolean(String(profile.age || "").trim())],
    ["province", Boolean(String(profile.province || "").trim())],
    ["educationLevel", Boolean(String(profile.educationLevel || "").trim())],
    ["interests", Array.isArray(profile.interests) && profile.interests.length > 0]
  ];
  const passedProfile = profileChecks.filter(([, ok]) => ok).length;
  score += Math.round((passedProfile / profileChecks.length) * 30);
  if (passedProfile < profileChecks.length) {
    reasons.push("Complete your profile details for a higher score.");
  }

  const checklist = getDocumentChecklist(application?.studentId || user?.id || "", opportunity?.type || application?.opportunityType || "");
  const requiredDocs = checklist.byCategory.filter((item) => item.required);
  const requiredComplete = requiredDocs.filter((item) => item.uploaded).length;
  const optionalUploaded = checklist.byCategory.filter((item) => !item.required && item.uploaded).length;
  if (requiredDocs.length > 0) {
    const requiredPoints = Math.round((requiredComplete / requiredDocs.length) * 36);
    const optionalBonus = Math.min(4, optionalUploaded * 2);
    score += requiredPoints + optionalBonus;
  } else {
    score += 24;
  }
  if (requiredComplete < requiredDocs.length) {
    reasons.push("Upload all required documents to improve your score.");
  }

  const interests = (profile.interests || []).map((entry) => String(entry).toLowerCase());
  const opportunityText = [
    opportunity?.type || "",
    opportunity?.sector || "",
    opportunity?.category || "",
    opportunity?.title || "",
    opportunity?.description || ""
  ]
    .join(" ")
    .toLowerCase();
  const directMatch = interests.some((interest) => opportunityText.includes(interest));
  const recommendationMatch = opportunity ? isOpportunityRecommended(opportunity, profile.interests || []) : false;
  const fitMatch = directMatch || recommendationMatch;
  score += fitMatch ? 20 : 8;
  if (!fitMatch) {
    reasons.push("Your interests don’t strongly match this opportunity (update interests if needed).");
  }

  const hasGuidance = Boolean(store?.careerGuidance?.[user?.id]?.result || store?.careerGuidance?.[user?.id]?.pathway);
  if (hasGuidance) {
    score += 10;
  } else {
    reasons.push("Complete Career Guidance for a stronger recommendation score.");
  }

  score = clampScore(score);
  return { score, reasons: reasons.slice(0, 4) };
}

function refreshApplicationScore(applicationId, options = {}) {
  const index = store.applications.findIndex((application) => application.id === applicationId);
  if (index === -1) return null;

  const application = store.applications[index];
  const user = getUserById(application.studentId);
  const opportunity = getOpportunity(application.opportunityId);
  const result = computeApplicationScore(application, user, opportunity);

  store.applications[index] = {
    ...application,
    qualityScore: result.score,
    qualityReasons: result.reasons,
    score: result.score,
    updatedAt: options.preserveUpdatedAt ? application.updatedAt || Date.now() : Date.now()
  };

  if (options.save !== false) {
    saveStore(store);
  }

  return store.applications[index];
}

function refreshStudentApplicationScores(studentId, options = {}) {
  const indexes = [];
  store.applications.forEach((application, index) => {
    if (application.studentId === studentId) indexes.push(index);
  });

  if (!indexes.length) return false;

  indexes.forEach((index) => {
    const application = store.applications[index];
    const user = getUserById(application.studentId);
    const opportunity = getOpportunity(application.opportunityId);
    const result = computeApplicationScore(application, user, opportunity);
    store.applications[index] = {
      ...application,
      qualityScore: result.score,
      qualityReasons: result.reasons,
      score: result.score,
      updatedAt: Date.now()
    };
  });

  if (options.save !== false) {
    saveStore(store);
  }

  return true;
}

function computeCandidateScore({ application, student, opportunity }) {
  return computeApplicationScore(application, student, opportunity);
}

// Composite row builder merges application + profile + eligibility + score + lifecycle for admin views.

function buildApplicationRows(typeFilter = "all") {
  return [...store.applications]
    .sort((first, second) => toTimestamp(second?.createdAt, 0) - toTimestamp(first?.createdAt, 0))
    .filter((application) => {
      const opportunity = getOpportunity(application.opportunityId);
      const opportunityType = OPPORTUNITY_TYPES.includes(application.opportunityType)
        ? application.opportunityType
        : opportunity?.type || "Course";
      return matchesOpportunityTypeFilter(opportunityType, typeFilter);
    })
    .map((application) => {
      const student = store.users.find((user) => user.id === application.studentId) || null;
      const opportunity = getOpportunity(application.opportunityId);
      const opportunityType = OPPORTUNITY_TYPES.includes(application.opportunityType)
        ? application.opportunityType
        : opportunity?.type || "Course";
      const meta = getApplicationMeta(application.id);
      const checklist = getDocumentChecklist(application.studentId, opportunityType);
      const eligibility = evaluateEligibility(student, store.bursaryConfig.eligibility);
const scoreModel = computeApplicationScore(application, student, opportunity);
const score = {
  score: clampScore(application.qualityScore != null ? application.qualityScore : application.score),
  reasons:
    Array.isArray(application.qualityReasons) && application.qualityReasons.length
      ? application.qualityReasons
      : scoreModel.reasons
};
      const lifecycle = peekLifecycleEntry(application.id);

      return {
        application: {
          ...application,
          opportunityType
        },
        student,
        opportunity,
        opportunityType,
        meta,
        checklist,
        eligibility,
        score,
        lifecycle
      };
    })
    .filter((row) => canCurrentUserAccessRow(row));
}

function canCurrentUserAccessRow(row) {
  const actor = currentUser();
  if (!actor) return false;
  if (!isAdminRole(actor.role)) return true;

  const role = String(actor.role || "").trim().toLowerCase();
  if (role === "admin" || role === "super_admin" || role === "reviewer") {
    return true;
  }

  const opportunity = row?.opportunity || getOpportunity(row?.application?.opportunityId || "");
  if (!opportunity) return false;

  const institutionId = String(actor.institutionId || actor.profile?.institutionId || "").trim().toLowerCase();
  const organisationName = String(actor.profile?.organisationName || actor.name || "").trim().toLowerCase();
  const opportunityInstitutionId = String(opportunity.institutionId || "").trim().toLowerCase();
  const opportunityProvider = String(opportunity.provider || opportunity.institution || "").trim().toLowerCase();

  if (institutionId) {
    return opportunityInstitutionId === institutionId;
  }

  if (organisationName) {
    return opportunityProvider.includes(organisationName);
  }

  return false;
}

function ensureSeedStudentProfile(student, index) {
  if (student.profile) return;

  const profilePresets = [
    {
      fullName: student.name || "Demo Student",
      age: "21",
      province: "Gauteng",
      educationLevel: "Grade 12",
      interests: ["IT", "Business"]
    },
    {
      fullName: student.name || "Demo Student",
      age: "23",
      province: "KwaZulu-Natal",
      educationLevel: "NCV Level 4",
      interests: ["Engineering", "Trades"]
    },
    {
      fullName: student.name || "Demo Student",
      age: "20",
      province: "Western Cape",
      educationLevel: "N5",
      interests: ["Science", "Business"]
    }
  ];

  student.profile = profilePresets[index % profilePresets.length];
}

// One-click demo pipeline seeding used by admin actions when no applications exist.
function seedDemoApplicationsIfEmpty() {
  if (store.applications.length) {
    return { ok: false, message: "Applications already exist." };
  }

  const students = store.users.filter((user) => user.role === "student");
  if (!students.length) {
    return { ok: false, message: "No student accounts available for seeding." };
  }

  students.forEach((student, index) => ensureSeedStudentProfile(student, index));

  const seedOpportunities = [
    ...getOpportunityCatalogue().filter((opportunity) => opportunity.type === "Bursary").slice(0, 3),
    ...getOpportunityCatalogue().filter((opportunity) => isLearnershipType(opportunity.type)).slice(0, 2),
    ...getOpportunityCatalogue().filter((opportunity) => opportunity.type === "Course").slice(0, 2)
  ];
const statusCycle = ["draft", "submitted", "in_review", "shortlisted", "funded"];
const created = [];

seedOpportunities.forEach((opportunity, index) => {
  const student = students[index % students.length];

  const checklist = getDocumentChecklist(student.id, opportunity.type);
  const docsComplete = index % 2 === 0 ? checklist.complete : false;
  const tags = {
    shortlisted: index % 3 !== 0,
    interviewed: index % 4 === 0,
    funded: opportunity.type === "Bursary" ? index % 3 === 0 : index % 5 === 0,
    graduated: false
  };

  const createdAtIso = new Date(Date.now() - index * 86400000).toISOString();
  const createdAtTs = toTimestamp(createdAtIso);
  const seededStatus = tags.funded ? "funded" : statusCycle[index % statusCycle.length];
  const submittedAt = seededStatus === "draft" ? null : createdAtTs + 3600000;
  const timeline = [{ status: "draft", at: createdAtTs }];
  if (seededStatus !== "draft") {
    timeline.push({ status: seededStatus, at: submittedAt || createdAtTs });
  }

  const seededApplication = {
    id: uid("app"),
    studentId: student.id,
    opportunityId: opportunity.id,
    opportunityType: opportunity.type,
    status: seededStatus,
    createdAt: createdAtIso,
    updatedAt: submittedAt || createdAtTs,
    submittedAt,
    timeline,
    tags,
    docsComplete,
    docsIncomplete: !docsComplete,
    qualityScore: 55 + ((stableSeedFromString(`${student.id}-${opportunity.id}`) + index) % 40),
    qualityReasons: ["Complete your profile and required documents to improve ranking."],
    score: 55 + ((stableSeedFromString(`${student.id}-${opportunity.id}`) + index) % 40),
    fundedAt: "",
    placementStatus: "Not placed",
    employer: "",
    placedAt: ""
  };

  if (tags.funded) {
    seededApplication.fundedAt = new Date(Date.now() - (index + 5) * 86400000).toISOString();
    if (index % 4 === 0) {
      seededApplication.tags.graduated = true;
    }
  }

  created.push(seededApplication);
});

  store.applications.unshift(...created);
  saveStore(store);
  return { ok: true, count: created.length };
}

/** ---------- DOM helpers ---------- **/
function el(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstChild;
}

function mount(node) {
  const root = document.getElementById("root");
  root.innerHTML = "";
  root.appendChild(node);
}

function getSidebarItems(role) {
  if (role === "student") {
    return [
      { label: "Dashboard", href: "/student/dashboard" },
      { label: "Career Guidance", href: "/student/career-guidance" },
      { label: "Documents", href: "/student/documents" },
      { label: "Bursaries", href: "/student/bursaries" },
      { label: "Learnerships/Internships", href: "/student/learnerships" },
      { label: "Courses", href: "/student/courses" }
    ];
  }

  return [
    { label: "Corporate", href: "/admin/corporate" },
    { label: "Opportunities", href: "/admin/opportunities" },
    { label: "Bursaries", href: "/admin/bursaries" },
    { label: "Lifecycle", href: "/admin/lifecycle" },
    { label: "Talent", href: "/admin/talent" },
    { label: "Analytics", href: "/admin/analytics" }
  ];
}

function resolveStudentNavRoute(currentRoute) {
  if (currentRoute.startsWith("/student/opportunity/") || currentRoute.startsWith("/student/apply/")) {
    const opportunityId = currentRoute.split("/")[3];
    const opportunity = getOpportunity(opportunityId);
    if (opportunity) return routeForOpportunityType(opportunity.type);
  }

  if (currentRoute.startsWith("/student/application/")) {
    const applicationId = currentRoute.split("/")[3];
    const application = getApplicationById(applicationId);
    const opportunity = application ? getOpportunity(application.opportunityId) : null;
    if (opportunity) return routeForOpportunityType(opportunity.type);
  }

  if (currentRoute === "/student/onboarding") return "/student/dashboard";
  return currentRoute;
}

function isRouteActive(currentRoute, href) {
  if (href === "/admin/corporate" && currentRoute === "/admin") return true;
  return currentRoute === href || currentRoute.startsWith(`${href}/`);
}

function getPageTitleForRoute(currentRoute) {
  if (currentRoute === "/student/onboarding") return "Learner Onboarding";
  if (currentRoute === "/student/dashboard") return "Student Dashboard";
  if (currentRoute === "/student/career-guidance") return "Career Guidance";
  if (currentRoute === "/student/documents") return "Documents";
  if (currentRoute === "/student/bursaries") return "Bursaries";
  if (currentRoute === "/student/learnerships") return "Learnerships / Internships";
  if (currentRoute === "/student/courses") return "Courses";
  if (currentRoute.startsWith("/student/opportunity/")) return "Opportunity Details";
  if (currentRoute.startsWith("/student/apply/")) return "Application Form";
  if (currentRoute.startsWith("/student/application/")) return "Application View";
  if (currentRoute === "/admin/corporate" || currentRoute === "/admin") return "Corporate Executive Dashboard";
  if (currentRoute === "/admin/opportunities") return "Opportunity Management";
  if (currentRoute === "/admin/bursaries") return "Bursary Application Management";
  if (currentRoute === "/admin/lifecycle") return "Funded Student Lifecycle Tracking";
  if (currentRoute === "/admin/talent") return "Talent Pipeline & Workforce Planning";
  if (currentRoute === "/admin/analytics") return "Analytics & Labour Intelligence";
  return "National TVET & SETA MVP";
}

function getMobileDashboardView() {
  try {
    return sessionStorage.getItem(MOBILE_DASHBOARD_VIEW_KEY) || "dashboard";
  } catch {
    return "dashboard";
  }
}

function setMobileDashboardView(view) {
  try {
    sessionStorage.setItem(MOBILE_DASHBOARD_VIEW_KEY, view || "dashboard");
  } catch {
  }
}

function getStatusBadgeClass(status) {
  if (status === "Open") return "badgeBlue";
  return getApplicationStatusBadgeClass(status);
}

function getOpportunityCategoryClass(type) {
  if (type === "Bursary") return "is-bursary";
  if (type === "Course") return "is-course";
  if (isLearnershipType(type)) return "is-learnership";
  return "is-course";
}

function getOpportunityTypeBadgeClass(type) {
  return `chip-category ${getOpportunityCategoryClass(type)}`;
}

function getOpportunityCardTypeClass(type) {
  return `card-accent-top ${getOpportunityCategoryClass(type)}`;
}

function getOpportunityLifecycleState(application) {
  if (!application) {
    return {
      statusLabel: "Open",
      statusClass: "statusPill statusOpen",
      cardVariantClass: "",
      isInProgress: false,
      isSubmitted: false,
      isClosed: false,
      isComplete: false
    };
  }

  const status = normalizeApplicationStatus(application.status, "draft");

  if (status === "draft") {
    return {
      statusLabel: getApplicationStatusLabel(status),
      statusClass: "statusPill statusClosed",
      cardVariantClass: "card-in-progress",
      isInProgress: true,
      isSubmitted: false,
      isClosed: false,
      isComplete: false
    };
  }

  if (status === "submitted") {
    return {
      statusLabel: getApplicationStatusLabel(status),
      statusClass: "statusPill statusSubmitted",
      cardVariantClass: "card-submitted",
      isInProgress: false,
      isSubmitted: true,
      isClosed: false,
      isComplete: false
    };
  }

  if (status === "in_review") {
    return {
      statusLabel: getApplicationStatusLabel(status),
      statusClass: "statusPill statusSubmitted badgePurple",
      cardVariantClass: "card-submitted card-in-progress",
      isInProgress: true,
      isSubmitted: true,
      isClosed: false,
      isComplete: false
    };
  }

  if (status === "shortlisted") {
    return {
      statusLabel: getApplicationStatusLabel(status),
      statusClass: "statusPill statusComplete",
      cardVariantClass: "card-priority card-submitted",
      isInProgress: false,
      isSubmitted: true,
      isClosed: false,
      isComplete: false
    };
  }

  if (status === "funded" || status === "completed") {
    return {
      statusLabel: getApplicationStatusLabel(status),
      statusClass: "statusPill statusComplete",
      cardVariantClass: "card-submitted",
      isInProgress: false,
      isSubmitted: true,
      isClosed: false,
      isComplete: true
    };
  }

  return {
    statusLabel: getApplicationStatusLabel("rejected"),
    statusClass: "statusPill statusClosed",
    cardVariantClass: "card-submitted card-closed",
    isInProgress: false,
    isSubmitted: true,
    isClosed: true,
    isComplete: false
  };
}

function getOpportunityPrimaryAction(opportunityId, application, recommended, lifecycle) {
  if (application) {
    const status = normalizeApplicationStatus(application.status, "draft");
    const canContinue = status === "draft";
    return {
      label: canContinue ? "Continue application" : "View application",
      href: `#/student/application/${application.id}`
    };
  }

  if (recommended) {
    return { label: "Apply", href: `#/student/apply/${opportunityId}` };
  }

  return { label: "View details", href: `#/student/opportunity/${opportunityId}` };
}

function isSubmittedApplicationStatus(status) {
  return normalizeApplicationStatus(status, "draft") !== "draft";
}


function getApplicationProgressBlueprint(opportunityType) {
  if (opportunityType === "Course") {
    return [
      {
        id: "profile",
        title: "Profile completed",
        description: "Basic learner profile details are saved."
      },
      {
        id: "requirements",
        title: "Meet entry requirements",
        description: "Your current profile is ready for entry requirement checks."
      },
      {
        id: "submit",
        title: "Submit application",
        description: "Review the details and submit your course application."
      }
    ];
  }

  return [
    {
      id: "profile",
      title: "Profile completed",
      description: "Personal and study profile details are captured."
    },
    {
      id: "documents",
      title: "Required documents uploaded",
      description: "Required ID and academic documents are available."
    },
    {
      id: "form",
      title: "Application form completed",
      description: "Application details are complete for this opportunity."
    },
    {
      id: "review",
      title: "Review & submit",
      description: "Final check before sending your application."
    }
  ];
}

function buildApplicationProgressState(user, opportunity, application = null) {
  const safeOpportunity = opportunity || {};
  const profile = getUserProfile(user) || {};

  const profileName = String(profile.fullName || user?.name || "").trim();
  const profileProvince = String(profile.province || "").trim();
  const profileAge = String(profile.age || "").trim();
  const profileEducation = String(profile.educationLevel || "").trim();
  const profileEmail = String(user?.email || profile.email || "").trim();
  const profileInterests = Array.isArray(profile.interests) ? profile.interests.filter(Boolean) : [];

  const profileCoreComplete = Boolean(profileName && profileProvince && profileEmail);
  const profileDetailsComplete = Boolean(profileCoreComplete && profileAge && profileEducation && profileInterests.length);

  const checklist = getDocumentChecklist(user.id, safeOpportunity.type || "");
  const submitted = Boolean(application && isSubmittedApplicationStatus(application.status));
  const docsComplete = submitted
    ? true
    : application
      ? typeof application.docsComplete === "boolean"
        ? application.docsComplete
        : !Boolean(application.docsIncomplete)
      : checklist.complete;

  const formComplete = Boolean(submitted || application || profileDetailsComplete);
  const meetsEntryRequirements = Boolean(submitted || application || profileDetailsComplete);

  const completionById = {
    profile: profileCoreComplete,
    documents: docsComplete,
    form: formComplete,
    review: submitted,
    requirements: meetsEntryRequirements,
    submit: submitted
  };

  const resolveStepAction = (stepId) => {
    if (stepId === "profile") {
      return { kind: "link", label: "Complete profile", href: "#/student/dashboard" };
    }
    if (stepId === "documents") {
      return { kind: "link", label: "Upload documents", href: "#/student/documents" };
    }
    if (stepId === "form") {
      return { kind: "link", label: "Continue application", href: `#/student/apply/${safeOpportunity.id}` };
    }
    if (stepId === "requirements") {
      return { kind: "link", label: "Review requirements", href: `#/student/opportunity/${safeOpportunity.id}` };
    }
    if (stepId === "review" || stepId === "submit") {
      return { kind: "submit", label: "Review & submit" };
    }
    return null;
  };

  const blueprint = getApplicationProgressBlueprint(safeOpportunity.type || "");
  const steps = [];
  let chainOpen = true;
  let activeAssigned = false;

  blueprint.forEach((step) => {
    const complete = Boolean(completionById[step.id]);
    let state = "locked";

    if (chainOpen && complete) {
      state = "completed";
    } else if (chainOpen && !activeAssigned) {
      state = "active";
      activeAssigned = true;
      chainOpen = false;
    } else {
      chainOpen = false;
    }

    steps.push({
      ...step,
      complete,
      state,
      action: state === "active" ? resolveStepAction(step.id) : null
    });
  });

  const completedCount = steps.filter((step) => step.state === "completed").length;
  const totalSteps = steps.length;
  const progressPercent = totalSteps ? Math.round((completedCount / totalSteps) * 100) : 0;
  const activeStep = steps.find((step) => step.state === "active") || null;

  let summaryAction = activeStep?.action || null;
  if (!summaryAction && application?.id) {
    const canContinue = normalizeApplicationStatus(application.status, "draft") === "draft";
    summaryAction = {
      kind: "link",
      label: canContinue ? "Continue application" : "View application",
      href: `#/student/application/${application.id}`
    };
  }
  if (!summaryAction && safeOpportunity.id) {
    summaryAction = { kind: "link", label: "Continue application", href: `#/student/apply/${safeOpportunity.id}` };
  }

  return {
    steps,
    totalSteps,
    completedCount,
    progressPercent,
    activeStep,
    summaryAction,
    categoryClass: getOpportunityCategoryClass(safeOpportunity.type || "Course")
  };
}

function renderApplicationProgressStepper(progressState, formId = "form") {
  if (!progressState || !Array.isArray(progressState.steps) || !progressState.steps.length) return "";

  const summaryActionHtml = (() => {
    if (!progressState.summaryAction) return "";
    if (progressState.summaryAction.kind === "submit") {
      return `<button class="btn btnPrimary" type="submit" form="${escapeHtml(formId)}">${escapeHtml(progressState.summaryAction.label)}</button>`;
    }
    return `<a class="btn btnPrimary" href="${progressState.summaryAction.href}">${escapeHtml(progressState.summaryAction.label)}</a>`;
  })();

  return `<div class="grid applicationProgressBlock">
    <div class="card applicationProgressSummary ${progressState.categoryClass}">
      <div class="row" style="justify-content:space-between; align-items:flex-start;">
        <div>
          <div class="mutedText" style="font-size:12px; text-transform:uppercase; letter-spacing:.04em;">Application progress</div>
          <h3 style="margin-top:6px;">${progressState.completedCount} of ${progressState.totalSteps} steps completed</h3>
        </div>
        <span class="statusPill statusSubmitted">${progressState.progressPercent}%</span>
      </div>
      <div class="applicationProgressBar" aria-hidden="true">
        <div class="applicationProgressBarFill" style="width:${progressState.progressPercent}%;"></div>
      </div>
      <div class="mutedText" style="font-size:13px; margin-top:8px;">${progressState.activeStep ? `Current step: ${escapeHtml(progressState.activeStep.title)}` : "All steps completed."}</div>
      ${summaryActionHtml ? `<div class="applicationSummaryAction" style="margin-top:12px;">${summaryActionHtml}</div>` : ""}
    </div>

    <div class="card applicationProgressStepper card-accent-top ${progressState.categoryClass}">
      <div class="applicationSteps" role="list" aria-label="Application progress journey">
        ${progressState.steps
          .map((step, index) => {
            const stepStateLabel = step.state === "completed" ? "Completed" : step.state === "active" ? "Current" : "Locked";
            const actionHtml = (() => {
              if (!step.action || step.state !== "active") return "";
              if (step.action.kind === "submit") {
                return `<button class="btn btnPrimary" type="submit" form="${escapeHtml(formId)}">${escapeHtml(step.action.label)}</button>`;
              }
              return `<a class="btn btnPrimary" href="${step.action.href}">${escapeHtml(step.action.label)}</a>`;
            })();

            return `<div class="applicationStep is-${step.state}" role="listitem" aria-label="${escapeHtml(step.title)} - ${stepStateLabel}">
              <div class="applicationStepRail" aria-hidden="true">
                <span class="applicationStepCircle">${step.state === "completed" ? "✓" : index + 1}</span>
                ${index < progressState.steps.length - 1 ? `<span class="applicationStepConnector"></span>` : ""}
              </div>
              <div class="applicationStepBody">
                <div class="applicationStepHeader">
                  <h4>${escapeHtml(step.title)}</h4>
                  <span class="applicationStepState">${stepStateLabel}</span>
                </div>
                <p class="applicationStepDescription">${escapeHtml(step.description)}</p>
                ${actionHtml ? `<div class="applicationStepAction">${actionHtml}</div>` : ""}
              </div>
            </div>`;
          })
          .join("")}
      </div>
    </div>
  </div>`;
}

function getOpportunityProgressSummary(user, opportunity, application) {
  const progressState = buildApplicationProgressState(user, opportunity, application);
  return {
    completed: progressState.completedCount,
    total: progressState.totalSteps,
    label: `${progressState.completedCount} of ${progressState.totalSteps} completed`
  };
}

const CAREER_GUIDANCE_QUIZ_PHASES = [
  { label: "Profile", startIndex: 0, endIndex: 1 },
  { label: "Interests", startIndex: 2, endIndex: 3 },
  { label: "Skills", startIndex: 4, endIndex: 6 },
  { label: "Opportunities", startIndex: 7, endIndex: 8 },
  { label: "Applications", startIndex: 9, endIndex: 9 }
];

function getCareerGuidanceQuizPhaseIndex(stepIndex) {
  const safeIndex = Number.isFinite(stepIndex) ? stepIndex : 0;
  const match = CAREER_GUIDANCE_QUIZ_PHASES.findIndex((phase) => safeIndex >= phase.startIndex && safeIndex <= phase.endIndex);
  return match >= 0 ? match : 0;
}

function getCareerGuidanceQuizStepIndexForPhase(phaseIndex) {
  const phase = CAREER_GUIDANCE_QUIZ_PHASES[phaseIndex] || CAREER_GUIDANCE_QUIZ_PHASES[0];
  return phase.startIndex;
}

function renderQuizStepNavigator(totalSteps, currentStepIndex) {
  const activePhaseIndex = getCareerGuidanceQuizPhaseIndex(currentStepIndex);

  const indicators = CAREER_GUIDANCE_QUIZ_PHASES
    .map((phase, index) => {
      const isComplete = index < activePhaseIndex;
      const isActive = index == activePhaseIndex;
      const stateClass = isActive ? "is-active" : isComplete ? "is-complete" : "";
      const ariaCurrent = isActive ? ' aria-current="step" data-quiz-step-current="true"' : "";
      const buttonLabel = `${phase.label} step ${index + 1} of ${CAREER_GUIDANCE_QUIZ_PHASES.length}`;
      const icon = isComplete
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>`
        : isActive
          ? `<span class="ydhStepperIndicatorDot"></span>`
          : `<span class="ydhStepperIndicatorNumber">${index + 1}</span>`;
      const connector = index < CAREER_GUIDANCE_QUIZ_PHASES.length - 1
        ? `<div class="ydhStepperConnector ${index < activePhaseIndex ? "is-complete" : ""}"><div class="ydhStepperConnectorFill"></div></div>`
        : "";

      return `<button type="button" class="ydhStepperIndicator ${stateClass}" data-career-phase-index="${index}" aria-label="${escapeHtml(buttonLabel)}"${ariaCurrent}>
        <span class="ydhStepperIndicatorInner">${icon}</span>
        <span class="ydhStepperIndicatorLabel">${escapeHtml(phase.label)}</span>
      </button>${connector}`;
    })
    .join("");

  return `<div class="ydhGuidanceStepper ydhGuidanceStepper--quiz" aria-label="Career guidance progress">
    <div class="ydhGuidanceStepperIndicators" role="tablist">
      ${indicators}
    </div>
  </div>`;
}

function createInlineProfileEditorDraft(profile, user = null) {
  const safeProfile = profile && typeof profile === "object" ? profile : {};
  return {
    fullName: String(safeProfile.fullName || user?.name || "").trim(),
    age: String(safeProfile.age || "").trim(),
    province: String(safeProfile.province || "").trim(),
    educationLevel: String(safeProfile.educationLevel || "").trim(),
    interests: Array.isArray(safeProfile.interests)
      ? safeProfile.interests.filter((interest) => INTERESTS.includes(interest))
      : []
  };
}

function renderInlineProfileEditor(options = {}) {
  const {
    mode = "application-review",
    open = false,
    draft = createInlineProfileEditorDraft({}),
    error = "",
    notice = ""
  } = options;

  return `<div class="inlineProfileEditorOverlay ${open ? "open" : ""}" id="inlineProfileEditorOverlay" ${open ? "" : "hidden"} aria-hidden="${open ? "false" : "true"}">
    <section class="inlineProfileEditorSheet" id="inlineProfileEditorDialog" role="dialog" aria-modal="true" aria-labelledby="inlineProfileEditorTitle" aria-describedby="inlineProfileEditorAssist inlineProfileEditorImpact" tabindex="-1" data-inline-profile-editor-mode="${escapeHtml(mode)}">
      <div class="row" style="justify-content:space-between; align-items:flex-start;">
        <div>
          <h3 id="inlineProfileEditorTitle" style="margin:0;">Edit profile</h3>
          <div class="mutedText" id="inlineProfileEditorAssist" style="font-size:12px; margin-top:4px;">Update info without leaving this application review.</div>
        </div>
        <button type="button" class="btn btnGhost inlineProfileEditorClose" id="inlineProfileCloseBtn" aria-label="Close edit profile dialog">Close</button>
      </div>

      <form id="inlineProfileEditorForm" style="margin-top:12px;">
        <div class="inlineProfileEditorSection">
          <div class="inlineProfileEditorSectionTitle">Personal</div>
          <div class="field">
            <label for="inlineProfileFullName"><b>Full name (optional)</b></label>
            <input class="input" id="inlineProfileFullName" data-editor-field="fullName" name="fullName" value="${escapeHtml(draft.fullName || "")}" placeholder="Enter full name" autocomplete="name" />
          </div>
          <div class="grid cols-2">
            <div class="field">
              <label for="inlineProfileAge"><b>Age *</b></label>
              <input class="input" id="inlineProfileAge" data-editor-field="age" name="age" value="${escapeHtml(draft.age || "")}" inputmode="numeric" type="number" min="14" max="100" step="1" />
            </div>
            <div class="field">
              <label for="inlineProfileProvince"><b>Province *</b></label>
              <select class="input select" id="inlineProfileProvince" data-editor-field="province" name="province">
                <option value="">Select province</option>
                ${PROVINCES.map((province) => `<option value="${province}" ${draft.province === province ? "selected" : ""}>${province}</option>`).join("")}
              </select>
            </div>
          </div>
        </div>

        <div class="inlineProfileEditorSection" style="margin-top:12px;">
          <div class="inlineProfileEditorSectionTitle">Education</div>
          <div class="field">
            <label for="inlineProfileEducation"><b>Education level *</b></label>
            <input class="input" id="inlineProfileEducation" data-editor-field="educationLevel" name="educationLevel" value="${escapeHtml(draft.educationLevel || "")}" placeholder="e.g. Matric, NCV Level 4, N6" autocomplete="organization-title" />
          </div>
        </div>

        <div class="inlineProfileEditorSection" style="margin-top:12px;">
          <div class="inlineProfileEditorSectionTitle">Preferences</div>
          <div class="inlineProfileInterestsGrid" role="group" aria-label="Interests">
            ${INTERESTS.map((interest, index) => {
              const checked = draft.interests.includes(interest) ? "checked" : "";
              const inputId = `inlineProfileInterest-${index}`;
              return `<label class="inlineInterestChip" for="${inputId}">
                <input type="checkbox" id="${inputId}" value="${escapeHtml(interest)}" ${checked} />
                <span>${escapeHtml(interest)}</span>
              </label>`;
            }).join("")}
          </div>
        </div>

        <div class="mutedText inlineImpactNotice" id="inlineProfileEditorImpact" style="margin-top:12px;">Updates may change required documents for this application.</div>
        <div id="inlineProfileEditorError" class="mutedText" style="color: var(--color-danger); margin-top:8px;">${escapeHtml(error || "")}</div>
        <div id="inlineProfileEditorNotice" class="mutedText" style="color: var(--color-primary); margin-top:4px;">${escapeHtml(notice || "")}</div>

        <div class="row inlineProfileEditorActions" style="margin-top:12px; justify-content:space-between;">
          <a class="btn btnGhost" href="#/student/dashboard" data-inline-profile-open-settings="true">Open full profile settings</a>
          <div class="row" style="gap:8px;">
            <button type="button" class="btn btnGhost" id="inlineProfileCancelBtn">Cancel</button>
            <button type="submit" class="btn btnPrimary" id="inlineProfileSaveBtn">Save profile</button>
          </div>
        </div>
      </form>
    </section>
  </div>`;
}

function activateDialogFocusTrap(dialog, onRequestClose, initialFocusElement) {
  if (!dialog) return () => {};

  const previouslyFocused = document.activeElement;
  const focusSelector = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const getFocusableElements = () =>
    Array.from(dialog.querySelectorAll(focusSelector)).filter((element) => !element.hasAttribute("hidden"));

  const handleKeydown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      if (typeof onRequestClose === "function") onRequestClose();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = getFocusableElements();
    if (!focusable.length) {
      event.preventDefault();
      dialog.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  document.addEventListener("keydown", handleKeydown);

  requestAnimationFrame(() => {
    const focusable = getFocusableElements();
    const target =
      initialFocusElement && typeof initialFocusElement.focus === "function"
        ? initialFocusElement
        : focusable[0] || dialog;
    target.focus();
  });

  return () => {
    document.removeEventListener("keydown", handleKeydown);
    if (previouslyFocused && typeof previouslyFocused.focus === "function") {
      previouslyFocused.focus();
    }
  };
}

function getStudentMobileNavItems(currentRoute) {
  const normalized = resolveStudentNavRoute(currentRoute);
  const dashboardView = getMobileDashboardView();
  const isOpportunities =
    normalized === "/student/bursaries" ||
    normalized === "/student/learnerships" ||
    normalized === "/student/courses" ||
    currentRoute.startsWith("/student/opportunity/") ||
    currentRoute.startsWith("/student/apply/") ||
    currentRoute.startsWith("/student/application/");
  const isProfile = normalized === "/student/dashboard" && dashboardView === "profile";
  const isDocuments = normalized === "/student/documents";
  const isDashboard = normalized === "/student/dashboard" && !isProfile;

  return [
    {
      label: "Dashboard",
      href: "/student/dashboard",
      iconSrc: "https://cdn.lordicon.com/jeuxydnh.json",
      view: "dashboard",
      active: isDashboard
    },
    {
      label: "Opportunities",
      href: "/student/bursaries",
      iconSrc: "https://cdn.lordicon.com/rpviwvwn.json",
      active: isOpportunities
    },
    {
      label: "Documents",
      href: "/student/documents",
      iconSrc: "https://cdn.lordicon.com/hmpomorl.json",
      active: isDocuments
    },
    {
      label: "Profile",
      href: "/student/dashboard",
      iconSrc: "https://cdn.lordicon.com/kdduutaw.json",
      view: "profile",
      active: isProfile
    }
  ];
}

function renderStudentMobileNavIcon(item) {
  return `<lord-icon
    class="mobileBottomNavLordIcon"
    src="${escapeHtml(item.iconSrc || '')}"
    trigger="click"
    colors="primary:#F59E0B,secondary:#F59E0B"
    style="width:30px;height:30px">
  </lord-icon>`;
}

function getAdminMobileNavIcon(label, href) {
  if (href === "/admin/corporate") return "◈";
  if (href === "/admin/opportunities") return "▥";
  if (href === "/admin/bursaries") return "◉";
  if (href === "/admin/lifecycle") return "▣";
  if (href === "/admin/talent") return "◎";
  if (href === "/admin/analytics") return "◔";

  const normalizedLabel = String(label || "").toLowerCase();
  if (normalizedLabel.includes("corporate")) return "◈";
  if (normalizedLabel.includes("opportunit")) return "▥";
  if (normalizedLabel.includes("bursar")) return "◉";
  if (normalizedLabel.includes("life")) return "▣";
  if (normalizedLabel.includes("talent")) return "◎";
  if (normalizedLabel.includes("analytic")) return "◔";
  return "•";
}

function getAdminMobileNavItems(currentRoute) {
  const items = getSidebarItems("admin").map((item) => ({
    ...item,
    icon: getAdminMobileNavIcon(item.label, item.href),
    active: isRouteActive(currentRoute, item.href)
  }));

  const maxPrimaryItems = 5;
  if (items.length <= maxPrimaryItems) {
    return { primaryItems: items, overflowItems: [] };
  }

  const overflowItems = items.slice(maxPrimaryItems - 1);
  const hasActiveOverflow = overflowItems.some((item) => item.active);

  return {
    primaryItems: [
      ...items.slice(0, maxPrimaryItems - 1),
      { label: "More", href: "#", icon: "⋯", active: hasActiveOverflow, isMore: true }
    ],
    overflowItems
  };
}


function openPartnerModal(title, html) {
  var existing = document.getElementById('partnerDetailModal');
  if (existing) existing.remove();
  var overlay = document.createElement('div');
  overlay.id = 'partnerDetailModal';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;padding:20px;animation:partnerModalIn 180ms ease both';
  overlay.innerHTML = '<div style="background:var(--color-surface);border-radius:var(--radius-lg);max-width:640px;width:100%;max-height:85vh;overflow-y:auto;padding:28px;box-shadow:0 24px 64px rgba(0,0,0,.22);animation:partnerModalSlide 220ms cubic-bezier(0.22,1,0.36,1) both">'
    + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">'
    + '<b style="font-size:18px;font-weight:800;">' + escapeHtml(title) + '</b>'
    + '<button class="btn btnGhost" id="pmc" style="padding:6px 12px;">✕ Close</button>'
    + '</div><div>' + html + '</div></div>';
  overlay.querySelector('#pmc').onclick = function() { overlay.remove(); };
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

function metricTile(label, value, hint = "") {
  return `<div class="card">
    <div class="mutedText" style="font-size:12px; text-transform:uppercase; letter-spacing:.04em;">${escapeHtml(label)}</div>
    <div style="font-size:28px; font-weight:700; margin-top:8px;">${escapeHtml(value)}</div>
    ${hint ? `<div class="mutedText" style="font-size:12px; margin-top:8px;">${escapeHtml(hint)}</div>` : ""}
  </div>`;
}

/** ---------- Actions ---------- **/
function pageCorporateDashboard() {
  const user = requireRole("corporate_partner");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  // ═══════════════════════════════════════════════
  //  RICH MOCK DATA
  // ═══════════════════════════════════════════════
  const CORP_OPPS = [
    { id:'co1', title:'Banking Operations Learnership', company:'Standard Bank', type:'Learnership', province:'Gauteng', sector:'Finance', closing:'2026-06-30', status:'open', stipend:'R6,500/month', views:342, applications:0 },
    { id:'co2', title:'Digital Marketing Internship', company:'Vodacom', type:'Internship', province:'Gauteng', sector:'Marketing', closing:'2026-05-31', status:'open', stipend:'R8,000/month', views:215, applications:0 },
    { id:'co3', title:'IT Support Internship', company:'Google SA', type:'Internship', province:'Western Cape', sector:'Technology', closing:'2026-07-15', status:'open', stipend:'R9,500/month', views:480, applications:0 },
    { id:'co4', title:'Finance Graduate Programme', company:'Deloitte', type:'Graduate', province:'Gauteng', sector:'Finance', closing:'2026-08-31', status:'open', stipend:'R18,000/month', views:620, applications:0 },
    { id:'co5', title:'Data Analytics Learnership', company:'Nedbank', type:'Learnership', province:'Gauteng', sector:'Data & Analytics', closing:'2026-06-15', status:'open', stipend:'R7,800/month', views:390, applications:0 },
    { id:'co6', title:'Cloud Engineering Internship', company:'MTN Group', type:'Internship', province:'KwaZulu-Natal', sector:'Technology', closing:'2026-09-01', status:'open', stipend:'R9,000/month', views:275, applications:0 },
    { id:'co7', title:'Risk & Compliance Learnership', company:'PwC', type:'Learnership', province:'Western Cape', sector:'Finance', closing:'2026-05-15', status:'closing soon', stipend:'R8,500/month', views:188, applications:0 },
    { id:'co8', title:'Engineering Bursary Programme', company:'Anglo American', type:'Bursary', province:'Limpopo', sector:'Engineering', closing:'2026-10-31', status:'open', stipend:'R85,000/year', views:512, applications:0 },
    { id:'co9', title:'FinTech Innovation Internship', company:'Absa Bank', type:'Internship', province:'Gauteng', sector:'Technology', closing:'2026-07-31', status:'open', stipend:'R10,500/month', views:440, applications:0 },
    { id:'co10', title:'Health Operations Learnership', company:'Discovery', type:'Learnership', province:'Gauteng', sector:'Healthcare', closing:'2026-06-01', status:'open', stipend:'R7,200/month', views:295, applications:0 },
  ];

  const CORP_APPLICANTS = [
    { id:'ca1',  name:'Thabo Nkosi',          email:'thabo.nkosi@email.co.za',        phone:'071 234 5678', province:'Gauteng',       education:'Matric',    skills:['Finance','Data Analytics','MS Excel'],        oppId:'co1', status:'accepted',   score:87 },
    { id:'ca2',  name:'Ayanda Dlamini',        email:'ayanda.d@email.co.za',           phone:'082 345 6789', province:'KwaZulu-Natal', education:'TVET N4',   skills:['Marketing','Social Media','Canva'],            oppId:'co2', status:'reviewing',  score:74 },
    { id:'ca3',  name:'Sipho Mthembu',         email:'sipho.m@email.co.za',            phone:'063 456 7890', province:'Gauteng',       education:'Diploma',   skills:['IT Support','Networking','Python'],            oppId:'co3', status:'accepted',   score:91 },
    { id:'ca4',  name:'Naledi Sithole',        email:'naledi.s@email.co.za',           phone:'076 567 8901', province:'Western Cape',  education:'Degree',    skills:['Finance','Accounting','Analysis'],             oppId:'co4', status:'interviewed',score:83 },
    { id:'ca5',  name:'Luyanda Khumalo',       email:'luyanda.k@email.co.za',          phone:'071 678 9012', province:'Gauteng',       education:'TVET N6',   skills:['Data Analytics','SQL','Power BI'],             oppId:'co5', status:'accepted',   score:89 },
    { id:'ca6',  name:'Zanele Mokoena',        email:'zanele.m@email.co.za',           phone:'083 789 0123', province:'KwaZulu-Natal', education:'Matric',    skills:['Cloud','Azure','Networking'],                  oppId:'co6', status:'applied',    score:65 },
    { id:'ca7',  name:'Kagiso Tau',            email:'kagiso.t@email.co.za',           phone:'072 890 1234', province:'Western Cape',  education:'Diploma',   skills:['Compliance','Risk Management','Law'],          oppId:'co7', status:'rejected',   score:58 },
    { id:'ca8',  name:'Nompumelelo Zulu',      email:'nompumelelo.z@email.co.za',      phone:'061 901 2345', province:'Limpopo',       education:'Matric',    skills:['Engineering','Mathematics','Physics'],         oppId:'co8', status:'reviewing',  score:71 },
    { id:'ca9',  name:'Bongani Cele',          email:'bongani.c@email.co.za',          phone:'079 012 3456', province:'Gauteng',       education:'Degree',    skills:['FinTech','Python','API Design'],               oppId:'co9', status:'interviewed',score:85 },
    { id:'ca10', name:'Phiwayinkosi Dube',     email:'phiwayinkosi.d@email.co.za',     phone:'082 123 4567', province:'Gauteng',       education:'Diploma',   skills:['Healthcare','Administration','MS Office'],     oppId:'co10',status:'applied',    score:68 },
    { id:'ca11', name:'Amahle Ngema',          email:'amahle.n@email.co.za',           phone:'071 234 5679', province:'Eastern Cape',  education:'TVET N4',   skills:['Finance','Budgeting','Excel'],                 oppId:'co1', status:'applied',    score:70 },
    { id:'ca12', name:'Sifiso Buthelezi',      email:'sifiso.b@email.co.za',           phone:'063 345 6789', province:'KwaZulu-Natal', education:'Matric',    skills:['Marketing','Content Creation','SEO'],          oppId:'co2', status:'accepted',   score:82 },
    { id:'ca13', name:'Thandeka Gumede',       email:'thandeka.g@email.co.za',         phone:'083 456 7890', province:'Gauteng',       education:'Degree',    skills:['Python','Machine Learning','SQL'],             oppId:'co3', status:'interviewed',score:88 },
    { id:'ca14', name:'Mthokozisi Mthethwa',   email:'mthokozisi.m@email.co.za',       phone:'072 567 8901', province:'Mpumalanga',    education:'Diploma',   skills:['Accounting','Tax','SARS'],                     oppId:'co4', status:'reviewing',  score:76 },
    { id:'ca15', name:'Nokwanda Zikode',       email:'nokwanda.z@email.co.za',         phone:'079 678 9012', province:'Western Cape',  education:'TVET N6',   skills:['Analytics','Tableau','R'],                    oppId:'co5', status:'applied',    score:63 },
    { id:'ca16', name:'Siphelele Ntuli',       email:'siphelele.n@email.co.za',        phone:'061 789 0123', province:'Gauteng',       education:'Matric',    skills:['Cloud','AWS','Linux'],                         oppId:'co6', status:'reviewing',  score:72 },
    { id:'ca17', name:'Nkosinathi Hadebe',     email:'nkosinathi.h@email.co.za',       phone:'082 890 1234', province:'Free State',    education:'Diploma',   skills:['Risk','Compliance','FICA'],                    oppId:'co7', status:'accepted',   score:80 },
    { id:'ca18', name:'Lungelo Mthembu',       email:'lungelo.m2@email.co.za',         phone:'071 901 2345', province:'Limpopo',       education:'Matric',    skills:['Mechanical','AutoCAD','Engineering'],          oppId:'co8', status:'applied',    score:66 },
    { id:'ca19', name:'Simangele Msweli',      email:'simangele.ms@email.co.za',       phone:'063 012 3456', province:'Gauteng',       education:'Degree',    skills:['Blockchain','FinTech','APIs'],                 oppId:'co9', status:'reviewing',  score:79 },
    { id:'ca20', name:'Musa Khoza',            email:'musa.k@email.co.za',             phone:'083 123 4567', province:'KwaZulu-Natal', education:'TVET N4',   skills:['Operations','Logistics','Health'],             oppId:'co10',status:'rejected',   score:55 },
    { id:'ca21', name:'Gugulethu Mthembu',     email:'gugulethu.m@email.co.za',        phone:'079 234 5678', province:'Gauteng',       education:'Matric',    skills:['Banking','Teller','Finance'],                  oppId:'co1', status:'reviewing',  score:73 },
    { id:'ca22', name:'Sibongile Xulu',        email:'sibongile.x@email.co.za',        phone:'072 345 6789', province:'KwaZulu-Natal', education:'Diploma',   skills:['Digital Marketing','PPC','Analytics'],         oppId:'co2', status:'applied',    score:69 },
    { id:'ca23', name:'Nomvula Ntanzi',        email:'nomvula.n@email.co.za',          phone:'061 456 7890', province:'Eastern Cape',  education:'TVET N6',   skills:['Cloud','GCP','DevOps'],                       oppId:'co3', status:'applied',    score:61 },
    { id:'ca24', name:'Zakhele Mthethwa',      email:'zakhele.mt@email.co.za',         phone:'082 567 8901', province:'Gauteng',       education:'Degree',    skills:['Finance','Investment','CFA'],                  oppId:'co4', status:'accepted',   score:94 },
    { id:'ca25', name:'Nokuthula Hlongwane',   email:'nokuthula.h@email.co.za',        phone:'071 678 9011', province:'Western Cape',  education:'Diploma',   skills:['Data','Visualization','Python'],               oppId:'co5', status:'interviewed',score:86 },
    { id:'ca26', name:'Siyabonga Ntuli',       email:'siyabonga.n@email.co.za',        phone:'063 789 0122', province:'Limpopo',       education:'Matric',    skills:['Networking','Azure','Support'],                oppId:'co6', status:'accepted',   score:78 },
    { id:'ca27', name:'Thabisile Dlamini',     email:'thabisile.d@email.co.za',        phone:'079 890 1233', province:'Mpumalanga',    education:'TVET N4',   skills:['FICA','POPIA','Compliance'],                   oppId:'co7', status:'reviewing',  score:67 },
    { id:'ca28', name:'Mphathi Majola',        email:'mphathi.m@email.co.za',          phone:'083 901 2344', province:'Northern Cape', education:'Matric',    skills:['Civil','Survey','Engineering'],                oppId:'co8', status:'applied',    score:60 },
    { id:'ca29', name:'Lungile Msomi',         email:'lungile.ms@email.co.za',         phone:'072 012 3455', province:'Gauteng',       education:'Degree',    skills:['Mobile Dev','React Native','APIs'],            oppId:'co9', status:'accepted',   score:92 },
    { id:'ca30', name:'Hlengiwe Mthembu',      email:'hlengiwe.mt@email.co.za',        phone:'061 123 4566', province:'KwaZulu-Natal', education:'Diploma',   skills:['Medical Admin','Health','Billing'],            oppId:'co10',status:'reviewing',  score:71 },
  ];

  CORP_OPPS.forEach(o => { o.applications = CORP_APPLICANTS.filter(a => a.oppId === o.id).length; });

  const CORP_DOC_TYPES = ['ID Copy','Matric Certificate','CV','Proof of Address','TVET Transcript'];
  const CORP_DOCS_INITIAL = CORP_APPLICANTS.slice(0, 14).map((a, i) => ({
    id: 'cdoc-' + a.id, applicantId: a.id, applicantName: a.name,
    docType: CORP_DOC_TYPES[i % 5], status: 'Pending',
    uploaded: '2026-0' + (Math.floor(i / 5) + 1) + '-' + String((i % 28) + 1).padStart(2, '0')
  }));

  // ── Live mutable state ─────────────────────────────────────────────────
  let liveOpps = [...CORP_OPPS];
  let liveDocs = CORP_DOCS_INITIAL.map(d => ({...d}));

  // ── Build outer shell with inner nav ──────────────────────────────────
  const node = el(`<div class="dashMultiPage">
    <div class="dashInnerNav">
      <button class="dashInnerNavBtn active" data-nav="overview">Overview</button>
      <button class="dashInnerNavBtn" data-nav="opportunities">Opportunities</button>
      <button class="dashInnerNavBtn" data-nav="applicants">Applicants</button>
      <button class="dashInnerNavBtn" data-nav="pipeline">Pipeline</button>
      <button class="dashInnerNavBtn" data-nav="analytics">Analytics</button>
      <button class="dashInnerNavBtn" data-nav="docs">Documents</button>
    </div>
    <div id="corpPgOverview"      class="dashPage"></div>
    <div id="corpPgOpportunities" class="dashPage" style="display:none;"></div>
    <div id="corpPgApplicants"    class="dashPage" style="display:none;"></div>
    <div id="corpPgPipeline"      class="dashPage" style="display:none;"></div>
    <div id="corpPgAnalytics"     class="dashPage" style="display:none;"></div>
    <div id="corpPgDocs"          class="dashPage" style="display:none;"></div>
  </div>`);

  const corpPageMap = { overview:'corpPgOverview', opportunities:'corpPgOpportunities', applicants:'corpPgApplicants', pipeline:'corpPgPipeline', analytics:'corpPgAnalytics', docs:'corpPgDocs' };

  function corpSwitch(name) {
    node.querySelectorAll('.dashPage').forEach(p => { p.style.display = 'none'; });
    node.querySelectorAll('.dashInnerNavBtn').forEach(b => b.classList.toggle('active', b.dataset.nav === name));
    const target = node.querySelector('#' + corpPageMap[name]);
    if (target) target.style.display = '';
    // Sync sidebar .partnerNavBtn and mobile bottom nav active states
    const appShell = node.closest('.partnerShell');
    if (appShell) {
      appShell.querySelectorAll('.partnerNavBtn, [data-partner-mobile-nav]').forEach(b =>
        b.classList.toggle('active', b.getAttribute('data-dash-page') === name)
      );
    }
  }
  window.__partnerSwitch = corpSwitch;
  node.querySelectorAll('.dashInnerNavBtn').forEach(btn => btn.addEventListener('click', () => corpSwitch(btn.dataset.nav)));

  // ════════════════════════════════════════
  //  PAGE: OVERVIEW
  // ════════════════════════════════════════
  function renderCorpOverview() {
    const pg = node.querySelector('#corpPgOverview');
    if (!pg) return;
    const total = CORP_APPLICANTS.length;
    const accepted = CORP_APPLICANTS.filter(a => a.status === 'accepted').length;
    const inPipeline = CORP_APPLICANTS.filter(a => ['reviewing','interviewed'].includes(a.status)).length;
    const rate = Math.round((accepted / Math.max(1, total)) * 100);
    const recent = CORP_APPLICANTS.slice(0, 8);

    const skillMap = {};
    CORP_APPLICANTS.forEach(a => (a.skills||[]).forEach(s => { skillMap[s] = (skillMap[s]||0)+1; }));
    const topSkills = Object.entries(skillMap).sort((a,b) => b[1]-a[1]).slice(0, 8);

    pg.innerHTML = `<div class="grid">
      <div class="cardHeader"><h2 style="font-size:22px;">Corporate Overview</h2><p class="mutedText">Your hiring workspace at a glance.</p></div>
      <div class="adminMetricGrid">
        ${metricTile('Total Opportunities', String(liveOpps.length), 'Roles in your portfolio')}
        ${metricTile('Total Applicants', String(total), 'Across all opportunities')}
        ${metricTile('Active Pipelines', String(inPipeline), 'Under review or interview')}
        ${metricTile('Acceptance Rate', rate + '%', accepted + ' applicants accepted')}
      </div>
      <div class="grid cols-2">
        <section class="card">
          <div style="font-weight:700; margin-bottom:12px;">Applicant Status Breakdown</div>
          <div class="adminBarChart">
            ${[['applied','Applied','var(--color-primary)'],['reviewing','Reviewing','#8B5CF6'],['interviewed','Interviewed','var(--color-warning)'],['accepted','Accepted','var(--color-success)'],['rejected','Rejected','var(--color-danger)']].map(([key,label,color]) => {
              const cnt = CORP_APPLICANTS.filter(a => a.status === key).length;
              return `<div class="adminBarChartItem"><span>${label}</span><div class="adminBarTrack"><div class="adminBarFill" style="width:${Math.round((cnt/Math.max(1,total))*100)}%; background:${color};"></div></div><b>${cnt}</b></div>`;
            }).join('')}
          </div>
        </section>
        <section class="card">
          <div style="font-weight:700; margin-bottom:12px;">Top Skills in Talent Pool</div>
          <div class="tagCloud">
            ${topSkills.map(([s,c]) => `<span class="tagCloudItem">${escapeHtml(s)} <b>(${c})</b></span>`).join('')}
          </div>
        </section>
      </div>
      <section class="card">
        <div style="font-weight:700; margin-bottom:14px;">Recent Applicants</div>
        <div style="overflow-x:auto;">
          <table class="table">
            <thead><tr><th>Name</th><th>Opportunity</th><th>Province</th><th>Score</th><th>Status</th></tr></thead>
            <tbody>
              ${recent.map(a => {
                const opp = liveOpps.find(o => o.id === a.oppId);
                const bc = a.status==='accepted'?'badgeGreen':a.status==='rejected'?'badgeOrange':a.status==='interviewed'?'badgeBlue':'';
                return `<tr>
                  <td><b>${escapeHtml(a.name)}</b><div class="mutedText" style="font-size:12px;">${escapeHtml(a.email)}</div></td>
                  <td>${escapeHtml(opp?.title||'—')}</td>
                  <td>${escapeHtml(a.province)}</td>
                  <td><b>${a.score}%</b></td>
                  <td><span class="badge ${bc}">${escapeHtml(a.status.charAt(0).toUpperCase()+a.status.slice(1))}</span></td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </section>
    </div>`;
  }

  // ════════════════════════════════════════
  //  PAGE: OPPORTUNITIES
  // ════════════════════════════════════════
  function renderCorpOpportunities() {
    const pg = node.querySelector('#corpPgOpportunities');
    if (!pg) return;
    let formOpen = false;
    let formError = '';

    function rebuild() {
      pg.innerHTML = `<div class="grid">
        <div class="row" style="justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div><h2 style="margin:0; font-size:22px;">Posted Opportunities</h2><p class="mutedText" style="margin:4px 0 0;">Manage your organisation's listings.</p></div>
          <button type="button" class="btn btnPrimary" id="corpAddOppBtn">+ Add Opportunity</button>
        </div>
        ${formOpen ? `<section class="card" style="background:var(--color-surface);">
          <div style="font-weight:700; margin-bottom:14px;">New Opportunity</div>
          <div class="grid cols-2" style="gap:10px;">
            <div class="field"><label><b>Title</b></label><input class="input" id="nOppTitle" placeholder="e.g. Data Analyst Internship"/></div>
            <div class="field"><label><b>Company</b></label><input class="input" id="nOppCompany" placeholder="e.g. Standard Bank"/></div>
            <div class="field"><label><b>Type</b></label><select class="input select" id="nOppType"><option>Internship</option><option>Learnership</option><option>Bursary</option><option>Graduate</option></select></div>
            <div class="field"><label><b>Province</b></label><select class="input select" id="nOppProv"><option value="">Select...</option>${PROVINCES.map(p=>`<option>${p}</option>`).join('')}<option>National</option></select></div>
            <div class="field"><label><b>Sector</b></label><input class="input" id="nOppSector" placeholder="e.g. Technology"/></div>
            <div class="field"><label><b>Stipend / Value</b></label><input class="input" id="nOppStipend" placeholder="e.g. R8,000/month"/></div>
            <div class="field"><label><b>Closing Date</b></label><input class="input" type="date" id="nOppClosing"/></div>
          </div>
          <div id="nOppError" style="color:var(--color-danger);font-size:12px;margin-top:6px;">${escapeHtml(formError)}</div>
          <div class="row" style="justify-content:flex-end; margin-top:12px; gap:8px;">
            <button class="btn btnGhost" type="button" id="corpCancelOppBtn">Cancel</button>
            <button class="btn btnPrimary" type="button" id="corpSaveOppBtn">Add Opportunity</button>
          </div>
        </section>` : ''}
        <section class="card">
          <div style="overflow-x:auto;">
            <table class="table">
              <thead><tr><th>Opportunity</th><th>Type</th><th>Province</th><th>Closing</th><th>Views</th><th>Applicants</th><th>Status</th></tr></thead>
              <tbody>
                ${liveOpps.map(opp => `<tr>
                  <td><b>${escapeHtml(opp.title)}</b><div class="mutedText" style="font-size:12px;">${escapeHtml(opp.company)} • ${escapeHtml(opp.stipend)}</div></td>
                  <td>${escapeHtml(opp.type)}</td>
                  <td>${escapeHtml(opp.province)}</td>
                  <td>${escapeHtml(opp.closing)}</td>
                  <td>${opp.views}</td>
                  <td><b>${opp.applications}</b></td>
                  <td><span class="badge ${opp.status==='open'?'badgeGreen':opp.status==='closing soon'?'badgeOrange':'badgeBlue'}">${escapeHtml(opp.status.charAt(0).toUpperCase()+opp.status.slice(1))}</span></td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </section>
      </div>`;

      pg.querySelector('#corpAddOppBtn')?.addEventListener('click', () => { formOpen = true; formError = ''; rebuild(); });
      pg.querySelector('#corpCancelOppBtn')?.addEventListener('click', () => { formOpen = false; rebuild(); });
      pg.querySelector('#corpSaveOppBtn')?.addEventListener('click', () => {
        const title = String(pg.querySelector('#nOppTitle')?.value||'').trim();
        const company = String(pg.querySelector('#nOppCompany')?.value||'').trim();
        if (!title) { formError = 'Title is required.'; rebuild(); return; }
        if (!company) { formError = 'Company is required.'; rebuild(); return; }
        liveOpps.unshift({ id:'co'+(liveOpps.length+1), title, company,
          type: String(pg.querySelector('#nOppType')?.value||'Internship'),
          province: String(pg.querySelector('#nOppProv')?.value||'National'),
          sector: String(pg.querySelector('#nOppSector')?.value||'General'),
          stipend: String(pg.querySelector('#nOppStipend')?.value||'—'),
          closing: String(pg.querySelector('#nOppClosing')?.value||'Rolling'),
          status: 'open', views: 0, applications: 0 });
        formOpen = false; formError = '';
        rebuild();
        renderCorpOverview();
        renderCorpAnalytics();
      });
    }
    rebuild();
  }

  // ════════════════════════════════════════
  //  PAGE: APPLICANTS
  // ════════════════════════════════════════
  function renderCorpApplicants() {
    const pg = node.querySelector('#corpPgApplicants');
    if (!pg) return;

    pg.innerHTML = `<div class="grid">
      <div class="row" style="justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <div><h2 style="margin:0; font-size:22px;">Talent Roster</h2><p class="mutedText" style="margin:4px 0 0;">${CORP_APPLICANTS.length} applicants across all opportunities.</p></div>
        <button type="button" class="btn btnGhost" id="corpExportBtn">Export CSV</button>
      </div>
      <section class="card">
        <div class="row" style="flex-wrap:wrap; gap:8px; margin-bottom:14px;">
          <input id="caQ" class="input" placeholder="Search name, email, skill..." style="flex:1; min-width:180px;"/>
          <select id="caProv" class="input select" style="min-width:150px;">
            <option value="">All provinces</option>
            ${PROVINCES.map(p=>`<option value="${p}">${p}</option>`).join('')}
          </select>
          <select id="caStat" class="input select" style="min-width:140px;">
            <option value="">All statuses</option>
            <option value="applied">Applied</option>
            <option value="reviewing">Reviewing</option>
            <option value="interviewed">Interviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          <select id="caOpp" class="input select" style="min-width:180px;">
            <option value="">All opportunities</option>
            ${liveOpps.map(o=>`<option value="${o.id}">${escapeHtml(o.title)}</option>`).join('')}
          </select>
        </div>
        <div style="overflow-x:auto;">
          <table class="table">
            <thead><tr><th>Name</th><th>Province</th><th>Education</th><th>Skills</th><th>Opportunity</th><th>Score</th><th>Status</th></tr></thead>
            <tbody id="caTbody"></tbody>
          </table>
        </div>
      </section>
    </div>`;

    function rebuildRoster() {
      const q = (pg.querySelector('#caQ')?.value||'').toLowerCase();
      const prov = pg.querySelector('#caProv')?.value||'';
      const stat = pg.querySelector('#caStat')?.value||'';
      const opp  = pg.querySelector('#caOpp')?.value||'';
      const filtered = CORP_APPLICANTS.filter(a =>
        (!q || a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q) || (a.skills||[]).join(' ').toLowerCase().includes(q)) &&
        (!prov || a.province===prov) && (!stat || a.status===stat) && (!opp || a.oppId===opp)
      );
      const tbody = pg.querySelector('#caTbody');
      if (!tbody) return;
      tbody.innerHTML = filtered.length ? filtered.map(a => {
        const op = liveOpps.find(o=>o.id===a.oppId);
        const bc = a.status==='accepted'?'badgeGreen':a.status==='rejected'?'badgeOrange':a.status==='interviewed'?'badgeBlue':'';
        return `<tr>
          <td><b>${escapeHtml(a.name)}</b><div class="mutedText" style="font-size:11px;">${escapeHtml(a.email)}</div></td>
          <td>${escapeHtml(a.province)}</td>
          <td>${escapeHtml(a.education)}</td>
          <td class="mutedText" style="font-size:11px;">${escapeHtml((a.skills||[]).join(', '))}</td>
          <td>${escapeHtml(op?.title||'—')}</td>
          <td><b>${a.score}%</b></td>
          <td><span class="badge ${bc}">${escapeHtml(a.status.charAt(0).toUpperCase()+a.status.slice(1))}</span></td>
          <td><button class="btn btnGhost" style="padding:4px 10px;font-size:12px;white-space:nowrap;" data-view-app="${escapeHtml(a.id)}">View</button></td>
        </tr>`;
      }).join('') : `<tr><td colspan="8" style="text-align:center; padding:20px;" class="mutedText">No applicants match your filters.</td></tr>`;
      tbody.querySelectorAll('[data-view-app]').forEach(btn => {
        btn.addEventListener('click', () => {
          const a = CORP_APPLICANTS.find(x=>x.id===btn.getAttribute('data-view-app'));
          if (!a) return;
          const op = liveOpps.find(o=>o.id===a.oppId);
          const bc = a.status==='accepted'?'badgeGreen':a.status==='rejected'?'badgeOrange':a.status==='interviewed'?'badgeBlue':'';
          openPartnerModal('Applicant Profile', `
            <div style="display:grid;gap:14px;">
              <div style="display:flex;gap:12px;align-items:center;">
                <div style="width:50px;height:50px;border-radius:50%;background:var(--color-primary);color:#fff;display:grid;place-items:center;font-size:20px;font-weight:800;flex-shrink:0;">${escapeHtml(a.name.charAt(0))}</div>
                <div><div style="font-size:17px;font-weight:800;">${escapeHtml(a.name)}</div><div class="mutedText">${escapeHtml(a.email)}</div></div>
              </div>
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;">
                <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Phone</div><div style="font-weight:600;margin-top:4px;">${escapeHtml(a.phone)}</div></div>
                <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Province</div><div style="font-weight:600;margin-top:4px;">${escapeHtml(a.province)}</div></div>
                <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Education</div><div style="font-weight:600;margin-top:4px;">${escapeHtml(a.education)}</div></div>
                <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Score</div><div style="font-size:22px;font-weight:800;color:var(--color-primary);margin-top:2px;">${a.score}%</div></div>
              </div>
              <div><div class="mutedText" style="font-size:11px;text-transform:uppercase;margin-bottom:6px;">Skills</div><div style="display:flex;flex-wrap:wrap;gap:6px;">${(a.skills||[]).map(s=>`<span class="badge badgeBlue">${escapeHtml(s)}</span>`).join('')}</div></div>
              <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Applied For</div><div style="font-weight:600;margin-top:4px;">${escapeHtml(op?.title||'—')}</div></div>
              <div style="display:flex;align-items:center;gap:10px;"><span class="mutedText">Status:</span><span class="badge ${bc}">${escapeHtml(a.status)}</span></div>
              <div><div class="mutedText" style="font-size:11px;text-transform:uppercase;margin-bottom:4px;">Documents</div><div class="mutedText" style="font-size:13px;">ID Copy · Matric Certificate · CV</div></div>
            </div>`);
        });
      });
    }

    ['#caQ','#caProv','#caStat','#caOpp'].forEach(sel => pg.querySelector(sel)?.addEventListener(sel==='#caQ'?'input':'change', rebuildRoster));
    pg.querySelector('#corpExportBtn')?.addEventListener('click', () => {
      downloadCsv('talent_roster.csv', CORP_APPLICANTS.map(a => ({
        name:a.name, email:a.email, phone:a.phone, province:a.province, education:a.education,
        skills:(a.skills||[]).join('; '), opportunity:liveOpps.find(o=>o.id===a.oppId)?.title||'',
        score:a.score+'%', status:a.status
      })));
    });
    rebuildRoster();
  }

  // ════════════════════════════════════════
  //  PAGE: PIPELINE
  // ════════════════════════════════════════
  function renderCorpPipeline() {
    const pg = node.querySelector('#corpPgPipeline');
    if (!pg) return;
    const stages = [
      { key:'applied',    label:'Applied',    color:'#1A4731' },
      { key:'reviewing',  label:'Reviewed',   color:'#8B5CF6' },
      { key:'interviewed',label:'Interviewed',color:'#D97706' },
      { key:'accepted',   label:'Accepted',   color:'#22C55E' },
    ];
    const counts = stages.map(s => CORP_APPLICANTS.filter(a=>a.status===s.key).length);
    const maxC = Math.max(1, counts[0]);

    pg.innerHTML = `<div class="grid">
      <div class="cardHeader"><h2 style="font-size:22px;">Application Pipeline</h2><p class="mutedText">Candidate progression through your hiring funnel.</p></div>
      <section class="card">
        <div style="font-weight:700; margin-bottom:18px;">Hiring Funnel</div>
        <div class="corpFunnel">
          ${stages.map((s,i) => `
            <div class="corpFunnelStep">
              <div class="corpFunnelBar" style="width:${Math.max(22,Math.round((counts[i]/maxC)*100))}%; background:${s.color};">
                <span class="corpFunnelLabel">${s.label}</span>
                <span class="corpFunnelCount">${counts[i]}</span>
              </div>
              ${i < stages.length-1 ? `<div style="font-size:11px; padding:3px 0 3px 16px; color:var(--color-text-muted);">▼ ${Math.max(0,counts[i]-counts[i+1])} dropped off</div>` : ''}
            </div>`).join('')}
        </div>
      </section>
      <div class="grid cols-2">
        ${stages.map((s,i) => {
          const apps = CORP_APPLICANTS.filter(a => a.status === s.key);
          return `<section class="card">
            <div class="row" style="justify-content:space-between; margin-bottom:12px;">
              <div style="font-weight:700;">${s.label}</div>
              <span class="badge" style="background:${s.color}22; color:${s.color}; border-color:${s.color}44;">${apps.length}</span>
            </div>
            ${apps.length ? apps.slice(0,6).map(a => {
              const op = liveOpps.find(o=>o.id===a.oppId);
              return `<div style="padding:10px; border:1px solid var(--color-border); border-radius:12px; margin-bottom:8px;">
                <div style="font-weight:700; font-size:13px;">${escapeHtml(a.name)}</div>
                <div class="mutedText" style="font-size:11px; margin-top:2px;">${escapeHtml(op?.title||'—')}</div>
                <div class="mutedText" style="font-size:11px;">${escapeHtml(a.province)} • ${a.score}%</div>
              </div>`;
            }).join('') + (apps.length > 6 ? `<div class="mutedText" style="font-size:12px; padding:4px 0;">+${apps.length-6} more</div>` : '')
            : `<div class="mutedText" style="font-size:13px;">No applicants at this stage.</div>`}
          </section>`;
        }).join('')}
      </div>
    </div>`;
  }

  // ════════════════════════════════════════
  //  PAGE: ANALYTICS
  // ════════════════════════════════════════
  function renderCorpAnalytics() {
    const pg = node.querySelector('#corpPgAnalytics');
    if (!pg) return;

    const provMap = {};
    CORP_APPLICANTS.forEach(a => { provMap[a.province] = (provMap[a.province]||0)+1; });
    const maxProv = Math.max(1,...Object.values(provMap));

    const skillMap = {};
    CORP_APPLICANTS.forEach(a => (a.skills||[]).forEach(s => { skillMap[s]=(skillMap[s]||0)+1; }));
    const topSkills = Object.entries(skillMap).sort((a,b)=>b[1]-a[1]).slice(0,10);
    const maxSkill = Math.max(1,...topSkills.map(([,c])=>c));

    const oppMetrics = liveOpps.filter(o=>o.applications>0).map(o => {
      const apps = CORP_APPLICANTS.filter(a=>a.oppId===o.id);
      const acc = apps.filter(a=>a.status==='accepted').length;
      const rej = apps.filter(a=>a.status==='rejected').length;
      return { title: o.title.length>32?o.title.slice(0,30)+'…':o.title, total:apps.length, acc, rej, pend:apps.length-acc-rej };
    });

    const months = ['Oct 25','Nov 25','Dec 25','Jan 26','Feb 26','Mar 26'];
    const mCounts = [4,7,11,9,14,12];
    const maxM = Math.max(...mCounts);

    pg.innerHTML = `<div class="grid">
      <div class="cardHeader"><h2 style="font-size:22px;">Analytics</h2><p class="mutedText">Insights across your hiring pipeline.</p></div>
      <section class="card">
        <div style="font-weight:700; margin-bottom:12px;">Applications Over Time (Last 6 Months)</div>
        <div class="adminLineBars">
          ${months.map((m,i) => `<div class="adminLineBarItem"><span>${m}</span><div class="adminLineBarTrack"><div class="adminLineBarFill" style="width:${Math.round((mCounts[i]/maxM)*100)}%;"></div></div><b>${mCounts[i]}</b></div>`).join('')}
        </div>
      </section>
      <div class="grid cols-2">
        <section class="card">
          <div style="font-weight:700; margin-bottom:12px;">Province Distribution</div>
          <div class="adminBarChart">
            ${Object.entries(provMap).sort((a,b)=>b[1]-a[1]).map(([p,c]) => `<div class="adminBarChartItem"><span>${escapeHtml(p)}</span><div class="adminBarTrack"><div class="adminBarFill" style="width:${Math.round((c/maxProv)*100)}%;"></div></div><b>${c}</b></div>`).join('')}
          </div>
        </section>
        <section class="card">
          <div style="font-weight:700; margin-bottom:12px;">Talent Signals (Top Skills)</div>
          <div class="adminBarChart">
            ${topSkills.map(([s,c]) => `<div class="adminBarChartItem"><span>${escapeHtml(s)}</span><div class="adminBarTrack"><div class="adminBarFill" style="width:${Math.round((c/maxSkill)*100)}%; background:#8B5CF6;"></div></div><b>${c}</b></div>`).join('')}
          </div>
        </section>
      </div>
      <section class="card">
        <div style="font-weight:700; margin-bottom:12px;">Success Rate per Opportunity</div>
        <div style="overflow-x:auto;">
          <table class="table">
            <thead><tr><th>Opportunity</th><th>Total</th><th>Accepted</th><th>Rejected</th><th>Pending</th><th>Rate</th></tr></thead>
            <tbody>
              ${oppMetrics.map(o => `<tr>
                <td>${escapeHtml(o.title)}</td>
                <td>${o.total}</td>
                <td><span class="badge badgeGreen">${o.acc}</span></td>
                <td><span class="badge badgeOrange">${o.rej}</span></td>
                <td><span class="badge badgeBlue">${o.pend}</span></td>
                <td><b>${Math.round((o.acc/Math.max(1,o.total))*100)}%</b></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </section>
    </div>`;
  }

  // ════════════════════════════════════════
  //  PAGE: DOCUMENTS
  // ════════════════════════════════════════
  function renderCorpDocs() {
    const pg = node.querySelector('#corpPgDocs');
    if (!pg) return;

    function rebuildDocTable() {
      const wrap = pg.querySelector('#corpDocWrap');
      if (!wrap) return;
      wrap.innerHTML = `<div style="overflow-x:auto;"><table class="table">
        <thead><tr><th>Applicant</th><th>Document Type</th><th>Uploaded</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${liveDocs.map(d => `<tr>
            <td><b>${escapeHtml(d.applicantName)}</b></td>
            <td>${escapeHtml(d.docType)}</td>
            <td>${escapeHtml(d.uploaded)}</td>
            <td><span class="badge ${d.status==='Verified'?'badgeGreen':d.status==='Rejected'?'badgeOrange':'badgeBlue'}">${d.status}</span></td>
            <td><div class="row" style="gap:6px;flex-wrap:wrap;">
              <button class="btn btnGhost" data-view-doc="${d.id}" type="button" style="padding:5px 10px;font-size:12px;">View</button>
              ${d.status==='Pending'
                ? `<button class="btn btnGhost" data-cdv="${d.id}" type="button" style="padding:5px 10px;font-size:12px;">Approve</button><button class="btn btnGhost" data-cdr="${d.id}" type="button" style="padding:5px 10px;font-size:12px;">Reject</button>`
                : `<span class="mutedText" style="font-size:12px;">Done</span>`}
            </div></td>
          </tr>`).join('')}
        </tbody>
      </table></div>`;
      wrap.querySelectorAll('[data-view-doc]').forEach(btn => {
        btn.addEventListener('click', () => {
          const d = liveDocs.find(x=>x.id===btn.getAttribute('data-view-doc'));
          if (!d) return;
          const sc = d.status==='Verified'?'badgeGreen':d.status==='Rejected'?'badgeOrange':'badgeBlue';
          openPartnerModal('Document Review', `
            <div style="display:grid;gap:14px;">
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;">
                <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Applicant</div><div style="font-weight:600;margin-top:4px;">${escapeHtml(d.applicantName)}</div></div>
                <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Type</div><div style="font-weight:600;margin-top:4px;">${escapeHtml(d.docType)}</div></div>
                <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Uploaded</div><div style="font-weight:600;margin-top:4px;">${escapeHtml(d.uploaded)}</div></div>
                <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Status</div><div style="margin-top:4px;"><span class="badge ${sc}">${d.status}</span></div></div>
              </div>
              <div style="background:var(--color-background);border-radius:var(--radius-md);padding:24px;text-align:center;border:2px dashed var(--color-border);">
                <div style="font-size:32px;margin-bottom:8px;">📄</div>
                <div style="font-weight:600;">${escapeHtml(d.docType)}</div>
                <div class="mutedText" style="font-size:12px;margin-top:4px;">Preview not available in demo mode</div>
              </div>
              ${d.status==='Pending'?`<div class="row" style="gap:10px;justify-content:flex-end;">
                <button class="btn btnPrimary" onclick="document.getElementById('partnerDetailModal')?.remove();">Approve</button>
                <button class="btn btnGhost" style="color:var(--color-danger);" onclick="document.getElementById('partnerDetailModal')?.remove();">Reject</button>
              </div>`:''}
            </div>`);
        });
      });
      wrap.querySelectorAll('[data-cdv]').forEach(btn => {
        btn.addEventListener('click', () => { const d=liveDocs.find(d=>d.id===btn.getAttribute('data-cdv')); if(d) d.status='Verified'; rebuildDocTable(); });
      });
      wrap.querySelectorAll('[data-cdr]').forEach(btn => {
        btn.addEventListener('click', () => { const d=liveDocs.find(d=>d.id===btn.getAttribute('data-cdr')); if(d) d.status='Rejected'; rebuildDocTable(); });
      });
    }

    pg.innerHTML = `<div class="grid">
      <div class="cardHeader"><h2 style="font-size:22px;">Document Verification</h2><p class="mutedText">Review and approve applicant documents.</p></div>
      <div class="adminMetricGrid">
        ${metricTile('Total', String(liveDocs.length), 'Documents submitted')}
        ${metricTile('Pending', String(liveDocs.filter(d=>d.status==='Pending').length), 'Awaiting review')}
        ${metricTile('Verified', String(liveDocs.filter(d=>d.status==='Verified').length), 'Approved')}
        ${metricTile('Rejected', String(liveDocs.filter(d=>d.status==='Rejected').length), 'Needs resubmission')}
      </div>
      <section class="card"><div id="corpDocWrap"></div></section>
    </div>`;
    rebuildDocTable();
  }

  // ── Initial renders ────────────────────────────────────────────────────
  renderCorpOverview();
  renderCorpOpportunities();
  renderCorpApplicants();
  renderCorpPipeline();
  renderCorpAnalytics();
  renderCorpDocs();

  return shell("corporate", node);
}

function pageInstituteDashboard() {
  const user = requireRole("institution_admin");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  // ═══════════════════════════════════════════════
  //  RICH MOCK DATA
  // ═══════════════════════════════════════════════
  const INST_PROGRAMS = [
    { id:'p1',  name:'Data Analytics Certificate',      refNo:'DAC-2026-01', category:'Technology',   start:'2026-04-01', end:'2026-09-30', capacity:30, enrolled:22, applications:28 },
    { id:'p2',  name:'Software Development NQF 4',      refNo:'SWD-2026-02', category:'Technology',   start:'2026-03-15', end:'2026-11-30', capacity:25, enrolled:18, applications:22 },
    { id:'p3',  name:'Business Administration NQF 5',   refNo:'BUS-2026-03', category:'Business',     start:'2026-05-01', end:'2026-10-31', capacity:40, enrolled:31, applications:35 },
    { id:'p4',  name:'Cyber Security Fundamentals',     refNo:'CYB-2026-04', category:'Technology',   start:'2026-04-15', end:'2026-08-31', capacity:20, enrolled:14, applications:19 },
    { id:'p5',  name:'Cloud Computing Practitioner',    refNo:'CLD-2026-05', category:'Technology',   start:'2026-06-01', end:'2026-11-30', capacity:20, enrolled:11, applications:16 },
    { id:'p6',  name:'Digital Marketing Certificate',   refNo:'DMK-2026-06', category:'Marketing',    start:'2026-04-01', end:'2026-07-31', capacity:35, enrolled:27, applications:32 },
    { id:'p7',  name:'Electrical Engineering NQF 3',    refNo:'ELE-2026-07', category:'Engineering',  start:'2026-03-01', end:'2026-12-31', capacity:30, enrolled:24, applications:30 },
    { id:'p8',  name:'Hospitality & Tourism NQF 4',     refNo:'HOS-2026-08', category:'Hospitality',  start:'2026-05-15', end:'2026-11-15', capacity:25, enrolled:17, applications:21 },
    { id:'p9',  name:'Accounting Fundamentals NQF 4',   refNo:'ACC-2026-09', category:'Finance',      start:'2026-04-01', end:'2026-10-31', capacity:30, enrolled:26, applications:33 },
    { id:'p10', name:'Project Management Certificate',  refNo:'PMG-2026-10', category:'Business',     start:'2026-06-15', end:'2026-09-30', capacity:25, enrolled:12, applications:15 },
  ];

  const INST_STUDENTS = [
    { id:'st1',  name:'Thabo Mokoena',       email:'thabo.m@student.co.za',    phone:'071 111 2222', province:'Gauteng',       education:'Matric',    interests:['Data Analytics','IT','Finance'],      progId:'p1',  status:'Accepted',  funded:true },
    { id:'st2',  name:'Ayanda Cele',          email:'ayanda.c@student.co.za',   phone:'082 222 3333', province:'KwaZulu-Natal', education:'TVET N4',   interests:['Software Development','Python','Web'],progId:'p2',  status:'Accepted',  funded:true },
    { id:'st3',  name:'Sipho Dlamini',        email:'sipho.d@student.co.za',    phone:'063 333 4444', province:'Gauteng',       education:'Diploma',   interests:['Business','Management','Strategy'],   progId:'p3',  status:'Pending',   funded:false },
    { id:'st4',  name:'Naledi Khumalo',       email:'naledi.k@student.co.za',   phone:'076 444 5555', province:'Western Cape',  education:'Matric',    interests:['Cybersecurity','Networking','IT'],    progId:'p4',  status:'Accepted',  funded:true },
    { id:'st5',  name:'Lungelo Mthembu',      email:'lungelo.mt@student.co.za', phone:'071 555 6666', province:'Gauteng',       education:'TVET N6',   interests:['Cloud','DevOps','Azure'],             progId:'p5',  status:'Pending',   funded:false },
    { id:'st6',  name:'Zanele Sithole',       email:'zanele.s@student.co.za',   phone:'083 666 7777', province:'Gauteng',       education:'Matric',    interests:['Marketing','Social Media','Content'], progId:'p6',  status:'Accepted',  funded:true },
    { id:'st7',  name:'Kagiso Nkosi',         email:'kagiso.n@student.co.za',   phone:'072 777 8888', province:'Limpopo',       education:'Matric',    interests:['Electrical','Engineering','Physics'], progId:'p7',  status:'Accepted',  funded:false },
    { id:'st8',  name:'Nompumelelo Buthelezi',email:'nompumelelo.b@student.co.za',phone:'061 888 9999',province:'KwaZulu-Natal', education:'Diploma',   interests:['Hospitality','Tourism','Events'],    progId:'p8',  status:'Pending',   funded:false },
    { id:'st9',  name:'Bongani Tau',          email:'bongani.t@student.co.za',  phone:'079 999 1111', province:'Gauteng',       education:'TVET N4',   interests:['Accounting','Finance','Tax'],         progId:'p9',  status:'Accepted',  funded:true },
    { id:'st10', name:'Phiwe Hadebe',         email:'phiwe.h@student.co.za',    phone:'082 111 2222', province:'Mpumalanga',    education:'Matric',    interests:['Project Management','Leadership'],    progId:'p10', status:'Waitlisted',funded:false },
    { id:'st11', name:'Amahle Zulu',          email:'amahle.z@student.co.za',   phone:'071 222 3333', province:'Eastern Cape',  education:'Matric',    interests:['Data Analytics','Statistics','R'],    progId:'p1',  status:'Accepted',  funded:true },
    { id:'st12', name:'Sifiso Gumede',        email:'sifiso.g@student.co.za',   phone:'063 333 5555', province:'KwaZulu-Natal', education:'TVET N6',   interests:['Software Dev','JavaScript','Node'],   progId:'p2',  status:'Rejected',  funded:false },
    { id:'st13', name:'Thandeka Msweli',      email:'thandeka.ms@student.co.za',phone:'083 444 6666', province:'Gauteng',       education:'Degree',    interests:['Strategy','Consulting','Finance'],    progId:'p3',  status:'Accepted',  funded:true },
    { id:'st14', name:'Mthokozisi Dube',      email:'mthokozisi.d@student.co.za',phone:'072 555 7777',province:'Western Cape',  education:'Matric',    interests:['Cybersecurity','Ethical Hacking'],   progId:'p4',  status:'Pending',   funded:false },
    { id:'st15', name:'Nokwanda Ntuli',       email:'nokwanda.n@student.co.za', phone:'079 666 8888', province:'Gauteng',       education:'Diploma',   interests:['Cloud','AWS','Infrastructure'],       progId:'p5',  status:'Accepted',  funded:true },
    { id:'st16', name:'Siphelele Majola',     email:'siphelele.m@student.co.za',phone:'061 777 9999', province:'North West',    education:'Matric',    interests:['Digital Marketing','SEO','PPC'],      progId:'p6',  status:'Accepted',  funded:false },
    { id:'st17', name:'Nkosinathi Xulu',      email:'nkosinathi.x@student.co.za',phone:'082 888 1111',province:'Limpopo',       education:'TVET N4',   interests:['Electrical','Renewable Energy'],     progId:'p7',  status:'Accepted',  funded:true },
    { id:'st18', name:'Lungile Mthethwa',     email:'lungile.mt@student.co.za', phone:'071 999 2222', province:'KwaZulu-Natal', education:'Matric',    interests:['Hospitality','Food & Beverage'],     progId:'p8',  status:'Accepted',  funded:true },
    { id:'st19', name:'Simangele Hlongwane',  email:'simangele.h@student.co.za',phone:'063 111 3333', province:'Gauteng',       education:'TVET N6',   interests:['Accounting','Auditing','SARS'],       progId:'p9',  status:'Pending',   funded:false },
    { id:'st20', name:'Gugulethu Mthembu',    email:'gugulethu.mt@student.co.za',phone:'083 222 4444',province:'Free State',    education:'Degree',    interests:['Project Management','Agile','PMI'],  progId:'p10', status:'Accepted',  funded:true },
    { id:'st21', name:'Sibongile Ntanzi',     email:'sibongile.n@student.co.za',phone:'072 333 5555', province:'Gauteng',       education:'Matric',    interests:['Data Science','Python','ML'],         progId:'p1',  status:'Accepted',  funded:true },
    { id:'st22', name:'Nomvula Msomi',        email:'nomvula.ms@student.co.za', phone:'079 444 6666', province:'Eastern Cape',  education:'TVET N4',   interests:['React','Frontend','UX'],             progId:'p2',  status:'Pending',   funded:false },
    { id:'st23', name:'Zakhele Zikode',       email:'zakhele.z@student.co.za',  phone:'061 555 7777', province:'Western Cape',  education:'Diploma',   interests:['Operations','Strategy','Business'],  progId:'p3',  status:'Accepted',  funded:true },
    { id:'st24', name:'Nokuthula Khoza',      email:'nokuthula.kh@student.co.za',phone:'082 666 8888',province:'KwaZulu-Natal', education:'Matric',    interests:['Network Security','CCNA'],           progId:'p4',  status:'Rejected',  funded:false },
    { id:'st25', name:'Siyabonga Mncwango',   email:'siyabonga.mn@student.co.za',phone:'071 777 9999',province:'Gauteng',       education:'TVET N6',   interests:['Cloud','GCP','Terraform'],            progId:'p5',  status:'Accepted',  funded:true },
  ];

  const APP_STATUSES = ['Pending','Accepted','Rejected','Waitlisted'];
  const INST_APPS = INST_STUDENTS.map((s, i) => ({
    id: 'app-' + s.id,
    studentId: s.id,
    studentName: s.name,
    programId: s.progId,
    programName: (INST_PROGRAMS.find(p => p.id === s.progId)||{}).name || '—',
    status: s.status,
    funded: s.funded,
    createdAt: '2026-0' + (Math.floor(i / 8) + 1) + '-' + String((i % 28) + 1).padStart(2, '0'),
    province: s.province,
    education: s.education,
  }));

  const INST_DOCS = INST_STUDENTS.slice(0, 15).map((s, i) => ({
    id: 'idoc-' + s.id,
    studentId: s.id,
    studentName: s.name,
    docType: ['ID Copy','Matric Certificate','TVET Transcript','Proof of Address','Proof of Income'][i % 5],
    status: 'Pending',
    uploaded: '2026-0' + (Math.floor(i / 5) + 1) + '-' + String((i % 28) + 1).padStart(2, '0'),
  }));

  // ── Live mutable state ─────────────────────────────────────────────────
  let livePrograms = [...INST_PROGRAMS];
  let liveDocs = INST_DOCS.map(d => ({...d}));

  // ── Build outer shell with inner nav ──────────────────────────────────
  const node = el(`<div class="dashMultiPage">
    <div class="dashInnerNav">
      <button class="dashInnerNavBtn active" data-nav="overview">Overview</button>
      <button class="dashInnerNavBtn" data-nav="programs">Programs</button>
      <button class="dashInnerNavBtn" data-nav="students">Students</button>
      <button class="dashInnerNavBtn" data-nav="applications">Applications</button>
      <button class="dashInnerNavBtn" data-nav="analytics">Analytics</button>
      <button class="dashInnerNavBtn" data-nav="docs">Documents</button>
    </div>
    <div id="instPgOverview"      class="dashPage"></div>
    <div id="instPgPrograms"      class="dashPage" style="display:none;"></div>
    <div id="instPgStudents"      class="dashPage" style="display:none;"></div>
    <div id="instPgApplications"  class="dashPage" style="display:none;"></div>
    <div id="instPgAnalytics"     class="dashPage" style="display:none;"></div>
    <div id="instPgDocs"          class="dashPage" style="display:none;"></div>
  </div>`);

  const instPageMap = { overview:'instPgOverview', programs:'instPgPrograms', students:'instPgStudents', applications:'instPgApplications', analytics:'instPgAnalytics', docs:'instPgDocs' };

  function instSwitch(name) {
    node.querySelectorAll('.dashPage').forEach(p => { p.style.display = 'none'; });
    node.querySelectorAll('.dashInnerNavBtn').forEach(b => b.classList.toggle('active', b.dataset.nav === name));
    const target = node.querySelector('#' + instPageMap[name]);
    if (target) target.style.display = '';
    const appShell = node.closest('.partnerShell');
    if (appShell) {
      appShell.querySelectorAll('.partnerNavBtn, [data-partner-mobile-nav]').forEach(b =>
        b.classList.toggle('active', b.getAttribute('data-dash-page') === name)
      );
    }
  }
  window.__partnerSwitch = instSwitch;
  node.querySelectorAll('.dashInnerNavBtn').forEach(btn => btn.addEventListener('click', () => instSwitch(btn.dataset.nav)));

  // ════════════════════════════════════════
  //  PAGE: OVERVIEW
  // ════════════════════════════════════════
  function renderInstOverview() {
    const pg = node.querySelector('#instPgOverview');
    if (!pg) return;

    const totalStudents = INST_STUDENTS.length;
    const funded = INST_STUDENTS.filter(s => s.funded).length;
    const nonFunded = totalStudents - funded;
    const totalApps = INST_APPS.length;
    const totalProgs = livePrograms.length;
    const fundedPct = Math.round((funded / Math.max(1, totalStudents)) * 100);
    const circumference = 2 * Math.PI * 15.915;
    const fundedArc = (funded / Math.max(1, totalStudents)) * circumference;

    const activeThisMonth = INST_APPS.filter(a => a.status !== 'Rejected').length;
    const completedCount = INST_STUDENTS.filter(s => s.status === 'Accepted' && s.funded).length;
    const completionRate = Math.round((completedCount / Math.max(1, totalStudents)) * 100);

    pg.innerHTML = `<div class="grid">
      <div class="cardHeader"><h2 style="font-size:22px;">Institute Overview</h2><p class="mutedText">Your programme workspace at a glance.</p></div>
      <div class="adminMetricGrid">
        ${metricTile('Total Programs', String(totalProgs), 'Active in your workspace')}
        ${metricTile('Total Students', String(totalStudents), 'In your talent pool')}
        ${metricTile('Total Applications', String(totalApps), 'Across all programmes')}
        ${metricTile('Funded Students', funded + ' / ' + totalStudents, fundedPct + '% funded')}
      </div>
      <div class="adminMetricGrid">
        ${metricTile('Active This Month', String(activeThisMonth), 'Students with recent activity')}
        ${metricTile('Applications Started', String(totalApps), 'Total across all programs')}
        ${metricTile('Completion Rate', completionRate + '%', completedCount + ' enrolled & funded')}
        ${metricTile('Open Programs', String(livePrograms.length), 'Currently accepting intake')}
      </div>
      <div class="grid cols-2">
        <section class="card">
          <div style="font-weight:700; margin-bottom:16px;">Funded vs Non-Funded</div>
          <div class="instFundedRow">
            <div class="instDonutWrap">
              <svg viewBox="0 0 36 36" class="instDonut">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--color-border)" stroke-width="3.5"/>
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--color-primary)" stroke-width="3.5"
                  stroke-dasharray="${fundedArc.toFixed(2)} ${(circumference - fundedArc).toFixed(2)}"
                  stroke-dashoffset="${(circumference * 0.25).toFixed(2)}" stroke-linecap="round"/>
                <text x="18" y="19.5" text-anchor="middle" style="font-size:5px; font-weight:700; fill:var(--color-text-primary);">${fundedPct}%</text>
              </svg>
            </div>
            <div class="instFundedLegend">
              <div class="instFundedLegendItem"><span class="instLegendDot" style="background:var(--color-primary);"></span><span>Funded</span><b>${funded}</b></div>
              <div class="instFundedLegendItem"><span class="instLegendDot" style="background:var(--color-border);"></span><span>Non-funded</span><b>${nonFunded}</b></div>
              <div class="instFundedLegendItem mutedText" style="font-size:12px;"><span>Total</span><b>${totalStudents}</b></div>
            </div>
          </div>
        </section>
        <section class="card">
          <div style="font-weight:700; margin-bottom:12px;">Application Status Breakdown</div>
          <div class="adminBarChart">
            ${[['Accepted','var(--color-success)'],['Pending','var(--color-primary)'],['Rejected','var(--color-danger)'],['Waitlisted','#8B5CF6']].map(([stat,color]) => {
              const cnt = INST_APPS.filter(a=>a.status===stat).length;
              return `<div class="adminBarChartItem"><span>${stat}</span><div class="adminBarTrack"><div class="adminBarFill" style="width:${Math.round((cnt/Math.max(1,totalApps))*100)}%; background:${color};"></div></div><b>${cnt}</b></div>`;
            }).join('')}
          </div>
        </section>
      </div>
      <section class="card">
        <div style="font-weight:700; margin-bottom:14px;">Top Programs by Applications</div>
        <div class="adminBarChart">
          ${livePrograms.sort((a,b)=>b.applications-a.applications).slice(0,6).map(p => `<div class="adminBarChartItem"><span>${escapeHtml(p.name.length>32?p.name.slice(0,30)+'…':p.name)}</span><div class="adminBarTrack"><div class="adminBarFill" style="width:${Math.round((p.applications/Math.max(1,livePrograms[0]?.applications||1))*100)}%;"></div></div><b>${p.applications}</b></div>`).join('')}
        </div>
      </section>
    </div>`;
  }

  // ════════════════════════════════════════
  //  PAGE: PROGRAMS
  // ════════════════════════════════════════
  function renderInstPrograms() {
    const pg = node.querySelector('#instPgPrograms');
    if (!pg) return;
    let formOpen = false;
    let formError = '';

    function rebuild() {
      pg.innerHTML = `<div class="grid">
        <div class="row" style="justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div><h2 style="margin:0; font-size:22px;">Program Management</h2><p class="mutedText" style="margin:4px 0 0;">${livePrograms.length} programs in your workspace.</p></div>
          <button type="button" class="btn btnPrimary" id="instAddProgBtn">+ Create Program</button>
        </div>
        ${formOpen ? `<section class="card" style="background:var(--color-surface);">
          <div style="font-weight:700; margin-bottom:14px;">New Program</div>
          <div class="grid cols-2" style="gap:10px;">
            <div class="field"><label><b>Program Name</b></label><input class="input" id="nProgName" placeholder="e.g. Data Analytics Certificate"/></div>
            <div class="field"><label><b>Reference Number</b></label><input class="input" id="nProgRef" placeholder="e.g. DAC-2026-11"/></div>
            <div class="field"><label><b>Category</b></label><input class="input" id="nProgCat" placeholder="e.g. Technology, Finance"/></div>
            <div class="field"><label><b>Capacity</b></label><input class="input" type="number" id="nProgCap" value="25" min="1"/></div>
            <div class="field"><label><b>Start Date</b></label><input class="input" type="date" id="nProgStart"/></div>
            <div class="field"><label><b>End Date</b></label><input class="input" type="date" id="nProgEnd"/></div>
          </div>
          <div id="nProgError" style="color:var(--color-danger);font-size:12px;margin-top:6px;">${escapeHtml(formError)}</div>
          <div class="row" style="justify-content:flex-end; margin-top:12px; gap:8px;">
            <button class="btn btnGhost" type="button" id="instCancelProgBtn">Cancel</button>
            <button class="btn btnPrimary" type="button" id="instSaveProgBtn">Create Program</button>
          </div>
        </section>` : ''}
        <section class="card">
          <div style="overflow-x:auto;">
            <table class="table">
              <thead><tr><th>Program Name</th><th>Ref #</th><th>Category</th><th>Start</th><th>End</th><th>Capacity</th><th>Enrolled</th><th>Applications</th></tr></thead>
              <tbody>
                ${livePrograms.map(p => `<tr>
                  <td><b>${escapeHtml(p.name)}</b></td>
                  <td class="mutedText" style="font-size:12px;">${escapeHtml(p.refNo)}</td>
                  <td>${escapeHtml(p.category)}</td>
                  <td>${escapeHtml(p.start||'—')}</td>
                  <td>${escapeHtml(p.end||'—')}</td>
                  <td>${p.capacity}</td>
                  <td><b>${p.enrolled}</b></td>
                  <td>${p.applications}</td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </section>
      </div>`;

      pg.querySelector('#instAddProgBtn')?.addEventListener('click', () => { formOpen = true; formError = ''; rebuild(); });
      pg.querySelector('#instCancelProgBtn')?.addEventListener('click', () => { formOpen = false; rebuild(); });
      pg.querySelector('#instSaveProgBtn')?.addEventListener('click', () => {
        const name = String(pg.querySelector('#nProgName')?.value||'').trim();
        const refNo = String(pg.querySelector('#nProgRef')?.value||'').trim();
        const category = String(pg.querySelector('#nProgCat')?.value||'').trim();
        const capacity = parseInt(pg.querySelector('#nProgCap')?.value||'25', 10);
        const start = String(pg.querySelector('#nProgStart')?.value||'').trim();
        const end = String(pg.querySelector('#nProgEnd')?.value||'').trim();
        if (!name) { formError = 'Program name is required.'; rebuild(); return; }
        if (!refNo) { formError = 'Reference number is required.'; rebuild(); return; }
        if (livePrograms.some(p => p.refNo === refNo)) { formError = 'Reference number must be unique.'; rebuild(); return; }
        livePrograms.unshift({ id:'p'+(livePrograms.length+1), name, refNo, category:category||'General', start:start||'—', end:end||'—', capacity:capacity||25, enrolled:0, applications:0 });
        formOpen = false; formError = '';
        rebuild();
        renderInstOverview();
        renderInstAnalytics();
      });
    }
    rebuild();
  }

  // ════════════════════════════════════════
  //  PAGE: STUDENTS
  // ════════════════════════════════════════
  function renderInstStudents() {
    const pg = node.querySelector('#instPgStudents');
    if (!pg) return;

    pg.innerHTML = `<div class="grid">
      <div class="row" style="justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <div><h2 style="margin:0; font-size:22px;">Student Profiles</h2><p class="mutedText" style="margin:4px 0 0;">${INST_STUDENTS.length} students in your talent pool.</p></div>
        <button type="button" class="btn btnGhost" id="instExportStudentsBtn">Export CSV</button>
      </div>
      <section class="card">
        <div class="row" style="flex-wrap:wrap; gap:8px; margin-bottom:14px;">
          <input id="stQ" class="input" placeholder="Search name or email..." style="flex:1; min-width:180px;"/>
          <select id="stProv" class="input select" style="min-width:150px;">
            <option value="">All provinces</option>
            ${PROVINCES.map(p=>`<option value="${p}">${p}</option>`).join('')}
          </select>
          <select id="stStat" class="input select" style="min-width:140px;">
            <option value="">All statuses</option>
            <option value="Accepted">Accepted</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="Waitlisted">Waitlisted</option>
          </select>
          <select id="stProg" class="input select" style="min-width:180px;">
            <option value="">All programs</option>
            ${livePrograms.map(p=>`<option value="${p.id}">${escapeHtml(p.name)}</option>`).join('')}
          </select>
        </div>
        <div style="overflow-x:auto;">
          <table class="table">
            <thead><tr><th>Name</th><th>Student #</th><th>Province</th><th>Education</th><th>Program</th><th>Status</th><th>Funded</th></tr></thead>
            <tbody id="stTbody"></tbody>
          </table>
        </div>
      </section>
    </div>`;

    function rebuildStudents() {
      const q = (pg.querySelector('#stQ')?.value||'').toLowerCase();
      const prov = pg.querySelector('#stProv')?.value||'';
      const stat = pg.querySelector('#stStat')?.value||'';
      const prog = pg.querySelector('#stProg')?.value||'';
      const filtered = INST_STUDENTS.filter(s =>
        (!q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)) &&
        (!prov || s.province===prov) && (!stat || s.status===stat) && (!prog || s.progId===prog)
      );
      const tbody = pg.querySelector('#stTbody');
      if (!tbody) return;
      tbody.innerHTML = filtered.length ? filtered.map(s => {
        const prog = livePrograms.find(p=>p.id===s.progId);
        const bc = s.status==='Accepted'?'badgeGreen':s.status==='Rejected'?'badgeOrange':s.status==='Waitlisted'?'badgeBlue':'';
        return `<tr>
          <td><b>${escapeHtml(s.name)}</b><div class="mutedText" style="font-size:11px;">${escapeHtml(s.email)}</div></td>
          <td class="mutedText" style="font-size:11px;">${s.id.slice(-6).toUpperCase()}</td>
          <td>${escapeHtml(s.province)}</td>
          <td>${escapeHtml(s.education)}</td>
          <td>${escapeHtml(prog?.name||'—')}</td>
          <td><span class="badge ${bc}">${escapeHtml(s.status)}</span></td>
          <td><span class="badge ${s.funded?'badgeGreen':'badgeOrange'}">${s.funded?'Yes':'No'}</span></td>
          <td><button class="btn btnGhost" style="padding:4px 10px;font-size:12px;" data-view-student="${escapeHtml(s.id)}">View</button></td>
        </tr>`;
      }).join('') : `<tr><td colspan="8" style="text-align:center;padding:20px;" class="mutedText">No students match filters.</td></tr>`;
      tbody.querySelectorAll('[data-view-student]').forEach(btn => {
        btn.addEventListener('click', () => {
          const s = INST_STUDENTS.find(x=>x.id===btn.getAttribute('data-view-student'));
          if (!s) return;
          const prog = livePrograms.find(p=>p.id===s.progId);
          const bc = s.status==='Accepted'?'badgeGreen':s.status==='Rejected'?'badgeOrange':s.status==='Waitlisted'?'badgeBlue':'';
          openPartnerModal('Student Profile', `
            <div style="display:grid;gap:14px;">
              <div style="display:flex;gap:12px;align-items:center;">
                <div style="width:50px;height:50px;border-radius:50%;background:var(--color-primary);color:#fff;display:grid;place-items:center;font-size:20px;font-weight:800;flex-shrink:0;">${escapeHtml(s.name.charAt(0))}</div>
                <div><div style="font-size:17px;font-weight:800;">${escapeHtml(s.name)}</div><div class="mutedText">${escapeHtml(s.email)}</div></div>
              </div>
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;">
                <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Student #</div><div style="font-weight:600;margin-top:4px;">${s.id.slice(-6).toUpperCase()}</div></div>
                <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Province</div><div style="font-weight:600;margin-top:4px;">${escapeHtml(s.province)}</div></div>
                <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Education</div><div style="font-weight:600;margin-top:4px;">${escapeHtml(s.education)}</div></div>
                <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Status</div><div style="margin-top:4px;"><span class="badge ${bc}">${escapeHtml(s.status)}</span></div></div>
                <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Funded</div><div style="margin-top:4px;"><span class="badge ${s.funded?'badgeGreen':'badgeOrange'}">${s.funded?'Yes':'No'}</span></div></div>
              </div>
              ${s.interests?.length ? `<div><div class="mutedText" style="font-size:11px;text-transform:uppercase;margin-bottom:6px;">Interests</div><div style="display:flex;flex-wrap:wrap;gap:6px;">${s.interests.map(i=>`<span class="badge badgeBlue">${escapeHtml(i)}</span>`).join('')}</div></div>` : ''}
              <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Program</div><div style="font-weight:600;margin-top:4px;">${escapeHtml(prog?.name||'Not assigned')}</div></div>
            </div>`);
        });
      });
    }

    ['#stQ','#stProv','#stStat','#stProg'].forEach(sel => pg.querySelector(sel)?.addEventListener(sel==='#stQ'?'input':'change', rebuildStudents));
    pg.querySelector('#instExportStudentsBtn')?.addEventListener('click', () => {
      downloadCsv('students.csv', INST_STUDENTS.map(s => ({
        name:s.name, email:s.email, phone:s.phone, province:s.province,
        education:s.education, interests:s.interests.join('; '),
        program:livePrograms.find(p=>p.id===s.progId)?.name||'',
        status:s.status, funded:s.funded?'Yes':'No'
      })));
    });
    rebuildStudents();
  }

  // ════════════════════════════════════════
  //  PAGE: APPLICATIONS
  // ════════════════════════════════════════
  function renderInstApplications() {
    const pg = node.querySelector('#instPgApplications');
    if (!pg) return;

    pg.innerHTML = `<div class="grid">
      <div class="row" style="justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <div><h2 style="margin:0; font-size:22px;">Applications</h2><p class="mutedText" style="margin:4px 0 0;">${INST_APPS.length} applications across all programs.</p></div>
        <button type="button" class="btn btnGhost" id="instExportAppsBtn">Export CSV</button>
      </div>
      <div class="adminMetricGrid">
        ${['Accepted','Pending','Rejected','Waitlisted'].map(stat => {
          const cnt = INST_APPS.filter(a=>a.status===stat).length;
          const color = stat==='Accepted'?'var(--color-success)':stat==='Rejected'?'var(--color-danger)':stat==='Waitlisted'?'#8B5CF6':'var(--color-primary)';
          return `<div class="card"><div class="mutedText" style="font-size:12px; text-transform:uppercase; letter-spacing:.04em;">${stat}</div><div style="font-size:28px; font-weight:700; margin-top:8px; color:${color};">${cnt}</div></div>`;
        }).join('')}
      </div>
      <section class="card">
        <div class="row" style="flex-wrap:wrap; gap:8px; margin-bottom:14px;">
          <input id="apQ" class="input" placeholder="Search student or program..." style="flex:1; min-width:180px;"/>
          <select id="apStat" class="input select" style="min-width:140px;">
            <option value="">All statuses</option>
            <option>Accepted</option><option>Pending</option><option>Rejected</option><option>Waitlisted</option>
          </select>
          <select id="apProg" class="input select" style="min-width:180px;">
            <option value="">All programs</option>
            ${livePrograms.map(p=>`<option value="${p.id}">${escapeHtml(p.name)}</option>`).join('')}
          </select>
        </div>
        <div style="overflow-x:auto;">
          <table class="table">
            <thead><tr><th>Student</th><th>Program</th><th>Province</th><th>Date</th><th>Status</th><th>Funded</th></tr></thead>
            <tbody id="apTbody"></tbody>
          </table>
        </div>
      </section>
    </div>`;

    function rebuildApps() {
      const q = (pg.querySelector('#apQ')?.value||'').toLowerCase();
      const stat = pg.querySelector('#apStat')?.value||'';
      const prog = pg.querySelector('#apProg')?.value||'';
      const filtered = INST_APPS.filter(a =>
        (!q || a.studentName.toLowerCase().includes(q) || a.programName.toLowerCase().includes(q)) &&
        (!stat || a.status===stat) && (!prog || a.programId===prog)
      );
      const tbody = pg.querySelector('#apTbody');
      if (!tbody) return;
      tbody.innerHTML = filtered.length ? filtered.map(a => {
        const bc = a.status==='Accepted'?'badgeGreen':a.status==='Rejected'?'badgeOrange':a.status==='Waitlisted'?'badgeBlue':'';
        return `<tr>
          <td><b>${escapeHtml(a.studentName)}</b><div class="mutedText" style="font-size:11px;">${escapeHtml(a.province)}</div></td>
          <td>${escapeHtml(a.programName)}</td>
          <td>${escapeHtml(a.province)}</td>
          <td>${escapeHtml(a.createdAt)}</td>
          <td><span class="badge ${bc}">${escapeHtml(a.status)}</span></td>
          <td><span class="badge ${a.funded?'badgeGreen':'badgeOrange'}">${a.funded?'Yes':'No'}</span></td>
          <td><button class="btn btnGhost" style="padding:4px 10px;font-size:12px;" data-view-inst-app="${escapeHtml(a.id)}">View</button></td>
        </tr>`;
      }).join('') : `<tr><td colspan="7" style="text-align:center;padding:20px;" class="mutedText">No applications match filters.</td></tr>`;
      tbody.querySelectorAll('[data-view-inst-app]').forEach(btn => {
        btn.addEventListener('click', () => {
          const a = INST_APPS.find(x=>x.id===btn.getAttribute('data-view-inst-app'));
          if (!a) return;
          const bc = a.status==='Accepted'?'badgeGreen':a.status==='Rejected'?'badgeOrange':a.status==='Waitlisted'?'badgeBlue':'';
          openPartnerModal('Application Detail', `
            <div style="display:grid;gap:14px;">
              <div style="display:flex;gap:12px;align-items:center;">
                <div style="width:46px;height:46px;border-radius:50%;background:var(--color-primary);color:#fff;display:grid;place-items:center;font-size:18px;font-weight:800;flex-shrink:0;">${escapeHtml(a.studentName.charAt(0))}</div>
                <div><div style="font-size:17px;font-weight:800;">${escapeHtml(a.studentName)}</div><div class="mutedText">${escapeHtml(a.province)}</div></div>
              </div>
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;">
                <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Program</div><div style="font-weight:600;margin-top:4px;">${escapeHtml(a.programName)}</div></div>
                <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Applied</div><div style="font-weight:600;margin-top:4px;">${escapeHtml(a.createdAt)}</div></div>
                <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Status</div><div style="margin-top:4px;"><span class="badge ${bc}">${escapeHtml(a.status)}</span></div></div>
                <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Funded</div><div style="margin-top:4px;"><span class="badge ${a.funded?'badgeGreen':'badgeOrange'}">${a.funded?'Yes':'No'}</span></div></div>
              </div>
              <div><div class="mutedText" style="font-size:11px;text-transform:uppercase;margin-bottom:4px;">Documents Submitted</div><div class="mutedText" style="font-size:13px;">ID Copy · Academic Transcript · Proof of Address</div></div>
            </div>`);
        });
      });
    }

    ['#apQ','#apStat','#apProg'].forEach(sel => pg.querySelector(sel)?.addEventListener(sel==='#apQ'?'input':'change', rebuildApps));
    pg.querySelector('#instExportAppsBtn')?.addEventListener('click', () => {
      downloadCsv('applications.csv', INST_APPS.map(a => ({
        student:a.studentName, program:a.programName, province:a.province,
        date:a.createdAt, status:a.status, funded:a.funded?'Yes':'No'
      })));
    });
    rebuildApps();
  }

  // ════════════════════════════════════════
  //  PAGE: ANALYTICS
  // ════════════════════════════════════════
  function renderInstAnalytics() {
    const pg = node.querySelector('#instPgAnalytics');
    if (!pg) return;

    const months = ['Oct 25','Nov 25','Dec 25','Jan 26','Feb 26','Mar 26'];
    const mCounts = [5,9,12,14,10,16];
    const maxM = Math.max(...mCounts);

    const provMap = {};
    INST_STUDENTS.forEach(s => { provMap[s.province]=(provMap[s.province]||0)+1; });
    const maxProv = Math.max(1,...Object.values(provMap));

    const eduMap = {};
    INST_STUDENTS.forEach(s => { eduMap[s.education]=(eduMap[s.education]||0)+1; });
    const maxEdu = Math.max(1,...Object.values(eduMap));

    const interestMap = {};
    INST_STUDENTS.forEach(s => (s.interests||[]).forEach(i => { interestMap[i]=(interestMap[i]||0)+1; }));
    const topInterests = Object.entries(interestMap).sort((a,b)=>b[1]-a[1]).slice(0,10);

    const progDemand = livePrograms.map(p => ({ name:p.name.length>30?p.name.slice(0,28)+'…':p.name, apps:p.applications })).sort((a,b)=>b.apps-a.apps);
    const maxApps = Math.max(1,...progDemand.map(p=>p.apps));

    const funnelStages = ['Started','Submitted','Reviewed','Accepted','Enrolled'];
    const funnelCounts = [INST_APPS.length, INST_APPS.filter(a=>a.status!=='Pending').length+INST_APPS.length/2|0, INST_APPS.filter(a=>['Accepted','Rejected','Waitlisted'].includes(a.status)).length, INST_APPS.filter(a=>a.status==='Accepted').length, INST_APPS.filter(a=>a.funded).length];

    pg.innerHTML = `<div class="grid">
      <div class="cardHeader"><h2 style="font-size:22px;">Analytics</h2><p class="mutedText">Programme-level insights across students and applications.</p></div>
      <section class="card">
        <div style="font-weight:700; margin-bottom:12px;">Monthly Application Trend</div>
        <div class="adminLineBars">
          ${months.map((m,i) => `<div class="adminLineBarItem"><span>${m}</span><div class="adminLineBarTrack"><div class="adminLineBarFill" style="width:${Math.round((mCounts[i]/maxM)*100)}%;"></div></div><b>${mCounts[i]}</b></div>`).join('')}
        </div>
      </section>
      <section class="card">
        <div style="font-weight:700; margin-bottom:12px;">Application Funnel</div>
        <div class="corpFunnel">
          ${funnelStages.map((stage,i) => {
            const cnt = funnelCounts[i]||0;
            const width = Math.max(22,Math.round((cnt/Math.max(1,funnelCounts[0]))*100));
            const colors=['#1A4731','#22623F','#2B8A4E','#3AAF61','#4FCB7A'];
            return `<div class="corpFunnelStep"><div class="corpFunnelBar" style="width:${width}%; background:${colors[i]};"><span class="corpFunnelLabel">${stage}</span><span class="corpFunnelCount">${cnt}</span></div></div>`;
          }).join('')}
        </div>
      </section>
      <section class="card">
        <div style="font-weight:700; margin-bottom:12px;">Applications by Program</div>
        <div class="adminBarChart">
          ${progDemand.map(p => `<div class="adminBarChartItem"><span>${escapeHtml(p.name)}</span><div class="adminBarTrack"><div class="adminBarFill" style="width:${Math.round((p.apps/maxApps)*100)}%;"></div></div><b>${p.apps}</b></div>`).join('')}
        </div>
      </section>
      <div class="grid cols-2">
        <section class="card">
          <div style="font-weight:700; margin-bottom:12px;">Top Provinces</div>
          <div class="instProvinceList">
            ${Object.entries(provMap).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([p,c],i) => `<div class="instProvinceItem">
              <span class="instProvinceRank">#${i+1}</span><span>${escapeHtml(p)}</span>
              <div class="instProvBar"><div class="instProvBarFill" style="width:${Math.round((c/maxProv)*100)}%;"></div></div><b>${c}</b>
            </div>`).join('')}
          </div>
        </section>
        <section class="card">
          <div style="font-weight:700; margin-bottom:12px;">Education Levels</div>
          <div class="adminBarChart">
            ${Object.entries(eduMap).sort((a,b)=>b[1]-a[1]).map(([e,c]) => `<div class="adminBarChartItem"><span>${escapeHtml(e)}</span><div class="adminBarTrack"><div class="adminBarFill" style="width:${Math.round((c/maxEdu)*100)}%; background:#8B5CF6;"></div></div><b>${c}</b></div>`).join('')}
          </div>
        </section>
      </div>
      <section class="card">
        <div style="font-weight:700; margin-bottom:12px;">Top Student Interests</div>
        <div class="tagCloud">
          ${topInterests.map(([interest,count]) => `<span class="tagCloudItem" style="font-size:${Math.min(15,10+count)}px;">${escapeHtml(interest)} <b>(${count})</b></span>`).join('')}
        </div>
      </section>
    </div>`;
  }

  // ════════════════════════════════════════
  //  PAGE: DOCUMENTS
  // ════════════════════════════════════════
  function renderInstDocs() {
    const pg = node.querySelector('#instPgDocs');
    if (!pg) return;

    function rebuildDocTable() {
      const wrap = pg.querySelector('#instDocWrap');
      if (!wrap) return;
      wrap.innerHTML = `<div style="overflow-x:auto;"><table class="table">
        <thead><tr><th>Student</th><th>Document Type</th><th>Uploaded</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${liveDocs.map(d => `<tr>
            <td><b>${escapeHtml(d.studentName)}</b></td>
            <td>${escapeHtml(d.docType)}</td>
            <td>${escapeHtml(d.uploaded)}</td>
            <td><span class="badge ${d.status==='Verified'?'badgeGreen':d.status==='Rejected'?'badgeOrange':'badgeBlue'}">${d.status}</span></td>
            <td><div class="row" style="gap:6px;flex-wrap:wrap;">
              <button class="btn btnGhost" data-view-idoc="${d.id}" type="button" style="padding:5px 10px;font-size:12px;">View</button>
              ${d.status==='Pending'
                ? `<button class="btn btnGhost" data-idv="${d.id}" type="button" style="padding:5px 10px;font-size:12px;">Approve</button><button class="btn btnGhost" data-idr="${d.id}" type="button" style="padding:5px 10px;font-size:12px;">Reject</button>`
                : `<span class="mutedText" style="font-size:12px;">Done</span>`}
            </div></td>
          </tr>`).join('')}
        </tbody>
      </table></div>`;

      wrap.querySelectorAll('[data-view-idoc]').forEach(btn => {
        btn.addEventListener('click', () => {
          const d = liveDocs.find(x=>x.id===btn.getAttribute('data-view-idoc'));
          if (!d) return;
          const sc = d.status==='Verified'?'badgeGreen':d.status==='Rejected'?'badgeOrange':'badgeBlue';
          openPartnerModal('Document Review', `
            <div style="display:grid;gap:14px;">
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;">
                <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Student</div><div style="font-weight:600;margin-top:4px;">${escapeHtml(d.studentName)}</div></div>
                <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Type</div><div style="font-weight:600;margin-top:4px;">${escapeHtml(d.docType)}</div></div>
                <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Uploaded</div><div style="font-weight:600;margin-top:4px;">${escapeHtml(d.uploaded)}</div></div>
                <div class="card" style="padding:10px;"><div class="mutedText" style="font-size:11px;text-transform:uppercase;">Status</div><div style="margin-top:4px;"><span class="badge ${sc}">${d.status}</span></div></div>
              </div>
              <div style="background:var(--color-background);border-radius:var(--radius-md);padding:24px;text-align:center;border:2px dashed var(--color-border);">
                <div style="font-size:32px;margin-bottom:8px;">📄</div>
                <div style="font-weight:600;">${escapeHtml(d.docType)}</div>
                <div class="mutedText" style="font-size:12px;margin-top:4px;">Preview not available in demo mode</div>
              </div>
              ${d.status==='Pending'?`<div class="row" style="gap:10px;justify-content:flex-end;">
                <button class="btn btnPrimary" onclick="document.getElementById('partnerDetailModal')?.remove();">Approve</button>
                <button class="btn btnGhost" style="color:var(--color-danger);" onclick="document.getElementById('partnerDetailModal')?.remove();">Reject</button>
              </div>`:''}
            </div>`);
        });
      });
      wrap.querySelectorAll('[data-idv]').forEach(btn => {
        btn.addEventListener('click', () => { const d=liveDocs.find(d=>d.id===btn.getAttribute('data-idv')); if(d) d.status='Verified'; rebuildDocTable(); });
      });
      wrap.querySelectorAll('[data-idr]').forEach(btn => {
        btn.addEventListener('click', () => { const d=liveDocs.find(d=>d.id===btn.getAttribute('data-idr')); if(d) d.status='Rejected'; rebuildDocTable(); });
      });
    }

    pg.innerHTML = `<div class="grid">
      <div class="cardHeader"><h2 style="font-size:22px;">Document Verification</h2><p class="mutedText">Review and approve student documents.</p></div>
      <div class="adminMetricGrid">
        ${metricTile('Total', String(liveDocs.length), 'Documents submitted')}
        ${metricTile('Pending', String(liveDocs.filter(d=>d.status==='Pending').length), 'Awaiting review')}
        ${metricTile('Verified', String(liveDocs.filter(d=>d.status==='Verified').length), 'Approved')}
        ${metricTile('Rejected', String(liveDocs.filter(d=>d.status==='Rejected').length), 'Needs resubmission')}
      </div>
      <section class="card"><div id="instDocWrap"></div></section>
    </div>`;
    rebuildDocTable();
  }

  // ── Initial renders ────────────────────────────────────────────────────
  renderInstOverview();
  renderInstPrograms();
  renderInstStudents();
  renderInstApplications();
  renderInstAnalytics();
  renderInstDocs();

  return shell("institute", node);
}


function register(name, email, password, role) {
  const normalizedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedName || !normalizedEmail || !password.trim()) {
    return { ok: false, error: "Please complete all required fields." };
  }

  if (store.users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
    return { ok: false, error: "An account with this email already exists." };
  }

  const user = {
    id: uid("user"),
    name: normalizedName,
    email: normalizedEmail,
    password,
    role
  };

  store.users.push(user);
  saveStore(store);

  currentUserId = user.id;
  setSessionUserId(user.id);

  return { ok: true, user };
}

function signupStudentAccount(payload = {}) {
  const fullName = String(payload.fullName || "").trim();
  const email = String(payload.email || "").trim();
  const password = String(payload.password || "");
  const province = String(payload.province || "").trim();
  const educationLevel = String(payload.educationLevel || "").trim();

  const result = register(fullName, email, password, PUBLIC_SIGNUP_ROLE);
  if (!result.ok) return result;

  saveProfile({
    fullName,
    age: "",
    province,
    educationLevel,
    interests: [],
    goals: "",
    onboarding: {
      basicsCompleted: false,
      careerQuizCompleted: false,
      personalizationCompleted: false,
      completed: false,
      quizAnswers: {
        preferredField: "",
        relocation: "",
        preference: "",
        careerInterests: []
      },
      createdAt: new Date().toISOString()
    }
  });

  addStudentNotification(result.user.id, "Welcome to Youth Digital Hub. Complete onboarding to unlock personalized matches.", "info");

  return result;
}

function resolveDemoCredentialsByRole(role) {
  const normalizedRole = String(role || "").trim().toLowerCase();

  const demoMatch = store.users.find((entry) => {
    if (entry.role !== normalizedRole) return false;
    const id = String(entry.id || "").toLowerCase();
    const email = String(entry.email || "").toLowerCase();
    return id.includes("demo") || email.includes("demo");
  });

  if (demoMatch) {
    return {
      role: normalizedRole,
      email: String(demoMatch.email || ""),
      password: String(demoMatch.password || "")
    };
  }

  const seeded = demoUsers.find((entry) => entry.role === normalizedRole);
  if (seeded) {
    return {
      role: normalizedRole,
      email: String(seeded.email || ""),
      password: String(seeded.password || "")
    };
  }

  const fallback = store.users.find((entry) => entry.role === normalizedRole);
  return {
    role: normalizedRole,
    email: String(fallback?.email || ""),
    password: String(fallback?.password || "")
  };
}

function logout() {
  currentUserId = null;
  setSessionUserId(null);
}

function saveProfile(profile) {
  const user = currentUser();
  if (!user || user.role !== "student") return;

  const index = store.users.findIndex((entry) => entry.id === user.id);
  if (index === -1) return;

  const existing = store.users[index];
  const existingProfile = getUserProfile(existing) || {};
  const split = splitFullName(profile.fullName || existing.name);
  const firstName = String(profile.firstName || split.firstName || existingProfile.firstName || "").trim();
  const surname = String(profile.surname || split.surname || existingProfile.surname || "").trim();
  const fullName = buildFullName(firstName, surname, profile.fullName || existing.name || existing.email);

  store.users[index] = {
    ...existing,
    name: fullName,
    profile: {
      ...existingProfile,
      ...profile,
      fullName,
      firstName,
      surname,
      email: existingProfile.email || existing.email,
      password: existingProfile.password || existing.password,
      profilePhotoDataUrl: existingProfile.profilePhotoDataUrl || "",
      profilePhotoMeta: existingProfile.profilePhotoMeta || null
    }
  };
  refreshStudentApplicationScores(user.id, { save: false });
  saveStore(store);
}

function getStudentSettingsState(user) {
  const profile = getUserProfile(user) || {};
  const names = getUserNameParts(user);
  return {
    firstName: names.firstName,
    surname: names.surname,
    email: String(user?.email || profile.email || "").trim(),
    password: String(user?.password || profile.password || "").trim(),
    profilePhotoDataUrl: profile.profilePhotoDataUrl || "",
    profilePhotoMeta: profile.profilePhotoMeta || null
  };
}

function updateStudentSettings(studentId, settingsPayload) {
  const index = store.users.findIndex((entry) => entry.id === studentId);
  if (index === -1) return { ok: false, error: "Student profile not found." };

  const existing = store.users[index];
  if (existing.role !== "student") return { ok: false, error: "Only student profiles can be updated." };

  const firstName = String(settingsPayload.firstName || "").trim();
  const surname = String(settingsPayload.surname || "").trim();
  const email = String(settingsPayload.email || "").trim().toLowerCase();
  const password = String(settingsPayload.password || "");

  if (!firstName) return { ok: false, error: "First name is required." };
  if (!email.includes("@")) return { ok: false, error: "Enter a valid email address." };
  if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };

  const duplicate = store.users.some(
    (entry) => entry.id !== studentId && String(entry.email || "").toLowerCase() === email
  );
  if (duplicate) return { ok: false, error: "Email is already used by another account." };

  const existingProfile = getUserProfile(existing) || {};
  const fullName = buildFullName(firstName, surname, existing.name || email);

  store.users[index] = {
    ...existing,
    name: fullName,
    email,
    password,
    profile: {
      ...existingProfile,
      firstName,
      surname,
      fullName,
      email,
      password,
      profilePhotoDataUrl: settingsPayload.profilePhotoDataUrl || "",
      profilePhotoMeta: settingsPayload.profilePhotoMeta || null
    }
  };

  refreshStudentApplicationScores(studentId, { save: false });
  saveStore(store);
  return { ok: true, user: store.users[index] };
}

function setStudentProfilePhoto(studentId, dataUrl, meta) {
  const index = store.users.findIndex((entry) => entry.id === studentId);
  if (index === -1) return;
  const user = store.users[index];
  const profile = getUserProfile(user) || {};

  store.users[index] = {
    ...user,
    profile: {
      ...profile,
      firstName: profile.firstName || splitFullName(profile.fullName || user.name).firstName,
      surname: profile.surname || splitFullName(profile.fullName || user.name).surname,
      fullName: profile.fullName || user.name || user.email,
      email: profile.email || user.email,
      password: profile.password || user.password,
      profilePhotoDataUrl: dataUrl || "",
      profilePhotoMeta: meta || null
    }
  };

  refreshStudentApplicationScores(studentId, { save: false });
  saveStore(store);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(new Error("Unable to read file."));
    reader.readAsDataURL(file);
  });
}

function submitApplication(opportunityId, options = {}) {
  const user = currentUser();
  if (!user || user.role !== "student") {
    return { ok: false, error: "Only student accounts can submit applications." };
  }

  const opportunity = getOpportunity(opportunityId);
  if (!opportunity) {
    return { ok: false, error: "Opportunity not found." };
  }

  const alreadySubmitted = store.applications.some(
    (application) => application.studentId === user.id && application.opportunityId === opportunityId
  );

  if (alreadySubmitted) {
    return { ok: false, error: "You have already applied for this opportunity." };
  }

  const checklist = getDocumentChecklist(user.id, opportunity.type);
  const docsComplete =
    typeof options.docsComplete === "boolean" ? options.docsComplete : checklist.complete;
  const docsIncomplete =
    typeof options.docsIncomplete === "boolean" ? options.docsIncomplete : !docsComplete;

  const createdAt = new Date().toISOString();
  const createdAtTs = toTimestamp(createdAt);
  const submittedAt = Date.now();
  const initialStatus = "submitted";

  const seededApplication = {
    studentId: user.id,
    opportunityId,
    opportunityType: opportunity.type,
    status: initialStatus,
    docsComplete,
    docsIncomplete
  };

  const scoreModel = computeApplicationScore(seededApplication, user, opportunity);
  const scoreValue = Number(options.score);
  const qualityScore = Number.isFinite(scoreValue) ? clampScore(scoreValue) : scoreModel.score;
  const qualityReasons =
    Array.isArray(options.qualityReasons) && options.qualityReasons.length
      ? options.qualityReasons.map((reason) => String(reason)).slice(0, 4)
      : scoreModel.reasons;

  const application = {
    id: uid("app"),
    studentId: user.id,
    opportunityId,
    opportunityType: opportunity.type,
    status: initialStatus,
    createdAt,
    updatedAt: submittedAt,
    submittedAt,
    timeline: [
      { status: "draft", at: createdAtTs },
      { status: initialStatus, at: submittedAt }
    ],
    tags: {
      shortlisted: false,
      interviewed: false,
      funded: false,
      graduated: false
    },
    docsComplete,
    docsIncomplete,
    qualityScore,
    qualityReasons,
    score: qualityScore,
    fundedAt: "",
    placementStatus: "Not placed",
    employer: "",
    placedAt: ""
  };

  store.applications.unshift(application);
  store.appMeta[application.id] = {
    ...defaultApplicationMeta(),
    shortlisted: application.tags.shortlisted,
    interviewed: application.tags.interviewed,
    funded: application.tags.funded,
    graduated: application.tags.graduated
  };

  saveStore(store);
  return { ok: true };
}


/** ---------- Current Interfaces ---------- **/

function prefersReducedMotion() {
  return Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

function renderBubbleMenu(actions = []) {
  return `<div class="ydhBubbleMenu" id="ydhBubbleMenu">
    <button type="button" class="ydhBubbleToggle" id="ydhBubbleToggle" aria-expanded="false" aria-controls="ydhBubbleActions" aria-label="Open quick actions">+</button>
    <div class="ydhBubbleActions" id="ydhBubbleActions" role="menu" aria-hidden="true">
      ${actions
        .map((action) => {
          if (action.kind === "scroll") {
            return `<button type="button" class="ydhBubbleAction" data-scroll-target="${escapeHtml(action.target || "")}" role="menuitem">${escapeHtml(action.label)}</button>`;
          }
          return `<a class="ydhBubbleAction" href="${escapeHtml(action.href || "#/home")}" role="menuitem">${escapeHtml(action.label)}</a>`;
        })
        .join("")}
    </div>
  </div>`;
}

function renderAnimatedList(items = [], options = {}) {
  const variantClass = options.variant ? ` ydhAnimatedList--${options.variant}` : "";
  return `<div class="ydhAnimatedList${variantClass}">
    ${items
      .map(
        (item, index) => `<div class="ydhAnimatedItem" data-reveal="true" style="--item-index:${index};">
          <span class="ydhAnimatedBullet" aria-hidden="true"></span>
          <span>${escapeHtml(item)}</span>
        </div>`
      )
      .join("")}
  </div>`;
}

function renderStepper(steps = [], activeStep = 1, options = {}) {
  const extraClass = options.className ? ` ${options.className}` : "";
  return `<ol class="ydhStepper${extraClass}">
    ${steps
      .map((label, index) => {
        const isActive = index + 1 === activeStep;
        const isDone = index + 1 < activeStep;
        return `<li class="ydhStepperStep ${isActive ? "is-active" : ""} ${isDone ? "is-done" : ""}">
          <span class="ydhStepperDot">${index + 1}</span>
          <span class="ydhStepperLabel">${escapeHtml(label)}</span>
        </li>`;
      })
      .join("")}
  </ol>`;
}

function renderScrollStack(steps = []) {
  return `<div class="ydhScrollStack">
    ${steps
      .map((step, index) => {
        const mediaImage = String(step.mediaImage || "").trim();
        const mediaTitle = String(step.mediaTitle || step.title || `Step ${index + 1}`).trim();
        const mediaHint = String(step.mediaHint || "").trim();

        return `<article class="ydhScrollCard" data-reveal="true" style="--stack-order:${index};">
          <div class="ydhScrollIndex">${index + 1}</div>
          <h3>${escapeHtml(step.title || "")}</h3>
          <p>${escapeHtml(step.description || "")}</p>
          <div class="ydhScrollMedia${mediaImage ? " has-image" : ""}">
            ${mediaImage
              ? `<img class="ydhScrollMediaImage" src="${escapeHtml(mediaImage)}" alt="" />`
              : `<div class="ydhScrollMediaCanvas" aria-hidden="true">
                  <span class="ydhScrollMediaBadge">${escapeHtml(mediaTitle)}</span>
                  <div class="ydhScrollMediaLines">
                    <span class="ydhScrollMediaLine is-wide"></span>
                    <span class="ydhScrollMediaLine"></span>
                  </div>
                  <div class="ydhScrollMediaTiles">
                    <span class="ydhScrollMediaTile"></span>
                    <span class="ydhScrollMediaTile is-strong"></span>
                  </div>
                </div>`}
            ${mediaHint ? `<div class="ydhScrollMediaNote">${escapeHtml(mediaHint)}</div>` : ""}
          </div>
        </article>`;
      })
      .join("")}
  </div>`;
}

function renderReflectiveCards(cards = []) {
  return `<div class="ydhReflectiveGrid">
    ${cards
      .map(
        (card) => `<article class="ydhReflectiveCard" data-reflective-card="true">
          <span class="ydhReflectiveType">${escapeHtml(card.type || "")}</span>
          <h3>${escapeHtml(card.title || "")}</h3>
          <p>${escapeHtml(card.provider || "")}</p>
          <div class="ydhReflectiveMeta">${escapeHtml(card.province || "")}</div>
        </article>`
      )
      .join("")}
  </div>`;
}

function compactOpportunityProfileInterests(values = []) {
  const labelMap = new Map();

  CAREER_GUIDANCE_INTEREST_OPTIONS.forEach((option) => {
    labelMap.set(option.value, option.label);
    labelMap.set(option.label, option.label);
    (Array.isArray(option.mappedValues) ? option.mappedValues : []).forEach((value) => {
      labelMap.set(String(value || "").trim(), option.label);
    });
  });

  const normalized = [];
  (Array.isArray(values) ? values : []).forEach((value) => {
    const raw = String(value || "").trim();
    if (!raw) return;
    const label = labelMap.get(raw) || raw;
    if (!normalized.includes(label)) normalized.push(label);
  });

  return normalized.slice(0, 3).join(" · ") || "Add interests to sharpen your matches";
}

function getOpportunityProfileCareerGoal(student, guidanceRecord = null) {
  const profile = getUserProfile(student) || {};
  const storedGoal = String(profile.goals || "").trim();
  const normalizedGoal = normalizeCareerGuidanceGoal(storedGoal);
  const goalCopy = {
    bursary: "Focused on funded study opportunities",
    learnership: "Looking for a learnership pathway",
    internship: "Building toward internship opportunities",
    courses: "Exploring skills and course pathways",
    unsure: "Exploring the best next step"
  };

  if (normalizedGoal && goalCopy[normalizedGoal]) return goalCopy[normalizedGoal];
  if (storedGoal) return storedGoal;

  const guidanceCategory = String(guidanceRecord?.result?.topCategory || "").trim();
  const guidanceCopy = {
    IT: "Aspiring Software Developer",
    Engineering: "Aspiring Engineer",
    Business: "Aspiring Business Professional",
    Science: "Aspiring Data & Research Professional",
    Trades: "Aspiring Technical Specialist"
  };

  return guidanceCopy[guidanceCategory] || "Building my opportunity pathway";
}

function renderOpportunityProfileCard(props = {}) {
  const studentName = String(props.studentName || "Student Name").trim() || "Student Name";
  const careerGoal =
    String(props.careerGoal || "Building my opportunity pathway").trim() || "Building my opportunity pathway";
  const educationLevel = String(props.educationLevel || "Complete your profile").trim() || "Complete your profile";
  const interests =
    String(props.interests || "Add interests to sharpen your matches").trim() ||
    "Add interests to sharpen your matches";
  const province = String(props.province || "All provinces").trim() || "All provinces";
  const matchCount = Math.max(0, Number.parseInt(props.matchCount, 10) || 0);
  const applicationCount = Math.max(0, Number.parseInt(props.applicationCount, 10) || 0);
  const profileCompletion = Math.min(100, Math.max(0, Number.parseInt(props.profileCompletion, 10) || 0));
  const profileImage = String(props.profileImage || "").trim();
  const uploadInputId = String(props.uploadInputId || "opportunityProfileUpload").trim() || "opportunityProfileUpload";
  const platformLabel = String(props.platformLabel || "Youth Digital Hub").trim() || "Youth Digital Hub";
  const hasImage = Boolean(profileImage);

  return `<section class="rc-card" data-rc-profile-card="true">
    <div class="rc-bg-gradient" data-rc-bg-gradient="true"${hasImage ? ' style="opacity:0;"' : ""}></div>
    <img class="rc-bg-image" data-rc-bg-image="true" src="${hasImage ? escapeHtml(profileImage) : ""}" alt="${hasImage ? escapeHtml(`${studentName} profile photo`) : ""}"${hasImage ? "" : ' style="display:none;"'} />
    <div class="rc-tint"></div>
    <div class="rc-sheen"></div>
    <div class="rc-border"></div>

    <input
      type="file"
      id="${escapeHtml(uploadInputId)}"
      class="rc-file-input"
      data-rc-file-input="true"
      accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
    />

    <div class="rc-content">
      <div class="rc-header">
        <div class="rc-brand">
          <span class="rc-brand-dot"></span>
          ${escapeHtml(platformLabel)}
        </div>
        <button class="rc-share-btn" type="button" data-rc-share-profile="true" title="Share profile">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
        </button>
      </div>

      <div class="rc-image-zone">
        <div class="rc-empty-prompt" data-rc-empty-prompt="true"${hasImage ? ' style="display:none;"' : ""}>
          <div class="rc-empty-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
          <p class="rc-empty-title">Upload a photo</p>
          <p class="rc-empty-sub">Personalise your Youth Digital Hub profile</p>
          <button class="rc-upload-btn" type="button" data-rc-upload-main="true">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            Upload Image
          </button>
        </div>
      </div>

      <div class="rc-lower">
        <div class="rc-identity-row">
          <div class="rc-identity">
            <p class="rc-name">${escapeHtml(studentName)}</p>
            <p class="rc-goal">${escapeHtml(careerGoal)}</p>
          </div>
          <div class="rc-photo-actions" data-rc-photo-actions="true"${hasImage ? ' style="display:flex;"' : ' style="display:none;"'}>
            <button class="rc-icon-btn" type="button" data-rc-change-photo="true" title="Change photo">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </button>
            <button class="rc-icon-btn danger" type="button" data-rc-remove-photo="true" title="Remove photo">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6l-1 14H6L5 6"></path>
                <path d="M10 11v6M14 11v6"></path>
                <path d="M9 6V4h6v2"></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="rc-divider"></div>

        <div class="rc-details">
          <div class="rc-detail-row">
            <span class="rc-label">Education Level</span>
            <span class="rc-value">${escapeHtml(educationLevel)}</span>
          </div>
          <div class="rc-detail-row">
            <span class="rc-label">Interests</span>
            <span class="rc-value rc-value--sm">${escapeHtml(interests)}</span>
          </div>
          <div class="rc-detail-row">
            <span class="rc-label">Province</span>
            <span class="rc-value">${escapeHtml(province)}</span>
          </div>
        </div>

        <div class="rc-divider"></div>

        <div class="rc-insights">
          <div class="rc-insight-chip">
            <span class="rc-insight-label">Recommended Matches</span>
            <span class="rc-insight-value">${escapeHtml(`${matchCount} Opportunities`)}</span>
          </div>
          <div class="rc-insight-chip">
            <span class="rc-insight-label">Application Status</span>
            <span class="rc-insight-value">${escapeHtml(`${applicationCount} Started`)}</span>
          </div>
          <div class="rc-insight-chip rc-progress-chip">
            <div class="rc-progress-meta">
              <span class="rc-insight-label">Profile Completion</span>
              <span class="rc-insight-value">${escapeHtml(`${profileCompletion}%`)}</span>
            </div>
            <div class="rc-progress-track">
              <div class="rc-progress-fill" style="width:${escapeHtml(String(profileCompletion))}%;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}



function renderLandingOpportunityIdentityCard(profile = {}) {
  const studentName = String(profile.studentName || "Student Name").trim() || "Student Name";
  const careerGoal = String(profile.careerGoal || "Future-ready student").trim() || "Future-ready student";
  const educationLevel = String(profile.educationLevel || "Education level pending").trim() || "Education level pending";
  const interests = Array.isArray(profile.interests) ? profile.interests.filter(Boolean).slice(0, 3) : [];
  const province = String(profile.province || "South Africa").trim() || "South Africa";
  const profileCompletion = Math.min(100, Math.max(0, Number.parseInt(profile.profileCompletion, 10) || 0));
  const readinessScore = String(profile.readinessScore || "8.8/10").trim() || "8.8/10";
  const image = String(profile.profileImage || "").trim();
  const shareItems = [
    {
      label: "WhatsApp",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.3-4.5A8.5 8.5 0 1 1 20.5 11.5Z"></path><path d="M8.6 9.2c.2-.4.5-.4.8-.4h.6c.2 0 .4.1.5.4l.7 1.8c.1.2.1.4 0 .6l-.3.5c-.1.2-.1.3 0 .4.3.6.8 1.1 1.3 1.5.5.4 1.1.7 1.7 1 .1 0 .3 0 .4-.1l.5-.6c.2-.2.4-.2.6-.1l1.7.8c.3.1.4.3.4.5v.5c0 .3-.1.7-.4.9-.4.3-.9.5-1.5.5-.9 0-1.9-.3-3-.9a10.4 10.4 0 0 1-3-2.5 8.2 8.2 0 0 1-1.8-3.4c-.1-.7 0-1.3.3-1.8Z"></path></svg>`
    },
    {
      label: "LinkedIn",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`
    },
    {
      label: "Copy Link",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.1 0l2.8-2.8a5 5 0 0 0-7.1-7.1L10 4"></path><path d="M14 11a5 5 0 0 0-7.1 0l-2.8 2.8a5 5 0 0 0 7.1 7.1L14 20"></path></svg>`
    }
  ];

  return `<article class="landingShareProfileCard" data-reveal="true">
    <div class="landingShareProfilePhotoWrap">
      <div class="landingShareProfilePortrait">
        <img src="${escapeHtml(image)}" alt="${escapeHtml(`${studentName} profile photo`)}" />
      </div>
    </div>

    <div class="landingShareProfileSheet">
      <div class="landingShareProfileHeader">
        <div class="landingShareProfileIntro">
          <span class="landingShareProfileEyebrow">Student opportunity profile</span>
          <h3>${escapeHtml(studentName)}</h3>
          <p>${escapeHtml(careerGoal)}</p>
        </div>
      </div>

      <div class="landingShareProfileMeta">
        <span>${escapeHtml(educationLevel)}</span>
        <span>${escapeHtml(province)}</span>
      </div>

      <div class="landingShareProfileSection">
        <div class="landingShareProfileSectionHead">
          <span>Profile Strength</span>
          <strong>${escapeHtml(`${profileCompletion}% Complete`)}</strong>
        </div>
        <div class="landingShareProfileProgress" aria-hidden="true">
          <span style="width:${escapeHtml(String(profileCompletion))}%;"></span>
        </div>
      </div>

      <div class="landingShareProfileFooter">
        <article class="landingShareProfileStat">
          <span>Opportunity readiness</span>
          <strong>${escapeHtml(readinessScore)}</strong>
        </article>
        <article class="landingShareProfileStat landingShareProfileStat--match">
          <span>Matched opportunities</span>
          <div class="landingShareProfileTags">
            ${interests.map((interest) => `<span>${escapeHtml(interest)}</span>`).join("")}
          </div>
        </article>
      </div>

      <div class="landingShareProfileShareRow" aria-label="Share destinations">
        ${shareItems
          .map(
            (item) => `<span class="landingShareProfileIcon" title="${escapeHtml(item.label)}" aria-label="${escapeHtml(item.label)}">${item.icon}</span>`
          )
          .join("")}
      </div>
    </div>
  </article>`;
}

function renderLandingOpportunityPlannerCard() {
  const steps = [
    { step: 'Step 1', title: 'Complete your profile', duration: '5 minutes', state: 'is-active' },
    { step: 'Step 2', title: 'Upload academic results', duration: '3 minutes', state: '' },
    { step: 'Step 3', title: 'Explore matching bursaries', duration: '10 minutes', state: '' },
    { step: 'Step 4', title: 'Submit your first application', duration: '5 minutes', state: '' }
  ];

  return `<article class="landingPlannerCard" data-reveal="true">
    <div class="landingPlannerIntro">
      <span class="landingPlannerLabel">Opportunity Planner</span>
      <h3>Opportunity Planner</h3>
      <p>A simple view showing the steps that prepare you for real opportunities.</p>
    </div>

    <div class="landingPlannerBoard">
      <div class="landingPlannerBoardHeader">
        <div>
          <strong>Good Morning Monde</strong>
          <span>Profile Strength: 15% Complete</span>
        </div>
        <span class="landingPlannerPill">Today</span>
      </div>

      <div class="landingPlannerSteps" role="list">
        ${steps
          .map(
            (item) => `<div class="landingPlannerStep ${item.state}" role="listitem">
              <div class="landingPlannerStepMeta">
                <span>${escapeHtml(item.step)}</span>
                <strong>${escapeHtml(item.title)}</strong>
              </div>
              <span class="landingPlannerStepDuration">${escapeHtml(item.duration)}</span>
            </div>`
          )
          .join('')}
      </div>
    </div>
  </article>`;
}

function renderTiltedCards(cards = [], options = {}) {
  const className = options.className ? ` ${options.className}` : "";
  const actionLabel = options.actionLabel || "View";
  const actionHref = options.actionHref || "#/login";

  return `<div class="ydhTiltGrid${className}">
    ${cards
      .map((card, index) => {
        const opportunity = {
          id: String(card.id || `landing-opp-${index + 1}`),
          type: String(card.type || "Course"),
          title: String(card.title || "Opportunity preview"),
          provider: String(card.provider || card.institution || "Youth Digital Hub"),
          institution: String(card.provider || card.institution || "Youth Digital Hub"),
          location: String(card.province || card.location || "National"),
          province: String(card.province || card.location || "National"),
          sector: String(card.sector || "Opportunity Access"),
          fundingAmount: String(card.fundingAmount || card.value || "See details"),
          stipendOrValue: String(card.stipendOrValue || card.value || "See details"),
          duration: String(card.duration || "Flexible"),
          certificationType: String(card.certificationType || "Certificate"),
          focusArea: String(card.focusArea || "See details"),
          closingDate: String(card.closingDate || "Rolling"),
          nqfLevel: String(card.nqfLevel || ""),
          requirements: Array.isArray(card.requirements) ? card.requirements : [],
          description: String(card.description || ""),
          image: String(card.image || ""),
          badges: Array.isArray(card.badges) ? card.badges : [],
          tags: Array.isArray(card.tags) ? card.tags : []
        };

        const lifecycle = {
          statusLabel: String(card.statusLabel || "Open"),
          statusClass: String(card.statusClass || "statusPill statusOpen"),
          cardVariantClass: "",
          isInProgress: false,
          isSubmitted: false,
          isClosed: false,
          isComplete: false
        };

        return renderStudentOpportunityCard(opportunity, {
          student: null,
          application: null,
          recommended: Boolean(card.recommended),
          lifecycle,
          action: {
            label: String(card.actionLabel || actionLabel || "View").trim() || "View",
            href: String(card.href || actionHref || "#/login").trim() || "#/login"
          },
          previewMode: true
        });
      })
      .join("")}
  </div>`;
}

function renderFolderPreview(documents = [], options = {}) {
  const className = options.className ? ` ${options.className}` : "";
  const showTitle = Boolean(options.title);
  const showDescription = Boolean(options.description);

  return `<section class="ydhFolderPreview${className}">
    ${showTitle ? `<div class="ydhFolderTitle">${escapeHtml(options.title)}</div>` : ""}
    ${showDescription ? `<div class="mutedText" style="margin-top:4px;">${escapeHtml(options.description)}</div>` : ""}
    <div class="ydhFolderGrid" style="margin-top:${showTitle || showDescription ? "10px" : "0"};">
      ${documents
        .map((document) => {
          const isReady = String(document.status || "").toLowerCase() === "ready";
          return `<article class="ydhFolderCard ${isReady ? "is-ready" : "is-missing"}" data-reveal="true">
            <div class="ydhFolderTab" aria-hidden="true"></div>
            <h4>${escapeHtml(document.label || "")}</h4>
            <p>${escapeHtml(document.hint || "")}</p>
            <span class="ydhFolderStatus">${escapeHtml(document.status || "Pending")}</span>
          </article>`;
        })
        .join("")}
    </div>
  </section>`;
}

function renderLanyardCard(profile = {}) {
  const name = String(profile.name || "Student Name").trim();
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] || "")
    .join("")
    .toUpperCase() || "ST";

  return `<div class="ydhLanyardWrap" data-reveal="true">
    <div class="ydhLanyardHook" aria-hidden="true"></div>
    <div class="ydhLanyardStrap" aria-hidden="true"></div>
    <article class="ydhLanyardCard">
      <div class="ydhLanyardAvatar">${escapeHtml(initials)}</div>
      <div class="ydhLanyardName">${escapeHtml(name)}</div>
      <div class="ydhLanyardMeta">${escapeHtml(profile.status || "Learner status: Verified")}</div>
      <div class="ydhLanyardMeta">${escapeHtml(profile.province || "Province: Gauteng")}</div>
      <span class="ydhLanyardBadge">${escapeHtml(profile.educationLevel || "NCV Level 4")}</span>
    </article>
  </div>`;
}

function renderDockNav(items = []) {
  return `<nav class="ydhDock" aria-label="Landing mobile dock">
    ${items
      .map(
        (item) => `<a href="${escapeHtml(item.href || "#/home")}" ${item.target ? `data-scroll-target="${escapeHtml(item.target)}"` : ""}>
          <span class="ydhDockIcon" aria-hidden="true">${escapeHtml(item.icon || "•")}</span>
          <span class="ydhDockLabel">${escapeHtml(item.label || "")}</span>
        </a>`
      )
      .join("")}
  </nav>`;
}

function createClickSpark(event) {
  if (prefersReducedMotion()) return;
  const button = event.currentTarget;
  if (!(button instanceof HTMLElement)) return;

  const rect = button.getBoundingClientRect();
  const spark = document.createElement("span");
  spark.className = "ydhClickSpark";

  const fallbackX = rect.width / 2;
  const fallbackY = rect.height / 2;
  const x = Number.isFinite(event.clientX) ? event.clientX - rect.left : fallbackX;
  const y = Number.isFinite(event.clientY) ? event.clientY - rect.top : fallbackY;

  spark.style.left = `${Math.max(0, Math.min(rect.width, x))}px`;
  spark.style.top = `${Math.max(0, Math.min(rect.height, y))}px`;

  button.appendChild(spark);
  window.setTimeout(() => {
    if (spark.parentNode) spark.parentNode.removeChild(spark);
  }, 520);
}

function applyInteractiveCardMotion(node, selector) {
  if (prefersReducedMotion()) return;
  if (window.matchMedia && window.matchMedia("(max-width: 900px)").matches) return;

  node.querySelectorAll(selector).forEach((card) => {
    const onMove = (event) => {
      const rect = card.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5;
      const offsetY = (event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5;
      card.style.setProperty("--mx", String(offsetX));
      card.style.setProperty("--my", String(offsetY));
    };

    const onLeave = () => {
      card.style.setProperty("--mx", "0");
      card.style.setProperty("--my", "0");
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    card.addEventListener("blur", onLeave, true);
  });
}

function setupRevealAnimation(node, selector) {
  const elements = Array.from(node.querySelectorAll(selector));
  if (!elements.length) return;

  if (prefersReducedMotion() || typeof IntersectionObserver !== "function") {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.15 }
  );

  elements.forEach((element) => observer.observe(element));
}

function initializeLandingInteractions(node) {
  const menuToggle = node.querySelector("#landingMenuToggle");
  const navLinks = node.querySelector("#landingNavLinks");

  const closeMenu = () => {
    if (!menuToggle || !navLinks) return;
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const nextOpen = !navLinks.classList.contains("open");
      navLinks.classList.toggle("open", nextOpen);
      menuToggle.setAttribute("aria-expanded", nextOpen ? "true" : "false");
    });
  }

  const bubbleToggle = node.querySelector("#ydhBubbleToggle");
  const bubbleActions = node.querySelector("#ydhBubbleActions");

  if (bubbleToggle && bubbleActions) {
    const closeBubble = () => {
      bubbleActions.classList.remove("open");
      bubbleActions.setAttribute("aria-hidden", "true");
      bubbleToggle.setAttribute("aria-expanded", "false");
    };

    bubbleToggle.addEventListener("click", (event) => {
      event.preventDefault();
      const nextOpen = !bubbleActions.classList.contains("open");
      bubbleActions.classList.toggle("open", nextOpen);
      bubbleActions.setAttribute("aria-hidden", nextOpen ? "false" : "true");
      bubbleToggle.setAttribute("aria-expanded", nextOpen ? "true" : "false");
    });

    node.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest("#ydhBubbleMenu")) {
        closeBubble();
      }
    });
  }

  node.querySelectorAll("[data-scroll-target]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      const targetId = trigger.getAttribute("data-scroll-target");
      if (!targetId) return;
      const target = node.querySelector(`#${targetId}`);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMenu();
    });
  });

  node.querySelectorAll(".sparkButton").forEach((button) => {
    button.addEventListener("click", createClickSpark);
  });

  const landingProfileCard = node.querySelector('#verified-profile [data-rc-profile-card="true"]');
  if (landingProfileCard) {
    const shareButton = landingProfileCard.querySelector('[data-rc-share-profile="true"]');
    shareButton?.addEventListener('click', async () => {
      const shareUrl = `${location.origin || ""}${location.pathname || ""}#/signup`;
      try {
        if (navigator.share) {
          await navigator.share({
            title: 'Youth Digital Hub',
            text: 'Preview the Youth Digital Hub opportunity profile.',
            url: shareUrl
          });
          return;
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(shareUrl);
        }
      } catch (_error) {
      }
    });
  }

  applyInteractiveCardMotion(node, "[data-reflective-card]");
  applyInteractiveCardMotion(node, "[data-tilt-card]");

  setupRevealAnimation(node, "[data-reveal='true']");
}

// Public landing page render function.


// ── /demos — Role selection page ─────────────────────────────────────────────
function pageDemos() {
  const node = document.createElement('div');
  node.className = 'demosPage';
  node.innerHTML = `
    <div class="demosWrap">
      <a href="index.html" class="demosBack">← Back to home</a>
      <div class="demosHero">
        <div class="demosEyebrow">Youth Digital Hub</div>
        <h1 class="demosTitle">Try the Platform</h1>
        <p class="demosSub">Explore the full experience as any role — no sign-up required. Pick a workspace below.</p>
      </div>
      <div class="demosGrid">
        <button class="demosCard demosCard--student" data-demo="student" type="button">
          <div class="demosCardIcon">🎓</div>
          <div class="demosCardTitle">Student Demo</div>
          <div class="demosCardDesc">Explore bursaries, learnerships and internships, track applications, and use the AI career quiz.</div>
          <ul class="demosCardFeats"><li>AI career matching</li><li>Bursary &amp; learnership listings</li><li>Application tracking</li><li>Document management</li></ul>
          <div class="demosCardCta">Enter Student Demo →</div>
        </button>
        <button class="demosCard demosCard--corporate" data-demo="corporate" type="button">
          <div class="demosCardIcon">🏢</div>
          <div class="demosCardTitle">Corporate Partner Demo</div>
          <div class="demosCardDesc">Post opportunities, review applicants, manage your talent pipeline and verify documents.</div>
          <ul class="demosCardFeats"><li>Post &amp; manage opportunities</li><li>Applicant profiles &amp; scoring</li><li>Hiring pipeline</li><li>Document verification</li></ul>
          <div class="demosCardCta">Enter Corporate Demo →</div>
        </button>
        <button class="demosCard demosCard--institute" data-demo="institute" type="button">
          <div class="demosCardIcon">🏫</div>
          <div class="demosCardTitle">Institute Demo</div>
          <div class="demosCardDesc">Manage student enrolments, funding applications, program analytics and document review.</div>
          <ul class="demosCardFeats"><li>Program management</li><li>Student profiles</li><li>Funding oversight</li><li>Analytics &amp; reporting</li></ul>
          <div class="demosCardCta">Enter Institute Demo →</div>
        </button>
        <button class="demosCard demosCard--admin" data-demo="admin" type="button">
          <div class="demosCardIcon">⚙️</div>
          <div class="demosCardTitle">Platform Admin Demo</div>
          <div class="demosCardDesc">The full operator view — manage institutions, users, bursaries and system analytics.</div>
          <ul class="demosCardFeats"><li>Full platform oversight</li><li>Institution management</li><li>User &amp; role management</li><li>System analytics</li></ul>
          <div class="demosCardCta">Enter Admin Demo →</div>
        </button>
      </div>
      <div class="demosFooter">
        <span>Ready to create a real account?</span>
        <a href="#/signup" class="btn btnPrimary">Create Free Profile →</a>
        <a href="#/login" class="btn btnGhost">Login</a>
      </div>
    </div>`;

  const DEMO_ROUTES = {
    student:   '/student/dashboard',
    corporate: '/corporate/dashboard',
    institute: '/institute/dashboard',
    admin:     '/admin/corporate'
  };
  const DEMO_KEYS = {
    student:   'user-student-demo',
    corporate: 'user-corporate-demo',
    institute: 'user-institute-demo',
    admin:     'user-admin-demo'
  };

  node.querySelectorAll('[data-demo]').forEach(card => {
    card.addEventListener('click', () => {
      const role = card.getAttribute('data-demo');
      // Use app.html's demoLogin if available, else do it inline
      if (typeof window.demoLogin === 'function') {
        window.demoLogin(role);
      } else {
        try { sessionStorage.setItem(SESSION_KEY, DEMO_KEYS[role]); } catch(e) {}
        currentUserId = DEMO_KEYS[role];
        navigate(DEMO_ROUTES[role]);
      }
    });
  });

  return node;
}

function pageHome() {
  const landingProfileImage = "images/Monde Image.jpeg";
  const landingPhoneMockup = "images/iPhone 15.png";

  const howItWorksSteps = [
    {
      title: "Create your profile",
      description: "Build your learner profile with your province, education level, and goals.",
      mediaTitle: "Profile setup",
      mediaHint: "Photo, province, education level"
    },
    {
      title: "Discover opportunities",
      description: "Find bursaries, learnerships, and courses matched to your profile.",
      mediaTitle: "Matched opportunities",
      mediaHint: "Bursaries, learnerships, short courses"
    },
    {
      title: "Apply with confidence",
      description: "Submit applications using saved information and document vault support.",
      mediaTitle: "Document vault",
      mediaHint: "Ready files for faster applications"
    },
    {
      title: "Track your progress",
      description: "Monitor statuses, get updates, and stay on top of next actions.",
      mediaTitle: "Status tracker",
      mediaHint: "Live progress and next actions"
    }
  ];

  const gettingStartedSteps = [
    "Sign up",
    "Complete profile",
    "Upload documents",
    "Apply to opportunities"
  ];

  const featureItems = [
    "Smart recommendations",
    "AI eligibility insights",
    "Upload documents once",
    "Track applications in one place",
    "Access bursaries, courses, and learnerships"
  ];

  const opportunityCards = [
    {
      id: "landing-bursary-nedbank",
      type: "Bursary",
      title: "Nedbank External Bursary Programme",
      provider: "Nedbank Group",
      province: "Gauteng",
      sector: "Finance & Business",
      fundingAmount: "Up to R120,000 per year",
      closingDate: "2026-08-31",
      focusArea: "Finance, Accounting, Economics, Data Science",
      badges: ["Finance", "Applications Open"],
      image: "images/nedbank.jpg",
      href: "#/signup",
      actionLabel: "Create profile",
      recommended: true
    },
    {
      id: "landing-internship-mtn",
      type: "Internship",
      title: "Software Development Internship",
      provider: "MTN South Africa",
      province: "Johannesburg",
      stipendOrValue: "R9,000 / month",
      closingDate: "2026-07-18",
      nqfLevel: "NQF 5+",
      requirements: ["Software or ICT qualification"],
      badges: ["Technology", "Paid"],
      image: "images/MTN.jpg",
      href: "#/signup",
      actionLabel: "Start journey",
      statusLabel: "Closing soon",
      statusClass: "statusPill statusWarning"
    },
    {
      id: "landing-course-hyperiondev",
      type: "Course",
      title: "Software Engineering Bootcamp",
      provider: "HyperionDev",
      province: "Online",
      duration: "16 weeks",
      certificationType: "Bootcamp Certificate",
      focusArea: "Software engineering, Git, JavaScript, portfolio work",
      tags: ["Software Engineering", "Portfolio", "Mentorship"],
      badges: ["Online", "Mentored"],
      image: "images/hyperiondev.png",
      href: "#/signup",
      actionLabel: "Explore platform"
    }
  ];

  const partnerCards = [
    {
      id: "landing-partner-standard-bank",
      type: "Employer Network",
      title: "Verified Talent Access",
      provider: "Standard Bank Talent Partnerships",
      province: "National",
      sector: "Hiring & Placement",
      fundingAmount: "Verified talent pipeline",
      closingDate: "Rolling",
      focusArea: "Shortlists, applicant tracking, partner dashboards",
      badges: ["Employer Network", "Verified"],
      image: "images/Standard-Bank.jpg",
      href: "#/signup",
      actionLabel: "Partner with us",
      statusLabel: "Verified partner",
      statusClass: "statusPill statusSubmitted"
    },
    {
      id: "landing-partner-transnet",
      type: "SETA Partner",
      title: "Sector Skills Pipeline",
      provider: "Transnet + Skills Development Partners",
      province: "National",
      sector: "Skills Development",
      fundingAmount: "Placement reporting",
      closingDate: "Rolling",
      focusArea: "Learnership pipelines, reporting, intake planning",
      badges: ["SETA Partner", "National"],
      image: "images/transnet.png",
      href: "#/signup",
      actionLabel: "Learn more",
      statusLabel: "Active network",
      statusClass: "statusPill statusOpen"
    }
  ];

  const folderItems = [
    { label: "ID Copy", hint: "Government-issued identity document", status: "Ready" },
    { label: "Academic Transcript", hint: "Matric/TVET transcript upload", status: "Ready" },
    { label: "Proof of Address", hint: "Municipal or verified residence proof", status: "Pending" },
    { label: "CV", hint: "Career-ready CV for employers", status: "Pending" }
  ];

  const bubbleActions = [
    { label: "Explore Bursaries", kind: "scroll", target: "opportunity-showcase" },
    { label: "Learnerships", kind: "scroll", target: "opportunity-showcase" },
    { label: "Courses", kind: "scroll", target: "opportunity-showcase" },
    { label: "Login", kind: "link", href: "#/login" },
    { label: "Sign Up", kind: "link", href: "#/signup" }
  ];

  const dockItems = [
    { label: "Home", icon: "H", href: "#/home", target: "landingTop" },
    { label: "Opportunities", icon: "O", href: "#/home", target: "opportunity-showcase" },
    { label: "Features", icon: "F", href: "#/home", target: "platform-features" },
    { label: "Login", icon: "L", href: "#/login" },
    { label: "Sign Up", icon: "S", href: "#/signup" }
  ];

  const node = el(`<div class="landingPage" id="landingTop">
    <header class="landingNavWrap">
      <nav class="landingNav">
        <a class="landingBrand" href="#/home">Youth Digital Hub</a>
        <button type="button" class="landingMenuToggle" id="landingMenuToggle" aria-expanded="false" aria-controls="landingNavLinks">Menu</button>
        <div class="landingNavLinks" id="landingNavLinks">
          <a href="#/home" data-scroll-target="landingTop">Home</a>
          <a href="#/home" data-scroll-target="how-it-works">How it Works</a>
          <a href="#/home" data-scroll-target="opportunity-showcase">Opportunities</a>
          <a href="#/home" data-scroll-target="platform-features">Features</a>
          <a href="#/login">Login</a>
          <a class="landingSignupLink" href="#/signup">Sign Up</a>
        </div>
      </nav>
    </header>

    <main class="landingMain">
      <section class="landingHero" id="home">
        <div class="landingHeroStage">
          <div class="landingHeroLead">
            <div class="landingHeroCopy">
              <div class="landingHeroEyebrow"><span class="landingHeroEyebrowDot"></span>South Africa's Student Platform</div>
              <h1><span>Every Opportunity,</span><span>One Platform</span></h1>
              <p>Discover bursaries, learnerships, internships, and courses in one place. Youth Digital Hub connects young people to real opportunities that shape their future.</p>
              <div class="landingHeroCtas">
                <a class="btn btnPrimary sparkButton" href="#/signup">Get Started Free</a>
                <button type="button" class="btn btnGhost sparkButton" data-scroll-target="opportunity-showcase">Explore Opportunities</button>
              </div>
            </div>

            <div class="landingHeroVisual" data-reveal="true">
              <div class="landingHeroDeviceGlow" aria-hidden="true"></div>
              <img class="landingHeroPhone" src="${landingPhoneMockup}" alt="Youth Digital Hub dashboard shown on a phone" />
            </div>

            <div class="landingHeroSupport" data-reveal="true">
              <div class="landingHeroSupportMarker" aria-hidden="true">+</div>
              <p>Youth Digital Hub gives students one trusted place to discover, prepare for, and act on real opportunities.</p>
              <div class="landingHeroTrust">
                <div class="landingHeroAvatarGroup" aria-hidden="true">
                  <span class="landingHeroAvatar landingHeroAvatar--photo"><img src="${landingProfileImage}" alt="" /></span>
                  <span class="landingHeroAvatar">TN</span>
                  <span class="landingHeroAvatar">LP</span>
                  <span class="landingHeroAvatar">AM</span>
                </div>
                <div class="landingHeroTrustCopy">
                  <strong>10,000+</strong>
                  <span>students discovering opportunities</span>
                </div>
              </div>
            </div>
          </div>

          <div class="landingHeroPanel">
            <div class="landingHeroBackdrop" aria-hidden="true">
              <div class="landingHeroBackdropTrack">
                <span>YOUTH DIGITAL HUB • YOUTH DIGITAL HUB • YOUTH DIGITAL HUB</span>
                <span>YOUTH DIGITAL HUB • YOUTH DIGITAL HUB • YOUTH DIGITAL HUB</span>
              </div>
            </div>
            <div class="landingHeroPanelCopy">
              <p>Partnering with top institutions and corporates to connect young South Africans with real career-shaping opportunities.</p>
              <div class="landingHeroPartnerRow" aria-label="Partner categories">
                <span class="landingHeroPartnerPill">NSFAS</span>
                <span class="landingHeroPartnerPill">TVET Colleges</span>
                <span class="landingHeroPartnerPill">SETA</span>
                <span class="landingHeroPartnerPill">Corporates</span>
                <span class="landingHeroPartnerPill">Institutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="landingSection" id="how-it-works">
        <div class="landingSectionHeading">
          <h2>How Youth Digital Hub Works</h2>
          <p>A guided path from first profile setup to successful applications.</p>
        </div>
        ${renderScrollStack(howItWorksSteps)}
        <div style="margin-top:14px;">
          ${renderStepper(gettingStartedSteps, 2, { className: "ydhStepper--compact" })}
        </div>
      </section>

      <section class="landingSection landingGuidanceShowcase" id="platform-features">
        <div class="landingGuidanceTop">
          <div class="landingGuidanceIntro" data-reveal="true">
            <span class="landingGuidanceLabel">Opportunity Guidance</span>
            <h2>A platform that guides your future.</h2>
            <p>Youth Digital Hub helps students discover bursaries, internships, learnerships, and courses that match their goals.</p>
            <p>The platform simplifies the opportunity journey by showing the next steps students should take to prepare and apply successfully.</p>
          </div>
          ${renderLandingOpportunityPlannerCard()}
        </div>

        <div class="landingJourneyFeatureBlock" data-reveal="true">
          <div class="landingJourneyFeatureContent">
            <span class="landingJourneyFeatureLabel">Guided opportunity journey</span>
            <h3>Your opportunity journey starts here.</h3>
            <p>Youth Digital Hub helps students discover real opportunities and take the right steps toward their future.</p>
            <p>From career guidance to bursaries and internships, the platform brings everything into one place so students can focus on progress instead of confusion.</p>
            <div class="landingJourneyFeatureActions">
              <a class="btn btnPrimary sparkButton" href="#/signup">Start Discovering Opportunities</a>
              <button type="button" class="btn btnGhost sparkButton" data-scroll-target="how-it-works">See How It Works</button>
            </div>
          </div>
        </div>
      </section>

      <section class="landingSection" id="opportunity-showcase">
        <div class="landingSectionHeading">
          <h2>Opportunity Showcase</h2>
          <p>Explore bursaries, learnerships, internships, and short courses in one place.</p>
        </div>
        ${renderTiltedCards(opportunityCards, { className: "ydhTiltGrid--opportunity", actionLabel: "Create profile", actionHref: "#/signup" })}
        <div class="ydhPartnerPanel">
          <div class="landingSectionHeading" style="margin-top:16px;">
            <h2 style="font-size:22px;">For Employers / SETAs</h2>
            <p>Post opportunities, access verified talent, and track applicants.</p>
          </div>
          ${renderTiltedCards(partnerCards, { className: "ydhTiltGrid--partner", actionLabel: "Learn more", actionHref: "#/signup" })}
        </div>
      </section>

      <section class="landingSection" id="doc-preview">
        <div class="landingSectionHeading">
          <h2>Document Management Preview</h2>
          <p>Organise required files once and reuse them across applications.</p>
        </div>
        ${renderFolderPreview(folderItems, {
          title: "How document management works",
          description: "Required folders stay clearly organised for every opportunity.",
          className: "ydhFolderPreview--landing"
        })}
      </section>

      <section class="landingSection" id="verified-profile">
        <div class="landingProfileFeatureLayout">
          <div class="landingProfileFeatureVisual">
            ${renderLandingOpportunityIdentityCard({
              studentName: "Monde Mkhize",
              careerGoal: "Future Software Engineer",
              educationLevel: "TVET N6",
              interests: ["Bursaries", "Learnerships", "Internships"],
              province: "KwaZulu-Natal",
              profileCompletion: 92,
              readinessScore: "8.8/10",
              profileImage: landingProfileImage
            })}
          </div>
          <div class="landingProfileFeatureContent" data-reveal="true">
            <span class="landingProfileFeatureLabel">Student Profile</span>
            <h2>Your Opportunity Profile</h2>
            <p>Your Youth Digital Hub profile becomes your digital opportunity passport.</p>
            <p>It automatically showcases your interests, skills, and academic direction — helping bursary providers, training institutions, and employers understand who you are.</p>
            <p>You can also share your profile with friends, mentors, or recruiters using a simple link or through social platforms like WhatsApp and LinkedIn.</p>
            <p>This makes it easier to get guidance, feedback, and opportunities from the people around you.</p>
            <ul class="landingProfileFeatureList">
              <li>Share your profile instantly</li>
              <li>Show your opportunity readiness</li>
              <li>Highlight your career interests</li>
              <li>Track your profile strength</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="landingCta" id="start-now">
        <h2>Start building your future today.</h2>
        <p class="landingCtaMeta">Youth Digital Hub supports students, graduates, employers, and SETAs in one connected experience.</p>
        <div class="landingCtaActions">
          <a class="btn btnPrimary sparkButton" href="#/signup">Create Account</a>
          <a class="btn btnGhost" href="#/login">Login</a>
        </div>
      </section>
    </main>

    ${renderDockNav(dockItems)}
  </div>`);

  initializeLandingInteractions(node);
  return node;
}


// Authentication page render + login form event wiring.
function pageLogin() {
  const user = currentUser();
  if (user) {
    navigate(getWorkspaceHomeRoute(user));
    return el(`<div class="content">Redirecting...</div>`);
  }

  const studentDemo = resolveDemoCredentialsByRole("student");
  const corporateDemo = resolveDemoCredentialsByRole("corporate_partner");
  const instituteDemo = resolveDemoCredentialsByRole("institution_admin");
  const adminDemo = resolveDemoCredentialsByRole("admin");

  const node = el(`<div class="authPage">
    <section class="authShell">
      <div class="authIntro">
        <a class="landingBrand" href="#/home">Youth Digital Hub</a>
        <h1>Welcome back</h1>
        <p>Log in to continue your journey.</p>
      </div>

      <div class="authCard">
        <h2>Login</h2>
        <p class="mutedText" style="margin:6px 0 0;">Your account type is resolved automatically and routed to the correct dashboard.</p>
        <form id="loginForm" class="authForm">
          <div class="field">
            <label for="loginEmail"><b>Email</b></label>
            <input class="input" id="loginEmail" type="email" placeholder="you@example.com" required />
          </div>

          <div class="field">
            <label for="loginPassword"><b>Password</b></label>
            <input class="input" id="loginPassword" type="password" placeholder="Enter password" required />
          </div>

          <div id="loginError" class="mutedText" style="min-height:20px;"></div>

          <button class="btn btnPrimary" type="submit">Login</button>
          <a class="btn btnGhost" href="#/signup">Create account</a>
        </form>

        <section class="authDemoCard" aria-label="Demo credentials">
          <h3>Try the demo</h3>
          <p class="authDemoSubtext">Explore the platform instantly with demo accounts.</p>
          <div class="authDemoGrid">
            <article class="authDemoItem">
              <h4>Student Demo</h4>
              <p><b>Email:</b> ${escapeHtml(studentDemo.email || "Not available")}</p>
              <p><b>Password:</b> ${escapeHtml(studentDemo.password || "Not available")}</p>
              <button type="button" class="btn btnGhost authDemoUseBtn" id="useStudentDemo">Use Student Demo</button>
            </article>
            <article class="authDemoItem">
              <h4>Corporate Demo</h4>
              <p><b>Email:</b> ${escapeHtml(corporateDemo.email || "Not available")}</p>
              <p><b>Password:</b> ${escapeHtml(corporateDemo.password || "Not available")}</p>
              <button type="button" class="btn btnGhost authDemoUseBtn" id="useCorporateDemo">Use Corporate Demo</button>
            </article>
            <article class="authDemoItem">
              <h4>Institute Demo</h4>
              <p><b>Email:</b> ${escapeHtml(instituteDemo.email || "Not available")}</p>
              <p><b>Password:</b> ${escapeHtml(instituteDemo.password || "Not available")}</p>
              <button type="button" class="btn btnGhost authDemoUseBtn" id="useInstituteDemo">Use Institute Demo</button>
            </article>
            <article class="authDemoItem">
              <h4>Admin Demo</h4>
              <p><b>Email:</b> ${escapeHtml(adminDemo.email || "Not available")}</p>
              <p><b>Password:</b> ${escapeHtml(adminDemo.password || "Not available")}</p>
              <button type="button" class="btn btnGhost authDemoUseBtn" id="useAdminDemo">Use Admin Demo</button>
            </article>
          </div>
        </section>
      </div>
    </section>
  </div>`);

  const form = node.querySelector("#loginForm");
  const errorEl = node.querySelector("#loginError");
  const loginEmailInput = node.querySelector("#loginEmail");
  const loginPasswordInput = node.querySelector("#loginPassword");

  const applyDemoCredentials = (credentials, label) => {
    if (!credentials.email || !credentials.password) {
      errorEl.textContent = "Demo credentials are currently unavailable.";
      return;
    }

    loginEmailInput.value = credentials.email;
    loginPasswordInput.value = credentials.password;
    errorEl.textContent = `${label} credentials loaded. Click Login to continue.`;
  };

  const useStudentDemoButton = node.querySelector("#useStudentDemo");
  const useCorporateDemoButton = node.querySelector("#useCorporateDemo");
  const useInstituteDemoButton = node.querySelector("#useInstituteDemo");
  const useAdminDemoButton = node.querySelector("#useAdminDemo");

  if (useStudentDemoButton) {
    useStudentDemoButton.addEventListener("click", () => applyDemoCredentials(studentDemo, "Student demo"));
  }

  if (useCorporateDemoButton) {
    useCorporateDemoButton.addEventListener("click", () => applyDemoCredentials(corporateDemo, "Corporate demo"));
  }

  if (useInstituteDemoButton) {
    useInstituteDemoButton.addEventListener("click", () => applyDemoCredentials(instituteDemo, "Institute demo"));
  }

  if (useAdminDemoButton) {
    useAdminDemoButton.addEventListener("click", () => applyDemoCredentials(adminDemo, "Admin demo"));
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    errorEl.textContent = "";

    const email = String(loginEmailInput?.value || "").trim();
    const password = String(loginPasswordInput?.value || "");

    const result = login(email, password);

    if (!result.ok) {
      errorEl.textContent = result.error;
      return;
    }

    navigate(getWorkspaceHomeRoute(result.user));
  });

  return node;
}

function pageSignup() {
  const user = currentUser();
  if (user) {
    navigate(getWorkspaceHomeRoute(user));
    return el(`<div class="content">Redirecting...</div>`);
  }

  const signupSteps = ["Create account", "Complete profile (optional)", "Upload documents when ready", "Apply to opportunities"];

  const node = el(`<div class="authPage">
    <section class="authShell">
      <div class="authIntro">
        <a class="landingBrand" href="#/home">Youth Digital Hub</a>
        <h1>Create your account</h1>
        <p>Start exploring opportunities in minutes.</p>
        <div style="margin-top:14px;">
          ${renderStepper(signupSteps, 1, { className: "ydhStepper--compact" })}
        </div>
        <div class="authSignupTips" style="margin-top:14px;">
          <div class="mutedText">Complete your profile for smarter recommendations</div>
          <div class="mutedText">Upload documents when you're ready to apply</div>
        </div>
        <div class="authPreviewPanel" style="margin-top:14px;">
          ${renderLanyardCard({
            name: "Your Name",
            status: "Learner status: Pending verification",
            province: "Province: Optional during signup",
            educationLevel: "Education level badge"
          })}
        </div>
      </div>

      <div class="authCard">
        <h2>Sign Up</h2>
        <form id="signupForm" class="authForm">
          <div class="field">
            <label for="signupName"><b>Full Name</b></label>
            <input class="input" id="signupName" type="text" placeholder="Enter full name" required />
          </div>

          <div class="field">
            <label for="signupEmail"><b>Email</b></label>
            <input class="input" id="signupEmail" type="email" placeholder="you@example.com" required />
          </div>

          <div class="field">
            <label for="signupPassword"><b>Password</b></label>
            <input class="input" id="signupPassword" type="password" placeholder="Create password" required />
          </div>

          <div class="field">
            <label for="signupProvince"><b>Province (optional)</b></label>
            <select class="input select" id="signupProvince">
              <option value="">Select province (optional)</option>
              ${PROVINCES.map((province) => `<option value="${province}">${province}</option>`).join("")}
            </select>
          </div>

          <div class="field">
            <label for="signupEducation"><b>Education Level (optional)</b></label>
            <input class="input" id="signupEducation" type="text" placeholder="e.g. NCV Level 4" />
          </div>

          <div id="signupError" class="mutedText" style="min-height:20px;"></div>

          <button class="btn btnPrimary" type="submit">Create Account</button>
          <a class="btn btnGhost" href="#/login">Login</a>
        </form>
      </div>
    </section>
  </div>`);

  const form = node.querySelector("#signupForm");
  const errorEl = node.querySelector("#signupError");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    errorEl.textContent = "";

    const fullName = String(node.querySelector("#signupName")?.value || "").trim();
    const email = String(node.querySelector("#signupEmail")?.value || "").trim();
    const password = String(node.querySelector("#signupPassword")?.value || "");
    const province = String(node.querySelector("#signupProvince")?.value || "").trim();
    const educationLevel = String(node.querySelector("#signupEducation")?.value || "").trim();

    const result = signupStudentAccount({
      fullName,
      email,
      password,
      province,
      educationLevel
    });

    if (!result.ok) {
      errorEl.textContent = result.error;
      return;
    }

    navigate("/student/onboarding");
  });

  setupRevealAnimation(node, "[data-reveal='true']");
  return node;
}

// Student onboarding form render and profile save event handling.

function pageStudentOnboarding() {
  const user = requireRole("student");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const profile = user.profile || {
    fullName: user.name || "",
    age: "",
    province: "",
    educationLevel: "",
    interests: [],
    goals: ""
  };

  const node = el(`<div class="grid">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Learner Onboarding</h1>
      <p class="mutedText" style="margin:8px 0 0;">Complete your profile for smarter recommendations. Upload documents when you're ready to apply.</p>
    </div>

    <div class="card onboardingFlowCard">
      ${renderStepper(["Sign up", "Complete profile", "Upload documents when ready", "Apply to opportunities"], 2, { className: "ydhStepper--compact" })}
    </div>

    <div class="card">
      <form id="form">
        <div class="field">
          <label><b>Full name *</b></label>
          <input class="input" id="fullName" value="${escapeHtml(profile.fullName)}" required />
        </div>
        <div class="field">
          <label><b>Age (optional)</b></label>
          <input class="input" id="age" value="${escapeHtml(profile.age)}" placeholder="e.g. 21" />
        </div>
        <div class="field">
          <label><b>Province (optional)</b></label>
          <select class="input select" id="province">
            <option value="">Select province (optional)</option>
            ${PROVINCES.map(
              (province) => `<option ${profile.province === province ? "selected" : ""} value="${province}">${province}</option>`
            ).join("")}
          </select>
        </div>
        <div class="field">
          <label><b>Education level (optional)</b></label>
          <input class="input" id="education" value="${escapeHtml(profile.educationLevel)}" placeholder="e.g. Grade 12, NCV Level 4" />
        </div>
        <div class="field">
          <label><b>Career goals (optional)</b></label>
          <textarea class="input" id="goals" rows="3" placeholder="Tell us what you want to achieve.">${escapeHtml(profile.goals || "")}</textarea>
        </div>
        <div class="field">
          <label><b>Career interests (optional)</b></label>
          <div class="grid cols-2">
            ${INTERESTS.map((interest) => {
              const checked = profile.interests.includes(interest) ? "checked" : "";
              return `<label class="card" style="padding:10px; display:flex; gap:10px; align-items:center;">
                <input type="checkbox" value="${interest}" ${checked} /> ${interest}
              </label>`;
            }).join("")}
          </div>
        </div>
        <div id="error" class="mutedText"></div>
        <div style="margin-top:12px;" class="row">
          <button class="btn btnPrimary" type="submit">Save profile</button>
          <a class="btn btnGhost" href="#/student/dashboard">Skip for now</a>
        </div>
      </form>
    </div>
  </div>`);

  node.querySelector("#form").onsubmit = (event) => {
    event.preventDefault();

    const fullName = node.querySelector("#fullName").value.trim();
    const age = node.querySelector("#age").value.trim();
    const province = node.querySelector("#province").value;
    const educationLevel = node.querySelector("#education").value.trim();
    const goals = node.querySelector("#goals").value.trim();
    const interests = Array.from(node.querySelectorAll('input[type="checkbox"]:checked')).map((checkbox) => checkbox.value);

    const error = node.querySelector("#error");
    error.textContent = "";

    if (!fullName) {
      error.textContent = "Full name is required.";
      return;
    }

    saveProfile({ fullName, age, province, educationLevel, goals, interests });
    navigate("/student/dashboard");
  };

  return shell("student", node);
}

function getStudentListingConfig(listingKey) {
  if (listingKey === "bursaries") {
    return {
      title: "Bursaries",
      subtitle: "Browse available bursary opportunities and apply with your profile.",
      typeFilter: ["Bursary"]
    };
  }

  if (listingKey === "learnerships") {
    return {
      title: "Learnerships / Internships",
      subtitle: "Browse workplace-based opportunities from SETAs, employers, and partners.",
      typeFilter: ["Learnership", "Internship"]
    };
  }

  return {
    title: "Courses",
    subtitle: "Browse TVET and skills programmes aligned to your interests.",
    typeFilter: ["Course"]
  };
}

function closingDateSortValue(value) {
  if (!value || value === "Rolling") return Number.POSITIVE_INFINITY;
  const timestamp = new Date(value).getTime();
  return Number.isFinite(timestamp) ? timestamp : Number.POSITIVE_INFINITY;
}

function daysUntilDate(value) {
  if (!value || value === "Rolling") return null;
  const timestamp = new Date(value).getTime();
  if (!Number.isFinite(timestamp)) return null;
  const diff = timestamp - Date.now();
  return Math.ceil(diff / 86400000);
}

function renderRequiredDocumentsChecklist(studentId, opportunityType, showManageLink = true) {
  const checklist = getDocumentChecklist(studentId, opportunityType);
  const rows = [
    { label: "ID Copy", uploaded: checklist.hasIdCopy, required: true },
    {
      label: "Academic Document (Matric/Report OR Transcript)",
      uploaded: checklist.hasAcademic,
      required: true
    }
  ];

  if (opportunityType === "Bursary") {
    rows.push({
      label: "Proof of Income",
      uploaded: checklist.hasProofOfIncome,
      required: false
    });
  }

  return `<div class="card dashboardDocumentsCard documentsChecklistCard">
    <div class="row documentsCardHeader" style="justify-content:space-between;">
      <div class="documentsCardTitle">Required documents checklist</div>
      <span class="badge ${checklist.complete ? "badgeGreen" : "badgeOrange"}">${checklist.complete ? "Documents Complete" : "Documents Incomplete"}</span>
    </div>

    <div class="desktopOnly" style="margin-top:10px;">
      <table class="table documentsTable">
        <thead>
          <tr><th>Requirement</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (row) => `<tr>
            <td>${escapeHtml(row.label)} ${row.required ? "<span class=\"mutedText\" style=\"font-size:12px;\">(Required)</span>" : "<span class=\"mutedText\" style=\"font-size:12px;\">(Optional)</span>"}</td>
            <td>${row.uploaded ? "Yes" : "No"}</td>
          </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>

    <div class="mobileList mobileOnly" style="margin-top:10px;">
      ${rows
        .map(
          (row) => `<div class="mobileListCard documentsMobileCard">
            <div style="font-weight:700;">${escapeHtml(row.label)}</div>
            <div class="mutedText" style="font-size:12px;">${row.required ? "Required" : "Optional"}</div>
            <div><span class="badge ${row.uploaded ? "badgeGreen" : "badgeOrange"}">${row.uploaded ? "Uploaded" : "Missing"}</span></div>
          </div>`
        )
        .join("")}
    </div>
    ${
      showManageLink
        ? `<div class="row" style="margin-top:10px;">
            <a class="btn btnPrimary" href="#/student/documents">Upload / manage documents</a>
          </div>`
        : ""
    }
  </div>`;
}

function getStudentNotifications(studentId) {
  const bucket = store.notifications && Array.isArray(store.notifications[studentId]) ? store.notifications[studentId] : [];
  return [...bucket].sort((first, second) => String(second.createdAt || '').localeCompare(String(first.createdAt || '')));
}

function addStudentNotification(studentId, message, type = 'info') {
  if (!studentId || !String(message || '').trim()) return;
  const currentBucket = store.notifications && Array.isArray(store.notifications[studentId]) ? store.notifications[studentId] : [];
  const nextBucket = [
    {
      id: uid('note'),
      studentId,
      message: String(message).trim(),
      type: String(type || 'info').trim() || 'info',
      createdAt: new Date().toISOString()
    },
    ...currentBucket
  ].slice(0, 12);

  store.notifications = {
    ...(store.notifications && typeof store.notifications === 'object' ? store.notifications : {}),
    [studentId]: nextBucket
  };
  saveStore(store);
}

function isOpportunitySaved(studentId, opportunityId) {
  if (!studentId || !opportunityId) return false;
  const bucket = store.savedOpportunities && Array.isArray(store.savedOpportunities[studentId])
    ? store.savedOpportunities[studentId]
    : [];
  return bucket.includes(opportunityId);
}

function toggleSavedOpportunity(studentId, opportunityId) {
  if (!studentId || !opportunityId) return false;
  const bucket = store.savedOpportunities && Array.isArray(store.savedOpportunities[studentId])
    ? [...store.savedOpportunities[studentId]]
    : [];
  const existingIndex = bucket.indexOf(opportunityId);
  let saved = false;

  if (existingIndex === -1) {
    bucket.unshift(opportunityId);
    saved = true;
  } else {
    bucket.splice(existingIndex, 1);
  }

  store.savedOpportunities = {
    ...(store.savedOpportunities && typeof store.savedOpportunities === 'object' ? store.savedOpportunities : {}),
    [studentId]: bucket
  };
  saveStore(store);
  return saved;
}

function bindStudentOpportunityCardActions(scopeNode, user, onRefresh) {
  if (!scopeNode || !user || user.role !== 'student') return;

  scopeNode.querySelectorAll('[data-save-opp]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const opportunityId = String(button.getAttribute('data-save-opp') || '').trim();
      if (!opportunityId) return;
      const saved = toggleSavedOpportunity(user.id, opportunityId);
      button.classList.toggle('is-saved', saved);
      button.textContent = saved ? 'Saved' : 'Save';
      if (typeof onRefresh === 'function') onRefresh();
    });
  });
}

function bindOpportunityProfileCardActions(scopeNode, user, onRefresh) {
  if (!scopeNode || !user || user.role !== 'student') return;

  const card = scopeNode.querySelector('[data-rc-profile-card="true"]');
  if (!card) return;

  const fileInput = card.querySelector('[data-rc-file-input="true"]');
  const bgImage = card.querySelector('[data-rc-bg-image="true"]');
  const bgGradient = card.querySelector('[data-rc-bg-gradient="true"]');
  const emptyPrompt = card.querySelector('[data-rc-empty-prompt="true"]');
  const photoActions = card.querySelector('[data-rc-photo-actions="true"]');
  const uploadButton = card.querySelector('[data-rc-upload-main="true"]');
  const changeButton = card.querySelector('[data-rc-change-photo="true"]');
  const removeButton = card.querySelector('[data-rc-remove-photo="true"]');
  const shareButton = card.querySelector('[data-rc-share-profile="true"]');
  const validTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

  if (!fileInput || !bgImage || !bgGradient || !emptyPrompt || !photoActions) return;

  const openPicker = () => fileInput.click();

  const syncEmptyState = (hasImage) => {
    bgGradient.style.opacity = hasImage ? '0' : '1';
    bgImage.style.display = hasImage ? 'block' : 'none';
    emptyPrompt.style.display = hasImage ? 'none' : 'flex';
    photoActions.style.display = hasImage ? 'flex' : 'none';
  };

  const handleLoadedImage = async (file) => {
    if (!file || !validTypes.has(String(file.type || '').trim())) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      const meta = {
        fileName: file.name,
        fileType: inferFileType(file),
        fileSize: file.size,
        uploadedAt: new Date().toISOString()
      };
      setStudentProfilePhoto(user.id, dataUrl, meta);
      if (typeof onRefresh === 'function') onRefresh();
    } catch (_error) {
      // Ignore file-read failures to preserve current screen state.
    }
  };

  uploadButton?.addEventListener('click', openPicker);
  changeButton?.addEventListener('click', openPicker);
  removeButton?.addEventListener('click', () => {
    setStudentProfilePhoto(user.id, '', null);
    if (typeof onRefresh === 'function') onRefresh();
  });

  shareButton?.addEventListener('click', async () => {
    const shareTitle = 'Youth Digital Hub profile';
    const shareText = 'See my opportunity profile on Youth Digital Hub.';
    try {
      if (navigator.share) {
        await navigator.share({ title: shareTitle, text: shareText, url: location.href });
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(location.href);
      }
    } catch (_error) {
      // Ignore share failures.
    }
  });

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files && event.target.files[0];
    handleLoadedImage(file);
    fileInput.value = '';
  });

  card.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  card.addEventListener('drop', (event) => {
    event.preventDefault();
    const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
    handleLoadedImage(file);
  });

  syncEmptyState(Boolean(String(bgImage.getAttribute('src') || '').trim()));
}

function pageStudentApplication(id) {
  const user = requireRole('student');
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const application = studentApplications(user.id).find((entry) => entry.id === id) || null;
  if (!application) {
    return shell('student', el(`<div class="grid"><div class="card"><div><b>Application not found.</b></div><div class="row" style="margin-top:12px;"><a class="btn btnGhost" href="#/student/dashboard">Back to dashboard</a></div></div></div>`));
  }

  const opportunity = getOpportunity(application.opportunityId) || {
    id: application.opportunityId,
    title: application.opportunityTitle || 'Opportunity',
    institution: application.institution || 'Provider',
    type: application.opportunityType || 'Opportunity',
    location: '',
    requirements: []
  };

  if (normalizeApplicationStatus(application.status, 'draft') === 'draft') {
    return pageStudentApply(opportunity.id);
  }

  const lifecycle = getOpportunityLifecycleState(application);
  const progressState = buildApplicationProgressState(user, opportunity, application);
  const checklist = getDocumentChecklist(user.id, opportunity.type);

  const node = el(`<div class="grid">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Application View</h1>
      <p class="mutedText" style="margin:8px 0 0;">Review your submitted application and next steps.</p>
    </div>

    <div class="card">
      <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
        <div>
          <div class="dashboardSectionMeta">${escapeHtml(opportunity.type || 'Opportunity')}</div>
          <h2 style="margin:6px 0 0;">${escapeHtml(opportunity.title || 'Opportunity')}</h2>
          <div class="mutedText" style="margin-top:6px;">${escapeHtml(opportunity.institution || application.institution || 'Provider')}</div>
        </div>
        <span class="${lifecycle.statusClass}">${escapeHtml(lifecycle.statusLabel)}</span>
      </div>

      <div style="margin-top:14px;">${renderApplicationProgressStepper(progressState, '')}</div>

      <div class="grid cols-2" style="margin-top:14px;">
        <div><b>Submitted</b><div>${escapeHtml(formatDate(application.submittedAt || application.createdAt))}</div></div>
        <div><b>Documents ready</b><div>${checklist.complete ? 'Yes' : 'No'}</div></div>
        <div><b>Opportunity type</b><div>${escapeHtml(opportunity.type || application.opportunityType || '')}</div></div>
        <div><b>Location</b><div>${escapeHtml(opportunity.location || 'National')}</div></div>
      </div>

      <div class="row" style="margin-top:16px;">
        <a class="btn btnPrimary" href="#/student/opportunity/${escapeHtml(opportunity.id)}">View opportunity</a>
        <a class="btn btnGhost" href="#/student/dashboard">Back to dashboard</a>
      </div>
    </div>
  </div>`);

  return shell('student', node);
}
function pageStudentBursaries() {
  return pageStudentListing("bursaries");
}

function pageStudentLearnerships() {
  return pageStudentListing("learnerships");
}

function pageStudentCourses() {
  return pageStudentListing("courses");
}

// Student opportunity detail page render for full programme information before apply flow.
function pageStudentOpportunityDetails(id) {
  const user = requireRole("student");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const opportunity = getOpportunity(id);
  if (!opportunity) {
    return shell(
      "student",
      el(`<div class="card">
        <div><b>Opportunity not found.</b></div>
        <div class="row" style="margin-top:10px;">
          <a class="btn btnPrimary" href="#/student/bursaries">Browse bursaries</a>
          <a class="btn btnGhost" href="#/student/learnerships">Browse learnerships/internships</a>
          <a class="btn btnGhost" href="#/student/courses">Browse courses</a>
        </div>
      </div>`)
    );
  }

  const backHref = routeForOpportunityType(opportunity.type);
  const recommended =
    user.profile && isOpportunityRecommended(opportunity, user.profile.interests || []);

  const node = el(`<div class="grid">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">${escapeHtml(opportunity.title)}</h1>
      <p class="mutedText" style="margin:8px 0 0;">${escapeHtml(opportunity.institution)}</p>
    </div>

    <div class="card">
      <div class="placeholder" style="height:180px;"></div>
      <div class="row" style="margin-top:12px;">
        <span class="badge ${opportunity.type === "Bursary" ? "badgePurple" : opportunity.type === "Course" ? "badgeBlue" : "badgeBlue"}">${escapeHtml(opportunity.type)}</span>
        ${recommended ? `<span class="badge badgeBlue">Recommended</span>` : ""}
      </div>

      <div class="grid cols-2" style="margin-top:12px;">
        <div><b>Institution / Partner</b><div>${escapeHtml(opportunity.institution)}</div></div>
        <div><b>Location</b><div>${escapeHtml(opportunity.location)}</div></div>
        <div><b>Sector</b><div>${escapeHtml(resolveOpportunitySector(opportunity))}</div></div>
        <div><b>Closing Date</b><div>${formatDateLabel(opportunity.closingDate)}</div></div>
        <div><b>Stipend / Value</b><div>${escapeHtml(opportunity.stipendOrValue || "-")}</div></div>
      </div>

      <div style="margin-top:14px;">
        <b>Description</b>
        <div class="mutedText" style="margin-top:6px;">${escapeHtml(opportunity.description || "No description provided.")}</div>
      </div>

      <div style="margin-top:14px;">
        <b>Requirements</b>
        <ul style="margin:8px 0 0 18px;">
          ${(Array.isArray(opportunity.requirements) && opportunity.requirements.length
            ? opportunity.requirements
            : ["No requirements specified."]
          )
            .map((requirement) => `<li>${escapeHtml(requirement)}</li>`)
            .join("")}
        </ul>
      </div>

      <div class="row" style="margin-top:14px;">
        <a class="btn btnPrimary" href="#/student/apply/${opportunity.id}">Apply</a>
        <a class="btn btnGhost" href="#${backHref}">Back</a>
      </div>
    </div>
  </div>`);

  return shell("student", node);
}
function renderChecklistTable(studentId) {
  const checklist = getDocumentChecklist(studentId);
  const categories = [
    "ID Copy",
    "Matric Certificate / School Report",
    "TVET Transcript",
    "Other Transcript",
    "Proof of Income"
  ];

  return `<div class="card documentsChecklistCard documentsChecklistCard--page">
    <div class="row documentsCardHeader" style="justify-content:space-between;">
      <div class="documentsCardTitle">Documents checklist</div>
      <span class="badge ${checklist.complete ? "badgeGreen" : "badgeOrange"}">${checklist.complete ? "Documents Complete" : "Documents Incomplete"}</span>
    </div>

    <div class="desktopOnly" style="margin-top:10px;">
      <table class="table documentsTable">
        <thead>
          <tr><th>Category</th><th>Uploaded</th></tr>
        </thead>
        <tbody>
          ${categories
            .map((category) => `<tr>
              <td>${escapeHtml(category)} ${
                category === "Proof of Income" ? `<span class="mutedText" style="font-size:12px;">(Optional for bursaries)</span>` : ""
              }</td>
              <td>${checklist.byCategory.find((item) => item.category === category)?.uploaded ? "Yes" : "No"}</td>
            </tr>`)
            .join("")}
        </tbody>
      </table>
    </div>

    <div class="mobileList mobileOnly" style="margin-top:10px;">
      ${categories
        .map((category) => {
          const uploaded = checklist.byCategory.find((item) => item.category === category)?.uploaded;
          return `<div class="mobileListCard documentsMobileCard">
            <div style="font-weight:700;">${escapeHtml(category)}</div>
            ${category === "Proof of Income" ? `<div class="mutedText" style="font-size:12px;">Optional for bursaries</div>` : ""}
            <div><span class="badge ${uploaded ? "badgeGreen" : "badgeOrange"}">${uploaded ? "Uploaded" : "Missing"}</span></div>
          </div>`;
        })
        .join("")}
    </div>

    <div class="row" style="margin-top:10px;">
      <a class="btn btnPrimary" href="#/student/documents">Upload / manage documents</a>
    </div>
  </div>`;
}

// Student document upload/manage page (metadata + preview handling + remove actions).
function pageStudentDocuments() {
  const user = requireRole("student");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const documents = getStudentDocuments(user.id);
  const profile = getUserProfile(user) || {};
  const displayName = getUserDisplayName(user);

  const node = el(`<div class="grid">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Documents</h1>
      <p class="mutedText" style="margin:8px 0 0;">Upload supporting documents for your applications (demo metadata only).</p>
    </div>

    <div class="card documentsIdentityCard profileSummaryCard">
      ${renderUserAvatar(user, "avatarLg")}
      <div style="min-width:0;">
        <div style="font-weight:800; font-size:18px; line-height:1.2;">${escapeHtml(displayName)}</div>
        <div class="mutedText" style="font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(user.email || profile.email || "")}</div>
      </div>
    </div>

    ${renderChecklistTable(user.id)}

    <div class="card documentsUploadCard">
      <form id="uploadForm">
        <div class="field">
          <label><b>Document category *</b></label>
          <select class="input select" id="docCategory" required>
            ${DOC_CATEGORIES.map((category) => `<option value="${category}">${category}</option>`).join("")}
          </select>
        </div>

        <div class="field">
          <label><b>Select file *</b></label>
          <input class="input" id="docFile" type="file" accept=".png,.jpg,.jpeg,.pdf" required />
        </div>

        <div id="uploadError" class="mutedText"></div>

        <div class="row" style="margin-top:12px;">
          <button class="btn btnPrimary" type="submit">Upload document</button>
        </div>
      </form>
    </div>

    <div class="card documentsLibraryCard">
      <div class="documentsCardTitle">Uploaded documents</div>
      ${documents.length
        ? `<div>
            <div class="desktopOnly" style="margin-top:10px;">
              <table class="table documentsTable documentsTable--library">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Filename</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Preview</th>
                    <th>Uploaded</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${documents
                    .map(
                      (document) => `<tr>
                      <td>${escapeHtml(document.category)}</td>
                      <td>${escapeHtml(document.filename)}</td>
                      <td>${escapeHtml(document.fileType || inferFileType(document))}</td>
                      <td>${formatBytes(document.size || 0)}</td>
                      <td>${
                        document.previewDataUrl
                          ? `<img src="${document.previewDataUrl}" alt="preview" style="width:70px; height:50px; object-fit:cover; border:1px solid var(--color-border);" />`
                          : "-"
                      }</td>
                      <td>${formatDate(document.uploadedAt)}</td>
                      <td><button type="button" class="btn btnGhost" data-remove-doc="${document.id}" style="padding:6px 10px;">Remove</button></td>
                    </tr>`
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
            <div class="mobileList mobileOnly" style="margin-top:10px;">
              ${documents
                .map(
                  (document) => `<div class="mobileListCard documentsMobileCard">
                    <div style="font-weight:700;">${escapeHtml(document.category)}</div>
                    <div>${escapeHtml(document.filename)}</div>
                    <div class="mutedText" style="font-size:12px;">${escapeHtml(document.fileType || inferFileType(document))} • ${formatBytes(document.size || 0)}</div>
                    <div class="mutedText" style="font-size:12px;">Uploaded: ${formatDate(document.uploadedAt)}</div>
                    ${
                      document.previewDataUrl
                        ? `<img src="${document.previewDataUrl}" alt="preview" style="width:100%; max-width:140px; height:88px; object-fit:cover; border:1px solid var(--color-border); border-radius:10px;" />`
                        : ""
                    }
                    <div class="row" style="margin-top:6px;">
                      <button type="button" class="btn btnGhost" data-remove-doc="${document.id}">Remove</button>
                    </div>
                  </div>`
                )
                .join("")}
            </div>
          </div>`
        : `<div class="mutedText" style="margin-top:10px;">No documents uploaded yet.</div>`}
    </div>
  </div>`);

  const uploadForm = node.querySelector("#uploadForm");
  const uploadError = node.querySelector("#uploadError");

  uploadForm.onsubmit = async (event) => {
    event.preventDefault();
    uploadError.textContent = "";

    const category = node.querySelector("#docCategory").value;
    const fileInput = node.querySelector("#docFile");
    const file = fileInput.files && fileInput.files[0];

    const validationError = validateUploadFile(file);
    if (validationError) {
      uploadError.textContent = validationError;
      return;
    }

    const document = {
      id: uid("doc"),
      studentId: user.id,
      category,
      filename: file.name,
      fileType: inferFileType(file),
      size: file.size,
      uploadedAt: new Date().toISOString()
    };

    const isImage = ["image/png", "image/jpeg"].includes(document.fileType);
    if (isImage) {
      const previewDataUrl = await readImagePreview(file);
      if (previewDataUrl) {
        document.previewDataUrl = previewDataUrl;
      }
    }

    addDocument(document);
    render();
  };

  node.querySelectorAll("button[data-remove-doc]").forEach((button) => {
    button.addEventListener("click", () => {
      const documentId = button.getAttribute("data-remove-doc");
      removeDocument(documentId);
      render();
    });
  });

  return shell("student", node);
}

// Student application form page with checklist context and submit event handling.
function pageStudentApply(courseId) {
  const user = requireRole("student");
  if (!user) return el(`<div class="content">Redirecting...</div>`);
  if (!user.profile) {
    navigate("/student/onboarding");
    return el(`<div class="content">Redirecting...</div>`);
  }

  const opportunity = getOpportunity(courseId);
  if (!opportunity) return shell("student", el(`<div class="card">Opportunity not found.</div>`));

  let checklist = getDocumentChecklist(user.id, opportunity.type);
  let existingApplication = studentApplications(user.id).find((application) => application.opportunityId === opportunity.id) || null;
  let progressState = buildApplicationProgressState(user, opportunity, existingApplication);

  let editorOpen = false;
  let editorError = "";
  let editorNotice = "";
  let profileImpactNoticeVisible = false;
  let profileDraft = createInlineProfileEditorDraft(getUserProfile(user) || {}, user);
  let focusTrapCleanup = () => {};
  let toastTimer = null;
  let toastHideTimer = null;
  let lastEditorTrigger = null;

  const node = el(`<div class="grid applicationReviewPage">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Application Form</h1>
      <p class="mutedText" style="margin:8px 0 0;">Submitting application for: ${escapeHtml(opportunity.title)} (${escapeHtml(opportunity.type)})</p>
    </div>

    <div id="applyStepperMount"></div>

    <div class="card">
      <form id="form">
        <div class="card profileReviewCard card-accent-top is-guidance">
          <div class="row profileReviewHeader">
            <div>
              <h3 style="margin:0;">Profile summary</h3>
              <div class="mutedText" style="font-size:13px; margin-top:4px;">Keep profile details accurate before you submit.</div>
            </div>
            <button type="button" class="btn btnGhost profileEditTrigger" id="editProfileBtn" title="Update info">Edit profile</button>
          </div>

          <div id="profileFieldsMount"></div>
          <div class="mutedText profileImpactNotice" id="profileImpactNotice" ${profileImpactNoticeVisible ? "" : "hidden"}>Updates may change required documents for this application.</div>
        </div>

        <div id="requiredDocsMount"></div>
        <div id="docsIncompleteMount"></div>

        <div id="error" class="mutedText" style="margin-top:10px;"></div>

        <div class="row" style="margin-top:12px;">
          <button class="btn btnPrimary" type="submit">Submit application</button>
          <a class="btn btnGhost" href="#/student/opportunity/${opportunity.id}">Cancel</a>
        </div>
      </form>
    </div>

    <div id="inlineProfileEditorMount"></div>
    <div id="inlineProfileToast" class="inlineProfileToast" role="status" aria-live="polite" hidden></div>
    <div id="inlineProfileDialogAnnouncer" class="srOnly" aria-live="assertive"></div>
  </div>`);

  const getActiveUser = () => {
    const active = currentUser();
    return active && active.role === "student" ? active : user;
  };

  const arraysMatch = (first, second) => {
    const normalizedFirst = Array.isArray(first) ? [...first].sort() : [];
    const normalizedSecond = Array.isArray(second) ? [...second].sort() : [];
    if (normalizedFirst.length !== normalizedSecond.length) return false;
    return normalizedFirst.every((value, index) => value === normalizedSecond[index]);
  };

  const renderProfileField = (label, value, fieldKey) => `<div class="field profileReadonlyField">
    <div class="readonlyFieldHead">
      <label><b>${escapeHtml(label)}</b></label>
      <button type="button" class="inlineFieldEdit" data-open-inline-profile-editor="true" data-profile-field="${escapeHtml(fieldKey)}" title="Edit ${escapeHtml(label)}">Edit</button>
    </div>
    <input class="input" value="${escapeHtml(value || "Not set")}" readonly style="background:var(--color-primary-tint);" />
  </div>`;

  const renderIncompleteDocsNotice = () =>
    checklist.complete
      ? ""
      : `<div class="card" style="margin-top:10px; padding:12px; background:var(--color-primary-tint);">
          <b>Documents incomplete</b>
          <div class="mutedText" style="margin-top:6px;">You can still submit this demo application. Upload missing documents in the documents section.</div>
          <div class="row" style="margin-top:10px;">
            <a class="btn btnGhost" href="#/student/documents">Go to documents</a>
          </div>
        </div>`;

  const destroyFocusTrap = () => {
    if (typeof focusTrapCleanup === "function") {
      focusTrapCleanup();
    }
    focusTrapCleanup = () => {};
  };

  function showProfileToast(message) {
    const toast = node.querySelector("#inlineProfileToast");
    if (!toast) return;

    if (toastTimer) clearTimeout(toastTimer);
    if (toastHideTimer) clearTimeout(toastHideTimer);

    toast.textContent = message;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add("show"));

    toastTimer = window.setTimeout(() => {
      toast.classList.remove("show");
      toastHideTimer = window.setTimeout(() => {
        toast.hidden = true;
      }, 180);
    }, 2200);
  }

  function refreshApplyReviewPanels() {
    const activeUser = getActiveUser();
    const activeProfile = createInlineProfileEditorDraft(getUserProfile(activeUser) || {}, activeUser);
    if (!activeProfile.fullName) {
      activeProfile.fullName = getUserDisplayName(activeUser);
    }

    checklist = getDocumentChecklist(activeUser.id, opportunity.type);
    existingApplication = studentApplications(activeUser.id).find((application) => application.opportunityId === opportunity.id) || null;
    progressState = buildApplicationProgressState(activeUser, opportunity, existingApplication);

    const profileFieldsMount = node.querySelector("#profileFieldsMount");
    if (profileFieldsMount) {
      profileFieldsMount.innerHTML = [
        renderProfileField("Full name", activeProfile.fullName, "fullName"),
        renderProfileField("Age", activeProfile.age, "age"),
        renderProfileField("Province", activeProfile.province, "province"),
        renderProfileField("Education level", activeProfile.educationLevel, "educationLevel"),
        renderProfileField("Interests", activeProfile.interests.join(", "), "interests")
      ].join("\n");

      profileFieldsMount.querySelectorAll("[data-open-inline-profile-editor]").forEach((button) => {
        button.addEventListener("click", (event) => {
          openEditor(event.currentTarget);
        });
      });
    }

    const stepperMount = node.querySelector("#applyStepperMount");
    if (stepperMount) {
      stepperMount.innerHTML = renderApplicationProgressStepper(progressState, "form");
    }

    const docsMount = node.querySelector("#requiredDocsMount");
    if (docsMount) {
      docsMount.innerHTML = renderRequiredDocumentsChecklist(activeUser.id, opportunity.type);
    }

    const docsIncompleteMount = node.querySelector("#docsIncompleteMount");
    if (docsIncompleteMount) {
      docsIncompleteMount.innerHTML = renderIncompleteDocsNotice();
    }

    const impactNotice = node.querySelector("#profileImpactNotice");
    if (impactNotice) {
      impactNotice.hidden = !profileImpactNoticeVisible;
    }
  }

  function closeEditor() {
    editorOpen = false;
    editorError = "";
    editorNotice = "";
    renderInlineEditor();

    if (lastEditorTrigger && typeof lastEditorTrigger.focus === "function") {
      requestAnimationFrame(() => {
        lastEditorTrigger.focus();
      });
    }
  }

  function openEditor(triggerElement = null) {
    const activeUser = getActiveUser();
    editorDraft = createInlineProfileEditorDraft(getUserProfile(activeUser) || {}, activeUser);
    if (!editorDraft.fullName) {
      editorDraft.fullName = getUserDisplayName(activeUser);
    }

    editorError = "";
    editorNotice = "";
    editorOpen = true;
    lastEditorTrigger = triggerElement || document.activeElement;
    renderInlineEditor();

    const announcer = node.querySelector("#inlineProfileDialogAnnouncer");
    if (announcer) {
      announcer.textContent = "Edit profile dialog opened";
    }
  }

  function readEditorDraftFromForm(form) {
    const fullName = String(form.querySelector("#inlineProfileFullName")?.value || "").trim();
    const age = String(form.querySelector("#inlineProfileAge")?.value || "").trim();
    const province = String(form.querySelector("#inlineProfileProvince")?.value || "").trim();
    const educationLevel = String(form.querySelector("#inlineProfileEducation")?.value || "").trim();
    const interests = Array.from(form.querySelectorAll('.inlineProfileInterestsGrid input[type="checkbox"]:checked'))
      .map((checkbox) => String(checkbox.value || "").trim())
      .filter(Boolean);

    return {
      fullName,
      age,
      province,
      educationLevel,
      interests
    };
  }

  function validateEditorDraft(draft) {
    if (!draft.age || !draft.province || !draft.educationLevel || !draft.interests.length) {
      return "Age, province, education level, and at least one interest are required. Clearing these fields may affect eligibility.";
    }

    const ageNumber = Number(draft.age);
    if (!Number.isFinite(ageNumber) || ageNumber < 14 || ageNumber > 100) {
      return "Enter a valid age between 14 and 100.";
    }

    return "";
  }

  function handleEditorSave(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const nextDraft = readEditorDraftFromForm(form);
    editorDraft = nextDraft;

    const validationError = validateEditorDraft(nextDraft);
    if (validationError) {
      editorError = validationError;
      editorNotice = "";
      renderInlineEditor();
      return;
    }

    const activeUser = getActiveUser();
    const existingProfile = getUserProfile(activeUser) || {};
    const previousDraft = createInlineProfileEditorDraft(existingProfile, activeUser);

    const criticalFieldsChanged =
      String(previousDraft.age || "") !== String(nextDraft.age || "") ||
      String(previousDraft.province || "") !== String(nextDraft.province || "") ||
      String(previousDraft.educationLevel || "") !== String(nextDraft.educationLevel || "") ||
      !arraysMatch(previousDraft.interests || [], nextDraft.interests || []);

    const scrollTop = window.scrollY;

    saveProfile({
      ...existingProfile,
      fullName: nextDraft.fullName || existingProfile.fullName || activeUser.name || "",
      age: nextDraft.age,
      province: nextDraft.province,
      educationLevel: nextDraft.educationLevel,
      interests: nextDraft.interests
    });

    profileImpactNoticeVisible = criticalFieldsChanged;
    editorOpen = false;
    editorError = "";
    editorNotice = "";

    renderInlineEditor();
    refreshApplyReviewPanels();
    showProfileToast("Profile updated");

    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollTop, behavior: "auto" });
    });
  }

  function renderInlineEditor() {
    const editorMount = node.querySelector("#inlineProfileEditorMount");
    if (!editorMount) return;

    destroyFocusTrap();

    editorMount.innerHTML = renderInlineProfileEditor({
      mode: "application-review",
      open: editorOpen,
      draft: editorDraft,
      error: editorError,
      notice: editorNotice
    });

    if (!editorOpen) return;

    const overlay = editorMount.querySelector("#inlineProfileEditorOverlay");
    const dialog = editorMount.querySelector("#inlineProfileEditorDialog");
    const closeButton = editorMount.querySelector("#inlineProfileCloseBtn");
    const cancelButton = editorMount.querySelector("#inlineProfileCancelBtn");
    const form = editorMount.querySelector("#inlineProfileEditorForm");
    const initialFocus = editorMount.querySelector("#inlineProfileFullName") || editorMount.querySelector("#inlineProfileAge");

    if (overlay) {
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
          closeEditor();
        }
      });
    }

    if (closeButton) closeButton.addEventListener("click", closeEditor);
    if (cancelButton) cancelButton.addEventListener("click", closeEditor);
    if (form) form.addEventListener("submit", handleEditorSave);

    focusTrapCleanup = activateDialogFocusTrap(dialog, closeEditor, initialFocus || dialog);
  }

  node.querySelector("#editProfileBtn")?.addEventListener("click", (event) => {
    openEditor(event.currentTarget);
  });

  node.querySelector("#form").onsubmit = (event) => {
    event.preventDefault();

    const result = submitApplication(opportunity.id, {
      docsComplete: checklist.complete,
      docsIncomplete: !checklist.complete
    });
    const error = node.querySelector("#error");
    if (error) error.textContent = "";

    if (!result.ok) {
      if (error) {
        error.textContent = result.error || "Unable to submit application.";
      }
      return;
    }

    navigate("/student/dashboard");
  };

  refreshApplyReviewPanels();
  renderInlineEditor();

  return shell("student", node);
}

// Student dashboard page render: applications table, profile settings, and quick actions.
// Student dashboard page render: restored from staged logic with focused layout repairs.
function pageStudentDashboard() {
  const user = requireRole("student");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const node = el(`<div class="grid studentDashboardV2">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Student Dashboard</h1>
      <p class="mutedText" style="margin:8px 0 0;">Track applications, manage required documents, and update your profile settings.</p>
    </div>
    <div id="studentDashboardRoot"></div>
  </div>`);

  const root = node.querySelector("#studentDashboardRoot");
  let activeTab = "all";
  let savedSettings = getStudentSettingsState(user);
  let draftSettings = { ...savedSettings };
  let settingsError = "";
  let settingsNotice = "";
  let initialScrollComplete = false;
  let dashboardSearchQuery = "";

  function getDashboardRows(studentId) {
    return studentApplications(studentId).map((application) => {
      const opportunity = getOpportunity(application.opportunityId);
      const opportunityType = OPPORTUNITY_TYPES.includes(application.opportunityType)
        ? application.opportunityType
        : opportunity?.type || "Course";
      const docsComplete =
        typeof application.docsComplete === "boolean"
          ? application.docsComplete
          : !Boolean(application.docsIncomplete);

      return {
        ...application,
        opportunityType,
        docsComplete,
        opportunityTitle: opportunity ? opportunity.title : "Unknown opportunity",
        institution: opportunity ? opportunity.institution : "Unknown institution"
      };
    });
  }

    function renderApplicationsSection(rows, recommendedSet) {
    const tableWrap = root.querySelector("#applicationTableWrap");
    if (!tableWrap) return;

    const filteredRows = rows.filter((row) => matchesOpportunityTypeFilter(row.opportunityType, activeTab));
    if (!filteredRows.length) {
      tableWrap.innerHTML = `<div class="mutedText">No applications in this category yet.</div>`;
      return;
    }

    const activeUser = currentUser() || user;
    tableWrap.innerHTML = `<div class="dashboardOpportunityGrid dashboardOpportunityGrid--dashboard" style="margin-top:4px;">
      ${filteredRows
        .map((row) => {
          const linkedOpportunity = getOpportunity(row.opportunityId) || {
            id: row.opportunityId,
            type: row.opportunityType,
            title: row.opportunityTitle,
            institution: row.institution,
            requirements: []
          };

          return renderStudentOpportunityCard(linkedOpportunity, {
            student: activeUser,
            application: row,
            recommended: Boolean(recommendedSet && recommendedSet.has(row.opportunityId))
          });
        })
        .join("")}
    </div>`;
  }

  function getRecommendedForDashboard(studentId) {
    const recommendedIds = recommendedIdsForStudent(studentId);
    let items = opportunities.filter((opportunity) => recommendedIds.has(opportunity.id)).slice(0, 4);
    if (!items.length) items = opportunities.slice(0, 4);
    return items;
  }

  function maybeScrollToDashboardView() {
    if (initialScrollComplete) return;
    initialScrollComplete = true;
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    const view = getMobileDashboardView();
    const targetId =
      view === "applications"
        ? "dashboardApplicationsSection"
        : view === "profile"
          ? "dashboardProfileSection"
          : "dashboardCareerSection";
    const target = root.querySelector(`#${targetId}`);
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }

  function renderDashboardContent() {
    const liveUser = currentUser() || store.users.find((entry) => entry.id === user.id) || user;
    const displayName = getUserDisplayName(liveUser);
    const rows = getDashboardRows(liveUser.id);
    const guidanceRecord = getCareerGuidanceRecord(liveUser.id, liveUser);
    const hasSavedGuidance = Boolean(guidanceRecord?.result?.topCategory);
    const profilePhotoMeta = draftSettings.profilePhotoMeta;
    const recommendations = getRecommendedForDashboard(liveUser.id);
    const applicationsThemeClass = getApplicationsTabTheme(activeTab);
    const profileChecks = [
      Boolean((draftSettings.firstName || "").trim()),
      Boolean((draftSettings.surname || "").trim()),
      Boolean((draftSettings.email || "").trim()),
      Boolean((draftSettings.password || "").trim()),
      Boolean(draftSettings.profilePhotoDataUrl || getUserPhotoDataUrl(liveUser))
    ];
    const profileCompletedCount = profileChecks.filter(Boolean).length;
    const profileTotalCount = profileChecks.length;
    const profileCompleteness = profileTotalCount ? Math.round((profileCompletedCount / profileTotalCount) * 100) : 0;
    const profileCompletenessTone = profileCompleteness >= 100 ? "complete" : profileCompleteness >= 50 ? "warning" : "danger";
    const profile = getUserProfile(liveUser) || {};
    const profileImage = draftSettings.profilePhotoDataUrl || getUserPhotoDataUrl(liveUser);
    const recommendedSet = recommendedIdsForStudent(liveUser.id);
    const recommendedMatchCount = recommendedSet.size || recommendations.length;
    const careerGoal = getOpportunityProfileCareerGoal(liveUser, guidanceRecord);
    const compactInterests = compactOpportunityProfileInterests(profile.interests || []);
    const careerProfileCard = renderOpportunityProfileCard({
      studentName: displayName,
      careerGoal,
      educationLevel: profile.educationLevel || "Complete your profile",
      interests: compactInterests,
      province: profile.province || "All provinces",
      matchCount: recommendedMatchCount,
      applicationCount: rows.length,
      profileCompletion: profileCompleteness,
      profileImage,
      uploadInputId: `dashboardProfileUpload-${liveUser.id}`
    });

    root.innerHTML = `
      <div class="card dashboardSearchCard">
        <form id="dashboardSearchForm" class="dashboardSearchBar">
          <div class="dashboardSearchField">
            <button class="dashboardSearchButton" id="dashboardSearchButton" type="submit" aria-label="Search opportunities">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
            <input class="input dashboardSearchInput" id="dashboardOpportunitySearch" value="${escapeHtml(dashboardSearchQuery)}" placeholder="Search bursaries, learnerships, courses..." />
          </div>
        </form>
        <div class="dashboardSearchResults" id="dashboardSearchResults" hidden></div>
      </div>

      <div class="card dashboardCareerCard" id="dashboardCareerSection">
        <div class="dashboardSectionMeta">Career Development</div>
        <h3 class="dashboardSectionTitle" style="margin-top:6px;">Build your profile and sharpen your matches</h3>
        <div class="dashboardCareerGrid" style="margin-top:12px; align-items:start;">
          <div class="dashboardCareerCardItem dashboardCareerCardItem--profile">
            ${careerProfileCard}
          </div>
          <div class="dashboardCareerCardItem">
            <div class="dashboardSectionMeta">Career Quiz</div>
            <h4 style="margin-top:6px;">${hasSavedGuidance ? 'Your guidance is ready' : 'Start your career quiz'}</h4>
            <p class="mutedText" style="margin-top:8px;">${hasSavedGuidance ? `Top category: ${escapeHtml(guidanceRecord.result.topCategory)}. Review your pathway and recommended opportunities.` : 'Answer a few questions to unlock smarter opportunity recommendations.'}</p>
            <div class="dashboardAlertStack" style="margin-top:12px;">
              <div class="dashboardAlertItem">Recommended matches: ${recommendedMatchCount}</div>
              <div class="dashboardAlertItem">Applications started: ${rows.length}</div>
              <div class="dashboardAlertItem">Profile completion: ${profileCompleteness}%</div>
            </div>
            <div class="dashboardActionRow">
              <a class="btn btnPrimary" href="#/student/career-guidance">${hasSavedGuidance ? 'Review quiz' : 'Start quiz'}</a>
              <a class="btn btnGhost" href="#/student/bursaries">Browse matches</a>
            </div>
          </div>
        </div>
      </div>

      <div class="card dashboardQuickHeader" id="dashboardHeroSection">
        <div class="row" style="justify-content:space-between; align-items:center; width:100%;">
          <div class="row" style="align-items:center; flex-wrap:nowrap; min-width:0;">
            ${renderUserAvatar(
              { ...liveUser, profile: { ...(getUserProfile(liveUser) || {}), profilePhotoDataUrl: profileImage } },
              'avatarLg'
            )}
            <div style="min-width:0;">
              <div class="mutedText" style="font-size:12px; text-transform:uppercase; letter-spacing:.04em;">Welcome back</div>
              <h2 style="margin:4px 0 0; line-height:1.1;">${escapeHtml(displayName)}</h2>
              <div class="mutedText" style="font-size:13px; margin-top:4px;">Keep your applications moving with the next best action.</div>
            </div>
          </div>
          <div class="dashboardQuickHeaderActions">
            <a class="btn btnPrimary" href="#/student/career-guidance">Career Guidance</a>
            <a class="btn btnGhost" href="#/student/bursaries">Browse Opportunities</a>
          </div>
        </div>
      </div>

      <div class="dashboardLayoutGrid" style="margin-top:16px;">
        <div class="dashboardPrimaryCol col-span-8">
          <div class="card dashboardCareerCard">
            <div class="dashboardSectionMeta">Recommended for you</div>
            <h3 class="dashboardSectionTitle" style="margin-top:6px;">Continue / Recommended</h3>
            <div class="dashboardOpportunityGrid dashboardOpportunityGrid--dashboard" style="margin-top:10px;">
              ${(() => {
                const applicationByOpportunity = new Map(rows.map((row) => [row.opportunityId, row]));
                return recommendations
                  .map((item) => renderStudentOpportunityCard(item, {
                    student: liveUser,
                    application: applicationByOpportunity.get(item.id) || null,
                    recommended: true
                  }))
                  .join('');
              })()}
            </div>
            <div class="mutedText" style="margin-top:10px; font-size:12px;">${hasSavedGuidance ? `Top quiz category: ${escapeHtml(guidanceRecord.result.topCategory)}` : 'Complete your career quiz for sharper recommendations.'}</div>
          </div>

          <div class="card applicationsSection ${applicationsThemeClass}" id="dashboardApplicationsSection">
            <div class="dashboardSectionMeta">My Applications</div>
            <h3 class="dashboardSectionTitle" style="margin-top:6px;">Track and continue</h3>
            <div class="tabs applicationTabs ${applicationsThemeClass}" id="applicationTabs" style="margin-top:12px;">
              <button class="tab ${activeTab === 'all' ? 'active' : ''}" data-tab="all" type="button">All</button>
              <button class="tab ${activeTab === 'Bursary' ? 'active' : ''}" data-tab="Bursary" type="button">Bursaries</button>
              <button class="tab ${activeTab === 'Learnership/Internship' ? 'active' : ''}" data-tab="Learnership/Internship" type="button">Learnerships</button>
              <button class="tab ${activeTab === 'Course' ? 'active' : ''}" data-tab="Course" type="button">Courses</button>
            </div>
            <div id="applicationTableWrap" style="margin-top:12px;"></div>
          </div>
        </div>

        <div class="dashboardSupportCol col-span-4">
          <div id="dashboardDocumentsSection">
            ${renderRequiredDocumentsChecklist(liveUser.id, '', true)}
          </div>

          <div class="card compactProfileCard dashboardProfileCard" id="dashboardProfileSection">
            <div class="profileSummaryCard">
              ${renderUserAvatar(
                { ...liveUser, profile: { ...(getUserProfile(liveUser) || {}), profilePhotoDataUrl: draftSettings.profilePhotoDataUrl || '' } },
                'avatarLg'
              )}
              <div style="min-width:0;">
                <div class="dashboardSectionMeta">Profile</div>
                <h3 style="margin-top:4px;">${escapeHtml(displayName)}</h3>
                <div class="mutedText" style="font-size:12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(liveUser.email || '')}</div>
              </div>
            </div>

            <div class="row" style="justify-content:space-between; margin-top:12px;">
              <div class="mutedText" style="font-size:12px; text-transform:uppercase; letter-spacing:.04em;">Profile completeness</div>
              <div class="profileCompletenessValue profileCompletenessValue--${profileCompletenessTone}" style="font-weight:700;">${profileCompleteness}%</div>
            </div>
            <div class="applicationProgressBar profileCompletenessBar profileCompletenessBar--${profileCompletenessTone}" style="margin-top:8px;">
              <div class="applicationProgressBarFill" style="width:${profileCompleteness}%;"></div>
            </div>
            <div class="mutedText" style="font-size:12px; margin-top:8px;">${profileCompletedCount} of ${profileTotalCount} profile items completed.</div>

            <details class="profileQuickEdit" style="margin-top:12px;" open>
              <summary>Quick edit profile</summary>
              <form id="studentSettingsForm" style="margin-top:12px;">
                <div class="grid cols-2">
                  <div class="field">
                    <label><b>First name</b></label>
                    <input class="input" id="settingFirstName" value="${escapeHtml(draftSettings.firstName || '')}" />
                  </div>
                  <div class="field">
                    <label><b>Surname</b></label>
                    <input class="input" id="settingSurname" value="${escapeHtml(draftSettings.surname || '')}" />
                  </div>
                </div>

                <div class="field">
                  <label><b>Email</b></label>
                  <input class="input" id="settingEmail" type="email" value="${escapeHtml(draftSettings.email || '')}" />
                </div>

                <div class="field">
                  <label><b>Password</b></label>
                  <input class="input" id="settingPassword" type="password" value="${escapeHtml(draftSettings.password || '')}" />
                </div>

                <div class="field">
                  <label><b>Profile photo (png/jpg/jpeg)</b></label>
                  <input class="input" id="settingPhoto" type="file" accept=".png,.jpg,.jpeg" />
                  ${profilePhotoMeta ? `<div class="mutedText" style="font-size:12px;">${escapeHtml(profilePhotoMeta.fileName || profilePhotoMeta.filename || 'photo')} • ${escapeHtml(profilePhotoMeta.fileType || '')} • ${formatBytes(profilePhotoMeta.fileSize || profilePhotoMeta.size || 0)} • ${formatDate(profilePhotoMeta.uploadedAt)}</div>` : `<div class="mutedText" style="font-size:12px;">No profile photo uploaded.</div>`}
                </div>

                <div class="row" style="margin-top:12px;">
                  <button type="submit" class="btn btnPrimary">Save changes</button>
                  <button type="button" class="btn btnGhost" id="settingsCancelBtn">Cancel</button>
                </div>

                <details class="dangerZone" style="margin-top:12px;">
                  <summary>Danger zone</summary>
                  <div class="row" style="margin-top:10px;">
                    <button type="button" class="btn btnDanger" id="settingsRemovePhotoBtn">Remove photo</button>
                  </div>
                </details>

                <div id="settingsError" class="mutedText" style="color: var(--color-danger); margin-top:8px;">${escapeHtml(settingsError)}</div>
                <div id="settingsNotice" class="mutedText" style="color: var(--color-primary); margin-top:4px;">${escapeHtml(settingsNotice)}</div>
              </form>
            </details>
          </div>
        </div>
      </div>
    `;

    renderApplicationsSection(rows, recommendedSet);
    bindStudentOpportunityCardActions(root, liveUser, renderDashboardContent);

    const searchInput = root.querySelector('#dashboardOpportunitySearch');
    const searchResults = root.querySelector('#dashboardSearchResults');
    const searchForm = root.querySelector('#dashboardSearchForm');
    const runDashboardSearch = () => {
      dashboardSearchQuery = String(searchInput?.value || '').trim();
      const query = dashboardSearchQuery.toLowerCase();
      if (!searchResults) return;
      if (!query) {
        searchResults.hidden = true;
        searchResults.innerHTML = '';
        return;
      }

      const matches = getOpportunityCatalogue()
        .filter((opportunity) => String(opportunity.listingStatus || 'open') === 'open')
        .filter((opportunity) => {
          const searchable = [
            opportunity.title,
            opportunity.institution,
            opportunity.provider,
            resolveOpportunitySector(opportunity),
            opportunity.focusArea,
            Array.isArray(opportunity.tags) ? opportunity.tags.join(' ') : ''
          ].join(' ').toLowerCase();
          return searchable.includes(query);
        })
        .slice(0, 6);

      searchResults.hidden = false;
      if (!matches.length) {
        searchResults.innerHTML = `<div class="dashboardSearchEmpty">No opportunities match your search yet.</div>`;
        return;
      }

      searchResults.innerHTML = matches.map((opportunity) => `
        <a class="dashboardSearchResult" href="#/student/opportunity/${opportunity.id}">
          <div class="dashboardSearchResultTop">
            <span class="badge ${getOpportunityTypeBadgeClass(opportunity.type)}">${escapeHtml(opportunity.type)}</span>
            <span class="dashboardSearchResultMeta">${escapeHtml(opportunity.location || 'National')}</span>
          </div>
          <div class="dashboardSearchResultTitle">${escapeHtml(opportunity.title)}</div>
          <div class="dashboardSearchResultMeta">${escapeHtml(opportunity.institution || opportunity.provider || 'Provider')} • ${escapeHtml(resolveOpportunitySector(opportunity) || 'General')}</div>
        </a>
      `).join('');
    };

    searchInput?.addEventListener('input', runDashboardSearch);
    searchForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      runDashboardSearch();
    });
    runDashboardSearch();

    const careerSection = root.querySelector('#dashboardCareerSection');
    if (careerSection) {
      bindOpportunityProfileCardActions(careerSection, liveUser, () => {
        savedSettings = getStudentSettingsState(currentUser() || liveUser);
        draftSettings = { ...savedSettings };
        renderDashboardContent();
      });
    }

    root.querySelectorAll('#applicationTabs button[data-tab]').forEach((tab) => {
      tab.addEventListener('click', () => {
        activeTab = tab.getAttribute('data-tab');
        renderDashboardContent();
      });
    });

    const settingsForm = root.querySelector('#studentSettingsForm');
    settingsForm.addEventListener('submit', (event) => {
      event.preventDefault();
      settingsError = '';
      settingsNotice = '';

      const firstName = root.querySelector('#settingFirstName').value.trim();
      const surname = root.querySelector('#settingSurname').value.trim();
      const email = root.querySelector('#settingEmail').value.trim();
      const password = root.querySelector('#settingPassword').value;

      const result = updateStudentSettings(liveUser.id, {
        ...draftSettings,
        firstName,
        surname,
        email,
        password
      });

      if (!result.ok) {
        settingsError = result.error || 'Unable to save settings.';
        renderDashboardContent();
        return;
      }

      savedSettings = getStudentSettingsState(result.user);
      draftSettings = { ...savedSettings };
      settingsNotice = 'Profile settings saved.';
      render();
    });

    root.querySelector('#settingsCancelBtn').addEventListener('click', () => {
      draftSettings = { ...savedSettings };
      settingsError = '';
      settingsNotice = 'Changes reverted.';
      renderDashboardContent();
    });

    root.querySelector('#settingsRemovePhotoBtn').addEventListener('click', () => {
      draftSettings.profilePhotoDataUrl = '';
      draftSettings.profilePhotoMeta = null;
      setStudentProfilePhoto(liveUser.id, '', null);
      savedSettings = {
        ...savedSettings,
        profilePhotoDataUrl: '',
        profilePhotoMeta: null
      };
      settingsError = '';
      settingsNotice = 'Profile photo removed.';
      render();
    });

    root.querySelector('#settingPhoto').addEventListener('change', async (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;

      const fileType = inferFileType(file);
      const allowedPhotoTypes = new Set(['image/png', 'image/jpeg']);
      if (!allowedPhotoTypes.has(fileType)) {
        settingsError = 'Profile photo must be png, jpg, or jpeg.';
        settingsNotice = '';
        renderDashboardContent();
        return;
      }

      try {
        const dataUrl = await readFileAsDataUrl(file);
        const meta = {
          fileName: file.name,
          fileType,
          fileSize: file.size,
          uploadedAt: new Date().toISOString()
        };
        draftSettings.profilePhotoDataUrl = dataUrl;
        draftSettings.profilePhotoMeta = meta;
        setStudentProfilePhoto(liveUser.id, dataUrl, meta);
        savedSettings = {
          ...savedSettings,
          profilePhotoDataUrl: dataUrl,
          profilePhotoMeta: meta
        };
        settingsError = '';
        settingsNotice = 'Profile photo updated.';
        render();
      } catch {
        settingsError = 'Could not read selected image.';
        settingsNotice = '';
        renderDashboardContent();
      }
    });

    maybeScrollToDashboardView();
  }

  renderDashboardContent();
  return shell('student', node);
}
function pageStudentCareerGuidance() {
  const user = requireRole("student");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const savedRecord = getCareerGuidanceRecord(user.id, user);

  const state = {
    mode:
      savedRecord && savedRecord.result && savedRecord.pathway
        ? "landing"
        : "quiz",
    step: 0,
    answers: savedRecord
      ? normalizeCareerQuizAnswers(savedRecord.answers, user)
      : getDefaultCareerQuizAnswers(user),
    result: savedRecord?.result || null,
    pathway: savedRecord?.pathway || null,
    savedAt: savedRecord?.savedAt || "",
    notice: "",
    error: "",
    docError: "",
    quizDirection: 0
  };

  const node = el(`<div class="grid">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Career Guidance</h1>
      <p class="mutedText" style="margin:8px 0 0;">Take a quick career match quiz and generate a practical pathway based on your profile.</p>
    </div>
    <div id="careerGuidanceRoot"></div>
  </div>`);

  const root = node.querySelector("#careerGuidanceRoot");

  function isQuestionAnswered(question) {
    const value = state.answers[question.id];
    if (question.type === "multi") return Array.isArray(value) && value.length > 0;
    return Boolean(String(value || "").trim());
  }

  function requiredAnswersValid() {
    return CAREER_QUIZ_QUESTIONS
      .filter((question) => question.required)
      .every((question) => isQuestionAnswered(question));
  }

  function updateMultiAnswer(questionId, optionValue) {
    const values = Array.isArray(state.answers[questionId]) ? [...state.answers[questionId]] : [];
    const existingIndex = values.indexOf(optionValue);
    if (existingIndex === -1) values.push(optionValue);
    else values.splice(existingIndex, 1);
    state.answers[questionId] = values;
  }

  function categoryColorClass(category, index) {
    if (category === "IT") return "careerColorBlue";
    if (category === "Engineering") return "careerColorPurple";
    if (category === "Business") return "careerColorLime";
    if (category === "Trades") return "careerColorOrange";
    if (category === "Science") return index % 2 === 0 ? "careerColorPurple" : "careerColorBlue";
    return "careerColorBlue";
  }

  function renderRecommendationsGroup(title, items) {
    if (!items.length) {
      return `<div class="card">
        <div style="font-weight:700;">${escapeHtml(title)}</div>
        <div class="mutedText" style="margin-top:6px;">No close matches found yet. Try widening province preferences by browsing all opportunities.</div>
      </div>`;
    }

    return `<div class="card">
      <div style="font-weight:700;">${escapeHtml(title)}</div>
      <div class="careerOpportunitiesGrid" style="margin-top:12px;">
        ${(() => {
          const applicationsByOpportunity = new Map(
            studentApplications(user.id).map((application) => [application.opportunityId, application])
          );
          return items
            .map((item) => {
              const application = applicationsByOpportunity.get(item.id) || null;
              const lifecycle = getOpportunityLifecycleState(application);
              const action = getOpportunityPrimaryAction(item.id, application, true, lifecycle);
              const days = daysUntilDate(item.closingDate);
              const closingSoon = Number.isFinite(days) && days >= 0 && days < 14;
              const progressSummary = getOpportunityProgressSummary(user, item, application);
              const cardClasses = [
                "careerOpportunityCard",
                "opportunityCard",
                getOpportunityCardTypeClass(item.type),
                lifecycle.cardVariantClass,
                !application ? "card-priority" : ""
              ]
                .filter(Boolean)
                .join(" ");

              return `<article class="${cardClasses}">
                <div class="opportunityCardLayout">
                  <div class="opportunityCardMain">
                    <div class="row" style="justify-content:space-between; align-items:flex-start;">
                      <span class="badge ${getOpportunityTypeBadgeClass(item.type)}">${escapeHtml(item.type)}</span>
                      ${!application ? `<span class="badge recommendedFlag">Recommended</span>` : ""}
                    </div>
                    <h3 class="opportunityTitle">${escapeHtml(item.title)}</h3>
                    <p class="opportunityOrg">${escapeHtml(item.institution)}</p>
                    <div class="opportunityMetaStack">
                      <div class="opportunityMetaRow"><span>Type</span><b>${escapeHtml(item.type)}</b></div>
                      <div class="opportunityMetaRow"><span>Closing</span><b>${formatDateLabel(item.closingDate)}</b></div>
                      <div class="opportunityMetaRow"><span>Submitted</span><b>${application ? formatDate(application.createdAt) : "Not started"}</b></div>
                    </div>
                    <div class="mutedText progressSummaryText">Progress: ${progressSummary.label}</div>
                    ${closingSoon ? `<span class="closingSoon">Closing soon</span>` : ""}
                    ${
                      lifecycle.isInProgress
                        ? `<div class="progressMicro"><div class="progressMicroFill" style="--progress-width:${application?.docsComplete ? "82%" : "58%"};"></div></div>`
                        : ""
                    }
                  </div>
                  <div class="opportunityCardActions">
                    <span class="${lifecycle.statusClass}">${lifecycle.statusLabel}</span>
                    <a class="btn btnPrimary" href="${action.href}">${action.label}</a>
                  </div>
                </div>
              </article>`;
            })
            .join("");
        })()}
      </div>
    </div>`;
  }

  function renderPathwayPanel() {
    if (!state.pathway || !state.result) return "";

    const documentStatus = getCareerGuidanceDocumentStatus(user.id);
    const bucket = documentStatus.bucket;
    const flattenedCareerDocs = CAREER_GUIDANCE_DOC_CATEGORIES.flatMap((category) =>
      (bucket[category] || []).map((item) => ({ ...item, category }))
    ).sort((first, second) => second.uploadedAt.localeCompare(first.uploadedAt));

    return `<div class="careerTwoCol" style="margin-top:16px;">
      <div class="card">
        <div class="row" style="justify-content:space-between;">
          <div>
            <div class="mutedText" style="font-size:12px; text-transform:uppercase; letter-spacing:.04em;">Your Pathway</div>
            <h2 style="margin-top:4px;">${escapeHtml(state.pathway.title)}</h2>
          </div>
          <span class="badge badgeBlue">${escapeHtml(state.result.topCategory)} Focus</span>
        </div>

        <div class="careerStageGrid" style="margin-top:12px;">
          ${state.pathway.stages
            .map(
              (stage, index) => `<div class="careerStageCard">
                <div class="row" style="justify-content:space-between;">
                  <div style="font-weight:700;">${escapeHtml(stage.title)}</div>
                  <span class="badge ${index === 0 ? "badgePurple" : index === 1 ? "badgeBlue" : "badgeGreen"}">Stage ${index + 1}</span>
                </div>
                <ul style="margin:10px 0 0 18px;">
                  ${stage.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                </ul>
                <div style="margin-top:12px;">
                  <a class="btn btnPrimary" href="#${stage.actionHref}">${escapeHtml(stage.actionLabel)}</a>
                </div>
              </div>`
            )
            .join("")}
        </div>
      </div>

      <div class="card">
        <div class="row" style="justify-content:space-between;">
          <div style="font-weight:700;">Documents checklist</div>
          <a class="btn btnGhost" href="#/student/documents">Open Documents</a>
        </div>

        <table class="table" style="margin-top:10px;">
          <thead><tr><th>Document</th><th>Status</th></tr></thead>
          <tbody>
            ${CAREER_GUIDANCE_DOC_CATEGORIES.map(
              (category) => `<tr>
                <td>${escapeHtml(category)}</td>
                <td><span class="badge ${documentStatus.statusMap[category] ? "badgeGreen" : "badgeOrange"}">${documentStatus.statusMap[category] ? "Uploaded" : "Not uploaded"}</span></td>
              </tr>`
            ).join("")}
          </tbody>
        </table>

        <div class="card" style="margin-top:12px; background:var(--color-surface);">
          <form id="careerDocUploadForm">
            <div class="field">
              <label><b>Upload supporting document</b></label>
              <select class="input select" id="careerDocCategory">
                ${CAREER_GUIDANCE_DOC_CATEGORIES.map(
                  (category) => `<option value="${category}">${category}</option>`
                ).join("")}
              </select>
            </div>
            <div class="field">
              <input class="input" id="careerDocFile" type="file" accept=".png,.jpg,.jpeg,.pdf" required />
            </div>
            <div id="careerDocError" class="mutedText">${escapeHtml(state.docError || "")}</div>
            <div class="row" style="margin-top:10px;">
              <button class="btn btnPrimary" type="submit">Upload documents</button>
            </div>
          </form>
        </div>

        <div class="card" style="margin-top:12px; background:var(--color-surface);">
          <div style="font-weight:700;">Uploaded metadata</div>
          ${
            flattenedCareerDocs.length
              ? `<table class="table" style="margin-top:8px;">
                  <thead><tr><th>Category</th><th>File</th><th>Uploaded</th><th>Action</th></tr></thead>
                  <tbody>
                    ${flattenedCareerDocs
                      .map(
                        (item) => `<tr>
                          <td>${escapeHtml(item.category)}</td>
                          <td>
                            <div>${escapeHtml(item.filename)}</div>
                            <div class="mutedText" style="font-size:12px;">${escapeHtml(item.fileType)} • ${formatBytes(item.size)}</div>
                          </td>
                          <td>${formatDate(item.uploadedAt)}</td>
                          <td><button type="button" class="btn btnGhost" data-career-doc-remove="${item.id}" data-career-doc-category="${escapeHtml(item.category)}">Remove</button></td>
                        </tr>`
                      )
                      .join("")}
                  </tbody>
                </table>`
              : `<div class="mutedText" style="margin-top:8px;">No career guidance document metadata uploaded yet.</div>`
          }
        </div>
      </div>
    </div>`;
  }

    function renderQuiz() {
    const question = CAREER_QUIZ_QUESTIONS[state.step];
    const totalSteps = CAREER_QUIZ_QUESTIONS.length;
    const value = state.answers[question.id];
    const activePhaseIndex = getCareerGuidanceQuizPhaseIndex(state.step);
    const activePhase = CAREER_GUIDANCE_QUIZ_PHASES[activePhaseIndex] || CAREER_GUIDANCE_QUIZ_PHASES[0];
    const direction = state.quizDirection > 0 ? "next" : state.quizDirection < 0 ? "prev" : "same";

    const optionsHtml = question.options
      .map((option) => {
        const encodedValue = encodeURIComponent(option);
        const isActive =
          question.type === "multi"
            ? Array.isArray(value) && value.includes(option)
            : value === option;
        return `<button type="button" class="careerOption ${isActive ? "active" : ""}" data-career-option="${encodedValue}">
          ${escapeHtml(option)}
        </button>`;
      })
      .join("");

    root.innerHTML = `<div class="card careerWizardCard card-accent-top is-guidance">
      <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
        <div>
          <div class="mutedText" style="font-size:12px; text-transform:uppercase; letter-spacing:.04em;">Career Match Quiz</div>
          <div class="dashboardSectionMeta" style="margin-top:6px;">${escapeHtml(activePhase.label)}</div>
        </div>
      </div>
      ${renderQuizStepNavigator(totalSteps, state.step)}

      <div class="ydhGuidanceQuestionPanel" data-direction="${direction}">
        <div class="ydhGuidanceStepIntro" style="margin-top:16px;">
          <div class="ydhGuidanceStepKicker">${escapeHtml(activePhase.label)}</div>
          <h2>${escapeHtml(question.label)}</h2>
          <p class="ydhGuidanceStepHint">${question.required ? "Required question" : "Optional - you can skip"}</p>
        </div>

        <div class="careerOptionsGrid" style="margin-top:12px;">
          ${optionsHtml}
        </div>
      </div>

      <div id="careerQuizError" class="ydhStepperError" style="margin-top:12px;">${escapeHtml(state.error || "")}</div>

      <div class="ydhStepperFooter" style="margin-top:14px;">
        <button type="button" class="btn btnGhost ydhStepperFooterButton" id="careerBackBtn" ${state.step === 0 ? "disabled" : ""}>Back</button>
        <div class="row">
          ${question.required ? "" : `<button type="button" class="btn btnGhost ydhStepperFooterButton" id="careerSkipBtn">Skip</button>`}
          <button type="button" class="btn btnPrimary ydhStepperFooterButton" id="careerNextBtn">${state.step === totalSteps - 1 ? "View Results" : "Next"}</button>
        </div>
      </div>
    </div>`;

    const currentStepIndicator = root.querySelector('[data-quiz-step-current="true"]');
    if (currentStepIndicator) {
      currentStepIndicator.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    }

    root.querySelectorAll('button[data-career-phase-index]').forEach((button) => {
      button.addEventListener('click', () => {
        const phaseIndex = Number(button.getAttribute('data-career-phase-index'));
        const nextStep = getCareerGuidanceQuizStepIndexForPhase(phaseIndex);
        state.quizDirection = nextStep >= state.step ? 1 : -1;
        state.step = nextStep;
        state.error = "";
        renderQuiz();
      });
    });

    root.querySelectorAll("button[data-career-option]").forEach((button) => {
      button.addEventListener("click", () => {
        const selectedValue = decodeURIComponent(button.getAttribute("data-career-option"));
        if (question.type === "multi") updateMultiAnswer(question.id, selectedValue);
        else state.answers[question.id] = selectedValue;

        state.error = "";
        renderQuiz();
      });
    });

    const backBtn = root.querySelector("#careerBackBtn");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        if (state.step > 0) {
          state.quizDirection = -1;
          state.step -= 1;
          state.error = "";
          renderQuiz();
        }
      });
    }

    const skipBtn = root.querySelector("#careerSkipBtn");
    if (skipBtn) {
      skipBtn.addEventListener("click", () => {
        if (state.step < totalSteps - 1) {
          state.quizDirection = 1;
          state.step += 1;
          state.error = "";
          renderQuiz();
        }
      });
    }

    const nextBtn = root.querySelector("#careerNextBtn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (question.required && !isQuestionAnswered(question)) {
          state.error = "Please select at least one option before continuing.";
          renderQuiz();
          return;
        }

        if (state.step < totalSteps - 1) {
          state.quizDirection = 1;
          state.step += 1;
          state.error = "";
          renderQuiz();
          return;
        }

        if (!requiredAnswersValid()) {
          state.error = "Province and Interests are required to generate your guidance.";
          renderQuiz();
          return;
        }

        state.result = computeCareerMatchResult(state.answers);
        const documentStatus = getCareerGuidanceDocumentStatus(user.id);
        state.pathway = buildCareerPathway(
          state.result.topCategory,
          state.answers,
          documentStatus.statusMap
        );
        state.mode = "results";
        state.notice = "";
        state.error = "";
        state.quizDirection = 0;
        renderContent();
      });
    }
  }

  function renderLanding() {
    root.innerHTML = `<div class="card">
      <div class="cardHeader">
        <h2 style="margin:0;">Continue your pathway</h2>
        <p class="mutedText">Your last saved guidance is ready to continue.</p>
      </div>
      <div class="row" style="justify-content:space-between; align-items:flex-start;">
        <div>
          <div class="badge badgeBlue">${escapeHtml(state.result?.topCategory || "Career Match")}</div>
          <div class="mutedText" style="margin-top:8px;">Saved: ${state.savedAt ? formatDate(state.savedAt) : "Just now"}</div>
        </div>
        <div class="row">
          <button type="button" class="btn btnPrimary" id="cgContinueBtn">Continue your pathway</button>
          <button type="button" class="btn btnGhost" id="cgRetakeBtn">Retake quiz</button>
          <button type="button" class="btn btnDanger" id="cgResetSavedBtn">Reset quiz</button>
        </div>
      </div>
      <div style="margin-top:14px;">
        ${state.pathway
          ? `<div class="card" style="background:var(--color-surface);">
              <div style="font-weight:700;">${escapeHtml(state.pathway.title)}</div>
              <div class="mutedText" style="margin-top:4px;">Resume your 3-stage action plan and update progress.</div>
            </div>`
          : ""}
      </div>
    </div>`;

    root.querySelector("#cgContinueBtn").addEventListener("click", () => {
      state.mode = "results";
      renderContent();
    });

    root.querySelector("#cgRetakeBtn").addEventListener("click", () => {
      state.mode = "quiz";
      state.step = 0;
      state.error = "";
      state.notice = "";
      state.answers = getDefaultCareerQuizAnswers(user);
      state.result = null;
      state.pathway = null;
      renderContent();
    });

    root.querySelector("#cgResetSavedBtn").addEventListener("click", () => {
      resetCareerGuidanceRecord(user.id);
      state.mode = "quiz";
      state.step = 0;
      state.answers = getDefaultCareerQuizAnswers(user);
      state.result = null;
      state.pathway = null;
      state.savedAt = "";
      state.notice = "Saved guidance cleared.";
      state.error = "";
      renderContent();
    });
  }

  function renderResults() {
    if (!state.result || !state.pathway) {
      state.mode = "quiz";
      renderContent();
      return;
    }

    const recommendations = state.result.recommendations || {
      bursaries: [],
      learnerships: [],
      courses: []
    };

    root.innerHTML = `<div class="grid">
      <div class="card">
        <div class="row" style="justify-content:space-between;">
          <div>
            <h2 style="margin:0;">Career match results</h2>
            <p class="mutedText" style="margin:6px 0 0;">Top categories are generated from your quiz responses with transparent scoring.</p>
          </div>
          <div class="row">
            <button type="button" class="btn btnPrimary" id="cgSaveBtn">Save Pathway</button>
            <button type="button" class="btn btnGhost" id="cgRetakeBtn">Retake quiz</button>
            <button type="button" class="btn btnDanger" id="cgResetBtn">Reset quiz</button>
          </div>
        </div>
        <div class="mutedText" style="margin-top:8px;">
          ${state.savedAt ? `Last saved: ${formatDate(state.savedAt)}` : "Not saved yet"}
        </div>
        ${state.notice ? `<div class="badge badgeGreen" style="margin-top:10px;">${escapeHtml(state.notice)}</div>` : ""}
      </div>

      <div class="careerMatchGrid">
        ${state.result.topMatches
          .map(
            (match, index) => `<div class="card careerMatchCard ${categoryColorClass(match.category, index)}">
              <div class="row" style="justify-content:space-between;">
                <div style="font-weight:800; font-size:20px;">${escapeHtml(match.category)}</div>
                <span class="badge badgeBlue">${match.percent}% match</span>
              </div>
              <div class="mutedText" style="margin-top:8px;">${escapeHtml(match.why)}</div>
            </div>`
          )
          .join("")}
      </div>

      ${renderRecommendationsGroup("Recommended Bursaries", recommendations.bursaries || [])}
      ${renderRecommendationsGroup(
        "Recommended Learnerships / Internships",
        recommendations.learnerships || []
      )}
      ${renderRecommendationsGroup("Recommended Courses", recommendations.courses || [])}

      ${renderPathwayPanel()}
    </div>`;

    root.querySelector("#cgSaveBtn").addEventListener("click", () => {
      saveCareerGuidanceRecord(
        user.id,
        {
          answers: state.answers,
          result: state.result,
          pathway: state.pathway,
          savedAt: new Date().toISOString()
        },
        user
      );
      state.savedAt = new Date().toISOString();
      state.notice = "Pathway saved successfully.";
      renderContent();
    });

    root.querySelector("#cgRetakeBtn").addEventListener("click", () => {
      state.mode = "quiz";
      state.step = 0;
      state.notice = "";
      state.error = "";
      state.answers = getDefaultCareerQuizAnswers(user);
      state.result = null;
      state.pathway = null;
      renderContent();
    });

    root.querySelector("#cgResetBtn").addEventListener("click", () => {
      resetCareerGuidanceRecord(user.id);
      state.mode = "quiz";
      state.step = 0;
      state.answers = getDefaultCareerQuizAnswers(user);
      state.result = null;
      state.pathway = null;
      state.savedAt = "";
      state.notice = "Saved guidance cleared.";
      state.error = "";
      renderContent();
    });

    const uploadForm = root.querySelector("#careerDocUploadForm");
    if (uploadForm) {
      uploadForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const category = root.querySelector("#careerDocCategory").value;
        const fileInput = root.querySelector("#careerDocFile");
        const file = fileInput.files && fileInput.files[0];
        const validationError = validateUploadFile(file);

        if (validationError) {
          state.docError = validationError;
          renderContent();
          return;
        }

        addCareerGuidanceDocumentMetadata(user.id, category, file);
        state.docError = "";
        state.notice = `${category} metadata saved.`;
        const documentStatus = getCareerGuidanceDocumentStatus(user.id);
        state.pathway = buildCareerPathway(
          state.result.topCategory,
          state.answers,
          documentStatus.statusMap
        );
        renderContent();
      });
    }

    root.querySelectorAll("button[data-career-doc-remove]").forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-career-doc-category");
        const documentId = button.getAttribute("data-career-doc-remove");
        removeCareerGuidanceDocumentMetadata(user.id, category, documentId);
        state.notice = "Document metadata removed.";
        const documentStatus = getCareerGuidanceDocumentStatus(user.id);
        state.pathway = buildCareerPathway(
          state.result.topCategory,
          state.answers,
          documentStatus.statusMap
        );
        renderContent();
      });
    });
  }

  function renderContent() {
    if (state.mode === "landing") {
      renderLanding();
      return;
    }

    if (state.mode === "results") {
      renderResults();
      return;
    }

    renderQuiz();
  }

  renderContent();
  return shell("student", node);
}

// Admin corporate overview page render (portfolio metrics and summary tiles).

function getCuratedBursaryListingCatalogue() {
  const catalogue = getOpportunityCatalogue();
  const catalogueMap = new Map(catalogue.map((opportunity) => [opportunity.id, opportunity]));
  return CURATED_BURSARY_LISTING_OPPORTUNITIES.map((opportunity) => catalogueMap.get(opportunity.id) || opportunity);
}

function getBursaryCardImageSrc(opportunity) {
  const raw = String(opportunity?.image || opportunity?.imageUrl || opportunity?.coverImage || opportunity?.logoUrl || "").trim();
  if (!raw) return "";
  if (/^\/images\//i.test(raw)) return raw.replace(/^\//, "");
  if (/^images\//i.test(raw)) return raw;
  return `images/${raw}`;
}

function formatBursaryCardClosingDate(value) {
  const raw = String(value || "").trim();
  if (!raw || /^rolling$/i.test(raw)) return "Rolling";
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return raw;
  return parsed.toLocaleDateString("en-ZA", { day: "numeric", month: "long" });
}

function getBursaryCardBadges(opportunity, recommended) {
  const source = Array.isArray(opportunity?.badges) ? opportunity.badges : normalizeOpportunityTags(opportunity?.tags);
  const unique = [];

  source.forEach((badge) => {
    const label = String(badge || "").trim();
    if (label && !unique.includes(label)) unique.push(label);
  });

  if (recommended && !unique.includes("Recommended")) unique.unshift("Recommended");
  return unique.slice(0, 3);
}

function getOpportunityListingMeta(opportunity) {
  const type = String(opportunity?.type || "").trim();
  const sector = resolveOpportunitySector(opportunity) || "General";
  const provider = String(opportunity?.provider || opportunity?.institution || "Provider to be confirmed").trim();
  const location = String(opportunity?.location || opportunity?.province || "National").trim() || "National";
  const focusArea = String(opportunity?.focusArea || opportunity?.studyFields || "").trim();
  const courseSkills = normalizeOpportunityTags(opportunity?.tags).join(", ");
  const firstRequirement = Array.isArray(opportunity?.requirements) && opportunity.requirements.length
    ? String(opportunity.requirements[0] || "").trim()
    : "";
  const level = String(opportunity?.nqfLevel || "").trim();
  const requirementsOrLevel = [level, firstRequirement].filter(Boolean).join(" • ") || "See details";

  if (type === "Course") {
    return [
      { label: "Duration", value: String(opportunity?.duration || opportunity?.stipendOrValue || "Flexible").trim() || "Flexible" },
      { label: "Provider", value: provider },
      { label: "Certification", value: String(opportunity?.certificationType || "Certificate").trim() || "Certificate" },
      { label: "Skills", value: focusArea || courseSkills || "See course details" }
    ];
  }

  if (isLearnershipType(type)) {
    return [
      { label: "Stipend", value: String(opportunity?.stipendOrValue || opportunity?.fundingAmount || "Stipend varies").trim() || "Stipend varies" },
      { label: "Province", value: location },
      { label: "Closing date", value: formatBursaryCardClosingDate(opportunity?.closingDate) },
      { label: "Requirements / level", value: requirementsOrLevel }
    ];
  }

  return [
    { label: "Sector", value: sector },
    { label: "Value", value: String(opportunity?.fundingAmount || opportunity?.stipendOrValue || "Funding varies").trim() || "Funding varies" },
    { label: "Closing date", value: formatBursaryCardClosingDate(opportunity?.closingDate) },
    { label: "Focus area", value: focusArea || "See bursary details" }
  ];
}

function getOpportunityListingBadges(opportunity, recommended) {
  const source = Array.isArray(opportunity?.badges) ? opportunity.badges : normalizeOpportunityTags(opportunity?.tags);
  const unique = [];

  source.forEach((badge) => {
    const label = String(badge || "").trim();
    if (label && !unique.includes(label)) unique.push(label);
  });

  if (recommended && !unique.includes("Recommended")) unique.unshift("Recommended");
  return unique.slice(0, 4);
}


function getOpportunityListingPrimaryAction(opportunity, options = {}) {
  if (options.action && options.action.href) {
    return {
      label: String(options.action.label || "Apply").trim() || "Apply",
      href: String(options.action.href || `#/student/apply/${opportunity.id}`).trim() || `#/student/apply/${opportunity.id}`
    };
  }

  const application = options.application || null;
  const recommended = Boolean(options.recommended);
  const lifecycle = options.lifecycle || getOpportunityLifecycleState(application);
  const action = getOpportunityPrimaryAction(opportunity.id, application, recommended, lifecycle);

  if (application) return action;
  return {
    label: options.previewMode ? "Apply Now" : "Apply",
    href: `#/student/apply/${opportunity.id}`
  };
}

function renderBursaryListingCard(opportunity, options = {}) {
  const student = Object.prototype.hasOwnProperty.call(options, "student") ? options.student : currentUser();
  const application = options.application || null;
  const recommended = Boolean(options.recommended);
  const lifecycle = options.lifecycle || getOpportunityLifecycleState(application);
  const action = options.action || getOpportunityPrimaryAction(opportunity.id, application, recommended, lifecycle);
  const saved = student ? isOpportunitySaved(student.id, opportunity.id) : false;
  const provider = String(opportunity?.provider || opportunity?.institution || "Provider to be confirmed").trim();
  const badges = getBursaryCardBadges(opportunity, recommended);
  const imageSrc = getBursaryCardImageSrc(opportunity);
  const ctaText = application ? action.label : String(opportunity?.ctaText || action.label || "View bursary").trim();
  const isSelectable = Boolean(options.selectable);
  const selectedClass = isSelectable && options.selected ? " is-selected" : "";
  const interactionAttrs = isSelectable ? ` data-preview-opp="${escapeHtml(opportunity.id)}" tabindex="0"` : "";

  return `<article class="ydhBursaryCard${selectedClass}"${interactionAttrs}>
    <div class="ydhBursaryCardMedia">
      ${imageSrc ? `<img class="ydhBursaryCardImage" src="${escapeHtml(imageSrc)}" alt="${escapeHtml(opportunity.title)}" />` : `<div class="ydhBursaryCardImage ydhBursaryCardImageFallback">${escapeHtml(provider)}</div>`}
      <div class="ydhBursaryCardFade"></div>
      <div class="ydhBursaryCardTop">
        <span class="ydhBursaryCardType">${escapeHtml(opportunity.type || "Bursary")}</span>
        ${student ? `<button type="button" class="btn btnGhost ydhBursaryCardSave ${saved ? "is-saved" : ""}" data-save-opp="${escapeHtml(opportunity.id)}">${saved ? "Saved" : "Save"}</button>` : ""}
      </div>
    </div>

    <div class="ydhBursaryCardBody">
      <div class="ydhBursaryCardEyebrow">${escapeHtml(provider)}</div>
      <h3 class="ydhBursaryCardTitle">${escapeHtml(opportunity.title)}</h3>

      <div class="ydhBursaryCardDivider"></div>

      <div class="ydhBursaryCardMeta">
        ${getOpportunityListingMeta(opportunity).map((item) => `<div class="ydhBursaryCardMetaRow"><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong></div>`).join("")}
      </div>

      ${badges.length ? `<div class="ydhBursaryCardBadges">${badges.map((badge) => `<span class="ydhBursaryCardBadge">${escapeHtml(badge)}</span>`).join("")}</div>` : ""}

      <div class="ydhBursaryCardFooter">
        <span class="ydhBursaryCardStatus ${lifecycle.statusClass}">${escapeHtml(lifecycle.statusLabel)}</span>
        <a class="btn ydhBursaryCardCta" href="${action.href}">${escapeHtml(ctaText)}</a>
      </div>
    </div>
  </article>`;
}

function renderOpportunityListingCard(opportunity, options = {}) {
  const student = Object.prototype.hasOwnProperty.call(options, "student") ? options.student : currentUser();
  const application = options.application || null;
  const recommended = Boolean(options.recommended);
  const lifecycle = options.lifecycle || getOpportunityLifecycleState(application);
  const action = getOpportunityListingPrimaryAction(opportunity, { ...options, lifecycle, application, recommended });
  const saved = student ? isOpportunitySaved(student.id, opportunity.id) : false;
  const provider = String(opportunity?.provider || opportunity?.institution || "Provider to be confirmed").trim();
  const badges = getOpportunityListingBadges(opportunity, recommended);
  const imageSrc = getBursaryCardImageSrc(opportunity);
  const isSelectable = Boolean(options.selectable);
  const selectedClass = isSelectable && options.selected ? " is-selected" : "";
  const interactionAttrs = isSelectable ? ` data-preview-opp="${escapeHtml(opportunity.id)}" tabindex="0"` : "";

  return `<article class="ydhBursaryCard${selectedClass}"${interactionAttrs}>
    <div class="ydhBursaryCardMedia">
      ${imageSrc ? `<img class="ydhBursaryCardImage" src="${escapeHtml(imageSrc)}" alt="${escapeHtml(opportunity.title)}" />` : `<div class="ydhBursaryCardImage ydhBursaryCardImageFallback">${escapeHtml(provider)}</div>`}
      <div class="ydhBursaryCardFade"></div>
      <div class="ydhBursaryCardTop">
        <span class="ydhBursaryCardType">${escapeHtml(opportunity.type || "Opportunity")}</span>
        ${student ? `<button type="button" class="btn btnGhost ydhBursaryCardSave ${saved ? "is-saved" : ""}" data-save-opp="${escapeHtml(opportunity.id)}">${saved ? "Saved" : "Save"}</button>` : ""}
      </div>
    </div>

    <div class="ydhBursaryCardBody">
      <div class="ydhBursaryCardEyebrow">${escapeHtml(provider)}</div>
      <h3 class="ydhBursaryCardTitle">${escapeHtml(opportunity.title)}</h3>

      <div class="ydhBursaryCardDivider"></div>

      <div class="ydhBursaryCardMeta">
        ${getOpportunityListingMeta(opportunity).map((item) => `<div class="ydhBursaryCardMetaRow"><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong></div>`).join("")}
      </div>

      ${badges.length ? `<div class="ydhBursaryCardBadges">${badges.map((badge) => `<span class="ydhBursaryCardBadge">${escapeHtml(badge)}</span>`).join("")}</div>` : ""}

      <div class="ydhBursaryCardFooter">
        <span class="ydhBursaryCardStatus ${lifecycle.statusClass}">${escapeHtml(lifecycle.statusLabel)}</span>
        <a class="btn ydhBursaryCardCta" href="${action.href}">${escapeHtml(action.label)}</a>
      </div>
    </div>
  </article>`;
}

function renderStudentOpportunityCard(opportunity, options = {}) {
  const cardOptions = {
    ...options,
    selectable: false,
    selected: false
  };

  if (String(opportunity?.type || "").trim() === "Bursary") {
    return renderBursaryListingCard(opportunity, cardOptions);
  }

  return renderOpportunityListingCard(opportunity, cardOptions);
}

// Reusable student opportunity-listing renderer (filters, sorting, and quick navigation).
function pageStudentListing(listingKey) {
  const user = requireRole("student");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  if (isStudentOnboardingRequired(user)) {
    navigate("/student/onboarding");
    return el(`<div class="content">Redirecting...</div>`);
  }

  const config = getStudentListingConfig(listingKey);
  const recommended = recommendedIdsForStudent(user.id);
  const listingSource = listingKey === "bursaries" ? getCuratedBursaryListingCatalogue() : getOpportunityCatalogue();
  const scoped = listingSource.filter((opportunity) =>
    config.typeFilter.includes(opportunity.type) && String(opportunity.listingStatus || "open") === "open"
  );
  const sectors = Array.from(new Set(scoped.map((opportunity) => resolveOpportunitySector(opportunity)))).filter(Boolean);

  const node = el(`<div class="grid">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">${escapeHtml(config.title)}</h1>
      <p class="mutedText" style="margin:8px 0 0;">${escapeHtml(config.subtitle)}</p>
    </div>

    <div class="card filterPanel">
      <div class="filterRow">
        <div class="filterControl">
          <span>Search</span>
          <input class="input" id="searchInput" placeholder="Search by title, provider, sector" />
        </div>
        <div class="filterControl">
          <span>Province</span>
          <select class="input select" id="provinceFilter">
            <option value="">All provinces</option>
            ${PROVINCES.map((province) => `<option value="${province}">${province}</option>`).join("")}
            <option value="National">National</option>
          </select>
        </div>
        <div class="filterControl">
          <span>Sector</span>
          <select class="input select" id="sectorFilter">
            <option value="">All sectors</option>
            ${sectors.map((sector) => `<option value="${escapeHtml(sector)}">${escapeHtml(sector)}</option>`).join("")}
          </select>
        </div>
        <div class="filterControl">
          <span>Sort</span>
          <select class="input select" id="sortFilter">
            <option value="recommended">Recommended first</option>
            <option value="closing">Closing soon</option>
            <option value="az">A-Z</option>
          </select>
        </div>
      </div>
    </div>

    <div class="ydhBursaryGrid" id="listingWrap"></div>
  </div>`);

  function renderItems() {
    const query = String(node.querySelector("#searchInput")?.value || "").trim().toLowerCase();
    const province = String(node.querySelector("#provinceFilter")?.value || "").trim();
    const sector = String(node.querySelector("#sectorFilter")?.value || "").trim();
    const sort = String(node.querySelector("#sortFilter")?.value || "recommended").trim();

    const applicationsByOpportunity = new Map(studentApplications(user.id).map((entry) => [entry.opportunityId, entry]));

    let filtered = scoped.filter((opportunity) => {
      const searchable = [
        opportunity.title,
        opportunity.institution,
        resolveOpportunitySector(opportunity),
        opportunity.focusArea,
        opportunity.duration,
        opportunity.certificationType,
        Array.isArray(opportunity.badges) ? opportunity.badges.join(" ") : "",
        Array.isArray(opportunity.tags) ? opportunity.tags.join(" ") : ""
      ].join(" ").toLowerCase();
      const matchesQuery = !query || searchable.includes(query);
      const matchesProvince = !province || String(opportunity.location || "") === province;
      const matchesSector = !sector || resolveOpportunitySector(opportunity) === sector;
      return matchesQuery && matchesProvince && matchesSector;
    });

    filtered = filtered.sort((first, second) => {
      if (sort === "az") return String(first.title || "").localeCompare(String(second.title || ""));
      if (sort === "closing") {
        const firstDays = daysUntilDate(first.closingDate);
        const secondDays = daysUntilDate(second.closingDate);
        const firstSort = Number.isFinite(firstDays) ? firstDays : 9999;
        const secondSort = Number.isFinite(secondDays) ? secondDays : 9999;
        if (firstSort !== secondSort) return firstSort - secondSort;
        return String(first.title || "").localeCompare(String(second.title || ""));
      }

      const firstRecommended = recommended.has(first.id) ? 1 : 0;
      const secondRecommended = recommended.has(second.id) ? 1 : 0;
      if (firstRecommended !== secondRecommended) return secondRecommended - firstRecommended;

      return String(first.title || "").localeCompare(String(second.title || ""));
    });

    const wrap = node.querySelector("#listingWrap");
    if (!wrap) return;

    if (!filtered.length) {
      wrap.innerHTML = `<div class="card dashboardEmptyState">
        <p>No opportunities match your filters right now.</p>
        <button type="button" class="btn btnGhost" id="listingResetFilters">Reset filters</button>
      </div>`;
      wrap.querySelector("#listingResetFilters")?.addEventListener("click", () => {
        node.querySelector("#searchInput").value = "";
        node.querySelector("#provinceFilter").value = "";
        node.querySelector("#sectorFilter").value = "";
        node.querySelector("#sortFilter").value = "recommended";
        renderItems();
      });
      return;
    }

    wrap.innerHTML = filtered
      .map((opportunity) => {
        const cardOptions = {
          student: user,
          application: applicationsByOpportunity.get(opportunity.id) || null,
          recommended: recommended.has(opportunity.id),
          selectable: false,
          selected: false
        };

        if (listingKey === "bursaries") {
          return renderBursaryListingCard(opportunity, cardOptions);
        }

        return renderOpportunityListingCard(opportunity, cardOptions);
      })
      .join("");

    bindStudentOpportunityCardActions(node, user, renderItems);
  }

  ["#searchInput", "#provinceFilter", "#sectorFilter", "#sortFilter"].forEach((selector) => {
    const control = node.querySelector(selector);
    if (!control) return;
    const eventName = selector === "#searchInput" ? "input" : "change";
    control.addEventListener(eventName, renderItems);
  });

  renderItems();
  return shell("student", node);
}


/* ========================================================================== */
/*  SECTION: 2026 Admin Operations Overrides                                   */
/* ========================================================================== */

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === "\"" && inQuotes && next === "\"") {
      current += "\"";
      i += 1;
      continue;
    }

    if (char === "\"") {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

function normalizeOpportunityTypeLabel(rawType) {
  const type = String(rawType || "").trim().toLowerCase();
  if (type.includes("burs")) return "Bursary";
  if (type.includes("intern")) return "Internship";
  if (type.includes("course") || type.includes("tvet")) return "Course";
  if (type.includes("learn")) return "Learnership";
  return "Course";
}

function parseOpportunityCsv(rawText) {
  const text = String(rawText || "").replace(/\r/g, "").trim();
  if (!text) {
    return { rows: [], errors: ["CSV input is empty."] };
  }

  const lines = text.split("\n").filter((line) => String(line || "").trim());
  if (lines.length < 2) {
    return { rows: [], errors: ["CSV must include a header row and at least one data row."] };
  }

  const headers = parseCsvLine(lines[0]).map((header) => String(header || "").trim().toLowerCase());
  const indexOf = (keys) => headers.findIndex((header) => keys.includes(header));

  const idx = {
    title: indexOf(["title", "opportunity", "opportunity_title"]),
    type: indexOf(["type", "opportunity_type"]),
    provider: indexOf(["provider", "institution", "organisation"]),
    province: indexOf(["province", "location"]),
    sector: indexOf(["sector", "category"]),
    closingDate: indexOf(["closing_date", "closing", "deadline"]),
    tags: indexOf(["tags", "keywords"]),
    requiredDocuments: indexOf(["required_documents", "required_docs", "documents"]),
    fundingAmount: indexOf(["funding_amount", "stipend", "value"]),
    nqfLevel: indexOf(["nqf_level", "nqf"]),
    status: indexOf(["status", "listing_status"]),
    description: indexOf(["description", "summary"])
  };

  const errors = [];
  const rows = [];

  lines.slice(1).forEach((line, rowIndex) => {
    const values = parseCsvLine(line);
    const getValue = (columnIndex) => (columnIndex >= 0 ? String(values[columnIndex] || "").trim() : "");

    const title = getValue(idx.title);
    const type = normalizeOpportunityTypeLabel(getValue(idx.type));
    const provider = getValue(idx.provider);
    const province = getValue(idx.province) || "National";
    const sector = getValue(idx.sector) || "General";
    const closingDateRaw = getValue(idx.closingDate);
    const closingDate = closingDateRaw || "Rolling";
    const tags = getValue(idx.tags)
      .split("|")
      .join(",")
      .split(",")
      .map((tag) => String(tag || "").trim())
      .filter(Boolean);
    const requiredDocuments = getValue(idx.requiredDocuments)
      .split("|")
      .join(",")
      .split(",")
      .map((entry) => String(entry || "").trim())
      .filter((entry) => OPPORTUNITY_REQUIRED_DOCUMENT_OPTIONS.includes(entry));
    const fundingAmount = getValue(idx.fundingAmount);
    const nqfLevel = getValue(idx.nqfLevel);
    const statusRaw = String(getValue(idx.status) || "open").toLowerCase();
    const listingStatus = ["open", "closed", "archived"].includes(statusRaw) ? statusRaw : "open";
    const description = getValue(idx.description);

    if (!title) {
      errors.push(`Row ${rowIndex + 2}: title is required.`);
      return;
    }

    rows.push({
      id: uid("opp"),
      title,
      type,
      provider,
      province,
      sector,
      closingDate,
      tags,
      requiredDocuments,
      fundingAmount,
      stipendOrValue: fundingAmount || "-",
      nqfLevel,
      listingStatus,
      description
    });
  });

  return { rows, errors };
}


function getAdminScopedOpportunities(user) {
  const role = String(user?.role || "").trim().toLowerCase();
  const institutionId = String(user?.institutionId || user?.profile?.institutionId || "").trim().toLowerCase();
  const organisationName = String(user?.profile?.organisationName || user?.name || "").trim().toLowerCase();

  let opportunities = flattenOpportunityStore(ensureOpportunityStore());
  if (role === "admin" || role === "super_admin" || role === "reviewer") {
    return opportunities;
  }

  return opportunities.filter((entry) => {
    const entryInstitutionId = String(entry.institutionId || "").trim().toLowerCase();
    const entryProvider = String(entry.provider || entry.institution || "").trim().toLowerCase();
    if (institutionId) return entryInstitutionId === institutionId;
    return organisationName ? entryProvider.includes(organisationName) : false;
  });
}

function getAdminAccessibleStudents(user, rows = []) {
  const role = String(user?.role || "").trim().toLowerCase();
  if (role === "admin" || role === "super_admin" || role === "reviewer") {
    return store.users.filter((entry) => entry.role === "student" && !entry.mergedInto);
  }

  const ids = new Set(rows.map((row) => row.student?.id).filter(Boolean));
  return store.users.filter((entry) => entry.role === "student" && !entry.mergedInto && ids.has(entry.id));
}

function pageAdminCorporate() {
  const user = requireAdminAccess(["admin", "super_admin", "institution_admin", "corporate_partner", "reviewer"]);
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const rows = buildApplicationRows("all");
  const opportunities = getAdminScopedOpportunities(user);
  const students = getAdminAccessibleStudents(user, rows);
  const verifiedPartners = Array.isArray(store.institutions) ? store.institutions.filter((entry) => entry.verified).length : 0;
  const submittedCount = rows.filter((row) => normalizeApplicationStatus(row.application?.status, "draft") !== "draft").length;
  const recentRows = rows.slice(0, 8);
  const auditLogs = Array.isArray(store.auditLogs) ? store.auditLogs.slice(0, 8) : [];

  const node = el(`<div class="grid adminCorporateOverview">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Corporate Executive Dashboard</h1>
      <p class="mutedText" style="margin:8px 0 0;">Portfolio overview across opportunities, applicants, and verified partners.</p>
    </div>

    <div class="adminMetricGrid">
      ${metricTile("Active opportunities", String(opportunities.filter((entry) => String(entry.listingStatus || "open") === "open").length), "Open listings in your current scope")}
      ${metricTile("Accessible students", String(students.length), "Students currently visible to this workspace")}
      ${metricTile("Applications submitted", String(submittedCount), "Submitted and in-progress applications")}
      ${metricTile("Verified partners", String(verifiedPartners), "Approved institutions and partner organisations")}
    </div>

    <section class="card">
      <div style="font-weight:700;">Recent applications</div>
      <div class="mutedText" style="margin-top:4px; font-size:12px;">A live view of the latest activity entering the platform.</div>
      ${recentRows.length ? `<div style="overflow-x:auto; margin-top:12px;">
        <table class="table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Opportunity</th>
              <th>Type</th>
              <th>Status</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            ${recentRows.map((row) => `<tr>
              <td><b>${escapeHtml(getUserDisplayName(row.student))}</b><div class="mutedText" style="font-size:12px; margin-top:2px;">${escapeHtml(row.student?.profile?.province || "Province not set")}</div></td>
              <td>${escapeHtml(row.opportunity?.title || "Opportunity")}</td>
              <td>${escapeHtml(row.opportunityType)}</td>
              <td><span class="badge ${normalizeApplicationStatus(row.application?.status, "draft") === "funded" ? "badgeGreen" : normalizeApplicationStatus(row.application?.status, "draft") === "rejected" ? "badgeOrange" : "badgeBlue"}">${escapeHtml(getApplicationStatusLabel(normalizeApplicationStatus(row.application?.status, "draft")))}</span></td>
              <td>${escapeHtml(String(row.score?.score ?? 0))}%</td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div>` : `<div class="mutedText" style="margin-top:12px;">No applications submitted yet.</div>`}
    </section>

    <section class="card">
      <div style="font-weight:700;">Audit activity</div>
      <div class="dashboardNotificationStack" style="margin-top:12px;">
        ${auditLogs.length
          ? auditLogs.map((entry) => `<div class="dashboardNotificationItem"><b>${escapeHtml(entry.action || "Activity")}</b><div class="mutedText" style="font-size:12px; margin-top:3px;">${escapeHtml(formatDate(entry.at || entry.createdAt || ""))}</div></div>`).join("")
          : `<div class="mutedText">No audit activity recorded yet.</div>`}
      </div>
    </section>
  </div>`);

  return shell("admin", node);
}

function pageAdminBursaries() {
  const user = requireAdminAccess(["admin", "super_admin", "institution_admin", "corporate_partner", "reviewer"]);
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const rows = buildApplicationRows("Bursary");
  const openBursaries = getAdminScopedOpportunities(user).filter((entry) => String(entry.type || "") === "Bursary" && String(entry.listingStatus || "open") === "open").length;
  const fundedCount = rows.filter((row) => normalizeApplicationStatus(row.application?.status, "draft") === "funded").length;
  const docsReadyCount = rows.filter((row) => row.checklist?.complete).length;
  const shortlistedCount = rows.filter((row) => Boolean(row.meta?.shortlisted) || normalizeApplicationStatus(row.application?.status, "draft") === "shortlisted").length;

  const node = el(`<div class="grid adminBursariesOverview">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Bursary Application Management</h1>
      <p class="mutedText" style="margin:8px 0 0;">Track bursary demand, document readiness, and funding progress.</p>
    </div>

    <div class="adminMetricGrid">
      ${metricTile("Open bursaries", String(openBursaries), "Currently accepting applications")}
      ${metricTile("Bursary applications", String(rows.length), "Applications in the current scope")}
      ${metricTile("Docs ready", String(docsReadyCount), "Applications with required documents")}
      ${metricTile("Funded", String(fundedCount), "Successful bursary outcomes")}
    </div>

    <section class="card">
      <div class="row" style="justify-content:space-between; align-items:center;">
        <div>
          <div style="font-weight:700;">Bursary pipeline</div>
          <div class="mutedText" style="font-size:12px; margin-top:4px;">Shortlists, document readiness, and funding outcomes.</div>
        </div>
        <span class="badge badgeBlue">${shortlistedCount} shortlisted</span>
      </div>
      ${rows.length ? `<div style="overflow-x:auto; margin-top:12px;">
        <table class="table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Bursary</th>
              <th>Province</th>
              <th>Docs</th>
              <th>Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => `<tr>
              <td><b>${escapeHtml(getUserDisplayName(row.student))}</b><div class="mutedText" style="font-size:12px; margin-top:2px;">${escapeHtml(row.student?.profile?.educationLevel || "Education not set")}</div></td>
              <td>${escapeHtml(row.opportunity?.title || "Bursary")}</td>
              <td>${escapeHtml(row.student?.profile?.province || row.opportunity?.location || "National")}</td>
              <td><span class="badge ${row.checklist?.complete ? "badgeGreen" : "badgeOrange"}">${row.checklist?.complete ? "Ready" : "Missing docs"}</span></td>
              <td>${escapeHtml(String(row.score?.score ?? 0))}%</td>
              <td><span class="badge ${normalizeApplicationStatus(row.application?.status, "draft") === "funded" ? "badgeGreen" : normalizeApplicationStatus(row.application?.status, "draft") === "rejected" ? "badgeOrange" : "badgeBlue"}">${escapeHtml(getApplicationStatusLabel(normalizeApplicationStatus(row.application?.status, "draft")))}</span></td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div>` : `<div class="mutedText" style="margin-top:12px;">No bursary applications found yet.</div>`}
    </section>
  </div>`);

  return shell("admin", node);
}

function pageAdminLifecycle() {
  const user = requireAdminAccess(["admin", "super_admin", "institution_admin", "corporate_partner", "reviewer"]);
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const rows = buildApplicationRows("all");
  const stageLabels = {
    applied: "Applied",
    under_review: "Under Review",
    shortlisted: "Shortlisted",
    interview: "Interview",
    accepted: "Accepted",
    rejected: "Rejected"
  };
  const stageCounts = APPLICATION_PIPELINE_STAGES.reduce((acc, stage) => {
    acc[stage] = 0;
    return acc;
  }, {});

  rows.forEach((row) => {
    const stage = resolvePipelineStage(row);
    stageCounts[stage] = (stageCounts[stage] || 0) + 1;
  });

  const fundedRows = rows.filter((row) => normalizeApplicationStatus(row.application?.status, "draft") === "funded");

  const node = el(`<div class="grid adminLifecycleOverview">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Funded Student Lifecycle Tracking</h1>
      <p class="mutedText" style="margin:8px 0 0;">Monitor movement from first application through funding and placement readiness.</p>
    </div>

    <div class="adminMetricGrid">
      ${APPLICATION_PIPELINE_STAGES.map((stage) => metricTile(stageLabels[stage], String(stageCounts[stage] || 0), "Applications in this stage")).join("")}
    </div>

    <section class="card">
      <div style="font-weight:700;">Funded and completed students</div>
      ${fundedRows.length ? `<div style="overflow-x:auto; margin-top:12px;">
        <table class="table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Opportunity</th>
              <th>Funded at</th>
              <th>Placement</th>
            </tr>
          </thead>
          <tbody>
            ${fundedRows.map((row) => `<tr>
              <td><b>${escapeHtml(getUserDisplayName(row.student))}</b><div class="mutedText" style="font-size:12px; margin-top:2px;">${escapeHtml(row.student?.profile?.province || "Province not set")}</div></td>
              <td>${escapeHtml(row.opportunity?.title || "Opportunity")}</td>
              <td>${escapeHtml(formatDate(row.application?.fundedAt || row.application?.updatedAt || ""))}</td>
              <td>${escapeHtml(row.application?.placementStatus || "Not placed")}</td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div>` : `<div class="mutedText" style="margin-top:12px;">No funded students yet.</div>`}
    </section>
  </div>`);

  return shell("admin", node);
}

function pageAdminTalent() {
  const user = requireAdminAccess(["admin", "super_admin", "institution_admin", "corporate_partner", "reviewer"]);
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const rows = buildApplicationRows("all");
  const students = getAdminAccessibleStudents(user, rows);
  const provinceCounts = {};
  const educationCounts = {};
  const interestCounts = {};
  const applicationCounts = rows.reduce((acc, row) => {
    const studentId = row.student?.id;
    if (!studentId) return acc;
    acc[studentId] = (acc[studentId] || 0) + 1;
    return acc;
  }, {});

  students.forEach((student) => {
    const profile = getUserProfile(student) || {};
    const province = String(profile.province || "Unspecified");
    const education = String(profile.educationLevel || "Unspecified");
    provinceCounts[province] = (provinceCounts[province] || 0) + 1;
    educationCounts[education] = (educationCounts[education] || 0) + 1;
    (Array.isArray(profile.interests) ? profile.interests : []).forEach((interest) => {
      const label = String(interest || "").trim();
      if (!label) return;
      interestCounts[label] = (interestCounts[label] || 0) + 1;
    });
  });

  const topProvinces = Object.entries(provinceCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const topEducation = Object.entries(educationCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const topInterests = Object.entries(interestCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);

  const node = el(`<div class="grid adminTalentOverview">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Talent Pipeline & Workforce Planning</h1>
      <p class="mutedText" style="margin:8px 0 0;">Understand who is in the pipeline, what they are studying, and where demand is concentrated.</p>
    </div>

    <div class="adminMetricGrid">
      ${metricTile("Talent pool", String(students.length), "Visible student profiles")}
      ${metricTile("Applications in pipeline", String(rows.length), "All accessible applications")}
      ${metricTile("Top province", topProvinces[0] ? `${topProvinces[0][0]} (${topProvinces[0][1]})` : "No data", "Highest concentration of students")}
      ${metricTile("Top interest", topInterests[0] ? `${topInterests[0][0]} (${topInterests[0][1]})` : "No data", "Most common student interest")}
    </div>

    <section class="card">
      <div style="font-weight:700;">Talent signals</div>
      <div class="dashboardNotificationStack" style="margin-top:12px;">
        <div class="dashboardNotificationItem"><b>Top provinces</b><div class="mutedText" style="font-size:12px; margin-top:3px;">${escapeHtml(topProvinces.map(([label, count]) => `${label} (${count})`).join(" • ") || "No province data yet")}</div></div>
        <div class="dashboardNotificationItem"><b>Education levels</b><div class="mutedText" style="font-size:12px; margin-top:3px;">${escapeHtml(topEducation.map(([label, count]) => `${label} (${count})`).join(" • ") || "No education data yet")}</div></div>
        <div class="dashboardNotificationItem"><b>Top interests</b><div class="mutedText" style="font-size:12px; margin-top:3px;">${escapeHtml(topInterests.map(([label, count]) => `${label} (${count})`).join(" • ") || "No interest data yet")}</div></div>
      </div>
    </section>

    <section class="card">
      <div style="font-weight:700;">Talent roster</div>
      ${students.length ? `<div style="overflow-x:auto; margin-top:12px;">
        <table class="table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Province</th>
              <th>Education</th>
              <th>Interests</th>
              <th>Applications</th>
            </tr>
          </thead>
          <tbody>
            ${students.map((student) => {
              const profile = getUserProfile(student) || {};
              const interests = (Array.isArray(profile.interests) ? profile.interests : []).slice(0, 3).join(", ") || "Not set";
              return `<tr>
                <td><b>${escapeHtml(getUserDisplayName(student))}</b><div class="mutedText" style="font-size:12px; margin-top:2px;">${escapeHtml(student.email || "")}</div></td>
                <td>${escapeHtml(profile.province || "Unspecified")}</td>
                <td>${escapeHtml(profile.educationLevel || "Unspecified")}</td>
                <td>${escapeHtml(interests)}</td>
                <td>${escapeHtml(String(applicationCounts[student.id] || 0))}</td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>` : `<div class="mutedText" style="margin-top:12px;">No talent data is available yet.</div>`}
    </section>
  </div>`);

  return shell("admin", node);
}


function inferOpportunityNqfLevel(entry) {
  if (!entry) return "";
  if (entry.nqfLevel) return String(entry.nqfLevel);
  const type = String(entry.type || "").toLowerCase();
  const sector = String(entry.sector || "").toLowerCase();
  if (type === "bursary") return sector.includes("engineer") ? "NQF 6–7" : "NQF 5–7";
  if (type === "learnership") return "NQF 2–4";
  if (type === "internship") return "NQF 4–6";
  if (type === "course") return "NQF 1–5";
  return "";
}

function pageAdminOpportunities() {
  const user = requireAdminAccess(["admin", "super_admin", "institution_admin", "corporate_partner"]);
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  let selected = new Set();
  let editorOpen = false;
  let editingId = "";
  let editorError = "";
  let csvInput = "";
  let csvPreviewRows = [];
  let csvErrors = [];
  let csvNotice = "";

  const node = el(`<div class="grid adminOpportunitiesV2">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Opportunity Management</h1>
      <p class="mutedText" style="margin:8px 0 0;">Create, edit, import, and bulk-manage opportunities through CSV workflows.</p>
    </div>

    <section class="card">
      <div class="row" style="justify-content:space-between; align-items:center;">
        <div>
          <div style="font-weight:700;">Opportunity Library</div>
          <div class="mutedText" style="font-size:12px; margin-top:4px;">Use bulk actions to close or archive selected listings.</div>
        </div>
        <button type="button" class="btn btnPrimary" id="adminOppAddBtn">Add opportunity</button>
      </div>

      <div class="row" style="margin-top:10px; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn btnGhost" id="bulkCloseBtn">Close selected</button>
        <button type="button" class="btn btnGhost" id="bulkArchiveBtn">Archive selected</button>
        <button type="button" class="btn btnGhost" id="bulkExtendBtn">Extend deadline +14 days</button>
      </div>

      <div id="adminOppListWrap" style="margin-top:12px;"></div>
    </section>

    <section class="card">
      <div style="font-weight:700;">CSV Upload</div>
      <p class="mutedText" style="margin-top:4px; font-size:12px;">Upload a spreadsheet export with headers like title, type, provider, province, sector, closing_date.</p>

      <div class="field" style="margin-top:10px;">
        <label><b>Upload CSV file</b></label>
        <input type="file" class="input" id="oppCsvFile" accept=".csv,text/csv" />
      </div>

      <div class="field" style="margin-top:10px;">
        <label><b>Paste CSV</b></label>
        <textarea id="oppCsvText" class="input" rows="7" placeholder="title,type,provider,province,sector,closing_date"></textarea>
      </div>

      <div class="row" style="margin-top:10px;">
        <button type="button" class="btn btnGhost" id="oppCsvPreviewBtn">Preview CSV</button>
        <button type="button" class="btn btnPrimary" id="oppCsvImportBtn">Import CSV</button>
      </div>

      <div id="oppCsvError" class="mutedText" style="color: var(--color-danger); margin-top:8px;"></div>
      <div id="oppCsvNotice" class="mutedText" style="color: var(--color-primary); margin-top:4px;"></div>
      <div id="oppCsvPreviewWrap" style="margin-top:10px;"></div>
    </section>

    <div id="adminOppEditorMount"></div>
  </div>`);

  function getScopedOpportunities() {
    let all = flattenOpportunityStore(ensureOpportunityStore());
    const role = String(user.role || "").trim().toLowerCase();
    if (role !== "admin" && role !== "super_admin") {
      const institutionId = String(user.institutionId || user.profile?.institutionId || "").trim().toLowerCase();
      if (institutionId) {
        all = all.filter((entry) => String(entry.institutionId || "").trim().toLowerCase() === institutionId);
      } else {
        all = [];
      }
    }

    return all.sort((first, second) => {
      const firstTitle = String(first.title || "");
      const secondTitle = String(second.title || "");
      return firstTitle.localeCompare(secondTitle);
    });
  }

  function applyBulk(action) {
    if (!selected.size) {
      csvErrors = ["Select at least one opportunity first."];
      renderCsvMessages();
      return;
    }

    const byId = new Map(getScopedOpportunities().map((entry) => [entry.id, entry]));
    let count = 0;

    Array.from(selected).forEach((id) => {
      const item = byId.get(id);
      if (!item) return;

      if (action === "close") {
        upsertOpportunityRecord({ ...item, listingStatus: "closed" });
      } else if (action === "archive") {
        upsertOpportunityRecord({ ...item, listingStatus: "archived" });
      } else if (action === "extend") {
        const date = new Date(item.closingDate);
        if (Number.isFinite(date.getTime())) {
          date.setDate(date.getDate() + 14);
          upsertOpportunityRecord({ ...item, closingDate: date.toISOString().slice(0, 10), listingStatus: "open" });
        }
      }

      count += 1;
    });

    selected = new Set();
    csvNotice = `${count} opportunity record(s) updated.`;
    csvErrors = [];
    logAuditEvent("opportunity.bulk_action", { action, count });
    renderCsvMessages();
    renderList();
  }

  function renderList() {
    const wrap = node.querySelector("#adminOppListWrap");
    if (!wrap) return;

    const rows = getScopedOpportunities();
    if (!rows.length) {
      wrap.innerHTML = `<div class="mutedText">No opportunities available in your scope.</div>`;
      return;
    }

    wrap.innerHTML = `<div style="overflow-x:auto;">
      <table class="table">
        <thead>
          <tr>
            <th><input type="checkbox" id="oppSelectAll" /></th>
            <th>Title</th>
            <th>Type</th>
            <th>Provider</th>
            <th>Province</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map((entry) => `<tr>
              <td><input type="checkbox" data-opp-select="${entry.id}" ${selected.has(entry.id) ? "checked" : ""} /></td>
              <td><b>${escapeHtml(entry.title)}</b><div class="mutedText" style="font-size:12px; margin-top:2px;">${escapeHtml(entry.nqfLevel || inferOpportunityNqfLevel(entry))}</div></td>
              <td>${escapeHtml(entry.type)}</td>
              <td>${escapeHtml(entry.institution || entry.provider || "-")}</td>
              <td>${escapeHtml(entry.location || "National")}</td>
              <td>${escapeHtml(formatDateLabel(entry.closingDate))}</td>
              <td><span class="badge ${entry.listingStatus === "archived" ? "badgeOrange" : entry.listingStatus === "closed" ? "badgeBlue" : "badgeGreen"}">${escapeHtml(entry.listingStatus || "open")}</span></td>
              <td>
                <div class="row" style="gap:6px; flex-wrap:wrap;">
                  <button type="button" class="btn btnGhost" data-opp-edit="${entry.id}" style="padding:6px 10px;">Edit</button>
                  <button type="button" class="btn btnGhost" data-opp-delete="${entry.id}" style="padding:6px 10px;">Delete</button>
                </div>
              </td>
            </tr>`)
            .join("")}
        </tbody>
      </table>
    </div>`;

    wrap.querySelector("#oppSelectAll")?.addEventListener("change", (event) => {
      selected = event.target.checked ? new Set(rows.map((entry) => entry.id)) : new Set();
      renderList();
    });

    wrap.querySelectorAll("input[data-opp-select]").forEach((input) => {
      input.addEventListener("change", () => {
        const id = input.getAttribute("data-opp-select");
        if (!id) return;
        if (input.checked) selected.add(id);
        else selected.delete(id);
      });
    });

    wrap.querySelectorAll("button[data-opp-edit]").forEach((button) => {
      button.addEventListener("click", () => {
        editingId = String(button.getAttribute("data-opp-edit") || "");
        editorOpen = true;
        editorError = "";
        renderEditor();
      });
    });

    wrap.querySelectorAll("button[data-opp-delete]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = String(button.getAttribute("data-opp-delete") || "");
        if (!id) return;
        deleteOpportunityRecord(id);
        logAuditEvent("opportunity.deleted", { opportunityId: id });
        renderList();
      });
    });
  }

  function renderEditor() {
    const mount = node.querySelector("#adminOppEditorMount");
    if (!mount) return;

    if (!editorOpen) {
      mount.innerHTML = "";
      return;
    }

    const editing = getScopedOpportunities().find((entry) => entry.id === editingId) || null;
    mount.innerHTML = `<div class="adminOverlay">
      <section class="card adminModalCard" role="dialog" aria-modal="true">
        <div class="row" style="justify-content:space-between; align-items:flex-start;">
          <h3 style="margin:0;">${editing ? "Edit opportunity" : "Add opportunity"}</h3>
          <button class="btn btnGhost" type="button" id="oppEditorClose">Close</button>
        </div>

        <form id="oppEditorForm" class="grid" style="margin-top:12px; gap:10px;">
          <div class="grid cols-2">
            <div class="field"><label><b>Title</b></label><input class="input" id="oppEditorTitle" value="${escapeHtml(editing?.title || "")}" required /></div>
            <div class="field"><label><b>Type</b></label><select class="input select" id="oppEditorType">${OPPORTUNITY_TYPES.map((type) => `<option value="${type}" ${editing?.type === type ? "selected" : ""}>${type}</option>`).join("")}</select></div>
          </div>
          <div class="grid cols-2">
            <div class="field"><label><b>Provider</b></label><input class="input" id="oppEditorProvider" value="${escapeHtml(editing?.provider || editing?.institution || "")}" /></div>
            <div class="field"><label><b>Province</b></label><select class="input select" id="oppEditorProvince">${["National", ...PROVINCES].map((province) => `<option value="${province}" ${String(editing?.location || "National") === province ? "selected" : ""}>${province}</option>`).join("")}</select></div>
          </div>
          <div class="grid cols-2">
            <div class="field"><label><b>Sector</b></label><input class="input" id="oppEditorSector" value="${escapeHtml(editing?.sector || "")}" /></div>
            <div class="field"><label><b>Deadline</b></label><input class="input" type="date" id="oppEditorClosing" value="${editing?.closingDate && editing.closingDate !== "Rolling" ? escapeHtml(editing.closingDate) : ""}" /></div>
          </div>
          <div class="grid cols-2">
            <div class="field"><label><b>Funding amount</b></label><input class="input" id="oppEditorFunding" value="${escapeHtml(editing?.fundingAmount || editing?.stipendOrValue || "")}" /></div>
            <div class="field"><label><b>NQF level</b></label><input class="input" id="oppEditorNqf" value="${escapeHtml(editing?.nqfLevel || "")}" /></div>
          </div>
          <div class="grid cols-2">
            <div class="field"><label><b>Status</b></label><select class="input select" id="oppEditorStatus">${["open", "closed", "archived"].map((status) => `<option value="${status}" ${String(editing?.listingStatus || "open") === status ? "selected" : ""}>${status}</option>`).join("")}</select></div>
            <div class="field"><label><b>Tags</b></label><input class="input" id="oppEditorTags" value="${escapeHtml((editing?.tags || []).join(", "))}" /></div>
          </div>

          <div id="oppEditorError" class="mutedText" style="color: var(--color-danger);">${escapeHtml(editorError)}</div>
          <div class="row" style="justify-content:flex-end; margin-top:8px;">
            <button class="btn btnGhost" type="button" id="oppEditorCancel">Cancel</button>
            <button class="btn btnPrimary" type="submit">${editing ? "Save changes" : "Create"}</button>
          </div>
        </form>
      </section>
    </div>`;

    const close = () => {
      editorOpen = false;
      editingId = "";
      editorError = "";
      renderEditor();
    };

    mount.querySelector("#oppEditorClose")?.addEventListener("click", close);
    mount.querySelector("#oppEditorCancel")?.addEventListener("click", close);
    mount.querySelector(".adminOverlay")?.addEventListener("click", (event) => {
      if (event.target.classList.contains("adminOverlay")) close();
    });

    mount.querySelector("#oppEditorForm")?.addEventListener("submit", (event) => {
      event.preventDefault();

      const title = String(mount.querySelector("#oppEditorTitle")?.value || "").trim();
      const type = String(mount.querySelector("#oppEditorType")?.value || "Course").trim();
      const provider = String(mount.querySelector("#oppEditorProvider")?.value || "").trim();
      const province = String(mount.querySelector("#oppEditorProvince")?.value || "National").trim();
      const sector = String(mount.querySelector("#oppEditorSector")?.value || "General").trim();
      const closingDate = String(mount.querySelector("#oppEditorClosing")?.value || "").trim() || "Rolling";
      const fundingAmount = String(mount.querySelector("#oppEditorFunding")?.value || "").trim() || "-";
      const nqfLevel = String(mount.querySelector("#oppEditorNqf")?.value || "").trim();
      const listingStatus = String(mount.querySelector("#oppEditorStatus")?.value || "open").trim().toLowerCase();
      const tags = String(mount.querySelector("#oppEditorTags")?.value || "").split(",").map((tag) => String(tag || "").trim()).filter(Boolean);

      if (!title) {
        editorError = "Title is required.";
        renderEditor();
        return;
      }

      const payload = {
        id: editing?.id || uid("opp"),
        title,
        type,
        provider,
        province,
        sector,
        closingDate,
        fundingAmount,
        stipendOrValue: fundingAmount,
        nqfLevel,
        listingStatus,
        tags,
        institutionId: editing?.institutionId || String(provider || "inst-partner").trim().toLowerCase().replaceAll(" ", "-"),
        verifiedPartner: true
      };

      const result = upsertOpportunityRecord(payload);
      if (!result.ok) {
        editorError = result.error || "Could not save opportunity.";
        renderEditor();
        return;
      }

      csvNotice = editing ? "Opportunity updated." : "Opportunity created.";
      csvErrors = [];
      logAuditEvent(editing ? "opportunity.updated" : "opportunity.created", { opportunityId: payload.id, title: payload.title });
      close();
      renderCsvMessages();
      renderList();
    });
  }

  function renderCsvMessages() {
    const errorEl = node.querySelector("#oppCsvError");
    const noticeEl = node.querySelector("#oppCsvNotice");
    if (errorEl) errorEl.textContent = csvErrors.join(" ");
    if (noticeEl) noticeEl.textContent = csvNotice;
  }

  function renderCsvPreview() {
    const wrap = node.querySelector("#oppCsvPreviewWrap");
    if (!wrap) return;

    if (!csvPreviewRows.length) {
      wrap.innerHTML = "";
      return;
    }

    wrap.innerHTML = `<div style="overflow-x:auto;">
      <table class="table">
        <thead><tr><th>Title</th><th>Type</th><th>Provider</th><th>Province</th><th>Status</th></tr></thead>
        <tbody>
          ${csvPreviewRows.map((row) => `<tr><td>${escapeHtml(row.title)}</td><td>${escapeHtml(row.type)}</td><td>${escapeHtml(row.provider || "-")}</td><td>${escapeHtml(row.province || "National")}</td><td>${escapeHtml(row.listingStatus || "open")}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>`;
  }

  function readCsvInputFromUi() {
    return String(node.querySelector("#oppCsvText")?.value || "").trim();
  }

  async function resolveCsvText() {
    let rawText = readCsvInputFromUi();
    if (rawText) return rawText;

    const file = node.querySelector("#oppCsvFile")?.files?.[0] || null;
    if (!file) return "";

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("Unable to read selected CSV file."));
      reader.readAsText(file);
    });
  }

  async function previewCsv() {
    csvNotice = "";
    csvErrors = [];

    try {
      csvInput = await resolveCsvText();
    } catch (error) {
      csvInput = "";
      csvErrors = ["Could not read selected file."];
      renderCsvMessages();
      return;
    }

    const parsed = parseOpportunityCsv(csvInput);
    csvPreviewRows = parsed.rows;
    csvErrors = parsed.errors;
    if (!csvErrors.length) {
      csvNotice = `${csvPreviewRows.length} row(s) ready to import.`;
    }

    renderCsvMessages();
    renderCsvPreview();
  }

  async function importCsv() {
    if (!csvPreviewRows.length) {
      await previewCsv();
      if (!csvPreviewRows.length) return;
    }

    let inserted = 0;
    let updated = 0;
    csvPreviewRows.forEach((row) => {
      const existing = flattenOpportunityStore(ensureOpportunityStore()).find((entry) =>
        String(entry.title || "").trim().toLowerCase() === String(row.title || "").trim().toLowerCase() &&
        String(entry.type || "").trim().toLowerCase() === String(row.type || "").trim().toLowerCase()
      );

      const payload = {
        ...row,
        id: existing?.id || row.id,
        provider: row.provider || existing?.provider || existing?.institution || "Not specified",
        institutionId: existing?.institutionId || String((row.provider || existing?.provider || "inst-partner") || "inst-partner").trim().toLowerCase().replaceAll(" ", "-")
      };

      const result = upsertOpportunityRecord(payload);
      if (result.ok && result.updated) updated += 1;
      else if (result.ok) inserted += 1;
    });

    csvNotice = `Import complete: ${inserted} inserted, ${updated} updated.`;
    csvErrors = [];
    csvPreviewRows = [];
    logAuditEvent("opportunity.csv_import", { inserted, updated });
    renderCsvMessages();
    renderCsvPreview();
    renderList();
  }

  node.querySelector("#adminOppAddBtn")?.addEventListener("click", () => {
    editingId = "";
    editorOpen = true;
    editorError = "";
    renderEditor();
  });

  node.querySelector("#bulkCloseBtn")?.addEventListener("click", () => applyBulk("close"));
  node.querySelector("#bulkArchiveBtn")?.addEventListener("click", () => applyBulk("archive"));
  node.querySelector("#bulkExtendBtn")?.addEventListener("click", () => applyBulk("extend"));
  node.querySelector("#oppCsvPreviewBtn")?.addEventListener("click", previewCsv);
  node.querySelector("#oppCsvImportBtn")?.addEventListener("click", importCsv);

  renderList();
  renderCsvMessages();
  renderCsvPreview();
  renderEditor();

  return shell("admin", node);
}

function pageAdminUsers() {
  const user = requireAdminAccess(["admin", "super_admin", "institution_admin"]);
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const node = el(`<div class="grid">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">User Management</h1>
      <p class="mutedText" style="margin:8px 0 0;">Search users, reset passwords, suspend accounts, and merge duplicates.</p>
    </div>
    <div class="card">
      <div class="row" style="justify-content:space-between; align-items:center;">
        <input id="adminUserQuery" class="input" placeholder="Search by name, email, role" style="min-width:260px;" />
        <div class="mutedText" id="adminUserCount"></div>
      </div>
      <div id="adminUserTableWrap" style="margin-top:12px;"></div>
    </div>
  </div>`);

  function getFilteredUsers() {
    const query = String(node.querySelector("#adminUserQuery")?.value || "").trim().toLowerCase();
    return store.users
      .filter((entry) => !entry.mergedInto)
      .filter((entry) => {
        if (!query) return true;
        const searchable = `${entry.name || ""} ${entry.email || ""} ${entry.role || ""}`.toLowerCase();
        return searchable.includes(query);
      })
      .sort((first, second) => String(first.name || "").localeCompare(String(second.name || "")));
  }

  function mergeDuplicateByEmail(targetUser) {
    const normalizedEmail = String(targetUser.email || "").trim().toLowerCase();
    if (!normalizedEmail) return;

    const duplicates = store.users.filter((entry) =>
      entry.id !== targetUser.id &&
      !entry.mergedInto &&
      String(entry.email || "").trim().toLowerCase() === normalizedEmail
    );

    duplicates.forEach((duplicate) => {
      store.applications = store.applications.map((application) =>
        application.studentId === duplicate.id ? { ...application, studentId: targetUser.id } : application
      );

      store.documents = store.documents.map((document) =>
        document.studentId === duplicate.id ? { ...document, studentId: targetUser.id } : document
      );

      duplicate.mergedInto = targetUser.id;
      duplicate.suspended = true;
    });

    if (duplicates.length) {
      saveStore(store);
      logAuditEvent("user.duplicates.merged", { targetUserId: targetUser.id, mergedCount: duplicates.length });
    }
  }

  function renderUsers() {
    const rows = getFilteredUsers();
    node.querySelector("#adminUserCount").textContent = `${rows.length} user(s)`;

    const wrap = node.querySelector("#adminUserTableWrap");
    if (!wrap) return;

    if (!rows.length) {
      wrap.innerHTML = `<div class="mutedText">No users found.</div>`;
      return;
    }

    wrap.innerHTML = `<div style="overflow-x:auto;">
      <table class="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((entry) => `<tr>
            <td><b>${escapeHtml(entry.name || "Unknown")}</b><div class="mutedText" style="font-size:12px; margin-top:2px;">${escapeHtml(entry.email || "")}</div></td>
            <td>${escapeHtml(entry.role || "student")}</td>
            <td><span class="badge ${entry.suspended ? "badgeOrange" : "badgeGreen"}">${entry.suspended ? "Suspended" : "Active"}</span></td>
            <td>
              <div class="row" style="gap:6px; flex-wrap:wrap;">
                <button type="button" class="btn btnGhost" data-user-reset="${entry.id}" style="padding:6px 10px;">Reset password</button>
                <button type="button" class="btn btnGhost" data-user-suspend="${entry.id}" style="padding:6px 10px;">${entry.suspended ? "Reactivate" : "Suspend"}</button>
                <button type="button" class="btn btnGhost" data-user-merge="${entry.id}" style="padding:6px 10px;">Merge duplicates</button>
              </div>
            </td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>`;

    wrap.querySelectorAll("button[data-user-reset]").forEach((button) => {
      button.addEventListener("click", () => {
        const userId = button.getAttribute("data-user-reset");
        const index = store.users.findIndex((entry) => entry.id === userId);
        if (index === -1) return;
        store.users[index].password = "temp1234";
        saveStore(store);
        logAuditEvent("user.password.reset", { userId });
        renderUsers();
      });
    });

    wrap.querySelectorAll("button[data-user-suspend]").forEach((button) => {
      button.addEventListener("click", () => {
        const userId = button.getAttribute("data-user-suspend");
        const index = store.users.findIndex((entry) => entry.id === userId);
        if (index === -1) return;
        store.users[index].suspended = !Boolean(store.users[index].suspended);
        saveStore(store);
        logAuditEvent("user.status.toggled", { userId, suspended: store.users[index].suspended });
        renderUsers();
      });
    });

    wrap.querySelectorAll("button[data-user-merge]").forEach((button) => {
      button.addEventListener("click", () => {
        const userId = button.getAttribute("data-user-merge");
        const target = store.users.find((entry) => entry.id === userId);
        if (!target) return;
        mergeDuplicateByEmail(target);
        renderUsers();
      });
    });
  }

  node.querySelector("#adminUserQuery")?.addEventListener("input", renderUsers);
  renderUsers();

  return shell("admin", node);
}

function pageAdminInstitutions() {
  const user = requireAdminAccess(["admin", "super_admin", "institution_admin", "corporate_partner"]);
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const node = el(`<div class="grid">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Institution Verification</h1>
      <p class="mutedText" style="margin:8px 0 0;">Approve institutions, verify partners, and manage accreditation details.</p>
    </div>

    <section class="card">
      <div style="font-weight:700;">Submit Institution</div>
      <form id="institutionForm" class="grid" style="margin-top:10px; gap:10px;">
        <div class="grid cols-2">
          <div class="field"><label><b>Organisation name</b></label><input class="input" id="instName" required /></div>
          <div class="field"><label><b>Contact person</b></label><input class="input" id="instContact" required /></div>
        </div>
        <div class="grid cols-2">
          <div class="field"><label><b>Contact email</b></label><input class="input" id="instEmail" type="email" required /></div>
          <div class="field"><label><b>Accreditation details</b></label><input class="input" id="instAccreditation" placeholder="SETA, DHET, SAQA etc." /></div>
        </div>
        <div class="field"><label><b>Registration documents</b></label><textarea class="input" id="instDocs" rows="3" placeholder="List filenames or document references"></textarea></div>
        <div class="row" style="justify-content:flex-end;"><button class="btn btnPrimary" type="submit">Submit institution</button></div>
      </form>
    </section>

    <section class="card">
      <div style="font-weight:700;">Institution Queue</div>
      <div id="institutionTableWrap" style="margin-top:12px;"></div>
    </section>
  </div>`);

  function renderInstitutions() {
    const wrap = node.querySelector("#institutionTableWrap");
    if (!wrap) return;

    const rows = Array.isArray(store.institutions) ? store.institutions : [];
    if (!rows.length) {
      wrap.innerHTML = `<div class="mutedText">No institutions submitted yet.</div>`;
      return;
    }

    wrap.innerHTML = `<div style="overflow-x:auto;">
      <table class="table">
        <thead>
          <tr>
            <th>Institution</th>
            <th>Type</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((entry) => `<tr>
            <td><b>${escapeHtml(entry.name || "-")}</b><div class="mutedText" style="font-size:12px; margin-top:2px;">${escapeHtml(entry.accreditation || "No accreditation provided")}</div></td>
            <td>${escapeHtml(entry.type || "Institution")}</td>
            <td>${escapeHtml(entry.contactPerson || "-")}<div class="mutedText" style="font-size:12px;">${escapeHtml(entry.contactEmail || "")}</div></td>
            <td><span class="badge ${entry.status === "verified" ? "badgeGreen" : entry.status === "rejected" ? "badgeOrange" : "badgeBlue"}">${escapeHtml(entry.status || "pending")}</span></td>
            <td>
              <div class="row" style="gap:6px; flex-wrap:wrap;">
                <button type="button" class="btn btnGhost" data-inst-approve="${entry.id}" style="padding:6px 10px;">Approve</button>
                <button type="button" class="btn btnGhost" data-inst-reject="${entry.id}" style="padding:6px 10px;">Reject</button>
                <button type="button" class="btn btnGhost" data-inst-verify="${entry.id}" style="padding:6px 10px;">Mark verified</button>
              </div>
            </td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>`;

    const updateInstitution = (id, patch, auditAction) => {
      const index = store.institutions.findIndex((entry) => entry.id === id);
      if (index === -1) return;
      store.institutions[index] = {
        ...store.institutions[index],
        ...patch,
        reviewedAt: new Date().toISOString()
      };
      saveStore(store);
      logAuditEvent(auditAction, { institutionId: id, patch });
      renderInstitutions();
    };

    wrap.querySelectorAll("button[data-inst-approve]").forEach((button) => {
      button.addEventListener("click", () => {
        updateInstitution(String(button.getAttribute("data-inst-approve") || ""), { status: "approved", verified: false }, "institution.approved");
      });
    });

    wrap.querySelectorAll("button[data-inst-reject]").forEach((button) => {
      button.addEventListener("click", () => {
        updateInstitution(String(button.getAttribute("data-inst-reject") || ""), { status: "rejected", verified: false }, "institution.rejected");
      });
    });

    wrap.querySelectorAll("button[data-inst-verify]").forEach((button) => {
      button.addEventListener("click", () => {
        updateInstitution(String(button.getAttribute("data-inst-verify") || ""), { status: "verified", verified: true }, "institution.verified");
      });
    });
  }

  node.querySelector("#institutionForm")?.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = String(node.querySelector("#instName")?.value || "").trim();
    const contactPerson = String(node.querySelector("#instContact")?.value || "").trim();
    const contactEmail = String(node.querySelector("#instEmail")?.value || "").trim();
    const accreditation = String(node.querySelector("#instAccreditation")?.value || "").trim();
    const registrationDocuments = String(node.querySelector("#instDocs")?.value || "")
      .split("\n")
      .map((entry) => String(entry || "").trim())
      .filter(Boolean);

    if (!name || !contactPerson || !contactEmail) return;

    store.institutions = Array.isArray(store.institutions) ? store.institutions : [];
    store.institutions.unshift({
      id: uid("inst"),
      name,
      type: "Institution",
      contactPerson,
      contactEmail,
      accreditation,
      status: "pending",
      verified: false,
      registrationDocuments,
      submittedAt: new Date().toISOString(),
      reviewedAt: "",
      notes: ""
    });

    saveStore(store);
    logAuditEvent("institution.submitted", { name, contactEmail });
    event.currentTarget.reset();
    renderInstitutions();
  });

  renderInstitutions();
  return shell("admin", node);
}

function resolvePipelineStage(row) {
  const status = normalizeApplicationStatus(row?.application?.status, "draft");
  if (status === "rejected") return "rejected";
  if (status === "funded" || status === "completed") return "accepted";
  if (row?.meta?.interviewed) return "interview";
  if (status === "shortlisted" || row?.meta?.shortlisted) return "shortlisted";
  if (status === "in_review") return "under_review";
  return "applied";
}

function applyPipelineStage(applicationId, stage) {
  if (!applicationId) return;

  if (stage === "applied") {
    updateStatus(applicationId, "submitted");
    updateApplicationMeta(applicationId, { shortlisted: false, interviewed: false, funded: false });
  } else if (stage === "under_review") {
    updateStatus(applicationId, "in_review");
    updateApplicationMeta(applicationId, { shortlisted: false, interviewed: false, funded: false });
  } else if (stage === "shortlisted") {
    updateStatus(applicationId, "shortlisted");
    updateApplicationMeta(applicationId, { shortlisted: true, interviewed: false, funded: false });
  } else if (stage === "interview") {
    updateStatus(applicationId, "in_review");
    updateApplicationMeta(applicationId, { shortlisted: true, interviewed: true, funded: false });
  } else if (stage === "accepted") {
    updateStatus(applicationId, "funded");
    updateApplicationMeta(applicationId, { shortlisted: true, interviewed: true, funded: true });
  } else if (stage === "rejected") {
    updateStatus(applicationId, "rejected");
    updateApplicationMeta(applicationId, { funded: false });
  }

  logAuditEvent("pipeline.stage.changed", { applicationId, stage });
}

function pageAdminPipeline() {
  const user = requireAdminAccess(["admin", "super_admin", "institution_admin", "reviewer", "corporate_partner"]);
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const stageMeta = {
    applied: "Applied",
    under_review: "Under Review",
    shortlisted: "Shortlisted",
    interview: "Interview",
    accepted: "Accepted",
    rejected: "Rejected"
  };

  const node = el(`<div class="grid">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Applicant Pipeline</h1>
      <p class="mutedText" style="margin:8px 0 0;">Drag applicants between stages to update recruitment progress.</p>
    </div>
    <div id="pipelineBoard" class="pipelineBoard"></div>
  </div>`);

  function renderBoard() {
    const rows = buildApplicationRows("all");
    const byStage = APPLICATION_PIPELINE_STAGES.reduce((acc, stage) => {
      acc[stage] = [];
      return acc;
    }, {});

    rows.forEach((row) => {
      const stage = resolvePipelineStage(row);
      byStage[stage] = Array.isArray(byStage[stage]) ? byStage[stage] : [];
      byStage[stage].push(row);
    });

    const board = node.querySelector("#pipelineBoard");
    if (!board) return;

    board.innerHTML = APPLICATION_PIPELINE_STAGES
      .map((stage) => `<section class="pipelineColumn" data-pipeline-stage="${stage}">
        <header>
          <h3>${stageMeta[stage]}</h3>
          <span class="badge badgeBlue">${(byStage[stage] || []).length}</span>
        </header>
        <div class="pipelineColumnBody">
          ${(byStage[stage] || [])
            .map((row) => `<article class="pipelineCard" draggable="true" data-pipeline-appid="${row.application.id}">
              <div style="font-weight:700;">${escapeHtml(getUserDisplayName(row.student))}</div>
              <div class="mutedText" style="font-size:12px; margin-top:2px;">${escapeHtml(row.opportunity?.title || "Opportunity")}</div>
              <div class="mutedText" style="font-size:12px; margin-top:4px;">${escapeHtml(row.student?.profile?.province || "Province not set")}</div>
            </article>`)
            .join("")}
        </div>
      </section>`)
      .join("");

    let draggedId = "";

    board.querySelectorAll(".pipelineCard[data-pipeline-appid]").forEach((card) => {
      card.addEventListener("dragstart", () => {
        draggedId = String(card.getAttribute("data-pipeline-appid") || "");
        card.classList.add("is-dragging");
      });
      card.addEventListener("dragend", () => {
        card.classList.remove("is-dragging");
      });
    });

    board.querySelectorAll(".pipelineColumn").forEach((column) => {
      column.addEventListener("dragover", (event) => {
        event.preventDefault();
        column.classList.add("is-over");
      });
      column.addEventListener("dragleave", () => {
        column.classList.remove("is-over");
      });
      column.addEventListener("drop", (event) => {
        event.preventDefault();
        column.classList.remove("is-over");
        const stage = String(column.getAttribute("data-pipeline-stage") || "");
        if (!draggedId || !stage) return;
        applyPipelineStage(draggedId, stage);
        renderBoard();
      });
    });
  }

  renderBoard();
  return shell("admin", node);
}

function pageAdminSecurity() {
  const user = requireAdminAccess(["admin", "super_admin", "reviewer"]);
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  store.adminSecurity = store.adminSecurity && typeof store.adminSecurity === "object" ? store.adminSecurity : {
    twoFactorEnabled: true,
    trustedDevices: [],
    documentVerificationQueue: [],
    fraudReports: []
  };

  const node = el(`<div class="grid">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Security & Trust</h1>
      <p class="mutedText" style="margin:8px 0 0;">Manage 2FA, document verification queues, and fraud reports.</p>
    </div>

    <section class="card">
      <div class="row" style="justify-content:space-between; align-items:center;">
        <div>
          <div style="font-weight:700;">Two-factor authentication</div>
          <div class="mutedText" style="font-size:12px; margin-top:4px;">Admin logins require a verification code when enabled.</div>
        </div>
        <label class="onboardingRadio"><input type="checkbox" id="admin2faToggle" ${store.adminSecurity.twoFactorEnabled ? "checked" : ""} /> Enable 2FA</label>
      </div>
    </section>

    <section class="card">
      <div style="font-weight:700;">Document verification queue</div>
      <div id="documentQueueWrap" style="margin-top:10px;"></div>
    </section>

    <section class="card">
      <div style="font-weight:700;">Fraud reporting</div>
      <form id="fraudForm" class="grid" style="margin-top:10px; gap:10px;">
        <div class="field"><label><b>Report summary</b></label><input class="input" id="fraudSummary" required /></div>
        <div class="field"><label><b>Details</b></label><textarea class="input" id="fraudDetails" rows="3" required></textarea></div>
        <div class="row" style="justify-content:flex-end;"><button class="btn btnPrimary" type="submit">Submit report</button></div>
      </form>
      <div id="fraudListWrap" style="margin-top:10px;"></div>
    </section>
  </div>`);

  function refreshVerificationQueue() {
    const queue = store.documents
      .filter((document) => !document.verified)
      .slice(0, 50)
      .map((document) => ({
        id: document.id,
        studentId: document.studentId,
        category: document.category,
        filename: document.filename,
        uploadedAt: document.uploadedAt
      }));

    store.adminSecurity.documentVerificationQueue = queue;
    saveStore(store);
  }

  function renderDocumentQueue() {
    refreshVerificationQueue();
    const queue = Array.isArray(store.adminSecurity.documentVerificationQueue)
      ? store.adminSecurity.documentVerificationQueue
      : [];

    const wrap = node.querySelector("#documentQueueWrap");
    if (!wrap) return;

    if (!queue.length) {
      wrap.innerHTML = `<div class="mutedText">No documents waiting for verification.</div>`;
      return;
    }

    wrap.innerHTML = `<div style="overflow-x:auto;">
      <table class="table">
        <thead><tr><th>Student</th><th>Document</th><th>Uploaded</th><th>Action</th></tr></thead>
        <tbody>
          ${queue.map((entry) => `<tr>
            <td>${escapeHtml(getUserDisplayName(getUserById(entry.studentId)))}</td>
            <td>${escapeHtml(entry.category || "Document")}<div class="mutedText" style="font-size:12px;">${escapeHtml(entry.filename || "")}</div></td>
            <td>${escapeHtml(formatDate(entry.uploadedAt))}</td>
            <td>
              <div class="row" style="gap:6px;">
                <button class="btn btnGhost" type="button" data-doc-verify="${entry.id}" style="padding:6px 10px;">Verify</button>
                <button class="btn btnGhost" type="button" data-doc-reject="${entry.id}" style="padding:6px 10px;">Reject</button>
              </div>
            </td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>`;

    wrap.querySelectorAll("button[data-doc-verify]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-doc-verify");
        const index = store.documents.findIndex((entry) => entry.id === id);
        if (index === -1) return;
        store.documents[index].verified = true;
        saveStore(store);
        logAuditEvent("document.verified", { documentId: id });
        renderDocumentQueue();
      });
    });

    wrap.querySelectorAll("button[data-doc-reject]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-doc-reject");
        const index = store.documents.findIndex((entry) => entry.id === id);
        if (index === -1) return;
        store.documents[index].verified = false;
        saveStore(store);
        logAuditEvent("document.rejected", { documentId: id });
        renderDocumentQueue();
      });
    });
  }

  function renderFraudReports() {
    const wrap = node.querySelector("#fraudListWrap");
    if (!wrap) return;

    const reports = Array.isArray(store.adminSecurity.fraudReports) ? store.adminSecurity.fraudReports : [];
    if (!reports.length) {
      wrap.innerHTML = `<div class="mutedText">No fraud reports submitted.</div>`;
      return;
    }

    wrap.innerHTML = `<div class="dashboardNotificationStack">
      ${reports
        .slice(0, 12)
        .map((entry) => `<div class="dashboardNotificationItem"><b>${escapeHtml(entry.summary)}</b><div class="mutedText" style="font-size:12px; margin-top:3px;">${escapeHtml(entry.details)}</div></div>`)
        .join("")}
    </div>`;
  }

  node.querySelector("#admin2faToggle")?.addEventListener("change", (event) => {
    store.adminSecurity.twoFactorEnabled = Boolean(event.target.checked);
    saveStore(store);
    logAuditEvent("security.2fa.toggled", { enabled: store.adminSecurity.twoFactorEnabled });
  });

  node.querySelector("#fraudForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const summary = String(node.querySelector("#fraudSummary")?.value || "").trim();
    const details = String(node.querySelector("#fraudDetails")?.value || "").trim();
    if (!summary || !details) return;

    store.adminSecurity.fraudReports = Array.isArray(store.adminSecurity.fraudReports)
      ? store.adminSecurity.fraudReports
      : [];
    store.adminSecurity.fraudReports.unshift({
      id: uid("fraud"),
      summary,
      details,
      reportedBy: user.id,
      at: new Date().toISOString()
    });

    saveStore(store);
    logAuditEvent("fraud.reported", { summary });
    event.currentTarget.reset();
    renderFraudReports();
  });

  renderDocumentQueue();
  renderFraudReports();
  return shell("admin", node);
}

function buildMiniLineChartData(rows) {
  const monthOrder = [];
  const monthCounts = {};

  rows.forEach((row) => {
    const stamp = new Date(row.application.createdAt || Date.now());
    const month = `${stamp.getFullYear()}-${String(stamp.getMonth() + 1).padStart(2, "0")}`;
    if (!monthCounts[month]) {
      monthCounts[month] = 0;
      monthOrder.push(month);
    }
    monthCounts[month] += 1;
  });

  return monthOrder.slice(-6).map((month) => ({
    month,
    count: monthCounts[month]
  }));
}

function pageAdminAnalytics() {
  const user = requireAdminAccess(["admin", "super_admin", "institution_admin", "corporate_partner", "reviewer"]);
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const rows = buildApplicationRows("all");
  const students = store.users.filter((entry) => entry.role === "student" && !entry.mergedInto);
  const opportunities = flattenOpportunityStore(ensureOpportunityStore());
  const activeOpportunities = opportunities.filter((entry) => String(entry.listingStatus || "open") === "open").length;
  const submittedCount = rows.filter((row) => normalizeApplicationStatus(row.application.status, "draft") !== "draft").length;
  const conversionRate = rows.length ? Math.round((submittedCount / rows.length) * 100) : 0;

  const provinceCounts = students.reduce((acc, student) => {
    const province = String(student.profile?.province || "Unspecified");
    acc[province] = (acc[province] || 0) + 1;
    return acc;
  }, {});

  const sectorCounts = opportunities.reduce((acc, entry) => {
    const sector = String(entry.sector || "General");
    acc[sector] = (acc[sector] || 0) + 1;
    return acc;
  }, {});

  const lineData = buildMiniLineChartData(rows);
  const maxLine = Math.max(1, ...lineData.map((entry) => entry.count));
  const maxProvince = Math.max(1, ...Object.values(provinceCounts));

  const donutSegments = [
    { label: "Submitted", value: submittedCount },
    { label: "Pending", value: Math.max(0, rows.length - submittedCount) }
  ];
  const donutTotal = donutSegments.reduce((sum, entry) => sum + entry.value, 0) || 1;
  let donutOffset = 0;
  const donutGradient = donutSegments
    .map((entry, index) => {
      const start = donutOffset;
      donutOffset += (entry.value / donutTotal) * 100;
      const color = index === 0 ? "#1A4731" : "#E8E2D5";
      return `${color} ${start.toFixed(2)}% ${donutOffset.toFixed(2)}%`;
    })
    .join(", ");

  const node = el(`<div class="grid adminAnalyticsV2">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Analytics Dashboard</h1>
      <p class="mutedText" style="margin:8px 0 0;">Live platform metrics for students, opportunities, applications, and demand trends.</p>
    </div>

    <div class="adminMetricGrid">
      ${metricTile("Total students", String(students.length), "Registered student accounts")}
      ${metricTile("Active opportunities", String(activeOpportunities), "Open listings")}
      ${metricTile("Applications submitted", String(submittedCount), "Submitted and in-progress")}
      ${metricTile("Conversion rate", `${conversionRate}%`, "Submitted / total applications")}
    </div>

    <section class="card">
      <div style="font-weight:700;">Applications over time</div>
      <div class="adminLineBars" style="margin-top:10px;">
        ${lineData.length
          ? lineData
              .map((entry) => `<div class="adminLineBarItem"><span>${escapeHtml(entry.month)}</span><div class="adminLineBarTrack"><div class="adminLineBarFill" style="width:${Math.round((entry.count / maxLine) * 100)}%;"></div></div><b>${entry.count}</b></div>`)
              .join("")
          : `<div class="mutedText">No application timeline data yet.</div>`}
      </div>
    </section>

    <section class="card">
      <div style="font-weight:700;">Province distribution</div>
      <div class="adminBarChart" style="margin-top:10px;">
        ${Object.keys(provinceCounts).length
          ? Object.entries(provinceCounts)
              .sort((first, second) => second[1] - first[1])
              .map(([province, count]) => `<div class="adminBarChartItem"><span>${escapeHtml(province)}</span><div class="adminBarTrack"><div class="adminBarFill" style="width:${Math.round((count / maxProvince) * 100)}%;"></div></div><b>${count}</b></div>`)
              .join("")
          : `<div class="mutedText">No province data available.</div>`}
      </div>
    </section>

    <section class="card">
      <div style="font-weight:700;">Application conversion</div>
      <div class="adminDonutRow" style="margin-top:12px;">
        <div class="adminDonut" style="--donut-gradient:${donutGradient};"></div>
        <div>
          ${donutSegments.map((entry) => `<div class="mutedText" style="margin-bottom:6px;">${escapeHtml(entry.label)}: <b>${entry.value}</b></div>`).join("")}
        </div>
      </div>
    </section>

    <section class="card">
      <div style="font-weight:700;">Sector demand</div>
      <div class="adminBarChart" style="margin-top:10px;">
        ${Object.keys(sectorCounts).length
          ? Object.entries(sectorCounts)
              .sort((first, second) => second[1] - first[1])
              .slice(0, 8)
              .map(([sector, count]) => `<div class="adminBarChartItem"><span>${escapeHtml(sector)}</span><div class="adminBarTrack"><div class="adminBarFill" style="width:${Math.min(100, count * 12)}%;"></div></div><b>${count}</b></div>`)
              .join("")
          : `<div class="mutedText">No sector demand data yet.</div>`}
      </div>
    </section>
  </div>`);

  return shell("admin", node);
}

function login(email, password, role = "") {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const normalizedRole = String(role || "").trim().toLowerCase();

  const user = store.users.find(
    (entry) =>
      String(entry.email || "").toLowerCase() === normalizedEmail &&
      String(entry.password || "") === String(password || "") &&
      (!normalizedRole || String(entry.role || "").toLowerCase() === normalizedRole)
  );

  if (!user) {
    return {
      ok: false,
      error: normalizedRole ? "Invalid credentials or incorrect role selected." : "Invalid email or password."
    };
  }

  if (user.suspended) {
    return { ok: false, error: "This account is currently suspended. Contact support." };
  }

  if (isPlatformAdminRole(user.role) && store.adminSecurity?.twoFactorEnabled) {
    const code = window.prompt("Enter your admin verification code (demo code: 123456)", "");
    if (String(code || "").trim() !== "123456") {
      return { ok: false, error: "Two-factor verification failed." };
    }
  }

  currentUserId = user.id;
  setSessionUserId(user.id);
  return { ok: true, user };
}

function formatDate(iso) {
  try {
    const date = new Date(iso);
    return date.toLocaleString("en-ZA", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return iso;
  }
}

function formatDateLabel(value) {
  if (!value || value === "Rolling") return "Rolling";
  try {
    const date = new Date(value);
    if (!Number.isFinite(date.getTime())) return String(value);
    return date.toLocaleDateString("en-ZA", { year: "numeric", month: "short", day: "2-digit" });
  } catch {
    return String(value);
  }
}

function formatBytes(bytes) {
  const size = Number(bytes || 0);
  if (!Number.isFinite(size) || size <= 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  let value = size;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}

function downloadCsv(filename, rows) {
  if (!rows.length) {
    alert("No rows available for export.");
    return;
  }

  const headers = Object.keys(rows[0]);
  const csvLines = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((header) => {
          const value = row[header] == null ? "" : String(row[header]);
          return `"${value.replaceAll('"', '""')}"`;
        })
        .join(",")
    )
  ];

  const blob = new Blob([csvLines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
}

function getSidebarItems(role) {
  if (role === "student") {
    return [
      { label: "Dashboard", href: "/student/dashboard" },
      { label: "Career Guidance", href: "/student/career-guidance" },
      { label: "Documents", href: "/student/documents" },
      { label: "Bursaries", href: "/student/bursaries" },
      { label: "Learnerships/Internships", href: "/student/learnerships" },
      { label: "Courses", href: "/student/courses" }
    ];
  }

  if (role === "corporate") {
    return [
      { label: "Overview",      href: "/corporate/dashboard", dashPage: "overview"      },
      { label: "Opportunities", href: "/corporate/dashboard", dashPage: "opportunities" },
      { label: "Applicants",    href: "/corporate/dashboard", dashPage: "applicants"    },
      { label: "Pipeline",      href: "/corporate/dashboard", dashPage: "pipeline"      },
      { label: "Analytics",     href: "/corporate/dashboard", dashPage: "analytics"     },
      { label: "Documents",     href: "/corporate/dashboard", dashPage: "docs"          },
    ];
  }

  if (role === "institute") {
    return [
      { label: "Overview",     href: "/institute/dashboard", dashPage: "overview"      },
      { label: "Programs",     href: "/institute/dashboard", dashPage: "programs"      },
      { label: "Students",     href: "/institute/dashboard", dashPage: "students"      },
      { label: "Applications", href: "/institute/dashboard", dashPage: "applications"  },
      { label: "Analytics",    href: "/institute/dashboard", dashPage: "analytics"     },
      { label: "Documents",    href: "/institute/dashboard", dashPage: "docs"          },
    ];
  }

  return [
    { label: "Corporate", href: "/admin/corporate" },
    { label: "Opportunities", href: "/admin/opportunities" },
    { label: "Pipeline", href: "/admin/pipeline" },
    { label: "Users", href: "/admin/users" },
    { label: "Institutions", href: "/admin/institutions" },
    { label: "Bursaries", href: "/admin/bursaries" },
    { label: "Lifecycle", href: "/admin/lifecycle" },
    { label: "Talent", href: "/admin/talent" },
    { label: "Analytics", href: "/admin/analytics" },
    { label: "Security", href: "/admin/security" }
  ];
}

function getPageTitleForRoute(currentRoute) {
  if (currentRoute === "/student/onboarding") return "Student Onboarding";
  if (currentRoute === "/student/dashboard") return "Student Dashboard";
  if (currentRoute === "/student/career-guidance") return "Career Guidance";
  if (currentRoute === "/student/documents") return "Documents";
  if (currentRoute === "/student/bursaries") return "Bursaries";
  if (currentRoute === "/student/learnerships") return "Learnerships / Internships";
  if (currentRoute === "/student/courses") return "Courses";
  if (currentRoute.startsWith("/student/opportunity/")) return "Opportunity Details";
  if (currentRoute.startsWith("/student/apply/")) return "Application Form";
  if (currentRoute.startsWith("/student/application/")) return "Application View";
  if (currentRoute === "/corporate" || currentRoute === "/corporate/dashboard") return "Corporate Demo Workspace";
  if (currentRoute === "/institute" || currentRoute === "/institute/dashboard") return "Institute Demo Workspace";
  if (currentRoute === "/admin/corporate" || currentRoute === "/admin") return "Corporate Executive Dashboard";
  if (currentRoute === "/admin/opportunities") return "Opportunity Management";
  if (currentRoute === "/admin/pipeline") return "Applicant Pipeline";
  if (currentRoute === "/admin/users") return "User Management";
  if (currentRoute === "/admin/institutions") return "Institution Verification";
  if (currentRoute === "/admin/bursaries") return "Bursary Application Management";
  if (currentRoute === "/admin/lifecycle") return "Funded Student Lifecycle Tracking";
  if (currentRoute === "/admin/talent") return "Talent Pipeline & Workforce Planning";
  if (currentRoute === "/admin/analytics") return "Analytics Dashboard";
  if (currentRoute === "/admin/security") return "Security & Trust";
  return "Youth Digital Hub";
}

function mount(node) {
  const root = document.getElementById("root");
  root.innerHTML = "";
  root.appendChild(node);

  if (!shouldShowDemoTools()) {
    root.querySelectorAll("#btnSeedApplications, #btnSeedFromCorporate, #btnResetDemoData").forEach((entry) => {
      entry.remove();
    });
  }
}

function render() {
  const user = currentUser();
  const resolvedRoute = route || "/";

  if (DEBUG) {
    console.log("[route]", location.hash, resolvedRoute);
  }

  try {
    if (resolvedRoute === "/") {
      navigate("/home");
      return;
    }

    if (resolvedRoute === "/home") {
      window.location.href = "index.html";
      return;
    }

    if (resolvedRoute === "/demos") {
      mount(pageDemos());
      return;
    }

    if (resolvedRoute === "/login") {
      mount(pageLogin());
      return;
    }

    if (resolvedRoute === "/signup") {
      mount(pageSignup());
      return;
    }

    if (resolvedRoute.startsWith("/student/")) {
      if (!user) {
        navigate("/login");
        return;
      }

      if (user.role !== "student") {
        navigate(getWorkspaceHomeRoute(user));
        return;
      }

      if (resolvedRoute !== "/student/onboarding" && isStudentOnboardingRequired(user)) {
        navigate("/student/onboarding");
        return;
      }
    }

    if (resolvedRoute === "/corporate") {
      navigate("/corporate/dashboard");
      return;
    }

    if (resolvedRoute.startsWith("/corporate/")) {
      if (!user) {
        navigate("/login");
        return;
      }
      if (String(user.role || "").trim().toLowerCase() !== "corporate_partner") {
        navigate(getWorkspaceHomeRoute(user));
        return;
      }
    }

    if (resolvedRoute === "/institute") {
      navigate("/institute/dashboard");
      return;
    }

    if (resolvedRoute.startsWith("/institute/")) {
      if (!user) {
        navigate("/login");
        return;
      }
      if (String(user.role || "").trim().toLowerCase() !== "institution_admin") {
        navigate(getWorkspaceHomeRoute(user));
        return;
      }
    }

    if (resolvedRoute === "/student/onboarding") {
      mount(pageStudentOnboarding());
      return;
    }

    if (resolvedRoute === "/student/dashboard") {
      mount(pageStudentDashboard());
      return;
    }

    if (resolvedRoute === "/student/career-guidance") {
      mount(pageStudentCareerGuidance());
      return;
    }

    if (resolvedRoute === "/student/documents") {
      mount(pageStudentDocuments());
      return;
    }

    if (resolvedRoute === "/student/bursaries") {
      mount(pageStudentBursaries());
      return;
    }

    if (resolvedRoute === "/student/learnerships") {
      mount(pageStudentLearnerships());
      return;
    }

    if (resolvedRoute === "/student/courses") {
      mount(pageStudentCourses());
      return;
    }

    if (resolvedRoute.startsWith("/student/opportunity/")) {
      mount(pageStudentOpportunityDetails(resolvedRoute.split("/")[3]));
      return;
    }

    if (resolvedRoute.startsWith("/student/application/")) {
      mount(pageStudentApplication(resolvedRoute.split("/")[3]));
      return;
    }

    if (resolvedRoute.startsWith("/student/apply/")) {
      mount(pageStudentApply(resolvedRoute.split("/")[3]));
      return;
    }

    if (resolvedRoute === "/student/opportunities") {
      navigate("/student/courses");
      return;
    }

    if (resolvedRoute.startsWith("/student/opportunities/")) {
      const opportunityId = resolvedRoute.split("/")[3];
      navigate(`/student/opportunity/${opportunityId}`);
      return;
    }

    if (resolvedRoute === "/corporate/dashboard") {
      mount(pageCorporateDashboard());
      return;
    }

    if (resolvedRoute === "/institute/dashboard") {
      mount(pageInstituteDashboard());
      return;
    }

    if (resolvedRoute === "/admin") {
      navigate("/admin/dashboard");
      return;
    }

    if (resolvedRoute.startsWith("/admin/")) {
      if (!user) {
        navigate("/login");
        return;
      }
      if (!isPlatformAdminRole(user.role)) {
        navigate(getWorkspaceHomeRoute(user));
        return;
      }
      ensureAdminRuntimeState();
    }

    if (resolvedRoute === "/admin/dashboard" || resolvedRoute === "/admin/corporate") {
      mount(pageAdminCorporate());
      return;
    }

    if (resolvedRoute === "/admin/opportunities") {
      mount(pageAdminOpportunities());
      return;
    }

    if (resolvedRoute === "/admin/pipeline") {
      mount(pageAdminPipeline());
      return;
    }

    if (resolvedRoute === "/admin/users") {
      mount(pageAdminUsers());
      return;
    }

    if (resolvedRoute === "/admin/institutions") {
      mount(pageAdminInstitutions());
      return;
    }

    if (resolvedRoute === "/admin/bursaries") {
      mount(pageAdminBursaries());
      return;
    }

    if (resolvedRoute === "/admin/lifecycle") {
      mount(pageAdminLifecycle());
      return;
    }

    if (resolvedRoute === "/admin/talent") {
      mount(pageAdminTalent());
      return;
    }

    if (resolvedRoute === "/admin/analytics") {
      mount(pageAdminAnalytics());
      return;
    }

    if (resolvedRoute === "/admin/security") {
      mount(pageAdminSecurity());
      return;
    }

    if (user) {
      navigate(getWorkspaceHomeRoute(user));
      return;
    }

    navigate("/home");
  } catch (error) {
    console.error("[render:error]", error);
    console.error(error && error.stack ? error.stack : "");
    console.error("[render:context]", { hash: location.hash, resolvedRoute });
    mount(
      el(`<div class="grid"><div class="card"><div style="font-weight:700;">Something went wrong.</div><div class="mutedText" style="margin-top:8px;">Check console logs for route debug details.</div></div></div>`)
    );
  }
}


function shell(role, contentNode) {
  const user = currentUser();
  const sidebarItems = getSidebarItems(role);
  const isPartner = role === 'corporate' || role === 'institute';
  const pageTitle = getPageTitleForRoute(route);
  const displayName = getUserDisplayName(user);
  const profile = getUserProfile(user) || {};
  const firstName = getUserNameParts(user || {}).firstName || (displayName || "Student").split(" ")[0] || "Student";

  const sidebar = el(`<aside class="sidebar">
    <div style="font-size:12px; letter-spacing:.08em; font-weight:700; color:var(--color-text-muted);">YOUTH DIGITAL HUB</div>
    <div style="margin-top:6px; font-weight:700; text-transform:uppercase;">${escapeHtml(role)} panel</div>
    ${
      user
        ? `<div class="sidebarUserCard">
            ${renderUserAvatar(user, "avatarMd")}
            <div style="min-width:0;">
              <div style="font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(displayName)}</div>
              <div class="mutedText" style="font-size:12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(user.email || profile.email || "")}</div>
            </div>
          </div>`
        : ""
    }
    <div style="margin-top:12px; display:grid; gap:8px;">
      ${sidebarItems
        .map((item, idx) => {
          if (isPartner && item.dashPage) {
            // Partner: buttons that switch inner pages without hash nav
            const active = idx === 0;
            return `<button type="button" class="tab partnerNavBtn ${active ? "active" : ""}" data-dash-page="${item.dashPage}">${item.label}</button>`;
          }
          const active = isRouteActive(role === "student" ? resolveStudentNavRoute(route) : route, item.href);
          return `<a class="tab ${active ? "active" : ""}" href="#${item.href}">${item.label}</a>`;
        })
        .join("")}
    </div>
  </aside>`);

  const topbar = el(`<header class="topbar">
    <div>
      <div class="mutedText" style="font-size:12px; text-transform:uppercase; letter-spacing:.08em;">Live workspace</div>
      <div style="font-weight:800; font-size:24px; line-height:1.1;">${escapeHtml(pageTitle)}</div>
    </div>
    <div class="row">
      <span class="sessionBadge">
        ${user ? renderUserAvatar(user, "avatarSm") : `<span class="sessionDot"></span>`}
        ${user ? `${escapeHtml(displayName)} (${user.role})` : "No active user"}
      </span>
      <button class="btn btnGhost" id="btnRole">Role switch</button>
      <button class="btn btnPrimary" id="btnLogout">Logout</button>
    </div>
  </header>`);

  topbar.querySelector("#btnRole").onclick = () => {
    logout();
    navigate("/login");
  };

  topbar.querySelector("#btnLogout").onclick = () => {
    logout();
    navigate("/home");
  };

  const mobileHeader =
    role === "student"
      ? el(`<header class="mobileTopHeader">
          <div class="row" style="gap:10px; align-items:center; flex-wrap:nowrap; width:auto;">
            ${user ? renderUserAvatar(user, "avatarMd") : `<span class="sessionDot"></span>`}
            <div>
              <div class="mutedText" style="font-size:11px; text-transform:uppercase; letter-spacing:.05em;">Student</div>
              <div style="font-size:18px; font-weight:800; line-height:1.1;">Hi ${escapeHtml(firstName || "Student")}</div>
            </div>
          </div>
          <button type="button" class="mobileNotifyBtn" aria-label="Notifications">◔</button>
        </header>`)
      : null;

  const main = document.createElement("div");
  main.className = `mainShell ${role === "student" ? "hasMobileHeader" : ""}`.trim();
  if (mobileHeader) main.appendChild(mobileHeader);
  main.appendChild(topbar);

  const contentWrap = el(`<main class="content"></main>`);
  contentWrap.appendChild(contentNode);
  main.appendChild(contentWrap);

  const app = document.createElement("div");
  app.className = "appShell" + (isPartner ? " partnerShell" : "");
  app.appendChild(sidebar);
  app.appendChild(main);

  // Partner sidebar: wire .partnerNavBtn buttons to page-switcher
  if (isPartner) {
    sidebar.querySelectorAll(".partnerNavBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const page = btn.getAttribute("data-dash-page");
        if (window.__partnerSwitch) window.__partnerSwitch(page);
        // Active state handled by corpSwitch/instSwitch syncing back
      });
    });

    // Partner mobile bottom nav
    const picons = { overview:"◈", opportunities:"▥", applicants:"◎", pipeline:"◔", analytics:"◉", programs:"▣", students:"◎", applications:"▥", docs:"▤" };
    const pbn = document.createElement("nav");
    pbn.className = "mobileBottomNav mobileBottomNavPartner";
    pbn.setAttribute("aria-label", "Partner navigation");
    pbn.innerHTML = sidebarItems.map((item, idx) =>
      `<button type="button" class="mobileBottomNavItem ${idx === 0 ? "active" : ""}" data-dash-page="${item.dashPage}" data-partner-mobile-nav="1">
        <span class="mobileBottomNavItemIcon">${picons[item.dashPage] || "•"}</span>
        <span class="mobileBottomNavItemLabel">${item.label}</span>
      </button>`
    ).join("");
    pbn.querySelectorAll("[data-partner-mobile-nav]").forEach(btn => {
      btn.addEventListener("click", () => {
        const page = btn.getAttribute("data-dash-page");
        if (window.__partnerSwitch) window.__partnerSwitch(page);
      });
    });
    app.appendChild(pbn);
  }

  if (role === "student") {
    const mobileItems = getStudentMobileNavItems(route);
    const bottomNav = el(`<nav class="mobileBottomNav" aria-label="Mobile navigation">
      ${mobileItems
        .map(
          (item) => `<a class="mobileBottomNavItem ${item.active ? "active" : ""}" href="#${item.href}" ${
            item.view ? `data-mobile-view="${item.view}"` : ""
          } ${item.active ? 'aria-current="page"' : ''}>
            <span class="mobileBottomNavItemInner">
              <span class="mobileBottomNavItemIcon">${renderStudentMobileNavIcon(item)}</span>
              <span class="mobileBottomNavItemLabel">${item.label}</span>
            </span>
          </a>`
        )
        .join("")}
    </nav>`);

    bottomNav.querySelectorAll("a.mobileBottomNavItem").forEach((link) => {
      link.addEventListener("click", (event) => {
        const view = link.getAttribute("data-mobile-view");
        setMobileDashboardView(view || "dashboard");

        const href = link.getAttribute("href") || "";
        const targetRoute = href.replace("#", "") || "/";
        if (targetRoute === route && targetRoute === "/student/dashboard") {
          event.preventDefault();
          const targetId = view === "profile" ? "dashboardProfileSection" : "dashboardHeroSection";
          const targetNode = document.getElementById(targetId);
          if (targetNode) {
            targetNode.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });

    app.appendChild(bottomNav);
  }

  return app;
}


// Re-render after override registration.
window.ydhRender = render;
render();
