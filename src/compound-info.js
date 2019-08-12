import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';
import { toComma } from 'hetio-frontend-components';
import { InfoTable } from 'hetio-frontend-components';

import tooltipText from './tooltip-text.json';

export class CompoundInfo extends Component {
  // display component
  render() {
    if (!this.props.compound)
      return <></>;

    const compound = this.props.compound;
    const name = compound.compound_name;
    const bodyContents = [
      ['id', tooltipText['compound_id'], compound.compound_id],
      [
        'description',
        tooltipText['compound_description'],
        compound.description
      ],
      ['synonyms', tooltipText['compound_synonyms'], compound.synonyms],
      ['treats', tooltipText['compound_treats'], compound.treats],
      ['palliates', tooltipText['compound_palliates'], compound.palliates],
      [
        'relationships',
        tooltipText['compound_edges'],
        toComma(compound.total_edges),
        compound.total_edges
      ],
      [
        'auroc',
        tooltipText['auroc'],
        toFixed((compound.auroc || 0) * 100) + '%',
        compound.auroc
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
