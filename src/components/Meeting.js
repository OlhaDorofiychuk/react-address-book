import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Meeting() {
  //Initial form state
  const initialFormState = {
    title: "",
    location: "",
    date: "",
    time: "",
    summary: "",
    userId: id,
  };

  const [newMeeting, setNewMeeting] = useState(initialFormState);
  const [meetingsList, setMeetingsList] = useState([]);
  const [contact, setContact] = useState(null);
  const urlPar = useParams();

  console.log("just created", newMeeting);
  console.log("meetings", meetingsList);

  useEffect(() => {
    fetch(`http://localhost:4000/meetings/?userId=${urlPar.id}`)
      .then((res) => res.json())
      .then((data) => {
        setMeetingsList(data);
        console.log("use effect line 24", data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${urlPar.id}`)
      .then((res) => res.json())
      .then((fetchedContact) => {
        setContact(fetchedContact);
        console.log("use effect line 24", fetchedContact);
      });
  }, [urlPar]);

  //HANDLE IMPUT IN THE FORM
  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    if (name === "title") {
      setNewMeeting({ ...newMeeting, title: value });
    }
    if (name === "location") {
      setNewMeeting({ ...newMeeting, location: value });
    }
    if (name === "date") {
      setNewMeeting({ ...newMeeting, date: value });
    }
    if (name === "time") {
      setNewMeeting({ ...newMeeting, time: value });
    }
    if (name === "summary") {
      setNewMeeting({ ...newMeeting, summary: value });
    }
  };
  //Update our meetings list
  const postMeeting = () => {
    return fetch("http://localhost:4000/meetings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newMeeting.title,
        location: newMeeting.location,
        date: newMeeting.date,
        time: newMeeting.time,
        summary: newMeeting.summary,
        userId: contact.id,
      }),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postMeeting()
      .then((res) => res.json())
      .then((data) => {
        setMeetingsList([...meetingsList, data]);
        setNewMeeting(initialFormState);
      });
  };

  if (!meetingsList) return <>Loading..</>;

  return (
    <form onSubmit={handleSubmit} className="form-stack meeting-form">
      <h2>Create Meeting</h2>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        value={newMeeting.title}
        onChange={handleChange}
        required
      />
      <label htmlFor="location">Location</label>
      <input
        id="location"
        name="location"
        type="text"
        value={newMeeting.location}
        onChange={handleChange}
        required
      />

      <label htmlFor="date">Date</label>
      <input
        id="date"
        name="date"
        type="date"
        value={newMeeting.date}
        onChange={handleChange}
        required
      />

      <label htmlFor="time">Time</label>
      <input
        id="time"
        name="time"
        type="time"
        value={newMeeting.time}
        onChange={handleChange}
        required
      />
      <label htmlFor="summary">Summary</label>
      <input
        id="summary"
        name="summary"
        type="textarea"
        value={newMeeting.summary}
        onChange={handleChange}
        required
      />
      <button className="button blue" type="submit">
        ✔️Create
      </button>
    </form>
  );
}
export default Meeting;
