import React from 'react';
import CardContainer from '../../components/CardContainer';
import GujangNavbar from '../../components/GujangNavbar/GujangNavbar';

function ReservationPage({gridArea}) {
    return (
      <div style={{gridArea: gridArea}}>
        <GujangNavbar />
        <CardContainer />
      </div>
    );
  }

export default ReservationPage;
