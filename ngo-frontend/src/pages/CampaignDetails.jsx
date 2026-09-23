import { Link, useParams } from "react-router-dom";
import campaigns from "../data/camp";

function CampaignDetails() {
  const { id } = useParams();

  const campaign = campaigns.find(
    (campaign) => campaign.id === Number(id)
  );

  if (!campaign) {
    return (
      <div className="page">
        <h1>Campaign Not Found</h1>

        <p>
          The campaign you are looking for does not exist.
        </p>

        <Link to="/campaigns" className="card-btn">
          Back to Campaigns
        </Link>
      </div>
    );
  }

  return (
    <div className="campaign-details">
      <div className="details-box">

        <p className="details-label">
          OUR CAMPAIGN
        </p>

        <h1>{campaign.title}</h1>

        <p className="details-description">
          {campaign.desc}
        </p>

        <div className="campaign-info">

          <div className="info-item">
            <h3>Our Goal</h3>
            <p>
              Support people and communities who need
              essential help and resources.
            </p>
          </div>

          <div className="info-item">
            <h3>Who We Help</h3>
            <p>
              Families, children and vulnerable people
              in our communities.
            </p>
          </div>

          <div className="info-item">
            <h3>How Your Donation Helps</h3>
            <p>
              Your contribution helps provide essential
              resources and support to people in need.
            </p>
          </div>

        </div>

        <div className="details-actions">

          <Link
            to={`/donate/${campaign.id}`}
            className="main-btn"
          >
            Donate to this Campaign
          </Link>

          <Link
            to="/campaigns"
            className="back-btn"
          >
            ← Back to Campaigns
          </Link>

        </div>

      </div>
    </div>
  );
}

export default CampaignDetails;