


const ApiRequest = async (API_URL=null,optionObj=null ,errMsg=null) =>{

                try{
                    const response =await fetch(API_URL,optionObj);
                    if(!response.ok)  throw Error("url not get the data")
                }
                catch(err){
                        errMsg=err.Message;
                }
                finally{
                            return errMsg;
                }
}

export default ApiRequest;