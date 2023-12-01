import Navbar from "./Navbar";

function Layout(props) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto">{props.children}</main>
    </>
  );
}

export default Layout;
