import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';
import { toComma } from 'hetio-frontend-components';
import { DynamicField } from 'hetio-frontend-components';

export class DiseaseInfo extends Component {
  // display component
  render() {
    const disease = this.props.disease || {};
    const name = disease.disease_name || '-';
    const fields = [
      ['id', disease.disease_id || '-'],
      ['description', disease.description || '-'],
      ['synonyms', disease.synonyms || '-'],
      ['treats', disease.treats],
      ['palliates', disease.palliates],
      ['relationships', toComma(disease.total_edges)],
      ['auroc', toFixed((disease.auroc || 0) * 100) + '%']
    ];

    return (
      <>
        <hr />
        <section>
          <p className='left'>
            Info about{' '}
            <b>
              <i>{name}</i>
            </b>
          </p>
          <table className='info_table'>
            <tbody>
              {fields.map((field, index) => (
                <tr key={index}>
                  <td className='small left light'>{field[0]}</td>
                  <td className='small left'>
                    <DynamicField value={field[1]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </>
    );
  }
}
