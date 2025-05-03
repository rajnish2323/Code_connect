import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from './Login';
import Profile from "./Profile";
import { Provider } from 'react-redux';
import AppStore from "./utils/AppStore";
import Feed from "./Feed";
import Connection from "./Connection";
import ConnectionRequests from "./Request"; // ✅ This matches the file name
 // ✅ Correct import

function App() {
  return (
    <Provider store={AppStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Login />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connection" element={<Connection />} />
            <Route path="/request" element={<ConnectionRequests />} /> {/* ✅ Correct usage */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
