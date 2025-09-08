import { Briefcase, Star } from "lucide-react";
import Link from "next/link";

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO & Founder",
      image: "/src/assets/team/team1.jpg",
      description: "15+ years of experience in HR and recruitment technology",
    },
    {
      id: 2,
      name: "David Chen",
      position: "CTO",
      image: "/src/assets/team/team2.jpg",
      description:
        "Former lead engineer at TechRecruit with expertise in AI-powered job matching",
    },
  ];

  const coreValues = [
    {
      title: "Innovation",
      description:
        "We constantly innovate to provide cutting-edge solutions that simplify the job search process.",
      icon: <Star className="text-yellow-400" />,
    },
    {
      title: "Inclusivity",
      description:
        "We believe in equal opportunities for all, regardless of background or circumstances.",
      icon: <Star className="text-yellow-400" />,
    },
    {
      title: "Integrity",
      description:
        "We maintain the highest ethical standards in all our interactions with job seekers and employers.",
      icon: <Star className="text-yellow-400" />,
    },
    {
      title: "Impact",
      description:
        "We measure our success by the positive impact we make on people's careers and companies' growth.",
      icon: <Star className="text-yellow-400" />,
    },
  ];

  return (
    <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Background decorative elements */}
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full filter blur-3xl opacity-20 bg-blue-500 dark:bg-blue-600 animate-pulse-slow"
            style={{ animationDuration: "15s" }}
          ></div>

          <div
            className="absolute bottom-0 left-0 w-96 h-96 rounded-full filter blur-3xl opacity-20 bg-primary dark:bg-purple-600 animate-pulse-slow"
            style={{ animationDuration: "20s", animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-primary to-blue-500 flex items-center justify-center text-white">
                <Briefcase className="text-2xl" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"></div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              About{" "}
              <span className="bg-gradient-to-r from-primary to-blue-500 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                JobWave
              </span>
            </h1>

            <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
              Connecting talented professionals with their dream careers since
              2020
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              Our Story
            </h2>

            <div className="space-y-6 text-lg">
              <p>
                JobWave was founded in 2020 with a simple yet powerful vision:
                to transform how people find jobs and how companies find talent.
                In a world where the job market was becoming increasingly
                complex and impersonal, we set out to create a platform that
                puts human connections back at the center of recruitment.
              </p>

              <p>
                What began as a startup with just 5 team members has grown into
                a thriving platform serving over 500,000 job seekers and 10,000
                companies worldwide. Our innovative approach combines
                cutting-edge technology with a deep understanding of what
                matters most to both candidates and employers.
              </p>

              <p>
                Today, JobWave is proud to be a leader in the recruitment
                technology space, constantly evolving our platform to meet the
                changing needs of the modern workforce. Our commitment to
                excellence and user satisfaction remains unwavering as we
                continue to grow and expand our services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl shadow-lg bg-white border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Our Mission
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                To empower individuals to build meaningful careers and help
                organizations find the talent they need to thrive. We're
                committed to making job searching and hiring more efficient,
                transparent, and human-centered through innovative technology
                and exceptional service.
              </p>
            </div>

            <div className="p-8 rounded-2xl shadow-lg bg-white border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Our Vision
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                To create a world where everyone can access opportunities that
                match their skills, passions, and potential, regardless of their
                background or location. We envision a future where technology
                and human expertise come together to make career development a
                more fulfilling journey for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            Our Core Values
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="p-6 rounded-xl text-center bg-white border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700 dark:shadow-lg"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-r from-primary to-blue-500 dark:from-purple-600 dark:to-indigo-600">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            Meet Our Leadership
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-col sm:flex-row gap-6 p-6 rounded-xl bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:shadow-lg"
              >
                <div className="w-32 h-32 mx-auto sm:mx-0 overflow-hidden rounded-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="mb-3 text-primary dark:text-purple-400">
                    {member.position}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/careers">
              <button className="px-6 py-3 rounded-lg text-white transition-all duration-300 bg-gradient-to-r from-primary to-blue-500 hover:from-primary hover:to-blue-600 dark:from-purple-600 dark:to-indigo-600 dark:hover:from-purple-700 dark:hover:to-indigo-700 shadow-md hover:shadow-lg">
                Join Our Team
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold mb-2 text-primary dark:text-purple-400">
                500K+
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Active Job Seekers
              </p>
            </div>

            <div className="text-center">
              <p className="text-4xl font-bold mb-2 text-primary dark:text-purple-400">
                10K+
              </p>
              <p className="text-gray-600 dark:text-gray-300">Companies</p>
            </div>

            <div className="text-center">
              <p className="text-4xl font-bold mb-2 text-primary dark:text-purple-400">
                50K+
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Jobs Posted Monthly
              </p>
            </div>

            <div className="text-center">
              <p className="text-4xl font-bold mb-2 text-primary dark:text-purple-400">
                30+
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Countries Served
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-2xl p-8 md:p-12 text-center bg-gradient-to-r from-gray-50 to-white border border-gray-200 shadow-lg dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 dark:shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Ready to Find Your Next Opportunity?
            </h2>
            <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
              Join thousands of professionals who have found their dream jobs
              through JobWave.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/all-jobs">
                <button className="px-6 py-3 rounded-lg text-white transition-all duration-300 bg-gradient-to-r from-primary to-blue-500 hover:from-primary hover:to-blue-600 dark:from-purple-600 dark:to-indigo-600 dark:hover:from-purple-700 dark:hover:to-indigo-700 shadow-md hover:shadow-lg">
                  Browse Jobs
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-6 py-3 rounded-lg transition-all duration-300 bg-white text-primary border border-primary hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 shadow-md hover:shadow-lg">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
