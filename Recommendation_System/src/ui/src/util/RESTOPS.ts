
const postData = async <T>(
    url: string,
    reqBody: Record<string, any> | FormData
): Promise<T> => {
    const data = localStorage.getItem('auth');
    // Retrieve token (ensure `data` is defined elsewhere in your code)
    const token = data ? JSON.parse(data).accessToken : null;

    // Define headers and body
    const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
    };
    let body: string | FormData | null = null;

    if (reqBody instanceof FormData) {
        body = reqBody; // FormData does not need Content-Type
    } else {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(reqBody);
    }

    // Make the POST request
    const response = await fetch(url, {
        method: 'POST',
        headers,
        body,
    });

    if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const result: T = await response.json();
    return result;
};


const getData = async <T>(url: string): Promise<T> => {
    const data = localStorage.getItem('auth');

    // Retrieve token (ensure `data` is defined elsewhere in your code)
    const token = data ? JSON.parse(data).accessToken : null;

    // Make the GET request
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const result: T = await response.json();
    return result;
};


const updateData = async <T>(
    url: string,
    reqBody: Record<string, any>,
): Promise<T> => {
    const data = localStorage.getItem('auth');

    // Retrieve token (ensure `data` is defined elsewhere in your code)
    const token = data ? JSON.parse(data).accessToken : null;

    // Make the PATCH request
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const result: T = await response.json();
    return result;
};
const deleteData = async <T>(
    url: string,
    reqBody: Record<string, any>
): Promise<T> => {

    const data = localStorage.getItem('auth');

    // Retrieve token (ensure `data` is defined elsewhere in your code)
    const token = data ? JSON.parse(data).accessToken : null;

    // Make the DELETE request
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const result: T = await response.json();
    return result;
};


export { postData, getData, updateData,deleteData }