import React from 'react';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import uuid from 'uuid';

interface Props {
  cols: string[];
  isColVisible: (col: string) => boolean;
  toggleColumn: (col: string) => void;
}

interface State {
  anchorEl: null | HTMLElement;
}

class ToggleColumns extends React.Component<Props, State> {
  state: State = {
    anchorEl: null,
  };

  toggleModal = (anchorEl: HTMLElement | null) => {
    this.setState({ anchorEl });
  };

  public render() {
    const { anchorEl } = this.state;
    const { cols, toggleColumn, isColVisible } = this.props;

    return (
      <>
        <Button
          aria-owns={anchorEl ? 'toggle-columns' : undefined}
          aria-haspopup="true"
          onClick={e => this.toggleModal(e.currentTarget)}
        >
          Set columns
        </Button>
        <Menu
          id="toggle-columns"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.toggleModal(null)}
        >
          {cols.map(col => (
            <MenuItem style={{ paddingLeft: 0 }} key={uuid()} onClick={() => toggleColumn(col)}>
              <Checkbox checked={isColVisible(col)} />
              {col}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }
}

export default ToggleColumns;
