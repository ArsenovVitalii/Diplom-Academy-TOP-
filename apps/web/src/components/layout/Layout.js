import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Header } from './Header';
import { Footer } from './Footer';
export const Layout = ({ children }) => {
    const styles = {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    };
    return (_jsxs("div", { style: styles, children: [_jsx(Header, {}), _jsx("main", { style: { flex: 1 }, children: children }), _jsx(Footer, {})] }));
};
