import { useSelector } from "react-redux";
import Alert from "./Alert";
import Navbar from "./Navbar";

function Layout(props) {
  const { alert } = useSelector((state) => state.ui);

  return (
    <>
      <Navbar />
      <main className="container mx-auto">
        {alert && <Alert />}
        {props.children}
      </main>
    </>
  );
}

export default Layout;
