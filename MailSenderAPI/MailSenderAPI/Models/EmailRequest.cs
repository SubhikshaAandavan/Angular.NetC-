using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MailSenderAPI.Models
{
    public class EmailRequest
    {
        [Required]
        public required string From { get; set; }

        [Required]
        public required List<string> To { get; set; }

        public List<string>? Cc { get; set; }
        public List<string>? Bcc { get; set; }

        [Required]
        public required string Subject { get; set; }

        public required string Body { get; set; }
    }
}
