import { DebouncedState } from "use-debounce";

export const onTextareaInputChange =
	(
		setState: React.Dispatch<React.SetStateAction<string>>,
		onDebouncedValueChange?: DebouncedState<() => void>
	) =>
	(e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setState(e.target.value);

		if (onDebouncedValueChange) {
			onDebouncedValueChange();
		}
	};
