import { RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import Wordle from './pages/Wordle';

const routes: Array<RouteObject> = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/wordle',
    element: <Wordle />,
  },
];

export default routes;
