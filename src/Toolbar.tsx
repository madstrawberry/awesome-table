import * as React from 'react';
import { ToolbarProps } from './Features/AwesomeTable/AwesomeTable';
import ToggleColumns from './ToggleColumns';

interface Props extends ToolbarProps {}

const Toolbar: React.FunctionComponent<Props> = ({ cols, isColVisible, toggleColumn }) => {
  return (
    <div style={{ background: 'pink', borderRadius: 5 }}>
      <ToggleColumns cols={cols} isColVisible={isColVisible} toggleColumn={toggleColumn} />
    </div>
  );
};

export default Toolbar;
