"use client"

// import { useSearchParams } from "next/navigation";
import AddEdit from "../componentAddEdit";
import { Suspense } from "react";

const OrganizationsEdit = () => {
	
	return(
		<Suspense fallback={<div>Загрузка...</div>}>
			<AddEdit />
		</Suspense>
	)
}

export default OrganizationsEdit;