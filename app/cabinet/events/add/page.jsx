"use client"

import EventsAddEdit from "../componentAddEdit";
import { Suspense } from "react";

const EventsAdd = () => {
	
	return(
		<Suspense fallback={<div>Загрузка...</div>}>
			<EventsAddEdit />
		</Suspense>
	)
}

export default EventsAdd;