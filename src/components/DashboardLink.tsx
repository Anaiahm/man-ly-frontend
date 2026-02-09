function DashboardLink({ userId }: { userId: string }) {
    return (
        <button onClick={() => window.location.href = `/${userId}/dashboard`}>
            Dashboard
        </button>
    );
}

export default DashboardLink;