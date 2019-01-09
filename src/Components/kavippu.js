const countHouses = (start, end) => {
    if ((end - start) >= 0) {
      return (end - start) + 1;
    }
    return ((12 - start) + 1) + (end);
  };
  
  const countTo = (start, count) => ((start + count) - 1) % 12 || 1;
  
  export const kavippu = (tamilMonth, udayamV, arudam) => {
    let udayamHouse;
    if (udayamV % 30 === 0) {
      let edgeIndex = (Math.ceil(parseFloat(udayamV) / 30) + 1);
        if (edgeIndex > 12 ) {
            udayamHouse = edgeIndex - 12;   
        } else {
          udayamHouse = edgeIndex;
        }
    } else {
      udayamHouse = Math.ceil(udayamV / 30);
    }
  
    let arudamHouse;
    if (arudam % 30 === 0) {
      let edgeIndex = (Math.ceil(arudam / 30) + 1);
      if (edgeIndex > 12 ) {
        arudamHouse = edgeIndex - 12;   
      } else {
        arudamHouse = edgeIndex;
      }
    } else {
      arudamHouse = Math.ceil(arudam / 30);
    }
    // console.log('udayamHouse', udayamHouse);
    // console.log('arudamHouse', arudamHouse);
  
    let veethi = 0;
  
    if (tamilMonth >= 2 && tamilMonth <= 5) {
      veethi = 1; // mesham
    } else if (tamilMonth >= 8 && tamilMonth <= 11) {
      veethi = 3; // mithunam
    } else {
      veethi = 2; // rishabam
    }
  
    // console.log('Veethi', veethi);
    // console.log('countHouses(arudamHouse, veethi)', countHouses(arudamHouse, veethi));
    // console.log('udayamHouse', udayamHouse);
    // console.log('countTo(udayamHouse, countHouses(arudamHouse, veethi))',
    //   countTo(udayamHouse, countHouses(arudamHouse, veethi)));
  
    const kavippuHouse = countTo(udayamHouse, countHouses(arudamHouse, veethi));
    // console.log('kavippuDeg', (kavippuHouse * 30) - (arudam % 30));
  
    return (kavippuHouse * 30) - (arudam % 30);
  };
  