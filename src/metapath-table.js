import React from 'react';
import { Component } from 'react';

import { DynamicField } from 'hetio-frontend-components';
import { Table } from 'hetio-frontend-components';
import { toComma } from 'hetio-frontend-components';
import { toExponential } from 'hetio-frontend-components';
import { toFixed } from 'hetio-frontend-components';

export class MetapathTable extends Component {
  // display component
  render() {
    return (
      <section style={{ display: this.props.visible ? 'block' : 'none' }}>
        <Table
          containerClass='table_container'
          defaultSortField='treats'
          defaultSortUp='false'
          data={this.props.data}
          sortables={[true, true, true, true, true, true]}
          fields={[
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
            <><i>p</i>-value</>,
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
          bodyContents={[
            (datum, field, value) => <DynamicField value={value} />,
            (datum, field, value) => <DynamicField value={value} />,
            (datum, field, value) => <DynamicField value={value} />,
            (datum, field, value) => (
              <DynamicField
                value={toFixed(value * 100) + '%'}
                fullValue={value}
              />
            ),
            (datum, field, value) => (
              <DynamicField
                value={toExponential(Math.pow(10, -value))}
                fullValue={Math.pow(10, -value)}
              />
            ),
            (datum, field, value) => <DynamicField value={value} />
          ]}
          bodyClasses={['small', 'left small']}
        />
        <div className='small light'>
          {toComma(this.props.data.length)} entries
        </div>
      </section>
    );
  }
}
