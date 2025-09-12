import { useConfirmModal } from '@/store/confirmModalStore';
import { Button } from '@/styles/ui';
import { css, cx } from '@emotion/css';
import { AnimatePresence, motion } from 'framer-motion';
import CloseIcon from "@/public/images/svg/close.svg";

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
				padding: '40px 64px',
				maxWidth: '90%',
				width: '480px',
				boxShadow: '0 111px 31px 0 rgba(0, 0, 0, 0.00), 0 71px 28px 0 rgba(0, 0, 0, 0.01), 0 40px 24px 0 rgba(0, 0, 0, 0.05), 0 18px 18px 0 rgba(0, 0, 0, 0.09), 0 4px 10px 0 rgba(0, 0, 0, 0.10)',
				position: 'relative',
            }}
          >
			<CloseIcon style={{position: 'absolute', right: 16, top: 16, cursor: 'pointer'}} onClick={handleCancel} />
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
              {title}
            </h1>
            <p style={{ fontSize: '14px', marginBottom: '32px', textAlign: 'center' }}>{description}</p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              {/* <button
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
              </button> */}
			  <Button onClick={handleConfirm}>
				<p>
					<span>{confirmText}</span>
					<span>{confirmText}</span>
				</p>
			  </Button>

			  {/* <button
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
              </button> */}
			  <Button className={cx(css`color:#8553F9!important;background-color:#fff!important; span {color:#8553F9!important;}`)} onClick={handleCancel}>
				<p>
					<span>{cancelText}</span>
					<span>{cancelText}</span>
				</p>
			  </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};