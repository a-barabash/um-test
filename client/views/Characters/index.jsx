import React from 'react';
import { connect } from 'react-redux';

import Table from './components/Table';
import Modal from './components/Modal';

class Characters extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Table/>
        <Modal/>
      </div>
    );
  }
}

export default connect(null, null)(Characters);
