import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Grid,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Chip,
  Typography,
  Skeleton,
} from "@mui/material";
import GridView from "../../components/common/Card/Grid/GridView";
import ListView from "../../components/common/Card/List/ListView";
import CategoryFilter from "../../components/Home/Filters/Category/CategoryFilter";
import Layout from "../../components/common/Layout/Layout";
import DisplayControls from "../../components/Home/Navigation/DisplayControls";
import RatingFilter from "../../components/Home/Filters/Rate/RatingFilter";
import PaginationComponent from "../../components/common/Pagenation/PaginationComponent";
import styles from "../../components/common/Card/styles";
import PriceFilter from "../../components/Home/Filters/Price/PriceFilter";

const HomePage = () => {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [productCatogery, setProductCatogery] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    selectedCategory: "",
    selectedSorting: "",
  });
  const viewMode = useSelector((state) => state.views.mode);
  const [priceRange, setPriceRange] = useState([200, 500]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const itemsPerPage = 5;
  const { handleSubmit, watch, setValue, reset } = useForm();
  const currentItemsTest =
    filteredProducts.length > 0 ? filteredProducts : currentItems;

  useEffect(() => {
    fetchProducts();
  }, [ currentPage, selectedFilters.selectedCategory, selectedFilters.selectedSorting,]);

  const fetchProducts = async () => {
    try {
      const limit = currentPage * itemsPerPage;

      const response = await axios.get(
        `https://fakestoreapi.com/products?limit=${limit}`
      );
      const startIndex = (currentPage - 1) * itemsPerPage;
      const itemsForCurrentPage = response.data.slice(
        startIndex,
        startIndex + itemsPerPage
      );
      setCurrentItems(itemsForCurrentPage);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setProductCatogery(response?.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchData();
  }, []);

  const handleCategorySelection = async (selectedCategory, selectedSorting) => {
    try {
      const apiUrl = `https://fakestoreapi.com/products/category/${selectedCategory}?sort=${selectedSorting}`;
      const response = await axios.get(apiUrl);
      setFilteredProducts(response.data);
      setSelectedFilters({
        selectedCategory,
        selectedSorting,
      });
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  const handleRatingChange = (value) => {
    const index = selectedRatings.indexOf(value);
    if (index === -1) {
      setSelectedRatings([...selectedRatings, value]);
    } else {
      setSelectedRatings(selectedRatings.filter((rating) => rating !== value));
    }
  };
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onSubmit = async () => {
    const selectedCategory = watch("selectedCategory");
    const selectedSorting = watch("selectedSorting");

    handleCategorySelection(selectedCategory, selectedSorting);
    const filteredProductsByPrice = currentItems.filter((product) => {
      const price = parseFloat(product.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    setFilteredProducts(filteredProductsByPrice);
  };

  const handleReset = () => {
    console.log("reset category done");
    reset({
      selectedCategory: "",
      selectedSorting: "",
    });
    setFilteredProducts([]);
    setSelectedFilters({
      selectedCategory: "",
      selectedSorting: "",
    });
  };
  return (
    <Layout>
      <Grid container>
        <Grid item xs={12} paddingTop={"4rem"}>
          <DisplayControls productCatogery={productCatogery} />
        </Grid>
        <Grid item xs={12} paddingTop={"4rem"}>
          {selectedFilters.selectedCategory && (
            <Chip
              label={`Category: ${selectedFilters.selectedCategory}`}
              onDelete={() => {
                handleCategorySelection("", selectedFilters.selectedSorting);
              }}
              color="secondary"
              style={{ margin: "0.5rem" }}
            />
          )}
          {selectedFilters.selectedSorting && (
            <Chip
              label={`Sorting: ${selectedFilters.selectedSorting}`}
              onDelete={() => {
                handleCategorySelection(selectedFilters.selectedCategory, "");
              }}
              color="secondary"
              style={{ margin: "0.5rem" }}
            />
          )}
        </Grid>

        <Grid
          item
          display={{ xs: "none", sm: "none", md: "block" }}
          paddingLeft={2}
          md={4}
          lg={3}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <RadioGroup row defaultValue="Ascending">
                <Box
                  paddingLeft={2}
                  border={"1px solid black"}
                  borderRadius={"13px"}
                >
                  <FormControlLabel
                    onClick={() =>
                      setValue("selectedSorting", "desc", {
                        shouldValidate: true,
                      })
                    }
                    value="Descending"
                    color="secondary"
                    control={<Radio color="secondary" />}
                    label="Descending"
                  />
                  <FormControlLabel
                    onClick={() =>
                      setValue("selectedSorting", "asc", {
                        shouldValidate: true,
                      })
                    }
                    value="Ascending"
                    control={<Radio color="secondary" />}
                    label="Ascending"
                  />
                </Box>
              </RadioGroup>
            </FormControl>
            <CategoryFilter
              productCategories={productCatogery}
              setValue={setValue}
              watch={watch}
            />
            <RatingFilter
              selectedRatings={selectedRatings}
              onRatingChange={handleRatingChange}
            />
            <PriceFilter
              priceRange={priceRange}
              onPriceChange={handlePriceChange}
              setFilteredProducts={setFilteredProducts}
            />
            <Box
              marginTop={2}
              marginLeft={2}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              gap={9}
            >
              <Button
                style={styles.buttonCustomized}
                variant="contained"
                color="secondary"
                type="submit"
              >
                Apply
              </Button>

              <Button
                style={styles.buttonCustomizedNoOutlined}
                variant="text"
                color="primary"
                onClick={handleReset}
              >
                Reset
              </Button>
            </Box>
          </form>
        </Grid>

        <Grid item container xs={12} sm={12} md={8} lg={9}>
          {loading ? (
            Array.from({ length: itemsPerPage }).map((index) => (
              <Grid
                item
                key={index}
                paddingBottom={2}
                xs={12}
                sm={viewMode === "grid" ? 6 : 12}
                md={viewMode === "grid" ? 4 : 12}
                lg={viewMode === "grid" ? 4 : 12}
              >
                <Box
                  gap={"2rem"}
                  display={"flex"}
                  flexDirection={viewMode === "grid" ? "column" : "row"}
                >
                  <Skeleton
                    variant="rectangular"
                    width={"16rem"}
                    height={"16rem"}
                  />
                  <Box>
                    <Skeleton
                      animation="wave"
                      width={viewMode === "grid" ? "16rem" : "30rem"}
                    />
                    <Skeleton animation="wave" width="60%" />
                    <Skeleton width="20%" />
                  </Box>
                </Box>
              </Grid>
            ))
          ) : currentItemsTest.length > 0 ? (
            currentItemsTest.map((product) => (
              <Grid
                item
                key={product.id}
                xs={12}
                sm={viewMode === "grid" ? 6 : 12}
                md={viewMode === "grid" ? 4 : 12}
                lg={viewMode === "grid" ? 4 : 12}
                alignItems="center"
                justifyContent={{
                  xs: viewMode === "grid" ? "center" : "center",
                  sm: viewMode === "grid" ? "center" : "flex-end",
                }}
                display="flex"
                paddingRight={{
                  xs: viewMode === "grid" ? 0 : 0,
                  sm: viewMode === "grid" ? 0 : "1rem",
                }}
              >
                {viewMode === "grid" ? (
                  <GridView product={product} />
                ) : (
                  <ListView product={product} />
                )}
              </Grid>
            ))
          ) : (
            <Typography>No products found.</Typography>
          )}
        </Grid>

        <Grid
          item
          display={"flex"}
          paddingTop={"3rem"}
          xs={12}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <PaginationComponent
            totalItems={20}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
