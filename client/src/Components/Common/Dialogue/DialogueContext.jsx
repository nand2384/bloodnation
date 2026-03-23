import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

const DialogueContext = createContext();

export const useDialogue = () => useContext(DialogueContext);

export const DialogueProvider = ({ children }) => {
  const [dialogue, setDialogue] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'alert', // 'alert' | 'confirm' | 'success' | 'error'
    onConfirm: null,
    onCancel: null,
  });

  const resolveConfirm = useRef(null);

  const showAlert = useCallback((message, type = 'alert', title = '') => {
    let defaultTitle = title;
    if (!defaultTitle) {
       switch(type) {
         case 'error': defaultTitle = 'Error'; break;
         case 'success': defaultTitle = 'Success'; break;
         default: defaultTitle = 'Notification'; break;
       }
    }

    setDialogue({
      isOpen: true,
      title: defaultTitle,
      message,
      type,
      onConfirm: () => closeDialogue(),
      onCancel: null,
    });
  }, []);

  const showConfirm = useCallback((message, title = 'Confirm Action') => {
    return new Promise((resolve) => {
      resolveConfirm.current = resolve;
      
      setDialogue({
        isOpen: true,
        title,
        message,
        type: 'confirm',
        onConfirm: () => {
          resolve(true);
          closeDialogue();
        },
        onCancel: () => {
          resolve(false);
          closeDialogue();
        },
      });
    });
  }, []);

  const closeDialogue = useCallback(() => {
    setDialogue((prev) => ({ ...prev, isOpen: false }));
    if (resolveConfirm.current) {
        resolveConfirm.current(false);
        resolveConfirm.current = null;
    }
  }, []);


  const getIcon = () => {
    switch (dialogue.type) {
        case 'error':
            return <AlertCircle className="w-12 h-12 text-red-500 mb-4 mx-auto" />;
        case 'success':
            return <CheckCircle className="w-12 h-12 text-emerald-500 mb-4 mx-auto" />;
        case 'confirm':
            return <AlertCircle className="w-12 h-12 text-amber-500 mb-4 mx-auto" />;
        default:
            return <Info className="w-12 h-12 text-blue-500 mb-4 mx-auto" />;
    }
  };

  const getThemeColors = () => {
      switch (dialogue.type) {
          case 'error':
              return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-900', btn: 'bg-red-600 hover:bg-red-700' };
          case 'success':
              return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-900', btn: 'bg-emerald-600 hover:bg-emerald-700' };
          case 'confirm':
              return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-900', btn: 'bg-red-600 hover:bg-red-700' };
          default:
              return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-900', btn: 'bg-blue-600 hover:bg-blue-700' };
      }
  };

  const theme = getThemeColors();

  return (
    <DialogueContext.Provider value={{ showAlert, showConfirm }}>
      {children}
      
      {dialogue.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={dialogue.type !== 'confirm' ? closeDialogue : undefined}></div>
          <div className="bg-white/95 backdrop-blur-md border border-slate-200/60 rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative z-10 transform transition-all flex flex-col items-center text-center animate-in fade-in zoom-in duration-200">
            
            {dialogue.type !== 'confirm' && (
                <button 
                    onClick={closeDialogue} 
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            )}

            {getIcon()}
            
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-3">
              {dialogue.title}
            </h3>
            
            <p className="text-slate-600 font-medium mb-8">
              {dialogue.message}
            </p>
            
            <div className="flex w-full gap-3 sm:gap-4 justify-center">
              {dialogue.type === 'confirm' && (
                <button
                  onClick={dialogue.onCancel}
                  className="flex-1 py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={dialogue.onConfirm}
                className={`flex-1 ${dialogue.type === 'confirm' ? 'py-3' : 'py-3.5 max-w-[200px]'} px-6 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer ${theme.btn}`}
              >
                {dialogue.type === 'confirm' ? 'Confirm' : 'Okay'}
              </button>
            </div>
          </div>
        </div>
      )}
    </DialogueContext.Provider>
  );
};
