import React from 'react';
import { Component } from 'react';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import copy from 'copy-to-clipboard';

import { IconButton } from 'hetio-frontend-components';
import { DynamicField } from 'hetio-frontend-components';
import { Table } from 'hetio-frontend-components';
import { toComma } from 'hetio-frontend-components';
import { toFixed } from 'hetio-frontend-components';
import { toGradient } from 'hetio-frontend-components';

export class CompoundPredictions extends Component {
  // initialize component
  constructor(props) {
    super(props);

    this.state = {};
  }

  // display component
  render() {
    if (!this.props.compound)
      return <></>;

    return (
      <section style={{ display: this.props.visible ? 'block' : 'none' }}>
        <hr />
        <p className='left'>
          Predictions for{' '}
          <b>
            <i>{(this.props.compound || {}).compound_name || ''}</i>
          </b>
        </p>
        <div className='table_attic'>
          <span className='small light'>
            {toComma(this.props.compoundPredictions.length)} entries
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
          data={this.props.compoundPredictions}
          defaultSortField='prediction'
          defaultSortUp='true'
          sortables={[true, true, true, true, true, true, false]}
          searchAllFields={true}
          fields={[
            'disease_name',
            'prediction',
            'compound_percentile',
            'disease_percentile',
            'category',
            'n_trials',
            ''
          ]}
          headContents={[
            'Name',
            'Predic',
            'Comp Pctl',
            'Dis Pctl',
            'Cat',
            'Trials',
            'Neo4j Actions'
          ]}
          headStyles={[
            { width: 250 },
            { width: 75 },
            { width: 75 },
            { width: 75 },
            { width: 50 },
            { width: 50 },
            { width: 200 }
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
            (datum, field, value) => <DynamicField value={value} />,
            (datum, field, value) => {
              const id =
                this.props.compound.compound_id +
                '/' +
                datum.disease_id.replace(':', '_') +
                '.html';
              const url =
                'https://neo4j.het.io/browser/?cmd=play&arg=https://neo4j.het.io/guides/rep/' +
                id;
              const cmd = ':play https://neo4j.het.io/guides/rep/' + id;

              return (
                <>
                  <IconButton
                    className='small neo4j_button'
                    icon={faExternalLinkAlt}
                    text='browser'
                    onClick={() => {
                      const link = document.createElement('a');
                      link.target = '_blank';
                      link.href = url;
                      link.click();
                      link.remove();
                    }}
                  />
                  <IconButton
                    className='small neo4j_button clipboard_button'
                    icon={faCopy}
                    text='command'
                    onClick={() => copy(cmd)}
                  />
                </>
              );
            }
          ]}
          bodyStyles={[
            null,
            (datum, field, value) => ({
              background: toGradient(value * 100, [
                [0, 'rgba(255, 255, 255, 0)'],
                [25, 'rgba(233, 30, 99, 0.5)']
              ])
            }),
            (datum, field, value) => ({
              background: toGradient(value * 100, [
                [0, 'rgba(255, 255, 255, 0)'],
                [90, 'rgba(233, 30, 99, 0.05)'],
                [100, 'rgba(233, 30, 99, 0.15)']
              ])
            }),
            (datum, field, value) => ({
              background: toGradient(value * 100, [
                [0, 'rgba(255, 255, 255, 0)'],
                [90, 'rgba(233, 30, 99, 0.05)'],
                [100, 'rgba(233, 30, 99, 0.15)']
              ])
            })
          ]}
          bodyClasses={['left']}
        />
      </section>
    );
  }
}
