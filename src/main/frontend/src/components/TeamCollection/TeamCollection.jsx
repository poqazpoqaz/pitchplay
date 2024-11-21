// 나중에 데이터 연동할때 변수명 바꿔야함!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 

import { useState, useEffect } from "react";
import DisabledButton from "../DisabledButton";
import Button from "../Button";
import CircleImg from "../CircleImg";
import styles from "./TeamCollection.module.css";
import TeamCollectionItem from "./TeamCollectionItem";

function TeamCollection({ src, content }) {
    const [isFull, setIsFull] = useState(false);

    // content 변경 시 isFull 상태를 업데이트
    useEffect(() => {
        if (content.currentMembers && content.totalMembers) {
            const isFullCapacity = content.currentMembers / content.totalMembers === 1;
            setIsFull(isFullCapacity);
        }
    }, [content]); // content가 변경될 때마다 실행

    return (
        <div className={styles['teamcollection-grid']}>
            <CircleImg src={src} gridArea="img" />
            <TeamCollectionItem
                title={content.title}
                currentMembers={content.currentMembers}
                totalMembers={content.totalMembers}
                location={content.location}
                gender={content.gender}
                views={content.views}
                gridArea="text"
            />
            {!isFull ? (
                <Button color="var(--main-color)" size="medium" gridArea="btn1">
                    신청하기
                </Button>
            ) : (
                <DisabledButton size="medium" gridArea="btn1">
                    정원마감
                </DisabledButton>
            )}
            <Button color="var(--main-color)" size="medium" gridArea="btn2">
                자세히 보기
            </Button>
        </div>
    );
}

export default TeamCollection;




// 컴포넌트 생성시에 사용한 데이터 포맷
// const examples = [
//     {
//       "src": "/imgs/1.jpg",
//       "title": "KOSMO 팀원모집asdasdasdasdasdasdasdasd",
//       "location": "경기도 안양시",
//       "currentMembers": "2",
//       "totalMembers": "23",
//       "gender": "남자",
//       "views": "207"
//     },
//     {
//       "src": "/imgs/1.jpg",
//       "title": "123123123 팀원모집",
//       "location": "경기도 안양시",
//       "currentMembers": "23",
//       "totalMembers": "23",
//       "gender": "여자",
//       "views": "220"
//     }
//   ]


{/* <div>
{
  examples.map((example, index) => {
    // currentMembers와 totalMembers를 숫자로 변환
    const currentMembers = +example.currentMembers;  // +를 사용해 숫자로 변환
    const totalMembers = +example.totalMembers;      // +를 사용해 숫자로 변환

    // content 객체에 변환된 값을 전달
    return (
      <TeamCollection
        key={index}
        src={example.src}
        content={{
          ...example,
          currentMembers,
          totalMembers,
        }}
      />
    );
  })
}
</div> */}