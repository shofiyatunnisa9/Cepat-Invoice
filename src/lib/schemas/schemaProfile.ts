import z from "zod";

export const profileSchema = z.object({
  company: z.string().min(1, { message: "Company required" }),
  phone: z.string().min(1, { message: "No Telp required" }),
  address: z.string().min(1, { message: "address required" }),
});

export type profileDTO = z.infer<typeof profileSchema>;
