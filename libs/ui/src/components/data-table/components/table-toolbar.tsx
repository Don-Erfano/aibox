import { Box, Grid, Typography } from '@mui/material';
import theme from '@/theme';
import { SearchIconButton } from '@/components/CustomTable/shared/SearchIconButton';
import {
  InnerAccardionSummary,
  StyledAccardion,
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledChip,
  StyledFormButtonsWrapper,
  StyledIconsContainer,
  TableNameWrapper,
} from './styled';
import React, { useMemo, useState } from 'react';
import { TableFilterProps } from '../types';
import { IconButton } from '@/components/atoms/CustomButton/IconButton';
import { DeleteIcon, FilterIcon } from '@/assets/icons';
import { DataTableToolbarFilter } from './table-filters';
import { DataTableViewOptions } from './table-view';
import { StyledFilterChild } from '@/components/pages/dashboard/image-recognition/FilterChild/styled';
import { EFilterTableNameIcon } from '@/components/template/FilterContainer/type';
import { CustomButton } from '@/components/atoms/CustomButton';
import { generalStr } from '@/strings';
import { FilterChipsBar } from './filter-chips-bar';
import { tablePhrases } from '@/components/CustomTable/strings';

export function DataTableToolbar<TData>({
  table,
  tableName,
  showSearchIcon = true,
  submitFilters,
  resetFilters,
  removeFilter,
  activeFilterChips,
  filterCount,
}: TableFilterProps<TData>) {
  const [collapse, setCollapse] = useState(false);
  const [showSearch, setShowSearch] = useState(showSearchIcon);

  const handleIconClick = (name: EFilterTableNameIcon) => {
    switch (name) {
      case EFilterTableNameIcon.FILTER:
        setCollapse((prev) => !prev);
        break;

      case EFilterTableNameIcon.SEARCH:
        setShowSearch(true);
        break;

      default:
        break;
    }
  };

  const columns = useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table]
  );

  const onSubmit = () => {
    submitFilters();
    setCollapse(false);
  };

  const onCancel = () => {
    table.resetColumnFilters();
    setCollapse(false);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <StyledAccardion expanded={collapse}>
          <StyledAccordionSummary
            sx={{
              backgroundColor: theme.palette.grey[100],
            }}
          >
            <InnerAccardionSummary>
              <Box
                display="flex"
                gap="0.5rem"
                flexDirection="column"
                alignItems="flex-end"
              >
                <StyledIconsContainer gap="0.5rem">
                  {activeFilterChips.length > 0 && (
                    <IconButton
                      icon={<DeleteIcon />}
                      onClick={resetFilters}
                      hasBorder
                    />
                  )}
                  {showSearchIcon && (
                    <SearchIconButton
                      onHandleIconClick={handleIconClick}
                      active={showSearch}
                      search={showSearch}
                      setSearch={setShowSearch}
                    />
                  )}
                  <IconButton
                    tooltip={generalStr.filter}
                    onClick={() => {
                      handleIconClick(EFilterTableNameIcon.FILTER);
                    }}
                    key={tablePhrases.filtering}
                    icon={<FilterIcon />}
                    className={collapse ? 'active' : ''}
                    hasBorder
                  />
                  <DataTableViewOptions table={table} />
                </StyledIconsContainer>

                <Box display="flex" gap="0.5rem">
                  <FilterChipsBar
                    chips={activeFilterChips}
                    onRemove={removeFilter}
                    chipCount={filterCount}
                  />
                </Box>
              </Box>
              <TableNameWrapper>
                <Typography variant="body1" color={theme.palette.primary.main}>
                  {tableName}
                </Typography>
                {filterCount > 0 ? <StyledChip label={filterCount} /> : null}
              </TableNameWrapper>
            </InnerAccardionSummary>
          </StyledAccordionSummary>

          <StyledAccordionDetails>
            <StyledFilterChild container spacing={{ xs: 0, md: 8 }}>
              {columns.map((column) => (
                <Grid item xs={12} md={4} key={column.id}>
                  <DataTableToolbarFilter column={column} />
                </Grid>
              ))}
              <StyledFormButtonsWrapper>
                <CustomButton type="submit" onClick={onSubmit}>
                  {generalStr.submit}
                </CustomButton>
                <CustomButton onClick={onCancel} variant="outlined">
                  {generalStr.refuse}
                </CustomButton>
              </StyledFormButtonsWrapper>
            </StyledFilterChild>
          </StyledAccordionDetails>
        </StyledAccardion>
      </div>
    </div>
  );
}
