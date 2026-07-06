const BASE_URL = "http://localhost:4200";

const skipRefresh = [
    "/login/user",
    "/register/user",
    "/refresh",
    "/isAuth"
];

export async function api(url, options = {}) {
    try {
        let res = await fetch(BASE_URL + url, {
            credentials: "include",
            ...options,
        });

        if (res.status === 401 && !skipRefresh.includes(url)) {
            const refresh = await fetch(BASE_URL + "/refresh", {
                method: "POST",
                credentials: "include",
            });

            if (!refresh.ok) {
                window.location.replace("/login");
                throw new Error("Не авторизован");
            }

            res = await fetch(BASE_URL + url, {
                credentials: "include",
                ...options,
            });
        }

        return res;
    } catch (e) {
        console.error(e.message);
        throw new Error("Не удалось подключиться к серверу");
    }
}