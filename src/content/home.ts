export const homeContent = {
  hero: {
    eyebrow: "Canadian-Developed AI",
    heading:
      "Secure automation for defence, intelligence and mission-critical decision-making.",
    description:
      "Snowfox develops tailored automation solutions that help defence and intelligence professionals spend more time on mission-critical work and less time navigating administrative complexity.",
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
      "Purpose-built automation for Canadian defence and intelligence.",
    description:
      "Snowfox develops tailored automation tools for the Canadian Defence and Intelligence sectors using Canadian-developed machine learning models.",
    paragraphs: [
      "Our solutions help organizations harness vast quantities of structured and unstructured information while embedding the constraints of Canadian legislation, policy and operational requirements directly into the workflow.",
      "We focus on practical capabilities that reduce administrative burden, strengthen decision-making and allow professionals to concentrate on the work that matters most.",
    ],
    principles: [
      {
        title: "Mission Focused",
        description:
          "Every solution begins with the operational outcome rather than the technology.",
      },
      {
        title: "Security by Design",
        description:
          "Security, privacy and compliance are considered from the beginning rather than added later.",
      },
      {
        title: "Canadian Developed",
        description:
          "Our tools are developed in Canada for the requirements of Canadian organizations.",
      },
    ],
  },

  products: {
    eyebrow: "Capabilities",
    heading:
      "Automation tools designed around real operational requirements.",
    description:
      "Snowfox builds focused solutions that connect information, policy and people without forcing organizations into a generic platform.",
    capabilities: [
      {
        icon: "workflow",
        title: "Workflow Automation",
        description:
          "Reduce repetitive administrative work while preserving oversight, accountability and established approval processes.",
      },
      {
        icon: "data",
        title: "Information Processing",
        description:
          "Organize and process large volumes of structured and unstructured information to support timely analysis.",
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
        title: "Decision Support",
        description:
          "Surface relevant information and operational context while keeping accountable professionals in control.",
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
      "Canadian expertise applied to difficult operational problems.",
    description:
      "Snowfox combines operational understanding with modern software engineering to create practical AI and automation capabilities for Canada's defence and intelligence community.",
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
          "We pursue constant, practical improvements rather than innovation for its own sake.",
      },
      {
        title: "Agility",
        description:
          "We remain responsive and focused as operational requirements evolve.",
      },
      {
        title: "Accountability",
        description:
          "We take responsibility for our work, our decisions and the outcomes we support.",
      },
      {
        title: "Respect",
        description:
          "We value the expertise, responsibilities and constraints of the people we work with.",
      },
      {
        title: "Trustworthiness",
        description:
          "We communicate clearly, protect sensitive interests and deliver with integrity.",
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    heading:
      "Discuss a mission requirement with Snowfox.",
    description:
      "Contact us to discuss an automation challenge, operational requirement or potential collaboration.",
    action: {
      label: "Contact Snowfox",
      href: "mailto:contact@snowfoxautomation.ca",
    },
    note:
      "Please do not include classified, protected or operationally sensitive information in an initial enquiry.",
  },
} as const;