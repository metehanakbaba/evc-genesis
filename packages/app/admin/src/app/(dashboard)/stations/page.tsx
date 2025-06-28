import React from 'react';
import Link from 'next/link';

// Mock station data - in real app would come from API
const stations = [
  {
    id: 'ST001',
    name: 'Downtown Plaza',
    location: 'Downtown, New York',
    status: 'online',
    chargers: 4,
    activeChargers: 3,
    totalPower: '150kW',
    utilization: 75,
    revenue: 1245.50,
    lastMaintenance: '2024-06-20'
  },
  {
    id: 'ST002', 
    name: 'Shopping Mall West',
    location: 'Westside, New York',
    status: 'online',
    chargers: 8,
    activeChargers: 6,
    totalPower: '300kW',
    utilization: 88,
    revenue: 2150.25,
    lastMaintenance: '2024-06-18'
  },
  {
    id: 'ST003',
    name: 'Airport Terminal',
    location: 'JFK Airport, New York',
    status: 'maintenance',
    chargers: 12,
    activeChargers: 8,
    totalPower: '500kW',
    utilization: 45,
    revenue: 890.75,
    lastMaintenance: '2024-06-25'
  },
  {
    id: 'ST004',
    name: 'Business District',
    location: 'Midtown, New York',
    status: 'online',
    chargers: 6,
    activeChargers: 6,
    totalPower: '200kW',
    utilization: 92,
    revenue: 1890.00,
    lastMaintenance: '2024-06-15'
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'online': return 'text-green-400 bg-green-500/20';
    case 'maintenance': return 'text-yellow-400 bg-yellow-500/20';
    case 'offline': return 'text-red-400 bg-red-500/20';
    default: return 'text-gray-400 bg-gray-500/20';
  }
}

function getUtilizationColor(utilization: number) {
  if (utilization >= 80) return 'text-red-400';
  if (utilization >= 60) return 'text-yellow-400';
  return 'text-green-400';
}

export default function StationsPage() {
  const totalStations = stations.length;
  const onlineStations = stations.filter(s => s.status === 'online').length;
  const totalChargers = stations.reduce((sum, s) => sum + s.chargers, 0);
  const activeChargers = stations.reduce((sum, s) => sum + s.activeChargers, 0);
  const totalRevenue = stations.reduce((sum, s) => sum + s.revenue, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-card p-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          🔌 EV Charging Stations
        </h1>
        <p className="text-gray-300 text-lg">
          Real-time monitoring and management of charging infrastructure
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="glass-card p-4">
          <div className="text-sm text-gray-400">Total Stations</div>
          <div className="text-2xl font-bold text-white">{totalStations}</div>
          <div className="text-sm text-green-400">100% coverage</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-sm text-gray-400">Online Status</div>
          <div className="text-2xl font-bold text-white">{onlineStations}/{totalStations}</div>
          <div className="text-sm text-green-400">{Math.round((onlineStations/totalStations)*100)}% uptime</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-sm text-gray-400">Total Chargers</div>
          <div className="text-2xl font-bold text-white">{totalChargers}</div>
          <div className="text-sm text-blue-400">{activeChargers} active</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-sm text-gray-400">Utilization Rate</div>
          <div className="text-2xl font-bold text-white">{Math.round((activeChargers/totalChargers)*100)}%</div>
          <div className="text-sm text-green-400">+5% today</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-sm text-gray-400">Daily Revenue</div>
          <div className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</div>
          <div className="text-sm text-green-400">+12% today</div>
        </div>
      </div>

      {/* Stations Table */}
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Station Overview</h2>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Add Station
            </button>
            <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
              Export Data
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-4 text-gray-300 font-medium">Station</th>
                <th className="pb-4 text-gray-300 font-medium">Status</th>
                <th className="pb-4 text-gray-300 font-medium">Chargers</th>
                <th className="pb-4 text-gray-300 font-medium">Power</th>
                <th className="pb-4 text-gray-300 font-medium">Utilization</th>
                <th className="pb-4 text-gray-300 font-medium">Revenue</th>
                <th className="pb-4 text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stations.map((station, index) => (
                <tr key={station.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="py-4">
                    <div>
                      <div className="font-medium text-white">{station.name}</div>
                      <div className="text-sm text-gray-400">{station.location}</div>
                      <div className="text-xs text-gray-500">ID: {station.id}</div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(station.status)}`}>
                      {station.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="text-white font-medium">
                      {station.activeChargers}/{station.chargers}
                    </div>
                    <div className="text-xs text-gray-400">active/total</div>
                  </td>
                  <td className="py-4">
                    <div className="text-white font-medium">{station.totalPower}</div>
                    <div className="text-xs text-gray-400">max capacity</div>
                  </td>
                  <td className="py-4">
                    <div className={`font-medium ${getUtilizationColor(station.utilization)}`}>
                      {station.utilization}%
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-blue-500 h-1.5 rounded-full transition-all" 
                        style={{ width: `${station.utilization}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="text-white font-medium">${station.revenue.toFixed(2)}</div>
                    <div className="text-xs text-gray-400">today</div>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded text-xs transition-colors">
                        Monitor
                      </button>
                      <button className="px-3 py-1 bg-yellow-600/20 hover:bg-yellow-600/40 text-yellow-400 rounded text-xs transition-colors">
                        Maintain
                      </button>
                      <button className="px-3 py-1 bg-gray-600/20 hover:bg-gray-600/40 text-gray-400 rounded text-xs transition-colors">
                        Settings
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Back Navigation */}
      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 glass-card px-6 py-3 text-white hover:scale-105 transition-all"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
} 