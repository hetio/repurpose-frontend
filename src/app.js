import React from 'react';
import { Component } from 'react';

import { Button } from 'hetio-frontend-components';
import { CompoundTable } from './compound-table.js';
import { CompoundPredictionTable } from './compound-prediction-table.js';
import { DiseaseTable } from './disease-table.js';
import { DiseasePredictionTable } from './disease-prediction-table.js';
import { MetapathTable } from './metapath-table.js';
import { ItemInfo } from './item-info.js';
import { fetchData } from './data.js';

import './app.css';

// main app component
export class App extends Component {
  // initialize component
  constructor() {
    super();

    this.state = {};
    this.state.tab = 'compounds';
    this.state.compound = null;
    this.state.disease = null;
    this.state.compounds = [];
    this.state.diseases = [];
    this.state.metapaths = [];

    // listen for back/forward navigation (history)
    window.addEventListener('popstate', this.loadStateFromUrl);

    fetchData().then((results) => {
      this.setState(
        {
          compounds: results.compounds,
          diseases: results.diseases,
          metapaths: results.metapaths
        },
        this.loadStateFromUrl
      );
    });
  }

  // set active tab
  setTab = (tab) => {
    this.setState({ tab: tab }, this.updateUrl);
  };

  // set selected compound
  setCompound = (compound) => {
    this.setState({ compound: compound }, this.updateUrl);
  };

  // set selected disease
  setDisease = (disease) => {
    this.setState({ disease: disease }, this.updateUrl);
  };

  // update url based on state
  updateUrl = () => {
    const params = new URLSearchParams();
    params.set('tab', this.state.tab);
    if (this.state.tab === 'compounds' && this.state.compound)
      params.set('id', this.state.compound.compound_id);
    if (this.state.tab === 'diseases' && this.state.disease)
      params.set('id', this.state.disease.disease_id.replace(':', '_'));

    const url =
      window.location.origin +
      window.location.pathname +
      '?' +
      params.toString();
    window.history.pushState({}, '', url);

    if (params.get('id'))
      document.title = params.get('id');
  };

  // load state from url
  loadStateFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const newState = {};
    if (params.get('tab'))
      newState.tab = params.get('tab');
    let id = params.get('id');
    if (newState.tab === 'compounds') {
      newState.compound = this.state.compounds.find(
        (compound) => compound.compound_id === id
      );
    }
    if (newState.tab === 'diseases') {
      if (id)
        id = id.replace('_', ':');
      newState.disease = this.state.diseases.find(
        (disease) => disease.disease_id === id
      );
    }

    this.setState(newState);
  };

  // display component
  render() {
    return (
      <>
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
          data={this.state.compounds}
          visible={this.state.tab === 'compounds'}
          setCompound={this.setCompound}
          compound={this.state.compound}
        />
        <DiseaseTable
          data={this.state.diseases}
          visible={this.state.tab === 'diseases'}
          setDisease={this.setDisease}
          disease={this.state.disease}
        />
        <ItemInfo
          visible={
            this.state.tab === 'compounds' || this.state.tab === 'diseases'
          }
          item={
            this.state.tab === 'compounds'
              ? this.state.compound
              : this.state.tab === 'diseases'
                ? this.state.disease
                : null
          }
        />
        <CompoundPredictionTable
          visible={this.state.tab === 'compounds' && this.state.compound}
          compound={this.state.compound}
        />
        <DiseasePredictionTable
          visible={this.state.tab === 'diseases' && this.state.disease}
          disease={this.state.disease}
        />
        <MetapathTable
          data={this.state.metapaths}
          visible={this.state.tab === 'metapaths'}
        />
      </>
    );
  }
}
