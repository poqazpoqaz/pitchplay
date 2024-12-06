import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RefundPage from './RefundPage';

const RefundMain = ({ gridArea }) => {
    const [userCash, setUsercash] = useState(0);
    const [name, setName] = useState("");  // 빈 문자열로 초기화
    const [account, setAccount] = useState("");  // 빈 문자열로 초기화
    const [accountNum, setAccountNum] = useState("");  // 빈 문자열로 초기화

    const [selectedBank, setSelectedBank] = useState("");  // 빈 문자열로 초기화
    const [accountNumber, setAccountNumber] = useState("");  // 빈 문자열로 초기화
    const [accountHolder, setAccountHolder] = useState("");  // 빈 문자열로 초기화
    const [refundAmount, setRefundAmount] = useState("");  // 빈 문자열로 초기화
    const [isAgreed, setIsAgreed] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.userCash) {
            setUsercash(user.userCash);
            setName(user.name);
            setAccount(user.account);
            setAccountNum(user.accountNum);
        }
    }, []);

    const handleBankChange = (e) => setSelectedBank(e.target.value);
    const handleAccountNumberChange = (e) => setAccountNumber(e.target.value);
    const handleAccountHolderChange = (e) => setAccountHolder(e.target.value);

    const handleRefundAmountChange = (e) => {
        const sanitizedAmount = e.target.value.replace(/[^\d]/g, '');  // 숫자가 아닌 모든 문자를 제거하는 정규 표현식
        setRefundAmount(sanitizedAmount);
    };

    const handleCheckboxChange = () => setIsAgreed(!isAgreed);

    const validateForm = () => {
        const refund = Number(refundAmount);  // 문자열을 숫자로 변환

        if (refund > userCash) {
            setError('환불 금액은 보유 캐시를 초과할 수 없습니다.');
            return false;
        }

        if (refundAmount && refund % 10000 !== 0) {
            setError('환불 금액은 만원 단위로만 입력 가능합니다.');
            return false;
        }

        if (!/^\d{10,20}$/.test(accountNum)) {
            setError('유효한 계좌번호를 입력해주세요.');
            return false;
        }

        if (!isAgreed) {
            setError('환불 신청을 위해서는 동의해야 합니다.');
            return false;
        }

        setError('');  // 모든 검증이 통과하면 에러 메시지를 초기화
        return true;
    };

    const navigate = useNavigate();
    const handleSubmit = () => {
        if (validateForm()) {
            const refund = Number(refundAmount);
            const updatedUserCash = userCash - refund;

            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                user.userCash = updatedUserCash;
                localStorage.setItem('user', JSON.stringify(user));
            }

            setUsercash(updatedUserCash);
            alert('환불 신청이 완료되었습니다.');
            navigate('/mypage/:id');
        }
    };

    return (
        <div style={{ gridArea }}>
            <RefundPage
                userCash={userCash}
                account={account}
                accountNum={accountNum}
                name={name}
                refundAmount={refundAmount}
                isAgreed={isAgreed}
                error={error}
                handleAccountNumberChange={handleAccountNumberChange}
                handleAccountHolderChange={handleAccountHolderChange}
                handleRefundAmountChange={handleRefundAmountChange}
                handleCheckboxChange={handleCheckboxChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
};

export default RefundMain;