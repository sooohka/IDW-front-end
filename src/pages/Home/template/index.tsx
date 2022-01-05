import Sidebar from "@Components/layout/Sidebar";
import { Box, Toolbar } from "@mui/material";
import React from "react";
import Card from "../../../components/home/Card";
import LevelModal from "../../../components/home/LevelModal";
import Navbar from "../../../components/layout/Navbar";

interface IProps {
  worldCups: WorldCup[];
}
function Template({ worldCups }: IProps) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <Navbar />
      <Sidebar />
      <LevelModal />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar sx={(theme) => ({ height: theme.layout.header.height })} />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 23rem)",
            gap: 2,
          }}
        >
          {worldCups.map((v) => (
            <Card key={v.id} worldCup={v} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Template;
