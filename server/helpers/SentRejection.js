import nodemailer from 'nodemailer'

export default function sentRejection(email,message){
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
              subject: "onmyWay Guide Rejection Message",
              html: `
              <h1>Sorry</h1>
              <h2>Your registration is rejected</h2>
              <h3>Reason : ${message}</h3>
                <h2>have a nice day</h2>
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
