import Card from "../comp/Card";
import campaigns from "../data/camp";

function Campaigns() {
  return (
    <div className="page">
      <div className="campaign-head">
        <p className="quote">
          "Kindness today creates hope for tomorrow."
        </p>

        <h1>Our Campaigns</h1>

        <p>
          Choose a cause that matters to you and make a meaningful difference.
        </p>
      </div>

      <div className="cards">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}

export default Campaigns;