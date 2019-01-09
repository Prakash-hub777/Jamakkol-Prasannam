import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { udayam } from './udayam';
import { kavippu } from './kavippu';
import { planets } from './planets';
import Rasi from './Rasi';
import { GowriChart } from './GowriChart';
import { supplementaryPlanets } from './supplementaryPlanets';

const width = Dimensions.get('window').width;
const { bp, vw, vh } = require('react-native-relative-units')(width);

const removeDeg = (val) => {
    return parseFloat(val.slice(0, val.length-1));
};

const toMinutes = (hr, min) => (
    (parseInt(hr) * 60) + parseInt(min)
);

const mapToHouse = (position) => {
    
    const Res = {};
    if (parseFloat(position) % 30 === 0) {
        let edgeIndex = Math.ceil(parseFloat(position) / 30) + 1;
        if (edgeIndex > 12) {
            edgeIndex -= 12
        }
        Res[edgeIndex] = `${((position % 30)).toFixed(2)}°`;
    } else {
        Res[Math.ceil(parseFloat(position) / 30)] = `${(position % 30).toFixed(2)}°`;
    }
    return Res;
}

const aarudam = (val) => ((val / 5) * 30);

const Main = (props) => {
    const {
        sunRiseTime,
        sunSetTime,
        dateTime,
        tamilMonth,
        day,
        sunDegree,
        sunMinute,
        sunSeconds
      } = props.navigation.state.params;
    const sunPos = parseFloat(sunDegree) + parseFloat(sunMinute) / 60 + parseFloat(sunSeconds) / 3600;

    let sunSet = sunSetTime.split(':');
    sunSet = toMinutes(sunSet[0], sunSet[1]);
    let sunRise = sunRiseTime.split(':');
    sunRise = toMinutes(sunRise[0], sunRise[1]);

    const duration = ((sunSet - sunRise) > 0) ? (sunSet - sunRise) : (sunSet - sunRise) * -1;
    const partOfDay = (sunRise < 720) ? 'day' : 'night';
    const gowri = [];

    let start = sunRise;

    for (let i = 0; i < 8; i++) {
        gowri.push({ from: start, to: (start + (duration / 8)), gowri: GowriChart[day][partOfDay].order[i] });
        start += duration / 8;
    }

    const time = toMinutes(dateTime.split(':')[0], dateTime.split(':')[1]);

    const gowriRes = gowri.filter(element => {
        if (time >= element.from && time < element.to) {
            return true;
        }
    });

    if (gowriRes.length === 0) {
        gowriRes.push({ gowri: 'N/A' });
    }

    console.log('partOfDay', partOfDay);

    let tmp = {};

    let jamakkol = planets(day, time);

    let aarudamV = {};
    tmp = aarudam(dateTime.split(':')[1]);
    if (typeof tmp === 'number') {
        aarudamV = mapToHouse(tmp);
    }
    console.log('aarudamV', aarudamV);

    let udayamV = {};
    tmp = udayam(
        duration,
        time - sunRise,
        tamilMonth,
        sunPos
    );
    if (typeof tmp === 'number') {
        udayamV = mapToHouse(tmp);
        // console.log('udayamV', udayamV);
    }

    const kavippuV = {};
    tmp = kavippu(
      tamilMonth,
      udayam(
        duration,
        toMinutes(dateTime.split(':')[0], dateTime.split(':')[1]) - sunRise,
        tamilMonth,
        sunPos
      ),
      aarudam(dateTime.split(':')[1])
    );

    if (typeof tmp === 'number') {
        if (parseFloat(tmp) % 30 === 0) {
            let edgeIndex = Math.ceil(parseFloat(tmp) / 30);
            if (edgeIndex > 12) {
              kavippuV[edgeIndex - 12] = `${((tmp % 30) || 30).toFixed(2)}°`;
            } else {
              kavippuV[edgeIndex] = `${((tmp % 30) || 30).toFixed(2)}°`;
            }
        } else {
            kavippuV[Math.ceil(parseFloat(tmp) / 30)] = `${(tmp % 30).toFixed(2)}°`;
        }
    }

    // kavippuV[Math.ceil(parseFloat(tmp) / 30)] = `${(tmp % 30).toFixed(2)}°`;
    // console.log('kavippuV', kavippuV);

    if (typeof jamakkol !== 'object') {
        jamakkol = {};
      }
  
    if (isNaN(tmp)) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>
                    {'Time entered out of range. \nTry again...'}
                </Text>
            </View>
        );
    }

    const JP = {};
    for (let i = 1; i <= 12; i++) {
        JP[i] = [];
    }

    Object.keys(aarudamV).forEach((key) => {
        JP[parseInt(key)] = [ ...JP[parseInt(key)], { position: removeDeg(aarudamV[key]), type: 'ஆரு' } ];
    });

    Object.keys(udayamV).forEach((key) => {
        JP[parseInt(key)] = [ ...JP[parseInt(key)], { position: removeDeg(udayamV[key]), type: 'உத' } ];
    });

    Object.keys(kavippuV).forEach((key) => {
        JP[parseInt(key)] = [ ...JP[parseInt(key)], { position: removeDeg(kavippuV[key]), type: 'கவி' } ];
    });

    const planet = {
        "கதிரவன்": "சூரி",
        "சேய்": "செ",
        "பொன்": "குரு",
        "மால்": "பு",
        "புகர்": "சு",
        "மந்தன்": "சனி",
        "மதி": "சந்",
        "பாம்பு": "பாம்"
    };

    Object.keys(jamakkol).forEach((key) => {
        JP[key] = [ ...JP[key], 
                    { 
                        position: removeDeg(jamakkol[key].split('\n')[1]), 
                        type: planet[jamakkol[key].split('\n')[0]]
                    } 
                  ];
    });

    // supplementaryPlanets = (sunPos, choice, dayType, day)
    // console.log('rahuKalam', supplementaryPlanets(sunPos + ((parseInt(tamilMonth) - 1) * 30), 'rahuKalam', partOfDay, day));
    // console.log('yemakandam', supplementaryPlanets(sunPos + ((parseInt(tamilMonth) - 1) * 30), 'yemakandam', partOfDay, day));
    // console.log('mrthyu', supplementaryPlanets(sunPos + ((parseInt(tamilMonth) - 1) * 30), 'mrthyu', partOfDay, day));
    // console.log('mandhi', supplementaryPlanets(sunPos + ((parseInt(tamilMonth) - 1) * 30), 'mandhi', partOfDay, day));

    const rK = mapToHouse(supplementaryPlanets(sunPos + ((parseInt(tamilMonth) - 1) * 30), 'rahuKalam', partOfDay, day));

    Object.keys(rK).forEach((key) => {
        JP[parseInt(key)] = [ ...JP[parseInt(key)], { position: removeDeg(rK[key]), type: 'ரா.கா' } ];
    });

    const yK = mapToHouse(supplementaryPlanets(sunPos + ((parseInt(tamilMonth) - 1) * 30), 'yemakandam', partOfDay, day));

    Object.keys(yK).forEach((key) => {
        JP[parseInt(key)] = [ ...JP[parseInt(key)], { position: removeDeg(yK[key]), type: 'எம' } ];
    });

    const mrth = mapToHouse(supplementaryPlanets(sunPos + ((parseInt(tamilMonth) - 1) * 30), 'mrthyu', partOfDay, day));

    Object.keys(mrth).forEach((key) => {
        JP[parseInt(key)] = [ ...JP[parseInt(key)], { position: removeDeg(mrth[key]), type: 'ம்ரு' } ];
    });

    const mandhiV = mapToHouse(supplementaryPlanets(sunPos + ((parseInt(tamilMonth) - 1) * 30), 'mandhi', partOfDay, day));

    Object.keys(mandhiV).forEach((key) => {
        JP[parseInt(key)] = [ ...JP[parseInt(key)], { position: removeDeg(mandhiV[key]), type: 'மா' } ];
    });

    return(
        <ScrollView style={{backgroundColor: '#fff'}}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ padding: 25 * bp, marginTop: 10 * bp }}>
                    <Text style={styles.headingStyle}>
                        சாமக்கோள் பிரசன்னம்
                    </Text>
                </View>
                <View style={styles.row}>
                    <Rasi
                        data={JP['12']}
                        rasiNum={'12'} jamakkol={jamakkol} aarudamV={aarudamV}
                        udayamV={udayamV} kavippuV={kavippuV} styleV={[styles.box]}
                    />
                    <Rasi
                        data={JP['1']}
                        rasiNum={'1'} jamakkol={jamakkol} aarudamV={aarudamV}
                        udayamV={udayamV} kavippuV={kavippuV}
                        styleV={[styles.box, styles.leftNull]}
                    />
                    <Rasi
                        data={JP['2']}
                        rasiNum={'2'} jamakkol={jamakkol} aarudamV={aarudamV}
                        udayamV={udayamV} kavippuV={kavippuV}
                        styleV={[styles.box, styles.leftNull, styles.rightNull]}
                    />
                    <Rasi
                        data={JP['3']}
                        rasiNum={'3'} jamakkol={jamakkol} aarudamV={aarudamV}
                        udayamV={udayamV} kavippuV={kavippuV} styleV={[styles.box]}
                    />
                </View>
                <View style={styles.row}>
                    <Rasi
                        data={JP['11']}
                        rasiNum={'11'} jamakkol={jamakkol} aarudamV={aarudamV}
                        udayamV={udayamV} kavippuV={kavippuV}
                        styleV={[styles.box, styles.topNull]}
                    />
                    <Text style={styles.centerPart}>
                        <Text style={styles.centerTextStyle}>
                            {`நேரம்: ${dateTime}\n`}
                        </Text>
                        <Text style={styles.centerTextStyle}>
                            {`கௌரி: ${gowriRes[0].gowri}\n`}
                        </Text>
                    </Text>
                    <Rasi
                        data={JP['4']}
                        rasiNum={'4'} jamakkol={jamakkol} aarudamV={aarudamV}
                        udayamV={udayamV} kavippuV={kavippuV}
                        styleV={[styles.box, styles.topNull]}
                    />
                    </View>
                    <View style={styles.row}>
                    <Rasi
                        data={JP['10']}
                        rasiNum={'10'} jamakkol={jamakkol} aarudamV={aarudamV}
                        udayamV={udayamV} kavippuV={kavippuV}
                        styleV={[styles.box, styles.topNull, styles.bottomNull]}
                    />
                    <Text style={styles.centerPart}>
                        <Text style={styles.centerTextStyle}>
                            {`கிழமைநாதன்: ${day}\n`}
                        </Text>
                        <Text style={styles.centerTextStyle}>
                            {`சூரிய நேரம் 1: ${sunRiseTime}\n`}
                        </Text>
                        <Text style={styles.centerTextStyle}>
                            {`சூரிய நேரம் 2: ${sunSetTime}`}
                        </Text>
                    </Text>
                    <Rasi
                        data={JP['5']}
                        rasiNum={'5'} jamakkol={jamakkol} aarudamV={aarudamV}
                        udayamV={udayamV} kavippuV={kavippuV}
                        styleV={[styles.box, styles.topNull, styles.bottomNull]}
                    />
                    </View>
                    <View style={styles.row}>
                    <Rasi
                        data={JP['9']}
                        rasiNum={'9'} jamakkol={jamakkol} aarudamV={aarudamV}
                        udayamV={udayamV} kavippuV={kavippuV} styleV={[styles.box]}
                    />
                    <Rasi
                        data={JP['8']}
                        rasiNum={'8'} jamakkol={jamakkol} aarudamV={aarudamV}
                        udayamV={udayamV} kavippuV={kavippuV}
                        styleV={[styles.box, styles.leftNull]}
                    />
                    <Rasi
                        data={JP['7']}
                        rasiNum={'7'} jamakkol={jamakkol} aarudamV={aarudamV}
                        udayamV={udayamV} kavippuV={kavippuV}
                        styleV={[styles.box, styles.leftNull, styles.rightNull]}
                    />
                    <Rasi
                        data={JP['6']}
                        rasiNum={'6'} jamakkol={jamakkol} aarudamV={aarudamV}
                        udayamV={udayamV} kavippuV={kavippuV} styleV={[styles.box]}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    headingStyle: {
      fontSize: 30 * bp, fontWeight: '500', textAlign: 'center'
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    box: {
      borderWidth: 1.5 * bp,
      borderColor: '#000',
      width: 88,
      height: 16.5 * vh,
      padding: 5 * bp,
      textAlign: 'center',
      backgroundColor: '#FFF'
    },
    centerPart: {
      borderWidth: 3 * bp,
      textAlign: 'center',
      paddingVertical: 5 * bp,
      backgroundColor: '#FFF',
      borderColor: '#FFF',
      width: (88 * 2) * bp,
      height: 16.5 * vh
    },
    leftNull: {
      borderLeftWidth: 0
    },
    rightNull: {
      borderRightWidth: 0
    },
    bottomNull: {
      borderBottomWidth: 0
    },
    topNull: {
      borderTopWidth: 0
    },
    centerTextStyle: {
      fontSize: 16 * bp
    }
  });

export default Main;