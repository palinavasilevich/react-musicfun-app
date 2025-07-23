import { useEffect } from "react";

function App() {
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(
          "https://musicfun.it-incubator.app/api/1.0/playlists",
          {
            headers: {
              "api-key": "c5979a0f-1886-4e63-9bc2-3546b075c045",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch playlists.");
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <>
      <h1>HELLO</h1>
    </>
  );
}

export default App;
