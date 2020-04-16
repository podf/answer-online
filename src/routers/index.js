import Login from '../pages/User/Login';
import Register from '../pages/User/Register'
import NotFoundPage from '../pages/NotFoundPage'
import Home from '../pages/Home';

export const mainRouters = [
    {
        path: '/home',
        exact: false,
        component: Home
    },
    {
        path: '/login',
        exact: true,
        component: Login
    },
    {
        path: '/register',
        exact: true,
        component: Register
    },
    {
        path: '/404',
        component: NotFoundPage
    }
];

export const adminRoutes = [
    {
        path: '/admin',
        exact: true,
        component: Login,
    }
];