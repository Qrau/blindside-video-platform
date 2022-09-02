import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Account() {
  const { data: session, loading } = useSession();
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <main>
        <>
          {!session && (
            <>
              Not signed in <br />
              <button onClick={signIn}>Sign in</button>
            </>
          )}
          {session && (
            <>
              Signed in as {session.user.name} <br />
              <button onClick={signOut}>Sign out</button>
            </>
          )}
          <div>
            <Link href="/">
              <a>Go to private page</a>
            </Link>
          </div>
        </>
      </main>
    </div>
  );
}
