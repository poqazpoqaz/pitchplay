import styles from './MypageAct05.module.css';
import {useStore} from '../../../../stores/TeamStore/useStore';
import MemberList from './MemberList';

const MypageAct05 = () => {
    
    const {state , actions} = useStore();
  
    const handleChangeRole = (name, newRole) => {
        actions.changeTeamMember({ name, role: newRole });  // actions를 통해 changeTeamMember 호출
      };
    
      const handleDelete = (name) => {
        actions.changeTeamMember({ name, actionType: 'delete' });  // actions를 통해 changeTeamMember 호출
      };
    return (
      <div>
        <h1 className={styles.titi}>팀원 목록</h1>
        <MemberList
          members={state.teamMember}
          onChangeRole={handleChangeRole}
          onDelete={handleDelete}
        />
      </div>
    );
  };
export default MypageAct05;
