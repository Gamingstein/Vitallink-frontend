import { SignupForm } from "@/components/forms/signup-form";

export const metadata = {
  title: "Sign Up",
  description: "Sign up for a new account",
};

export default function SignUpPage() {
  return (
    <div className="h-full flex justify-center items-center flex-col">
      <SignupForm />
    </div>
  );
}
