'use client';

import dynamic from 'next/dynamic';

const DispossCam = dynamic(() => import('@/components/DispossCam'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-400 rounded-full animate-spin" />
    </div>
  ),
});

export default function DispossCamLoader() {
  return <DispossCam />;
}
