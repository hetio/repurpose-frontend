import React from 'react';
import { Component } from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { assembleData } from './util.js';
import { Table } from 'hetio-frontend-components';
import { IconButton } from 'hetio-frontend-components';
import { toComma } from 'hetio-frontend-components';
import { toFixed } from 'hetio-frontend-components';

const dataUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-rep-data/1a960f0e353586f8fe9f61b569919f24603d4344/browser-tables/compounds.json';

export class CompoundTable extends Component {
  // initialize component
  constructor() {
    super();

    this.state = {};
    this.state.data = [];

    fetch(dataUrl)
      .then((results) => results.json())
      .then((results) => {
        this.setState({ data: assembleData(results) });
      });
  }
  // display component
  render() {
    const goButton = (datum) => (
      <IconButton
        className='go_button nowrap'
        tooltipText={
          'See predictions for "' +
          datum.compound_name +
          '" \n\n (' +
          datum.synonyms
            .split(' | ')
            .slice(0, 20)
            .join(', ') +
          ')'
        }
        text={datum.compound_id}
        icon={faArrowRight}
        onClick={() => console.log(datum.compound_id)}
      />
    );
    return (
      <div style={{ display: this.props.visible ? 'block' : 'none' }}>
        <Table
          containerClass='table_container'
          defaultSortField='treats'
          defaultSortUp='false'
          data={this.state.data}
          headFields={[
            'compound_id',
            'compound_name',
            'treats',
            'total_edges',
            'auroc'
          ]}
          headContents={['ID', 'Name', 'Treats', 'Edges', 'AUROC']}
          headStyles={[
            { width: 100 },
            { width: 200 },
            { width: 75 },
            { width: 75 },
            { width: 75 }
          ]}
          headClasses={['small', 'small left', 'small', 'small', 'small']}
          headTooltips={['ID', 'Name', 'Treats', 'Edges', 'AUROC']}
          bodyTooltips={[null, (datum) => datum.description]}
          bodyValues={[
            goButton,
            null,
            null,
            (datum) => toComma(datum.total_edges),
            (datum) => (
              <>
                {toFixed(datum.auroc * 100)}
                <span>%</span>
              </>
            )
          ]}
          bodyFullValues={[goButton]}
          bodyClasses={[null, 'left']}
        />
        <div className='small light'>
          {toComma(this.state.data.length)} entries
        </div>
      </div>
    );
  }
}
