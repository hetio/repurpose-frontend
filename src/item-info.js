import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';
import { toComma } from 'hetio-frontend-components';
import { DynamicField } from 'hetio-frontend-components';

// main app component
export class ItemInfo extends Component {
  render() {
    const item = this.props.item;
    if (!item)
      return <></>;

    const name = item.compound_name || item.disease_name || '';
    const fields = [
      ['id', item.compound_id || item.disease_id || ''],
      ['description', item.description || ''],
      ['synonyms', item.synonyms || ''],
      ['treats', item.treats],
      ['palliates', item.palliates],
      ['relationships', toComma(item.total_edges)],
      ['auroc', toFixed((item.auroc || 0) * 100) + '%']
    ];

    return (
      <>
        <hr />
        <section style={{ display: this.props.visible ? 'block' : 'none' }}>
          <p className='left'>
            Info about <span className='semibold'>{name}</span>:
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
        <hr />
        <p className='left'>
          Predicted treatments for <span className='semibold'>{name}</span>:
        </p>
      </>
    );
  }
}
