export interface Col {
  [colName: string]: ColContent;
}

export interface Row {
  id: string;
  [colName: string]: RowContent;
}

export interface ColContent {
  id: string;
  title: string;
  disableToggle?: boolean;
  disableSort?: boolean;
}

export type RowContent = string | RowElementContent;

export interface RowElementContent {
  sortString: string;
  content: JSX.Element;
}

export interface AwesomeTableRenderProps {
  renderColumnToggle: () => JSX.Element;
  renderTable: () => JSX.Element;
  sortRow: (colName: string) => void;
  toggleCol: (colName: string) => void;
}

export interface SortOrder {
  name: string;
  sortAsc: boolean;
}
