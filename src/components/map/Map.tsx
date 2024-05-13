import { AdvancedMarker, APIProvider, Map as GoogleMap } from '@vis.gl/react-google-maps';
const Map = () => (
  <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}>
    <GoogleMap
      className={'w-[100vw] h-[300px] md:w-[600px] md:h-[400px]'}
      defaultCenter={{ lat: -16.55246508695984, lng: -68.0659536163635 }}
      defaultZoom={15}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID as string}
    >
      <AdvancedMarker position={{ lat: -16.55246508695984, lng: -68.0659536163635 }}>
        <img src={'/LeDomeLogo.jpg'} className={'w-[40px] h-[40px]'}/>
      </AdvancedMarker>
    </GoogleMap>
  </APIProvider>
);

export default Map;
