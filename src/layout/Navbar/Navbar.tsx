import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../../app/store";
import { logout } from "../../features/auth/authSlice";
import Button from "../../components/Button/Button";
import { ShoppingBag, Menu, X } from "lucide-react";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const token = useSelector((state: RootState) => state.auth.token);
  const username = useSelector((state: RootState) => state.auth.username);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    closeMenu();
    dispatch(logout());
  };

  if (!token) return null;

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo} onClick={closeMenu}>
        <ShoppingBag size={20} strokeWidth={2.2} />
        ShopFlow
      </Link>

      <button
        type="button"
        className={styles.menuToggle}
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ""}`}>
        <div className={styles.links}>
          <Link to="/" className={styles.link} onClick={closeMenu}>
            Products
          </Link>
          <Link to="/cart" className={styles.link} onClick={closeMenu}>
            Cart
          </Link>
          <Link to="/favorites" className={styles.link} onClick={closeMenu}>
            Favorites
          </Link>
          <Link
            to="/products/create"
            className={styles.link}
            onClick={closeMenu}
          >
            Add Product
          </Link>
        </div>

        <div className={styles.userSection}>
          <span className={styles.username}>{username}</span>
          <Button onClick={handleLogout} variant="secondary">
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
