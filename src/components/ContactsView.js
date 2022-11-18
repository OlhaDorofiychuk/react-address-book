import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

function ContactsView() {
  const [contact, setContact] = useState(false);
  const location = useLocation();
  const contactUrlId = useParams();
  console.log(contactUrlId);

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state

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
        <b>{contact.email}</b>
      </p>
      <p>{contact.linkedin}</p>
      <p>{contact.twitter}</p>
    </div>
  );
}

export default ContactsView;
