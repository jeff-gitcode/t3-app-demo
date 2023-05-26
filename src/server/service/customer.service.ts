import { Prisma, Customer } from '@prisma/client';
import { prisma } from '../db';

export const createCustomer = async (input: Prisma.CustomerCreateInput) => {
    return (await prisma.customer.create({
        data: input,
    })) as Customer;
};

export const updateCustomer = async (
    where: Prisma.CustomerWhereUniqueInput,
    data: Prisma.CustomerUpdateInput,
    select?: Prisma.CustomerSelect
) => {
    return (await prisma.customer.update({ where, data, select })) as Customer;
};

export const deleteCustomer = async (where: Prisma.CustomerWhereUniqueInput) => {
    return (await prisma.customer.delete({ where })) as Customer;
};

export const getCustomerById = async (id: string) => {
    return (await prisma.customer.findUnique({
        where: { id },
    })) as Customer;
};

export const getCustomerByEmail = async (email: string) => {
    return (await prisma.customer.findUnique({
        where: { email },
    })) as Customer;
};

export const getCustomers = async (page: number, limit: number) => {
    return (await prisma.customer.findMany({
        skip: (page - 1) * limit,
        take: limit,
    })) as Customer[];
};