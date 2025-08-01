import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import ProFastLogo from '../Profastlogo/ProFastLogo';
import useAuth from '../../../hook/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => {
       
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-[#CBEC68] ${isActive ? 'text-[#CBEC68] font-semibold' : ''}`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/coverage"
          className={({ isActive }) =>
            `hover:text-[#CBEC68] ${isActive ? 'text-[#CBEC68] font-semibold' : ''}`
          }
        >
          Our Coverage
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/sendParcel"
          className={({ isActive }) =>
            `hover:text-[#CBEC68] ${isActive ? 'text-[#CBEC68] font-semibold' : ''}`
          }
        >
          Send Parcel
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `hover:text-[#CBEC68] ${isActive ? 'text-[#CBEC68] font-semibold' : ''}`
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
     
      <li>
        <NavLink
          to="/beARider"
          className={({ isActive }) =>
            `hover:text-[#CBEC68] ${isActive ? 'text-[#CBEC68] font-semibold' : ''}`
          }
        >
          Be A Rider
        </NavLink>
      </li>

       <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `hover:text-[#CBEC68] ${isActive ? 'text-[#CBEC68] font-semibold' : ''}`
          }
        >
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-[#03373D] text-white shadow-md px-4 md:px-10 py-3 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-[#03373D] rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>

      <NavLink to="/" className="btn btn-ghost normal-case text-xl flex items-center gap-2">
  <ProFastLogo />
</NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">{navItems}</ul>
      </div>

      <div className="navbar-end space-x-3">
        {user ? (
          <button onClick={handleLogout} className="btn btn-outline btn-primary bg-gradient-to-r from-[#CBEC68] to-[#F9F871] hover:from-[#f9f871] hover:to-[#CBEC68] transition-all duration-300 shadow-md text-black">
            Logout
          </button>
        ) : (
          <>
            <NavLink
              to="/login"
              className="btn btn-outline btn-[#CBEC68] text-black hover:bg-[#CBEC68] hover:text-black transition-colors duration-300 bg-gradient-to-r from-[#CBEC68] to-[#F9F871] hover:from-[#f9f871] hover:to-[#CBEC68]  shadow-md "
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="btn bg-[#CBEC68] text-black hover:bg-[#aade82]  bg-gradient-to-r from-[#CBEC68] to-[#F9F871] hover:from-[#f9f871] hover:to-[#CBEC68] transition-all duration-300 shadow-md"
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
