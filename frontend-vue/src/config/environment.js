const checkProcess = () => {
    if (typeof process !== "undefined") {
     return process.env.NODE_ENV === "production"
    }
    return "development"
   }
   
   const getProcess = () => {
    if (typeof process !== "undefined") {
     return process.env.API_URL
    }
    return "http://localhost"
   }
   const getProcessPort = () => {
    if (typeof process !== "undefined") {
     return process.env.API_PORT
    }
    return 3000
   }
   
   console.log(checkProcess())
   
   const GLOBAL_CONFIG = {
    API_URL: "http://localhost",
    API_PORT: 3000,
    APP_ENV: "development"
  };
  
  export default GLOBAL_CONFIG;
  