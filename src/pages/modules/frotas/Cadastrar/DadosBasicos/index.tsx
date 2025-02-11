import React from "react";
import { Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

import { formatHelper } from "helpers/FormatHelper";
import { VeiculosService } from "services/Veiculos";
import { useError } from "hooks/Errors";
import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import ReactHookInputSelect from "components/micro/Inputs/ReactHookInputSelect";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import BlockTitle from "components/micro/BlockTitle";

import { Container, ButtonsContainer, mediaQuery } from "./styles";

type SelectOptionsObj = {
    1: { label: string; value: string }[];
    2: { label: string; value: string }[];
};

const DadosBasicos: React.FC = () => {
    const { nextStep } = useReactHookNavCard();
    const { watch, setValue } = useFormContext();
    const [optionsTipo, setOptionsTipo] = React.useState<SelectOptionsObj>({ 1: [], 2: [] });
    const [optionsMarca, setOptionsMarca] = React.useState<SelectOptionsObj>({ 1: [], 2: [] });

    const { errorHandler } = useError();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const veiculosService = new VeiculosService();
                const tiposVeiculo = await veiculosService.getTiposVeiculo();
                const marcasVeiculo = await veiculosService.getMarcasVeiculo();
                tiposVeiculo.data.forEach((tipo) => {
                    if (tipo.id < 9) {
                        setOptionsTipo((prev) => ({ ...prev, 1: [...prev[1], { label: tipo.tipo, value: tipo.id.toString() }] }));
                    } else {
                        setOptionsTipo((prev) => ({ ...prev, 2: [...prev[2], { label: tipo.tipo, value: tipo.id.toString() }] }));
                    }
                });

                marcasVeiculo.data.forEach((marca) => {
                    if (marca.id < 13) {
                        setOptionsMarca((prev) => ({
                            ...prev,
                            1: [...prev[1], { label: formatHelper.capitalize(marca.marca), value: marca.id.toString() }],
                        }));
                    } else {
                        setOptionsMarca((prev) => ({
                            ...prev,
                            2: [...prev[2], { label: formatHelper.capitalize(marca.marca), value: marca.id.toString() }],
                        }));
                    }
                });
            } catch (err) {
                errorHandler(err, { title: "Atenção!" });
            }
        };
        fetchData();
    }, []);

    return (
        <Container>
            <BlockTitle message="FORNEÇA AS INFORMAÇÕES BÁSICAS A RESPEITO DO VEÍCULO SENDO CADASTRADO." />
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="QUAL O MODO DE TRANSPORTE DO VEÍCULO?*"
                    name="modo"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="20px"
                    onChange={() => {
                        setValue("tipo", "");
                        setValue("marca", "");
                    }}
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

            <ReactHookFormItemCard required>
                <ReactHookInputText label="MODELO DO VEÍCULO*" name="modelo" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

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
