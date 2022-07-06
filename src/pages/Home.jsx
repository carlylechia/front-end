import Navbar from '../components/Navbar'
// import useRefreshToken from '../hooks/useRefreshToken';

function Home() {
  const loggedIn = JSON.parse(localStorage.getItem('Logged-in'));
  const name = JSON.stringify(localStorage.getItem('Username')).split('\\"')[1];
  // const refresh = useRefreshToken();

  return (
    <>
    <Navbar />
    {
      loggedIn
      ? <h1>Welcome, {name}...</h1>
      : <h1>Welcome, user!</h1>
    }
    
    {/* <button onClick={() => refresh()}>Refresh</button> */}
    </>
  )
}

export default Home
