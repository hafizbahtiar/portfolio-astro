
interface ModalInterface {
  show: () => Promise<boolean>;
  hide: () => void;
}

declare global {
  interface Window {
    unsavedChangesModal?: ModalInterface;
  }
}

export function setupFormGuard(form: HTMLFormElement) {
  let initialData = new FormData(form);
  let isDirty = false;
  let historyPushed = false;

  // Helper to serialize FormData for comparison
  const serialize = (formData: FormData) => {
    const obj: Record<string, any> = {};
    formData.forEach((value, key) => {
      // Simple serialization handling multiple values
      if (obj[key] !== undefined) {
        if (!Array.isArray(obj[key])) {
          obj[key] = [obj[key]];
        }
        obj[key].push(value);
      } else {
        obj[key] = value;
      }
    });
    return JSON.stringify(obj);
  };

  let initialString = serialize(initialData);

  const updateInitialState = () => {
    initialData = new FormData(form);
    initialString = serialize(initialData);
    isDirty = false;
    // Don't remove history state here as it might be complex to revert, 
    // but we reset the dirty flag so guards won't trigger.
  };

  const pushHistoryState = () => {
    if (!historyPushed) {
      history.pushState({ tag: 'form-guard' }, document.title, window.location.href);
      historyPushed = true;
    }
  };

  const checkDirty = () => {
    const currentData = new FormData(form);
    const currentString = serialize(currentData);
    const wasDirty = isDirty;
    isDirty = currentString !== initialString;

    if (isDirty && !wasDirty) {
      pushHistoryState();
      window.addEventListener('beforeunload', handleBeforeUnload);
    } else if (!isDirty && wasDirty) {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  };

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (isDirty) {
      e.preventDefault();
      e.returnValue = '';
      return '';
    }
  };

  const handlePopState = async (e: PopStateEvent) => {
    // If we are dirty and a popstate occurs (User pressed Back)
    if (isDirty) {
      // The user pressed Back, so they are now at the previous state.
      // We need to restore the "Guard" state immediately to prevent them from leaving yet.
      history.pushState({ tag: 'form-guard' }, document.title, window.location.href);

      // Now show the modal
      if (window.unsavedChangesModal) {
        const confirm = await window.unsavedChangesModal.show();
        if (confirm) {
          isDirty = false;
          window.removeEventListener('beforeunload', handleBeforeUnload);
          // Go back for real (pop the guard state we just restored)
          history.back();
          // Note: Depending on browser speed, we might need a slight delay or just 
          // let the first back happen. 
          // Wait, if we pushed state, we are at [Guard].
          // history.back() takes us to [Previous].
          // That's what we want.
        }
      } else {
        if (confirm("You have unsaved changes. Leave?")) {
          isDirty = false;
          window.removeEventListener('beforeunload', handleBeforeUnload);
          history.back();
        }
      }
    }
  };

  const handleLinkClick = async (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest('a');
    if (!target) return;

    const href = target.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || target.target === '_blank') return;

    if (isDirty) {
      e.preventDefault();
      e.stopPropagation();

      if (window.unsavedChangesModal) {
        const confirm = await window.unsavedChangesModal.show();
        if (confirm) {
          isDirty = false;
          window.removeEventListener('beforeunload', handleBeforeUnload);
          window.location.href = href;
        }
      } else {
        if (confirm("You have unsaved changes. Leave?")) {
          isDirty = false;
          window.removeEventListener('beforeunload', handleBeforeUnload);
          window.location.href = href;
        }
      }
    }
  };

  // Add listeners
  form.addEventListener('input', checkDirty);
  form.addEventListener('change', checkDirty);
  // Also listen for keyup to catch text inputs faster if needed, but input is usually sufficient

  window.addEventListener('popstate', handlePopState);
  document.addEventListener('click', handleLinkClick, true);

  return {
    updateInitialState,
    cleanup: () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleLinkClick, true);
      form.removeEventListener('input', checkDirty);
      form.removeEventListener('change', checkDirty);
    }
  };
}
