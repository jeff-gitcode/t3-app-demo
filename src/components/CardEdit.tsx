import { NextPage } from "next";
import { api } from "~/utils/api";
import { getCustomerById } from "~/utils/customer.hooks";
import { CardForm } from "./CardForm";

export interface CardEditProps {
    id: string;
}

export const CardEdit: NextPage<CardEditProps> = ({
    id,
}) => {

    const { data: response, isLoading } = getCustomerById(id);

    const user = response?.data.customer;

    if (isLoading) return <div>Fetching data...</div>;

    return (<CardForm user={user} />);
}

