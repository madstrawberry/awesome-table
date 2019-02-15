export interface Col {
  [colName: string]: ColContent;
}

export interface Row {
  id: string | number;
  detailsRow?: string | JSX.Element;
  cols: {
    [colName: string]: RowContent;
  };
}

export interface ColContent {
  title: string;
  disableToggle?: boolean;
  disableSort?: boolean;
}

export type RowContent = string | number | null | RowElementContent;

export interface RowElementContent {
  sortString: string;
  content: JSX.Element;
}

export interface AwesomeTableRenderProps {
  renderColumnToggle: () => JSX.Element;
  renderTable: (rows: Row[]) => JSX.Element;
  sortRow: (colName: string) => void;
  toggleCol: (colName: string) => void;
}

export interface SortOrder {
  name: string;
  sortAsc: boolean;
}
