import Cookies from "js-cookie";

export const getUser = () => {
    const user = Cookies.get('user_info');
    if(user)
        return JSON.parse(user);
    console.log('NO COOKIES!');
    return {};
}

export const logout = async (event: any) => {
    event.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include",
    });

}