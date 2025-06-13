import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import AddCandidate from "../pages/candidate/add";
import Home from "../pages/dashboard/index"
import AddElection from "../pages/election/add";
import Details from "../pages/election/detail";
import Result from "../pages/election/result";
import Vote from "../pages/election/vote";
import CheckLogin from './privateRoute';
const routes = [
  {
    path: '/',
    element: <CheckLogin><Home /></CheckLogin>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/add/election',
    element: <CheckLogin><AddElection /></CheckLogin>,
  },
  {
    path: "/elections/:id/vote",
    element: <CheckLogin><Vote /></CheckLogin>,
  },
  {
    path: "/elections/:id",
    element: <CheckLogin><Details /></CheckLogin>,
  },
  {
    path: "/elections/:id/result",
    element: <CheckLogin><Result /></CheckLogin>,
  },
  {
    path: "/elections/:id/add/candidate",
    element: <CheckLogin><AddCandidate /></CheckLogin>,
  },
];

export default routes;