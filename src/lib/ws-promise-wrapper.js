function WSPromiseWrapper (ws) {
    return new Promise((resolve, reject) => {
        ws.onopen = resolve;
        ws.onerror = reject;
    });
}

export default WSPromiseWrapper;