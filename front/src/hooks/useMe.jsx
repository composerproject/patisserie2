import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeloggedIn } from "../store/auth";
import { fetchMe } from "../store/meSlice";

/**
 * HOC ( composant de haut niveau )
 * Hooks permettant de vérifier si après rechargement de la page l'utilisateur est encore connecté
 * - la méthode fetchMe fait une requête sur l'API avec le credentials si celui-ci existe ( cookie créé dans le navigateur), alors la connexion n'échoue pas et on met à true loggeIn
 *
 */
const useMe = () => {
  const { user } = useSelector((s) => s.me);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe);
  }, [dispatch]);

  // useEffect(() =>{
  //     if( Object.keys(user || {}).length > 0)
  //         dispatch(changeloggedIn(true))
  // }, [user])

  return {
    user,
  };
};

export default useMe;

// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";

// // import { clearUserData, fetchMe } from "../store/me";

// import { changeloggedIn } from "../store/auth";
// import { clearUserData, fetchMe } from "../store/meSlice";

// const useMe = () => {
//     // return "use me !";
//     // const { user, status } = useSelector((s) => s.me);
//     const {user, status} = useSelector(state => state.me);
//     console.log("user ME : ");
//     console.log(user);
//     console.log("status : ");
//     console.log(status);
//     const {isLoggedIn, status:authStatus} = useSelector(state => state.auth);
//     console.log("isLoggedIn : ");
//     console.log(isLoggedIn);
//     console.log("auth status : ");
//     console.log(authStatus);

//     const dispatch = useDispatch();

//     useEffect(() => {
//         // console.log("EFFETS SPECIAUX très spéciaux ^^!");
//         dispatch(fetchMe());
//     }, [dispatch])

//     // useEffect(() => {
//         //     dispatch(fetchMe());
//         // }, []);

//     useEffect(() => {
//         if (status === 'succeeded' && Object.keys(user).length > 0) {
//                 dispatch(changeloggedIn(true));
//                 // console.log('EFFECT : success')
//             } else if (status === 'failed') {
//                 console.log('EFFECT : failed')
//                     dispatch(clearUserData());
//                     dispatch(changeloggedIn(false));
//                 }
//             }, [user, status, dispatch]);

//             return { user, status };
//     // return "return";
// };

// export default useMe;
