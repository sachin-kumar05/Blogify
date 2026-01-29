import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth.service"
import { login, logout } from "./store/authSlice"
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();  

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))

  }, [])
  
  if(!loading) {
    return (
    <div className='min-h-screen flex flex-wrap content-center bg-gray-400'>
      <div className="w-full block">
        <Header />
        <main>
          TODO: {/* outlet */}
        </main>
        <Footer />
      </div>
    </div>
    )
  } else {
    null
  }
}

export default App
