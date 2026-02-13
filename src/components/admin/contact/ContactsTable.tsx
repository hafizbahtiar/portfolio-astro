import React, { useEffect, useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../ui/DataTable";
import { contactService, type OwnerContact } from "../../../lib/contact";

const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
};

const truncate = (value: string, length: number) => {
    if (value.length <= length) return value;
    return `${value.slice(0, length).trim()}...`;
};

export const ContactsTable = () => {
    const [data, setData] = useState<OwnerContact[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState<OwnerContact | null>(
        null
    );

    useEffect(() => {
        const loadContacts = async () => {
            try {
                const contacts = await contactService.getOwnerContacts();
                setData(contacts);
            } catch (error) {
                console.error("Failed to load contacts:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadContacts();
    }, []);

    const statusStyles = useMemo(
        () => ({
            NEW: "bg-cyan-900/30 text-cyan-300 border border-cyan-800",
            READ: "bg-blue-900/30 text-blue-300 border border-blue-800",
            REPLIED: "bg-green-900/30 text-green-300 border border-green-800",
            ARCHIVED: "bg-gray-800/60 text-gray-300 border border-gray-700",
        }),
        []
    );

    const columns: ColumnDef<OwnerContact>[] = [
        {
            accessorKey: "name",
            header: "Sender",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-medium text-white">{row.original.name}</span>
                    <span className="text-xs text-gray-500 font-mono">
                        {row.original.email}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "subject",
            header: "Subject",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="text-gray-200">{row.original.subject}</span>
                    <span className="text-xs text-gray-500 font-mono">
                        {truncate(row.original.message, 80)}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[row.original.status]}`}
                >
                    {row.original.status}
                </span>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "Received",
            cell: ({ row }) => (
                <span className="text-gray-400 font-mono">
                    {formatDate(row.original.createdAt)}
                </span>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <button
                    type="button"
                    onClick={() => setSelectedContact(row.original)}
                    className="px-3 py-1.5 text-xs font-mono text-cyan-300 border border-cyan-500/40 rounded-lg hover:bg-cyan-500/10 transition-colors"
                >
                    VIEW
                </button>
            ),
        },
    ];

    return (
        <>
            <DataTable columns={columns} data={data} isLoading={isLoading} />

            {selectedContact && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <button
                        type="button"
                        aria-label="Close modal"
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={() => setSelectedContact(null)}
                    />
                    <div className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-gray-900/95 shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                            <div className="space-y-1">
                                <p className="text-xs text-cyan-400 font-mono uppercase">
                                    Contact Details
                                </p>
                                <h2 className="text-lg md:text-xl font-semibold text-white">
                                    {selectedContact.subject}
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedContact(null)}
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Close contact details"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <div className="max-h-[75vh] overflow-y-auto px-6 py-5 space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500 font-mono">FROM</p>
                                    <p className="text-white">{selectedContact.name}</p>
                                    <p className="text-sm text-gray-400 font-mono">
                                        {selectedContact.email}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500 font-mono">STATUS</p>
                                    <span
                                        className={`inline-flex w-fit items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[selectedContact.status]}`}
                                    >
                                        {selectedContact.status}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500 font-mono">PHONE</p>
                                    <p className="text-sm text-gray-300">
                                        {selectedContact.phone || "—"}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500 font-mono">RECEIVED</p>
                                    <p className="text-sm text-gray-300 font-mono">
                                        {formatDate(selectedContact.createdAt)}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs text-gray-500 font-mono">MESSAGE</p>
                                <div className="rounded-xl border border-white/10 bg-gray-900/70 p-4 text-sm text-gray-200 leading-relaxed whitespace-pre-line">
                                    {selectedContact.message}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10">
                            <button
                                type="button"
                                className="px-4 py-2 text-sm font-mono text-gray-300 border border-gray-700 rounded-lg hover:text-white hover:border-gray-500 transition-colors"
                                onClick={() => setSelectedContact(null)}
                            >
                                CLOSE
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
