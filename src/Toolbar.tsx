import * as React from 'react';
import { AwesomeTableRenderProps } from './Features/AwesomeTable/awesomeTableModels';

interface Props extends AwesomeTableRenderProps {}

const Toolbar: React.FunctionComponent<Props> = ({ renderColumnToggle }) => {
  return <div style={{ background: 'pink', borderRadius: 5 }}>{renderColumnToggle()}</div>;
};

export default Toolbar;
