function Textarea(props) {
  const { id, value, onChange } = props;
  return (
    <textarea
      id={id}
      onChange={onChange}
      className="border-2 rounded text-lg outline-sky-400 px-2.5 py-1.5 w-full"
      value={value}
      autoComplete="true"
    />
  );
}

export default Textarea;
