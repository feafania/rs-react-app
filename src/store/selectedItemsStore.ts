import { create } from 'zustand';

type SelectedItemsStore = {
  selectedItems: string[];

  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
  toggleItem: (id: string) => void;
  toggleItems: (ids: string[]) => void;

  isSelected: (id: string) => boolean;
};

export const useSelectedItemsStore = create<SelectedItemsStore>((set, get) => ({
  selectedItems: [],

  addItem: (id) =>
    set((state) => ({
      selectedItems: [...state.selectedItems, id],
    })),

  removeItem: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter((item) => item !== id),
    })),

  toggleItem: (id) => {
    const isSelected = get().isSelected(id);
    set((state) => ({
      selectedItems: isSelected
        ? state.selectedItems.filter((item) => item !== id)
        : [...state.selectedItems, id],
    }));
  },

  toggleItems: (ids) => {
    set((state) => {
      const selectedSet = new Set(state.selectedItems);
      const nextSelected = [...state.selectedItems];

      ids.forEach((id) => {
        if (selectedSet.has(id)) {
          const index = nextSelected.indexOf(id);

          if (index !== -1) {
            nextSelected.splice(index, 1);
          }
        } else {
          nextSelected.push(id);
        }
      });

      return {
        selectedItems: nextSelected,
      };
    });
  },

  clearItems: () => set({ selectedItems: [] }),

  isSelected: (id) => get().selectedItems.includes(id),
}));
