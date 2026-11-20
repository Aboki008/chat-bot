import { InquiryTopic } from "@/types/chat";

export const INSTITUTION_INFO = {
  name: "Federal College of Animal Health and Production Technology, Vom",
  shortName: "FCAHPTVom",
  tagline: "Premier Training in Veterinary, Animal Health & Agricultural Technology",
  established: 1941,
  location: "Vom, Jos South Local Government Area, Plateau State, Nigeria",
  admissionsEmail: "admissions@fcahptvom.edu.ng",
  admissionsPhone: "+234 803 000 0000",
  officeHours: "Monday – Friday: 8:00 AM – 4:00 PM WAT",
  portalUrl: "https://portal.fcahptvom.edu.ng",
};

export const POPULAR_INQUIRIES: InquiryTopic[] = [
  {
    id: "deadlines",
    title: "Admission & Screening Dates",
    description: "Post-UTME, ND and HND application schedules",
    icon: "Calendar",
    category: "dates",
    prompt: "What are the current admission screening dates and application guidelines for FCAHPTVom programmes?",
  },
  {
    id: "programs",
    title: "ND & HND Programmes",
    description: "Animal Health, Production, Science Lab Tech & Computing",
    icon: "GraduationCap",
    category: "programs",
    prompt: "What National Diploma (ND) and Higher National Diploma (HND) programmes are available at FCAHPTVom?",
  },
  {
    id: "requirements",
    title: "Entry Requirements & JAMB Cut-off",
    description: "UTME cut-off marks and O'Level subject combinations",
    icon: "Award",
    category: "admissions",
    prompt: "What is the JAMB UTME cut-off mark and O'Level requirements for Animal Health & Production Technology at FCAHPTVom?",
  },
  {
    id: "fees",
    title: "School Fees & Acceptance",
    description: "Tuition breakdown, acceptance fee & hostel charges",
    icon: "DollarSign",
    category: "tuition",
    prompt: "What is the fee schedule for fresh and returning ND and HND students at FCAHPTVom?",
  },
  {
    id: "hnd-admission",
    title: "HND & Direct Entry Admission",
    description: "ND certificate, IT completion & screening process",
    icon: "Globe",
    category: "admissions",
    prompt: "What are the requirements for HND admission, including IT completion letter and transcript submission at FCAHPTVom?",
  },
  {
    id: "campus-hostel",
    title: "Hostel & Campus Facilities",
    description: "Student accommodation, veterinary clinics & farms",
    icon: "Home",
    category: "campus",
    prompt: "Tell me about student accommodation, hostel allocation, research farms, and campus facilities in Vom.",
  },
];

export const CATEGORY_FILTERS = [
  { label: "All Topics", value: "all" },
  { label: "Admissions", value: "admissions" },
  { label: "ND & HND Programs", value: "programs" },
  { label: "School Fees", value: "tuition" },
  { label: "Screening Dates", value: "dates" },
  { label: "Campus & Hostels", value: "campus" },
];
