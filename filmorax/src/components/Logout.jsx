import React from 'react'

const Logout = () => {
    const navigate = useNavigate();

  useEffect(() => {
    // remove login data
    localStorage.removeItem("isLoggedIn");

    // redirect to landing / signin
    navigate("/");
  }, [navigate]);
  return (
    <div>

    </div>
  )
}

export default Logout