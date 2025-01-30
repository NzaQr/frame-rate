import { View, Paragraph, Button } from "tamagui";
import { X } from "@tamagui/lucide-icons";

type ErrorViewProps = {
  onBack: () => void;
};

const ModalErrorView = ({ onBack }: ErrorViewProps) => {
  return (
    <View flex={1} p="$4" bg="$background" content="center" items="center">
      <Paragraph>No movie data available.</Paragraph>
      <Button icon={X} onPress={onBack} mt="$4">
        Go Back
      </Button>
    </View>
  );
};
export default ModalErrorView;
