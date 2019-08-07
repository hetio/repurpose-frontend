const compoundsUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-rep-data/1a960f0e353586f8fe9f61b569919f24603d4344/browser-tables/compounds.json';
const diseasesUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-rep-data/1a960f0e353586f8fe9f61b569919f24603d4344/browser-tables/diseases.json';
const metapathsUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-rep-data/1a960f0e353586f8fe9f61b569919f24603d4344/browser-tables/metapaths.json';

export async function fetchData() {
  const compounds = await (await fetch(compoundsUrl)).json();
  const diseases = await (await fetch(diseasesUrl)).json();
  const metapaths = await (await fetch(metapathsUrl)).json();

  return {
    compounds: assembleData(compounds),
    diseases: assembleData(diseases),
    metapaths: assembleData(metapaths)
  };
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
