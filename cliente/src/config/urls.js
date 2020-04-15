let REQUEST_URL = "https://foodify.com.br:8000";
if(process.env.NODE_ENV==="development"){
  REQUEST_URL = "http://localhost:8000";
}
export {REQUEST_URL};
