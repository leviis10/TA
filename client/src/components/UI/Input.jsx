function Input(props) {
  const { type, id, value, onChange, className = "" } = props;

  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      autoComplete="true"
      className={`border-2 rounded text-lg outline-sky-400 px-2.5 py-1.5 w-full ${className}`}
    />
  );
}

export default Input;
