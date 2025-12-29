import z from "zod";
import { studentProfileSchema } from "../zod/profile.schema";
type StudentInput = z.infer<typeof studentProfileSchema>;

export type { StudentInput };
