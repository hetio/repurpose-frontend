const compoundsUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-rep-data/1a960f0e353586f8fe9f61b569919f24603d4344/browser-tables/compounds.json';
const diseasesUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-rep-data/1a960f0e353586f8fe9f61b569919f24603d4344/browser-tables/diseases.json';
const metapathsUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-rep-data/1a960f0e353586f8fe9f61b569919f24603d4344/browser-tables/metapaths.json';

const compoundPredictionsUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-rep-data/1a960f0e353586f8fe9f61b569919f24603d4344/browser-tables/compound/';
const diseasePredictionsUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-rep-data/1a960f0e353586f8fe9f61b569919f24603d4344/browser-tables/disease/';

export async function fetchMainData() {
  const compounds = await (await fetch(compoundsUrl)).json();
  const diseases = await (await fetch(diseasesUrl)).json();
  const metapaths = await (await fetch(metapathsUrl)).json();

  return {
    compounds: assembleData(compounds),
    diseases: assembleData(diseases),
    metapaths: assembleData(metapaths)
  };
}

export async function fetchCompoundPredictions(compoundId) {
  const compoundPredictions = await (await fetch(
    compoundPredictionsUrl + compoundId.replace(':', '_') + '.json'
  )).json();

  return { compoundPredictions: assembleData(compoundPredictions) };
}

export async function fetchDiseasePredictions(diseaseId) {
  const diseasePredictions = await (await fetch(
    diseasePredictionsUrl + diseaseId.replace(':', '_') + '.json'
  )).json();

  return { diseasePredictions: assembleData(diseasePredictions) };
}

// turn json data into expected format
export function assembleData(results) {
  const newData = [];
  for (const datum of results.data) {
    const newDatum = {};
    for (
      let index = 0;
      index < results.columns.length && index < datum.length;
      index++
    )
      newDatum[results.columns[index]] = datum[index];

    newData.push(newDatum);
  }
  return newData;
}
