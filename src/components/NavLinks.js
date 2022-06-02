import links from '../utils/link'
import { NavLink } from 'react-router-dom'
import { FaWpforms } from 'react-icons/fa'
import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';

const NavLinks = ({ toggleSidebar }) => {
  const {loginUser,isAdmin} = useAppContext();
  
  useEffect(() =>{
    loginUser()
  },[])
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, id, icon } = link

        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        )
      })}
  {isAdmin && <NavLink to={'add-users'}
            key={5}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            <span className='icon'><FaWpforms/></span>Add User</NavLink> }
     
    </div>
  )
}

export default NavLinks