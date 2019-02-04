import * as React from 'react';
import { AwesomeTableRenderProps } from './Features/AwesomeTable/awesomeTableModels';

interface Props {
  renderColumnToggle: AwesomeTableRenderProps['renderColumnToggle'];
}

const Toolbar: React.FunctionComponent<Props> = ({ renderColumnToggle }) => {
  return <div style={{ background: 'pink', borderRadius: 5 }}>{renderColumnToggle()}</div>;
};

export default Toolbar;
