import { Context } from "react";
import { CreateCustomerInput, filterQuery, FilterQueryInput, ParamsInput, UpdateCustomerInput } from "../schema/customer.schema";
import { createCustomer, deleteCustomer, getCustomerByEmail, getCustomerById, getCustomers, updateCustomer } from "../service/customer.service";

export const createCustomerHandler = async ({
    input,
    // ctx
}: {
    input: CreateCustomerInput;
    // ctx: Context;
}) => {
    try {
        const customer = await createCustomer({
            ...input
        });

        return {
            status: 'success',
            data: {
                customer
            }
        };
    } catch (err: any) {
        throw err;
        // return {
        //     status: 'error',
        //     message: err.message
        // };
    }
}

export const updateCustomerHandler = async ({ paramsInput, input }: {
    paramsInput: ParamsInput;
    input: UpdateCustomerInput;
}) => {
    try {
        const customer = await updateCustomer({
            id: paramsInput.id
        }, input.data);

        return {
            status: 'success',
            data: {
                customer
            }
        };
    } catch (err: any) {
        throw err;
        // return {
        //     status: 'error',
        //     message: err.message
        // };
    }
}

export const deleteCustomerHandler = async ({ paramsInput }: {
    paramsInput: ParamsInput;
}) => {
    try {
        const customer = await deleteCustomer({
            id: paramsInput.id
        });

        return {
            status: 'success',
            data: {
                // customer
            }
        };
    } catch (err: any) {
        throw err;
        // return {
        //     status: 'error',
        //     message: err.message
        // };
    }
}

export const getCustomerByIdHandler = async ({ paramsInput }: {
    paramsInput: ParamsInput;
}) => {
    try {
        const customer = await getCustomerById(
            paramsInput.id
        );

        console.log("test");
        console.log(customer);

        return {
            status: 'success',
            data: {
                customer
            }
        };
    } catch (err: any) {
        throw err;
        // return {
        //     status: 'error',
        //     message: err.message
        // };
    }
}

export const getCustomerByEmailHandler = async ({ paramsInput }: {
    paramsInput: ParamsInput;
}) => {
    try {
        const customer = await getCustomerByEmail(
            paramsInput.id
        );

        return {
            status: 'success',
            data: {
                customer
            }
        };
    } catch (err: any) {
        throw err;
        // return {
        //     status: 'error',
        //     message: err.message
        // };
    }
}

export const getCustomersHandler = async ({ filterQuery }: {
    filterQuery: FilterQueryInput;
}) => {
    try {
        const customers = await getCustomers(
            filterQuery.page, filterQuery.limit
        );

        return {
            status: 'success',
            data: {
                customers
            }
        };
    } catch (err: any) {
        throw err;
        // return {
        //     status: 'error',
        //     message: err.message
        // };
    }
}