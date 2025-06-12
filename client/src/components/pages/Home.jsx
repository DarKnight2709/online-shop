import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/session/sessionSlice";
import { logOutUser } from "../../features/session/sessionSlice";



function Home() {
  // const response = fetch("http://localhost:5000/api/auth/home");

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Logout successful");
        // Dispatch an action to update the Redux store
        dispatch(logOutUser());
        navigate('/login'); // Redirect to login page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error(error.message);
    }

  }


  const register = () => {

  }

  return <div>
    {user ? 
      (<button onClick={logOut}>Logout</button>)
      :
      <>
        <Link to="/register">Register</Link>
        <br />
        <Link to="/login">Login</Link>
      </>
      
    }
    
    <h1>This is home page</h1>
  </div>
}


export default Home;