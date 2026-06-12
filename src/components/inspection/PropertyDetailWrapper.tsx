'use client';

import { useState } from 'react';
import { InspectionRequestModal } from './InspectionRequestModal';

interface InspectionButtonProps {
  propertyTitle: string;
  propertyType: 'terrain' | 'home';
  className?: string;
}

export function InspectionButton({ propertyTitle, propertyType, className = '' }: InspectionButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`w-full bg-vor-navy text-white py-3 rounded-lg font-semibold hover:bg-vor-navy-light transition-colors ${className}`}
      >
        {propertyType === 'terrain' ? 'Request inspection' : 'Schedule viewing'}
      </button>
      <InspectionRequestModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        propertyTitle={propertyTitle}
        propertyType={propertyType}
      />
    </>
  );
}
