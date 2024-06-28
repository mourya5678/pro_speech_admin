import ChangePassword from "../Pages/ChangePassword";
import Home from "../Pages/Home";
import MyProfile from "../Pages/MyProfile";
import EditProfile from "../Pages/EditProfile";
import Lesson from "../Pages/Lesson";
import AddQuiz from "../Pages/AddQuiz";
import AddLessonDetail from "../Pages/AddLessonDetail";
import UserDetails from "../Pages/UserDetails";
import EditUserProfile from "../Pages/EditUserProfile";
import SectionDetails from "../Pages/SectionDetails";
import EditSection from "../Pages/EditSection";
import AddNewSection from "../Pages/AddNewSection";


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
    user_details: "/user-detail",
    edit_user_profile: "/user-edit-profile",
    add_section: "/add-section",
    section_detail: "/section-detail",
    edit_section: "/edit-section",
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
    {
        name: 'User_Details',
        path: '/user-detail',
        element: <UserDetails />,
        isPrivate: true
    },
    {
        name: 'User_Profile_Edit',
        path: '/user-edit-profile',
        element: <EditUserProfile />,
        isPrivate: true
    },
    {
        name: 'Section_Detail',
        path: '/section-detail',
        element: <SectionDetails />,
        isPrivate: true
    },
    {
        name: 'Add_Section',
        path: '/add-section',
        element: <AddNewSection />,
        isPrivate: true
    },
    {
        name: 'Edit_Section',
        path: '/edit-section',
        element: <EditSection />,
        isPrivate: true
    },
]
