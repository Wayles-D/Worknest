// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router";

// export function PublicRoutes({ children, accessToken, user }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isAdminAuth = location.pathname.startsWith("/auth/admin");
//   const fallbackFrom = user?.role === "admin" || isAdminAuth ? "/admin" : "/";
//   const stateFrom = location.state?.from;
//   const from = isAdminAuth
//     ? "/admin"
//     : typeof stateFrom === "string"
//       ? stateFrom
//       : stateFrom?.pathname || fallbackFrom;

//   useEffect(() => {
//     if (accessToken && user && !user?.isVerified) {
//       navigate("/auth/verify", { replace: true });
//       return;
//     }

//     if (accessToken && user) {
//       navigate(from, {
//         state: { from: location },
//         replace: true,
//       });
//     }
//   }, [accessToken, from, location, navigate, user]);
//   return children;
// }

// export function PrivateRoutes({
//   children,
//   accessToken,
//   isAuthenticating,
//   user,
// }) {
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthenticating) return;
//     if (!accessToken) {
//       const loginPath = location.pathname.startsWith("/admin")
//         ? "/auth/admin/login"
//         : "/auth/login";
//       navigate(loginPath, {
//         state: { from: location },
//         replace: true,
//       });
//       return;
//     }
//     if (user && !user.isVerified && location.pathname !== "/auth/verify") {
//       navigate("/auth/verify", { replace: true });
//     }
//   }, [accessToken, isAuthenticating, location, navigate, user]);
//   return children;
// }
