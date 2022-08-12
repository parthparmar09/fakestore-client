import React from 'react'

export default function Spinner() {
  return (
    <div className="container text-center">
        <div className="spinner-border text-secondary container  my-5" role="status">
    <span className="sr-only my-5">Loading...</span>
  </div>
    </div>
  )
}
