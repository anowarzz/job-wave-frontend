# Job Wave - Modern Job Portal Platform

Job Wave is a comprehensive job portal platform designed to connect job seekers with employers seamlessly. Built with modern web technologies, it provides an intuitive interface for candidates to find opportunities and for recruiters to discover talent.

## 🌐 Live Demo

**[Visit Job Wave](https://jobwave-dun.vercel.app/register)** - Experience the platform live on Vercel

## Project Overview

Job Wave serves as a bridge between talented professionals and companies looking to hire. The platform offers role-based dashboards with distinct functionalities for different user types:

**For Job Seekers (Candidates):**

- Browse and search through available job listings
- Create detailed profiles showcasing skills and experience
- Apply to jobs that match their expertise
- Track application status and manage their job search journey

**For Employers (Recruiters):**

- Post job openings with detailed requirements
- Manage and track posted positions
- Review and filter job applications
- Access analytics to understand recruitment performance

**For Platform Administrators:**

- Comprehensive dashboard with platform analytics
- Manage all users (candidates and recruiters)
- Oversee job postings and applications
- Monitor platform activity and user engagement

The platform emphasizes user experience with a clean, modern interface that works seamlessly across devices. It features real-time notifications, advanced search capabilities, and detailed analytics to help users make informed decisions.

## Tech Stack

**Frontend Framework:**

- **Next.js 15** - React framework with server-side rendering and app router
- **React 19** - Latest version with improved performance and features
- **TypeScript** - Type safety and better developer experience

**Styling & UI:**

- **Tailwind CSS 4** - Utility-first CSS framework for rapid styling
- **Radix UI** - Unstyled, accessible components for complex UI patterns
- **Lucide React** - Beautiful icon library with consistent design
- **Framer Motion** - Smooth animations and interactive transitions

**State Management & Data Fetching:**

- **SWR** - Data fetching library with caching and revalidation
- **React Hook Form** - Performant forms with easy validation
- **Zod** - Schema validation for type-safe data handling

**Development & Build Tools:**

- **Turbopack** - Fast bundler for development and production builds
- **ESLint** - Code linting for consistent code quality
- **PostCSS** - CSS processing and optimization

**Additional Features:**

- **next-themes** - Dark/light theme switching with system preference detection
- **Sonner** - Beautiful toast notifications
- **Class Variance Authority** - Utility for creating consistent component variants

## Key Features

- **Multi-role Authentication** - Separate interfaces for candidates, recruiters, and admins
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode** - Theme switching with system preference detection
- **Real-time Notifications** - Instant updates on application status and new opportunities
- **Advanced Search** - Filter jobs by location, type, skills, and salary range
- **Analytics Dashboard** - Comprehensive insights for recruiters and administrators
- **Profile Management** - Detailed user profiles with skill showcasing
- **Application Tracking** - Monitor job applications from submission to hiring

## Getting Started

### Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **pnpm** (recommended package manager)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/anowarzz/job-wave-frontend.git
   cd job-wave-frontend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your environment variables:

   ```env
   NEXT_PUBLIC_API_URL=your_backend_api_url
   # Add other environment variables as needed
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

### Build for Production

To create a production build:

```bash
pnpm build
```

To start the production server:

```bash
pnpm start
```

### Code Quality

Run the linter to check code quality:

```bash
pnpm lint
```

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes for different roles
│   └── ...                # Other pages (about, contact, jobs)
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (buttons, forms, etc.)
│   ├── layout/           # Layout components
│   └── ...               # Feature-specific components
├── constants/            # Application constants and configurations
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and configurations
└── types/               # TypeScript type definitions
```

#

---
