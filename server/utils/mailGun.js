const mailgun = require("mailgun-js");
require("dotenv").config();

const mg = mailgun({
	apiKey: process.env.MAILGUN_API,
	domain: "sandbox3514eb32043e45da840c39c649a98a2a.mailgun.org",
});

// const data = {
// 	from: 'Excited User <no-reply@gmail.com>',
// 	to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
// 	subject: 'Hello',
// 	text: 'Testing some Mailgun awesomness!'
// };
// mg.messages().send(data, function (error, body) {
// 	console.log(body);
// });

module.exports = mg;
