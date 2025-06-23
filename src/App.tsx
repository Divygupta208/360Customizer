import "./App.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import type { ProfileCardData } from "./types/Card";
import ReusableCard from "./components/UI/Cards/ResuableCard";

function App() {
  const user: ProfileCardData = {
    name: "Sophie Benette",
    role: "software developer",
    organisation: "google",
    profilePicture:
      "https://images.pexels.com/photos/160414/female-portrait-studio-attractive-160414.jpeg",
    bio: "developer who focuses on readability and maintains a good code",
    socialLinks: [
      {
        social: "linkedIn",
        logo: <FaLinkedin />,
        link: "https://linkedin.com",
      },
      {
        social: "Github",
        logo: <FaGithub />,
        link: "https://github.com",
      },
    ],
  };

  return (
    <>
      {/* <ProductListing /> */}
      <ReusableCard data={user} type={"profile"} />
    </>
  );
}

export default App;
