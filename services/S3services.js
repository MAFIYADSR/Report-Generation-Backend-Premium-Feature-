const AWS = require('aws-sdk')

const uploadToS3= (data, filename) =>
{
    const BUCKET_NAME = 'expensetrackingapp23';


    let s3bucket = new AWS.S3({
        accessKeyId:  process.env.IAM_USER_KEY,
        secretAccessKey: process.env.IAM_USER_SECRET
        // Bucket: BUCKET_NAME
    })

        var params = {
            Bucket: BUCKET_NAME,
            Key: filename,
            Body: data,
            ACL: 'public-read'
        }

        return new Promise((resolve, reject) => {
            s3bucket.upload(params, (err, s3response) => {
                if(err){
                    console.log('Something went wrong', err)
                    reject(err)
                }
                else{
                    resolve(s3response.Location);
                }
            })
        })
        
}

module.exports = {
    uploadToS3
}