import React from "react";
import { Checkbox, Rating, Typography, Stack, ListItemButton } from "@mui/material";

const RatingFilter = ({ selectedRatings, onRatingChange }) => {
  return (
    <Stack paddingLeft= "1rem" paddingTop={"1rem"}>
    <Typography variant="h3">Rating</Typography>
    {[5, 4, 3, 2, 1].map((value) => (
        <ListItemButton sx={{padding: 0}}>
        <Checkbox 
        checked={selectedRatings.includes(value)}
        onChange={() => onRatingChange(value)}/>  
        <Rating
            name={`read-only-${value}`}
            value={value}
            size="small"
            readOnly/>
        </ListItemButton>
           ))}
  </Stack>
  );
};

export default RatingFilter;
