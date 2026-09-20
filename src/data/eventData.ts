import { Speaker, ScheduleItem, Track, FAQItem, StatItem, RegistrationRecord } from '../types';

export const EVENT_METADATA = {
  name: "AWS Student Builder Community Day",
  subname: "@ Rungta University",
  date: "19 October 2026",
  time: "10:00 AM – 5:00 PM IST",
  checkInTime: "09:30 AM IST",
  venue: "Rungta University Campus",
  location: "Bhilai, Chhattisgarh, India",
  hall: "Dr. A.P.J. Abdul Kalam Central Auditorium & Cloud Computing Labs",
  type: "Free • Student Community Event",
  tagline: "Build. Learn. Deploy. Connect.",
  shortDescription:
    "A premier hands-on technology community day bringing students, cloud architects, student builders, and mentors together to explore AWS, Generative AI, serverless systems, and real-world software engineering.",
  organizerEmail: "awscommunity@rungta.ac.in",
  eventTimestamp: new Date("2026-10-19T10:00:00+05:30").getTime(),
  socialLinks: {
    github: "https://github.com/aarvi2611",
    linkedin: "https://www.linkedin.com/in/hariomsharan2611/",
    instagram: "https://www.instagram.com/sharan.hariom_/"
  }
};

export const SPEAKERS: Speaker[] = [
  {
    id: "arjun-mehta",
    name: "Arjun Mehta",
    role: "Cloud Solutions Architect",
    organization: "AWS User Group Lead & Community Mentor",
    topic: "Architecting Resilient Serverless Systems on AWS",
    bio: "Specializes in distributed event-driven systems, AWS Lambda step functions, and helping student teams transition from monolithic architectures to decoupled cloud backends.",
    track: "Cloud Foundations & Architecture",
    tag: "Serverless & Architecture",
    initials: "AM",
    avatarGradient: "from-blue-600 via-sky-500 to-indigo-900",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    isFictionalDemo: false
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    role: "Generative AI Engineer",
    organization: "AI Developer Advocate & Research Fellow",
    topic: "Building Production Agents with Amazon Bedrock",
    bio: "Focuses on applied LLM pipelines, Retrieval-Augmented Generation (RAG), and deploying cost-efficient foundation models using Amazon Bedrock and vector indexes.",
    track: "AI & Generative AI",
    tag: "GenAI & Bedrock",
    initials: "PN",
    avatarGradient: "from-amber-500 via-orange-500 to-red-600",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    isFictionalDemo: false
  },
  {
    id: "rohan-verma",
    name: "Rohan Verma",
    role: "Full Stack & Cloud Engineer",
    organization: "Senior Engineer & Open Source Contributor",
    topic: "From Localhost to Global Edge: Full-Stack on AWS",
    bio: "Passionate about bridging frontend engineering with cloud infrastructure using Next.js, CloudFront CDN, DynamoDB, and automated deployment pipelines.",
    track: "Full-Stack Cloud",
    tag: "Full-Stack & Edge",
    initials: "RV",
    avatarGradient: "from-cyan-500 via-blue-600 to-sky-800",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    isFictionalDemo: false
  },
  {
    id: "ananya-singh",
    name: "Ananya Singh",
    role: "DevOps & Cloud Security Specialist",
    organization: "Cloud Security Consultant & Community Mentor",
    topic: "Zero to Production: CI/CD Pipelines & Container Security",
    bio: "Guides student developers in containerizing applications with Docker, managing AWS ECS/EKS clusters, and writing declarative Infrastructure-as-Code.",
    track: "DevOps & Deployment",
    tag: "DevOps & IaC",
    initials: "AS",
    avatarGradient: "from-emerald-500 via-teal-600 to-slate-800",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    isFictionalDemo: false
  }
];

