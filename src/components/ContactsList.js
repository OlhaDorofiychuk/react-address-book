import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const { contacts, setContacts, contactUrlId } = props;
  console.log(contacts);
  return (
    <>
      <header>
        <h2>Contacts</h2>
        <b>
          <label>
            <input name="type" type="checkbox" value="personal" /> Personal
          </label>
        </b>
        <b>
          <label>
            <input name="type" type="checkbox" value="personal" /> Work
          </label>
        </b>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName } = contact;
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <p>
                <Link to={`/contacts/${contact.id}`}>View</Link>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
