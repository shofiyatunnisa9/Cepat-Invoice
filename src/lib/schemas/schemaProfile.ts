import z from "zod";

export const ProfileSchema = z.object({
  company: z.string().min(1, { message: "Company required" }),
  phoneNumber: z.string().min(1, { message: "No Telp required" }),
  address: z.string().min(1, { message: "Address required" }),
  image: z.instanceof(FileList),
  imageUrl: z.string().optional(),
});

export type profileDTO = z.infer<typeof ProfileSchema>;