export const SCHEDULE: ScheduleItem[] = [
  {
    id: "sched-1",
    time: "09:30 AM",
    endTime: "10:00 AM",
    title: "Check-in, Welcome Kit & Community Networking",
    description: "Collect your student builder badge, Wi-Fi credentials, exclusive stickers, and connect with peers over morning refreshments.",
    location: "Main Auditorium Foyer",
    type: "networking",
    trackBadge: "Registration"
  },
  {
    id: "sched-2",
    time: "10:00 AM",
    endTime: "10:30 AM",
    title: "Opening Keynote & Community Vision",
    description: "Welcome address by student club leads and faculty mentors. Introduction to the AWS Student Builder ecosystem, community vision, and day's roadmap.",
    speaker: "Faculty Mentors & Student Leads",
    speakerRole: "Rungta University",
    location: "Central Auditorium",
    type: "keynote",
    trackBadge: "Keynote"
  },
  {
    id: "sched-3",
    time: "10:30 AM",
    endTime: "11:15 AM",
    title: "Keynote: Building in the Cloud — Mindset, Velocity & Scale",
    description: "Understanding how modern startups and global engineering platforms leverage cloud primitives to iterate rapidly and maintain 99.99% reliability.",
    speaker: "Arjun Mehta",
    speakerRole: "Cloud Solutions Architect",
    location: "Central Auditorium",
    type: "keynote",
    trackBadge: "Cloud Architecture"
  },
  {
    id: "sched-4",
    time: "11:15 AM",
    endTime: "12:00 PM",
    title: "AWS Cloud Fundamentals: Compute, Storage & Networking",
    description: "Deep-dive into EC2, S3, VPC subnetting, and IAM security boundaries with live architectural diagram walkthroughs.",
    speaker: "Rohan Verma",
    speakerRole: "Full Stack & Cloud Engineer",
    location: "Central Auditorium",
    type: "fundamentals",
    trackBadge: "Core Cloud"
  },
  {
    id: "sched-5",
    time: "12:00 PM",
    endTime: "01:15 PM",
    title: "Hands-on Builder Session: Serverless Microservice Deployment",
    description: "Interactive terminal lab: deploy your first REST API using AWS Lambda, API Gateway, and DynamoDB with zero servers to maintain.",
    speaker: "Arjun Mehta & Ananya Singh",
    speakerRole: "Lab Mentors",
    location: "Cloud Computing Lab 1 & 2",
    type: "hands-on",
    trackBadge: "Hands-on Lab"
  },
  {
    id: "sched-6",
    time: "01:15 PM",
    endTime: "02:00 PM",
    title: "Networking Lunch & Peer Discussions",
    description: "Complimentary lunch. Connect with mentors, discuss student projects, open-source ideas, and team up for the afternoon challenge.",
    location: "Student Activity Center",
    type: "networking",
    trackBadge: "Networking"
  },
  {
    id: "sched-7",
    time: "02:00 PM",
    endTime: "03:00 PM",
    title: "Generative AI on AWS: Building Real-World LLM Apps with Bedrock",
    description: "Learn how to orchestrate Claude, Llama 3, and Titan foundation models using Amazon Bedrock, prompt engineering techniques, and vector search.",
    speaker: "Priya Nair",
    speakerRole: "Generative AI Engineer",
    location: "Central Auditorium",
    type: "ai",
    trackBadge: "Generative AI"
  },
  {
    id: "sched-8",
    time: "03:00 PM",
    endTime: "04:15 PM",
    title: "The Rapid Build Challenge: Idea to Live Prototype",
    description: "Teams tackle a guided problem statement: build and deploy a working cloud prototype in 75 minutes with mentor assistance.",
    speaker: "Mentors & Student Leads",
    speakerRole: "Live Mentorship",
    location: "Innovation Labs & Hall B",
    type: "challenge",
    trackBadge: "Hack Sprint"
  },
  {
    id: "sched-9",
    time: "04:15 PM",
    endTime: "04:45 PM",
    title: "Project Showcase & Peer Demos",
    description: "Top team prototypes demo their live applications. Audience voting, technical review, and engineering feedback.",
    location: "Central Auditorium",
    type: "showcase",
    trackBadge: "Showcase"
  },
  {
    id: "sched-10",
    time: "04:45 PM",
    endTime: "05:00 PM",
    title: "Community Wrap-up, Swag & Next Steps",
    description: "Awarding standout builder projects, distributing AWS community swags, certificates of participation, and learning roadmap for upcoming cohorts.",
    speaker: "Student Community Leads",
    speakerRole: "Wrap-up",
    location: "Central Auditorium",
    type: "wrapup",
    trackBadge: "Closing"
  }
];

