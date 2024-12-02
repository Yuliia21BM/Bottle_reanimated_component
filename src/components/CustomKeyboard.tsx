import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

interface CustomKeyboardProps {
  onPress: (value: string) => void;
  onClear: () => void;
  inputValue: string;
}

const CustomKeyboard: React.FC<CustomKeyboardProps> = ({
  onPress,
  onClear,
  inputValue,
}) => {
  const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];

  return (
    <View style={styles.keyboardContainer}>
      <View style={styles.row}>
        {buttons.map((value) => (
          <TouchableOpacity
            key={value}
            style={styles.key}
            onPress={() => onPress(inputValue + value)}
          >
            <Text style={styles.keyText}>{value}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.key, styles.actionKey]}
          onPress={onClear}
        >
          <Image
            source={require("../../assets/images/clear-icon.png")}
            style={styles.actionKeyIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    width: 250,
    paddingVertical: 10,
    backgroundColor: "#F0F8FF",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  key: {
    margin: 5,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#4CAF50",
  },
  keyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  actionKey: {
    backgroundColor: "transparent",
  },
  actionKeyIcon: {
    width: 35,
    height: 35,
  },
});

export default CustomKeyboard;
