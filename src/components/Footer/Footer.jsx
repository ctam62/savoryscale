import './Footer.scss';
import { useLocation } from 'react-router-dom';

export const Footer = () => {

    const { pathname } = useLocation();

    if (pathname === "/welcome" || pathname === "/login" || pathname === '/signup') {
        return (null);
    }

    return (
        <footer className="footer">Footer</footer>
    );
};
