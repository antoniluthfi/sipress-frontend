import useAuthStore from '@/store/useAuthStore';
import ForbiddenLayout from './forbidden-layout';

export default function ProtectedPage({children}) {
  const {user} = useAuthStore();

  if (user?.role === "admin") {
    return children;
  }

  return <ForbiddenLayout />;
}
