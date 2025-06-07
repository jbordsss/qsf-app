import AWS from "aws-sdk"

export async function uploadImageToS3(buffer: Buffer, filename: string): Promise<string> {
  const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  })

  const bucket = process.env.AWS_S3_BUCKET_NAME!
  const key = `articles/${filename}`

  await s3
    .putObject({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: "image/png",
      ACL: "public-read",
    })
    .promise()

  return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
}
