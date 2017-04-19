import React from 'react';
import PropTypes from 'prop-types';
import { is, List } from 'immutable';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { FlatButton } from 'material-ui';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import { amber600, blueGrey600 } from 'material-ui/styles/colors';

import selector from './selectors';
import styles from './styles.scss';
import APP from '../../../../constants';

class Characters extends React.Component {

  constructor(props) {
    super(props);
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const rules = [
      !is(this.props.characters, nextProps.characters),
      this.props.favoriteSwitcher !== nextProps.favoriteSwitcher,
      this.props.searchFilter !== nextProps.searchFilter,
    ];

    return rules.some(item => item);
  }

  componentWillMount() {
    this.props.getList();
  }

  handleCellClick(rowId, columnId) {
    if (columnId === 1) {
      const character = this.props.characters.get(rowId);
      this.props.setFavoriteState(rowId, character.get('_id'), !character.get('isFavorite'));
    } else {
      this.props.setModalSource(rowId)
    }
  }

  render() {
    let headerFix = null;

    if (this.props.characters.size >= 12) {
      headerFix = <TableHeaderColumn className={styles.tableHeaderFix} />;
    }

    return (
      <div className={styles.vCharactersTable}>
        <div className={styles.tableCaption}>
          <span className={styles.title}>Characters table</span>
          <div className={styles.controlElements}>
            <div className={styles.badges}>
              <button
                className={this.props.favoriteSwitcher ? `${styles.selectedBadge} ${styles.badge}` : styles.badge}
                onClick={() => this.props.setFavoriteSwitcher(!this.props.favoriteSwitcher)}>
                <span>Display only favorites</span>
              </button>
            </div>
            <FlatButton
              className={styles.button}
              label="Add character"
              primary
              onTouchTap={() => this.props.setModalSource(null)}
            />
          </div>
        </div>

        <Table height="600px" selectable={false} onCellClick={this.handleCellClick}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn className={styles.stateColumn} />
              <TableHeaderColumn tooltip="Name" className={`${styles.tableHeaderColumn} ${styles.firstColumn}`}>
                Name
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Height" className={styles.tableHeaderColumn}>
                Height
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Mass" className={styles.tableHeaderColumn}>
                Mass
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Hair Color" className={styles.tableHeaderColumn}>
                Hair Color
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Skin Color" className={styles.tableHeaderColumn}>
                Skin Color
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Eye Color" className={styles.tableHeaderColumn}>
                Eye Color
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Birth Year" className={styles.tableHeaderColumn}>
                Birth Year
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Is Male" className={styles.tableHeaderColumn}>
                Is Male
              </TableHeaderColumn>
              { headerFix }
            </TableRow>
          </TableHeader>
          <TableBody showRowHover displayRowCheckbox={false}>
            {this.props.characters
              .map((row) => {
                const isMale = row.get('is_male') ? 'Yes' : 'No';
                const favorite = row.get('isFavorite') ? <Favorite color={amber600} className={styles.ico} /> :
                  <FavoriteBorder color={blueGrey600} className={styles.ico} />;

                return (
                  <TableRow key={row.get('_id')} className={styles.tableBodyRow}>
                    <TableRowColumn className={styles.stateColumn}>
                      { favorite }
                    </TableRowColumn>
                    <TableRowColumn className={styles.firstColumn}>{row.get('name')}</TableRowColumn>
                    <TableRowColumn>{row.get('height')}</TableRowColumn>
                    <TableRowColumn>{row.get('mass')}</TableRowColumn>
                    <TableRowColumn>{row.get('hair_color')}</TableRowColumn>
                    <TableRowColumn>{row.get('skin_color')}</TableRowColumn>
                    <TableRowColumn>{row.get('eye_color')}</TableRowColumn>
                    <TableRowColumn>{row.get('birth_year')}</TableRowColumn>
                    <TableRowColumn>{isMale}</TableRowColumn>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

Characters.propTypes = {
  characters: PropTypes.instanceOf(List),
  favoriteSwitcher: PropTypes.bool,
  searchFilter: PropTypes.string,
};

const mapStateToProps = state => ({
  characters: selector.selectCharacters(state),
  favoriteSwitcher: selector.selectFavoriteSwitcher(state),
  searchFilter: selector.selectSearchFilter(state),
});

const mapDispatchToProps = dispatch => ({
  getList: () => dispatch({ type: APP.CHARACTERS.GET_LIST }),
  setFavoriteSwitcher: (state) => dispatch({ type: APP.CHARACTERS.SET_FAVORITE_SWITCHER, state }),
  setFavoriteState: (rowId, docId, state) => dispatch({ type: APP.CHARACTERS.SET_FAVORITE_STATE, rowId, docId, state }),
  setModalSource: (rowId) => dispatch({ type: APP.CHARACTERS.SET_MODAL_SOURCE, rowId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Characters);
