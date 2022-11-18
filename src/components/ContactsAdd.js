import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialFormState = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
};

function ContactsAdd(props) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props;
  const [newPerson, setNewPerson] = useState(initialFormState);
  console.log(newPerson);
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
      }),
    })
      .then((response) => response.json())
      .then((newData) => setContacts({ ...contacts, newData }));
    console.log(newData);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    if (name === "firstName") {
      setNewPerson({ firstName: value });
    }
    if (name === "lastName") {
      setNewPerson({ ...newPerson, lastName: value });
    }
    if (name === "strret") {
      setNewPerson({ ...newPerson, street: value });
    }
    if (name === "city") {
      setNewPerson({ ...newPerson, city: value });
    }
  };

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

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default ContactsAdd;
