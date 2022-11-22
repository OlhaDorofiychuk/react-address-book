import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const { contacts, setContacts, contactUrlId } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(contacts);

  const selectedType = searchParams.getAll("type");

  let filteredContacts;
  if (selectedType.length > 0) {
    filteredContacts = contacts.filter((contact) =>
      selectedType.includes(contact.type)
    );
  } else {
    filteredContacts = [...contacts];
  }

  // if (type[0] === "work") {
  //   filteredContacts = filteredContacts.filter(
  //     (contact) => contact.type === "work"
  //   );
  // }

  // if (type[0] === "personal") {
  //   filteredContacts = filteredContacts.filter(
  //     (contact) => contact.type === "personal"
  //   );
  // }
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      setSearchParams({ type: [...selectedType, value] });
    } else {
      const updated = selectedType.filter((type) => type !== value);
      setSearchParams({ type: [...updated] });
    }
  }

  return (
    <>
      <header>
        <h2>Contacts</h2>
        <p>
          <u>Show contacts by type:</u>
        </p>

        <b>
          <label>
            <input
              name="type"
              type="checkbox"
              value="personal"
              checked={selectedType.includes("personal")}
              onChange={handleChange}
            />
            👪 Personal
          </label>
        </b>
        <b>
          <label>
            <input
              name="type"
              type="checkbox"
              value="work"
              checked={selectedType.includes("work")}
              onChange={handleChange}
            />
            👩‍💻 Work
          </label>
        </b>
      </header>
      <ul className="contacts-list">
        {filteredContacts.map((contact, index) => {
          const { firstName, lastName, type } = contact;

          return (
            <li className="contact" key={index}>
              <p>
                {type === "work" && "👩‍💻"}
                {type === "personal" && "👪"}
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
