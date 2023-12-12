import React, {useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styles } from "./styles";
import { removeFromCart,updateQuantity } from "../../Redux/features/Cart/CartSlice";
import { Link } from "react-router-dom";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [productDetails, setProductDetails] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const responses = await Promise.all(
          cartItems.map(async (item) => {
            const response = await axios.get(
              `https://fakestoreapi.com/products/${item.productId}`
            );
            return { productId: item.productId, details: response.data };
          })
        );

        const detailsMap = responses.reduce((acc, { productId, details }) => {
          acc[productId] = details;
          return acc;
        }, {});

        setProductDetails(detailsMap);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [cartItems]);

    const calculateTotalPrice = () => {
      const totalPrice = cartItems.reduce((total, item) => {
        const product = productDetails[item.productId];
        if (product && product.price) {
          return total + product.price * item.quantity;
        }
        return total;
      }, 0);
    
      return totalPrice.toFixed(2);
    };
    
    const handleQuantityChange = (productId, newQuantity) => {
      if (newQuantity > 0) {
        dispatch(updateQuantity({ productId, quantity: newQuantity }));
      }
    };
    
  return (
    <Container>
    <Grid container mt={5} spacing={2} mb={3}>
      <Grid item display={"flex"} gap={2}
        flexDirection={"column"} xs={12} >
        <Typography  variant="h1" color={"secondary"}>
          Cart Page
        </Typography>
        <Typography variant="h2">All Items</Typography>
      </Grid>

      <Grid item xs={12} sm={12} md={8} 
      display={"flex"} 
      flexDirection={"column"} gap={"2rem"}>
        {cartItems.map(
          (item) =>
            productDetails[item.productId] && (
              

              <Box display={"flex"} flexDirection={"column"} gap={3}>
                <Typography variant="h2">
                  {productDetails[item.productId].category}
                </Typography>

                <Card key={item.productId} style={styles.cardStyle}>
                  <CardContent>
                    <Stack flexDirection={{ xs: "column", sm: "row" }} gap={3}>
                      <CardMedia
                        component="img"
                        image={productDetails[item.productId].image}
                        alt="clothes"
                        style={styles.imageFixedSizeCardListView}/>

                      <Stack justifyContent={"space-around"} flexGrow={1}>
                        <Typography
                          variant="h4"
                          style={styles.titleStyleListView}
                          noWrap
                        >
                          {productDetails[item.productId].title}
                        </Typography>

                        <Box
                          display={"flex"}
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Typography variant="h4">
                          {productDetails[item.productId].price} USD
                          </Typography>
                          <Stack
                            flexDirection={"row"}
                            alignItems={"center"}
                            gap={"1rem"}>
                            <Box
                              width={"6rem"}
                              display={"flex"}
                              direction="row"
                              alignItems="center"
                              justifyContent={"center"}
                              spacing={2}
                              border={"1px solid black"}
                              borderRadius={"18px"}>

                              <Button style={styles.buttonStyle} variant="text"
                              onClick={() =>
                                handleQuantityChange(
                                  item.productId,
                                  item.quantity - 1)}>
                                -
                              </Button>
                              <TextField
                              value={item.quantity}
                                style={styles.textFieldStyle}
                                className={styles.outlinedInputRoot}
                              />
                              <Button style={styles.buttonStyle} variant="text" 
                              onClick={() =>
                                handleQuantityChange(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }>
                                +
                              </Button>
                            </Box>

                            <FavoriteBorderIcon />
                            <IconButton  onClick={() => dispatch(removeFromCart({ productId: item.productId }))}>  
                            <DeleteIcon/>
                            </IconButton>
                          </Stack>
                        </Box>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            )
        )}
      </Grid>

      <Grid
        item
        xs={12}
        md={4}
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        paddingRight={"1rem"}
        sm={12} >
        <Typography alignSelf={"flex-start"} variant="h2">
          Order Summary
        </Typography>
        <Typography alignSelf={"flex-end"} variant="h3">
        USD {calculateTotalPrice()}
        </Typography>

        <Link
        to={"/Checkout" }
        style={styles.link}
      >        <Button
          justifyContent = "center"
          variant="contained"
          color="secondary"
          style={styles.checkoutButton}>
          CheckOut
        </Button>
        </Link>
      </Grid>
    </Grid>
    </Container>
  );
};

export default CartPage;
