import { useContext } from "react";
import ReusableCard from "../../UI/Cards/ResuableCard";
import { AuthContext } from "../../../store/AuthContext";

const UserProfile = () => {
  const auth = useContext(AuthContext);

  if (!auth || !auth.user) {
    return <h1>User Not Found !</h1>;
  }

  const { user } = auth;
  console.log(user);
  return (
    <>
      <ReusableCard type="profile" data={user} />
    </>
  );
};

export default UserProfile;
