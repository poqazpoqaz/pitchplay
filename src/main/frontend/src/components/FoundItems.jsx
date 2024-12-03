import React from 'react';
import styled from 'styled-components';
import LabelInput from './LabelInput';
import Button from "./Button";
const Wrapper = styled.div`
    grid-area: ${props => props.gridArea};
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding: 20px;
    border: 1px solid #A0A0A0;
    border-radius: 15px;

     @media (max-width: 1200px) {
        gap: 20px;
    }
`;

const SubWrapper = styled.div`
    position: relative;
    display: grid;
    grid-template: 
    'input ... ... ' 1fr
    'input ... btn' 1fr / 2fr 20px 1fr;
    

    @media (max-width: 1200px) {
        grid-template:
            'input' auto
            'btn' 1fr / 1fr;

        label{
        font-size: 1rem;
        }
    }
`;

function FoundItems({ inputFields, gridArea }) {
    return (
        <Wrapper gridArea={gridArea}>
            {inputFields.map((field) => (
                <SubWrapper key={field.id}>
                    <LabelInput
                        id={field.id}
                        text={field.text}
                        type={field.type}
                        placeholder={field.placeholder}
                        isvalid={field.isvalid}
                        gridArea="input"
                    />
                    {field.hasButton && (
                        <Button
                            color="var(--main-color)"
                            gridArea="btn"
                        >
                            인증번호발송</Button>
                    )}
                </SubWrapper>
            ))}
        </Wrapper>
    );
}


export default FoundItems;