// Top2.js
import React from 'react';

const Top2 = ({ username, usercash }) => {
    return (
        <div className="top2">
            <h2>{username} : 님</h2>
            <p>잔액 : {usercash} 원</p>
            <ul>
                <li><a href="/charge" className="link-button">충전하기</a></li>
                <li><a href="/refund" className="link-button">환불하기</a></li>
                <li><a href="/history" className="link-button">사용내역</a></li>
            </ul>
        </div>
    );
};

export default Top2;
