import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter, Link } from 'react-router-dom';
import { History } from 'history';
import { compose } from 'redux';
import { ModalComingSoon } from '../../../components';
import { IntlProps } from '../../../';
import {
    Market,
    RootState,
    Currency,
    selectCurrentColorTheme,
    selectCurrentMarket,
    selectCurrencies,
    setMobileWalletUi,
    toggleMarketSelector,
} from '../../../modules';
import {
    AddUserIcon,
    AnalysIcon,
    AnnouncementIcon,
    ApiIcon,
    CalendarIcon,
    FaqIcon,
    SecurityIcon,
    SettingIcon,
    UserIcon,
    WalletIcon,
    OverviewIcon,
    DepositIcon,
    WithdrawlIcon,
    InternalTransferIcon,
} from '../../../assets/images/sidebar';
import './Sidebar.pcss';
import '../../../styles/colors.pcss';

interface ReduxProps {
    currentMarket: Market | undefined;
    colorTheme: string;
    currencies: Currency | any;
}

interface DispatchProps {
    setMobileWalletUi?: typeof setMobileWalletUi;
}

interface LocationProps extends RouterProps {
    location?: {
        pathname: string;
    };
    history: History;
}

export interface SidebarState {
    dataProfile: any;
    showModalComingSoon: boolean;
}

const sidebarProfile = [
    '/profile',
    '/profile/referral',
    '/profile/api-key',
    '/markets-open',
    '/security/2fa',
    '/wallets',
    '/history-transaction',
    '/trade-history',
    'change-email',
];

type Props = DispatchProps & LocationProps;

