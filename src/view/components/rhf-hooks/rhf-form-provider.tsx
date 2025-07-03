import { useSnackbar } from "notistack";
import { useTranslations } from "next-intl";
import { FormProvider, UseFormReturn } from "react-hook-form";

import { MAX_FORM_DATA_SIZE } from "@/lib/config/upload";
import { fSize, calculateDataSize } from "@/lib/utils/format";

export type OnSubmitFunction = (data: any) => void | Promise<void>;

interface Props {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit: OnSubmitFunction;
  resetOnSuccess?: boolean;
}

export default function RHFFormProvider({
  children,
  methods,
  onSubmit,
  resetOnSuccess = true,
}: Props) {
  const { handleSubmit, reset } = methods;
  const { enqueueSnackbar } = useSnackbar();
  const t = useTranslations("Global.Message");

  const submit = handleSubmit(async (data) => {
    try {
      const dataSize = calculateDataSize(data);
      if (dataSize > MAX_FORM_DATA_SIZE) {
        throw new Error(
          t("max_form_data_size", {
            current: fSize(dataSize),
            max: fSize(MAX_FORM_DATA_SIZE),
          }),
        );
      }

      await onSubmit(data);
      if (resetOnSuccess) reset();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={submit} className="space-y-4">
        {children}
      </form>
    </FormProvider>
  );
}
