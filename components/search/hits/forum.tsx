export default function ForumHit({ hit }: { hit: any }) {
  return (
    <div>
      <h1>{hit.topic}</h1>
      <p>{hit.minRank}</p>
      <p>@{hit.creator.fullname}</p>
    </div>
  );
}