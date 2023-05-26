import Drawer from './drawer'

export default function DashboardLayout({ children }) {
  return (
    <>
      <Drawer />
      {children}
    </>
  )
}
