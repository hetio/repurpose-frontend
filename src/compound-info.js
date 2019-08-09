import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';
import { toComma } from 'hetio-frontend-components';
import { InfoTable } from 'hetio-frontend-components';

export class CompoundInfo extends Component {
  // display component
  render() {
    if (!this.props.compound)
      return <></>;

    const compound = this.props.compound;
    const name = compound.compound_name;
    const bodyContents = [
      ['id', '', compound.compound_id],
      ['description', '', compound.description],
      ['synonyms', '', compound.synonyms],
      ['treats', '', compound.treats],
      ['palliates', '', compound.palliates],
      [
        'relationships',
        '',
        toComma(compound.total_edges),
        compound.total_edges
      ],
      ['auroc', '', toFixed((compound.auroc || 0) * 100) + '%', compound.auroc]
    ];

    return (
      <section style={{ display: this.props.visible ? 'block' : 'none' }}>
        <hr />
        <p className='left'>
          Info about{' '}
          <b>
            <i>{name}</i>
          </b>
        </p>
        <InfoTable bodyContents={bodyContents} />
      </section>
    );
  }
}
