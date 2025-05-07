'use client';
import React, { useState, MouseEvent } from 'react';
import { Box, Typography, Popover } from '@mui/material';

export interface ArrayCellProps {
  items?: Array<string | number>;
  maxVisible?: number;
}

export const DataTableArrayCell: React.FC<ArrayCellProps> = ({
  items = [],
  maxVisible = 2,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);
  const visibleItems = items.slice(0, maxVisible);
  const hiddenCount = items.length - maxVisible;

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!items || items.length === 0) {
    return <Typography variant="body2">———</Typography>;
  }

  return (
    <>
      <Box display="flex">
        <Typography variant="body2">
          {visibleItems.join('، ')}
          {hiddenCount > 0 && (
            <Typography
              component="span"
              sx={{
                cursor: 'pointer',
                ml: 0.5,
                color: 'primary.main',
                textDecoration: 'underline',
              }}
              onClick={handleOpen}
            >
              ... ({hiddenCount})
            </Typography>
          )}
        </Typography>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Box p={2} display="flex" flexDirection="column" gap="0.5rem">
          {items.map((item, idx) => (
            <Typography key={idx} variant="body2">
              {`${item}، `}
            </Typography>
          ))}
        </Box>
      </Popover>
    </>
  );
};
