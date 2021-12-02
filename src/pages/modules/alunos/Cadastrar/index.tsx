import React from "react";
import { useParams } from "react-router-dom";

import { AlunosService } from "services/Alunos";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";

import PageTitle from "components/micro/PageTitle";

import Localizacao from "./Localizacao";
import DadosPessoais from "./DadosPessoais";
import DadosEscolares from "./DadosEscolares";

import DadosEscolaresIcon from "assets/icons/alunos/alunos-dados-escolares.svg";
import DadosPessoaisIcon from "assets/icons/alunos/alunos-dados-pessoais.svg";
import LocalizacaoIcon from "assets/icons/alunos/alunos-localizacao.svg";
import AlunosCadastroIcon from "assets/icons/alunos/alunos-cadastro.svg";
import { localizacaoSchema, dadosPessoaisSchema, dadosEscolaresSchema } from "validators/modules/alunos";

type FormData = {
    latlng: [string, string];
    mec_tp_localizacao: string;
    loc_endereco: string;
    loc_cep: string;
    da_porteira: boolean; // S/N pra api
    da_mataburro: boolean; // S/N pra api
    da_colchete: boolean; // S/N pra api
    da_atoleiro: boolean; // S/N pra api
    da_ponterustica: boolean; // S/N pra api
    nome: string;
    cpf: string; // Não pode ter formato normal
    data_nascimento: string;
    nome_responsavel: string;
    telefone_responsavel: string;
    grau_responsavel: string; // número pra api
    sexo: string; // número pra api
    cor: string; // número pra api
    def_caminhar: boolean; // S/N pra api
    def_ouvir: boolean; // S/N pra api
    def_enxergar: boolean; // S/N pra api
    def_mental: boolean; // S/N pra api
    escola: string;
    rota: string;
    turno: string; // número pra api
    nivel: string; // número pra api
};

const Cadastrar: React.FC = () => {
    const { id: alunoId } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { createModal } = useAlertModal();

    const handleSubmit = async (data: FormData) => {
        try {
            createModal();
            const alunosService = new AlunosService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const body = {
                loc_latitude: data.latlng[0],
                loc_longitude: data.latlng[1],
                loc_endereco: data.loc_endereco,
                loc_cep: data.loc_cep,
                mec_tp_localizacao: Number(data.mec_tp_localizacao),
                da_porteira: data.da_porteira ? "S" : "N",
                da_mataburro: data.da_mataburro ? "S" : "N",
                da_colchete: data.da_colchete ? "S" : "N",
                da_atoleiro: data.da_atoleiro ? "S" : "N",
                da_ponterustica: data.da_ponterustica ? "S" : "N",
                nome: data.nome,
                cpf: data.cpf.replace(/\./g, "").replace(/-/g, ""),
                data_nascimento: data.data_nascimento,
                nome_responsavel: data.nome_responsavel,
                telefone_responsavel: data.telefone_responsavel,
                grau_responsavel: Number(data.grau_responsavel),
                sexo: Number(data.sexo),
                cor: Number(data.cor),
                def_caminhar: data.def_caminhar ? "S" : "N",
                def_ouvir: data.def_ouvir ? "S" : "N",
                def_enxergar: data.def_enxergar ? "S" : "N",
                def_mental: data.def_mental ? "S" : "N",
                turno: Number(data.turno),
                nivel: Number(data.nivel),
            };
            const response = await alunosService.createAluno(body, codigo_cidade);
            if (!response.result) {
                console.log("err1");
                throw { ...response };
            }
            console.log("aqui", response.messages);
            const responseE = await alunosService.bindEscolaToAluno({ id_escola: Number(data.escola) }, (response.messages as any)?.id, codigo_cidade);
            if (!responseE.result) {
                console.log("err2");
                throw { ...responseE };
            }
            const responseR = await alunosService.bindRotaToAluno({ id_rota: Number(data.rota) }, (response.messages as any)?.id, codigo_cidade);
            if (!responseR.result) {
                console.log("err3");
                throw { ...responseR };
            }
            createModal("success", { title: "Sucesso", html: "Aluno cadastrado com sucesso" });
        } catch (err) {
            errorHandler(err, { title: "Erro ao cadastrar aluno" });
        }
    };

    return (
        <>
            <PageTitle message="Cadastrar Aluno" icon={AlunosCadastroIcon} />
            <ReactHookNavCardProvider<FormData> mode="onSubmit" reValidateMode="onChange" onSubmit={handleSubmit}>
                <ReactHookNavCardTab name="Localização" icon={<img src={LocalizacaoIcon} alt="" />} validationSchema={localizacaoSchema}>
                    <Localizacao />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Dados Pessoais" icon={<img src={DadosPessoaisIcon} alt="" />} validationSchema={dadosPessoaisSchema}>
                    <DadosPessoais />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Dados Escolares" icon={<img src={DadosEscolaresIcon} alt="" />} validationSchema={dadosEscolaresSchema}>
                    <DadosEscolares />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Cadastrar;
