import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Typography, Stack, Button, Box, Grid } from "@mui/material";
import {
  StyledAvatar,
  StyledTextField,
  StyledLambImage,
  StyledPerson,
  StyledRectangleImage,
} from "./styles";
import ImagesComponent from "../../assets/Images/ImageComponent/Index";
import { setUser } from "../../Redux/features/User/UserSlice";


const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("mor_2314");
  const [password, setPassword] = useState("83r5^_");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    login: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({ username: "", password: "", login: "" });

    if (username.trim().length < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username must be at least 3 characters long.",
        login: "",
      }));
    }
    else if (password.trim().length < 3) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password must be at least 3 characters long.",
          login : ""
        }));
      }
     else if (!/\d/.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must contain both letters and numbers.",
        login: "",
      }));
    }

    
    try {
      const response = await axios.post("https://fakestoreapi.com/auth/login",{
        username: username,
        password: password,
      });

      
      if (response?.data ) {
       dispatch(setUser(username));
        console.log("Login successful");
        console.log(response.data);
        setUsername("");
        setPassword("");
        setErrors({ username: "", password: "", login: "" });
        navigate(`/home/${username}`);
      }
    } 
    catch (error) {
        console.error("Error:", error.response?.data || error.message);
        setErrors((prevErrors) => ({
        ...prevErrors,
        login: error.response?.data || error.message,
      }));
    }
  };

  return (
    <Grid
      container
      bgcolor={"#46760A"}
      padding={0}
      margin={0}
      height={"100vh"}
      justifyContent={"space-between"}>
      <Grid
        item
        pl={{ sm: "none", md: "7rem" }}
        alignItems={"center"}
        pt={"4rem"}
        xs={12}
        sm={12}
        md={6}>
        <Stack
          spacing={1}
          paddingTop={1}
          alignItems={"center"}
          justifyContent={"center"}>
          <StyledAvatar src={ImagesComponent.Avatar} alt="avatar" />

          <Typography variant="h2" color={"primary.white"}>
            WELCOME
          </Typography>

          <form onSubmit={handleLogin}>
            <Box spacing={1} mt={3}>
              <Typography variant="h3" color={"primary.white"}>
                Username
              </Typography>

              <StyledTextField
                required
                color="adittional"
                id="username"
                type="text"
                autoComplete="current-password"
                variant="standard"
                focused
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              {errors.username && (
                <Typography variant="body2" color="#ff0f0f">
                  {errors.username}
                </Typography>
              )}
            </Box>

            <Box mt={2} spacing={1}>
              <Typography variant="h3" color={"primary.white"}>
                Password
              </Typography>

              <Stack>
                <StyledTextField
                  required
                  color="adittional"
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                  focused
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {errors.password && (
                  <Typography variant="body2" color="#ff0f0f">
                    {errors.password}
                  </Typography>
                )}

                <Button
                  sx={{ textTransform: "none", justifyContent: "flex-end" }}
                  color={"white"}
                  variant="text"
                >
                  Forgot Password?
                </Button>

                <Button
                  fontSize="16px"
                  fontWeight="550"
                  style={{ color: "#6A983C" }}
                  color="adittional"
                  variant="contained"
                  type="submit"
                >
                  LOGIN
                </Button>
                {errors.login && (
                  <Typography variant="body2" color="#ff0f0f">
                    {errors.login}
                  </Typography>
                )}
              </Stack>
            </Box>
          </form>
        </Stack>
      </Grid>

      <Grid item md={6} display={{ xs: "none", sm: "none", md: "flex" }}>
        <StyledLambImage src={ImagesComponent.Lamb} alt="lamb" />
        <StyledPerson src={ImagesComponent.Person} alt="person" />
        <StyledRectangleImage src={ImagesComponent.Rectangle} alt="rectangle" />
      </Grid>

    </Grid>
  );
};

export default LoginPage;
