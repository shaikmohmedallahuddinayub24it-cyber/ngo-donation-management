function Card({ campaign }) {
  return (
    <div className="card">
      <div className="card-body">
        <h3>{campaign.title}</h3>

        <p>{campaign.desc}</p>
      </div>
    </div>
  );
}

export default Card;