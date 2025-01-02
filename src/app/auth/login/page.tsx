import LoginForm from "@/components/forms/login-form";

export const metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LogInPage() {
  return (
    <div className="h-full flex justify-center items-center flex-col">
      <LoginForm />
    </div>
  );
}
