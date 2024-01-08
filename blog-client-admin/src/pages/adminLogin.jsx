export default function AdminLogin() {
    return (
        <>
            <form method="post" id="adminLoginForm">
                <h2>Admin Login Form</h2>
                <label for="username">
                    <input type="text" name="username" id="username" />
                </label>
            </form>
        </>
    )
}