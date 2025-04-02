import React, { useState } from "react";
import Login from "./components/Login";
import UserList from "./components/UserList";

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <div className="p-5 bg-gradient-to-r from-black to-purple-900 min-h-screen">
      {!token ? <Login setToken={setToken} /> : <UserList token={token} />}
    </div>
  );
};

export default App;