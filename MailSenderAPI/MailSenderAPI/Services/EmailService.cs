using MailKit.Net.Smtp;
using MimeKit;
using MailSenderAPI.Models;
using Microsoft.Extensions.Options;

namespace MailSenderAPI.Services
{
    public class EmailService
    {
        private readonly EmailSettings _emailSettings;

        public EmailService(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }

        public async Task SendEmailAsync(EmailRequest request)
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(_emailSettings.SenderName, request.From));
            email.Subject = request.Subject;

            foreach (var to in request.To)
            {
                email.To.Add(new MailboxAddress(to, to));
            }

            if (request.Cc != null)
            {
                foreach (var cc in request.Cc)
                {
                    email.Cc.Add(new MailboxAddress(cc, cc));
                }
            }

            if (request.Bcc != null)
            {
                foreach (var bcc in request.Bcc)
                {
                    email.Bcc.Add(new MailboxAddress(bcc, bcc));
                }
            }

            var builder = new BodyBuilder
            {
                HtmlBody = request.Body
            };

            email.Body = builder.ToMessageBody();

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(_emailSettings.SMTPServer, _emailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_emailSettings.SenderEmail, _emailSettings.Password);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }
    }
}
