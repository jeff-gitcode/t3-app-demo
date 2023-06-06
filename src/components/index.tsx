import React from "react";
import type { NextPage } from "next";
import router from "next/router";

export interface CardProps {
    children: React.ReactNode;
}

export const Card: NextPage<CardProps> = ({ children }) => {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-slate-100">
            {children}
        </div>
    );
};

export const CardContent: NextPage<CardProps> = ({ children }) => {
    return (
        <div className="bg-white w-full rounded-lg drop-shadow-md">
            {children}
        </div>
    );
};

export interface CardHeaderProps {
    title: string;
    listLength: number;
    signOut?: () => void;
}

export const CardHeader: NextPage<CardHeaderProps> = ({
    title,
    listLength,
    signOut,
}) => {
    return (
        <div className="flex flex-row items-center justify-between p-3 border-b border-slate-200">
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-base font-bold tracking-wide text-gray-900 mr-2">
                    {title}
                </h1>
                <span className="h-5 w-full hover:bg-blue-200 text-blue-600 flex items-center justify-center rounded-full text-xs">
                    {listLength}
                </span>
            </div>
            <button
                className="font-bold text-sm text-gray-600 bg-blue-600 mr-1 w-24 py-3 px-2 hover:bg-blue-200 flex items-center justify-center rounded-full text-xs"
                type="button"
                onClick={() => {
                    signOut;
                    router.push('/');
                }}
            >
                Sign Out
            </button>
        </div>
    );
};

