import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUsers from "../hooks/useUsers";
import useCart from "../hooks/useCart";
import styles from "../syles/Nav.module.css";

function NavBar() {
  const { LogoutUser, selectedUser, fetchMe } = useUsers();
  const { fetchCart, cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMe().then(() => {
      fetchCart();
    });
  }, []);

  let total = 0;
  cart.order_products?.map((item) => {
    {
      total += item.quantity;
    }
  });

  return (
    <div>
      <div className={styles.navbar}>

        <div className={styles.navbarLinks}>

          <a className={styles.toggleButton}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </a>

          <Link to="/products">Home</Link>
          {selectedUser.email === "Guest" ? (
            <>
              <Link to="/register">Register</Link>

              <Link to="/login">Sign in</Link>
            </>
          ) : null}
          {selectedUser.email !== "Guest" ? (
            <>
              <Link
                onClick={() => {
                  LogoutUser();
                  navigate("/products");
                  window.location.reload(true);
                }}
              >
                Logout
              </Link>
              <Link to="/Cart">Cart ({total})</Link>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
