import { z } from "zod";

const trimmedText = z
  .string()
  .trim();

export const contactSchema = z.object({
  name: trimmedText
    .min(2, "Enter your name.")
    .max(100, "Name must be 100 characters or fewer."),

  organization: trimmedText
    .max(
      120,
      "Organization must be 120 characters or fewer.",
    ),

  email: trimmedText
    .email("Enter a valid email address.")
    .max(320, "Email address is too long."),

  subject: trimmedText
    .min(3, "Enter a subject.")
    .max(120, "Subject must be 120 characters or fewer."),

  message: trimmedText
    .min(
      20,
      "Message must contain at least 20 characters.",
    )
    .max(
      5000,
      "Message must be 5,000 characters or fewer.",
    ),

  website: z
    .string()
    .max(0, "Invalid submission."),

  formStartedAt: z.coerce
    .number()
    .int()
    .positive(),
});

export type ContactFormData =
  z.infer<typeof contactSchema>;

export type ContactField =
  | "name"
  | "organization"
  | "email"
  | "subject"
  | "message";