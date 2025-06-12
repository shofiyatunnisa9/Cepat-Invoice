import { useQuery } from "@tanstack/react-query"
import type { cursorProps, schemaInvoiceDTO } from "../types/invoiceTypes"
import { api } from "@/utils/api"
import Cookies from "js-cookie";

interface dataProps{
  invoice: schemaInvoiceDTO[];
  nextCursor: cursorProps;
  prevCursor: cursorProps
}

export const useInvoice = (param: cursorProps | null) => {
  const token = Cookies.get("token")

  const {data, isLoading, error} = useQuery({
    queryKey: ["invoices", param],
    queryFn: async () => {
      const res = await api.get<dataProps>('/invoices', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          direction: param?.direction,
          cursor: param?.cursor
        }
      });

      return res.data
    }
  })
  return {data, isLoading, error}
}