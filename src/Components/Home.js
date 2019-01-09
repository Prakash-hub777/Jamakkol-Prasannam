import React from 'react';
import { 
    StyleSheet, 
    Text, 
    TextInput, 
    Image, 
    Picker, 
    View,
    ScrollView,
    Dimensions, 
    Button 
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';

const width = Dimensions.get('window').width;
const { bp, vw, vh } = require('react-native-relative-units')(width);

const getDay = (date) => {
    switch (date.getDay()) {
        case 0:
            return 'கதிரவன்';
        case 1:
            return 'மதி';
        case 2:
            return 'சேய்';
        case 3:
            return 'மால்';
        case 4:
            return 'பொன்';
        case 5:
            return 'புகர்';
        case 6:
            return 'மந்தன்';
    }
};

export default class Home extends React.Component {
    state = {
        dateTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
        sunDegree: '0',
        sunMinute: '0',
        sunSeconds: '0',
        tamilMonth: '1',
        day: getDay(new Date()),
        sunRiseTime: '06:30',
        sunSetTime: '18:00'
    };

    renderPickerItems(type) {
        const values = [];

        switch (type) {
            case 'DEGREE':
                for (let i = 0; i <= 29; i++) {
                    values.push(i);
                }
                break;
            case 'MINUTE':
            case 'SECOND':
                for (let i = 0; i <= 59; i++) {
                    values.push(i);
                }
                break;
        }
        return values.map( (s, i) => {
            return <Picker.Item key={i} value={s.toString()} label={s.toString()} />
        });
    }

    render() {
        return (
        <ScrollView style={{backgroundColor: '#FFF'}}>
            <View style={styles.container}>
                <Image
                    style={styles.imageStyle}
                    source={require('../../assets/logo.png')}
                />
                <View style={styles.item}>
                    <Text style={[{ textAlign: 'center' }, styles.labelStyle]}> {'நேரம்: '} </Text>

                    <DatePicker
                        style={{ width: 200 * bp }}
                        date={this.state.dateTime}
                        mode="time"
                        format="HH:mm"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={datePickerStyles}
                        minuteInterval={10}
                        onDateChange={(dateTime) => { this.setState({ dateTime }); }}
                    />
                </View>

                <View style={styles.item}>
                    <Text style={[{ textAlign: 'center' }, styles.labelStyle]}> 
                        {'சூரியனின் நிலை (உதயம்/அஸ்தமனம்)'} 
                    </Text>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ backgroundColor: '#EEE' }}>
                            <Picker
                                selectedValue={this.state.sunDegree}
                                style={{ height: 5 * vh, width: 82.5 * bp }}
                                onValueChange={(itemValue, itemIndex) => this.setState({sunDegree: itemValue})}
                            >
                                {this.renderPickerItems('DEGREE')}
                            </Picker>
                        </View>

                        <View style={{ backgroundColor: '#EEE' }}>
                            <Picker
                                selectedValue={this.state.sunMinute}
                                style={{ height: 5 * vh, width: 82.5 * bp }}
                                onValueChange={(itemValue, itemIndex) => this.setState({sunMinute: itemValue})}
                            >
                                {this.renderPickerItems('MINUTE')}
                            </Picker>
                        </View>

                        <View style={{ backgroundColor: '#EEE' }}>
                            <Picker
                                selectedValue={this.state.sunSeconds}
                                style={{ height: 5 * vh, width: 82.5 * bp }}
                                onValueChange={(itemValue, itemIndex) => this.setState({sunSeconds: itemValue})}
                            >
                                {this.renderPickerItems('SECOND')}
                            </Picker>
                        </View>
                    </View>
                </View>

                <View style={styles.item}>
                    <Text style={styles.labelStyle}> {'தமிழ் மாதம் & கிழமை: '} </Text>

                    <View style={{ backgroundColor: '#EEE', flexDirection: 'row' }}>
                        <Picker
                            selectedValue={this.state.tamilMonth}
                            style={styles.pickerStyle}
                            onValueChange={(itemValue) => this.setState({ tamilMonth: itemValue })}
                        >
                            <Picker.Item label="சித்திரை" value="1" />
                            <Picker.Item label="வைகாசி" value="2" />
                            <Picker.Item label="ஆனி" value="3" />
                            <Picker.Item label="ஆடி" value="4" />
                            <Picker.Item label="ஆவணி" value="5" />
                            <Picker.Item label="புரட்டாசி" value="6" />
                            <Picker.Item label="ஐப்பசி" value="7" />
                            <Picker.Item label="கார்த்திகை" value="8" />
                            <Picker.Item label="மார்கழி" value="9" />
                            <Picker.Item label="தை" value="10" />
                            <Picker.Item label="மாசி" value="11" />
                            <Picker.Item label="பங்குனி" value="12" />
                        </Picker>
                    </View>
                </View>

                <View style={styles.item}>
                    <View style={{ backgroundColor: '#EEE', flexDirection: 'row' }}>
                        <Picker
                            selectedValue={this.state.day}
                            style={styles.pickerStyle}
                            onValueChange={(day) => this.setState({ day })}
                        >
                            <Picker.Item label="ஞாயிறு" value="கதிரவன்" />
                            <Picker.Item label="திங்கள்" value="மதி" />
                            <Picker.Item label="செவ்வாய்" value="சேய்" />
                            <Picker.Item label="புதன்" value="மால்" />
                            <Picker.Item label="வியாழன்" value="பொன்" />
                            <Picker.Item label="வெள்ளி" value="புகர்" />
                            <Picker.Item label="சனி" value="மந்தன்" />
                        </Picker>
                    </View>
                </View>

                <View style={styles.item}>
                    <Text style={styles.labelStyle}>
                        {'சூரிய உதயம் / சூரிய அஸ்தமனம்:'}
                    </Text>

                    <DatePicker
                        style={{ width: 200 * bp }}
                        date={this.state.sunRiseTime}
                        mode="time"
                        format="HH:mm"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={datePickerStyles}
                        minuteInterval={10}
                        onDateChange={(sunRiseTime) => { this.setState({ sunRiseTime }); }}
                    />
                </View>

                <View style={styles.item}>
                    <Text style={styles.labelStyle}>
                        {'சூரிய அஸ்தமனம் / சூரிய உதயம்:'}
                    </Text>

                    <DatePicker
                        style={{ width: 200 * bp }}
                        date={this.state.sunSetTime}
                        mode="time"
                        format="HH:mm"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={datePickerStyles}
                        minuteInterval={10}
                        onDateChange={(sunSetTime) => { this.setState({ sunSetTime }); }}
                    />
                </View>
                
                <Button
                    onPress={() => Actions.Main(this.state)}
                    title={'சாமக்கோள் பிரசன்னம் '}
                    color="#841584"
                    accessibilityLabel="Samakkol Prasannam"
                />
            </View>
        </ScrollView>
        );
    }
}
  
const datePickerStyles = StyleSheet.create({
    dateIcon: {
        position: 'absolute',
        left: 0,
        top: 4 * bp,
        marginLeft: 0
    },
    dateInput: {
        marginLeft: 36 * bp
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        paddingBottom: 1 * vh
    },
    sunInput: {
        height: 7 * vh,
        width: 35 * bp,
        backgroundColor: '#FFF',
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10 * bp
    },
    pickerStyle: {
        height: 7 * vh,
        width: 150 * bp
    },
    imageStyle: {
        flex: 1,
        width,
        height: 30 * vh,
        alignSelf: 'center',
        marginBottom: 2 * vh
    },
    labelStyle: {
        marginVertical: 2 * bp
    },
});
  