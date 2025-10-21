// src/components/Modal.jsx
import React from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
                >
                    <X />
                </button>

                {children}
            </div>
        </div>
    );
};

export default Modal;
