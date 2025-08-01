import {createBrowserRouter,} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import SendParcel from "../pages/SendParcel/SendParcel";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcels from "../pages/Dashboard/TrackParcels/TrackParcels";
import BeARider from "../pages/Dashboard/BeARider/BeARider";
import MakeAdmin from "../pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "./AdminRoute";
import AssignRider from "../pages/Dashboard/AssignRider/AssignRider";
import PendingRidersa from "../pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRider from "../pages/Dashboard/ActiveRiders/ActiveRiders";
import RiderRoute from "./RiderRoute";
import PendingDeliveries from "../pages/Dashboard/PendingDeliveries/PendingDeliveries";


export const router = createBrowserRouter([

  {
    path: "/",
    Component: RootLayout,
    children:[
      {
          index: true,
          Component: Home
      },
      {
path: 'coverage',
  Component: Coverage,
      },
      {
path: 'forbidden',
  Component: Forbidden,
      },
      {
path: 'beARider',
  element:<PrivateRoute>
    
    <BeARider></BeARider>
  
  </PrivateRoute>
      },
      {
path: 'sendParcel',
  element:<PrivateRoute>
    
    <SendParcel></SendParcel>
  
  </PrivateRoute>
      },
    ]
  },
  {
    path:'/',
    Component: AuthLayout,
    children:[

{
  path: 'login',
  Component: Login,
},
{
  path: 'register',
  Component: Register,
},

    ]
  },

  {
    path: '/dashboard',
     element:<PrivateRoute>
    
   <DashboardLayout></DashboardLayout>
  
  </PrivateRoute>,
  children:[
{
  path: 'myParcels',
  Component: MyParcels

},
{
  path: 'payment/:id',
    Component: Payment

},
{
   path: 'paymentHistory',
    Component: PaymentHistory

},

{
  path: 'track',
    Component: TrackParcels

},
{
  path: 'assignrider',
   element: <AdminRoute>
<AssignRider></AssignRider>   
</AdminRoute>

},
{
  // path: 'pendingRiders',
  //   Component: PendingRiders
    path: 'pendingRiders',
    element: <AdminRoute>

      <PendingRidersa></PendingRidersa>
</AdminRoute>

},
{
  // path: 'activeRiders',
  //   Component: ActiveRiders
   path: 'activeRiders',
    element: <AdminRoute>

      <ActiveRider></ActiveRider>
    </AdminRoute>

},
{
  path: 'makeAdmin',
    element: <AdminRoute>
      <MakeAdmin></MakeAdmin>
    </AdminRoute>

},
{
  path: 'Pendingdeliveries',
    element: <RiderRoute>
      <PendingDeliveries></PendingDeliveries>
    </RiderRoute>

},
  ]
  }
]);