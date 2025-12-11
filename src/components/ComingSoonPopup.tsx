import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ComingSoonPopupProps {
    isOpen: boolean;
    onClose: () => void;
    feature: string;
}

const ComingSoonPopup: React.FC<ComingSoonPopupProps> = ({ isOpen, onClose, feature }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="glass bg-white p-6 rounded-2xl w-full max-w-sm text-center relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <X size={20} />
                        </button>
                        <div className="text-4xl mb-4">🚧</div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Coming Soon</h2>
                        <p className="text-gray-600">
                            The <span className="font-semibold text-brand-600">{feature}</span> feature is currently under construction.
                        </p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ComingSoonPopup;
