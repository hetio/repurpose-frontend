import React from 'react';
import { Component } from 'react';

import { Button } from 'hetio-frontend-components';
import { fetchMainData } from './data.js';
import { fetchCompoundPredictions } from './data.js';
import { fetchDiseasePredictions } from './data.js';
import { Compounds } from './compounds.js';
import { CompoundInfo } from './compound-info.js';
import { CompoundPredictions } from './compound-predictions.js';
import { Diseases } from './diseases.js';
import { DiseaseInfo } from './disease-info.js';
import { DiseasePredictions } from './disease-predictions.js';
import { Metapaths } from './metapaths.js';

import './app.css';

// main app component
export class App extends Component {
  // initialize component
  constructor() {
    super();

    this.state = {};
    this.state.tab = 'compounds';
    this.state.compounds = [];
    this.state.diseases = [];
    this.state.metapaths = [];
    this.state.compound = null;
    this.state.disease = null;
    this.compoundPredictions = [];
    this.diseasePredictions = [];

    fetchMainData().then((results) =>
      this.setState(results, this.loadStateFromUrl)
    );
  }

  // when component mounds
  componentDidMount() {
    // listen for back/forward navigation (history)
    window.addEventListener('popstate', this.loadStateFromUrl);
  }

  // when component unmounts
  componentWillUnmount() {
    window.removeEventListener('popstate', this.loadStateFromUrl);
  }

  // set active tab
  setTab = (tab) => {
    this.setState({ tab: tab }, this.updateUrl);
  };

  // set selected compound
  setCompound = (compound) => {
    setCompound(compound).then((results) =>
      this.setState(results, this.updateUrl)
    );
  };

  // set selected disease
  setDisease = (disease) => {
    setDisease(disease).then((results) =>
      this.setState(results, this.updateUrl)
    );
  };

  // update url based on state
  updateUrl = () => {
    const params = new URLSearchParams();

    params.set('tab', this.state.tab);

    if (this.state.tab === 'compounds' && this.state.compound)
      params.set('id', this.state.compound.compound_id.replace(':', '_'));
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
    loadStateFromUrl(this.state).then((results) => this.setState(results));
  };

  // display component
  render() {
    return (
      <>
        <Button
          className='tab_button'
          disabled={this.state.tab !== 'compounds'}
          onClick={() => this.setTab('compounds')}
          tooltipText='Select a compound and show predictions for all diseases'
        >
          Compounds
        </Button>
        <Button
          className='tab_button'
          disabled={this.state.tab !== 'diseases'}
          onClick={() => this.setTab('diseases')}
          tooltipText='Select a disease and show predictions for all compounds'
        >
          Diseases
        </Button>
        <Button
          className='tab_button'
          disabled={this.state.tab !== 'metapaths'}
          onClick={() => this.setTab('metapaths')}
          tooltipText='Browse types of paths (metapaths) that connect compounds
           to disease and their ability to predict drug efficacy'
        >
          Metapaths
        </Button>
        <Compounds
          visible={this.state.tab === 'compounds'}
          compounds={this.state.compounds}
          setCompound={this.setCompound}
          compound={this.state.compound}
        />
        <CompoundInfo
          visible={this.state.tab === 'compounds'}
          compound={this.state.compound}
          compoundInfo={this.state.compoundInfo}
        />
        <CompoundPredictions
          visible={this.state.tab === 'compounds'}
          compound={this.state.compound}
          compoundPredictions={this.state.compoundPredictions}
        />
        <Diseases
          visible={this.state.tab === 'diseases'}
          diseases={this.state.diseases}
          setDisease={this.setDisease}
          disease={this.state.disease}
        />
        <DiseaseInfo
          visible={this.state.tab === 'diseases'}
          disease={this.state.disease}
          diseaseInfo={this.state.diseaseInfo}
        />
        <DiseasePredictions
          visible={this.state.tab === 'diseases'}
          disease={this.state.disease}
          diseasePredictions={this.state.diseasePredictions}
        />
        <Metapaths
          visible={this.state.tab === 'metapaths'}
          metapaths={this.state.metapaths}
        />
      </>
    );
  }
}

// set selected compound
async function setCompound(compound) {
  if (!compound)
    return {};

  const compoundPredictions = await fetchCompoundPredictions(
    compound.compound_id
  );
  return { compound: compound, ...compoundPredictions };
}

// set selected disease
async function setDisease(disease) {
  if (!disease)
    return {};

  const diseasePredictions = await fetchDiseasePredictions(disease.disease_id);
  return { disease: disease, ...diseasePredictions };
}

// load state from url
async function loadStateFromUrl(state) {
  // get parameters from url
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab');
  const id = (params.get('id') || '').replace('_', ':');

  let newState = {};

  // set tab
  if (tab)
    newState.tab = tab;

  // if compounds tab
  if (tab === 'compounds' && id) {
    // set compound and compound prediction
    newState.compound = state.compounds.find(
      (compound) => compound.compound_id === id
    );
    newState = { ...newState, ...(await setCompound(newState.compound)) };
  }

  // if diseases tab
  if (tab === 'diseases' && id) {
    // set disease and disease prediction
    newState.disease = state.diseases.find(
      (disease) => disease.disease_id === id
    );
    newState = { ...newState, ...(await setDisease(newState.disease)) };
  }

  return newState;
}
