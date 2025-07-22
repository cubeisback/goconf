import { create } from 'zustand';

export const useConfirmModal = create((set) => ({
  isOpen: false,
  title: '',
  description: '',
  onConfirm: () => {},
  onCancel: null,
  confirmText: 'Подтвердить',
  cancelText: 'Отмена',

  openModal: (params) => set({ ...params, isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));