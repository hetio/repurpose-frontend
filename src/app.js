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

    // listen for back/forward navigation (history)
    window.addEventListener('popstate', this.loadStateFromUrl);
  }

  // when component mounts
  componentDidMount() {
    this.loadStateFromUrl();
  }

  // set active tab
  setTab = (tab) => {
    this.setState({ tab: tab }, this.updateUrl);
  };

  // set selected compound
  setCompoundId = (id) => {
    this.setState({ compoundId: id }, this.updateUrl);
  };

  // set selected disease
  setDiseaseId = (id) => {
    this.setState({ diseaseId: id }, this.updateUrl);
  };

  // update url based on state
  updateUrl = () => {
    const params = new URLSearchParams();
    params.set('tab', this.state.tab);
    if (this.state.tab === 'compounds')
      params.set('id', this.state.compoundId);
    if (this.state.tab === 'diseases')
      params.set('id', this.state.diseaseId.replace(':', '_'));

    const url =
      window.location.origin +
      window.location.pathname +
      '?' +
      params.toString();
    window.history.pushState({}, '', url);

    document.title = params.get('id');
  };

  // load state from url
  loadStateFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const newState = {};
    newState.tab = params.get('tab');
    if (newState.tab === 'compounds')
      newState.compoundId = params.get('id');
    if (newState.tab === 'diseases')
      newState.diseaseId = params.get('id').replace('_', ':');

    this.setState(newState);
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
          onClick={() => this.setTab('compounds')}
        >
          Compounds
        </Button>
        <Button
          className='tab_button'
          disabled={this.state.tab !== 'diseases'}
          onClick={() => this.setTab('diseases')}
        >
          Diseases
        </Button>
        <Button
          className='tab_button'
          disabled={this.state.tab !== 'metapaths'}
          onClick={() => this.setTab('metapaths')}
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
