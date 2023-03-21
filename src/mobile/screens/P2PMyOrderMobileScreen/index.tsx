import React from 'react';
import { useHistory } from 'react-router';
import { MobileFilterIcon } from 'src/assets/images/P2PIcon';
import { ArrowLeft } from 'src/mobile/assets/Arrow';
import { NotifMobileIcon, HamburgerMobileIcon } from 'src/mobile/assets/P2PMobileIcon';
import { OrderP2PTableMobile } from 'src/mobile/containers/OrderP2PTableMobile';

const P2PMyOrderMobileScreen = () => {
    const history = useHistory();

    return (
        <section className="pg-mobile-screen-p2p mobile-container">
            <OrderP2PTableMobile />
        </section>
    );
};

export { P2PMyOrderMobileScreen };