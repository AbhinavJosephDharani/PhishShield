export const phishingScenarios = {
  easy: [
    {
      id: 'easy-1',
      title: 'Suspicious Bank Email',
      subject: 'Urgent: Your Account Security',
      sender: {
        name: 'SecureBank Customer Service',
        email: 'secure-bank-support@securebank.net.co'
      },
      content: `Dear Valued Customer,

We have detected unusual activity in your account. Your account will be suspended in 24 hours if you don't verify your information immediately.

Click here to verify your account: http://secure-bank.net.co/verify

Best regards,
SecureBank Team`,
      links: [
        { text: 'Click here to verify', url: 'http://secure-bank.net.co/verify' }
      ],
      attachments: [],
      indicators: [
        'Urgent/threatening language',
        'Generic greeting',
        'Suspicious sender address',
        'Suspicious link: Click here to verify'
      ],
      learningPoints: [
        'Phishers often create urgency to make you act without thinking',
        'Legitimate banks use your name, not "Valued Customer"',
        'The email domain uses .co which is suspicious for a bank',
        'Hover over links to see the actual URL before clicking'
      ],
      tips: [
        'Banks never ask for verification through email links',
        'Always go directly to your bank\'s website by typing the URL',
        'Check for personalization in the greeting',
        'Be wary of urgent deadlines in emails'
      ]
    }
  ],
  moderate: [
    {
      id: 'moderate-1',
      title: 'Business Email Compromise',
      subject: 'Re: Invoice Payment Update',
      sender: {
        name: 'Jennifer Parker',
        email: 'j.parker@acme-corp-international.com'
      },
      content: `Hi Team,

Due to some recent changes in our payment system, please process the attached invoice using the new wire transfer details.

This payment is urgent as we need to meet month-end closing requirements. Please confirm once processed.

Thanks,
Jennifer Parker
Financial Controller
Acme Corporation`,
      links: [],
      attachments: [
        { name: 'Invoice_ACM_2024_03.pdf.exe', size: '245 KB' }
      ],
      indicators: [
        'Suspicious attachment: Invoice_ACM_2024_03.pdf.exe',
        'Urgent/threatening language',
        'Request for sensitive information',
        'Unusual requests'
      ],
      learningPoints: [
        'Executable files disguised as PDFs are a major red flag',
        'Financial pressure is a common social engineering tactic',
        'Changes to payment systems should be verified through official channels',
        'Business email compromise often targets finance departments'
      ],
      tips: [
        'Always verify payment change requests through a second channel',
        'Check file extensions carefully - .exe files are never legitimate invoices',
        'Contact the sender through a known phone number to verify unusual requests',
        'Be extra cautious with financial transactions'
      ]
    }
  ],
  hard: [
    {
      id: 'hard-1',
      title: 'Advanced Spear Phishing',
      subject: 'Meeting Notes - Q1 Strategy Review',
      sender: {
        name: 'Alex Thompson',
        email: 'a.thompson@company-global.com'
      },
      content: `Hey [User's Name],

Great discussion in yesterday's strategy meeting. I've attached the meeting notes and action items we discussed. Please review and let me know if I missed anything.

Also, could you quickly verify your Salesforce login? We're updating permissions for the new project: https://salesforce.company-global.com.auth-verify.net

Best,
Alex

Alex Thompson
VP of Sales
Direct: +1 (555) 123-4567`,
      links: [
        { text: 'https://salesforce.company-global.com.auth-verify.net', url: 'https://salesforce.company-global.com.auth-verify.net' }
      ],
      attachments: [
        { name: 'Q1_Strategy_Notes.docx', size: '128 KB' }
      ],
      indicators: [
        'Suspicious link: https://salesforce.company-global.com.auth-verify.net',
        'Request for sensitive information',
        'Suspicious sender address',
        'Unusual requests'
      ],
      learningPoints: [
        'The domain auth-verify.net is suspicious and not related to Salesforce',
        'The email combines legitimate business context with an unusual request',
        'The sender address mimics internal format but is slightly different',
        'The request for credential verification is unexpected and out of context'
      ],
      tips: [
        'Always check the full URL - legitimate companies use their own domains',
        'Be suspicious of credential verification requests, even in business context',
        'Verify unexpected requests through other communication channels',
        'Check sender details carefully - subtle differences can indicate phishing'
      ]
    }
  ]
};

export const difficultyDescriptions = {
  easy: {
    title: 'Beginner',
    description: 'Learn to identify common phishing attempts with obvious indicators',
    requirements: 'No previous experience required',
    focus: ['Basic email analysis', 'Common phishing indicators', 'Simple security practices']
  },
  moderate: {
    title: 'Intermediate',
    description: 'Practice identifying more sophisticated phishing attempts',
    requirements: 'Basic understanding of email security',
    focus: ['Business email compromise', 'Social engineering tactics', 'File attachment analysis']
  },
  hard: {
    title: 'Advanced',
    description: 'Master complex phishing scenarios and targeted attacks',
    requirements: 'Strong foundation in email security',
    focus: ['Spear phishing', 'Advanced social engineering', 'Multi-vector attacks']
  }
}; 