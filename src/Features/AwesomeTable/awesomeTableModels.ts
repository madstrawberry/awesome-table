import { TableCellProps } from '@material-ui/core/TableCell';
import { TableRowProps } from '@material-ui/core/TableRow';

type RenderableElement = string | number | null | JSX.Element;

export interface Cols {
  [colName: string]: ColContent;
}

export interface ColContent {
  content: RenderableElement;
  disableToggle?: boolean;
  disableSort?: boolean;
  ColComponent: React.ComponentType<TableCellProps>;
}

export interface Row {
  id: string | number;
  detailsRow?: string | JSX.Element;
  detailsToggle?: JSX.Element;
  selectToggle?: JSX.Element;
  isRowSelected?: boolean;
  isRowActive?: boolean;
  cols: {
    [colName: string]: RowContent;
  };
}

export type RowContent = string | number | null | RowElementContent;

export interface RowElementContent {
  sortString: string | number;
  content: RenderableElement;
  ColComponent?: React.ComponentType<TableCellProps>;
}

export interface AdditionalTableRowProps {
  isRowSelected?: boolean;
  isRowActive?: boolean;
}

export interface RenderTableProps {
  rows: Row[];
  noResults?: RenderableElement;
  error?: RenderableElement;
  bulkSelect?: JSX.Element;
  TableBodyRowComponent: React.ComponentType<TableRowProps & AdditionalTableRowProps>;
}

export interface AwesomeTableRenderProps {
  renderColumnToggle: () => JSX.Element;
  renderTable: (props: RenderTableProps) => JSX.Element;
  sortRow: (colName: string) => void;
  toggleCol: (colName: string) => void;
}

export interface SortOrder {
  name: string;
  sortAsc: boolean;
}
