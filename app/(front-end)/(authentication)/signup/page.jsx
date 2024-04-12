"use client"

import { CustomImage } from "components/ui/custom-image/CustomImage"
import Form from "components/ui/form/Form"
import { signInImg } from "public/utils/images"
import { z, useForm, zodResolver } from "components/lib/npm";
import { authLoginSchema } from "static/form-data/auth-form"
import BasicInput, { CustomFormMessage } from "components/ui/basic-input/BasicInput";
import CustomButton from "components/ui/custom-button/CustomButton";
import { useRouter } from "components/lib/react-npm";
import { useSignUpUserQuery } from "services/api/queries/authentication.query";

const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
};

const SignUp = () => {

    const router = useRouter();

    const formSchema = z.object({ ...authLoginSchema }).passthrough();
    const form = useForm({ resolver: zodResolver(formSchema), defaultValues });
    const { errors } = form.formState;

    const keys = Object.values(errors);
    const [errorState] = keys;

    const signUpMutation = {

        onSuccess: async (response) => { router.push("/login") }
    }

    const { mutateAsync: signUpUser, isPending: signUpPending } = useSignUpUserQuery(signUpMutation);

    const onSubmit = async (data) => {
        const req = { ...data };

        try {
            await signUpUser(req)
        } catch (error) { }
    }

    return (
        <div className="login_main_wrapper flex">
            <div className='login_wrapper'>
                <div className='signIn-content flex'>
                    <div className="signIn-image">
                        <div className='figure'>
                            <CustomImage src={signInImg} alt={"signInImg"} />
                        </div>
                    </div>
                    <div className="signIn-form">
                        <h2 className="form-title">Sign up</h2>

                        <Form {...form} handleSubmit={form.handleSubmit} onSubmit={onSubmit} className="form-container">

                            <BasicInput form={form} row={{
                                label: '',
                                key: 'firstName',
                                type: 'text',
                                placeholder: 'First name',
                                actType: 'INPUT'
                            }} />

                            <BasicInput form={form} row={{
                                label: '',
                                key: 'lastName',
                                type: 'text',
                                placeholder: 'Last name',
                                actType: 'INPUT'
                            }} />

                            <BasicInput form={form} row={{
                                label: '',
                                key: 'email',
                                type: 'text',
                                placeholder: 'Email',
                                actType: 'INPUT'
                            }} />

                            <BasicInput form={form} row={{
                                label: '',
                                key: 'password',
                                type: 'password',
                                placeholder: 'Password',
                                actType: 'INPUT',
                                inputClass: 'pr_38'
                            }} />

                            <CustomButton row={{ value: 'Sign Up', formGroup: 'mb_0' }} isPending={signUpPending} className={'btn_primary'} />

                        </Form>

                        <CustomFormMessage className="error-message text_center">
                            {
                                errorState?.message && errorState?.message
                            }
                        </CustomFormMessage>

                        <div className="already-login">
                            <span onClick={() => router.push("/login")}>{"Already Login?  ->"}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default SignUp