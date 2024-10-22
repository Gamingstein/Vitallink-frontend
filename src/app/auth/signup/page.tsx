import { SignupForm } from "@/components/forms/signup-form";

export const metadata = {
  title: "Sign Up Page",
  description: "Sign Up Page",
};

export default function SignUpPage() {
  return (
    <div className="h-full flex justify-center items-center flex-col">
      <SignupForm />
    </div>
  );
}
