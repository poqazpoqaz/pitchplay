import "./Footer.css";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" style={{ gridArea: "footer" }}>
      <div className="footer-title">PITCH PLAY</div>
      <nav className="footer-menu">
        <Link to="/term" className="footer-link">이용 약관</Link>
        <Link to="/psinfo" className="footer-link">개인정보 처리방침</Link>
        <Link to="/business" className="footer-link">사업자 정보 확인</Link>
      </nav>
      <div className="footer-text">
        <p>피치플레이 | 서울특별시 금천구 가산동 549-1 3층 | 대표메일 contact @pitchplay.com | 02-2025-8523 | 주식회사 피치플레이 | 사업자번호 XXX-XX-XXXXX | 대표 김근형 | 통신 판매업 신고 2024-서울가산-XXXX</p>
      </div>
    </footer>
  );
};

export default Footer;
