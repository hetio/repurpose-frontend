import React from 'react';
import { Component } from 'react';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { IconButton } from 'hetio-frontend-components';
import { DynamicField } from 'hetio-frontend-components';
import { Table } from 'hetio-frontend-components';
import { toComma } from 'hetio-frontend-components';
import { toExponential } from 'hetio-frontend-components';
import { toFixed } from 'hetio-frontend-components';
import { toGradient } from 'hetio-frontend-components';

export class MetapathTable extends Component {
  // initialize component
  constructor(props) {
    super(props);

    this.state = {};
  }

  // display component
  render() {
    return (
      <section style={{ display: this.props.visible ? 'block' : 'none' }}>
        <div className='table_attic'>
          <span className='small light'>
            {toComma(this.props.data.length)} entries
          </span>
          <IconButton
            text={this.state.showMore ? 'collapse' : 'expand'}
            icon={this.state.showMore ? faAngleLeft : faAngleRight}
            className='link_button small'
            onClick={() => this.setState({ showMore: !this.state.showMore })}
            tooltipText='Expand table'
          />
        </div>
        <Table
          containerClass={
            this.state.showMore ? 'table_container_expanded' : 'table_container'
          }
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
            <>
              <i>p</i>-value
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
          bodyStyles={[
            null,
            null,
            null,
            (datum, field, value) => ({
              background: toGradient(value * 100, [
                [-25, 'rgba(233, 30, 99, 0.5)'],
                [0, 'rgba(255, 255, 255, 0)'],
                [25, 'rgba(233, 30, 99, 0.5)']
              ])
            }),
            (datum, field, value) => ({
              background: toGradient(-value, [
                [-1, 'rgba(255, 255, 255, 0)'],
                [-8, 'rgba(233, 30, 99, 0.25)']
              ])
            })
          ]}
          bodyClasses={['small', 'left small']}
        />
      </section>
    );
  }
}
