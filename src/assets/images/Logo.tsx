import * as React from 'react';

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = (props: LogoProps) => {
    return (
        <svg
            width="126"
            height="30"
            viewBox="0 0 126 30"
            className={props.className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20.4619 14.1707C20.4619 13.0661 21.3573 12.1707 22.4619 12.1707H34.8091C35.9136 12.1707 36.8091 13.0661 36.8091 14.1707V15.7835C36.8091 16.8881 35.9136 17.7835 34.8091 17.7835H22.4619C21.3573 17.7835 20.4619 16.8881 20.4619 15.7835V14.1707Z"
                fill="url(#paint0_linear_1841_9760)"
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M32.332 29.5783L48.8223 0.396973L55.1772 0.396973L38.687 29.5783H32.332Z"
                fill="url(#paint1_linear_1841_9760)"
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M48.8222 29.5781L32.332 0.396973H38.687L55.1771 29.5781H48.8222Z"
                fill="url(#paint2_linear_1841_9760)"
            />
            <path
                d="M6.33272 0.397705H0.49707V29.5785H6.309V18.0419H11.9786V29.5785H17.8143V0.397705H12.0023V11.9101H6.33272V0.397705Z"
                fill="url(#paint3_linear_1841_9760)"
            />
            <path
                d="M20.4473 4.04482V2.39771C20.4473 1.29314 21.3427 0.397705 22.4473 0.397705H28.3869C29.4914 0.397705 30.3869 1.29314 30.3869 2.39771V4.04482C30.3869 5.14939 29.4914 6.04482 28.3869 6.04482H22.4473C21.3427 6.04482 20.4473 5.14939 20.4473 4.04482Z"
                fill="url(#paint4_linear_1841_9760)"
            />
            <path
                d="M20.4473 27.6029V25.9558C20.4473 24.8512 21.3427 23.9558 22.4473 23.9558H28.3869C29.4914 23.9558 30.3869 24.8512 30.3869 25.9558V27.6029C30.3869 28.7075 29.4914 29.6029 28.3869 29.6029H22.4473C21.3427 29.6029 20.4473 28.7075 20.4473 27.6029Z"
                fill="url(#paint5_linear_1841_9760)"
            />
            <path
                d="M66.6417 8.92432H64.5457V11.1323H63.5537V5.85232H64.5457V8.04432H66.6417V5.85232H67.6337V11.1323H66.6417V8.92432ZM70.8484 5.85232H74.1244V6.73632H71.8404V8.05632H74.0924V8.91232H71.8404V10.2483H74.1244V11.1323H70.8484V5.85232ZM78.8502 5.85232H79.8542L81.8862 11.1323H80.8222L80.4102 9.99232H78.2982L77.8782 11.1323H76.8102L78.8502 5.85232ZM78.6262 9.10832H80.0822L79.3582 7.06032H79.3462L78.6262 9.10832ZM86.7395 11.1323H85.5995L83.6995 5.85232H84.8235L86.1715 9.87632L87.5195 5.85232H88.6435L86.7395 11.1323ZM91.5137 5.85232H94.7897V6.73632H92.5057V8.05632H94.7577V8.91232H92.5057V10.2483H94.7897V11.1323H91.5137V5.85232ZM98.9317 6.77632L98.9997 6.78832V11.1323H98.0037V5.85232H99.3797L101.748 10.1883L101.68 10.2043V5.85232H102.676V11.1323H101.292L98.9317 6.77632Z"
                fill="white"
            />
            <path
                d="M76.8789 16.5877H80.1549V17.4717H77.8709V18.7917H80.1229V19.6477H77.8709V20.9837H80.1549V21.8677H76.8789V16.5877ZM86.0729 20.9757C86.3503 20.9757 86.5969 20.937 86.8129 20.8597C87.0289 20.7797 87.1876 20.701 87.2889 20.6237L87.7169 21.4757C87.5943 21.5823 87.3823 21.6903 87.0809 21.7997C86.7823 21.909 86.4249 21.9637 86.0089 21.9637C85.6196 21.9637 85.2556 21.8957 84.9169 21.7597C84.5783 21.621 84.2809 21.429 84.0249 21.1837C83.7689 20.9357 83.5689 20.6463 83.4249 20.3157C83.2809 19.9823 83.2089 19.6223 83.2089 19.2357C83.2089 18.849 83.2796 18.489 83.4209 18.1557C83.5649 17.8197 83.7649 17.5277 84.0209 17.2797C84.2769 17.0317 84.5743 16.8383 84.9129 16.6997C85.2543 16.561 85.6196 16.4917 86.0089 16.4917C86.4249 16.4917 86.7823 16.5463 87.0809 16.6557C87.3823 16.765 87.5943 16.873 87.7169 16.9797L87.2889 17.8317C87.1876 17.7543 87.0289 17.677 86.8129 17.5997C86.5969 17.5197 86.3503 17.4797 86.0729 17.4797C85.7903 17.4797 85.5383 17.525 85.3169 17.6157C85.0983 17.7063 84.9116 17.833 84.7569 17.9957C84.6049 18.1557 84.4889 18.341 84.4089 18.5517C84.3289 18.7623 84.2889 18.9863 84.2889 19.2237C84.2889 19.4637 84.3289 19.6903 84.4089 19.9037C84.4889 20.1143 84.6049 20.301 84.7569 20.4637C84.9116 20.6237 85.0983 20.749 85.3169 20.8397C85.5383 20.9303 85.7903 20.9757 86.0729 20.9757ZM93.8141 19.6597H91.7181V21.8677H90.7261V16.5877H91.7181V18.7797H93.8141V16.5877H94.8061V21.8677H93.8141V19.6597ZM99.6888 16.5877H100.693L102.725 21.8677H101.661L101.249 20.7277H99.1368L98.7168 21.8677H97.6488L99.6888 16.5877ZM99.4648 19.8437H100.921L100.197 17.7957H100.185L99.4648 19.8437ZM106.376 17.5117L106.444 17.5237V21.8677H105.448V16.5877H106.824L109.192 20.9237L109.124 20.9397V16.5877H110.12V21.8677H108.736L106.376 17.5117ZM115.749 18.9477H118.429V19.2637C118.429 19.6397 118.365 19.9917 118.237 20.3197C118.112 20.645 117.932 20.9317 117.697 21.1797C117.462 21.425 117.184 21.617 116.861 21.7557C116.541 21.8943 116.188 21.9637 115.801 21.9637C115.404 21.9637 115.041 21.893 114.713 21.7517C114.385 21.6103 114.102 21.4143 113.865 21.1637C113.628 20.913 113.444 20.6223 113.313 20.2917C113.185 19.9583 113.121 19.6023 113.121 19.2237C113.121 18.8477 113.185 18.4943 113.313 18.1637C113.444 17.8303 113.628 17.5397 113.865 17.2917C114.102 17.041 114.385 16.845 114.713 16.7037C115.041 16.5623 115.404 16.4917 115.801 16.4917C116.108 16.4917 116.381 16.525 116.621 16.5917C116.861 16.6583 117.07 16.749 117.249 16.8637C117.43 16.9757 117.586 17.101 117.717 17.2397C117.85 17.3757 117.961 17.513 118.049 17.6517L117.113 18.1077C116.985 17.921 116.814 17.761 116.601 17.6277C116.39 17.4943 116.124 17.4277 115.801 17.4277C115.561 17.4277 115.34 17.4757 115.137 17.5717C114.937 17.665 114.764 17.7943 114.617 17.9597C114.473 18.125 114.361 18.317 114.281 18.5357C114.201 18.7517 114.161 18.981 114.161 19.2237C114.161 19.469 114.201 19.6997 114.281 19.9157C114.361 20.1317 114.473 20.3237 114.617 20.4917C114.764 20.657 114.937 20.7863 115.137 20.8797C115.34 20.973 115.561 21.0197 115.801 21.0197C116.02 21.0197 116.218 20.9877 116.397 20.9237C116.576 20.8597 116.73 20.769 116.861 20.6517C116.994 20.5343 117.1 20.397 117.177 20.2397C117.254 20.0797 117.298 19.9077 117.309 19.7237H115.749V18.9477ZM121.397 16.5877H124.673V17.4717H122.389V18.7917H124.641V19.6477H122.389V20.9837H124.673V21.8677H121.397V16.5877Z"
                fill="white"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_1841_9760"
                    x1="20.4619"
                    y1="12.1707"
                    x2="23.9098"
                    y2="22.2125"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#02C3BD" />
                    <stop offset="1" stop-color="#4062BB" />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_1841_9760"
                    x1="32.332"
                    y1="0.396973"
                    x2="60.6604"
                    y2="22.5744"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#02C3BD" />
                    <stop offset="1" stop-color="#4062BB" />
                </linearGradient>
                <linearGradient
                    id="paint2_linear_1841_9760"
                    x1="32.332"
                    y1="0.396973"
                    x2="60.6601"
                    y2="22.5743"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#02C3BD" />
                    <stop offset="1" stop-color="#4062BB" />
                </linearGradient>
                <linearGradient
                    id="paint3_linear_1841_9760"
                    x1="0.49707"
                    y1="0.397705"
                    x2="26.1109"
                    y2="15.5981"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#02C3BD" />
                    <stop offset="1" stop-color="#4062BB" />
                </linearGradient>
                <linearGradient
                    id="paint4_linear_1841_9760"
                    x1="20.4473"
                    y1="0.397705"
                    x2="25.2982"
                    y2="8.93591"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#02C3BD" />
                    <stop offset="1" stop-color="#4062BB" />
                </linearGradient>
                <linearGradient
                    id="paint5_linear_1841_9760"
                    x1="20.4473"
                    y1="23.9558"
                    x2="25.2982"
                    y2="32.494"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#02C3BD" />
                    <stop offset="1" stop-color="#4062BB" />
                </linearGradient>
            </defs>
        </svg>
    );
};
