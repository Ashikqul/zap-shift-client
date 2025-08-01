import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from '../Services/OurServices';
import Clients from '../ClientsLogo/ClientsLogo';
import Benefits from '../Benefit/Benefits';
import BeMerchant from '../BeMerchant/BeMerchant';
import ReviewClient from '../Review/ReviewClient';
import FAQ from '../FAQ/FAQ';

const Home = () => {
    return (
        <div>
        <Banner></Banner>
        
        <OurServices></OurServices>
        <Clients></Clients>
        <Benefits></Benefits>
        <BeMerchant></BeMerchant>
<ReviewClient></ReviewClient>
<FAQ></FAQ>

        </div>
    );
};

export default Home;