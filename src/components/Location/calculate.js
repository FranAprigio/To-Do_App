import { getRouteCoordinates } from './locationManager';
import { getDistance } from 'geolib';

export const calculateDistance = () => {
    const routeCoordinates = getRouteCoordinates();
    let totalDistance = 0;

    for (let i = 1; i < routeCoordinates.length; i++) {
        const distance = getDistance(
            { latitude: routeCoordinates[i - 1].latitude, longitude: routeCoordinates[i - 1].longitude },
            { latitude: routeCoordinates[i].latitude, longitude: routeCoordinates[i].longitude }
        );
        totalDistance += distance;
    }

    return totalDistance;
};