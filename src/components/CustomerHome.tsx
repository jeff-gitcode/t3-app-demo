import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

import { useCallback, useState } from "react";
// import { trpc } from "@/utils/trpc";

import {
    Card,
    CardContent,
    CardHeader,
} from "../components";

import { Customer } from "@prisma/client";
import { List, ListItem } from "~/components/ListItem";
import { CardForm } from "~/components/CardForm";

const CustomerHome: NextPage = () => {
    const [itemName, setItemName] = useState<string>("");

    // const { data: list, refetch } = trpc.useQuery(["findAll"]);
    // const insertMutation = trpc.useMutation(["insertOne"], {
    //   onSuccess: () => refetch(),
    // });
    // const deleteAllMutation = trpc.useMutation(["deleteAll"], {
    //   onSuccess: () => refetch(),
    // });
    // const updateOneMutation = trpc.useMutation(["updateOne"], {
    //   onSuccess: () => refetch(),
    // });

    // const insertOne = useCallback(() => {
    //   if (itemName === "") return;

    //   insertMutation.mutate({
    //     title: itemName,
    //   });

    //   setItemName("");
    // }, [itemName, insertMutation]);

    // const clearAll = useCallback(() => {
    //   if (list?.length) {
    //     deleteAllMutation.mutate({
    //       ids: list.map((item) => item.id),
    //     });
    //   }
    // }, [list, deleteAllMutation]);

    // const updateOne = useCallback(
    //   (item: Customer) => {
    //     updateOneMutation.mutate({
    //       ...item,
    //       // checked: !item.checked,
    //     });
    //   },
    //   [updateOneMutation]
    // );

    const { data: list, isLoading } = api.customer.getCustomers.useQuery({ limit: 10, page: 1 });

    if (isLoading) return <div>Fetching data...</div>;

    return (
        <>
            <Head>
                <title>Customer List</title>
                <meta name="description" content="TRPC Demo" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Card>
                    <CardContent>
                        <CardHeader
                            title="Customer List"
                            listLength={list?.data.customers.length ?? 0}
                            // clearAllFn={clearAll}
                            clearAllFn={() => {
                                console.log("clearAll")
                            }}
                        />
                        <List>
                            {list?.data.customers?.map((item) => (
                                <ListItem
                                    key={item.id}
                                    item={item}
                                    // onUpdate={updateOne} 
                                    onUpdate={() => {
                                        console.log("update")
                                    }}
                                />
                            ))}
                        </List>
                    </CardContent>
                    <CardForm
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        // submit={insertOne}
                        submit={() => {
                            console.log("submit")
                        }}
                    />
                </Card>
            </main>
        </>
    );
};

export default CustomerHome;
