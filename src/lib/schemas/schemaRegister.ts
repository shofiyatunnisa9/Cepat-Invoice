import z from "zod";

export const authSchema = z.object({
  email: z.string().email().min(1, { message: "email required" }),
  password: z.string().min(1, { message: "password required" }),
});

export type authSchemaDTO = z.infer<typeof authSchema>;
