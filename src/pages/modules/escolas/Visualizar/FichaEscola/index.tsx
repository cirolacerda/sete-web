import React from "react";

import { Escola } from "entities/Escola";

import { useNavCard } from "contexts/NavCard";

import RecordTable from "components/micro/RecordTable";

type EscolaData = [Escola | null, React.Dispatch<React.SetStateAction<Escola | null>>];

const localizacaoMap = {
    1: "Urbana",
    2: "Rural",
};
const dependenciaMap = {
    1: "Federal",
    2: "Estadual",
    3: "Municipal",
    4: "Privada",
};
const FichaEscola: React.FC = () => {
    const { aditionalData } = useNavCard();
    const [escolaData] = aditionalData?.escolaData as EscolaData;
    const [tableData, setTableData] = React.useState<any>(null);

    React.useEffect(() => {
        if (escolaData) {
            const data = {
                "Nome da escola": escolaData.nome,
                Estado: escolaData.mec_co_uf,
                Município: escolaData.mec_co_municipio,
                CEP: escolaData.loc_cep,
                Endereço: escolaData.loc_endereco,
                "Tipo de Localização": localizacaoMap[escolaData.mec_tp_localizacao || "-"],
                Dependência: dependenciaMap[escolaData.mec_tp_dependencia || "-"],
                Contato: escolaData.contato_responsavel,
                "Telefone de contato": escolaData.contato_telefone,
                "E-mail de contato": escolaData.contato_email,
                // "Número de alunos atendidos": escolaData.nome,
                "Tipo de ensino oferecido": [
                    escolaData.ensino_pre_escola === "S" ? "Infantil" : "",
                    escolaData.ensino_fundamental === "S" ? "Fundamental" : "",
                    escolaData.ensino_medio === "S" ? "Médio" : "",
                    escolaData.ensino_superior === "S" ? "Superior" : "",
                ]
                    .filter((val) => val !== "")
                    .join(", "),
                "Modo de ensino oferecido": [
                    escolaData.mec_in_regular === "S" ? "Regular" : "",
                    escolaData.mec_in_eja === "S" ? "EJA" : "",
                    escolaData.mec_in_profissionalizante === "S" ? "Profissionalizante" : "",
                    escolaData.mec_in_especial_exclusiva === "S" ? "Especial/Exclusiva" : "",
                ]
                    .filter((val) => val !== "")
                    .join(", "),
                "Horário de funcionamento": [
                    escolaData.horario_matutino === "S" ? "Manhã" : "",
                    escolaData.horario_vespertino === "S" ? "Tarde" : "",
                    escolaData.horario_noturno === "S" ? "Noite" : "",
                ]
                    .filter((val) => val !== "")
                    .join(", "),
            };
            setTableData(data);
        }
    }, [escolaData]);
    return <RecordTable title={escolaData?.nome || ""} data={tableData} />;
};

export default FichaEscola;
