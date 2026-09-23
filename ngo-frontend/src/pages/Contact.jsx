import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      alert("Please fill all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      alert("Please enter a valid email");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to submit message");
        return;
      }

      alert("Thank you for contacting HopeTogether!");

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Could not connect to the server");
    }
  };

  return (
    <div className="contact-page">

      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We would love to hear from you.</p>
      </section>

      <section className="contact-content">

        <div className="contact-info">
          <h2>Get in Touch</h2>

          <p>
            Have a question, suggestion or need support?
            Feel free to reach out to our team.
          </p>

          <div className="contact-item">
            <h3>Email</h3>
            <p>support@hopetogether.org</p>
          </div>

          <div className="contact-item">
            <h3>Phone</h3>
            <p>+91 98765 43210</p>
          </div>

          <div className="contact-item">
            <h3>Location</h3>
            <p>123 Green Lane, Hope City, India</p>
          </div>

          <div className="contact-item">
            <h3>Support Hours</h3>
            <p>Monday - Saturday, 9:00 AM - 6:00 PM</p>
          </div>

          <div className="contact-item">
            <h3>How We Can Help</h3>
            <p>
              You can contact us regarding donations, campaigns,
              volunteering, partnerships or general questions about
              HopeTogether.
            </p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>

          <h2>Send Us a Message</h2>

          <label>Your Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Your Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Subject</label>

          <input
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <label>Message</label>

          <textarea
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button type="submit" className="main-btn">
            Send Message
          </button>

        </form>

      </section>

      <section className="contact-bottom">
        <h2>Want to Make a Difference?</h2>

        <p>
          Whether you want to donate, volunteer or support one of our
          campaigns, your involvement can help us reach more people.
        </p>
      </section>

    </div>
  );
}

export default Contact;
