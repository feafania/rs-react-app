import type { BaseFormFields, FormType } from '../types/types.ts';
import type { FormSubmission } from '../store/useFormsStore.ts';

export function createSubmission(
  formType: FormType,
  data: BaseFormFields
): FormSubmission {
  return {
    ...data,
    id: crypto.randomUUID(),
    source: formType,
    createdAt: Date.now(),
  };
}
