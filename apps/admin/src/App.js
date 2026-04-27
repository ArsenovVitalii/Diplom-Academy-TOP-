import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { CoursesPage } from './pages/CoursesPage';
import { UsersPage } from './pages/UsersPage';
import { HeroSettingsPage } from './pages/HeroSettingsPage';
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('adminToken');
    if (!token)
        return _jsx(Navigate, { to: "/login" });
    return _jsx(_Fragment, { children: children });
};
const App = () => {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(PrivateRoute, { children: _jsx(DashboardPage, {}) }) }), _jsx(Route, { path: "/courses", element: _jsx(PrivateRoute, { children: _jsx(CoursesPage, {}) }) }), _jsx(Route, { path: "/users", element: _jsx(PrivateRoute, { children: _jsx(UsersPage, {}) }) }), _jsx(Route, { path: "/hero-settings", element: _jsx(PrivateRoute, { children: _jsx(HeroSettingsPage, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/dashboard" }) })] }) }));
};
export default App;
