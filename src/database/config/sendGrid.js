
const sendEmail = (email) =>{

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: {email}, // Change to your recipient
  from: 'g27583@hotmail.com', // Change to your verified sender
  subject: 'Bienvenidos a la API Disney',
  text: "Esta es una prueba de envio de mail",
  html: `<strong>Bienvenido a el challenge Back-End Node de Alkemy 2022 tu usuario es ${email} </strong>`,
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })

}
module.exports = sendEmail
