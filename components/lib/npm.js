'use client'

import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery, useMutation } from "@tanstack/react-query";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Toaster, toast } from 'sonner';
import Cookies from "universal-cookie";
import CryptoJS from "crypto-js";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession } from "next-auth/react";


export {
    // react-hook-form
    useForm,
    FormProvider,
    useFormContext,
    getSession,

    // React-Query 
    QueryClient,
    QueryClientProvider,
    useQuery,
    useMutation,

    // Axios 
    axios,

    // toaster
    Toaster,
    toast,

    // Universal Cookie
    Cookies,

    // CryptoJS 
    CryptoJS,

    //Zod
    z,
    zodResolver,
}