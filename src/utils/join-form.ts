import * as z from "zod";

export const formSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required.")
    .max(80, "First name must be at most 80 characters."),
  lastName: z
    .string()
    .min(1, "Last name is required.")
    .max(80, "Last name must be at most 80 characters."),
  companyName: z
    .string()
    .min(1, "Company name is required.")
    .max(120, "Company name must be at most 120 characters."),
  workEmail: z.string().email("Enter a valid work email address."),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required.")
    .max(30, "Phone number must be at most 30 characters."),
  country: z
    .string({ error: "Select your country." })
    .min(1, "Select your country."),
  companySize: z.enum(["1-2", "2-5", "5+"], {
    error: "Select a company size.",
  }),
  role: z.enum(
    [
      "founder",
      "engineering",
      "product",
      "marketing",
      "sales",
      "customer support",
      "other",
    ],
    { error: "Select your role." },
  ),
  anythingElse: z
    .string()
    .max(1000, "This field must be at most 1000 characters.")
    .optional(),
});

export type JoinFormValues = z.infer<typeof formSchema>;
