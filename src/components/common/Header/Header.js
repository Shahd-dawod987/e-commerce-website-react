import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Hidden,
  Stack,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PersonIcon from "@mui/icons-material/Person";
import { clearUser } from "../../../Redux/features/User/UserSlice";
import { styles } from "./styles";
const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const username = useSelector((state) => state.user.user);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleLogout = () => {
    navigate("/");
    setAnchorEl(null);
    setOpen(false);
    dispatch(clearUser());
  };

  return (
    <Fragment>
      <Hidden mdDown>
        <AppBar
        style={styles.defaultAppBar}
          color={"white"}>
          <Toolbar style={styles.defaultToolbar}>
            <Stack
              display={{ xs: "none", sm: "none", md: "flex" }}
              direction={"row"}
              spacing={4}
            >
              <Typography variant="h5" color={"secondary"}>
                Chat with us
              </Typography>
              <Typography variant="h5">+420 336 775 664</Typography>
              <Typography variant="h5">info@freshnesecom.com</Typography>
            </Stack>

            <Stack direction={"row"} spacing={5}>
              <Typography variant="h5" color={"secondary"}>
                Blog
              </Typography>
              <Typography variant="h5" color={"secondary"}>
                About Us
              </Typography>
              <Typography variant="h5" color={"secondary"}>
                Careers
              </Typography>
            </Stack>
          </Toolbar>
        </AppBar>
      </Hidden>

      <AppBar
        color={"white"}
        position={"relative"}
       style={styles.extendedAppBar}>
        <Toolbar
        style={styles.extendedToolbar}>
          <Stack xs={6} sm={6} md={6}>
            <Typography
              variant={"h1"}
              fontSize={{
                xs: "1.2rem",
                sm: "2.5rem",
                md: "2.5rem",
              }}>
              Freshnesecom
            </Typography>
          </Stack>

          <Stack spacing={2} xs={6} sm={6} md={6} direction={"row"}>
            <IconButton
              color="primary"
            style={styles.iconButton}
              onClick={handleClick}>
              <PersonIcon/>
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              {username ? (
                <Fragment>
                  <MenuItem onClick={handleClose}>{username}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Fragment>
              ) : (
                <Link
                  to="/login"
                  style={styles.link}>
                  <MenuItem onClick={handleClose}>Login</MenuItem>
                </Link>
              )}
            </Menu>
            <Link to={"/Cart"}>
              <Badge badgeContent={totalQuantity} color="secondary">
                <IconButton color="primary" style={styles.iconButton}>
                  <ShoppingBasketIcon />
                </IconButton>
              </Badge>
            </Link>

            <Hidden mdUp>
              <MenuIcon />
            </Hidden>
          </Stack>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Header;
