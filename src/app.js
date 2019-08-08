import React from 'react';
import { Component } from 'react';

import { Button } from 'hetio-frontend-components';
import { Compounds } from './compounds.js';
import { CompoundInfo } from './compound-info.js';
import { CompoundPredictions } from './compound-predictions.js';
import { Diseases } from './diseases.js';
import { DiseaseInfo } from './disease-info.js';
import { DiseasePredictions } from './disease-predictions.js';
import { Metapaths } from './metapaths.js';
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
        <div
          style={{ display: this.state.tab === 'compounds' ? 'block' : 'none' }}
        >
          <Compounds
            compounds={this.state.compounds}
            setCompound={this.setCompound}
            compound={this.state.compound}
          />
          <div style={{ display: this.state.compound ? 'block' : 'none' }}>
            <CompoundInfo compound={this.state.compound} />
            <CompoundPredictions compound={this.state.compound} />
          </div>
        </div>
        <div
          style={{ display: this.state.tab === 'diseases' ? 'block' : 'none' }}
        >
          <Diseases
            diseases={this.state.diseases}
            setDisease={this.setDisease}
            disease={this.state.disease}
          />
          <div style={{ display: this.state.disease ? 'block' : 'none' }}>
            <DiseaseInfo disease={this.state.disease} />
            <DiseasePredictions disease={this.state.disease} />
          </div>
        </div>
        <div
          style={{ display: this.state.tab === 'metapaths' ? 'block' : 'none' }}
        >
          <Metapaths metapaths={this.state.metapaths} />
        </div>
      </>
    );
  }
}
