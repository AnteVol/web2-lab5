import Parse from 'parse';

export const initializeParse = () => {
    Parse.initialize(
      "zFd1aRmpnNOlhvdcbD5u8XE0BMmEfcUhFmVLQfHs",
      "siVCGcQ20cQ3I3KXe3kwbRKPsZHiUoRUvlWt3zE8"
    );
    Parse.serverURL = 'https://parseapi.back4app.com/';
  };