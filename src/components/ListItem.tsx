import React, { memo, useState } from "react";
import { NextPage } from "next";
import { Customer } from "@prisma/client";
import { CardProps } from ".";
import { format } from "date-fns";
import Link from "next/link";
import { api } from "~/utils/api";
import { toast, ToastContainer } from "react-toastify";
import { deleteCustomer } from "~/utils/customer.hooks";

interface ListItemProps {
    item: Customer;
    onUpdate?: (item: Customer) => void;
}


const ListItemComponent: NextPage<ListItemProps> = ({ item, onUpdate }) => {
    const [openMenu, setOpenMenu] = useState(false);

    const { isLoading, mutate: deletePost } = deleteCustomer();

    const onDeleteHandler = (id: string) => {
        toggleMenu();
        if (window.confirm("Are you sure")) {
            deletePost({ id: id });
        }
    };

    if (isLoading) return <div>Deleting data...</div>;

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    return (
        <>
            <div className="h-12 border-b flex items-center justify-start px-3">
                <span className="text-gray-600 tracking-wide text-sm">{item.id} - </span>
                <span className="text-gray-600 tracking-wide text-sm">{item.firstName} - </span>
                <span className="text-gray-600 tracking-wide text-sm">{item.lastName} - </span>
                <span className="text-gray-600 tracking-wide text-sm">{item.email} - </span>
                <span className="text-gray-600 tracking-wide text-sm">{item.password} - </span>
                <span className="text-gray-600 tracking-wide text-sm">{format(item.createdAt, 'LLLL d, yyyy')}</span>
                <Link
                    href={`/customer/edit/${item.id}`}
                    className="btn btn-sm btn-primary mr-1"
                >
                    Edit
                </Link>
                <li
                    className="w-24 h-7 py-3 px-2 hover:bg-[#f5f5f5] flex items-center gap-2 cursor-pointer transition ease-in duration-300"
                    onClick={() => onDeleteHandler(item.id)}
                >
                    <i className="bx bx-trash"></i> <span>Delete</span>
                </li>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
        </>
    );
};

export const ListItem = memo(ListItemComponent);

export const List: NextPage<CardProps> = ({ children }) => {
    return <div className="overflow-y-auto h-72">{children}</div>;
};

