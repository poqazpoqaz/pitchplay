import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useStore } from "../../stores/FAQStore/useStore";
import ReportDetail from "../FeedbackAccordion/ReportDetail";
import "./ConductAccordion.css";

function ConductAccordion() {
    const { state: faqState, actions: faqActions } = useStore();
    const { searchQuery } = useOutletContext(); // 부모 컴포넌트에서 전달된 searchQuery 사용

    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedReport, setSelectedReport] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/data/conductData.json");
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

    // 필터링된 데이터 리스트 생성
    const filteredDataList = dataList.filter(
        (report) =>
            report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.writeNickname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleViewReport = (faqNumber) => {
        const updatedDataList = [...dataList];
        const report = updatedDataList.find((r) => r.faqNumber === faqNumber);
        if (report) {
            report.views += 1;
            setDataList(updatedDataList);

            setSelectedReport(report);
            faqActions.updateAllFields(report);
        }
    };

    const handleGoBack = () => {
        setSelectedReport(null);
    };

    const handleAddReport = () => {
        navigate("/write");
    };

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>에러 발생: {error}</p>;

    return (
        <div className="feedback-container">
            {selectedReport ? (
                <ReportDetail
                    report={selectedReport}
                    onGoBack={handleGoBack}
                    faqState={faqState}
                    faqActions={faqActions}
                />
            ) : (
                <>
                    <h2>매너/제재 게시판 리스트</h2>
                    <button className="add-report-btn" onClick={handleAddReport}>
                        매너/제재 글쓰기
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
                            {filteredDataList.map((report) => (
                                <tr
                                    key={report.faqNumber}
                                    className="feedback-row"
                                    onClick={() => handleViewReport(report.faqNumber)}
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

export default ConductAccordion;
