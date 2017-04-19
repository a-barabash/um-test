import React from 'react';
import PropTypes from 'prop-types';
import { is, Map } from 'immutable';
import { connect } from 'react-redux';
import { Checkbox, Dialog, FlatButton, TextField } from 'material-ui';

import Progress from './components/Progress';
import selector from './selectors';
import styles from './styles.scss';
import APP from '../../../../constants';

class CharacterModal extends React.Component {

  constructor(props) {
    super(props);
    this.onDataChange = this.onDataChange.bind(this);
    this.saveCharacter = this.saveCharacter.bind(this);
    this.deleteCharacter = this.deleteCharacter.bind(this);
    this.state = { character: this.props.character };
  }

  componentWillReceiveProps(nextProps) {
    if (!is(this.props.character, nextProps.character)) {
      this.setState({ character: nextProps.character });
    }
  }

  onDataChange(e, newValue) {
    this.setState({ character: this.state.character.set(e.currentTarget.attributes.name.value, newValue) });
  }

  saveCharacter() {
    this.props.saveCharacter(this.state.character.toObject(), this.props.source.toObject());
  }

  deleteCharacter() {
    this.props.deleteCharacter(this.state.character.get('_id'));
  }

  render() {
    let content = null;

    if (this.props.source.size) {
      let title = 'Add character';
      let deleteBtn = null;

      if (this.props.source.get('rowId') !== null) {
        title = 'Edit character';
        deleteBtn = <FlatButton label="Delete" secondary onTouchTap={this.deleteCharacter} />
      }

      const actions = (
        <div className={styles.modalFooter}>
          { deleteBtn }
          <div className={styles.controlElements}>
            <FlatButton label="Save" primary onTouchTap={this.saveCharacter} />
            <FlatButton label="Close" primary onTouchTap={this.props.clearSource} />
          </div>
          <Progress />
        </div>
      );

      content = (
        <Dialog
          actions={actions}
          contentClassName={styles.vCharacterModal}
          titleClassName={styles.title}
          title={title}
          open={true}
          onRequestClose={this.props.clearSource}
          autoScrollBodyContent
        >
          <div className={styles.grid}>
            <div className={styles.row}>
              <div className={styles.cell}>
                <TextField
                  name="name"
                  floatingLabelText="Name"
                  errorText={this.props.errors.getIn(['name', 'message'])}
                  value={this.state.character.get('name')}
                  fullWidth
                  onChange={this.onDataChange}
                />
              </div>
              <div className={`${styles.cell} ${styles.last}`}>
                <TextField
                  name="height"
                  floatingLabelText="Height"
                  errorText={this.props.errors.getIn(['height', 'message'])}
                  value={this.state.character.get('height')}
                  fullWidth
                  onChange={this.onDataChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.cell}>
                <TextField
                  name="mass"
                  floatingLabelText="Mass"
                  errorText={this.props.errors.getIn(['mass', 'message'])}
                  value={this.state.character.get('mass')}
                  fullWidth
                  onChange={this.onDataChange}
                />
              </div>
              <div className={`${styles.cell} ${styles.last}`}>
                <TextField
                  name="hair_color"
                  floatingLabelText="Hair Color"
                  errorText={this.props.errors.getIn(['hair_color', 'message'])}
                  value={this.state.character.get('hair_color')}
                  fullWidth
                  onChange={this.onDataChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.cell}>
                <TextField
                  name="skin_color"
                  floatingLabelText="Skin Color"
                  errorText={this.props.errors.getIn(['skin_color', 'message'])}
                  value={this.state.character.get('skin_color')}
                  fullWidth
                  onChange={this.onDataChange}
                />
              </div>
              <div className={`${styles.cell} ${styles.last}`}>
                <TextField
                  name="eye_color"
                  floatingLabelText="Eye Color"
                  errorText={this.props.errors.getIn(['eye_color', 'message'])}
                  value={this.state.character.get('eye_color')}
                  fullWidth
                  onChange={this.onDataChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.cell}>
                <TextField
                  name="birth_year"
                  floatingLabelText="Birth Year"
                  errorText={this.props.errors.getIn(['birth_year', 'message'])}
                  value={this.state.character.get('birth_year')}
                  fullWidth
                  onChange={this.onDataChange}
                />
              </div>
              <div className={`${styles.cell} ${styles.last} ${styles.checkbox}`}>
                <Checkbox
                  name="is_male"
                  label="Is Male"
                  checked={this.state.character.get('is_male')}
                  onCheck={this.onDataChange}
                />
              </div>
            </div>
          </div>
        </Dialog>
      )
    }

    return (
      <div>
        { content }
      </div>
    );
  }
}

CharacterModal.propTypes = {
  source: PropTypes.instanceOf(Map),
  character: PropTypes.instanceOf(Map),
  errors: PropTypes.instanceOf(Map),
  clearData: PropTypes.func,
};

const mapStateToProps = state => ({
  source: selector.selectSource(state),
  character: selector.selectCharacterData(state),
  errors: selector.selectErrors(state),
  clearData: React.PropTypes.func,
});

const mapDispatchToProps = dispatch => ({
  clearSource: () => dispatch({ type: APP.CHARACTERS.SET_MODAL_SOURCE }),
  saveCharacter: (character, source) => dispatch({ type: APP.CHARACTERS.SAVE, character, source }),
  deleteCharacter: (docId) => dispatch({ type: APP.CHARACTERS.DELETE, docId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CharacterModal);
