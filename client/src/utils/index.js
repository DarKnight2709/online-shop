//Fetch if User logged in or not
export const fetchSession = async () => {
    console.log("hello")
    try{
        const res = await fetch('http://localhost:5000/api/auth/session', {
            credentials: 'include'
        });
        if (res.ok) {
            const jsonResponse = await res.json();
            return jsonResponse.user;
        } else {
            return null;
        }
    } catch (err) {
        alert('error');
  }
}
