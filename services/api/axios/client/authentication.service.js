import axiosClient from "./axiosClient";

export const loginUser = async (request) => {

    const { data } = await axiosClient.post("/admin/login", request);

    return data;
};

export const anotherLoginUser = async (request) => {

    const { data } = await axiosClient.post("/admin/anotherLogin", request);

    return data;
};

export const signUpUser = async (request) => {

    const { data } = await axiosClient.post("/admin/signup", request);

    return data;
};