import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-rich-black-25/30 via-princeton-orange-25/20 via-selective-yellow-25/10 to-rich-black-50/20 dark:from-rich-black-950 dark:via-chocolate-cosmos-950/20 dark:via-princeton-orange-950/10 dark:to-rich-black-900/80">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="mb-4 text-2xl md:text-3xl font-bold tracking-tight lg:text-4xl text-princeton-orange-600">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about using Job Wave for your job
              search or recruitment needs.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem
              value="item-1"
              className="bg-card border border-princeton-orange-200/50 dark:border-princeton-orange-800/30 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:text-princeton-orange-600 dark:hover:text-princeton-orange-400">
                How do I search for jobs on Job Wave?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                You can search for jobs by using the search bar on our homepage.
                Filter by location, job type, salary range, and more to find the
                perfect opportunity. Create an account to save your searches and
                get personalized recommendations.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="bg-card border border-princeton-orange-200/50 dark:border-princeton-orange-800/30 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:text-princeton-orange-600 dark:hover:text-princeton-orange-400">
                How do I apply for a job?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Once you find a job you're interested in, click on the "Apply
                Now" button. You'll need to create an account or log in, then
                upload your resume and fill out any required information. Some
                jobs may require additional steps like assessments or
                interviews.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="bg-card border border-princeton-orange-200/50 dark:border-princeton-orange-800/30 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:text-princeton-orange-600 dark:hover:text-princeton-orange-400">
                How do I post a job as a recruiter?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Recruiters can post jobs by creating a recruiter account.
                Navigate to the "Post a Job" section in your dashboard, fill in
                the job details including title, description, requirements, and
                salary. You can also manage applications and communicate with
                candidates through our platform.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="bg-card border border-princeton-orange-200/50 dark:border-princeton-orange-800/30 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:text-princeton-orange-600 dark:hover:text-princeton-orange-400">
                Is Job Wave free to use?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, Job Wave is free for job seekers to search and apply for
                jobs. For recruiters, we offer both free and premium plans. Free
                plans allow posting a limited number of jobs, while premium
                plans provide advanced features like priority listings and
                analytics.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="bg-card border border-princeton-orange-200/50 dark:border-princeton-orange-800/30 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:text-princeton-orange-600 dark:hover:text-princeton-orange-400">
                How do I create an account?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Click on the "Sign Up" button in the top navigation. Choose
                whether you're a job seeker or recruiter, then fill in your
                details including name, email, and password. Verify your email
                to complete the registration process.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-6"
              className="bg-card border border-princeton-orange-200/50 dark:border-princeton-orange-800/30 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:text-princeton-orange-600 dark:hover:text-princeton-orange-400">
                What makes Job Wave different from other job platforms?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Job Wave offers a user-friendly interface, advanced matching
                algorithms, and comprehensive tools for both job seekers and
                recruiters. We focus on quality over quantity, ensuring better
                matches and a smoother hiring process.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-7"
              className="bg-card border border-princeton-orange-200/50 dark:border-princeton-orange-800/30 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:text-princeton-orange-600 dark:hover:text-princeton-orange-400">
                How can I contact support?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                You can reach our support team through the contact form on our
                website, or by emailing us at contact@jobwave.com. We typically
                respond within 24 hours during business days.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-8"
              className="bg-card border border-princeton-orange-200/50 dark:border-princeton-orange-800/30 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:text-princeton-orange-600 dark:hover:text-princeton-orange-400">
                Can I update my profile after creating an account?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, you can update your profile at any time by going to your
                dashboard and selecting "Profile Settings." You can edit your
                personal information, upload a new resume, update your skills,
                and more.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
