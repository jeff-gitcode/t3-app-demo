import React, { memo } from "react";
import { NextPage } from "next";
import { Customer } from "@prisma/client";
import { CardProps } from ".";
import { format } from "date-fns";

interface ListItemProps {
    item: Customer;
    onUpdate?: (item: Customer) => void;
}
const ListItemComponent: NextPage<ListItemProps> = ({ item, onUpdate }) => {
    return (
        <div className="h-12 border-b flex items-center justify-start px-3">
            <span className="text-gray-600 tracking-wide text-sm">{item.id} - </span>
            <span className="text-gray-600 tracking-wide text-sm">{item.firstName} - </span>
            <span className="text-gray-600 tracking-wide text-sm">{item.lastName} - </span>
            <span className="text-gray-600 tracking-wide text-sm">{item.email} - </span>
            <span className="text-gray-600 tracking-wide text-sm">{item.password} - </span>
            <span className="text-gray-600 tracking-wide text-sm">{format(item.createdAt, 'LLLL d, yyyy')}</span>
        </div>
    );
};

export const ListItem = memo(ListItemComponent);

export const List: NextPage<CardProps> = ({ children }) => {
    return <div className="overflow-y-auto h-72">{children}</div>;
};
