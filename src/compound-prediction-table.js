import React from 'react';
import { Component } from 'react';

import { assembleData } from './util.js';
import { Button } from 'hetio-frontend-components';
import { Table } from 'hetio-frontend-components';
import { toComma } from 'hetio-frontend-components';
import { toFixed } from 'hetio-frontend-components';

const dataUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-rep-data/1a960f0e353586f8fe9f61b569919f24603d4344/browser-tables/compound/';

export class CompoundPredictionTable extends Component {
  // initialize component
  constructor(props) {
    super(props);

    this.state = {};
    this.state.data = [];
  }

  // when component updates
  componentDidUpdate(prevProps) {
    if (this.props.compoundId !== prevProps.compoundId) {
      fetch(dataUrl + this.props.compoundId + '.json')
        .then((results) => results.json())
        .then((results) => {
          this.setState({ data: assembleData(results) });
        });
    }
  }

  // display component
  render() {
    return (
      <section style={{ display: this.props.visible ? 'block' : 'none' }}>
        <Table
          containerClass='table_container'
          defaultSortField='prediction'
          defaultSortUp='true'
          data={this.state.data}
          headFields={[
            'disease_name',
            'prediction',
            'compound_percentile',
            'disease_percentile',
            'category',
            'n_trials',
            'disease_id'
          ]}
          headContents={[
            'Name',
            'Predic',
            'Comp Pctl',
            'Dis Pctl',
            'Cat',
            'Trials',
            ''
          ]}
          headStyles={[
            { width: 250 },
            { width: 85 },
            { width: 85 },
            { width: 85 },
            { width: 65 },
            { width: 65 },
            { width: 150 }
          ]}
          headClasses={[
            'small left',
            'small',
            'small',
            'small',
            'small',
            'small',
            'small'
          ]}
          headTooltips={[
            'Disease name',
            'Prediction',
            'Compound percentile',
            'Disease percentile',
            'Category',
            'Number of trials',
            'Neo4j browser'
          ]}
          bodyTooltips={[(datum) => datum.description]}
          bodyValues={[
            null,
            (datum) => (
              <>
                {toFixed(datum.prediction * 100)}
                <span>%</span>
              </>
            ),
            (datum) => (
              <>
                {toFixed(datum.compound_percentile * 100)}
                <span>%</span>
              </>
            ),
            (datum) => (
              <>
                {toFixed(datum.disease_percentile * 100)}
                <span>%</span>
              </>
            ),
            null,
            null,
            (datum) => (
              <>
                <Button>hi</Button>
                <Button>hello</Button>
              </>
            )
          ]}
          bodyClasses={['left']}
        />
        <div className='small light'>
          {toComma(this.state.data.length)} entries
        </div>
      </section>
    );
  }
}

// ':play https://neo4j.het.io/guides/rep/' +
//                   this.props.compoundId +
//                   '/' +
//                   datum.disease_id.replace(':', '_') +
//                   '.html'
