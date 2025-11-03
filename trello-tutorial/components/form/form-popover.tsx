"use client";

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board/index";

import { FormInput } from "./form-input";
import { FormSubmit } from "./form-button";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import { error } from "console";


interface FormPopoverProps {
    children: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
};

export const FormPopover = ({
    children,
    side = "bottom",
    align,
    sideOffset = 0,
}: FormPopoverProps) => {

    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            console.log({ data });
            toast.success("Board created!");
        },
        onError: (errors) => {
            console.log({ errors });
            toast.error(errors);
        },
    });

    const onSubmit = (FormData: FormData) => {
        const title = FormData.get("title") as string;

        execute({ title });
    };

    return (
        <Popover> 
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent 
                side={side} 
                align={align} 
                sideOffset={sideOffset} 
                className="w-80 pt-3"
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Create Board
                </div>
                <PopoverClose asChild>
                    <Button
                        className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4"/>
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormInput
                            id="title"
                            label="Board title"
                            type="text"
                            errors={fieldErrors}
                        />
                    </div>
                    <FormSubmit className="w-full">
                        Create
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};
