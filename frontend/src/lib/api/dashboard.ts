import { apiFetch } from "./client";
import { DashboardSummary } from "@/types";

export async function getDashboard(token: string): Promise<DashboardSummary> {
  const data = await apiFetch<DashboardSummary>("/dashboard/summary", { token });
  return {
    ...data,
    recentConsultations: data.recentConsultations.map((item) => ({
      ...item,
      status: (item.status as unknown as string) === "in_progress" ? "active" : "complete",
      messages: [],
    })),
  };
}
