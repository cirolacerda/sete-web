import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastrar from "pages/modules/escolas/Cadastrar";
import Editar from "pages/modules/escolas/Editar";
import Gerenciar from "pages/modules/escolas/Gerenciar";

export default [
    <AuthRoute path="/escolas/cadastrar" component={Cadastrar} permission="reader" key="cadastrar" isPrivate exact />,
    <AuthRoute path="/escolas/gerenciar/" component={Gerenciar} permission="reader" key="gerenciar" isPrivate exact />,
    <AuthRoute path="/escolas/gerenciar/editar/:id" component={Editar} permission="reader" key="gerenciar/:id" isPrivate exact />,
];
