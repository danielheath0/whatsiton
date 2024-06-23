import { useState, useEffect } from "react";
import DisplayResults from "./features/shows/DisplayResults";
import SearchForm from "./features/shows/SearchForm";

import { Route, Routes } from "react-router-dom";
import Show from "./features/shows/Show";
import ViewWatchlist from './features/watchlist/ViewWatchlist';
import Navbar from "./features/display/Navbar";

function App() {
  const [countryCode, setCountryCode] = useState("us");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCountryChange = (region: string) => {
    setCountryCode(region);
  };

  const handleLogin = (token: string) => {
    // console.log(token)
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      handleLogin(token);
    }
  }, []);

  return (
    <main className="App">
      <Navbar isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout}/>
      

      <Routes key={isLoggedIn ? "loggedIn" : "loggedOut"}>
        <Route
          path="/"
          element={
            <>
              {isLoggedIn && (
                <SearchForm onCountryChange={handleCountryChange} />
              )}
              {isLoggedIn && <DisplayResults countryCode={countryCode} />}
            </>
          }
        />
        <Route path="/shows/:id" element={<Show />} />
        <Route path="/watchlist" element={<ViewWatchlist />} />
      </Routes>
    </main>
  );
}

export default App;