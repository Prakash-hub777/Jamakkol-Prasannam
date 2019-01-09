const jamakkols = (ind, planets_order, deg) => {
    const result = [];
    const result1 = {};
    let j = ind;
    let degree = deg;
    let house = null; 
    if (parseFloat(deg) % 30 === 0) {
        if(deg === 360) {
          house = 12;
        } else {
          house = Math.ceil(parseFloat(deg) / 30) + 1;
        }
    } else {
        house = Math.ceil(parseFloat(deg) / 30);
    }
    if (house > 12) {
      house -= 12;
    }
    // console.log('house', house);
    // const planets_order1 = ['Sun', 'Mars', 'Jupiter', 'Mercury', 'Venus',
    //   'Saturn', 'Moon', 'Snake'];
  
    for (let i = 0; i < 8; i++) {
      result.push({ planet: planets_order[j], degree });
      degree += 45;
      degree %= 360;
      j--;

      if (j < 0) {
        j = planets_order.length - 1;
      }
    }

    // console.log('Result', result);

    for(let i = 0; i < result.length; i++) {
        let tmp = result[i]['degree'];
        let vval = `${result[i]['planet']}\n${(result[i]['degree'] % 30).toFixed(2)}°`;
        if (typeof tmp === 'number') {
            if (parseFloat(tmp) % 30 === 0) {
                let edgeIndex = Math.ceil(parseFloat(tmp) / 30);
                if (edgeIndex > 12) {
                  result1[edgeIndex - 12] = `${result[i]['planet']}\n${((result[i]['degree'] % 30) || 30).toFixed(2)}°`;
                } else {
                  result1[edgeIndex] = `${result[i]['planet']}\n${((result[i]['degree'] % 30) || 30).toFixed(2)}°`;
                }
            } else {
                result1[Math.ceil(parseFloat(tmp) / 30)] = vval;
            }
        }
    }
    // console.log('Wrong result............');
    // const r2 = Object.keys(result1);
    // for(let i = 0; i < r2.length; i++) {
    //     console.log('key', r2[i]);
    //     console.log('value', planets_order[planets_order.indexOf(result1[r2[i]].split('\n')[0])]);
    // }
    return result1;
  };
  
  export const planets = (athipathi, time) => {
    time %= 1440;
    const start = 360;
    const jamam = [];
    const planets_order = ['கதிரவன்', 'சேய்', 'பொன்', 'மால்', 'புகர்',
      'மந்தன்', 'மதி', 'பாம்பு'];
    let last = start;
    // console.log('athipathi', athipathi);
    for (let i = 0, j = planets_order.indexOf(athipathi); i < 16; i++) {
      jamam.push([last % 1440, (last + 90) % 1440, planets_order[j]]);
      last += 90;
      j--;
      if (j < 0) {
        j = planets_order.length - 1;
      }
    }

    // console.log('jamam', jamam);
    // console.log('time', time);
  
    for (let i = 0; i < jamam.length; i++) {
      // Last Jamam
      if (jamam[i][1] === 0) {
        const result = jamakkols(
          planets_order.indexOf(jamam[i][2]),
          planets_order,
          parseFloat((360 - (((time - jamam[i][0])
          / ((60 * 24) - jamam[i][0])) * 45)).toFixed(2))
        );
        return result;
      }

      if (time >= jamam[i][0] && time < jamam[i][1]) {
        const result = jamakkols(
                        planets_order.indexOf(jamam[i][2]),
                        planets_order,
                        parseFloat((360 - (((time - jamam[i][0])
                        / (jamam[i][1] - jamam[i][0])) * 45)).toFixed(2))
                      );
        return result;
      }
    }
  };
  