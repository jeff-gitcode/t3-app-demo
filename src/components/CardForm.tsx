import React from "react";
import { NextPage } from "next";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormField from "./FormField";
import { CreateCustomerInput, createCustomerSchema } from "~/server/schema/customer.schema";
import { api } from "~/utils/api";
import { toast, ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
export interface CardFormProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // submit: (d: React.FormEvent<HTMLFormElement>) => void;
}

export const CardForm: NextPage<CardFormProps> = ({
    value, onChange,
    // submit,
}) => {

    const { mutate: createCustomerMutation, isLoading } = api.customer.createCustomer.useMutation({
        onSuccess(data) {
            console.log(data);
            toast(`${data.data.customer.firstName} ${data.data.customer.firstName} created!`, {
                type: "success",
                position: "top-right",
                autoClose: 5000,
            });
        },
        onError(error) {
            console.log(error);
            toast(error.message, {
                type: "error",
                position: "top-right",
                autoClose: 5000,
            });
        },
    });

    const methods = useForm<CreateCustomerInput>({
        resolver: zodResolver(createCustomerSchema),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;

    const onHandleSubmit: SubmitHandler<CreateCustomerInput> = (data) => {
        console.log(data);
        createCustomerMutation(data);
    };

    return (
        <section className="py-8 bg-ct-blue-600 grid place-items-center">
            <div>
                <h1>Card Form</h1>
            </div>
            <div className="w-full">
                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(onHandleSubmit)}
                        className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
                    >
                        <FormField label="First Name" name="firstName" />
                        <FormField label="Last Name" name="lastName" />
                        <FormField label="Email" name="email" type="email" />
                        <FormField label="Password" name="password" type="password" />
                        <input type="submit" value="Submit" className="bg-ct-blue-600 hover:bg-ct-blue-700 text-blue font-bold py-2 px-4 rounded" />
                    </form>
                </FormProvider>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light" />
            </div>
        </section>);
};