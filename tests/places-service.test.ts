import placesData from './places-data.json';

import placeService from '@services/places-service';

let fakeData: any;

describe('Place service', () => {
    beforeEach(() => {
        fakeData = JSON.parse(JSON.stringify(placesData));
    });

    it('checks if it has necessary fields', () => {
        const place = placeService.getFormatedPlaceData(fakeData[0].data);
        expect(place).toHaveProperty('name');
        expect(place).toHaveProperty('openingHours');
        expect(place).toHaveProperty('address');
    });

    it('checks if name has right vaule', () => {
        const { data, expectedData } = fakeData[0];
        const place = placeService.getFormatedPlaceData(data);
        expect(place.name).toBe(expectedData.name);
    });

    it('checks if address has right vaule', () => {
        const { data, expectedData } = fakeData[0];
        const place = placeService.getFormatedPlaceData(data);
        expect(place.address).toBe(expectedData.address);
    });

    it('checks if openingHours has right format', () => {
        fakeData.forEach((fakePlace: any) => {
            const { data, expectedData } = fakePlace;
            const place = placeService.getFormatedPlaceData(data);
            expect(place.openingHours).toStrictEqual(expectedData.openingHours);
        });
    });

    it('formats hours to be readable', () => {
        const { data, expectedData } = fakeData[0];
        const { days } = data.opening_hours;
        const placeHoursFormatted = placeService.formatHours(days.monday);
        const formatedHours = expectedData.openingHours.find((item: any) => item.startDay === 'monday');
        expect(placeHoursFormatted).toStrictEqual(formatedHours.hours);
    });

    it('check if fn params is formats hours to be readable', () => {
        const placeHoursFormatted = placeService.formatHours(undefined);
        expect(placeHoursFormatted).toStrictEqual([]);
    });
});
