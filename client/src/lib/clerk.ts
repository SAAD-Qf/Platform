import { useUser as useClerkUser, useAuth } from "@clerk/clerk-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "./queryClient";

export function useUser() {
  const { user: clerkUser, isLoaded } = useClerkUser();
  const { getToken } = useAuth();
  
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/users/clerk", clerkUser?.id],
    enabled: !!clerkUser?.id && isLoaded,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const createUserMutation = useMutation({
    mutationFn: async (userData: any) => {
      const response = await apiRequest("POST", "/api/users", userData);
      return response.json();
    },
  });

  // Create user in our database when they first sign up
  if (clerkUser && isLoaded && !user && !isLoading && !createUserMutation.isPending) {
    createUserMutation.mutate({
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
    });
  }

  return {
    user: user || createUserMutation.data,
    clerkUser,
    isLoading: isLoading || createUserMutation.isPending,
    isSignedIn: !!clerkUser,
    getToken,
  };
}

export { useAuth, SignInButton, SignUpButton, SignOutButton, UserButton } from "@clerk/clerk-react";
