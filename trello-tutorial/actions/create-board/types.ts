import { z } from 'zod';

import { Board } from '@/lib/generated/prisma'; 

import { ActionState, FieldErrors } from '@/lib/create-safe-action';

import { CreateBoard } from '@/actions/create-board/schema';

export type InputType = z.infer<typeof CreateBoard>;
export type ReturnType = ActionState<InputType, Board>;
