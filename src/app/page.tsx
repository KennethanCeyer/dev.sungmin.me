import { i18n } from "@/i18n-config";
import { redirect } from "next/navigation";

export default function RootRedirect() {
  redirect(`/${i18n.defaultLocale}`);
}
