import { SchemaInvoice, type InvoiceDTO } from "@/lib/schemas/schemaItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useProfile } from "./useProfile";
import { generateInvoicePdf } from "@/features/invoice v1/generatePdf";
import { api } from "@/utils/api";

function UseCreateInvoice() {
  const form = useForm<InvoiceDTO>({
    mode: "onChange",
    resolver: zodResolver(SchemaInvoice),
  });
  const { UserProfile } = useProfile();

  const mutation = useMutation({
    mutationKey: ["CreateInvoice"],
    mutationFn: async (data: InvoiceDTO) => {
      // if (!UserProfile) throw new Error("User profile belum siap");

      // const pdfFile = await generateInvoicePdf(data, UserProfile);

      const formData = new FormData();
      formData.append("date", data.date);
      formData.append("company", data.company);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("address", data.address);
      formData.append("noInvoice", data.noInvoice ?? "");
      formData.append("item", JSON.stringify(data.item));
      formData.append("subTotal", String(data.subTotal));
      formData.append("discount", String(data.discount));
      formData.append("total", String(data.total));
      // formData.append("invoice", pdfFile);

      // console.log(formData);
      const res = await api.post("/invoice", formData);

      return res.data;
    },
    onSuccess: () => {
      toast.success("create invoices");
      form.reset;
    },
    onError: () => {
      toast.error("failed create invoice");
    },
  });
  const onSubmit = async (data: InvoiceDTO) => {
    mutation.mutate(data);
  };
  return { form, mutation, onSubmit };
}

export default UseCreateInvoice;
