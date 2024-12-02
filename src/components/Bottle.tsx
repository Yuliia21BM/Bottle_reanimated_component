import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  PanResponder,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { BottleSvg } from "./BottleSvg";
import {
  LIQUID_MAX_Y_POSITION,
  LIQUID_MIN_Y_POSITION,
} from "../utils/constants";
import CustomKeyboard from "./CustomKeyboard";

const Bottle = () => {
  const [value, setValue] = useState("0");
  const [isInputCorrect, setIsInputCorrect] = useState(true);
  const sliderPosition = useSharedValue(LIQUID_MIN_Y_POSITION);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sliderPosition.value }],
  }));

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newPosition = Math.max(
        LIQUID_MAX_Y_POSITION,
        Math.min(LIQUID_MIN_Y_POSITION, sliderPosition.value + gestureState.dy)
      );

      sliderPosition.value = newPosition;

      const liquidLevel =
        (LIQUID_MIN_Y_POSITION - newPosition) /
        (LIQUID_MIN_Y_POSITION - LIQUID_MAX_Y_POSITION);

      setValue(liquidLevel.toFixed(2));
      setIsInputCorrect(true);
    },
  });

  const handleInputChange = (text: string) => {
    if (text === "") {
      setValue("");
      sliderPosition.value = LIQUID_MIN_Y_POSITION;
      setIsInputCorrect(true);
      return;
    }

    if ((text.match(/\./g) || []).length > 1) {
      setValue("");
      setIsInputCorrect(false);
      return;
    }

    if (text === "0.") {
      setValue(text);
      sliderPosition.value = LIQUID_MIN_Y_POSITION;
      setIsInputCorrect(true);
      return;
    }

    const parsedValue = parseFloat(text);

    if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 1) {
      setValue("");
      setIsInputCorrect(false);
      return;
    }

    setValue(text);
    const newPosition =
      LIQUID_MIN_Y_POSITION -
      parsedValue * (LIQUID_MIN_Y_POSITION - LIQUID_MAX_Y_POSITION);
    sliderPosition.value = newPosition;
    setIsInputCorrect(true);
  };

  const handleClear = () => {
    setValue((prev) => prev.slice(0, prev.length - 1));
    sliderPosition.value = LIQUID_MIN_Y_POSITION;
    setIsInputCorrect(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fill the Bottle</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={value}
        onChangeText={handleInputChange}
        editable={false}
        onPress={() => setIsKeyboardVisible(true)}
      />
      {!isInputCorrect && (
        <Text style={styles.errorText}>Number should be between 0 and 1</Text>
      )}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => setIsKeyboardVisible((prev) => !prev)}
      >
        {isKeyboardVisible ? (
          <BottleSvg liquidHeight={0} height={40} />
        ) : (
          <Image
            source={require("../../assets/images/keyboard-icon.png")}
            style={styles.actionIcon}
          />
        )}
      </TouchableOpacity>
      {!isKeyboardVisible ? (
        <View style={styles.bottleContainer}>
          <BottleSvg liquidHeight={Number(value)} />
          <Animated.View
            style={[styles.sliderLine, animatedStyle]}
            {...panResponder.panHandlers}
          />
          <Animated.View
            style={[styles.sliderCircle, animatedStyle]}
            {...panResponder.panHandlers}
          >
            <Text style={styles.sliderText}>
              {Math.round(Number(value) * 100)}%
            </Text>
          </Animated.View>
        </View>
      ) : (
        <CustomKeyboard
          onPress={handleInputChange}
          onClear={handleClear}
          inputValue={value}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F0F8FF",
  },
  header: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 20,
  },
  input: {
    width: 120,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderColor: "#4CAF50",
    borderWidth: 2,
    textAlign: "center",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#FFFFFF",
    marginBottom: 15,
  },
  errorText: {
    color: "#FF6347",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  bottleContainer: {
    position: "relative",
    marginTop: 20,
  },
  sliderLine: {
    position: "absolute",
    left: 30,
    width: 200,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#4CAF50",
  },
  sliderCircle: {
    position: "absolute",
    left: 220,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    top: -25,
  },
  sliderText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  actionButton: {
    alignItems: "center",
    marginVertical: 10,
  },
  actionIcon: {
    width: 40,
    height: 40,
  },
});

export default Bottle;
