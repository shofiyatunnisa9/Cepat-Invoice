import { z } from "zod";

export const SchemaInvoice = z.object({
  id: z.number(),
  noInvoice: z.string(),
  date: z.date(),
  company: z.string(),
  address: z.string(),
  phone: z.string(),
  pdfUrl: z.string(),
  profileId: z.number(),
  discount: z.number(),
  total: z.number(),
  subTotal: z.number(),
});

export type schemaInvoiceDTO = z.infer<typeof SchemaInvoice>;

export interface cursorProps {
  direction: string;
  cursor: number;
}
