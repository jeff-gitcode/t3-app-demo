import { createTRPCRouter, publicProcedure } from "../trpc";
import { createCustomerHandler, updateCustomerHandler, getCustomersHandler, getCustomerByIdHandler, deleteCustomerHandler } from "../../controller/customer.controller";
import { createCustomerSchema, filterQuery, params, updateCustomerSchema } from "../../schema/customer.schema";

export const customerRouter = createTRPCRouter({
    createCustomer: publicProcedure
        .input(createCustomerSchema)
        .mutation(({ input }) => createCustomerHandler({ input })),

    updateCustomer: publicProcedure
        .input(updateCustomerSchema)
        .mutation(({ input }) => updateCustomerHandler({ paramsInput: input.params, input: input })),

    deleteCustomer: publicProcedure
        .input(params)
        .mutation(({ input }) => deleteCustomerHandler({ paramsInput: input })),

    getCustomerById: publicProcedure
        .input(params)
        .query(({ input }) => getCustomerByIdHandler({ paramsInput: input })),

    getCustomers: publicProcedure
        .input(filterQuery)
        .query(({ input }) => getCustomersHandler({ filterQuery: input })),

});