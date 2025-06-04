import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInputForm } from "@/hooks/useInputForm";
import { schemaItem, type schemaItemDTO } from "@/lib/schemas/schemaItem";
import { useFieldArray } from "react-hook-form";
import { IoAddCircleSharp } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaSave } from "react-icons/fa";

function CreateDialog() {
  const { control, register, watch, errors, handleSubmit } =
    useInputForm<schemaItemDTO>(schemaItem);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <div className="space-y-2">
      {fields.map((field, index) => (
        <div className="flex flex-row gap-2 mt-1">
          <div className="w-65">
            <Input
              {...register(`items.${index}.product`)}
              type="text"
              id="product"
              placeholder="Product"
            />
            {/* {errors.product && (
                <p className="text-destructive">{errors.product.message}</p>
              )} */}
          </div>
          <div className="w-35">
            <Input
              {...register(`items.${index}.price`, {
                valueAsNumber: true,
              })}
              type="number"
              id="price"
              placeholder="Price"
              className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield"
            />
            {/* {errors.price && (
                <p className="text-destructive">{errors.price.message}</p>
              )} */}
          </div>
          <div className="w-2/8">
            <Input
              {...register(`items.${index}.quantity`, {
                valueAsNumber: true,
              })}
              type="number"
              id="quantity"
              placeholder="Quantity"
              className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield"
            />
            {/* {errors.quantity && (
                <p className="text-destructive">{errors.quantity.message}</p>
                )} */}
          </div>

          <Input
            className="w-1/8"
            disabled
            value={
              watch(`items.${index}.quantity`) * watch(`items.${index}.price`)
            }
          />
          <Button className="cursor-pointer" onClick={() => remove(index)}>
            <RiDeleteBin6Fill />
          </Button>
        </div>
      ))}
      <Button
        className="mt-3 cursor-pointer"
        onClick={() => append({ product: "", price: 0, quantity: 0, total: 0 })}
      >
        <IoAddCircleSharp />
        Add Item
      </Button>
      {/* <div className="mt-2">
        <Button type="submit" className="cursor-pointer">
          Save
        </Button>
      </div> */}
    </div>
  );
}

export default CreateDialog;
