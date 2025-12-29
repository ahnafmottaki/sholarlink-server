import z from "zod";

const studentProfileSchema = z.object({
  firstName: z.string().trim().min(1).max(10),
  lastName: z.string().trim().min(1).max(10),
  email: z.email("email is required"),
  contactNo: z.string().trim().min(1).max(12),
  dateOfBirth: z.string(),
  gpa: z.string().min(1).max(5),
  satScore: z.string(),
  major: z.string().min(1).max(30),
  university: z.string().min(1).max(30),
});

export { studentProfileSchema };
