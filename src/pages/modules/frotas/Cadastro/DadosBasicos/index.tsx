import React from "react";
import { Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import ReactHookInputSelect from "components/micro/Inputs/ReactHookInputSelect";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import BlockTitle from "components/micro/BlockTitle";

import { Container, ButtonsContainer, mediaQuery } from "./styles";

const optionsTipoRod = [
    { label: "Ônibus", value: "1" },
    { label: "Micro-ônibus", value: "2" },
    { label: "Van", value: "3" },
    { label: "Kombi", value: "4" },
    { label: "Caminhão", value: "5" },
    { label: "Caminhonete", value: "6" },
    { label: "Motocicleta", value: "7" },
    { label: "Animal de tração", value: "8" },
];

const optionsTipoAqua = [
    { label: "Lancha/Voadeira", value: "9" },
    { label: "Barco de madeira", value: "10" },
    { label: "Barco de alumínio", value: "11" },
    { label: "Canoa motorizada", value: "12" },
    { label: "Canoa a remo", value: "13" },
];

const optionsMarcaRod = [
    { label: "Iveco", value: "1" },
    { label: "Mercedes-Benz", value: "2" },
    { label: "Renault", value: "3" },
    { label: "Volkswagen", value: "4" },
    { label: "Volare", value: "5" },
];

const optionsMarcaAqua = [
    { label: "EMGEPRON (Empresa Gerencial de Projetos Navais)", value: "1" },
    { label: "ESTALEIRO B3", value: "2" },
    { label: "Yamanha", value: "3" },
];

const optionsTipo = {
    1: [...optionsTipoRod],
    2: [...optionsTipoAqua],
};

const optionsMarca = {
    1: [...optionsMarcaRod],
    2: [...optionsMarcaAqua],
};

const DadosBasicos: React.FC = () => {
    const { nextStep } = useReactHookNavCard();
    const { watch, setValue } = useFormContext();

    React.useEffect(() => {
        setValue("tipo", { label: "Selecione uma Opção", value: "" });
        setValue("marca", { label: "Selecione uma Opção", value: "" });
    }, [watch("modo")]);

    return (
        <Container>
            <BlockTitle message="FORNEÇA AS INFORMAÇÕES BÁSICAS A RESPEITO DO VEÍCULO SENDO CADASTRADO." />
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="QUAL O MODO DE TRANSPORT EDO VEÍCULO?*"
                    name="modo"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="20px"
                >
                    <ReactHookInputRadio label="Rodoviário (Ônibus, Van, etc)" value="1" name="modo" position="right" />
                    <ReactHookInputRadio label="Aquaviário (Lancha, Barco, etc)" value="2" name="modo" position="right" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputSelect
                    label="QUAL O TIPO DE VEÍCULO?*"
                    name="tipo"
                    options={optionsTipo[watch("modo")] || []}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputSelect
                    label="QUAL A MARCA DO VEÍCULO?*"
                    name="marca"
                    options={optionsMarca[watch("modo")] || []}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            {/* <ReactHookFormItemCard>
                <ReactHookInputSelect
                    label="CASO TENHA ADQUIRIDO O VEÍCULO PELO PROGRAMA CAMINHO DA ESCOLA, SELECIONE O MODELO DO MESMO*"
                    name="ano_programa"
                    placeholder="Não se aplica"
                    options={[{ label: "Iveco", value: "gg" }]}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard> */}

            <ReactHookFormItemCard required>
                <ReactHookInputText label="ANO DE AQUISIÇÃO DO VEÍCULO*" name="ano" type="number" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="ORIGEM DO VEÍCULO?*"
                    name="origem"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="20px"
                >
                    <ReactHookInputRadio label="Veículo Próprio" value="1" name="origem" position="right" />
                    <ReactHookInputRadio label="Veículo Terceirizado" value="2" name="origem" position="right" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>

            <ButtonsContainer>
                <Button variant="info" type="button" className="btn-fill" onClick={nextStep}>
                    Próximo
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default DadosBasicos;
