import Login from '../pages/Login';
import Register from '../pages/Register'
import NotFoundPage from '../pages/NotFoundPage'
import Home from '../pages/Home';

export const mainRouters = [
    {
        path: '/',
        exact: true,
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