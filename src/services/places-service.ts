import { DAYS_OF_THE_WEEK } from '@constants';
import { IOpeningHours, IDay, IPlaceData } from '@interfaces';
import { PlaceDataException } from '@exceptions';

function getFormatedPlaceData({ displayed_where, opening_hours, displayed_what }: IPlaceData) {
    // validate data
    if (!displayed_what && !displayed_where && !(opening_hours && opening_hours.days)) {
        throw PlaceDataException(`The necessary place data are not provided.`);
    }

    return {
        name: displayed_what,
        address: displayed_where,
        openingHours: formatOpeningHours(opening_hours)
    };
}

function formatOpeningHours({ days }: any) {
    const formatedOpeningHoursList: IOpeningHours[] = [];
    let lastIndex = -1;

    DAYS_OF_THE_WEEK.forEach((startDay, dayIndex) => {
        if (dayIndex < lastIndex) {
            return;
        }

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
    return formatedOpeningHoursList;
}

function findEndDay(days: any, currentDay: string, nextDayIndex: number): any {
    const isMaxIndex = DAYS_OF_THE_WEEK.length === nextDayIndex;
    const nextDay = DAYS_OF_THE_WEEK[nextDayIndex];
    const currentDayFormattedHours = formatHours(days[currentDay]).toString();
    const nextDayFormattedHours = formatHours(days[nextDay]).toString();

    if (currentDayFormattedHours !== nextDayFormattedHours || isMaxIndex) {
        const previousDay = DAYS_OF_THE_WEEK[nextDayIndex - 1];
        const isPreviousDayTheSameAsCurrantDay = currentDay === previousDay;
        const endDay = isMaxIndex || isPreviousDayTheSameAsCurrantDay ? null : previousDay;
        const lastDayIndex = isMaxIndex ? nextDayIndex - 1 : nextDayIndex;
        return {
            endDay,
            lastDayIndex
        };
    }
    return findEndDay(days, currentDay, nextDayIndex + 1);
}

function formatHours(hoursSlot: IDay[] = []) {
    const isTypeOpen = (slot: IDay) => slot.type === 'OPEN';
    const formatText = (slot: IDay) => `${slot.start} - ${slot.end}`;
    return hoursSlot.filter(isTypeOpen).map(formatText);
}

export default {
    getFormatedPlaceData,
    formatHours
};
