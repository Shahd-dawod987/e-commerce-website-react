import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormGroup,
  Grid,
  Stack,
  Typography,
  Checkbox,
} from "@mui/material";
import Layout from "../../components/common/Layout/Layout";
import {
  StyledTextField,
  NotesTextField,
  styles,
  StyledFormControlLabel,
} from "./styles";
const CheckOut = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [productDetails, setProductDetails] = useState({});
  const handleRegistration = (data) => console.log(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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

  return (
    <Layout>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <Grid
          container
          marginTop={"4rem"}
          paddingLeft={"1.5rem"}
          paddingRight={"2rem"}
          spacing={2}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            display={"flex"}
            flexDirection={"column"}
            gap={"2rem"}
          >
            <Box display={"flex"} flexDirection={"column"} gap={1}>
              <Typography variant="h2">Billing info</Typography>
              <Typography color={"gray"} variant="h6">
                Please enter your billing info
              </Typography>
            </Box>

            <Box
              display={"flex"}
              gap={{md :"8rem" , sm : "1rem"}}
              flexDirection={{ sm: "row", xs: "column" }}
            >
              <Stack gap={3}>
                <Box >
                  <Typography variant="h5">First name</Typography>
                  <StyledTextField
                    variant="outlined"
                    placeholder="First name"
                    {...register("firstname", {
                      required: {
                        value: true,
                        message: "First name is required",
                      },
                      minLength: 3,
                      message: "First name must be at least 3 characters",
                    })}
                    style={{
                      border: errors.firstname ? "2px solid red" : "none",
                    }}
                  />
                  {errors.firstname && (
                    <Typography variant="body2" color="error">
                      {errors.firstname.type === "required" &&
                        errors.firstname.message}
                      {errors.firstname.type === "minLength" &&
                        "First name must be at least 3 characters"}
                    </Typography>
                  )}
                </Box>

                <Box>
                  <Typography variant="h5">Email address</Typography>
                  <StyledTextField
                    type="email"
                    variant="outlined"
                    placeholder="Email address"
                    {...register("email", {
                      required: { value: true, message: "Email is required" },
                    })}
                    style={{
                      border: errors.email ? "2px solid red" : "none",
                    }}
                  />

                  {errors.email && (
                    <Typography variant="body2" color="error">
                      {errors.email.message}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Typography variant="h5">Address</Typography>
                  <StyledTextField
                    variant="outlined"
                    placeholder="Address"
                    {...register("address", {
                      required: { value: true, message: "Address is required" },
                    })}
                    style={{
                      border: errors.address ? "2px solid red" : "none",
                    }}
                  />

                  {errors.address && (
                    <Typography variant="body2" color="error">
                      {errors.address.message}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Typography variant="h5">State / Country</Typography>
                  <StyledTextField
                    variant="outlined"
                    placeholder="State / Country"
                    {...register("State")}
                  />
                </Box>
              </Stack>

              <Stack gap={3}>
                <Box>
                  <Typography variant="h5">Last name</Typography>
                  <StyledTextField
                    variant="outlined"
                    placeholder="Last name"
                    {...register("lastName", { required: true, minLength: 3 })}
                    style={{
                      border: errors.lastName ? "2px solid red" : "none",
                    }}
                  />
                  {errors.lastName && (
                    <Typography variant="body2" color="error">
                      {errors.lastName.type === "required" &&
                        "Last name is required"}
                      {errors.lastName.type === "minLength" &&
                        "Last name must be at least 3 characters"}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Typography variant="h5">Phone number</Typography>
                  <StyledTextField
                    type="number"
                    variant="outlined"
                    placeholder="Phone number"
                    {...register("phone", { required: true })}
                    style={{
                      border: errors.phone ? "2px solid red" : "none",
                    }}
                  />

                  {errors.phone && (
                    <Typography variant="body2" color="error">
                      {errors.phone.type === "required" &&
                        "Phone number is required"}
                      {errors.phone.type === "pattern" &&
                        "Invalid phone number format (e.g., 123-456-7890)"}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Typography variant="h5">Town / City</Typography>
                  <StyledTextField
                    name="City"
                    {...register("City")}
                    variant="outlined"
                    placeholder="Town / City"
                  />
                </Box>
                <Box>
                  <Typography variant="h5">ZIP/Postal code</Typography>
                  <StyledTextField
                    type="number"
                    name="ZIP"
                    {...register("ZIP")}
                    variant="outlined"
                    placeholder="ZIP/Postal code"
                  />
                </Box>
              </Stack>
            </Box>

            <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
              <Typography variant="h2">Additional informations</Typography>
              <Typography color={"gray"} variant="h6">
                Need something else? We will make it for you!
              </Typography>
            </Box>

            <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
              <Typography variant="h5">Order notes</Typography>
              <NotesTextField
                variant="outlined"
                placeholder="Need a specific delivery day? Sending a gitf? Let’s say ..."
              />
            </Box>

            <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
              <Typography variant="h2">Confirmation</Typography>
              <Typography color={"gray"} variant="h6">
                We are getting to the end. Just few clicks and your order si
                ready!
              </Typography>
            </Box>
            <Box paddingLeft={1}>
              <FormGroup>
                <StyledFormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      {...register("marketing", { required: true })}
                      style={{
                        color: errors.marketing ? "red" : "#6A983C",
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body1"
                      style={{ color: errors.marketing ? "red" : "black" }}
                    >
                      I agree with sending an Marketing and newsletter emails.
                      No spam, promissed!
                    </Typography>
                  }
                />

                <StyledFormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      {...register("terms", { required: true })}
                      style={{
                        color: errors.terms ? "red" : "#6A983C",
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body1"
                      style={{ color: errors.terms ? "red" : "black" }}
                    >
                      I agree with our terms and conditions and privacy policy.
                    </Typography>
                  }
                />
              </FormGroup>
            </Box>

            <Button
              type="submit"
              justifyContent="center"
              variant="contained"
              color="secondary"
              style={styles.completeOrder}
            >
              Complete order
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={1}
              border={"1px solid"}
              padding={"5px 10px"}
              borderRadius={"10px"}
            >
              <Typography variant="h3">Order Summary</Typography>
              <Typography color={"gray"} variant="h6">
                Price can change depending on shipping method and taxes of your
                state.
              </Typography>
              {cartItems.map(
                (item) =>
                  productDetails[item.productId] && (
                    <Box
                      key={item.productId}
                      display={"flex"}
                      gap={2}
                      borderTop={"1px solid gray"}
                      padding={"1rem 1rem"}
                    >
                      <img
                        width={"18%"}
                        src={productDetails[item.productId].image}
                        alt={productDetails[item.productId].title}
                      />
                      <Stack
                        gap={3}
                        justifyContent={"space-evenly"}
                        flexGrow={1}
                      >
                        <Typography variant="h5">
                          {productDetails[item.productId].title}
                        </Typography>

                        <Box display={"flex"} justifyContent={"space-between"}>
                          <Typography variant="h4" color={"secondary"}>
                            {productDetails[item.productId].price} USD
                          </Typography>
                          <Typography variant="h6">
                            Quantity: {item.quantity}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  )
              )}

              <Box
                display={"flex"}
                justifyContent={"space-between"}
                padding={"1rem 1rem"}
                borderTop={"1px solid"}
              >
                <Typography variant="h4">Total</Typography>
                <Typography variant="h4" color={"secondary"}>
                  USD {calculateTotalPrice()}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
};

export default CheckOut;
