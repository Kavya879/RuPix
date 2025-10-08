import { useAuth } from "@clerk/clerk-react"

// useAuth() is a React Hook (from a library like Clerk, Convex, or Firebase)
// that returns an object containing authentication info.
export const usePlanInfo = ()=>
{
    //“Take only the has property from the object returned by useAuth().”
    const {has} = useAuth();

    //?. means access safely — only if it’s there
    const isPro = has?.({plan:"Pro"}) || false;
    const isFree = !isPro;

    const planAccess = {
    resize: true,
    crop: true,
    adjust: true,
    text: true,

    background: isPro,
    ai_extender: isPro,
    ai_edit: isPro,
  };

  const hasAccess = (tool)=>
  {
    return planAccess[tool] === true;
  }

    // Get restricted tools that user doesn't have access to
  const getRestrictedTools = () => {
    return Object.entries(planAccess)
      .filter(([_, hasAccess]) => !hasAccess)
      .map(([toolId]) => toolId);
  };

  // Check if user has reached project limits
  const canCreateProject = (currentProjectCount) => {
    if (isPro) return true;
    return currentProjectCount < 3; // Free limit
  };

  // Check if user has reached export limits
  const canExport = (currentExportsThisMonth) => {
    if (isPro) return true;
    return currentExportsThisMonth < 20;
  };

   return {
    userPlan: isPro ? "pro" : "free_user",
    isPro,
    isFree,
    hasAccess,
    planAccess,
    getRestrictedTools,
    canCreateProject,
    canExport,
  };
}