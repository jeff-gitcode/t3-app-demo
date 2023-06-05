import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

import { useCallback, useEffect, useState } from "react";
// import { trpc } from "@/utils/trpc";

import {
    Card,
    CardContent,
    CardHeader,
} from "../components";

import { Customer } from "@prisma/client";
import { List, ListItem } from "~/components/ListItem";
import { CardForm } from "~/components/CardForm";
import router from "next/router";
import { getCustomers } from "~/utils/customer.hooks";


const CustomerHome: NextPage = () => {
    const [itemName, setItemName] = useState<string>("");

    const { data: list, isLoading } = getCustomers();

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
                            signOut={() => {
                                console.log("signOut");
                                signOut();
                                // router.push('/');
                            }}
                        />
                        <Link
                            href={`/customer/add`}
                            className="btn btn-sm btn-primary mr-1"
                        >
                            Add
                        </Link>
                        <List>
                            {list?.data.customers?.map((item: Customer) => (
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
                </Card>
            </main>
        </>
    );
};

export default CustomerHome;
