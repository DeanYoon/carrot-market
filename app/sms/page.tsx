import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function SMSLogin() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login!</h1>
        <h1 className="text-2xl">Verify your phone number</h1>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          type="number"
          placeholder="phone number"
          required
          errors={["wrong email"]}
        />

        <FormInput
          type="number"
          placeholder="Confirm Code"
          required
          errors={["Invalid password"]}
        />
        <FormButton text="Create account" loading={false} />
      </form>
    </div>
  );
}
