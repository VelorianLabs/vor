/**
 * VOR Phase 2 - Contractor Projects Page
 *
 * Contractor's assigned projects page showing all construction projects
 */

import { HardHat, MapPin, Calendar, TrendingUp, Users } from 'lucide-react';

export default function ContractorProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-vor-navy">My Projects</h1>
        <p className="mt-2 text-vor-slate">Manage your assigned construction projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          id="VOR-LAG-001"
          name="Lekki Peninsula Phase 1"
          location="Lekki, Lagos"
          startDate="January 15, 2024"
          completionDate="December 2025"
          progress={45}
          budget="₦250,000,000"
          spent="₦87,500,000"
          units={50}
          status="in_progress"
        />
        <ProjectCard
          id="VOR-ABJ-002"
          name="Guaranteed Estate Development"
          location="Katampe, Abuja"
          startDate="March 22, 2024"
          completionDate="June 2026"
          progress={30}
          budget="₦180,000,000"
          spent="₦54,000,000"
          units={35}
          status="in_progress"
        />
        <ProjectCard
          id="VOR-LAG-003"
          name="Victoria Island Mixed Use"
          location="Victoria Island, Lagos"
          startDate="June 1, 2024"
          completionDate="March 2027"
          progress={15}
          budget="₦400,000,000"
          spent="₦60,000,000"
          units={80}
          status="in_progress"
        />
      </div>
    </div>
  );
}

function ProjectCard({
  id,
  name,
  location,
  startDate,
  completionDate,
  progress,
  budget,
  spent,
  units,
  status,
}: {
  id: string;
  name: string;
  location: string;
  startDate: string;
  completionDate: string;
  progress: number;
  budget: string;
  spent: string;
  units: number;
  status: string;
}) {
  const budgetNum = parseInt(budget.replace(/[₦,]/g, ''));
  const spentNum = parseInt(spent.replace(/[₦,]/g, ''));
  const remaining = budgetNum - spentNum;

  return (
    <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-xs font-mono text-vor-slate">{id}</span>
          <h3 className="text-lg font-semibold text-vor-navy mt-1">{name}</h3>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-vor-gold/10 text-vor-gold">
          {status.replace('_', ' ')}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-vor-slate">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-vor-slate">
          <Calendar className="h-4 w-4" />
          <span>{startDate} - {completionDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-vor-slate">
          <Users className="h-4 w-4" />
          <span>{units} units</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-vor-border">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-vor-slate">Progress</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <div className="h-2 bg-vor-cream rounded-full overflow-hidden mb-4">
          <div className="h-full bg-vor-gold rounded-full" style={{ width: `${progress}%` }} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-vor-slate">Budget</span>
            <span className="font-medium text-vor-navy">{budget}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-vor-slate">Spent</span>
            <span className="font-medium text-vor-navy">{spent}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-vor-slate">Remaining</span>
            <span className="font-semibold text-vor-trust">₦{remaining.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
