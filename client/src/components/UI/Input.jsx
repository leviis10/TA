function Input(props) {
  const {
    type,
    id,
    value,
    onChange,
    disabled = false,
    className = "",
    placeholder = "",
  } = props;

  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      autoComplete="true"
      className={`disabled:opacity-75 border-2 rounded text-lg outline-sky-400 px-2.5 py-1.5 w-full ${className}`}
      disabled={disabled}
      placeholder={placeholder}
      {...props}
    />
  );
}

export default Input;
