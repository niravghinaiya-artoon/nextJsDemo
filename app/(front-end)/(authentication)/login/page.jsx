"use client"

import { CustomImage } from "components/ui/custom-image/CustomImage"
import Form from "components/ui/form/Form"
import { googleIcon, signUpImg } from "public/utils/images"
import { z, useForm, zodResolver } from "components/lib/npm";
import { authSchema } from "static/form-data/auth-form"
import BasicInput, { CustomFormMessage } from "components/ui/basic-input/BasicInput";
import CustomButton from "components/ui/custom-button/CustomButton";
import { useRouter } from "components/lib/react-npm";
import { useLoginUserQuery } from "services/api/queries/authentication.query";
import { signIn } from "next-auth/react";

const defaultValues = {
    email: "",
    password: ""
};
// const defaultValues = {
//     email: "nirav@gmail.com",
//     password: "Admin@1234"
// };

const Login = () => {

    const router = useRouter();

    const formSchema = z.object({ ...authSchema }).passthrough();
    const form = useForm({ resolver: zodResolver(formSchema), defaultValues });
    const { errors } = form.formState;

    const keys = Object.values(errors);
    const [errorState] = keys;

    const loginMutation = {

        onSuccess: async ({ data }) => {

            const req = {
                ...data
            }

            const result = await signIn('credentials', {
                ...req,
                redirect: true,
                callbackUrl: '/123/dp'
            });

        }
    }

    const { mutateAsync: loginUser, isPending: loginPending } = useLoginUserQuery(loginMutation);

    const onSubmit = async (data) => {

        const req = {
            email: data.email,
            password: data.password,
            loginType: "login"
        };

        try {
            await loginUser(req)

        } catch (error) { }
    }

    const handleGoogleLogin = async () => {

        const result = await signIn('google', {
            redirect: false,
            callbackUrl: '/admin/dashboard'
        });

    }

    return (
        <div className="login_main_wrapper flex">
            <div className='login_wrapper'>
                <div className='signIn-content flex'>
                    <div className="signIn-image">
                        <div className='figure'>
                            <CustomImage src={signUpImg} alt={"signUpImg"} />
                        </div>
                    </div>
                    <div className="signIn-form">
                        <h2 className="form-title">Login</h2>

                        <Form {...form} handleSubmit={form.handleSubmit} onSubmit={onSubmit} className="form-container">

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

                            <CustomButton row={{ value: 'Login In', formGroup: 'mb_0' }} isPending={loginPending} className={'btn_primary'} />

                        </Form>

                        <CustomFormMessage className="error-message text_center">
                            {
                                errorState?.message && errorState?.message
                            }
                        </CustomFormMessage>

                        <div className="another-login signIn">
                            <p className="line"><span className="login-line"></span><span className="login-con">OR</span></p>
                            <div className="another-login-item">
                                <CustomImage src={googleIcon} alt="googleIcon" onClick={() => handleGoogleLogin()} />
                            </div>
                        </div>

                        <div className="already-login">
                            <span onClick={() => router.push("/signup")}>{"Already signed up? ->"}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login