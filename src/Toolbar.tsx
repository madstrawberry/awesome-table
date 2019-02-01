import * as React from 'react';
import { AwesomeTableRenderProps } from './Features/AwesomeTable/awesomeTableModels';

interface Props extends AwesomeTableRenderProps {}

const Toolbar: React.FunctionComponent<Props> = ({ toggleComponent }) => {
  return <div style={{ background: 'pink', borderRadius: 5 }}>{toggleComponent()}</div>;
};

export default Toolbar;
