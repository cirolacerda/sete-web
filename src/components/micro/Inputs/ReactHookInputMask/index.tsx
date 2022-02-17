/**
 * Componente contendo Label, Mask e ErrorMessage integrado com React-Hook-Forms.
 * Esse componente é utilizado para quando se precisa de máscaras de letras e números nos inputs.
 */

import React from "react";
import { useFormContext } from "react-hook-form";
import InputMask, { Props as ReactInputMaskProps } from "react-input-mask";

import InputFieldWrapper from "../InputFieldWrapper";

import { Container } from "./styles";

export type ReactHookInputMaskProps = Omit<ReactInputMaskProps, "mask"> & {
    label: string;
    name: string;
    format: string;
    prefix?: string;
    suffix?: string;
    mask?: string;
    isFormated?: boolean;
    isHorizontal?: boolean | string;
    thinBorder?: boolean;
    containerClassName?: string;
};

const ReactHookInputMask: React.FC<ReactHookInputMaskProps> = ({
    label,
    format,
    name,
    prefix,
    suffix,
    isFormated = true,
    containerClassName,
    isHorizontal,
    thinBorder,
    mask = " ",
    ...props
}) => {
    const {
        register,
        setValue,
        watch,
        formState: { errors, touchedFields, isSubmitSuccessful },
    } = useFormContext();
    const { onChange, ref, ...fieldProps } = register(name);
    const [inputValue, setInputValue] = React.useState("");
    React.useEffect(() => {
        setInputValue(watch(name));
    }, [watch(name)]);

    return (
        <Container
            className={containerClassName}
            isHorizontal={!!isHorizontal}
            horizontalMedia={(isHorizontal as any) instanceof String || typeof isHorizontal === "string" ? (isHorizontal as string) : ""}
        >
            <label htmlFor={name}>{label}</label>
            <InputFieldWrapper isTouched={touchedFields[name]} isInvalid={!!errors[name]} thinBorder={thinBorder} prefix={prefix} suffix={suffix}>
                <InputMask
                    id={name}
                    maskChar={mask}
                    mask={format}
                    value={inputValue}
                    onChange={(event): void => {
                        if (event.target.value === format.replace(/a/g, mask).replace(/9/g, mask).replace(/\*/g, mask)) {
                            return;
                        }
                        const value = event.target.value.trimRight();
                        setInputValue(value);
                        if (value) {
                            !isSubmitSuccessful ? setValue(name, value, { shouldTouch: false, shouldValidate: true }) : onChange({ target: { value } });
                        }
                    }}
                    {...fieldProps}
                    {...props}
                >
                    {(inputProps) => <input className="form-control" ref={ref} {...inputProps} />}
                </InputMask>
                <span className="form-error">{errors[name]?.message}</span>
            </InputFieldWrapper>
        </Container>
    );
};

export default ReactHookInputMask;
