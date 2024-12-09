import { ChatScreen } from "@/components/screens";

interface Props {
	params: Promise<{ id: string }>;
}

const ChatPage = async (props: Props) => {
	const { id } = await props.params;

	return <ChatScreen id={id} />;
};

export default ChatPage;
