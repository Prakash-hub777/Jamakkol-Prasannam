import React from 'react';
import { Text } from 'react-native';

const compare = (a,b) => {
  if (a.position < b.position)
    return -1;
  if (a.position > b.position)
    return 1;
  return 0;
}

const styleLabel = (planet) => {
  if (planet) {
    planet = planet.split('\n')[0];

    switch (planet) {
      case 'சூரி':
        return { color: '#FF5977' };
      case 'செ':
        return { color: '#FF1122' };
      case 'குரு':
        return { color: '#DDC733' };
      case 'பு':
        return { color: '#228B22' };
      case 'சு':
        return { color: '#BA55D3' };
      case 'சனி':
        return { color: '#000' };
      case 'சந்':
        return { color: '#696969' };
      case 'பாம்':
        return { color: '#0000CD' };
      case 'ஆரு':
      case 'உத':
      case 'கவி':
        return { fontWeight: '500' };
      default:
        return { color: '#000' };
    }
  }
};

const Rasi = ({ rasiNum, jamakkol, aarudamV, udayamV, kavippuV, styleV, data }) => {
  data ? data.sort(compare): '';
  // console.log('Data', data);
  
  return (
    <Text style={styleV}>
      {
        data ? data.map((value, k) => {
          return (
            <Text style={styleLabel(value.type)} key={k}>
              { `${value.type}-${value.position}°\n` }
            </Text>
          );
        }): ''
      }
    </Text>
  );
};

export default Rasi;
