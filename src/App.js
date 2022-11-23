import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import ContactEdit from "./components/ContactEdit";
import "./styles/styles.css";
import Meeting from "./components/Meeting";
import MeetingsList from "./components/MeetingsList";
import { Rings } from "react-loader-spinner";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Request to get all contacts from the database
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:4000/contacts")
      .then((res) => res.json())
      .then((contactData) => {
        setTimeout(() => {
          setContacts(contactData);
          setIsLoading(false);
        }, 2000);
      });
  }, []);

  //TODO: Load all contacts on useEffect when component first renders
  //contacts/?type"

  return (
    <>
      {isLoading ? (
        <div className="container">
          <Rings color="#00BFFF" height={300} width={300} />
        </div>
      ) : (
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
              <Route
                path="/meetings"
                element={
                  <MeetingsList
                    meetingsList={meetings}
                    setMeetingsList={setMeetings}
                  />
                }
              />
              <Route path="/contacts/:id/meetings" element={<Meeting />} />
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
      )}
    </>
  );
}
