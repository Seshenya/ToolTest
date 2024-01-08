export const getFormattedDate = (date) => {
    if (date) {
        return new Date(date).toLocaleString('de-DE', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });
    }
    return null

}

export const statusTypes = {
    1: {
        value: 1,
        color: 'warning',
        label: 'Pending'
    },
    2: {
        value: 2,
        labe: 'Changes Needed',
        color: 'info'
    },
    3: {
        value: 3,
        label: 'Approved',
        color: 'success'
    },
    4: {
        value: 4,
        label: 'Rejected',
        color: 'error'
    },
    5: {
        value: 5,
        label: 'Banned',
        color: 'error'
    },
}

export const getStatus = (status) => {

    return statusTypes?.[status] || { value: 'error', color: 'error' }

}

export const getExtensionFromUrl = (url) => {
    const match = url.match(/\.([a-zA-Z0-9]+)(\?.*)?$/);
    return match ? match[1] : null;
};

export const generateKey = () => {
    return `${new Date().getTime()}`;
}