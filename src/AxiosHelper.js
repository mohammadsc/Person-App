import Cookies from "js-cookie";
const axios = require('axios');

const { toast } = require('react-toastify');


const httpGet =  (url, then  )=>{

    let token = Cookies.get('token')

    axios.get(url , {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(then).catch(error => {
        if(error.response.status == 403){
          toast.error("سطح دسترسی شما محدود است!.", {
              position: "bottom-right",
              closeButton: true,
              closeOnClick: true
          });

        }
      console.log(error.response)
   })
}


export default httpGet;
