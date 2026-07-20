interface CampaignDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CampaignDetailsPage({
  params,
}: CampaignDetailsPageProps) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Campaign Details</h1>
      <div className="rounded-xl bg-white p-6 shadow">
        <p> Viewing campaign ID: <strong>{id}</strong></p>
        <p className="mt-2 text-gray-600"> Detailed campaign information will be displayed here.</p>
      </div>
    </div>
  );
}