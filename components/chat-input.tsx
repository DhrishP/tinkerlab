import { cn } from "@/lib/utils";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";

import { useChat } from "ai/react";
import { Send } from "lucide-react";
import { Message } from "ai";
type ChatInputProps = {
  className: string;
};

const ChatInput = ({ className }: ChatInputProps) => {
  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div className="overflow-y-scroll">
      <form
        onSubmit={handleSubmit}
        className={cn(
          `border-t border-primary-content space-y-2 flex flex-col `,
          className
        )}
      >
        <TextareaAutosize
          rows={2}
          maxRows={4}
          value={input}
          autoFocus
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="peer disabled:opacity-50  resize-none block pr-14 px-2 w-full border-0 bg-green-100  py-1.5 text-primary  text-sm sm:leading-6"
        />
        <button
          type="submit"
          className="btn rounded-none mr-1 relative bottom-[2.6rem]   btn-sm self-end bg-green-100 "
        >
          <Send className="w-4 h-4 text-secondary" />
        </button>
      </form>
      {messages.length > 0 ? (
        <span className="px-6 text-primary relative bottom-10 ">
          {messages.map((message: Message) => (
            <div key={message.id}>
              {message.role === "assistant" ? (
                <h3 className="text-sm ml-2 font-semibold mt-2">
                  AI Assistant
                </h3>
              ) : (
                <h3 className="text-sm ml-2 font-semibold mt-2  mr-1">You</h3>
              )}
              {message.content.split("\n").map((item: string) => {
                if (item === "") {
                  return <p key={item}>&nbsp;</p>;
                } else {
                  if (message.role === "assistant") {
                    return (
                      <>
                        <div
                          key={item}
                          className="bg-green-600 inline-block ml-2  text-white dark:bg-blue-400 p-2 rounded-lg text-left"
                        >
                          <p className="text-sm ">{item}</p>
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <div
                          key={item}
                          className="bg-white inline-block text-end p-2 ml-2  rounded-lg "
                        >
                          <p className="text-sm  ">{item}</p>
                        </div>
                      </>
                    );
                  }
                }
              })}
            </div>
          ))}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChatInput;
