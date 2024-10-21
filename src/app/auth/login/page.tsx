import LogIn from "@/components/forms/login-form";

export const metadata = {
  title: "Login Page",
  description: "Login Page",
};

export default function LogInPage() {
  return (
    <div className="h-full flex justify-center items-center flex-col">
      <LogIn />
    </div>
  );
}
