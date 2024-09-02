import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast'
import useConversation from '../src/zustand/useConversation';

const useGetMessages = () => {
    const [loading, setloading] = useState(false)
    const {messages, setMessages, selectedConversation} = useConversation()

    useEffect(() => {
        const getMessages = async () => {
            setloading(true);
            try {
                const res=await fetch(`/api/messages/${selectedConversation._id}`);
                const data = await res.json();
                console.log("Fetched data:", data)
                if(data.error) throw new Error(data.error);
                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally{
                setloading(false);
            }
        };
        if(selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);

    return {messages, loading};
};

export default useGetMessages;