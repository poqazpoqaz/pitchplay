import React from 'react';
import Header from '../../containers/header/Header';
import Footer from '../../containers/Footer/Footer';
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
