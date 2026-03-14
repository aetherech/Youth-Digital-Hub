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
const ADMIN_ROLES = new Set(["admin", "super_admin", "institution_admin", "corporate_partner", "reviewer"]);
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
    title: "Systems Development Learnership",
    institution: "MICT SETA Partner Consortium",
    location: "Gauteng",
    sector: "IT",
    closingDate: "2026-04-30",
    stipendOrValue: "R6,500/month",
    requirements: ["Grade 12", "Basic coding literacy", "CV"],
    description: "Work-integrated learnership for software support and junior development roles."
  },
  {
    id: "opp-lear-002",
    type: "Learnership",
    title: "Electrical Maintenance Learnership",
    institution: "Eskom Technical Academy",
    location: "Free State",
    sector: "Engineering",
    closingDate: "2026-05-20",
    stipendOrValue: "R7,200/month",
    requirements: ["N2 Electrical", "Medical fitness", "South African ID"],
    description: "Practical electrical maintenance training linked to utility operations."
  },
  {
    id: "opp-lear-003",
    type: "Learnership",
    title: "Business Administration Learnership",
    institution: "Services SETA",
    location: "Eastern Cape",
    sector: "Business",
    closingDate: "2026-06-05",
    stipendOrValue: "R5,800/month",
    requirements: ["Grade 12", "Communication skills", "Computer literacy"],
    description: "Entry pathway into office administration and business support functions."
  },
  {
    id: "opp-int-001",
    type: "Internship",
    title: "Municipal Finance Internship",
    institution: "City of Johannesburg",
    location: "Gauteng",
    sector: "Finance",
    closingDate: "2026-05-15",
    stipendOrValue: "R8,000/month",
    requirements: ["N6 Financial Management", "South African citizen", "Academic transcript"],
    description: "Internship for finance graduates supporting municipal budgeting and reporting."
  },
  {
    id: "opp-int-002",
    type: "Internship",
    title: "Laboratory Assistant Internship",
    institution: "CSIR Youth Programme",
    location: "Western Cape",
    sector: "Science",
    closingDate: "2026-06-25",
    stipendOrValue: "R7,000/month",
    requirements: ["Science qualification", "Lab safety awareness", "Reference letter"],
    description: "Hands-on laboratory internship in testing and quality assurance environments."
  },
  {
    id: "opp-int-003",
    type: "Internship",
    title: "Plumbing Workplace Internship",
    institution: "Department of Public Works",
    location: "North West",
    sector: "Trades",
    closingDate: "Rolling",
    stipendOrValue: "R6,000/month",
    requirements: ["Trade theory completion", "Practical logbook", "ID Copy"],
    description: "Workplace exposure internship for plumbing graduates seeking artisan placement."
  },
  {
    id: "opp-crs-001",
    type: "Course",
    title: "NCV Level 4: Electrical Infrastructure Construction",
    institution: "Ekurhuleni East TVET College",
    location: "Gauteng",
    sector: "Engineering",
    closingDate: "Rolling",
    stipendOrValue: "-",
    requirements: ["Grade 9 or equivalent", "Numeracy and literacy"],
    description: "College programme covering electrical principles, installation, and maintenance."
  },
  {
    id: "opp-crs-002",
    type: "Course",
    title: "National Certificate: IT Support",
    institution: "Tshwane North TVET College",
    location: "Gauteng",
    sector: "IT",
    closingDate: "Rolling",
    stipendOrValue: "-",
    requirements: ["Grade 12 recommended", "Basic computer skills"],
    description: "Course focused on helpdesk operations, hardware support, and troubleshooting."
  },
  {
    id: "opp-crs-003",
    type: "Course",
    title: "N6 Financial Management",
    institution: "False Bay TVET College",
    location: "Western Cape",
    sector: "Finance",
    closingDate: "Rolling",
    stipendOrValue: "-",
    requirements: ["N5 Financial Management", "Academic transcript"],
    description: "Advanced finance course preparing learners for accounting and admin careers."
  },
  {
    id: "opp-crs-004",
    type: "Course",
    title: "Occupational Certificate: Welding Assistant",
    institution: "Majuba TVET College",
    location: "KwaZulu-Natal",
    sector: "Trades",
    closingDate: "Rolling",
    stipendOrValue: "-",
    requirements: ["Grade 10 or equivalent", "Safety orientation"],
    description: "Trade-focused welding fundamentals and practical workshop skills."
  },
  {
    id: "opp-crs-005",
    type: "Course",
    title: "National Certificate: Laboratory Practice",
    institution: "Boland TVET College",
    location: "Western Cape",
    sector: "Science",
    closingDate: "Rolling",
    stipendOrValue: "-",
    requirements: ["Life Sciences", "Numeracy competency"],
    description: "Laboratory techniques, sample handling, and quality-control practices."
  },
  {
    id: "opp-crs-006",
    type: "Course",
    title: "NCV Level 4: Office Administration",
    institution: "Orbit TVET College",
    location: "North West",
    sector: "Business",
    closingDate: "Rolling",
    stipendOrValue: "-",
    requirements: ["Grade 9 or equivalent", "English communication"],
    description: "Administrative systems and office operations training for business support roles."
  }
];

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
  const stored = flattenOpportunityStore(store?.opportunities);
  return stored.length ? stored : opportunities;
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

