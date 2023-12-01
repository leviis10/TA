import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/UI/Layout";
import LoginModal from "../components/auth/LoginModal";
import { login } from "../store/reducers/auth";
import Spinner from "../components/UI/Spinner";

function Root() {
  const { token } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/api/auth");
        dispatch(login(data));
      } catch (err) {
        if (location.pathname !== "/") {
          navigate("/");
        }
      }
    })();
  }, [dispatch, navigate, location]);

  return (
    <Layout>
      {isLoading && <Spinner />}
      {!token && <LoginModal />}
      {token && <Outlet />}
    </Layout>
  );
}

export default Root;
