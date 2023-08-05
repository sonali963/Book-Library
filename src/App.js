import "bootstrap/dist/css/bootstrap.min.css";
import {Routes,Route} from "react-router-dom";
//pages imported
import { RegisterPage } from "./pages/Register";
import { SigninPage } from "./pages/signin";
import { ListingPage } from "./pages/list";
//import components
import { MyNavBar } from "./components/navbar";
import './App.css';

function App() {
  return (
    <div>
      <MyNavBar/>
    <Routes>
      <Route path="/" element={<h1>Home page</h1>}/>
      <Route path="/login" element={<SigninPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/book/list" element={<ListingPage/>}/>
      

    </Routes>
    </div>
  );
}

export default App;
