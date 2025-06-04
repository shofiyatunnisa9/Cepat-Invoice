import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValues } from "react-hook-form";
import { ZodType } from "zod";

export const useInputForm = <T extends FieldValues>(schemas: ZodType) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schemas),
    mode: "onChange",
  });

  return { register, control, handleSubmit, watch, reset, errors };
};
