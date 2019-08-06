import React from 'react';
import { Component } from 'react';

import { DynamicField } from 'hetio-frontend-components';
import { Table } from 'hetio-frontend-components';
import { toComma } from 'hetio-frontend-components';
import { toExponential } from 'hetio-frontend-components';

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
          bodyContents={[
            (datum, field, value) => <DynamicField value={value} />,
            (datum, field, value) => <DynamicField value={value} />,
            (datum, field, value) => <DynamicField value={value} />,
            (datum, field, value) => (
              <DynamicField
                value={
                  <>
                    {String(value * 100)
                      .slice(0, 8)
                      .padEnd(8, '0')}
                    <span>%</span>
                  </>
                }
                fullValue={value}
              />
            ),
            (datum, field, value) => (
              <DynamicField value={toExponential(value)} fullValue={value} />
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
