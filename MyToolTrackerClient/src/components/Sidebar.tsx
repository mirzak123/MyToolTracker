"use client";

import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import {
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
  TableView,
} from "@mui/icons-material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ConstructionIcon from "@mui/icons-material/Construction";
import PlusIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import { Business, Work } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const drawerWidth = 240;

export default function Sidebar() {
  const [openTools, setOpenTools] = React.useState(false);
  const [openEmployees, setOpenEmployees] = React.useState(false);
  const [openCompanies, setOpenCompanies] = React.useState(false);
  const [openProjects, setOpenProjects] = React.useState(false);
  const [openOrderRequests, setOpenOrderRequests] = React.useState(false);
  const [open, setOpenDrawer] = React.useState(true);

  const handleToolsClick = () => {
    setOpenTools(!openTools);
  };

  const handleEmployeesClick = () => {
    setOpenEmployees(!openEmployees);
  };

  const handleCompaniesClick = () => {
    setOpenCompanies(!openCompanies);
  };

  const handleProjectsClick = () => {
    setOpenProjects(!openProjects);
  };

  const handleOrderRequestsClick = () => {
    setOpenOrderRequests(!openOrderRequests);
  };

  return (
    <>
      <IconButton
        sx={{
          position: "absolute",
          top: "50vh",
          left: open ? 220 : 10,
          zIndex: 1100,
          transition: "left 0.3s",
        }}
        onClick={() => setOpenDrawer(!open)}
      >
        {open ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            zIndex: 50,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItemButton onClick={handleOrderRequestsClick}>
            <ListItemIcon>
              <NoteAddIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Order Requests" />
            {openOrderRequests ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openOrderRequests} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/create-order-request" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <PlusIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Create" />
              </ListItemButton>
              <ListItemButton href="/order-requests" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <TableView color="primary" />
                </ListItemIcon>
                <ListItemText primary="View All" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        <Divider />
        <Divider />
        <List>
          <ListItemButton onClick={handleToolsClick}>
            <ListItemIcon>
              <ConstructionIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Tools" />
            {openTools ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openTools} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/add-tool" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <PlusIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Add" />
              </ListItemButton>
              <ListItemButton href="/tools" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <TableView color="primary" />
                </ListItemIcon>
                <ListItemText primary="View All" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          <ListItemButton onClick={handleEmployeesClick}>
            <ListItemIcon>
              <PeopleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Employees" />
            {openEmployees ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openEmployees} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/add-employee" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <PlusIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Add" />
              </ListItemButton>
              <ListItemButton href="/employees" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <TableView color="primary" />
                </ListItemIcon>
                <ListItemText primary="View All" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          <ListItemButton onClick={handleCompaniesClick}>
            <ListItemIcon>
              <Business color="primary" />
            </ListItemIcon>
            <ListItemText primary="Companies" />
            {openCompanies ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCompanies} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/add-company" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <PlusIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Add" />
              </ListItemButton>
              <ListItemButton href="/companies" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <TableView color="primary" />
                </ListItemIcon>
                <ListItemText primary="View All" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          <ListItemButton onClick={handleProjectsClick}>
            <ListItemIcon>
              <Work color="primary" />
            </ListItemIcon>
            <ListItemText primary="Projects" />
            {openProjects ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openProjects} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/add-project" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <PlusIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Add" />
              </ListItemButton>
              <ListItemButton href="/projects" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <TableView color="primary" />
                </ListItemIcon>
                <ListItemText primary="View All" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        <Divider />
      </Drawer>
    </>
  );
}
