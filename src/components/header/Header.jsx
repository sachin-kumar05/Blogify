import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Header() {

  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  // Here we have create list of nav items so that we don't have to create button multiple times manually for each nav item
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },

    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },

    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },

    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.active ? (
                // use key in html tag while looping on list in react
                <li key={item.name}>  
                  <button
                    className='inline-block px-6 py-2 duration-200 hover: bg-blue-100 rounded-full'
                    onClick={() => navigate(item.slug)}
                  >{item.name}</button>
                </li>
              ) : null
            )}

            {/* Here if authStatus is true then only the logout button will be randered on UI */}
            {authStatus && (
              <li>
                <LogoutBtn /> 
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header