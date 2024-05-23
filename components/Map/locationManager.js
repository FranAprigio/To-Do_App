let routeCoordinates = [];

export const addLocation = (latitude, longitude) => {
    routeCoordinates.push({ latitude, longitude });
};

export const getRouteCoordinates = () => {
    return routeCoordinates;
};

export const clearRouteCoordinates = () => {
    routeCoordinates = [];
};
