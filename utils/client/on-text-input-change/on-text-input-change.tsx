import { DebouncedState } from "use-debounce";

export const onTextInputChange =
	(
		setState: React.Dispatch<React.SetStateAction<string>>,
		onDebouncedValueChange?: DebouncedState<() => void>,
	) =>
	(e: React.ChangeEvent<HTMLInputElement>) => {
		setState(e.target.value);

		if (onDebouncedValueChange) {
			onDebouncedValueChange();
		}
	};
