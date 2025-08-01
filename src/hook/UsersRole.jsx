import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading: authLoading } = useAuth();

  const {
    data: role = "user",
    isLoading: queryLoading,
    refetch,
    isError,
  } = useQuery({
    enabled: !authLoading && !!user?.email,
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  const roleLoading = authLoading || queryLoading;



  return { role, roleLoading, refetch, isError };
};

export default useUserRole;
