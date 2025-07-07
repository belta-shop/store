"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

import { yup } from "@/lib/utils/yup";
import { OTPPurpose } from "@/lib/types/auth";
import { EMAIL_REGEX } from "@/lib/config/global";
import { axiosInstance } from "@/lib/utils/axios";
import { endpoints } from "@/lib/config/endpoints";
import { Button } from "@/view/components/elements";
import Alert from "@/view/components/elements/alert";
import RHFTextInput from "@/view/components/rhf-hooks/rhf-textinput";

interface Props {
  onSuccess: (email: string) => void;
}

interface FormValues {
  email: string;
}

export default function ForgotPasswordEmail({ onSuccess }: Props) {
  const t = useTranslations();
  const [error, setError] = useState("");

  const methods = useForm<FormValues>({
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .required(t("Global.Validation.email_required"))
          .matches(EMAIL_REGEX, t("Global.Validation.email_invalid")),
      }),
    ),
    defaultValues: {
      email: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError("");
      await axiosInstance.post(endpoints.auth.sendGuestOtp, {
        email: data.email,
        purpose: OTPPurpose.ResetPassword,
      });
      onSuccess(data.email);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  });

  return (
    <div className="flex flex-col gap-12">
      <p className="text-secondary">
        {t("Pages.Auth.forgot_password_subtitle")}
      </p>

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            {error && <Alert variant="error">{error}</Alert>}

            <RHFTextInput
              name="email"
              fullWidth
              type="email"
              label={t("Global.Label.email")}
            />

            <Button
              type="submit"
              className="mt-1"
              disabled={isSubmitting}
              fullWidth
            >
              {t("Global.Action.send_otp")}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
