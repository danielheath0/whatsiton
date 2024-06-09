const LogoutButton = ({ onLogout }: { onLogout: () => void }) => {
  return <button onClick={onLogout}>Logout</button>;
};
export default LogoutButton;
