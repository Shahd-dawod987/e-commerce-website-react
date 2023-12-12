import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from "@mui/material";

const Breadcrumbs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((x) => x);

  const linkStyle = {
    cursor: "pointer",
    color: "green",
    textDecoration: "none",
  };

  return (
    <MUIBreadcrumbs variant="h4" separator=">" color={"secondary"}>
      {pathnames.length > 0 ? 
      (
        <Link variant="h4" style={linkStyle} onClick={()=> navigate("/")}>
          Home
        </Link>
      ) : (
        <Typography variant="h4" color= "secondary"> Home </Typography>
      )}

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography variant="h4" key={name} color="secondary">
            {name}
          </Typography>
        ) : (
          <Link key={name} style={linkStyle} variant="h4" onClick={() => navigate(routeTo)}>
            {name}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
