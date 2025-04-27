
const checkAppEnv = () => {
  return import.meta.env.MODE || "development";
};

const getApiUrl = () => {
  return import.meta.env.VITE_API_BASE_URL || "http://localhost";
};

const getApiPort = () => {
  return import.meta.env.VITE_API_PORT || 3000;
};

const GLOBAL_CONFIG = {
  API_URL: getApiUrl(),
  API_PORT: getApiPort(),
  APP_ENV: checkAppEnv(),
};

export default GLOBAL_CONFIG;
