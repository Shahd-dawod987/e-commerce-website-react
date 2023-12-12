import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { addToCart } from "../../../../Redux/features/Cart/CartSlice";
import ImagesComponent from "../../../../assets/Images/ImageComponent/Index";
import styles from "../styles";

const ListView = ({ product }) => {
  const { id, title, description, category, price, image, rating } = product || {};
  const productId = id ?? "not found";
  const productTitle = Array.isArray(title)
    ? title[0] || "not found"
    : title?.toString() || "not found";
  const productDescription = Array.isArray(description)
    ? description[0] || "not found"
    : description?.toString() || "not found";
  const productCategory = Array.isArray(category)
    ? category[0] || "not found"
    : category?.toString() || "not found";
  const productImage = image || ImagesComponent.GallarySeconedPageImage1;
  const productPrice = price ?? 0;
  const productRating = rating?.rate ?? 0;
  const productCount = rating?.count ?? 0;
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  
  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const maxLines = 2;
  const truncatedDescription = truncateDescription(
    productDescription,
    maxLines * 50
  );

  const dispatch = useDispatch();
  const handleBuyNow = () => {
    if (isLoggedIn) 
    {
      dispatch(addToCart({ productId: product.id, quantity: 1 }));
    }
    else{
      navigate("/login");
    }
  };

  return (
    <Card style={styles.cardListView}>
      <CardContent>
        <Stack flexDirection={{ xs: "column", sm: "row" }} gap={3}>
          <CardMedia
            component="img"
            style={styles.imageFixedSizeCardListView}
            image={productImage}
            alt="clothes"/>

          <Stack gap={2}>
            <Typography variant="h4" style={styles.titleStyleListView} noWrap>
              {productTitle}
            </Typography>
            <Typography variant="h5" style={styles.descriptionStyleListView}>
              {truncatedDescription}
            </Typography>
            <Rating value={productRating} precision={0.1} readOnly />

            <Stack gap={1}>
              <Typography variant="h6" color={"gray"}>
                id: {productId}
              </Typography>
              <Typography variant="h6" color={"gray"}>
                Category: {productCategory}
              </Typography>
              <Typography variant="h6" color={"gray"}>
                Delivery: Europe
              </Typography>
              <Typography variant="h6" color={"gray"}>
                In Stock: {productCount}
              </Typography>
            </Stack>
          </Stack>
          <Stack alignItems={"flex-start"} justifyContent={"space-between"}>
            <Typography variant="h5">{productPrice} USD</Typography>
            <Stack gap={0.5}>
              <Typography color={"gray"} fontWeight={600} variant="h6">
                Free Shipping
              </Typography>
              <Typography color={"gray"} variant="h6">
                Delivery in 1 day
              </Typography>
            </Stack>

            <CardActions>
              <Stack gap={1}>
                <Link
                  to={`/Details/id/${product.id}/category/${product.category}`}
                  style={styles.link}
                >
                  <Button
                    style={styles.productDeatailsButton}
                    variant="contained"
                    color="secondary"
                    endIcon={<ArrowForwardIosIcon style={styles.arrowIcon} />}
                  >
                    Product Details
                  </Button>
                </Link>

              
                  <Button
                    variant="contained"
                    color="grey"
                    style={styles.addToCartButton}
                    startIcon={<ShoppingBasketIcon />}
                     onClick={handleBuyNow}>
                    Add to Cart
                  </Button>
                
              </Stack>
            </CardActions>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ListView;
