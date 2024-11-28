import React, { useEffect } from 'react';

const KakaoMap = ({ lat, lng }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=748d20c2d0b857da185e5e7c655d9ac7&libraries=services&v=${new Date().getTime()}`;
    script.async = true;
    script.onload = () => {
      const mapContainer = document.getElementById('kakao-map');
      const mapOptions = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOptions);

      new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(lat, lng)
      });
    };
    document.head.appendChild(script);
  }, [lat, lng]);

  return (
    <div
      id="kakao-map"
      style={{
        width: '100%',
        height: '400px',
        marginTop: '20px',
      }}
    ></div>
  );
};

export default KakaoMap;



