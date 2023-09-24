import { useState, useEffect } from "react";
import "../styles/Profile.css";

function Profile() {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");

  useEffect(() => {
    const storedUserFirstName = localStorage.getItem("userFirstName");
    const storedUserLastName = localStorage.getItem("userLastName");

    if (storedUserFirstName && storedUserLastName) {
      setUserFirstName(storedUserFirstName);
      setUserLastName(storedUserLastName);
    }
  }, []);

  return (
    <div className="profile">
      <h2 className="first">{userFirstName}</h2>
      <h2 className="last">{userLastName}</h2>
    </div>
  );
}

export default Profile;
