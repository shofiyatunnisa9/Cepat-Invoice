import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInputForm } from "@/hooks/useInputForm";
import { SchemaInvoice } from "@/lib/schemas/schemaItem";
import type { InvoiceDTO } from "@/lib/schemas/schemaItem";
import { api } from "@/utils/api";
import { useFieldArray } from "react-hook-form";
import { IoAddCircleSharp } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "sonner";

function CreateDialog() {
  const { control, register, watch, handleSubmit } =
    useInputForm<InvoiceDTO>(SchemaInvoice);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "item",
  });
  const onSubmit = async (data: InvoiceDTO) => {
    try {
      const res = await api.post("/invoice", data);
      console.log(res);
      toast.success("Succes!!");
    } catch (error) {
      toast.error("Something wrong!!");
    }
    console.log(data);
  };

  return (
    <div className="space-y-2">
      {fields.map((_, index) => (
        <div className="flex flex-row gap-2 mt-1">
          <div className="w-65">
            <Input
              {...(register(`item.${index}.product`) || 0)}
              type="text"
              id="product"
              placeholder="Product"
            />
          </div>
          <div className="w-35">
            <Input
              {...register(`item.${index}.price`, {
                valueAsNumber: true,
              })}
              type="number"
              id="price"
              placeholder="Price"
              className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield"
            />
          </div>
          <div className="w-2/8">
            <Input
              {...register(`item.${index}.product`, {
                valueAsNumber: true,
              })}
              type="number"
              id="quantity"
              placeholder="Quantity"
              className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield"
            />
          </div>

          <Input
            className="w-1/8"
            disabled
            value={
              watch(`item.${index}.quantity`) * watch(`item.${index}.price`)
            }
          />
          <Button className="cursor-pointer" onClick={() => remove(index)}>
            <RiDeleteBin6Fill />
          </Button>
        </div>
      ))}
      <Button
        className="mt-3 cursor-pointer"
        onClick={() => {
          append({ product: "", price: 0, quantity: 0, total: 0 });
          handleSubmit(onSubmit)();
        }}
      >
        <IoAddCircleSharp />
        Add Item
      </Button>
    </div>
  );
}

export default CreateDialog;
