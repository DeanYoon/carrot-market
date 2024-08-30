"use client";

import FormButton from "@/components/form-btn";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useFormState } from "react-dom";
import { smsLogin } from "./actions";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogin, initialState);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login!</h1>
        <h1 className="text-2xl">Verify your phone number</h1>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            key="token"
            name="token"
            type="number"
            placeholder="Confirm Code"
            required
            min={100000}
            max={999999}
            errors={state.error?.formErrors}
          />
        ) : (
          <Input
            key="phone"
            name="phone"
            type="text"
            placeholder="phone number"
            required
            errors={state.error?.formErrors}
          />
        )}
        <FormButton
          text={state.token ? "Verify Token" : "Send Verification SMS"}
        />
      </form>
    </div>
  );
}
