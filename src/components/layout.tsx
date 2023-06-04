import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/*Header*/}
      <main className="p-4">{children}</main>
      {/*Footer*/}
    </>
  )
}
