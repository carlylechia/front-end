// import { Outlet } from "react-router-dom";
// import { useState, useEffect } from "react";
// import useRefreshToken from '../hooks/useRefreshToken';
// import { useAuth } from '../hooks/user-context';

// const PersistLogin = () => {
//     const [isLoading, setIsLoading] = useState(true);
//     const refresh = useRefreshToken();
//     const auth = useAuth();

//     useEffect(() => {
//         let isMounted = true;

//         const verifyRefreshToken = async () => {
//             try {
//                 await refresh();
//             }
//             catch (err) {
//                 console.error(err);
//             }
//             finally {
//                 isMounted && setIsLoading(false);
//             }
//         }

//         !auth?.values?.user?.token  ? verifyRefreshToken() : setIsLoading(false);

//         return () => isMounted = false;
//     }, [auth?.values?.user?.token, refresh])

//     useEffect(() => {
//         console.log(`isLoading: ${isLoading}`)
//         console.log(`aT: ${JSON.stringify(auth?.values?.user?.token)}`)
//     }, [auth?.values?.user?.token, isLoading])

//     return (
//         <>
//             {isLoading
//               ? <p>Loading...</p>
//               : <Outlet />
//             }
//         </>
//     )
// }

// export default PersistLogin
