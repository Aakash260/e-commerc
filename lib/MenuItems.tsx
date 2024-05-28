import {
  LayoutDashboard,
  Shapes,
  ShoppingBasket,
  BaggageClaim,
  Users,
  PackageSearch
} from "lucide-react";
  
import { ReactElement } from "react";

interface menuItems{
    svg:ReactElement,
    title:string,
    link:string
}

export const MenuItems:menuItems[] = [
  {
    svg: <LayoutDashboard  color="#005EBC"/>,
    title: "Dashboard",
    link:'/create-collection'
  },
  {
    svg: <Shapes  color="#005EBC" />,
    title: "Collection",
    link:'/create-collection'
  },
  {
    svg: <ShoppingBasket  color="#005EBC" />,
    title: "Products",
    link:'/create-collection'
  },
  {
    svg: <PackageSearch  color="#005EBC" />,
    title: "Orders",
    link:'/create-collection'
  },
  {
    svg:  <Users  color="#005EBC" />,
    title: "Customers",
    link:'/create-collection'
  },
 

];
