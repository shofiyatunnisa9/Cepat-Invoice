import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function InvoiceForm() {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState<string>(today);
  return (
    <>
      <p className="text-3xl text-center font-bold">Invoice Form</p>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <div className="text-sm font-bold">Date:</div>
            <Input
              type="date"
              value={date}
              id="date"
              onChange={(e) => setDate(e.target.value)}
              className="w-35 mt-1"
            />
            <div className="text-sm font-bold mt-2">Invoice Number:</div>
            <Input className="w-35 mt-1" placeholder="0000000xx" />
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold">Cepat</h1>
            <div className="text-sm">Invoice</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <h2 className="font-semibold mb-2">Customer : </h2>
            <Input id="name" type="text" placeholder="Name Customer" />
            <Textarea id="address" placeholder="Address" />
            <Input id="phone" type="text" placeholder="Phone" />
          </div>
          <div>
            <h2 className="font-semibold mb-2">From : </h2>
            <p>Cepat Invoice Business</p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
              iusto atque quam at iure minus numquam molestias consequuntur,
              doloremque perferendis!
            </p>

            <p>(+62) 123-4567</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-4 overflow-x-auto">
            <table className="w-full table-auto border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-lg py-2">Product</th>

                  <th className="text-right  text-lg py-2">Price</th>

                  <th className="text-right text-lg py-2">Quantity</th>

                  <th className="text-right text-lg py-2">Total</th>
                </tr>
              </thead>
            </table>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <div className="w-full max-w-xs text-sm">
            <div className="flex justify-between py-1">
              <span>Subtotal</span>
              <span>Rp.xx.xxx</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Discount</span>
              <span>%</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Subtotal (discount)</span>
              <span>Rp.xx.xxx</span>
            </div>

            <div className="flex justify-between font-bold border-t mt-2 pt-2">
              <span>Total</span>
              <span>Rp.xx.xxxx</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InvoiceForm;
