import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';

// main app component
export class ItemInfo extends Component {
  render() {
    const item = this.props.item;
    if (!item)
      return <></>;
    const name = item.compound_name || item.disease_name || '';
    const id = item.compound_id || item.disease_id || '';
    const treatments = item.treats;
    const palliative = item.palliates;
    const auroc = toFixed(item.auroc * 100);

    return (
      <section style={{ display: this.props.visible ? 'block' : 'none' }}>
        <div>
          Below are the predicted treatments for {name} ({id}) from Project
          Rephetio. In PharmacotherapyDB v1.0, {name} contains {treatments}
          treatments and {palliative} palliative indications. The predictions
          prioritized the {treatments} treatments with AUROC = {auroc}%. In
          Hetionet v1.0, hypertension is connected by 772 relationships.
        </div>
      </section>
    );
  }
}
