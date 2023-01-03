import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUsers from "../hooks/useUsers";
import useCart from "../hooks/useCart";
import styles from "../syles/Nav.module.css";
import {FaBars} from "react-icons/fa"

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
      {/* <div className={styles.navbar}>

        <div className={styles.navbarLinks}>


          


       




          



          <button className="smallScreenIcon"></button>
        </div>
      </div> */}


      <nav>

        <a className={styles.navBarBran}>
          Menu Brand
        </a>
        <ul className={styles.navList}>


          <li className={styles.navItem}>
          <Link to="/products">Home</Link>
          </li>

          <li className={styles.navItem}>
          {selectedUser.email === "Guest" ? (
            <>
              <Link className={styles.navLink} to="/register">Register</Link>
              <li className={styles.navItem}>
                <Link className={styles.navLink} to="/login">Sign in</Link>
              </li>
              
            </>
          ) : null}
          </li>
          <li className={styles.navItem}>
          {selectedUser.email !== "Guest" ? (
            <>
              <Link
              className={styles.navLink}
                onClick={() => {
                  LogoutUser();
                  navigate("/products");
                  window.location.reload(true);
                }}
              >
                Logout
              </Link>
              <Link className={styles.navLink} to="/Cart">Cart ({total})</Link>
            </>
          ) : null}
          </li>
          
        </ul>
      </nav>
    </div>



  );
}

export default NavBar;
