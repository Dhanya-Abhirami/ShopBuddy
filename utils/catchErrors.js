function catchErrors(error,displayError){
    let errorMsg;
    if (error.response){
        // request was made and server responded with status code not in 2XX
        errorMsg = error.response.data;
        console.error('Error response',errorMsg)
        // For Cloudinary image uploads
        if (error.response.data.error){
            errorMsg = error.response.data.error.message;
        }
    }
    else if (error.request){
        // request was made but no response was received
        errorMsg = error.request;
        console.error('Error request',errorMsg)
    }
    else{
        // something else happened in making the request that triggered an error
        errorMsg = error.message;
        console.error('Error message',errorMsg)
    }
    displayError(errorMsg); // callback
}

export default catchErrors;