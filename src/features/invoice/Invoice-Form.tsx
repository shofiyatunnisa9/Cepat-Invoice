import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import InvoiceDocument from "./InvoiceDocument";
import { SchemaInvoice, type schemaInvoiceDTO } from "@/lib/schemas/schemaItem";
import { useStoreProfile } from "@/store/user";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoAddCircleSharp } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";

function InvoiceForm() {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState<string>(today);
  const [discount, setDiscount] = useState<number>(0);
  const { profile } = useStoreProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<schemaInvoiceDTO>({
    mode: "onChange",
    resolver: zodResolver(SchemaInvoice),
    defaultValues: {
      noInvoice: "",
      date: new Date(),
      address: "",
      company: "",
      phoneNumber: "",
      items: [{ product: "", price: 0, quantity: 0, total: 0 }],
      originalPrice: 0,
      discount: 0,
      discountPrice: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const items = useWatch({ control, name: "items" }) || [];
  const originalPrice = items.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  const discountPrice = originalPrice - (originalPrice * discount) / 100;

  useEffect(() => {
    setValue("discount", discount);
    setValue("discountPrice", discountPrice);
    setValue("originalPrice", originalPrice);
  }, [discount, discountPrice, setValue, originalPrice]);
  const handleClick = async (data: schemaInvoiceDTO) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col">
      <p className="text-3xl text-center font-bold ">Invoice Form</p>
      <div className=" max-w-4xl  pl-40 space-y-10">
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <div className="text-sm font-bold">Date:</div>
            <Input
              {...register("date")}
              type="date"
              value={date}
              id="date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
              className="w-35 mt-1"
            />
            <div className="text-sm font-bold mt-2">Invoice Number:</div>
            {errors.noInvoice && errors.noInvoice.message}
            <Input
              {...register("noInvoice")}
              className="w-35 mt-1"
              id="noInvoice"
              placeholder="0000000xx"
            />
          </div>
          <div className="text-right">
            <img src={profile?.image} className="size-30"></img>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-1">
            <h2 className="font-semibold mb-2">Customer : </h2>
            <Input
              id="name"
              {...register("company")}
              type="text"
              placeholder="Name Customer"
            />
            {errors.company && (
              <p className="text-destructive"> errors.company.message </p>
            )}
            <Textarea
              id="address"
              {...register("address")}
              placeholder="Address"
            />
            {errors.address && (
              <p className="text-destructive">errors.address.message</p>
            )}
            <Input
              id="phone"
              type="text"
              {...register("phoneNumber")}
              placeholder="Phone"
            />
            {errors.phoneNumber && (
              <p className="text-destructive"> errors.phoneNumber.message </p>
            )}
          </div>
          <div className="pl-20 space-y-2">
            <h2 className="font-semibold mb-2">From : </h2>
            <p>{profile?.company}</p>
            <p>{profile?.address}</p>
            <p>{profile?.phone}</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm text-left -mt-5">
              <thead>
                <tr className="border-b">
                  <th className="w-2/8 text-lg py-2">Product</th>

                  <th className="w-1/8 text-lg py-2">Price</th>

                  <th className="w-2/8 text-lg py-2">Quantity</th>

                  <th className="w-1/8 text-lg py-2">Total</th>
                </tr>
              </thead>
            </table>
            {/* <CreateDialog /> */}
            <div className="space-y-2">
              {fields.map((field, index) => {
                const price = watch(`items.${index}.price`) || 0;
                const quantity = watch(`items.${index}.quantity`) || 0;
                const total = price * quantity;
                // const total = field.price * field.quantity;
                return (
                  <div key={index}>
                    <div className="flex flex-row gap-2 mt-1">
                      <div className="w-65">
                        <Input
                          {...register(`items.${index}.product`)}
                          type="text"
                          id="product"
                          placeholder="Product"
                        />
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
                      </div>

                      <Input
                        className="w-1/8"
                        value={total}
                        readOnly
                        {...register(`items.${index}.total`, {
                          valueAsNumber: true,
                        })}
                      />
                      <Button
                        className="cursor-pointer"
                        onClick={() => remove(index)}
                      >
                        <RiDeleteBin6Fill />
                      </Button>
                    </div>
                  </div>
                );
              })}
              <Button
                className="mt-3 cursor-pointer"
                onClick={() => {
                  append({ product: "", price: 0, quantity: 0, total: 0 });
                }}
              >
                <IoAddCircleSharp />
                Add Item
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end ">
          <div className="w-full max-w-xs text-md">
            <div className="flex justify-between py-1">
              <div>
                <div className="space-x-16">
                  <span className="">Original Price : </span>
                  <span>
                    Rp.
                    {originalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex space-x-20">
                  <span>Discount :</span>
                  <Input
                    id="discount"
                    type="number"
                    className="w-20 -m-px border-none"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                  />
                  <span>%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Discounted Price : </span>
                  <span>Rp. {discountPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold border-t mt-2 pt-2">
                  <span>Total</span>
                  <span>Rp. {discountPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <InvoiceDocument data={watch()} />
        {/* <InvoiceprevPDF /> */}
        <Button
          className="ml-2 cursor-pointer"
          onClick={handleSubmit(handleClick)}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default InvoiceForm;
