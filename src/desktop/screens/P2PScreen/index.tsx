import * as React from 'react';
import { useDocumentTitle } from '../../../hooks';
import { HeaderP2P, BannerP2P, TableListP2P } from '../../containers';

export const P2PScreen: React.FC = () => {
    useDocumentTitle('P2P');

    return (
        <React.Fragment>
            <div className="pg-screen-p2p">
                <div className="header-container">
                    <HeaderP2P />
                </div>

                <div>
                    <BannerP2P />
                </div>

                <div className="com-content-table-list-p2p-container">
                    <div className="d-flex justify-content-between align-items-center overflow-x-scroll mb-48">
                        <img src="/img/landing-card.png" alt="adsense" className="px-6" />
                        <img src="/img/landing-card.png" alt="adsense" className="px-6" />
                        <img src="/img/landing-card.png" alt="adsense" className="px-6" />
                    </div>
                    <TableListP2P />
                </div>
            </div>
        </React.Fragment>
    );
};
