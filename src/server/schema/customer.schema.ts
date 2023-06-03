import { boolean, number, object, string, TypeOf } from 'zod';

export const createCustomerSchema = object({
    firstName: string().min(1, {
        message: 'First Name is required',
    }),
    lastName: string().min(1, {
        message: 'Last Name is required',
    }),
    email: string().min(1, {
        message: 'Email is required',
    }),
    password: string().min(1, {
        message: 'Password is required',
    })
});

export const params = object({
    id: string(),
});

export const updateCustomerSchema = object({
    params,
    data: object({
        firstName: string({
            required_error: 'First Name is required',
        }),
        lastName: string({
            required_error: 'Last Name is required',
        }),
        email: string({
            required_error: 'Email is required',
        }),
        password: string({
            required_error: 'Password is required',
        })
    }).partial(),
});

export const getCustomerByIdSchema = object({
    id: string({
        required_error: 'Id is required',
    }),
});

export const getCustomerByEmailSchema = object({
    email: string({
        required_error: 'Email is required',
    }),
});


export const filterQuery = object({
    limit: number().default(1),
    page: number().default(10),
});

export type CreateCustomerInput = TypeOf<typeof createCustomerSchema>;
export type UpdateCustomerInput = TypeOf<typeof updateCustomerSchema>;
export type GetCustomerByIdInput = TypeOf<typeof getCustomerByIdSchema>;
export type GetCustomerByEmailInput = TypeOf<typeof getCustomerByEmailSchema>;
export type ParamsInput = TypeOf<typeof params>;
export type FilterQueryInput = TypeOf<typeof filterQuery>;
