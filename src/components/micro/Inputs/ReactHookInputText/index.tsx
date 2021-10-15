import React from "react";
import { useFormContext } from "react-hook-form";

import InputFieldWrapper from "../InputFieldWrapper";

import { Container } from "./styles";

export type ReactHookInputTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    unitOfMeasure?: string;
    isHorizontal?: boolean | string;
    thinBorder?: boolean;
    containerClassName?: string;
    dontShowError?: boolean;
};

const ReactHookInputText: React.FC<ReactHookInputTextProps> = ({
    label,
    name,
    containerClassName,
    isHorizontal,
    thinBorder,
    unitOfMeasure,
    dontShowError,
    ...props
}) => {
    const {
        register,
        formState: { errors, touchedFields },
    } = useFormContext();
    return (
        <Container
            className={containerClassName}
            isHorizontal={!!isHorizontal}
            dontShowError={dontShowError}
            horizontalMedia={(isHorizontal as any) instanceof String || typeof isHorizontal === "string" ? (isHorizontal as string) : ""}
        >
            <label htmlFor={name}>{label}</label>
            <InputFieldWrapper isTouched={touchedFields[name]} isInvalid={!!errors[name]} thinBorder={thinBorder} unitOfMeasure={unitOfMeasure}>
                <input id={name} className="form-control" aria-invalid={!!errors[name]} {...register(name)} {...props} />
                {!dontShowError && <span className="form-error">{errors[name]?.message}</span>}
            </InputFieldWrapper>
        </Container>
    );
};

export default ReactHookInputText;
