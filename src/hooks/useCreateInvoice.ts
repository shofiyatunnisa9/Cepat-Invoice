import { SchemaInvoice, type schemaInvoiceDTO } from "@/lib/schemas/schemaItem";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function UseCreateInvoice() {
  const form = useForm<schemaInvoiceDTO>({
    mode: "onChange",
    resolver: zodResolver(SchemaInvoice),
  });
  const mutation = useMutation({
    mutationKey: ["CreateInvoice"],
    mutationFn: async (data: schemaInvoiceDTO) => {
      const formData = new FormData();
      formData.append("company", data.company);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("address", data.address);
      formData.append("noInvoice", data.noInvoice ?? "");
      formData.append("items", JSON.stringify(data.items));

      // const res = await api.post("/invoice", formData);

      return formData;
    },
    onSuccess: () => {
      toast.success("create invoices");
      form.reset;
    },
    onError: () => {
      toast.error("failed create invoice");
    },
  });
  const onSubmit = async (data: schemaInvoiceDTO) => {
    console.log(data);
  };
  return { form, mutation, onSubmit };
}

export default UseCreateInvoice;
