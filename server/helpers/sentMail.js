import nodemailer from 'nodemailer'

export default function sentMail(email){
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
              subject: "onmyWay",
              html: `
              <h1>Congratulations</h1>
              <h2>Your registration is accepted</h2>
                <h2>now you can login into your guide account</h2>
                <h2>have a nice day</h2>
              `,
            }
        
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log("error", error, info)
                reject(error)

              } else {
                resolve({success:true, message:"Email sent successfull"})
              }
            });
    })
}
