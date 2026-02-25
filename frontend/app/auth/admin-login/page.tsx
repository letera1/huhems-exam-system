import { LoginForm } from "@/components/auth/login-form";
import { DefaultCredentialsHint } from "@/components/auth/default-credentials-hint";

export default function AdminLoginPage() {
  return (
    <div className="grid gap-6">
      <DefaultCredentialsHint role="admin" />
      <LoginForm
        title="Admin Login"
        description="Sign in as an administrator to access management dashboards."
        expectedRole="admin"
        defaultRedirectPath="/admin"
        allowNextPrefix="/admin"
      />
    </div>
  );
}
