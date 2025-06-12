import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { useInvoice } from "./hooks/useInvoice";
import type { cursorProps } from "./types/invoiceTypes";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [cursor, setCursor] = useState<cursorProps | null>(null)
  const {data, isLoading} = useInvoice(cursor)
  const invoices = data?.invoice
  const next = data?.nextCursor
  const prev = data?.prevCursor

  return (
    <div className="p-2">
      <h1>List Invoice</h1>
      <Table>
        <TableCaption>A List of your recent invoices.</TableCaption>
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
              <TableCell>INV001</TableCell>
              <TableCell>PT. Agel Langgeng</TableCell>
              <TableCell>+62 xxxx</TableCell>
              <TableCell>file</TableCell>
            </TableRow> :
            invoices?.map(invoice => (
            <TableRow>
              <TableCell>{invoice.noInvoice}</TableCell>
              <TableCell>{invoice.company}</TableCell>
              <TableCell>{invoice.phone}</TableCell>
              <TableCell><Eye className="text-primary"/></TableCell>{/* onClick={invoice.pdfUrl} */}
            </TableRow>
          ))
          }
        </TableBody>
        <TableFooter>
          <Button>Prev</Button>
          <Button>Next</Button>
        </TableFooter>
      </Table>
    </div>
  );
};
export default Dashboard;
