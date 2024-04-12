import Header from "components/ui/header/Header";
import SideMenu from "components/ui/sidebar/SideMenu";

export default function DashboardLayout({ children }) {
    return (
        <div className="admin_layout">
            <SideMenu />
            <div className="sub_admin_layout">
                <Header />
                {children}
            </div>
        </div>
    )
}
