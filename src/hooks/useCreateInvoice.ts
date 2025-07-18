import { schemaInvoice, type invoiceDTO } from "@/lib/schemas/schemaItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useProfile } from "./useProfile";
import { generateInvoicePdf } from "@/features/invoice v1/generatePdf";
import { api } from "@/utils/api";

function UseCreateInvoice() {
  const form = useForm<invoiceDTO>({
    mode: "onChange",
    resolver: zodResolver(schemaInvoice),
  });
  const { UserProfile } = useProfile();

  const { mutate, isPending } = useMutation({
    mutationKey: ["CreateInvoice"],
    mutationFn: async (data: invoiceDTO) => {
      if (!UserProfile) throw new Error("User profile belum siap");

      const pdfFile = await generateInvoicePdf(data, UserProfile);

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
      formData.append("invoices", pdfFile);

      // console.log(formData);
      const res = await api.post("/invoice", formData);

      return res.data;
    },
    onSuccess: () => {
      toast.success("create invoices");
      form.reset();
    },
    onError: () => {
      toast.error("failed create invoice");
    },
  });
  const onSubmit = async (data: invoiceDTO) => {
    mutate(data);
  };
  return { form, isPending, mutate, onSubmit };
}

export default UseCreateInvoice;
