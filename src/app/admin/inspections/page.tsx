'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, X, Mail, Phone, MapPin, Bell } from 'lucide-react';

export default function AdminInspectionsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const response = await fetch('/api/inspection-requests');
      const data = await response.json();
      setRequests(data || []);
    } catch (error) {
      console.error('Error loading requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (request: any) => {
    setSelectedRequest(request);
    setScheduledDate(request.inspectionDate);
    setNotes('');
    setShowModal(true);
  };

  const handleReject = async (id: string) => {
    try {
      await fetch(`/api/inspection-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' })
      });
      loadRequests();
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const handleSchedule = async () => {
    try {
      await fetch(`/api/inspection-requests/${selectedRequest.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'scheduled',
          scheduledDate: scheduledDate,
          notes,
        })
      });

      setShowModal(false);
      loadRequests();
    } catch (error) {
      console.error('Error scheduling inspection:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'approved': return 'bg-blue-100 text-blue-700';
      case 'scheduled': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-purple-100 text-purple-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return <div className="p-8">Loading inspection requests...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-vor-navy">Inspection Requests</h1>
        <p className="mt-2 text-vor-slate">Manage and schedule property inspection requests</p>
      </div>

      <div className="bg-white rounded-xl border border-vor-border shadow-card">
        <div className="p-6 border-b border-vor-border">
          <h2 className="text-lg font-semibold text-vor-navy">All Requests</h2>
        </div>
        <div className="divide-y divide-vor-border">
          {requests.length === 0 ? (
            <div className="p-8 text-center text-vor-slate">No inspection requests yet</div>
          ) : (
            requests.map((request) => (
              <div key={request.id} className="p-6 hover:bg-vor-cream/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-semibold text-vor-navy">{request.fullName}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-vor-slate">
                        <Mail className="h-4 w-4" />
                        {request.email}
                      </div>
                      <div className="flex items-center gap-2 text-vor-slate">
                        <Phone className="h-4 w-4" />
                        {request.phone}
                      </div>
                      <div className="flex items-center gap-2 text-vor-slate">
                        <MapPin className="h-4 w-4" />
                        {request.propertyTitle}
                      </div>
                      <div className="flex items-center gap-2 text-vor-slate">
                        <Calendar className="h-4 w-4" />
                        Requested: {new Date(request.inspectionDate).toLocaleDateString()}
                      </div>
                    </div>

                    {request.scheduledDate && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-vor-trust">
                        <Clock className="h-4 w-4" />
                        Scheduled: {new Date(request.scheduledDate).toLocaleDateString()}
                      </div>
                    )}

                    {request.notes && (
                      <div className="mt-3 text-sm text-vor-slate">
                        <span className="font-medium">Notes:</span> {request.notes}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    {request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(request)}
                          className="px-4 py-2 bg-vor-trust text-white rounded-lg text-sm font-medium hover:bg-vor-trust-light transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-md mx-auto bg-white rounded-2xl shadow-card p-8">
            <h2 className="text-2xl font-display font-bold text-vor-navy mb-4">Schedule Inspection</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-vor-navy mb-1.5">
                  Scheduled Date
                </label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-trust"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-vor-navy mb-1.5">
                  Notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-trust"
                  rows={3}
                  placeholder="Add any notes for the inspection team..."
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSchedule}
                className="flex-1 px-4 py-2.5 bg-vor-trust text-white rounded-lg font-medium hover:bg-vor-trust-light transition-colors"
              >
                Schedule
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 border border-vor-border rounded-lg font-medium hover:bg-vor-cream transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
