// Function to store user information in localStorage
export const persistLocalStorage = <T,>(key: string, userInfo: T) => {
  localStorage.setItem(key, JSON.stringify(userInfo));
};

// Function to remove user information from localStorage
export const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
