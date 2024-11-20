import "./Footer.css";
import {motion} from 'framer-motion';

const HoverEffect = {
    whileHover : {
        scale : 1.2
    }
}


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-title">PITCH PLAY</div>
      <nav className="footer-menu">
        <motion.a href="#menu1" {...HoverEffect}>메뉴</motion.a>
        <motion.a href="#menu2"{...HoverEffect}>이용 약관</motion.a>
        <motion.a href="#menu3"{...HoverEffect}>개인정보 처리방침</motion.a>
        <motion.a href="#menu4"{...HoverEffect}>사업자 정보 확인</motion.a>
      </nav>
      <div className="footer-text">
        <p>피치플레이 | 서울특별시 금천구 가산동 549-1 3층 | 대표메일 contact @pitchplay.com | 02-2025-8523 | 주식회사 피치플레이 | 사업자번호 XXX-XX-XXXXX | 대표 김근형 | 통신 판매업 신고 2024-서울가산-XXXX</p>
      </div>
    </footer>
  );
};

export default Footer;
