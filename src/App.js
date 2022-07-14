import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { useSelector } from "react-redux";
import { useEffect} from 'react';
import { useDispatch } from 'react-redux';



let isInitial = true;
function App() {
  const user = useSelector((state) => state.login.user);
  
 const dispatch = useDispatch()
 


  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
 

  }, [user, dispatch]);

  return (
    <div>
      {user == false ? <Login/>:<Dashboard/>}
    
    </div>
  );
}

export default App;
