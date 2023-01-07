import useCart from "../hooks/useCart";
//CSS STUFF
import styles from "../syles/Products.module.css";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

export default function ProductCard({ product, setError }) {
  const { addToCart, cart } = useCart();
  // what i got rid of need to add back
  // {product.price}

  return (
    <div className={styles.allProducts} key={product}>
      <Card sx={{ width: 370, height: 350 }}>
        <Typography level="h5" fontSize="md" sx={{ mb: 1 }}>
          {product.name}
        </Typography>

        <div className={styles.imgDescription}>
          {product.description}{" "}
          <img className={styles.imgProducts} src={product.imageUrl} />
        </div>

        <div className={styles.pricingButtonn}>
          <h1>Price:$ {product.price}</h1>
          <Button
            className="focus:ring focus:ring-customyellow"
            variant="contained"
            onClick={async () => {
              try {
                await addToCart({
                  order_id: cart.id,
                  product_id: product.id,
                  quantity: 1,
                });
                setError("");
              } catch (err) {
                setError(err.response.data.message);
              }
            }}
            sx={{
              color: "black",
              background: "yellow",
              width: 110,
              height: 30,
              display: "inline",
              fontWeight: "bold",
              fontSize: 10,
              "&:hover": {
                color: "black",
                background: "yellow",
              },
              hover: { color: "black" },
            }}
          >
            add to cart
            <AddShoppingCartOutlinedIcon />
          </Button>
        </div>
      </Card>
    </div>
  );
}
