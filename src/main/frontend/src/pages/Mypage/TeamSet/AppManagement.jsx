import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStore as TeamStore } from "../../../stores/TeamStore/useStore";
import { useStore as UserStore } from "../../../stores/UserStore/useStore";
import { useStore as CollectionStore } from "../../../stores/CollectionStore/useStore";
import styles from "./AppManagement.module.css";
import AppStatus from "./AppStatus";
import MercenaryStatus from "./MercenaryStatus";

const AppMangement = ({ gridArea }) => {
  // URL에서 팀 코드를 가져오는 부분
  const { teamCode } = useParams(); // 팀 코드

  // 대기 중인 멤버와 용병 멤버의 상태를 관리하는 변수들
  const [pendingMembers, setPendingMembers] = useState([]); // 대기 중인 멤버 목록
  const [mercenaryMembers, setMercenaryMembers] = useState([]); // 용병 멤버 목록
  const [pendingMemberList, setPendingMemberList] = useState([]); // 대기 중인 멤버 상세 리스트
  const [mercenaryMemberList, setMercenaryMemberList] = useState([]); // 용병 멤버 상세 리스트
  const [userData, setUserData] = useState(null); // 사용자 데이터
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태

  // 각 스토어의 상태와 액션을 불러옵니다.
  const { state: userState, actions: userActions } = UserStore();
  const { state: teamState, actions: teamActions } = TeamStore();
  const { state: collectionState, actions: collectionActions } = CollectionStore();

  // 로컬 스토리지에서 사용자 데이터를 불러와 상태에 저장
  useEffect(() => {
    const userDataFromStorage = JSON.parse(localStorage.getItem("user"));
    if (userDataFromStorage) {
      setUserData(userDataFromStorage); // 데이터가 있으면 상태에 저장
    } else {
      console.error("유저 데이터가 로컬스토리지에 없습니다.");
    }
  }, []); // 한 번만 실행되게 설정

  // 팀 코드가 있을 경우 해당 팀과 컬렉션 데이터를 API로 가져오는 부분
  useEffect(() => {
    if (!teamCode) return; // 팀 코드가 없으면 데이터 로딩을 하지 않음

    setLoading(true); // 로딩 상태 시작

    // 팀 데이터와 컬렉션 데이터를 동시에 요청
    Promise.all([
      axios.get("/data/teamData.json"), // 팀 데이터 요청
      axios.get("/data/collectionsData.json") // 컬렉션 데이터 요청
    ])
      .then(([teamResponse, collectionResponse]) => {
        // 팀 데이터 처리
        const team = teamResponse.data.find(team => team.teamCode === teamCode);
        if (team) {
          setPendingMembers(team.pendingMembers); // 대기 중인 멤버 목록을 상태에 저장
        } else {
          console.error(`팀 코드 멤버(${teamCode})에 해당하는 팀을 찾을 수 없습니다.`);
        }

        // 컬렉션 데이터 처리
        const collection = collectionResponse.data.find(team => team.teamCode === teamCode);
        if (collection) {
          setMercenaryMembers(collection.mercenaryMembers); // 용병 멤버 목록을 상태에 저장
        } else {
          console.error(`팀 코드 용병(${teamCode})에 해당하는 컬렉션을 찾을 수 없습니다.`);
        }
      })
      .catch((err) => {
        console.error("데이터 로딩 중 오류 발생:", err);
      })
      .finally(() => {
        setLoading(false); // 데이터 로딩 완료
      });
  }, [teamCode]); // 팀 코드가 변경되면 데이터를 다시 불러옴

  // 대기 중인 멤버의 상세 정보를 업데이트하는 로직
  useEffect(() => {
    if (pendingMembers.length === 0) return; // 대기 멤버가 없으면 실행하지 않음

    axios
      .get("/data/userData.json") // 사용자 데이터를 가져오는 API 요청
      .then((response) => {
        const datas = response.data;
        const arr = pendingMembers
          .map((member) => {
            // 대기 중인 멤버의 데이터를 찾아서 상세 정보를 설정
            const user = datas.find((user) => user.nickname === member.pendingnickname);
            if (user) {
              return {
                pendingnickname: user.nickname,
                description: user.myDescription || "정보 없음", // 설명이 없으면 "정보 없음"
                profileImg: user.profileImg || "/default-profile.jpg", // 프로필 이미지, 없으면 기본 이미지
                applicationDate: member.applicationDate, // 신청일
              };
            }
            return null; // 해당 멤버가 없으면 null 반환
          })
          .filter(Boolean); // null을 제거하여 유효한 데이터만 남김
        setPendingMemberList(arr); // 대기 멤버 리스트 업데이트
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, [pendingMembers]); // pendingMembers가 변경될 때마다 실행

  // 용병 멤버의 상세 정보를 업데이트하는 로직
  useEffect(() => {
    if (mercenaryMembers.length === 0) return; // 용병 멤버가 없으면 실행하지 않음

    axios
      .get("/data/userData.json") // 사용자 데이터를 가져오는 API 요청
      .then((response) => {
        const datas = response.data;
        const arr = mercenaryMembers
          .map((member) => {
            // 용병 멤버의 데이터를 찾아서 상세 정보를 설정
            const user = datas.find((user) => user.nickname === member.mercenarynickname);
            if (user) {
              return {
                mercenarynickname: user.nickname,
                description: user.myDescription || "정보 없음", // 설명이 없으면 "정보 없음"
                profileImg: user.profileImg || "/default-profile.jpg", // 프로필 이미지, 없으면 기본 이미지
                applicationDate: member.applicationDate, // 신청일
              };
            }
            return null; // 해당 멤버가 없으면 null 반환
          })
          .filter(Boolean); // null을 제거하여 유효한 데이터만 남김
        setMercenaryMemberList(arr); // 용병 멤버 리스트 업데이트
      })
      .catch((err) => {
        console.error("Error fetching mercenary data:", err);
      });
  }, [mercenaryMembers]); // mercenaryMembers가 변경될 때마다 실행

  // 승인 처리 함수 (대기 중인 멤버)
  const onApprove = (member) => {
    console.log("Member approved:", member);
    // 사용자 팀에 현재 팀을 추가
    userActions.changeMyTeam([...userState.myTeam, teamState.teamName]);
    // 대기 중인 멤버 목록에서 해당 멤버를 제거
    const updatedPendingMembers = pendingMembers.filter(
      (m) => m.pendingnickname !== member.pendingnickname
    );
    setPendingMembers(updatedPendingMembers); // 업데이트된 목록 상태 저장
  };

  // 거절 처리 함수 (대기 중인 멤버)
  const onReject = (member) => {
    console.log("Member rejected:", member);
    // 대기 중인 멤버 목록에서 해당 멤버를 제거
    const updatedPendingMembers = pendingMembers.filter(
      (m) => m.pendingnickname !== member.pendingnickname
    );
    setPendingMembers(updatedPendingMembers); // 업데이트된 목록 상태 저장
  };

  // 용병 승인 처리 함수
  const onApproveMercenary = (member) => {
    console.log("Mercenary approved:", member);
    // 용병을 팀에 추가
    collectionActions.addMercenaryToTeam(member);
    // 용병 목록에서 해당 용병을 제거
    const updatedMercenaryMembers = mercenaryMembers.filter(
      (m) => m.mercenarynickname !== member.mercenarynickname
    );
    setMercenaryMembers(updatedMercenaryMembers); // 업데이트된 목록 상태 저장
  };

  // 용병 거절 처리 함수
  const onRejectMercenary = (member) => {
    console.log("Mercenary rejected:", member);
    // 용병 목록에서 해당 용병을 제거
    const updatedMercenaryMembers = mercenaryMembers.filter(
      (m) => m.mercenarynickname !== member.mercenarynickname
    );
    setMercenaryMembers(updatedMercenaryMembers); // 업데이트된 목록 상태 저장
  };

  // 로딩 중일 때 보여줄 화면
  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중인 경우
  }

  return (
    <div style={{ gridArea }}>
      <div className={styles.congrid}>
        <div className={styles.content}>
          <h1 className={styles.title}>마이페이지 &gt; 내 활동 &gt; 나의 팀 &gt; 신청 관리</h1>
          <AppStatus
            pendingMembers={pendingMemberList}
            onApprove={onApprove}
            onReject={onReject}
          />
          <MercenaryStatus
            mercenaryMembers={mercenaryMemberList}
            onApprove={onApproveMercenary}
            onReject={onRejectMercenary}
          />
        </div>
      </div>
    </div>
  );
};

export default AppMangement;
