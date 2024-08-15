import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Hi!</h1>
        <h2 className="text-xl">Fill in the form below to join</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          type="text"
          placeholder="Username"
          required
          errors={["username is too short"]}
        />
        <FormInput
          type="email"
          placeholder="Email"
          required
          errors={["wrong email"]}
        />
        <FormInput
          type="password"
          placeholder="Password"
          required
          errors={["use Aa$ once each"]}
        />{" "}
        <FormInput
          type="password"
          placeholder="Confirm Password"
          required
          errors={["Invalid password"]}
        />
        <FormButton text="Create account" loading={false} />
      </form>
      <SocialLogin />
    </div>
  );
}
