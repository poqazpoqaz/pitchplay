// 이메일 유효성 검사 정규 표현식은 추가로 작성필요***

// 이메일 유효성 검사 정규 표현식
export const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// 전화번호 유효성 검사 정규 표현식
export const phonePattern = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;
