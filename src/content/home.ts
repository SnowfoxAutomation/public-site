export const homeContent = {
  hero: {
    eyebrow: "Canadian-Built Defence Software",
    heading:
      "Secure, intelligent automation for Intelligence and Compliance in any Defence environment.",
    description:
      "Snowfox develops custom AI-powered tools for classified or unprotected settings to give Intelligence personnel the advantage of rapid compliance. Adherance to Intelligence policy and legal frameworks is made easy",
    primaryAction: {
      label: "Contact Snowfox",
      href: "#contact",
    },
    secondaryAction: {
      label: "Our Mission",
      href: "#mission",
    },
  },

  mission: {
    eyebrow: "Our Mission",
    heading:
      "Purpose-built automation for Canadian Defence and Intelligence.",
    description:
      "Snowfox develops tailored automation tools for the Canadian Defence and Intelligence sectors using Canadian-built software and technologies.",
    paragraphs: [
      "Our solutions help organizations harness vast quantities of structured and unstructured information while embedding the constraints of Canadian legislation, policy and operational requirements directly into the workflow.",
      "We focus on practical tools to reduce burdens on intelligence personnel and focus their attention to missions.",
    ],
    principles: [
      {
        title: "Mission Focused",
        description:
          "We build around your requirements, harnessing Machine Learning models for your objectives.",
      },
      {
        title: "Security by Design",
        description:
          "Security, privacy and compliance manifest in any solution we invent.",
      },
      {
        title: "Canadian-Built",
        description:
          "Our tools are made in Canada, by Canadians, for the requirements of Canadian and allied organizations.",
      },
    ],
  },

  products: {
    eyebrow: "Capabilities",
    heading:
      "Automation tools designed with operational experience.",
    description:
      "Snowfox builds focused solutions to confront niche and intricate problems that have been around for decades and that enterprise solutions do not address.",
    capabilities: [
      {
        icon: "workflow",
        title: "Workflow Automation",
        description:
          "Reduce manual workflows that still exist in classified environments.",
      },
      {
        icon: "data",
        title: "Information Processing",
        description:
          "Organize and process large volumes of structured and unstructured information to support timely analysis and compliance.",
      },
      {
        icon: "policy",
        title: "Policy-Aware Systems",
        description:
          "Embed legislation, policy and organizational constraints directly into automated workflows.",
      },
      {
        icon: "integration",
        title: "System Integration",
        description:
          "Connect existing tools and information sources without requiring unnecessary replacement of trusted systems.",
      },
      {
        icon: "decision",
        title: "Maintenance",
        description:
          "Adapt with evolving missions, requirements, laws, policies, and trends.",
      },
      {
        icon: "tailored",
        title: "Tailored Solutions",
        description:
          "Build capabilities around the organization, mission and operating environment rather than a generic product model.",
      },
    ],
  },

  about: {
    eyebrow: "Why Snowfox",
    heading:
      "Canadian expertise applied to enduring problems.",
    description:
      "Snowfox combines operational understanding with modern software engineering to create practical AI and automation capabilities for Canada's Defence and Intelligence community.",
    introduction:
      "We remain lean and focused so that common expertise, clear accountability and direct collaboration are present throughout every engagement.",
    values: [
      {
        title: "Eagerness",
        description:
          "We tackle difficult problems that others have forgotten, deferred or avoided.",
      },
      {
        title: "Innovation",
        description:
          "We pursue constant, practical improvements rather than novelty: Evolution over Revolution.",
      },
      {
        title: "Agility",
        description:
          "We apply the same methods and experience to all our solutions, while keeping a lean company of experts.",
      },
      {
        title: "Accountability",
        description:
          "We will conform to your classification and security requirements, and we will not compromise on quality.",
      },
      {
        title: "Respect",
        description:
          "We treat everyone the same, whether they are government departments, corporations, small businesses, or people.",
      },
      {
        title: "Trustworthiness",
        description:
          "We will earn your trust through future engagements and partnerships.",
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    heading:
      "Discuss a requirement with Snowfox.",
    description:
      "Contact us to discuss an automation challenge or potential collaboration.",
    action: {
      label: "Contact Snowfox",
      href: "mailto:contact@snowfoxautomation.ca",
    },
    note:
      "Please do not include classified or other sensitive information in an initial enquiry.",
  },
} as const;
