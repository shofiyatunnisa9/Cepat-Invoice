import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import { PdfDocumentPrev } from "./InvoicePrev";
import type { schemaInvoiceDTO } from "@/lib/schemas/schemaItem";

interface InvoiceProps {
  data: schemaInvoiceDTO;
}

export function InvoiceDocument({ data }: InvoiceProps) {
  const handleDownload = async () => {
    const blob = await pdf(<PdfDocumentPrev data={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "invoice.pdf";
    link.click();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-bold mt-5 mb-5 cursor-pointer">
          Preview Invoice
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[80vw] max-h-[90vh] overflow-hidden p-0">
        <div className="w-full h-[80vh]">
          <PDFViewer className="w-full h-full">
            <PdfDocumentPrev data={data} />
          </PDFViewer>
          <Button onClick={handleDownload}>Download</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InvoiceDocument;
