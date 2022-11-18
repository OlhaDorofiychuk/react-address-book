import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import ContactsByType from "./components/ContactsByType";
import "./styles/styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/contacts")
      .then((res) => res.json())
      .then((contactData) => setContacts(contactData));
  }, []);
  console.log("contacts:", contacts);
  //TODO: Load all contacts on useEffect when component first renders
  //contacts/?type"

  let workContacts = [];
  let personalContacts = [];

  contacts.map((contact) => {
    if (contact.type === "work") return workContacts.push(contact);
    if (contact.type === "personal") return personalContacts.push(contact);
  });
  console.log("work", workContacts);
  console.log("personal", personalContacts);
  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          <li>
            <Link to="/">Contacts List</Link>
          </li>
          <li>
            <Link to="/contacts/add">Add New Contact</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<ContactsList contacts={contacts} />} />
          <Route
            path="/contacts/add"
            element={
              <ContactsAdd contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route path="/contacts/:id" element={<ContactsView />} />
          <Route
            path="/"
            element={
              <ContactsByType
                workContacts={workContacts}
                personalContacts={personalContacts}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
}
