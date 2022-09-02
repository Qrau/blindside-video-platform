import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "./../src/components/navbar/index";
import logo from "./../src/assets/logo.svg";

const navElements = [
  { label: "Player", path: "/" },
  { label: "Videos", path: "/videos" },
  { label: "Account", path: "/account" },
];

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Navbar logo={logo} navElements={navElements} />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
