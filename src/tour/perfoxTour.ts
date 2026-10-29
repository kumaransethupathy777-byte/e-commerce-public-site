import { driver, DriveStep } from 'driver.js';
import './tourStyles.css';

/**
 * Accesses the open ShadowRoot where the Perfox Chatbot widget is mounted.
 */
export function getPerfoxShadow(): ShadowRoot | null {
  const host = document.getElementById('perfox-widget');
  if (host && host.shadowRoot) return host.shadowRoot;

  // Fallback: search all elements on page for any attached shadowRoot
  const allElements = document.querySelectorAll('*');
  for (const el of allElements) {
    if (el.shadowRoot) return el.shadowRoot;
  }
  return null;
}

/**
 * Finds the main opened chat window panel inside the shadow DOM.
 */
export function getPerfoxChatWindow(): HTMLElement | null {
  const shadow = getPerfoxShadow();
  if (!shadow) return null;

  const panel = shadow.querySelector<HTMLElement>('.sa-widget-panel');
  if (panel && panel.getBoundingClientRect().height > 100) return panel;

  // Fallback: search fixed containers
  const allFixed = shadow.querySelectorAll<HTMLElement>('div[class*="fixed"], div[style*="fixed"]');
  for (const el of allFixed) {
    if (el.getBoundingClientRect().height > 200) return el;
  }

  const input = shadow.querySelector('textarea, .sa-widget-input');
  if (input) {
    const parent = input.closest<HTMLElement>('.sa-widget-panel, div[class*="fixed"]');
    if (parent) return parent;
  }

  return shadow.querySelector<HTMLElement>('.sa-widget-panel, div[class*="fixed"]');
}

/**
 * Finds the entire Perfox Chatbot header.
 */
export function getPerfoxHeader(): HTMLElement | null {
  const shadow = getPerfoxShadow();
  if (shadow) {
    const header = shadow.querySelector<HTMLElement>('.sa-widget-header');
    if (header) return header;
  }
  const win = getPerfoxChatWindow();
  if (win && win.firstElementChild) {
    return win.firstElementChild as HTMLElement;
  }
  return shadow?.querySelector<HTMLElement>('div[class*="from-indigo-600"], div[class*="bg-gradient"]') || null;
}

/**
 * Feature 1: Finds the Left Header Area (Avatar "SA", "Perfox" Title, "Online" Live Status).
 */
export function getPerfoxHeaderLeft(): HTMLElement | null {
  const shadow = getPerfoxShadow();
  if (shadow) {
    const left = shadow.querySelector<HTMLElement>('.sa-widget-header-left');
    if (left) return left;
    const avatar = shadow.querySelector<HTMLElement>('.sa-widget-header-avatar');
    if (avatar) return avatar.parentElement || avatar;
  }
  return getPerfoxHeader();
}

/**
 * Feature 2: Finds the Fullscreen Expand Button (⤢).
 */
export function getPerfoxFullscreenBtn(): HTMLElement | null {
  const shadow = getPerfoxShadow();
  if (shadow) {
    const fsBtn = shadow.querySelector<HTMLElement>(
      '.sa-widget-header-fs, button[title*="fullscreen" i], button[aria-label*="fullscreen" i]'
    );
    if (fsBtn) return fsBtn;

    const actions = shadow.querySelector<HTMLElement>('.sa-widget-header-actions');
    if (actions && actions.firstElementChild) {
      return actions.firstElementChild as HTMLElement;
    }
  }
  return null;
}

/**
 * Feature 3: Finds the Close / Minimize Button (✕).
 */
export function getPerfoxCloseBtn(): HTMLElement | null {
  const shadow = getPerfoxShadow();
  if (shadow) {
    const closeBtn = shadow.querySelector<HTMLElement>(
      '.sa-widget-header-close, button[title*="close" i], button[aria-label*="close" i]'
    );
    if (closeBtn) return closeBtn;

    const actions = shadow.querySelector<HTMLElement>('.sa-widget-header-actions');
    if (actions && actions.lastElementChild) {
      return actions.lastElementChild as HTMLElement;
    }
  }
  return null;
}

/**
 * Feature 4: Finds the natural language message textarea / input.
 */
export function getPerfoxInput(): HTMLElement | null {
  const shadow = getPerfoxShadow();
  return shadow?.querySelector<HTMLElement>('.sa-widget-input, textarea') || null;
}

