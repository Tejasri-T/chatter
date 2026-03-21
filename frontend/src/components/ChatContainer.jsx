import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";


function ChatContainer() {

  const { selectedUser, getMessagesByUserId, messages,isMessagesLoading,subscribeToMessages,unSubscribeFromMessages, editMessage, deleteMessage } = useChatStore()
  const { authUser } = useAuthStore()

  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleEditStart = (msg) => {
      setEditingMessageId(msg._id);
      setEditingText(msg.text || "");
  };

  const handleEditCancel = () => {
      setEditingMessageId(null);
      setEditingText("");
  };

  const handleEditSave = async (msgId) => {
      if (!editingText.trim()) return;
      await editMessage(msgId, editingText);
      setEditingMessageId(null);
      setEditingText("");
  };

  const handleDeleteConfirm = (msgId) => {
      toast((t) => (
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium">Delete this message?</span>
          <div className="flex gap-2 justify-end">
            <button className="btn btn-xs btn-ghost" onClick={() => toast.dismiss(t.id)}>Cancel</button>
            <button className="btn btn-xs btn-error text-white" onClick={() => { deleteMessage(msgId); toast.dismiss(t.id); }}>Delete</button>
          </div>
        </div>
      ), { duration: Infinity, id: msgId });
  };

  useEffect(() => {
    getMessagesByUserId(selectedUser?._id)
    subscribeToMessages();

    return () => {
      unSubscribeFromMessages();
    }
  }, [selectedUser, getMessagesByUserId,subscribeToMessages,unSubscribeFromMessages])

  const  messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

    

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                >
                  <div
                    className={`chat-bubble relative group ${msg.senderId === authUser._id
                        ? "bg-cyan-600 text-white"
                        : "bg-slate-800 text-slate-200"
                      }`}
                  >
                    {msg.senderId === authUser._id && editingMessageId !== msg._id && (
                        <div className="absolute -top-3 -right-2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEditStart(msg)} className="btn btn-xs btn-circle bg-base-100 text-base-content hover:bg-base-200 border-none shadow-sm" title="Edit text">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button onClick={() => handleDeleteConfirm(msg._id)} className="btn btn-xs btn-circle bg-base-100 text-red-500 hover:bg-base-200 border-none shadow-sm" title="Delete message">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                               </svg>
                            </button>
                        </div>
                    )}

                    {editingMessageId === msg._id ? (
                        <div className="flex flex-col gap-2 min-w-[200px] mt-1">
                            <input 
                                type="text" 
                                className="input input-sm input-bordered w-full text-base-content bg-base-100" 
                                value={editingText} 
                                onChange={(e) => setEditingText(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') handleEditSave(msg._id); if (e.key === 'Escape') handleEditCancel(); }}
                                autoFocus 
                            />
                            <div className="flex justify-end gap-1">
                                <button className="btn btn-xs btn-ghost text-slate-200" onClick={handleEditCancel}>Cancel</button>
                                <button className="btn btn-xs btn-primary" onClick={() => handleEditSave(msg._id)}>Save</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {msg.image && (
                              <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover mt-2" />
                            )}
                            {msg.text && <p className="mt-2 text-sm leading-relaxed">{msg.text}</p>}
                        </>
                    )}

                    <p className="text-xs mt-1 opacity-75 flex items-center gap-1 justify-end">
                      {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {msg.isEdited && <span className="text-[10px] italic ml-1">(edited)</span>}
                    </p> 
                  </div>
                </div>
              ))}
              {/* 👇 scroll target */}
              <div ref={messageEndRef} />
            </div>
            ) : isMessagesLoading ? <MessagesLoadingSkeleton /> : (
            <NoChatHistoryPlaceholder name={selectedUser?.fullName} />
      )}
          </div>

          <MessageInput />
    </>
      )
}

      export default ChatContainer
