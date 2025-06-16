import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { useInvoice } from "./hooks/useInvoice";
import type { cursorProps } from "./types/invoiceTypes";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Dashboard = () => {
  const [cursor, setCursor] = useState<cursorProps | null>(null)
  const {data, isLoading} = useInvoice(cursor)
  const invoices = data?.invoice
  const next = data?.nextCursor
  const prev = data?.prevCursor

  return (
    <div className="p-2">
      <h1 className="text-center text-3xl font-bold mb-5">List Invoice</h1>
      <Table className="mb-3">
        <TableHeader>
          <TableRow >
            <TableHead className="font-bold">No Invoice</TableHead>
            <TableHead className="font-bold">Client</TableHead>
            <TableHead className="font-bold">Phone Number</TableHead>
            <TableHead className="font-bold">Download Invoice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? 
            <TableRow>
              <TableCell colSpan={4} className="text-center p-4">
                Loading...
              </TableCell>
              </TableRow> 
            : invoices?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center p-4">
                No data available.
              </TableCell>
              </TableRow>

            ) : invoices?.map(invoice => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.noInvoice}</TableCell>
              <TableCell>{invoice.company}</TableCell>
              <TableCell>{invoice.phone}</TableCell>
              <TableCell>
                <ShowInvoiceDialog publicUrl={invoice.pdfUrl}/>
                
                </TableCell>
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
      <div className="flex flex-row w-full justify-center gap-6">
        
        {prev && <Button onClick={() => setCursor(prev)}>Prev</Button>}
        {next && <Button onClick={() => setCursor(next)}>Next</Button>}
        
      </div>
    </div>
  );
};

function ShowInvoiceDialog({publicUrl}: {publicUrl : string}){
  const downloadHandler = () => {
    const  link = document.createElement("a")
    link.href = `${publicUrl}?download=`;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Eye className="text-primary"/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50vw] h-[90vh] p-2" showCloseButton={false}>
        <div className="flex flex-col gap-2">
          <embed src={publicUrl}
          className="rounded-sm w-full h-11/12"/>
          <div className="flex justify-end h-1/12">
            <Button className="w-[10vw]" onClick={downloadHandler}>
              Download</Button>
            </div>
        </div>
      </DialogContent>
      
    </Dialog>
  )
}





export default Dashboard;
