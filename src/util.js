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
