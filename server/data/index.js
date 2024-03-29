import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    firstName: "test",
    lastName: "me",
    email: "aaaaaaa@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p11.jpeg",
    friends: [],
    location: "San Fran, CA",
    viewedProfile: 14561,
    impressions: 888822,
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    firstName: "Steve",
    lastName: "Ralph",
    email: "thataaa@gmail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpeg",
    friends: [],
    location: "New York, CA",
    viewedProfile: 12351,
    impressions: 55555,
    createdAt: 1595589072,
    updatedAt: 1595589072,
    __v: 0,
  },
  {
    _id: userIds[2],
    firstName: "Some",
    lastName: "Guy",
    email: "someguy@gmail.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    picturePath: "p4.jpeg",
    friends: [],
    location: "Canada, CA",
    viewedProfile: 45468,
    impressions: 19986,
    createdAt: 1288090662,
    updatedAt: 1288090662,
    __v: 0,
  },
  {
    _id: userIds[3],
    firstName: "Whatcha",
    lastName: "Doing",
    email: "whatchadoing@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p6.jpeg",
    friends: [],
    location: "Korea, CA",
    viewedProfile: 41024,
    impressions: 55316,
    createdAt: 1219214568,
    updatedAt: 1219214568,
    __v: 0,
  },
  {
    _id: userIds[4],
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p5.jpeg",
    friends: [],
    location: "Utah, CA",
    viewedProfile: 40212,
    impressions: 7758,
    createdAt: 1493463661,
    updatedAt: 1493463661,
    __v: 0,
  },
  {
    _id: userIds[5],
    firstName: "Harvey",
    lastName: "Dunn",
    email: "harveydunn@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p7.jpeg",
    friends: [],
    location: "Los Angeles, CA",
    viewedProfile: 976,
    impressions: 4658,
    createdAt: 1381326073,
    updatedAt: 1381326073,
    __v: 0,
  },
  {
    _id: userIds[6],
    firstName: "Carly",
    lastName: "Vowel",
    email: "carlyvowel@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p8.jpeg",
    friends: [],
    location: "Chicago, IL",

    viewedProfile: 1510,
    impressions: 77579,
    createdAt: 1714704324,
    updatedAt: 1642716557,
    __v: 0,
  },
  {
    _id: userIds[7],
    firstName: "Jessica",
    lastName: "Dunn",
    email: "jessicadunn@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p9.jpeg",
    friends: [],
    location: "Washington, DC",

    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
];
export const sponsors = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    sponsorName: "ABC Company",
    sponsorEmail: "abc@example.com",
    sponsorpicturePath: "/images/abc_logo.png",
    sponsorphoneNumber: [{ phoneNumber: 1234567890 }],
    interestedtheme: [{ theme: "Healthcare" }, { theme: "Environment" }],
    sponsorInfo:
      "ABC Company is a leading tech firm specializing in software development.",
    location: "New York",
    budget: 10000,
    industry: "Technology",
    sponsortwitterLink: "https://twitter.com/abc_company",
    sponsorlinkedinLink: "https://linkedin.com/company/abc-company",
    sponsorCoordinator: "John Doe",
    likes: new Map([
      [userIds[0], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
    ]),
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[2],
    sponsorName: "XYZ Corporation",
    sponsorEmail: "xyz@example.com",
    sponsorpicturePath: "/images/xyz_logo.png",
    sponsorphoneNumber: [{ phoneNumber: 9876543210 }],
    interestedtheme: [{ theme: "Healthcare" }, { theme: "Environment" }],
    sponsorInfo:
      "XYZ Corporation is a financial services provider offering investment solutions.",
    location: "London",
    budget: 15000,
    industry: "Finance",
    sponsortwitterLink: "https://twitter.com/xyz_corp",
    sponsorlinkedinLink: "https://linkedin.com/company/xyz-corporation",
    sponsorCoordinator: "Jane Smith",
    likes: new Map([
      [userIds[1], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
    ]),
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[3],
    sponsorName: "Tech Innovations Ltd",
    sponsorEmail: "tech@example.com",
    sponsorpicturePath: "/images/tech_logo.png",
    sponsorphoneNumber: [{ phoneNumber: 5551234567 }],
    interestedtheme: [{ theme: "Healthcare" }, { theme: "Environment" }],
    sponsorInfo:
      "Tech Innovations Ltd pioneers cutting-edge technologies for various industries.",
    location: "San Francisco",
    budget: 20000,
    industry: "Technology",
    sponsortwitterLink: "https://twitter.com/tech_innovations",
    sponsorlinkedinLink: "https://linkedin.com/company/tech-innovations",
    sponsorCoordinator: "Michael Johnson",
    likes: new Map([
      [userIds[0], true],
      [userIds[2], true],
      [userIds[4], true],
      [userIds[5], true],
    ]),
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[4],
    sponsorName: "Global Tech Solutions",
    sponsorEmail: "global@example.com",
    sponsorpicturePath: "/images/global_logo.png",
    sponsorphoneNumber: [{ phoneNumber: 9998765432 }],
    interestedtheme: [{ theme: "AI" }, { theme: "Technology" }],
    sponsorInfo:
      "Global Tech Solutions offers advanced AI and machine learning solutions for businesses worldwide.",
    location: "Tokyo",
    budget: 25000,
    industry: "Technology",
    sponsortwitterLink: "https://twitter.com/global_tech",
    sponsorlinkedinLink: "https://linkedin.com/company/global-tech-solutions",
    sponsorCoordinator: "Emily Wang",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[3], true],
      [userIds[5], true],
    ]),
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[5],
    sponsorName: "FinanceTech Innovations",
    sponsorEmail: "financetech@example.com",
    sponsorpicturePath: "/images/financetech_logo.png",
    sponsorphoneNumber: [{ phoneNumber: 1112223333 }],
    interestedtheme: [{ theme: "AI" }, { theme: "Technology" }],
    sponsorInfo:
      "FinanceTech Innovations specializes in developing cutting-edge fintech solutions for banks and financial institutions.",
    location: "Singapore",
    budget: 18000,
    industry: "Finance",
    sponsortwitterLink: "https://twitter.com/financetech_inc",
    sponsorlinkedinLink: "https://linkedin.com/company/financetech-innovations",
    sponsorCoordinator: "David Chen",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[4], true],
    ]),
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[6],
    sponsorName: "Healthcare Solutions Group",
    sponsorEmail: "healthcare@example.com",
    sponsorpicturePath: "/images/healthcare_logo.png",
    sponsorphoneNumber: [{ phoneNumber: 7778889999 }],
    interestedtheme: [{ theme: "AI" }, { theme: "Technology" }],
    sponsorInfo:
      "Healthcare Solutions Group provides innovative technology solutions for the healthcare industry, improving patient care and efficiency.",
    location: "Berlin",
    budget: 22000,
    industry: "Healthcare",
    sponsortwitterLink: "https://twitter.com/healthcare_solutions",
    sponsorlinkedinLink:
      "https://linkedin.com/company/healthcare-solutions-group",
    sponsorCoordinator: "Anna Müller",
    likes: new Map([
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
    ]),
    __v: 0,
  },
];
export const events = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    eventName: "mood indigo",
    date: "12/3/23",
    theme: "Festive",
    firstName: "Steve",
    lastName: "Ralph",
    location: "New York, CA",
    eventLocation: "remote",
    description: "Some really long random description",
    email: "event1@gmail.com",
    picturePath: "post1.jpeg",
    userPicturePath: "p3.jpeg",
    eventPicturePath: ["p1.jpg", "p2.jpg", "p3.jpg"],
    speakers: ["AKhil Binoy", "Manu", "Binoy"],
    marketingPlan: ["plan1", "plan2", "plan3"],
    marketingPlanPicture: ["p7.jpg", "p8.jpg", "p9.jpg"],
    sponsors: [
      { picturePath: "p11.jpg", name: "Sponsor 14" },
      { picturePath: "p12.jpg", name: "Sponsor 23" },
    ],
    eventPhoneNumber: 23466787643,
    eventAgenda: "this that that this ",
    FAQ: "Vellotum nadako?",
    likes: new Map([
      [userIds[0], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
    ]),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[2],
    eventName: "Tech Expo",
    date: "12/3/23",
    theme: "Technology",
    firstName: "Emma",
    lastName: "Watson",
    location: "San Francisco, CA",
    eventLocation: "Hybrid",
    description: "Explore the latest in technology at our Tech Expo.",
    email: "emma.watson@example.com",
    picturePath: "post2.jpeg",
    userPicturePath: "p4.jpeg",
    eventPicturePath: ["p10.jpg", "p11.jpg", "p12.jpg"],
    speakers: ["John Doe", "Jane Smith", "Chris Evans"],
    marketingPlan: ["plan4", "plan5", "plan6"],
    marketingPlanPicture: ["p6.jpg", "p7.jpg", "p8.jpg"],
    sponsors: [
      { picturePath: "p29.jpg", name: "Sponsor 18" },
      { picturePath: "p30.jpg", name: "Sponsor 24" },
    ],
    eventPhoneNumber: 34567898765,
    eventAgenda:
      "Explore innovative technologies and network with industry leaders.",
    FAQ: "What time does the Expo start?",
    likes: new Map([
      [userIds[1], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
    ]),
  },

  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[3],
    eventName: "Art Exhibition",
    date: "12/3/23",
    theme: "Art and Drama",
    firstName: "Mia",
    lastName: "Johnson",
    location: "Los Angeles, CA",
    eventLocation: "In-person",
    description: "An exquisite showcase of contemporary art.",
    email: "mia.johnson@example.com",
    picturePath: "post3.jpeg",
    userPicturePath: "p5.jpeg",
    eventPicturePath: ["p9.jpg", "p2.jpg", "p2.jpg"],
    sponsors: [
      { picturePath: "p4.jpg", name: "Sponsor 10" },
      { picturePath: "p3.jpg", name: "Sponsor 30" },
    ],
    speakers: ["Alice Turner", "Michael Carter", "Sophia Turner"],
    marketingPlan: ["plan7", "plan8", "plan9"],
    marketingPlanPicture: ["p5.jpg", "p6.jpg", "p7.jpg"],
    eventPhoneNumber: 45678987654,
    eventAgenda:
      "Immerse yourself in the world of contemporary art and creativity.",
    FAQ: "Is there an entry fee for the Art Exhibition?",
    likes: new Map([
      [userIds[0], true],
      [userIds[2], true],
      [userIds[4], true],
      [userIds[5], true],
    ]),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[4],
    eventName: "Music Fest",
    date: "12/3/23",
    theme: "Art and Drama",
    firstName: "Oliver",
    lastName: "Smith",
    location: "Austin, TX",
    eventLocation: "Outdoor",
    description: "A celebration of music and live performances.",
    email: "oliver.smith@example.com",
    picturePath: "post4.jpeg",
    userPicturePath: "p6.jpeg",
    eventPicturePath: ["p8.jpg", "p9.jpg", "p3.jpg"],
    speakers: ["Ella Davis", "Liam Foster", "Ava Harris"],
    marketingPlan: ["plan10", "plan11", "plan12"],
    marketingPlanPicture: ["p4.jpg", "p5.jpg", "p6.jpg"],
    sponsors: [
      { picturePath: "p8.jpg", name: "Sponsor 0" },
      { picturePath: "p4.jpg", name: "Sponsor 6" },
    ],
    eventPhoneNumber: 56789876543,
    eventAgenda:
      "Dance to the rhythm of great music and enjoy the lively atmosphere.",
    FAQ: "Are food and beverages available at the venue?",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[3], true],
      [userIds[5], true],
    ]),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[5],
    eventName: "Food Festival",
    date: "12/3/23",
    theme: "Art and Drama",
    firstName: "Sophia",
    lastName: "Turner",
    location: "Chicago, IL",
    eventLocation: "Indoor",
    description: "Indulge in a variety of delicious cuisines.",
    email: "sophia.turner@example.com",
    picturePath: "post5.jpeg",
    userPicturePath: "p7.jpeg",
    eventPicturePath: ["p7.jpg", "p8.jpg", "p9.jpg"],
    speakers: ["Noah Robinson", "Lily Allen", "James White"],
    marketingPlan: ["plan13", "plan14", "plan15"],
    marketingPlanPicture: ["p4.jpg", "p4.jpg", "p5.jpg"],
    eventPhoneNumber: 67898765432,
    sponsors: [
      { picturePath: "p4.jpg", name: "Sponsor 4" },
      { picturePath: "p3.jpg", name: "Sponsor 3" },
    ],
    eventAgenda: "Savor the flavors from around the world in one place.",
    FAQ: "Can I purchase tickets at the venue?",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[4], true],
    ]),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[6],
    eventName: "Tech Symposium",
    date: "12/3/23",
    theme: "Technology",
    firstName: "Aiden",
    lastName: "Taylor",
    location: "Seattle, WA",
    eventLocation: "Virtual",
    description: "A gathering of tech enthusiasts and industry experts.",
    email: "aiden.taylor@example.com",
    picturePath: "post6.jpeg",
    userPicturePath: "p8.jpeg",
    eventPicturePath: ["p6.jpg", "p7.jpg", "p8.jpg"],
    sponsors: [
      { picturePath: "p1.jpg", name: "Sponsor 1" },
      { picturePath: "p2.jpg", name: "Sponsor 2" },
    ],
    speakers: ["Sophie Harris", "Caleb Moore", "Eva Davis"],
    marketingPlan: ["plan16", "plan17", "plan18"],
    marketingPlanPicture: ["p5.jpg", "p3.jpg", "p4.jpg"],
    eventPhoneNumber: 78987654321,
    eventAgenda:
      "Discuss the latest trends and innovations in the tech industry.",
    FAQ: "Is there a registration fee for the symposium?",
    likes: new Map([
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
    ]),
  },
];
