import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';
import { toComma } from 'hetio-frontend-components';
import { DynamicField } from 'hetio-frontend-components';

export class CompoundInfo extends Component {
  // display component
  render() {
    const compound = this.props.compound || {};
    const name = compound.compound_name || '-';
    const fields = [
      ['id', compound.compound_id || '-'],
      ['description', compound.description || '-'],
      ['synonyms', compound.synonyms || '-'],
      ['treats', compound.treats],
      ['palliates', compound.palliates],
      ['relationships', toComma(compound.total_edges)],
      ['auroc', toFixed((compound.auroc || 0) * 100) + '%']
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
