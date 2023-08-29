import { Navigate, Route } from "react-router";
import { AmiiboBuddyHomePage } from "./components/HomePage";
import { MyCollection } from "./pages/myCollection/MyCollection";
import { Returns } from "./pages/returns/Returns";
import { Wishlist } from "./pages/wishlist/Wishlist";
import { AddAmiibo } from "./pages/addAmiibo/AddAmiibo";
import { BrowsePage } from "./components/BrowsePage";

export const AmiiboBuddy = [
	<Route index element={<AmiiboBuddyHomePage />} key={"AB1"} />,
	<Route path="browse" element={<BrowsePage />} key={"AB2"} />,
	<Route path="myCollection" element={<MyCollection />} key={"AB3"} />,
	<Route path="returns" element={<Returns />} key={"AB4"} />,
	<Route path="wishlist" element={<Wishlist />} key={"AB5"} />,
	<Route path="addAmiibo" element={<AddAmiibo />} key={"AB6"} />,
	<Route path="*" element={<Navigate to="" />} key={"AB7"} />,
];
