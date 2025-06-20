"use client"

import dynamic from 'next/dynamic'
import React from 'react'

// Define the types for the custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        url: string;
        background: string;
      };
    }
  }
}

interface SplineViewerProps {
  scene: string;
  background?: string;
}

const SplineViewer: React.FC<SplineViewerProps> = ({ scene, background = "transparent" }) => {
  // Extract the base URL without query parameters
  const baseUrl = scene.split('?')[0];

  return (
    <div className="w-full h-full">
      <spline-viewer url={baseUrl} background={background} />
    </div>
  )
}

export default dynamic(() => Promise.resolve(SplineViewer), {
  ssr: false,
}) 