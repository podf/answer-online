const getToken = () =>
    localStorage.getItem('token');

const setToken = (name, value) =>
    localStorage.setItem(name, value);

const isLogined = () => getToken() ? true : false;


export { getToken, setToken, isLogined};