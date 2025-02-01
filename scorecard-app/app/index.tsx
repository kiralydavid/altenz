import { Text, View } from "react-native";
import {sharedUtil} from "@altenz-shared";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
        <Text>{
            sharedUtil({message: "hello"})
        }</Text>
    </View>
  );
}
