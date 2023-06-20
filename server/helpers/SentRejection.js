import nodemailer from 'nodemailer'

export default function sentRejection(email,message){
    return new Promise((resolve, reject)=>{
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: 'onmyway748@gmail.com',
              pass: 'hzbaitdnhtinozef',
            },
          });
      
            var mailOptions={
              from: 'onmyway748@gmail.com',
              to: email,
              subject: "onmyWay Guide Rejection Message",
              html: `
              <h1>Sorry</h1>
              <h2>Your registration is rejected</h2>
              <h5>Reason:</h5>
                <h2>${message}</h2>
                <h2>have a nice day</h2>
              `,
            }
        
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log("error", error, info)
                reject(error)

              } else {
                console.log("sent")
                resolve({success:true, message:"Email sent successfull"})
              }
            });
    })
}
