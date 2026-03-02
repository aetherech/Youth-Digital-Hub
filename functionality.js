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
const STATUSES = ["Submitted", "Under Review", "Accepted", "Rejected"];
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

// Baseline store shape used on first load and during normalization fallbacks.
function createDefaultStore() {
  return {
    users: demoUsers.map((user) => normalizeUserRecord({ ...user })),
    applications: [],
    documents: [],
    appMeta: {},
    bursaryConfig: defaultBursaryConfig(),
    lifecycle: {},
    careerGuidance: {},
    careerGuidanceDocuments: {}
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

  const normalized = {
    users:
      Array.isArray(data?.users) && data.users.length
        ? data.users.map((user) => normalizeUserRecord(user))
        : defaults.users,
    applications: Array.isArray(data?.applications)
      ? data.applications
          .map((app) => {
            if (!app || !app.studentId || !app.opportunityId) return null;

            const opportunity = getOpportunity(app.opportunityId);
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

            const scoreValue = Number(app.score);
            const score = Number.isFinite(scoreValue)
              ? Math.max(0, Math.min(100, Math.round(scoreValue)))
              : undefined;

            return {
              ...app,
              id: app.id || uid("app"),
              opportunityType: OPPORTUNITY_TYPES.includes(app.opportunityType)
                ? app.opportunityType
                : opportunity?.type || "Course",
              status: STATUSES.includes(app.status) ? app.status : "Submitted",
              createdAt: app.createdAt || new Date().toISOString(),
              tags,
              docsComplete,
              docsIncomplete:
                typeof app.docsIncomplete === "boolean" ? app.docsIncomplete : !docsComplete,
              score,
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

/** ---------- App State ---------- **/
// Runtime in-memory app state backing all page renders and event handlers.
let store = loadStore();
let currentUserId = getSessionUserId();
let route = location.hash.replace("#", "") || "/";

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
  route = location.hash.replace("#", "") || "/";
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

function requireRole(role) {
  const user = requireAuth();
  if (!user) return null;

  if (user.role !== role) {
    if (user.role === "admin") navigate("/admin/corporate");
    else navigate(user.profile ? "/student/dashboard" : "/student/onboarding");
    return null;
  }

  return user;
}

function getOpportunity(id) {
  return opportunities.find((opportunity) => opportunity.id === id) || null;
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

function resolveOpportunitySector(opportunity) {
  return String(opportunity?.sector || opportunity?.category || "").trim();
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
    opportunities
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
  saveStore(store);
}

function removeDocument(documentId) {
  const before = store.documents.length;
  store.documents = store.documents.filter((document) => document.id !== documentId);
  if (store.documents.length !== before) {
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

  saveStore(store);
}

function resetCareerGuidanceRecord(studentId) {
  if (!store.careerGuidance || typeof store.careerGuidance !== "object") return;
  delete store.careerGuidance[studentId];
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
  const categoryMatches = opportunities.filter((opportunity) =>
    opportunityMatchesCareerCategory(opportunity, topCategory)
  );
  const recommendationPool = categoryMatches.length ? categoryMatches : opportunities;
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
    store.applications[index] = {
      ...application,
      opportunityType: OPPORTUNITY_TYPES.includes(application.opportunityType)
        ? application.opportunityType
        : getOpportunity(application.opportunityId)?.type || "Course",
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

  saveStore(store);
}

function updateStatus(applicationId, status) {
  if (!STATUSES.includes(status)) return;
  const index = store.applications.findIndex((application) => application.id === applicationId);
  if (index === -1) return;
  store.applications[index] = { ...store.applications[index], status };
  saveStore(store);
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

function computeCandidateScore({ application, student, opportunity, checklist }, bursaryConfig) {
  const seed = stableSeedFromString(`${student?.id || application.studentId}-${application.opportunityId}`);
  let score = 45 + (seed % 31);
  const reasons = [`Base profile score: ${score}`];

  if (checklist.complete) {
    score += 12;
    reasons.push("Document checklist complete (+12)");
  }

  const interests = student?.profile?.interests || [];
  if (opportunity && isOpportunityRecommended(opportunity, interests)) {
    score += 10;
    reasons.push(`Interest aligns with ${resolveOpportunitySector(opportunity)} opportunity (+10)`);
  }

  const targetProvince = bursaryConfig?.targetProvince || "";
  if (targetProvince && student?.profile?.province === targetProvince) {
    score += 8;
    reasons.push(`Province aligns with target province (${targetProvince}) (+8)`);
  }

  score = Math.max(0, Math.min(100, score));

  while (reasons.length < 3) {
    reasons.push("Profile can improve with additional supporting evidence.");
  }

  return { score, reasons: reasons.slice(0, 3) };
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
      const scoreModel = computeCandidateScore(
        { application, student, opportunity, checklist },
        store.bursaryConfig
      );
      const storedScore = Number(application.score);
      const score = Number.isFinite(storedScore)
        ? { score: Math.max(0, Math.min(100, Math.round(storedScore))), reasons: scoreModel.reasons }
        : scoreModel;
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
    });
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
    ...opportunities.filter((opportunity) => opportunity.type === "Bursary").slice(0, 3),
    ...opportunities.filter((opportunity) => isLearnershipType(opportunity.type)).slice(0, 2),
    ...opportunities.filter((opportunity) => opportunity.type === "Course").slice(0, 2)
  ];

  const statusCycle = ["Submitted", "Under Review", "Accepted"];
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

    const seededApplication = {
      id: uid("app"),
      studentId: student.id,
      opportunityId: opportunity.id,
      opportunityType: opportunity.type,
      status: statusCycle[index % statusCycle.length],
      createdAt: new Date(Date.now() - index * 86400000).toISOString(),
      tags,
      docsComplete,
      docsIncomplete: !docsComplete,
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
  if (currentRoute === "/admin/corporate" || currentRoute === "/admin") return "Corporate Executive Dashboard";
  if (currentRoute === "/admin/bursaries") return "Bursary Application Management";
  if (currentRoute === "/admin/lifecycle") return "Funded Student Lifecycle Tracking";
  if (currentRoute === "/admin/talent") return "Talent Pipeline & Workforce Planning";
  if (currentRoute === "/admin/analytics") return "Analytics & Labour Intelligence";
  return "National TVET & SETA MVP";
}

function shell(role, contentNode) {
  const user = currentUser();
  const sidebarItems = getSidebarItems(role);
  const pageTitle = getPageTitleForRoute(route);
  const displayName = getUserDisplayName(user);
  const profile = getUserProfile(user) || {};

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
      <div class="mutedText" style="font-size:12px; text-transform:uppercase; letter-spacing:.08em;">Live demo workspace</div>
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
    navigate("/");
  };

  const main = document.createElement("div");
  main.appendChild(topbar);

  const contentWrap = el(`<main class="content"></main>`);
  contentWrap.appendChild(contentNode);
  main.appendChild(contentWrap);

  const app = document.createElement("div");
  app.className = "appShell";
  app.appendChild(sidebar);
  app.appendChild(main);
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
function login(email, password, role) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = store.users.find(
    (entry) =>
      entry.email.toLowerCase() === normalizedEmail &&
      entry.password === password &&
      entry.role === role
  );

  if (!user) return { ok: false, error: "Invalid credentials or incorrect role selected." };

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
  const scoreModel = computeCandidateScore(
    {
      application: { studentId: user.id, opportunityId },
      student: user,
      opportunity,
      checklist
    },
    store.bursaryConfig
  );

  const scoreValue = Number(options.score);
  const score = Number.isFinite(scoreValue) ? Math.max(0, Math.min(100, Math.round(scoreValue))) : scoreModel.score;

  const application = {
    id: uid("app"),
    studentId: user.id,
    opportunityId,
    opportunityType: opportunity.type,
    status: "Submitted",
    createdAt: new Date().toISOString(),
    tags: {
      shortlisted: false,
      interviewed: false,
      funded: false,
      graduated: false
    },
    docsComplete,
    docsIncomplete,
    score,
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
// Public landing page render function.
function pageHome() {
  const user = currentUser();

  const node = el(`<div style="max-width:820px; margin:0 auto; padding:24px;">
    <div class="card">
      <div class="cardHeader">
        <h1 style="margin:0; font-size:24px;">National TVET & SETA Digital Access Platform</h1>
        <p class="mutedText" style="margin:10px 0 0;">Logic-first MVP demo (student applications + admin operations suite).</p>
      </div>
      <div style="margin-top:16px;">
        <a class="btn btnPrimary" href="#/login">Go to login</a>
      </div>
    </div>
  </div>`);

  if (user) {
    if (user.role === "admin") navigate("/admin/corporate");
    else navigate(user.profile ? "/student/dashboard" : "/student/onboarding");
  }

  return node;
}

// Authentication page render + login/register form event wiring.
function pageLogin() {
  const node = el(`<div style="max-width:900px; margin:0 auto; padding:24px;">
    <div class="card">
      <div class="cardHeader">
        <h1 style="margin:0; font-size:24px;">National TVET & SETA Digital Access Platform</h1>
        <p class="mutedText" style="margin:10px 0 0;">Mock login/register for demo.</p>
      </div>
    </div>

    <div class="card" style="margin-top:12px;">
      <div class="tabs">
        <div class="tab active" id="tabLogin">Login</div>
        <div class="tab" id="tabRegister">Register</div>
      </div>

      <form id="form" style="margin-top:14px;">
        <div class="field" id="fieldName" style="display:none;">
          <label for="name"><b>Name *</b></label>
          <input class="input" id="name" placeholder="Enter full name" />
        </div>

        <div class="field">
          <label for="email"><b>Email *</b></label>
          <input class="input" id="email" type="email" value="student@demo.co.za" />
        </div>

        <div class="field">
          <label for="password"><b>Password *</b></label>
          <input class="input" id="password" type="password" value="password123" />
        </div>

        <div class="field">
          <label><b>Role *</b></label>
          <div class="row">
            <button type="button" class="tab active" id="roleStudent">Student</button>
            <button type="button" class="tab" id="roleAdmin">Admin</button>
          </div>
        </div>

        <div id="error" class="mutedText" style="margin-top:8px;"></div>

        <div style="margin-top:12px;">
          <button class="btn btnPrimary" id="submitBtn" type="submit">Login</button>
        </div>
      </form>
    </div>

    <div class="card" style="margin-top:12px;">
      <b>Demo credentials</b>
      <div style="margin-top:8px;">Student: student@demo.co.za / password123</div>
      <div>Admin: admin@demo.co.za / password123</div>
    </div>
  </div>`);

  let mode = "login";
  let role = "student";

  const tabLogin = node.querySelector("#tabLogin");
  const tabRegister = node.querySelector("#tabRegister");
  const fieldName = node.querySelector("#fieldName");
  const submitBtn = node.querySelector("#submitBtn");
  const errorEl = node.querySelector("#error");
  const roleStudent = node.querySelector("#roleStudent");
  const roleAdmin = node.querySelector("#roleAdmin");

  function setMode(nextMode) {
    mode = nextMode;
    tabLogin.classList.toggle("active", mode === "login");
    tabRegister.classList.toggle("active", mode === "register");
    fieldName.style.display = mode === "register" ? "" : "none";
    submitBtn.textContent = mode === "login" ? "Login" : "Create account";
    errorEl.textContent = "";
  }

  function setRole(nextRole) {
    role = nextRole;
    roleStudent.classList.toggle("active", role === "student");
    roleAdmin.classList.toggle("active", role === "admin");
  }

  tabLogin.onclick = () => setMode("login");
  tabRegister.onclick = () => setMode("register");
  roleStudent.onclick = () => setRole("student");
  roleAdmin.onclick = () => setRole("admin");

  node.querySelector("#form").onsubmit = (event) => {
    event.preventDefault();
    errorEl.textContent = "";

    const name = node.querySelector("#name").value || "";
    const email = node.querySelector("#email").value || "";
    const password = node.querySelector("#password").value || "";

    const result = mode === "login" ? login(email, password, role) : register(name, email, password, role);

    if (!result.ok) {
      errorEl.textContent = result.error;
      return;
    }

    if (result.user.role === "admin") navigate("/admin/corporate");
    else navigate(result.user.profile ? "/student/dashboard" : "/student/onboarding");
  };

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
    interests: []
  };

  const node = el(`<div class="grid" style="max-width:860px;">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Learner Onboarding</h1>
      <p class="mutedText" style="margin:8px 0 0;">Capture learner profile to personalise opportunity discovery.</p>
    </div>

    <div class="card">
      <form id="form">
        <div class="field">
          <label><b>Full name *</b></label>
          <input class="input" id="fullName" value="${escapeHtml(profile.fullName)}" required />
        </div>
        <div class="field">
          <label><b>Age *</b></label>
          <input class="input" id="age" value="${escapeHtml(profile.age)}" required />
        </div>
        <div class="field">
          <label><b>Province *</b></label>
          <select class="input select" id="province" required>
            <option value="">Select province</option>
            ${PROVINCES.map(
              (province) => `<option ${profile.province === province ? "selected" : ""} value="${province}">${province}</option>`
            ).join("")}
          </select>
        </div>
        <div class="field">
          <label><b>Education level *</b></label>
          <input class="input" id="education" value="${escapeHtml(profile.educationLevel)}" placeholder="e.g. Grade 12, NCV Level 4" required />
        </div>
        <div class="field">
          <label><b>Career interests *</b></label>
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
        <div style="margin-top:12px;">
          <button class="btn btnPrimary" type="submit">Save profile</button>
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
    const interests = Array.from(node.querySelectorAll('input[type="checkbox"]:checked')).map((checkbox) => checkbox.value);

    const error = node.querySelector("#error");
    error.textContent = "";

    if (!interests.length) {
      error.textContent = "Select at least one interest to continue.";
      return;
    }

    saveProfile({ fullName, age, province, educationLevel, interests });
    render();
    navigate("/student/bursaries");
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
    <table class="table" style="margin-top:10px;">
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
  if (!user.profile) {
    navigate("/student/onboarding");
    return el(`<div class="content">Redirecting...</div>`);
  }

  const config = getStudentListingConfig(listingKey);
  const recommendedIds = recommendedIdsForStudent(user.id);
  const scopedOpportunities = opportunities.filter((opportunity) =>
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

    <div class="card">
      <div class="grid cols-2">
        <div class="field">
          <label><b>Search</b></label>
          <input class="input" id="searchInput" placeholder="Search by title, institution, or sector" />
        </div>
        <div class="field">
          <label><b>Province</b></label>
          <select class="input select" id="provinceFilter">
            <option value="">All provinces</option>
            ${PROVINCES.map((province) => `<option value="${province}">${province}</option>`).join("")}
            <option value="National">National</option>
          </select>
        </div>
      </div>

      <div class="grid cols-2">
        <div class="field">
          <label><b>Sector</b></label>
          <select class="input select" id="sectorFilter">
            <option value="">All sectors</option>
            ${sectors.map((sector) => `<option value="${escapeHtml(sector)}">${escapeHtml(sector)}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label><b>Sort</b></label>
          <select class="input select" id="sortFilter">
            <option value="recommended">Recommended first</option>
            <option value="closing">Closing soon</option>
            <option value="az">A-Z</option>
          </select>
        </div>
      </div>
    </div>

    <div class="grid cols-3" id="listingWrap"></div>
  </div>`);

  function renderListingItems() {
    const query = (node.querySelector("#searchInput").value || "").trim().toLowerCase();
    const province = node.querySelector("#provinceFilter").value;
    const sector = node.querySelector("#sectorFilter").value;
    const sort = node.querySelector("#sortFilter").value;

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
        const recommended = recommendedIds.has(opportunity.id);
        return `<div class="card" style="padding:0;">
          <div style="padding:16px; border-bottom:1px solid #bbb; background:#eee;">
            <div class="placeholder"></div>
          </div>
          <div style="padding:16px; display:grid; gap:10px;">
            <div class="row" style="justify-content:space-between; align-items:flex-start;">
              <span class="badge ${opportunity.type === "Bursary" ? "badgePurple" : opportunity.type === "Course" ? "badgeBlue" : "badgeBlue"}">${escapeHtml(opportunity.type)}</span>
              ${recommended ? `<span class="badge badgeBlue">Recommended</span>` : ""}
            </div>
            <div>
              <div style="font-weight:700;">${escapeHtml(opportunity.title)}</div>
              <div class="mutedText">${escapeHtml(opportunity.institution)}</div>
              <div class="mutedText">${escapeHtml(opportunity.location)}</div>
            </div>
            <div>Sector: <b>${escapeHtml(resolveOpportunitySector(opportunity))}</b></div>
            <div class="mutedText">Closing: ${formatDateLabel(opportunity.closingDate)}</div>
            <div>
              <a class="btn btnPrimary" href="#/student/opportunity/${opportunity.id}">View details</a>
            </div>
          </div>
        </div>`;
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

  const node = el(`<div class="grid" style="max-width:900px;">
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

  return `<div class="card" style="padding:12px; background:#f7f7f7;">
    <div class="row" style="justify-content:space-between;">
      <div style="font-weight:700;">Documents checklist</div>
      <span class="badge ${checklist.complete ? "badgeGreen" : "badgeOrange"}">${checklist.complete ? "Documents Complete" : "Documents Incomplete"}</span>
    </div>
    <table class="table" style="margin-top:10px;">
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

  const node = el(`<div class="grid" style="max-width:980px;">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Documents</h1>
      <p class="mutedText" style="margin:8px 0 0;">Upload supporting documents for your applications (demo metadata only).</p>
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
        ? `<table class="table" style="margin-top:10px;">
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
          </table>`
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

  const profile = user.profile;
  const checklist = getDocumentChecklist(user.id, opportunity.type);

  const node = el(`<div class="grid" style="max-width:860px;">
    <div class="cardHeader">
      <h1 style="margin:0; font-size:24px;">Application Form</h1>
      <p class="mutedText" style="margin:8px 0 0;">Submitting application for: ${escapeHtml(opportunity.title)} (${escapeHtml(opportunity.type)})</p>
    </div>

    <div class="card">
      <form id="form">
        ${readonlyField("Full name", profile.fullName)}
        ${readonlyField("Age", profile.age)}
        ${readonlyField("Province", profile.province)}
        ${readonlyField("Education level", profile.educationLevel)}
        ${readonlyField("Interests", profile.interests.join(", "))}

        ${renderRequiredDocumentsChecklist(user.id, opportunity.type)}

        ${
          checklist.complete
            ? ``
            : `<div class="card" style="margin-top:10px; padding:12px; background:#f7f7f7;">
                <b>Documents incomplete</b>
                <div class="mutedText" style="margin-top:6px;">You can still submit this demo application. Upload missing documents in the documents section.</div>
                <div class="row" style="margin-top:10px;">
                  <a class="btn btnGhost" href="#/student/documents">Go to documents</a>
                </div>
              </div>`
        }

        <div id="error" class="mutedText" style="margin-top:10px;"></div>

        <div class="row" style="margin-top:12px;">
          <button class="btn btnPrimary" type="submit">Submit application</button>
          <a class="btn btnGhost" href="#/student/opportunity/${opportunity.id}">Cancel</a>
        </div>
      </form>
    </div>
  </div>`);

  node.querySelector("#form").onsubmit = (event) => {
    event.preventDefault();

    const result = submitApplication(opportunity.id, {
      docsComplete: checklist.complete,
      docsIncomplete: !checklist.complete
    });
    const error = node.querySelector("#error");
    error.textContent = "";

    if (!result.ok) {
      error.textContent = result.error || "Unable to submit application.";
      return;
    }

    navigate("/student/dashboard");
  };

  return shell("student", node);
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

  function renderApplicationsTable(rows) {
    const tableWrap = root.querySelector("#applicationTableWrap");
    if (!tableWrap) return;

    const filteredRows = rows.filter((row) => matchesOpportunityTypeFilter(row.opportunityType, activeTab));

    if (!filteredRows.length) {
      tableWrap.innerHTML = `<div class="mutedText">No applications in this category yet.</div>`;
      return;
    }

    tableWrap.innerHTML = `<table class="table">
      <thead>
        <tr><th>Opportunity</th><th>Submitted</th><th>Status</th><th>Documents Complete</th></tr>
      </thead>
      <tbody>
        ${filteredRows
          .map(
            (row) => `<tr>
            <td>
              <div><b>${escapeHtml(row.opportunityTitle)}</b></div>
              <div class="mutedText" style="font-size:12px;">${escapeHtml(row.opportunityType)} • ${escapeHtml(row.institution)}</div>
            </td>
            <td>${formatDate(row.createdAt)}</td>
            <td><span class="badge ${row.status === "Submitted" ? "badgeBlue" : row.status === "Under Review" ? "badgePurple" : row.status === "Accepted" ? "badgeGreen" : "badgeOrange"}">${escapeHtml(row.status)}</span></td>
            <td><span class="badge ${row.docsComplete ? "badgeGreen" : "badgeOrange"}">${row.docsComplete ? "Yes" : "No"}</span></td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>`;
  }

  function renderDashboardContent() {
    const liveUser = currentUser() || store.users.find((entry) => entry.id === user.id) || user;
    const displayName = getUserDisplayName(liveUser);
    const rows = getDashboardRows(liveUser.id);
    const guidanceRecord = getCareerGuidanceRecord(liveUser.id, liveUser);
    const hasSavedGuidance = Boolean(guidanceRecord?.result?.topCategory);
    const profilePhotoMeta = draftSettings.profilePhotoMeta;

    root.innerHTML = `
      <div class="dashboardTopGrid">
        <div class="card dashboardWelcomeCard">
          <div class="row" style="justify-content:space-between; align-items:flex-start;">
            <div class="row" style="align-items:center;">
              ${renderUserAvatar(
                { ...liveUser, profile: { ...(getUserProfile(liveUser) || {}), profilePhotoDataUrl: draftSettings.profilePhotoDataUrl || getUserPhotoDataUrl(liveUser) } },
                "avatarLg"
              )}
              <div>
                <div class="mutedText" style="font-size:12px; text-transform:uppercase; letter-spacing:.04em;">Welcome back</div>
                <h2 style="margin:4px 0 0;">${escapeHtml(displayName)}</h2>
                <div class="mutedText" style="font-size:13px; margin-top:4px;">Manage your applications and next steps in one place.</div>
              </div>
            </div>
            <div class="row">
              <a class="btn btnPrimary" href="#/student/career-guidance">Career Guidance</a>
              <a class="btn btnGhost" href="#/student/bursaries">Browse Opportunities</a>
            </div>
          </div>
        </div>

        <div class="card dashboardCareerCard">
          <div class="mutedText" style="font-size:12px; text-transform:uppercase; letter-spacing:.04em;">Career Guidance</div>
          <div style="font-weight:800; font-size:20px; margin-top:8px;">
            ${
              hasSavedGuidance
                ? `Top category: ${escapeHtml(guidanceRecord.result.topCategory)}`
                : "Take the career match quiz"
            }
          </div>
          <div class="mutedText" style="margin-top:6px;">
            ${
              hasSavedGuidance
                ? "Continue from your saved pathway and track your recommended actions."
                : "Answer 10 quick questions to generate your career pathway."
            }
          </div>
          <div class="row" style="margin-top:12px;">
            <a class="btn btnPrimary" href="#/student/career-guidance">${hasSavedGuidance ? "Continue" : "Start quiz"}</a>
          </div>
        </div>
      </div>

      <div class="dashboardMainGrid" style="margin-top:16px;">
        <div class="card">
          <div class="tabs" id="applicationTabs">
            <button class="tab ${activeTab === "all" ? "active" : ""}" data-tab="all" type="button">All Applications</button>
            <button class="tab ${activeTab === "Bursary" ? "active" : ""}" data-tab="Bursary" type="button">Bursaries</button>
            <button class="tab ${activeTab === "Learnership/Internship" ? "active" : ""}" data-tab="Learnership/Internship" type="button">Learnerships/Internships</button>
            <button class="tab ${activeTab === "Course" ? "active" : ""}" data-tab="Course" type="button">Courses</button>
          </div>
          <div id="applicationTableWrap" style="margin-top:12px;"></div>
        </div>

        <div class="grid">
          ${renderRequiredDocumentsChecklist(liveUser.id, "", true)}

          <div class="card">
            <div class="row" style="justify-content:space-between;">
              <div>
                <div class="mutedText" style="font-size:12px; text-transform:uppercase; letter-spacing:.04em;">Settings / Profile</div>
                <h3 style="margin-top:4px;">Update your account details</h3>
              </div>
              ${renderUserAvatar(
                { ...liveUser, profile: { ...(getUserProfile(liveUser) || {}), profilePhotoDataUrl: draftSettings.profilePhotoDataUrl || "" } },
                "avatarLg"
              )}
            </div>

            <form id="studentSettingsForm" style="margin-top:10px;">
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
                <button type="button" class="btn btnDanger" id="settingsRemovePhotoBtn">Remove photo</button>
              </div>
              <div id="settingsError" class="mutedText" style="color: var(--salmon-orange); margin-top:8px;">${escapeHtml(settingsError)}</div>
              <div id="settingsNotice" class="mutedText" style="color: var(--royal-blue); margin-top:4px;">${escapeHtml(settingsNotice)}</div>
            </form>
          </div>
        </div>
      </div>
    `;

    renderApplicationsTable(rows);

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

  const node = el(`<div class="grid" style="max-width:1220px;">
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
        ${items
          .map(
            (item) => `<div class="careerOpportunityCard">
              <div class="row" style="justify-content:space-between;">
                <span class="badge ${item.type === "Bursary" ? "badgePurple" : item.type === "Course" ? "badgeBlue" : "badgeOrange"}">${escapeHtml(item.type)}</span>
                <span class="mutedText" style="font-size:12px;">${escapeHtml(item.location)}</span>
              </div>
              <div style="font-weight:700; margin-top:8px;">${escapeHtml(item.title)}</div>
              <div class="mutedText" style="font-size:13px; margin-top:2px;">${escapeHtml(item.institution)}</div>
              <div class="mutedText" style="font-size:12px; margin-top:6px;">Closing: ${formatDateLabel(item.closingDate)}</div>
              <div class="row" style="margin-top:12px;">
                <a class="btn btnGhost" href="#/student/opportunity/${item.id}">View details</a>
                <a class="btn btnPrimary" href="#/student/apply/${item.id}">Apply</a>
              </div>
            </div>`
          )
          .join("")}
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
    const progress = Math.round(((state.step + 1) / totalSteps) * 100);
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

    root.innerHTML = `<div class="card careerWizardCard">
      <div class="row" style="justify-content:space-between;">
        <div class="mutedText" style="font-size:12px; text-transform:uppercase; letter-spacing:.04em;">Career Match Quiz</div>
        <div class="badge badgePurple">Step ${state.step + 1} of ${totalSteps}</div>
      </div>
      <div class="careerProgressTrack" style="margin-top:10px;">
        <div class="careerProgressFill" style="width:${progress}%;"></div>
      </div>

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

// Admin bursary management page render (config, candidate review table, exports, tagging).
function pageAdminBursaries() {
  const user = requireRole("admin");
  if (!user) return el(`<div class="content">Redirecting...</div>`);

  const config = store.bursaryConfig;

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
  </div>`);

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

                return `<tr>
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
      button.addEventListener("click", () => {
        const appId = button.getAttribute("data-tag-appid");
        const key = button.getAttribute("data-tag-key");
        const active = button.getAttribute("data-tag-active") === "1";
        updateApplicationMeta(appId, { [key]: !active });
        render();
      });
    });

    wrap.querySelectorAll("select[data-status-appid]").forEach((select) => {
      select.addEventListener("change", () => {
        const appId = select.getAttribute("data-status-appid");
        updateStatus(appId, select.value);
        render();
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

  node.querySelector("#filterQuery").addEventListener("input", renderCandidateTable);
  node.querySelector("#typeFilter").addEventListener("change", renderCandidateTable);
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

  const allRows = buildApplicationRows();

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
  </div>`);

  function getFilteredTalentRows() {
    const query = (node.querySelector("#talentQuery").value || "").trim().toLowerCase();
    const provinceFilter = node.querySelector("#talentProvince").value;

    return allRows.filter((row) => {
      const profile = row.student?.profile;
      const searchableText = `${row.opportunity?.title || ""} ${profile?.educationLevel || ""}`.toLowerCase();
      const matchesQuery = !query || searchableText.includes(query);
      const matchesProvince = !provinceFilter || (profile?.province || "") === provinceFilter;
      return matchesQuery && matchesProvince;
    });
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
              (row) => `<tr>
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

  node.querySelector("#talentQuery").addEventListener("input", renderTalentTable);
  node.querySelector("#talentProvince").addEventListener("change", renderTalentTable);

  renderTalentTable();
  renderPlacementTracker();
  renderForecast();

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
function render() {
  const user = currentUser();

  if (route === "/") {
    mount(pageHome());
    return;
  }

  if (route === "/login") {
    mount(pageLogin());
    return;
  }

  if (route === "/student/onboarding") {
    mount(pageStudentOnboarding());
    return;
  }

  if (route === "/student/dashboard") {
    mount(pageStudentDashboard());
    return;
  }

  if (route === "/student/career-guidance") {
    mount(pageStudentCareerGuidance());
    return;
  }

  if (route === "/student/documents") {
    mount(pageStudentDocuments());
    return;
  }

  if (route === "/student/bursaries") {
    mount(pageStudentBursaries());
    return;
  }

  if (route === "/student/learnerships") {
    mount(pageStudentLearnerships());
    return;
  }

  if (route === "/student/courses") {
    mount(pageStudentCourses());
    return;
  }

  if (route.startsWith("/student/opportunity/")) {
    mount(pageStudentOpportunityDetails(route.split("/")[3]));
    return;
  }

  if (route.startsWith("/student/apply/")) {
    mount(pageStudentApply(route.split("/")[3]));
    return;
  }

  if (route === "/student/opportunities") {
    navigate("/student/courses");
    return;
  }

  if (route.startsWith("/student/opportunities/")) {
    const opportunityId = route.split("/")[3];
    navigate(`/student/opportunity/${opportunityId}`);
    return;
  }

  if (route === "/admin") {
    navigate("/admin/corporate");
    return;
  }

  if (route === "/admin/corporate") {
    mount(pageAdminCorporate());
    return;
  }

  if (route === "/admin/bursaries") {
    mount(pageAdminBursaries());
    return;
  }

  if (route === "/admin/lifecycle") {
    mount(pageAdminLifecycle());
    return;
  }

  if (route === "/admin/talent") {
    mount(pageAdminTalent());
    return;
  }

  if (route === "/admin/analytics") {
    mount(pageAdminAnalytics());
    return;
  }

  if (user) {
    if (user.role === "admin") navigate("/admin/corporate");
    else navigate(user.profile ? "/student/dashboard" : "/student/onboarding");
    return;
  }

  navigate("/");
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
