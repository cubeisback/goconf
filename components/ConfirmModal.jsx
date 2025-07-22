import { useConfirmModal } from '@/store/confirmModalStore';
import { AnimatePresence, motion } from 'framer-motion';

export const ConfirmModal = () => {
  const {
    isOpen,
    title,
    description,
    onConfirm,
    onCancel,
    confirmText,
    cancelText,
    closeModal,
  } = useConfirmModal();

  const handleCancel = () => {
    if (onCancel) onCancel();
    closeModal();
  };

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: '#fff',
              borderRadius: '28px',
              padding: '24px',
              maxWidth: '90%',
              width: '400px',
            }}
          >
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
              {title}
            </h1>
            <p style={{ marginBottom: '24px' }}>{description}</p>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={handleCancel}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#f0f0f0',
                  cursor: 'pointer',
                }}
              >
                {cancelText}
              </button>
              <button
                onClick={handleConfirm}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#8553F9',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};