import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../../store/reducers/auth";
import Button from "./Button";
import { setIsLoading } from "../../store/reducers/ui";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function logoutHandler() {
    try {
      // Set isLoading global state to true
      dispatch(setIsLoading(true));

      // Request DELETE request to the backend
      await axios.delete("/api/auth");

      // Log user out
      dispatch(logout());

      // Redirect to root page
      navigate("/");
    } catch (err) {
      // Do something when error
      if (err.response) {
        console.error(err.response.data.message);
      }
      console.error(err);
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  function isLinkActive({ isActive }) {
    let linkStyle = "hover:text-zinc-50 transition-all";
    if (isActive) {
      linkStyle += " text-zinc-50";
    }
    return linkStyle;
  }

  return (
    <nav className="bg-sky-400 py-3 mb-5">
      <div className="container flex items-center justify-between mx-auto">
        <NavLink to={"/"} className="text-xl">
          SITOBASM
        </NavLink>
        {token && (
          <ul className="flex gap-3 items-center">
            <li>
              <NavLink to={"/transactions"} className={isLinkActive}>
                Transaction
              </NavLink>
            </li>
            <li>
              <NavLink to={"/employees"} className={isLinkActive}>
                Employee
              </NavLink>
            </li>
            <li>
              <NavLink to={"/suppliers"} className={isLinkActive}>
                Supplier
              </NavLink>
            </li>
            <li>
              <NavLink to={"/stocks"} className={isLinkActive}>
                Stock
              </NavLink>
            </li>
            <li>
              <Button onClick={logoutHandler} variant="red">
                Logout
              </Button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
