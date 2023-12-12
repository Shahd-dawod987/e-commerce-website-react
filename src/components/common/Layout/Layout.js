import React from "react";
import { Grid } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Breadcrumbs from "../../Home/Navigation/BreadCrumbsComponent";

const Layout = ({ children }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid item xs={12} position={"relative"} top={"3rem"} paddingLeft={"2rem"}>
      <Breadcrumbs/>

      </Grid>

      <Grid item xs={12}>
        {children}
      </Grid>

      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Layout;
