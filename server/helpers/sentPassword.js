import nodemailer from 'nodemailer'

export default function sentPassword(email, password){
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
              subject: "onMyWay Guide Temp Password",
              html: `
              <h1>Login with this password </h1>
              <h2>now you can login</h2>
                <h3>use this password to login , and you can also change it</h3>
                <h2>${password}</h2>
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
