import { Link } from "react-router-dom";

function Anchor(props) {
  const { href } = props;
  return (
    <Link to={href} className="underline text-sky-700">
      {props.children}
    </Link>
  );
}

export default Anchor;
