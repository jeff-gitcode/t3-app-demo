import { GetServerSideProps } from "next";
import { CardEdit } from "~/components/CardEdit";

export default CardEdit;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as any;

    return {
        props: { id },
    };
};