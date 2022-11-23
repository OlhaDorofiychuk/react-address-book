import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MeetingsList(props) {
  const { meetings, setMeetings } = props;
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    fetch("http://localhost:4000/meetings")
      .then((res) => res.json())
      .then((meetingData) => setMeetingsList(meetingData));
  }, []);

  {
    /* setMeetingsList not a function, need to debug this */
  }

  console.log("list", meetingsList);
  return (
    <div>
      <h2>Meetings</h2>
      <ul className="contacts-list meetings">
        {/*meetingsList.map not a function, need to debug this */}

        {/* {meetingsList.map((meeting, index) => {
          const { title, date, location } = meeting;
          return (
            <li className="meeting" key={index}>
              <p>
                {title} {date} {location}
              </p>
              <p>
                <Link to={`contacts/id/meetings/${meeting.id}`}>
                  View meeting
                </Link>
              </p>
            </li>
          );
        })} */}
      </ul>
    </div>
  );
}
export default MeetingsList;
