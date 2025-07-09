import z from "zod";

export const SchemaInvoice = z.object({
  noInvoice: z.string().optional(),
  date: z.string(),
  company: z.string().min(1, { message: "Company required" }),
  address: z.string().min(1, { message: "Address required" }),
  phoneNumber: z.string().min(1, { message: "Phone Number required" }),
  item: z.array(
    z.object({
      product: z.string().nonempty(),
      price: z.number().min(1, { message: "price required" }),
      quantity: z.number().min(1, { message: "quantity required" }),
      total: z.number().min(1, { message: "total required" }),
    })
  ),
  subTotal: z.number(),
  discount: z.number(),
  total: z.number(),
  // invoices: z.instanceof(FileList),
});

export type InvoiceDTO = z.infer<typeof SchemaInvoice>;

export const schemabecanda = z.object({
  noInvoice: z.string().optional(),
  date: z.date(),
});

export type becandaDTO = z.infer<typeof schemabecanda>;
