import * as yup from "yup";

export const bookTrialSchema = yup.object({
  reason: yup.string().required("Reason is required"),
  fullName: yup.string().min(2, "Too short").required("Full name is required"),
  email: yup.string().email("Wrong email").required("Email is required"),
  phone: yup.string().min(6, "Too short").required("Phone is required"),
});

export type BookTrialValues = yup.InferType<typeof bookTrialSchema>;
