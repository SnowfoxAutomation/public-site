export const contactContent = {
  hero: {
    eyebrow: "Contact",
    title: "Let’s discuss your mission.",
    description:
      "Snowfox Automation develops secure AI and automation solutions tailored for Canadian defence and intelligence organizations.",
  },

  beforeContact: {
    title: "Before contacting us",
    description:
      "We welcome enquiries regarding automation, artificial intelligence, software engineering and mission support. Please do not include classified, protected, export-controlled or otherwise operationally sensitive information.",
  },

  process: {
    title: "What happens next?",
    steps: [
      {
        title: "Initial review",
        description:
          "We review every enquiry to determine how we can best assist.",
      },
      {
        title: "Follow-up",
        description:
          "If appropriate, we’ll arrange an introductory discussion to better understand your requirements.",
      },
      {
        title: "Next steps",
        description:
          "Together, we’ll determine whether Snowfox can provide an appropriate solution.",
      },
    ],
  },

  form: {
    fields: {
      name: {
        label: "Name",
        placeholder: "Jane Smith",
      },
      organization: {
        label: "Organization",
        optionalLabel: "Optional",
        placeholder: "Your organization",
      },
      email: {
        label: "Email",
        placeholder: "name@example.ca",
      },
      subject: {
        label: "Subject",
        placeholder: "How can Snowfox help?",
      },
      message: {
        label: "Message",
        placeholder:
          "Tell us about your project, challenge or operational requirement.",
        guidance:
          "Please do not include classified, protected, export-controlled or other operationally sensitive information. Initial discussions should remain at a high level.",
      },
    },

    requiredIndicator: "*",
    submitLabel: "Send Message",
    pendingLabel: "Sending message...",

    messages: {
      unavailable:
        "The form could not be submitted. Please refresh the page and try again.",
    },
  },
} as const;