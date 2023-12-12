import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import { setGridView, setListView } from "../../../Redux/features/Product/DisplayProductSlice";

const DisplayControls = ({ productCatogery }) => {
  
  const dispatch = useDispatch();
  const viewMode = useSelector((state) => state.views.mode);

  const handleGridClick = () => {
    dispatch(setGridView());
  };

  const handleListClick = () => {
    dispatch(setListView());
  };

  return (
    <Stack
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={{sm :"0.5rem 1.6rem", xs :"0.5rem 1rem"}}>

      <Typography variant={"h2"}  
      fontSize={{
        xs: "1.7rem", 
        sm:"2rem",}}>{productCatogery[0]}</Typography>
      <Box display={"flex"} gap={ 2}>
        <Box display={"flex"} alignItems={"center"} gap={{xs : 0,sm : 2}}>
          <IconButton onClick={handleGridClick} disabled={viewMode === "grid"}>
            <GridViewIcon 
              color={viewMode === "grid" ? "secondary" : "default"}/>
            <Typography
            display={{xs: "none" , sm : 'flex'}}
              color={viewMode === "grid" ? "primary" : "default"}
              variant="h5">
              Grid View
            </Typography>
          </IconButton>

          <IconButton onClick={handleListClick} disabled={viewMode === "list"}>
            <ViewListIcon
              color={viewMode === "list" ? "secondary" : "default"}/>
            <Typography
              color={viewMode === "list" ? "primary" : "default"}
              variant="h5"  display={{xs: "none" , sm : 'flex'}}>
              List View
            </Typography>
          </IconButton>
        </Box>

        <Box display={"flex"} gap={1} alignItems={"center"}>
          <Typography
            variant="h6"
            color="#6A983C"
            border={"1px solid"}
            borderRadius="12px"
            padding=" 1px 7px"
            backgroundColor="#f4f8ec">
            20
          </Typography>
          <Typography variant="h5">Products</Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default DisplayControls;
