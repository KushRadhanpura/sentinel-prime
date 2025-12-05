import React from 'react';
import { Lock, Trash2, Eye } from 'lucide-react';

const SecretCard = ({ secret, onView, onDelete }) => {
  const categoryColors = {
    password: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    note: 'bg-green-500/10 text-green-400 border-green-500/30',
    card: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    'api-key': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    other: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
  };

  return (
    <div className="card-glow bg-gray-800/40 backdrop-blur-sm border border-sentinel-blue/20 rounded-lg p-4 hover:border-sentinel-blue/40 transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Lock className="w-4 h-4 text-sentinel-blue" />
            <h3 className="font-semibold text-white">{secret.title}</h3>
          </div>
          
          <div className="flex items-center space-x-2 mb-3">
            <span className={`text-xs px-2 py-1 rounded border ${categoryColors[secret.category] || categoryColors.other}`}>
              {secret.category}
            </span>
            <span className="text-xs text-gray-500">
              {new Date(secret.createdAt).toLocaleDateString()}
            </span>
          </div>

          {secret.tags && secret.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {secret.tags.map((tag, idx) => (
                <span key={idx} className="text-xs bg-gray-700/50 px-2 py-0.5 rounded text-gray-400">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onView(secret._id)}
            className="p-2 rounded-lg bg-sentinel-blue/10 hover:bg-sentinel-blue/20 text-sentinel-blue transition-colors"
            title="View Secret"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(secret._id)}
            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
            title="Delete Secret"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecretCard;
