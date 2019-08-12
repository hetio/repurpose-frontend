import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';
import { toComma } from 'hetio-frontend-components';
import { InfoTable } from 'hetio-frontend-components';

import tooltipText from './tooltip-text.json';

export class DiseaseInfo extends Component {
  // display component
  render() {
    if (!this.props.disease)
      return <></>;

    const disease = this.props.disease;
    const name = disease.disease_name;
    const bodyContents = [
      ['id', tooltipText['disease_id'], disease.disease_id],
      ['description', tooltipText['disease_description'], disease.description],
      ['synonyms', tooltipText['disease_synonyms'], disease.synonyms],
      ['treats', tooltipText['disease_treats'], disease.treats],
      ['palliates', tooltipText['disease_palliates'], disease.palliates],
      [
        'relationships',
        tooltipText['disease_edges'],
        toComma(disease.total_edges),
        disease.total_edges
      ],
      [
        'auroc',
        tooltipText['auroc'],
        toFixed((disease.auroc || 0) * 100) + '%',
        disease.auroc
      ]
    ];

    return (
      <div
        className='app_section'
        style={{ display: this.props.visible ? 'block' : 'none' }}
      >
        <hr />
        <p className='left'>
          Info about{' '}
          <b>
            <i>{name}</i>
          </b>
        </p>
        <InfoTable bodyContents={bodyContents} />
      </div>
    );
  }
}
