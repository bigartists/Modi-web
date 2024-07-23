'use client';

import { DashboardContent } from 'src/layouts/dashboard';

import { ProductDetailsSkeleton } from 'src/sections/deployment/product-skeleton';

// ----------------------------------------------------------------------

export default function Loading() {
  return (
    <DashboardContent sx={{ pt: 5 }}>
      <ProductDetailsSkeleton />
    </DashboardContent>
  );
}
