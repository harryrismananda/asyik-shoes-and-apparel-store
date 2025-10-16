"use client"

import React, { Suspense } from "react";

const ProductLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <Suspense>{children}</Suspense>;
};

export default ProductLayout;
