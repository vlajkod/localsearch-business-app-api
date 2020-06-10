import { DAYS_OF_THE_WEEK } from '@constants';
import { IOpeningHours } from '@interfaces';

function getFormatedPlaceData({ displayed_where, opening_hours, displayed_what }: any) {
    const { days } = opening_hours;
    const formatedOpeningHoursList: IOpeningHours[] = [];
    
    let lastIndex = -1;
    DAYS_OF_THE_WEEK.forEach((currentDay, dayIndex) => {
        if (dayIndex < lastIndex) {
            return;
        }
        const startDay = currentDay;
        const nextDayIndex = dayIndex + 1;
        const hours = formatHours(days[startDay]);
        const { endDay, lastDayIndex } = findEndDay(days, startDay, nextDayIndex);
        formatedOpeningHoursList.push({
            startDay,
            endDay,
            hours
        });
        lastIndex = lastDayIndex;
    });

    return {
        name: displayed_what,
        address: displayed_where,
        openingHours: formatedOpeningHoursList
    }
}

function findEndDay(days: any, currentDay: string, nextDayIndex: number): any {
    const isMaxIndex = DAYS_OF_THE_WEEK.length === nextDayIndex
    const nextDay = DAYS_OF_THE_WEEK[nextDayIndex];
    const currentDayFormattedHours = formatHours(days[currentDay]).toString();
    const nextDayFormattedHours = formatHours(days[nextDay]).toString();
    
    if (currentDayFormattedHours !== nextDayFormattedHours || isMaxIndex) {
        const previousDay = DAYS_OF_THE_WEEK[nextDayIndex - 1];
        const isPreveiousDayTheSameAsCurrantDay = currentDay === previousDay;
        return {
            endDay: isMaxIndex || isPreveiousDayTheSameAsCurrantDay ? null: previousDay,
            lastDayIndex: isMaxIndex ? nextDayIndex - 1 : nextDayIndex
        }
    }

    return findEndDay(days, currentDay, nextDayIndex + 1);
}

function formatHours(hoursSlot: any[] = []) {
    return hoursSlot
        .filter(slot => slot.type === 'OPEN')
        .map(slot => `${slot.start} - ${slot.end}`);
}

export default {
    getFormatedPlaceData,
    formatHours
};
