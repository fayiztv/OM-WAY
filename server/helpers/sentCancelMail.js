import nodemailer from 'nodemailer'

export default function sentCancelMail(email){
    return new Promise((resolve, reject)=>{
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD,
            },
          });
      
            var mailOptions={
              from: process.env.EMAIL,
              to: email,
              subject: "onmyWay Cancellation Message",
              html: `
              <h1>it seems you have cancelled your booking </h1>
              <h2>so for you payment refund please contact this number '9865234845'</h2>
              <h3>keep booking</h3>
              `,
            }
        
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                reject(error)

              } else {
                resolve({success:true, message:"Email sent successfull"})
              }
            });
    })
}
