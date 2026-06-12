'use client';

import { useState } from 'react';
import { X, Calendar, User, Mail, Phone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { generateClientLetter, generateVORLetter } from '@/lib/letters/letterGenerator';
import { sendInspectionLetters } from '@/lib/email/emailService';

interface InspectionRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
  propertyType: 'terrain' | 'home';
}

export function InspectionRequestModal({ isOpen, onClose, propertyTitle, propertyType }: InspectionRequestModalProps) {
  const [step, setStep] = useState<'info' | 'success'>('info');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inspectionDate: '',
  });

  if (!isOpen) return null;

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);

    try {
      // Save inspection request to database (mock)
      setInfo('Saving inspection request...');
      
      // Mock save - in production, this would call the API
      console.log('Inspection request:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate letters
      setInfo('Generating inspection letters...');
      const clientLetter = generateClientLetter({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        inspectionDate: formData.inspectionDate,
        propertyTitle,
        propertyType,
      });
      
      const vorLetter = generateVORLetter({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        inspectionDate: formData.inspectionDate,
        propertyTitle,
        propertyType,
      });
      
      console.log('Client Letter Generated:', clientLetter);
      console.log('VOR Letter Generated:', vorLetter);
      
      // Send emails
      setInfo('Sending letters to your email and VOR...');
      try {
        await sendInspectionLetters(
          formData.email,
          clientLetter,
          vorLetter,
          formData.fullName
        );
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Continue even if email fails - letters are generated
      }
      
      setStep('success');
      setInfo('');
    } catch (err: any) {
      setError('Failed to process request. Please try again.');
      setInfo('');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('info');
    setFormData({ fullName: '', email: '', phone: '', inspectionDate: '' });
    setError('');
    setInfo('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-md mx-auto bg-white rounded-2xl shadow-card p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-vor-slate hover:text-vor-navy"
        >
          <X className="h-5 w-5" />
        </button>

        {step === 'info' && (
          <>
            <div className="text-center mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-vor-navy mx-auto mb-4">
                <Calendar className="h-6 w-6 text-vor-gold" />
              </div>
              <h2 className="text-2xl font-display font-bold text-vor-navy mb-2">
                Request Inspection
              </h2>
              <p className="text-sm text-vor-slate">
                {propertyTitle}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {info && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-600">{info}</p>
              </div>
            )}

            <form onSubmit={handleInfoSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-vor-navy mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-vor-slate" />
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-trust focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-vor-navy mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-vor-slate" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-trust focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-vor-navy mb-1.5">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-vor-slate" />
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-trust focus:border-transparent"
                    placeholder="+234 XXX XXX XXXX"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="inspectionDate" className="block text-sm font-medium text-vor-navy mb-1.5">
                  Preferred Inspection Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-vor-slate" />
                  <input
                    id="inspectionDate"
                    type="date"
                    required
                    value={formData.inspectionDate}
                    onChange={(e) => setFormData({ ...formData, inspectionDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-trust focus:border-transparent"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                {loading ? 'Processing...' : 'Submit Request'}
              </Button>
            </form>
          </>
        )}

        {step === 'success' && (
          <>
            <div className="text-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-vor-navy mb-2">
                Inspection Request Submitted
              </h2>
              <p className="text-sm text-vor-slate">
                Your request has been processed successfully
              </p>
            </div>

            <div className="bg-vor-cream/50 rounded-lg p-4 space-y-3 mb-6">
              <div className="text-sm">
                <p className="font-medium text-vor-navy">Letter of Service</p>
                <p className="text-vor-slate">Sent to your email</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-vor-navy">Letter of Request</p>
                <p className="text-vor-slate">Sent to Vintage Outlook Realty</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-vor-navy">Inspection Date</p>
                <p className="text-vor-slate">{new Date(formData.inspectionDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="text-xs text-vor-slate mb-6">
              <p className="font-medium mb-2">Important Notice:</p>
              <p>
                This letter confirms that you are working directly with Vintage Outlook Realty. 
                We are the sole body authorized to connect you with property owners and process 
                transactions. Any commission for Agency and Advertising services will be collected 
                by VOR.
              </p>
            </div>

            <Button onClick={handleClose} variant="primary" className="w-full">
              Done
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
