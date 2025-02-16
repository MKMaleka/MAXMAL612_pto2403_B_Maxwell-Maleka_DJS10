import { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      }
    };
    
    fetchPosts();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"}}>
      {error ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}> 
          <img src="images/error-message.png" style={{ width: "500px", display: "block"}} />
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: "20px" }}>
              <h2>{post.id}. {post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;