import React from 'react';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import { assembleData } from './util.js';
import { Table } from 'hetio-frontend-components';
import { Button } from 'hetio-frontend-components';
import { toComma } from 'hetio-frontend-components';
import { toFixed } from 'hetio-frontend-components';

const dataUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-rep-data/1a960f0e353586f8fe9f61b569919f24603d4344/browser-tables/diseases.json';

export class DiseaseTable extends Component {
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
      <section style={{ display: this.props.visible ? 'block' : 'none' }}>
        <Table
          containerClass='table_container'
          defaultSortField='treats'
          defaultSortUp='false'
          data={this.state.data}
          headFields={[
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
          headClasses={['', 'small left', 'small left', 'small', 'small', 'small']}
          headTooltips={['', 'ID', 'Name', 'Treats', 'Edges', 'AUROC']}
          bodyTooltips={[
            (datum) =>
              'See predictions for "' +
              datum.disease_name +
              '" \n\n (' +
              datum.synonyms
                .split(' | ')
                .slice(0, 20)
                .join(', ') +
              ')',
            null,
            (datum) => datum.description
          ]}
          bodyValues={[
            (datum) => (
              <Button
                className='check_button'
                onClick={() => {
                  this.props.setDiseaseId(datum.disease_id);
                }}
              >
                {datum.disease_id === this.props.diseaseId ? (
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
            (datum) => <code>{datum.disease_id}</code>,
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
          bodyClasses={[null, 'small left', 'left']}
        />
        <div className='small light'>
          {toComma(this.state.data.length)} entries
        </div>
      </section>
    );
  }
}
