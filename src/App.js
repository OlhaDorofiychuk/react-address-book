import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import ContactEdit from "./components/ContactEdit";
import "./styles/styles.css";
import Meeting from "./components/Meeting";
import MeetingsList from "./components/MeetingsList";

export default function App({ meetingsList, setMeetingsList }) {
  const [contacts, setContacts] = useState([]);

  //Request to get all contacts from the database
  useEffect(() => {
    fetch("http://localhost:4000/contacts")
      .then((res) => res.json())
      .then((contactData) => setContacts(contactData));
  }, []);

  //TODO: Load all contacts on useEffect when component first renders
  //contacts/?type"
  let workContacts = [];
  let personalContacts = [];
  console.log("contacts before 23", contacts);
  contacts.map((contact) => {
    if (contact.type === "work") {
      workContacts.push(contact);
    }
    if (contact.type === "personal") {
      personalContacts.push(contact);
    }
  });
  console.log("all contacts", contacts);
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
          <li>
            <Link to="/meetings">Meetings</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<ContactsList contacts={contacts} />} />
          <Route path="/meetings" element={<MeetingsList />} />
          <Route
            path="/contacts/:id/meetings"
            element={
              <Meeting
                meetingsList={meetingsList}
                setMeetingsList={setMeetingsList}
              />
            }
          />
          <Route
            path="/contacts/add"
            element={
              <ContactsAdd contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route
            path="/contacts/:id"
            element={
              <ContactsView contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route
            path="/contacts/:id/edit"
            element={
              <ContactEdit contacts={contacts} setContacts={setContacts} />
            }
          />
        </Routes>
      </main>
    </>
  );
}
