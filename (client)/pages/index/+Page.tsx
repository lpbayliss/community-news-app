import { useEffect, useRef } from "react";
import {
	getPanelElement,
	getPanelGroupElement,
	getResizeHandleElement,
	Panel,
	PanelGroup,
	PanelResizeHandle,
} from "react-resizable-panels";

export default function Page() {
	const refs = useRef({});

	useEffect(() => {
		const groupElement = getPanelGroupElement("group");
		const leftPanelElement = getPanelElement("left-panel");
		const centerPanelElement = getPanelElement("center-panel");
		const rightPanelElement = getPanelElement("right-panel");
		const leftResizeHandleElement =
			getResizeHandleElement("left-resize-handle");
		const rightResizeHandleElement = getResizeHandleElement(
			"right-resize-handle",
		);

		// If you want to, you can store them in a ref to pass around
		refs.current = {
			groupElement,
			leftPanelElement,
			centerPanelElement,
			rightPanelElement,
			leftResizeHandleElement,
			rightResizeHandleElement,
		};
	}, []);

	return (
		<>
			{/* Shoutbox / Chatbox */}
			{/* Sidebar - Left - Menu */}
			{/* Sidebar - Right - Community Details */}
			<PanelGroup direction="horizontal" id="group">
				<Panel id="left-panel" minSize={10} maxSize={20} className="h-screen">
					<div>Menu and Nav</div>
				</Panel>
				<PanelResizeHandle
					id="left-resize-handle"
					className="w-0.5 bg-gray-300"
				/>
				<Panel id="center-panel" className="h-screen">
					<div>Chatbox</div>
					<>
						<div>Thread #1</div>
						<div>Thread #2</div>
						<div>Thread #3</div>
						<div>Thread #4</div>
						<div>Thread #5</div>
					</>
				</Panel>
				<PanelResizeHandle
					id="right-resize-handle"
					className="w-0.5 bg-gray-300"
				/>
				<Panel id="right-panel" minSize={10} maxSize={25} className="h-screen">
					<div>Community Details</div>
				</Panel>
			</PanelGroup>
		</>
	);
}
