

function Home() {
  const response = fetch("http://localhost:5000/api/auth/home");
  return <h1>This is home page</h1>
}


export default Home;