"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useFormStatus } from "react-dom";

interface FormInputProps {
    errors?: {
        title?: string[];
    }
}

export const FormInput = ({ errors }: FormInputProps) => {
    
    const { pending } = useFormStatus();
    const [inputValue, setInputValue] = useState("");
    
    return (
        <div>
            <Input
                id="title"
                name="title"
                required
                placeholder="Enter a board title"
                disabled={pending}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
             {errors?.title ? (
                    <div>
                        {errors?.title?.map((error: string) => (
                            <p key={error} className="text-rose-500">
                                {error}
                            </p>
                        ))}
                    </div>
                ) : null}
        </div>
    );
};