// Baseline store shape used on first load and during normalization fallbacks.
function createDefaultStore() {
  return {
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
const opportunity = normalizedOpportunityList.find((item) => item.id === app.opportunityId) || opportunities.find((item) => item.id === app.opportunityId) || null;
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

  return normalized;
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

function requireRole(role) {
  const user = requireAuth();
  if (!user) return null;

  if (role === "admin") {
    if (!isAdminRole(user.role)) {
      navigate("/student/dashboard");
      return null;
    }
    return user;
  }

  if (user.role !== role) {
    if (isAdminRole(user.role)) navigate("/admin/dashboard");
    else navigate("/student/dashboard");
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
  return getOpportunityCatalogue().find((opportunity) => opportunity.id === id) || null;
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
function getDefaultCareerQuizAnswers(user) {
  const profile = user?.profile || {};
  return {
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

  return normalized;
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
    .sort((first, second) => second.createdAt.localeCompare(first.createdAt))
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

function renderQuizStepNavigator(totalSteps, currentStepIndex) {
  const steps = Array.from({ length: totalSteps }, (_, index) => {
    const isCompleted = index < currentStepIndex;
    const isCurrent = index === currentStepIndex;
    const stateClass = isCompleted ? "is-completed" : isCurrent ? "is-current" : "is-upcoming";
    const stateLabel = isCurrent ? "current" : isCompleted ? "completed" : "upcoming";

    return `<div class="quizStepItem ${stateClass}" role="listitem" aria-label="Step ${index + 1} of ${totalSteps} - ${stateLabel}" ${isCurrent ? 'aria-current="step" data-quiz-step-current="true"' : ""}>
      <span class="quizStepCircle">${isCompleted ? "✓" : index + 1}</span>
    </div>`;
  }).join("");

  return `<div class="quizStepNavigator" aria-label="Quiz progress">
    <div class="quizStepLabel">Step ${currentStepIndex + 1} of ${totalSteps}</div>
    <div class="quizStepScroller" role="list">
      ${steps}
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
        <div id="inlineProfileEditorError" class="mutedText" style="color: var(--salmon-orange); margin-top:8px;">${escapeHtml(error || "")}</div>
        <div id="inlineProfileEditorNotice" class="mutedText" style="color: var(--royal-blue); margin-top:4px;">${escapeHtml(notice || "")}</div>

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
    currentRoute.startsWith("/student/opportunity/");
  const isApplications =
    currentRoute.startsWith("/student/apply/") ||
    (normalized === "/student/dashboard" && dashboardView === "applications");
  const isProfile = normalized === "/student/dashboard" && dashboardView === "profile";
  const isDocuments = normalized === "/student/documents";
  const isDashboard = normalized === "/student/dashboard" && !isApplications && !isProfile;

  return [
    {
      label: "Dashboard",
      href: "/student/dashboard",
      icon: "⌂",
      view: "dashboard",
      active: isDashboard
    },
    {
      label: "Opportunities",
      href: "/student/bursaries",
      icon: "◎",
      active: isOpportunities
    },
    {
      label: "Applications",
      href: "/student/dashboard",
      icon: "▣",
      view: "applications",
      active: isApplications
    },
    {
      label: "Documents",
      href: "/student/documents",
      icon: "▤",
      active: isDocuments
    },
    {
      label: "Profile",
      href: "/student/dashboard",
      icon: "◉",
      view: "profile",
      active: isProfile
    }
  ];
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

function shell(role, contentNode) {
  const user = currentUser();
  const sidebarItems = getSidebarItems(role);
  const pageTitle = getPageTitleForRoute(route);
  const displayName = getUserDisplayName(user);
  const profile = getUserProfile(user) || {};
  const firstName = getUserNameParts(user || {}).firstName || (displayName || "Student").split(" ")[0] || "Student";

  const sidebar = el(`<aside class="sidebar">
    <div style="font-size:12px; letter-spacing:.08em; font-weight:700; color:#555;">NATIONAL TVET & SETA MVP</div>
    <div style="margin-top:6px; font-weight:700; text-transform:uppercase;">${role} panel</div>
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
        .map((item) => {
          const active = isRouteActive(
            role === "student" ? resolveStudentNavRoute(route) : route,
            item.href
          );
          return `<a class="tab ${active ? "active" : ""}" href="#${item.href}">${item.label}</a>`;
        })
        .join("")}
    </div>
  </aside>`);

  const topbar = el(`<header class="topbar">
    <div>
      <div class="mutedText" style="font-size:12px; text-transform:uppercase; letter-spacing:.08em;">Live workspace</div>
      <div style="font-weight:800; font-size:24px; line-height:1.1;">Dashboard</div>
    </div>
    <div class="row">
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
  if (mobileHeader) {
    main.appendChild(mobileHeader);
  }
  main.appendChild(topbar);

  const contentWrap = el(`<main class="content"></main>`);
  contentWrap.appendChild(contentNode);
  main.appendChild(contentWrap);

  const app = document.createElement("div");
  app.className = "appShell";
  app.appendChild(sidebar);
  app.appendChild(main);

  if (role === "student") {
    const mobileItems = getStudentMobileNavItems(route);
    const bottomNav = el(`<nav class="mobileBottomNav" aria-label="Mobile navigation">
      ${mobileItems
        .map(
          (item) => `<a class="mobileBottomNavItem ${item.active ? "active" : ""}" href="#${item.href}" ${
            item.view ? `data-mobile-view="${item.view}"` : ""
          }>
            <span class="mobileBottomNavItemIcon">${item.icon}</span>
            <span>${item.label}</span>
          </a>`
        )
        .join("")}
    </nav>`);

    bottomNav.querySelectorAll("a.mobileBottomNavItem").forEach((link) => {
      link.addEventListener("click", (event) => {
        const view = link.getAttribute("data-mobile-view");
        if (view) {
          setMobileDashboardView(view);
        } else {
          setMobileDashboardView("dashboard");
        }

        const href = link.getAttribute("href") || "";
        const targetRoute = href.replace("#", "") || "/";
        if (targetRoute === route && targetRoute === "/student/dashboard") {
          event.preventDefault();
          const targetId =
            view === "applications"
              ? "dashboardApplicationsSection"
              : view === "profile"
                ? "dashboardProfileSection"
                : "dashboardHeroSection";
          const targetNode = document.getElementById(targetId);
          if (targetNode) {
            targetNode.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });

    app.appendChild(bottomNav);
  }

  if (role === "admin") {
    const { primaryItems, overflowItems } = getAdminMobileNavItems(route);
    const bottomNav = el(`<nav class="mobileBottomNav mobileBottomNavAdmin" aria-label="Admin mobile navigation">
      ${primaryItems
        .map((item) => {
          if (item.isMore) {
            return `<button type="button" class="mobileBottomNavItem ${item.active ? "active" : ""}" id="adminMobileMoreBtn">
              <span class="mobileBottomNavItemIcon">${item.icon}</span>
              <span>${item.label}</span>
            </button>`;
          }

          return `<a class="mobileBottomNavItem ${item.active ? "active" : ""}" href="#${item.href}">
            <span class="mobileBottomNavItemIcon">${item.icon}</span>
            <span>${item.label}</span>
          </a>`;
        })
        .join("")}
    </nav>`);

    app.appendChild(bottomNav);

    if (overflowItems.length) {
      const moreOverlay = el(`<div class="adminMobileMoreOverlay" id="adminMobileMoreOverlay" hidden aria-hidden="true">
        <div class="adminMobileMoreSheet" role="dialog" aria-modal="true" aria-labelledby="adminMobileMoreTitle">
          <div class="row" style="justify-content:space-between; align-items:center; width:auto;">
            <b id="adminMobileMoreTitle">More sections</b>
            <button type="button" class="btn btnGhost adminMobileMoreClose" data-admin-more-close="true">Close</button>
          </div>
          <div class="adminMobileMoreList">
            ${overflowItems
              .map(
                (item) => `<a class="adminMobileMoreLink ${item.active ? "active" : ""}" href="#${item.href}">
                  <span class="mobileBottomNavItemIcon">${item.icon}</span>
                  <span>${item.label}</span>
                </a>`
              )
              .join("")}
          </div>
        </div>
      </div>`);

      const openMore = () => {
        moreOverlay.hidden = false;
        moreOverlay.setAttribute("aria-hidden", "false");
        requestAnimationFrame(() => {
          moreOverlay.classList.add("open");
          const closeButton = moreOverlay.querySelector("[data-admin-more-close]");
          if (closeButton && typeof closeButton.focus === "function") closeButton.focus();
        });
      };

      const closeMore = () => {
        moreOverlay.classList.remove("open");
        moreOverlay.setAttribute("aria-hidden", "true");
        window.setTimeout(() => {
          moreOverlay.hidden = true;
        }, 130);
      };

      const moreButton = bottomNav.querySelector("#adminMobileMoreBtn");
      if (moreButton) {
        moreButton.addEventListener("click", openMore);
      }

      moreOverlay.addEventListener("click", (event) => {
        if (event.target === moreOverlay || event.target.closest("[data-admin-more-close]")) {
          closeMore();
        }
      });

      moreOverlay.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          closeMore();
          if (moreButton && typeof moreButton.focus === "function") moreButton.focus();
        }
      });

      moreOverlay.querySelectorAll("a.adminMobileMoreLink").forEach((link) => {
        link.addEventListener("click", closeMore);
      });

      app.appendChild(moreOverlay);
    }
  }

  return app;
}

function metricTile(label, value, hint = "") {
  return `<div class="card">
    <div class="mutedText" style="font-size:12px; text-transform:uppercase; letter-spacing:.04em;">${escapeHtml(label)}</div>
    <div style="font-size:28px; font-weight:700; margin-top:8px;">${escapeHtml(value)}</div>
    ${hint ? `<div class="mutedText" style="font-size:12px; margin-top:8px;">${escapeHtml(hint)}</div>` : ""}
  </div>`;
}

/** ---------- Actions ---------- **/
function login(email, password, role = "") {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedRole = String(role || "").trim().toLowerCase();
  const user = store.users.find(
    (entry) =>
      entry.email.toLowerCase() === normalizedEmail &&
      entry.password === password &&
      (!normalizedRole || entry.role === normalizedRole)
  );

  if (!user) {
    return {
      ok: false,
      error: normalizedRole ? "Invalid credentials or incorrect role selected." : "Invalid email or password."
    };
  }

  currentUserId = user.id;
  setSessionUserId(user.id);
  return { ok: true, user };
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
      .map(
        (step, index) => `<article class="ydhScrollCard" data-reveal="true" style="--stack-order:${index};">
          <div class="ydhScrollIndex">${index + 1}</div>
          <h3>${escapeHtml(step.title || "")}</h3>
          <p>${escapeHtml(step.description || "")}</p>
        </article>`
      )
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

function renderTiltedCards(cards = [], options = {}) {
  const className = options.className ? ` ${options.className}` : "";
  const actionLabel = options.actionLabel || "View";
  const actionHref = options.actionHref || "#/login";
  return `<div class="ydhTiltGrid${className}">
    ${cards
      .map(
        (card) => `<article class="ydhTiltCard" data-tilt-card="true">
          <span class="ydhTiltType">${escapeHtml(card.type || "")}</span>
          <h3>${escapeHtml(card.title || "")}</h3>
          <p>${escapeHtml(card.provider || "")}</p>
          <div class="ydhTiltMeta">${escapeHtml(card.province || "")}</div>
          <a class="btn btnGhost" href="${escapeHtml(card.href || actionHref)}">${escapeHtml(card.actionLabel || actionLabel)}</a>
        </article>`
      )
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

  applyInteractiveCardMotion(node, "[data-reflective-card]");
  applyInteractiveCardMotion(node, "[data-tilt-card]");

  setupRevealAnimation(node, "[data-reveal='true']");
}

// Public landing page render function.
function pageHome() {
  const heroCards = [
    {
      type: "Featured bursary",
      title: "Mechanical Engineering Bursary",
      provider: "National Skills Fund",
      province: "Gauteng"
    },
    {
      type: "Featured learnership",
      title: "Electrical Trade Learnership",
      provider: "Coastal Industry Group",
      province: "KwaZulu-Natal"
    },
    {
      type: "Featured short course",
      title: "IT Support Fundamentals",
      provider: "Digital Skills Academy",
      province: "Western Cape"
    }
  ];

  const howItWorksSteps = [
    {
      title: "Create your profile",
      description: "Build your learner profile with your province, education level, and goals."
    },
    {
      title: "Discover opportunities",
      description: "Find bursaries, learnerships, and courses matched to your profile."
    },
    {
      title: "Apply with confidence",
      description: "Submit applications using saved information and document vault support."
    },
    {
      title: "Track your progress",
      description: "Monitor statuses, get updates, and stay on top of next actions."
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
      type: "Bursary",
      title: "STEM Future Bursary",
      provider: "Youth Skills Trust",
      province: "Eastern Cape",
      href: "#/login",
      actionLabel: "Apply"
    },
    {
      type: "Engineering Learnership",
      title: "Industrial Technician Programme",
      provider: "Metro Engineering Group",
      province: "Limpopo",
      href: "#/login",
      actionLabel: "Apply"
    },
    {
      type: "IT Short Course",
      title: "Cloud Support Fast Track",
      provider: "CodeBridge Institute",
      province: "Western Cape",
      href: "#/login",
      actionLabel: "Apply"
    }
  ];

  const partnerCards = [
    {
      type: "SETA Partner",
      title: "Sector Skills Pipeline",
      provider: "MerSETA Collaboration",
      province: "National",
      href: "#/signup",
      actionLabel: "Partner"
    },
    {
      type: "Employer Network",
      title: "Verified Talent Access",
      provider: "FutureWork Employers",
      province: "National",
      href: "#/signup",
      actionLabel: "Join"
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
        <div class="landingHeroCopy" style="position:relative;">
          <div class="landingTagline">Connecting TVET students to real opportunities.</div>
          <h1>Find bursaries, learnerships, and courses in one place.</h1>
          <p>Youth Digital Hub helps students and graduates across South Africa discover opportunities, manage documents, and track applications.</p>
          <div class="landingHeroCtas">
            <a class="btn btnPrimary sparkButton" href="#/signup">Get Started</a>
            <a class="btn btnGhost" href="#/login">Login</a>
            <button type="button" class="btn btnGhost sparkButton" data-scroll-target="opportunity-showcase">Explore Opportunities</button>
          </div>
          ${renderBubbleMenu(bubbleActions)}
        </div>
        ${renderReflectiveCards(heroCards)}
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

      <section class="landingSection" id="platform-features">
        <div class="landingSectionHeading">
          <h2>Platform Features</h2>
          <p>Built to support students, graduates, employers, and SETA partners.</p>
        </div>
        ${renderAnimatedList(featureItems, { variant: "landing" })}
      </section>

      <section class="landingSection" id="opportunity-showcase">
        <div class="landingSectionHeading">
          <h2>Opportunity Showcase</h2>
          <p>Explore bursaries, learnerships, and short courses in one place.</p>
        </div>
        ${renderTiltedCards(opportunityCards, { className: "ydhTiltGrid--opportunity" })}
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
        <div class="landingSectionHeading">
          <h2>Verified Profile Preview</h2>
          <p>Showcase your student identity with profile completeness and education context.</p>
        </div>
        ${renderLanyardCard({
          name: "Thando Mkhize",
          status: "Learner status: Verified",
          province: "Province: KwaZulu-Natal",
          educationLevel: "TVET N6"
        })}
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
    if (user.role === "admin") navigate("/admin/dashboard");
    else navigate("/student/dashboard");
    return el(`<div class="content">Redirecting...</div>`);
  }

  const studentDemo = resolveDemoCredentialsByRole("student");
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
  const useAdminDemoButton = node.querySelector("#useAdminDemo");

  if (useStudentDemoButton) {
    useStudentDemoButton.addEventListener("click", () => applyDemoCredentials(studentDemo, "Student demo"));
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

    if (result.user.role === "admin") navigate("/admin/dashboard");
    else navigate("/student/dashboard");
  });

  return node;
}

function pageSignup() {
  const user = currentUser();
  if (user) {
    if (user.role === "admin") navigate("/admin/dashboard");
    else navigate("/student/dashboard");
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

  return `<div class="card" style="padding:12px; background:#f7f7f7;">
    <div class="row" style="justify-content:space-between;">
      <div style="font-weight:700;">Required documents checklist</div>
      <span class="badge ${checklist.complete ? "badgeGreen" : "badgeOrange"}">${checklist.complete ? "Documents Complete" : "Documents Incomplete"}</span>
    </div>

    <div class="desktopOnly" style="margin-top:10px;">
      <table class="table">
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
          (row) => `<div class="mobileListCard">
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
            <a class="btn btnGhost" href="#/student/documents">Upload / manage documents</a>
          </div>`
        : ""
    }
  </div>`;
}

// Reusable student opportunity-listing renderer (filters, sorting, and quick navigation).
function pageStudentListing(listingKey) {
  const user = requireRole("student");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const config = getStudentListingConfig(listingKey);
  const recommendedIds = recommendedIdsForStudent(user.id);
  const scopedOpportunities = getOpportunityCatalogue().filter((opportunity) =>
    config.typeFilter.includes(opportunity.type)
  );
  const sectors = Array.from(
    new Set(scopedOpportunities.map((opportunity) => resolveOpportunitySector(opportunity)))
  ).filter(Boolean);

  const node = el(`<div class="grid">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">${escapeHtml(config.title)}</h1>
      <p class="mutedText" style="margin:8px 0 0;">${escapeHtml(config.subtitle)}</p>
    </div>

    <div class="card filterPanel">
      <div class="filterRow">
        <div class="filterControl">
          <span>Search</span>
          <input class="input" id="searchInput" placeholder="Search by title, institution, or sector" />
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

    <div class="listingGrid" id="listingWrap"></div>
  </div>`);

  function renderListingItems() {
    const query = (node.querySelector("#searchInput").value || "").trim().toLowerCase();
    const province = node.querySelector("#provinceFilter").value;
    const sector = node.querySelector("#sectorFilter").value;
    const sort = node.querySelector("#sortFilter").value;
    const applicationsByOpportunity = new Map(
      studentApplications(user.id).map((application) => [application.opportunityId, application])
    );

    let filtered = scopedOpportunities.filter((opportunity) => {
      const searchable = [
        opportunity.title,
        opportunity.institution,
        resolveOpportunitySector(opportunity)
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !query || searchable.includes(query);
      const matchesProvince = !province || opportunity.location === province;
      const matchesSector = !sector || resolveOpportunitySector(opportunity) === sector;
      return matchesQuery && matchesProvince && matchesSector;
    });

    filtered = filtered.sort((first, second) => {
      if (sort === "az") {
        return first.title.localeCompare(second.title);
      }

      if (sort === "closing") {
        const firstValue = closingDateSortValue(first.closingDate);
        const secondValue = closingDateSortValue(second.closingDate);
        if (firstValue !== secondValue) return firstValue - secondValue;
        return first.title.localeCompare(second.title);
      }

      const firstRecommended = recommendedIds.has(first.id) ? 1 : 0;
      const secondRecommended = recommendedIds.has(second.id) ? 1 : 0;
      if (firstRecommended !== secondRecommended) return secondRecommended - firstRecommended;

      const firstValue = closingDateSortValue(first.closingDate);
      const secondValue = closingDateSortValue(second.closingDate);
      if (firstValue !== secondValue) return firstValue - secondValue;
      return first.title.localeCompare(second.title);
    });

    const listingWrap = node.querySelector("#listingWrap");
    if (!filtered.length) {
      listingWrap.innerHTML = `<div class="card" style="grid-column:1/-1;">
        <div class="mutedText">No opportunities match the selected filters.</div>
        <div class="row" style="margin-top:10px;">
          <button type="button" class="btn btnGhost" id="resetFiltersBtn">Reset filters</button>
        </div>
      </div>`;
      const resetButton = listingWrap.querySelector("#resetFiltersBtn");
      if (resetButton) {
        resetButton.onclick = () => {
          node.querySelector("#searchInput").value = "";
          node.querySelector("#provinceFilter").value = "";
          node.querySelector("#sectorFilter").value = "";
          node.querySelector("#sortFilter").value = "recommended";
          renderListingItems();
        };
      }
      return;
    }

    listingWrap.innerHTML = filtered
      .map((opportunity) => {
        const application = applicationsByOpportunity.get(opportunity.id) || null;
        const recommended = recommendedIds.has(opportunity.id);
        const docsComplete = application
          ? typeof application.docsComplete === "boolean"
            ? application.docsComplete
            : !Boolean(application.docsIncomplete)
          : getDocumentChecklist(user.id, opportunity.type).complete;
        const lifecycle = getOpportunityLifecycleState(application);
        const action = getOpportunityPrimaryAction(opportunity.id, application, recommended, lifecycle);
        const daysUntilClosing = daysUntilDate(opportunity.closingDate);
        const closingSoon = Number.isFinite(daysUntilClosing) && daysUntilClosing >= 0 && daysUntilClosing < 14;
        const submittedDate = application ? formatDate(application.createdAt) : "Not started";
        const progressSummary = getOpportunityProgressSummary(user, opportunity, application);
        const cardClasses = [
          "opportunityCard",
          getOpportunityCardTypeClass(opportunity.type),
          lifecycle.cardVariantClass,
          recommended && !application ? "card-priority" : ""
        ]
          .filter(Boolean)
          .join(" ");

        return `<article class="${cardClasses}">
          <div class="opportunityCardLayout">
            <div class="opportunityCardMain">
              <div class="row" style="justify-content:space-between; align-items:flex-start;">
                <span class="badge ${getOpportunityTypeBadgeClass(opportunity.type)}">${escapeHtml(opportunity.type)}</span>
                ${recommended && !application ? `<span class="badge recommendedFlag">Recommended</span>` : ""}
              </div>

              <h3 class="opportunityTitle">${escapeHtml(opportunity.title)}</h3>
              <p class="opportunityOrg">${escapeHtml(opportunity.institution)}</p>

              <div class="opportunityMetaStack">
                <div class="opportunityMetaRow"><span>Type</span><b>${escapeHtml(opportunity.type)}</b></div>
                <div class="opportunityMetaRow"><span>Closing</span><b>${formatDateLabel(opportunity.closingDate)}</b></div>
                <div class="opportunityMetaRow"><span>Submitted</span><b>${escapeHtml(submittedDate)}</b></div>
              </div>
              <div class="mutedText progressSummaryText">Progress: ${progressSummary.label}</div>

              ${closingSoon ? `<span class="closingSoon">Closing soon</span>` : ""}
              ${
                lifecycle.isInProgress
                  ? `<div class="progressMicro"><div class="progressMicroFill" style="--progress-width:${docsComplete ? "82%" : "58%"};"></div></div>`
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
  }

  ["#searchInput", "#provinceFilter", "#sectorFilter", "#sortFilter"].forEach((selector) => {
    const control = node.querySelector(selector);
    const eventName = selector === "#searchInput" ? "input" : "change";
    control.addEventListener(eventName, renderListingItems);
  });

  renderListingItems();
  return shell("student", node);
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
  const existingApplication = studentApplications(user.id).find((application) => application.opportunityId === opportunity.id) || null;
  const lifecycle = getOpportunityLifecycleState(existingApplication);
  const primaryAction = getOpportunityPrimaryAction(opportunity.id, existingApplication, true, lifecycle);

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
            : Array.isArray(opportunity.requiredDocuments) && opportunity.requiredDocuments.length
              ? opportunity.requiredDocuments.map((document) => String(document) + " required")
              : ["No requirements specified."]
          )
            .map((requirement) => `<li>${escapeHtml(requirement)}</li>`)
            .join("")}
        </ul>
      </div>

      <div class="row" style="margin-top:14px;">
        <a class="btn btnPrimary" href="${primaryAction.href}">${primaryAction.label}</a>
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

  return `<div class="card" style="padding:12px; background:#f7f7f7;">
    <div class="row" style="justify-content:space-between;">
      <div style="font-weight:700;">Documents checklist</div>
      <span class="badge ${checklist.complete ? "badgeGreen" : "badgeOrange"}">${checklist.complete ? "Documents Complete" : "Documents Incomplete"}</span>
    </div>

    <div class="desktopOnly" style="margin-top:10px;">
      <table class="table">
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
          return `<div class="mobileListCard">
            <div style="font-weight:700;">${escapeHtml(category)}</div>
            ${category === "Proof of Income" ? `<div class="mutedText" style="font-size:12px;">Optional for bursaries</div>` : ""}
            <div><span class="badge ${uploaded ? "badgeGreen" : "badgeOrange"}">${uploaded ? "Uploaded" : "Missing"}</span></div>
          </div>`;
        })
        .join("")}
    </div>

    <div class="row" style="margin-top:10px;">
      <a class="btn btnGhost" href="#/student/documents">Upload / manage documents</a>
    </div>
  </div>`;
}

// Student document upload/manage page (metadata + preview handling + remove actions).
function pageStudentDocuments() {
  const user = requireRole("student");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const documents = getStudentDocuments(user.id);
  const checklist = getDocumentChecklist(user.id);
  const proofOfAddressUploaded = Boolean(checklist.byCategory.find((item) => item.category === "Proof of Address")?.uploaded);
  const cvUploaded = Boolean(checklist.byCategory.find((item) => item.category === "CV")?.uploaded);
  const folderPreviewItems = [
    { label: "ID Copy", hint: "Identity verification file", status: checklist.hasIdCopy ? "Ready" : "Missing" },
    { label: "Academic Transcript", hint: "School or TVET academic evidence", status: checklist.hasAcademic ? "Ready" : "Missing" },
    { label: "Proof of Address", hint: "Residence confirmation", status: proofOfAddressUploaded ? "Ready" : "Missing" },
    { label: "CV", hint: "Career-ready learner profile", status: cvUploaded ? "Ready" : "Missing" }
  ];
  const profile = getUserProfile(user) || {};
  const displayName = getUserDisplayName(user);

  const node = el(`<div class="grid">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Documents</h1>
      <p class="mutedText" style="margin:8px 0 0;">Upload supporting documents for your applications (demo metadata only).</p>
    </div>

    <div class="card profileSummaryCard">
      ${renderUserAvatar(user, "avatarLg")}
      <div style="min-width:0;">
        <div style="font-weight:800; font-size:18px; line-height:1.2;">${escapeHtml(displayName)}</div>
        <div class="mutedText" style="font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(user.email || profile.email || "")}</div>
      </div>
    </div>

    <div class="card">
      ${renderFolderPreview(folderPreviewItems, {
        title: "Document vault",
        description: "Folder layout for the files required across applications.",
        className: "ydhFolderPreview--dashboard"
      })}
    </div>

    ${renderChecklistTable(user.id)}

    <div class="card">
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

    <div class="card">
      <div style="font-weight:700;">Uploaded documents</div>
      ${documents.length
        ? `<div>
            <div class="desktopOnly" style="margin-top:10px;">
              <table class="table">
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
                          ? `<img src="${document.previewDataUrl}" alt="preview" style="width:70px; height:50px; object-fit:cover; border:1px solid #999;" />`
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
                  (document) => `<div class="mobileListCard">
                    <div style="font-weight:700;">${escapeHtml(document.category)}</div>
                    <div>${escapeHtml(document.filename)}</div>
                    <div class="mutedText" style="font-size:12px;">${escapeHtml(document.fileType || inferFileType(document))} • ${formatBytes(document.size || 0)}</div>
                    <div class="mutedText" style="font-size:12px;">Uploaded: ${formatDate(document.uploadedAt)}</div>
                    ${
                      document.previewDataUrl
                        ? `<img src="${document.previewDataUrl}" alt="preview" style="width:100%; max-width:140px; height:88px; object-fit:cover; border:1px solid #999; border-radius:10px;" />`
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

  setupRevealAnimation(node, ".ydhFolderPreview--dashboard [data-reveal=\"true\"]");

  return shell("student", node);
}

function pageStudentApplication(applicationId) {
  const user = requireRole("student");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const application = studentApplications(user.id).find((entry) => entry.id === applicationId) || null;
  if (!application) {
    return shell(
      "student",
      el(`<div class="card">
        <div><b>Application not found.</b></div>
        <div class="mutedText" style="margin-top:8px;">This record may have been cleared after a demo data reset.</div>
        <div class="row" style="margin-top:12px;">
          <a class="btn btnPrimary" href="#/student/dashboard">Back to dashboard</a>
        </div>
      </div>`)
    );
  }

  return pageStudentApply(application.opportunityId);
}

// Student application form page with checklist context and submit event handling.
function pageStudentApply(courseId) {
  try {

  const user = requireRole("student");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

const opportunity = getOpportunity(courseId);
if (!opportunity) {
  return shell(
    "student",
    el(`<div class="card"><div><b>Opportunity not found.</b></div><div class="mutedText" style="margin-top:8px;">The selected opportunity could not be loaded.</div><div class="row" style="margin-top:12px;"><a class="btn btnGhost" href="#/student/dashboard">Back to dashboard</a></div></div>`)
  );
}

let checklist = getDocumentChecklist(user.id, opportunity.type);
  let existingApplication = studentApplications(user.id).find((application) => application.opportunityId === opportunity.id) || null;
  let progressState = buildApplicationProgressState(user, opportunity, existingApplication);

  let editorOpen = false;
  let editorError = "";
  let editorNotice = "";
  let profileImpactNoticeVisible = false;
  // Root cause fix: apply page crashed because editorDraft was used before declaration (ReferenceError).
  let editorDraft = createInlineProfileEditorDraft(getUserProfile(user) || {}, user);
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
    <input class="input" value="${escapeHtml(value || "Not set")}" readonly style="background:#f2f2f2;" />
  </div>`;

  const renderIncompleteDocsNotice = () =>
    checklist.complete
      ? ""
      : `<div class="card" style="margin-top:10px; padding:12px; background:#f7f7f7;">
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
  } catch (error) {
    console.error("[pageStudentApply:error]", error);
    console.error(error && error.stack ? error.stack : "");
    return shell("student", el(`<div class="card"><div><b>Unable to load application form.</b></div><div class="mutedText" style="margin-top:8px;">Check console logs for details.</div><div class="row" style="margin-top:12px;"><a class="btn btnGhost" href="#/student/dashboard">Back to dashboard</a></div></div>`));
  }
}

// Student dashboard page render: applications table, profile settings, and quick actions.
function pageStudentDashboard() {
  const user = requireRole("student");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const node = el(`<div class="grid">
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

  function getDashboardRows(studentId) {
    const applications = studentApplications(studentId);
    return applications.map((application) => {
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

    tableWrap.innerHTML = `<div class="mobileApplicationsRail" style="margin-top:4px;">
      ${filteredRows
        .map((row) => {
          const lifecycle = getOpportunityLifecycleState(row);
          const action = getOpportunityPrimaryAction(row.opportunityId, row, false, lifecycle);
          const closingDate = getOpportunity(row.opportunityId)?.closingDate || "";
          const closingSoon = (() => {
            const days = daysUntilDate(closingDate);
            return Number.isFinite(days) && days >= 0 && days < 14;
          })();
          const linkedOpportunity = getOpportunity(row.opportunityId) || {
            id: row.opportunityId,
            type: row.opportunityType,
            title: row.opportunityTitle,
            institution: row.institution,
            requirements: []
          };
          const progressSummary = getOpportunityProgressSummary(user, linkedOpportunity, row);
          const cardClasses = [
            "mobileApplicationCard",
            getOpportunityCardTypeClass(row.opportunityType),
            lifecycle.cardVariantClass,
            recommendedSet && recommendedSet.has(row.opportunityId) ? "card-priority" : ""
          ]
            .filter(Boolean)
            .join(" ");

          return `<article class="${cardClasses}">
            <div class="opportunityCardLayout">
              <div class="opportunityCardMain">
                <div class="row" style="justify-content:space-between; align-items:flex-start;">
                  <span class="badge ${getOpportunityTypeBadgeClass(row.opportunityType)}">${escapeHtml(row.opportunityType)}</span>
                  ${recommendedSet && recommendedSet.has(row.opportunityId) ? `<span class="badge recommendedFlag">Recommended</span>` : ""}
                </div>

                <h3 class="opportunityTitle">${escapeHtml(row.opportunityTitle)}</h3>
                <p class="opportunityOrg">${escapeHtml(row.institution)}</p>

                <div class="opportunityMetaStack">
                  <div class="opportunityMetaRow"><span>Type</span><b>${escapeHtml(row.opportunityType)}</b></div>
                  <div class="opportunityMetaRow"><span>Closing</span><b>${formatDateLabel(closingDate)}</b></div>
                  <div class="opportunityMetaRow"><span>Submitted</span><b>${formatDate(row.createdAt)}</b></div>
                </div>
                <div class="mutedText progressSummaryText">Progress: ${progressSummary.label}</div>

                ${closingSoon ? `<span class="closingSoon">Closing soon</span>` : ""}
                ${
                  lifecycle.isInProgress
                    ? `<div class="progressMicro"><div class="progressMicroFill" style="--progress-width:${row.docsComplete ? "84%" : "62%"};"></div></div>`
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
        .join("")}
    </div>`;
  }

  function getRecommendedForDashboard(studentId) {
    const recommendedIds = recommendedIdsForStudent(studentId);
    let items = getOpportunityCatalogue().filter((opportunity) => recommendedIds.has(opportunity.id)).slice(0, 4);

    if (!items.length) {
      items = getOpportunityCatalogue().slice(0, 4);
    }

    return items;
  }

  function buildDashboardUpdateItems(liveUser, rows, recommendations) {
    const checklist = getDocumentChecklist(liveUser.id);
    const openApplications = rows.filter((row) => normalizeApplicationStatus(row.status, "draft") !== "rejected").length;
    const submittedApplications = rows.filter((row) => Boolean(row.submittedAt)).length;
    const topRecommendation = recommendations[0];

    const updates = [
      String(openApplications) + " active application" + (openApplications === 1 ? "" : "s") + " in your pipeline.",
      checklist.complete
        ? "Required documents are complete for most applications."
        : "Complete your required documents to improve success rates.",
      String(submittedApplications) + " application" + (submittedApplications === 1 ? "" : "s") + " already submitted.",
      topRecommendation
        ? "Top match right now: " + String(topRecommendation.title || "Recommended opportunity") + "."
        : "New opportunities are available in your recommended categories.",
      "Career guidance updates keep recommendations aligned to your goals."
    ];

    return updates;
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
          : "dashboardHeroSection";
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
    root.innerHTML = `
      <div class="card dashboardQuickHeader" id="dashboardHeroSection">
        <div class="row" style="justify-content:space-between; align-items:center; width:100%;">
          <div class="row" style="align-items:center; flex-wrap:nowrap; min-width:0;">
            ${renderUserAvatar(
              { ...liveUser, profile: { ...(getUserProfile(liveUser) || {}), profilePhotoDataUrl: draftSettings.profilePhotoDataUrl || getUserPhotoDataUrl(liveUser) } },
              "avatarLg"
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

      <div class="card dashboardPromptCard" style="margin-top:12px;">
        <div style="font-weight:700;">Profile momentum</div>
        <div class="mutedText" style="margin-top:6px;">Complete your profile for smarter recommendations</div>
        <div class="mutedText" style="margin-top:6px;">Upload documents when you&#39;re ready to apply</div>
        <div class="row" style="margin-top:10px;">
          <a class="btn btnGhost" href="#/student/onboarding">Complete profile</a>
          <a class="btn btnGhost" href="#/student/documents">Manage documents</a>
        </div>
      </div>

      <div class="dashboardLayoutGrid" style="margin-top:16px;">
        <div class="dashboardPrimaryCol col-span-8">
          <div class="card dashboardCareerCard">
            <div class="dashboardSectionMeta">Recommended for you</div>
            <h3 class="dashboardSectionTitle" style="margin-top:6px;">Continue / Recommended</h3>
            <div class="recommendedStack" style="margin-top:10px;">
              ${(() => {
                const applicationByOpportunity = new Map(rows.map((row) => [row.opportunityId, row]));
                return recommendations
                  .map((item) => {
                    const application = applicationByOpportunity.get(item.id) || null;
                    const lifecycle = getOpportunityLifecycleState(application);
                    const action = getOpportunityPrimaryAction(item.id, application, true, lifecycle);
                    const daysUntilClosing = daysUntilDate(item.closingDate);
                    const closingSoon = Number.isFinite(daysUntilClosing) && daysUntilClosing >= 0 && daysUntilClosing < 14;
                    const progressSummary = getOpportunityProgressSummary(liveUser, item, application);
                    const cardClasses = [
                      "recommendedCard",
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
            <div class="mutedText" style="margin-top:10px; font-size:12px;">
              ${
                hasSavedGuidance
                  ? `Top quiz category: ${escapeHtml(guidanceRecord.result.topCategory)}`
                  : "Complete your career quiz for sharper recommendations."
              }
            </div>
          </div>

          <div class="card applicationsSection ${applicationsThemeClass}" id="dashboardApplicationsSection">
            <div class="dashboardSectionMeta">My Applications</div>
            <h3 class="dashboardSectionTitle" style="margin-top:6px;">Track and continue</h3>
            <div class="tabs applicationTabs ${applicationsThemeClass}" id="applicationTabs" style="margin-top:12px;">
              <button class="tab ${activeTab === "all" ? "active" : ""}" data-tab="all" type="button">All</button>
              <button class="tab ${activeTab === "Bursary" ? "active" : ""}" data-tab="Bursary" type="button">Bursaries</button>
              <button class="tab ${activeTab === "Learnership/Internship" ? "active" : ""}" data-tab="Learnership/Internship" type="button">Learnerships</button>
              <button class="tab ${activeTab === "Course" ? "active" : ""}" data-tab="Course" type="button">Courses</button>
            </div>
            <div id="applicationTableWrap" style="margin-top:12px;"></div>
          </div>
        </div>

        <div class="dashboardSupportCol col-span-4">
          <div id="dashboardDocumentsSection">
            ${renderRequiredDocumentsChecklist(liveUser.id, "", true)}
          </div>

          <div class="card dashboardUpdatesCard" id="dashboardUpdatesSection">
            <div class="dashboardSectionMeta">Recent updates</div>
            <h3 class="dashboardSectionTitle" style="margin-top:6px;">Latest Opportunities / Updates</h3>
            ${renderAnimatedList(buildDashboardUpdateItems(liveUser, rows, recommendations), { variant: "dashboard" })}
          </div>

          <div class="card compactProfileCard" id="dashboardProfileSection">
            <div class="profileSummaryCard">
              ${renderUserAvatar(
                { ...liveUser, profile: { ...(getUserProfile(liveUser) || {}), profilePhotoDataUrl: draftSettings.profilePhotoDataUrl || "" } },
                "avatarLg"
              )}
              <div style="min-width:0;">
                <div class="dashboardSectionMeta">Profile</div>
                <h3 style="margin-top:4px;">${escapeHtml(displayName)}</h3>
                <div class="mutedText" style="font-size:12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(liveUser.email || "")}</div>
              </div>
            </div>

            <div class="row" style="justify-content:space-between; margin-top:12px;">
              <div class="mutedText" style="font-size:12px; text-transform:uppercase; letter-spacing:.04em;">Profile completeness</div>
              <div style="font-weight:700;">${profileCompleteness}%</div>
            </div>
            <div class="applicationProgressBar profileCompletenessBar" style="margin-top:8px;">
              <div class="applicationProgressBarFill" style="width:${profileCompleteness}%;"></div>
            </div>
            <div class="mutedText" style="font-size:12px; margin-top:8px;">${profileCompletedCount} of ${profileTotalCount} profile items completed.</div>

            <details class="profileQuickEdit" style="margin-top:12px;" open>
              <summary>Quick edit profile</summary>
              <form id="studentSettingsForm" style="margin-top:12px;">
                <div class="grid cols-2">
                  <div class="field">
                    <label><b>First name</b></label>
                    <input class="input" id="settingFirstName" value="${escapeHtml(draftSettings.firstName || "")}" />
                  </div>
                  <div class="field">
                    <label><b>Surname</b></label>
                    <input class="input" id="settingSurname" value="${escapeHtml(draftSettings.surname || "")}" />
                  </div>
                </div>

                <div class="field">
                  <label><b>Email</b></label>
                  <input class="input" id="settingEmail" type="email" value="${escapeHtml(draftSettings.email || "")}" />
                </div>

                <div class="field">
                  <label><b>Password</b></label>
                  <input class="input" id="settingPassword" type="password" value="${escapeHtml(draftSettings.password || "")}" />
                </div>

                <div class="field">
                  <label><b>Profile photo (png/jpg/jpeg)</b></label>
                  <input class="input" id="settingPhoto" type="file" accept=".png,.jpg,.jpeg" />
                  ${
                    profilePhotoMeta
                      ? `<div class="mutedText" style="font-size:12px;">${escapeHtml(profilePhotoMeta.fileName || profilePhotoMeta.filename || "photo")} • ${escapeHtml(profilePhotoMeta.fileType || "")} • ${formatBytes(profilePhotoMeta.fileSize || profilePhotoMeta.size || 0)} • ${formatDate(profilePhotoMeta.uploadedAt)}</div>`
                      : `<div class="mutedText" style="font-size:12px;">No profile photo uploaded.</div>`
                  }
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

                <div id="settingsError" class="mutedText" style="color: var(--salmon-orange); margin-top:8px;">${escapeHtml(settingsError)}</div>
                <div id="settingsNotice" class="mutedText" style="color: var(--royal-blue); margin-top:4px;">${escapeHtml(settingsNotice)}</div>
              </form>
            </details>
          </div>
        </div>
      </div>
    `;

    const recommendedSet = recommendedIdsForStudent(liveUser.id);
    renderApplicationsSection(rows, recommendedSet);
    setupRevealAnimation(root, "#dashboardUpdatesSection [data-reveal=\"true\"]");

    root.querySelectorAll("#applicationTabs button[data-tab]").forEach((tab) => {
      tab.addEventListener("click", () => {
        activeTab = tab.getAttribute("data-tab");
        renderDashboardContent();
      });
    });

    const settingsForm = root.querySelector("#studentSettingsForm");
    settingsForm.addEventListener("submit", (event) => {
      event.preventDefault();
      settingsError = "";
      settingsNotice = "";

      const firstName = root.querySelector("#settingFirstName").value.trim();
      const surname = root.querySelector("#settingSurname").value.trim();
      const email = root.querySelector("#settingEmail").value.trim();
      const password = root.querySelector("#settingPassword").value;

      const result = updateStudentSettings(liveUser.id, {
        ...draftSettings,
        firstName,
        surname,
        email,
        password
      });

      if (!result.ok) {
        settingsError = result.error || "Unable to save settings.";
        renderDashboardContent();
        return;
      }

      savedSettings = getStudentSettingsState(result.user);
      draftSettings = { ...savedSettings };
      settingsNotice = "Profile settings saved.";
      render();
    });

    root.querySelector("#settingsCancelBtn").addEventListener("click", () => {
      draftSettings = { ...savedSettings };
      settingsError = "";
      settingsNotice = "Changes reverted.";
      renderDashboardContent();
    });

    root.querySelector("#settingsRemovePhotoBtn").addEventListener("click", () => {
      draftSettings.profilePhotoDataUrl = "";
      draftSettings.profilePhotoMeta = null;
      setStudentProfilePhoto(liveUser.id, "", null);
      savedSettings = {
        ...savedSettings,
        profilePhotoDataUrl: "",
        profilePhotoMeta: null
      };
      settingsError = "";
      settingsNotice = "Profile photo removed.";
      render();
    });

    root.querySelector("#settingPhoto").addEventListener("change", async (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;

      const fileType = inferFileType(file);
      const allowedPhotoTypes = new Set(["image/png", "image/jpeg"]);
      if (!allowedPhotoTypes.has(fileType)) {
        settingsError = "Profile photo must be png, jpg, or jpeg.";
        settingsNotice = "";
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
        settingsError = "";
        settingsNotice = "Profile photo updated.";
        render();
      } catch {
        settingsError = "Could not read selected image.";
        settingsNotice = "";
        renderDashboardContent();
      }
    });

    maybeScrollToDashboardView();
  }

  renderDashboardContent();
  return shell("student", node);
}

// Career Guidance page render: quiz steps, result scoring, pathway panel, and doc metadata actions.
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
    docError: ""
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

        <div class="card" style="margin-top:12px; background:#fff;">
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

        <div class="card" style="margin-top:12px; background:#fff;">
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
      <div class="row" style="justify-content:space-between;">
        <div class="mutedText" style="font-size:12px; text-transform:uppercase; letter-spacing:.04em;">Career Match Quiz</div>
      </div>
      ${renderQuizStepNavigator(totalSteps, state.step)}

      <div style="margin-top:16px;">
        <h2>${escapeHtml(question.label)}</h2>
        <div class="mutedText" style="margin-top:4px;">
          ${question.required ? "Required question" : "Optional - you can skip"}
        </div>
      </div>

      <div class="careerOptionsGrid" style="margin-top:12px;">
        ${optionsHtml}
      </div>

      <div id="careerQuizError" class="mutedText" style="margin-top:12px; color: var(--salmon-orange);">${escapeHtml(state.error || "")}</div>

      <div class="row" style="margin-top:14px; justify-content:space-between;">
        <button type="button" class="btn btnGhost" id="careerBackBtn" ${state.step === 0 ? "disabled" : ""}>Back</button>
        <div class="row">
          ${question.required ? "" : `<button type="button" class="btn btnGhost" id="careerSkipBtn">Skip</button>`}
          <button type="button" class="btn btnPrimary" id="careerNextBtn">${state.step === totalSteps - 1 ? "View Results" : "Next"}</button>
        </div>
      </div>
    </div>`;

    const currentStepIndicator = root.querySelector('[data-quiz-step-current="true"]');
    if (currentStepIndicator) {
      currentStepIndicator.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    }

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
          ? `<div class="card" style="background:#fff;">
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

function pageAdminOpportunities() {
  const user = requireRole("admin");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  let activeTab = "courses";
  let editorOpen = false;
  let editorError = "";
  let editingOpportunityId = "";
  let importNotice = "";
  let importError = "";

  const node = el(`<div class="grid">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Opportunity Management</h1>
      <p class="mutedText" style="margin:8px 0 0;">Create, edit, and bulk import courses, bursaries, and learnerships for students.</p>
    </div>

    <div class="card">
      <div class="row" style="justify-content:space-between; align-items:center;">
        <div>
          <div style="font-weight:700;">Opportunity library</div>
          <div class="mutedText" style="font-size:12px; margin-top:4px;">Student pages use these records first. If empty, seeded demo opportunities are shown.</div>
        </div>
        <button type="button" class="btn btnPrimary" id="btnAddOpportunity">Add new</button>
      </div>

      <div class="tabs" id="adminOpportunityTabs" style="margin-top:12px;">
        <button type="button" class="tab active" data-opp-tab="courses">Courses</button>
        <button type="button" class="tab" data-opp-tab="bursaries">Bursaries</button>
        <button type="button" class="tab" data-opp-tab="learnerships">Learnerships</button>
      </div>

      <div id="adminOpportunityListWrap" style="margin-top:12px;"></div>
    </div>

    <div class="card">
      <div style="font-weight:700;">Bulk import opportunities</div>
      <div class="mutedText" style="font-size:12px; margin-top:4px;">Upload a <code>.json</code> file or paste a JSON array to import multiple opportunities.</div>
      <div class="field" style="margin-top:10px;">
        <label><b>Upload JSON file</b></label>
        <input type="file" class="input" id="opportunityImportFile" accept=".json,application/json" />
      </div>
      <div class="field" style="margin-top:10px;">
        <label><b>Paste JSON array</b></label>
        <textarea id="opportunityImportText" class="input" rows="7" placeholder='[{"title":"Example","type":"Course","provider":"TVET","province":"Gauteng","sector":"IT","closingDate":"Rolling","tags":["IT"],"requiredDocuments":["ID Copy"]}]'></textarea>
      </div>
      <div class="row" style="margin-top:10px;">
        <button type="button" class="btn btnGhost" id="btnImportOpportunities">Import opportunities</button>
      </div>
      <div id="opportunityImportError" class="mutedText" style="color: var(--salmon-orange); margin-top:8px;"></div>
      <div id="opportunityImportNotice" class="mutedText" style="color: var(--royal-blue); margin-top:4px;"></div>
    </div>

    <div id="adminOpportunityEditorMount"></div>
  </div>`);

  function getTabLabel(bucket) {
    if (bucket === "bursaries") return "Bursaries";
    if (bucket === "learnerships") return "Learnerships";
    return "Courses";
  }

  function readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
      reader.onerror = () => reject(new Error("Unable to read file."));
      reader.readAsText(file);
    });
  }

  function getActiveTabOpportunities() {
    const opportunityStore = ensureOpportunityStore();
    const items = Array.isArray(opportunityStore[activeTab]) ? opportunityStore[activeTab] : [];
    return [...items].sort((first, second) => {
      const firstClosing = closingDateSortValue(first.closingDate);
      const secondClosing = closingDateSortValue(second.closingDate);
      if (firstClosing !== secondClosing) return firstClosing - secondClosing;
      return String(first.title || "").localeCompare(String(second.title || ""));
    });
  }

  function getEditingOpportunity() {
    if (!editingOpportunityId) return null;
    const opportunityStore = ensureOpportunityStore();
    return flattenOpportunityStore(opportunityStore).find((item) => item.id === editingOpportunityId) || null;
  }

  function closeEditor() {
    editorOpen = false;
    editingOpportunityId = "";
    editorError = "";
    renderEditor();
  }

  function openEditor(opportunityId = "") {
    editorOpen = true;
    editingOpportunityId = opportunityId || "";
    editorError = "";
    renderEditor();
  }

  function renderList() {
    const wrap = node.querySelector("#adminOpportunityListWrap");
    if (!wrap) return;

    const items = getActiveTabOpportunities();

    if (!items.length) {
      wrap.innerHTML = `<div class="mutedText">No ${escapeHtml(getTabLabel(activeTab).toLowerCase())} loaded yet.</div>`;
      return;
    }

    wrap.innerHTML = `<div style="overflow-x:auto;">
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Provider</th>
            <th>Province</th>
            <th>Sector</th>
            <th>Closing</th>
            <th>Tags</th>
            <th>Required docs</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${items
            .map(
              (item) => `<tr>
                <td><b>${escapeHtml(item.title)}</b><div class="mutedText" style="font-size:12px; margin-top:4px;">${escapeHtml(item.type)}</div></td>
                <td>${escapeHtml(item.provider || item.institution || "-")}</td>
                <td>${escapeHtml(item.province || item.location || "-")}</td>
                <td>${escapeHtml(item.sector || "-")}</td>
                <td>${escapeHtml(formatDateLabel(item.closingDate))}</td>
                <td>${escapeHtml((item.tags || []).join(", ") || "-")}</td>
                <td>${escapeHtml((item.requiredDocuments || []).join(", ") || "-")}</td>
                <td>
                  <div class="row" style="gap:6px; flex-wrap:wrap;">
                    <button type="button" class="btn btnGhost" data-opp-edit="${item.id}" style="padding:6px 10px;">Edit</button>
                    <button type="button" class="btn btnGhost" data-opp-delete="${item.id}" style="padding:6px 10px;">Delete</button>
                  </div>
                </td>
              </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>`;

    wrap.querySelectorAll("button[data-opp-edit]").forEach((button) => {
      button.addEventListener("click", () => {
        openEditor(button.getAttribute("data-opp-edit") || "");
      });
    });

    wrap.querySelectorAll("button[data-opp-delete]").forEach((button) => {
      button.addEventListener("click", () => {
        const opportunityId = button.getAttribute("data-opp-delete") || "";
        if (!opportunityId) return;
        if (!confirm("Delete this opportunity?")) return;
        deleteOpportunityRecord(opportunityId);
        renderList();
      });
    });
  }

  function renderEditor() {
    const mount = node.querySelector("#adminOpportunityEditorMount");
    if (!mount) return;

    if (!editorOpen) {
      mount.innerHTML = "";
      return;
    }

    const editing = getEditingOpportunity();
    const typeValue = editing?.type || defaultTypeForOpportunityBucket(activeTab);
    const isRolling = String(editing?.closingDate || "Rolling") === "Rolling";
    const selectedDocs = Array.isArray(editing?.requiredDocuments) ? editing.requiredDocuments : [];

    mount.innerHTML = `<div id="adminOpportunityEditorOverlay" style="position:fixed; inset:0; background:rgba(0,0,0,0.45); z-index:1200; padding:16px; display:flex; align-items:flex-start; justify-content:center; overflow:auto;">
      <section class="card" role="dialog" aria-modal="true" aria-labelledby="adminOpportunityEditorTitle" style="width:min(760px, 100%); margin:10px 0;">
        <div class="row" style="justify-content:space-between; align-items:flex-start;">
          <div>
            <h3 id="adminOpportunityEditorTitle" style="margin:0;">${editing ? "Edit opportunity" : "Add opportunity"}</h3>
            <div class="mutedText" style="font-size:12px; margin-top:4px;">Manage ${escapeHtml(getTabLabel(activeTab).toLowerCase())} visibility for students.</div>
          </div>
          <button type="button" class="btn btnGhost" id="btnCloseOpportunityEditor">Close</button>
        </div>

        <form id="adminOpportunityForm" style="margin-top:12px;">
          <div class="grid cols-2">
            <div class="field">
              <label><b>Title</b></label>
              <input class="input" id="oppTitle" value="${escapeHtml(editing?.title || "")}" required />
            </div>
            <div class="field">
              <label><b>Type</b></label>
              <select class="input select" id="oppType">
                ${OPPORTUNITY_TYPES.map((type) => `<option value="${type}" ${typeValue === type ? "selected" : ""}>${type}</option>`).join("")}
              </select>
            </div>
          </div>

          <div class="grid cols-2">
            <div class="field">
              <label><b>Provider</b></label>
              <input class="input" id="oppProvider" value="${escapeHtml(editing?.provider || editing?.institution || "")}" />
            </div>
            <div class="field">
              <label><b>Province</b></label>
              <select class="input select" id="oppProvince">
                <option value="National">National</option>
                ${PROVINCES.map((province) => `<option value="${province}" ${(editing?.province || editing?.location || "National") === province ? "selected" : ""}>${province}</option>`).join("")}
              </select>
            </div>
          </div>

          <div class="grid cols-2">
            <div class="field">
              <label><b>Sector</b></label>
              <input class="input" id="oppSector" value="${escapeHtml(editing?.sector || "")}" />
            </div>
            <div class="field">
              <label><b>Closing date</b></label>
              <input class="input" id="oppClosingDate" type="date" value="${!isRolling ? escapeHtml(editing?.closingDate || "") : ""}" ${isRolling ? "disabled" : ""} />
              <label style="margin-top:6px; display:flex; align-items:center; gap:6px;">
                <input type="checkbox" id="oppClosingRolling" ${isRolling ? "checked" : ""} /> Rolling
              </label>
            </div>
          </div>

          <div class="field">
            <label><b>Tags (comma separated)</b></label>
            <input class="input" id="oppTags" value="${escapeHtml((editing?.tags || []).join(", "))}" />
          </div>

          <div class="field">
            <label><b>Required documents</b></label>
            <div class="grid cols-2" style="gap:8px;">
              ${OPPORTUNITY_REQUIRED_DOCUMENT_OPTIONS.map((doc) => `<label class="card" style="padding:8px; display:flex; align-items:center; gap:8px;"><input type="checkbox" data-opp-required-doc="${doc}" ${selectedDocs.includes(doc) ? "checked" : ""} /> ${doc}</label>`).join("")}
            </div>
          </div>

          <div id="oppEditorError" class="mutedText" style="color: var(--salmon-orange); margin-top:8px;">${escapeHtml(editorError)}</div>

          <div class="row" style="margin-top:12px; justify-content:flex-end;">
            <button type="button" class="btn btnGhost" id="btnCancelOpportunityEditor">Cancel</button>
            <button type="submit" class="btn btnPrimary">${editing ? "Save changes" : "Create opportunity"}</button>
          </div>
        </form>
      </section>
    </div>`;

    const overlay = mount.querySelector("#adminOpportunityEditorOverlay");
    const closeButton = mount.querySelector("#btnCloseOpportunityEditor");
    const cancelButton = mount.querySelector("#btnCancelOpportunityEditor");
    const form = mount.querySelector("#adminOpportunityForm");
    const rollingCheckbox = mount.querySelector("#oppClosingRolling");
    const closingInput = mount.querySelector("#oppClosingDate");

    if (overlay) {
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) closeEditor();
      });
    }

    if (closeButton) closeButton.addEventListener("click", closeEditor);
    if (cancelButton) cancelButton.addEventListener("click", closeEditor);

    if (rollingCheckbox && closingInput) {
      rollingCheckbox.addEventListener("change", () => {
        closingInput.disabled = rollingCheckbox.checked;
        if (rollingCheckbox.checked) closingInput.value = "";
      });
    }

    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const requiredDocuments = Array.from(form.querySelectorAll("input[data-opp-required-doc]:checked")).map((input) => input.getAttribute("data-opp-required-doc"));
        const closingDate = rollingCheckbox && rollingCheckbox.checked ? "Rolling" : String(closingInput?.value || "").trim();

        const payload = {
          id: editing?.id || uid("opp"),
          title: String(form.querySelector("#oppTitle")?.value || "").trim(),
          type: String(form.querySelector("#oppType")?.value || "").trim(),
          provider: String(form.querySelector("#oppProvider")?.value || "").trim(),
          province: String(form.querySelector("#oppProvince")?.value || "").trim(),
          sector: String(form.querySelector("#oppSector")?.value || "").trim(),
          closingDate,
          tags: String(form.querySelector("#oppTags")?.value || ""),
          requiredDocuments
        };

        if (!payload.title) {
          editorError = "Title is required.";
          renderEditor();
          return;
        }

        if (!payload.closingDate) {
          editorError = "Provide a closing date or select Rolling.";
          renderEditor();
          return;
        }

        const result = upsertOpportunityRecord(payload);
        if (!result.ok) {
          editorError = result.error || "Unable to save opportunity.";
          renderEditor();
          return;
        }

        importError = "";
        importNotice = result.updated ? "Opportunity updated." : "Opportunity created.";
        editorOpen = false;
        editingOpportunityId = "";
        editorError = "";
        renderImportMessages();
        renderEditor();
        renderList();
      });
    }
  }

  function renderImportMessages() {
    const notice = node.querySelector("#opportunityImportNotice");
    const error = node.querySelector("#opportunityImportError");
    if (notice) notice.textContent = importNotice;
    if (error) error.textContent = importError;
  }

  async function handleImport() {
    importNotice = "";
    importError = "";

    const fileInput = node.querySelector("#opportunityImportFile");
    const file = fileInput?.files && fileInput.files[0];
    const textArea = node.querySelector("#opportunityImportText");
    let rawText = String(textArea?.value || "").trim();

    if (!rawText && file) {
      try {
        rawText = String(await readFileAsText(file)).trim();
      } catch {
        importError = "Could not read selected file.";
        renderImportMessages();
        return;
      }
    }

    if (!rawText) {
      importError = "Upload a JSON file or paste a JSON array first.";
      renderImportMessages();
      return;
    }

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      importError = "Invalid JSON format.";
      renderImportMessages();
      return;
    }

    const result = importOpportunitiesFromArray(parsed);
    if (!result.ok) {
      importError = result.error || "Import failed.";
      renderImportMessages();
      return;
    }

    importNotice = `Import complete: ${result.inserted} added, ${result.updated} updated, ${result.skipped} skipped.`;
    importError = "";
    renderImportMessages();
    renderList();
  }

  node.querySelector("#btnAddOpportunity")?.addEventListener("click", () => {
    openEditor("");
  });

  node.querySelectorAll("#adminOpportunityTabs button[data-opp-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      activeTab = button.getAttribute("data-opp-tab") || "courses";
      node.querySelectorAll("#adminOpportunityTabs button[data-opp-tab]").forEach((tab) => {
        tab.classList.toggle("active", tab === button);
      });
      renderList();
    });
  });

  node.querySelector("#btnImportOpportunities")?.addEventListener("click", handleImport);

  renderImportMessages();
  renderList();
  renderEditor();

  return shell("admin", node);
}

// Admin corporate overview page render (portfolio metrics and summary tiles).
function pageAdminCorporate() {
  const user = requireRole("admin");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const rows = buildApplicationRows("all");
  const bursaryRows = rows.filter((row) => row.opportunityType === "Bursary");
  const learnershipRows = rows.filter((row) => isLearnershipType(row.opportunityType));
  const courseRows = rows.filter((row) => row.opportunityType === "Course");
  const shortlisted = rows.filter((row) => row.meta.shortlisted).length;
  const fundedBursaryRows = bursaryRows.filter((row) => row.meta.funded);
  const graduatesAvailableRows = bursaryRows.filter((row) => row.meta.funded && row.meta.graduated);
  const activeBursaryStudentIds = new Set(
    fundedBursaryRows
      .filter((row) => !row.meta.graduated)
      .map((row) => row.student?.id || row.application.studentId)
  );
  const fundedStudentIds = new Set(
    fundedBursaryRows.map((row) => row.student?.id || row.application.studentId)
  );
  const conversionRate = bursaryRows.length
    ? ((fundedBursaryRows.length / bursaryRows.length) * 100).toFixed(1)
    : "0.0";

  const node = el(`<div class="grid">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Corporate Executive Dashboard</h1>
      <p class="mutedText" style="margin:8px 0 0;">National bursary pipeline overview and transformation snapshot.</p>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));">
      ${metricTile("Applications Received", String(rows.length), "All opportunity types")}
      ${metricTile("Bursary Applications", String(bursaryRows.length), "Bursary-specific count")}
      ${metricTile("Learnership/Internship Applications", String(learnershipRows.length))}
      ${metricTile("Course Applications", String(courseRows.length))}
      ${metricTile("Total Active Bursary Students", String(activeBursaryStudentIds.size))}
      ${metricTile("Shortlisted Candidates", String(shortlisted))}
      ${metricTile("Funded Students", String(fundedStudentIds.size))}
      ${metricTile("Pipeline Conversion Rate", `${conversionRate}%`, "Funded bursary students / bursary applications")}
      ${metricTile("Graduates Available for Placement", String(graduatesAvailableRows.length))}
      ${metricTile("Transformation & ESG", "52% / 41% / 87%", "Women / Rural / Youth inclusion")}
    </div>

    ${
      rows.length
        ? ""
        : `<div class="card">
            <div><b>No applications yet.</b></div>
            <div class="mutedText" style="margin-top:6px;">Use seed data to populate demo applications instantly.</div>
            <div class="row" style="margin-top:10px;">
              <button class="btn btnPrimary" id="btnSeedFromCorporate" type="button">Seed demo applications</button>
            </div>
          </div>`
    }

    <div class="card">
      <div style="font-weight:700;">Type Distribution Snapshot</div>
      <table class="table" style="margin-top:10px;">
        <thead><tr><th>Type</th><th>Applications</th><th>Share</th></tr></thead>
        <tbody>
          <tr><td>Bursary</td><td>${bursaryRows.length}</td><td>${rows.length ? ((bursaryRows.length / rows.length) * 100).toFixed(1) : "0.0"}%</td></tr>
          <tr><td>Learnership/Internship</td><td>${learnershipRows.length}</td><td>${rows.length ? ((learnershipRows.length / rows.length) * 100).toFixed(1) : "0.0"}%</td></tr>
          <tr><td>Course</td><td>${courseRows.length}</td><td>${rows.length ? ((courseRows.length / rows.length) * 100).toFixed(1) : "0.0"}%</td></tr>
        </tbody>
      </table>
    </div>

    <div class="card">
      <div style="font-weight:700;">Transformation & ESG Metrics Summary</div>
      <div class="grid cols-3" style="margin-top:10px;">
        <div class="card" style="padding:10px;">
          <div class="mutedText" style="font-size:12px;">Women participation</div>
          <div style="font-size:22px; font-weight:700;">52%</div>
        </div>
        <div class="card" style="padding:10px;">
          <div class="mutedText" style="font-size:12px;">Rural representation</div>
          <div style="font-size:22px; font-weight:700;">41%</div>
        </div>
        <div class="card" style="padding:10px;">
          <div class="mutedText" style="font-size:12px;">Youth under 30</div>
          <div style="font-size:22px; font-weight:700;">87%</div>
        </div>
      </div>
    </div>
  </div>`);

  const seedButton = node.querySelector("#btnSeedFromCorporate");
  if (seedButton) {
    seedButton.addEventListener("click", () => {
      seedDemoApplicationsIfEmpty();
      render();
    });
  }

  return shell("admin", node);
}

// Reusable admin drawer status list keeps semantic labels while preserving existing status values.
function getApplicantDrawerStatusOptions() {
  return [
    { value: "Submitted", label: "Submitted" },
    { value: "Under Review", label: "In review" },
    { value: "Rejected", label: "Rejected" },
    { value: "Accepted", label: "Funded" }
  ];
}

function getApplicantStatusLabel(status) {
  if (status === "Under Review") return "In review";
  if (status === "Accepted") return "Funded";
  return status || "Submitted";
}

// Applicant drawer document requirements align with checklist logic used across student/admin views.
function getApplicantDocumentRows(opportunityType, studentDocuments = []) {
  const documents = Array.isArray(studentDocuments) ? studentDocuments : [];
  const findByCategory = (category) => documents.find((document) => document.category === category) || null;

  const academicDocument =
    ACADEMIC_DOC_CATEGORIES.map((category) => findByCategory(category)).find(Boolean) || null;

  const rows = [
    {
      key: "id-copy",
      label: "ID Copy",
      required: true,
      document: findByCategory("ID Copy")
    },
    {
      key: "academic",
      label: "Academic Document (Matric/Report OR Transcript)",
      required: true,
      document: academicDocument
    }
  ];

  if (opportunityType === "Bursary") {
    rows.push({
      key: "proof-income",
      label: "Proof of Income",
      required: false,
      document: findByCategory("Proof of Income")
    });
  }

  return rows.map((row) => ({
    ...row,
    submitted: Boolean(row.document)
  }));
}

// Reusable ApplicantDetailDrawer component for admin review workflows.
function renderApplicantDetailDrawer(options = {}) {
  const {
    open = false,
    applicantId = "",
    context = null
  } = options;

  if (!open || !context || !context.row) {
    return `<div class="adminApplicantDrawerOverlay" id="applicantDrawerOverlay" hidden aria-hidden="true"></div>`;
  }

  const { row, profile, documentRows } = context;
  const safeProfile = profile && typeof profile === "object" ? profile : {};
  const statusLabel = getApplicantStatusLabel(row.application.status);
  const statusBadgeClass =
    row.application.status === "Rejected"
      ? "badge badgeOrange"
      : row.application.status === "Accepted"
        ? "badge badgeGreen"
        : "badge badgeBlue";
  const appliedDate = formatDate(row.application.createdAt);
  const interests = Array.isArray(safeProfile.interests) && safeProfile.interests.length
    ? safeProfile.interests.join(", ")
    : "No interests captured";
  const timelineEntries = [
    { label: "Applied", value: appliedDate },
    { label: "Current status", value: statusLabel },
    { label: "Shortlisted", value: row.meta.shortlisted ? "Yes" : "No" },
    { label: "Interviewed", value: row.meta.interviewed ? "Yes" : "No" },
    { label: "Funded", value: row.meta.funded ? "Yes" : "No" },
    { label: "Graduated", value: row.meta.graduated ? "Yes" : "No" }
  ];

  if (row.meta.fundedAt) {
    timelineEntries.push({ label: "Funded date", value: formatDate(row.meta.fundedAt) });
  }

  const statusOptions = getApplicantDrawerStatusOptions();
  const tagButton = (key, label, active) =>
    `<button type="button" class="tab adminDrawerActionBtn ${active ? "active" : ""}" data-drawer-tag-appid="${row.application.id}" data-drawer-tag-key="${key}" data-drawer-tag-active="${active ? "1" : "0"}">${label}</button>`;

  return `<div class="adminApplicantDrawerOverlay open" id="applicantDrawerOverlay" aria-hidden="false">
    <section class="adminApplicantDrawerPanel application-view" id="applicantDrawerPanel" role="dialog" aria-modal="true" aria-labelledby="applicantDrawerTitle" tabindex="-1" data-page="application-view" data-applicant-id="${escapeHtml(applicantId)}">
      <header class="adminApplicantDrawerHeader">
        <div class="adminApplicantHeaderIdentity">
          ${renderUserAvatar(row.student, "avatarMd")}
          <div style="min-width:0;">
            <h3 id="applicantDrawerTitle">${escapeHtml(getUserDisplayName(row.student))}</h3>
            <div class="mutedText" style="font-size:12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(row.student?.email || "-")}</div>
            <div class="mutedText" style="font-size:12px; margin-top:2px;">Applied: ${escapeHtml(row.opportunity?.title || "Unknown opportunity")}</div>
          </div>
        </div>
        <div class="adminApplicantHeaderActions">
          <span class="${statusBadgeClass}">${escapeHtml(statusLabel)}</span>
          <button type="button" class="btn btnGhost adminApplicantDrawerClose" id="closeApplicantDrawerBtn" aria-label="Close applicant details">Close</button>
        </div>
      </header>

      <div class="adminApplicantDrawerBody">
        <section class="card adminApplicantSection">
          <div class="adminApplicantSectionTitle">Applicant summary</div>
          <div class="adminApplicantInfoGrid">
            <div><span>Age</span><b>${escapeHtml(safeProfile.age || "-")}</b></div>
            <div><span>Province</span><b>${escapeHtml(safeProfile.province || "-")}</b></div>
            <div><span>Education level</span><b>${escapeHtml(safeProfile.educationLevel || "-")}</b></div>
            <div><span>Interests</span><b>${escapeHtml(interests)}</b></div>
          </div>
          <div class="adminApplicantScoreRow">
            <div class="adminApplicantScoreLead">AI score: <b>${row.score.score}</b></div>
            <ul class="adminApplicantInsightList">
              ${row.score.reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}
            </ul>
          </div>
        </section>

        <section class="card adminApplicantSection">
          <div class="adminApplicantSectionTitle">Documents</div>
          <div class="adminApplicantDocList">
            ${documentRows
              .map((item) => {
                const doc = item.document;
                const statusText = item.submitted ? "✅ Submitted" : "❌ Missing";
                const statusClass = item.submitted ? "is-submitted" : "is-missing";
                return `<article class="adminApplicantDocRow">
                  <div>
                    <div class="adminApplicantDocName">${escapeHtml(item.label)} ${item.required ? `<span class="mutedText" style="font-size:11px;">(Required)</span>` : `<span class="mutedText" style="font-size:11px;">(Optional)</span>`}</div>
                    <div class="mutedText" style="font-size:12px; margin-top:3px;">${doc ? escapeHtml(doc.filename || doc.category) : "No file uploaded"}</div>
                  </div>
                  <div class="adminApplicantDocActions">
                    <span class="adminApplicantDocStatus ${statusClass}">${statusText}</span>
                    <button type="button" class="btn btnGhost adminApplicantMiniBtn" data-drawer-doc-preview="${doc ? doc.id : ""}" ${doc ? "" : "disabled"}>Preview</button>
                    <button type="button" class="btn btnGhost adminApplicantMiniBtn" data-drawer-doc-download="${doc ? doc.id : ""}" ${doc ? "" : "disabled"}>Download</button>
                  </div>
                </article>`;
              })
              .join("")}
          </div>
        </section>

        <section class="card adminApplicantSection">
          <div class="adminApplicantSectionTitle">Application info</div>
          <div class="adminApplicantInfoGrid">
            <div><span>Opportunity</span><b>${escapeHtml(row.opportunity?.title || "Unknown opportunity")}</b></div>
            <div><span>Submission date</span><b>${escapeHtml(appliedDate)}</b></div>
            <div><span>Status</span><b>${escapeHtml(statusLabel)}</b></div>
            <div><span>Eligibility result</span><b>${row.eligibility.pass ? "Pass" : "Fail"}</b></div>
          </div>
          <div class="adminApplicantNotes">
            <label class="adminApplicantNotesLabel" for="drawerNotesField"><b>Notes</b></label>
            <textarea id="drawerNotesField" class="adminApplicantNotesField" rows="4" placeholder="Add internal notes for this applicant...">${escapeHtml(row.eligibility.reasons[0] || "")}</textarea>
          </div>
        </section>

        <section class="card adminApplicantSection">
          <div class="adminApplicantSectionTitle">Eligibility + AI insights</div>
          <div class="row" style="justify-content:space-between; align-items:flex-start;">
            <span class="badge ${row.eligibility.pass ? "badgeGreen" : "badgeOrange"}">${row.eligibility.pass ? "Eligibility: Pass" : "Eligibility: Fail"}</span>
            <span class="badge badgeBlue">AI score: ${row.score.score}</span>
          </div>
          <ul class="adminApplicantInsightList" style="margin-top:8px;">
            ${row.eligibility.reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}
            ${row.score.reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}
          </ul>
        </section>

        <section class="card adminApplicantSection">
          <div class="adminApplicantSectionTitle">Application timeline</div>
          <div class="adminApplicantTimeline">
            ${timelineEntries
              .map(
                (entry) => `<div class="adminApplicantTimelineRow">
                  <span>${escapeHtml(entry.label)}</span>
                  <b>${escapeHtml(entry.value)}</b>
                </div>`
              )
              .join("")}
          </div>
        </section>
      </div>

      <footer class="adminApplicantDrawerFooter">
        <div class="adminApplicantFooterActions">
          ${tagButton("shortlisted", "Tag shortlisted", row.meta.shortlisted)}
          ${tagButton("interviewed", "Tag interviewed", row.meta.interviewed)}
          ${tagButton("funded", "Tag funded", row.meta.funded)}
          ${tagButton("graduated", "Mark graduated", row.meta.graduated)}
        </div>
        <div class="adminApplicantFooterStatus">
          <label for="drawerStatusSelect"><b>Change status</b></label>
          <select class="input select" id="drawerStatusSelect" data-drawer-status-appid="${row.application.id}">
            ${statusOptions
              .map(
                (option) => `<option value="${option.value}" ${row.application.status === option.value ? "selected" : ""}>${option.label}</option>`
              )
              .join("")}
          </select>
        </div>
        <div class="adminApplicantFooterBottom">
          <button type="button" class="btn btnGhost" data-close-applicant-drawer="true">Close</button>
        </div>
      </footer>
    </section>
  </div>`;
}

// Admin bursary management page render (config, candidate review table, exports, tagging).
function pageAdminBursaries() {
  const user = requireRole("admin");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const config = store.bursaryConfig;
  let drawerOpen = false;
  let drawerApplicationId = "";
  let drawerFocusCleanup = () => {};
  let drawerPageScrollY = 0;
  let drawerBodyOverflowBefore = "";
  let drawerBodyLocked = false;

  const node = el(`<div class="grid">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Bursary Application Management</h1>
      <p class="mutedText" style="margin:8px 0 0;">Configure rules, review candidates, tag pipeline stages, and export data.</p>
    </div>

    <div class="card">
      <div style="font-weight:700;">Custom Branded Bursary Portal (Demo)</div>
      <form id="configForm" class="grid" style="margin-top:10px;">
        <div class="grid cols-2">
          <div class="field">
            <label><b>Brand name</b></label>
            <input id="brandName" class="input" value="${escapeHtml(config.brandName || "")}" />
          </div>
          <div class="field">
            <label><b>Logo placeholder</b></label>
            <div class="placeholder" style="height:60px;"></div>
          </div>
        </div>

        <div style="font-weight:700; margin-top:6px;">Eligibility Rules Configuration</div>
        <div class="grid cols-3">
          <div class="field">
            <label><b>Minimum age</b></label>
            <input id="ruleMinAge" class="input" type="number" min="0" value="${escapeHtml(config.eligibility.minAge || "")}" />
          </div>
          <div class="field">
            <label><b>Province filter</b></label>
            <select id="ruleProvince" class="input select">
              <option value="">Any province</option>
              ${PROVINCES.map(
                (province) => `<option ${config.eligibility.province === province ? "selected" : ""} value="${province}">${province}</option>`
              ).join("")}
            </select>
          </div>
          <div class="field">
            <label><b>Scoring target province</b></label>
            <select id="targetProvince" class="input select">
              <option value="">No target province</option>
              ${PROVINCES.map(
                (province) => `<option ${config.targetProvince === province ? "selected" : ""} value="${province}">${province}</option>`
              ).join("")}
            </select>
          </div>
        </div>

        <div class="field">
          <label><b>Required interest(s)</b></label>
          <div class="grid cols-3">
            ${INTERESTS.map((interest) => {
              const checked = config.eligibility.requiredInterests.includes(interest) ? "checked" : "";
              return `<label class="card" style="padding:8px; display:flex; gap:8px; align-items:center;">
                <input type="checkbox" data-required-interest="${interest}" ${checked} /> ${interest}
              </label>`;
            }).join("")}
          </div>
        </div>

        <div class="row">
          <button class="btn btnPrimary" type="submit">Save portal + rule configuration</button>
        </div>
      </form>
    </div>

    <div class="card">
      <div class="row" style="justify-content:space-between; align-items:flex-end;">
        <div>
          <div style="font-weight:700;">Bulk Application Export</div>
          <div class="mutedText" style="font-size:12px; margin-top:4px;">Export the currently filtered list.</div>
        </div>
        <div class="row">
          <input id="filterQuery" class="input" placeholder="Filter by student, opportunity, email" style="min-width:220px;" />
          <select id="typeFilter" class="input select" style="min-width:220px;">
            <option value="Bursary">Bursary (Default)</option>
            <option value="all">All opportunity types</option>
            <option value="Learnership/Internship">Learnerships/Internships</option>
            <option value="Course">Courses</option>
          </select>
          <button type="button" class="btn btnGhost" id="btnSeedApplications">Seed demo applications</button>
          <button type="button" class="btn btnGhost" id="btnExportCsv">Export CSV</button>
          <button type="button" class="btn btnGhost" id="btnExportPdf">Export PDF</button>
        </div>
      </div>
    </div>

    <div class="card">
      <div style="font-weight:700;">Bursary Applications</div>
      <div class="mutedText" style="margin-top:4px;">Automated document collection, eligibility labels, AI score, shortlist/interview/funded/graduated tagging.</div>
      <div id="candidateTableWrap" style="margin-top:12px;"></div>
    </div>

    <div id="pdfModal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.25); align-items:center; justify-content:center; padding:16px;">
      <div class="card" style="max-width:460px; width:100%;">
        <div style="font-weight:700;">PDF Export (Demo)</div>
        <div class="mutedText" style="margin-top:8px;">PDF export will be enabled in the full production build.</div>
        <div class="row" style="margin-top:14px; justify-content:flex-end;">
          <button type="button" class="btn btnPrimary" id="btnClosePdfModal">Close</button>
        </div>
      </div>
    </div>

    <div id="applicantDrawerMount"></div>
  </div>`);

  function clearDrawerFocusTrap() {
    if (typeof drawerFocusCleanup === "function") {
      drawerFocusCleanup();
    }
    drawerFocusCleanup = () => {};
  }

  function lockDrawerBackgroundScroll() {
    if (drawerBodyLocked) return;
    drawerPageScrollY = window.scrollY;
    drawerBodyOverflowBefore = document.body.style.overflow || "";
    document.body.style.overflow = "hidden";
    drawerBodyLocked = true;
  }

  function unlockDrawerBackgroundScroll() {
    if (!drawerBodyLocked) return;
    document.body.style.overflow = drawerBodyOverflowBefore;
    drawerBodyLocked = false;
    requestAnimationFrame(() => {
      window.scrollTo({ top: drawerPageScrollY, behavior: "auto" });
    });
  }

  function getFilteredRows() {
    const query = (node.querySelector("#filterQuery").value || "").trim().toLowerCase();
    const typeFilter = node.querySelector("#typeFilter").value || "Bursary";
    const rows = buildApplicationRows(typeFilter);

    if (!query) return rows;

    return rows.filter((row) => {
      const text = [
        getUserDisplayName(row.student),
        row.student?.email || "",
        row.opportunity?.title || "",
        row.opportunityType || "",
        row.student?.profile?.educationLevel || ""
      ]
        .join(" ")
        .toLowerCase();

      return text.includes(query);
    });
  }

  function getDrawerContext(applicationId) {
    if (!applicationId) return null;

    const activeTypeFilter = node.querySelector("#typeFilter")?.value || "Bursary";
    let row = buildApplicationRows(activeTypeFilter).find((entry) => entry.application.id === applicationId) || null;

    if (!row) {
      row = buildApplicationRows("all").find((entry) => entry.application.id === applicationId) || null;
    }

    if (!row) return null;

    const profile = getUserProfile(row.student) || {};
    const documents = getStudentDocuments(row.application.studentId);
    const documentRows = getApplicantDocumentRows(row.opportunityType, documents);

    return {
      row,
      profile,
      documents,
      documentRows
    };
  }

  function triggerDrawerDocumentDownload(docMeta) {
    if (!docMeta) return;

    const filename = String(docMeta.filename || `${docMeta.category || "document"}.txt`);

    if (docMeta.previewDataUrl) {
      const anchor = document.createElement("a");
      anchor.href = docMeta.previewDataUrl;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      return;
    }

    const fallbackContent = [
      `Demo document placeholder for ${filename}`,
      `Category: ${docMeta.category || "Unknown"}`,
      `Uploaded: ${formatDate(docMeta.uploadedAt || new Date().toISOString())}`,
      "Original binary file is not stored in this demo build."
    ].join("\n");

    const blob = new Blob([fallbackContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${filename.replace(/\.[^.]+$/, "") || "document"}-metadata.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }

  function openDrawerDocumentPreview(docMeta) {
    if (!docMeta) return;

    if (docMeta.previewDataUrl) {
      window.open(docMeta.previewDataUrl, "_blank", "noopener,noreferrer");
      return;
    }

    triggerDrawerDocumentDownload(docMeta);
  }

  function closeApplicantDrawer() {
    drawerOpen = false;
    drawerApplicationId = "";
    unlockDrawerBackgroundScroll();
    renderApplicantDrawer();
  }

  function openApplicantDrawer(applicationId) {
    if (!applicationId) return;
    drawerOpen = true;
    drawerApplicationId = applicationId;
    lockDrawerBackgroundScroll();
    renderApplicantDrawer();
  }

  function renderApplicantDrawer() {
    const mount = node.querySelector("#applicantDrawerMount");
    if (!mount) return;

    clearDrawerFocusTrap();

    const context = drawerOpen ? getDrawerContext(drawerApplicationId) : null;
    const canRender = drawerOpen && Boolean(context);

    if (drawerOpen && !context) {
      drawerOpen = false;
      drawerApplicationId = "";
      unlockDrawerBackgroundScroll();
    }

    mount.innerHTML = renderApplicantDetailDrawer({
      open: canRender,
      applicantId: drawerApplicationId,
      context
    });

    if (!canRender) return;

    const overlay = mount.querySelector("#applicantDrawerOverlay");
    const panel = mount.querySelector("#applicantDrawerPanel");
    const closeButton = mount.querySelector("#closeApplicantDrawerBtn");

    if (overlay) {
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) closeApplicantDrawer();
      });
    }

    if (closeButton) {
      closeButton.addEventListener("click", closeApplicantDrawer);
    }

    mount.querySelectorAll("[data-close-applicant-drawer]").forEach((button) => {
      button.addEventListener("click", closeApplicantDrawer);
    });

    mount.querySelectorAll("button[data-drawer-doc-preview]").forEach((button) => {
      button.addEventListener("click", () => {
        const documentId = button.getAttribute("data-drawer-doc-preview");
        const docMeta = context.documents.find((item) => item.id === documentId);
        openDrawerDocumentPreview(docMeta);
      });
    });

    mount.querySelectorAll("button[data-drawer-doc-download]").forEach((button) => {
      button.addEventListener("click", () => {
        const documentId = button.getAttribute("data-drawer-doc-download");
        const docMeta = context.documents.find((item) => item.id === documentId);
        triggerDrawerDocumentDownload(docMeta);
      });
    });

    mount.querySelectorAll("button[data-drawer-tag-appid]").forEach((button) => {
      button.addEventListener("click", () => {
        const appId = button.getAttribute("data-drawer-tag-appid");
        const key = button.getAttribute("data-drawer-tag-key");
        const active = button.getAttribute("data-drawer-tag-active") === "1";
        updateApplicationMeta(appId, { [key]: !active });
        renderCandidateTable();
        renderApplicantDrawer();
      });
    });

    mount.querySelectorAll("select[data-drawer-status-appid]").forEach((select) => {
      select.addEventListener("change", () => {
        const appId = select.getAttribute("data-drawer-status-appid");
        updateStatus(appId, select.value);
        renderCandidateTable();
        renderApplicantDrawer();
      });
    });

    drawerFocusCleanup = activateDialogFocusTrap(panel, closeApplicantDrawer, closeButton || panel);
  }

  function renderCandidateTable() {
    const rows = getFilteredRows();
    const completeDocsCount = rows.filter((row) => row.checklist.complete).length;

    const wrap = node.querySelector("#candidateTableWrap");

    if (!rows.length) {
      wrap.innerHTML = `<div class="mutedText">No applications match the current filter.</div>`;
      return;
    }

    wrap.innerHTML = `
      <div class="card" style="padding:10px; margin-bottom:10px;">
        <b>Automated Document Collection</b>
        <div class="mutedText" style="font-size:12px; margin-top:6px;">${completeDocsCount} / ${rows.length} applicant(s) currently have complete required documents.</div>
      </div>
      <div style="overflow-x:auto;">
        <table class="table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Type</th>
              <th>Eligibility</th>
              <th>Documents</th>
              <th>AI Score</th>
              <th>Pipeline Tags</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${rows
              .map((row) => {
                const appId = row.application.id;
                const tagButton = (key, label, active) =>
                  `<button type="button" class="tab ${active ? "active" : ""}" data-tag-appid="${appId}" data-tag-key="${key}" data-tag-active="${active ? "1" : "0"}">${label}</button>`;

                return `<tr class="adminApplicantRowClickable" tabindex="0" role="button" aria-haspopup="dialog" data-view-appid="${appId}" aria-label="View applicant ${escapeHtml(getUserDisplayName(row.student))}">
                  <td>
                    <div class="row" style="align-items:center; gap:8px; flex-wrap:nowrap;">
                      ${renderUserAvatar(row.student, "avatarSm")}
                      <div style="min-width:0;">
                        <div><b>${escapeHtml(getUserDisplayName(row.student))}</b></div>
                        <div class="mutedText" style="font-size:12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(row.student?.email || "-")}</div>
                      </div>
                    </div>
                    <div style="margin-top:6px; font-size:12px;">${escapeHtml(row.opportunity?.title || "Unknown opportunity")}</div>
                  </td>
                  <td><span class="badge ${row.opportunityType === "Bursary" ? "badgePurple" : row.opportunityType === "Course" ? "badgeBlue" : "badgeBlue"}">${escapeHtml(row.opportunityType)}</span></td>
                  <td>
                    <div><span class="badge ${row.eligibility.pass ? "badgeGreen" : "badgeOrange"}">${row.eligibility.pass ? "Pass" : "Fail"}</span></div>
                    <div class="mutedText" style="font-size:12px; margin-top:6px;">${escapeHtml(row.eligibility.reasons[0] || "")}</div>
                  </td>
                  <td>
                    <div>ID Copy: <b>${row.checklist.hasIdCopy ? "Yes" : "No"}</b></div>
                    <div>Academic: <b>${row.checklist.hasAcademic ? "Yes" : "No"}</b></div>
                    <div style="margin-top:6px;"><span class="badge ${row.checklist.complete ? "badgeGreen" : "badgeOrange"}">${row.checklist.complete ? "Complete" : "Incomplete"}</span></div>
                  </td>
                  <td>
                    <div style="font-size:20px; font-weight:700;">${row.score.score}</div>
                    <ul style="margin:6px 0 0 16px; padding:0;">
                      ${row.score.reasons
                        .map((reason) => `<li class="mutedText" style="font-size:12px;">${escapeHtml(reason)}</li>`)
                        .join("")}
                    </ul>
                  </td>
                  <td>
                    <div class="tabs" style="flex-wrap:wrap;">
                      ${tagButton("shortlisted", "Tag Shortlist", row.meta.shortlisted)}
                      ${tagButton("interviewed", "Tag Interviewed", row.meta.interviewed)}
                      ${tagButton("funded", "Tag Funded", row.meta.funded)}
                      ${tagButton("graduated", "Mark Graduated", row.meta.graduated)}
                    </div>
                  </td>
                  <td>
                    <select class="input select" data-status-appid="${appId}" style="padding:6px;">
                      ${STATUSES.map(
                        (status) => `<option ${row.application.status === status ? "selected" : ""} value="${status}">${status}</option>`
                      ).join("")}
                    </select>
                  </td>
                </tr>`;
              })
              .join("")}
          </tbody>
        </table>
      </div>
    `;

    wrap.querySelectorAll("button[data-tag-appid]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const appId = button.getAttribute("data-tag-appid");
        const key = button.getAttribute("data-tag-key");
        const active = button.getAttribute("data-tag-active") === "1";
        updateApplicationMeta(appId, { [key]: !active });
        renderCandidateTable();
        renderApplicantDrawer();
      });
    });

    wrap.querySelectorAll("select[data-status-appid]").forEach((select) => {
      select.addEventListener("click", (event) => {
        event.stopPropagation();
      });
      select.addEventListener("change", () => {
        const appId = select.getAttribute("data-status-appid");
        updateStatus(appId, select.value);
        renderCandidateTable();
        renderApplicantDrawer();
      });
    });

    wrap.querySelectorAll("tr.adminApplicantRowClickable").forEach((rowElement) => {
      rowElement.addEventListener("click", (event) => {
        if (event.target.closest("button, a, select, input, label")) return;
        openApplicantDrawer(rowElement.getAttribute("data-view-appid"));
      });

      rowElement.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        openApplicantDrawer(rowElement.getAttribute("data-view-appid"));
      });
    });
  }

  node.querySelector("#configForm").onsubmit = (event) => {
    event.preventDefault();

    const requiredInterests = Array.from(node.querySelectorAll("input[data-required-interest]:checked")).map((input) =>
      input.getAttribute("data-required-interest")
    );

    store.bursaryConfig = {
      ...store.bursaryConfig,
      brandName: node.querySelector("#brandName").value.trim(),
      targetProvince: node.querySelector("#targetProvince").value,
      eligibility: {
        minAge: node.querySelector("#ruleMinAge").value,
        province: node.querySelector("#ruleProvince").value,
        requiredInterests
      }
    };

    saveStore(store);
    render();
  };

  node.querySelector("#filterQuery").addEventListener("input", () => {
    renderCandidateTable();
    renderApplicantDrawer();
  });

  node.querySelector("#typeFilter").addEventListener("change", () => {
    renderCandidateTable();
    renderApplicantDrawer();
  });

  node.querySelector("#btnSeedApplications").addEventListener("click", () => {
    seedDemoApplicationsIfEmpty();
    render();
  });

  node.querySelector("#btnExportCsv").addEventListener("click", () => {
    const rows = getFilteredRows();

    const csvRows = rows.map((row) => ({
      applicationId: row.application.id,
      studentName: getUserDisplayName(row.student),
      studentEmail: row.student?.email || "",
      opportunityTitle: row.opportunity?.title || "",
      opportunityType: row.opportunityType || "",
      applicationStatus: row.application.status,
      eligibility: row.eligibility.pass ? "Pass" : "Fail",
      documentsComplete: row.checklist.complete ? "Yes" : "No",
      aiScore: row.score.score,
      shortlisted: row.meta.shortlisted ? "Yes" : "No",
      interviewed: row.meta.interviewed ? "Yes" : "No",
      funded: row.meta.funded ? "Yes" : "No",
      graduated: row.meta.graduated ? "Yes" : "No"
    }));

    downloadCsv("applications-export.csv", csvRows);
  });

  const pdfModal = node.querySelector("#pdfModal");
  node.querySelector("#btnExportPdf").addEventListener("click", () => {
    pdfModal.style.display = "flex";
  });
  node.querySelector("#btnClosePdfModal").addEventListener("click", () => {
    pdfModal.style.display = "none";
  });

  renderCandidateTable();
  renderApplicantDrawer();

  return shell("admin", node);
}

// Admin funded-student lifecycle tracking page render and related upload/save events.
function pageAdminLifecycle() {
  const user = requireRole("admin");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const fundedRows = buildApplicationRows().filter((row) => row.meta.funded);

  const counts = {
    "On Track": 0,
    "At Risk": 0,
    Critical: 0
  };

  fundedRows.forEach((row) => {
    const progress = row.lifecycle.progress || "On Track";
    counts[progress] = (counts[progress] || 0) + 1;
  });

  const node = el(`<div class="grid">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Funded Student Lifecycle Tracking</h1>
      <p class="mutedText" style="margin:8px 0 0;">Monitor funded students, semester uploads, risk alerts, and disbursements.</p>
    </div>

    <div class="grid cols-3">
      ${metricTile("On Track", String(counts["On Track"] || 0))}
      ${metricTile("At Risk", String(counts["At Risk"] || 0))}
      ${metricTile("Critical", String(counts.Critical || 0))}
    </div>

    <div class="card">
      ${fundedRows.length
        ? `<div style="overflow-x:auto;">
            <table class="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Academic Progress</th>
                  <th>Semester Result Upload</th>
                  <th>Dropout Risk Alert</th>
                  <th>Funding Disbursement</th>
                </tr>
              </thead>
              <tbody>
                ${fundedRows
                  .map((row) => {
                    const lifecycle = row.lifecycle;
                    const uploads = Array.isArray(lifecycle.resultUploads) ? lifecycle.resultUploads : [];
                    const latestUpload = uploads[0];
                    const risk = ["At Risk", "Critical"].includes(lifecycle.progress || "On Track");

                    return `<tr>
                      <td>
                        <div class="row" style="align-items:center; gap:8px; flex-wrap:nowrap;">
                          ${renderUserAvatar(row.student, "avatarSm")}
                          <div><b>${escapeHtml(getUserDisplayName(row.student))}</b></div>
                        </div>
                        <div class="mutedText" style="font-size:12px;">${escapeHtml(row.opportunity?.title || "")}</div>
                      </td>
                      <td>
                        <select class="input select" data-lifecycle-progress="${row.application.id}" style="padding:6px;">
                          ${LIFECYCLE_PROGRESS.map(
                            (progress) => `<option ${(lifecycle.progress || "On Track") === progress ? "selected" : ""} value="${progress}">${progress}</option>`
                          ).join("")}
                        </select>
                      </td>
                      <td>
                        <input class="input" type="file" data-lifecycle-upload="${row.application.id}" accept=".png,.jpg,.jpeg,.pdf" style="padding:6px;" />
                        <div class="mutedText" style="font-size:12px; margin-top:6px;">${uploads.length} file(s)</div>
                        <div class="mutedText" style="font-size:12px;">${latestUpload ? escapeHtml(latestUpload.filename) : "No uploads yet"}</div>
                      </td>
                      <td>
                        <span class="badge ${risk ? "badgeOrange" : "badgeGreen"}">${risk ? `${lifecycle.progress} alert` : "No alert"}</span>
                      </td>
                      <td>
                        <div class="field" style="margin:0;">
                          <label style="font-size:12px;"><b>Last paid date</b></label>
                          <input type="date" class="input" data-lifecycle-date="${row.application.id}" value="${escapeHtml(lifecycle.lastPaidDate || "")}" style="padding:6px;" />
                        </div>
                        <div class="field" style="margin-top:6px;">
                          <label style="font-size:12px;"><b>Amount</b></label>
                          <input type="number" class="input" data-lifecycle-amount="${row.application.id}" value="${escapeHtml(lifecycle.amount || "")}" style="padding:6px;" />
                        </div>
                        <button type="button" class="btn btnGhost" data-lifecycle-save="${row.application.id}" style="padding:6px 10px; margin-top:6px;">Save</button>
                      </td>
                    </tr>`;
                  })
                  .join("")}
              </tbody>
            </table>
          </div>`
        : `<div class="mutedText">No funded students yet. Tag funded candidates in Bursaries first.</div>`}
    </div>
  </div>`);

  node.querySelectorAll("select[data-lifecycle-progress]").forEach((select) => {
    select.addEventListener("change", () => {
      const appId = select.getAttribute("data-lifecycle-progress");
      updateLifecycleEntry(appId, { progress: select.value });
      render();
    });
  });

  node.querySelectorAll("input[data-lifecycle-upload]").forEach((input) => {
    input.addEventListener("change", async () => {
      const appId = input.getAttribute("data-lifecycle-upload");
      const file = input.files && input.files[0];
      if (!file) return;

      const validationError = validateUploadFile(file);
      if (validationError) {
        alert(validationError);
        return;
      }

      addLifecycleResultUpload(appId, {
        id: uid("result"),
        filename: file.name,
        fileType: inferFileType(file),
        size: file.size,
        uploadedAt: new Date().toISOString()
      });

      render();
    });
  });

  node.querySelectorAll("button[data-lifecycle-save]").forEach((button) => {
    button.addEventListener("click", () => {
      const appId = button.getAttribute("data-lifecycle-save");
      const dateInput = node.querySelector(`input[data-lifecycle-date="${appId}"]`);
      const amountInput = node.querySelector(`input[data-lifecycle-amount="${appId}"]`);

      updateLifecycleEntry(appId, {
        lastPaidDate: dateInput?.value || "",
        amount: amountInput?.value || ""
      });

      render();
    });
  });

  return shell("admin", node);
}

// Admin talent pipeline page render (search/filter, placement tracker, forecast tiles).
function pageAdminTalent() {
  const user = requireRole("admin");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const node = el(`<div class="grid">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Talent Pipeline & Workforce Planning</h1>
      <p class="mutedText" style="margin:8px 0 0;">Search by trade/qualification, filter by location, track placement readiness.</p>
    </div>

    <div class="card">
      <div class="row">
        <input id="talentQuery" class="input" placeholder="Search by qualification or trade" style="min-width:260px;" />
        <select id="talentProvince" class="input select" style="min-width:220px;">
          <option value="">All provinces</option>
          ${PROVINCES.map((province) => `<option value="${province}">${province}</option>`).join("")}
        </select>
      </div>
      <div id="talentTableWrap" style="margin-top:12px;"></div>
    </div>

    <div class="card">
      <div style="font-weight:700;">Workplace Placement Tracker (Graduates)</div>
      <div id="placementTableWrap" style="margin-top:10px;"></div>
    </div>

    <div class="card">
      <div style="font-weight:700;">Graduate Availability Forecast</div>
      <div id="forecastWrap" class="grid cols-3" style="margin-top:10px;"></div>
    </div>

    <div id="talentApplicantDrawerMount"></div>
  </div>`);

  let drawerOpen = false;
  let drawerApplicationId = "";
  let drawerFocusCleanup = () => {};
  let drawerPageScrollY = 0;
  let drawerBodyOverflowBefore = "";
  let drawerBodyLocked = false;

  function clearDrawerFocusTrap() {
    if (typeof drawerFocusCleanup === "function") {
      drawerFocusCleanup();
    }
    drawerFocusCleanup = () => {};
  }

  function lockDrawerBackgroundScroll() {
    if (drawerBodyLocked) return;
    drawerPageScrollY = window.scrollY;
    drawerBodyOverflowBefore = document.body.style.overflow || "";
    document.body.style.overflow = "hidden";
    drawerBodyLocked = true;
  }

  function unlockDrawerBackgroundScroll() {
    if (!drawerBodyLocked) return;
    document.body.style.overflow = drawerBodyOverflowBefore;
    drawerBodyLocked = false;
    requestAnimationFrame(() => {
      window.scrollTo({ top: drawerPageScrollY, behavior: "auto" });
    });
  }

  function getFilteredTalentRows() {
    const query = (node.querySelector("#talentQuery").value || "").trim().toLowerCase();
    const provinceFilter = node.querySelector("#talentProvince").value;
    const allRows = buildApplicationRows();

    return allRows.filter((row) => {
      const profile = row.student?.profile;
      const searchableText = `${row.opportunity?.title || ""} ${profile?.educationLevel || ""}`.toLowerCase();
      const matchesQuery = !query || searchableText.includes(query);
      const matchesProvince = !provinceFilter || (profile?.province || "") === provinceFilter;
      return matchesQuery && matchesProvince;
    });
  }

  function getTalentDrawerContext(applicationId) {
    if (!applicationId) return null;
    const row = buildApplicationRows("all").find((entry) => entry.application.id === applicationId) || null;
    if (!row) return null;

    const profile = getUserProfile(row.student) || {};
    const documents = getStudentDocuments(row.application.studentId);
    const documentRows = getApplicantDocumentRows(row.opportunityType, documents);

    return {
      row,
      profile,
      documents,
      documentRows
    };
  }

  function triggerDrawerDocumentDownload(docMeta) {
    if (!docMeta) return;

    const filename = String(docMeta.filename || `${docMeta.category || "document"}.txt`);

    if (docMeta.previewDataUrl) {
      const anchor = document.createElement("a");
      anchor.href = docMeta.previewDataUrl;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      return;
    }

    const fallbackContent = [
      `Demo document placeholder for ${filename}`,
      `Category: ${docMeta.category || "Unknown"}`,
      `Uploaded: ${formatDate(docMeta.uploadedAt || new Date().toISOString())}`,
      "Original binary file is not stored in this demo build."
    ].join("\n");

    const blob = new Blob([fallbackContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${filename.replace(/\.[^.]+$/, "") || "document"}-metadata.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }

  function openDrawerDocumentPreview(docMeta) {
    if (!docMeta) return;

    if (docMeta.previewDataUrl) {
      window.open(docMeta.previewDataUrl, "_blank", "noopener,noreferrer");
      return;
    }

    triggerDrawerDocumentDownload(docMeta);
  }

  function closeApplicantDrawer() {
    drawerOpen = false;
    drawerApplicationId = "";
    unlockDrawerBackgroundScroll();
    renderApplicantDrawer();
  }

  function openApplicantDrawer(applicationId) {
    if (!applicationId) return;
    drawerOpen = true;
    drawerApplicationId = applicationId;
    lockDrawerBackgroundScroll();
    renderApplicantDrawer();
  }

  function renderApplicantDrawer() {
    const mount = node.querySelector("#talentApplicantDrawerMount");
    if (!mount) return;

    clearDrawerFocusTrap();

    const context = drawerOpen ? getTalentDrawerContext(drawerApplicationId) : null;
    const canRender = drawerOpen && Boolean(context);

    if (drawerOpen && !context) {
      drawerOpen = false;
      drawerApplicationId = "";
      unlockDrawerBackgroundScroll();
    }

    mount.innerHTML = renderApplicantDetailDrawer({
      open: canRender,
      applicantId: drawerApplicationId,
      context
    });

    if (!canRender) return;

    const overlay = mount.querySelector("#applicantDrawerOverlay");
    const panel = mount.querySelector("#applicantDrawerPanel");
    const closeButton = mount.querySelector("#closeApplicantDrawerBtn");

    if (overlay) {
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) closeApplicantDrawer();
      });
    }

    if (closeButton) {
      closeButton.addEventListener("click", closeApplicantDrawer);
    }

    mount.querySelectorAll("[data-close-applicant-drawer]").forEach((button) => {
      button.addEventListener("click", closeApplicantDrawer);
    });

    mount.querySelectorAll("button[data-drawer-doc-preview]").forEach((button) => {
      button.addEventListener("click", () => {
        const documentId = button.getAttribute("data-drawer-doc-preview");
        const docMeta = context.documents.find((item) => item.id === documentId);
        openDrawerDocumentPreview(docMeta);
      });
    });

    mount.querySelectorAll("button[data-drawer-doc-download]").forEach((button) => {
      button.addEventListener("click", () => {
        const documentId = button.getAttribute("data-drawer-doc-download");
        const docMeta = context.documents.find((item) => item.id === documentId);
        triggerDrawerDocumentDownload(docMeta);
      });
    });

    mount.querySelectorAll("button[data-drawer-tag-appid]").forEach((button) => {
      button.addEventListener("click", () => {
        const appId = button.getAttribute("data-drawer-tag-appid");
        const key = button.getAttribute("data-drawer-tag-key");
        const active = button.getAttribute("data-drawer-tag-active") === "1";
        updateApplicationMeta(appId, { [key]: !active });
        renderTalentTable();
        renderPlacementTracker();
        renderForecast();
        renderApplicantDrawer();
      });
    });

    mount.querySelectorAll("select[data-drawer-status-appid]").forEach((select) => {
      select.addEventListener("change", () => {
        const appId = select.getAttribute("data-drawer-status-appid");
        updateStatus(appId, select.value);
        renderTalentTable();
        renderPlacementTracker();
        renderForecast();
        renderApplicantDrawer();
      });
    });

    drawerFocusCleanup = activateDialogFocusTrap(panel, closeApplicantDrawer, closeButton || panel);
  }

  function renderTalentTable() {
    const filteredRows = getFilteredTalentRows();
    const wrap = node.querySelector("#talentTableWrap");

    if (!filteredRows.length) {
      wrap.innerHTML = `<div class="mutedText">No candidates match the selected filters.</div>`;
      return;
    }

    wrap.innerHTML = `<div style="overflow-x:auto;">
      <table class="table">
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Qualification / Trade</th>
            <th>Province</th>
            <th>Skills Readiness Score</th>
          </tr>
        </thead>
        <tbody>
          ${filteredRows
            .map(
              (row) => `<tr class="adminApplicantRowClickable" tabindex="0" role="button" aria-haspopup="dialog" data-view-appid="${row.application.id}" aria-label="View applicant ${escapeHtml(getUserDisplayName(row.student))}">
            <td>
              <div class="row" style="align-items:center; gap:8px; flex-wrap:nowrap;">
                ${renderUserAvatar(row.student, "avatarSm")}
                <div style="min-width:0;">
                  <div><b>${escapeHtml(getUserDisplayName(row.student))}</b></div>
                  <div class="mutedText" style="font-size:12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(row.student?.email || "")}</div>
                </div>
              </div>
            </td>
            <td>
              <div>${escapeHtml(row.opportunity?.title || "")}</div>
              <div class="mutedText" style="font-size:12px;">${escapeHtml(row.student?.profile?.educationLevel || "No education level provided")}</div>
            </td>
            <td>${escapeHtml(row.student?.profile?.province || "-")}</td>
            <td><span class="badge badgeBlue">${row.score.score}</span></td>
          </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>`;

    wrap.querySelectorAll("tr.adminApplicantRowClickable").forEach((rowElement) => {
      rowElement.addEventListener("click", (event) => {
        if (event.target.closest("button, a, select, input, label")) return;
        openApplicantDrawer(rowElement.getAttribute("data-view-appid"));
      });

      rowElement.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        openApplicantDrawer(rowElement.getAttribute("data-view-appid"));
      });
    });
  }

  function renderPlacementTracker() {
    const graduates = buildApplicationRows().filter((row) => row.meta.graduated);
    const wrap = node.querySelector("#placementTableWrap");

    if (!graduates.length) {
      wrap.innerHTML = `<div class="mutedText">No graduates tagged yet. Mark funded candidates as graduated in Bursaries.</div>`;
      return;
    }

    wrap.innerHTML = `<div style="overflow-x:auto;">
      <table class="table">
        <thead>
          <tr>
            <th>Graduate</th>
            <th>Programme</th>
            <th>Placement Status</th>
            <th>Employer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${graduates
            .map(
              (row) => `<tr>
            <td>
              <div class="row" style="align-items:center; gap:8px; flex-wrap:nowrap;">
                ${renderUserAvatar(row.student, "avatarSm")}
                <div><b>${escapeHtml(getUserDisplayName(row.student))}</b></div>
              </div>
              <div class="mutedText" style="font-size:12px;">${escapeHtml(row.student?.profile?.province || "")}</div>
            </td>
            <td>${escapeHtml(row.opportunity?.title || "")}</td>
            <td>
              <select class="input select" data-placement-status="${row.application.id}" style="padding:6px;">
                ${PLACEMENT_STATUSES.map(
                  (status) => `<option ${row.meta.placementStatus === status ? "selected" : ""} value="${status}">${status}</option>`
                ).join("")}
              </select>
            </td>
            <td>
              <input class="input" data-placement-employer="${row.application.id}" value="${escapeHtml(row.meta.employer || "")}" placeholder="Employer name" style="padding:6px;" />
            </td>
            <td>
              <button type="button" class="btn btnGhost" data-placement-save="${row.application.id}" style="padding:6px 10px;">Save</button>
            </td>
          </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>`;

    wrap.querySelectorAll("button[data-placement-save]").forEach((button) => {
      button.addEventListener("click", () => {
        const appId = button.getAttribute("data-placement-save");
        const status = wrap.querySelector(`select[data-placement-status="${appId}"]`)?.value || "Not placed";
        const employer = wrap.querySelector(`input[data-placement-employer="${appId}"]`)?.value || "";

        updateApplicationMeta(appId, {
          placementStatus: status,
          employer
        });

        render();
      });
    });
  }

  function renderForecast() {
    const rows = buildApplicationRows();
    const graduatesAvailable = rows.filter((row) => row.meta.graduated && row.meta.placementStatus !== "Placed");
    const fundedNotGraduated = rows.filter((row) => row.meta.funded && !row.meta.graduated);

    const next30 = graduatesAvailable.length;
    const next60 = graduatesAvailable.length + Math.ceil(fundedNotGraduated.length * 0.4);
    const next90 = graduatesAvailable.length + fundedNotGraduated.length;

    node.querySelector("#forecastWrap").innerHTML = `
      <div class="card" style="padding:10px;">
        <div class="mutedText" style="font-size:12px;">Next 30 days</div>
        <div style="font-size:22px; font-weight:700;">${next30}</div>
      </div>
      <div class="card" style="padding:10px;">
        <div class="mutedText" style="font-size:12px;">Next 60 days</div>
        <div style="font-size:22px; font-weight:700;">${next60}</div>
      </div>
      <div class="card" style="padding:10px;">
        <div class="mutedText" style="font-size:12px;">Next 90 days</div>
        <div style="font-size:22px; font-weight:700;">${next90}</div>
      </div>
    `;
  }

  node.querySelector("#talentQuery").addEventListener("input", () => {
    renderTalentTable();
    renderApplicantDrawer();
  });

  node.querySelector("#talentProvince").addEventListener("change", () => {
    renderTalentTable();
    renderApplicantDrawer();
  });

  renderTalentTable();
  renderPlacementTracker();
  renderForecast();
  renderApplicantDrawer();

  return shell("admin", node);
}

// Admin analytics page render for high-level labour-intelligence summaries.

function pageAdminAnalytics() {
  const user = requireRole("admin");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const rows = buildApplicationRows();
  const studentsWithProfiles = store.users.filter((entry) => entry.role === "student" && entry.profile);

  const provinceCounts = studentsWithProfiles.reduce((accumulator, student) => {
    const province = student.profile.province || "Unspecified";
    accumulator[province] = (accumulator[province] || 0) + 1;
    return accumulator;
  }, {});

  const timeToEmploymentDays = rows
    .filter((row) => row.meta.fundedAt && row.meta.placedAt)
    .map((row) => {
      const fundedTime = new Date(row.meta.fundedAt).getTime();
      const placedTime = new Date(row.meta.placedAt).getTime();
      return Math.max(0, (placedTime - fundedTime) / (1000 * 60 * 60 * 24));
    })
    .filter((days) => Number.isFinite(days));

  const averageTimeToEmployment = timeToEmploymentDays.length
    ? (timeToEmploymentDays.reduce((sum, value) => sum + value, 0) / timeToEmploymentDays.length).toFixed(1)
    : "N/A";

  const node = el(`<div class="grid">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Analytics & Labour Intelligence</h1>
      <p class="mutedText" style="margin:8px 0 0;">Demo insights across demand, supply, placement velocity, and future workforce needs.</p>
    </div>

    <div class="card">
      <div style="font-weight:700;">Scarce Skills Demand Insights</div>
      <ul style="margin:8px 0 0 18px;">
        <li>High demand for electrical infrastructure and renewable-energy technicians.</li>
        <li>Software support and systems development roles continue to outpace supply.</li>
        <li>Skilled trades (plumbing, welding) remain priority hiring categories.</li>
      </ul>
    </div>

    <div class="card">
      <div style="font-weight:700;">Province-level Talent Distribution</div>
      ${Object.keys(provinceCounts).length
        ? `<table class="table" style="margin-top:10px;">
            <thead><tr><th>Province</th><th>Students</th></tr></thead>
            <tbody>
              ${Object.entries(provinceCounts)
                .sort((first, second) => second[1] - first[1])
                .map(([province, count]) => `<tr><td>${escapeHtml(province)}</td><td>${count}</td></tr>`)
                .join("")}
            </tbody>
          </table>`
        : `<div class="mutedText" style="margin-top:8px;">No profile distribution data available yet.</div>`}
    </div>

    <div class="card">
      <div style="font-weight:700;">Time-to-Employment Metrics</div>
      <div style="margin-top:8px;">Average days from funded to placed: <b>${averageTimeToEmployment}</b></div>
      <div class="mutedText" style="font-size:12px; margin-top:6px;">Calculated from graduates marked as placed.</div>
    </div>

    <div class="card">
      <div style="font-weight:700;">Sector-based Talent Trends</div>
      <ul style="margin:8px 0 0 18px;">
        <li>Manufacturing and infrastructure sectors are increasing intake for certified artisans.</li>
        <li>Digital services continue to absorb IT support and systems development graduates.</li>
        <li>Hospitality and business services show steady regional demand growth.</li>
      </ul>
    </div>

    <div class="card">
      <div style="font-weight:700;">Future Skills Forecasting</div>
      <ul style="margin:8px 0 0 18px;">
        <li>Green economy and energy-transition skills expected to accelerate over 3 years.</li>
        <li>Hybrid technical + digital roles forecast to become dominant in placement pipelines.</li>
        <li>Data literacy and automation readiness will be baseline requirements across sectors.</li>
      </ul>
    </div>
  </div>`);

  return shell("admin", node);
}

/** ---------- Router ---------- **/
// Hash-route dispatcher: maps URL fragments to page render functions with role guards.
function render() {  const user = currentUser();
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
      mount(pageHome());
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

    if (resolvedRoute === "/admin") {
      navigate("/admin/dashboard");
      return;
    }

    if (resolvedRoute === "/admin/dashboard") {
      mount(pageAdminCorporate());
      return;
    }

    if (resolvedRoute === "/admin/corporate") {
      mount(pageAdminCorporate());
      return;
    }

    if (resolvedRoute === "/admin/opportunities") {
      mount(pageAdminOpportunities());
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

    if (user) {
      if (user.role === "admin") navigate("/admin/dashboard");
      else navigate("/student/dashboard");
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

/** ---------- Utilities ---------- **/

// Shared formatting/escaping/export helpers used across student and admin page templates.
function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function readonlyField(label, value) {
  return `<div class="field">
    <label><b>${escapeHtml(label)}</b></label>
    <input class="input" value="${escapeHtml(value)}" readonly style="background:#f2f2f2;" />
  </div>`;
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

/** ---------- Boot ---------- **/
// Initial app mount on first script load.
render();

/* ========================================================================== */
/*  SECTION: 2026 Product Improvement Overrides                               */
/*  Purpose: Guided onboarding, student dashboard UX, and trust signals.      */
/* ========================================================================== */

function canCurrentUserAccessRow(row) {
  const user = currentUser();
  if (!user || !isAdminRole(user.role)) return true;

  const role = String(user.role || "").trim().toLowerCase();
  if (role === "admin" || role === "super_admin") return true;

  const userInstitutionId = String(user.institutionId || user.profile?.institutionId || "").trim().toLowerCase();
  if (!userInstitutionId) return false;

  const rowInstitutionId = String(row?.opportunity?.institutionId || "").trim().toLowerCase();
  return Boolean(rowInstitutionId && rowInstitutionId === userInstitutionId);
}

function getStudentSavedOpportunitiesSet(studentId) {
  const list = Array.isArray(store.savedOpportunities?.[studentId]) ? store.savedOpportunities[studentId] : [];
  return new Set(list.map((entry) => String(entry || "").trim()).filter(Boolean));
}

function isOpportunitySaved(studentId, opportunityId) {
  return getStudentSavedOpportunitiesSet(studentId).has(String(opportunityId || "").trim());
}

function toggleSavedOpportunity(studentId, opportunityId) {
  const id = String(opportunityId || "").trim();
  if (!id) return false;

  const set = getStudentSavedOpportunitiesSet(studentId);
  const wasSaved = set.has(id);
  if (wasSaved) set.delete(id);
  else set.add(id);

  store.savedOpportunities = store.savedOpportunities && typeof store.savedOpportunities === "object"
    ? store.savedOpportunities
    : {};
  store.savedOpportunities[studentId] = Array.from(set);
  saveStore(store);

  return !wasSaved;
}

function addStudentNotification(studentId, message, level = "info") {
  const msg = String(message || "").trim();
  if (!studentId || !msg) return;

  store.notifications = store.notifications && typeof store.notifications === "object" ? store.notifications : {};
  const bucket = Array.isArray(store.notifications[studentId]) ? store.notifications[studentId] : [];
  bucket.unshift({
    id: uid("note"),
    message: msg,
    level: String(level || "info").trim().toLowerCase(),
    at: new Date().toISOString(),
    read: false
  });
  store.notifications[studentId] = bucket.slice(0, 40);
  saveStore(store);
}

function getStudentNotifications(studentId) {
  return Array.isArray(store.notifications?.[studentId]) ? store.notifications[studentId] : [];
}

function markStudentNotificationsRead(studentId) {
  const bucket = Array.isArray(store.notifications?.[studentId]) ? store.notifications[studentId] : [];
  store.notifications[studentId] = bucket.map((entry) => ({ ...entry, read: true }));
  saveStore(store);
}

function getInstitutionByOpportunity(opportunity) {
  const name = String(opportunity?.institution || opportunity?.provider || "").trim();
  const list = Array.isArray(store.institutions) ? store.institutions : [];
  const match = list.find((entry) => String(entry.name || "").trim().toLowerCase() === name.toLowerCase()) || null;
  if (match) return match;

  return {
    id: String(opportunity?.institutionId || "inst-partner"),
    name: name || "Verified Institution",
    type: "Institution",
    status: "verified",
    verified: true
  };
}

function getInstitutionLogoText(name) {
  const cleaned = String(name || "").trim();
  if (!cleaned) return "YD";
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (!parts.length) return "YD";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
}

function formatDeadlineCountdown(closingDate) {
  const days = daysUntilDate(closingDate);
  if (days == null) return "Rolling applications";
  if (days < 0) return `Closed ${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} ago`;
  if (days === 0) return "Closes today";
  if (days === 1) return "Closes in 1 day";
  return `Closes in ${days} days`;
}

function inferOpportunityNqfLevel(opportunity) {
  const explicit = String(opportunity?.nqfLevel || "").trim();
  if (explicit) return explicit;

  const text = [
    opportunity?.title || "",
    opportunity?.description || "",
    ...(Array.isArray(opportunity?.requirements) ? opportunity.requirements : [])
  ].join(" ");

  const nqf = text.match(/NQF\s*Level\s*(\d+)/i);
  if (nqf) return `NQF Level ${nqf[1]}`;
  const ncv = text.match(/NCV\s*Level\s*(\d+)/i);
  if (ncv) return `NCV Level ${ncv[1]}`;
  const n = text.match(/\bN([1-6])\b/i);
  if (n) return `N${n[1]} / TVET`;
  return "NQF level varies";
}

function getOpportunityEligibilityHint(student, opportunity) {
  const profile = getUserProfile(student) || {};
  const interests = Array.isArray(profile.interests) ? profile.interests : [];
  let score = 0;

  if (!profile.province || opportunity.location === "National" || profile.province === opportunity.location) score += 1;
  if (!interests.length || isOpportunityRecommended(opportunity, interests)) score += 1;
  if (!profile.educationLevel || !Array.isArray(opportunity.requirements) || !opportunity.requirements.length) score += 1;

  if (score >= 3) return { label: "You likely qualify", className: "is-strong" };
  if (score === 2) return { label: "You meet most requirements", className: "is-medium" };
  return { label: "Check requirements before applying", className: "is-low" };
}

function calculateProfileStrength(student) {
  const profile = getUserProfile(student) || {};
  const checks = [
    Boolean(String(profile.fullName || student?.name || "").trim()),
    Boolean(String(profile.age || "").trim()),
    Boolean(String(profile.province || "").trim()),
    Boolean(String(profile.educationLevel || "").trim()),
    Array.isArray(profile.interests) && profile.interests.length > 0,
    getDocumentChecklist(student.id).complete
  ];
  const completed = checks.filter(Boolean).length;
  const total = checks.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  return { completed, total, percent };
}

function renderStudentOpportunityCard(opportunity, options = {}) {
  const student = options.student || currentUser();
  const application = options.application || null;
  const recommended = Boolean(options.recommended);
  const lifecycle = options.lifecycle || getOpportunityLifecycleState(application);
  const action = options.action || getOpportunityPrimaryAction(opportunity.id, application, recommended, lifecycle);
  const institution = getInstitutionByOpportunity(opportunity);
  const eligibility = getOpportunityEligibilityHint(student, opportunity);
  const saved = student ? isOpportunitySaved(student.id, opportunity.id) : false;
  const fundingAmount = String(opportunity?.fundingAmount || opportunity?.stipendOrValue || "Funding varies").trim() || "Funding varies";

  return `<article class="opportunityCard opportunityCardModern ${getOpportunityCardTypeClass(opportunity.type)} ${lifecycle.cardVariantClass}">
    <div class="opportunityCardModernHead">
      <div class="opportunityInstitution">
        <span class="opportunityInstitutionLogo">${escapeHtml(getInstitutionLogoText(institution.name))}</span>
        <div>
          <div class="opportunityInstitutionName">${escapeHtml(institution.name)}</div>
          <div class="opportunityInstitutionMeta">${escapeHtml(opportunity.type)} <span class="verifiedBadge">Verified</span></div>
        </div>
      </div>
      ${student ? `<button type="button" class="btn btnGhost opportunitySaveBtn ${saved ? "is-saved" : ""}" data-save-opp="${escapeHtml(opportunity.id)}">${saved ? "Saved" : "Save"}</button>` : ""}
    </div>

    <h3 class="opportunityTitle">${escapeHtml(opportunity.title)}</h3>
    <p class="opportunityNaturalLine">${escapeHtml(formatDeadlineCountdown(opportunity.closingDate))} • ${escapeHtml(opportunity.location || "National")}</p>
    <p class="opportunityNaturalLine ${escapeHtml(eligibility.className)}">${escapeHtml(eligibility.label)}</p>

    <div class="opportunityFactRow">
      <span>${escapeHtml(fundingAmount)}</span>
      <span>${escapeHtml(inferOpportunityNqfLevel(opportunity))}</span>
    </div>

    <div class="opportunityCardActions">
      <span class="${lifecycle.statusClass}">${lifecycle.statusLabel}</span>
      <a class="btn btnPrimary" href="${action.href}">${action.label}</a>
    </div>
  </article>`;
}

function bindStudentOpportunityCardActions(node, student, rerender) {
  node.querySelectorAll("button[data-save-opp]").forEach((button) => {
    button.addEventListener("click", () => {
      const opportunityId = button.getAttribute("data-save-opp");
      if (!opportunityId) return;
      const nowSaved = toggleSavedOpportunity(student.id, opportunityId);
      addStudentNotification(student.id, nowSaved ? "Opportunity saved for later." : "Saved opportunity removed.", "info");
      if (typeof rerender === "function") rerender();
    });
  });
}

function getRecommendedOpenOpportunities(studentId, limit = 6) {
  const recommended = recommendedIdsForStudent(studentId);
  const source = getOpportunityCatalogue().filter((opportunity) => String(opportunity.listingStatus || "open") === "open");

  let list = source.filter((opportunity) => recommended.has(opportunity.id));
  if (!list.length) list = source;

  return list
    .sort((first, second) => {
      const firstDays = daysUntilDate(first.closingDate);
      const secondDays = daysUntilDate(second.closingDate);
      const firstSort = Number.isFinite(firstDays) ? firstDays : 9999;
      const secondSort = Number.isFinite(secondDays) ? secondDays : 9999;
      if (firstSort !== secondSort) return firstSort - secondSort;
      return String(first.title || "").localeCompare(String(second.title || ""));
    })
    .slice(0, limit);
}

function getUrgentDashboardAlerts(student, opportunities) {
  const profileStrength = calculateProfileStrength(student);
  const closingThisWeek = opportunities.filter((entry) => {
    const days = daysUntilDate(entry.closingDate);
    return Number.isFinite(days) && days >= 0 && days <= 7;
  }).length;

  const alerts = [];
  if (closingThisWeek > 0) {
    alerts.push(`${closingThisWeek} opportunities matching your profile close this week.`);
  }
  if (profileStrength.percent < 100) {
    alerts.push(`You are ${profileStrength.percent}% ready to apply.`);
  }
  if (!getDocumentChecklist(student.id).complete) {
    alerts.push("Upload documents when you are ready to apply faster.");
  }
  if (!alerts.length) {
    alerts.push("You are application-ready. Apply to opportunities with confidence.");
  }
  return alerts;
}

function pageStudentOnboarding() {
  const user = requireRole("student");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const profile = getUserProfile(user) || {
    fullName: user.name || "",
    age: "",
    province: "",
    educationLevel: "",
    interests: []
  };

  const onboarding = getStudentOnboardingState(user);
  const draft = {
    fullName: String(profile.fullName || user.name || "").trim(),
    age: String(profile.age || "").trim(),
    province: String(profile.province || "").trim(),
    educationLevel: String(profile.educationLevel || "").trim(),
    interests: Array.isArray(profile.interests) ? [...profile.interests] : [],
    quiz: {
      preferredField: String(onboarding.quizAnswers?.preferredField || "").trim(),
      relocation: String(onboarding.quizAnswers?.relocation || "").trim(),
      preference: String(onboarding.quizAnswers?.preference || "").trim(),
      careerInterests: Array.isArray(onboarding.quizAnswers?.careerInterests)
        ? onboarding.quizAnswers.careerInterests.filter((value) => INTERESTS.includes(value))
        : []
    }
  };

  let currentStep = onboarding.basicsCompleted ? (onboarding.careerQuizCompleted ? 3 : 2) : 1;
  let error = "";

  const node = el(`<div class="grid onboardingExperiencePage">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Student Onboarding</h1>
      <p class="mutedText" style="margin:8px 0 0;">Complete 3 quick steps to unlock personalized opportunities.</p>
    </div>
    <div id="onboardingRoot"></div>
  </div>`);

  const root = node.querySelector("#onboardingRoot");

  function renderStepOne() {
    return `<section class="card onboardingStepCard">
      ${renderStepper(["Profile basics", "Career quiz", "Personalized opportunities"], 1, { className: "ydhStepper--compact" })}
      <h2 style="margin-top:12px;">Step 1: Profile Basics</h2>
      <p class="mutedText">Tell us who you are so we can match you better.</p>
      <form id="onboardingBasicsForm" class="grid" style="margin-top:10px; gap:10px;">
        <div class="grid cols-2">
          <div class="field">
            <label><b>Full name</b></label>
            <input class="input" id="onboardFullName" value="${escapeHtml(draft.fullName)}" required />
          </div>
          <div class="field">
            <label><b>Age</b></label>
            <input class="input" id="onboardAge" value="${escapeHtml(draft.age)}" type="number" min="14" max="100" required />
          </div>
        </div>
        <div class="grid cols-2">
          <div class="field">
            <label><b>Province</b></label>
            <select class="input select" id="onboardProvince" required>
              <option value="">Select province</option>
              ${PROVINCES.map((province) => `<option value="${province}" ${draft.province === province ? "selected" : ""}>${province}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label><b>Highest qualification</b></label>
            <input class="input" id="onboardEducation" value="${escapeHtml(draft.educationLevel)}" placeholder="e.g. Matric, NCV Level 4" required />
          </div>
        </div>
        <div class="field">
          <label><b>Interests</b></label>
          <div class="onboardingInterestGrid">
            ${INTERESTS.slice(0, 12)
              .map((interest) => `<label class="onboardingInterestItem"><input type="checkbox" value="${escapeHtml(interest)}" ${draft.interests.includes(interest) ? "checked" : ""} /> ${escapeHtml(interest)}</label>`)
              .join("")}
          </div>
        </div>
        <div class="mutedText onboardingError">${escapeHtml(error)}</div>
        <div class="row" style="margin-top:8px; justify-content:flex-end;">
          <button class="btn btnPrimary" type="submit">Continue to Career Quiz</button>
        </div>
      </form>
    </section>`;
  }

  function renderStepTwo() {
    const preferredFieldOptions = ["Engineering", "IT", "Business", "Science", "Trades", "Healthcare", "Public Service"];

    return `<section class="card onboardingStepCard">
      ${renderStepper(["Profile basics", "Career quiz", "Personalized opportunities"], 2, { className: "ydhStepper--compact" })}
      <h2 style="margin-top:12px;">Step 2: Career Quiz</h2>
      <p class="mutedText">Help us understand your direction and preferred pathway.</p>
      <form id="onboardingQuizForm" class="grid" style="margin-top:10px; gap:10px;">
        <div class="grid cols-2">
          <div class="field">
            <label><b>Preferred study field</b></label>
            <select class="input select" id="onboardPreferredField" required>
              <option value="">Select field</option>
              ${preferredFieldOptions.map((field) => `<option value="${field}" ${draft.quiz.preferredField === field ? "selected" : ""}>${field}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label><b>Study vs work preference</b></label>
            <select class="input select" id="onboardPreference" required>
              <option value="">Choose one</option>
              ${["Study first", "Work first", "Open to both"]
                .map((option) => `<option value="${option}" ${draft.quiz.preference === option ? "selected" : ""}>${option}</option>`)
                .join("")}
            </select>
          </div>
        </div>

        <div class="field">
          <label><b>Willingness to relocate</b></label>
          <div class="row" style="gap:10px;">
            ${["Yes", "No", "Maybe"]
              .map((option) => `<label class="onboardingRadio"><input type="radio" name="onboardRelocation" value="${option}" ${draft.quiz.relocation === option ? "checked" : ""} /> ${option}</label>`)
              .join("")}
          </div>
        </div>

        <div class="field">
          <label><b>Career interests</b></label>
          <div class="onboardingInterestGrid">
            ${INTERESTS.slice(0, 12)
              .map((interest) => `<label class="onboardingInterestItem"><input type="checkbox" value="${escapeHtml(interest)}" data-quiz-interest="1" ${draft.quiz.careerInterests.includes(interest) ? "checked" : ""} /> ${escapeHtml(interest)}</label>`)
              .join("")}
          </div>
        </div>

        <div class="mutedText onboardingError">${escapeHtml(error)}</div>
        <div class="row" style="margin-top:8px; justify-content:space-between;">
          <button class="btn btnGhost" type="button" id="onboardingBackToBasics">Back</button>
          <button class="btn btnPrimary" type="submit">Continue to Personalization</button>
        </div>
      </form>
    </section>`;
  }

  function renderStepThree() {
    const recommended = getRecommendedOpenOpportunities(user.id, 4);
    const applicationByOpportunity = new Map(studentApplications(user.id).map((entry) => [entry.opportunityId, entry]));

    return `<section class="card onboardingStepCard">
      ${renderStepper(["Profile basics", "Career quiz", "Personalized opportunities"], 3, { className: "ydhStepper--compact" })}
      <h2 style="margin-top:12px;">Step 3: Opportunity Personalization</h2>
      <p class="mutedText">Your feed is ready based on your profile and quiz.</p>

      <div class="dashboardAlertStack" style="margin-top:10px;">
        ${getUrgentDashboardAlerts(user, recommended)
          .map((alert) => `<div class="dashboardAlertItem">${escapeHtml(alert)}</div>`)
          .join("")}
      </div>

      <div class="dashboardOpportunityGrid" style="margin-top:12px;">
        ${recommended
          .map((opportunity) =>
            renderStudentOpportunityCard(opportunity, {
              student: user,
              application: applicationByOpportunity.get(opportunity.id) || null,
              recommended: true
            })
          )
          .join("")}
      </div>

      <div class="row" style="margin-top:12px; justify-content:space-between;">
        <button class="btn btnGhost" type="button" id="onboardingBackToQuiz">Back</button>
        <button class="btn btnPrimary" type="button" id="onboardingEnterDashboard">Enter dashboard</button>
      </div>
    </section>`;
  }

  function renderOnboarding() {
    if (!root) return;

    if (currentStep === 1) root.innerHTML = renderStepOne();
    else if (currentStep === 2) root.innerHTML = renderStepTwo();
    else root.innerHTML = renderStepThree();

    const basicsForm = root.querySelector("#onboardingBasicsForm");
    if (basicsForm) {
      basicsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        error = "";

        const fullName = String(root.querySelector("#onboardFullName")?.value || "").trim();
        const age = String(root.querySelector("#onboardAge")?.value || "").trim();
        const province = String(root.querySelector("#onboardProvince")?.value || "").trim();
        const educationLevel = String(root.querySelector("#onboardEducation")?.value || "").trim();
        const interests = Array.from(root.querySelectorAll(".onboardingInterestGrid input[type=\"checkbox\"]:checked"))
          .map((input) => String(input.value || "").trim())
          .filter(Boolean);

        if (!fullName || !age || !province || !educationLevel || !interests.length) {
          error = "Complete all fields and choose at least one interest.";
          renderOnboarding();
          return;
        }

        draft.fullName = fullName;
        draft.age = age;
        draft.province = province;
        draft.educationLevel = educationLevel;
        draft.interests = interests;

        saveProfile({
          fullName,
          age,
          province,
          educationLevel,
          interests,
          goals: String(profile.goals || "")
        });

        setStudentOnboardingState(user.id, {
          basicsCompleted: true,
          completed: false
        });

        currentStep = 2;
        renderOnboarding();
      });
    }

    const quizForm = root.querySelector("#onboardingQuizForm");
    if (quizForm) {
      root.querySelector("#onboardingBackToBasics")?.addEventListener("click", () => {
        currentStep = 1;
        error = "";
        renderOnboarding();
      });

      quizForm.addEventListener("submit", (event) => {
        event.preventDefault();
        error = "";

        const preferredField = String(root.querySelector("#onboardPreferredField")?.value || "").trim();
        const preference = String(root.querySelector("#onboardPreference")?.value || "").trim();
        const relocation = String(root.querySelector("input[name=\"onboardRelocation\"]:checked")?.value || "").trim();
        const careerInterests = Array.from(root.querySelectorAll("input[data-quiz-interest]:checked"))
          .map((input) => String(input.value || "").trim())
          .filter(Boolean);

        if (!preferredField || !preference || !relocation) {
          error = "Complete all required quiz fields before continuing.";
          renderOnboarding();
          return;
        }

        draft.quiz = {
          preferredField,
          preference,
          relocation,
          careerInterests
        };

        setStudentOnboardingState(user.id, {
          careerQuizCompleted: true,
          completed: false,
          quizAnswers: draft.quiz
        });

        addStudentNotification(user.id, "Career quiz saved. Personalized opportunities are ready.", "success");
        currentStep = 3;
        renderOnboarding();
      });
    }

    root.querySelector("#onboardingBackToQuiz")?.addEventListener("click", () => {
      currentStep = 2;
      error = "";
      renderOnboarding();
    });

    root.querySelector("#onboardingEnterDashboard")?.addEventListener("click", () => {
      setStudentOnboardingState(user.id, {
        personalizationCompleted: true,
        completed: true,
        completedAt: new Date().toISOString()
      });
      addStudentNotification(user.id, "Onboarding complete. Your dashboard is ready.", "success");
      navigate("/student/dashboard");
    });

    bindStudentOpportunityCardActions(root, user, renderOnboarding);
  }

  renderOnboarding();
  return shell("student", node);
}

function pageStudentDashboard() {
  const user = requireRole("student");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  if (isStudentOnboardingRequired(user)) {
    navigate("/student/onboarding");
    return el(`<div class="content">Redirecting...</div>`);
  }

  const applications = studentApplications(user.id);
  const opportunities = getRecommendedOpenOpportunities(user.id, 6);
  const applicationByOpportunity = new Map(applications.map((entry) => [entry.opportunityId, entry]));
  const profileStrength = calculateProfileStrength(user);
  const savedSet = getStudentSavedOpportunitiesSet(user.id);
  const notifications = getStudentNotifications(user.id).slice(0, 4);
  const hasGuidance = Boolean(getCareerGuidanceRecord(user.id, user)?.result?.topCategory);

  const node = el(`<div class="grid studentDashboardV2">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Student Dashboard</h1>
      <p class="mutedText" style="margin:8px 0 0;">Complete your profile to unlock better opportunities.</p>
    </div>

    <section class="card dashboardSectionUrgent">
      <div class="dashboardSectionMeta">Urgent Actions</div>
      <div class="row" style="justify-content:space-between; align-items:flex-start; margin-top:6px;">
        <div>
          <h3 class="dashboardSectionTitle">Profile strength: ${profileStrength.percent}%</h3>
          <p class="mutedText" style="margin-top:6px;">Complete your profile for smarter recommendations</p>
        </div>
        <div class="row">
          <a class="btn btnGhost" href="#/student/onboarding">Complete profile</a>
          <a class="btn btnGhost" href="#/student/documents">Upload documents</a>
        </div>
      </div>
      <div class="applicationProgressBar profileCompletenessBar" style="margin-top:10px;">
        <div class="applicationProgressBarFill" style="width:${profileStrength.percent}%;"></div>
      </div>
      <div class="dashboardAlertStack" style="margin-top:10px;">
        ${getUrgentDashboardAlerts(user, opportunities).map((alert) => `<div class="dashboardAlertItem">${escapeHtml(alert)}</div>`).join("")}
      </div>
      ${notifications.length
        ? `<div class="dashboardNotificationStack" style="margin-top:10px;">${notifications.map((entry) => `<div class="dashboardNotificationItem">${escapeHtml(entry.message)}</div>`).join("")}</div>`
        : ""}
    </section>

    <section class="card">
      <div class="dashboardSectionMeta">Recommended Opportunities</div>
      <h3 class="dashboardSectionTitle" style="margin-top:6px;">Matches for you</h3>
      <div class="dashboardOpportunityGrid" style="margin-top:10px;">
        ${opportunities
          .map((opportunity) =>
            renderStudentOpportunityCard(opportunity, {
              student: user,
              application: applicationByOpportunity.get(opportunity.id) || null,
              recommended: true
            })
          )
          .join("")}
      </div>
      ${savedSet.size ? `<div class="mutedText" style="margin-top:10px;">Saved opportunities: ${savedSet.size}</div>` : ""}
    </section>

    <section class="card">
      <div class="dashboardSectionMeta">Application Progress</div>
      <h3 class="dashboardSectionTitle" style="margin-top:6px;">Track your applications</h3>
      <div class="dashboardProgressList" style="margin-top:10px;">
        ${applications.length
          ? applications
              .slice(0, 8)
              .map((application) => {
                const opportunity = getOpportunity(application.opportunityId);
                const progress = getOpportunityProgressSummary(user, opportunity || {}, application);
                const lifecycle = getOpportunityLifecycleState(application);
                return `<article class="dashboardProgressItem">
                  <div>
                    <div style="font-weight:700;">${escapeHtml(opportunity?.title || "Opportunity")}</div>
                    <div class="mutedText" style="font-size:12px; margin-top:2px;">${escapeHtml(progress.label)}</div>
                  </div>
                  <div class="row" style="gap:8px;">
                    <span class="${lifecycle.statusClass}">${lifecycle.statusLabel}</span>
                    <a class="btn btnGhost" href="#/student/application/${application.id}">Open</a>
                  </div>
                </article>`;
              })
              .join("")
          : `<div class="dashboardEmptyState">
              <p>Start your first application — it takes less than 10 minutes.</p>
              <a class="btn btnPrimary" href="#/student/bursaries">Find opportunities</a>
            </div>`}
      </div>
    </section>

    <section class="card">
      <div class="dashboardSectionMeta">Document Readiness</div>
      <h3 class="dashboardSectionTitle" style="margin-top:6px;">Upload once, apply faster</h3>
      <div style="margin-top:10px;">${renderRequiredDocumentsChecklist(user.id, "", true)}</div>
    </section>

    <section class="card dashboardCareerSection">
      <div class="dashboardSectionMeta">Career Development</div>
      <h3 class="dashboardSectionTitle" style="margin-top:6px;">Keep building momentum</h3>
      <div class="dashboardCareerGrid" style="margin-top:10px;">
        <article class="dashboardCareerCardItem">
          <h4>Career Quiz</h4>
          <p class="mutedText">${hasGuidance ? "Retake your quiz for updated matches." : "Take your career quiz for sharper recommendations."}</p>
          <a class="btn btnGhost" href="#/student/career-guidance">${hasGuidance ? "Review quiz" : "Take quiz"}</a>
        </article>
        <article class="dashboardCareerCardItem">
          <h4>Trust Signals</h4>
          <p class="mutedText">${store.placementStats?.placedStudents || 2300} students placed through Youth Digital Hub.</p>
          <div class="dashboardTestimonialList">
            ${(Array.isArray(store.testimonials) ? store.testimonials : []).slice(0, 2).map((entry) => `<div class="dashboardTestimonialItem">“${escapeHtml(entry.quote)}” <span>${escapeHtml(entry.author)}</span></div>`).join("")}
          </div>
        </article>
      </div>
    </section>
  </div>`);

  bindStudentOpportunityCardActions(node, user, () => {
    render();
  });

  if (notifications.length) {
    markStudentNotificationsRead(user.id);
  }

  return shell("student", node);
}

function pageStudentListing(listingKey) {
  const user = requireRole("student");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  if (isStudentOnboardingRequired(user)) {
    navigate("/student/onboarding");
    return el(`<div class="content">Redirecting...</div>`);
  }

  const config = getStudentListingConfig(listingKey);
  const recommended = recommendedIdsForStudent(user.id);
  const scoped = getOpportunityCatalogue().filter((opportunity) =>
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

    <div class="dashboardOpportunityGrid" id="listingWrap"></div>
  </div>`);

  function renderItems() {
    const query = String(node.querySelector("#searchInput")?.value || "").trim().toLowerCase();
    const province = String(node.querySelector("#provinceFilter")?.value || "").trim();
    const sector = String(node.querySelector("#sectorFilter")?.value || "").trim();
    const sort = String(node.querySelector("#sortFilter")?.value || "recommended").trim();

    const applicationsByOpportunity = new Map(studentApplications(user.id).map((entry) => [entry.opportunityId, entry]));

    let filtered = scoped.filter((opportunity) => {
      const searchable = [opportunity.title, opportunity.institution, resolveOpportunitySector(opportunity)].join(" ").toLowerCase();
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

      const firstTitle = String(first.title || "");
      const secondTitle = String(second.title || "");
      return firstTitle.localeCompare(secondTitle);
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
      .map((opportunity) =>
        renderStudentOpportunityCard(opportunity, {
          student: user,
          application: applicationsByOpportunity.get(opportunity.id) || null,
          recommended: recommended.has(opportunity.id)
        })
      )
      .join("");

    bindStudentOpportunityCardActions(wrap, user, renderItems);
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

      <div id="oppCsvError" class="mutedText" style="color: var(--salmon-orange); margin-top:8px;"></div>
      <div id="oppCsvNotice" class="mutedText" style="color: var(--royal-blue); margin-top:4px;"></div>
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

          <div id="oppEditorError" class="mutedText" style="color: var(--salmon-orange);">${escapeHtml(editorError)}</div>
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
      const color = index === 0 ? "#2f6fed" : "#c7d2e8";
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

  if (isAdminRole(user.role) && store.adminSecurity?.twoFactorEnabled) {
    const code = window.prompt("Enter your admin verification code (demo code: 123456)", "");
    if (String(code || "").trim() !== "123456") {
      return { ok: false, error: "Two-factor verification failed." };
    }
  }

  currentUserId = user.id;
  setSessionUserId(user.id);
  return { ok: true, user };
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
      mount(pageHome());
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
        navigate("/admin/dashboard");
        return;
      }

      if (resolvedRoute !== "/student/onboarding" && isStudentOnboardingRequired(user)) {
        navigate("/student/onboarding");
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

    if (resolvedRoute === "/admin") {
      navigate("/admin/dashboard");
      return;
    }

    if (resolvedRoute.startsWith("/admin/")) {
      if (!user) {
        navigate("/login");
        return;
      }
      if (!isAdminRole(user.role)) {
        navigate("/student/dashboard");
        return;
      }
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
      if (isAdminRole(user.role)) navigate("/admin/dashboard");
      else if (isStudentOnboardingRequired(user)) navigate("/student/onboarding");
      else navigate("/student/dashboard");
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
  const pageTitle = getPageTitleForRoute(route);
  const displayName = getUserDisplayName(user);
  const profile = getUserProfile(user) || {};
  const firstName = getUserNameParts(user || {}).firstName || (displayName || "Student").split(" ")[0] || "Student";

  const sidebar = el(`<aside class="sidebar">
    <div style="font-size:12px; letter-spacing:.08em; font-weight:700; color:#555;">YOUTH DIGITAL HUB</div>
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
        .map((item) => {
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
  app.className = "appShell";
  app.appendChild(sidebar);
  app.appendChild(main);

  if (role === "student") {
    const mobileItems = getStudentMobileNavItems(route);
    const bottomNav = el(`<nav class="mobileBottomNav" aria-label="Mobile navigation">
      ${mobileItems
        .map(
          (item) => `<a class="mobileBottomNavItem ${item.active ? "active" : ""}" href="#${item.href}" ${
            item.view ? `data-mobile-view="${item.view}"` : ""
          }>
            <span class="mobileBottomNavItemIcon">${item.icon}</span>
            <span>${item.label}</span>
          </a>`
        )
        .join("")}
    </nav>`);

    bottomNav.querySelectorAll("a[data-mobile-view]").forEach((link) => {
      link.addEventListener("click", () => {
        const view = link.getAttribute("data-mobile-view");
        setMobileDashboardView(view || "dashboard");
      });
    });

    app.appendChild(bottomNav);
  }

  return app;
}


// Re-render after override registration.
render();
