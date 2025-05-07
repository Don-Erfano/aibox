'use client';

import React from 'react';
import { flexRender, type Header } from '@tanstack/react-table';
import {
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
  CloseIcon,
  EyeOffIcon,
} from '@/assets/icons';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';

interface DataTableColumnHeaderProps<TData, TValue> {
  header: Header<TData, TValue>;
}

export function DataTableColumnHeader<TData, TValue>({
  header,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box display="flex" alignItems="center" gap="0.25rem">
        <Typography>
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </Typography>
        <IconButton onClick={handleOpen}>
          {header.column.getCanSort() &&
            (header.column.getIsSorted() === 'desc' ? (
              <ChevronDownIcon fontSize="medium" />
            ) : header.column.getIsSorted() === 'asc' ? (
              <ChevronUpIcon fontSize="medium" />
            ) : (
              <ChevronsUpDownIcon fontSize="medium" />
            ))}
        </IconButton>
      </Box>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {header.column.getCanSort() && (
          <>
            <MenuItem onClick={() => header.column.toggleSorting(false)}>
              <ListItemIcon>
                <ChevronUpIcon />
              </ListItemIcon>
              <ListItemText primary="صعودی" />
            </MenuItem>
            <MenuItem onClick={() => header.column.toggleSorting(true)}>
              <ListItemIcon>
                <ChevronDownIcon />
              </ListItemIcon>
              <ListItemText primary="نزولی" />
            </MenuItem>
            {header.column.getIsSorted() && (
              <MenuItem onClick={() => header.column.clearSorting()}>
                <ListItemIcon>
                  <CloseIcon />
                </ListItemIcon>
                <ListItemText primary="پاکسازی" />
              </MenuItem>
            )}
          </>
        )}
        {header.column.getCanHide() && (
          <MenuItem onClick={() => header.column.toggleVisibility(false)}>
            <ListItemIcon>
              <EyeOffIcon />
            </ListItemIcon>
            <ListItemText primary="مخفی" />
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
