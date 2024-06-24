import ChangePassword from "../Pages/ChangePassword";
import Home from "../Pages/Home";
import MyProfile from "../Pages/MyProfile";
import EditProfile from "../Pages/EditProfile";
import Lesson from "../Pages/Lesson";
import AddQuiz from "../Pages/AddQuiz";


export const pageRoutes = {
    login: '/login',
    signup: '/signup',
    forgotPassword: '/forgot-password',
    home: '/',
    myprofile: '/profile',
    editProfile: '/edit-profile',
    changePassword: '/change-password',
    lesson: '/lesson',
    add_quiz: '/add-quiz',
};

export const AllRoutes = [
    {
        name: 'Home',
        path: '/',
        element: <Home />,
        isPrivate: true
    },
    {
        name: 'MyProfile',
        path: '/profile',
        element: <MyProfile />,
        isPrivate: true
    },
    {
        name: 'EditProfile',
        path: '/edit-profile',
        element: <EditProfile />,
        isPrivate: true
    },
    {
        name: 'ChangePassword',
        path: '/change-password',
        element: <ChangePassword />,
        isPrivate: true
    },
    {
        name: 'Lesson',
        path: '/lesson',
        element: <Lesson />,
        isPrivate: true
    },
    {
        name: 'Add_Quiz',
        path: '/add-quiz',
        element: <AddQuiz />,
        isPrivate: true
    },
]
