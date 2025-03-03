"use server";

import { TransferFormData, ActionResponse } from "@/lib/types";
import { z } from "zod";

const transferSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  recipientAddress: z
    .string()
    .regex(
      /^(noble|mantra|osmo|celestia)[a-zA-Z0-9]{39}$/,
      "Invalid recipient address format. Must start with noble, mantra, osmo, or celestia followed by 39 alphanumeric characters"
    ),
});

export async function transferTokens(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const rawData: TransferFormData = {
      amount: Number(formData.get("amount")),
      recipientAddress: formData.get("recipientAddress") as string,
    };

    // Validate the form data
    const validatedData = transferSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    // Note: The actual token transfer will be handled on the client side
    // using the signerClient from CosmosKit
    const { amount, recipientAddress } = validatedData.data;

    return {
      success: true,
      message: "Transfer request validated successfully!",
      data: { amount, recipientAddress },
    };
  } catch (error) {
    console.error("Error processing transfer request:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
