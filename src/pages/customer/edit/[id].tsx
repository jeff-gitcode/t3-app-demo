import { GetServerSideProps } from "next";
import { CardEdit } from "~/components/CardEdit";

export default CardEdit;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as any;
    console.log("id=" + id);
    // const { data, status } = api.customer.getCustomerById.useQuery({ id });
    // const user = {};
    return {
        props: { id },
    };
};