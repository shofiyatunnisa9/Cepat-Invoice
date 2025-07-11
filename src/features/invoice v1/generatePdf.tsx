import type { invoiceDTO } from "@/lib/schemas/schemaItem";
import type { profileType } from "@/types/user";
import { pdf } from "@react-pdf/renderer";
import { PdfDocumentPrev } from "./InvoicePrev";

export async function generateInvoicePdf(
  data: invoiceDTO,
  profile: profileType
) {
  const blob = await pdf(
    <PdfDocumentPrev data={data} profile={profile} />
  ).toBlob();

  return new File([blob], "invoice.pdf", { type: "application/pdf" });
}
