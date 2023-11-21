import { Link } from "react-router-dom";

function Button(props) {
  const { children, variant, onClick, type, href, className = "" } = props;

  function buttonStyle() {
    let style = "";
    if (variant === "red") {
      style += "text-white bg-red-600 hover:bg-red-700";
    }
    if (variant === "sky") {
      style += "text-black bg-sky-400 hover:bg-sky-500";
    }
    if (variant === "emerald") {
      style += "text-black bg-emerald-500 hover:bg-emerald-600";
    }

    return `${style} px-4 py-1.5 rounded-md transition-all ${className}`;
  }

  // If the type is "link"
  if (type === "link") {
    return (
      <Link to={href} className={buttonStyle()}>
        {children}
      </Link>
    );
  }

  // If the type is "button" or not provided
  return (
    <button onClick={onClick} className={buttonStyle()}>
      {children}
    </button>
  );
}

export default Button;
