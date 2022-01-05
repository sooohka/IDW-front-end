import { useCategoryContext } from "@Contexts/CategoryContextProvider";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import React from "react";

const drawerWidth = "20rem";
function Sidebar() {
  const { categories } = useCategoryContext();

  const sortList = [
    { name: "인기순", id: 1 },
    { name: "오래된 날짜순", id: 2 },
  ];
  return (
    <Drawer
      sx={(theme) => ({
        pt: 3,
        width: theme.layout.sidebar.width,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          pt: 3,
          boxSizing: "border-box",
          width: theme.layout.sidebar.width,
        },
      })}
      variant='permanent'
      anchor='left'
    >
      <Toolbar />
      <Box>
        <List sx={{ pl: 2 }}>
          <Typography gutterBottom variant='h4' sx={{ fontWeight: "bold" }}>
            카테고리
          </Typography>
          <Divider sx={{ borderBottomWidth: 7, borderColor: "common.black" }} />
          {categories.map((category) => (
            <ListItem button key={category.id}>
              <ListItemText primary={category.name} />
            </ListItem>
          ))}
        </List>
        <List sx={{ pl: 2 }}>
          <Typography gutterBottom variant='h4' sx={{ fontWeight: "bold" }}>
            정렬
          </Typography>
          <Divider sx={{ borderBottomWidth: 7, borderColor: "common.black" }} />
          {sortList.map((listItem) => (
            <ListItem button key={listItem.id}>
              <ListItemText primary={listItem.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
