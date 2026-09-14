'use client';

import React, { useState } from 'react';

export interface CustomModalProps {
  isOpen: boolean;
  type?: 'confirm' | 'prompt' | 'alert';
  title: string;
  description?: string;
  icon?: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'danger' | 'primary' | 'warning' | 'emerald';
  inputLabel?: string;
  defaultValue?: string;
  placeholder?: string;
  onConfirm?: (inputValue?: string) => void;
  onClose: () => void;
}

export default function CustomModal({
  isOpen,
  type = 'confirm',
  title,
  description,
  icon = '⚠️',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'danger',
  inputLabel,
  defaultValue = '',
  placeholder = '',
  onConfirm,
  onClose,
}: CustomModalProps) {
  const [inputValue, setInputValue] = useState(defaultValue);

  if (!isOpen) return null;

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'prompt') {
      if (onConfirm) onConfirm(inputValue);
    } else {
      if (onConfirm) onConfirm();
    }
    onClose();
  };

  const getButtonVariantStyle = () => {
    switch (confirmVariant) {
      case 'danger':
        return 'bg-[#bd171c] hover:bg-[#791017] text-white border-red-500/40 shadow-red-900/30';
      case 'emerald':
        return 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-400/40 shadow-emerald-900/30';
      case 'warning':
        return 'bg-amber-600 hover:bg-amber-700 text-white border-amber-400/40 shadow-amber-900/30';
      default:
        return 'bg-[#172a34] hover:bg-[#0e191f] text-white border-slate-600';
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-2xl max-w-md w-full overflow-hidden border-t-8 border-t-[#bd171c] animate-scale-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#172a34] via-[#0f232e] to-[#791017] p-6 text-white flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl shrink-0 shadow-inner">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-black leading-snug">{title}</h3>
            {description && <p className="text-slate-300 text-xs mt-1.5 font-medium leading-relaxed">{description}</p>}
          </div>
        </div>

        {/* Form Body for Prompt or Alert */}
        <form onSubmit={handleConfirmSubmit} className="p-6 space-y-5 bg-white">
          {type === 'prompt' && (
            <div>
              <label className="block text-xs font-black text-[#172a34] uppercase tracking-wider mb-2">
                {inputLabel || 'Enter Details'}
              </label>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
                rows={3}
                className="w-full bg-slate-50 border-2 border-slate-300 rounded-2xl p-3 text-xs text-[#172a34] font-medium focus:outline-none focus:border-[#bd171c] focus:bg-white"
                autoFocus
                required
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {type !== 'alert' && (
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border-2 border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition"
              >
                {cancelText}
              </button>
            )}

            <button
              type="submit"
              className={`px-6 py-2.5 rounded-xl font-black text-xs transition shadow-lg border ${getButtonVariantStyle()}`}
            >
              {confirmText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
