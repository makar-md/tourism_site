const BASE_URL = "http://localhost:4200";

export async function api(url, options = {}) {
    let res = await fetch(BASE_URL + url, {
        credentials: "include",
        ...options,
    });

    if (res.status === 401) {
        const refresh = await fetch(BASE_URL + "/refresh", {
            method: "POST",
            credentials: "include",
        });

        if (!refresh.ok) {
            window.location.href = "/login";
            return;
        }

        res = await fetch(BASE_URL + url, {
            credentials: "include",
            ...options,
        });
    }

    return res;
}