import { Button } from "@/components/ui/button";
import { Dialog, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogContent } from "@radix-ui/react-dialog";
import { IoAddCircleSharp } from "react-icons/io5";

// type Item = {
// name : string
// price : string
// quantity : number
// }
// type Props = {
//     items: Item[]
//     set
// }

function CreateDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-5 mb-5 cursor-pointer">
          <IoAddCircleSharp />
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-row gap-2">
          <Input type="text" id="product" placeholder="Product" />
          <Input type="text" id="price" placeholder="Price" />
          <Input type="text" id="quantity" placeholder="Quantity" />
        </div>
        <DialogFooter>
          <div className="mt-2">
            <Button type="submit" className="cursor-pointer">
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateDialog;
