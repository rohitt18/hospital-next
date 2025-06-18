import { z } from "zod";

export const GenderOptions = ["male", "female", "other"];

// export const PatientFormDefaultValues = z.object({ 
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email"),
//   phone: z.string().min(10, "Phone number is required"),
//   birthDate: z.date(),
//   gender: z.enum(["male", "female", "other"]),
//   address: z.string(),
//   occupation: z.string(),
//   emergencyContactName: z.string(),
//   emergencyContactNumber: z.string(),
//   primaryPhysician: z.string(),
//   insuranceProvider: z.string(),
//   insurancePolicyNumber: z.string(),
//   allergies: z.string(),
//   currentMedication: z.string(),
//   familyMedicalHistory: z.string(),
//   pastMedicalHistory: z.string(),
//   identificationType: z.string(),
//   identificationNumber: z.string(),
//   identificationDocument: z.array(z.any()).optional(),
//   privacyConsent: z.boolean().optional(),
//   disclosureConsent: z.boolean().optional(),
//   treatmentConsent: z.boolean().optional(),
// });

export const PatientFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/assets/images/dr-powell.png",
    name: "Dr. Komal Gupta",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Dr. Khushali Doshi",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Dr. Rakshita Shetty",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/dr-green.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};