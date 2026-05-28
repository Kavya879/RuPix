// React Hooks are simple functions in React that let you use features like
//  state and lifecycle in functional components—without needing classes.

//The useConvexQuery.js file defines a custom React hook called useConvexQuery. It:
// Fetches data from a Convex backend using a query.
// Tracks loading and error states.
// Shows an error message if something goes wrong.
// Returns the data, loading, and error status for use in your components.
// It helps you easily get and manage data from Convex in your React app.


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

