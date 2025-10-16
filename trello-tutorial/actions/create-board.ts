"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
    errors?: {
        title?: string[];
    };
    message?: string | null;
}

const CreateBoard = z.object({
    title: z.string().min(3, {
        message: "Minimum length of 3 characters is required"
    })
});

export async function create(prevState: State, formData: FormData) {

    const validateField = CreateBoard.safeParse({
        title: formData.get("title"),
    });

    if (!validateField.success) {
        return {
            errors: validateField.error.flatten().fieldErrors,
            message: null
        }
    }

    const { title } = validateField.data;

    try {
        await db.board.create({
            data: {
                title,
            }
        });
    } catch (error) {
        return {
            message: "Database error.",
        };
    }

    revalidatePath("/organization/org_33UOIY4WOGOjPX4U43duveUShZs");
    redirect("/organization/org_33UOIY4WOGOjPX4U43duveUShZs");
}
