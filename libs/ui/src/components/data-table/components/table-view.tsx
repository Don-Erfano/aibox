import React from 'react';
import { Table } from '@tanstack/react-table';
import {
  Popover,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Box,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { CustomInput } from '@/components/atoms/CustomInput/CustomInput';
import { IconButton } from '@/components/atoms/CustomButton/IconButton';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSearchTerm('');
  };

  const open = Boolean(anchorEl);
  const id = open ? 'column-view-popover' : undefined;

  const allColumns = React.useMemo(
    () =>
      table
        .getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== 'undefined' && column.getCanHide()
        ),
    [table]
  );

  const filtered = React.useMemo(
    () =>
      allColumns.filter((col) => {
        const label = col.columnDef.meta?.label ?? col.id;
        return label.toLowerCase().includes(searchTerm.toLowerCase());
      }),
    [allColumns, searchTerm]
  );

  return (
    <>
      <IconButton
        icon={<SettingsIcon />}
        tooltip="Toggle columns"
        onClick={handleOpen}
        hasBorder
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        PaperProps={{ sx: { width: 240, p: 1 } }}
      >
        <Box sx={{ mb: 1 }}>
          <CustomInput
            fullWidth
            size="small"
            placeholder="جستجو..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        <List dense>
          {filtered.length > 0 ? (
            filtered.map((column) => {
              const label = column.columnDef.meta?.label ?? column.id;
              const visible = column.getIsVisible();
              return (
                <ListItem
                  key={column.id}
                  onClick={() => column.toggleVisibility(!visible)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={visible}
                      tabIndex={-1}
                      disableRipple
                      size="small"
                    />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItem>
              );
            })
          ) : (
            <ListItem>
              <ListItemText primary="ستونی یافت نشد" />
            </ListItem>
          )}
        </List>
      </Popover>
    </>
  );
}
