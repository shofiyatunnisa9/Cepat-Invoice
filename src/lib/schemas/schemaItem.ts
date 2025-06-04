import z from "zod";

export const schemaItem = z.object({
  noInvoice: z.string(),
  company: z.string(),
  address: z.string(),
  phone: z.string(),
  items: z.array(
    z.object({
      product: z.string().nonempty(),
      price: z.number().min(1, { message: "price required" }),
      quantity: z.number().min(1, { message: "quantity required" }),
      total: z.number().min(1, { message: "total required" }),
    })
  ),
});

export type schemaItemDTO = z.infer<typeof schemaItem>;
