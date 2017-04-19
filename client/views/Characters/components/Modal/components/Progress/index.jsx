import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgress, Dialog } from 'material-ui';

import progressSelector from './selectors';

import styles from '../../styles.scss';

class Progress extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.show !== nextProps.show;
  }

  render() {
    return (
      <Dialog
        className={styles['vCharacterModal-transparent']}
        contentClassName={styles.content}
        open={this.props.show}
        modal
      >
        <div className={styles.progress}>
          <CircularProgress size={80} thickness={5} />
        </div>
      </Dialog>
    );
  }
}

Progress.propTypes = {
  show: PropTypes.bool,
};

const mapStateToProps = state => ({
  show: progressSelector.selectVisibility(state),
});

export default connect(mapStateToProps, null)(Progress);
