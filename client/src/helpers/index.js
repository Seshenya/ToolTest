import { getProductDetails } from "layouts/ProductDetails/services/productDetailsServices.service";
import ReactGa from "react-ga4";

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
    return null;
};

export const statusTypes = {
    1: {
        value: 1,
        color: 'warning',
        label: 'Pending',
    },
    2: {
        value: 2,
        labe: 'Changes Needed',
        color: 'info',
    },
    3: {
        value: 3,
        label: 'Approved',
        color: 'success',
    },
    4: {
        value: 4,
        label: 'Rejected',
        color: 'error',
    },
    5: {
        value: 5,
        label: 'Banned',
        color: 'error',
    },
};

export const getStatus = (status) => {
    return statusTypes?.[status] || { value: 'error', color: 'error' };
};

export const getExtensionFromUrl = (url) => {
    const match = url.match(/\.([a-zA-Z0-9]+)(\?.*)?$/);
    return match ? match[1] : null;
};

export const generateKey = () => {
    return `${new Date().getTime()}`;
};

export const downloadMedia = async (productId, fileName) => {
    const resp = await getProductDetails(productId);
    resp.media.forEach((url, index) => {
        fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
                ReactGa.event({
                    category: 'Download',
                    action: 'Downloaded Media',
                    label: fileName,
                });
                // Create a link element
                const link = document.createElement('a');

                // Create a Blob URL for the file
                const blobUrl = URL.createObjectURL(blob);

                // Set the link attributes
                link.href = blobUrl;
                link.download = fileName;

                // Append the link to the document
                document.body.appendChild(link);

                // Trigger a click on the link to start the download
                link.click();

                // Remove the link from the document
                document.body.removeChild(link);
            })
            .catch((error) => {
                ReactGa.send('exception', {
                    exDescription: 'Error downloading file',
                    exFatal: false,
                })
                ReactGa.exception({
                    description: 'Error downloading file',
                    fatal: false,
                });
                console.error(`Error downloading file ${url}:`, error);
            });
    });
};

export function getDate(timestampString) {
    console.log(timestampString);
    // Convert the timestamp string to a Date object
    var timestamp = new Date(timestampString);

    // Get the components of the date
    var day = timestamp.getDate();
    var month = timestamp.getMonth() + 1; // Note: January is 0
    var year = timestamp.getFullYear() % 100; // Get the last two digits of the year

    // Add leading zeros to day and month if needed
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    // Create the formatted date string
    var formattedDate = day + '/' + month + '/' + year;

    return formattedDate;
}
