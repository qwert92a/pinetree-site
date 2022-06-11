import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

const {
  OAUTH_USER,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN,
} = process.env;

if (
  !OAUTH_USER ||
  !OAUTH_CLIENT_ID ||
  !OAUTH_CLIENT_SECRET ||
  !OAUTH_REFRESH_TOKEN
) {
  throw Error('OAuth 인증에 필요한 환경변수가 없습니다.');
}

async function sendMail(receiverEmail, contents) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.google.com',
    port: 587,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: OAUTH_USER,
      clientId: OAUTH_CLIENT_ID,
      clientSecret: OAUTH_CLIENT_SECRET,
      refreshToken: OAUTH_REFRESH_TOKEN,
    },
  });

  const message = {
    from: OAUTH_USER,
    to: receiverEmail,
    subject: '조경수 문의메일',
    text: `상품번호: ${contents.product.trim()}
    
           닉네임: ${contents.name.trim()}
    
           전화번호: ${contents.phone.trim()}
    
           이메일: ${contents.email.trim()}
    
           문의 제목: ${contents.subject.trim()}
    
           문의 내용: ${contents.message.trim()}`
  };

  try {
    await transporter.sendMail(message);
    console.log('email has been sent successfully.'.yellow.bold);
    return true;
  } catch (e) {
    console.log(`email sending error: ${e}`.red.bold);
    return false;
  }
}

export default sendMail;

// sendMail('brotherplantation@gmail.com');
