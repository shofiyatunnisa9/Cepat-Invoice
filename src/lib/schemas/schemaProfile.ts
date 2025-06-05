import z from "zod";

export const ProfileSchema = z.object({
  // image: z
  //   .any()
  //   .refine((file) => file instanceof File, { message: "Image required" }),
  image: z.instanceof(FileList),
  company: z.string().min(1, { message: "Company required" }),
  phoneNumber: z.string().min(1, { message: "No Telp required" }),
  address: z.string().min(1, { message: "Address required" }),
});

export type profileDTO = z.infer<typeof ProfileSchema>;
