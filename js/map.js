import {createAdvertElement} from './advertisements.js';
import {activatePage} from './form.js';
import {throttle} from './utils/throttle.js';

const addressInput = document.querySelector('#address');

const CENTER_TOKIO_COORDINATES = {
  lat: 35.689500,
  lng: 139.691710,
};

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  CENTER_TOKIO_COORDINATES,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const createMarker = (advert, group) => {
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat: advert.location.lat,
      lng: advert.location.lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(group)
    .bindPopup(createAdvertElement(advert),
      {
        keepInView: true,
      },
    );
};

function getLatLngString(latLng) {
  return `${latLng.lat.toFixed(5)} ${latLng.lng.toFixed(5)}`;
}

function resetMarker (mainMarker, mapObj) {
  mainMarker.setLatLng(CENTER_TOKIO_COORDINATES);
  mapObj.setView(CENTER_TOKIO_COORDINATES, 13);
}

function initMap(mainMarker) {
  const mapObj = L.map('map-canvas').on('load', () => {
    setTimeout(() => {
      activatePage();
      addressInput.value = getLatLngString(mainMarker.getLatLng());
    }, 1000);
  }).setView(CENTER_TOKIO_COORDINATES, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(mapObj);

  mainMarker.addTo(mapObj);
  mainMarker.on('moveend', () => {
    addressInput.value = getLatLngString(mainMarker.getLatLng());
  });

  return mapObj;
}

const createMarkerGroup = (mapObj) => {
  const group = L.layerGroup().addTo(mapObj);
  return group;
};

const initAdvertsOnMap = (mGroup, adverts) => {
  adverts.forEach((advert) => {
    createMarker(advert, mGroup);
  });
};

const updateFilteredMarkers = throttle((mGroup, adverts) => {
  mGroup.clearLayers();
  initAdvertsOnMap(mGroup, adverts);
}, 500);


const map = initMap(mainPinMarker);
const markerGroup = createMarkerGroup(map);

export {map, mainPinMarker, CENTER_TOKIO_COORDINATES, markerGroup, initAdvertsOnMap, updateFilteredMarkers, resetMarker, getLatLngString};
