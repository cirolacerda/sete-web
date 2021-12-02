import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";

import { Container, mediaQuery } from "./styles";

const DadosTransporte: React.FC = () => {
    const { previousStep } = useReactHookNavCard();
    return (
        <Container>
            <ReactHookFormItemCard>
                <ReactHookInputText label="SALÁRIO*" name="salario" type="number" unitOfMeasure="R$" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="O MOTORISTA ESTÁ HABILITADO A DIRIGIR QUAIS CATEGORIAS DE VEÍCULOS?*"
                    name="tipo_cnh"
                    formListSpacing="40px"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                >
                    <ReactHookInputCheckbox label="A" name="tipo_cnh[0]" />
                    <ReactHookInputCheckbox label="B" name="tipo_cnh[1]" />
                    <ReactHookInputCheckbox label="C" name="tipo_cnh[2]" />
                    <ReactHookInputCheckbox label="D" name="tipo_cnh[3]" />
                    <ReactHookInputCheckbox label="E" name="tipo_cnh[4]" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="QUAL O TURNO DE TRABALHO DO MOTORISTA?*"
                    name="turno"
                    formListSpacing="40px"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                >
                    <ReactHookInputCheckbox label="Manhã" name="turno[0]" />
                    <ReactHookInputCheckbox label="Tarde" name="turno[1]" />
                    <ReactHookInputCheckbox label="Noite" name="turno[2]" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>

            <ButtonsContainer position="evenly">
                <Button variant="default" type="button" className="btn-fill" onClick={previousStep}>
                    Voltar
                </Button>
                <Button variant="info" type="submit" className="btn-fill">
                    Concluir
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default DadosTransporte;
