import { useSession } from "next-auth/react";
import Link from "next/link";
import { allVideosData } from "./../src/assets/index";

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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "2em",
                  maxWidth: "600px",
                  margin: "auto",
                  flexWrap: "wrap",
                }}
              >
                {allVideosData.map((e, i) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "1em",
                    }}
                  >
                    <img
                      style={{
                        objectFit: "cover",
                        maxWidth: "10em",
                        height: "10em",
                        borderRadius: "7px",
                      }}
                      src={e.poster}
                    />
                    <h4
                      style={{
                        margin: 0,
                      }}
                    >
                      {e.title}
                    </h4>
                  </div>
                ))}
              </div>
              <div>Signed in as {session.user.name}</div>
            </>
          )}
        </>
        <Link href="/">
          <a>Go to home page</a>
        </Link>
      </main>
    </div>
  );
}