class Side extends React.Component<Props, SidebarState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            dataProfile: [],
            showModalComingSoon: false,
        };
    }

    componentDidMount() {
        this.setState({
            dataProfile: [
                {
                    name: 'Dashboard',
                    icon: (
                        <UserIcon
                            strokeColor={
                                localStorage.getItem("sidebar") === 'Dashboard'
                                    ? 'var(--text-primary-color)'
                                    : 'var(--text-secondary-color)'
                            }
                        />
                    ),
                    path: '/profile',
                    comingsoon: false,
                },
                {
                    name: 'Wallet',
                    icon: (
                        <WalletIcon
                            fillColor={
                                localStorage.getItem("sidebar") === 'Wallet'
                                    ? 'var(--text-primary-color)'
                                    : 'var(--text-secondary-color)'
                            }
                        />
                    ),
                    path: '/wallets',
                    comingsoon: false,
                },
                {
                    name: 'Market Order',
                    icon: (
                        <AnalysIcon
                            fillColor={
                                localStorage.getItem("sidebar") === 'Market Order'
                                    ? 'var(--text-primary-color)'
                                    : 'var(--text-secondary-color)'
                            }
                        />
                    ),
                    path: '/markets-open',
                    comingsoon: false,
                },
                {
                    name: 'Trade History',
                    icon: (
                        <CalendarIcon
                            fillColor={
                                localStorage.getItem("sidebar") === 'Trade History'
                                    ? 'var(--text-primary-color)'
                                    : 'var(--text-secondary-color)'
                            }
                        />
                    ),
                    path: '/trade-history',
                    comingsoon: false,
                },
                {
                    name: 'Security',
                    icon: (
                        <SecurityIcon
                            fillColor={
                                localStorage.getItem("sidebar") === 'Security'
                                    ? 'var(--text-primary-color)'
                                    : 'var(--text-secondary-color)'
                            }
                        />
                    ),
                    path: '/profile/security',
                    comingsoon: false,
                },
                {
                    name: 'Referral',
                    icon: (
                        <AddUserIcon
                            fillColor={
                                localStorage.getItem("sidebar") === 'Referral'
                                    ? 'var(--text-primary-color)'
                                    : 'var(--text-secondary-color)'
                            }
                        />
                    ),
                    path: '/profile/referral',
                    comingsoon: false,
                },
                {
                    name: 'API Management',
                    icon: (
                        <ApiIcon
                            fillColor={
                                localStorage.getItem("sidebar") === 'API Management'
                                    ? 'var(--text-primary-color)'
                                    : 'var(--text-secondary-color)'
                            }
                        />
                    ),
                    path: '/profile/api-key',
                    comingsoon: false,
                },
                {
                    name: 'Announcement',
                    icon: (
                        <AnnouncementIcon
                            fillColor={
                                localStorage.getItem("sidebar") === 'Announcement'
                                    ? 'var(--text-primary-color)'
                                    : 'var(--text-secondary-color)'
                            }
                        />
                    ),
                    path: '/announcement',
                    comingsoon: false,
                },
                {
                    name: 'FAQ',
                    icon: (
                        <FaqIcon
                            fillColor={
                                localStorage.getItem("sidebar") === 'FAQ'
                                    ? 'var(--text-primary-color)'
                                    : 'var(--text-secondary-color)'
                            }
                        />
                    ),
                    path: '/faq',
                    comingsoon: false,
                },
            ],
        });
    }

    public render() {
        const thisSidebarProfile = sidebarProfile.some(
            (r) =>
                location.pathname.includes(r) &&
                !location.pathname.includes('deposit') &&
                !location.pathname.includes('withdraw')
        );

        return (
            <React.Fragment>
                {thisSidebarProfile && (
                    <div className="sidebar dark-bg-accent">
                        <div className="mb-36"></div>
                        <ul>
                            {this.state.dataProfile.slice(0, 4).map((el, i) => (
                                <li
                                    key={i}
                                    onClick={() => {
                                        if (el.comingsoon) {
                                            this.setState({ showModalComingSoon: !this.state.showModalComingSoon });
                                        } else {
                                            localStorage.setItem("sidebar", el.name)
                                            this.props.history.push(el.path);
                                        }
                                    }}
                                    className="d-flex align-items-center cursor-pointer ml-20 mt-8 mb-8">
                                    <div className="mr-8">
                                        {el.name === 'Dashboard' ? (
                                            <UserIcon
                                                strokeColor={
                                                    localStorage.getItem("sidebar") === 'Dashboard'
                                                        ? 'var(--text-primary-color)'
                                                        : 'var(--text-secondary-color)'
                                                }
                                            />
                                        ) : el.name === 'Wallet' ? (
                                            <WalletIcon
                                                fillColor={
                                                    localStorage.getItem("sidebar") === 'Wallet'
                                                        ? 'var(--text-primary-color)'
                                                        : 'var(--text-secondary-color)'
                                                }
                                            />
                                        ) : el.name === 'Market Order' ? (
                                            <AnalysIcon
                                                fillColor={
                                                    localStorage.getItem("sidebar") === 'Market Order'
                                                        ? 'var(--text-primary-color)'
                                                        : 'var(--text-secondary-color)'
                                                }
                                            />
                                        ) : el.name === 'Trade History' ? (
                                            <CalendarIcon
                                                fillColor={
                                                    localStorage.getItem("sidebar") === 'Trade History'
                                                        ? 'var(--text-primary-color)'
                                                        : 'var(--text-secondary-color)'
                                                }
                                            />
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                    <p
                                        className={`font-bold text-sm mb-0 ${
                                            localStorage.getItem("sidebar") === el.name ? 'white-text' : 'grey-text'
                                        }`}>
                                        {el.name}
                                    </p>
                                </li>
                            ))}
                        </ul>
                        <div className="devider"></div>
                        <ul>
                            {this.state.dataProfile.slice(4).map((el, i) => (
                                <li
                                    key={i}
                                    onClick={() => {
                                        if (el.comingsoon) {
                                            this.setState({ showModalComingSoon: !this.state.showModalComingSoon });
                                        } else {
                                            localStorage.setItem("sidebar", el.name)
                                            this.props.history.push(el.path);
                                        }
                                    }}
                                    className="d-flex align-items-center cursor-pointer ml-20 mt-8 mb-8">
                                    <div className="mr-8">
                                        {el.name === 'Profile Setting' ? (
                                            <SettingIcon
                                                fillColor={
                                                    localStorage.getItem("sidebar") === 'Profile Setting'
                                                        ? 'var(--text-primary-color)'
                                                        : 'var(--text-secondary-color)'
                                                }
                                            />
                                        ) : el.name === 'Security' ? (
                                            <SecurityIcon
                                                fillColor={
                                                    localStorage.getItem("sidebar") === 'Security'
                                                        ? 'var(--text-primary-color)'
                                                        : 'var(--text-secondary-color)'
                                                }
                                            />
                                        ) : el.name === 'Referral' ? (
                                            <AddUserIcon
                                                fillColor={
                                                    localStorage.getItem("sidebar") === 'Referral'
                                                        ? 'var(--text-primary-color)'
                                                        : 'var(--text-secondary-color)'
                                                }
                                            />
                                        ) : el.name === 'API Management' ? (
                                            <ApiIcon
                                                fillColor={
                                                    localStorage.getItem("sidebar") === 'API Management'
                                                        ? 'var(--text-primary-color)'
                                                        : 'var(--text-secondary-color)'
                                                }
                                            />
                                        ) : el.name === 'Announcement' ? (
                                            <AnnouncementIcon
                                                fillColor={
                                                    localStorage.getItem("sidebar") === 'Announcement'
                                                        ? 'var(--text-primary-color)'
                                                        : 'var(--text-secondary-color)'
                                                }
                                            />
                                        ) : el.name === 'FAQ' ? (
                                            <FaqIcon
                                                fillColor={
                                                    localStorage.getItem("sidebar") === 'FAQ'
                                                        ? 'var(--text-primary-color)'
                                                        : 'var(--text-secondary-color)'
                                                }
                                            />
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                    <p
                                        className={`font-bold text-sm mb-0 ${
                                            localStorage.getItem("sidebar") === el.name ? 'white-text' : 'grey-text'
                                        }`}>
                                        {el.name}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {!thisSidebarProfile && <React.Fragment />}

                {this.state.showModalComingSoon && (
                    <ModalComingSoon
                        onClose={() => this.setState({ showModalComingSoon: false })}
                        show={this.state.showModalComingSoon}
                    />
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    currencies: selectCurrencies(state),
    currentMarket: selectCurrentMarket(state),
    colorTheme: selectCurrentColorTheme(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (dispatch) => ({
    setMobileWalletUi: (payload) => dispatch(setMobileWalletUi(payload)),
    toggleMarketSelector: () => dispatch(toggleMarketSelector()),
});

export const Sidebar = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Side) as React.ComponentClass;
