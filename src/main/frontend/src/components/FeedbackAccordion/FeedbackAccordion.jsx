import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../stores/FAQStore/useStore";
import "./FeedbackAccordion.css";
import ReportDetail from "./ReportDetail";

function FeedbackAccordion() {
    const { state: faqState, actions: faqActions } = useStore();

    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedReport, setSelectedReport] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/data/faqData.json");
                if (!response.ok) {
                    throw new Error("데이터를 불러오는 데 실패했습니다.");
                }
                const data = await response.json();
                setDataList(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // 클릭된 보고서 상세보기 및 조회수 증가 처리
    const handleViewReport = (faqNumber) => {
        const updatedDataList = [...dataList]; // 데이터 복사
        const report = updatedDataList.find(data => data.faqNumber === faqNumber);
        if (report) {
            // 조회수 증가
            report.views += 1;
            setDataList(updatedDataList); // 상태 업데이트

            setSelectedReport(report); // 선택된 보고서 설정
            faqActions.updateAllFields(report); // FAQ 상태 업데이트
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

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>에러 발생: {error}</p>;

    return (
        <div className="feedback-container">
            {selectedReport ? (
                // 선택된 보고서가 있으면 ReportDetail 컴포넌트를 표시
                <ReportDetail
                    report={selectedReport}
                    onGoBack={handleGoBack}
                    faqState={faqState}
                    faqActions={faqActions}
                />
            ) : (
                <>
                    <h2>건의/제보 게시판 리스트</h2>
                    <button className="add-report-btn" onClick={handleAddReport}>
                        건의/제보  글쓰기
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
                            {dataList.map((report) => (
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
