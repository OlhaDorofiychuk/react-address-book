import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ContactEdit({ contacts, setContacts }) {
  const [contactToEdit, setContactToEdit] = useState({});
  const contactId = useParams;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${contactId.id}`)
      .then((response) => response.json())
      .then((targetedContact) => setContactToEdit(targetedContact));
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const type = event.target.type;
    const checked = event.target.checked;

    if (name === "firstName") {
      setContactToEdit({ ...contactToEdit, firstName: value });
    }
    if (name === "lastName") {
      setContactToEdit({ ...contactToEdit, lastName: value });
    }
    if (name === "street") {
      setContactToEdit({ ...contactToEdit, street: value });
    }
    if (name === "city") {
      setContactToEdit({ ...contactToEdit, city: value });
    }
    if (name === "email") {
      setContactToEdit({ ...contactToEdit, email: value });
    }
    if (name === "linkedin") {
      setContactToEdit({ ...contactToEdit, linkedin: value });
    }
    if (name === "twitter") {
      setContactToEdit({ ...contactToEdit, twitter: value });
    }
    if (name === "type" && type === "checkbox") {
      return setContactToEdit({
        ...contactToEdit,
        type: [...contactToEdit.type, value],
      });
    }
  };

  const updateTargetContact = async () => {
    const res = await fetch(`http://localhost:4000/contacts/${contactId.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        firstName: contactToEdit.firstName,
        lastName: contactToEdit.lastName,
        street: contactToEdit.street,
        city: contactToEdit.city,
        email: contactToEdit.email,
        linkedin: contactToEdit.linkedin,
        twitter: contactToEdit.twitter,
        type: contactToEdit.type,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    updateTargetContact().then((data) => {
      const index = contacts.findIndex((contact) => contact.id === data.id);
      const copy = [...contacts];
      copy[index] = data;
      setContacts(copy);
      setContactToEdit({});
      navigate("/");
    });
  };

  return (
    <>
      <form className="form-stack contact-form" onSubmit={handleSubmit}>
        <h2>Edit Contact</h2>

        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          required
          value={contactToEdit.firstName}
          onChange={handleChange}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          required
          value={contactToEdit.lastName}
          onChange={handleChange}
        />

        <label htmlFor="street">Street:</label>
        <input
          id="street"
          name="street"
          type="text"
          required
          value={contactToEdit.street}
          onChange={handleChange}
        />

        <label htmlFor="city">City:</label>
        <input
          id="city"
          name="city"
          type="text"
          required
          value={contactToEdit.city}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="text"
          required
          value={contactToEdit.email}
          onChange={handleChange}
        />

        <label htmlFor="linkedIn">LinkedIn:</label>
        <input
          id="linkedIn"
          name="linkedIn"
          type="text"
          required
          value={contactToEdit.linkedIn}
          onChange={handleChange}
        />

        <label htmlFor="twitter">Twitter:</label>
        <input
          id="twitter"
          name="twitter"
          type="text"
          required
          value={contactToEdit.twitter}
          onChange={handleChange}
        />

        <p>Contact type:</p>
        <div className="contact-type-form-control">
          <label htmlFor="work">
            Work:
            <input
              type="checkbox"
              id="work"
              name="type"
              value="work"
              checked={contactToEdit.type === "work"}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="personal">
            Personal:
            <input
              type="checkbox"
              id="personal"
              name="type"
              value="personal"
              checked={contactToEdit.type === "personal"}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="actions-section">
          <button className="button blue" type="submit">
            Edit Contact
          </button>
        </div>
      </form>
    </>
  );
}

export default ContactEdit;
