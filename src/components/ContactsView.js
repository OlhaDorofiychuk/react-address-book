import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

function ContactsView() {
  const [contact, setContact] = useState(false);
  const location = useLocation();
  const contactUrlId = useParams();

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state

  function deleteContact() {
    fetch(`http://localhost:4000/contacts/${contactUrlId.id}`, {
      method: "DELETE",
    }).then(() => this.setContacts({ status: "Delete succssful" }));
  }

  function edit() {}
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
        {contact.firstName} {contact.lastName}
      </h2>
      <p>
        {contact.street} {contact.city}
      </p>
      <p>
        <b>Email:</b>
        {contact.email ? contact.email : "No email provided"}
      </p>
      <p>{contact.linkedin ? contact.linkedin : "N/A"}</p>
      <p>{contact.twitter ? contact.twitter : "N/A"}</p>
      <button onClick={deleteContact}>Delete</button>
      <button onClick={edit}>Edit</button>
    </div>
  );
}

export default ContactsView;
