import Login from '../pages/User/Login';
import Register from '../pages/User/Register'
import NotFoundPage from '../pages/NotFoundPage'
import Home from '../pages/Home';
import UserManagement from '../pages/Admin/User';
import ArticleManagement from '../pages/Admin/Article';
import DataManagement from '../pages/Admin/Data';
import AnnouncementManagement from '../pages/Admin/Announcement';

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
        path: '/admin/user',
        exact: true,
        component: UserManagement,
    },
    {
        path: '/admin/article',
        component: ArticleManagement,
    },
    {
        path: '/admin/data',
        component: DataManagement,
    },
    {
        path: '/admin/announcement',
        component: AnnouncementManagement,
    }
];