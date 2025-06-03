import { createContext, useContext, useState, type ReactNode } from "react";

export interface InvoiceItem {
  product: string;
  price: number;
  quantity: number;
}

export interface InvoiceData {
  date: string;
  invoiceNumber: string;
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  items: InvoiceItem[];
}

interface InvoiceContextType {
  invoice: InvoiceData | null;
  setInvoice: (data: InvoiceData) => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);

  return (
    <InvoiceContext.Provider value={{ invoice, setInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoice() {
  const context = useContext(InvoiceContext);
  if (!context)
    throw new Error("useInvoice must be used within InvoiceProvider");
  return context;
}
