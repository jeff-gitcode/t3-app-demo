import React, { useCallback, useEffect } from "react";
import { NextPage } from "next";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormField from "./FormField";
import { CreateCustomerInput, createCustomerSchema } from "~/server/schema/customer.schema";
import { api } from "~/utils/api";
import { toast, ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import { NextRouter, useRouter } from "next/router";
import { Customer } from ".prisma/client";
import { updateCustomer, createCustomer } from "~/utils/customer.hooks";
import Link from "next/link";
export interface CardFormProps {
    // id?: string;
    // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    user?: Customer;
    // submit: (d: React.FormEvent<HTMLFormElement>) => void;
}

export const CardForm: NextPage<CardFormProps> = ({
    // id,
    // onChange,
    user
    // submit,
}) => {
    const router = useRouter();

    const { mutate: updateCustomerMutation } = updateCustomer(router);

    const { mutate: createCustomerMutation, isLoading: isCreating } = createCustomer(router);

    const methods = useForm<CreateCustomerInput>({
        resolver: zodResolver(createCustomerSchema),
        defaultValues: user
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;

    const onHandleSubmit: SubmitHandler<CreateCustomerInput> = (data) => {
        if (user?.id) {
            updateCustomerMutation({
                data: data,
                params: {
                    id: user?.id,
                }
            });
        } else {
            createCustomerMutation(data);
        }
    };

    if (isCreating) return <div>Creating data...</div>;

    return (
        <section className="py-8 bg-ct-blue-600 grid place-items-center">
            <div>
                <h1>Customer Form</h1>
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
                        <div className="flex flex-row">
                            <input type="submit" value="Submit" className="font-bold btn btn-sm btn-primary bg-blue-600 mr-1 w-24 py-3 px-2 hover:bg-[#f5f5f5] flex items-center gap-2 cursor-pointer transition ease-in duration-300 rounded-full " />
                            <Link
                                href={`/customer`}
                                className="font-bold btn btn-sm btn-primary bg-blue-600 mr-1 w-24 py-3 px-2 hover:bg-[#f5f5f5] flex items-center gap-2 cursor-pointer transition ease-in duration-300 rounded-full "
                            >
                                Cancel
                            </Link>
                        </div>
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

