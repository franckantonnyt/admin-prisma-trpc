"use client";

import { useState } from "react";
import { trpc } from "@/server/client";
import { X } from 'lucide-react';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Params = {
    isOpen: boolean;
    handleClick: (value: boolean) => void;
}

const Modal = ({ isOpen, handleClick }: Params) => {
    const getUsers = trpc.users.getUsers.useQuery();
    const addUsers = trpc.users.addUser.useMutation({
        onSettled: () => {
            getUsers.refetch();
        }
    });

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div className={`${isOpen ? 'flex' : 'hidden'} fixed inset-0 z-10 w-screen items-center justify-center backdrop-blur-sm bg-background/40`}>
            <div className="relative m-auto border border-teal-80 p-8 rounded-xl min-w-72 max-w-fit max-h-fit bg-background shadow-2xl">
                <Button variant='ghost' size="icon" className='absolute right-0 top-0 rounded-full' onClick={() => handleClick(false)}>
                    <X size={20} />
                </Button>
                <div className='grid gap-4 mt-4'>
                    <Input placeholder="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Button onClick={() => { addUsers.mutate({ email, name }), handleClick(false) }} className='mt-2' disabled={name && email ? false : true}>
                        Adicionar
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Modal;