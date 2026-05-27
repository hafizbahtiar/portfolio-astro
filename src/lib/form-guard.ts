
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
      (e as unknown as { returnValue: string }).returnValue = '';
      return '';
    }
  };

  const handlePopState = async () => {
    if (isDirty) {
      // Re-push guard so we stay on the current page while the modal is open.
      // This means history is now [..., original, guard(re-pushed)].
      // When the user confirms, we call go(-2) to skip both the re-pushed guard
      // and the original push, landing on the real previous page.
      history.pushState({ tag: 'form-guard' }, document.title, window.location.href);

      if (window.unsavedChangesModal) {
        const confirmed = await window.unsavedChangesModal.show();
        if (confirmed) {
          isDirty = false;
          window.removeEventListener('beforeunload', handleBeforeUnload);
          history.go(-2);
        }
      } else {
        if (window.confirm("You have unsaved changes. Leave?")) {
          isDirty = false;
          window.removeEventListener('beforeunload', handleBeforeUnload);
          history.go(-2);
        }
      }
    }
  };

  const handleLinkClick = async (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest('a');
    if (!target) return;

    const href = target.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.toLowerCase().startsWith('javascript:') || target.target === '_blank') return;

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
