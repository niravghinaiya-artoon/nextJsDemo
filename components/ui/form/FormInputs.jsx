import { forwardRef, useId } from 'components/lib/react-npm';
import { Controller } from "react-hook-form";
import { FormFieldContext, FormItemContext } from "./Form";

export const FormField = ({ ...props }) => (
    <FormFieldContext.Provider value={{ name: props.name }}>
        <Controller {...props} />
    </FormFieldContext.Provider>
)

export const FormItem = forwardRef(({ className, ...props }, ref) => {

    const id = useId();

    return (
        <FormItemContext.Provider value={{ id }}>
            <div ref={ref} className={className} {...props} />
        </FormItemContext.Provider>
    );
});