export interface Col {
  [colName: string]: ColContent;
}

export interface Row {
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
}

export interface SortOrder {
  name: string;
  sortAsc: boolean;
}
