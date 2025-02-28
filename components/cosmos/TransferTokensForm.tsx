"use client";

import { useActionState } from "react";
import { transferTokens } from "@/actions/transfer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { ActionResponse } from "@/lib/types";
import { CheckCircle2 } from "lucide-react";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export default function AddressForm() {
  const [state, action, isPending] = useActionState(
    transferTokens,
    initialState
  );

  return (
    <Card className="w-full max-w-lg mx-auto mt-5">
      <CardHeader>
        <CardTitle>Transfer Tokens</CardTitle>
        <CardDescription>
          Please enter the amount and recipient address below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-6" autoComplete="on">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                placeholder="100"
                required
                autoComplete="street-address"
                aria-describedby="amount-error"
                className={state?.errors?.amount ? "border-red-500" : ""}
              />
              {state?.errors?.amount && (
                <p id="amount-error" className="text-sm text-red-500">
                  {state.errors.amount[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipientAddress">Recipient Address</Label>
              <Input
                id="recipientAddress"
                name="recipientAddress"
                placeholder="cosmos1..."
                required
                autoComplete="address-level2"
                aria-describedby="recipientAddress-error"
                className={
                  state?.errors?.recipientAddress ? "border-red-500" : ""
                }
              />
              {state?.errors?.recipientAddress && (
                <p id="recipientAddress-error" className="text-sm text-red-500">
                  {state.errors.recipientAddress[0]}
                </p>
              )}
            </div>
          </div>

          {state?.message && (
            <Alert variant={state.success ? "default" : "destructive"}>
              {state.success && <CheckCircle2 className="h-4 w-4" />}
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Transfaring..." : "Transfer Tokens"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