export const TRACKS: Track[] = [
  {
    id: "cloud-foundations",
    title: "Cloud Foundations",
    subtitle: "Architecture, Compute & High Availability",
    description: "Master essential cloud fundamentals: compute virtualization, resilient object storage, VPC networking, security boundaries, and infrastructure economics.",
    technologies: ["Amazon EC2", "Amazon S3", "Amazon VPC", "AWS IAM", "CloudWatch"],
    keyTopics: [
      "Core cloud primitives and virtualization concepts",
      "Designing multi-AZ high availability systems",
      "Securing resources with least-privilege IAM policies",
      "Architecting cost-optimized cloud workloads"
    ],
    targetAudience: "Beginners & intermediate students eager to establish strong cloud fundamentals.",
    badge: "FOUNDATIONS",
    accentColor: "border-sky-500/30 text-sky-400 bg-sky-500/10"
  },
  {
    id: "ai-generative-ai",
    title: "AI & Generative AI",
    subtitle: "Foundation Models, RAG & Autonomous Agents",
    description: "Discover practical generative AI development. Learn to integrate Bedrock foundation models, manage embeddings, build RAG systems, and deploy smart agents.",
    technologies: ["Amazon Bedrock", "Titan & Claude Models", "OpenSearch Serverless", "LangChain", "Vector DBs"],
    keyTopics: [
      "Accessing foundation models via unified Bedrock APIs",
      "Implementing Retrieval-Augmented Generation (RAG)",
      "Prompt engineering and guardrails for safety",
      "Autonomous tool-calling AI agents in the cloud"
    ],
    targetAudience: "Students interested in AI, data science, and modern LLM application building.",
    badge: "AI & LLMS",
    accentColor: "border-amber-500/30 text-amber-400 bg-amber-500/10"
  },
  {
    id: "fullstack-cloud",
    title: "Full-Stack Cloud",
    subtitle: "Modern Web, Serverless APIs & NoSQL",
    description: "Bridge frontend web frameworks with elastic cloud infrastructure. Construct snappy web applications backed by serverless microservices and distributed databases.",
    technologies: ["AWS Lambda", "Amazon API Gateway", "Amazon DynamoDB", "Amazon CloudFront", "React / Next.js"],
    keyTopics: [
      "Decoupled event-driven serverless architectures",
      "NoSQL data modeling for sub-millisecond queries",
      "Global CDN caching and edge compute distribution",
      "End-to-end authentication and secure sessions"
    ],
    targetAudience: "Web developers, mobile creators, and software engineering students.",
    badge: "FULL-STACK",
    accentColor: "border-orange-500/30 text-orange-400 bg-orange-500/10"
  },
  {
    id: "devops-deployment",
    title: "DevOps & Deployment",
    subtitle: "CI/CD, Containers & Infrastructure-as-Code",
    description: "Learn modern deployment automation: containerizing services with Docker, building automated GitHub Actions pipelines, and managing cloud resources using code.",
    technologies: ["Docker", "Amazon ECS", "AWS CloudFormation / CDK", "GitHub Actions", "AWS CodePipeline"],
    keyTopics: [
      "Containerization fundamentals and image optimization",
      "Continuous Integration & Continuous Deployment workflows",
      "Declarative Infrastructure as Code (IaC) with AWS CDK",
      "Observability, alerting, and telemetry in production"
    ],
    targetAudience: "Students passionate about systems engineering, reliability, and deployment tooling.",
    badge: "DEVOPS",
    accentColor: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
  }
];

export const BENEFITS = [
  {
    id: "benefit-1",
    title: "Learn from Seasoned Builders",
    subtitle: "Real Architecture, Not Theory",
    description: "Gain direct insight into how scalable systems are engineered and operated in production, cutting through buzzwords to understand real trade-offs.",
    icon: "Boxes",
    tag: "Practical Insight"
  },
  {
    id: "benefit-2",
    title: "Build Hands-On in the Lab",
    subtitle: "Guided Labs & Terminal Time",
    description: "Write code, provision cloud services, run terminal commands, and solve technical hurdles in supervised interactive sessions.",
    icon: "Terminal",
    tag: "Interactive Labs"
  },
  {
    id: "benefit-3",
    title: "Master Generative AI",
    subtitle: "Bedrock & Foundation Models",
    description: "Move beyond standard chat interfaces by learning how engineers integrate enterprise LLMs, manage prompt flows, and query vector databases.",
    icon: "Sparkles",
    tag: "Next-Gen Tech"
  },
  {
    id: "benefit-4",
    title: "Expand Your Network",
    subtitle: "500+ Peers & Mentors",
    description: "Form lasting connections with fellow student builders, find future hackathon teammates, and meet engineers with real-world industry experience.",
    icon: "Users",
    tag: "Networking"
  },
  {
    id: "benefit-5",
    title: "Elevate Your Portfolio",
    subtitle: "Ship Something Verifiable",
    description: "Walk away with functional code pushed to your GitHub profile and live cloud endpoints you can showcase to recruiters and peers.",
    icon: "FolderGit2",
    tag: "Career Growth"
  },
  {
    id: "benefit-6",
    title: "Get Recognized & Badged",
    subtitle: "Community Certs & Resources",
    description: "Receive an official Student Builder Community participation certificate, digital credential badge, and curated learning roadmaps.",
    icon: "Award",
    tag: "Recognition"
  }
];

