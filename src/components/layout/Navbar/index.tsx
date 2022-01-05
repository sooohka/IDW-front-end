import Logo from "@Assets/idw-logo.png";
import Img from "@Components/common/Img";
import { AppBar, Avatar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const pages = [
  { id: 1, name: "만들기", link: "/create" },
  { id: 2, name: "만들기", link: "/create" },
  { id: 3, name: "만들기", link: "/create" },
];
function Navbar() {
  return (
    <AppBar
      position='fixed'
      elevation={0}
      sx={(theme) => ({
        zIndex: theme.zIndex.drawer + 1,
        flexGrow: 1,
        height: theme.layout.header.height,
      })}
    >
      <Toolbar disableGutters sx={{ backgroundColor: "common.white" }}>
        <Box sx={{ height: "60%" }}>
          <Img src={Logo} />
        </Box>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          {pages.map((page) => (
            <Button key={page.id}>
              <Link to={page.link}>
                <Typography sx={{ color: "primary.main" }}>{page.name}</Typography>
              </Link>
            </Button>
          ))}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Avatar />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
