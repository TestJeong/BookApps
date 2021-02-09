import * as React from 'react';
import {
  Animated,
  Keyboard,
  KeyboardEvent,
  LayoutAnimation,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const KeyboardSpacerProvider = ({children, noSpaceHeight}) => {
  const [height, setHeight] = React.useState(noSpaceHeight || 0);

  return (
    <KeyboardSpacerContext.Provider value={{height, setHeight}}>
      {children}
    </KeyboardSpacerContext.Provider>
  );
};

export const KeyboardSpacer = ({safety = true, excludeHeight = false}) => {
  const KeyboardHeight = React.useRef(new Animated.Value(0)).current;
  const safe = useSafeAreaInsets();

  const height = 0;

  React.useEffect(() => {
    console.log('asdfasdf', safe);

    const createLayoutAnimation = (e) => ({
      duration: e.duration,
      create: {
        type: LayoutAnimation.Types[e.easing],
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        type: LayoutAnimation.Types[e.easing],
      },
      delete: {
        type: LayoutAnimation.Types[e.easing],
        property: LayoutAnimation.Properties.scaleXY,
      },
    });
    const updateKeyboardSpace = (e) => {
      console.log('222', e.endCoordinates.height);
      if (!e.endCoordinates || !e.startCoordinates) {
        return;
      }
      LayoutAnimation.configureNext(createLayoutAnimation(e));
      KeyboardHeight.setValue(
        e.endCoordinates.height -
          (safety ? safe.bottom : 0) -
          (excludeHeight ? height : 0) +
          40,
      );
    };

    const resetKeyboardSpace = (e) => {
      if (!e.endCoordinates || !e.startCoordinates) {
        return;
      }

      LayoutAnimation.configureNext(createLayoutAnimation(e));
      KeyboardHeight.setValue(0);
    };

    const updateListener =
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const resetListener =
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
    const listeners = [
      Keyboard.addListener(updateListener, updateKeyboardSpace),
      Keyboard.addListener(resetListener, resetKeyboardSpace),
    ];

    return () => {
      listeners.forEach((l) => {
        l.remove();
      });
    };
  }, [KeyboardHeight, excludeHeight, height, safe.bottom, safety]);

  return (
    <Animated.View
      style={{height: KeyboardHeight, backgroundColor: 'transparent'}}
    />
  );
};

export function withKeyboardSpacer({safety = true, excludeHeight = false}) {
  return (Component) => (props) => (
    <>
      <Component {...props} />
      <KeyboardSpacer {...{safety, excludeHeight}} />
    </>
  );
}

export default {
  KeyboardSpacer,
  withKeyboardSpacer,
};
