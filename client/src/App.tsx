import { useState, useEffect } from "react";
import DisplayResults from "./features/shows/DisplayResults";
import SearchForm from "./features/shows/SearchForm";
import UserForm from "./features/users/UserForm";
import LogoutButton from "./features/users/LogoutButton";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Show from "./features/shows/Show";
import { userCountry } from "./features/users/usersSlice";

function App() {

  const [countryCode,setCountryCode]=useState("us")
  const region = useSelector(userCountry)

  
  // const [isUserFormVisible, setIsUserFormVisible] = useState(true)
  const [isLoggedIn,setIsLoggedIn]=useState(false)
//TODO Handle the visibility of the login and register form

  const handleCountryChange = (region: string) => {
  setCountryCode(region)}

const handleLogin = () => {
  
  setIsLoggedIn(true)
}

const handleLogout = ()=> {
  setIsLoggedIn(false)
document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}


  


useEffect(()=>{
  const token = document.cookie.split('; ').find(row=>row.startsWith('token'))
  if (token) {
    handleLogin()
  }
},[])

  // return (
  //   <main className="App">
     
  //     {!isLoggedIn && <UserForm onLogin={handleLogin} />}
  //     {isLoggedIn && <LogoutButton onLogout={handleLogout}/>}
  //     {isLoggedIn && <SearchForm onCountryChange={handleCountryChange}/>}
  //     {isLoggedIn && <DisplayResults countryCode={countryCode}/>}

  //     <Routes>
  //       <Route path="/shows/:id" element={<Show />}/>
  //     </Routes>
  //   </main>
  // )
  return (
    <main className="App">
      {!isLoggedIn && <UserForm onLogin={handleLogin} />}
      {isLoggedIn && <LogoutButton onLogout={handleLogout}/>}
  
      <Routes key={isLoggedIn ? "loggedIn" : "loggedOut"}>
        <Route path="/" element={
          <>
            {isLoggedIn && <SearchForm onCountryChange={handleCountryChange}/>}
            {isLoggedIn && <DisplayResults countryCode={countryCode}/>}
          </>
        }/>
        <Route path="/shows/:id" element={<Show />}/>
      </Routes>
    </main>
  );
}

export default App

