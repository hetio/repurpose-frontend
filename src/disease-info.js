import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';
import { toComma } from 'hetio-frontend-components';
import { InfoTable } from 'hetio-frontend-components';

export class DiseaseInfo extends Component {
  // display component
  render() {
    if (!this.props.disease)
      return <></>;

    const disease = this.props.disease;
    const name = disease.disease_name;
    const bodyContents = [
      ['id', '', disease.disease_id],
      ['description', '', disease.description],
      ['synonyms', '', disease.synonyms],
      ['treats', '', disease.treats],
      ['palliates', '', disease.palliates],
      ['relationships', '', toComma(disease.total_edges), disease.total_edges],
      ['auroc', '', toFixed((disease.auroc || 0) * 100) + '%', disease.auroc]
    ];

    return (
      <div className='app_section' style={{ display: this.props.visible ? 'block' : 'none' }}>
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
