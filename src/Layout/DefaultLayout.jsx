import { Outlet } from "react-router-dom"
import Navbar1 from "../Components/Navbar1"
import { HFooter } from "../Components/HFooter"


const DefaultLayout = () => {
  return (
    <div>
        <Navbar1/>
        <div className="sm:mt-[90px]">
            <Outlet/>
        </div>
        <HFooter/>
    </div>
  )
}

export default DefaultLayout
