import React from "react";
import { EscolaTableField } from "entities/Escola";
import { FaUserAlt, FaSearch, FaEdit, FaRegTimesCircle } from "react-icons/fa";

class EscolasTableHelper {
    public treatData(data: EscolaTableField[]): any[] {
        return data.map((escola) => {
            return {
                ...escola,
                localizacao: ":/",
                gps: ":/",
                nivel: [
                    escola.ensino_pre_escola === "S" ? "Infantil, " : "",
                    escola.ensino_fundamental === "S" ? "Fundamental, " : "",
                    escola.ensino_medio === "S" ? "Médio, " : "",
                    escola.ensino_superior === "S" ? "Superior, " : "",
                ],
                horario_funcionamento: [
                    escola.horario_matutino === "S" ? "Manhã, " : "",
                    escola.horario_vespertino === "S" ? "Tarde, " : "",
                    escola.horario_noturno === "S" ? "Noite, " : "",
                ],
                acoes: (
                    <span>
                        <button
                            style={{
                                border: "none",
                                backgroundColor: "transparent",
                                cursor: "pointer",
                            }}
                        >
                            <FaUserAlt size={"18px"} color={"#1dc7ea"} />
                        </button>
                        <button
                            style={{
                                border: "none",
                                backgroundColor: "transparent",
                                cursor: "pointer",
                            }}
                            onClick={() => console.log("Clicou2")}
                        >
                            <FaSearch size={"18px"} color={"gray"} />
                        </button>
                        <button
                            style={{
                                border: "none",
                                backgroundColor: "transparent",
                                cursor: "pointer",
                            }}
                            onClick={() => console.log("Clicou3")}
                        >
                            <FaEdit size={"18px"} color={"orange"} />
                        </button>
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
                    </span>
                ),
            };
        });
    }
}

const escolasTableHelper = new EscolasTableHelper();

export { escolasTableHelper, EscolasTableHelper };
