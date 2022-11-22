import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";

function ContactsView({ contacts, setContacts }) {
  const [contact, setContact] = useState(false);
  const location = useLocation();
  const contactUrlId = useParams();
  const navigate = useNavigate();

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state

  function deleteContact() {
    fetch(`http://localhost:4000/contacts/${contactUrlId.id}`, {
      method: "DELETE",
    });
    const contactsWithoutDeleted = contacts.filter(
      (targetContact) => targetContact.id !== contact.id
    );

    console.log(contactsWithoutDeleted);
    setContacts(contactsWithoutDeleted);
    navigate("/");
  }

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${contactUrlId.id}`)
      .then((res) => res.json())
      .then((singleContactData) => setContact(singleContactData));
  }, [contactUrlId]);
  if (!contact) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h2>
        {contact.type === "work" && "👩‍💻"}
        {contact.type === "personal" && "👪"}
        {contact.firstName} {contact.lastName}
      </h2>

      <p>
        <b>Street:</b>
        {contact.street}
      </p>
      <p>
        <b>City:</b>
        {contact.city}
      </p>
      <p>
        <b>Email:</b>
        {contact.email ? contact.email : "No email provided"}
      </p>
      <p>
        <b>Linkedin:</b>
        {contact.linkedin ? contact.linkedin : "N/A"}
      </p>
      <p>
        <b>Twitter:</b>
        {contact.twitter ? contact.twitter : "N/A"}
      </p>
      <p>
        <b>Type:</b>
        {contact.type}
      </p>
      <button onClick={deleteContact}>❌ Delete</button>
      <p>
        <Link to={`/contacts/${contactUrlId.id}/edit`}>Edit</Link>
      </p>
      <p>
        <Link to={`/contacts/${contactUrlId}/meetings`}>Meetings</Link>
      </p>
    </div>
  );
}

export default ContactsView;
