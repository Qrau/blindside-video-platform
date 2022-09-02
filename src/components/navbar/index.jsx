import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { colors } from "..";

export const Navbar = ({ logo, navElements }) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  const foundPath = useMemo(
    () => navElements.map((e) => e.path).indexOf(location.pathname),
    [location.pathname, navElements]
  );

  useEffect(() => {
    setCurrentPath(foundPath);
  }, [foundPath]);

  return (
    <nav style={styles.nav}>
      <Link to="/">
        <img style={styles.img} src={logo} alt="company-logo" />
      </Link>
      <div>
        {navElements.map((e, i) => (
          <Link
            style={currentPath === i ? styles.active : styles.Link}
            key={i}
            to={e.path}
          >
            {e.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: colors.black,
    display: "flex",
    justifyContent: "space-between",
    padding: "1em"
  },
  img: {
    width: "5em",
    margin: "auto 0",
    position: "relative"
  },
  Link: {
    color: colors.white,
    textDecoration: "none",
    padding: "0 1em"
  },
  active: {
    color: colors.black,
    background: colors.yellow,
    textDecoration: "none",
    padding: " .5em"
  }
};
