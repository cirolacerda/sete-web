import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useFormContext, useWatch } from "react-hook-form";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import { MapControlEvents } from "helpers/Maps/MapControlEvents";
import { Escola } from "entities/Escola";
import { LocalidadeService } from "services/Localidade";

import BlockTitle from "components/micro/BlockTitle";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookLatLngMap from "components/micro/Inputs/ReactHookLatLngMap";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputSelect from "components/micro/Inputs/ReactHookInputSelect";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";

import EscolasMarker from "assets/icons/escolas/escolas-marker.png";

import { ButtonsContainer, Container, mediaQuery } from "./styles";

type EscolaData = [Escola | null, React.Dispatch<React.SetStateAction<Escola | null>>];

const Localizacao: React.FC = () => {
    const mapRef = React.useRef<MapControlEvents | null>(null);
    const history = useHistory();
    const { setValue } = useFormContext();
    const { nextStep, aditionalData } = useReactHookNavCard();
    const mec_co_uf = useWatch({
        name: "mec_co_uf",
    });

    const [estadoOptions, setEstadoOptions] = React.useState<{ label: string; value: string }[]>([{ label: "Escolher rota depois", value: "0" }]);
    const [cidadeOptions, setCidadeOptions] = React.useState<{ label: string; value: string }[]>([{ label: "Escolher rota depois", value: "0" }]);

    const [escolaData] = aditionalData?.escolaData as EscolaData;

    React.useEffect(() => {
        if (escolaData) {
            setValue("latlng[0]", escolaData?.loc_latitude || "");
            setValue("latlng[1]", escolaData?.loc_longitude || "");
            setValue("mec_co_uf", escolaData?.mec_co_uf?.toString() || "");
            setValue("mec_co_municipio", escolaData?.mec_co_municipio?.toString() || "");
            setValue("loc_endereco", escolaData?.loc_endereco || "");
            setValue("loc_cep", escolaData?.loc_cep || "");
            setValue("mec_tp_localizacao", escolaData?.mec_tp_localizacao?.toString() || "");
            setValue("mec_tp_localizacao_diferenciada", escolaData?.mec_tp_localizacao_diferenciada?.toString() || "");

            if (escolaData?.loc_latitude && escolaData?.loc_longitude) {
                mapRef.current?.goToLocation([Number(escolaData?.loc_longitude), Number(escolaData?.loc_latitude)]);
            }
        }
    }, [escolaData]);

    React.useEffect(() => {
        const fetchData = async () => {
            const localidadeService = new LocalidadeService();
            const response = await localidadeService.getEstados();
            const options = response.data.map((option) => ({ label: option.nome, value: option.codigo.toString() }));
            setEstadoOptions([{ label: "Escolher rota depois", value: "0" }, ...options]);
        };
        fetchData();
    }, []);

    React.useEffect(() => {
        const fetchData = async (co_uf: number) => {
            const localidadeService = new LocalidadeService();
            const response = await localidadeService.getMunicipiosFromEstado(co_uf);
            const options = response.data.map((option) => ({ label: option.nm_cidade, value: option.nm_cidade.toString() }));
            setCidadeOptions([{ label: "Escolher rota depois", value: "0" }, ...options]);
        };
        if (mec_co_uf) {
            fetchData(Number(mec_co_uf));
        }
    }, [mec_co_uf]);

    const handleCancelEditClick = () => {
        history.goBack();
    };

    return (
        <Container>
            <BlockTitle message="PREENCHA OS DADOS REFERENTES A LOCALIZAÇÃO DO ALUNO." />
            <ReactHookLatLngMap title="LOCALIZAÇÃO DA RESIDÊNCIA DO ALUNO (CLIQUE NO MAPA)" name="latlng" mapController={mapRef} icon={EscolasMarker} />
            <ReactHookFormItemCard placeItems="center">
                <ReactHookMultiFormList name="modo" isHorizontal={mediaQuery.desktop} fieldsHorizontal={mediaQuery.mobile} formListSpacing="20px">
                    <ReactHookInputText label="LATITUDE:" name="latlng[0]" isHorizontal={mediaQuery.desktop} dontShowError />
                    <ReactHookInputText label="LONGITUDE:" name="latlng[1]" isHorizontal={mediaQuery.desktop} dontShowError />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputSelect label="ESTADO*" name="mec_co_uf" options={estadoOptions} isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputSelect label="CIDADE*" name="mec_co_municipio" options={cidadeOptions} isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputText label="ENDEREÇO DA ESCOLA" name="loc_endereco" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputNumberFormat label="CEP" name="loc_cep" format="#####-###" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="A ESCOLA ESTÁ LOCALIZADA EM:*"
                    name="mec_tp_localizacao"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal
                    formListSpacing="20px"
                >
                    <ReactHookInputRadio label="Área Urbana" value="1" name="mec_tp_localizacao" position="right" />
                    <ReactHookInputRadio label="Área Rural" value="2" name="mec_tp_localizacao" position="right" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="A ESCOLA ESTÁ LOCALIZADA EM ÁREA DIFERENCIADA?*"
                    name="mec_tp_localizacao_diferenciada"
                    isHorizontal={mediaQuery.desktop}
                    formListSpacing="20px"
                >
                    <ReactHookInputRadio label="Não se aplica" value="7" name="mec_tp_localizacao_diferenciada" position="right" />
                    <ReactHookInputRadio label="Área de Assentamento" value="1" name="mec_tp_localizacao_diferenciada" position="right" />
                    <ReactHookInputRadio label="Terra Indígena" value="2" name="mec_tp_localizacao_diferenciada" position="right" />
                    <ReactHookInputRadio label="Área remanescente de Quilombo" value="3" name="mec_tp_localizacao_diferenciada" position="right" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ButtonsContainer>
                <Button variant="danger" type="button" className="btn-fill" onClick={handleCancelEditClick}>
                    Cancelar Edição
                </Button>
                <Button variant="info" type="button" className="btn-fill" onClick={nextStep}>
                    Próximo
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default Localizacao;
