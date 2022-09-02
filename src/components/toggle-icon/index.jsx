export const ToggleIcon = ({ toggle, state, onTrue, onFalse }) => {
  return (
    <button onClick={toggle}>
      {state ? (
        <i className="bx bx-pause">{onTrue}</i>
      ) : (
        <i className="bx bx-play">{onFalse}</i>
      )}
    </button>
  );
};
