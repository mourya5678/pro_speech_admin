import ChangePassword from "../Pages/ChangePassword";
import Home from "../Pages/Home";
import MyProfile from "../Pages/MyProfile";
import EditProfile from "../Pages/EditProfile";
import Lesson from "../Pages/Lesson";
import AddQuiz from "../Pages/AddQuiz";
import AddLessonDetail from "../Pages/AddLessonDetail";


export const pageRoutes = {
    login: '/login',
    signup: '/signup',
    forgotPassword: '/forgot-password',
    home: '/',
    myprofile: '/profile',
    editProfile: '/edit-profile',
    changePassword: '/change-password',
    lesson: '/lesson',
    addLessonDetail: '/add-lesson-details',
    add_quiz: '/add-quiz',
    otp_check: '/opt-check',
    new_password: "/new-password",
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
        name: 'Lesson-Details',
        path: '/add-lesson-details',
        element: <AddLessonDetail />,
        isPrivate: true
    },
    {
        name: 'Add_Quiz',
        path: '/add-quiz',
        element: <AddQuiz />,
        isPrivate: true
    },
]
