import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (!response.ok) {
          setError(`This is an HTTP error: The status is ${response.status}`);
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }

        return response.json();
      })
      .then((data) => {
        setData(data);
        setError(false);
      })
      .catch((error) => {
        console.error("error fetching data:", error);
      });
  };

  const handleError = (status) => {
    fetch(`https://mock.codes/${status}`)
      .then((response) => {
        if (!response.ok) {
          setError(`This is an HTTP error: The status is ${response.status}`);
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }

        return response.json();
      })
      .then((data) => {
        setData(data);
        setError(false);
      })
      .catch((error) => {
        console.error("error fetching data:", error);
      });
  };

  return (
    <div className="App">
      <main className="App-header">
        <h1>GitHub user info</h1>
        <p>Enter a GitHub username:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="GitHub username"
            required
          />
          <button type="submit">Get info</button>
        </form>
        <div className="forceErros">
          <button onClick={() => handleError(500)}>Force error 500</button>
          <button onClick={() => handleError(403)}>Force error 403</button>
        </div>

        {!error && data && (
          <div className="info">
            <div>
              <img src={data.avatar_url} alt={data.login}></img>
            </div>
            <div>
              <h4>
                {data.name} <span>@{data.login}</span>
              </h4>
              <p>{data.bio}</p>
            </div>
          </div>
        )}

        {error && <div className="error">{error}</div>}
      </main>
    </div>
  );
}

export default App;
