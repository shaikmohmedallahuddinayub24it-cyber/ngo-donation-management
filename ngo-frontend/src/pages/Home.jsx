import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="hero">
        <p className="quote">
          "Together, we can build a kinder, healthier and brighter future."
        </p>

        <h1>Small Acts Create Big Change</h1>

        <p>
          Your support helps provide food, shelter, education and hope
          to people and communities in need.
        </p>

        <Link to="/campaigns" className="main-btn">
          Donate Now
        </Link>
      </section>

      <section className="stats">
        <div className="stat">
          <h2>12,580+</h2>
          <p>Total Donors</p>
        </div>

        <div className="stat">
          <h2>₹35L+</h2>
          <p>Funds Raised</p>
        </div>

        <div className="stat">
          <h2>40+</h2>
          <p>Campaigns</p>
        </div>

        <div className="stat">
          <h2>25,760+</h2>
          <p>People Helped</p>
        </div>
      </section>

      <section className="home-info">
        <h2>Making a Difference Together</h2>

        <p>
          HopeTogether is a community-focused organization working to
          support people who need help the most. Through donations,
          volunteers and meaningful campaigns, we work toward creating
          better opportunities for individuals and families.
        </p>

        <p>
          Every contribution, whether big or small, can provide food to
          a hungry family, educational supplies to a child, shelter to
          someone in need or emergency support during a disaster.
        </p>

        <Link to="/about" className="main-btn">
          Learn More About Us
        </Link>
      </section>
    </>
  );
}

export default Home;