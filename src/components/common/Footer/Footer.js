import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { Grid, Link, Typography,List,ListItemText,ListItemButton,Collapse } from "@mui/material";
import {ExpandLess,ExpandMore} from '@mui/icons-material';
import {getInTouchLinks,socialMediaLinks,earningsLinks,accountLinks } from "./Index"
import { toggleSection } from "../../../Redux/features/Footer/FooterSlice";
import { styles } from "./styles";

const Footer = () => {
    const dispatch = useDispatch();
    const footerState = useSelector((state) => state.footer);

    const handleClick = (section) => {
        dispatch(toggleSection(section));
    };

  return (
    <Grid container padding={{sm :"54px 45px" ,xs:"54px 15px"}}>
     <Grid item display={{xs:"none", sm: "flex"}} flexDirection={"column"} gap={2} sm={6}md={3}>
         <Typography marginBottom={1} variant="h4">Get in touch</Typography>
         {getInTouchLinks.map((link, index) => (
            <Link key={index} color={"secondary"} underline="hover" href={link.href}> {link.label} </Link>
         ))}
      </Grid>

      <Grid item xs={12} display={{xs: "flex" , sm : "none"}}>
       <List style={styles.customList} component="nav">
           <ListItemButton onClick={() => handleClick("getInTouchOpen")}>
            <ListItemText primary={<Typography variant="h3">Get in touch</Typography>}/>
             {footerState.getInTouchOpen ? (
              <ExpandLess color="secondary" />
            ) : (
              <ExpandMore color="secondary" />
            )}
           </ListItemButton>
         <Collapse in={footerState.getInTouchOpen} timeout="auto" unmountOnExit>
           <List component="div" disablePadding>
              {getInTouchLinks.map((link, index) => (
                <ListItemButton key={index}>
                   <ListItemText primary={<Typography color="secondary" variant="h6">{link.label}</Typography>}/>
                </ListItemButton>
               ))}
            </List>
         </Collapse>
        </List>
    </Grid>


      <Grid item display={{xs:"none", sm: "flex"}} flexDirection={"column"} gap={2} sm={6}md={3} marginBottom={"2rem"}>
        <Typography marginBottom={1} variant="h4">Connections</Typography>
          {socialMediaLinks.map((link, index) => (
            <Link key={index} color={'secondary'} underline="hover" href={link.href}>
              {link.label}
            </Link>
          ))}
      </Grid>

      <Grid item xs={12} display={{xs: "flex" , sm : "none"}} >
       <List  style={styles.customList} component="nav">
            <ListItemButton onClick={() => handleClick("socialMediaOpen")}>
            <ListItemText  primary={<Typography variant="h3">Connections</Typography>}/>
            {footerState.socialMediaOpen ? (
                <ExpandLess color="secondary" />
              ) : (
                <ExpandMore color="secondary" />
              )}
           </ListItemButton>
         <Collapse in={footerState.socialMediaOpen} timeout="auto" unmountOnExit>
           <List component="div" disablePadding>
              {socialMediaLinks.map((link, index) => (
                <ListItemButton key={index}>
                <ListItemText primary={<Typography color="secondary" variant="h6">{link.label}</Typography>}/>
                </ListItemButton>
               ))}
            </List>
         </Collapse>
        </List>
    </Grid>

    <Grid item display={{xs:"none", sm: "flex"}} flexDirection={"column"} gap={2} sm={6}md={3}>
        <Typography marginBottom={1} variant="h4">Earnings</Typography>
        {earningsLinks.map((link, index) => (
            <Link key={index} color={'secondary'} underline="hover" href={link.href}>
              {link.label}
            </Link>
          ))}
      </Grid>

      <Grid item xs={12} display={{xs: "flex" , sm : "none"}}>
      <List style={styles.customList} component="nav">
          <ListItemButton onClick={() => handleClick("earningsOpen")}>
          <ListItemText  primary={<Typography variant="h3">Earnings</Typography>}/>
          {footerState.earningsOpen ? (
            <ExpandLess color="secondary" />
          ) : (
            <ExpandMore color="secondary" />
          )}
          </ListItemButton>
        <Collapse in={footerState.earningsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
             {earningsLinks.map((link, index) => (
               <ListItemButton key={index}>
               <ListItemText primary={<Typography color="secondary" variant="h6">{link.label}</Typography>}/>
               </ListItemButton>
              ))}
           </List>
        </Collapse>
       </List>
   </Grid>

       <Grid item display={{xs:"none", sm: "flex"}} flexDirection={"column"} gap={2} sm={6}md={3}>
        <Typography marginBottom={1} variant="h4">Account</Typography>
        {accountLinks.map((link, index) => (
            <Link key={index} color={'secondary'} underline="hover" href={link.href}>
              {link.label}
            </Link>
          ))}
      </Grid>

      <Grid item xs={12} display={{xs: "flex" , sm : "none"}}>
      <List style={styles.customeListItem}  component="nav">
          <ListItemButton onClick={() => handleClick("accountOpen")}>
          <ListItemText  primary={<Typography variant="h3">Account</Typography>}/>
          {footerState.accountOpen ? (
            <ExpandLess color="secondary" />
          ) : (
            <ExpandMore color="secondary" />
          )}
          </ListItemButton>
        <Collapse in={footerState.accountOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
             {accountLinks.map((link, index) => (
               <ListItemButton key={index}>
               <ListItemText primary={<Typography color="secondary" variant="h6">{link.label}</Typography>}/>
               </ListItemButton>
              ))}
           </List>
        </Collapse>
       </List>
      </Grid>

      <Grid item xs={12} sm ={12} md ={12}  paddingTop={"2rem"}>
      <Typography variant="h5">Copyright © 2020 petrbilek.com</Typography> 
      </Grid>



    </Grid>
  );
};

export default Footer;
