import nodemailer from 'nodemailer'

export default function sentRejection(email,message,complaint){
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
              subject: "onmyWay Complaint Message",
              html: `
              <h1>We got a complaint that '${complaint}' </h1>
              <h2>So this is the final warning or we will take action</h2>
              <h3>${message}</h3>
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
