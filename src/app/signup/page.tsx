import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start using DatamindX today."
    >
      <SignupForm />
    </AuthLayout>
  );
}