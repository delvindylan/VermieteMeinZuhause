import React from 'react'
import { Link } from 'react-router-dom'
import '../css/About.css'


import { useState } from "react";

export default function About() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      firstname.length > 0 &&
      lastname.length > 0 &&
      email.length > 0 &&
      message.length > 0
    ) {
      alert("Submit Successful");
      handleClear();
    } else {
      alert("Submit failed, fill in the form");
    }
  };

  function handleClear() {
    setFirstname("");
    setLastname("");
    setEmail("");
    setMessage("");
  }

  return (
    <div>
      <h1 className="aboutTitle">About</h1>

      <div className="aboutPage">
        <div className="aboutText">
          <h2 className="aboutLabel">Description</h2>
          <p>
            Für Anfragen, Buchungen oder weitere Informationen stehe ich Ihnen
            gerne zur Verfügung. Füllen Sie einfach das untenstehende
            Kontaktformular aus und ich werde mich so schnell wie möglich bei
            Ihnen melden.
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.771854314345!2d-118.26313002360978!3d34.049722973157884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7b113c83bf1%3A0xa46bf36caf536fed!2sInterContinental%20Los%20Angeles%20Downtown%2C%20an%20IHG%20Hotel!5e0!3m2!1sde!2sch!4v1706224434176!5m2!1sde!2sch"
            width="600"
            height="300"
            style={{ border: "0" }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <form className="contactForm" onSubmit={(e) => handleSubmit(e)}>
          <table>
            <h2 className="contactLabel">Contact</h2>
            <tbody>
              <div>
                <tr>
                  <td>
                    <input
                      className="contactInput"
                      type="text"
                      value={firstname}
                      placeholder="Firstname"
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <input
                      className="contactInput"
                      type="text"
                      value={lastname}
                      placeholder="Lastname"
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <input
                      className="contactInput"
                      type="text"
                      value={email}
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      className="contactInput"
                      type="text"
                      value={message}
                      placeholder="Message"
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </td>
                </tr>
              </div>

              <div className="contactButtons">
                <tr>
                  <td>
                    <input
                      id="contactSubmit"
                      className="contactButton"
                      type="submit"
                      value="Submit"
                    />
                  </td>
                  <td>
                    <input
                      id="contactClear"
                      className="contactButton"
                      type="button"
                      value="Clear"
                      onClick={handleClear}
                    />
                  </td>
                </tr>
              </div>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

