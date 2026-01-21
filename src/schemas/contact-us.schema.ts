import { z } from "zod";

export const contactUsSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.email('Invalid email address'),
    message: z.string()
  .min(10, "Message must be at least 10 characters")
  .max(500, "Message must not exceed 500 characters"),
})

export type ContactUsSchema = z.infer<typeof contactUsSchema>