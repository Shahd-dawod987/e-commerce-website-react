import React from "react";
import { Stack, Typography, ListItemButton, ListItemText } from "@mui/material";

const CategoryFilter = ({ productCategories, setValue, watch }) => {
  const selectedCategory = watch('selectedCategory');

  const handleCategoryClick = (category) => {
    setValue("selectedCategory", category);
  };

  return (
    <Stack marginTop={"2rem"}>
      <Typography paddingLeft={2} paddingBottom={1} variant="h3">
        Categories
      </Typography>

      {productCategories.map((category, index) => (
        <ListItemButton
          style={{
            backgroundColor: selectedCategory === category ? "#92C064" : "inherit", }}
          disablePadding
          component="button"
          type="button"
          key={index}
          onClick={() => handleCategoryClick(category)}>
          <ListItemText 
          primary={
              <Typography component="span" variant="body2" color="text.primary">
                {category}
              </Typography>
            }/>
        </ListItemButton>
      ))}
    </Stack>
  );
};

export default CategoryFilter;
