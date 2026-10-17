import { redirect } from "next/navigation";

export default async function BundleRedirect({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  redirect(`/${lang}/coffee-bun`);
}
