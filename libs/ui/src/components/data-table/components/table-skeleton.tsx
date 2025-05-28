import { TableCell, TableRow } from '../../table';

export const TableSkeleton = ({
  columnCount,
  rowCount = 10,
  cellWidths = ['auto'],
  shrinkZero = false,
}: {
  columnCount: number;
  rowCount?: number;
  shrinkZero?: boolean;
  cellWidths?: string[];
}) => {
  const cozyCellWidths = Array.from(
    { length: columnCount },
    (_, index) => cellWidths[index % cellWidths.length] ?? 'auto'
  );

  return (
    <>
      {Array.from({ length: rowCount }).map((_, index) => (
        <TableRow key={`skeleton-${index}`}>
          {Array.from({ length: columnCount }).map((_, cellIndex) => (
            <TableCell
              key={`skeleton-cell-${cellIndex}`}
              className="h-12"
              style={{
                width: cozyCellWidths[cellIndex],
                minWidth: shrinkZero ? cozyCellWidths[cellIndex] : 'auto',
              }}
            >
              <div className="h-4 bg-gray-100 rounded animate-pulse" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
