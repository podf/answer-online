import Login from '../pages/Login';
import Register from '../pages/Register'
import NotFoundPage from '../pages/NotFoundPage'
import Home from '../pages/Home';
import Admin from '../pages/Admin';
import Edit from '../pages/Edit';

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