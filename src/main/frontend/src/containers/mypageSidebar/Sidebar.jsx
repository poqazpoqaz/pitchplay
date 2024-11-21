import React from 'react';
import './Sidebar.css';
import pachiImage from './pachi.jpg';
import axios from 'axios';
import myinfo from "/imgs/myinfo.svg";
import myactivity from "/imgs/myactivity.svg";
import commnuity from "/imgs/commnuity.svg";
import setting from "/imgs/setting.svg";


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
                                <img src={myinfo} alt="" />
                            </div>
                            <span>내 정보</span>
                        </a>
                    </div>
                    <div className="link-item">
                        <a href="/my-activity" className='link'>
                        <div>
                            <img src={myactivity} alt="" />
                        </div>
                        <span>내 활동</span>
                        </a>
                    </div>
                    <div className="link-item">
                        <a href="/community" className='link'>
                        <div>
                            <img src={commnuity} alt="" />
                        </div>
                        <span>커뮤니티</span>
                        </a>
                    </div>
                    <div className="link-item">
                        <a href="/setting" className='link'>
                        <div>
                            <img src={setting} alt="" />
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
