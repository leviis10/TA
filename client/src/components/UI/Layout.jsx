import Navbar from "./Navbar";

function Layout(props) {
  return (
    <>
      <Navbar />
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
