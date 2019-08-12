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

import tooltipText from './tooltip-text.json';

export class Metapaths extends Component {
  // initialize component
  constructor(props) {
    super(props);

    this.state = {};
  }

  // display component
  render() {
    return (
      <div
        className='app_section'
        style={{ display: this.props.visible ? 'block' : 'none' }}
      >
        <div className='table_attic'>
          <span className='small light'>
            {toComma(this.props.metapaths.length)} entries
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
          defaultSortField='mlog10_pval_delta_auroc'
          defaultSortUp='false'
          data={this.props.metapaths}
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
            { width: 100 },
            { width: 200 },
            { width: 75 },
            { width: 75 },
            { width: 100 },
            { width: 75 }
          ]}
          headClasses={[
            'small left',
            'small left',
            'small',
            'small',
            'small',
            'small'
          ]}
          headTooltips={[
            tooltipText['metapath_abbreviation'],
            tooltipText['metapath_full'],
            tooltipText['metapath_length'],
            tooltipText['metapath_delta_auroc'],
            tooltipText['metapath_p_value'],
            tooltipText['metapath_coefficient']
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
            (datum, field, value) => (
              <DynamicField value={toFixed(value, 3)} fullValue={value} />
            )
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
          bodyClasses={['left small', 'left small']}
        />
      </div>
    );
  }
}
