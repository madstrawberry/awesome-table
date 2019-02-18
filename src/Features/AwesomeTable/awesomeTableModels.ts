type RenderableElement = string | number | null | JSX.Element;

export interface Cols {
  [colName: string]: ColContent;
}

export interface ColContent {
  content: RenderableElement;
  disableToggle?: boolean;
  disableSort?: boolean;
}

export interface Row {
  id: string | number;
  detailsRow?: string | JSX.Element;
  cols: {
    [colName: string]: RowContent;
  };
}

export type RowContent = string | number | null | RowElementContent;

export interface RowElementContent {
  sortString: string;
  content: RenderableElement;
}

export interface RenderTableProps {
  rows: Row[];
  noResults?: RenderableElement;
  error?: RenderableElement;
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
