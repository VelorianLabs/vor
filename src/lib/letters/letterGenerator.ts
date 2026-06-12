export interface LetterData {
  fullName: string;
  email: string;
  phone: string;
  inspectionDate: string;
  propertyTitle: string;
  propertyType: 'terrain' | 'home';
}

export function generateClientLetter(data: LetterData): string {
  const formattedDate = new Date(data.inspectionDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const requestDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
LETTER OF CONFIRMATION - PROPERTY INSPECTION REQUEST

Date: ${requestDate}
Reference: VOR-REQ-${Date.now()}
Request ID: VOR-${Date.now().toString().slice(-6)}

Dear ${data.fullName},

RE: CONFIRMATION OF INSPECTION REQUEST - PROCESSING IN PROGRESS

We are pleased to confirm that your property inspection request has been successfully received and is presently being processed by VINTAGE OUTLOOK REALTY.

REQUEST DETAILS:

Property: ${data.propertyTitle}
Type: ${data.propertyType === 'terrain' ? 'Land/Terrain' : 'Home & Construct'}
Requested Inspection Date: ${formattedDate}
Request Submitted: ${requestDate}

YOUR CONTACT INFORMATION:
- Name: ${data.fullName}
- Email: ${data.email}
- Phone: ${data.phone}

PROCESSING STATUS:

Your request has been confirmed and is currently under review. You will receive a follow-up email containing:
- Approval status of your inspection request
- Confirmed appointment date and time for the inspection
- Meeting location and contact details for the inspection team
- Any additional requirements or documents needed

IMPORTANT NOTICE:

This letter confirms that you are working directly with VINTAGE OUTLOOK REALTY (VOR). We are the sole and exclusive body authorized to:
1. Connect you with property owners
2. Process all transactions related to this property
3. Collect all commission for Agency and Advertising services
4. Facilitate any negotiations or agreements

You are hereby advised that:
- Any direct dealings with property owners outside of VOR's authorization may invalidate this service agreement
- VOR is your exclusive representative for this property transaction
- All commission payments for Agency and Advertising services must be made to VINTAGE OUTLOOK REALTY
- This ensures you are protected under VOR's service terms and conditions

NEXT STEPS:

1. Await approval email with confirmed inspection details
2. Review and confirm the scheduled appointment
3. Prepare any required documentation for the inspection
4. Contact us if you need to reschedule or have questions

CONTACT INFORMATION:

VINTAGE OUTLOOK REALTY
Email: vorsyd@gmail.com
Phone: +234 903 550 5663
Website: www.vintageoutlookrealty.com

Should you have any questions or require clarification, please do not hesitate to contact us.

Yours faithfully,

VINTAGE OUTLOOK REALTY
Client Services Division

---
This is an automatically generated letter. For verification purposes, please contact VOR directly.
Reference: VOR-REQ-${Date.now()}
`;
}

export function generateVORLetter(data: LetterData): string {
  const formattedDate = new Date(data.inspectionDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const requestDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const requestTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
LETTER OF EXCLUSIVE RIGHT TO AGREEMENT

Date: ${requestDate}
Time: ${requestTime}
Reference: VOR-ERA-${Date.now()}
Request ID: VOR-${Date.now().toString().slice(-6)}
Internal Use Only

TO: VINTAGE OUTLOOK REALTY - ADMINISTRATION
FROM: Client Services Division

RE: EXCLUSIVE RIGHT TO AGREEMENT - INSPECTION REQUEST

CLIENT INFORMATION COLLECTED AND PROCESSED:

Personal Details:
- Full Name: ${data.fullName}
- Email Address: ${data.email}
- Phone Number: ${data.phone}

Property Interest:
- Property: ${data.propertyTitle}
- Type: ${data.propertyType === 'terrain' ? 'Land/Terrain' : 'Home & Construct'}
- Requested Inspection Date: ${formattedDate}

Request Timestamp:
- Date Collected: ${requestDate}
- Time Collected: ${requestTime}
- Request ID: VOR-${Date.now().toString().slice(-6)}

EXCLUSIVE RIGHT TO AGREEMENT:

This letter serves as official confirmation that VINTAGE OUTLOOK REALTY holds the EXCLUSIVE RIGHT TO AGREEMENT for the client named above regarding the property inspection and any subsequent transaction.

AGREEMENT TERMS:

1. VOR is the sole and exclusive agent authorized to represent this client
2. All commission for Agency and Advertising services will be collected by VOR
3. The client is prohibited from direct dealings with property owners outside VOR's authorization
4. Any transaction bypassing VOR will be considered a breach of agreement
5. This agreement is binding from the date of request until transaction completion

CLIENT COMMITMENTS:

The client has agreed to:
- Work exclusively through VINTAGE OUTLOOK REALTY
- Pay all applicable commission fees to VOR
- Not engage with property owners directly
- Follow VOR's inspection and transaction protocols

VOR RESPONSIBILITIES:

VOR commits to:
- Facilitate the property inspection as requested
- Provide professional representation throughout
- Ensure transparent communication
- Protect client interests under all circumstances
- Collect commission as per standard fee structure

PROCESSING STATUS:

Request Status: PENDING APPROVAL
Next Steps: Admin review and scheduling
Expected Response: Within 24-48 hours

ACTION REQUIRED:

1. Review client information and property details
2. Approve or request modification of inspection date
3. Schedule confirmed appointment
4. Send approval email to client with meeting details
5. Update client dashboard with calendar notification
6. Maintain exclusive representation records

COMMISSION TRACKING:

This agreement is tracked under reference VOR-ERA-${Date.now()}. All commission for Agency and Advertising services related to this transaction will be collected by VINTAGE OUTLOOK REALTY.

For internal use only - Do not distribute to external parties.

VINTAGE OUTLOOK REALTY
Administration Division

---
Internal Document - Confidential
Reference: VOR-ERA-${Date.now()}
`;
}
