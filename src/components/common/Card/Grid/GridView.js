import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  CardActions,} from "@mui/material";
  import { addToCart } from "../../../../Redux/features/Cart/CartSlice";
import ImagesComponent from "../../../../assets/Images/ImageComponent/Index";
import styles from "../styles";


const GridView = ({ product }) => {
  const { title, description, price, image } = product;
  const productTitle = Array.isArray(title) ? title[0] || "not found" : title?.toString() || "not found";
  const productDescription = Array.isArray(description) ? description[0] || "not found" : description?.toString() || "not found";
  const productImage = image || ImagesComponent.GallarySeconedPageImage1;
  const productPrice = price ?? 0;
  
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleBuyNow = () => {
    if (isLoggedIn) {
    dispatch(addToCart({ productId: product.id, quantity: 1 }));
    }
    else{
      navigate("/login");
    }
  };

  return (
    <Card style={styles.card}>
      <CardContent  style={styles.cardContent}>
        <Stack gap={2}>
        <Link
        to={`/Details/id/${product.id}/category/${product.category}`}
        style={styles.link}>
            <img
              src={productImage}
              alt={productTitle}
              style={styles.imageFixedSizeCard}/>

           <Stack gap={1}>
            <Typography variant="h4" style={styles.titleStyle}>
              {productTitle}
            </Typography>
            <Typography variant="h5" style={styles.descriptionStyle}>{productDescription} </Typography>
          </Stack>
          </Link>

          <Stack
            alignItems={"center"}
            direction={"row"}
            justifyContent={"space-between"} >
            <Typography variant="h4">{productPrice} USD</Typography>

            <CardActions>
              <Button
                style={styles.buttonCustomized}
                variant="contained"
                color="secondary"
                onClick={handleBuyNow}
               >
                Buy now
              </Button>
            </CardActions>
          </Stack>
        </Stack>
      </CardContent>
      
    </Card>
  );
};

export default GridView;
