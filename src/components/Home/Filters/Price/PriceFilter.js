import React from "react";
import {
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { StyledSlider, StyledTextField, StyledTextFieldContainer } from './styles';

const PriceFilter = ({ priceRange, onPriceChange }) => {

    const handleMinValueChange = (event) => {
      const minValue = parseInt(event.target.value, 10);
      onPriceChange([minValue, priceRange[1]]);
    };
  
    const handleMaxValueChange = (event) => {
      const maxValue = parseInt(event.target.value, 10);
      onPriceChange([priceRange[0], maxValue]);
    };
  
  return (
    <Stack width= "16.6rem"  gap={2} paddingLeft={"1rem"} paddingTop={"2rem"}>
    <Typography variant="h3">Price</Typography>
      <StyledSlider
        color="secondary"
        value={priceRange}
        onChange={onPriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={1000}/>

      <Stack flexDirection={"row"} gap={3}>
        <Box>
          <Typography variant="h5">min</Typography>
          <StyledTextFieldContainer>
            <StyledTextField
              placeholder="0"
              variant="filled"
              onChange={handleMinValueChange}
              value={priceRange[0]}

            />
          </StyledTextFieldContainer>
        </Box>

        <Box>
          <Typography variant="h5">max</Typography>
          <StyledTextFieldContainer>
            <StyledTextField
              placeholder="1000"
              variant="filled"
              onChange={handleMaxValueChange}
              value={priceRange[1]}
            />
          </StyledTextFieldContainer>
        </Box>
      </Stack>

    
    </Stack>
  );
};

export default PriceFilter;