/**
 * Feature 5: Finds or attaches the dedicated Upload File / Attachment button (📎) in controls-left.
 * Spotlights this feature separately and clearly.
 */
export function getPerfoxAttachButton(): HTMLElement | null {
  const shadow = getPerfoxShadow();
  if (shadow) {
    // 1. Check if an attach button/label already exists
    const existing = shadow.querySelector<HTMLElement>(
      '.sa-widget-attach-btn, .sa-widget-attach, label:has(input[type="file"]), button[title*="upload" i], button[title*="attach" i], button[aria-label*="upload" i], button[aria-label*="attach" i]'
    );
    if (existing) return existing;

    // 2. Locate or ensure button inside .sa-widget-controls-left
    const controlsLeft = shadow.querySelector<HTMLElement>('.sa-widget-controls-left');
    if (controlsLeft) {
      let btn = controlsLeft.querySelector<HTMLElement>('.sa-widget-attach-btn');
      if (!btn) {
        btn = document.createElement('button');
        btn.className = 'sa-widget-attach-btn';
        btn.title = 'Upload reference photo or document';
        btn.setAttribute('aria-label', 'Upload reference photo or document');
        btn.style.background = 'none';
        btn.style.border = 'none';
        btn.style.cursor = 'pointer';
        btn.style.color = '#94a3b8';
        btn.style.padding = '5px 7px';
        btn.style.display = 'inline-flex';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';
        btn.style.borderRadius = '8px';
        btn.style.transition = 'color 0.2s, background 0.2s';
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>`;

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*,.pdf,.doc,.docx';
        fileInput.style.display = 'none';
        btn.appendChild(fileInput);
        btn.onclick = (e) => {
          e.stopPropagation();
          fileInput.click();
        };

        controlsLeft.appendChild(btn);
      }
      return btn;
    }
  }
  return null;
}

/**
 * Feature 6: Finds the microphone / voice note button (🎙️).
 */
export function getPerfoxVoiceBtn(): HTMLElement | null {
  const shadow = getPerfoxShadow();
  if (shadow) {
    const mic = shadow.querySelector<HTMLElement>(
      '.sa-widget-record-btn, .sa-widget-voice-btn, button[title*="voice" i], button[title*="record" i], button[aria-label*="voice" i], button[aria-label*="record" i]'
    );
    if (mic) return mic;

    const controlsRight = shadow.querySelector<HTMLElement>('.sa-widget-controls-right');
    if (controlsRight && controlsRight.firstElementChild) {
      return controlsRight.firstElementChild as HTMLElement;
    }
  }
  return null;
}

/**
 * Feature 7: Finds the send action button (✈️).
 */
export function getPerfoxSendButton(): HTMLElement | null {
  const shadow = getPerfoxShadow();
  if (shadow) {
    const sendBtn = shadow.querySelector<HTMLElement>(
      '.sa-widget-send, button[title*="send" i], button[aria-label*="send" i]'
    );
    if (sendBtn) return sendBtn;

    const controlsRight = shadow.querySelector<HTMLElement>('.sa-widget-controls-right');
    if (controlsRight && controlsRight.lastElementChild) {
      return controlsRight.lastElementChild as HTMLElement;
    }
  }
  const win = getPerfoxChatWindow();
  if (win && win.lastElementChild) {
    const btns = win.lastElementChild.querySelectorAll('button');
    if (btns.length > 0) {
      return btns[btns.length - 1];
    }
  }
  return null;
}

/**
 * Finds the floating launcher button at bottom-right corner when chat is closed.
 */
export function getPerfoxLauncher(): HTMLButtonElement | null {
  const shadow = getPerfoxShadow();
  if (shadow) {
    const btn = shadow.querySelector<HTMLButtonElement>(
      '.sa-widget-bubble, button[class*="rounded-full"], button[class*="bg-indigo-600"], button'
    );
    if (btn) return btn;
  }

  const direct = document.querySelector<HTMLButtonElement>(
    '#perfox-widget button, div.fixed.bottom-6.right-6 button'
  );
  if (direct) return direct;

  return null;
}

/**
 * Ensures the official Perfox chat widget is opened and pre-mounts controls before starting tour.
 */
export function openPerfoxWidget(callback?: () => void) {
  const shadow = getPerfoxShadow();
  const existingWin = shadow?.querySelector<HTMLElement>('.sa-widget-panel, div[class*="fixed"]');
  if (existingWin && existingWin.getBoundingClientRect().height > 200) {
    getPerfoxAttachButton(); // ensure attach button mounted
    callback?.();
    return;
  }

  // 1. Call official Perfox queue API
  if (typeof (window as any).Perfox === 'function') {
    try {
      (window as any).Perfox('open');
    } catch (e) {
      // Ignore
    }
  }

  // 2. Click launcher button inside shadow
  const launcher = shadow?.querySelector<HTMLButtonElement>('.sa-widget-bubble, button');
  if (launcher) {
    launcher.click();
  }

  // 3. Poll until window is truly rendered
  let attempts = 0;
  const poll = setInterval(() => {
    attempts++;
    const s = getPerfoxShadow();
    const win = s?.querySelector<HTMLElement>('.sa-widget-panel, div[class*="fixed"]');
    const ready = (win && win.getBoundingClientRect().height > 150) || s?.querySelector('.sa-widget-input, textarea');
    if (ready || attempts > 25) {
      clearInterval(poll);
      getPerfoxAttachButton(); // ensure attach button is ready
      setTimeout(() => {
        callback?.();
      }, 250);
    }
  }, 80);
}

// Active spotlight tracking to ensure pointed elements are 100% sharp, vivid, and unblurred
let currentlyHighlighted: HTMLElement | null = null;
let savedStyles: {
  outline?: string;
  outlineOffset?: string;
  boxShadow?: string;
  filter?: string;
  opacity?: string;
  transform?: string;
  zIndex?: string;
  position?: string;
} = {};

function applyActiveGlow(el: HTMLElement) {
  removeActiveGlow();
  currentlyHighlighted = el;
  savedStyles = {
    outline: el.style.outline,
    outlineOffset: el.style.outlineOffset,
    boxShadow: el.style.boxShadow,
    filter: el.style.filter,
    opacity: el.style.opacity,
    transform: el.style.transform,
    zIndex: el.style.zIndex,
    position: el.style.position,
  };

  el.style.outline = '2.5px solid #818cf8';
  el.style.outlineOffset = '3px';
  el.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.4), 0 0 22px rgba(99, 102, 241, 0.8)';
  el.style.filter = 'none';
  el.style.opacity = '1';
  el.style.zIndex = '10000001';
  if (getComputedStyle(el).position === 'static') {
    el.style.position = 'relative';
  }
}

function removeActiveGlow() {
  if (currentlyHighlighted) {
    currentlyHighlighted.style.outline = savedStyles.outline || '';
    currentlyHighlighted.style.outlineOffset = savedStyles.outlineOffset || '';
    currentlyHighlighted.style.boxShadow = savedStyles.boxShadow || '';
    currentlyHighlighted.style.filter = savedStyles.filter || '';
    currentlyHighlighted.style.opacity = savedStyles.opacity || '';
    currentlyHighlighted.style.transform = savedStyles.transform || '';
    currentlyHighlighted.style.zIndex = savedStyles.zIndex || '';
    currentlyHighlighted.style.position = savedStyles.position || '';
    currentlyHighlighted = null;
    savedStyles = {};
  }
}

/**
 * Dedicated Perfox Chatbot Tour Steps:
 * Each feature of the chatbot is spotlighted and explained SEPARATELY:
 * 1. AI Identity & Online Status
 * 2. Fullscreen Focus Mode
 * 3. Discreet Minimize & Session Memory
 * 4. Natural Language Shopping Input
 * 5. 📎 Image & File Upload (Separately pointed)
 * 6. 🎙️ Hands-Free Voice Dictation (Separately pointed)
 * 7. 🚀 Sub-Second AI Dispatch (Separately pointed)
 */
export const PERFOX_CHATBOT_TOUR_STEPS: DriveStep[] = [
  {
    element: () => (getPerfoxHeaderLeft() || getPerfoxHeader() || getPerfoxChatWindow()) as Element,
    popover: {
      title: '🤖 Perfox AI Concierge & Status',
      description:
        'The header displays the official "SA" brand avatar, the Perfox AI assistant name, and the live "Online" status indicator.\n\nCustomers have 24/7 access to intelligent styling advice, size recommendations, and real-time support without waiting for human agents.',
      side: 'left',
      align: 'start',
    },
  },
  {
    element: () => (getPerfoxFullscreenBtn() || getPerfoxHeader() || getPerfoxChatWindow()) as Element,
    popover: {
      title: '⤢ Fullscreen Focus Mode',
      description:
        'Click the diagonal arrows (⤢) to expand the assistant into an immersive, distraction-free shopping terminal.\n\nIdeal for comparing multiple items, reading comprehensive sizing tables, and viewing rich multimedia recommendations comfortably.',
      side: 'left',
      align: 'start',
    },
  },
  {
    element: () => (getPerfoxCloseBtn() || getPerfoxHeader() || getPerfoxChatWindow()) as Element,
    popover: {
      title: '✕ Discreet Minimize & Session Memory',
      description:
        'Click the close icon (✕) anytime to collapse the chat back into the floating bubble.\n\nYour active consultation, product recommendations, and cart advice remain safely preserved in memory so you can resume browsing seamlessly.',
      side: 'left',
      align: 'start',
    },
  },
  {
    element: () => (getPerfoxInput() || getPerfoxChatWindow()) as Element,
    popover: {
      title: '✍️ Natural Language Shopping Input',
      description:
        'Shoppers can converse naturally as if talking to an in-store personal stylist. Try asking:\n• "Do you have size L in Navy Blue?"\n• "Which linen shirts are currently in stock?"\n• "What is your return & exchange policy?"',
      side: 'left',
      align: 'end',
    },
  },
  {
    element: () => (getPerfoxAttachButton() || getPerfoxChatWindow()) as Element,
    popover: {
      title: '📎 Image & File Upload',
      description:
        'Upload reference outfit photos, screenshots, or style inspiration files (images, PDFs, documents).\n\nPerfox uses visual AI matching to cross-reference your reference images against store catalog inventory to find exact or similar pieces instantly.',
      side: 'left',
      align: 'end',
    },
  },
  {
    element: () => (getPerfoxVoiceBtn() || getPerfoxChatWindow()) as Element,
    popover: {
      title: '🎙️ Hands-Free Voice Dictation',
      description:
        'Equipped with live speech-to-text recognition.\n\nShoppers can tap the microphone button and speak their queries hands-free for fast, effortless mobile shopping without needing to type.',
      side: 'left',
      align: 'end',
    },
  },
  {
    element: () => (getPerfoxSendButton() || getPerfoxChatWindow()) as Element,
    popover: {
      title: '🚀 Sub-Second AI Dispatch',
      description:
        'Click the send arrow (✈️) or press Enter to receive instant, tailored responses.\n\nPerfox analyzes customer intent, checks backend inventory, and returns personalized recommendations with direct product links.',
      side: 'left',
      align: 'end',
    },
  },
];

/**
 * Initializes and starts the dedicated Perfox Chatbot tour using Driver.js.
 * Automatically opens the official Perfox widget and steps through its components.
 */
export function startChatbotTour() {
  openPerfoxWidget(() => {
    setTimeout(() => {
      // Ensure attach button is in place before driver queries elements
      getPerfoxAttachButton();

      const driverObj = driver({
        showProgress: true,
        animate: true,
        smoothScroll: true,
        allowClose: false, // Prevents closing accidentally when clicking overlay background
        overlayColor: '#0b0f19',
        overlayOpacity: 0.74,
        stagePadding: 6,
        stageRadius: 10,
        popoverClass: 'perfox-tour-popover',
        progressText: 'Feature {{current}} of {{total}}',
        nextBtnText: 'Next Feature →',
        prevBtnText: '← Back',
        doneBtnText: 'Start Chatting 💬',
        steps: PERFOX_CHATBOT_TOUR_STEPS,
        onHighlightStarted: (element) => {
          if (element instanceof HTMLElement) {
            applyActiveGlow(element);
          }
        },
        onDeselected: () => {
          removeActiveGlow();
        },
        onDestroyed: () => {
          removeActiveGlow();
        },
      });

      driverObj.drive();
    }, 250);
  });
}

// Expose on window for easy access
if (typeof window !== 'undefined') {
  (window as any).startPerfoxBotTour = startChatbotTour;
}
