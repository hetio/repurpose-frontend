import React from 'react';
import { Component } from 'react';

import { assembleData } from './data.js';
import { DynamicField } from 'hetio-frontend-components';
import { Table } from 'hetio-frontend-components';
import { toComma } from 'hetio-frontend-components';
import { toFixed } from 'hetio-frontend-components';

const dataUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-rep-data/1a960f0e353586f8fe9f61b569919f24603d4344/browser-tables/disease/';

export class DiseasePredictionTable extends Component {
  // initialize component
  constructor(props) {
    super(props);

    this.state = {};
    this.state.data = [];
  }

  // when component updates
  componentDidUpdate(prevProps) {
    if (
      (this.props.disease || {}).disease_id !==
      (prevProps.disease || {}).disease_id
    ) {
      fetch(dataUrl + this.props.disease.disease_id.replace(':', '_') + '.json')
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
          data={this.state.data}
          defaultSortField='prediction'
          defaultSortUp='true'
          sortables={[true, true, true, true, true, true, false]}
          searchAllFields={true}
          fields={[
            'compound_name',
            'prediction',
            'compound_percentile',
            'disease_percentile',
            'category',
            'n_trials'
          ]}
          headContents={[
            'Name',
            'Predic',
            'Comp Pctl',
            'Dis Pctl',
            'Cat',
            'Trials',
            <a
              href='https://neo4j.het.io/browser/'
              target='_blank'
              rel='noopener noreferrer'
              onClick={(event) => event.stopPropagation()}
            >
              Neo4j
            </a>
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
            'Copy and paste this query into the Neo4j browser'
          ]}
          bodyTooltips={[(datum, field, value) => datum.description]}
          bodyContents={[
            (datum, field, value) => <DynamicField value={value} />,
            (datum, field, value) => (
              <DynamicField
                value={toFixed(value * 100) + '%'}
                fullValue={value}
              />
            ),
            (datum, field, value) => (
              <DynamicField
                value={toFixed(value * 100) + '%'}
                fullValue={value}
              />
            ),
            (datum, field, value) => (
              <DynamicField
                value={toFixed(value * 100) + '%'}
                fullValue={value}
              />
            ),
            (datum, field, value) => <DynamicField value={value} />,
            (datum, field, value) => <DynamicField value={value} />
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
