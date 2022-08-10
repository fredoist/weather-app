export const useLocation = async () => {
  return new Promise<string>((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => resolve(`${coords.latitude},${coords.longitude}`),
        () => resolve("auto:ip"),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      resolve("auto:ip");
    }
  });
};
