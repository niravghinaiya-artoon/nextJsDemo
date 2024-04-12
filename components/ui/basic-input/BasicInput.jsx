import { forwardRef, memo, useState } from 'components/lib/react-npm'
import { FormField, FormItem } from '../form/FormInputs';
import { CustomImage } from '../custom-image/CustomImage';
import { useFormField } from '../form/Form';
import { hideEye, openEye } from 'public/utils/images';

function BasicInput({ row: { label, hideError, formGroup = '', labelGroup = '', inputClass = '', key, type, actType, ...methods }, form }) {

    const [state, setState] = useState({
        inputType: type,
        open: false
    })

    const { inputType, open } = state;

    const viewHandler = () => {
        const nextInputType = inputType === "text" ? "password" : "text";
        setState({ open: !open, inputType: nextInputType })
    }

    const handlePaste = (e) => {
        e.preventDefault();
        return false;
    };

    const handleKeyDown = (e) => {
        if (inputType === 'number') {
            const regex = /[0-9]/;
            if (!regex.test(e.key) && e.key.length === 1) {
                e.preventDefault();
            }
        }
    };

    return (
        <FormField
            control={form.control}
            name={key}
            render={({ field }) => (
                <FormItem className={`form_group ${formGroup}`}>
                    {!!label && <label>{label}</label>}
                    <CustomInput
                        type={inputType}
                        inputType={type}
                        className={`custom_form_control ${inputClass}`}
                        handlePaste={handlePaste}
                        onKeyDown={handleKeyDown}
                        {...field}
                        {...methods}
                    />
                    <span className="vision_icon cursor-pointer">
                        {type === 'password' && <CustomImage src={open ? openEye : hideEye} alt="eye_icon" onClick={viewHandler} />}
                    </span>
                </FormItem>
            )}
        />
    )
}

export const CustomInput = forwardRef(
    ({ type, inputType, className, field = {}, handlePaste, ...props }, ref) => {

        const {
            error,
            formMessageId,
            isTouched,
            invalid,
            isDirty,
            isSubmitted,
            name,
            ...rest
        } = useFormField();

        return (
            <input
                type={type}
                ref={ref}
                id={formMessageId}
                autoComplete='off'
                role="presentation"
                onPaste={inputType === 'password' ? handlePaste : () => { }}
                {...props}
                className={`${error ? "border_red" : ""} ${className}`}
            />
        );
    }
);

export const FormMessage = memo(forwardRef(

    ({ className, children, ...props }, ref) => {

        const { error, formMessageId } = useFormField();
        const body = error ? String(error?.message) : children;

        if (!body) {
            return null;
        }

        const renderMessage = (
            <CustomFormMessage ref={ref} id={formMessageId} className={`${className}`} {...props} >
                {body}
            </CustomFormMessage>
        )

        return renderMessage;

    }
));

export const CustomFormMessage = (props) => <p {...props} />

export default BasicInput