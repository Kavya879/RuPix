import { useMutation, useQuery } from "convex/react"
import { useEffect, useState } from "react";
import { toast } from "sonner";

//this hook was created with the purpose of fetching data,showing error if any and set loading in order to show spinners or loaders
//...args collects all arguments → into one array called args.
    export const useConvexQuery = (query,...args)=>
    {
        // Go get some data for me and keep it up to date automatically
        const result = useQuery(query, ...args);

        const [data,setData] = useState(undefined);
        const [isLoading,setisLoading] = useState(false);
        const [error,setError] = useState(null);
        
        useEffect(()=>
        {
            if(result === undefined)
                setisLoading(true);
            else
            {
                try {
                    setData(result);
                    setError(null);
                } catch (error) {
                    setError(error);
                    toast.error(error.message);
                }
                finally
                {
                    setisLoading(false);
                }
            }
        },[result]);

          return { data, isLoading, error };

    };



export const useConvexMutation = (mutation)=>
{
    // Go get some data for me and keep it up to date automatically
    const result = useMutation(mutation);

    const [data, setData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const mutate = async(...args)=>
    {
        setIsLoading(true);
        setError(null);

        try {
            const response = await result(...args);
            setData(response);
            return response;
        } catch (error) {
            setError(error.message);
            toast.error(error.message)
            throw error; 
        }
        finally
        {
            setIsLoading(false);
        }
    }
    return { mutate, data, isLoading, error };
};

