import React from "react";
import { Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

import FormikInputText from "components/micro/Inputs/FormikInputText";
import FormikInputNumberFormat from "components/micro/Inputs/FormikInputNumberFormat";
import FormikInputSelect from "components/micro/Inputs/FormikInputSelect";

import { InputsContainer, Form, mediaQuery } from "./styles";

const schema = yup.object().shape({
    cpf: yup.string().required("alou muyndo").min(2, "Olá mundo"),
    rep_senha: yup.string().required("alou muyndo").min(2, "Olá mundo"),
    estado: yup.string().required("Definido").min(1, "Olá mundo"),
});

const Registrar: React.FC = () => {
    const handleFormSubmit = React.useCallback(() => console.log("submit"), []);
    return (
        <Formik
            initialValues={{
                cpf: "",
                rep_senha: "",
                estado: "",
            }}
            onSubmit={handleFormSubmit}
            validationSchema={schema}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <p>Para registrar seu usuário, por favor preencha o formulário abaixo:</p>
                    <InputsContainer>
                        <FormikInputText label="NOME COMPLETO:" name="nome" placeholder="Digite seu nome" isHorizontal={mediaQuery.mobile} thinBorder />
                        <FormikInputNumberFormat
                            label="CPF:"
                            name="cpf"
                            placeholder="Digite seu CPF"
                            mask="_"
                            format="###.###.###-##"
                            isHorizontal={mediaQuery.mobile}
                            thinBorder
                        />
                        <FormikInputNumberFormat
                            label="TELEFONE:"
                            name="telefone"
                            placeholder="Digite seu Telefone"
                            isHorizontal={mediaQuery.mobile}
                            thinBorder
                        />
                        <FormikInputText label="E-MAIL:" name="email" placeholder="Endereço de e-mail" isHorizontal={mediaQuery.mobile} thinBorder />
                        <FormikInputText
                            label="REPETIR E-MAIL:"
                            name="rep_email"
                            placeholder="Endereço de e-mail"
                            isHorizontal={mediaQuery.mobile}
                            thinBorder
                        />
                        <FormikInputText label="SENHA:" name="senha" placeholder="Senha" isHorizontal={mediaQuery.mobile} thinBorder />
                        <FormikInputText label="REPETIR SENHA:" name="rep_senha" placeholder="Senha" isHorizontal={mediaQuery.mobile} thinBorder />
                    </InputsContainer>
                    <p className="city-divider">Para registrar seu usuário, por favor preencha o formulário abaixo:</p>
                    <InputsContainer>
                        <FormikInputSelect
                            label="ESTADO OU DISTRITO:"
                            name="estado"
                            placeholder="Selecione um Estado"
                            options={[
                                { value: "1", label: "Olá mundo" },
                                { value: "2", label: "Olá" },
                                { value: "3", label: "Olá mndo" },
                                { value: "4", label: "Olá mo" },
                                { value: "4", label: "Olá mo" },
                                { value: "4", label: "Olá mo" },
                            ]}
                            isHorizontal={mediaQuery.mobile}
                            thinBorder
                        />
                        <FormikInputSelect
                            label="MUNICÍPIO:"
                            name="municipio"
                            placeholder="Selecione um Município"
                            options={[
                                { value: "1", label: "Olá mundo" },
                                { value: "2", label: "Olá" },
                                { value: "3", label: "Olá mndo" },
                                { value: "4", label: "Olá mo" },
                                { value: "4", label: "Olá mo" },
                                { value: "4", label: "Olá mo" },
                            ]}
                            isHorizontal={mediaQuery.mobile}
                            thinBorder
                        />
                        <div className="submit-container">
                            <Button variant="warning" className="btn-fill">
                                Registrar
                            </Button>
                        </div>
                    </InputsContainer>
                </Form>
            )}
        </Formik>
    );
};

export default Registrar;
