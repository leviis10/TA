import Navbar from "./Navbar";

function Layout(props) {
  return (
    <>
      <Navbar />
      <main className="h-full">{props.children}</main>
    </>
  );
}

export default Layout;
