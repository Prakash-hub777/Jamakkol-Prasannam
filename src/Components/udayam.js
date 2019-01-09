export const udayam = (day, point, sunRasi, sunPos) => {
    const diff = (day / 12) - (sunPos * 2);
    const udayamArray = [0];
    const uH = [];
    let prev = null;
    let udayamH = sunRasi;
    uH.push(0);
    for (let i = 1; i <= 12; i++) {
      udayamH = (udayamH > 12) ? (udayamH - 12) : udayamH;
      if (i === 1) {
        udayamArray.push(diff);
      } else if (i === 12) {
        udayamArray.push(day);
      } else {
        udayamArray.push(prev + (day / 12));
      }
      uH.push(udayamH);
      prev = udayamArray[i];
      udayamH++;
    }
    // console.log('*** udayamArray ***', udayamArray.toString());
    // console.log('uHuHuHuH', uH.toString());
    // console.log('point', point.toString());
  
    for (let i = 0; i < 12; i++) {
      if (point >= udayamArray[i] && point < udayamArray[i + 1]) {
        const deg = (((point - udayamArray[i]) / (udayamArray[i + 1] - udayamArray[i])) * 30)
          + ((uH[i + 1] - 1) * 30);
        console.log('deg', deg);
        return deg;
      }
    }
    return ('Time of Prediction out of range');
  };
  