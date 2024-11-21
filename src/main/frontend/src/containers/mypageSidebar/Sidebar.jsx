import React from 'react';
import './Sidebar.css';
import pachiImage from './pachi.jpg';
import axios from 'axios';

const Sidebar = ({ avatar, userName, userEmail }) => {

    const handleLogout = async () => {
        try {
            // 로그아웃 요청을 서버에 보냄
            const response = await axios.post('/api/logout');  // 로그아웃 API 엔드포인트

            if (response.status === 200) {
                // actions 랑 연동될 유지
                // 로그인 페이지로 이동
            }
        } catch (error) {
            console.error('로그아웃 실패:', error);
            alert('로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };
    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <div className="sidebar-user">
                    {/* <img className="avatar" src={avatar} alt="User Avatar" /> */}
                    <img className='avatar' src={pachiImage} alt="" />
                    <div className="user-info">
                        <div className="user-name">{userName}박상진</div>
                        <div className="user-email">{userEmail}잉잉</div>
                    </div>
                </div>
                <div className="sidebar-links">
                    <div className="link-item">
                        <a href="/my-info" className="link">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none">
                                    <path d="M15 20.75V13.25" stroke="#1C274C" strokeWidth="3.75" strokeLinecap="round" />
                                    <path d="M15 8.25C15.6904 8.25 16.25 8.80964 16.25 9.5C16.25 10.1904 15.6904 10.75 15 10.75C14.3096 10.75 13.75 10.1904 13.75 9.5C13.75 8.80964 14.3096 8.25 15 8.25Z" fill="#1C274C" />
                                    <path d="M8.75 3.67228C10.5886 2.60871 12.7232 2 15 2C21.9035 2 27.5 7.59644 27.5 14.5C27.5 21.4035 21.9035 27 15 27C8.09644 27 2.5 21.4035 2.5 14.5C2.5 12.2232 3.10871 10.0886 4.17228 8.25" stroke="#1C274C" strokeWidth="3.75" strokeLinecap="round" />
                                </svg>
                            </div>
                            <span>내 정보</span>
                        </a>
                    </div>
                    <div className="link-item">
                        <a href="/my-activity" className='link'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8636 3.87965L10.5515 2.56767C8.14323 3.15935 6.0702 4.60411 4.67121 6.56327L5.18344 8.47491L8.31833 9.70985L11.8636 7.34639V3.87965ZM2.77273 12.5C2.77273 11.9897 2.81011 11.488 2.88227 10.9977L4.37291 10.5983L7.43865 11.8061L8.24192 16.6548L6.28141 18.6155H4.80176C3.52733 16.9097 2.77273 14.793 2.77273 12.5ZM8.18544 21.5255C9.62026 22.2924 11.2594 22.7273 13 22.7273C14.8732 22.7273 16.6288 22.2236 18.1386 21.3445V20.2497L16.0708 18.1818H9.92917L8.18544 19.9256V21.5255ZM19.8779 18.7748H21.0767C22.4245 17.0424 23.2273 14.865 23.2273 12.5C23.2273 12.1576 23.2105 11.8192 23.1776 11.4855L21.6353 10.595L18.5612 11.8061L17.7579 16.6548L19.8779 18.7748ZM21.5042 6.81685C20.1061 4.729 17.9597 3.18465 15.4485 2.5677L14.1364 3.87995V7.34639L17.6815 9.70985L20.4676 8.61235L21.5042 6.81685ZM0.5 12.5C0.5 5.59644 6.09644 0 13 0C19.9035 0 25.5 5.59644 25.5 12.5C25.5 19.4035 19.9035 25 13 25C6.09644 25 0.5 19.4035 0.5 12.5ZM9.69552 11.5232L10.4221 15.9091H15.5777L16.3044 11.5232L13 9.32029L9.69552 11.5232Z" fill="#080341" />
                            </svg>
                        </div>
                        <span>내 활동</span>
                        </a>
                    </div>
                    <div className="link-item">
                        <a href="/community" className='link'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25" fill="none">
                                <path d="M13 1.92308C12.5264 1.92308 12.0722 2.12569 11.7373 2.48633C11.4024 2.84698 11.2143 3.33612 11.2143 3.84615C11.2143 4.35619 11.4024 4.84533 11.7373 5.20597C12.0722 5.56662 12.5264 5.76923 13 5.76923C13.4736 5.76923 13.9278 5.56662 14.2627 5.20597C14.5976 4.84533 14.7857 4.35619 14.7857 3.84615C14.7857 3.33612 14.5976 2.84698 14.2627 2.48633C13.9278 2.12569 13.4736 1.92308 13 1.92308ZM9.42857 3.84615C9.42857 2.82609 9.80485 1.84781 10.4746 1.12651C11.1444 0.405218 12.0528 0 13 0C13.9472 0 14.8556 0.405218 15.5254 1.12651C16.1952 1.84781 16.5714 2.82609 16.5714 3.84615C16.5714 4.86622 16.1952 5.8445 15.5254 6.5658C14.8556 7.28709 13.9472 7.69231 13 7.69231C12.0528 7.69231 11.1444 7.28709 10.4746 6.5658C9.80485 5.8445 9.42857 4.86622 9.42857 3.84615ZM21.4821 2.88462C21.1269 2.88462 20.7863 3.03657 20.5351 3.30706C20.284 3.57754 20.1429 3.9444 20.1429 4.32692C20.1429 4.70945 20.284 5.0763 20.5351 5.34679C20.7863 5.61727 21.1269 5.76923 21.4821 5.76923C21.8373 5.76923 22.178 5.61727 22.4292 5.34679C22.6803 5.0763 22.8214 4.70945 22.8214 4.32692C22.8214 3.9444 22.6803 3.57754 22.4292 3.30706C22.178 3.03657 21.8373 2.88462 21.4821 2.88462ZM18.3571 4.32692C18.3571 3.88497 18.438 3.44735 18.595 3.03905C18.7521 2.63074 18.9823 2.25974 19.2724 1.94724C19.5626 1.63473 19.9071 1.38684 20.2863 1.21771C20.6654 1.04859 21.0718 0.961538 21.4821 0.961538C21.8925 0.961538 22.2989 1.04859 22.678 1.21771C23.0572 1.38684 23.4017 1.63473 23.6919 1.94724C23.982 2.25974 24.2122 2.63074 24.3693 3.03905C24.5263 3.44735 24.6071 3.88497 24.6071 4.32692C24.6071 5.21948 24.2779 6.07548 23.6919 6.70661C23.1058 7.33774 22.3109 7.69231 21.4821 7.69231C20.6533 7.69231 19.8585 7.33774 19.2724 6.70661C18.6864 6.07548 18.3571 5.21948 18.3571 4.32692ZM3.17857 4.32692C3.17857 3.9444 3.31967 3.57754 3.57084 3.30706C3.822 3.03657 4.16266 2.88462 4.51786 2.88462C4.87306 2.88462 5.21371 3.03657 5.46488 3.30706C5.71604 3.57754 5.85714 3.9444 5.85714 4.32692C5.85714 4.70945 5.71604 5.0763 5.46488 5.34679C5.21371 5.61727 4.87306 5.76923 4.51786 5.76923C4.16266 5.76923 3.822 5.61727 3.57084 5.34679C3.31967 5.0763 3.17857 4.70945 3.17857 4.32692ZM4.51786 0.961538C3.68906 0.961538 2.8942 1.3161 2.30815 1.94724C1.7221 2.57837 1.39286 3.43437 1.39286 4.32692C1.39286 5.21948 1.7221 6.07548 2.30815 6.70661C2.8942 7.33774 3.68906 7.69231 4.51786 7.69231C5.34666 7.69231 6.14151 7.33774 6.72757 6.70661C7.31362 6.07548 7.64286 5.21948 7.64286 4.32692C7.64286 3.43437 7.31362 2.57837 6.72757 1.94724C6.14151 1.3161 5.34666 0.961538 4.51786 0.961538ZM6.43839 20.6779C6.03458 20.9645 5.56623 21.1281 5.08307 21.1512C4.5999 21.1743 4.11994 21.056 3.69413 20.8091C3.26832 20.5621 2.91255 20.1956 2.66458 19.7484C2.41661 19.3012 2.28569 18.7901 2.28571 18.2692V12.0192C2.28571 11.8917 2.33275 11.7694 2.41647 11.6793C2.50019 11.5891 2.61374 11.5385 2.73214 11.5385H6.33125C6.41269 10.8344 6.6742 10.1686 7.08661 9.61538H2.73214C2.14014 9.61538 1.57239 9.86865 1.15378 10.3195C0.735172 10.7703 0.5 11.3817 0.5 12.0192V18.2692C0.49977 19.0972 0.698089 19.9112 1.07575 20.6323C1.45341 21.3535 1.9976 21.9574 2.65563 22.3856C3.31366 22.8137 4.0632 23.0516 4.83168 23.0762C5.60015 23.1008 6.36149 22.9113 7.04196 22.526C6.76309 21.9426 6.56 21.3208 6.43839 20.6779ZM18.958 22.526C19.6385 22.9113 20.3999 23.1008 21.1683 23.0762C21.9368 23.0516 22.6863 22.8137 23.3444 22.3856C24.0024 21.9574 24.5466 21.3535 24.9243 20.6323C25.3019 19.9112 25.5002 19.0972 25.5 18.2692V12.0192C25.5 11.3817 25.2648 10.7703 24.8462 10.3195C24.4276 9.86865 23.8599 9.61538 23.2679 9.61538H18.9134C19.3254 10.1689 19.5869 10.8346 19.6687 11.5385H23.2679C23.3863 11.5385 23.4998 11.5891 23.5835 11.6793C23.6673 11.7694 23.7143 11.8917 23.7143 12.0192V18.2692C23.7143 18.7901 23.5834 19.3012 23.3354 19.7484C23.0874 20.1956 22.7317 20.5621 22.3059 20.8091C21.8801 21.056 21.4001 21.1743 20.9169 21.1512C20.4338 21.1281 19.9654 20.9645 19.5616 20.6779C19.44 21.3208 19.2369 21.9426 18.958 22.526ZM9.875 9.61538C9.283 9.61538 8.71524 9.86865 8.29664 10.3195C7.87803 10.7703 7.64286 11.3817 7.64286 12.0192V19.2308C7.64286 20.7609 8.20727 22.2283 9.21193 23.3102C10.2166 24.3922 11.5792 25 13 25C14.4208 25 15.7834 24.3922 16.7881 23.3102C17.7927 22.2283 18.3571 20.7609 18.3571 19.2308V12.0192C18.3571 11.3817 18.122 10.7703 17.7034 10.3195C17.2848 9.86865 16.717 9.61538 16.125 9.61538H9.875ZM9.42857 12.0192C9.42857 11.8917 9.47561 11.7694 9.55933 11.6793C9.64305 11.5891 9.7566 11.5385 9.875 11.5385H16.125C16.2434 11.5385 16.357 11.5891 16.4407 11.6793C16.5244 11.7694 16.5714 11.8917 16.5714 12.0192V19.2308C16.5714 20.2508 16.1952 21.2291 15.5254 21.9504C14.8556 22.6717 13.9472 23.0769 13 23.0769C12.0528 23.0769 11.1444 22.6717 10.4746 21.9504C9.80485 21.2291 9.42857 20.2508 9.42857 19.2308V12.0192Z" fill="#212C5F" />
                            </svg>
                        </div>
                        <span>커뮤니티</span>
                        </a>
                    </div>
                    <div className="link-item">
                        <a href="/setting" className='link'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14 1.5C14.6274 1.5 15.2439 1.54622 15.8465 1.63544L16.7534 4.38385C17.5488 4.61118 18.3038 4.93455 19.0048 5.3406L21.6119 4.08415C22.5345 4.79343 23.3553 5.62858 24.0486 6.5639L22.7462 9.14819C23.1394 9.85542 23.4493 10.6153 23.6626 11.4146L26.3944 12.3679C26.4641 12.9021 26.5 13.4468 26.5 14C26.5 14.6274 26.4538 15.2439 26.3646 15.8465L23.6162 16.7534C23.3888 17.5488 23.0655 18.3038 22.6594 19.0048L23.9158 21.6119C23.2066 22.5345 22.3714 23.3553 21.4361 24.0486L18.8518 22.7462C18.1446 23.1394 17.3847 23.4493 16.5854 23.6626L15.6321 26.3944C15.0979 26.4641 14.5532 26.5 14 26.5C13.3726 26.5 12.7561 26.4538 12.1535 26.3646L11.2466 23.6162C10.4512 23.3888 9.69625 23.0655 8.9952 22.6594L6.38805 23.9158C5.46548 23.2066 4.6447 22.3714 3.9514 21.4361L5.25378 18.8518C4.86032 18.1441 4.55029 17.3836 4.33695 16.5836L1.60536 15.6303C1.53585 15.0967 1.5 14.5526 1.5 14C1.5 13.3726 1.54622 12.7561 1.63544 12.1535L4.38385 11.2466C4.61118 10.4512 4.93455 9.69625 5.3406 8.9952L4.08415 6.38805C4.79343 5.46548 5.62858 4.6447 6.5639 3.9514L9.14819 5.25378C9.85594 4.86032 10.6164 4.55029 11.4164 4.33695L12.3697 1.60536C12.9033 1.53585 13.4474 1.5 14 1.5Z" stroke="#212C5F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M14.0017 19.3571C16.9603 19.3571 19.3588 16.9586 19.3588 14C19.3588 11.0413 16.9603 8.64282 14.0017 8.64282C11.043 8.64282 8.64453 11.0413 8.64453 14C8.64453 16.9586 11.043 19.3571 14.0017 19.3571Z" stroke="#212C5F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <span>설정</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="sidebar-bottom">
                <div className="logout">
                    {/* <img className="avatar_bottom" src={avatar} alt="User Avatar" /> */}
                    <img className='avatar-bottom' src={pachiImage} />

                    <span className='logout-button' onClick={handleLogout}>로그아웃</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
