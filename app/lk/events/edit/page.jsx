"use client"

import EventsAddEdit from "../componentAddEdit";
import { Suspense } from "react";

const EventsEdit = () => {
	
	return(
		<Suspense fallback={<div>Загрузка...</div>}>
			<EventsAddEdit />
		</Suspense>
	)
}

export default EventsEdit;