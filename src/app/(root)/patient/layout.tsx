import Header from '@/components/Header'
import MobileNavigation from '@/components/MobileNavigation'
import Sidebar from '@/components/Sidebar'
import {patientNav} from "@/constant/index"
import { ReactNode } from 'react'


const PatientLayout = ({children}: {children: ReactNode}) => {
  return (
    <main className="flex h-screen">
      <Sidebar navData={patientNav} />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation navData={patientNav}/>
        <Header />
        <div className="main-content">{children}</div>
      </section>
    </main>
  )
}

export default PatientLayout