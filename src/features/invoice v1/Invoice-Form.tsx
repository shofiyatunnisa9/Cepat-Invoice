import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { SchemaInvoice, type InvoiceDTO } from "@/lib/schemas/schemaItem";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoAddCircleSharp } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfile } from "@/hooks/useProfile";
import UseCreateInvoice from "@/hooks/useCreateInvoice";
import { Form } from "@/components/ui/form";

function InvoiceForm() {
  const { form, onSubmit, isPending } = UseCreateInvoice();
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState<string>(today);
  const [discount, setDiscount] = useState<number>(0);
  const { UserProfile } = useProfile();
  const formattedDate = date.replace(/-/g, "");
  const randomDigits = Math.floor(100 + Math.random() * 900);
  const genNoInvoice = `INV-gen-${formattedDate}-${randomDigits}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<InvoiceDTO>({
    mode: "onChange",
    resolver: zodResolver(SchemaInvoice),
    defaultValues: {
      noInvoice: genNoInvoice,
      date: today,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "item",
  });

  const items = useWatch({ control, name: "item" }) || [];
  const subTotal = items.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  const total = subTotal - (subTotal * discount) / 100;

  useEffect(() => {
    setValue("subTotal", subTotal);
    setValue("discount", discount);
    setValue("total", total);
  }, [discount, total, setValue, subTotal]);

  if (!UserProfile) return <h1> User belum membuat profile</h1>;
  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  className="w-35 mt-1 "
                />
                <div className="text-sm font-bold mt-2">Invoice Number:</div>
                {errors.noInvoice && errors.noInvoice.message}
                <Input
                  {...register("noInvoice")}
                  className="w-45 mt-1"
                  id="noInvoice"
                  value={genNoInvoice}
                  placeholder="0000000xx"
                />
              </div>
              <div className="text-right">
                <img src={UserProfile?.image} className="size-30"></img>
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
                  <p className="text-red-500">{errors.company.message}</p>
                )}
                <Textarea
                  id="address"
                  placeholder="Address"
                  {...register("address")}
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address.message}</p>
                )}
                <Input
                  id="phone"
                  type="text"
                  placeholder="Phone"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500">{errors.phoneNumber.message}</p>
                )}
              </div>
              <div className="pl-20 space-y-2">
                <h2 className="font-semibold mb-2">From : </h2>
                <p>{UserProfile?.company}</p>
                <p>{UserProfile?.address}</p>
                <p>{UserProfile?.phone}</p>
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
                    const price = watch(`item.${index}.price`) || 0;
                    const quantity = watch(`item.${index}.quantity`) || 0;
                    const total = price * quantity;
                    return (
                      <div key={index}>
                        <div className="flex flex-row gap-2 mt-1">
                          <div className="w-65">
                            <Input
                              {...register(`item.${index}.product`)}
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
                          <div className="w-3/8">
                            <Input
                              {...register(`item.${index}.quantity`, {
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
                            // value={price * quantity}
                            value={total}
                            readOnly
                            {...register(`item.${index}.total`, {
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
                    <div className="flex justify-between font-bold border-t mt-2 pt-2">
                      <span className="">Subtotal</span>
                      <span>
                        Rp.
                        {subTotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold space-x-52">
                      {/* Dicount */}
                      <span>Discount </span>
                      <div className="flex justify-between items-center">
                        <Input
                          id="discount"
                          type="number"
                          className="
                          appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfields 
                          w-7 px-0
                          focus-visible:ring-0 focus-visible:border-transparent focus-visible:outline-none
                          border-0

                          "
                          placeholder="0"
                          value={discount}
                          onChange={(e) => setDiscount(Number(e.target.value))}
                        />
                        <span>%</span>
                      </div>
                    </div>
                    {/* <div className="flex justify-between py-1">
                      <span>Total : </span>
                      <span>Rp. {total.toLocaleString()}</span>
                    </div> */}
                    <div className="flex justify-between font-bold border-t mt-2 pt-2">
                      <span>Total</span>
                      <span>Rp. {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-28 text-lg cursor-pointer ml-3"
              disabled={isPending}
            >
              {isPending ? "Loading.." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default InvoiceForm;
