import axios from 'axios';


export const gitHubUsecase = (dependencies) => {
  const {config} = dependencies
  const executeFunction = async (code , layout) => {


    try {
    
      const params = new URLSearchParams({
        client_id: layout === "login" ?config.GIT_HUB_CLIENT_ID_LOG :config.GIT_HUB_CLIENT_ID,
        client_secret	:layout === "login" ? config.GIT_HUB_CLIENT_SECRET_LOG : config.GIT_HUB_CLIENT_SECRET,
        code: code
      });

      const res = await axios.post(
        "https://github.com/login/oauth/access_token",
        params.toString(),
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    

      return res.data;
    } catch (error) {
      console.error('Error in gitHubUsecase:', error.message);
      throw new Error('Error exchanging code for access token');
    }
  };

  return { executeFunction };
};
