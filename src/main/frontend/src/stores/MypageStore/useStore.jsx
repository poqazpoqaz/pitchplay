import { useReducer } from 'react';
import { reducer, initialState } from './reducer.js';
import {
    setProfileData,
    changeProfileImage,
    toggleEditMode,
    updateFormData
} from './action';

export const useStore = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        setProfileData: (profileData) => dispatch(setProfileData(profileData)),
        changeProfileImage: (profileImage) => dispatch(changeProfileImage(profileImage)),
        toggleEditMode: () => dispatch(toggleEditMode()),
        updateFormData: (name, value) => dispatch(updateFormData(name, value)),
    };

    return { state, actions };
};
