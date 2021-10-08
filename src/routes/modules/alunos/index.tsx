import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastrar from "pages/modules/alunos/Cadastrar";
import Editar from "pages/modules/alunos/Editar";

export default [
    <AuthRoute path="/alunos/cadastrar" component={Cadastrar} permission="reader" key="cadastrar" isPrivate exact />,
    <AuthRoute path="/alunos/gerenciar/editar/:id" component={Editar} permission="reader" key="gerenciar/editar/:id" isPrivate exact />,
];
