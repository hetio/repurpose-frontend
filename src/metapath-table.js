import React from 'react';
import { Component } from 'react';

import { assembleData } from './util.js';
import { Table } from 'hetio-frontend-components';
import { toComma } from 'hetio-frontend-components';
import { toFixed } from 'hetio-frontend-components';
import { toExponential } from 'hetio-frontend-components';

const dataUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-rep-data/1a960f0e353586f8fe9f61b569919f24603d4344/browser-tables/metapaths.json';

export class MetapathsTable extends Component {
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
    return (
      <div style={{ display: this.props.visible ? 'block' : 'none' }}>
        <Table
          containerClass='table_container'
          defaultSortField='treats'
          defaultSortUp='false'
          data={this.state.data}
          headFields={[
            'metapath',
            'verbose',
            'length',
            'delta_auroc',
            'mlog10_pval_delta_auroc',
            'coef'
          ]}
          headContents={[
            'Abbrev',
            'Metapath',
            'Len',
            <>&Delta; AUROC</>,
            <>
              -log<sub>10</sub>
              <i>p</i>
            </>,
            'Coef'
          ]}
          headStyles={[
            { width: 125 },
            { width: 300 },
            { width: 65 },
            { width: 100 },
            { width: 100 },
            { width: 100 }
          ]}
          headClasses={[
            'small',
            'small left',
            'small',
            'small',
            'small',
            'small'
          ]}
          headTooltips={[
            'Abbreviation',
            'Metapath description',
            'Metapath length',
            'Percent change in AUROC',
            'Negative log of p-value',
            'Coefficient'
          ]}
          bodyValues={[
            null,
            null,
            null,
            (datum) => (
              <>
                {String(datum.delta_auroc * 100)
                  .slice(0, 8)
                  .padEnd(8, '0')}
                <span>%</span>
              </>
            ),
            (datum) => toExponential(datum.mlog10_pval_delta_auroc)
          ]}
          bodyClasses={['small', 'left small']}
        />
        <div className='small light'>
          {toComma(this.state.data.length)} entries
        </div>
      </div>
    );
  }
}
