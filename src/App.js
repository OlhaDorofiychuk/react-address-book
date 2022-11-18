import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
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
            <Link to="/add">Add New Contact</Link>
          </li>
        </ul>
      </nav>
      <main>
        {/*  path={`/view/:${contactUrlId}`}*/}
        <Routes>
          <Route path="/" element={<ContactsList contacts={contacts} />} />
          <Route path="/add" element={<ContactsAdd />} />
          <Route element={<ContactsView />} />
        </Routes>
      </main>
    </>
  );
}
