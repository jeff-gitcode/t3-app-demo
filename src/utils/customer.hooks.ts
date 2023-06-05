import { NextRouter, useRouter } from "next/router";
import { toast } from "react-toastify";
import { api } from "./api";

export function getCustomerById(id: string): { data: any; isLoading: any; } {
    return api.customer.getCustomerById.useQuery({ id });
}

export function deleteCustomer(): { mutate: any; isLoading: any; } {
    return api.customer.deleteCustomer.useMutation({
        onSuccess(data) {
            // store.setPageLoading(false);
            // queryClient.refetchQueries([["getPosts"]]);
            toast("Post deleted successfully", {
                type: "success",
                position: "top-right",
            });
        },
        onError(error) {
            // store.setPageLoading(false);
            toast(error.message, {
                type: "error",
                position: "top-right",
            });
        },
    });
}

export function createCustomer(router: NextRouter): { mutate: any; isLoading: any; } {
    return api.customer.createCustomer.useMutation({
        onSuccess(data) {
            console.log(data);
            toast(`${data.data.customer.firstName} ${data.data.customer.firstName} created!`, {
                type: "success",
                position: "top-right",
                autoClose: 5000,
            });
            router.push('/customer');
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
}

export function updateCustomer(router: NextRouter): { mutate: any; } {
    return api.customer.updateCustomer.useMutation({
        onSuccess(data) {
            console.log(data);
            toast(`${data.data.customer.firstName} ${data.data.customer.firstName} updated!`, {
                type: "success",
                position: "top-right",
                autoClose: 5000,
            });
            router.push('/customer');
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
}

export function getCustomers(): { data: any; isLoading: any; } {
    return api.customer.getCustomers.useQuery({ limit: 10, page: 1 });
}