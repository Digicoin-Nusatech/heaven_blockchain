import * as React from 'react';

import { ArrowDownMd, CheckFillIcon, AttachmentIcon, SendIcon } from 'src/assets/images/P2PIcon';

export interface P2PChatProps {
    detail: any;
    showChat: boolean;
    handleExpandChat: () => void;
    handleModalReport: () => void;
}

export const P2PChat: React.FunctionComponent<P2PChatProps> = (props) => {
    const { detail, showChat, handleExpandChat, handleModalReport } = props;

    return (
        <React.Fragment>
            <div className="mb-4 right-side dark-bg-main p-3">
                <div className="d-flex justify-content-between align-items-center mb-24">
                    <h6 className="mb-0 text-md font-bold white-text">Chat Information </h6>
                    <div className="ml-2 cursor-pointer" onClick={handleExpandChat}>
                        <ArrowDownMd />
                    </div>
                </div>

                <div className="d-flex align-items-center justify-content-between mb-3 radius-md border-b-1 dark-bg-accent p-3">
                    <div className="d-flex align-items-center">
                        <img src="/img/coin.png" className="icon-lg" alt="" />
                        <div className="ml-3">
                            <p className="text-ms mb-2 white-text font-normal">
                                USDT CRYPTO <CheckFillIcon />
                            </p>
                            <p className="mb-1 grey-text-accent text-sm">30D Trades</p>
                            <p className="mb-1 grey-text-accent text-sm">30D Completetition Rate</p>
                        </div>
                    </div>
                    <div className="ml-2">
                        <p
                            onClick={handleModalReport}
                            className="text-xs my-2 danger-text font-normal text-right cursor-pointer">
                            Report
                        </p>
                        <p className="mb-1 grey-text-accent text-sm text-right">{detail?.order?.stats?.mount_trade}</p>
                        <p className="mb-1 grey-text-accent text-sm text-right">
                            {detail?.order?.stats?.completed_rate} %
                        </p>
                    </div>
                </div>
                {showChat && (
                    <div className="chat-wrap position-relative">
                        <div className="chat">
                            <div className="sender-chat">
                                <p className="sender-name text-xxs text-white">Bambang</p>
                                <div className="buble-chat">
                                    <span className="white-text text-xs">Yowes aku pesen komodone 12 yo mas</span>
                                    <div className="time grey-text-accent text-xxs">13.01</div>
                                </div>
                            </div>

                            <div className="my-chat">
                                <p className="sender-name text-xxs text-white">You</p>
                                <div className="buble-chat">
                                    <span className="white-text text-xs">Yowes deal mas, ditunggu 2 dino ya mas</span>
                                    <div className="time grey-text-accent text-xxs">13.01</div>
                                </div>
                            </div>

                            <div className="sender-chat">
                                <p className="sender-name text-xxs text-white">Bambang</p>
                                <div className="buble-chat">
                                    <span className="white-text text-xs">Lahh pie to mas ?</span>
                                    <div className="time grey-text-accent text-xxs">13.01</div>
                                </div>
                            </div>

                            <div className="my-chat">
                                <p className="sender-name text-xxs text-white">You</p>
                                <div className="buble-chat">
                                    <span className="white-text text-xs">
                                        Siki aku dadi jasa travel komodo mas, menowo njenengan purun ?
                                    </span>
                                    <div className="time grey-text-accent text-xxs">13.01</div>
                                </div>
                            </div>

                            <div className="my-chat">
                                <p className="sender-name text-xxs text-white">You</p>
                                <div className="buble-chat">
                                    <span className="white-text text-xs">Lohh Ora sido mas, saiki aku ora dodolan</span>
                                    <div className="time grey-text-accent text-xxs">13.01</div>
                                </div>
                            </div>

                            <div className="sender-chat">
                                <p className="sender-name text-xxs text-white">Bambang</p>
                                <div className="buble-chat">
                                    <span className="white-text text-xs">Ditunggu</span>
                                    <div className="time grey-text-accent text-xxs">13.01</div>
                                </div>
                            </div>

                            <div className="sender-chat">
                                <p className="sender-name text-xxs text-white">Bambang</p>
                                <div className="buble-chat">
                                    <span className="white-text text-xs">Y</span>
                                    <div className="time grey-text-accent text-xxs">13.01</div>
                                </div>
                            </div>

                            <div className="my-chat">
                                <p className="sender-name text-xxs text-white">You</p>
                                <div className="buble-chat">
                                    <span className="white-text text-xs">Sudah dikirim Ya Mas</span>
                                    <div className="time grey-text-accent text-xxs">13.01</div>
                                </div>
                            </div>

                            <div className="chat-notification py-1 px-2 my-1">
                                <p className="mb-0 text-xxs text-center font-normal primary-text">
                                    You have marked the order as paid, please wait for seller to confirm and release the
                                    asset.
                                </p>
                            </div>
                            <div className="chat-notification py-1 px-2 my-1">
                                <p className="mb-0 text-xxs text-center font-normal primary-text">
                                    Successfully placed an order, please pay within the time limit.
                                </p>
                            </div>

                            <div className="date my-2">
                                <p className="mb-0 text-xs grey-text text-center">12-01-2022</p>
                            </div>
                        </div>
                        <div className="chat-writing">
                            <textarea
                                placeholder="write a message"
                                className="form-transparent white-text w-100"></textarea>
                            <div className="ml-0 d-flex align-items-center">
                                <label htmlFor="attachment-file" className="cursor-pointer mb-0">
                                    <AttachmentIcon />
                                </label>
                                <input type="file" id="attachment-file" className="d-none" />
                                <button type="button" className="btn btn-transparent p-0 ml-2">
                                    <SendIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};