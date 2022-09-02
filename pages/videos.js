import { useSession } from "next-auth/react";
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
          {session && (
            <>
              Signed in as {session.user.name} <br />
            </>
          )}
          <div>
            <Link href="/">
              <a>Go to home page</a>
            </Link>
          </div>
        </>
      </main>
    </div>
  );
}
