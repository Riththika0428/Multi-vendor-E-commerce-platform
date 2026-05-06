'use client';

import React, { useEffect } from 'react';
import AdminTable from '@/components/admin/AdminTable';
import { useAdminStore } from '@/store/adminStore';
import { Star, Trash2, MessageSquare, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ReviewModeration() {
  const { reviews, fetchReviews, deleteReview, loading } = useAdminStore();

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this review? This will remove it from the product page.')) {
      await deleteReview(id);
      toast.success('Review deleted');
    }
  };

  const columns = [
    {
      header: 'Reviewer',
      accessor: (review: any) => (
        <div>
          <p className="font-semibold">{review.user?.name || 'Deleted User'}</p>
          <p className="text-[10px] text-neutral-400">{new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
      )
    },
    {
      header: 'Product',
      accessor: (review: any) => (
        <span className="text-sm font-medium text-blue-600 truncate max-w-[150px] inline-block">
          {review.product?.name || 'Unknown Product'}
        </span>
      )
    },
    {
      header: 'Rating',
      accessor: (review: any) => (
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-200'}`} />
          ))}
        </div>
      )
    },
    {
      header: 'Comment',
      accessor: (review: any) => (
        <p className="text-xs text-neutral-600 italic max-w-[300px] line-clamp-2">
          "{review.comment}"
        </p>
      )
    },
    {
      header: 'Flags',
      accessor: (review: any) => review.rating === 1 ? (
        <span className="flex items-center gap-1 text-red-500 text-[10px] font-bold">
          <AlertTriangle className="w-3 h-3" /> CRITICAL
        </span>
      ) : null
    }
  ];

  const actions = (review: any) => (
    <button 
      onClick={() => handleDelete(review._id)}
      className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-yellow-500" />
            Reviews Moderation
          </h1>
          <p className="text-neutral-500 text-sm mt-1">Monitor and delete inappropriate or spam reviews</p>
        </div>
      </div>

      <AdminTable 
        data={reviews} 
        columns={columns} 
        actions={actions}
        isLoading={loading}
        onSearch={(val) => console.log('Search:', val)}
        searchPlaceholder="Find by reviewer or product..."
      />
    </div>
  );
}
