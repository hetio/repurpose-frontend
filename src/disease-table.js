import React from 'react';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import { DynamicField } from 'hetio-frontend-components';
import { Table } from 'hetio-frontend-components';
import { Button } from 'hetio-frontend-components';
import { toComma } from 'hetio-frontend-components';
import { toFixed } from 'hetio-frontend-components';

export class DiseaseTable extends Component {
  // display component
  render() {
    return (
      <section style={{ display: this.props.visible ? 'block' : 'none' }}>
        <Table
          containerClass='table_container'
          data={this.props.data}
          defaultSortField='treats'
          defaultSortUp='false'
          sortables={[false, true, true, true, true, true]}
          searchAllFields={true}
          fields={[
            '',
            'disease_id',
            'disease_name',
            'treats',
            'total_edges',
            'auroc'
          ]}
          headContents={['', 'ID', 'Name', 'Treats', 'Edges', 'AUROC']}
          headStyles={[
            { width: 35 },
            { width: 80 },
            { width: 200 },
            { width: 75 },
            { width: 75 },
            { width: 75 }
          ]}
          headClasses={[
            '',
            'small left',
            'small left',
            'small',
            'small',
            'small'
          ]}
          headTooltips={['', 'ID', 'Name', 'Treats', 'Edges', 'AUROC']}
          bodyTooltips={[
            (datum, field, value) =>
              'See predictions for "' +
              datum.disease_name +
              '" \n\n (' +
              datum.synonyms
                .split(' | ')
                .slice(0, 20)
                .join(', ') +
              ')',
            null,
            (datum, field, value) => datum.description
          ]}
          bodyContents={[
            (datum, field, value) => (
              <Button
                className='check_button'
                onClick={() => {
                  this.props.setDisease(datum);
                }}
              >
                {this.props.disease &&
                datum.disease_id === this.props.disease.disease_id ? (
                    <FontAwesomeIcon className='fa-xs' icon={faEye} />
                  ) : (
                    <FontAwesomeIcon
                      className='fa-xs'
                      style={{ opacity: 0.15 }}
                      icon={faEye}
                    />
                  )}
              </Button>
            ),
            (datum, field, value) => (
              <DynamicField value={<code>{value}</code>} fullValue={value} />
            ),
            (datum, field, value) => <DynamicField value={value} />,
            (datum, field, value) => <DynamicField value={value} />,
            (datum, field, value) => (
              <DynamicField value={toComma(value)} fullValue={value} />
            ),
            (datum, field, value) => (
              <DynamicField
                value={toFixed(value * 100) + '%'}
                fullValue={value}
              />
            )
          ]}
          bodyClasses={[null, 'small left', 'left']}
        />
        <div className='small light'>
          {toComma(this.props.data.length)} entries
        </div>
      </section>
    );
  }
}
