import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import RequestServices from "./Pages/RequestService";
import Requests from "./Pages/Requests";
import './index.css'
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/request-services' element={<RequestServices />} />
        <Route path='/requests' element={<Requests />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
