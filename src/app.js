import React from 'react';
import { Component } from 'react';

import { Button } from 'hetio-frontend-components';
import { CompoundTable } from './compound-table.js';
import { DiseaseTable } from './disease-table.js';
import { MetapathsTable } from './metapath-table.js';

import './app.css';

// main app component
export class App extends Component {
  // initialize component
  constructor() {
    super();

    this.state = {};
    this.state.tab = 'compounds';
  }

  // display component
  render() {
    return (
      <>
        {/* load global, site-wide styles from het.io */}
        <link
          rel='stylesheet'
          type='text/css'
          href='https://het.io/global.css'
        />
        <Button
          className='tab_button'
          disabled={this.state.tab !== 'compounds'}
          onClick={() => this.setState({ tab: 'compounds' })}
          >
          Compounds
        </Button>
        <Button
          className='tab_button'
          disabled={this.state.tab !== 'diseases'}
          onClick={() => this.setState({ tab: 'diseases' })}
          >
          Diseases
        </Button>
        <Button
          className='tab_button'
          disabled={this.state.tab !== 'metapaths'}
          onClick={() => this.setState({ tab: 'metapaths' })}
        >
          Metapaths
        </Button>
        <CompoundTable visible={this.state.tab === 'compounds'}/>
        <DiseaseTable visible={this.state.tab === 'diseases'}/>
        <MetapathsTable visible={this.state.tab === 'metapaths'}/>
      </>
    );
  }
}
