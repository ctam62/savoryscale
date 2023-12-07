import './Footer.scss';
import { useLocation, Link } from 'react-router-dom';

export const Footer = () => {

    const { pathname } = useLocation();

    if (pathname === "/welcome" || pathname === "/login" || pathname === '/signup') {
        return (null);
    }

    return (
        <footer className="footer">
            <nav className="footer__nav">
                <ul className="footer__nav-list">
                    <li className="footer__nav-list-item"><Link to="/">About Me</Link></li>
                    <li className="footer__nav-list-item"><Link to="/">User Agreement</Link></li>
                    <li className="footer__nav-list-item"><Link to="/">Privacy Policy</Link></li>
                </ul>
            </nav>
            <p className="footer__text">&copy; 2023 SavoryScale</p>
        </footer>
    );
};
