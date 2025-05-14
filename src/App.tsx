import { Routes, Route } from "react-router-dom";
import ShowUser from "./pages/showuser";
import ShowAlbum from "./pages/showalbum";
import User from "./pages/user";
import Album from "./pages/album";
import { Dashboard } from "./layout/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        {/* All routes below will render inside Dashboard layout */}
        <Route index element={<User />} />
        <Route path="users" element={<User />} />
        <Route path="albums" element={<Album />} />
        <Route path="users/:userId" element={<ShowUser />} />
        <Route path="albums/:albumId" element={<ShowAlbum />} />
      </Route>
    </Routes>
  );
}

export default App;
