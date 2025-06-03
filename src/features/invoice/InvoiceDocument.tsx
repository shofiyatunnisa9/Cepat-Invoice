import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PDFViewer } from "@react-pdf/renderer";
import { PdfDocumentPrev } from "./InvoicePrev";

export function InvoiceDocument() {
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
            <PdfDocumentPrev />
          </PDFViewer>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InvoiceDocument;
