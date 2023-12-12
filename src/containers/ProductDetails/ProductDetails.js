import React, { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Grid,
  Rating,
  Typography,
  Stack,
  Button,
  Select,
  MenuItem,
  TextField,
  Divider,
  Tabs,
  Badge,
  Tab,
  Skeleton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Layout from "../../components/common/Layout/Layout";
import ImagesComponent from "../../assets/Images/ImageComponent/Index";
import style from "./style";
import { fetchProductDetails } from "../../Redux/features/Product/SingleProductSlice";
import { addToCart } from "../../Redux/features/Cart/CartSlice";
import { reviews, questionsData } from "./Index";

const ProductDetails = () => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("Pcs");
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.singleProduct[productId]);

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        dispatch(fetchProductDetails(productId));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, productId]);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const product = products.find((product) => product.id === Number(productId));
  const { title, description, category, price, image, rating } = product || {};
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

  const TabPanel = ({ index, value, children }) => (
    <Box paddingTop={"2rem"} hidden={value !== index}>
      {children}
    </Box>
  );
  const handleBuyNow = () => {
    if (isLoggedIn) {
      dispatch(addToCart({ productId: product.id, quantity: 1 }));
    } else {
      navigate("/login");
    }
  };

  return (
    <Layout>
      <Grid
        container
        marginTop={"5rem"}
        spacing={3}
        paddingRight={{ xs: "1rem", sm: "2rem" }}
        paddingLeft={{ xs: "1rem", sm: "2rem" }}
      >
        <Grid
          item
          display={"flex"}
          alignItems={"flex-start"}
          justifyContent={"center"}
          xs={12}
          sm={12}
          md={6}
        >
          {loading ? (
            <Box gap={"2rem"} display={"flex"} flexDirection={"column"}>
              <Skeleton
                variant="rectangular"
                width={"20rem"}
                height={"23rem"}
              />
            </Box>
          ) : (
            <img src={productImage} alt={productTitle} style={style.image} />
          )}
        </Grid>

        <Grid
          item
          display={"flex"}
          flexDirection={"column"}
          gap={4}
          xs={12}
          sm={12}
          md={6}
        >
          {loading ? (
            <Box gap={"1rem"} display={"flex"} flexDirection={"column"}>
              <Skeleton animation="wave" width="36rem" height={"3rem"} />
              <Skeleton animation="wave" width="36rem" height={"1rem"} />
              <Skeleton animation="wave" width="36rem" height={"1rem"} />
            </Box>
          ) : (
            <Box display={"flex"} flexDirection={"column"} gap={2}>
              <Typography variant="h1" fontSize={{ xs: "20px", sm: "32px" }}>
                {productTitle}
              </Typography>
              <Rating value={productRating} precision={0.1} readOnly />
              <Typography variant="h5">{productDescription}</Typography>
            </Box>
          )}

          <Box
            display={"flex"}
            justifyContent={"space-between"}
            flexDirection={{ xs: "column", sm: "row" }}
            gap={{ xs: "3rem", sm: 0 }}
          >
            <Stack flexDirection={"row"} gap={3}>
              {loading ? (
                <Fragment>
                  <Box gap={"1rem"} display={"flex"} flexDirection={"column"}>
                    <Skeleton animation="wave" width="5rem" height={"1rem"} />
                    <Skeleton animation="wave" width="5rem" height={"1rem"} />
                    <Skeleton animation="wave" width="5rem" height={"1rem"} />
                    <Skeleton animation="wave" width="5rem" height={"1rem"} />
                  </Box>

                  <Box gap={"1rem"} display={"flex"} flexDirection={"column"}>
                    <Skeleton animation="wave" width="5rem" height={"1rem"} />
                    <Skeleton animation="wave" width="5rem" height={"1rem"} />
                    <Skeleton animation="wave" width="5rem" height={"1rem"} />
                    <Skeleton animation="wave" width="5rem" height={"1rem"} />
                  </Box>
                </Fragment>
              ) : (
                <Fragment>
                  <Box display={"flex"} flexDirection={"column"} gap={2}>
                    <Typography color={"gray"} variant="h6">
                      SKU:
                    </Typography>
                    <Typography color={"gray"} variant="h6">
                      Category:
                    </Typography>
                    <Typography color={"gray"} variant="h6">
                      Stock:
                    </Typography>
                    <Typography color={"gray"} variant="h6">
                      Farm
                    </Typography>
                  </Box>
                  <Box display={"flex"} flexDirection={"column"} gap={2}>
                    <Typography variant="h6">76645</Typography>
                    <Typography variant="h6">{productCategory}</Typography>
                    <Typography variant="h6">{productCount}</Typography>
                    <Typography variant="h6">Grocery Tarm Fields</Typography>
                  </Box>
                </Fragment>
              )}
            </Stack>
            <Stack flexDirection={"row"} gap={3}>
            {loading ? (
              <Fragment>
              <Box gap={"1rem"} display={"flex"} flexDirection={"column"}>
                <Skeleton animation="wave" width="5rem" height={"1rem"} />
                <Skeleton animation="wave" width="5rem" height={"1rem"} />
                <Skeleton animation="wave" width="5rem" height={"1rem"} />
                <Skeleton animation="wave" width="5rem" height={"1rem"} />
              </Box>

              <Box gap={"1rem"} display={"flex"} flexDirection={"column"}>
                <Skeleton animation="wave" width="5rem" height={"1rem"} />
                <Skeleton animation="wave" width="5rem" height={"1rem"} />
                <Skeleton animation="wave" width="5rem" height={"1rem"} />
                <Skeleton animation="wave" width="5rem" height={"1rem"} />
              </Box>
            </Fragment>
            ) : (
              <Fragment>
              <Box display={"flex"} flexDirection={"column"} gap={2}>
                <Typography color={"gray"} variant="h6">
                  Freshness:
                </Typography>
                <Typography color={"gray"} variant="h6">
                  Buy by:
                </Typography>
                <Typography color={"gray"} variant="h6">
                  Delivery:
                </Typography>
                <Typography color={"gray"} variant="h6">
                  Delivery area
                </Typography>
              </Box>
              <Box display={"flex"} flexDirection={"column"} gap={2}>
                <Typography variant="h6">1 days old</Typography>
                <Typography variant="h6">pcs, kgs, box, pack</Typography>
                <Typography variant="h6">in 2 days</Typography>
                <Typography variant="h6">Czech republic</Typography>
              </Box>
              </Fragment>
            )}
             
            </Stack>
          </Box>

          <Box
            flexDirection={{ xs: "column", sm: "row" }}
            gap={{ xs: "1rem", sm: 0 }}
            display={"flex"}
            border={"1px solid gray"}
            borderRadius={"10px"}
            padding={"1rem 1rem"}
            justifyContent={{ sm: "space-between", md: "space-evenly" }}
            alignItems={"center"}
          >
            <Typography variant="h2" color={"secondary"}>
              {productPrice} USD
            </Typography>

            <Box display={"flex"} flexDirection={"row"}>
              <TextField
                style={style.textField}
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                InputProps={{ inputProps: { min: 1 } }}
              />

              <Select
                value={unit}
                style={style.select}
                onChange={handleUnitChange}
              >
                <MenuItem value="Pcs">Pcs</MenuItem>
                <MenuItem value="Kgs">Kgs</MenuItem>
                <MenuItem value="Box">Box</MenuItem>
                <MenuItem value="Pack">Pack</MenuItem>
              </Select>
            </Box>

            <Button
              onClick={handleBuyNow}
              variant="contained"
              color="secondary"
              style={style.addToCartButton}
              startIcon={<AddIcon style={style.icon} />}
            >
              Add to Cart
            </Button>
          </Box>

          <Box display={{ xs: "none", sm: "block" }}>
            <Tabs
              indicatorColor="secondary"
              value={value}
              onChange={handleChange}
              variant="fullWidth"
            >
              <Tab label={"Description"} style={style.tab} />
              <Tab
                label={
                  <Box display="flex" alignItems={"center"}>
                    Reviews
                    <Badge
                      badgeContent={2}
                      color="secondary"
                      marginLeft="2rem"
                      style={style.badge}
                    />
                  </Box>
                }
                style={style.tab}
              />
              <Tab
                label={
                  <Box display="flex" alignItems={"center"}>
                    Questions
                    <Badge
                      badgeContent={4}
                      color="secondary"
                      marginLeft="2rem"
                      style={style.badge}
                    />
                  </Box>
                }
                style={style.tab}
              />
            </Tabs>

            <TabPanel value={value} index={0}>
              <Typography paddingBottom={"1rem"} variant="h4">
                Origins
              </Typography>

              <Typography paddingBottom={"3rem"} variant="h5">
                We work hard to ensure that the fruit and vegetables we sell are
                fresh and high in quality. If we don’t grow them ourselves, we
                source them from carefully chosen suppliers, preferring to buy
                locally whenever possible.
              </Typography>

              <Typography paddingBottom={"1rem"} variant="h4">
                How to cook
              </Typography>

              <Typography variant="h5">
                From roasts, salads and soups to casseroles and cakes, Carrots
                will lend sweetness, texture and colour to an enormous number of
                recipes.
              </Typography>
            </TabPanel>

            <TabPanel value={value} index={1}>
              {reviews.map((review) => (
                <Box key={review.id} mb={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {review.user}
                  </Typography>
                  <Rating value={review.rating} readOnly />
                  <Typography variant="body2" color="textSecondary">
                    {review.comment}
                  </Typography>

                  <Typography variant="caption" color="textSecondary">
                    {new Date(review.date).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </TabPanel>

            <TabPanel value={value} index={2}>
              {questionsData.map((question) => (
                <Box key={question.id} mb={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {question.user}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {question.question}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(question.date).toLocaleDateString()}
                  </Typography>
                  <Divider />
                </Box>
              ))}
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ProductDetails;
