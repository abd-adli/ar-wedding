/**
 * Helper to submit payload to Google Apps Script using a hidden <iframe> form submission.
 * This completely bypasses browser CORS restrictions, prevents fetch 404/TypeError exceptions,
 * and allows background delivery to Google Sheets & Google Drive.
 */
export function sendViaHiddenIframe(url: string, payload: Record<string, unknown>): void {
  try {
    if (typeof document === 'undefined') return;

    const iframeId = 'gas_hidden_iframe';
    let iframe = document.getElementById(iframeId) as HTMLIFrameElement | null;
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = iframeId;
      iframe.name = iframeId;
      iframe.style.display = 'none';
      iframe.style.position = 'fixed';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      iframe.setAttribute('aria-hidden', 'true');
      document.body.appendChild(iframe);
    }

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;
    form.target = iframeId;
    form.style.display = 'none';

    // 1. Full JSON payload in 'data' field (for doPost scripts using JSON.parse(e.parameter.data))
    const dataInput = document.createElement('textarea');
    dataInput.name = 'data';
    dataInput.value = JSON.stringify(payload);
    form.appendChild(dataInput);

    // 2. Individual fields (for doPost scripts reading e.parameter.type, e.parameter.name, etc.)
    for (const [key, val] of Object.entries(payload)) {
      if (typeof val === 'string' || typeof val === 'number') {
        const field = document.createElement('input');
        field.type = 'hidden';
        field.name = key;
        field.value = String(val);
        form.appendChild(field);
      }
    }

    document.body.appendChild(form);
    form.submit();

    // Clean up temporary form element
    setTimeout(() => {
      try {
        if (form.parentNode) {
          form.parentNode.removeChild(form);
        }
      } catch {}
    }, 1500);
  } catch (err) {
    console.warn('[GoogleScript Sync] Hidden iframe form submit warning:', err);
  }
}
