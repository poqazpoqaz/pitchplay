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
            <div className="sidetop">
                {/* 이미지는 프롭스로 받아올꺼셈 */}
                {/* <img className="avatar" src={avatar} alt="User Avatar" /> */}
                <img className="topimg" src={pachiImage} alt="" />
                <div className="userinfo">
                    {/* 네임이랑 이메일도 프롭스로 받아올꺼셈 임시로 넣어둠 */}
                    <p className="username">{userName}박상진</p>
                    <p className="useremail">{userEmail}kosmo147@kosmo.com</p>
                </div>
            </div>
            <div className='sidemid' >
                <ul>
                    <li>
                        <img src={myinfo} alt="" />
                        <a href="">내 정보</a></li>
                    <li>
                        <img src={myactivity} alt="" />
                        <a href="">내 활동</a></li>
                    <li>
                        <img src={commnuity} alt="" />
                        <a href="">커뮤니티</a></li>
                    <li>
                        <img src={setting} alt="" />
                        <a href="">설정</a></li>
                </ul>
            </div>
            <div className="sidebottom">
                {/* 이미지는 프롭스로 받아올꺼셈 */}
                {/* <img className="avatar_bottom" src={avatar} alt="User Avatar" /> */}
                <img className='botimg' src={pachiImage} alt="" />
                <span className="logout" onClick={handleLogout}>로그아웃</span>
            </div>
        </div>


    )
};

export default Sidebar;