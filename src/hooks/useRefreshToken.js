// import axios from 'axios';
// import { rtRoute } from '../utilities/auth-routes';
// import { useAuth } from './user-context'

// function useRefreshToken() {
//   const auth = useAuth();

//   const refresh = async () => {
//     const response = await axios.post(rtRoute, {
//       withCredentials: true,
//       refreshToken: auth?.values?.user?.refreshToken,
//     });
//     auth.setAuth(prev => {
//       console.log(JSON.stringify(prev));
//       console.log(response.data.token);
//       return {...prev, token: response.data.token}
//     })
//     return response.data.token;
//   }
//   return refresh;
// }

// export default useRefreshToken
