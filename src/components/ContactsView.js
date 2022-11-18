import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ContactsView() {
  const [contact, setContact] = useState(false);
  const contactUrlId = useParams();

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state

  useEffect(() => {
    fetch(`/view/:${contactUrlId}`)
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
    </div>
  );
}

export default ContactsView;
