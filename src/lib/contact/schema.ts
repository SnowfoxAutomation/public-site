import { z } from "zod";

const trimmedText = z.string().trim();

export const contactFieldsSchema = z.object({
  name: trimmedText
    .min(2, "Please enter your name.")
    .max(100, "Name must be 100 characters or fewer."),

  organization: trimmedText.max(
    120,
    "Organization must be 120 characters or fewer.",
  ),

  email: trimmedText
    .email("Please enter a valid email address.")
    .max(320, "Email address is too long."),

  subject: trimmedText
    .min(3, "Please enter a subject.")
    .max(120, "Subject must be 120 characters or fewer."),

  message: trimmedText
    .min(20, "Please enter at least 20 characters.")
    .max(
      5000,
      "Message must be 5,000 characters or fewer.",
    ),
});

export const contactSchema =
  contactFieldsSchema.extend({
    website: z
      .string()
      .max(0, "Invalid submission."),
  });

export type ContactFieldsData =
  z.infer<typeof contactFieldsSchema>;

export type ContactFormData =
  z.infer<typeof contactSchema>;