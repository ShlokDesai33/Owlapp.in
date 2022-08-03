export default function UserHit({ hit }: { hit: any }) {
  return (
    <article>
      <img src={hit.image} alt={hit.fullname} referrerPolicy="no-referrer"/>
      <h1>{hit.fullname}</h1>
      <p>@{hit.username}</p>
    </article>
  );
}