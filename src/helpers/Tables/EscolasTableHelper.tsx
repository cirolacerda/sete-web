import React from "react";
import { EscolaTableField, EscolaListObj } from "entities/Escola";
import { FaUserAlt, FaSearch, FaEdit, FaRegTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

class EscolasTableHelper {
    public treatData(data: EscolaListObj[]): EscolaTableField[] {
        return data.map((escola) => {
            return {
                ...escola,
                localizacao: escola.loc_longitude ? `${escola.loc_latitude || ""}, ${escola.loc_longitude || ""}` : "-",
                gps: "-",
                nivel: [
                    escola.ensino_pre_escola === "S" ? "Infantil" : "",
                    escola.ensino_fundamental === "S" ? "Fundamental" : "",
                    escola.ensino_medio === "S" ? "Médio" : "",
                    escola.ensino_superior === "S" ? "Superior" : "",
                ]
                    .filter((val) => val !== "")
                    .join(", "),
                horario_funcionamento: [
                    escola.horario_matutino === "S" ? "Manhã" : "",
                    escola.horario_vespertino === "S" ? "Tarde" : "",
                    escola.horario_noturno === "S" ? "Noite" : "",
                ]
                    .filter((val) => val !== "")
                    .join(", "),
                acoes: this.acoesComponent(escola),
            };
        });
    }

    public acoesComponent(escolaObj: EscolaListObj) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <button
                    style={{
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                    }}
                >
                    <FaUserAlt size={"18px"} color={"#1dc7ea"} />
                </button>
                <Link
                    to={`/escolas/gerenciar/visualizar/${escolaObj.id_escola}`}
                    style={{
                        display: "block",
                        marginBottom: "-2px",
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                    }}
                >
                    <FaSearch size={"16px"} color={"gray"} />
                </Link>
                <Link
                    to={`/escolas/gerenciar/editar/${escolaObj.id_escola}`}
                    style={{
                        display: "block",
                        marginLeft: "6px",
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                    }}
                >
                    <FaEdit size={"18px"} color={"orange"} />
                </Link>
                <button
                    style={{
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                    }}
                    onClick={() => console.log("Clicou4")}
                >
                    <FaRegTimesCircle size={"17px"} color={"red"} />
                </button>
            </div>
        );
    }
}

const escolasTableHelper = new EscolasTableHelper();

export { escolasTableHelper, EscolasTableHelper };