export const STATS: StatItem[] = [
  {
    id: "stat-1",
    value: 500,
    suffix: "+",
    label: "Students Registered",
    description: "Curious builders, innovators, and cloud enthusiasts across campus departments"
  },
  {
    id: "stat-2",
    value: 20,
    suffix: "+",
    label: "Mentors & Speakers",
    description: "Industry architects, student tech leads, and dedicated lab instructors"
  },
  {
    id: "stat-3",
    value: 8,
    suffix: "+",
    label: "Hands-on Sessions",
    description: "Curated workshops, live coding demonstrations, and architectural breakdowns"
  },
  {
    id: "stat-4",
    value: 1,
    suffix: "",
    label: "Full Day of Building",
    description: "From 09:30 AM check-in to 05:00 PM project demos and community celebration"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Who can attend this community event?",
    answer:
      "Any college student interested in technology, software development, cloud computing, AI, or system design is welcome! Whether you are a first-year student just beginning programming or a final-year student preparing for cloud careers, the sessions are structured with beginner through intermediate content.",
    category: "General"
  },
  {
    id: "faq-2",
    question: "Is registration really completely free?",
    answer:
      "Yes! Registration is 100% free for all students. Thanks to student volunteers, community mentors, and university host facilities, there are no participation fees, registration charges, or hidden costs.",
    category: "Registration"
  },
  {
    id: "faq-3",
    question: "Do I need prior AWS or cloud computing experience?",
    answer:
      "No previous AWS experience is required. We start with fundamental concepts in the morning before advancing to hands-on exercises. Mentors will be present throughout the day to help troubleshoot issues and explain concepts step-by-step.",
    category: "Prerequisites"
  },
  {
    id: "faq-4",
    question: "Should I bring a laptop?",
    answer:
      "Yes, bringing a personal laptop is highly recommended for the hands-on sessions and afternoon builder challenge. Please make sure your laptop is charged and you have a modern web browser installed (Chrome, Firefox, Edge, or Safari). We will provide campus Wi-Fi access.",
    category: "Logistics"
  },
  {
    id: "faq-5",
    question: "Is the event online or in-person?",
    answer:
      "This is an on-campus, in-person community event hosted at Rungta University, Bhilai, inside the Central Auditorium and Cloud Computing Labs.",
    category: "Logistics"
  },
  {
    id: "faq-6",
    question: "Will there be hands-on building or just presentations?",
    answer:
      "Hands-on building is the core philosophy of the event! The agenda allocates dedicated lab hours for the Serverless Microservice deployment and the 75-minute Rapid Build Challenge where teams build and demo live prototypes.",
    category: "Agenda"
  },
  {
    id: "faq-7",
    question: "Will participants receive a certificate of participation?",
    answer:
      "Yes, every attendee who checks in at the registration desk and completes the community day will receive an official Certificate of Participation and digital credential badge for their resume and LinkedIn.",
    category: "General"
  },
  {
    id: "faq-8",
    question: "What should I bring along on the day?",
    answer:
      "Bring your college student ID card for check-in verification, your laptop and charger, a notepad if you prefer physical notes, and an eager mindset ready to experiment and collaborate!",
    category: "Logistics"
  }
];

