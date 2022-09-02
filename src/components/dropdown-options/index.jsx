export const DropdownOptions = ({ value, onChange, options }) => {
  return (
    <select className="velocity" value={value} onChange={(e) => onChange(e)}>
      {options.map((e, i) => (
        <option value={e} key={i}>
          {e}x
        </option>
      ))}
    </select>
  );
};
