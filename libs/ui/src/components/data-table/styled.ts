import { styled } from '@mui/material/styles';

export const TableContainer = styled('div')({
  width: '100%',
  overflowX: 'auto',
});

export const Table = styled('table')(() => ({
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0 0.25rem',
  marginBottom: '0.25rem',
  boxSizing: 'border-box',
}));

export const TableHeader = styled('thead')(({ theme }) => ({
  '& tr': {
    height: '52px',
  },

  '& th': {
    backgroundColor: theme.palette.grey[200],
    paddingInline: '0.5rem',
    textAlign: 'right',
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 500,

    '&:first-child': {
      borderTopRightRadius: '10px',
      borderBottomRightRadius: '10px',
    },

    '&:last-child': {
      borderTopLeftRadius: '10px',
      borderBottomLeftRadius: '10px',
    },
  },
}));

export const TableBody = styled('tbody')(({ theme }) => ({
  '& tr': {
    height: '48px',
    backgroundColor: theme.palette.grey[50],
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
      '& td': {
        borderColor: theme.palette.grey[300],
      },
    },
  },

  '& td': {
    paddingInline: '0.5rem',
    borderBlock: `1px solid ${theme.palette.grey[200]}`,
    textAlign: 'right',
    fontSize: theme.typography.body1.fontSize,

    '&:first-child': {
      borderRight: `1px solid ${theme.palette.grey[200]}`,
      borderTopRightRadius: '10px',
      borderBottomRightRadius: '10px',
    },

    '&:last-child': {
      borderLeft: `1px solid ${theme.palette.grey[200]}`,
      borderTopLeftRadius: '10px',
      borderBottomLeftRadius: '10px',
    },
  },
  '& tr[data-selected] td': {
    borderColor: theme.palette.grey[300],
    backgroundColor: theme.palette.grey[200],
  },
}));

export const Footer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '52px',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  paddingInline: '1rem',
  borderRadius: '10px',
  backgroundColor: theme.palette.grey[50],
}));

export const PaginationContainer = styled('div')(() => ({
  display: 'flex',
  gap: '0.25rem',
}));

export const PaginationButton = styled('button')(({ theme, disabled }) => ({
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: '4px',
  padding: '0.25rem 0.5rem',
  backgroundColor: theme.palette.common.white,
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? 0.5 : 1,
  height: '28px',
}));

export const PaginationInput = styled('input')(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: '4px',
  paddingInline: '0.5rem',
  width: '4rem',
  height: '28px',
  boxSizing: 'border-box',
}));

export const PaginationSelect = styled('select')(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: '4px',
  padding: '0.25rem 0.5rem',
  height: '28px',
}));

export const ActionBarContainer = styled('div')({
  marginTop: '1rem',
});

export const FlexContainer = styled('span')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
});
