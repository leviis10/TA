function Card(props) {
  const { className = "" } = props;

  return (
    <div className={`border-2 rounded-lg p-6 ${className}`}>
      {props.children}
    </div>
  );
}

export default Card;
