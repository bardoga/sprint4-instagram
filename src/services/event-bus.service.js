function on(eventName, listener) {

    const callListener = ({ detail }) => {
        listener(detail);
    };

    window.addEventListener(eventName, callListener);

    return () => {
        window.removeEventListener(eventName, callListener);
    };
}

function emit(eventName, data) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}

export const eventBusService = { on, emit };

export function showUserMsg(txt, severity = '') {
    eventBusService.emit('show-user-msg', { txt, severity })
}
export function showSuccessMsg(txt) {
    showUserMsg(txt, 'success')
}
export function showErrorMsg(txt) {
    showUserMsg(txt, 'error')
}

export function showWarningMsg(txt) {
    showUserMsg(txt, 'success')
}

export function showInfoMsg(txt) {
    showUserMsg(txt, 'error')
}

window.myBus = eventBusService;
window.showUserMsg = showUserMsg;