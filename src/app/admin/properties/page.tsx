/**
 * VOR Admin - Properties Management (Phase 1)
 *
 * Properties management page for admin to manage all properties
 */

'use client';

import { useState, useEffect } from 'react';
import { Map, Plus, Search, MoreVertical, Building2, MapPin, Calendar, CheckCircle, Clock, X, Home, LandPlot, Shield } from 'lucide-react';
import { useSessionTimeout } from '@/hooks/useSessionTimeout';
import { useAuth } from '@clerk/nextjs';

export default function AdminPropertiesPage() {
  const { userId } = useAuth();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [propertyType, setPropertyType] = useState<'terrain' | 'home'>('terrain');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    verified: 0,
    pending: 0,
    featured: 0,
  });

  // Session timeout check
  useSessionTimeout();

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const allProperties = await fetch('/api/properties').then(res => res.json());
      
      setProperties(allProperties);
      
      const verified = allProperties.filter((p: any) => p.verificationStatus === 'verified').length;
      const pending = allProperties.filter((p: any) => p.verificationStatus === 'pending').length;
      const featured = allProperties.filter((p: any) => p.featured).length;

      setStats({
        total: allProperties.length,
        verified,
        pending,
        featured,
      });
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredProperties = () => {
    return properties.filter(property => {
      const matchesType = filterType === 'all' || property.category === filterType;
      const matchesStatus = filterStatus === 'all' || property.verification_status === filterStatus || property.status === filterStatus;
      const matchesLocation = filterLocation === 'all' || property.state === filterLocation;
      const matchesSearch = searchQuery === '' || 
        property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.lga?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.city?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesType && matchesStatus && matchesLocation && matchesSearch;
    });
  };

  const handleDeleteProperty = async (id: string, category: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    
    try {
      await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      loadProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-red-400 font-semibold">Loading Classified Properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Security Header */}
      <div className="bg-red-950 border-2 border-red-600 rounded-lg p-4 flex items-center gap-3">
        <Shield className="h-6 w-6 text-red-500 animate-pulse" />
        <div>
          <p className="text-red-400 font-bold text-xs uppercase tracking-widest">⚠️ CLASSIFIED PROPERTIES MANAGEMENT ⚠️</p>
          <p className="text-red-300/80 text-xs mt-1">All property activities are monitored and logged</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Properties Management</h1>
          <p className="mt-2 text-red-400">Manage all properties and land listings</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 border border-red-500"
        >
          <Plus className="h-4 w-4" />
          Add Property
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Properties" value={stats.total.toString()} icon={Map} color="bg-red-950 border-2 border-red-700 text-red-400" />
        <StatCard title="Verified" value={stats.verified.toString()} icon={CheckCircle} color="bg-red-950 border-2 border-red-700 text-red-400" />
        <StatCard title="Pending" value={stats.pending.toString()} icon={Clock} color="bg-red-950 border-2 border-red-700 text-red-400" />
        <StatCard title="Featured" value={stats.featured.toString()} icon={Building2} color="bg-red-950 border-2 border-red-700 text-red-400" />
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-400" />
          <input
            type="text"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
          />
        </div>
        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
        >
          <option value="all">All Categories</option>
          <option value="terrain">Terrain</option>
          <option value="home">Home & Construct</option>
        </select>
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
        >
          <option value="all">All Status</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
        </select>
        <select 
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="px-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
        >
          <option value="all">All Locations</option>
          <option value="Lagos">Lagos</option>
          <option value="Abuja">Abuja</option>
          <option value="Rivers">Rivers</option>
        </select>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredProperties().length === 0 ? (
          <div className="col-span-3 p-12 text-center text-red-300/70">
            No properties found
          </div>
        ) : (
          getFilteredProperties().map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              name={property.title}
              location={`${property.lga || property.city}, ${property.state}`}
              type={property.category === 'terrain' ? 'Land' : 'Home'}
              price={`₦${(property.price || 0).toLocaleString()}`}
              status={property.verification_status || property.status || 'pending'}
              listedDate={new Date(property.created_at).toLocaleDateString()}
              category={property.category}
              onDelete={() => handleDeleteProperty(property.id, property.category)}
            />
          ))
        )}
      </div>

      {/* Add Property Modal */}
      {showAddModal && (
        <AddPropertyModal
          userId={userId}
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            loadProperties();
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) {
  return (
    <div className={`${color} rounded-xl p-6 shadow-2xl shadow-red-900/30`}>
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-950 border border-red-600 text-red-400">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-red-300">{title}</p>
          <p className="mt-1 text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function PropertyCard({
  id,
  name,
  location,
  type,
  price,
  status,
  listedDate,
  category,
  onDelete,
}: {
  id: string;
  name: string;
  location: string;
  type: string;
  price: string;
  status: 'verified' | 'pending' | 'sold';
  listedDate: string;
  category: 'terrain' | 'home';
  onDelete: () => void;
}) {
  const statusConfig = {
    verified: { label: 'Verified', color: 'bg-green-900/30 border border-green-700 text-green-400' },
    pending: { label: 'Pending', color: 'bg-yellow-900/30 border border-yellow-700 text-yellow-400' },
    sold: { label: 'Sold', color: 'bg-gray-800 border border-gray-700 text-gray-400' },
  };

  const config = statusConfig[status];

  return (
    <div className="bg-gray-900 border-2 border-red-700 rounded-xl p-6 shadow-2xl shadow-red-900/50 hover:bg-gray-800 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <a
            href={category === 'terrain' ? `/terrain/${id}` : `/home-construct/${id}`}
            className="block"
          >
            <span className="text-xs font-mono text-red-300/70">{id}</span>
            <h3 className="text-lg font-semibold text-white mt-1 hover:text-red-400 transition-colors">{name}</h3>
          </a>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
          {config.label}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-red-300/70">
          <MapPin className="h-4 w-4 text-red-400" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-red-300/70">
          <Building2 className="h-4 w-4 text-red-400" />
          <span>{type}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-red-300/70">
          <Calendar className="h-4 w-4 text-red-400" />
          <span>Listed: {listedDate}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t-2 border-red-800">
        <p className="text-lg font-bold text-white">{price}</p>
        <div className="flex items-center gap-2">
          <button 
            onClick={onDelete}
            className="p-2 rounded hover:bg-red-900/50 text-red-300/70 hover:text-red-400"
            title="Delete Property"
          >
            <X className="h-4 w-4" />
          </button>
          <button className="p-2 rounded hover:bg-gray-700 text-red-300/70 hover:text-red-400">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function AddPropertyModal({ userId, onClose, onSuccess }: { userId: string | null | undefined; onClose: () => void; onSuccess: () => void }) {
  const [propertyType, setPropertyType] = useState<'terrain' | 'home'>('terrain');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    state: 'Lagos',
    lga: '',
    city: '',
    size: '',
    title_type: 'buy',
    bedrooms: '',
    bathrooms: '',
    featured: false,
    map_link: '',
    investment_grade: '',
    images: [] as string[],
    documents: [] as string[],
  });

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River',
    'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina',
    'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'FCT'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.price || !formData.state || !formData.lga || !formData.size) {
        alert('Please fill in all required fields');
        setLoading(false);
        return;
      }

      if (propertyType === 'home' && !formData.city) {
        alert('City is required for home properties');
        setLoading(false);
        return;
      }

      // Validate minimum 5 images/videos
      if (formData.images.length < 5) {
        alert('Please upload at least 5 images or videos for the property');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          state: formData.state,
          lga: formData.lga,
          city: formData.city,
          size: formData.size,
          propertyType: propertyType,
          titleType: formData.title_type,
          bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
          bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
          investmentGrade: formData.investment_grade,
          mapLink: formData.map_link,
          images: formData.images,
          documents: formData.documents,
          featured: formData.featured,
          createdBy: userId || 'mock-user-id',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create property');
      }

      onSuccess();
    } catch (error: any) {
      console.error('Error creating property:', error);
      alert(`Failed to create property: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border-2 border-red-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-red-900/50">
        <div className="p-6 border-b-2 border-red-700 flex items-center justify-between bg-red-950">
          <h2 className="text-xl font-semibold text-white">Add New Property</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg text-red-400 hover:text-red-300">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Property Type Selection */}
          <div>
            <label className="block text-sm font-medium text-red-400 mb-3">Property Type</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPropertyType('terrain')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  propertyType === 'terrain' 
                    ? 'border-red-600 bg-red-950' 
                    : 'border-red-800 hover:border-red-600'
                }`}
              >
                <LandPlot className="h-6 w-6 mx-auto mb-2 text-red-400" />
                <p className="font-medium text-white">Terrain</p>
                <p className="text-xs text-red-300/70">Land properties</p>
              </button>
              <button
                type="button"
                onClick={() => setPropertyType('home')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  propertyType === 'home' 
                    ? 'border-red-600 bg-red-950' 
                    : 'border-red-800 hover:border-red-600'
                }`}
              >
                <Home className="h-6 w-6 mx-auto mb-2 text-red-400" />
                <p className="font-medium text-white">Home & Construct</p>
                <p className="text-xs text-red-300/70">Built properties</p>
              </button>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-400 mb-2">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                placeholder="Property title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-400 mb-2">Price (₦) *</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-red-400 mb-2">Description *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
              placeholder="Property description"
            />
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-400 mb-2">State *</label>
              <select
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
              >
                {nigerianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-red-400 mb-2">LGA *</label>
              <input
                type="text"
                required
                value={formData.lga}
                onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                placeholder="Local Government Area"
              />
            </div>
            {propertyType === 'home' && (
              <div>
                <label className="block text-sm font-medium text-red-400 mb-2">City *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                  placeholder="City"
                />
              </div>
            )}
          </div>

          {/* Map Link */}
          <div>
            <label className="block text-sm font-medium text-red-400 mb-2">Google Maps Link</label>
            <input
              type="url"
              value={formData.map_link}
              onChange={(e) => setFormData({ ...formData, map_link: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
              placeholder="https://maps.google.com/..."
            />
            <p className="text-xs text-red-300/70 mt-1">Paste a Google Maps link for the property location</p>
          </div>

          {/* Investment Grade (Terrain only) */}
          {propertyType === 'terrain' && (
            <div>
              <label className="block text-sm font-medium text-red-400 mb-2">Investment Grade</label>
              <select
                value={formData.investment_grade}
                onChange={(e) => setFormData({ ...formData, investment_grade: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
              >
                <option value="">Select grade</option>
                <option value="A">Grade A - Prime</option>
                <option value="B">Grade B - High</option>
                <option value="C">Grade C - Medium</option>
                <option value="D">Grade D - Standard</option>
              </select>
            </div>
          )}

          {/* Document Upload */}
          <div>
            <label className="block text-sm font-medium text-red-400 mb-2">Property Documents</label>
            <div className="border-2 border-dashed border-red-700 rounded-lg p-6 text-center bg-gray-800">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  const fileNames = files.map(f => f.name);
                  setFormData({ ...formData, documents: [...formData.documents, ...fileNames] });
                }}
                className="hidden"
                id="document-upload"
              />
              <label htmlFor="document-upload" className="cursor-pointer">
                <div className="text-red-300/70">
                  <p className="font-medium">Click to upload documents</p>
                  <p className="text-sm mt-1">PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</p>
                </div>
              </label>
            </div>
            {formData.documents.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-800 px-3 py-2 rounded border border-red-800">
                    <span className="text-sm text-white">{doc}</span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, documents: formData.documents.filter((_, i) => i !== idx) })}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image/Video Upload */}
          <div>
            <label className="block text-sm font-medium text-red-400 mb-2">Property Images & Videos (Minimum 5 files)</label>
            <div className="border-2 border-dashed border-red-700 rounded-lg p-6 text-center bg-gray-800">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  if (formData.images.length + files.length > 20) {
                    alert('Maximum 20 files allowed');
                    return;
                  }
                  const fileNames = files.map(f => f.name);
                  setFormData({ ...formData, images: [...formData.images, ...fileNames] });
                }}
                className="hidden"
                id="media-upload"
              />
              <label htmlFor="media-upload" className="cursor-pointer">
                <div className="text-red-300/70">
                  <p className="font-medium">Click to upload images & videos</p>
                  <p className="text-sm mt-1">JPG, PNG, GIF, MP4, WebM (Max 20 files, Min 5 required)</p>
                </div>
              </label>
            </div>
            {formData.images.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-red-300/70 mb-2">{formData.images.length} file(s) uploaded</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <div className="bg-gray-800 border border-red-800 rounded-lg p-2 flex items-center gap-2">
                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-white truncate block">{img}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, images: formData.images.filter((_, i) => i !== idx) })}
                          className="text-red-400 hover:text-red-300 flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-400 mb-2">Size (sqm) *</label>
              <input
                type="text"
                required
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                placeholder="500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-400 mb-2">
                {propertyType === 'terrain' ? 'Title Type' : 'Listing Type'} *
              </label>
              <select
                required
                value={formData.title_type}
                onChange={(e) => setFormData({ ...formData, title_type: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
              >
                {propertyType === 'terrain' ? (
                  <>
                    <option value="buy">For Sale</option>
                    <option value="lease">For Lease</option>
                  </>
                ) : (
                  <>
                    <option value="buy">For Sale</option>
                    <option value="rent">For Rent</option>
                    <option value="lease">For Lease</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {propertyType === 'home' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-red-400 mb-2">Bedrooms</label>
                <input
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-red-400 mb-2">Bathrooms</label>
                <input
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                  placeholder="0"
                />
              </div>
            </div>
          )}

          {/* Featured */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 rounded border-red-700 bg-gray-800 text-red-600 focus:ring-red-500"
            />
            <label htmlFor="featured" className="text-sm font-medium text-white">
              Feature this property on homepage
            </label>
          </div>

          {/* Request Inspection Info */}
          <div className="bg-red-950 border border-red-800 rounded-lg p-4">
            <p className="text-sm text-red-300/70">
              <strong>Note:</strong> Once published, users can request inspections for this property through the property detail page.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-red-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border-2 border-red-700 rounded-lg hover:bg-gray-800 transition-colors text-red-400 hover:text-red-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 border border-red-500 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Creating...' : 'Create Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
