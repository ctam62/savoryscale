import './LogoHeader.scss';
import logo from '../../assets/logos/justice-scale1.svg';


export const LogoHeader = () => {
    return (
        <header className="logo-header">
            <h1 className="logo-header__logo">SavoryScale</h1>
            <img className="logo-header__logo-img" src={logo} alt="savory scale logo" />
        </header>
    );
};
