import React from 'react';
import { Outlet, NavLink } from 'react-router';
import {
  FaHome,
  FaBox,
  FaUser,
  FaMoneyCheckAlt,
  FaBoxOpen,
  FaUsers,
  FaUserClock,
  FaTruckMoving,
} from 'react-icons/fa';
import ProFastLogo from '../pages/shared/Profastlogo/ProFastLogo';
import useUserRole from '../hook/UsersRole';
import useAuth from '../hook/useAuth';

const DashboardLayout = () => {
  const { user, loading: authLoading } = useAuth();
  const { role, roleLoading } = useUserRole();
console.log(user)
 console.log("🧑‍💻 Logged-in user:", user?.email);
  console.log("🎯 User Role from DB:", role);
  if (authLoading || roleLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-[#03373D] text-white px-4 lg:hidden">
          <div className="flex-1">
            <label htmlFor="my-drawer-2" className="btn btn-ghost btn-circle text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <span className="ml-3 text-lg font-semibold">📦 Dashboard</span>
          </div>
        </div>

        {/* Page content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu bg-[#f4f4f4] min-h-full w-72 p-6 text-base space-y-2 font-medium">
          <ProFastLogo />

          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'bg-[#CBEC68] text-black font-semibold' : ''
              }
            >
              <FaHome /> Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/myParcels"
              className={({ isActive }) =>
                isActive ? 'bg-[#CBEC68] text-black font-semibold' : ''
              }
            >
              <FaBox /> My Parcels
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/paymentHistory"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded ${
                  isActive ? 'bg-[#CBEC68] text-black font-semibold' : 'text-gray-700'
                }`
              }
            >
              <FaMoneyCheckAlt className="text-lg" />
              <span>Payment History</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/track"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded ${
                  isActive ? 'bg-[#CBEC68] text-black font-semibold' : 'text-gray-700'
                }`
              }
            >
              <FaBoxOpen className="text-lg" />
              <span>Track Package</span>
            </NavLink>
          </li>

          {/* Admin Links */}
          {!roleLoading && role === 'admin' && (
            <>
              <li>
                <NavLink
                  to="/dashboard/activeRiders"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded ${
                      isActive ? 'bg-[#CBEC68] text-black font-semibold' : 'text-gray-700'
                    }`
                  }
                >
                  <FaUsers className="text-lg" />
                  <span>Active Riders</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/assignrider"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded ${
                      isActive ? 'bg-[#CBEC68] text-black font-semibold' : 'text-gray-700'
                    }`
                  }
                >
                  <FaUsers className="text-lg" />
                  <span>AssignRider</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/pendingRiders"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded ${
                      isActive ? 'bg-[#CBEC68] text-black font-semibold' : 'text-gray-700'
                    }`
                  }
                >
                  <FaUserClock className="text-lg" />
                  <span>Pending Riders</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/makeAdmin"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded ${
                      isActive ? 'bg-[#CBEC68] text-black font-semibold' : 'text-gray-700'
                    }`
                  }
                >
                  <FaUser className="text-lg" />
                  <span>Make Admin</span>
                </NavLink>
              </li>
            </>
          )}

          {/* Rider Links */}
          {!roleLoading && role === 'rider' && (
            <>
              <li>
                <NavLink
                  to="/dashboard/Pendingdeliveries"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded ${
                      isActive ? 'bg-[#CBEC68] text-black font-semibold' : 'text-gray-700'
                    }`
                  }
                >
                  <FaTruckMoving className="text-lg" />
                  <span>My Deliveries</span>
                </NavLink>
              </li>
            </>
          )}

          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded ${
                  isActive ? 'bg-[#CBEC68] text-black font-semibold' : 'text-gray-700'
                }`
              }
            >
              <FaUser className="text-lg" />
              <span>Profile</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
