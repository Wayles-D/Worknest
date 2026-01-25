export const slideShow = [
    {
        id: 1,
        src: "/out.jpg",
        caption: "“WorkNest has completely transformed how we manage employer and employee records. What used to take hours now happens in minutes.”"
    },
    {
        id: 2,
        src: "/in.jpg",
        caption: "“WorkNest is designed to create opportunities and a sane workspace for all tech lifestyle.”"
    }
]

export const headers = (accessToken) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};