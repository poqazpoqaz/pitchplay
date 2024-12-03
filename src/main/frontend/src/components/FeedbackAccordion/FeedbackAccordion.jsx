import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../stores/FAQStore/useStore";
import "./FeedbackAccordion.css";
import ReportDetail from "./ReportDetail";

function FeedbackAccordion() {
    // 상태 관리: faqState와 faqActions를 useStore로 가져옴.
    const { state: faqState, actions: faqActions } = useStore();
    
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리
    const [selectedReport, setSelectedReport] = useState(null); // 선택된 보고서 저장
    const navigate = useNavigate(); // 페이지 네비게이션을 위한 navigate 훅

    // 데이터 불러오기 (useEffect를 사용하여 컴포넌트 마운트 시 실행)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/data/faqData.json"); // 데이터 파일을 가져옵니다.
                if (!response.ok) { // 응답이 정상적이지 않으면 에러 처리
                    throw new Error("데이터를 불러오는 데 실패했습니다.");
                }
                const data = await response.json(); // JSON 데이터 파싱
                faqActions.setReports(data); // 상태에 데이터를 설정
            } catch (err) {
                setError(err.message); // 에러 발생 시 상태에 에러 메시지 저장
            } finally {
                setLoading(false); // 로딩 완료
            }
        };

        fetchData(); // 데이터 불러오기 함수 실행
    }, [faqActions]); // faqActions가 변경될 때마다 다시 실행

    // 클릭된 보고서 상세보기
    const handleViewReport = (faqNumber) => {
        const report = faqState.reports.find((r) => r.faqNumber === faqNumber);
        if (report) {
            setSelectedReport(report); // 선택된 보고서를 state에 저장
        }
    };

    // '뒤로가기' 버튼 클릭 시 처리
    const handleGoBack = () => {
        setSelectedReport(null); // 보고서 상세보기 화면을 닫고 목록 화면으로 돌아감
    };

    // '글쓰기' 버튼 클릭 시 글쓰기 페이지로 이동
    const handleAddReport = () => {
        navigate("/write"); // 글쓰기 페이지로 이동
    };

    // 로딩 중 또는 에러 발생 시 화면 표시
    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>에러 발생: {error}</p>;

    return (
        <div className="feedback-container">
            {selectedReport ? (
                // 선택된 보고서가 있으면 ReportDetail 컴포넌트를 표시
                <ReportDetail
                    report={selectedReport}
                    onGoBack={handleGoBack}
                />
            ) : (
                <>
                    <h2>건의 / 제보 게시판 리스트</h2>
                    <button className="add-report-btn" onClick={handleAddReport}>
                        건의/제보 글쓰기
                    </button>
                    <table className="feedback-table">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>날짜</th>
                                <th>상태</th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faqState.reports.map((report) => (
                                <tr
                                    key={report.faqNumber}
                                    className="feedback-row"
                                    onClick={() => handleViewReport(report.faqNumber)} // 클릭 시 해당 보고서 상세보기
                                >
                                    <td>{report.faqNumber}</td>
                                    <td>{report.title}</td>
                                    <td>{report.writeNickname}</td>
                                    <td>{report.date}</td>
                                    <td>{report.status}</td>
                                    <td>{report.views}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default FeedbackAccordion;
