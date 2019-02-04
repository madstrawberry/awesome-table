import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import { Col } from './awesomeTableModels';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

interface Props {
  cols: Col;
  isColVisible: (col: string) => boolean;
  toggleCol: (col: string) => void;
}

interface State {
  anchorEl: null | HTMLElement;
}

class ColumnToggle extends React.Component<Props, State> {
  state: State = {
    anchorEl: null,
  };

  toggleModal = (anchorEl: HTMLElement | null) => {
    this.setState({ anchorEl });
  };

  public render() {
    const { anchorEl } = this.state;
    const { cols, toggleCol, isColVisible } = this.props;

    return (
      <>
        <IconButton
          aria-owns={anchorEl ? 'toggle-columns' : undefined}
          aria-haspopup="true"
          onClick={e => this.toggleModal(e.currentTarget)}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="toggle-columns"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.toggleModal(null)}
        >
          {Object.keys(cols).map(col => (
            <MenuItem
              style={{ paddingLeft: 0 }}
              key={col}
              disabled={cols[col].disableToggle}
              onClick={() => toggleCol(col)}
            >
              <Checkbox checked={isColVisible(col)} disabled={cols[col].disableToggle} />
              {cols[col].title}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }
}

export default ColumnToggle;
