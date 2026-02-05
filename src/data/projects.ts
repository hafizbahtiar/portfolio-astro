export interface Project {
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  tags: string[];
  link: string;
  github?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    slug: "qiubbx",
    title: "QIUBBX - Zero Commission Halal Marketplace",
    description:
      "A zero-commission Halal marketplace platform designed to empower businesses by eliminating traditional fees associated with e-commerce.",
    fullDescription: `
      A zero-commission Halal marketplace platform designed to empower businesses by eliminating traditional fees associated with e-commerce. The platform democratizes global commerce, enabling sellers to thrive without the burden of commissions while providing AI-powered analytics, global payment support, and integrated logistics.

      Key Features:
      - **Zero Commission Model**: Sellers retain 100% of their earnings with no transaction fees.
      - **AI-Powered Analytics**: Advanced machine learning algorithms providing actionable insights and predictive analytics.
      - **Global Payments**: Multiple currencies and payment methods with instant settlements and fraud protection.
      - **Mobile Commerce**: Progressive web app with touch-optimized interface and offline functionality.
      - **Seller Tools**: Comprehensive suite for inventory management, marketing automation, and performance analytics.
      - **Halal Compliance**: Ethical commerce platform designed for Halal marketplace requirements.
      - **Seamless Logistics**: Integrated logistics support for global transaction experience.
    `,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React", "AI Analytics", "Payment Integration", "PWA"],
    link: "#",
    github: "https://github.com",
  },
  {
    slug: "com-invois",
    title: "Invois - Invoice Management App",
    description:
      "A clean, lightweight mobile app built using Flutter to help freelancers and small business owners create and manage invoices on the go.",
    fullDescription: `
      A clean, lightweight mobile app built using Flutter to help freelancers, small business owners, and entrepreneurs create and manage invoices on the go. The goal is to simplify billing processes with an intuitive, fast, and minimal interface — even for non-tech-savvy users. 100% functional without internet, optimized for performance and mobility.

      Key Features:
      - **Instant Invoice Creation**: Generate and send invoices in seconds.
      - **Client Management**: Save and auto-fill customer info.
      - **PDF Export**: Download/share invoices in high-quality format.
      - **Minimalist UI/UX**: Clean layout with focus on speed and clarity.
      - **Offline by Design**: 100% functional without internet.
      - **Performance Optimized**: Small APK size, smooth animations.
      - **Local Data Storage**: Secure offline data persistence with ObjectBox.
      - **Custom Form Validation**: Robust input validation and error handling.
      - **Future-ready Architecture**: Prepared for multi-language support and cloud backup.
    `,
    tags: ["Flutter", "Dart", "ObjectBox", "Riverpod", "Shared Preferences", "ProGuard", "PDF Generation"],
    link: "#",
    github: "https://github.com",
  },
  {
    slug: "eppp-dbkl",
    title: "ePerolehan DBKL",
    description:
      "Government procurement platform for DBKL that streamlines the tender process. Registered users can browse, purchase tenders, and monitor project progress.",
    fullDescription: `
      Government procurement platform for DBKL that streamlines the tender process. Registered users can browse, purchase tenders, and monitor project progress through an intuitive dashboard.

      Key Features:
      - **Tender management system**: Streamlined process for browsing and purchasing tenders.
      - **Project monitoring dashboard**: Intuitive interface for tracking project progress.
      - **User registration and authentication**: Secure access for registered users.
      - **Payment integration**: Seamless payment processing for tender purchases.
    `,
    tags: ["Laravel", "Flutter", "PostgreSQL", "Postman", "RESTful API"],
    link: "#",
    github: "https://github.com",
  },
  {
    slug: "sf-cit-receipt-book",
    title: "CIT - Full Manage Receipt Book",
    description:
      "A comprehensive web application for security service providers to manage Cash-In-Transit (CIT) orders and digitize the receipt book process.",
    fullDescription: `
      A comprehensive web application for security service providers to manage Cash-In-Transit (CIT) orders. The system digitizes the entire receipt book process, enabling every transaction and receipt page to be tracked and audited efficiently for compliance.

      Key Features:
      - **Digital receipt book management**: Digitizes the traditional receipt book process.
      - **Real-time transaction tracking**: Enables tracking of every transaction in real-time.
      - **Audit trail functionality**: Provides a complete audit trail for compliance.
      - **Compliance reporting**: Efficient reporting to ensure regulatory compliance.
    `,
    tags: ["CodeIgniter 3", "PostgreSQL", "Kotlin", "Postman", "RESTful API", "Docker"],
    link: "#",
    github: "https://github.com",
  },
  {
    slug: "wetrack-system",
    title: "Wetrack System",
    description:
      "Security system for cash-in-transit operations that automates secure lock code delivery and tracking, improving operational efficiency.",
    fullDescription: `
      As a security provider for cash-in-transit operations between cash centers and ATM branches, this system eliminates the need for technicians to call the command center for secure lock codes at each security layer. The system automates secure code delivery and tracking, improving operational efficiency and security.

      Key Features:
      - **Automated secure code delivery**: Eliminates manual calls for lock codes.
      - **Real-time tracking dashboard**: Monitors operations in real-time.
      - **Security layer management**: Manages multiple security layers efficiently.
      - **Operational efficiency analytics**: Provides insights to improve operations.
    `,
    tags: ["CodeIgniter 3", "PostgreSQL", "Kotlin", "Postman", "RESTful API", "Docker"],
    link: "#",
    github: "https://github.com",
  },
  {
    slug: "fasttrack-system",
    title: "Fasttrack System",
    description:
      "A client-facing web application that enables users to conveniently order a variety of services, such as cash-in-transit, through a streamlined interface.",
    fullDescription: `
      A client-facing web application that enables users to conveniently order a variety of services, such as cash-in-transit, through a streamlined and user-friendly interface.

      Key Features:
      - **Service ordering interface**: Convenient ordering of various services.
      - **User-friendly dashboard**: Streamlined interface for easy navigation.
      - **Order tracking system**: Users can track their orders in real-time.
      - **Payment processing integration**: Integrated payment processing for seamless transactions.
    `,
    tags: ["CodeIgniter 4", "PostgreSQL", "Kotlin", "Postman", "RESTful API", "Docker"],
    link: "#",
    github: "https://github.com",
  },
  {
    slug: "jom-dapur",
    title: "Jom Dapur - Food Delivery Platform",
    description:
      "A comprehensive food delivery platform connecting local restaurants with customers, featuring mobile apps and a robust backend.",
    fullDescription: `
      A comprehensive food delivery platform similar to Grab and Foodpanda, connecting local restaurants with customers. Built with React Native for mobile apps and Node.js/Express.js for backend API. The system enables seamless online food ordering, real-time delivery tracking, and integrated payment processing for a complete food delivery experience.

      Key Features:
      - **Customer Mobile App**: React Native app for food ordering and tracking.
      - **Restaurant Management**: Complete restaurant dashboard and menu management.
      - **Real-time Delivery Tracking**: GPS-based delivery monitoring with Socket.io.
      - **Payment Integration**: Secure payment processing with Stripe.
      - **Push Notifications**: Real-time order updates and delivery alerts.
      - **Customer Reviews**: Rating and review system for restaurants and delivery.
      - **Order Management**: Comprehensive order tracking and status updates.
      - **Multi-vendor Support**: Support for multiple restaurants and delivery partners.
      - **Admin Dashboard**: Web-based administrative control panel.
    `,
    tags: ["React Native", "Node.js", "Express.js", "MongoDB", "Socket.io", "Stripe", "Google Maps API"],
    link: "#",
    github: "https://github.com",
  },
  {
    slug: "jd-management",
    title: "JD Management - Administrative Dashboard",
    description:
      "Comprehensive administrative management system for the Jom Dapur food delivery platform, providing operational oversight and analytics.",
    fullDescription: `
      Comprehensive administrative management system for the Jom Dapur food delivery platform. Built with React for frontend and Node.js/Express.js for backend API. Provides operational oversight, real-time analytics, performance monitoring, and investor dashboards. Enables data-driven decision making with detailed KPIs, financial reporting, and business intelligence tools.

      Key Features:
      - **Operational Oversight**: Complete administrative control panel with React dashboard.
      - **Real-time Analytics**: Live data visualization with Socket.io real-time updates.
      - **Investor Monitoring Dashboard**: Comprehensive business intelligence tools.
      - **Financial Reporting**: Detailed revenue and profit analytics with export capabilities.
      - **KPI Tracking**: Key performance indicators and business metrics monitoring.
      - **User Management**: Administrative user roles and permissions with JWT auth.
      - **Performance Monitoring**: System health and operational metrics tracking.
      - **Data Export**: Comprehensive reporting and data export in multiple formats.
      - **Audit Trail**: Complete logging and compliance tracking system.
      - **Multi-level Access Control**: Role-based permissions and security management.
    `,
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Chart.js", "Socket.io", "JWT"],
    link: "#",
    github: "https://github.com",
  },
  {
    slug: "jd-delivery",
    title: "JD Delivery - Rider Mobile App",
    description:
      "Mobile application for delivery riders/drivers in the Jom Dapur food delivery ecosystem, featuring real-time order management and GPS navigation.",
    fullDescription: `
      Mobile application for delivery riders/drivers in the Jom Dapur food delivery ecosystem. Built with React Native and connected to Node.js/Express.js backend API. Provides real-time order management, GPS navigation, earnings tracking, and communication tools. Enables efficient delivery operations with route optimization, customer notifications, and performance analytics for delivery personnel.

      Key Features:
      - **Real-time Order Management**: Live order assignments and status updates via Socket.io.
      - **GPS Navigation**: Integrated maps with route optimization and turn-by-turn directions.
      - **Earnings Tracking**: Detailed earnings dashboard with daily/weekly/monthly reports.
      - **Push Notifications**: Instant alerts for new orders and delivery updates.
      - **Customer Communication**: In-app chat and call functionality with customers.
      - **Delivery Proof**: Photo capture and signature verification for completed deliveries.
      - **Performance Analytics**: Delivery ratings, completion rates, and performance metrics.
      - **Offline Mode**: Basic functionality when internet connection is limited.
      - **Vehicle Management**: Support for different vehicle types and capacities.
      - **Safety Features**: Emergency buttons and location sharing for rider security.
    `,
    tags: ["React Native", "Node.js", "Express.js", "MongoDB", "Google Maps API", "Socket.io", "Geolocation"],
    link: "#",
    github: "https://github.com",
  },
];
