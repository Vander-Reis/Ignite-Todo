import Logo from '../assets/Logo.svg';
import styles from './Header.module.css';

export function Header() {
    return (
        <div className={styles.header}>
            <img src={Logo} alt="logo to-do ignite" />
        </div>
    );
}