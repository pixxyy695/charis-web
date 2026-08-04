import { ChatWindow } from "@/components/chat/ChatWindow";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppShell } from "@/components/layout/AppShell";

export const dynamic = "force-dynamic";

export default function ConsultationPage() {
  return (
    <ProtectedRoute><AppShell>
      <div className="flex flex-col items-center justify-center py-8">
        <div className="mb-12 max-w-[640px] text-center">
          <div className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
            The consultation
          </div>
          <h1 className="mt-4 font-display text-4xl font-normal text-warmwhite">
            A conversation, not a form
          </h1>
        </div>
        <ChatWindow />
      </div>
    </AppShell></ProtectedRoute>
  );
}
