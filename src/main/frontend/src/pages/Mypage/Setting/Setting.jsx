import IniSet from './iniSet';
import styles from './Setting.module.css';
import { useStore } from '../../../stores/UserStore/useStore';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import PrivacySet from './PrivacySet';
import Log from './Log';


const Setting = ({ gridArea }) => {
    const {id} = useParams();
    const {state , actions} = useStore();

    const formFields = [
        { label: "아이디", name: "id", value: state.id}, 
        { label: "비밀번호", name: "pw", value: state.password}, 
        { label: "이메일", name: "email", value: state.email}, 
        { label: "휴대폰 번호", name: "num", value: state.phone}, 
        { label: "생년 월일", name: "birthdate", value: state.birthday}, 
        {  label: "등록 계좌", name: "account", value: `${state.account} ${state.accountNum}`} 
    ];
    useEffect(() => {
        axios.get("/data/userData.json")
            .then(response => {
                const datas = response.data;
                const userData = datas.find(data => data.id === id);

                if (userData) {
                    actions.changeBirthday(userData.birthday);
                    actions.changeEmail(userData.email);
                    actions.changePhone(userData.phone);
                    actions.changeId(userData.id);
                    actions.changePassword(userData.password);
                    actions.changeAccountName(userData.account);
                    actions.changeAccountNum(userData.accountNum);
                }
            })
    }, [id])    
    return (
        <div style={{ gridArea }}>
            <div className={styles.content}>
                <div className={styles.actbox}>
                    <IniSet formFields={formFields}/>
                    <PrivacySet/>   
                    <Log/>
                </div>

            </div>
        </div>
    )
}

export default Setting;