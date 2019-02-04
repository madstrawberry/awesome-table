export interface Col {
  [colName: string]: ColContent;
}

export interface Row {
  [colName: string]: RowContent;
}

export interface ColContent {
  id: string;
  title: string;
  disableToggle: boolean;
  disableSort: boolean;
}

export type RowContent = string | RowElementContent;

export interface RowElementContent {
  sortString: string;
  content: JSX.Element;
}

export interface AwesomeTableRenderProps {
  // cols: Col;
  // isColVisible: (col: string) => boolean;
  // toggleColumn: (col: string) => void;
  renderColumnToggle: () => JSX.Element;
}

export interface SortOrder {
  name: string;
  order: 'ASC' | 'DESC';
}
