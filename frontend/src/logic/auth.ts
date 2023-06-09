import Cookies from "js-cookie";

export const getUser = () => {
    const user = Cookies.get('user_info');
    if(user)
        return JSON.parse(user);
    console.log('NO COOKIES!');
    return {};
}

export const logout = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include",
    });
}

export const forgotPassword = async (email: string) => {
    console.log(email);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch("http://localhost:5000/auth/password/forgot", {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include",
        body: JSON.stringify({ email: email }),
    });
    return response.status;
};

export const resetPassword = async (resetId: string, newPassword: string) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch("http://localhost:5000/auth/password/reset", {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include",
        body: JSON.stringify({ tempId: resetId, newPassword: newPassword }),
    });
    console.log(response);
    return response.status;
};

export const isUserLoggedIn = () => {
    const user = getUser();
    return !!user && Object.keys(user).length > 0;
}
