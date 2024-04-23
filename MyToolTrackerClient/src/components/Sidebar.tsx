import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlusIcon from '@mui/icons-material/Add';
import EngineeringIcon from '@mui/icons-material/Engineering';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PeopleIcon from '@mui/icons-material/People';
import ConstructionIcon from '@mui/icons-material/Construction';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ApartmentIcon from '@mui/icons-material/Apartment';

const drawerWidth = 240;

export default function Sidebar() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          zIndex: 50,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        <ListItem key="Add Tool" disablePadding>
          <ListItemButton href="/add-tool">
            <ListItemIcon>
              <PlusIcon color="primary" />
            </ListItemIcon>
              <ListItemText primary="Add Tool" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Tools" disablePadding>
          <ListItemButton href="/tools">
            <ListItemIcon>
              <ConstructionIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Tools" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="Add Employee" disablePadding>
          <ListItemButton href="/add-employee">
            <ListItemIcon>
              <EngineeringIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add Employee" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Employees" disablePadding>
          <ListItemButton href="/employees">
            <ListItemIcon>
              <PeopleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="New Order Request" disablePadding>
          <ListItemButton href="/create-order-request">
            <ListItemIcon>
              <NoteAddIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="New Order Request" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="Add Company" disablePadding>
          <ListItemButton href="/add-company">
            <ListItemIcon>
              <AddBusinessIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add Company" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Companies" disablePadding>
          <ListItemButton href="/companies">
            <ListItemIcon>
              <ApartmentIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Companies" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
}
