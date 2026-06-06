import { create } from 'zustand';
import { type BaseFormFields, type FormType } from '../types/types.ts';

export type FormSubmission = BaseFormFields & {
  id: string;
  source: FormType;
  createdAt: number;
};

type FormsStore = {
  submissions: FormSubmission[];
  addSubmission: (submission: FormSubmission) => void;
};

export const useFormsStore = create<FormsStore>((set) => ({
  submissions: [],

  addSubmission: (submission) =>
    set((state) => ({
      submissions: [submission, ...state.submissions],
    })),
}));