export const CHALLENGE_STEPS = [
  {
    step: "01",
    name: "IDEA",
    title: "Select a Real Problem",
    description: "Choose from curated problem prompts in campus automation, student sustainability, or developer productivity."
  },
  {
    step: "02",
    name: "ARCHITECT",
    title: "Draft Cloud Topology",
    description: "Sketch an event-driven flow selecting compute (Lambda), data (DynamoDB/S3), and AI integration (Bedrock)."
  },
  {
    step: "03",
    name: "BUILD",
    title: "75-Min Rapid Sprint",
    description: "Write application code and configure services in provided sandbox environments with mentors on standby."
  },
  {
    step: "04",
    name: "DEPLOY",
    title: "Publish to Live URL",
    description: "Push your code to a live public endpoint using serverless deployments or automated edge hosting."
  },
  {
    step: "05",
    name: "DEMO",
    title: "Peer Showcase",
    description: "Present a 2-minute live demo to attendees and mentors for feedback, recognition, and community swags."
  }
];

export const WORKFLOW_STAGES = [
  {
    id: "learn",
    title: "Learn",
    tagline: "Absorb Cloud Foundations",
    description: "Demystify core cloud infrastructure, security best practices, and AI models through engineer-led sessions."
  },
  {
    id: "build",
    title: "Build",
    tagline: "Hands-on Implementation",
    description: "Open your terminal and IDE. Assemble functional backend microservices, databases, and generative AI pipelines."
  },
  {
    id: "deploy",
    title: "Deploy",
    tagline: "Ship to the Global Edge",
    description: "Experience the thrill of continuous deployment, distributing applications globally with sub-second latency."
  },
  {
    id: "share",
    title: "Share",
    tagline: "Inspire Your Community",
    description: "Showcase your GitHub repository, demo your project to peers, and contribute your knowledge back to student builders."
  }
];

// Realistic initial registrations for the Organizer Admin Portal
export const INITIAL_REGISTRATIONS: RegistrationRecord[] = [
  {
    id: "reg-101",
    ticketId: "RU-AWS-58291",
    fullName: "Aditya Verma",
    email: "aditya.verma@rungta.ac.in",
    phone: "+91 98271 34091",
    college: "Rungta College of Engineering & Technology",
    course: "B.Tech Computer Science (AI/ML)",
    yearOfStudy: "3rd Year",
    profileUrl: "https://github.com/aditya-cloud",
    areaOfInterest: "Generative AI",
    agreeUpdates: true,
    registeredAt: "2026-09-18T10:14:00Z",
    isCheckedIn: true
  },
  {
    id: "reg-102",
    ticketId: "RU-AWS-62940",
    fullName: "Sneha Mukherjee",
    email: "sneha.m@rungta.ac.in",
    phone: "+91 94062 88123",
    college: "Rungta University, Bhilai",
    course: "B.Tech Information Technology",
    yearOfStudy: "4th Year",
    profileUrl: "https://linkedin.com/in/sneha-mukherjee",
    areaOfInterest: "AWS Cloud",
    agreeUpdates: true,
    registeredAt: "2026-09-18T11:45:00Z",
    isCheckedIn: true
  },
  {
    id: "reg-103",
    ticketId: "RU-AWS-74102",
    fullName: "Karthik R. Nair",
    email: "karthik.nair@gmail.com",
    phone: "+91 97531 44290",
    college: "BIT Durg",
    course: "B.Tech Computer Science",
    yearOfStudy: "2nd Year",
    profileUrl: "https://github.com/karthik-nair",
    areaOfInterest: "Full Stack Development",
    agreeUpdates: true,
    registeredAt: "2026-09-18T14:20:00Z",
    isCheckedIn: false
  },
  {
    id: "reg-104",
    ticketId: "RU-AWS-81534",
    fullName: "Meera Chandrakar",
    email: "meera.c@rungta.ac.in",
    phone: "+91 98263 71904",
    college: "Rungta Engineering College, Raipur",
    course: "B.Tech Electronics & Telecommunication",
    yearOfStudy: "3rd Year",
    profileUrl: "https://linkedin.com/in/meera-c",
    areaOfInterest: "DevOps",
    agreeUpdates: true,
    registeredAt: "2026-09-19T09:05:00Z",
    isCheckedIn: false
  },
  {
    id: "reg-105",
    ticketId: "RU-AWS-90421",
    fullName: "Aman Preet Singh",
    email: "aman.singh@rungta.ac.in",
    phone: "+91 91310 55892",
    college: "Rungta University, Bhilai",
    course: "MCA (Master of Computer Applications)",
    yearOfStudy: "Postgraduate",
    profileUrl: "https://github.com/aman-preet",
    areaOfInterest: "Generative AI",
    agreeUpdates: true,
    registeredAt: "2026-09-19T11:32:00Z",
    isCheckedIn: false
  }
];
