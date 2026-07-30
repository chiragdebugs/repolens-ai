import { getReportById } from "@/lib/db";
import { notFound } from "next/navigation";
import { ReportDashboard } from "@/components/ReportDashboard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const data = await getReportById(resolvedParams.id);

  if (!data) {
    return { title: "Report Not Found" };
  }

  return {
    title: `${data.info.owner}/${data.info.repo} - RepoLens AI Analysis`,
    description: `AI generated architecture and complexity report for ${data.info.owner}/${data.info.repo}.`,
  };
}

export default async function SharedReportPage({ params }: PageProps) {
  const resolvedParams = await params;
  const data = await getReportById(resolvedParams.id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-muted/20">
        <ReportDashboard data={data} />
      </main>
      <Footer />
    </>
  );
}
