import React from 'react';
import { Component } from 'react';

import { Button } from 'hetio-frontend-components';
import { CompoundTable } from './compound-table.js';
import { CompoundPredictionTable } from './compound-prediction-table.js';
import { DiseaseTable } from './disease-table.js';
import { DiseasePredictionTable } from './disease-prediction-table.js';
import { MetapathTable } from './metapath-table.js';

import './app.css';

// main app component
export class App extends Component {
  // initialize component
  constructor() {
    super();

    this.state = {};
    this.state.tab = 'compounds';
    this.state.compoundId = '';
    this.state.diseaseId = '';
  }

  setCompoundId = (id) => {
    this.setState({ compoundId: id });
  };

  setDiseaseId = (id) => {
    this.setState({ diseaseId: id });
  };

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
        <CompoundTable
          visible={this.state.tab === 'compounds'}
          setCompoundId={this.setCompoundId}
          compoundId={this.state.compoundId}
        />
        <CompoundPredictionTable
          visible={this.state.tab === 'compounds' && this.state.compoundId}
          compoundId={this.state.compoundId}
        />
        <DiseaseTable
          visible={this.state.tab === 'diseases'}
          setDiseaseId={this.setDiseaseId}
          diseaseId={this.state.diseaseId}
        />
        <DiseasePredictionTable
          visible={this.state.tab === 'diseases' && this.state.diseaseId}
          diseaseId={this.state.diseaseId}
        />
        <MetapathTable visible={this.state.tab === 'metapaths'} />
      </>
    );
  }
}
