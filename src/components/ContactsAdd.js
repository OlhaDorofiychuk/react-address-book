import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialFormState = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  email: "",
  linkedin: "",
  twitter: "",
};

function ContactsAdd(props) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props;
  const [newPerson, setNewPerson] = useState(initialFormState);
  const navigate = useNavigate();
  //TODO: Implement controlled form
  //send POST to json server on form submit

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:4000/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: newPerson.firstName,
        lastName: newPerson.lastName,
        street: newPerson.street,
        city: newPerson.city,
        email: newPerson.email,
        linkedin: newPerson.linkedin,
        twitter: newPerson.twitter,
      }),
    })
      .then((response) => response.json())
      .then((newData) => setContacts({ ...contacts, newData }))
      .then(() => {
        // navigate("/contacts/${newdata.id}");
      });

    setNewPerson(initialFormState);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    if (name === "firstName") {
      setNewPerson({ ...newPerson, firstName: value });
    }
    if (name === "lastName") {
      setNewPerson({ ...newPerson, lastName: value });
    }
    if (name === "street") {
      setNewPerson({ ...newPerson, street: value });
    }
    if (name === "city") {
      setNewPerson({ ...newPerson, city: value });
    }
    if (name === "email") {
      setNewPerson({ ...newPerson, email: value });
    }
    if (name === "linkedin") {
      setNewPerson({ ...newPerson, linkedin: value });
    }
    if (name === "twitter") {
      setNewPerson({ ...newPerson, twitter: value });
    }
  };
  console.log(newPerson);
  return (
    <form onSubmit={handleSubmit} className="form-stack contact-form">
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={newPerson.firstName}
        onChange={handleChange}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={newPerson.lastName}
        onChange={handleChange}
        required
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        value={newPerson.street}
        onChange={handleChange}
        required
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        required
        value={newPerson.city}
        onChange={handleChange}
      />
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        value={newPerson.email}
        onChange={handleChange}
      />

      <label htmlFor="linkedin">Linkedin:</label>
      <input
        id="linkedin"
        name="linkedin"
        type="text"
        required
        value={newPerson.linkedin}
        onChange={handleChange}
      />

      <label htmlFor="twitter">Twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="text"
        required
        value={newPerson.twitter}
        onChange={handleChange}
      />
      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default ContactsAdd;
