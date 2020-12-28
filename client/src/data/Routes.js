export default [
    {
        id: "app_status",
        name: "App status",
        route: "/status",
        component: () => import(/* */"../modules/app_status/pages/Page")
    }
]