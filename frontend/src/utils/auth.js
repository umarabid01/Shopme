export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("shopme_user")) || null;
  } catch {
    return null;
  }
};

export const saveCurrentUser = (user) => {
  if (!user || !user.pf_id || !user.email) {
    throw new Error("Login response did not include user details");
  }
  localStorage.setItem("shopme_user", JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem("shopme_user");
};

export const getCurrentAdmin = () => {
  try {
    return JSON.parse(localStorage.getItem("shopme_admin")) || null;
  } catch {
    return null;
  }
};

export const saveCurrentAdmin = (admin) => {
  if (!admin || !admin.ad_id || !admin.email) {
    throw new Error("Admin login response did not include admin details");
  }
  localStorage.setItem("shopme_admin", JSON.stringify(admin));
};

export const clearCurrentAdmin = () => {
  localStorage.removeItem("shopme_admin");
};