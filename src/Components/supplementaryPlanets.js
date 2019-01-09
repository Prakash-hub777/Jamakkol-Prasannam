const rahuKalam = {
    கதிரவன்: { day: 180, night: 84 },
    மதி: { day: 36, night: 108 },
    சேய்: { day: 154, night: 60 },
    மால்: { day: 108, night: 180 },
    பொன்: { day: 132, night: 36 },
    புகர்: { day: 84, night: 154 },
    மந்தன்: { day: 60, night: 132 }
};

const mrthyu = {
    கதிரவன்: { day: 60, night: 312 },
    மதி: { day: 36, night: 288 },
    சேய்: { day: 12, night: 264 },
    மால்: { day: 156, night: 240 },
    பொன்: { day: 132, night: 216 },
    புகர்: { day: 108, night: 192 },
    மந்தன்: { day: 84, night: 336 }
};

const yemakandam = {
    கதிரவன்: { day: 108, night: 12 },
    மதி: { day: 84, night: 154 },
    சேய்: { day: 60, night: 132 },
    மால்: { day: 36, night: 108 },
    பொன்: { day: 12, night: 84 },
    புகர்: { day: 154, night: 60 },
    மந்தன்: { day: 132, night: 36 }
};

const mandhi = {
    கதிரவன்: { day: 156, night: 240 },
    மதி: { day: 132, night: 216 },
    சேய்: { day: 108, night: 192 },
    மால்: { day: 84, night: 336 },
    பொன்: { day: 60, night: 312 },
    புகர்: { day: 36, night: 288 },
    மந்தன்: { day: 12, night: 264 }
};

export const supplementaryPlanets = (sunPos, choice, dayType, day) => {
    let result = 0;

    switch (choice) {
        case 'rahuKalam':
            result = (sunPos + rahuKalam[day][dayType]) % 360;
            break;
        case 'yemakandam':
            result = (sunPos + yemakandam[day][dayType]) % 360;
            break;
        case 'mrthyu':
            result = (sunPos + mrthyu[day][dayType]) % 360;
            break;
        case 'mandhi':
            result = (sunPos + mandhi[day][dayType]) % 360;
            break;
    }

    if (dayType === 'night') {
        result = (result + 180) % 360;
    }

    return result;
};