import Navbar from "./Navbar";

function Layout(props) {
  return (
    <>
      <Navbar />
      <main className="container">{props.children}</main>
    </>
  );
}

export default Layout;
