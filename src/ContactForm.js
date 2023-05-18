import React, { useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import image from "../src/assets/message.svg"

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error and success messages
    setErrorMessage("");
    setSuccessMessage("");

    // Validate form fields
    if (!name || !email || !message) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Prepare data for API request
    const inquiryData = {
      id: nanoid(), // Generate a unique id using nanoid
      name,
      email,
      subject,
      message,
    };

    try {
      setLoading(true);

      // // Send inquiry data to API endpoint
      const response = await axios.post(
        "https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries",
        inquiryData
      );

      setLoading(false);
      setSuccessMessage("Your message has been sent successfully.");

      // Reset form fields
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      setLoading(false);
      setErrorMessage(
        "An error occurred while submitting your message. Please try again later."
      );
    }
  };

  return (
    <div className="app-container">
      <div className="image-div">
      {/* <div class="blur-circle"></div> */}
        <img className="image" src={image} alt=""/>
      </div>
      <div className="form-disguise-wrapper">
        <div className="disguise-div"></div>
        <div className="form-div">
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <h1>Contact Us</h1>
            <div className="wraps">
              <div className="label-div">
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-div">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="wraps">
              <div className="label-div">
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-div">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="wraps">
              <div className="label-div">
                <label htmlFor="subject">Subject</label>
              </div>
              <div className="input-div">
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            </div>

            <div className="wraps">
              <div className="label-div">
                <label htmlFor="message">Message</label>
              </div>
              <div className="input">
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
