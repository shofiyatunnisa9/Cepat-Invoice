import z from "zod";

export const SchemaInvoice = z.object({
  noInvoice: z.string().optional(),
  date: z.date(),
  company: z.string().min(1, { message: "Company required" }),
  address: z.string().min(1, { message: "Address required" }),
  phoneNumber: z.string().min(1, { message: "Phone Number required" }),
  items: z.array(
    z.object({
      product: z.string().nonempty(),
      price: z.number().min(1, { message: "price required" }),
      quantity: z.number().min(1, { message: "quantity required" }),
      total: z.number().min(1, { message: "total required" }),
    })
  ),
  originalPrice: z.number(),
  discount: z.number(),
  discountPrice: z.number(),
});

export type schemaInvoiceDTO = z.infer<typeof SchemaInvoice>;
