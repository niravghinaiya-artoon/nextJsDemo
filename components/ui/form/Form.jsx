import { FormProvider, useFormContext } from "components/lib/npm";
import { useContext, createContext } from 'components/lib/react-npm';

export const FormFieldContext = createContext({});

export const FormItemContext = createContext({});

export const useFormField = () => {

  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);

  const data = useFormContext();

  const { getFieldState, formState, control } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { isSubmitted } = formState;

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    isSubmitted,
    ...fieldState,
  };
};

const Form = ({ children, onSubmit, className = '', ...methods }) => {

  return (
    <FormProvider {...methods} >
      <form className={className} id={methods?.id ?? ''} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};


export default Form;