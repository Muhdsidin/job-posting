import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { ProtectLogin } from "./ProtectRoutes/ProtectAuth";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import { Protectbasic } from "./ProtectRoutes/Protectbasic";
import AddJobs from "./pages/AddJobs";
import UploadPost from "./pages/UploadPost";
import ViewProfile from "./pages/ViewProfile";
import Profiles from "./pages/Profiles";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<ProtectLogin />}>
          <Route path="/create-profile" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<Protectbasic />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-jobs" element={<AddJobs />} />
          <Route path="/add-post" element={<UploadPost />} />
          <Route path="/:user/profile" element={<ViewProfile />} />
          <Route path="/profiles" element={<Profiles />} />
        </Route>
      </Routes>
    </>
  );
}
