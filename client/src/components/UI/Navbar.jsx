import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../../store/reducers/auth";
import Button from "./Button";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function logoutHandler() {
    await axios.delete("/api/auth");
    navigate("/");
    dispatch(logout());
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
      <div className="container flex items-center justify-between">
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
